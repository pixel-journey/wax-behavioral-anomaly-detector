# ARCHITECTURE.md — Behavioral Anomaly Detector

## Invariants

1. Pure functions of timestamps
2. No Math.random analysis scores
3. Soft signal disclaimers required

## Flow

```
Hyperion times → detectAnomalies → gauge / stats / flags
```

---

*Pixel Journey*
