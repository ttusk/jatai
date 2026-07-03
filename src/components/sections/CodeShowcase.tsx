import { useRef } from "react";
import { Terminal } from "@/components/Terminal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const terminalSteps = [
  {
    prompt: "$",
    command: "npm install @jatai/sdk",
    output: ["added 1 package in 1.2s"],
    outputLang: "bash" as const,
    narration: ["# Aderente às normas da LGPD."],
  },
  {
    prompt: "$",
    command: "npx jatai init",
    output: ["✓ Credenciais validadas", "✓ Fluxo concluído"],
    outputLang: "bash" as const,
    narration: ["# Inicie seu projeto."],
  },
  {
    prompt: ">",
    command: "jatai.consent.create({ scopes: ['ACCOUNTS'] })",
    output: ["→ Redireciona cliente para autorização"],
    outputLang: "plain" as const,
    narration: ["# Cliente autoriza via redirect."],
  },
  {
    prompt: ">",
    command: "jatai.accounts.list(consentId)",
    output: [
      "[ { institution: 'BB', type: 'CHECKING', mask: '****-7' } ]",
    ],
    outputLang: "json" as const,
    narration: ["# Dados mascarados, revogado automaticamente ao expirar."],
  },
];

export function CodeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
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
        const narrationEls = stepEl?.querySelectorAll(".narration-line");
        const fullText = commandEl?.dataset.fullText || "";

        narrationEls?.forEach((line, lineIndex) => {
          tl.set(line, { visibility: "visible" }, cursor + lineIndex * 0.12);
          tl.fromTo(
            line,
            { opacity: 0, y: -4 },
            { opacity: 1, y: 0, duration: 0.15 },
            cursor + lineIndex * 0.12
          );
        });

        cursor += (narrationEls?.length || 0) * 0.12 + 0.3;

        const revealCursor = cursor + 0.01;
        tl.set(promptEl, { visibility: "visible" }, revealCursor);
        tl.set(commandEl, { visibility: "visible" }, revealCursor);
        tl.to(promptEl, { opacity: 1, duration: 0.02 }, revealCursor);
        tl.to(commandEl, { opacity: 1, duration: 0.02 }, revealCursor);

        const typeProxy = { value: 0 };
        tl.to(
          typeProxy,
          {
            value: fullText.length,
            duration: fullText.length * 0.03,
            ease: "none",
            onUpdate: () => {
              if (commandEl) {
                commandEl.textContent = fullText.slice(
                  0,
                  Math.round(typeProxy.value)
                );
              }
            },
          },
          revealCursor
        );

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
      className="relative bg-background"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen px-4 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="mx-auto grid h-full max-w-7xl items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center gap-5">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Como usar?
            </h2>
            <p className="max-w-md text-lg text-muted-foreground">
              Instale o SDK, configure suas credenciais e comece a consumir
              dados do{" "}
              <strong className="font-bold text-[var(--of-azul-escuro)]">
                Open Finance
              </strong>
              .
            </p>
            <div className="mt-4 w-full max-w-md">
              <div className="h-0.5 w-full bg-border">
                <div
                  ref={progressRef}
                  className="h-full bg-primary transition-none"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <Terminal ref={terminalRef} steps={terminalSteps} />
          </div>
        </div>
      </div>
    </section>
  );
}