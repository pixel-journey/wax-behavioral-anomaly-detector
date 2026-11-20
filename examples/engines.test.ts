import { describe, expect, it } from "vitest";
import {
  demoOrganicTimestamps,
  demoScriptedTimestamps,
  detectAnomalies,
} from "./engines";

describe("detectAnomalies", () => {
  it("scripted intervals score 98, the formula cap", () => {
    const r = detectAnomalies(demoScriptedTimestamps(28));
    expect(r.anomalyScore).toBe(98);
    expect(r.level).toBe("high");
    expect(r.flags.map((flag) => flag.id)).toEqual(["near-zero-variance", "high-anomaly"]);
  });

  it("organic intervals score 56 and stay elevated", () => {
    const r = detectAnomalies(demoOrganicTimestamps(28));
    expect(r.anomalyScore).toBe(56);
    expect(r.level).toBe("elevated");
    expect(r.flags.map((flag) => flag.id)).toEqual(["neutral"]);
  });

  it("forces a sample shorter than 5 to 25", () => {
    expect(detectAnomalies([1_000, 1_060, 1_120]).anomalyScore).toBe(25);
  });
});
