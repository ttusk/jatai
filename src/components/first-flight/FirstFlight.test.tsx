import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FirstFlight } from "./FirstFlight";

describe("FirstFlight", () => {
  it("runs a simulated step and lets the learner ask Mel for context", async () => {
    const user = userEvent.setup();
    render(<FirstFlight />);

    expect(screen.getByText("Etapa 1 de 6")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Instale o SDK" })).toBeInTheDocument();
    expect(screen.queryByText("✓ ambiente simulado pronto")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Executar etapa" }));

    expect(screen.getByText(/✓ ambiente simulado pronto/)).toBeInTheDocument();
    expect(screen.queryByText(/Um só pacote deixa você aprender/)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Por que um único SDK?" }));

    expect(screen.getByText(/Um só pacote deixa você aprender/)).toBeInTheDocument();
  });

  it("advances through the journey without carrying the previous output", async () => {
    const user = userEvent.setup();
    render(<FirstFlight />);

    await user.click(screen.getByRole("button", { name: "Executar etapa" }));
    await user.click(screen.getByRole("button", { name: "Próxima etapa" }));

    expect(screen.getByText("Etapa 2 de 6")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Crie um consentimento" })).toBeInTheDocument();
    expect(screen.queryByText(/✓ ambiente simulado pronto/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Executar etapa" })).toBeEnabled();
  });
});
