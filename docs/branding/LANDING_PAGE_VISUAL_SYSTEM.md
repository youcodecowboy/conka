# Landing Page Visual System

> **Status:** Implemented
> **Created:** 2026-04-02
> **Last updated:** 2026-04-02
> **Context:** The `/start` landing page felt visually heavy, sections lacked distinction, and the brand accent colour was absent. This document captures the evidence-based visual system applied to the landing page (and to be extended to other pages over time).

---

## Why this exists

The landing page had four problems:

1. **Monotonous backgrounds.** 7 of 9 sections were pure white. The two non-white sections (`#000000` black, `#ccccca` neutral) created jarring contrast rather than flow.
2. **No consistent typography spacing.** `brand-h*` classes had built-in `margin-bottom` that conflicted with per-component Tailwind spacing, creating inconsistent heading-to-content gaps.
3. **No text colour hierarchy.** Every component picked its own opacity (0.3, 0.4, 0.5, 0.6, 0.7) via inline styles with no system.
4. **Accent colour `#4058bb` was completely absent.** CTA buttons were black. No element on the page used the brand colour.

---

## Evidence base

Analysis of 4 high-converting D2C supplement/wellness landing pages:

| Site | Builder | Base canvas | Tint(s) | Dark sections | Accent on CTAs? |
|------|---------|------------|---------|--------------|-----------------|
| **Headstrong** | -- | White (~80%) | `#f7f7f7` (97% lightness) | 1 (hero) | Sparingly |
| **Overload** | January Brands | White (~70%) | `#f5f5f5` (96%), `#f0fff3` (mint wash) | 0 | Yes |
| **AG1** | In-house | White (~60%) | "Stone" warm grey (~95%) | 2 | Yes |
| **Magic Mind** | -- | White + `#efefef` (~70/30) | `#efefef` (94% lightness) | 1 (nav) | Yes |

### Key findings

1. **White base (55-80%).** Visual variety comes from one near-white tint, not background alternation. A consistent base creates a unified figure-ground relationship. Alternating backgrounds force the eye to re-orient at every section, creating the "heavy scroll" sensation.

2. **One tint, within 3-6% lightness of white.** All four sites use a single tint in the 94-97% range. At this level you register "different zone" subconsciously without the section feeling coloured (Weber-Fechner law).

3. **Brand accent lives on CTAs, not backgrounds.** Every reference site uses its accent as the CTA button colour. When accent only appears on clickable elements, users learn that "colour = action."

4. **Maximum one dark section (if any).** Von Restorff isolation effect -- a single distinctive item is remembered disproportionately. Multiple dark sections dilute this. Overload uses none.

---

## Decisions (final, as implemented)

### Background palette

Two backgrounds: white and one tint. That's it.

| Token | Hex | Lightness | Role |
|-------|-----|-----------|------|
| `--brand-white` | `#ffffff` | 100% | Default canvas. ~55-60% of sections. |
| `--brand-tint` | `#f4f5f8` | ~96% | Soft zone break. Faint blue-grey, echoes accent. ~40% of sections. |

**Removed:** `#ccccca` as a section background (too heavy at 80% lightness). Retained as `--brand-neutral` for dividers/borders only.

**Removed:** Black and deep-grey as section backgrounds on the landing page.

**Why one tint, not multiple:** We initially considered warm/cool/accent-wash as three tints. In practice, one tint is simpler, matches what every reference site does, and avoids the question of "which tint for which section." The evidence says one.

### Landing page section cadence

| # | Section | Background | Reasoning |
|---|---------|-----------|-----------|
| 1 | Hero | **white** | Clean entry, product image provides visual weight |
| 2 | Benefits + trust | **tint** | Credibility section. Accent icons + accent CTA on the tinted background makes it feel branded without a separate accent-wash colour. |
| 3 | Product split | **white** | Breathing room, let the product cards speak |
| 4 | What's Inside | **tint** | Signals shift to detail/depth content |
| 5 | Testimonials | **white** | Testimonial cards provide their own visual weight |
| 6 | Guarantee + app | **tint** | Soft zone for risk-reversal argument |
| 7 | Case Studies | **white** | Data cards self-distinguish |
| 8 | FAQ | **white** | Clean, low-friction |
| 9 | Disclaimer | **tint** | Quiet sign-off, visually separates legal from content |

**Rule:** Never place two identical backgrounds adjacent. White/tint alternation at this lightness level feels like gentle rhythm, not harsh striping.

### Accent colour `#4058bb`

| Where | How |
|-------|-----|
| **CTA buttons** | All primary CTAs use accent bg + white text. This is the main interactive signal. |
| **Benefits icon circles** | Accent at ~8% opacity background, accent-coloured icon stroke |
| **Guarantee pill** | Accent at ~10% opacity background, accent text |
| **Trust badge icons** | Accent at ~60% opacity |
| **Nowhere else** | Keeps the signal clean -- accent = action or credibility |

### Typography spacing

`brand-h*` classes own typography only (font, size, weight, tracking, line-height). Components override the built-in margin with `mb-0` and control spacing via Tailwind.

**Heading block pattern (consistent across all sections):**

```jsx
<div className="mb-10">                           {/* 2.5rem gap to content below */}
  <h2 className="brand-h2 mb-0">Heading</h2>
  <p className="mt-2 text-black/60">Subtitle</p>  {/* tight to heading */}
</div>
```

### Text colour tiers

4 fixed tiers. Pick based on content role. No in-between values.

| Tier | Opacity | Tailwind | What it's for |
|------|---------|----------|--------------|
| **Primary** | 100% | `text-black` | Headings, card titles, key statements |
| **Secondary** | 80% | `text-black/80` | Body copy, descriptions, benefit text |
| **Tertiary** | 60% | `text-black/60` | Captions, subtitles, metadata, supporting detail |
| **Muted** | 40% | `text-black/40` | Legal footnotes, PMIDs, disclaimers |

**Rule:** If something doesn't clearly fit a tier, it goes in the tier above (more visible).

### Anchor/footnote symbols

Footnote reference symbols (`§`, `††`, `¶`, `^^`, `*`) in headings and body copy use `<sup>` with muted styling:

```jsx
<sup className="text-[0.5em] text-black/40 align-super">§</sup>
```

They are reference markers, not content -- they should not compete with the text for attention.

### CSS class responsibility split

| CSS classes own | Tailwind utilities own |
|----------------|----------------------|
| Typography (font, size, weight, tracking, line-height) | Layout (margins, padding, gaps, alignment) |
| Section wrapper (padding, gutters) | Colour and opacity (`text-black/80`) |
| Track (max-width, centering) | Responsive overrides (`lg:flex-row`) |
| Background colours (section-level) | Component-internal spacing |

### Product split cards

Each product card contains its own bottle image (transparent PNG) rather than a shared AM/PM lifestyle shot above both cards. This makes each card self-contained and works better on the light background system.

- Flow: `/formulas/conkaFlow/FlowNoBackground.png`
- Clear: `/formulas/conkaClear/ClearNoBackground.png`
- Images use `object-contain scale-200` to fill the container while cropping whitespace from the source asset.

---

## What this does NOT cover

- Homepage (`app/page.tsx`) -- still uses `premium-base.css`. Migrate separately.
- Funnel page (`app/funnel/`) -- has its own visual system (no nav/footer, step indicator). Review separately.
- Product pages (`/conka-flow`, `/conka-clarity`) -- still on legacy. Migrate after landing page is validated.

---

## References

- [Design System](./DESIGN_SYSTEM.md) -- updated alongside this work
- [Brand Base CSS](../../app/brand-base.css) -- token implementation
- [Website Simplification Plan](../development/WEBSITE_SIMPLIFICATION_PLAN.md) -- parent initiative
- [Quality Standards](./QUALITY_STANDARDS.md) -- quality bar
- Competitor analysis: Headstrong (`headstrongltd.com`), Overload (`ovrload.co/pages/gummy`), AG1 (`drinkag1.com`), Magic Mind (`magicmind.com`)
