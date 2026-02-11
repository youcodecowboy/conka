# Protocol Why v2 — Implementation Plan

**Goal:** Build a new "Protocol Why" experience (ProtocolWhySection + child components) that implements the recognition → relief → reward arc. Reuse existing copy modules and premium styles. Delivered in three phases: Phase 1 (relief/synergy-first), Phase 2 (recognition/personalization), Phase 3 (optional polish). When ready, swap the section in ProtocolPDPSections.

---

## Architecture

**Orchestrator:** `ProtocolWhySection` owns shared state and composes the journey. Children are presentational.

- **State:** `selectedSymptom: string | null`, `entryNodeIndex: number` (derived from symptom → cycle node 0–4).
- **Data:** Reuse `protocolProblemCycleCopy.ts` and `protocolSynergyCopy.ts`; add `app/lib/protocolWhyCopy.ts` for symptom entries, before/after, credibility, section headings, intervention points, and "why no all-in-one".

**Component order:** CycleRecognition (light) → CycleTrap (dark) → **Transition strip** → CycleBreak (light) → CycleTransformation (light).

**Files:**

| Path | Purpose |
|------|--------|
| `app/components/protocol/why/ProtocolWhySection.tsx` | Orchestrator: state, layout, transition strip |
| `app/components/protocol/why/CycleRecognition.tsx` | Phase 2: symptom cards |
| `app/components/protocol/why/CycleTrap.tsx` | Problem cycle — **trap aesthetic** (Phase 1) |
| `app/components/protocol/why/CycleBreak.tsx` | Intervention: two break points, synergy, refs |
| `app/components/protocol/why/CycleTransformation.tsx` | Before/after with ceremony |
| `app/lib/protocolWhyCopy.ts` | All v2-specific copy (see Copy layer) |

---

## Copy and Data Layer: `protocolWhyCopy.ts`

Single source for copywriters and legal. Export:

```typescript
// Symptom entries (Phase 2) — question-safe labels, map to cycle node index
symptomEntries: { id: string; label: string; entryNode: number }[]

// Before/after state pairs — state descriptions only, no causation claims
beforeAfterStates: { before: string; after: string }[]

// Credibility and positioning
credibilityLine: string   // e.g. "Backed by 9 peer-reviewed studies"
whyNotAllInOne: string    // e.g. "This is why we don't make an all-in-one"

// Section headings (no educational framing over cycle)
sectionHeadings: {
  recognition: string   // e.g. "Recognize yourself?"
  trap: string          // e.g. "You're in the cycle" (optional above CycleTrap)
  break: string         // e.g. "Here's how to break it"
  transformation: string // e.g. "The outcome"
}

// Break points for designer and static image (CycleBreak)
interventionPoints: {
  flow: {
    position: "stress-to-oxidative"
    label: string       // e.g. "Flow reduces pressure here"
    icon: string        // e.g. "shield" or path to SVG
  }
  clear: {
    position: "repair-to-performance"
    label: string       // e.g. "Clear builds capacity here"
    icon: string        // e.g. "wrench" or path to SVG
  }
}
```

Cycle flow for reference: **Stress ↑ → Oxidative Load ↑ → Repair ↓ → Performance ↓ → [back to Stress]**. Flow intervenes between Stress and Oxidative; Clear between Repair and Performance. Visual language: **interruption**, not addition (brake/shield icon or product color).

---

## Phase 1: Relief (MVP)

### 1. CycleTrap — Trap Aesthetic (Do Not Copy Old Cycle)

The old cycle is educational; the new one must **feel like a trap**. Even in Phase 1, apply these visual changes:

**Remove:**

- Clean, bright aesthetic
- Equal visual weight on all nodes
- Passive "click to learn" framing
- Any "educational" heading above the cycle (use `sectionHeadings.trap` only if desired, minimal)

**Add:**

- **Darker background:** Darker than current black strip (e.g. radial gradient center ~8% to edges 0%).
- **Vignette:** Edges fade to black (e.g. `::before` overlay: transparent at center 40%, dark at 100%).
- **Heavier nodes:** Thicker borders, more shadow; nodes feel substantial.
- **Active vs inactive:** Active node **glows**; inactive nodes **dimmer** (e.g. `opacity: 0.4`, optional `filter: grayscale(0.3)`).
- Content still from `protocolProblemCycleSteps` (ring + primary/secondary tiles); interaction stays (click to select step). Tone is set by container styling only.

**Implementation sketch (CycleTrap container):**

```css
.cycle-trap-container {
  background: radial-gradient(
    circle at center,
    hsl(0, 0%, 8%) 0%,
    hsl(0, 0%, 4%) 70%,
    hsl(0, 0%, 0%) 100%
  );
  position: relative;
}

.cycle-trap-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 40%,
    rgba(0, 0, 0, 0.6) 100%
  );
  pointer-events: none;
}

.cycle-node:not(.active) {
  opacity: 0.4;
  filter: grayscale(0.3);
}
```

Use `prefers-reduced-motion` if you add any motion later. No pulsing/speeding (per prior decision).

### 2. Transition Strip (Trap → Break)

Insert a **single transitional element** between CycleTrap and CycleBreak to create relief.

- **Height:** ~100–200px (e.g. 160px).
- **Visual:** Gradient from dark (top, match Trap) to light (bottom, match page).
- **Optional:** Single centered line: "But there's a way out." (from copy). Gradient alone can suffice.
- **Markup:** In `ProtocolWhySection`, between `<CycleTrap />` and `<CycleBreak />`; `aria-hidden="true"` if decorative.

```css
.cycle-transition {
  height: 160px;
  background: linear-gradient(
    to bottom,
    hsl(0, 0%, 4%) 0%,
    hsl(0, 0%, 98%) 100%
  );
  position: relative;
}

.cycle-transition-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center top,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
}
```

### 3. CycleBreak — Two Break Points (Specific)

- **Synergy-first:** Lead with "the intervention needs two forces."
- **Break point positions (for designer and static image):**
  - **Flow:** Stress → Oxidative (reduces pressure). Use `interventionPoints.flow` (position, label, icon).
  - **Clear:** Repair → Performance (builds capacity). Use `interventionPoints.clear`.
- **Static image(s):** One image showing cycle + two break points, or two images (cycle intact / cycle broken). Arrows between nodes where intervention happens; visual = interruption (brake/shield or product color). Skip "one formula alone" unless legal approves.
- **Copy:** `protocolSynergyCopy` for mechanisms + synergy; `protocolWhyCopy.whyNotAllInOne` after break points.
- **Credibility:** One line from `protocolWhyCopy.credibilityLine`; expand to full list (overlay/modal), not accordion.

### 4. CycleTransformation — Ceremony and Hierarchy

- **Label above:** Small heading from `sectionHeadings.transformation` (e.g. "The outcome").
- **Desktop:** Two-column table: "Before Protocol" | "After Protocol" with pairs from `beforeAfterStates`.
- **Mobile:** Each pair as its own card with **arrow between states** (before → after) to suggest movement/transformation, not just comparison.
- **Microcopy below table:** "Not claims. States." (legal safety + transparency).

**Layout sketch:**

```
Desktop:
┌─────────────────────────────────────────────┐
│  The outcome                                 │
├──────────────────┬──────────────────────────┤
│  Before Protocol │  After Protocol           │
├──────────────────┼──────────────────────────┤
│  3pm crash       │  Stable energy            │
│  Racing thoughts │  Clear focus              │
│  Slow recovery   │  Bounce back               │
│  Stress→exhaustion│  Stress→adaptation       │
└──────────────────┴──────────────────────────┘
Not claims. States.

Mobile:
┌─────────────────────────┐
│  3pm crash              │
│        ↓                │
│  Stable energy          │
└─────────────────────────┘
(repeat per pair)
```

### 5. ProtocolWhySection (Phase 1)

- Renders: CycleTrap → transition strip → CycleBreak → CycleTransformation.
- No symptom state yet; cycle `initialNode={0}`.
- Reuse `premium-section`, `premium-container`, etc.

### 6. Integration

- In `ProtocolPDPSections.tsx` (mobile and desktop): replace "Why two formulas" heading + `ProtocolProblemSection` + `ProtocolSolutionInteractive` with same heading + `<ProtocolWhySection protocolId={protocolId} />`.

---

## Phase 2: Recognition

- **CycleRecognition:** Light section above Trap. Heading from `sectionHeadings.recognition`. Four symptom cards from `symptomEntries`; on select, `onSelect(symptomId)` → parent sets `selectedSymptom` and derives `entryNodeIndex`.
- **ProtocolWhySection:** Holds `selectedSymptom` and `entryNodeIndex`; passes `initialNode={entryNodeIndex}` to CycleTrap.
- **CycleTrap:** Accepts `initialNode`; sets initial selected step to that index so the cycle "starts" at the user's entry point.
- **Arc:** Recognition (light) → Trap (dark) → transition → Break → Transformation (light).

---

## Phase 3: Polish (Optional)

- No pulsing/speeding nodes.
- Optional: CSS-only micro-interactions (e.g. hover, "release" feel); respect `prefers-reduced-motion`.
- Optional: Animated diagram (e.g. cycle reversing) only if static version is live and worth the investment.

---

## Implementation Order

1. **Copy:** Add `app/lib/protocolWhyCopy.ts` with `symptomEntries`, `beforeAfterStates`, `credibilityLine`, `whyNotAllInOne`, `sectionHeadings`, `interventionPoints`.
2. **Phase 1:** CycleTrap (trap styling, no copy of old aesthetic), transition strip, CycleBreak (break points + refs), CycleTransformation (table + mobile cards + microcopy), ProtocolWhySection.
3. **Integrate:** Swap in ProtocolPDPSections.
4. **Phase 2:** CycleRecognition, state in ProtocolWhySection, `initialNode` in CycleTrap.
5. **Phase 3:** Optional polish.

No feature flags or A/B. Old components remain for reference only.
