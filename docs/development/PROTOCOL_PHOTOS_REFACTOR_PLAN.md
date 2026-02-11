# Protocol Photos Refactor — Plan

**Goal:** Replicate the asset and thumbnail section from [ProductHero.tsx](app/components/product/ProductHero.tsx) on the protocol hero. Use the protocol image as the first asset, then the shared formula assets (Flow + Clear ingredients, stats, replaces, reviews).

---

## Current state

- **ProductHero (desktop):** Uses [ProductImageSlideshow](app/components/product/ProductImageSlideshow.tsx) with 8 images (Box, Ingredients, Stats, Replaces, Essentials, Steps, Certified, Reviews). Main image + prev/next arrows + horizontal thumbnail strip.
- **ProductHeroMobile:** Same `ProductImageSlideshow` with `fullBleedThumbnails` for full-viewport width on mobile.
- **ProtocolHero (desktop):** Single `Image` with protocol asset from `getProtocolImage(protocolId) || protocol.image`. No slideshow, no thumbnails.
- **ProtocolHeroMobile:** Single `Image` with protocol asset. No slideshow, no thumbnails.

---

## Target asset order

| # | Asset | Source |
|---|-------|--------|
| 1 | Protocol hero image | `getProtocolImage(protocolId) \|\| protocol.image` (protocol-specific) |
| 2 | Flow ingredients | `/formulas/conkaFlow/FlowIngredients.jpg` |
| 3 | Clear ingredients | `/formulas/conkaClear/ClearIngredients.jpg` |
| 4 | Flow stats | `/formulas/conkaFlow/FlowStats.jpg` |
| 5 | Clear stats | `/formulas/conkaClear/ClearStats.jpg` |
| 6 | Flow replaces | `/formulas/conkaFlow/FlowReplaces.jpg` |
| 7 | Clear replaces | `/formulas/conkaClear/ClearReplaces.jpg` |
| 8 | Flow reviews | `/formulas/conkaFlow/FlowReviews.jpg` |
| 9 | Clear reviews | `/formulas/conkaClear/ClearReviews.jpg` |

All assets listed above already exist in `public/formulas/`.

---

## Implementation

### 1. ProtocolHero (desktop)

- **Location:** [app/components/protocol/ProtocolHero.tsx](app/components/protocol/ProtocolHero.tsx)
- **Change:** Replace the current single `Image` block (lines ~68–81) with `ProductImageSlideshow`.
- **Data:** Build an array of 9 slideshow images: `[ { src: protocolImage }, { src: FlowIngredients }, { src: ClearIngredients }, ... ]`.
- **Alt:** Use `alt={`${protocol.name} - Both formulas`}` (or similar) for the slideshow.
- **Layout:** Keep the same container (`relative z-0 lg:w-[44%]`, sticky, etc.); swap the inner `Image` wrapper for `ProductImageSlideshow`. Remove the "the complete cognitive stack" caption if it sits under the image, or keep it under the slideshow—decide in implementation.
- **Import:** Add `import ProductImageSlideshow from "../product/ProductImageSlideshow";`.

### 2. ProtocolHeroMobile

- **Location:** [app/components/protocol/ProtocolHeroMobile.tsx](app/components/protocol/ProtocolHeroMobile.tsx)
- **Change:** Replace the single `Image` block (around lines 454–465) with `ProductImageSlideshow`.
- **Data:** Same 9-image array as desktop.
- **Layout:** Match ProductHeroMobile: wrap slideshow in `div` with `w-screen left-1/2 -translate-x-1/2 bg-[#FAFAFA]` (or equivalent) for full-width mobile layout. Pass `fullBleedThumbnails` so the thumbnail strip has no horizontal padding.
- **Import:** Add `import ProductImageSlideshow from "../product/ProductImageSlideshow";`.

### 3. Shared image list (optional)

- Either define the protocol slideshow images inline in both ProtocolHero and ProtocolHeroMobile, or add a shared helper/constant in e.g. [protocolImageConfig.ts](app/components/navigation/protocolImageConfig.ts) or a new `protocolSlideshowConfig.ts` that takes `protocolId` and returns the 9-image array.
- Recommendation: Add `getProtocolSlideshowImages(protocolId: string): { src: string }[]` in [protocolImageConfig.ts](app/components/navigation/protocolImageConfig.ts) so the image list is defined once and reused by both hero components.

---

## Data flow

```
protocolId → getProtocolImage(protocolId) || protocol.image  →  image 1
static paths                                                    →  images 2–9
→ ProductImageSlideshow({ images, alt })
```

---

## Checklist

- [ ] Add `getProtocolSlideshowImages(protocolId)` (or equivalent) returning the 9-image array.
- [ ] Update ProtocolHero: replace single Image with ProductImageSlideshow.
- [ ] Update ProtocolHeroMobile: replace single Image with ProductImageSlideshow (full-bleed mobile layout).
- [ ] Verify alt text and accessibility for the slideshow.
- [ ] Verify protocol image still comes from `getProtocolImage(protocolId)` / `protocol.image` (protocolImageConfig).

---

## Notes

- `ProductImageSlideshow` is already built for multiple images, thumbnails, prev/next arrows, and `fullBleedThumbnails`. No changes needed to that component.
- Protocol image sources: `getProtocolImage(protocolId)` from protocolImageConfig; fallback `protocol.image` from productData.
- All formula asset paths are under `/formulas/conkaFlow/` and `/formulas/conkaClear/`.
