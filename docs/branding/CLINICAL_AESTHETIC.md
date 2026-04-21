# CONKA Clinical Aesthetic

Reference for the acquisition aesthetic on `/start`, `/funnel`, and the home page. Apply to any surface that needs to match.

**Reference implementations:** `app/page.tsx` · `app/start/page.tsx` · `app/funnel/FunnelClient.tsx`

---

## Scope

Add `brand-clinical` to the page root. This overrides CSS variables for children only — nothing outside is affected.

```tsx
<div className="brand-clinical min-h-screen bg-white">{/* … */}</div>
```

### Token overrides (`.brand-clinical`)

| Token | Base | Clinical | Effect |
|-------|------|----------|--------|
| `--brand-radius-card` | 32px | `0` | Square cards |
| `--brand-radius-container` | 24px | `0` | Square containers |
| `--brand-radius-interactive` | 16px | `0` | Square buttons |
| `--brand-accent` | `#4058BB` | `#1B2757` | Darker navy |
| `--brand-tint` | `#f4f5f8` | `#f5f5f5` | Neutral grey |

All components using these tokens update automatically. No per-component overrides needed.

---

## Utilities (unscoped, from `app/brand-base.css`)

### `lab-clip-tr` — interactive signifier
Top-right 12px chamfer. **Primary CTAs, nav buttons, tags only.** Never apply to cards, asset frames, section containers, or any non-interactive surface — it reads as "you can click this".

### `lab-asset-frame` — spec-sheet treatment
Double-border `box-shadow` stack for imagery and data surfaces.

### `@keyframes lab-blink`
Terminal cursor blink. `style={{ animation: "lab-blink 1s step-end infinite" }}`.

### Smaller overlay chamfer (10px)
For badge overlays inside images (`MORNING`, `AFTERNOON`, `MOST POPULAR`). Inline:
```
[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)]
```

---

## Standard patterns

### Trio header (every section opens with one)
```tsx
<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
  Eyebrow · Sub-context
</p>
<h2 className="brand-h1 mb-2 text-black" style={{ letterSpacing: "-0.02em" }}>
  Section heading.
</h2>
<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
  Mono sub · Proof · Scale
</p>
```

### Data card
```
bg-white border border-black/12 p-5 lg:p-6
```
Hairline border, no shadow. Token enforces 0 radius.

### Card header row (number + category)
```tsx
<div className="flex items-center justify-between px-4 py-3 border-b border-black/8">
  <span className="font-mono text-[11px] font-bold tabular-nums text-black/40">01.</span>
  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">CATEGORY</span>
</div>
```

### Spec strip (3-col stats inside `lab-asset-frame`)
Small mono label above a `tabular-nums` value; `border-r border-black/8` between cells. See `WhyConkaWorksDesktop`.

### Segmented tabs
Zero-radius 2-col grid. Active = `bg-black text-white`. Inactive = `bg-white`. `min-h-[44px]` tap target. Used for Subscribe/One-Time, filter toggles.

### Em-dash bullets (replace `•`)
```tsx
<li className="flex items-start gap-2">
  <span className="font-mono text-black/30 shrink-0">—</span>
  <span>{item}</span>
</li>
```

### Chamfer nav buttons (prev/next)
44×44 navy square with `lab-clip-tr`. Paired; navigation only. See `AthleteCredibilityCarousel#ChamferNav`.

---

## Typography rules

- **Eyebrow:** `font-mono text-[10px] uppercase tracking-[0.2em] text-black/40`
- **Mono sub:** `font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums`
- **Row counter / spec label:** `font-mono text-[9px]–[11px] uppercase tracking-[0.18em] tabular-nums`, opacity `text-black/35–60`
- Any number that can change → `tabular-nums`
- Units, labels, percentages, PMIDs → `font-mono`
- Canonical separator is the middle-dot `·` (U+00B7). Not `|`, not `—`.

---

## Colour grammar

| Use | Value | Rule |
|-----|-------|------|
| Primary CTA, selected state | `#1B2757` (navy) | **Interactive only.** Never decorative. |
| Data surfaces | `lab-asset-frame` | — |
| Dividers, borders | `border-black/8`–`/12` | Hairline. Thicker only when selected. |
| Section backgrounds | `bg-white` / `bg-[var(--brand-tint)]` | Alternate for rhythm. |
| Product accent (Flow/Clear/Both) | `FUNNEL_PRODUCTS.accent` | Identifier strips only. Never the primary selection signal — navy border handles that. |

---

## Primary CTA — `ConkaCTAButton`

`app/components/landing/ConkaCTAButton.tsx`. **Standard CTA for every clinical surface.** Do not hand-roll or reach for `LandingCTA`. The inverted CONKA "O" ring is part of the button identity.

Anatomy: "O" ring · mono label + blinking `_` · mono meta line · right arrow · top-right chamfer.

Props: `children` (label — no trailing `→`, the button renders its own), `href` (defaults to `FUNNEL_URL`), `meta` (second row).

For interactive buttons that fire handlers (not links), replicate the visual directly — see `FunnelCTA.tsx`.

---

## Component conventions

Components expose a consistent prop shape when they include a CTA or optional regions:

- `hideCTA?: boolean` — suppress the bottom CTA block
- `ctaHref?: string` — override CTA target
- `ctaLabel?: string` — override CTA text

Pages pass these when retargeting a shared component (e.g. home's `LabGuarantee` and `LabTimeline` CTAs point to `/protocol/3`).

**Structural contract:** components return content only. No `<section>`, no root `max-w-*`, no `px-*`. Pages own the section wrapper, background, and `brand-track`.

---

## Responsive patterns

- **Dual-position controls:** `flex lg:hidden` + `hidden lg:flex` places the same element at different positions on mobile vs desktop (e.g. carousel nav sits under the portrait on mobile, at card base on desktop).
- **Mobile scroll → desktop grid:** `flex lg:grid lg:grid-cols-N gap-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none`. Swipe on mobile, static grid on desktop.
- Split into `ComponentDesktop.tsx` / `ComponentMobile.tsx` with `useIsMobile()` only when layouts diverge significantly. Otherwise use breakpoint utilities inline.

---

## Trust grid — `LabTrustBadges`

`app/components/landing/LabTrustBadges.tsx`. 4-cell mono grid (Free Shipping · Informed Sport · Batch Tested · Cancel Anytime). Drop in above or below any CTA. No props.

---

## Corner brackets (lifestyle assets only)

```tsx
<span aria-hidden className="pointer-events-none absolute top-3 left-3 w-[20%] h-[20%] border-t-[6px] border-l-[6px] border-black" />
<span aria-hidden className="pointer-events-none absolute bottom-3 right-3 w-[20%] h-[20%] border-b-[6px] border-r-[6px] border-black" />
```

Requires `relative overflow-hidden` parent. Use `border-white` on dark images. Not for product renders.

---

## Do not

- Add `border-radius` — tokens handle it
- Use gradients — solid navy `#1B2757` only
- Apply `lab-clip-tr` (or any chamfer) to non-interactive elements
- Hand-roll a primary CTA — always `ConkaCTAButton`
- Add shadows to cards — hairline border only
- Use product accent as a selected-state signal — navy border handles selection
- Centre-align headings
- Use emoji in labels — mono tags instead (`Ships ·`, `Note ·`, `01 ·`)
- Use `bg-brand-accent` fills outside CTAs
