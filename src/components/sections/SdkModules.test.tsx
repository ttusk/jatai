import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SdkModules } from "./SdkModules.tsx";

describe("SdkModules", () => {
  it("groups the SDK modules and keeps each representative method visible", () => {
    const { container } = render(<SdkModules />);

    expect(screen.getByRole("heading", { name: "O SDK, módulo por módulo." })).toBeInTheDocument();
    expect(screen.getByText("Fluxo principal")).toBeInTheDocument();
    expect(screen.getByText("Ferramentas do sandbox")).toBeInTheDocument();
    expect(screen.getByText("jatai.auth")).toBeInTheDocument();
    expect(screen.getByText("auth.createConsent()")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Ver exemplo de/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(screen.queryByText("Rever no playground")).not.toBeInTheDocument();
    expect(container.querySelector("[data-sdk-table]")).not.toHaveClass("border-y");
    container.querySelectorAll("[data-sdk-row]").forEach((row) => {
      expect(row).not.toHaveClass("border-b");
    });
  });
});
