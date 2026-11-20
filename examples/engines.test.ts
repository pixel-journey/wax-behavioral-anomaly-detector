import { describe, expect, it } from "vitest";
import {
  demoOrganicTimestamps,
  demoScriptedTimestamps,
  detectAnomalies,
} from "./engines";

describe("detectAnomalies", () => {
  it("scripted intervals score high",
    () => {
      const r = detectAnomalies(demoScriptedTimestamps(28));
      expect(r.anomalyScore).toBeGreaterThanOrEqual(60);
      expect(["elevated", "high"]).toContain(r.level);
    });

  it("organic intervals score lower",
    () => {
      const r = detectAnomalies(demoOrganicTimestamps(28));
      expect(r.anomalyScore).toBeLessThan(
        detectAnomalies(demoScriptedTimestamps(28)).anomalyScore
      );
    });

  it("forces a sample shorter than 5 to 25", () => {
    expect(detectAnomalies([1_000, 1_060, 1_120]).anomalyScore).toBe(25);
  });
});
