# Loox testimonials – plan (implemented)

## What to do when you have new review data

1. **Export** reviews from Loox (CSV).
2. **Place** the CSV at `app/lib/reviews.ly_<yourExport>.csv` (e.g. `reviews.ly_TolaWV6.csv`).  
   The path is in `scripts/build-loox-testimonials.mjs`; you can change `CSV_PATH` there if needed.  
   CSV files under `app/lib/reviews.ly_*.csv` are gitignored.
3. **Run** (idempotent – safe to run multiple times):

   ```bash
   npm install   # once, if you haven’t – script uses csv-parse devDependency
   npm run build:reviews
   ```

   This writes:
   - `app/lib/testimonialsFromLoox.ts` – data used by the Testimonials component (via `app/lib/testimonialsFilter.ts`).
   - `docs/loox-product-ids.json` – product ID counts for Shopify lookup.

No other steps needed. The app reads from `testimonialsFromLoox.ts` only.

---

## Scope

- **Products**: CONKA Flow, CONKA Clear, Protocol. Map Loox handles to `flow` | `clarity` | `protocol`.
- **Product IDs**: CSV has numeric `productId`. A list of IDs with review counts is generated for Shopify lookup (see [LOOX_PRODUCT_IDS_AND_SHOPIFY.md](./LOOX_PRODUCT_IDS_AND_SHOPIFY.md)).
- **Data cleanup at build time**: Name → "Name S.", headline from first sentence, etc. See `scripts/build-loox-testimonials.mjs`.
- **Handle → product**: flow / clarity / protocol per handle; see `handleToProductType` in the build script.

## API (app/lib/testimonialsFilter.ts)

- **Curated sets** (3+ star, up to 30 per set, different shuffle seeds):
  - `getSiteTestimonialsFlow()` – flow + protocol (Flow PDP).
  - `getSiteTestimonialsClarity()` – clarity first, then fill (Clarity PDP).
  - `getSiteTestimonialsProtocol()` – flow + protocol, different order (Home, Barry’s).
- **Client shuffle**: `shuffleTestimonials(array)` – Fisher–Yates, for Home/Barry’s so each load can show a different order.

## Pages

- **Home**: `getSiteTestimonialsProtocol()` + `shuffleTestimonials()`.
- **Barry’s BalanceProtocolInfo**: same.
- **Flow PDP**: `getSiteTestimonialsFlow()` (with `autoScrollOnly` where used).
- **Clarity PDP**: `getSiteTestimonialsClarity()` (with `autoScrollOnly` where used).

## Shopify lookup

See [LOOX_PRODUCT_IDS_AND_SHOPIFY.md](./LOOX_PRODUCT_IDS_AND_SHOPIFY.md) for productId list and Postman/GraphQL example.
