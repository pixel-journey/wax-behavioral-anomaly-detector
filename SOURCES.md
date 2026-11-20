# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX context |
| [organic fingerprinter](https://github.com/pixel-journey/wax-organic-activity-fingerprinter) | Inverse HCI framing |
| [temporal heatmap](https://github.com/pixel-journey/wax-temporal-behavior-heatmap) | Grid view |
| [POLICY.md](POLICY.md) | Soft-signal rules |

## Product facts locked by tests

- Scripted demo → anomalyScore **98**, level **`high`** (≥70), near-zero-variance flag.
- Organic demo → **56**, **`elevated`** (≥45), flag `neutral`.
- Sample size < 5 or intervals < 4 → score **25**.
- Cap is **98** (not 100) so perfect regularity still is not a perfect certainty.
- History origin helpers: https only, no path, limit ≤200, **unsent**.
- **Not** a production ban engine.
