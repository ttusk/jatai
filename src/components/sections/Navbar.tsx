export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav className="flex items-center gap-1 rounded-full bg-background/60 p-1.5 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <a
          href="#"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Sobre
        </a>
        <a
          href="#"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Documentação
        </a>
        <a
          href="#"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Contribuir
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}