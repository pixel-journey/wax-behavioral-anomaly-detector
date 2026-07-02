# wax-behavioral-anomaly-detector — Behavioral Anomaly Detector

> **Status:** 🔒 Private (In Development) | Target Public Release: August 2026  
> **Category:** Community Forensics, Identity Alignment & Sybil Detection  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**A line-graphing suite highlighting transaction timeline deviations, quickly isolating accounts whose operational frequencies depart from typical human habits on WAX.**

---

## 1. Overview & Goal

This blueprint provides an intuitive forensic dashboard that analyzes on-chain activity patterns to flag wallets exhibiting non-human (bot-like or scripted) behavior. It focuses on timing anomalies, frequency spikes, and regularity that deviate from organic user patterns.

**Why it matters for WAX/Antelope:**
Sybil attacks, airdrop farming, and automated trading bots are common. This tool helps communities, DAOs, and projects identify suspicious activity transparently using only public data.

Uses exclusively **public infrastructure** (Hyperion history + on-chain actions).

**Target users:** DAO operators, airdrop organizers, community moderators, forensic analysts, security researchers.

**Success metrics:**
- Clear visual separation of human vs. anomalous patterns
- Fast scanning of large account sets
- Actionable flags with explanations

---

## 2. Concepts & Inspiration

**Core concepts:**
- Transaction timing entropy and inter-arrival times
- Action type frequency distributions
- Deviation scoring from baseline human behavior
- Historical pattern analysis via Hyperion

**User pain points:**
Manual review of transaction histories is slow and error-prone. Projects need scalable, visual tools to detect coordinated or automated activity.

**Inspirations:**
- On-chain forensics tools (Nansen, Arkham style but WAX-native)
- Statistical process control charts
- GitHub contribution heatmaps for activity regularity

**Related blueprints:** Pairs beautifully with `wax-account-sybil-distance-scorer`, `wax-organic-activity-fingerprinter`, `wax-funding-trail-lineage-graph`, and `wax-temporal-behavior-heatmap`.

---

## 3. Design Specifications (Pixel Journey Standards)

### 3.1 Visual & Interaction Design
- Dashboard layout: Account search/input + main anomaly timeline chart
- Clean line/area charts showing activity over time with anomaly highlights
- Color system: Normal = calm blue, Anomalous = warning orange/red
- Sidebar: Key metrics and anomaly score breakdown
- Responsive with good mobile table views

### 3.2 Key Views / Components
- `ActivityTimelineChart.tsx` — Main interactive line chart with anomaly markers
- `AnomalyScoreCard.tsx` — Prominent score with breakdown (timing regularity, frequency spikes, etc.)
- `AccountSearch.tsx` — Search or paste wallet address
- `PatternComparison.tsx` — Side-by-side comparison with "typical human" baseline

### 3.3 Accessibility (A11y) & Inclusive Design
- WCAG 2.2 AA
- Full keyboard and screen reader support
- Clear textual explanations of why something is flagged
- Reduced motion mode

### 3.4 Performance & Optimization Targets
- Efficient Hyperion queries with smart caching
- Client-side anomaly scoring for speed
- Bundle size optimized

---

## 4. Technical Architecture

### 4.1 Core Tech Stack (Standardized)
- **Framework:** Next.js 15 (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui
- **State & Data:** @tanstack/react-query + zod
- **Blockchain Data:** Hyperion (`https://api.waxsweden.org`) for action history and timestamps
- **Visualization:** Recharts or custom Canvas for timelines
- **Utilities:** date-fns (for time analysis), lucide-react, sonner

### 4.2 Data Flow Diagram
```
User inputs wallet address
    ↓
Hyperion Action History Fetch
    ↓
Client-side Feature Extraction (inter-arrival times, frequency, regularity)
    ↓
Anomaly Scoring Engine (statistical deviation)
    ↓
React Query Cache
    ↓
Beautiful Timeline + Score Breakdown
```

### 4.3 Folder Structure
```
app/
├── (dashboard)/
│   └── page.tsx
├── components/
│   ├── chart/
│   │   └── ActivityTimelineChart.tsx
│   ├── cards/
│   │   └── AnomalyScoreCard.tsx
│   └── search/
│       └── AccountSearch.tsx
├── hooks/
│   ├── useAccountActivity.ts
│   └── useAnomalyAnalysis.ts
├── lib/
│   ├── wax/
│   │   ├── hyperion-client.ts
│   │   └── anomaly-scorer.ts
│   └── utils.ts
├── types/
│   └── index.ts
public/
└── mock-data/
```

### 4.4 Security & Privacy Notes
- Read-only public data only
- No PII collection
- Clear disclaimers that flags are probabilistic indicators, not definitive proof

---

## 5. Implementation Examples & Code Snippets

**1. Core anomaly scoring logic (simplified)**
```ts
// lib/wax/anomaly-scorer.ts
export function calculateAnomalyScore(actions: Action[]) {
  const interArrivalTimes = calculateInterArrivalTimes(actions);
  const regularityScore = calculateRegularity(interArrivalTimes); // low entropy = more bot-like
  const frequencySpikes = detectSpikes(actions);
  return { regularityScore, frequencySpikes, overallAnomaly: ... };
}
```

**2. Data fetching hook**
```ts
// hooks/useAccountActivity.ts
export function useAccountActivity(account: string) {
  return useQuery({
    queryKey: ['account-activity', account],
    queryFn: () => fetchHyperionActions(account),
  });
}
```

---

## 6. Demo & Testing Strategy
- Live Demo Toggle with realistic mock data
- Strong test coverage for scoring logic
- Playwright flows for search → analysis journey
- Clear educational tooltips explaining each metric

---

## 7. Roadmap & Development Phases

**Phase 0 — Scaffold (1 day)**

**Phase 1 — Data Layer (3 days)**

**Phase 2 — Core UI (4 days)**

**Phase 3 — Polish (2 days)**

**Phase 4 — Documentation & Release (2 days)**

Follows standard template phases.

---

## 8. Visual References & Mockups
The timeline should feel like a clean forensics or monitoring dashboard (inspired by professional tools but accessible). Anomaly regions highlighted with explanatory callouts.

---

## 9. Related Blueprints & Ecosystem Fit
- `wax-account-sybil-distance-scorer` — Combine for stronger Sybil signals
- `wax-organic-activity-fingerprinter` — Complementary human-likeness scoring
- `wax-temporal-behavior-heatmap` — Activity density view

---

## 10. License, Contributing & Credits
- MIT License
- Powered by public Hyperion infrastructure
- Pixel Journey Design System

**Pixel Journey — Beautiful interfaces for public blockchain data.**
