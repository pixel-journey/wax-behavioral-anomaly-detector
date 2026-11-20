# Low interval variance raises a soft anomaly score

> **Trust:** `educational-reference`  
> **Catalog:** `wax-ecosystem-blueprint-catalog` (private index; not this public course)

**One-sentence goal:** Teach a pure anomaly score that rises when inter-arrival intervals are highly regular (low CV / near-zero std-dev), with scripted versus organic demos — without claiming a bot verdict.

**Real code:** `npm test`. **Does not** ban or treat the score as proof.

The course is [EDUCATION.md](EDUCATION.md) (beginner, intermediate, masterclass).

## What is true (executed)

| Rule | Result |
| --- | --- |
| scripted 60 s demo (28) | anomalyScore ≥ 60, level elevated or high |
| organic demo | lower score than scripted |
| sampleSize < 5 or intervals < 4 | score forced to 25 |
| stdDev < 2 and count ≥ 8 | +20 |
| methodologyNote | rises on regular intervals; soft signal only |

## What is in the repo

| Piece | Role |
| --- | --- |
| `examples/engines.ts` | intervals, stats, anomaly formula, flags, demos |
| `examples/engines.test.ts` | scripted high, organic lower |
| `examples/live/` | optional Hyperion helpers (not in unit tests) |
| `app/page.tsx` | interactive demo |
| Docs | EDUCATION · POLICY · ARCHITECTURE · VERIFICATION-LOG |

## Run

```bash
npm install
npm test
npm run dev
```

## Best practice and the opposite

**Do** keep the engines pure.  
**Do** treat the score as one weak signal.  
**Do** corroborate with other data before any action.

**Do not** ban from the score alone.  
**Do not** claim a high score proves automation.  
**Do not** ignore the small-sample return of 25.

## Related

- `wax-organic-activity-fingerprinter`
- `wax-temporal-behavior-heatmap`

MIT — Pixel Journey
