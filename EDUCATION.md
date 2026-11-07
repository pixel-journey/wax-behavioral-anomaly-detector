# Education — low variance raises the anomaly score

> **Rung:** `npm test` passes. The lab maps low coefficient of variation into a higher anomaly score. It is the inverse framing of the Humanity Certainty Index.  
> **The test is the rule.**

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Run the scripted 60 s demo and see anomaly score ≥ 60 with level elevated or high |
| Intermediate | Explain why the organic demo scores lower, and why small samples return 25 |
| Masterclass | Say why a high anomaly score is still only a soft signal |

---

## Beginner — one scene

```ts
const scripted = detectAnomalies(demoScriptedTimestamps(28));
scripted.anomalyScore >= 60
// level is "elevated" or "high"

const organic = detectAnomalies(demoOrganicTimestamps(28));
organic.anomalyScore < scripted.anomalyScore
```

The scripted demo adds a fixed 60 s every step. The organic demo adds jittered gaps.

### Words

| Word | Meaning here |
| --- | --- |
| Anomaly score | 5–98. Higher when intervals are regular (low CV) |
| Level | `high` (≥70), `elevated` (≥45), `normal` otherwise |
| Small sample | sampleSize < 5 or intervals < 4 → score forced to 25 |
| Near-zero | stdDev < 2 and count ≥ 8 adds +20 |

### Predict, then run

```bash
npm test
```

1. Scripted demo anomalyScore ≥ 60 and level is elevated or high.
2. Organic demo anomalyScore is lower than the scripted demo.

---

## Intermediate — the inverse of HCI

`anomalyScoreFromStats`:

- Early return 25 on insufficient data.
- `regularity = max(0, 1 - min(1, CV / 1.0))`
- Base: `20 + regularity * 60`
- +20 if near-zero stdDev with enough intervals
- +5 if sampleSize ≥ 30
- Clamp 5–98 and round

This is the complement of the fingerprinter: there high CV raises the index; here low CV raises the score.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Treat high score as a ban | Sole decision | soft signal; flags warn to corroborate | engines.test.ts + POLICY |
| Ignore sample size | Over-confident | forced 25 | early return |
| Call Hyperion from the unit test | Network | pure local demos | engines.test.ts |
| Claim scripted is always a bot | False positive | level is a label on the score | classification of scripted |

---

## Masterclass — regularity is not proof of automation

A person can set a reminder. A bot can add jitter. The score only measures how regular the intervals you supplied were.

What is still not here:

- Live Hyperion data in the unit-test path.
- Funding or social corroboration.
- A calibrated false-positive rate.
- Any claim that a high score proves a bot.

Companion: `wax-organic-activity-fingerprinter` (rewards variance).

### Exercise

1. Why does the scripted demo score high? (Fixed 60 s → near-zero stdDev and low CV. Tested.)
2. What score does a 3-timestamp series receive? (25.)
3. Is a high anomaly score a ban reason? (No. Soft signal only.)

---

## What this course will not teach

- How to ban from timing regularity alone
- A production anomaly detector
- Identity verification
