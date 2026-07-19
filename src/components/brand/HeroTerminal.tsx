import { useEffect, useRef } from "react";
import { createTerminalTimeline } from "@/lib/terminalTimeline";

const commands = [
  "import { jatai } from '@jatai/sdk'",
  "const consent = await jatai.auth.createConsent({ scopes: ['ACCOUNTS'] })",
  "const accounts = await jatai.accounts.list({ consentId: consent.id })",
] as const;

const output = ["consent.status → 'AUTHORIZED'", "accounts.length → 1"] as const;

export function HeroTerminal() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminal = root.current;
    if (!terminal || typeof window.matchMedia !== "function") return;

    let cancelled = false;
    let cleanup = () => undefined;

    async function setupScroll() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !terminal) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const sequence = terminal.querySelector("[data-terminal-sequence]");
        const hero = terminal.closest("#inicio") ?? terminal;
        if (!sequence) return;

        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom 45%",
          animation: createTerminalTimeline(gsap, sequence),
          scrub: true,
        });
      });

      cleanup = () => media.revert();
    }

    void setupScroll();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={root}
      data-hero-terminal
      className="overflow-hidden rounded-2xl bg-ink text-white"
      aria-label="Prévia do SDK Jataí"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 font-mono text-xs text-white/50 sm:px-6">
        <span>quickstart.ts</span>
        <span className="text-honey">simulado</span>
      </div>

      <div
        data-terminal-sequence
        className="min-h-[23rem] overflow-x-auto px-5 py-8 font-mono text-[0.76rem] leading-7 sm:px-8 sm:py-10 sm:text-sm"
      >
        <div className="space-y-4 text-white/85">
          {commands.map((command, commandIndex) => (
            <div key={command} className="flex gap-3">
              <span className="select-none text-honey">{commandIndex === 0 ? "$" : "›"}</span>
              <code aria-label={command} className="whitespace-pre-wrap break-words">
                {Array.from(command).map((character, characterIndex) => (
                  <span
                    key={`${character}-${characterIndex}`}
                    data-terminal-char
                    aria-hidden="true"
                  >
                    {character}
                  </span>
                ))}
              </code>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-1 text-white/50">
          {output.map((line) => (
            <p key={line} data-terminal-output>
              {line}
            </p>
          ))}
        </div>

        <p
          data-terminal-mel
          className="mt-7 max-w-xl border-l-2 border-honey pl-4 text-white/75"
        >
          <span className="text-white">🐝 Mel:</span> estes dados existem só neste exemplo.
        </p>
      </div>
    </div>
  );
}
