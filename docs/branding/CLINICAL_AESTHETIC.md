# CONKA Clinical Aesthetic

> **Purpose:** Reference for aligning pages and components to the acquisition aesthetic established on `/start` and `/funnel`. When a page or component needs to match these surfaces, apply the rules below.

**Reference implementations:** `app/start/page.tsx`, `app/funnel/FunnelClient.tsx`

---

## How it works

Add `brand-clinical` to the root element of the page or isolated surface:

```tsx
<div className="brand-clinical min-h-screen bg-white">
  {/* all children inherit the clinical tokens */}
</div>
```

This overrides three token groups via CSS variable inheritance — nothing outside the element is affected.

---

## Token overrides (`.brand-clinical`)

| Token | Base value | Clinical value | Effect |
|-------|-----------|----------------|--------|
| `--brand-radius-card` | 32px | **0px** | All cards square |
| `--brand-radius-container` | 24px | **0px** | All containers square |
| `--brand-radius-interactive` | 16px | **0px** | All buttons/inputs square |
| `--brand-accent` | `#4058BB` | **`#1B2757`** | Darker navy accent |
| `--brand-tint` | `#f4f5f8` | **`#f5f5f5`** | Neutral grey tint |

All components that use these tokens (`var(--brand-radius-card)` etc.) update automatically. No per-component overrides needed.

---

## Unscoped utilities (always available)

Defined in `app/brand-base.css`. Use anywhere — no scope class required.

### `lab-clip-tr`
Top-right 12px chamfer. **Interactive signifier only** — apply to primary CTAs, hero tags, and badge banners. The chamfer reads as "something you can click"; never apply it to cards, asset frames, section containers, or other non-interactive surfaces.
```
clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)
```

### `lab-asset-frame`
Double-border box shadow for imagery and data surfaces. Creates the "spec sheet" look.
```
box-shadow: 0 0 0 2px rgba(0,0,0,0.85), 0 0 0 6px rgba(255,255,255,0.95), 0 0 0 7px rgba(0,0,0,0.75)
```

### `@keyframes lab-blink`
Step-end opacity blink for the terminal cursor `_`. Reference via inline `style={{ animation: "lab-blink 1s step-end infinite" }}`.

---

## Typography conventions

### Section eyebrow (every section opens with one)
```tsx
<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
  Section label · Sub-context
</p>
```

### Data / numbers
- Always `tabular-nums` on any number that may change
- `font-mono` for all units, labels, percentages, PMIDs
- Per-shot prices: large number in primary text, `/shot` in `font-mono text-[10px] uppercase tracking-[0.14em] text-black/40`

### Row/entry counters
```tsx
<p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35 tabular-nums">
  01 · Context label
</p>
```

---

## Colour grammar

| Use | Colour | Rule |
|-----|--------|------|
| Primary CTA, selected state, interactive accent | `#1B2757` (navy) | **Interactive only.** Never decorative. |
| Data surfaces, double-border frames | `rgba(0,0,0,0.85)` | `lab-asset-frame` utility |
| Dividers, card borders | `border-black/8` to `border-black/12` | Hairline. Never bold unless selected state. |
| Section backgrounds | `bg-white` / `bg-[var(--brand-tint)]` | Alternate for visual rhythm |
| Per-product accent (Flow/Clear/Both) | Product `accent` from `FUNNEL_PRODUCTS` | Decision aid only — on selected state or small identifier strips. Never as the primary selection signal. |

**What is never used:** gradients as decoration, emoji, rounded pills/badges, `bg-brand-accent` fills outside CTAs.

---

## Primary CTA — `ConkaCTAButton`

`app/components/landing/ConkaCTAButton.tsx`

**This is the standard CTA across every clinical surface.** Do not hand-roll a navy button or reach for `LandingCTA`/`LandingHero`-style buttons — use `ConkaCTAButton` so the visual identity stays consistent everywhere the user is being asked to act.

Anatomy:
- **Inverted CONKA "O" ring** (`/logos/ConkaO.png`, recoloured to white) on the left. Always present — this is what makes the button recognisably CONKA, not a generic navy rectangle.
- **Label** in mono uppercase, trailed by the blinking `_` terminal cursor (`lab-blink`)
- **Meta line** in mono — tagline or proof point
- **Arrow** on the right
- **Top-right chamfer** via `lab-clip-tr` — the interactive signifier

Props:
- `children` — main label (e.g. `Get Both from £1.50/shot`). Do **not** include a trailing `→` — the button renders its own arrow.
- `href` — defaults to `FUNNEL_URL`
- `meta` — second row text. Defaults to `// your brain, optimised.`

The button renders as a `<Link>` (internal href) or `<a>` (external). For interactive trigger buttons (e.g. inside a funnel step that fires a handler), replicate the visual pattern directly — see `FunnelCTA.tsx`.

---

## Trust grid — `LabTrustBadges`

`app/components/landing/LabTrustBadges.tsx`

Standard 4-cell mono trust grid (Free Shipping / Informed Sport / Batch Tested / Cancel Anytime). Drop in above or below any CTA. No props needed.

---

## Corner brackets on lifestyle assets

Decorative bracket pair (top-left, bottom-right). Used on large lifestyle photos — not product renders.

```tsx
<span aria-hidden className="pointer-events-none absolute top-3 left-3 w-[20%] h-[20%] border-t-[6px] border-l-[6px] border-black" />
<span aria-hidden className="pointer-events-none absolute bottom-3 right-3 w-[20%] h-[20%] border-b-[6px] border-r-[6px] border-black" />
```

Use `border-white` on dark or high-contrast images. Requires `relative overflow-hidden` on the parent.

---

## What NOT to do

- Do not add `border-radius` anywhere — tokens handle it
- Do not use `var(--brand-gradient-accent)` — solid navy `#1B2757` only
- Do not apply `lab-clip-tr` (or any clip-path chamfer) to non-interactive elements — the clipped corner is a button/tag signifier, not a decorative card treatment
- Do not hand-roll a primary CTA — always use `ConkaCTAButton`; the CONKA "O" ring mark is part of the button identity
- Do not use the product accent colour as a primary selected-state signal — navy border is the selection indicator
- Do not centre-align headings
- Do not add decorative colour blocks or background fills other than white/tint
- Do not use emoji in labels — replace with mono text tags (`Ships ·`, `Note ·`, `01 ·`)
