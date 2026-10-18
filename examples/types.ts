/**
 * Types for educational behavioral anomaly scoring from action timestamps.
 */

export type ActionTimestamp = number;

export interface IntervalStats {
  count: number;
  meanSeconds: number;
  stdDevSeconds: number;
  coefficientOfVariation: number;
}

export interface AnomalyResult {
  sampleSize: number;
  intervals: IntervalStats;
  /** 0–100; higher = more anomalous / machine-like under heuristics */
  anomalyScore: number;
  level: "normal" | "elevated" | "high";
  flags: AnomalyFlag[];
  methodologyNote: string;
}

export type FlagLevel = "info" | "warn" | "alert";

export interface AnomalyFlag {
  id: string;
  level: FlagLevel;
  message: string;
  trigger: string;
}
