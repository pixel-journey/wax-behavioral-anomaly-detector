/**
 * Live Hyperion adapter — network only.
 * Pure scoring stays in examples/engines.ts.
 */

import { HISTORY_ORIGINS, actionsUrl } from "./origins";

/** Kept so older notes can name it. get_actions on this host returned 404 on 2026-10-26. */
export const DEFAULT_HYPERION = "https://wax.eosrio.io";
export { HISTORY_ORIGINS };

export interface HyperionActionRow {
  timestamp?: string;
  "@timestamp"?: string;
  act?: { account?: string; name?: string };
}

export interface HyperionActionsResponse {
  actions?: HyperionActionRow[];
}

export function parseActionTimestamp(row: HyperionActionRow): number | null {
  const raw = row.timestamp || row["@timestamp"];
  if (!raw) return null;
  const ms = Date.parse(raw);
  if (Number.isNaN(ms)) return null;
  return Math.floor(ms / 1000);
}

export async function fetchAccountActionTimestamps(
  account: string,
  options: {
    hyperionBase?: string;
    limit?: number;
    signal?: AbortSignal;
  } = {}
): Promise<{ timestamps: number[]; source: string; rawCount: number }> {
  const limit = options.limit ?? 100;
  const custom = options.hyperionBase?.trim();
  const order = custom ? [custom] : [...HISTORY_ORIGINS];
  const errors: string[] = [];

  for (const origin of order) {
    const built = actionsUrl(origin, account, limit);
    if (!built.ok) {
      errors.push(built.reason);
      if (custom) break;
      continue;
    }
    try {
      const res = await fetch(built.url, {
        signal: options.signal,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        errors.push(`${origin} HTTP ${res.status}`);
        continue;
      }
      const data = (await res.json()) as HyperionActionsResponse;
      const rows = data.actions ?? [];
      const timestamps: number[] = [];
      for (const row of rows) {
        const t = parseActionTimestamp(row);
        if (t != null) timestamps.push(t);
      }
      timestamps.sort((a, b) => a - b);
      return { timestamps, source: built.url, rawCount: rows.length };
    } catch (error) {
      if (options.signal?.aborted) throw error;
      errors.push(`${origin} ${error instanceof Error ? error.message : "failed"}`);
    }
  }

  throw new Error(errors.join("; ") || "No history origin left");
}
