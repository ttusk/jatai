import { describe, expect, it } from "vitest";
import { showcaseSteps } from "./scenario";

describe("showcaseSteps", () => {
  it("defines the six-step terminal walkthrough", () => {
    expect(showcaseSteps).toHaveLength(6);
    expect(showcaseSteps.map((step) => step.id)).toEqual([
      "install",
      "consent",
      "accounts",
      "payment",
      "callback",
      "review",
    ]);
  });

  it("keeps the copy terse and limits Mel to three useful interventions", () => {
    expect(showcaseSteps.filter((step) => step.mel)).toHaveLength(3);

    for (const step of showcaseSteps) {
      expect(step.label).not.toHaveLength(0);
      expect(step.command).not.toHaveLength(0);
      expect(step.output.length).toBeGreaterThan(0);
      expect(step.output.every((line) => line.length < 72)).toBe(true);
    }
  });
});
