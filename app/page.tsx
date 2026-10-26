'use client';

import React, { useCallback, useMemo, useState } from 'react';
import {
  demoOrganicTimestamps,
  demoScriptedTimestamps,
  detectAnomalies,
} from '../examples/engines';
import { fetchAccountActionTimestamps } from '../examples/live/hyperion';
import type { AnomalyResult } from '../examples/types';

type Mode = 'live' | 'scripted' | 'organic';

export default function BehavioralAnomalyDetector() {
  const [mode, setMode] = useState<Mode>('live');
  const [account, setAccount] = useState('eosio');
  const [origin, setOrigin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liveResult, setLiveResult] = useState<AnomalyResult | null>(null);
  const [meta, setMeta] = useState<string | null>(null);

  const demoResult = useMemo(() => {
    if (mode === 'scripted') return detectAnomalies(demoScriptedTimestamps(28));
    if (mode === 'organic') return detectAnomalies(demoOrganicTimestamps(28));
    return null;
  }, [mode]);

  const result = mode === 'live' ? liveResult : demoResult;

  const runLive = useCallback(async () => {
    setLoading(true);
    setError(null);
    setMeta(null);
    try {
      const { timestamps, source, rawCount } =
        await fetchAccountActionTimestamps(account, {
          limit: 100,
          hyperionBase: origin.trim() || undefined,
        });
      if (timestamps.length < 2) {
        setError('Not enough actions returned to score intervals.');
        setLiveResult(null);
        return;
      }
      setLiveResult(detectAnomalies(timestamps));
      setMeta(`${rawCount} actions from Hyperion · ${source}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Live fetch failed');
      setLiveResult(null);
    } finally {
      setLoading(false);
    }
  }, [account, origin]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-2xl tracking-widest text-amber-400 mb-2 font-bold">
          BEHAVIORAL ANOMALY DETECTOR
        </div>
        <div className="text-xs opacity-60 mb-6">
          Pixel Journey · Live Hyperion or demo · Soft signal only
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMode('live')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'live' ? 'bg-sky-600' : 'bg-white/10'
            }`}
          >
            Live Hyperion
          </button>
          <button
            type="button"
            onClick={() => setMode('scripted')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'scripted' ? 'bg-amber-600' : 'bg-white/10'
            }`}
          >
            Demo scripted
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

        {mode === 'live' && (
          <div className="border border-white/10 bg-black/40 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row gap-3">
            <input
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm"
              placeholder="WAX account"
            />
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm"
              placeholder="Custom history origin (optional)"
            />
            <button
              type="button"
              onClick={runLive}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-sky-600 text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Fetching…' : 'Analyze live'}
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-400 border border-red-500/30 rounded-xl p-3">
            {error}
          </div>
        )}
        {meta && (
          <div className="mb-4 text-xs opacity-50 break-all">{meta}</div>
        )}

        {result && (
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
        )}

        {!result && mode === 'live' && !loading && !error && (
          <p className="text-sm opacity-50 mb-6">
            Enter a WAX account and fetch recent Hyperion actions.
          </p>
        )}

        <p className="text-xs opacity-60">
          Live path: Hyperion → timestamps →{' '}
          <code className="text-amber-400/80">detectAnomalies</code>. Demo path stays
          offline.
        </p>
      </div>
    </div>
  );
}
