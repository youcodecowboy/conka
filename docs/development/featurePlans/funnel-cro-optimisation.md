# Funnel & Landing Page CRO Optimisation

> **Status:** All 3 phases complete
> **Created:** 2026-04-01
> **Appetite:** A few days
> **Branch:** `funnel-cro-optimisation`
> **Epic:** SCRUM-763 (Website & CRO)

---

## Problem

Both pages are functional but not optimised for cold paid Meta traffic. The funnel step order doesn't lead with the hero product, pricing display could anchor better, copy hasn't had a CRO pass, and both pages still use the legacy design system. Before turning on ad spend, these pages need to be tight enough that conversion data reflects offering quality, not page quality.

## Who it serves

Cold paid traffic arriving from Meta ads, overwhelmingly mobile, zero brand awareness.

## Business impact

Directly gates whether the Flow/Clear/Both offering can be validated with real spend. Poor page quality = ambiguous data = wasted budget.

## Design system

Migrate both pages from `premium-base.css` (legacy) to `brand-base.css` (new).

---

## Prerequisites

| Ticket | Summary | Status |
|--------|---------|--------|
| SCRUM-836 | Landing page: Fix guarantee mismatch + noindex + Server Component | Done |
| SCRUM-837 | Landing page: Code quality cleanup | Done |

---

## Phases

| Phase | Description | Ticket | Status |
|-------|-------------|--------|--------|
| 1 | Funnel flow restructure: Product > Cadence > Checkout + upsell rework | SCRUM-838 | Done |
| 2 | Copy & content hardening (both pages) | SCRUM-839 | Done |
| 3 | Design system migration + visual premium polish (both pages) | SCRUM-840 | Done |

---

## Phase 1: Funnel Flow Restructure (SCRUM-838)

Reorder the funnel from Cadence > Product > Checkout to **Product > Cadence > Checkout**. "Both" is the hero product; users choose *what* before *how often*.

### Tasks

1. **[State] Reorder step flow in FunnelClient**
   - Swap step 1 (CadenceSelector) and step 2 (ProductSelector)
   - Update `currentStep` logic, handlers, CTA labels
   - Files: `app/funnel/FunnelClient.tsx`
   - Complexity: Medium

2. **[UI] Update step indicator labels**
   - "Plan > Product > Checkout" becomes "Product > Plan > Checkout"
   - Files: `app/components/funnel/FunnelStepIndicator.tsx`
   - Complexity: Small

3. **[UI] Adapt pricing display for new step order**
   - Step 1 (Product): per-shot primary, total/month underneath
   - Step 2 (Cadence): per-shot primary, per-month/cadence underneath
   - Files: `ProductSelector.tsx`, `CadenceSelector.tsx`
   - Complexity: Medium
   - Dependencies: Task 1

4. **[UI] Update hero asset mapping**
   - Step 1: product-focused imagery (carousel)
   - Step 2: selected product or delivery context
   - Files: `FunnelHeroAsset.tsx`, `FunnelClient.tsx`
   - Complexity: Small

5. **[Logic] Rework upsell logic for new flow**
   - Product upgrades (Flow>Both, Clear>Both): trigger between step 1 and step 2, or at checkout
   - Cadence upgrades (OTP>Sub, monthly>quarterly): trigger after step 2 at checkout
   - Rework `getUpsellOffer()` to accept step context
   - Update all upsell copy for new flow context
   - Test all trigger paths
   - Files: `app/lib/funnelData.ts`, `FunnelClient.tsx`
   - Complexity: Medium-Large
   - Dependencies: Task 1

6. **[Analytics] Update event names and properties**
   - `funnel:step1_completed` now tracks product selection
   - Verify all events fire correctly in new order
   - Files: `FunnelClient.tsx`
   - Complexity: Small

---

## Phase 2: Copy & Content Hardening (SCRUM-839)

CRO-focused copy pass across both pages. Every section earns its place, every claim has a number, every CTA has intent.

### Tasks

1. **[Copy] Landing page headline + subheadline rewrite**
   - PAS framework (pain-first, not outcome-first)
   - Files: `LandingHero.tsx`
   - Complexity: Small

2. **[Copy] Landing page section-by-section audit**
   - Pain-first framing, specific numbers, proof points, guarantee at conversion points
   - EFSA compliance check (ref: `LANDING_PAGE_CLAIMS_LOG.md`)
   - Files: All `Landing*.tsx` components
   - Complexity: Medium

3. **[Copy] Funnel card copy refinement**
   - "Both" as the obvious best choice, meaningful differentiation
   - Files: `app/lib/funnelData.ts`
   - Complexity: Small

4. **[Copy] CTA text alignment**
   - Consistent, conversion-focused CTAs across both pages
   - Files: `StartPageClient.tsx`, `FunnelClient.tsx`, landing components
   - Complexity: Small

5. **[Content] Pricing display copy**
   - Per-shot primary, total secondary, savings prominent on "Both"
   - Files: `ProductSelector.tsx`, `CadenceSelector.tsx`
   - Complexity: Small
   - Dependencies: Phase 1 Task 3

---

## Phase 3: Visual Premium & Design System Migration (SCRUM-840)

Migrate both pages from `premium-base.css` to `brand-base.css`. Premium feel polish and mobile optimization.

### Tasks

1. **[Design] Migrate landing page to brand-base.css**
   - Replace all `premium-*` classes with `brand-*` equivalents
   - Update radius (40px>32px cards, pill>16px buttons, 20px>24px containers)
   - Left-align all headers
   - Replace inline colours with brand tokens
   - Files: `StartPageClient.tsx`, all `Landing*.tsx`
   - Complexity: Large

2. **[Design] Migrate funnel page to brand-base.css**
   - Same token migration
   - Preserve distraction-free aesthetic
   - Files: `FunnelClient.tsx`, all funnel components
   - Complexity: Medium

3. **[Mobile] Mobile premium feel pass**
   - Review at 390px: spacing, padding, CTA, images, text hierarchy
   - "One idea per viewport" principle
   - Files: Various (both pages)
   - Complexity: Medium

4. **[Visual] Section background rhythm**
   - Fix consecutive same-background sections on landing page
   - Apply brand colour rhythm (white/black/neutral alternation)
   - Files: `StartPageClient.tsx`
   - Complexity: Small

5. **[Visual] Hardcoded colours to design tokens**
   - Flow amber, Clear sky, avatar pastels, shadows
   - Define Flow/Clear accent tokens in `brand-base.css` if needed
   - Files: Landing + funnel components, `brand-base.css`
   - Complexity: Small
   - Dependencies: Tasks 1-2

---

## Rabbit Holes

- **Upsell rethink scope:** Keep the same upsell offers, adjust timing and copy for new flow. Don't redesign the entire upsell strategy.
- **Design system migration scope creep:** Swap tokens mechanically. Don't redesign sections during migration.
- **Copy perfectionism:** First pass for testing, not award-winning. Copy iterates based on data.

## No-Gos

- No new sections or components on either page
- No Shopify setup work (variant wiring happens when Shopify is ready)
- No analytics redesign (update events for reorder only)
- No shared component changes (Testimonials, CaseStudies, ProductImageSlideshow)
- No landing page structural changes (section order, adding/removing sections)

## Risks

- **Funnel reorder breaks checkout:** `funnelCheckout.ts` should be step-agnostic. Test all 4 working combos.
- **Design system visual regression:** Card radius 40px>32px, button pill>16px will look different. Review at 390px + 1280px.
- **Copy claims compliance:** New language needs EFSA check. Reference `LANDING_PAGE_CLAIMS_LOG.md`.

## Open Questions

- Product step hero image: what asset represents "choose your product" best?
- Cadence step context: show selected product, or shift to delivery/routine imagery?

---

## Related Docs

- [Website Simplification Plan](../WEBSITE_SIMPLIFICATION_PLAN.md)
- [Landing Page Review Plan](./landing-page-review-and-upgrade.md)
- [Design System](../../branding/DESIGN_SYSTEM.md)
- [Brand Voice](../../branding/BRAND_VOICE.md)
- [Quality Standards](../../branding/QUALITY_STANDARDS.md)
- [Claims Log](../LANDING_PAGE_CLAIMS_LOG.md)
- [UX Iteration Workflow](../../workflows/09-ux-iteration.md)
