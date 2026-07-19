import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroTerminal } from "./HeroTerminal";

describe("HeroTerminal", () => {
  it("marks command, output, and Mel content for one scroll-scrubbed timeline", () => {
    const { container } = render(<HeroTerminal />);

    expect(screen.getByLabelText("Prévia do SDK Jataí")).toBeInTheDocument();
    expect(container.querySelector("[data-hero-terminal]")).not.toBeNull();
    expect(container.querySelectorAll("[data-terminal-execution]")).toHaveLength(1);
    expect(screen.queryByText("quickstart.ts")).not.toBeInTheDocument();
    expect(screen.queryByText("simulado")).not.toBeInTheDocument();
    expect(container.querySelectorAll("[data-terminal-char]").length).toBeGreaterThan(40);
    expect(container.querySelectorAll("[data-terminal-output]")).toHaveLength(2);
    expect(container.querySelectorAll("[data-terminal-mel]")).toHaveLength(1);
    expect(screen.getByText(/^🐝 Mel:/)).toBeInTheDocument();
  });
});
