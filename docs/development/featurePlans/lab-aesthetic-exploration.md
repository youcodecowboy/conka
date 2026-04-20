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
