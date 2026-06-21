import { forwardRef } from "react";

export interface TerminalStep {
  prompt: string;
  command: string;
  output: string[];
}

interface TerminalProps {
  steps: TerminalStep[];
}

export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  ({ steps }, ref) => {
    return (
      <div ref={ref} className="w-full max-w-xl font-mono text-sm leading-relaxed">
        {steps.map((step, i) => (
          <div key={i} className="story-step mb-6" data-step={i}>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-primary">{step.prompt}</span>
              <span className="command-text text-foreground opacity-0">
                {step.command}
              </span>
            </div>
            <div className="mt-2 space-y-1">
              {step.output.map((line, j) => (
                <p
                  key={j}
                  className="output-line pl-4 text-xs text-muted-foreground opacity-0 sm:text-sm"
                >
                  {line}
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
