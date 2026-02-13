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
- ✅ **WhatToExpectTimeline** — Migrated earlier; wrapped in `.premium-section-luxury` + `.premium-track` with `.premium-bg-bone` on conka-flow.
- ✅ **EditorialQuotesCarousel** — Migrated earlier; wrapped in `.premium-section-luxury` + `.premium-track` with `.premium-bg-surface` on conka-flow.
- ✅ **FormulaIngredients** — Stripped section/container and root padding; content-only. Wrapped in `.premium-section-luxury` + `.premium-track` with `.premium-bg-surface` on conka-flow (mobile + desktop).
- ✅ **HowItWorks** — Stripped section/container and bg; content-only. Wrapped in `.premium-section-luxury` + `.premium-track` with `.premium-bg-ink` on conka-flow (mobile + desktop).
- ✅ **FormulaBenefitsMobile** / **FormulaBenefits** (proof-and-science) — Stripped section/container; content-only. Wrapped in `.premium-section-luxury` + `.premium-track` with `.premium-bg-bone` on conka-flow (mobile + desktop).
- ✅ **FormulaCaseStudies** / **FormulaCaseStudiesMobile** — Stripped section/container and bg; content-only. Wrapped in `.premium-section-luxury` + `.premium-track` with `.premium-bg-ink` on conka-flow (mobile + desktop).
- ✅ **FormulaFAQ** — Stripped section and root max-width/padding; content-only. Wrapped in `.premium-section-luxury` + `.premium-track` with `.premium-bg-bone` on conka-flow (mobile + desktop).
- ✅ **CrossSell** (CrossSellDesktop + CrossSellMobile) — Stripped section/container and padding; content-only. Wrapped in `.premium-section-luxury` + `.premium-track` with `.premium-bg-bone` on conka-flow (mobile + desktop).

### Components to migrate (conka-flow page)

- ⏳ **ProductHero** / **ProductHeroMobile** — Deferred (not in scope for this phase).
- ⏳ **StickyPurchaseFooter** / **StickyPurchaseFooterMobile** — Footer component; may have different requirements.

**Migration pattern:** For each component, follow the refactor steps: strip section tags, remove internal max-width/padding, apply soft-tech finish (radius, colors), update typography, then wrap in `.premium-section-luxury` + `.premium-track` on the page.

---

## 9. Creating a new premium component

**Purpose:** What the component owns vs what the page owns.

**Component is responsible for:**
- **Content only** — No `<section>`, no root background, no `max-w` or `px-*` at the outer level. Return a fragment or a single content wrapper (e.g. header + grid).
- **Internal layout** — Grids, stacks, carousels; use `--premium-space-*` for gaps and internal rhythm.
- **Card/surface styling** — Radius `var(--premium-radius-card)`, soft bg `var(--color-premium-bg-soft)` or `bg-white` where needed; borders `var(--color-premium-stroke)`.
- **Typography** — Section headings with `letterSpacing: var(--letter-spacing-premium-title)`; body/annotation classes (`.premium-body`, `.premium-annotation`). If the component renders a card that sits on a dark section and must keep dark text, add the class `.premium-card-dark-text` to that card. For buttons, pills, or any element with its own light background on an Ink section, add `.premium-own-surface` so text stays dark (section typography rules would otherwise override).

**Page is responsible for:**
- **Section wrapper** — `<section className="premium-section-luxury premium-bg-{ink|bone|surface}" aria-label="…">`.
- **Track** — `<div className="premium-track">` around the component so content aligns to the system rail.
- **Background and color** — Section background and default text color (Ink = light text, Bone/Surface = dark text) come from the page; the component does not set them.

---

## 10. Migration best practices

**Purpose:** Step-by-step guide for refactoring existing components to the Soft-Tech Luxury system.

### Step-by-step migration process

1. **Strip section logic from component**
   - Remove `<section>` tags and `aria-labelledby` attributes (page wrapper provides these).
   - Remove outer containers with `max-w-[XXrem]`, `mx-auto`, or arbitrary max-widths.
   - Remove horizontal padding classes (`px-*`, `md:px-*`, `lg:px-*`). Gutters come from the page wrapper.

2. **Remove internal padding and spacing**
   - Strip all `px-*` classes from component root and major containers.
   - Keep internal spacing for content hierarchy (e.g., gaps between grid items, margins between title and body).
   - Use spacing variables (`--premium-space-*`) for internal component spacing, not layout gutters.

3. **Update backgrounds**
   - Remove `bg-black`, `bg-white`, or `style={{ background: "..." }}` from components.
   - Components should not set their own background colors; the page wrapper handles section backgrounds.
   - Exception: Cards and nested surfaces can use `var(--color-premium-bg-soft)` for their own backgrounds.

4. **Apply soft-tech finish**
   - Update border radius: replace `rounded-lg`, `rounded-xl`, etc. with `var(--premium-radius-card)` (40px) for cards/boxes.
   - Update borders: remove heavy borders (`border-2`, `border-black`); use `none` or `1px solid var(--color-premium-stroke)` if needed.
   - Update button radius: use `var(--premium-radius-interactive)` (pill) for buttons.

5. **Update typography**
   - Ensure headings use `var(--letter-spacing-premium-title)` (can be applied via inline style: `style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}`).
   - Ensure body text uses `line-height: 1.6` (`var(--premium-font-body-leading)`).
   - For long prose blocks, add `max-width: var(--premium-body-max-width)` (65ch).

6. **Component structure after migration**
   - Component should return only its content structure (grids, cards, text).
   - No section tags, no max-width containers, no horizontal padding.
   - Component is a "modular piece" ready to be wrapped by the page.

7. **Update page wrapper**
   - Wrap component in `<section className="premium-section-luxury bg-[var(--color-ink)]">` (or `--color-bone` for light sections).
   - Add `aria-labelledby` if the section needs a heading ID.
   - Wrap component content in `<div className="premium-track">` for track alignment.

### Common pitfalls to avoid

- **Don't** keep section tags "just in case" — the page wrapper provides them.
- **Don't** add "safety" padding — trust the system's gutter variables.
- **Don't** mix old and new patterns — fully commit to the new system.
- **Don't** hard-code colors — use CSS variables (`--color-ink`, `--color-bone`).
- **Don't** create component-specific max-widths — use `.premium-track` instead.

### Example: Before and after

**Before (component manages its own section):**
```tsx
<section className="bg-black text-white">
  <div className="mx-auto max-w-[90rem] px-6 md:px-12">
    <div className="grid grid-cols-2 gap-12">
      {/* content */}
    </div>
  </div>
</section>
```

**After (component is modular, page orchestrates):**
```tsx
// Component (FormulaBenefitsStatsDesktop.tsx)
<div className="grid grid-cols-2 gap-12">
  {/* content */}
</div>

// Page (conka-flow/page.tsx)
<section className="premium-section-luxury bg-[var(--color-ink)] text-white">
  <div className="premium-track">
    <FormulaBenefitsStats formulaId="01" />
  </div>
</section>
```

---

## 11. Page-level color orchestration

**Purpose:** How parent pages control section backgrounds and color transitions to create visual rhythm.

### The principle: page controls color, component controls content

In the Soft-Tech Luxury system, **the page is the orchestrator** of visual rhythm. Components are content-only; pages decide when sections are dark (Ink) or light (Bone), creating intentional transitions that feel calm and premium.

### Color palette

- **`--color-base-black` (Ink)** — Charcoal (#111111). Use for high-impact, dark sections.
- **`--color-base-white` (Bone)** — Off-white (#F9F9F9). Use for light sections and "palate cleanser" transitions.
- **`--color-base-surface`** — Structural grey (#F4F6F5). Use for bento grids, comparison tables.

### Text on background (required contrast)

- **On black (Ink) bases:** Use **white** or **bone** text only. Use class `premium-bg-ink` so `--text-on-ink` (white) and `--text-on-ink-muted` (bone) apply.
- **On Bone or Surface bases:** Use **black** or **bone** text only. Use `premium-bg-bone` or `premium-bg-surface` so `--text-on-light` (black) and `--text-on-light-muted` (#444) apply.

Use the utility classes `premium-bg-ink`, `premium-bg-bone`, and `premium-bg-surface` with `premium-section-luxury` so both background and text color are set correctly.

### How to orchestrate colors on a page

1. **Define section purpose**
   - High-impact sections (stats, hero content) → `bg-[var(--color-ink)]` with `text-white`.
   - Light, readable sections (testimonials, details) → `bg-[var(--color-bone)]` with default text color.
   - Alternating pattern creates visual rhythm and prevents "frantic" transitions.

2. **Apply at page level**
   ```tsx
   {/* Dark section for high-impact stats */}
   <section className="premium-section-luxury bg-[var(--color-ink)] text-white">
     <div className="premium-track">
       <FormulaBenefitsStats formulaId="01" />
     </div>
   </section>

   {/* Light "palate cleanser" section for testimonials */}
   <section className="premium-section-luxury bg-[var(--color-bone)]">
     <div className="premium-track">
       <Testimonials testimonials={testimonials} />
     </div>
   </section>
   ```

3. **Leverage the "air" system**
   - The large vertical padding (`--space-section-padding`) between sections creates a "palate cleanser" effect.
   - When transitioning from Ink to Bone (or vice versa), the generous spacing prevents the eye from feeling a "collision."
   - This spacing is built into `.premium-section-luxury`, so color transitions automatically feel calm.

4. **Component independence**
   - Components should **never** set their own background colors (except for nested cards/surfaces).
   - Components should **never** assume they're in a dark or light section.
   - Use semantic color classes (e.g., `text-white` for text that must be white) only when the component is wrapped in a dark section.

### Color transition patterns

**Effective patterns:**
- Ink → Bone → Ink (creates rhythm, prevents monotony).
- Bone → Ink → Bone (highlights important sections).
- Consistent Bone sections (for long-form content, details).

**Avoid:**
- Rapid Ink → Bone → Ink → Bone (feels frantic without proper spacing).
- Components that change their own backgrounds based on context (breaks the system).

### Full-bleed elements and color orchestration

Some components have full-bleed elements (e.g., marquee strips) that intentionally break out of the track. These should still respect the section's background color:

```tsx
<section className="premium-section-luxury bg-[var(--color-bone)]">
  <div className="premium-track">
    {/* Header aligns to track */}
    <TestimonialsHeader />
  </div>
  {/* Full-bleed marquee inherits section background */}
  <TestimonialsMarquee />
</section>
```

The full-bleed element inherits the section's background, maintaining visual consistency while breaking out of the track for impact.

### Benefits of page-level orchestration

- **Consistency:** All pages using the system have predictable color patterns.
- **Maintainability:** Change section colors in one place (the page), not in every component.
- **Flexibility:** Same component can appear in dark or light sections without modification.
- **Visual rhythm:** Page-level control enables intentional pacing and transitions.

---

## 12. Checklist for new sections

Use this when adding or refactoring a premium section so it fits the system:

1. **Section wrapper:** Use `.premium-section` or `.premium-section-luxury` (with luxury padding and gutters).
2. **Track wrapper:** Place content that should align to the single rail inside `.premium-track`.
3. **No one-off paddings:** Do not add custom horizontal padding or max-width; use the section and track classes and variables.
4. **Cards and boxes:** Use `--premium-radius-card`, `--color-premium-bg-soft`, and optional `--color-premium-stroke`, or the `.premium-card-soft` utility.
5. **Typography:** Section titles use the premium heading class and title letter-spacing; body uses line-height 1.6 and, for long copy, max-width 65ch.

Following this checklist keeps the system **consistent and repeatable**: every new section and component benefits from the same constraints and feels part of one high-performing, Soft-Tech Luxury framework.
