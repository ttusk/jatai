import type { MelState } from "@/components/first-flight/scenario";

interface MelBeeProps {
  state?: MelState;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "mel-bee--sm",
  md: "mel-bee--md",
  lg: "mel-bee--lg",
};

export function MelBee({
  state = "hovering",
  size = "md",
  className = "",
}: MelBeeProps) {
  return (
    <div
      className={`mel-bee mel-bee--${state} ${sizeClasses[size]} ${className}`}
      aria-label="Mel, a abelha-guia da Jataí"
      role="img"
    >
      <svg viewBox="0 0 128 112" aria-hidden="true">
        <g className="mel-bee__flight-path" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M6 82c17 0 13-18 30-18" strokeDasharray="4 7" />
        </g>
        <g className="mel-bee__wings" fill="var(--wax)" stroke="var(--ink)" strokeWidth="4">
          <path d="M56 48C35 45 29 31 36 22c9-11 27 2 30 22Z" />
          <path d="M72 45c4-21 23-31 31-19 7 10-2 23-21 27Z" />
        </g>
        <g className="mel-bee__body" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round">
          <path d="M43 54 58 40h28l16 17-9 31-24 13-23-15Z" fill="var(--pollen)" />
          <path d="m47 65 49-1-3 13-44 1Z" fill="var(--ink)" stroke="none" />
          <path d="m57 91 26 1-14 9Z" fill="var(--honey)" stroke="none" />
          <rect x="61" y="47" width="22" height="13" rx="5" fill="var(--ink)" stroke="none" />
          <circle cx="66" cy="53" r="2" fill="var(--wax)" stroke="none" />
          <circle cx="78" cy="53" r="2" fill="var(--wax)" stroke="none" />
        </g>
        <circle className="mel-bee__pollen" cx="105" cy="82" r="8" fill="var(--pollen)" stroke="var(--ink)" strokeWidth="3" />
      </svg>
    </div>
  );
}
