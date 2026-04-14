# Homepage Upgrade: Performance + Visual Alignment

> **Status:** Phase 3 scoped
> **Created:** 2026-04-07
> **Last updated:** 2026-04-14
> **Appetite:** 2-3 days (Phase 3)
> **Design system:** `brand-base.css` (page-level migration complete in Phase 2; component-level finishing in Phase 3)
> **Branch:** `main-page-simplication-and-improvement`

---

## Problem

The homepage (`app/page.tsx`) is the primary organic entry point but has two issues:

1. **Performance.** The hero loads a 4-image carousel with rotating animations, adding JS weight and 3 unnecessary image requests. All 10 sections are client-rendered.
2. **Visual inconsistency.** The homepage uses the legacy `premium-base.css` (bone/ink colours, centred headers, 40px pill buttons, dark sections) while `/start` has migrated to `brand-base.css` (white/tint rhythm, left-aligned type, 16/24/32px radius, accent-only CTAs). Visitors who see both pages experience visual inconsistency.

## Who it serves

Organic/direct traffic arriving at `/`. Brand-aware visitors, returning visitors, SEO traffic.

## Business impact

CRO/Acquisition. Faster load reduces bounce. Visual cohesion with `/start` builds trust. Premium feel matches brand positioning.

---

## Phase status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Performance + Hero Simplification | **Done** |
| 2 | Visual Alignment (brand-base migration) | **Done** |
| 3 | Landing Parity + Balance-Only Simplification | **Active** |
| 4 | Product Simplification (Flow/Clear/Balance only, full cleanup) | Future (separate scope) |

---

## Phase 1: Performance + Hero Simplification

### Task 1.1: Replace hero carousel with single image
- **What:** Remove `HeroBannerCarousel` component usage. Replace with single `QuartelySingle.jpg` image (same as `/start` hero). Keep rotating headline words. Remove the 4 carousel image loads.
- **Complexity:** Medium
- **Files:** `app/components/HeroDesktop.tsx`, `app/components/HeroMobile.tsx`, `app/components/Hero.tsx`
- **Impact:** Eliminates 3 extra image loads + carousel JS (intervals, fade state, image preloading)

### Task 1.2: Audit dynamic imports and loading placeholders
- **What:** Verify all below-fold components are properly lazy-loaded. Check placeholder heights match actual rendered heights (mismatches cause CLS).
- **Complexity:** Small
- **Files:** `app/page.tsx`

### Task 1.3: Audit image sizing and priority flags
- **What:** Ensure hero image has `priority`, all below-fold images use `loading="lazy"`. Check for oversized source images served at smaller display sizes.
- **Complexity:** Small
- **Files:** All homepage components with `<Image>` tags

---

## Phase 2: Visual Alignment (brand-base migration)

### Task 2.1: Migrate page-level section structure
- **What:** Replace `premium-section-luxury` with `brand-section`, `premium-track` with `brand-track`. Replace inline `style={{ backgroundColor: "var(--color-neuro-blue-light)" }}` etc. with `brand-bg-white` / `brand-bg-tint` classes. Remove `theme-conka-flow` class. Update root div to match `/start` pattern.
- **Complexity:** Small
- **Files:** `app/page.tsx`
- **Section cadence:**

| # | Section | Background |
|---|---------|-----------|
| 1 | Hero | `brand-bg-white` |
| 2 | Athletes | `brand-bg-tint` |
| 3 | Product Grid | `brand-bg-white` (wrapper only, Phase 3 rewrites internals) |
| 4 | Testimonials | `brand-bg-tint` |
| 5 | Key Benefits | `brand-bg-white` |
| 6 | Why It Works | `brand-bg-tint` (was dark -- now light) |
| 7 | What to Expect | `brand-bg-white` |
| 8 | Case Studies | `brand-bg-tint` |
| 9 | Founders | `brand-bg-white` |
| 10 | FAQ | `brand-bg-tint` |

### Task 2.2: Migrate hero to brand typography + layout
- **What:** Replace legacy CSS variables (`--color-bone`, `--gradient-neuro-blue-accent`, `--text-on-light`) with brand tokens. Use `brand-h1-bold`, `brand-body`. Left-align on desktop (matching `/start`). Update trust badges.
- **Complexity:** Medium
- **Files:** `app/components/HeroDesktop.tsx`, `app/components/HeroMobile.tsx`, `app/components/HeroShared.tsx`
- **Note:** Keep rotating words, just migrate the styling

### Task 2.3: Migrate shared components (Testimonials + CaseStudies)
- **What:** Migrate from `premium-body`, `premium-card-soft` to `brand-body`, `brand-card`. These are shared with `/start` -- test both pages.
- **Complexity:** Medium
- **Files:** `app/components/testimonials/TestimonialCard.tsx`, `app/components/testimonials/TestimonialsAutoScrollStrip.tsx`, `app/components/CaseStudiesDataDriven.tsx`
- **Risk:** Regression on `/start`. Test both pages after migration.

### Task 2.4: Migrate homepage-only components
- **What:** Migrate AthleteCredibilityCarousel, KeyBenefits (Desktop + Mobile), WhyConkaWorks (Desktop + Mobile), WhatToExpect (Desktop + Mobile), FoundersSection, LandingFAQ (home version) from `premium-*` to `brand-*` tokens. Left-align headers. Update radius (40px to 32px cards, pill to 16px buttons). Update text colour tiers.
- **Complexity:** Large (most volume, but mechanical token replacement)
- **Files:** All homepage-only components
- **Note:** WhyConkaWorks moves from dark background to light. Layout may need visual review.

### Task 2.5: ProductGrid wrapper only
- **What:** Only migrate the section wrapper in `page.tsx` (background colour). Do NOT touch ProductGrid internals. Phase 3 replaces it.
- **Complexity:** Small
- **Files:** `app/page.tsx` (already covered in 2.1)

---

---

## Phase 3: Landing Parity + Balance-Only Simplification

> **Scoped:** 2026-04-14
> **Context:** After the `/start` landing page and funnel were validated, the homepage hero and "what it does" section still feel behind. Phase 3 reuses the battle-tested landing components on the homepage via props, locks ProductGrid to Balance-only (protocols are being deprecated), and finishes the per-component style alignment that Phase 2 stopped short of.

### Problem

1. Homepage hero is a homepage-specific component; `LandingHero` (proof-led, higher converting on `/start`) is the better pattern.
2. Section 2 on homepage is a carousel; `LandingWhatItDoes` on `/start` is a clearer "what CONKA does + why" moment that would serve organic traffic equally well.
3. `ProductGrid` carries flow-heavy/clear-heavy protocol variants that will never ship in the simplified offering.
4. Homepage-only components (KeyBenefits, WhyConkaWorks, WhatToExpect, FoundersSection, home/LandingFAQ) still carry legacy typography/spacing patterns.

### Approach

Reuse `LandingHero` and `LandingWhatItDoes` on the homepage via new optional props rather than forking. Homepage CTAs route to `/protocol/3` (Balance) instead of the Both funnel. Remove the protocol variant selector from ProductGrid and from the protocol PDP hero. Finish component-level token migration.

### Task 3.1: Hero + "What CONKA does" parity

- Extend `LandingHero` with optional `ctaHref` and `ctaLabel` props. Defaults keep current funnel behaviour on `/start`. On homepage, pass a softer label routing to `/protocol/3` (e.g. `See the Daily Protocol →`).
- Extend `LandingWhatItDoes` with `hideCTA?: boolean` (or `ctaHref?: string`). Homepage hides the trailing CTA + `LandingTrustBadges` (ProductGrid below is the chooser). `/start` unchanged.
- Swap homepage section 1 to `<LandingHero ctaHref="/protocol/3" ctaLabel="See the Daily Protocol →" />`.
- Use `LandingWhatItDoes` as homepage section 2 (replacing the Athletes carousel slot, which moves to 3b).
- Grep for any remaining imports of `Hero`, `HeroDesktop`, `HeroMobile`, `HeroBannerCarousel` and flag unused as orphaned for a follow-up cleanup.
- **Files:** `app/components/landing/LandingHero.tsx`, `app/components/landing/LandingWhatItDoes.tsx`, `app/components/landing/LandingCTA.tsx`, `app/page.tsx`
- **Complexity:** Small-Medium
- **Risk:** Mobile LCP regression if `priority` / `fetchPriority` isn't carried. Regression on `/start` — both pages need QA.

### Task 3.2: Section tweaks (athlete title + case studies/testimonials reorder)

- Rename `AthleteCredibilityCarousel` heading from "Why Athletes Trust CONKA" to "Why High Performers Trust CONKA".
- Reorder: Case Studies before Testimonials. Confirm white/tint alternation still alternates cleanly after the swap.
- **Files:** `app/components/AthleteCredibilityCarousel.tsx`, `app/page.tsx`
- **Complexity:** Trivial

### Task 3.3: Balance-only ProductGrid + protocol PDP selector removal

- `ProductGrid` (Desktop, Mobile, Tablet variants): remove `protocolVariant` state and the variant selector UI. Always render Balance imagery. `ProductCard` receives a fixed `protocolVariant="balance"` (or drop the prop entirely).
- Simplify or remove `getProtocolVariantImage`, `getProtocolLink`, and any `disabledProtocolVariants` plumbing that becomes dead weight.
- Protocol PDP (`/protocol/[id]`): remove the variant selector from the hero. Page still supports `id=1/2/3` URLs so existing deep links keep working — just no UI to switch between them.
- Leave add-to-cart, pricing, B2B tier logic untouched.
- **Files:** `app/components/home/ProductGrid.tsx`, `ProductGridMobile.tsx`, `ProductGridTablet.tsx`, `ProductCard.tsx`, `ProtocolVariantSelector.tsx`, `app/protocol/[id]/page.tsx` + associated hero component
- **Complexity:** Small-Medium
- **Risk:** Don't touch cart / pricing / B2B tier logic. Keep `/protocol/1` and `/protocol/2` URLs routable even if the UI is gone.

### Task 3.4: Style alignment across remaining homepage components

Mechanical token + spacing migration to match `/start` patterns: `brand-h2 mb-0` headings inside `mb-10` containers, `text-black/60` subtitles, accent CTAs, left-aligned, `brand-radius-card` radii. No content changes.

- `KeyBenefits` (Desktop + Mobile split) — large volume, fully mechanical
- `WhyConkaWorks` — already on tint background per Phase 2; tokens only
- `WhatToExpect` (Desktop + Mobile)
- `FoundersSection`
- `home/LandingFAQ`
- **Complexity:** Large (volume, not difficulty)
- **Risk:** KeyBenefits is 900+ lines — migrate tokens mechanically, do NOT restructure.

### Rabbit holes (Phase 3)

- **Protocol PDP refactor.** "Remove selector" can drift into broader protocol PDP cleanup. Scope limit: selector UI only. Metafield / routing / pricing left alone for Phase 4.
- **Orphaned hero components.** `Hero` / `HeroDesktop` / `HeroMobile` / `HeroBannerCarousel` may be referenced elsewhere. Grep before deleting — flag as orphaned in 3.1, delete in a follow-up only after verifying zero imports.
- **KeyBenefits volume.** Resist the urge to restructure. Token replacement only.
- **LandingHero paid-traffic headline on homepage.** Current headline `The only brain supplement you can measure` was tuned for cold Meta traffic. Confirm brand-voice/claims compliance is fine for the homepage context; if not, a homepage headline variant is a small addition.

### No-gos (Phase 3)

- No content rewrites (copy stays as-is unless trivially adjusted to fit the new layout).
- No changes to `/start` page-level code (only shared-component prop additions that default to existing behaviour).
- No protocol PDP changes beyond hiding the variant selector.
- No B2B / cart / pricing logic changes.
- No Navigation or Footer migration.
- No full protocol deprecation (that's Phase 4).

### Risks (Phase 3)

- Mobile LCP regression after hero swap. Verify on mobile after 3.1.
- Regression on `/start` via shared-component prop additions. Both pages need QA.
- Protocol deep links (`/protocol/1`, `/protocol/2`) losing the selector may confuse any active email/ad campaigns linking to them.

---

## Rabbit holes (earlier phases, retained)

- **WhyConkaWorks dark-to-light.** Currently designed for white-on-dark. Moving to light background may make it feel flat. Approach: migrate the tokens, review visually, adjust layout if needed but don't over-invest (content is good, just needs the right background treatment).
- **KeyBenefits complexity.** 900+ lines across Desktop/Mobile split. Migrate tokens mechanically but don't restructure the component.
- **Shared component regression.** Testimonials and CaseStudies are used on both `/` and `/start`. Any premium-to-brand token change affects both pages.

## No-gos

- No ProductGrid internal changes (Phase 3 replaces it)
- No new sections or content changes
- No protocol-related changes
- No changes to `/start` page-level code (only shared components that incidentally affect it)
- No Navigation or Footer migration (global components, separate scope)

## Risks

- WhyConkaWorks may look flat without dark background contrast. Visual review needed after migration.
- Shared component migration touches two live pages. Both need QA.
- Some components have hardcoded colours (inline hex/rgba) that won't be caught by a class-name search. Need to grep for inline style patterns.

---

## Jira tickets

| Ticket | Phase | Description |
|--------|-------|-------------|
| SCRUM-855 | 1 | Homepage performance + hero simplification |
| SCRUM-856 | 2 | Homepage visual alignment (brand-base migration) |
| SCRUM-885 | 3.1 | Homepage hero + "What it does" parity with /start — _In Review_ |
| SCRUM-886 | 3.2 | Homepage section tweaks (athlete title + case studies/testimonials reorder) |
| SCRUM-887 | 3.3 | Balance-only ProductGrid + protocol PDP selector removal |
| SCRUM-888 | 3.4 | Homepage component style alignment (KeyBenefits, WhyConkaWorks, WhatToExpect, Founders, FAQ) |

---

## References

- [Design System](../../branding/DESIGN_SYSTEM.md)
- [Landing Page Visual System](../../branding/LANDING_PAGE_VISUAL_SYSTEM.md)
- [Website Styling Migration](../WEBSITE_STYLING_MIGRATION.md)
- [Quality Standards](../../branding/QUALITY_STANDARDS.md)
- [Brand Voice](../../branding/BRAND_VOICE.md)
- `/start` page (`app/start/StartPageClient.tsx`) -- reference implementation
- Epic: SCRUM-763 (Website & CRO)
