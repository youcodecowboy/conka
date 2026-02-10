# Scripts

## Review data (Loox)

**Single command to format Loox review data for the app:**

```bash
npm run build:reviews
```

- **Prereq:** Run `npm install` once so the `csv-parse` devDependency is available.
- **Input:** `app/lib/reviews.ly_TolaWV6.csv` (export from Loox).
- **Output:**
  - `app/lib/testimonialsFromLoox.ts` – curated only (3×30 reviews), used by the Testimonials component.
  - `docs/loox-product-ids.json` – product ID counts for Shopify lookup.

**Idempotent:** Safe to run repeatedly. Each run overwrites the two output files from the current CSV; No leftover state. If you have an old full-array testimonialsFromLoox.ts, run `node scripts/migrate-loox-to-curated.mjs` once to shrink it (no CSV needed). Replacing the CSV and running again is the only way to “update” review data.

See [docs/LOOX_TESTIMONIALS_PLAN.md](../docs/LOOX_TESTIMONIALS_PLAN.md) for the full flow.
