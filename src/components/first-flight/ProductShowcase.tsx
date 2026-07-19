import { useEffect, useRef } from "react";
import { createTerminalTimeline } from "@/lib/terminalTimeline";
import type { ShowcaseStep } from "./scenario";
import { showcaseSteps } from "./scenario";

function TerminalFrame({ step }: { step: ShowcaseStep }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-ink text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 font-mono text-xs text-white/55 sm:px-6">
        <span>playground.ts</span>
        <span className="text-honey">simulado</span>
      </div>

      <div
        data-terminal-sequence
        className="min-h-72 px-5 py-7 font-mono text-[0.78rem] leading-7 sm:min-h-80 sm:px-8 sm:py-9 sm:text-sm"
      >
        <div className="flex gap-3 text-white/90">
          <span className="select-none text-honey">$</span>
          <code
            aria-label={step.command}
            className="block max-w-full overflow-hidden whitespace-pre-wrap break-words"
          >
            {Array.from(step.command).map((character, index) => (
              <span key={`${character}-${index}`} data-terminal-char aria-hidden="true">
                {character}
              </span>
            ))}
          </code>
        </div>

        <div className="mt-6 space-y-1 text-white/55">
          {step.output.map((line) => (
            <p key={line} data-terminal-output>
              {line}
            </p>
          ))}
        </div>

        {step.mel ? (
          <p
            data-terminal-mel
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

  useEffect(() => {
    const container = root.current;
    const flow = desktopFlow.current;
    const terminalElement = terminal.current;

    if (!container || !flow || !terminalElement || typeof window.matchMedia !== "function") return;

    let cancelled = false;
    let cleanup = () => undefined;

    async function setupScroll() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      function setupDesktop(scrubbed: boolean) {
        const triggers = Array.from(flow.querySelectorAll<HTMLElement>("[data-desktop-step]"));
        const panels = Array.from(
          terminalElement.querySelectorAll<HTMLElement>("[data-desktop-terminal-step]"),
        );
        const labels = Array.from(
          terminalElement.querySelectorAll<HTMLElement>("[data-desktop-label]"),
        );
        const progressBar = terminalElement.querySelector<HTMLElement>("[data-progress-bar]");
        const timelines = panels.map((panel) =>
          createTerminalTimeline(gsap, panel.querySelector("[data-terminal-sequence]") ?? panel),
        );

        gsap.set([...panels, ...labels], { autoAlpha: 0 });
        gsap.set([panels[0], labels[0]], { autoAlpha: 1 });

        if (!scrubbed) timelines.forEach((timeline) => timeline.progress(1));

        const activate = (index: number) => {
          gsap.set([...panels, ...labels], { autoAlpha: 0 });
          gsap.set([panels[index], labels[index]], { autoAlpha: 1 });
        };

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
            start: "top 72%",
            end: "bottom 72%",
            animation: scrubbed ? timelines[index] : undefined,
            scrub: scrubbed,
            onEnter: () => activate(index),
            onEnterBack: () => activate(index),
            onUpdate: (self) => {
              if (!self.isActive) return;
              activate(index);
              const stepProgress = scrubbed ? self.progress : 1;
              const pageProgress = ((index + stepProgress) / showcaseSteps.length) * 100;
              if (progressBar) gsap.set(progressBar, { width: `${pageProgress}%` });
            },
            onLeave: () => {
              if (index === showcaseSteps.length - 1 && progressBar) {
                gsap.set(progressBar, { width: "100%" });
              }
            },
            onLeaveBack: () => {
              if (index === 0 && progressBar) gsap.set(progressBar, { width: "0%" });
            },
          });
        });
      }

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () =>
        setupDesktop(true),
      );
      media.add("(min-width: 1024px) and (prefers-reduced-motion: reduce)", () =>
        setupDesktop(false),
      );
      media.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const articles = Array.from(
            container.querySelectorAll<HTMLElement>("[data-mobile-step]"),
          );

          articles.forEach((article) => {
            const sequence = article.querySelector("[data-terminal-sequence]");
            if (!sequence) return;

            ScrollTrigger.create({
              trigger: article,
              start: "top 82%",
              end: "bottom 38%",
              animation: createTerminalTimeline(gsap, sequence),
              scrub: true,
            });
          });
        },
      );

      cleanup = () => media.revert();
    }

    void setupScroll();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={root}>
      <div ref={desktopFlow} data-desktop-flow className="relative hidden min-h-[330vh] lg:block">
        <div ref={terminal} className="mx-auto w-full max-w-5xl" aria-live="polite">
          <div className="mb-5 flex items-end justify-between gap-6">
            <div className="grid">
              {showcaseSteps.map((step, index) => (
                <div
                  key={step.id}
                  data-desktop-label
                  className={`col-start-1 row-start-1 ${index === 0 ? "visible" : "invisible"}`}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/45">
                    Etapa {index + 1} de {showcaseSteps.length}
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">{step.label}</p>
                </div>
              ))}
            </div>

            <div className="h-px w-32 overflow-hidden bg-line" aria-hidden="true">
              <div data-progress-bar className="h-full w-0 bg-honey-dark" />
            </div>
          </div>

          <div className="grid">
            {showcaseSteps.map((step, index) => (
              <div
                key={step.id}
                data-desktop-terminal-step
                className={`col-start-1 row-start-1 ${index === 0 ? "visible" : "invisible"}`}
              >
                <TerminalFrame step={step} />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {showcaseSteps.map((step) => (
            <div key={step.id} data-desktop-step className="h-[55vh]" />
          ))}
        </div>
      </div>

      <div className="space-y-16 lg:hidden">
        {showcaseSteps.map((step, index) => (
          <article key={step.id} data-mobile-step aria-labelledby={`showcase-${step.id}`}>
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
