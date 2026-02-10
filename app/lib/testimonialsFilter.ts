/**
 * Three curated testimonial sets from ~500 Loox reviews.
 *
 * When does this run?
 * - The three sets are built once when this module is first loaded (no CSV at runtime).
 * - You only run `npm run build:reviews` when you have a new CSV from Loox; that updates
 *   app/lib/testimonialsFromLoox.ts. This file then filters that data into 3 sets – no rebuild needed.
 *
 * What we do: take 3+ star reviews, split by product type (flow / clarity / protocol), pick up to 30
 * per set with different shuffle seeds so each place gets a different slice. Flow & Protocol pages
 * show flow+protocol reviews; Clarity shows clarity-first then fill; Home/Barry's use protocol set.
 */

import type { LooxTestimonial, ProductType } from "./testimonialsFromLoox";
import { looxTestimonials } from "./testimonialsFromLoox";
import type { Testimonial } from "@/app/components/testimonials/types";

const PRODUCT_LABELS: Record<ProductType, string> = {
  flow: "CONKA Flow",
  clarity: "CONKA Clear",
  protocol: "Protocol",
};

function looxToTestimonial(row: LooxTestimonial): Testimonial {
  return {
    name: row.name,
    country: "",
    rating: row.rating,
    date: row.date,
    headline: row.headline,
    body: row.body,
    photo: row.photo,
    productType: row.productType,
    productLabel: PRODUCT_LABELS[row.productType],
  };
}

const MIN_RATING = 3;

function getPool(): LooxTestimonial[] {
  return looxTestimonials.filter((r) => r.rating >= MIN_RATING);
}

const SET_SIZE = 30;

/** Deterministic shuffle so each set differs. */
function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** One set: filter pool by type, shuffle with seed, take SET_SIZE. */
function buildSet(
  pool: LooxTestimonial[],
  predicate: (r: LooxTestimonial) => boolean,
  seed: number,
): Testimonial[] {
  const filtered = pool.filter(predicate);
  return shuffle(filtered, seed).slice(0, SET_SIZE).map(looxToTestimonial);
}

const pool = getPool();

// Flow page: flow + protocol reviews, one random-looking set
const siteTestimonialsFlow = buildSet(
  pool,
  (r) => r.productType === "flow" || r.productType === "protocol",
  1,
);

// Clarity page: clarity first, then rest so we have enough
const clarityOnly = pool.filter((r) => r.productType === "clarity");
const rest = pool.filter((r) => r.productType !== "clarity");
const clarityPool = [...clarityOnly, ...rest];
const siteTestimonialsClarity = shuffle(clarityPool, 2)
  .slice(0, SET_SIZE)
  .map(looxToTestimonial);

// Protocol / Home / Barry's: flow + protocol, different set from Flow page
const siteTestimonialsProtocol = buildSet(
  pool,
  (r) => r.productType === "flow" || r.productType === "protocol",
  3,
);

export function getSiteTestimonialsFlow(): Testimonial[] {
  return siteTestimonialsFlow;
}

export function getSiteTestimonialsClarity(): Testimonial[] {
  return siteTestimonialsClarity;
}

export function getSiteTestimonialsProtocol(): Testimonial[] {
  return siteTestimonialsProtocol;
}

/** Shuffle array (Fisher–Yates). Use for client-side variety e.g. Home/Barry's. */
export function shuffleTestimonials<T>(array: T[]): T[] {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
