# wax-behavioral-anomaly-detector

> **Status:** 🔄 Promoted from concept (PX Perfection Standard v1.1)  
> **Category:** Forensics / behavioral analytics  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**Goal:** Score **timing regularity anomalies** from action timestamps — high score when inter-arrival intervals look machine-like (low variance). Soft investigative signal.

Complements `wax-organic-activity-fingerprinter` (HCI rewards variance; this score rises when variance collapses).

---

## Quick Start

```ts
import { detectAnomalies } from "./examples/engines";

const result = detectAnomalies(unixSecondTimestamps);
// result.anomalyScore, result.level, result.flags
```

## Architecture

```
timestamps → intervals → stats → anomalyScore + flags
```

## Limitations

- Timing only
- Small samples flagged
- Not proof of bots; corroborate with funding / Sybil tools

## License

MIT — **Pixel Journey**

*Promoted from README-only concept: October 2026*
