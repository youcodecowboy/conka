# Soft-Tech Luxury Style Sheet Guidelines

**Purpose:** Single source of truth for the premium design system. This document explains **why** the system exists, **what** the rules are, and **how** to use them so that new sections and components are consistent and the site feels high-performing.

**Implementation:** Tokens and layout classes live in [app/premium-base.css](../app/premium-base.css). Premium pages use a wrapper (e.g. `.premium-pdp`) so these styles apply only where intended.

---

## 1. Purpose and principles

### Why

The site should not feel "piece by piece"—each section with its own padding, width, and radius. That leads to a fragmented look and extra decisions every time we add a section. Instead, we treat styling as a **framework**: fixed constraints for layout and rhythm so that any new content automatically aligns and feels premium.

### Goal

- **One horizontal track:** All section content aligns to the same vertical line; the eye does not jump left and right as you scroll.
- **Consistent vertical "air":** Sections are separated by predictable, generous padding so background and color transitions feel calm, not frantic.
- **One soft shape language:** Cards, bento cells, and case study blocks share the same radius and finish so the product feels like a single system.

### Outcome

A **consistent, repeatable system**. New sections and components "drop in" without ad-hoc spacing or widths. Layout and spacing are fixed so that the site feels coherent and high-performing—not redesigned per page, but built on one installable framework.

---

## 2. The three pillars

### 2.1 Standard track (horizontal consistency)

- **One max-width:** 1280px (`--premium-max-width`).
- **Defined gutters:** 1.25rem on mobile (`--premium-gutter-mobile`), 5vw on desktop (`--premium-gutter-desktop`).
- **Rule:** Every premium section uses the same rail. Content that must align to this track lives inside `.premium-track`, which is placed inside `.premium-section` or `.premium-section-luxury`. The section provides the gutters; the track provides the max-width and centering.

### 2.2 Air system (vertical rhythm)

- **Minimum vertical padding between sections:** Large top and bottom padding (e.g. 80px–160px on desktop via `--space-section-padding`, 5rem on mobile via `--space-section-padding-mobile`) so that background/color changes (e.g. black to white) do not feel like a collision. The space acts as a "palate cleanser."
- **Rule:** Sections using the luxury system are not allowed to sit closer than this. Use `.premium-section-luxury` (or the same padding variables) for new premium sections.

### 2.3 Soft shapes (component consistency)

- **Cards and boxes:** 40px radius (`--premium-radius-card`), soft off-white background (`--color-premium-bg-soft`), and minimal or no heavy borders. Use a very light stroke (`--color-premium-stroke`) only when a border is needed.
- **Rule:** All cards, bento cells, case study blocks, and similar surfaces use these tokens so the site has a "pebble" or soft-tech feel.

---

## 3. Token reference

All tokens are defined in [app/premium-base.css](../app/premium-base.css).

| Purpose | Variable | Typical use |
|--------|----------|-------------|
| **Track** | `--premium-max-width` | Max width of the content rail (1280px). |
| | `--premium-gutter-mobile` | Horizontal padding on mobile (1.25rem). |
| | `--premium-gutter-desktop` | Horizontal padding on desktop (5vw). |
| **Curve** | `--premium-radius-card` | Primary radius for cards/boxes (2.5rem / 40px). |
| | `--premium-radius-nested` | Smaller radius for elements inside cards (1.25rem / 20px). |
| | `--premium-radius-interactive` | Pills and buttons (9999px). |
| **Breath** | `--space-section-padding` | Section top/bottom padding desktop (clamp 5rem–10rem). |
| | `--space-section-padding-mobile` | Section top/bottom padding mobile (5rem). |
| | `--space-header-gap` | Gap between section title and content (4rem). |
| | `--space-text-gap` | Gap between title and body (1.5rem). |
| **Finish** | `--color-premium-bg-soft` | Soft background for cards (#F9F9F9). |
| | `--color-premium-stroke` | Very light border when needed (rgba 0,0,0,0.06). |
| **Typography** | `--letter-spacing-premium-title` | Section and title letter-spacing (-0.03em). |
| | `--premium-font-body-leading` | Body line-height (1.6). |
| | `--premium-body-max-width` | Max width for long copy (65ch). |

Use these variables in CSS or via utilities; avoid hard-coded values for layout and soft-tech finish.

---

## 4. Layout rules (how)

- **Every premium section** is wrapped in `.premium-section` (existing pages) or `.premium-section-luxury` (new or refactored sections that adopt the "air" system).
- **Content that aligns to the single track** is wrapped in `.premium-track` inside that section. The track has no horizontal padding; the section provides gutters.
- **Do not** introduce arbitrary max-widths or horizontal padding in components. Use the track and gutter variables only so the layout stays consistent.

Structure:

```
.premium-section-luxury   (padding: breath + gutters)
  └── .premium-track      (max-width, centered)
        └── content
```

---

## 5. Component rules

- **Cards, bento cells, case study blocks:** Use `var(--premium-radius-card)` and `var(--color-premium-bg-soft)`. For borders, use `none` or `1px solid var(--color-premium-stroke)`. The utility class `.premium-card-soft` applies these; add `.premium-card-soft-stroke` if a light border is needed.
- **Internal spacing inside cards:** Prefer the existing `--premium-space-*` scale (xs, s, m, l, xl) or a single "card padding" value (e.g. 3rem) so cards feel spacious but consistent.

---

## 6. Typography

- **Section titles:** Use the existing `.premium-section-heading` class and ensure letter-spacing uses `var(--letter-spacing-premium-title)` where the Soft-Tech system is adopted.
- **Body and description:** Use `line-height: 1.6` (e.g. `var(--premium-font-body-leading)`) and, for long prose, `max-width: var(--premium-body-max-width)` (65ch) so lines do not become too long.

---

## 7. Mobile

- **Radii:** Keep the same radius system on mobile (40px for cards). Do not shrink to small radii.
- **Padding and gutters:** Section padding and horizontal gutters reduce on small screens (see `.premium-section-luxury` media query: 5rem vertical, 1.25rem horizontal).
- **Bento and grids:** Stack to a single column on mobile; desktop keeps the multi-column layout with a tight gap (e.g. 1.5rem) so the 40px corners read as a connected layout.

---

## 8. Component migration status

**Purpose:** Track which components have been refactored to the Soft-Tech Luxury system and which remain to be migrated.

### Migrated components

- ✅ **FormulaBenefitsStats** (Desktop + Mobile) — Stripped section logic, uses Ink background (`--color-ink`), wrapped in `.premium-section-luxury` + `.premium-track` on [conka-flow page](../app/conka-flow/page.tsx).
- ✅ **Testimonials** (via TestimonialsAutoScrollStrip) — Stripped section logic, uses Bone background (`--color-bone`), wrapped in `.premium-section-luxury` + `.premium-track` on [conka-flow page](../app/conka-flow/page.tsx). Header aligns to track; marquee strip uses full-bleed pattern.

### Components to migrate (conka-flow page)

- ⏳ **ProductHero** / **ProductHeroMobile** — Deferred (not in scope for this phase).
- ⏳ **WhatToExpectTimeline** — Has section wrapper and custom padding; needs refactor.
- ⏳ **EditorialQuotesCarousel** — Needs review for section/padding removal.
- ⏳ **FormulaIngredients** — Needs review for section/padding removal.
- ⏳ **HowItWorks** — Needs review for section/padding removal.
- ⏳ **FormulaBenefits** — Currently wrapped in section on page; component may need review.
- ⏳ **FormulaCaseStudies** / **FormulaCaseStudiesMobile** — Needs review for section/padding removal.
- ⏳ **FormulaFAQ** — Needs review for section/padding removal.
- ⏳ **CrossSell** — Needs review for section/padding removal.
- ⏳ **StickyPurchaseFooter** / **StickyPurchaseFooterMobile** — Footer component; may have different requirements.

**Migration pattern:** For each component, follow the refactor steps: strip section tags, remove internal max-width/padding, apply soft-tech finish (radius, colors), update typography, then wrap in `.premium-section-luxury` + `.premium-track` on the page.

---

## 9. Checklist for new sections

Use this when adding or refactoring a premium section so it fits the system:

1. **Section wrapper:** Use `.premium-section` or `.premium-section-luxury` (with luxury padding and gutters).
2. **Track wrapper:** Place content that should align to the single rail inside `.premium-track`.
3. **No one-off paddings:** Do not add custom horizontal padding or max-width; use the section and track classes and variables.
4. **Cards and boxes:** Use `--premium-radius-card`, `--color-premium-bg-soft`, and optional `--color-premium-stroke`, or the `.premium-card-soft` utility.
5. **Typography:** Section titles use the premium heading class and title letter-spacing; body uses line-height 1.6 and, for long copy, max-width 65ch.

Following this checklist keeps the system **consistent and repeatable**: every new section and component benefits from the same constraints and feels part of one high-performing, Soft-Tech Luxury framework.
