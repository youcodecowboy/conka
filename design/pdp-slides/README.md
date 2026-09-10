# PDP carousel slides

Source for the Flow PDP carousel assets. **Not shipped** — nothing under `app/`
imports this directory; it is design source that renders *into* `public/`.

## Render

```bash
./render.sh          # all slides
./render.sh s1 s4    # just those
```

Output goes to `public/formulas/mmPdpAssetsV2/`. The consumer is
`MM_GALLERY_ASSETS["01"]` in `app/lib/mmPdpData.ts`, plus `starterPackImage`
on Flow `monthly-sub` in `app/lib/offerData.ts` (slide `s0`).

## Slides

| File | Output | Argument it makes |
|------|--------|-------------------|
| `s0` | `FlowStarterKit.jpg` | £152.94 of value for £39.99 (monthly) |
| `s0q` | `FlowStarterKitQuarterly.jpg` | £328.90 of value for £109.99 (quarterly) |
| `s1` | `FlowBenefitStack.jpg` | Four outcomes, not a spec |
| `s2` | `FlowWhatToExpect.jpg` | 15min → week 2+ onset arc |
| `s3` | `FlowIngredients.jpg` | Six ingredients, benefit-tagged |
| `s4` | `FlowVsCoffee.jpg` | Beats coffee and Rx, 6 rows |
| `s5` | `FlowProof.jpg` | +28.96% measured in the app |
| `s6` | `FlowTested.jpg` | Informed Sport + 4 certifications |
| `s7` | `FlowReview.jpg` | 4.7 / 622, one customer quote |
| `s8` | `FlowGuarantee.jpg` | 100 days, under 1.2% claim it |

`s0` and `s0q` share one plain photo and differ only in their figures — the
same arrangement the Figma frames use, where monthly and quarterly point at a
single image hash with different labels composited on top.

## Constraints that shaped these

- **Authored at 2400×1715 (7:5)**, the aspect `ProductImageSlideshow` renders.
  Downsampled to 2000px on render — the carousel tops out near 1400px even at
  3× DPR, so 2000 is headroom, not waste.
- **Type floor: ~90px in the artboard.** Slides render full-bleed at 100vw on
  mobile, so a 390px phone scales the artboard by 6.15×. Anything under ~90px
  lands below 14px and stops being readable. This is why the old comparison
  slide failed: its row labels rendered at an effective 7.6px.
- **No grain overlay.** An earlier version had one; it doubled JPEG weight
  (730K → 372K without) and is invisible below ~1000px.
- **Fonts are the real brand faces** — Neue Haas Grotesk, ABC Favorit and
  JetBrains Mono, loaded from `app/fonts/` via `@font-face`. Figma's MCP cannot
  set Neue Haas at all, which is why these are authored here rather than there.

## Gotchas

- `render.sh` passes `--virtual-time-budget=8000`. Without it Chrome can
  screenshot before the local `@font-face` files load and text renders **blank**
  with no error.
- macOS ships bash 3.2, so `render.sh` uses a `case` statement rather than an
  associative array.
- `FlowCutout.png` was cut from `Product Ai Assets/New Shot Lables/Nomio
  Style/FlowSingle.png` by thresholding on saturation and luminance, then
  filling each row between its first and last hit. A flood fill from the border
  does **not** work — it leaks through the translucent amber glass.

## Prices are burned into `s0` / `s0q`

The bottom bars carry £152.94 / £39.99 and £328.90 / £109.99. This
contradicts the rule in
`docs/development/featurePlans/flow-starter-pack.md` that prices live in HTML,
though the artwork it replaced broke it too. If any figure changes, edit the
relevant slide and re-run `render.sh`.

## Clear and Both

Still on the old `mmPdpAssets/` set. The templates are product-agnostic apart
from copy and the bottle cutout, so porting them is a data change plus two new
cutouts rather than a redesign.
