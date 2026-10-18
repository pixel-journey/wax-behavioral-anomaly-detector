"use client";

import { useId } from "react";
import type { AnomalyResult, FlagLevel } from "./types";

export function AnomalyGauge({
  result,
  className = "",
}: {
  result: AnomalyResult;
  className?: string;
}) {
  const headingId = useId();
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/30 p-6 text-center ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="text-xs uppercase tracking-wider text-white/50">
        Anomaly score (heuristic)
      </h3>
      <p className="mt-2 font-mono text-6xl text-amber-400 tabular-nums">
        {result.anomalyScore}
      </p>
      <p className="mt-2 text-sm text-amber-200/80">{result.level}</p>
      <p className="mt-3 text-xs text-white/40 max-w-md mx-auto leading-relaxed">
        {result.methodologyNote}
      </p>
    </section>
  );
}

export function AnomalyStats({
  result,
  className = "",
}: {
  result: AnomalyResult;
  className?: string;
}) {
  const s = result.intervals;
  return (
    <section className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}>
      <h3 className="font-semibold text-lg mb-4">Interval stats</h3>
      <dl className="space-y-2 text-sm">
        {[{
          k: "Sample size",
          v: String(result.sampleSize),
        },
        { k: "Intervals", v: String(s.count) },
        { k: "Mean gap (s)", v: s.meanSeconds.toFixed(1) },
        { k: "Std dev (s)", v: s.stdDevSeconds.toFixed(1) },
        { k: "CV", v: s.coefficientOfVariation.toFixed(3) },
        ].map((row) => (
          <div key={row.k} className="flex justify-between border-b border-white/5 pb-2">
            <dt className="text-white/50">{row.k}</dt>
            <dd className="font-mono">{row.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const levelClass: Record<FlagLevel, string> = {
  info: "border-white/10 bg-white/5 text-white/80",
  warn: "border-amber-500/30 bg-amber-500/10 text-amber-100",
  alert: "border-red-500/30 bg-red-500/10 text-red-100",
};

export function AnomalyFlags({
  result,
  className = "",
}: {
  result: AnomalyResult;
  className?: string;
}) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {result.flags.map((f) => (
        <li key={f.id} className={`rounded-xl border p-3 text-sm ${levelClass[f.level]}`}>
          {f.message}
        </li>
      ))}
    </ul>
  );
}
