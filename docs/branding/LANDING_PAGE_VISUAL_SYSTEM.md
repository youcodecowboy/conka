# Landing Page Visual System

> **Status:** Plan agreed, not yet implemented
> **Created:** 2026-04-02
> **Context:** The `/start` landing page feels visually heavy, sections lack distinction, and the brand accent colour is absent. This plan establishes an evidence-based visual system for the landing page (and eventually other pages).

---

## Why this exists

The current landing page has three problems:

1. **Monotonous backgrounds.** 7 of 9 sections are pure white. The two non-white sections (`#000000` black, `#ccccca` neutral) create jarring contrast rather than flow.
2. **No consistent typography spacing.** `brand-h*` classes have built-in `margin-bottom` that conflicts with per-component Tailwind spacing, so every section has a different heading-to-content gap.
3. **No text colour hierarchy.** Every component picks its own opacity (0.3, 0.4, 0.5, 0.6, 0.7) via inline styles. There's no system for what gets which weight.
4. **Accent colour `#4058bb` is completely absent.** CTA buttons are black — indistinguishable from body text, headings, and the dark section background. No element on the page uses the brand colour.

---

## Evidence base

Analysis of 4 high-converting D2C supplement/wellness landing pages from the project reference list:

| Site | Builder | Base canvas | Tint(s) | Dark sections | Accent on CTAs? | Accent on backgrounds? |
|------|---------|------------|---------|--------------|-----------------|----------------------|
| **Headstrong** | — | White (~80%) | `#f7f7f7` (97% lightness) | 1 (hero) | Sparingly | No |
| **Overload** | January Brands | White (~70%) | `#f5f5f5` (96%), `#f0fff3` (mint wash) | 0 | Yes — all mobile CTAs | Yes — one mint wash section (accent at ~4%) |
| **AG1** | In-house | White (~60%) | "Stone" warm grey (~95%) | 2 (testimonials, offer) | Yes — every primary CTA | No |
| **Magic Mind** | — | White + `#efefef` (~70/30) | `#efefef` (94% lightness) | 1 (nav) | Yes — all buttons | No |

### Key findings

**1. The base is overwhelmingly white (55-80%).** Visual variety comes from one or two near-white tints, not background alternation. A consistent white base creates a unified figure-ground relationship — content is the figure, white is the ground. Alternating backgrounds force the eye to re-orient at every section boundary, creating the "heavy, endless scroll" sensation.

**2. Only one tint, within 3-6% lightness of white.** All four sites use a single near-white tint in the 94-97% lightness range. At this range, you register "different zone" subconsciously without the section feeling coloured. This aligns with the Weber-Fechner law — below ~3% lightness shift it's invisible, above ~8% it feels like a deliberate colour. The sweet spot is 4-6%.

CONKA's current `#ccccca` neutral is at 80% lightness — a 20% drop from white. That's not a subtle break, it's a painted wall.

**3. Maximum one dark section, positioned for credibility.** When present, dark sections are used for social proof or authority content. The Von Restorff isolation effect means a single distinctive item is remembered disproportionately. Multiple dark sections dilute this.

**4. Brand accent lives on CTAs, not backgrounds.** Every reference site uses its accent colour as the CTA button colour. None use accent as a full section background (Overload's mint wash at 4% opacity is the closest). When accent only appears on clickable elements, users learn within seconds that "that colour = action." If accent appears everywhere, it loses signal value.

**5. Overload's accent wash pattern.** Overload uses their green at ~4% opacity (`#f0fff3`) as one section background. This is the only evidence-supported way to bring accent into backgrounds — so faint it barely registers as a colour, used on exactly one section.

---

## Decisions

### Background palette

| Token | Hex | Lightness | Role |
|-------|-----|-----------|------|
| `--brand-white` | `#ffffff` | 100% | Default canvas. ~56% of sections. |
| `--brand-warm` | `#f5f4f2` | ~96% | Soft zone break. ~33% of sections. Start here. |
| `--brand-cool` | `#f3f4f7` | ~96% | Alternative tint for A/B testing. Available but not default. |
| `--brand-accent-wash` | `#f2f3f8` | ~96% | `#4058bb` at ~4% opacity on white. One section only. ~11%. |

**Removed:** `#ccccca` as a section background. Retained as `--brand-neutral` for dividers/borders only.

**Removed:** `--brand-bg-black` and `--brand-bg-deep-grey` as section backgrounds on the landing page. Black remains available for other pages but is not used on `/start`.

### Landing page section cadence

| # | Section | Background | Reasoning |
|---|---------|-----------|-----------|
| 1 | Hero | **white** | Clean entry, product image provides visual weight |
| 2 | Benefits + trust | **accent-wash** | Branded credibility section. The one section that feels distinctly *CONKA*. Accent icons, accent CTA. |
| 3 | Product split | **white** | Breathing room, let the product cards speak |
| 4 | What's Inside | **warm** | Signals shift to detail/depth content |
| 5 | Testimonials | **white** | Testimonial cards provide their own visual weight |
| 6 | Guarantee + app | **warm** | Soft zone for risk-reversal argument |
| 7 | Case Studies | **white** | Data cards self-distinguish |
| 8 | FAQ | **white** | Clean, low-friction |
| 9 | Disclaimer | **warm** | Quiet sign-off, visually separates legal from content |

**Ratio:** White 56%, warm 33%, accent-wash 11%. Within range of all reference sites. No adjacent duplicates.

### Accent colour `#4058bb` usage

| Where | How |
|-------|-----|
| **CTA buttons** | All primary CTAs become accent-filled (`#4058bb` bg, white text). Replaces black. |
| **Benefits icon circles** | Accent at ~8% opacity background, accent-coloured icon stroke |
| **Accent-wash section** | `#f2f3f8` background on benefits section only |
| **Nowhere else** | Keeps the signal clean — accent = action or credibility |

### Typography spacing

**Problem:** `brand-h*` classes have `margin-bottom: var(--brand-text-gap)` baked in. This fights with per-component Tailwind spacing, creating inconsistent heading-to-content gaps across sections (some `mb-6`, some `mb-8`, some `mb-10`).

**Fix:** Strip `margin-bottom` from all `brand-h*` classes. They become pure typography (font, size, weight, tracking, line-height). Layout spacing is owned by Tailwind utilities in the component.

**Heading block pattern (consistent across all sections):**

```jsx
<div className="mb-10">                           {/* 2.5rem gap to content below */}
  <h2 className="brand-h2">Section heading</h2>
  <p className="mt-2 text-black/60">Optional subtitle</p>  {/* tight to heading */}
</div>
```

- `mb-10` (2.5rem) from heading block to content — every section, no exceptions.
- Subtitle sits at `mt-2` (0.5rem) below heading — tight coupling.
- No built-in margins on heading classes.

### Text colour tiers

**Problem:** Components use 5+ different opacity values via inline `style={{}}`, decided per-element with no system.

**Fix:** 4 fixed tiers. Pick the tier based on content role. No in-between values.

| Tier | Opacity | Tailwind | What it's for |
|------|---------|----------|--------------|
| **Primary** | 100% | `text-black` | Headings, card titles, key statements |
| **Secondary** | 80% | `text-black/80` | Body copy, descriptions, benefit text |
| **Tertiary** | 60% | `text-black/60` | Captions, subtitles, metadata, taste notes |
| **Muted** | 40% | `text-black/40` | Legal footnotes, PMIDs, disclaimers |

**Rule:** If something doesn't clearly fit a tier, it goes in the tier above (more visible), not between tiers.

**Implementation note:** All inline `style={{ color, opacity }}` get replaced with the corresponding Tailwind class. No CSS classes for text tiers — Tailwind's `text-black/80` is readable enough and keeps the system in the component.

### CSS class responsibility split

| CSS classes own | Tailwind utilities own |
|----------------|----------------------|
| Typography (font, size, weight, tracking, line-height) | Layout (margins, padding, gaps, alignment) |
| Section wrapper (padding, gutters) | Colour and opacity (`text-black/80`) |
| Track (max-width, centering) | Responsive overrides (`lg:flex-row`) |
| Background colours (section-level) | Component-internal spacing |

---

## Implementation scope

### Phase 1: Tokens & config

**Files changed:**

| File | Changes |
|------|---------|
| `app/brand-base.css` | Add `--brand-warm`, `--brand-cool`, `--brand-accent-wash` variables. Add `.brand-bg-warm`, `.brand-bg-cool`, `.brand-bg-accent-wash` classes. Remove `margin-bottom` from all `brand-h*` classes. |
| `tailwind.config.ts` | Register brand colours so `text-brand-black/80` works (optional — `text-black/80` may suffice if brand-black is `#000`). |
| `docs/branding/DESIGN_SYSTEM.md` | Update colour palette table, colour rhythm section, section backgrounds table, button CTA section, heading class descriptions. |

### Phase 2: Landing page composition

**File:** `app/start/StartPageClient.tsx`

- Update section background classes to match the cadence table above.
- Remove black section, replace with accent-wash.
- Replace neutral sections with warm.

### Phase 3: Component updates

**All files in `app/components/landing/`:**

| Component | Changes |
|-----------|---------|
| `LandingCTA.tsx` | Default variant becomes accent (`#4058bb` bg, white text). Remove black variant. |
| `LandingBenefits.tsx` | Remove white-card-on-dark pattern. Restyle for accent-wash background: accent icon circles, accent-tinted cards or bordered cards on the wash. Update text tiers. |
| `LandingHero.tsx` | Replace inline `style={{ opacity }}` with text tier classes. Update CTA. |
| `LandingProductSplit.tsx` | Replace inline styles with text tier classes. Update CTA. |
| `LandingWhatsInside.tsx` | Replace inline styles with text tier classes. Consistent heading block (`mb-10`). Update CTA. |
| `LandingGuarantee.tsx` | Replace inline styles with text tier classes. Consistent heading block. Update CTA. Restyle guarantee pill (currently uses `#ccccca`). |
| `LandingFAQ.tsx` | Replace inline styles with text tier classes. Consistent heading block. Update CTA. |
| `LandingDisclaimer.tsx` | Replace inline styles with muted tier (`text-black/40`). |

### Phase 4: Design system doc update

**File:** `docs/branding/DESIGN_SYSTEM.md`

Update to reflect:
- New background palette (warm, cool, accent-wash)
- Neutral demoted to dividers/borders only
- Accent on CTA buttons as primary pattern
- Heading classes are pure typography (no margin)
- Text colour tiers (100/80/60/40)
- New colour rhythm example
- Updated section backgrounds table and checklist

---

## What this does NOT cover

- Homepage (`app/page.tsx`) — still uses `premium-base.css`. Migrate separately.
- Funnel page (`app/funnel/`) — has its own visual system (no nav/footer, step indicator). Review separately.
- Product pages (`/conka-flow`, `/conka-clarity`) — still on legacy. Migrate after landing page is validated.
- CTA count reduction — discussed but not scoped here. Address during implementation if natural.

---

## References

- [Design System](./DESIGN_SYSTEM.md) — will be updated as part of implementation
- [Brand Base CSS](../../app/brand-base.css) — token implementation
- [Website Simplification Plan](../development/WEBSITE_SIMPLIFICATION_PLAN.md) — parent initiative
- [Quality Standards](./QUALITY_STANDARDS.md) — quality bar
- Competitor analysis: Headstrong (`headstrongltd.com`), Overload (`ovrload.co/pages/gummy`), AG1 (`drinkag1.com`), Magic Mind (`magicmind.com`)
