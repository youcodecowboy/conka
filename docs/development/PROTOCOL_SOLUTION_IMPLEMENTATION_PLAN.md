# Protocol Solution Component — Implementation Plan

**Goal:** Create an interactive, premium component showing how Flow + Clear work together to solve the problem cycle.

**Component:** `ProtocolSolutionInteractive.tsx` (replaces `ProtocolSolutionSection.tsx`)

**Approach:** Dual-bottle interactive with expandable details on tap.

---

## Visual Concept

You'll create **one asset**: A split image showing two bottles side-by-side (Flow left, Clear right), no background.

**Layout:**
```
┌─────────────────────────────────────────┐
│         [Split Bottle Asset]            │
│    [Flow Bottle]    [Clear Bottle]      │
│         ↓                ↓              │
│    [Tap to expand]  [Tap to expand]     │
└─────────────────────────────────────────┘
```

When user taps Flow side → expands to show Flow mechanism + details
When user taps Clear side → expands to show Clear mechanism + details
When both expanded → shows synergy section below

---

## Step-by-Step Implementation

### Step 1: Update Copy Structure

**File:** `app/lib/protocolSynergyCopy.ts`

Add mechanism descriptions for Flow and Clear individually:

```typescript
export interface ProtocolSynergyCopy {
  // ... existing fields ...
  mechanisms: {
    flow: {
      title: string;           // e.g., "Flow: Reduces Pressure"
      description: string;      // How Flow works individually
      keyPoints: string[];     // 2-3 bullet points
    };
    clear: {
      title: string;           // e.g., "Clear: Strengthens Repair"
      description: string;     // How Clear works individually
      keyPoints: string[];     // 2-3 bullet points
    };
  };
  synergy: {
    title: string;             // e.g., "Together: Break the Cycle"
    description: string;       // How they work together
  };
}
```

**Action:** Expand `protocolSynergyCopy` object with `mechanisms` and `synergy` sections.

---

### Step 2: Create Component Structure

**File:** `app/components/protocol/ProtocolSolutionInteractive.tsx`

**Component structure:**

```typescript
interface ProtocolSolutionInteractiveProps {
  protocolId?: ProtocolId; // Optional, for future protocol-specific variations
}

export default function ProtocolSolutionInteractive({
  protocolId,
}: ProtocolSolutionInteractiveProps) {
  const [expandedFlow, setExpandedFlow] = useState(false);
  const [expandedClear, setExpandedClear] = useState(false);
  
  // ... component logic
}
```

**State:**
- `expandedFlow`: boolean — is Flow mechanism expanded?
- `expandedClear`: boolean — is Clear mechanism expanded?

**Logic:**
- Tap Flow side → toggle `expandedFlow`
- Tap Clear side → toggle `expandedClear`
- When both expanded → show synergy section below

---

### Step 3: Layout Structure

**Desktop layout:**

```
┌─────────────────────────────────────────────────────────────┐
│                    Section Heading                          │
│         "Why Two Formulas Work Better Than One"            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │         [Split Bottle Asset - Full Width]           │  │
│  │    [Flow Side]          [Clear Side]                 │  │
│  │    [Tap Area]          [Tap Area]                    │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────┐              ┌──────────────┐          │
│  │ Flow Details │              │ Clear Details │          │
│  │ (if expanded)│              │ (if expanded)│          │
│  └──────────────┘              └──────────────┘          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              Synergy Section                         │  │
│  │    (shows when both Flow and Clear are expanded)    │  │
│  │                                                      │  │
│  │    [Synergy description]                            │  │
│  │    [Outcome bullets]                                │  │
│  │    [Inline citations]                               │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Mobile layout:** Same structure, stacked vertically.

---

### Step 4: Split Bottle Asset Integration

**Asset:** `public/protocols/FlowClearSplitBottles.png` (or `.jpg`)

**Usage:**
- Full-width image container
- Split into two tap areas (left = Flow, right = Clear)
- Image shows both bottles side-by-side
- No background (transparent or white)

**Implementation:**
```tsx
<div className="relative w-full aspect-[2/1] mb-8">
  <Image
    src="/protocols/FlowClearSplitBottles.png"
    alt="CONKA Flow and CONKA Clear"
    fill
    className="object-contain"
  />
  
  {/* Tap areas overlay */}
  <button
    onClick={() => setExpandedFlow(!expandedFlow)}
    className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
    aria-label="Learn how Flow works"
  />
  <button
    onClick={() => setExpandedClear(!expandedClear)}
    className="absolute right-0 top-0 w-1/2 h-full cursor-pointer"
    aria-label="Learn how Clear works"
  />
</div>
```

---

### Step 5: Expandable Details Sections

**Flow Details (when `expandedFlow` is true):**

```tsx
{expandedFlow && (
  <div className="premium-box p-6 mb-4">
    <h3 className="premium-section-heading text-xl font-bold mb-3">
      {copy.mechanisms.flow.title}
    </h3>
    <p className="premium-body mb-4">
      {copy.mechanisms.flow.description}
    </p>
    <ul className="space-y-2">
      {copy.mechanisms.flow.keyPoints.map((point, i) => (
        <li key={i} className="premium-body text-sm flex items-start gap-2">
          <span className="text-current opacity-60">•</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
)}
```

**Clear Details (when `expandedClear` is true):**
- Same structure, use `copy.mechanisms.clear`

**Layout:** Side-by-side on desktop, stacked on mobile.

---

### Step 6: Synergy Section

**Shows when:** Both `expandedFlow` AND `expandedClear` are true.

**Content:**
- Synergy title + description
- Outcome bullets (from `outcomeTranslation`)
- Inline citations (from `references`)

**Implementation:**
```tsx
{expandedFlow && expandedClear && (
  <div className="premium-box p-8 mt-8">
    <h3 className="premium-section-heading text-2xl font-bold mb-4">
      {copy.synergy.title}
    </h3>
    <p className="premium-body text-lg mb-6">
      {copy.synergy.description}
    </p>
    
    {/* Outcome bullets */}
    <div className="space-y-3 mb-8">
      {copy.outcomeTranslation.map((outcome, i) => (
        <div key={i} className="flex items-start gap-3">
          <svg>...</svg> {/* Checkmark icon */}
          <span className="premium-body">{outcome}</span>
        </div>
      ))}
    </div>
    
    {/* Inline citations */}
    <div className="premium-data text-sm opacity-70 space-y-2 pt-6 border-t border-current/10">
      {copy.references.map((ref, i) => (
        <div key={i}>
          <span className="font-semibold">{ref.author}</span> ({ref.year}).{' '}
          <span className="italic">{ref.journal}</span>.
        </div>
      ))}
    </div>
  </div>
)}
```

---

### Step 7: Animations & Polish

**Animations:**
- Expandable sections: `transition: height, opacity` (smooth expand/collapse)
- Tap feedback: Subtle scale on tap (active state)
- Synergy section: Fade in when both expanded

**Visual feedback:**
- Tap areas: Subtle hover state (desktop) or active state (mobile)
- Expanded sections: Premium box styling (border, shadow, padding)
- Synergy section: Highlighted (maybe gradient background or border)

**Accessibility:**
- Keyboard navigation: Tab to tap areas, Enter to toggle
- ARIA labels: "Learn how Flow works", "Learn how Clear works"
- Focus states: Visible outline on tap areas

---

### Step 8: Mobile Optimization

**Changes for mobile:**
- Tap areas: Full-width buttons below image (instead of overlay)
- Or: Keep overlay but make tap areas larger (easier to tap)
- Stacked layout: Flow details above Clear details (not side-by-side)
- Synergy section: Full-width below

**Mobile tap areas (alternative):**
```tsx
{/* Mobile: Buttons below image */}
<div className="flex gap-4 mb-6 md:hidden">
  <button
    onClick={() => setExpandedFlow(!expandedFlow)}
    className="flex-1 premium-box p-4 text-center"
  >
    Learn about Flow
  </button>
  <button
    onClick={() => setExpandedClear(!expandedClear)}
    className="flex-1 premium-box p-4 text-center"
  >
    Learn about Clear
  </button>
</div>
```

---

### Step 9: Replace Existing Component

**File:** `app/components/protocol/ProtocolPDPSections.tsx`

**Change:**
```tsx
// Old:
import ProtocolSolutionSection from "./ProtocolSolutionSection";
<ProtocolSolutionSection />

// New:
import ProtocolSolutionInteractive from "./ProtocolSolutionInteractive";
<ProtocolSolutionInteractive protocolId={protocolId} />
```

**Also update:** `app/components/protocol/ProtocolWhyCombination.tsx` if it uses `ProtocolSolutionSection`.

---

### Step 10: Testing Checklist

- [ ] Split bottle asset displays correctly (full-width, proper aspect ratio)
- [ ] Tap Flow side expands Flow details
- [ ] Tap Clear side expands Clear details
- [ ] Tapping again collapses section
- [ ] Synergy section appears when both expanded
- [ ] Synergy section hides when either collapses
- [ ] Inline citations display correctly
- [ ] Mobile: Tap areas work (overlay or buttons)
- [ ] Mobile: Layout stacks correctly
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Animations smooth (no jank)
- [ ] Premium styling applied (boxes, typography)

---

## File Checklist

**Files to create:**
- [ ] `app/components/protocol/ProtocolSolutionInteractive.tsx`

**Files to modify:**
- [ ] `app/lib/protocolSynergyCopy.ts` (add `mechanisms` and `synergy` structure)
- [ ] `app/components/protocol/ProtocolPDPSections.tsx` (replace `ProtocolSolutionSection` with `ProtocolSolutionInteractive`)
- [ ] `app/components/protocol/ProtocolWhyCombination.tsx` (if it uses `ProtocolSolutionSection`)

**Assets to create:**
- [ ] `public/protocols/FlowClearSplitBottles.png` (or `.jpg`) — split image of two bottles side-by-side, no background

**Files to optionally delete (after replacement):**
- [ ] `app/components/protocol/ProtocolSolutionSection.tsx` (if fully replaced)

---

## Copy Structure Example

```typescript
export const protocolSynergyCopy: ProtocolSynergyCopy = {
  framing: {
    headline: "Why Two Formulas Work Better Than One",
    subheadline: "Reduce pressure. Strengthen repair. Break the loop.",
    introParagraph: "...", // Keep existing
  },
  diagramImagePath: "/protocols/FlowClearSynergyDiagram.png", // Keep or remove
  mechanisms: {
    flow: {
      title: "Flow: Reduces Pressure",
      description: "CONKA Flow supports environmental regulation—helping maintain healthy stress signalling and antioxidant pathways. By reducing the load on your system, Flow creates space for repair.",
      keyPoints: [
        "Supports healthy stress response pathways",
        "Helps maintain antioxidant balance",
        "Reduces systemic pressure",
      ],
    },
    clear: {
      title: "Clear: Strengthens Repair",
      description: "CONKA Clear strengthens cellular infrastructure—supporting glutathione synthesis and mitochondrial function. Clear builds capacity for recovery.",
      keyPoints: [
        "Supports glutathione synthesis",
        "Strengthens mitochondrial function",
        "Builds cellular repair capacity",
      ],
    },
  },
  synergy: {
    title: "Together: Break the Cycle",
    description: "Flow reduces load while Clear improves capacity. Together, they create a system that breaks the problem cycle—reducing pressure while strengthening repair mechanisms.",
  },
  outcomeTranslation: [
    "May support sustained mental clarity under load",
    "Designed to support more stable energy production",
    "Helps maintain greater resilience to demanding periods",
    "Designed to support more efficient recovery cycles",
  ],
  references: [
    // ... existing references
  ],
};
```

---

## Implementation Order

1. **Update copy structure** (`protocolSynergyCopy.ts`) — add `mechanisms` and `synergy`
2. **Create component file** (`ProtocolSolutionInteractive.tsx`) — basic structure, state, layout
3. **Add split bottle asset** — place in `public/protocols/`
4. **Implement tap areas** — overlay buttons on split image
5. **Add expandable sections** — Flow and Clear details
6. **Add synergy section** — shows when both expanded
7. **Add inline citations** — in synergy section
8. **Add animations** — smooth expand/collapse, fade in
9. **Mobile optimization** — tap areas, stacked layout
10. **Replace in ProtocolPDPSections** — swap components
11. **Test** — all interactions, mobile, keyboard, accessibility

---

## Questions Answered

1. **Expandable on tap:** ✅ Flow and Clear sections expand/collapse on tap
2. **Split bottle asset:** ✅ One asset with both bottles side-by-side, tap areas on left/right
3. **Mobile interaction:** ✅ Tap areas work on mobile (overlay or buttons below image)
4. **Not protocol-specific:** ✅ Same component for all protocols (no protocol-specific logic)
5. **Inline citations:** ✅ Citations shown inline in synergy section (not accordion)

---

## Next Step

Start with **Step 1**: Update `protocolSynergyCopy.ts` with the new `mechanisms` and `synergy` structure, then proceed through the steps in order.
