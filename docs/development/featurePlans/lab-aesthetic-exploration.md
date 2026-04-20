# Lab Aesthetic Exploration — /startV1 Clinical Prototype

**Route:** `/startV1` (direct URL only, no nav links, `noindex`)
**Goal:** Test whether a sharper clinical/lab aesthetic better justifies the price point vs the current soft-luxury feel at `/start`.
**Design reference:** Precision lab instruments, architectural drawings, spec sheets. Not warm or approachable — cold, measurable, trustworthy.

---

## Core Aesthetic Decisions

### Zero radius everywhere
All components use `--brand-radius-card: 0px`, `--brand-radius-container: 0px`, `--brand-radius-interactive: 0px`, overriding the brand-base defaults. Sharp corners signal precision and clinical credibility. Applied via `.lab-theme` CSS class on the page root — cascades through every shared component without touching them.

### Navy accent: `#1B2757`
Replaces the brand blue accent. Darker, colder, more authoritative. Applied by overriding both `--brand-accent` and `--color-brand-accent` (both needed for Tailwind v4's `@theme inline` system to pick up the change for utility classes like `bg-brand-accent`).

### Monospace typography throughout
`font-mono` (JetBrains Mono / IBM Plex Mono) used for all labels, section tags, stat values, button metadata, ingredient tags, and trust badges. Creates a consistent "terminal/lab instrument readout" register. Body copy and headings stay in the main sans-serif.

### Section label convention
Every section opens with a `font-mono text-[10px] uppercase tracking-[0.25em] text-black/40` label — e.g. `DAILY BRAIN PERFORMANCE`, `FORMULATION`, `COST ANALYSIS`, `EXPECTED OUTCOMES`. This mimics spec-sheet section headers and reinforces the clinical framing.

---

## Component Decisions

### LabCTA — Terminal-style button
Two-row layout: main CTA text + blinking `_` cursor on top row, metadata comment on bottom row (syntax: `// your brain, optimised.`). Navy `#1B2757` fill, white text. Clip-path chamfer on top-right corner: `polygon(0 0, calc(100%-12px) 0, 100% 12px, 100% 100%, 0 100%)`. Full width on mobile, auto on desktop.

Five metadata variants exist as named constants (`aspirational`, `performance`, `measured`, `proof`, `guarantee`) — swap `ACTIVE_META` to A/B test messaging without changing the CTA text. Current active: `aspirational` — `// your brain, optimised.`

Blinking cursor uses `@keyframes lab-blink` with `step-end` timing — compositor-only animation (opacity only), zero layout or paint cost.

### LabHero — Text below image
Explored three layouts:

1. **White text overlay on image** — Rejected. The hero image (`CreationOfConka.jpg`) is light-toned; text was unreadable on mobile even with a gradient scrim.
2. **Desktop: left text / right image split** — Explored. User rejected immediately ("return it to what it was") — the split felt like it broke the visual flow.
3. **Current: full-bleed image, text below in black** — Settled approach. Clean separation, no legibility issues, works across all breakpoints.

Mobile full-bleed: `-mx-5 w-[calc(100%+2.5rem)]` negative margins remove the page padding, `lg:mx-0 lg:w-full` resets on desktop.

Aspect ratio: `aspect-[4/3]` mobile, `aspect-[16/7]` desktop. A more banner-like crop (`aspect-[5/3] / aspect-[20/7]`) was explored and reverted — the original ratio reads better.

Hero stats strip uses `lab-asset-frame` double-line border, stacks 1-col on mobile (value + label side by side as a row), 3-col on desktop.

### LabTrustBadges — Compact monospace grid
Replaces `LandingTrustBadges`. 2×2 mobile / 4-col desktop, thin `divide-black/8` borders, no backgrounds, no icons. Each badge: bold monospace label + muted monospace sublabel. Significantly smaller footprint than the original — trust signals should be scannable, not a feature section.

### LabWhatsInsideMini — Clinical dose labels
Replaces emoji + color labels ("Take in the morning 🌅") with `AM 07:00` / `PM 14:00` in monospace uppercase. Eliminates the only colour usage in the product preview. `IngredientsButton` background set to `bg-[var(--brand-tint)]` so it matches the section background — button blends in and reads as a label rather than a competing CTA.

### All remaining sections — Wrapper pattern
`LabValueComparison`, `LabTimeline`, `LabGuarantee`, `LabFAQ`, `LabTestimonialsSection` are thin wrappers that swap `LandingCTA` → `LabCTA`, add monospace section labels, and remove accent-blue color references. The `.lab-theme` CSS variable inheritance handles radius and accent for all shared sub-components automatically.

---

## lab.css — Token overrides

Co-located at `app/startV1/lab.css`, imported from `page.tsx`. Scoped to `.lab-theme`.

```css
.lab-theme {
  --brand-radius-card: 0px;
  --brand-radius-container: 0px;
  --brand-radius-interactive: 0px;
  --brand-accent: #1B2757;
  --color-brand-accent: #1B2757;
  --brand-tint: #f5f5f5;
}

/* Double-line border: 2px inner black, 4px white gap, 1px outer black */
.lab-asset-frame {
  box-shadow:
    0 0 0 2px rgba(0, 0, 0, 0.85),
    0 0 0 6px rgba(255, 255, 255, 0.95),
    0 0 0 7px rgba(0, 0, 0, 0.75);
}
```

`lab-asset-frame` is the visual signature of the lab aesthetic — architectural drawing / spec-sheet convention. Applied to the hero stat strip and desktop sticky image in `LabWhatItDoes`. Not applied on mobile image bleed (where the frame would clip).

---

## What Worked

- Zero radius + sharp corners: immediate shift in tone, feels intentional
- Monospace labels throughout: high consistency, low effort, strong signal
- Navy `#1B2757` vs brand blue: more serious, less startup-y
- Text below hero image: cleanest solution for this particular photo
- `lab-asset-frame` double border: distinctive, doesn't exist anywhere else in the industry at this price tier
- Wrapper pattern with CSS variable inheritance: added clinical feel to the entire page without touching shared components

## What Did Not Work

- White text overlay on the hero image: unreadable on mobile (image is light-toned)
- Desktop split layout (hero): broke visual flow, user rejected immediately
- Cropped aspect ratio (`5/3 / 20/7`): made the hero feel like a banner ad rather than an editorial image

---

## LabWhatItDoes Rebuild — Formulation & Benefits Section

A significant visual upgrade to the `LabWhatItDoes` section of `/startV1`, keeping the existing headlines but rebuilding the interaction model and ingredient presentation. Primary goal: stop the section from feeling like a styled copy of `/start` and start using interaction as a premium signal.

### Unifying visual primitive: the clipped corner

The chamfered top-right corner (first used on `LabCTA`) is elevated to the **lab's signature visual language for interactivity**. Any tappable element gets the clip; static elements don't.

Utility class added to `lab.css`:
```css
.lab-clip-tr {
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
}
```

Applied to: ingredient buttons on bottle tiles, benefit pillar cards. Intentionally **not** applied to the ingredient mini-cards (purely informational).

### LabAmPmConnector — new component replacing `AmPmConnector`

The original used sunrise emoji (`☀️`) and a warm-to-cool gradient line. Both felt cheap. Replaced with a pure-typographic clinical time-axis:

- `AM · 07:00` on the left, `PM · 14:00` on the right (monospace, bold dose code + muted time)
- Hairline axis between them with 8 evenly-spaced tick marks — reads like a lab-instrument scale
- No colour, no emoji

### LabWhatsInsideMini — 2×2 mirror grid (product ↔ info)

First explored as **flip cards** with divergent back faces (Flow → lifestyle aspirational overlay, Clear → pure spec card). That test revealed the spec card was the stronger direction *and* that hiding half the content behind a tap was fighting the scannability of a clinical page. The flip was scrapped in favour of exposing everything at once.

Current layout — static 2×2 grid, "mirror" pattern:

```
[ FLOW product ]   [ FLOW info-spec ]
[ CLEAR info-spec ] [ CLEAR product ]
```

Products sit on the outside, info spec cards in the middle — reads like a paired dossier. Each row is one product; the product tile + its spec tile are always adjacent.

**Product tiles (white):** dose label (`AM 06:00–10:00` / `PM 12:00–16:00`), bottle, product name, full-width clipped `INGREDIENTS` button that opens the existing `IngredientsPanel` modal. No change to the ingredients modal behavior.

**Info tiles (white with `lab-asset-frame` double-border, black text):** four data rows with `border-l-2 border-black/25` clinical accent bars — `ONSET`, `DURATION`, `KEY ACTIVES`, `USE CASE`. Reads like an architectural spec sheet. Values are product-specific (Flow: lemon balm · rhodiola · ashwagandha · "calm morning focus"; Clear: alpha-gpc · alcar · ginkgo · "afternoon reset").

**Colour discipline:** an early draft had the info cards navy-filled to mirror the CTA buttons. With two info cards plus the CTA buttons plus the dosing-window bands all in the same `#1B2757`, the page started to feel over-accented. Navy is now reserved strictly for **interactive/CTA signals** — CTA buttons, ingredients button, dosing-window bands on the timeline. Static data surfaces (info cards) use the `lab-asset-frame` double-border in black on white, so the signature architectural frame — not the colour — is what carries the "this is clinical content" signal.

The 2×2 layout **doubles the information density** of the section (4 tiles vs 2) while keeping the product-to-info pairing visually obvious via the mirror.

### LabDosingWindows — new timeline above the grid (replaces LabAmPmConnector)

The original AM/PM connector — and the first-draft clinical time-axis that replaced it — communicated two single clock times (`AM 07:00` / `PM 14:00`). That read as arbitrary. The upgraded component shows the actual **recommended dosing windows** as filled bands on a real timeline:

```
   06   08   10   12   14   16   18
   ├────────────┤       ├────────────┤
   ▓▓▓▓ FLOW ▓▓▓▓       ▓▓▓▓ CLEAR ▓▓▓▓
   6–10 AM              12–4 PM
```

- 12-hour scale (06:00–18:00) with hour-labelled axis
- Two navy-filled bands for Flow (6–10) and Clear (12–4), positioned proportionally
- Centred labels under each band with dose + range
- Header: `RECOMMENDED DOSING WINDOWS`

Reads as a protocol schedule rather than a time-of-day mood.

`LabAmPmConnector.tsx` was deleted.

### Benefit pillars — clipped cards + ingredient mini-cards

**Pillar cards:**
- Clipped top-right corner (was: rounded)
- Left accent changed from navy to pure black on the open state (was: `border-l-brand-accent`)
- Icon container square (was: circle), black-on-muted-grey (was: accent-on-tinted-accent)
- "See ingredients & research" expand button now monospace uppercase with the chevron icon — matches the section-label register throughout the page

**Ingredient badges → ingredient mini-cards:**

The original inline chip list (`<span>` with text only) is replaced with a **3-column grid of small rectangular cards**. Each card:
- Square asset area (top) with the ingredient photo — uses the existing `/ingredients/flow/` and `/ingredients/clear/` webp/jpg library
- Tinted footer (`var(--brand-tint)`) with the ingredient name in monospace uppercase + EFSA anchor (`††`) where applicable

Effect: the section goes from "text tags" to "mini-catalogue of proven inputs" — conveys research caliber without needing copy to claim it.

### What Worked (this round)

- Clipped corner as visual language: unified the CTA, ingredients button, and pillar cards without needing copy
- Divergent back faces: concrete side-by-side test of two premium-framing strategies in a single deploy
- Ingredient mini-cards: the single largest perceived-quality upgrade in this section — images do the trust-building that text chips were trying to fake
- Clinical time-axis replacing the emoji strip: small change, outsized elevation effect

### Open — things to watch on this rebuild

- Flip height is pinned at `min-h: 22rem` — may need tuning when Clear's spec back is content-taller than Flow's bottle front
- The Option 1 vs Option 2 A/B decision is an explicit next step — whichever wins likely gets applied to both tiles
- Mini-card grid at 3 columns on mobile (390px with 5vw page gutter + card padding) is tight; watch for cramped ingredient names on narrow viewports

---

## Open Questions for Next Round

- Does the full-bleed image need to be a different photo with darker tones to support an overlay layout?
- Should the stat strip numbers be bigger — treat them like a Bloomberg terminal readout?
- Would a monochrome/desaturated version of the hero image reinforce the lab feel?
- Is `#1B2757` the right navy, or should it go darker/cooler (closer to `#0e1f3f`)?
- A/B test: which `LabCTA` metadata variant drives higher click-through?

---

## Full-Page Aesthetic Sweep (5 sections)

Pulled the lab vocabulary through the remaining sections so the page reads as one consistent clinical experience. Accepted duplicate code between `LandingX` and `LabX` as a temporary cost — consistency was the goal.

### Scope of the sweep

| File | Type | Change |
|---|---|---|
| `app/startV1/LabCaseStudies.tsx` | Net new | Specimen-card grid with dense 3-metric stat row + product + test-count footer. Replaces the one-metric overlay teaser from `CaseStudiesDataDriven`. |
| `app/startV1/LabTestimonials.tsx` | Net new | Standalone component (no more `LandingTestimonials` wrapper). Mono spec header, hairline stars, hanging open-quote, chamfered navy carousel buttons. |
| `app/startV1/LabTimeline.tsx` | Upgrade | Timeframe pills → navy `lab-clip-tr` tags with `T+1D / T+14D / T+30D` spec codes. Per-card spec footer (`Outcome · N=150+`). Mobile banner + desktop sidebar both use `/lifestyle/FlowConkaRing.jpg` (full-bleed mobile, `lab-asset-frame` desktop). |
| `app/startV1/LabGuarantee.tsx` | Upgrade | Borderless phone mockup, numbered mono bullets (`01.` `02.` `03.` `04.`) with original shipping/refund copy retained. Protocol eyebrow (`Trial Terms · Protocol 100`) kept; the oversized `100d` display was explored and removed — heading plus numbered list carries the clinical register without it. |
| `app/startV1/LabValueComparison.tsx` | Audit + finish | Comparison card gets `lab-asset-frame`. CONKA column wash switched from black/2 to navy/4 so navy signals the "winning" side. Savings strip now `lab-clip-tr` on a black fill. Trust badges swapped to `LabTrustBadges`. |

Also deleted `LabTestimonialsSection.tsx` (the wrapper — `page.tsx` now renders `LabTestimonials` directly inside a `brand-section brand-bg-white` block).

### Colour grammar held through the sweep

- **Navy `#1B2757`:** interactive/CTA only — `LabCTA`, ingredients button, dosing bands, timeline code chips, CONKA-column wash in the comparison card
- **Black double-border (`lab-asset-frame`):** data surfaces — hero stat strip, dataset summary strip, info spec cards, comparison card, phone mockup, sidebar + mobile timeline banner
- **Black fill:** the "savings vs coffee" callout — small, chamfered, white mono text (treat once like a moment of emphasis rather than a pattern)
- **Thin black border (`border-black/12`):** neutral containers for tiles that sit on white sections (athlete cards, testimonial cards, timeline cards, guarantee bullets)

### Data density bump

`LabCaseStudies` was the section the user explicitly wanted to surface more data on. The old teaser showed one metric per athlete; the new card shows:

- Name + sport + position
- Three improvement metrics (Total / Accuracy / Speed) as a mono tabular grid
- Product used (`FLOW` / `CLEAR` / `FLOW · CLEAR`) + test count (`N=12`)

Also added a third stat column to the dataset summary strip (`+28.96%` avg improvement) so the section opens with three hard numbers instead of two.

### What was NOT changed

- No copy changes outside eyebrow labels and spec row labels
- No analytics events, no data-layer changes, no cart changes
- `/start` (the live landing page) untouched
- `LandingX` components left in place — still used elsewhere

---

## Core Design Principles — Candidate for a Lab Brand Base

If we decide to move this aesthetic out of prototype and into a named design system (e.g. `lab-base.css` sitting alongside `brand-base.css`), here is the distilled system. Every rule below has been applied consistently across the 9 sections of `/startV1` and survived review.

### 1. Foundation

**Zero radius · black ink on white canvas · single navy accent for interaction.**

- All containers, cards, buttons, tiles: `border-radius: 0`
- Canvas: white (primary) alternating with neutral grey `#f5f5f5` for section rhythm
- Single accent: navy `#1B2757` — strictly **interactive / "this is active" only**; never decorative
- Pure black reserved for data-surface borders, emphasis callouts, and body text on white
- Every numeric uses `tabular-nums`

### 2. Surface typology (three kinds of container, no others)

Every box on the page is one of these three. The choice is not aesthetic — it tells the user what the surface *means*.

| Type | Treatment | Meaning | Used on |
|---|---|---|---|
| **Data surface** | `lab-asset-frame` double-border (2px black · 4px white · 1px black) | "This is a measured fact / instrument readout" | Hero stat strip, dataset summary strip, info spec cards, comparison card, hero/sidebar lifestyle images |
| **Interactive tile** | `lab-clip-tr` chamfer (12px top-right clip) | "You can tap this" | CTA buttons, ingredients button, carousel nav, timeline code tags, savings callout |
| **Neutral container** | `border border-black/12` hairline | "Grouped content, read it" | Testimonial cards, athlete spec cards, timeline cards, list rows, benefit pillars |

When a surface is both data and interactive, the chamfer wins. When a surface is neither, no frame — just the hairline.

### 3. Type system

- **Display headings:** `brand-h1` / `brand-h2` with `letter-spacing: var(--letter-spacing-premium-title)` (-0.03em)
- **Body copy:** default sans, `text-black/70`, leading-relaxed
- **Spec / label register:** `font-mono` (JetBrains or IBM Plex Mono), uppercase
  - **Eyebrow** — opens every section: `font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase`
  - **Extended eyebrow pattern** — `LABEL · Code` (e.g. `Trial Terms · Protocol 100`, `Clinical Outcomes · CognICA Total Score`)
  - **Caption under heading** — mono `text-[10px] tracking-[0.18em] tabular-nums text-black/50` for spec context (e.g. `N=500+ · Verified reviews`)
  - **In-card label** — `font-mono text-[8–9px] tracking-[0.16–0.2em] text-black/40`
  - **In-card value** — `font-mono font-bold tabular-nums text-black`
  - **Inline codes** — `T+1D`, `N=150+`, `AM 07:00`, `6–10 AM`, `92/100`

### 4. Colour grammar (strict — collapsing any two breaks the system)

| Colour | When to use | Examples |
|---|---|---|
| Navy `#1B2757` | Interactivity · "winning" signal | CTA, carousel nav, timeline code chips, CONKA-column wash, dosing bands |
| Pure black | Data-surface borders · emphasis callout · body text · ornaments | `lab-asset-frame`, savings strip, headings, checkmarks, filled stars |
| `black/40–60` | Mono labels | Eyebrows, in-card labels, spec-row labels |
| `black/8–12` | Hairlines | Dividers, neutral tile borders |
| `black/70–80` | Body copy on white | Paragraph text |
| White | Canvas · text-on-navy | Section background, CTA text |
| Neutral `#f5f5f5` | Secondary canvas | Alternating section background only |

No green, no red, no yellow. Binary states use filled vs empty black (e.g. stars). Status is communicated by mono code (`✓ Verified`), not by colour.

### 5. Data vocabulary — surface numbers as code

Wherever a number or fact exists, surface it through the clinical code grammar:

- **Timeframes as codes:** `T+0`, `T+1D`, `T+14D`, `T+30D`
- **Counts as `N=` codes:** `N=12`, `N=150+`, `N=500+`
- **Measures with suffix units:** `100d`, `+28.96%`, `£1.25/day`, `92/100`
- **Dose ranges with en-dash:** `6–10 AM`, `AM 06:00–10:00`
- **Product variants uppercase:** `FLOW`, `CLEAR`, `FLOW · CLEAR`
- **Verified state as inline spec:** `✓ Verified · 2025-11-14`
- **Ratio / score displays:** `{rating}/5`, always with `tabular-nums`

### 6. Ornaments — what we allow

The system rejects warmth. These are the only graphic elements allowed:

- **Checkmarks / crosses:** polyline SVG, `strokeLinecap="square"`, `strokeLinejoin="miter"`, black stroke
- **Chevrons (carousel nav):** same treatment — square cap, miter join, no rounded corners
- **Star ratings:** hairline `★` character, filled = `text-black`, empty = `text-black/15`, `fontSize: 11px` (no yellow)
- **Numbered list markers:** mono tabular-nums, `{String(i+1).padStart(2, "0")}.` → `01.` `02.`
- **Verified badge:** 12×12px black square with white `✓` glyph, mono caption adjacent
- **Hanging open-quote:** `"` in mono `text-2xl font-bold text-black/25`, `position: absolute` at card's top-left of quote body
- **Axis tick marks:** hairline vertical lines (used in `LabDosingWindows`)

Icons replaced: emoji (`☀️`, `🌅`), yellow stars, coloured pills, gradient lines, rounded icon containers, filled circular check bubbles.

### 7. Motion

- CSS `@keyframes` only — no inline `transition` / `animation` styles
- Animate `transform` and `opacity` only (compositor-safe)
- Blink cursor (`LabCTA`): `step-end` timing, `1.1s` interval — no interpolation, zero paint
- Carousel: `600ms ease` transform, snap-back via `onTransitionEnd` + 2-frame `requestAnimationFrame` re-enable trick (see `LabTestimonials`)
- Hover reveal: `opacity-0 group-hover:opacity-100 transition-opacity`

### 8. Layout patterns

- **Page orchestration:** `<section className="brand-section brand-bg-{white|neutral}">` owns the wrapper; `<div className="brand-track">` owns the max-width; the component is content-only
- **Mobile full-bleed:** `-mx-5 w-[calc(100%+2.5rem)]` for edge-to-edge lifestyle assets; reset on desktop via `lg:mx-0 lg:w-auto`
- **Sticky desktop sidebar:** `lg:sticky lg:top-24 lg:self-start lg:flex-[2]` with the main content at `lg:flex-[3]`
- **Horizontal snap-scroll** on mobile where tiles are too tall to stack: `flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide` + dot indicators
- **Alternating section rhythm:** white → neutral → white → neutral... no three consecutive same-colour sections

### 9. Interactive minimums

- Tap targets: 44×44px on buttons and dot indicators (dots currently 24×24 on `LabTestimonials` — flagged in review)
- Every interactive tile carries the top-right chamfer — it's the system's tap affordance
- Navy fill + white text + `lab-clip-tr` = the CTA primitive
- Hover on desktop-only carousel nav; on mobile, rely on swipe + dots

### 10. Section anatomy template

Every `/startV1` section follows this cadence:

```
[ EYEBROW          ]   mono 10px, optionally "LABEL · Code"
[ H1/H2 Heading    ]   brand-h1/h2 with tight tracking
[ Mono caption     ]   optional — tabular-nums spec line (e.g. "N=500+ · Verified")

[ Content surface  ]   grid · carousel · comparison · spec table
                       (built from the 3 container types in §2)

[ LabCTA           ]   navy chamfered, left-aligned
[ LabTrustBadges   ]   compact mono grid
```

This gives every section the same "spec-sheet opener" without dictating what goes in the middle.

### 11. Primitives to promote into `lab-base.css`

If we migrate, these become the first-class tokens and utilities:

```css
:root {
  --lab-accent:            #1B2757;
  --lab-canvas:            #ffffff;
  --lab-canvas-alt:        #f5f5f5;
  --lab-ink:               #000000;
  --lab-body:              rgb(0 0 0 / 0.7);
  --lab-label:             rgb(0 0 0 / 0.4);
  --lab-label-strong:      rgb(0 0 0 / 0.6);
  --lab-hairline:          rgb(0 0 0 / 0.08);
  --lab-hairline-strong:   rgb(0 0 0 / 0.12);

  --lab-radius:            0;
  --lab-clip-size:         12px;

  --lab-mono-eyebrow:      10px;
  --lab-mono-label:         9px;
  --lab-mono-label-sm:      8px;
  --lab-tracking-label:    0.18em;
  --lab-tracking-eyebrow:  0.2em;
}

/* Container primitives */
.lab-asset-frame { /* 2px black · 4px white · 1px black box-shadow stack */ }
.lab-clip-tr     { /* clip-path polygon, 12px top-right chamfer */ }
.lab-tile        { /* border: 1px solid var(--lab-hairline-strong); background: white */ }

/* Typography utilities */
.lab-eyebrow     { /* font-mono, uppercase, 10px, tracking 0.2em, black/40 */ }
.lab-label       { /* font-mono, uppercase, 9px, tracking 0.18em, black/60 */ }
.lab-data-value  { /* font-mono, bold, tabular-nums, black */ }
.lab-code-tag    { /* lab-clip-tr + navy bg + white mono tabular-nums */ }
.lab-spec-row    { /* flex justify-between items-baseline pt-3 border-t border-black/8 */ }
.lab-divider     { /* border-t border-black/8 */ }
```

### 12. Non-negotiables if we port this

The three most fragile rules — if any of these slip, the system degrades fast:

1. **Accent reach.** Navy *only* where the user can tap or where navy is doing signal work (winning column, active protocol step). Decorative navy breaks the system in one commit.
2. **Tabular-nums everywhere.** Most sites that attempt "clinical" miss this. It's the single highest-leverage typographic rule — it makes the numbers look measured instead of marketed.
3. **The three-surface split.** Black double-border = data. Chamfer = interactive. Hairline = grouped content. Collapse any two into one treatment and the grammar is gone.

### 13. Known debt to clean up before migration

- Inline `#1B2757` literals in 6 call sites — trivial swap to `var(--lab-accent)` once the tokens exist
- Carousel dot hit-area is 24×24 on `LabTestimonials` — bump to 44×44 wrapper (noted in `/review-code` on commit `baccd42`)
- Duplicate logic between `LandingTestimonials` and `LabTestimonials` — accepted during prototype, consolidate before the system ships
- Several `Lab*` components have a `hideCTA` / `ctaLabel` / `ctaHref` prop triad that is currently unused — prune or commit to using it

