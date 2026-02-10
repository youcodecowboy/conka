# Loox testimonials – plan (implemented)

## What to do when you have new review data

1. **Export** reviews from Loox (CSV).
2. **Replace** the CSV at `app/lib/reviews.ly_TolaWV6.csv` with the new export (or point the script at your file and run).
3. **Run** (idempotent – safe to run multiple times; each run overwrites outputs from the current CSV):  
   ```bash
   npm install   # once, if you haven’t – script uses csv-parse devDependency
   npm run build:reviews
   ```
   This is the only step that formats data for the app. It writes:
   - `app/lib/testimonialsFromLoox.ts` – data used by the Testimonials component (via `testimonialsFilter.ts`).
   - `docs/loox-product-ids.json` – product ID counts for Shopify lookup.

No other scripts or manual steps are needed. The app reads from `testimonialsFromLoox.ts` only.

---

## Scope

- **Products**: Only two products (CONKA Flow, CONKA Clear) plus protocol. Map Loox handles to `flow` | `clarity` | `protocol`.
- **Product IDs**: CSV has numeric `productId` only. A list of IDs with review counts is generated so you can look up each product in Shopify (see [LOOX_PRODUCT_IDS_AND_SHOPIFY.md](./LOOX_PRODUCT_IDS_AND_SHOPIFY.md) for Postman/GraphQL).
- **Data cleanup at build time** (no runtime parsing):
  - Drop: `email`, `reply`, `replied_at`, `metaobject_handle`, `incentivized`.
  - Name: convert to "Name S." format (e.g. Paul Thandi → Paul T.) with edge cases for single names / already abbreviated.
- **Handle → product mapping**:
  - Any `conka-flow` / flow / conka-shots / 6-month / liquid / test-conka-daily / capsules → **flow**
  - Any variant of conka clear / clarity → **clarity**
  - Explicit protocol (e.g. `protocol-conka-ultimate`) → **protocol**
- **Protocol / mix**: For protocol or “mix” contexts (e.g. Barry’s), show a mix of protocol + flow reviews via `getMixTestimonials()`.

## Deliverables

1. **Single script**  
   `scripts/build-loox-testimonials.mjs` (run via `npm run build:reviews`)  
   - Parses `app/lib/reviews.ly_TolaWV6.csv` (BOM-safe).  
   - Writes `app/lib/testimonialsFromLoox.ts` (typed array used by the component) and `docs/loox-product-ids.json` (productId + count).  
   - All formatting and filtering logic for reviews lives here; the app only consumes the generated TS file.

2. **Filtering**  
   `app/lib/testimonialsFilter.ts`  
   - `getFilteredTestimonials({ productType?, minRating?, from?, to?, withAssets? })`  
   - `getTestimonialCount(filters)`  
   - `getMixTestimonials(limit?)` for protocol + flow mix.  
   - All work on pre-computed data (no CSV in browser).

3. **Component**  
   - `Testimonial` type: optional `country`, optional `productType` / `productLabel`.  
   - `TestimonialCard`: shows product badge (Flow = amber, Clarity = blue, Protocol = neutral) when `productLabel` is set; hides country when empty.  
   - `Testimonials` accepts `count` and shows “(X reviews)” in section headers.

4. **Pages**  
   - **Home**: `getFilteredTestimonials({ productType: "all" })`, shuffled; count from `getTestimonialCount({ productType: "all" })`.  
   - **Flow**: `getFilteredTestimonials({ productType: "flow" })`, `maxReviews={8}`, count for flow.  
   - **Clarity**: same with `productType: "clarity"`.  
   - **ProductHeroMobile**: by `formulaId` (01 → flow, 02 → clarity), filtered testimonials + count.  
   - **Barry’s BalanceProtocolInfo**: `getMixTestimonials()`, shuffled, with count.

5. **Shopify lookup**  
   See [LOOX_PRODUCT_IDS_AND_SHOPIFY.md](./LOOX_PRODUCT_IDS_AND_SHOPIFY.md) for productId list and Postman/GraphQL example to resolve IDs to product title/handle in Shopify Admin API.
