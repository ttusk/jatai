import { forwardRef } from "react";

export interface TerminalStep {
  prompt: string;
  command: string;
  output: string[];
  outputLang?: "json" | "bash" | "plain";
  narration?: string[];
}

interface TerminalProps {
  steps: TerminalStep[];
}

const jsonClasses: Record<string, string> = {
  key: "text-sky-700 dark:text-sky-300 font-medium",
  string: "text-green-700 dark:text-green-400",
  number: "text-orange-600 dark:text-orange-400",
  boolean: "text-purple-600 dark:text-purple-400",
  punct: "text-muted-foreground",
  plain: "text-muted-foreground",
};

function tokenize(
  line: string,
  options: { shell?: boolean } = {}
): { type: string; value: string }[] {
  const pattern = options.shell
    ? /('[^']*'|"[^"]*"|\b(true|false|null)\b|-?\d+(?:\.\d+)?|--?[\w-]+|\w+|[^\w\s'"]|\s+)/g
    : /('[^']*'|"[^"]*"|\b(true|false|null)\b|-?\d+(?:\.\d+)?|\w+|[^\w\s'"]|\s+)/g;

  const tokens: { type: string; value: string }[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    const value = match[0];
    if (/^\s+$/.test(value)) {
      tokens.push({ type: "plain", value });
    } else if (/^['"]/.test(value)) {
      tokens.push({ type: "string", value });
    } else if (/^-?\d/.test(value)) {
      tokens.push({ type: "number", value });
    } else if (/^(true|false|null)$/.test(value)) {
      tokens.push({ type: "boolean", value });
    } else if (options.shell && /^--?/.test(value)) {
      tokens.push({ type: "flag", value });
    } else if (/^\w+$/.test(value)) {
      tokens.push({ type: "word", value });
    } else {
      tokens.push({ type: "punct", value });
    }
  }

  return tokens;
}

function renderStringToken(value: string, key: number) {
  const quote = value[0];
  const inner = value.slice(1, -1);

  if (inner === "Banco do Brasil") {
    return (
      <span key={key} className={jsonClasses.string}>
        {quote}
        <span className="text-[#003DA5] dark:text-[#FFEF00] font-semibold">
          Banco do Brasil
        </span>
        {quote}
      </span>
    );
  }

  return (
    <span key={key} className={jsonClasses.string}>
      {value}
    </span>
  );
}

function highlightJson(line: string) {
  const tokens = tokenize(line);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "string" && token.type !== "word") continue;

    let j = i + 1;
    while (j < tokens.length && tokens[j].type === "plain") j++;
    if (j < tokens.length && tokens[j].value === ":") {
      token.type = "key";
    }
  }

  return tokens.map((t, idx) => {
    if (t.type === "string") {
      return renderStringToken(t.value, idx);
    }
    return (
      <span key={idx} className={jsonClasses[t.type] ?? jsonClasses.plain}>
        {t.value}
      </span>
    );
  });
}

function highlightShell(line: string) {
  const tokens = tokenize(line, { shell: true });
  const commands = new Set(["npm", "npx", "node", "laika"]);

  return tokens.map((t, idx) => {
    let cls = "text-muted-foreground";
    if (t.type === "string") cls = "text-green-700 dark:text-green-400";
    else if (t.type === "number") cls = "text-orange-600 dark:text-orange-400";
    else if (t.type === "boolean") cls = "text-purple-600 dark:text-purple-400";
    else if (t.type === "flag") cls = "text-sky-600 dark:text-sky-400";
    else if (t.type === "word") {
      cls = commands.has(t.value)
        ? "text-foreground font-semibold"
        : "text-muted-foreground";
    }

    return (
      <span key={idx} className={cls}>
        {t.value}
      </span>
    );
  });
}

function highlightLine(
  line: string,
  lang?: TerminalStep["outputLang"]
): React.ReactNode {
  if (lang === "json") return highlightJson(line);
  if (lang === "bash") return highlightShell(line);
  return <span className="text-muted-foreground">{line}</span>;
}

export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  ({ steps }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full max-w-xl font-mono text-sm leading-relaxed"
      >
        {steps.map((step, i) => (
          <div key={i} className="story-step mb-6" data-step={i}>
            {step.narration && step.narration.length > 0 && (
              <div className="narration-lines mb-3 space-y-0.5">
                {step.narration.map((line, k) => (
                  <p
                    key={k}
                    className="narration-line invisible whitespace-pre-wrap text-xs italic text-muted-foreground/70 sm:text-sm"
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="prompt-text select-none text-primary opacity-0">
                {step.prompt}
              </span>
              <span
                className="command-text whitespace-pre-wrap text-foreground opacity-0"
                data-full-text={step.command}
              />
            </div>
            <div className="mt-2 space-y-0.5">
              {step.output.map((line, j) => (
                <p
                  key={j}
                  className="output-line invisible whitespace-pre-wrap pl-4 text-xs text-muted-foreground sm:text-sm"
                >
                  {highlightLine(line, step.outputLang)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

Terminal.displayName = "Terminal";
