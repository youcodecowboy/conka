# Homepage Upgrade: Performance + Visual Alignment

> **Status:** Scoped
> **Created:** 2026-04-07
> **Appetite:** 2-3 days (Phase 1 + Phase 2)
> **Design system:** Migrate from `premium-base.css` to `brand-base.css`
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
| 3 | Product Simplification (Flow/Clear/Balance only) | Future (separate scope) |

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

## Rabbit holes

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

---

## References

- [Design System](../../branding/DESIGN_SYSTEM.md)
- [Landing Page Visual System](../../branding/LANDING_PAGE_VISUAL_SYSTEM.md)
- [Website Styling Migration](../WEBSITE_STYLING_MIGRATION.md)
- [Quality Standards](../../branding/QUALITY_STANDARDS.md)
- [Brand Voice](../../branding/BRAND_VOICE.md)
- `/start` page (`app/start/StartPageClient.tsx`) -- reference implementation
- Epic: SCRUM-763 (Website & CRO)
