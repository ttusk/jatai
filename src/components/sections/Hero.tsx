import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-background">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-8 px-4 pb-24 pt-32 text-center sm:px-6 lg:gap-16">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1
            className="decay-in text-7xl font-display font-bold tracking-tight text-primary drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] sm:text-6xl md:text-7xl"
            style={
              {
                "--decay-x": "-10px",
                "--decay-y": "-20px",
                "--decay-rotate": "-2deg",
                "--decay-delay": "0.15s",
              } as React.CSSProperties
            }
          >
            Jataí
          </h1>

          <div
            className="decay-in flex flex-col items-center gap-4"
            style={
              {
                "--decay-x": "8px",
                "--decay-y": "-14px",
                "--decay-rotate": "1deg",
                "--decay-delay": "0.3s",
              } as React.CSSProperties
            }
          >
            <p className="max-w-sm text-sm text-muted-foreground sm:text-base">
              Integração financeira com soluções de{" "}
              <strong className="font-bold text-[var(--of-azul-escuro)]">
                Open Finance
              </strong>
              .
            </p>
          </div>

          <div
            className="decay-in flex justify-center pt-4"
            style={
              {
                "--decay-x": "-6px",
                "--decay-y": "16px",
                "--decay-rotate": "-1.5deg",
                "--decay-delay": "0.45s",
              } as React.CSSProperties
            }
          >
            <Button
              size="sm"
              className="h-10 justify-center gap-2 px-5 text-sm sm:h-11 sm:px-6 sm:text-base"
            >
              Explorar as soluções
              <ArrowUpRight className="size-4 shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
