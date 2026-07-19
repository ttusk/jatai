import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroTerminal } from "./HeroTerminal";

describe("HeroTerminal", () => {
  it("renders the complete execution without scroll-animation hooks", () => {
    const { container } = render(<HeroTerminal />);

    expect(screen.getByLabelText("Prévia do SDK Jataí")).toBeInTheDocument();
    expect(container.querySelector("[data-hero-terminal]")).not.toBeNull();
    expect(container.querySelectorAll("[data-terminal-execution]")).toHaveLength(1);
    expect(container.querySelector("[data-terminal-sequence]")).toBeNull();
    expect(container.querySelector("[data-terminal-char]")).toBeNull();
    expect(container.querySelector("[data-terminal-output]")).toBeNull();
    expect(container.querySelector("[data-terminal-mel]")).toBeNull();
    expect(screen.queryByText("quickstart.ts")).not.toBeInTheDocument();
    expect(screen.queryByText("simulado")).not.toBeInTheDocument();
    expect(screen.getByLabelText("import { jatai } from '@jatai/sdk'")).toBeInTheDocument();
    expect(screen.getByText("consent.status → 'AUTHORIZED'")).toBeInTheDocument();
    expect(screen.getByText(/^🐝 Mel:/)).toBeInTheDocument();
  });
});
