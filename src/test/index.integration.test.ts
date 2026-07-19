import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

async function getBuiltPage() {
  const html = await readFile("dist/index.html", "utf8");
  return new DOMParser().parseFromString(html, "text/html");
}

async function getBuiltRoute(route: string) {
  const html = await readFile(`dist/${route}/index.html`, "utf8");
  return new DOMParser().parseFromString(html, "text/html");
}

describe("Jataí landing page", () => {
  it("uses the agreed concise Portuguese product copy", async () => {
    const page = await getBuiltPage();

    expect(page.documentElement.lang).toBe("pt-BR");
    expect(page.querySelector("h1")?.textContent?.trim()).toBe("Jataí");
    expect(page.body.textContent).toContain("Open Finance, sem dados reais.");
    expect(page.body.textContent).toContain(
      "SDK educacional para testar consentimento, contas e Pix.",
    );
    expect(page.body.textContent).toContain("Veja o SDK em uso.");
    expect(page.body.textContent).toContain("O SDK, módulo por módulo.");
    expect(page.body.textContent).toContain(
      "Consentimento, contas, Pix e ferramentas para controlar o sandbox.",
    );
  });

  it("ships the focused four-section light experience", async () => {
    const page = await getBuiltPage();

    expect(page.querySelector("#inicio")).not.toBeNull();
    expect(page.querySelector("#playground")).not.toBeNull();
    expect(page.querySelector("#sdk")).not.toBeNull();
    expect(page.querySelector("footer")).not.toBeNull();
    expect(page.querySelector("#aprender")).toBeNull();
    expect(page.querySelector("#primeiro-voo")).toBeNull();
    const playgroundLinks = Array.from(page.querySelectorAll('a[href="#playground"]'));
    expect(playgroundLinks.some((link) => link.textContent?.includes("Abrir playground"))).toBe(true);
    expect(page.querySelector('[aria-label="Toggle theme"]')).toBeNull();
    expect(page.body.textContent).not.toContain("15 min");
    expect(page.body.textContent).not.toContain("6 etapas");
  });

  it("keeps navigation, SDK examples, and academic disclosure concrete", async () => {
    const page = await getBuiltPage();

    const navigation = page.querySelector('nav[aria-label="Navegação principal"]');
    expect(navigation?.textContent).toContain("Início");
    expect(navigation?.textContent).toContain("Playground");
    expect(navigation?.textContent).toContain("SDK");
    expect(navigation?.textContent).not.toContain("GitHub");
    expect(page.body.textContent).toContain("accounts.list()");
    expect(page.body.textContent).toContain("payments.createPix()");
    expect(page.body.textContent).toContain(
      "Projeto acadêmico inspirado no Open Finance Brasil. Sem vínculo oficial.",
    );
    expect(page.querySelector('img[alt="Open Finance Brasil"]')).not.toBeNull();
    expect(page.querySelector('footer a[href="https://github.com/ttusk/jatai"]')).not.toBeNull();
    expect(page.querySelector('footer a[href$="privacidade/"]')).not.toBeNull();
    expect(page.querySelector('footer a[href$="termos/"]')).not.toBeNull();
  });

  it("publishes honest privacy and terms pages for the fictional project", async () => {
    const [privacy, terms] = await Promise.all([
      getBuiltRoute("privacidade"),
      getBuiltRoute("termos"),
    ]);

    expect(privacy.querySelector("h1")?.textContent).toContain("Privacidade");
    expect(privacy.body.textContent).toContain("dados sintéticos");
    expect(terms.querySelector("h1")?.textContent).toContain("Termos");
    expect(terms.body.textContent).toContain("projeto acadêmico fictício");
  });
});
