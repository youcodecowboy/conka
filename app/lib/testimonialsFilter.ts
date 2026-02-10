/**
 * Filter and adapt Loox testimonials for the Testimonials component.
 * All filtering is in-memory on pre-computed data (no runtime CSV parsing).
 */

import type { LooxTestimonial, ProductType } from "./testimonialsFromLoox";
import { looxTestimonials } from "./testimonialsFromLoox";
import type { Testimonial } from "@/app/components/testimonials/types";

export type { ProductType };

export interface TestimonialFilters {
  /** Show only this product type; "protocol" = mix of protocol + flow for variety */
  productType?: ProductType | "all";
  minRating?: number;
  /** ISO date string – only reviews on or after */
  from?: string;
  /** ISO date string – only reviews on or before */
  to?: string;
  withAssets?: boolean;
}

const PRODUCT_LABELS: Record<ProductType, string> = {
  flow: "CONKA Flow",
  clarity: "CONKA Clear",
  protocol: "Protocol",
};

function looxToTestimonial(row: LooxTestimonial): Testimonial {
  return {
    name: row.name,
    country: "", // Loox has no country; card can hide when empty
    rating: row.rating,
    date: row.date,
    headline: row.headline,
    body: row.body,
    photo: row.photo,
    productType: row.productType,
    productLabel: PRODUCT_LABELS[row.productType],
  };
}

const DEFAULT_MIN_RATING = 3; // Exclude 1–2 star reviews from display

function matchesFilters(row: LooxTestimonial, filters: TestimonialFilters): boolean {
  if (filters.productType && filters.productType !== "all") {
    if (row.productType !== filters.productType) return false;
  }
  const minRating = filters.minRating ?? DEFAULT_MIN_RATING;
  if (row.rating < minRating) return false;
  if (filters.from) {
    if (row.date < filters.from) return false;
  }
  if (filters.to) {
    if (row.date > filters.to) return false;
  }
  if (filters.withAssets === true && !row.hasAssets) return false;
  return true;
}

/**
 * Returns testimonials matching the filters, adapted to Testimonial shape.
 */
export function getFilteredTestimonials(filters: TestimonialFilters = {}): Testimonial[] {
  const list = looxTestimonials.filter((row) => matchesFilters(row, filters));
  return list.map(looxToTestimonial);
}

/**
 * Returns count of testimonials matching the filters.
 */
export function getTestimonialCount(filters: TestimonialFilters = {}): number {
  return looxTestimonials.filter((row) => matchesFilters(row, filters)).length;
}

/** Pool of 3+ star reviews (unfiltered by product type). */
function getPool(): LooxTestimonial[] {
  return looxTestimonials.filter((r) => r.rating >= DEFAULT_MIN_RATING);
}

/**
 * Single site-wide pool – all 3+ star, for Home etc. when no page-specific set is needed.
 */
export function getSiteTestimonials(): Testimonial[] {
  return getPool().map(looxToTestimonial);
}

/** Size of each curated list: enough to feel substantial without hurting performance. */
const CURATED_LIST_SIZE = 30;

/** Fisher–Yates shuffle (deterministic with seed for stable build). */
function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Build a list with 3/4/5 star mixed (prioritise lower ratings so they appear). */
function buildMixedByRating(rows: LooxTestimonial[], size: number, seed: number): Testimonial[] {
  const byRating: Record<number, LooxTestimonial[]> = { 3: [], 4: [], 5: [] };
  for (const r of rows) {
    if (r.rating >= 3 && r.rating <= 5) byRating[r.rating].push(r);
  }
  const perRating = Math.ceil(size / 3);
  const mixed: LooxTestimonial[] = [
    ...byRating[3].slice(0, perRating),
    ...byRating[4].slice(0, perRating),
    ...byRating[5].slice(0, perRating),
  ];
  const mixedIds = new Set(mixed.map((r) => r.id));
  const filled =
    mixed.length >= size ? mixed : [...mixed, ...rows.filter((r) => !mixedIds.has(r.id))];
  return shuffleWithSeed(filled, seed).slice(0, size).map(looxToTestimonial);
}

const pool = getPool();

/** Flow-focused: flow + protocol, 3/4/5 star mixed. */
const flowRows = pool.filter((r) => r.productType === "flow" || r.productType === "protocol");
const siteTestimonialsFlow: Testimonial[] =
  flowRows.length <= CURATED_LIST_SIZE
    ? shuffleWithSeed(flowRows, 1).map(looxToTestimonial)
    : buildMixedByRating(flowRows, CURATED_LIST_SIZE, 2);

/** Clarity-focused: all clarity first, then fill with flow/protocol; 3/4/5 star mixed. */
const clarityRows = pool.filter((r) => r.productType === "clarity");
const otherRows = pool.filter((r) => r.productType !== "clarity");
const clarityFirst = [...clarityRows, ...otherRows];
const siteTestimonialsClarity: Testimonial[] =
  clarityFirst.length <= CURATED_LIST_SIZE
    ? shuffleWithSeed(clarityFirst, 3).map(looxToTestimonial)
    : buildMixedByRating(clarityFirst, CURATED_LIST_SIZE, 4);

/** Protocol-focused: protocol + flow, 3/4/5 star mixed. */
const protocolRows = pool.filter((r) => r.productType === "protocol" || r.productType === "flow");
const siteTestimonialsProtocol: Testimonial[] =
  protocolRows.length <= CURATED_LIST_SIZE
    ? shuffleWithSeed(protocolRows, 5).map(looxToTestimonial)
    : buildMixedByRating(protocolRows, CURATED_LIST_SIZE, 6);

/**
 * Curated list for Flow pages. 3/4/5 star mixed; flow + protocol.
 */
export function getSiteTestimonialsFlow(): Testimonial[] {
  return siteTestimonialsFlow;
}

/** Number of 3+ star reviews that show the CONKA Clear badge (productType from handle: "clear" or "clarity"). See docs/loox-product-ids.json productTypeCounts.clarity after npm run build:reviews. */
export const clarityReviewCount = clarityRows.length;

/**
 * Curated list for Clarity pages. As many CONKA Clear reviews as possible, then filled with others; 3/4/5 star mixed.
 */
export function getSiteTestimonialsClarity(): Testimonial[] {
  return siteTestimonialsClarity;
}

/**
 * Curated list for Protocol / general pages. Protocol + flow, 3/4/5 star mixed.
 */
export function getSiteTestimonialsProtocol(): Testimonial[] {
  return siteTestimonialsProtocol;
}
