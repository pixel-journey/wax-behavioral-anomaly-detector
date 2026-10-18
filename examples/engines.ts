/**
 * Pure anomaly heuristics from inter-action intervals.
 * Complements organic fingerprinter (humanity) with anomaly (deviation) framing.
 */

import type {
  ActionTimestamp,
  AnomalyFlag,
  AnomalyResult,
  IntervalStats,
} from "./types";

export function computeIntervals(timestamps: ActionTimestamp[]): number[] {
  if (timestamps.length < 2) return [];
  const sorted = [...timestamps].sort((a, b) => a - b);
  const out: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const d = sorted[i] - sorted[i - 1];
    if (d >= 0) out.push(d);
  }
  return out;
}

export function computeIntervalStats(intervals: number[]): IntervalStats {
  const count = intervals.length;
  if (count === 0) {
    return {
      count: 0,
      meanSeconds: 0,
      stdDevSeconds: 0,
      coefficientOfVariation: 0,
    };
  }
  const mean = intervals.reduce((s, x) => s + x, 0) / count;
  const variance =
    intervals.reduce((s, x) => s + (x - mean) ** 2, 0) / count;
  const stdDev = Math.sqrt(variance);
  return {
    count,
    meanSeconds: mean,
    stdDevSeconds: stdDev,
    coefficientOfVariation: mean === 0 ? 0 : stdDev / mean,
  };
}

/**
 * Anomaly score: low variance + enough samples → higher anomaly.
 * Inverse framing vs HCI (which rewards variance).
 */
export function anomalyScoreFromStats(
  stats: IntervalStats,
  sampleSize: number
): number {
  if (sampleSize < 5 || stats.count < 4) return 25;

  const cv = stats.coefficientOfVariation;
  // Low CV → high anomaly contribution
  const regularity = Math.max(0, 1 - Math.min(1, cv / 1.0));
  let score = 20 + regularity * 60;

  if (stats.stdDevSeconds < 2 && stats.count >= 8) score += 20;
  if (sampleSize >= 30) score += 5;

  return Math.round(Math.max(5, Math.min(98, score)));
}

export function classifyAnomaly(
  score: number
): AnomalyResult["level"] {
  if (score >= 70) return "high";
  if (score >= 45) return "elevated";
  return "normal";
}

export function buildAnomalyFlags(
  stats: IntervalStats,
  sampleSize: number,
  score: number
): AnomalyFlag[] {
  const flags: AnomalyFlag[] = [];

  if (sampleSize < 10) {
    flags.push({
      id: "small-sample",
      level: "warn",
      message: "Small sample — anomaly score is weak evidence.",
      trigger: "sampleSize",
    });
  }

  if (stats.count >= 8 && stats.stdDevSeconds < 2) {
    flags.push({
      id: "near-zero-variance",
      level: "alert",
      message:
        "Near-zero inter-arrival variance — consistent with fixed-interval automation.",
      trigger: "stdDevSeconds",
    });
  }

  if (stats.coefficientOfVariation > 1.2 && stats.count >= 8) {
    flags.push({
      id: "high-cv",
      level: "info",
      message: "High timing spread — less consistent with rigid scripts.",
      trigger: "coefficientOfVariation",
    });
  }

  if (score >= 70) {
    flags.push({
      id: "high-anomaly",
      level: "warn",
      message:
        "High anomaly score is still a soft signal — corroborate with funding and social graph.",
      trigger: "anomalyScore",
    });
  }

  if (flags.length === 0) {
    flags.push({
      id: "neutral",
      level: "info",
      message: "No strong structural anomaly flags on timing alone.",
      trigger: "overall",
    });
  }

  return flags;
}

export function detectAnomalies(
  timestamps: ActionTimestamp[]
): AnomalyResult {
  const intervals = computeIntervals(timestamps);
  const stats = computeIntervalStats(intervals);
  const sampleSize = timestamps.length;
  const anomalyScore = anomalyScoreFromStats(stats, sampleSize);
  return {
    sampleSize,
    intervals: stats,
    anomalyScore,
    level: classifyAnomaly(anomalyScore),
    flags: buildAnomalyFlags(stats, sampleSize, anomalyScore),
    methodologyNote:
      "Anomaly score rises when inter-action intervals are highly regular (low CV / near-zero std-dev). Soft signal only.",
  };
}

export function demoOrganicTimestamps(count = 28): ActionTimestamp[] {
  const out: ActionTimestamp[] = [];
  let t = 1_700_000_000;
  for (let i = 0; i < count; i++) {
    out.push(t);
    t += 600 + (i * 97) % 7200;
  }
  return out;
}

export function demoScriptedTimestamps(count = 28): ActionTimestamp[] {
  const out: ActionTimestamp[] = [];
  let t = 1_700_000_000;
  for (let i = 0; i < count; i++) {
    out.push(t);
    t += 60;
  }
  return out;
}
