import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/Terminal";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
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
      "  accounts: 2,",
      "  totalBalance: 17150.00",
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      let cursor = 0.06;

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
        tl.to(
          typeProxy,
          {
            value: fullText.length,
            duration: 0.22,
            ease: "none",
            onUpdate: () => {
              if (commandEl) {
                commandEl.textContent = fullText.slice(0, Math.round(typeProxy.value));
              }
            },
          },
          cursor
        );

        cursor += 0.22;

        outputEls?.forEach((line, lineIndex) => {
          const lineTime = cursor + lineIndex * 0.03;
          tl.set(line, { visibility: "visible" }, lineTime);
          tl.fromTo(
            line,
            { opacity: 0, x: -6 },
            { opacity: 1, x: 0, duration: 0.03 },
            lineTime
          );
        });

        cursor += (outputEls?.length || 0) * 0.03 + 0.08;
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
      className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16"
    >
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Open Fintech Lab
          </p>
          <h1 className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl">
            Laika
          </h1>
        </div>

        <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
          Código aberto para conectar fintechs, bancos e o ecossistema de
          Open Finance no Brasil.
        </p>

        <div className="w-full max-w-2xl">
          <Terminal ref={terminalRef} steps={terminalSteps} />
        </div>

        <div className="w-full max-w-2xl">
          <div className="h-0.5 w-full bg-border">
            <div
              ref={progressRef}
              className="h-full bg-primary transition-none"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
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

      <div className="mt-auto flex flex-col items-center gap-1 pt-8 text-xs text-muted-foreground">
        <span className="uppercase tracking-widest">Rolar</span>
        <ChevronDown className="size-4 animate-bounce" />
      </div>
    </section>
  );
}
