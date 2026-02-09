# CONKA Individual PDP — Premium Refactor & Style Evolution Plan

**Purpose:** Single high-level plan for (1) introducing a premium design baseline (Style Guide 02) and (2) refactoring the CONKA Flow product page to the Phase 2 flow. Work is done incrementally, phase by phase, with the conka-flow page as the first adoption surface.

**Status:** Planning  
**First adoption surface:** `/conka-flow` (Individual PDP)  
**Related:** `STYLE_GUIDE_01.md`, `STYLE_GUIDE_01_USAGE.md`, `BRAND_HIGHLIGHTS.md`

---

## Summary

- **Style:** Add a *new* premium style layer (tokens + rules). Do not delete or globally replace Style Guide 01. Legacy pages stay on the current system until touched.
- **Page:** Refactor the CONKA Flow PDP to follow the 11-step Phase 2 flow (Desire → Expectation → Justification → Proof → Detail) and apply the premium baseline only to this page (and its components) as we go.
- **Execution:** Five phases; we work through each phase step by step together.

---

## Phase 1 — Foundation (Premium base only)

**Goal:** Define the premium system and make it available in code. No UI or page structure changes yet.

| Step | What | Outcome |
|------|------|--------|
| 1.1 | Create **CONKA Style Guide 02 – Premium Base** | One doc: tokens (spacing, radius, type roles, section rhythm, container), when to use premium vs not, and “don’t use” rules. No components yet. |
| 1.2 | Add **premium style sheet** | New CSS file (e.g. `premium-base.css`) or `@layer premium` in `globals.css`: spacing scale (5–6 values), radius scale (2–3), type roles (Display / Heading / Body / Data), default section padding + max width, optional minimal border tokens. |
| 1.3 | No changes to pages or components | Conka-flow and all other pages keep current styling and structure. |

**Done when:** Style Guide 02 exists, premium tokens live in the codebase, and we can reference them from the PDP when we’re ready.

---

## Phase 2 — Page structure & content order (Conka-flow)

**Goal:** Conka-flow page follows the 11-step Phase 2 flow. Use existing Style Guide 01 styling for now.

| Step | What | Outcome |
|------|------|--------|
| 2.1 | Reorder and wire sections in `app/conka-flow/page.tsx` | Sections appear in order: Step 0 (Hero + purchase) → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 (final CTA). Use placeholders for any missing sections. |
| 2.2 | Map existing components to steps | Hero, FormulaBenefits, FormulaIngredients, HowItWorks, FormulaFAQ, StickyPurchaseFooter, etc. assigned to the correct step; split or rename where needed for clarity. |
| 2.3 | Add stubs/placeholders for missing steps | Step 1 (immediate proof), Step 2 (problem), Step 3 (outcomes), Step 4 (timeline), Step 8 (comparison) — minimal content or “Section coming soon” so the flow is complete. |

**Done when:** Conka-flow desktop and mobile render the full 11-step sequence; content and copy can be rough.

---

## Phase 3 — Apply premium tokens to conka-flow

**Goal:** Conka-flow page and its product components use the premium token set; rest of site unchanged.

| Step | What | Outcome |
|------|------|--------|
| 3.1 | Introduce premium wrapper | Add a wrapper class (e.g. `premium-pdp` or `conka-flow-premium`) to the conka-flow page (or layout) so premium tokens apply only there. |
| 3.2 | Refactor product components used on this page | Replace ad-hoc spacing, radius, and typography with premium tokens/utilities in ProductHero, FormulaBenefits, FormulaIngredients, HowItWorks, FormulaFAQ, StickyPurchaseFooter, and any section-specific components. |
| 3.3 | Reduce visual noise | Fewer borders, softer hovers, one shape language where we control it (e.g. consistent radius). Nav, footer, and other pages still use Style Guide 01. |

**Done when:** Conka-flow looks and feels “premium” (calm, restrained) and no other routes are changed.

---

## Phase 4 — New sections & content

**Goal:** Replace placeholders with real sections and copy aligned to the Phase 2 flow.

| Step | What | Outcome |
|------|------|--------|
| 4.1 | **Step 1 — Immediate proof** | Star rating, review count or usage volume, short “Trusted by X+” line (above the fold / near hero). |
| 4.2 | **Step 2 — Problem** | 1–2 short paragraphs: pain, why common solutions fall short, soft bridge to CONKA. User language, not educational. |
| 4.3 | **Step 3 — Outcomes** | 3–5 outcome bullets or tiles; plain language; no mechanisms yet. |
| 4.4 | **Step 4 — Timeline** | Days / Week 1 → Weeks 2–4 → longer term; set expectations, reduce anxiety. |
| 4.5 | **Step 8 — Comparison** | CONKA vs nothing, vs single ingredients, vs generic stacks; calm, factual. |
| 4.6 | Copy and hierarchy pass | Ensure no science in hero; problem in user words; social proof echoes outcomes; FAQ before final CTA. |

**Done when:** All 11 steps have real content and the page reads in the order: Desire → Expectation → Justification → Proof → Detail.

---

## Phase 5 — Polish & documentation

**Goal:** Lock the system and make it maintainable.

| Step | What | Outcome |
|------|------|--------|
| 5.1 | Final copy and accessibility pass | Readability, contrast, focus states, alt text. |
| 5.2 | Update Style Guide 02 | Add “PDP flow” summary, where premium is used, and any new “don’t use” rules we discovered. |
| 5.3 | Optional: extend premium later | When touching other pages (e.g. CONKA Clarity PDP, protocols), apply the same tokens and flow pattern; document in Style Guide 02. |

**Done when:** Conka-flow is production-ready and Style Guide 02 is the single reference for premium PDP work.

---

## Phase 2 flow reference (11 steps)

| Step | Name | Job |
|------|------|-----|
| 0 | Hero + Purchase column | Confidence, immediate purchase; no science/ingredients. |
| 1 | Immediate proof | Rating, review count, “Trusted by X+”. |
| 2 | Problem | Re-anchor in user’s words; pain, why others fall short. |
| 3 | Outcomes | 3–5 outcome bullets/tiles; desire before explanation. |
| 4 | Timeline | Days / Week 1 / Weeks 2–4 / longer term. |
| 5 | How it works | Simplified system logic; visual steps. |
| 6 | Ingredients | Visual grouping; expanders for detail; no tables for persuasion. |
| 7 | Proof & science | Optional depth; expandable; nothing essential to conversion here. |
| 8 | Comparison | CONKA vs nothing, vs single ingredients, vs generic stacks. |
| 9 | Social proof | Reviews by benefit; short quotes; echo outcomes. |
| 10 | FAQ | Objection removal; before final CTA. |
| 11 | Final CTA + risk reversal | Guarantee, commitment flexibility, clear CTA. |

**Governing order:** Desire → Expectation → Justification → Proof → Detail. If a section breaks that order, it moves down.

---

## How we’ll work

- We go **phase by phase**. Complete Phase 1 before Phase 2, etc.
- Within each phase we do the steps in order (e.g. 1.1 → 1.2 → 1.3).
- After each phase we can pause to review before starting the next.
- This doc is the single high-level plan; we’ll refer back to it and tick off steps as we go.

---

## Next step

Start with **Phase 1, Step 1.1**: create the CONKA Style Guide 02 – Premium Base document (tokens and rules only).
