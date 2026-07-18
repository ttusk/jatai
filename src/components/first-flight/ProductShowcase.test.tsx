import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductShowcase } from "./ProductShowcase";

describe("ProductShowcase", () => {
  it("renders the whole scripted flow for scrolling and assistive technology", () => {
    render(<ProductShowcase />);

    expect(screen.getAllByText("Etapa 1 de 6").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("article")).toHaveLength(6);
    expect(screen.getAllByText("npm install @jatai/sdk").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/paymentId: 'pix_demo'/).length).toBeGreaterThan(0);
  });

  it("shows Mel only at the consent, pending Pix, and callback steps", () => {
    render(<ProductShowcase />);

    expect(screen.getAllByText(/^🐝 Mel:/)).toHaveLength(3);
    expect(screen.getByText(/O acesso expira/)).toBeInTheDocument();
    expect(screen.getByText(/Pix termina depois/)).toBeInTheDocument();
    expect(screen.getByText(/idempotente/)).toBeInTheDocument();
  });
});
