import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ShowcaseStep } from "./scenario";
import { showcaseSteps } from "./scenario";

function TerminalFrame({ step, animated = false }: { step: ShowcaseStep; animated?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-ink text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 font-mono text-xs text-white/55 sm:px-6">
        <span>playground.ts</span>
        <span className="text-honey">simulado</span>
      </div>

      <div className="min-h-72 px-5 py-7 font-mono text-[0.78rem] leading-7 sm:min-h-80 sm:px-8 sm:py-9 sm:text-sm">
        <div className="flex gap-3 text-white/90">
          <span className="select-none text-honey">$</span>
          <code
            data-command={animated ? "" : undefined}
            className="block max-w-full overflow-hidden whitespace-pre-wrap break-words"
          >
            {step.command}
          </code>
        </div>

        <div data-output={animated ? "" : undefined} className="mt-6 space-y-1 text-white/55">
          {step.output.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        {step.mel ? (
          <p
            data-mel={animated ? "" : undefined}
            className="mt-7 max-w-xl border-l-2 border-honey pl-4 text-white/80"
          >
            <span className="text-white">🐝 Mel:</span> {step.mel}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const desktopFlow = useRef<HTMLDivElement>(null);
  const terminal = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = root.current;
    const flow = desktopFlow.current;
    const terminalElement = terminal.current;

    if (!container || !flow || !terminalElement || typeof window.matchMedia !== "function") return;

    let cleanup = () => undefined;

    async function setupScroll() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const triggers = Array.from(flow.querySelectorAll<HTMLElement>("[data-desktop-step]"));

          ScrollTrigger.create({
            trigger: flow,
            start: "top 112px",
            end: "bottom bottom",
            pin: terminalElement,
            pinSpacing: false,
          });

          triggers.forEach((trigger, index) => {
            ScrollTrigger.create({
              trigger,
              start: "top center",
              end: "bottom center",
              onEnter: () => setActiveIndex(index),
              onEnterBack: () => setActiveIndex(index),
            });
          });
        },
      );

      cleanup = () => media.revert();
    }

    void setupScroll();
    return () => cleanup();
  }, []);

  useEffect(() => {
    const terminalElement = terminal.current;
    if (
      !terminalElement ||
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let cancelled = false;
    let revert = () => undefined;

    async function animateTerminal() {
      const { default: gsap } = await import("gsap");
      if (cancelled || !terminalElement) return;

      const context = gsap.context(() => {
        const command = terminalElement.querySelector("[data-command]");
        const output = terminalElement.querySelectorAll("[data-output] > *");
        const mel = terminalElement.querySelector("[data-mel]");
        const timeline = gsap.timeline();

        if (command) {
          timeline.fromTo(
            command,
            { opacity: 0, x: -8 },
            { opacity: 1, x: 0, duration: 0.28, ease: "power2.out" },
          );
        }

        timeline.fromTo(
          output,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.24, stagger: 0.08, ease: "power2.out" },
          ">-0.05",
        );

        if (mel) {
          timeline.fromTo(
            mel,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
            ">-0.05",
          );
        }
      }, terminalElement);

      revert = () => context.revert();
    }

    void animateTerminal();
    return () => {
      cancelled = true;
      revert();
    };
  }, [activeIndex]);

  const activeStep = showcaseSteps[activeIndex];
  const progress = ((activeIndex + 1) / showcaseSteps.length) * 100;

  return (
    <div ref={root}>
      <div ref={desktopFlow} className="relative hidden min-h-[330vh] lg:block">
        <div ref={terminal} className="mx-auto w-full max-w-5xl" aria-live="polite">
          <div className="mb-5 flex items-end justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/45">
                  Etapa {activeIndex + 1} de {showcaseSteps.length}
                </p>
                <p className="mt-1 text-sm font-medium text-ink">{activeStep.label}</p>
              </motion.div>
            </AnimatePresence>

            <div className="h-px w-32 overflow-hidden bg-line" aria-hidden="true">
              <motion.div
                className="h-full origin-left bg-honey-dark"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <TerminalFrame step={activeStep} animated />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {showcaseSteps.map((step) => (
            <div key={step.id} data-desktop-step className="h-[55vh]" />
          ))}
        </div>
      </div>

      <div className="space-y-16 lg:hidden">
        {showcaseSteps.map((step, index) => (
          <article key={step.id} aria-labelledby={`showcase-${step.id}`}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/45">
                  Etapa {index + 1} de {showcaseSteps.length}
                </p>
                <h3 id={`showcase-${step.id}`} className="mt-1 text-sm font-medium text-ink">
                  {step.label}
                </h3>
              </div>
              <span className="font-mono text-xs text-ink/35">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <TerminalFrame step={step} />
          </article>
        ))}
      </div>
    </div>
  );
}
