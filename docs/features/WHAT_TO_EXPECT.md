# What to expect timeline

Timeline section on PDPs: stages (e.g. 30 min → 7 days → 14 days → 30 days → 60+) with copy per product.

## Location

`app/components/product/WhatToExpectTimeline.tsx` (wrapper), `WhatToExpectTimelineDesktop.tsx`, `WhatToExpectTimelineMobile.tsx`. Config: `app/lib/whatToExpectData.ts`.

## Usage

```tsx
<WhatToExpectTimeline
  productId={productId}                    // "01" | "02" | "1" | "2" | "3" | "4"
  sectionTitle="Expected results"          // optional, default: "What to expect"
  sectionSubtitle="your transformation timeline"  // optional
/>
```

`productId` is required and drives which timeline steps and styling (gradient/accent) are used.

## Config logic

- **Single source:** `whatToExpectByProduct` in `whatToExpectData.ts` maps every `ProductId` to an array of `WhatToExpectStep[]`.
- **Structure:** `WhatToExpectStep` = `{ subheading, heading, body }` (e.g. “7 Days”, “The shift begins”, paragraph).
- **Formulas:** `whatToExpectByFormula` — `"01"` → Flow steps, `"02"` → Clear steps.
- **Protocols:** `whatToExpectByProtocol` — `"1"` → Resilience, `"2"` → Precision, `"3"` → Balance, `"4"` → Ultimate (each array is protocol-specific copy).
- **Merge:** `whatToExpectByProduct = { ...whatToExpectByFormula, ...whatToExpectByProtocol }` so one lookup by `productId` works for both formulas and protocols.

Desktop and mobile components read `whatToExpectByProduct[productId]` and use `getProductGradient` / `getProductAccent` from productData for visuals.
