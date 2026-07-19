import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SdkModules } from "./SdkModules.tsx";

describe("SdkModules", () => {
  it("groups the SDK modules and keeps each representative method visible", () => {
    render(<SdkModules />);

    expect(screen.getByRole("heading", { name: "O SDK, módulo por módulo." })).toBeInTheDocument();
    expect(screen.getByText("Fluxo principal")).toBeInTheDocument();
    expect(screen.getByText("Ferramentas do sandbox")).toBeInTheDocument();
    expect(screen.getByText("jatai.auth")).toBeInTheDocument();
    expect(screen.getByText("auth.createConsent()")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^Ver exemplo de/ })).toHaveLength(5);
  });

  it("associates every terminal icon with a compact call and simulated response", () => {
    render(<SdkModules />);

    const preview = screen.getByRole("button", { name: "Ver exemplo de jatai.auth" });
    const popups = screen.getAllByRole("tooltip");
    const popup = popups[0];

    expect(popups).toHaveLength(5);
    expect(preview).toHaveAttribute("aria-describedby", "sdk-preview-auth");
    expect(popup).toHaveTextContent("await jatai.auth.createConsent");
    expect(popup).toHaveTextContent('status: "AWAITING_AUTHORISATION"');
    expect(popup).not.toHaveTextContent("Mel:");
  });
});
