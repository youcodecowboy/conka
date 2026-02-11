# CONKA Protocol PDP — Premium Refactor Plan

**Purpose:** Plan for applying the premium baseline (Style Guide 02) and the Phase 2 “story” pattern to the protocol product pages (`/protocol/[id]`). Protocols sell *systems* (a specific ratio of CONKA Flow + CONKA Clear for a goal); this refactor justifies why complexity is worth it and aligns protocol pages with the refactored individual formula pages.

**Status:** Planning  
**Adoption surface:** `/protocol/1`, `/protocol/2`, `/protocol/3`, `/protocol/4`  
**Related:** [PDP_PREMIUM_REFACTOR_PLAN.md](./PDP_PREMIUM_REFACTOR_PLAN.md), [STYLE_GUIDE_02_PREMIUM_BASE.md](../STYLE_GUIDE_02_PREMIUM_BASE.md) (root)

---

## Summary

- **Prerequisite:** Individual PDP refactor (conka-flow, conka-clarity) and premium tokens are in place. Style Guide 02 and `premium-pdp` already exist.
- **Scope:** Apply premium to protocol route only; introduce a **protocol-specific** section order (not a 1:1 copy of the 10-step formula flow).
- **Big pattern:** Winning protocol pages justify *why a system* (Flow + Clear in a ratio) beats single-formula use. Sections should answer: system benefit → what’s included → simple schedule → why combination works → flexibility → expected results → protocol vs individuals → social proof → FAQ → CTA.
- **Execution:** Five phases; we work through each phase step by step.

---

## Protocol flow reference (target order)

| Step | Name | Job |
|------|------|-----|
| 0 | Protocol Hero + Purchase | System benefit + reassurance; ratio + goal clear; tier/purchase. No feature dump. |
| 1 | Immediate proof (optional) | Stars + “Trusted by X+” or protocol-level proof line in hero. |
| 2 | What’s Included | Visual breakdown: what’s in the box, ratio per tier (e.g. X Flow + Y Clear per week). |
| 3 | Schedule | Simple visual: one week (or one view); reduce scroll and cognitive friction. |
| 4 | Why Combination Works | Flow + Clear → synergy for this goal; add diagram, not just text. |
| 5 | Flexibility (early) | “Change tier? Skip days?” — one short block + link to FAQ; handle objection early. |
| 6 | Expected Results / Timeline | Week 1 → Weeks 2–4 → Month 2+; set expectations (critical missing today). |
| 7 | Comparison: Protocol vs Individuals | Why protocol vs Flow only vs Clear only; key justification. |
| 8 | Social Proof | System-level reviews/quotes (protocol use), not only formula-level. |
| 9 | FAQ | System objections; keep; optionally move earlier; premium styling. |
| 10 | Cross-sell | Other protocols + “Prefer individual formulas?”; premium styling. |
| 11 | Sticky CTA + risk reversal | Premium sticky footer (`usePremium`), strong layout. |

**Governing idea:** Justify why the system is worth it (benefit → what you get → how it works → what to expect → why not just one formula → proof → friction removal → CTA).

---

## Phase 1 — Foundation (wire premium to protocol route)

**Goal:** Protocol pages use the premium wrapper and tokens; no new sections yet. Current sections get premium styling only.

| Step | What | Outcome |
|------|------|---------|
| 1.1 | Add **premium wrapper** to protocol page | In `app/protocol/[id]/page.tsx`, wrap main content (desktop and mobile) in `premium-pdp` so premium tokens apply. |
| 1.2 | Enable **premium sticky footer** for protocol | Pass `usePremium` to `StickyPurchaseFooter` and `StickyPurchaseFooterMobile` on the protocol page. |
| 1.3 | Update **Style Guide 02** | In “When to use”, add protocol PDP. In “When not to use”, remove or qualify “protocols” so protocol PDP is in scope. |

**Done when:** Protocol route uses `premium-pdp` and premium sticky footer; Style Guide 02 reflects that protocol PDP is premium.

### Phase 1 — Potential files to remove after work

After Phase 1, the following components may be unused. **Do not delete in Phase 1;** verify no other references (e.g. professionals, quiz), then delete in a follow-up or cleanup PR.

| File | Reason |
|------|--------|
| [app/components/protocol/TierSelector.tsx](app/components/protocol/TierSelector.tsx) | Replaced by `TierSelectorPremium` on the protocol PDP. Only referenced in `ProtocolHero`; after Phase 1 it is unused. |
| [app/components/protocol/ProtocolTabs.tsx](app/components/protocol/ProtocolTabs.tsx) | Only used in `ProtocolHero`. Tabs were removed from the hero in Phase 1 to align with formula PDP; this component is unused. |

---

## Phase 2 — Page structure & section order

**Goal:** Reorder sections in `app/protocol/[id]/page.tsx` to match the protocol flow table. Use existing components; add placeholders for missing sections.

| Step | What | Outcome |
|------|------|---------|
| 2.1 | **Reorder sections** (desktop) | Order: Hero → What’s Included (placeholder or current “tier details”) → Schedule (ProtocolCalendar) → Why Combination Works (ProtocolBenefits) → Flexibility (placeholder) → Expected Results (placeholder) → Comparison (placeholder) → Social Proof (placeholder or ProtocolCaseStudies) → FAQ → Cross-sell → Sticky CTA. |
| 2.2 | **Reorder sections** (mobile) | Same logical order on mobile; ProtocolStruggleMobile, ProtocolCalendarSectionMobile, ProtocolCaseStudiesMobile placed to match. Use placeholders where sections don’t exist yet. |
| 2.3 | **Apply premium section/container classes** | Where sections already exist, use `premium-section`, `premium-container`, `premium-box` (or equivalent) so rhythm is consistent. |

**Done when:** Protocol desktop and mobile render the full target sequence; placeholders are acceptable for missing sections.

---

## Phase 3 — Apply premium to existing protocol components

**Goal:** Protocol-specific components (hero, calendar, benefits, FAQ, cross-sell) use premium tokens and layout; no new sections yet.

| Step | What | Outcome |
|------|------|---------|
| 3.1 | **Protocol Hero (premium)** | Refactor `ProtocolHero` and `ProtocolHeroMobile`: benefit-led headline and subline (system benefit + ratio for goal); premium layout (e.g. `.premium-hero-layout` or same two-column pattern as formula hero); premium type roles (Display / Body / Data); TierSelector and PurchaseToggle with premium styling. |
| 3.2 | **Protocol Calendar / Schedule** | Refactor `ProtocolCalendar` and `ProtocolCalendarSectionMobile`: use premium spacing, radius, typography; simplify to one primary view (e.g. one week) where possible to reduce cognitive load. |
| 3.3 | **Protocol Benefits** | Refactor `ProtocolBenefits`: replace neo-box and ad-hoc spacing with premium-section, premium-container, premium-box; keep current copy and structure; prepare for diagram in Phase 4. |
| 3.4 | **Protocol FAQ & cross-sell** | Apply premium section/container/box and type roles to ProtocolFAQ and the “Explore Other Protocols” / “Prefer Individual Formulas?” blocks. |

**Done when:** All existing protocol sections look and feel premium; no new content or new sections yet.

---

## Phase 4 — New sections & content

**Goal:** Add missing sections and copy so the protocol page tells a complete story (expected results, comparison, flexibility, stronger visuals).

| Step | What | Outcome |
|------|------|---------|
| 4.1 | **What’s Included** | Dedicated section with visual breakdown: what’s in the box per tier (e.g. “X Flow + Y Clear per week”). Strong visual (illustration or product shot); data from `protocolContent[].tiers`. See [4.1 What’s Included — design](#41-whats-included-design) below. |
| 4.2 | **Flexibility (early)** | Short block (hero or right after What’s Included): “Change tier anytime” / “Skip days?” — 1–2 sentences + link to FAQ. |
| 4.3 | **Expected Results / Timeline** | New section + data: e.g. `whatToExpectProtocol.ts` (or per-protocol in productData) with 3–5 steps (Week 1, Weeks 2–4, Month 2+). New component `ProtocolWhatToExpect` (desktop + mobile) following WhatToExpectTimeline pattern. Feeling-led copy, no science dump. |
| 4.4 | **Why Combination Works — diagram** | Add a simple diagram to ProtocolBenefits (or new component): Flow + Clear → synergy → outcome for this protocol’s goal. SVG or small illustration; one per protocol or one diagram with protocol labels. |
| 4.5 | **Comparison: Protocol vs Individuals** | New section: “Why a protocol?” — Flow only vs Clear only vs This protocol (benefits/use case). Cards or table; copy in data or productData. |
| 4.6 | **Social proof (system-level)** | Protocol-level testimonials or quotes: filter existing testimonial data by protocol, or add protocol-specific editorial quotes. Reuse Testimonials or editorial-quotes pattern; ensure desktop and mobile. |
| 4.7 | Copy and hierarchy pass | Hero = system benefit only; expected results = user language; comparison = clear justification; FAQ before final CTA. |

**Done when:** All steps in the protocol flow table have real content; expected results and comparison sections exist; flexibility is addressed early.

---

### 4.1 What's Included — design

**Pattern:** Two full-width “strips” (same layout language as [FormulaBenefitsStats](app/components/product/FormulaBenefitsStats.tsx)): content on one side, product shot on the other. Data is dynamic from `protocolContent[protocolId].tiers[selectedTier]` (e.g. `conkaFlowCount`, `conkaClarityCount`).

**Layout (desktop):**

1. **Strip 1 — CONKA Flow**
   - **Left:** Large dynamic quantity (e.g. **3** or **5**) + short label (“per week” or “CONKA Flow”).
   - **Right:** Product shot of Flow (zoomed-in top half of shot; asset cropped so it sits in the strip).
   - Section heading above or in strip: “What’s included” / “Your weekly mix”.

2. **Strip 2 — CONKA Clear**
   - **Left:** Product shot of Clear (same style: zoomed top-half crop).
   - **Right:** Large dynamic quantity (e.g. **1** or **2**) + short label.
   - Alternating layout gives clear Flow / Clear separation and avoids monotony.

**Backgrounds:** Use **alternating strip backgrounds** (e.g. one strip black, one white, or black / light grey). Benefits:
- Visually separates the two formulas so each strip reads as one unit.
- Works with the crop: a zoomed top-half shot reads as “one product” inside its strip; the background change at the strip boundary reinforces that without needing a hard graphic divider.
- Matches the “two distinct formulas in one system” story. If both strips were the same colour, the two crops could blend; alternating keeps Flow and Clear clearly distinct.
- Recommendation: **Strip 1 (Flow) = black** (or dark), **Strip 2 (Clear) = white** (or `--color-surface`), so the first hit is bold and the second is light — or the reverse if Clear assets look stronger on dark. Choose based on which bottle shot has better contrast on black vs white.

**Data:** Read from `protocolContent[protocolId].tiers[selectedTier]`: `conkaFlowCount`, `conkaClarityCount`, optionally `shotsPerWeek`. Section must receive `protocolId` and `selectedTier` (and optionally `onTierSelect` if tier is changeable in-page here; otherwise tier comes from hero state).

**Mobile:** Same two strips stacked; preserve “big number + label” and image per strip. Option A: keep left/right flip (Flow = number left, image right; Clear = image left, number right). Option B: stack to “image on top, number below” per strip for thumb-friendly scan. Decide in implementation.

**Assets:** One hero-style image per formula (Flow, Clear): **zoomed-in top half of the shot** so it fits the strip height and feels product-forward. Same assets used in both strips; no per-tier images. Quantities are type-only (dynamic).

**Implementation checklist (4.1):**
- [ ] New component: `ProtocolWhatsIncluded` (desktop + mobile or responsive).
- [ ] Props: `protocolId`, `selectedTier`; data from `protocolContent[].tiers`.
- [ ] Strip 1: Flow count + Flow image; Strip 2: Clear image + Clear count.
- [ ] Alternating backgrounds (e.g. black / white or black / surface).
- [ ] Replace current “What’s Included” placeholder in `ProtocolPDPSections` with this section.
- [ ] Optional: allow tier to be changed within section (e.g. compact tier pills) so “what’s included” updates without scrolling to hero; otherwise rely on hero tier state.

---

## Phase 5 — Polish & documentation

**Goal:** Lock the protocol PDP and document it.

| Step | What | Outcome |
|------|------|---------|
| 5.1 | Final copy and accessibility pass | Readability, contrast, focus states, alt text for new visuals/diagrams. |
| 5.2 | Update Style Guide 02 | Note protocol PDP flow (section order), any protocol-specific “don’t use” rules, and that protocol hero follows the same hero stack rules as formula (Display, Data, Body). |
| 5.3 | Optional: protocol-specific assets doc | If needed, short list of assets (What’s Included visual, Why-combination diagram, comparison icons) and where they’re used. |

**Done when:** Protocol PDP is production-ready and Style Guide 02 is the single reference for premium protocol PDP work.

---

## What needs creating (checklist)

Use this as a quick reference for new work.

### Components

| Item | Type | Notes |
|------|------|-------|
| Protocol Hero (premium) | Refactor | ProtocolHero, ProtocolHeroMobile: premium layout + tokens. |
| What’s Included | New section | Visual + tier breakdown (X Flow + Y Clear per week). |
| Schedule (simplified) | Refactor | ProtocolCalendar: premium styling; consider one-week emphasis. |
| Why Combination Works + diagram | Refactor + asset | ProtocolBenefits + diagram (Flow + Clear → goal). |
| Flexibility block | New | Short copy + FAQ link; place early. |
| Protocol Expected Results | New section + component | Data (e.g. whatToExpectProtocol) + ProtocolWhatToExpect (desktop + mobile). |
| Comparison: Protocol vs Individuals | New section | “Why protocol?” — Flow only / Clear only / Protocol. |
| Social proof (system-level) | New or extend | Protocol testimonials or quotes; reuse Testimonials or editorial pattern. |
| Sticky CTA | Existing | Use StickyPurchaseFooter with `usePremium` (already supported). |

### Data / copy

| Item | Location / format | Notes |
|------|-------------------|-------|
| Protocol timeline (expected results) | e.g. `app/lib/whatToExpectProtocol.ts` or `productData` | 3–5 steps per protocol (Week 1, Weeks 2–4, Month 2+). |
| Comparison copy | productData or new file | “Flow only / Clear only / This protocol” benefit lines. |
| Flexibility copy | Inline or copy file | 1–2 sentences + FAQ link. |
| Protocol-level testimonials/quotes | Extend testimonials or editorialQuotesData | Filter by protocol or add protocol-specific entries. |

### Assets (optional but recommended)

| Asset | Purpose |
|-------|--------|
| What’s Included visual | Illustration or product shot: bottles + “X Flow + Y Clear” per tier. |
| Why combination works diagram | Flow + Clear → synergy → outcome (per protocol or one with labels). |
| Comparison section | Icons or small visuals for Flow only / Clear only / Protocol (optional; can start with type). |

---

## How we’ll work

- We go **phase by phase**. Complete Phase 1 before Phase 2, etc.
- Within each phase we do the steps in order (e.g. 1.1 → 1.2 → 1.3).
- After each phase we can pause to review before starting the next.
- This doc is the single high-level plan for the protocol PDP; we’ll refer back and tick off steps as we go.

---

## Next step

Phase 1 complete. Next: **Phase 2, Step 2.1** — reorder sections (desktop) to match the protocol flow table.
