# AI handoff — behavioral anomaly score

## Non-negotiables

1. Scripted demo → anomalyScore **98**, level **`high`** (≥70), near-zero-variance flag.
2. Organic demo → **56**, **`elevated`** (≥45), flag `neutral`.
3. Sample size < 5 or intervals < 4 → score **25**.
4. Cap is **98**, not 100 — perfect regularity is still not perfect certainty.
5. History URL helpers: https only, no path, limit ≤200, **unsent**.
6. **Not** a production ban engine. Inverse framing of the HCI lab (low CV raises anomaly here).

## Prompt seeds

- "Scripted vs organic demo — score and level."
- "Three timestamps — score?"
- "Compare anomaly score framing vs organic fingerprinter HCI on the same series."
- "Refuse a solo ban from a high anomaly score."

## Do not

- Call Hyperion inside unit tests.
- Treat 98 as proof of a bot.
