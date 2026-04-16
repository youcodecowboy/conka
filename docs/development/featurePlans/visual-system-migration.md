# Visual System Migration: Product, Protocol & Content Pages

> **Status:** Not Started
> **Created:** 2026-04-16
> **Last updated:** 2026-04-16
> **Appetite:** 2 days
> **Design system:** Migrating from `premium-base.css` to `brand-base.css`
> **Parent:** Continues the work started in `homepage-upgrade.md`

---

## Problem

The homepage has been migrated to the new `brand-base.css` visual system (white/tint backgrounds, 4-tier text opacity, accent CTAs, flatter aesthetic). Five other pages still use the legacy `premium-base.css` system with dark dramatic sections, different card radii, and no accent colour. This creates visual inconsistency across the site.

## Who it serves

All traffic. Brand coherence matters most for cold paid traffic bouncing between pages.

## Business impact

CRO/Acquisition. Visual inconsistency undermines trust. A user clicking from the polished homepage to a product page that looks subtly different feels "off" even if they can't articulate why.

---

## Phase status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Product pages (conka-flow + conka-clarity) | Done |
| 2 | Protocol page (Balance, id=3) | Not Started |
| 3 | Content pages (science + our-story) | Not Started |

---

## Key decisions

### Flattening backgrounds
All `--color-neuro-blue-dark` and `--color-neuro-blue-light` section backgrounds become `brand-bg-white` / `brand-bg-tint` in alternation. No dark dramatic sections on any page. This aligns with the Landing Page Visual System doc.

### Pragmatic CSS migration strategy
- **Do not delete premium-base.css.** Other pages (professionals, account, funnel) may still reference it.
- **Copy necessary tokens to brand-base.css** (neuro-blue vars, radius values, any referenced vars) so migrated components reference brand-base only.
- **Migrated components use brand-* classes.** New class references point to brand-base.css.
- **Add a TODO comment to premium-base.css** noting it should be retired once all pages are migrated.
- **Both CSS files remain loaded globally** via globals.css. No breaking changes.

### What stays
- `font-clinical` -- defined in globals.css, not premium-specific. No change needed.
- Navigation and Footer -- untouched.
- Homepage -- already migrated, don't touch (except 4 small ProductGrid CSS var references).

### What goes
- `premium-annotation` (cursive font) -- replaced with `brand-caption` or Tailwind text utilities.
- `text-white` on any component that assumed a dark background -- must be audited and removed.
- Inline `backgroundColor: "var(--color-neuro-blue-*)"` on page wrappers -- replaced with `brand-bg-white` / `brand-bg-tint`.

---

## CSS token migration plan

Tokens to copy from premium-base.css to brand-base.css:

```css
/* Neuro-blue palette (used by components for accents/borders, not just backgrounds) */
--color-neuro-blue-start: #c8d0ea;
--color-neuro-blue-end: #4058bb;
--gradient-neuro-blue-accent: linear-gradient(to right, var(--color-neuro-blue-start), var(--color-neuro-blue-end));

/* Radius tokens still referenced by components */
--premium-radius-card: 2.5rem;      /* review: brand-card uses 2rem */
--premium-radius-nested: 1.5rem;    /* review: brand-container uses 1.5rem -- same */
--premium-radius-interactive: 100px; /* review: brand-btn uses 1rem */
```

Note: `--color-neuro-blue-light` and `--color-neuro-blue-dark` are NOT copied -- they're only used as section backgrounds, which are being flattened. If any component uses them for borders/accents (not backgrounds), replace with `--brand-accent` or `--brand-tint` inline.

---

## Component sharing map

Understanding which components are shared across pages prevents breaking one page while fixing another.

### Shared with homepage (careful -- already migrated)
| Component | Pages | Premium classes inside? |
|-----------|-------|------------------------|
| WhatToExpect | Homepage, Flow, Clarity | None (already clean) |
| Testimonials | Homepage, Flow, Clarity, Protocol | None (already clean) |
| ProductGrid | Homepage, Flow, Clarity, Protocol | 4 refs: `letter-spacing-premium-title` (1), `premium-radius-card` (3) |

### Shared between product pages only
| Component | Pages |
|-----------|-------|
| ProductHero / ProductHeroMobile | Flow, Clarity |
| FormulaIngredients | Flow, Clarity |
| FormulaBenefits / FormulaBenefitsMobile / FormulaBenefitsStats | Flow, Clarity |
| FormulaFAQ | Flow, Clarity |
| HowItWorks | Flow, Clarity |
| FormulaCaseStudies / FormulaCaseStudiesMobile | Flow, Clarity, Protocol |
| StickyPurchaseFooter / StickyPurchaseFooterMobile | Flow, Clarity, Protocol |

### Protocol-only components
ProtocolHero/Mobile, ProtocolCalendar/Mobile, ProtocolFAQ, CycleTrap, CycleBreak (Desktop/Mobile), CycleTransformation

### Science-only components
ScienceHero, ScienceQuote, ScienceAdaptogens, SciencePillars, SynergyChart, ScienceDifferent, EvidenceSummary

### Our-story-only components
OurStoryHero, OurStoryHeroMobile, StorySection, OurStoryCTA

---

## Phase 1: Product pages (conka-flow + conka-clarity)

These two pages are 95% identical in structure. They share all the same components. Migrating a shared component fixes both pages at once.

### Task sequence

**1.1 CSS prep: copy tokens to brand-base.css**
- Copy neuro-blue gradient vars and any referenced radius tokens
- Add TODO comment to premium-base.css header
- Complexity: Small
- Files: `app/brand-base.css`, `app/premium-base.css`

**1.2 ProductGrid -- fix 4 CSS var references**
- `letter-spacing-premium-title` -> inline `-0.02em` or brand token
- `premium-radius-card` -> `rounded-2xl` or brand token
- Verify homepage still renders correctly after
- Complexity: Small
- Files: `app/components/home/ProductGrid.tsx`

**1.3 ProductHero + ProductHeroMobile**
- Replace premium-box, premium-display, premium-data, premium-body with brand equivalents
- Complexity: Medium
- Files: `app/components/product/ProductHero.tsx`, `ProductHeroMobile.tsx`

**1.4 FormulaIngredients**
- `premium-section-heading` -> `brand-h2`, letter-spacing var
- Complexity: Small
- Files: `app/components/product/FormulaIngredients.tsx`

**1.5 FormulaBenefits + FormulaBenefitsMobile + FormulaBenefitsStats + BenefitDetail**
- Section headings, body text, subtitle, card-soft classes
- BenefitDetail has highest density of premium classes (8+) -- may take extra time
- Complexity: Medium-Large
- Files: `app/components/product/FormulaBenefits*.tsx`, `BenefitDetail.tsx`

**1.6 HowItWorks**
- `premium-annotation` -> brand-caption or Tailwind
- `premium-radius-nested`, `premium-bg-soft`, `premium-stroke` -> brand equivalents
- Complexity: Medium
- Files: `app/components/product/HowItWorks.tsx`

**1.7 FormulaFAQ**
- Card radius + body text migration
- Complexity: Small
- Files: `app/components/product/FormulaFAQ.tsx`

**1.8 FormulaCaseStudies + FormulaCaseStudiesMobile**
- Data cards, border styles, premium-heading
- Also used on protocol page (Phase 2 gets it for free)
- Complexity: Medium
- Files: `app/components/FormulaCaseStudies.tsx`

**1.9 StickyPurchaseFooter + StickyPurchaseFooterMobile**
- Extensive premium usage but self-contained
- Also used on protocol page (Phase 2 gets it for free)
- Complexity: Medium
- Files: `app/components/product/StickyPurchaseFooter*.tsx`

**1.10 Page wrappers: conka-flow/page.tsx + conka-clarity/page.tsx**
- `premium-section-luxury` -> `brand-section`
- `premium-track` -> `brand-track`
- `premium-bg-bone` -> `brand-bg-tint`
- All `backgroundColor: "var(--color-neuro-blue-*)"` -> `brand-bg-white` or `brand-bg-tint` (alternating)
- `premium-hero-first` -> `brand-hero-first`
- `premium-pdp` -> keep `overflow-x-hidden` on page root div, or use `brand-page`
- Remove `text-white` from sections that were dark, now light
- Complexity: Medium
- Files: `app/conka-flow/page.tsx`, `app/conka-clarity/page.tsx`

### Text colour audit (critical)
When flattening dark sections to light backgrounds, every component that renders inside those sections must be checked for `text-white` or light text assumptions. Components to audit:
- FormulaBenefitsStats (was on neuro-blue-dark)
- Testimonials section wrapper (was on neuro-blue-light -- probably fine, text is dark)
- FormulaCaseStudies (was on neuro-blue-dark -- **will have white text**)
- HowItWorks (was on neuro-blue-light -- probably fine)

---

## Phase 2: Protocol page (Balance, id=3)

Components already migrated in Phase 1: StickyPurchaseFooter, FormulaCaseStudies, Testimonials, ProductGrid.

### Remaining tasks

**2.1 ProtocolHero + ProtocolHeroMobile**
- Complexity: Medium
- Files: `app/components/protocol/ProtocolHero*.tsx`

**2.2 CycleTrap + CycleBreak (Desktop/Mobile) + CycleTransformation**
- Biggest pieces. CycleBreak has internal `<section>` wrappers with `premium-bg-bone`.
- Flatten dark backgrounds, remove `text-white` assumptions.
- Complexity: Large
- Files: `app/components/protocol/why/*.tsx`

**2.3 ProtocolCalendar + ProtocolCalendarMobile + ProtocolFAQ**
- Section headings, annotation, radius
- Complexity: Medium
- Files: `app/components/protocol/ProtocolCalendar*.tsx`, `ProtocolFAQ.tsx`

**2.4 Page wrapper: protocol/[id]/page.tsx**
- Same pattern as product pages
- Flatten all neuro-blue backgrounds to white/tint alternation
- Complexity: Medium
- Files: `app/protocol/[id]/page.tsx`

---

## Phase 3: Content pages (science + our-story)

Self-contained component sets. No overlap with other pages.

### Tasks

**3.1 Science components (7 files)**
- ScienceHero, ScienceQuote, ScienceAdaptogens, SciencePillars, SynergyChart, ScienceDifferent, EvidenceSummary
- Mostly `premium-section-heading`, `premium-body-sm`, `premium-card-soft`, `letter-spacing-premium-title`
- Flatten dark pillars section (was `neuro-blue-dark` with `text-white`)
- Flatten ink evidence section (`premium-bg-ink` with `text-white`)
- Complexity: Medium (volume, but mechanical)
- Files: `app/components/science/*.tsx`

**3.2 Our Story components (4 files)**
- OurStoryHero, OurStoryHeroMobile, StorySection, OurStoryCTA
- Same class patterns
- StorySection has theme-based dark/light alternation -- flatten to white/tint
- OurStoryCTA was on `premium-bg-ink` with `text-white` -- flatten
- Complexity: Medium
- Files: `app/components/our-story/*.tsx`

**3.3 Page wrappers: science/page.tsx + our-story/page.tsx**
- Same pattern as other pages
- Complexity: Small
- Files: `app/science/page.tsx`, `app/our-story/page.tsx`

---

## Rabbit holes

1. **`premium-pdp` removal.** This wrapper prevents horizontal overflow and affects sticky positioning on product/protocol pages. Removing it might cause layout issues. Safest approach: keep `overflow-x-hidden` on the page root div.
2. **BenefitDetail density.** 8+ premium class instances. Could take longer than expected.
3. **CycleBreak internal sections.** These components have their own `<section>` wrappers with backgrounds. Need to either refactor to content-only (pages own wrappers) or accept the deviation for now.
4. **Dark-to-light text cascade.** The biggest risk. Missing one `text-white` removal creates invisible text. Audit every component that lived inside a dark section.

## No-gos

- Don't touch Navigation or Footer
- Don't redesign components -- same content, same layout, just the class system
- Don't remove premium-base.css
- Don't restructure section order on any page
- Don't touch homepage components beyond ProductGrid (4 refs)
- Don't touch quiz, funnel, professionals, or account pages

---

## Class migration reference

Quick lookup for the most common swaps:

| Premium class | Brand replacement | Notes |
|---------------|-------------------|-------|
| `premium-section-luxury` | `brand-section` | Same responsive padding logic |
| `premium-hero-first` | `brand-hero-first` | Same minimal top padding |
| `premium-track` | `brand-track` | Identical: max-width 1280px |
| `premium-bg-bone` | `brand-bg-tint` | #f9f9f9 -> #f4f5f8 |
| `premium-bg-ink` | `brand-bg-white` or `brand-bg-tint` | Flattened -- no dark sections |
| `premium-bg-surface` | `brand-bg-tint` | #f4f6f5 -> #f4f5f8 |
| `premium-section-heading` | `brand-h2` | With `mb-0`, spacing owned by parent |
| `premium-body` | `brand-body` | 1.125rem -> 1rem |
| `premium-body-sm` | `brand-caption` | 0.875rem, same |
| `premium-card-soft` | `brand-card` | 40px -> 32px radius |
| `premium-card-soft-stroke` | `brand-card-bordered` | Adds 1px border |
| `premium-annotation` | `brand-caption` or Tailwind `text-sm italic` | Cursive removed |
| `premium-section-subtitle` | `brand-body` or Tailwind | Case-by-case |
| `premium-data` | `brand-data` | Monospace preserved |
| `style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}` | `style={{ letterSpacing: "-0.02em" }}` or brand token | |
| `var(--premium-radius-card)` | `rounded-2xl` (32px) | Or `var(--brand-radius-card)` |
| `var(--premium-radius-nested)` | `rounded-xl` (24px) | Or `var(--brand-radius-container)` |
| `var(--color-neuro-blue-dark)` as bg | `brand-bg-white` or `brand-bg-tint` | Flattened |
| `var(--color-neuro-blue-light)` as bg | `brand-bg-tint` | Flattened |
| `premium-pdp` | `overflow-x-hidden` on page root | Keep the overflow fix |

---

## References

- Landing Page Visual System: `docs/branding/LANDING_PAGE_VISUAL_SYSTEM.md`
- Design System: `docs/branding/DESIGN_SYSTEM.md`
- Homepage upgrade plan: `docs/development/featurePlans/homepage-upgrade.md`
- Brand base CSS: `app/brand-base.css`
- Premium base CSS (legacy): `app/premium-base.css`
