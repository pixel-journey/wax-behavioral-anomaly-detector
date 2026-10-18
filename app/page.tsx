'use client';

import React, { useMemo, useState } from 'react';
import {
  demoOrganicTimestamps,
  demoScriptedTimestamps,
  detectAnomalies,
} from '../examples/engines';

type Mode = 'organic' | 'scripted';

export default function BehavioralAnomalyDetector() {
  const [mode, setMode] = useState<Mode>('scripted');
  const result = useMemo(() => {
    const ts =
      mode === 'organic'
        ? demoOrganicTimestamps(28)
        : demoScriptedTimestamps(28);
    return detectAnomalies(ts);
  }, [mode]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-2xl tracking-widest text-amber-400 mb-2 font-bold">
          BEHAVIORAL ANOMALY DETECTOR
        </div>
        <div className="text-xs opacity-60 mb-6">
          Pixel Journey · Timing regularity · Soft signal only
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode('scripted')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'scripted' ? 'bg-amber-600' : 'bg-white/10'
            }`}
          >
            Demo scripted (60s)
          </button>
          <button
            type="button"
            onClick={() => setMode('organic')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'organic' ? 'bg-emerald-600' : 'bg-white/10'
            }`}
          >
            Demo organic
          </button>
        </div>

        <div className="border border-white/10 bg-black/40 p-6 rounded-2xl mb-6">
          <div className="text-center mb-6">
            <div className="text-sm opacity-70">ANOMALY SCORE</div>
            <div className="text-6xl font-mono text-amber-400 mt-1">
              {result.anomalyScore}
            </div>
            <div className="text-sm text-amber-200/80 mt-1">{result.level}</div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="opacity-70">Sample size</span>
              <span className="font-mono">{result.sampleSize}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="opacity-70">Std dev (s)</span>
              <span className="font-mono">
                {result.intervals.stdDevSeconds.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="opacity-70">CV</span>
              <span className="font-mono">
                {result.intervals.coefficientOfVariation.toFixed(3)}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs opacity-60">{result.methodologyNote}</p>

          <ul className="mt-4 space-y-1 text-xs opacity-80">
            {result.flags.map((f) => (
              <li key={f.id}>
                [{f.level}] {f.message}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs opacity-60">
          Pass Hyperion action timestamps into{' '}
          <code className="text-amber-400/80">detectAnomalies</code>. Pairs with{' '}
          organic fingerprinter (HCI) and temporal heatmap.
        </p>
      </div>
    </div>
  );
}
