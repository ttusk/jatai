import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded border border-primary/50 bg-primary/10 text-primary">
            λ
          </span>
          <span>Laika</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Soluções
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Open Finance
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Acessar
          </Button>
          <Button size="sm">Começar</Button>
        </div>
      </div>
      <Separator />
    </header>
  );
}
