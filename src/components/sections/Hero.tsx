import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/Terminal";
import { ArrowRight, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const terminalSteps = [
  {
    prompt: "$",
    command: "npm install @laika/sdk",
    output: ["added 1 package in 1.2s"],
  },
  {
    prompt: "$",
    command: "npx laika init --env production",
    output: [
      "✓ Open Finance provider configured",
      "✓ Client credentials validated",
      "✓ Consent flow ready",
    ],
  },
  {
    prompt: ">",
    command: "laika.openFinance.accounts({ cpf: '123.456.789-00' })",
    output: [
      "{",
      "  institution: 'Banco do Brasil',",
      "  accounts: [",
      "    { type: 'checking', balance: 4850.00, currency: 'BRL' },",
      "    { type: 'savings', balance: 12300.00, currency: 'BRL' }",
      "  ]",
      "}",
    ],
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const totalChars = terminalSteps.reduce(
        (acc, step) => acc + step.command.length,
        0
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalChars * 12 + 1400}`,
          pin: true,
          pinSpacing: true,
          pinType: "fixed",
          anticipatePin: 1,
          scrub: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      let cursor = 0;

      terminalSteps.forEach((step, stepIndex) => {
        const stepEl = terminalRef.current?.querySelector(
          `[data-step="${stepIndex}"]`
        );
        const promptEl = stepEl?.querySelector(".prompt-text") as HTMLElement | null;
        const commandEl = stepEl?.querySelector(".command-text") as HTMLElement | null;
        const outputEls = stepEl?.querySelectorAll(".output-line");
        const fullText = commandEl?.dataset.fullText || "";

        tl.set(promptEl, { visibility: "visible" }, cursor);
        tl.set(commandEl, { visibility: "visible" }, cursor);

        const typeProxy = { value: 0 };
        tl.to(typeProxy, {
          value: fullText.length,
          duration: fullText.length * 0.03,
          ease: "none",
          onUpdate: () => {
            if (commandEl) {
              commandEl.textContent = fullText.slice(0, Math.round(typeProxy.value));
            }
          },
        }, cursor);

        cursor += fullText.length * 0.03 + 0.2;

        outputEls?.forEach((line, lineIndex) => {
          tl.set(line, { visibility: "visible" }, cursor + lineIndex * 0.05);
          tl.fromTo(
            line,
            { opacity: 0, x: -6 },
            { opacity: 1, x: 0, duration: 0.1 },
            cursor + lineIndex * 0.05
          );
        });

        cursor += (outputEls?.length || 0) * 0.05 + 0.4;
      });

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-background px-6"
    >
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto grid h-full max-w-7xl items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center gap-5">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Laika
          </h1>

          <p className="text-xl font-medium text-foreground sm:text-2xl">
            Open Fintech Lab
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="gap-2">
              Conheça as soluções
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <MessageCircle className="size-4" />
              Fale conosco
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <Terminal ref={terminalRef} steps={terminalSteps} />
          <div className="w-full max-w-xl">
            <div className="h-0.5 w-full bg-border">
              <div
                ref={progressRef}
                className="h-full bg-primary transition-none"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
