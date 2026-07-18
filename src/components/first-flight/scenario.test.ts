import { describe, expect, it } from "vitest";
import { firstFlightSteps } from "./scenario";

describe("firstFlightSteps", () => {
  it("defines the complete six-step Pix learning journey", () => {
    expect(firstFlightSteps).toHaveLength(6);
    expect(firstFlightSteps.map((step) => step.id)).toEqual([
      "install",
      "consent",
      "account",
      "payment",
      "callback",
      "review",
    ]);
  });

  it("keeps every simulated step executable and explainable by Mel", () => {
    for (const step of firstFlightSteps) {
      expect(step.title).not.toHaveLength(0);
      expect(step.concept).not.toHaveLength(0);
      expect(step.code).not.toHaveLength(0);
      expect(step.output.length).toBeGreaterThan(0);
      expect(step.mel.explanation).not.toHaveLength(0);
      expect(step.mel.question).not.toHaveLength(0);
    }
  });
});
