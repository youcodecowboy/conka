# Home Page -- Clinical Aesthetic Alignment

## Problem

The home page uses a mix of legacy `premium-*` tokens and older component patterns that clash with the clinical aesthetic now established on `/start` and `/funnel`. Paid traffic that bounces from an ad to the homepage experiences a brand disconnect -- the warmer, rounded `/` feels like a different product. Consistent clinical identity across the two highest-traffic acquisition surfaces removes the "two brands" impression before a visitor reaches a paywall.

## Who it serves

Cold paid traffic revisiting the homepage; organic visitors comparing CONKA to alternatives.

## Business impact

Brand cohesion across primary acquisition surfaces. Supports conversion by presenting a single, consistent clinical identity from first ad impression through to checkout.

## Appetite

1.5 days

## Approach

Add `.brand-clinical` to the page root (single-line change that propagates token overrides automatically), swap two sections with already-clinical landing equivalents, migrate remaining home-specific components from `premium-*` to `brand-*` tokens, then delete orphaned components. No new architecture -- design system alignment pass only.

## Design system

`brand-base.css` (new) -- full migration away from `premium-*` within scope of this work.

---

## Phase Status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Root + section swaps | Done |
| 2 | Token migration for home-specific components | Done |
| 3 | Orphan cleanup | Done |

---

## Phase 1 -- Root + Section Swaps

**Goal:** Fastest path to clinical visual alignment. One root class change propagates tokens; three component swaps replace the largest legacy surfaces.

### Tasks

1. **[Page] Add `.brand-clinical` to home page root**
   - Add `brand-clinical` to the root div in `app/page.tsx`
   - Verify shared components (Testimonials, CaseStudiesDataDriven) render correctly -- they already work under `.brand-clinical` on `/start`
   - Complexity: Small
   - Files: `app/page.tsx`

2. **[Section 1] Replace Hero with LandingHero**
   - Swap `import Hero` for `LandingHero` from `app/components/landing/LandingHero.tsx`
   - Verify `priority` / `fetchPriority` on hero image to avoid mobile LCP regression
   - Check if LandingHero needs homepage-specific props (CTA destination, headline copy)
   - Complexity: Medium
   - Files: `app/page.tsx`, `app/components/landing/LandingHero.tsx`

3. **[Section 2] Replace HomeWhatItDoes with LandingWhatItDoes**
   - Swap import to `app/components/landing/LandingWhatItDoes.tsx`
   - Confirm no hardcoded `/start` or `/funnel` links inside the component
   - Complexity: Small
   - Files: `app/page.tsx`, `app/components/landing/LandingWhatItDoes.tsx`

4. **[Section 11] Replace home/LandingFAQ with landing/LandingFAQ**
   - Swap `app/components/home/LandingFAQ` import for `app/components/landing/LandingFAQ`
   - Verify FAQ content is appropriate for homepage context (may differ from `/start` FAQ)
   - Complexity: Small
   - Files: `app/page.tsx`, `app/components/landing/LandingFAQ.tsx`

---

## Phase 2 -- Token Migration for Home-Specific Components

**Goal:** Migrate all remaining home components from `premium-*` tokens to `brand-*` tokens so they inherit the clinical scope correctly.

### Section mapping reference

| Home section | Component | Action |
|---|---|---|
| Athletes | `AthleteCredibilityCarousel.tsx` | Token migration |
| Key Benefits | `KeyBenefits.tsx` (Desktop + Mobile) | Token migration -- large volume |
| Why CONKA Works | `WhyConkaWorks.tsx` | Token migration |
| What to Expect | `WhatToExpectDesktop.tsx`, `WhatToExpectMobile.tsx` | Token migration |
| Founders | `home/FoundersSection.tsx` | Token migration |
| Product Grid | `home/ProductGrid.tsx`, `home/ProductCard.tsx` | Token migration + remove ProtocolVariantSelector |

### Tasks

5. **[Component] AthleteCredibilityCarousel -- token migration**
   - Replace `premium-*` class names with `brand-*` equivalents
   - Update any hardcoded color values to brand tokens
   - Verify carousel scroll/animation still works after class changes
   - Complexity: Small-Medium
   - Files: `app/components/AthleteCredibilityCarousel.tsx`

6. **[Component] KeyBenefits -- token migration**
   - Mechanical `premium-*` to `brand-*` replacement across Desktop + Mobile variants (~900 lines)
   - No logic changes -- token replacement only
   - Watch for concatenated class strings that could break Tailwind purging
   - Complexity: Medium (volume)
   - Files: `app/components/KeyBenefits.tsx` + Desktop/Mobile split files

7. **[Component] WhyConkaWorks -- token migration**
   - `premium-*` to `brand-*` replacement
   - Already on correct background from prior Phase 2 work
   - Complexity: Small
   - Files: `app/components/WhyConkaWorks.tsx`

8. **[Component] WhatToExpect -- token migration (Desktop + Mobile)**
   - Token replacement across both split components
   - These stay as home-specific; do not confuse with `LabTimeline` (the `/start` clinical wrapper)
   - Complexity: Small-Medium
   - Files: `app/components/home/WhatToExpectDesktop.tsx`, `app/components/home/WhatToExpectMobile.tsx`

9. **[Component] FoundersSection -- token migration**
   - `premium-*` to `brand-*` replacement
   - Verify imagery and layout hold with square radius tokens from `.brand-clinical`
   - Complexity: Small
   - Files: `app/components/home/FoundersSection.tsx`

10. **[Component] ProductGrid + ProductCard -- token migration**
    - Replace `premium-*` tokens
    - Remove `ProtocolVariantSelector` from ProductGrid UI (references removed protocols)
    - ProductCard should render the Balance product by default
    - Complexity: Medium
    - Files: `app/components/home/ProductGrid.tsx`, `app/components/home/ProductCard.tsx`, split mobile/tablet variants

---

## Phase 3 -- Orphan Cleanup

**Goal:** Delete confirmed-unused components after Phase 1 swaps are live on preview.

### Tasks

11. **[Cleanup] Delete confirmed-unused components**
    - Grep for all imports of: `Hero`, `HeroDesktop`, `HeroMobile`, `home/HomeWhatItDoes`, `home/LandingFAQ`, `ProtocolVariantSelector`
    - Delete any file with zero references outside itself
    - Update barrel exports if needed
    - Must run grep confirmation before any deletion
    - Complexity: Small
    - Files: TBD by grep results

---

## Rabbit Holes

- **KeyBenefits migration** -- ~900 lines across split components. Mechanical token replacement only; do not refactor logic or restructure. Fix concatenated class strings individually, not by restructuring.
- **LandingHero homepage adaptation** -- If it needs significant copy changes or new props for the homepage context, treat that as a separate UX piece. Use as-is in Phase 1 and adjust copy in a follow-up.
- **ProductGrid simplification** -- Removing `ProtocolVariantSelector` is the only simplification in scope. Do not touch subscription/pricing logic or cart integration.

## No-Gos

- No changes to `/start` or `/funnel` pages
- No new "Lab" wrapper components for homepage sections (those are `/start`-specific overlays)
- No copy rewrites (text stays as-is unless LandingHero/LandingFAQ content is wrong for homepage)
- No ProductGrid subscription logic changes
- No SEO metadata changes

## Risks

- **Shared component appearance change:** `Testimonials` and `CaseStudiesDataDriven` will inherit `.brand-clinical` tokens on the home page. They already render correctly under these tokens on `/start` -- do a visual comparison on both pages after Phase 1 lands to confirm no regression.
- **Mobile LCP:** Hero swap is the highest LCP risk. Verify `LandingHero` has `priority` on its hero image before deploying.
- **ProtocolVariantSelector references:** may be imported in protocol PDP pages. Grep before deleting.

---

## References

- Clinical aesthetic spec: `docs/branding/CLINICAL_AESTHETIC.md`
- Reference implementation: `app/start/page.tsx`, `app/funnel/FunnelClient.tsx`
- Design system: `docs/branding/DESIGN_SYSTEM.md`
- Brand base CSS: `app/brand-base.css`

---

## Jira Tickets

| Key | Title | Phase | Status |
|-----|-------|-------|--------|
| SCRUM-903 | Home page -- Phase 1: Apply clinical aesthetic root + swap shared sections | 1 | To Do |
| SCRUM-904 | Home page -- Phase 2: Token migration for home-specific components | 2 | To Do |
| SCRUM-905 | Home page -- Phase 3: Delete orphaned components after section swaps | 3 | To Do |
