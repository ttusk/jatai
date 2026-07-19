const commands = [
  "import { jatai } from '@jatai/sdk'",
  "const consent = await jatai.auth.createConsent({ scopes: ['ACCOUNTS'] })",
  "const accounts = await jatai.accounts.list({ consentId: consent.id })",
] as const;

const output = ["consent.status → 'AUTHORIZED'", "accounts.length → 1"] as const;

export function HeroTerminal() {
  return (
    <div
      data-hero-terminal
      className="overflow-hidden rounded-2xl border border-ink/10 bg-[#f7f5ef]/80 text-ink backdrop-blur-xl supports-[backdrop-filter]:bg-[#f7f5ef]/70"
      aria-label="Prévia do SDK Jataí"
    >
      <div
        data-terminal-execution
        className="min-h-[23rem] overflow-x-auto px-5 py-8 font-mono text-sm leading-7 sm:px-8 sm:py-10 sm:text-[0.95rem] sm:leading-8"
      >
        <div className="space-y-4 text-ink/90">
          {commands.map((command, commandIndex) => (
            <div key={command} className="flex gap-3">
              <span className="select-none text-honey-dark">
                {commandIndex === 0 ? "$" : "›"}
              </span>
              <code aria-label={command} className="whitespace-pre-wrap break-words">
                {command}
              </code>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-1 text-ink/60">
          {output.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <p className="mt-7 max-w-xl border-l-2 border-honey-dark pl-4 text-ink/70">
          <span className="font-medium text-ink">🐝 Mel:</span> estes dados existem só neste
          exemplo.
        </p>
      </div>
    </div>
  );
}
