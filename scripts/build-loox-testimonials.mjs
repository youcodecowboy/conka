/**
 * Build script: parse Loox CSV and output
 * 1) Product ID list with counts (for Shopify lookup)
 * 2) Cleaned testimonials TypeScript module
 *
 * Run: npm run build:reviews
 * Idempotent: safe to run repeatedly; overwrites outputs from the current CSV only.
 * Requires: npm install (uses csv-parse devDependency).
 */

import { parse } from "csv-parse";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DEFAULT_CSV = join(ROOT, "app/lib/reviews.ly_TolaWV6.csv");
const OUT_TS = join(ROOT, "app/lib/testimonialsFromLoox.ts");
const OUT_IDS_JSON = join(ROOT, "docs/loox-product-ids.json");

// Optional: npm run build:reviews -- path/to/your-export.csv
const CSV_PATH = process.argv[2] ? join(process.cwd(), process.argv[2]) : DEFAULT_CSV;

// Map Loox handle to our product type (flow | clarity | protocol)
function handleToProductType(handle) {
  if (!handle || typeof handle !== "string") return "flow";
  const h = handle.toLowerCase();
  if (h.includes("protocol")) return "protocol";
  if (h.includes("clear") || h.includes("clarity")) return "clarity";
  if (h.includes("conka-flow") || h.includes("flow") || h.includes("conka-shots") || h.includes("6-month") || h.includes("liquid") || h.includes("test-conka-daily") || h.includes("capsules")) return "flow";
  return "flow";
}

// Convert full_name to "Name S." format (edge cases: single name, already abbreviated)
function toDisplayName(fullName, nickname) {
  const name = (fullName || nickname || "").trim();
  if (!name) return "Customer";
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Customer";
  if (parts.length === 1) return parts[0];
  const last = parts[parts.length - 1];
  const lastInitial = last.length >= 2 && last.endsWith(".") ? last.slice(0, -1) : last[0];
  return `${parts[0]} ${lastInitial}.`;
}

async function main() {
  console.log("Reading CSV:", CSV_PATH);
  let csvText = readFileSync(CSV_PATH, "utf-8");
  if (csvText.charCodeAt(0) === 0xfeff) csvText = csvText.slice(1);
  const productIdCounts = {};

  const records = await new Promise((resolve, reject) => {
    parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      trim: true,
    }, (err, out) => (err ? reject(err) : resolve(out)));
  });

  const testimonials = [];
  for (const row of records) {
    const productId = String(row.productId || "").trim();
    if (productId) {
      productIdCounts[productId] = (productIdCounts[productId] || 0) + 1;
    }

    const handle = (row.handle || "").trim();
    let productType = handleToProductType(handle);
    // Manual override: Rudh K. review shown as protocol (Flow + Clear badges)
    if ((row.id || "").trim() === "D5SvYYNNM") productType = "protocol";
    const name = toDisplayName(row.full_name, row.nickname);
    const date = (row.date || "").trim();
    const img = (row.img || "").trim();
    const photos = img ? img.split(",").map((u) => u.trim()).filter(Boolean) : [];
    const body = (row.review || "").trim();
    // Headline = first sentence only, max 80 chars (so card title doesn't repeat full description)
    const firstSentenceMatch = body.match(/^[\s\S]*?[.!?]/);
    const firstSentence = (firstSentenceMatch ? firstSentenceMatch[0].trim() : body.split(/\n/)[0]?.trim() || body);
    const HEADLINE_MAX = 80;
    const headline = firstSentence.length > HEADLINE_MAX ? firstSentence.slice(0, HEADLINE_MAX - 3).trim() + "..." : firstSentence;

    testimonials.push({
      id: (row.id || "").trim(),
      name,
      rating: Math.min(5, Math.max(1, parseInt(row.rating, 10) || 5)),
      date,
      headline,
      body,
      photo: photos[0] || undefined,
      photos: photos.length ? photos : undefined,
      productId: productId || undefined,
      handle: handle || undefined,
      productType,
      hasAssets: photos.length > 0,
    });
  }

  const productIdList = Object.entries(productIdCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([id, count]) => ({ productId: id, count }));

  const productTypeCounts = { flow: 0, clarity: 0, protocol: 0 };
  for (const t of testimonials) {
    if (productTypeCounts[t.productType] !== undefined) productTypeCounts[t.productType]++;
  }

  writeFileSync(
    OUT_IDS_JSON,
    JSON.stringify(
      {
        productIdCounts: productIdList,
        productTypeCounts,
        generated: new Date().toISOString(),
      },
      null,
      2
    ),
    "utf-8"
  );

  // Curation: same logic as app/lib/testimonialsFilter.ts – 3+ star, 30 per set, deterministic shuffle
  const MIN_RATING = 3;
  const SET_SIZE = 30;
  const pool = testimonials.filter((r) => r.rating >= MIN_RATING);

  function shuffle(arr, seed) {
    const out = [...arr];
    let s = seed;
    for (let i = out.length - 1; i > 0; i--) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      const j = s % (i + 1);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function buildSet(predicate, seed) {
    const filtered = pool.filter(predicate);
    return shuffle(filtered, seed).slice(0, SET_SIZE);
  }

  const siteTestimonialsFlow = buildSet(
    (r) => r.productType === "flow" || r.productType === "protocol",
    1
  );
  const clarityOnly = pool.filter((r) => r.productType === "clarity");
  const rest = pool.filter((r) => r.productType !== "clarity");
  const siteTestimonialsClarity = shuffle([...clarityOnly, ...rest], 2).slice(0, SET_SIZE);
  const siteTestimonialsProtocol = buildSet(
    (r) => r.productType === "flow" || r.productType === "protocol",
    3
  );

  const tsContent = `/**
 * Loox testimonials – curated sets only (~90 reviews).
 * Generated by scripts/build-loox-testimonials.mjs from CSV.
 * Do not edit by hand; re-run the script after CSV updates.
 */

export type ProductType = "flow" | "clarity" | "protocol";

export interface LooxTestimonial {
  id: string;
  name: string;
  rating: number;
  date: string;
  headline: string;
  body: string;
  photo?: string;
  photos?: string[];
  productId?: string;
  handle?: string;
  productType: ProductType;
  hasAssets: boolean;
}

export const siteTestimonialsFlow: LooxTestimonial[] = ${JSON.stringify(siteTestimonialsFlow, null, 2)};

export const siteTestimonialsClarity: LooxTestimonial[] = ${JSON.stringify(siteTestimonialsClarity, null, 2)};

export const siteTestimonialsProtocol: LooxTestimonial[] = ${JSON.stringify(siteTestimonialsProtocol, null, 2)};
`;

  writeFileSync(OUT_TS, tsContent, "utf-8");
  console.log("Wrote", OUT_TS);
  console.log("Wrote", OUT_IDS_JSON);
  console.log("Total in CSV:", testimonials.length, "→ curated 3×30 = 90 in", OUT_TS);
  console.log("Product ID counts:", productIdList.length);
  console.log("Reviews that can show CONKA Clear badge:", productTypeCounts.clarity);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
