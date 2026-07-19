import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductShowcase } from "./ProductShowcase";

describe("ProductShowcase", () => {
  it("renders the whole scripted flow for scrolling and assistive technology", () => {
    const { container } = render(<ProductShowcase />);

    expect(screen.getAllByText("Etapa 1 de 6").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("article")).toHaveLength(6);
    expect(screen.getAllByLabelText("npm install @jatai/sdk")).toHaveLength(2);
    expect(screen.getAllByText(/paymentId: 'pix_demo'/).length).toBeGreaterThan(0);
    expect(container.querySelectorAll("[data-desktop-step]")).toHaveLength(6);
    expect(container.querySelectorAll("[data-mobile-step]")).toHaveLength(6);
    expect(container.querySelectorAll("[data-terminal-sequence]")).toHaveLength(12);
    expect(container.querySelectorAll("[data-terminal-char]").length).toBeGreaterThan(
      "npm install @jatai/sdk".length,
    );
  });

  it("shows Mel only at the consent, pending Pix, and callback steps", () => {
    const { container } = render(<ProductShowcase />);

    expect(container.querySelectorAll("[data-terminal-mel]")).toHaveLength(6);
    expect(screen.getAllByText(/O acesso expira/)).toHaveLength(2);
    expect(screen.getAllByText(/Pix termina depois/)).toHaveLength(2);
    expect(screen.getAllByText(/idempotente/)).toHaveLength(2);
  });
});
