import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

async function getBuiltPage() {
  const html = await readFile("dist/index.html", "utf8");
  return new DOMParser().parseFromString(html, "text/html");
}

describe("Jataí landing page", () => {
  it("states the fictional educational promise in Portuguese", async () => {
    const page = await getBuiltPage();

    expect(page.documentElement.lang).toBe("pt-BR");
    expect(page.querySelector("h1")?.textContent?.replace(/\s/g, "")).toBe("JATAÍ");
    expect(page.body.textContent).toContain("Aprenda Open Finance sem mover dinheiro de verdade.");
    expect(page.body.textContent).toContain("Projeto acadêmico");
    expect(page.body.textContent).toContain("ambiente 100% simulado");
  });

  it("ships one focused journey and no theme control", async () => {
    const page = await getBuiltPage();

    expect(page.querySelector("#sdk")).not.toBeNull();
    expect(page.querySelector("#primeiro-voo")).not.toBeNull();
    expect(page.querySelector("#aprender")).not.toBeNull();
    const firstFlightLinks = Array.from(page.querySelectorAll('a[href="#primeiro-voo"]'));
    expect(firstFlightLinks.some((link) => /Começar primeiro voo/.test(link.textContent ?? ""))).toBe(true);
    expect(page.querySelector('[aria-label="Toggle theme"]')).toBeNull();
    expect(page.body.textContent).not.toContain("What is Jataí");
  });
});
