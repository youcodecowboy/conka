# Reviews workflow (Loox CSV → site)

When you have **new review data** from Loox:

1. **Put the CSV in the project**  
   Either:
   - Replace `app/lib/reviews.ly_TolaWV6.csv`, or  
   - Put your file anywhere and pass it in step 2.

2. **Run the build**  
   ```bash
   npm run build:reviews
   ```  
   Or with a specific file:
   ```bash
   npm run build:reviews -- app/lib/your-export.csv
   ```

3. **Commit the output**  
   - `app/lib/testimonialsFromLoox.ts` (curated 3×30 – **do commit**)  
   - `docs/loox-product-ids.json` (optional)  
   - Do **not** commit the CSV (gitignored).

That’s it. The site uses the three curated sets from `testimonialsFromLoox.ts` via `app/lib/testimonialsFilter.ts`.

---

**If you see** `Cannot find module './testimonialsFromLoox'` **in the IDE:**  
The generated file may be missing or from an old format. Run `npm run build:reviews` (with a CSV in place) or `node scripts/migrate-loox-to-curated.mjs` (if you still have an old full-array file). Then restart the TypeScript server (Cmd+Shift+P → “TypeScript: Restart TS Server”).
