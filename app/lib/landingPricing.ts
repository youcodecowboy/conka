/**
 * Pricing constants for the landing and CRO surfaces (/start, the product
 * split, showcase, testimonials, the crash chart and the lab FAQ).
 *
 * Every price here is DERIVED from app/lib/offerData.ts (the OFFER_PRICING
 * matrix), which is the only place prices we can sell at are allowed to live.
 * Nothing in this file needs updating when funnel pricing changes: change
 * offerData and these follow. Do not reintroduce literals (SCRUM-1323).
 *
 * They are exported as strings so they render directly in JSX without
 * .toFixed() at every call site.
 */

import { getOfferPricing } from "./offerData";

const BOTH_MONTHLY = getOfferPricing("both", "monthly-sub");
const BOTH_QUARTERLY = getOfferPricing("both", "quarterly-sub");
const FLOW_MONTHLY = getOfferPricing("flow", "monthly-sub");
const CLEAR_MONTHLY = getOfferPricing("clear", "monthly-sub");

// Both (Flow + Clear) -- monthly subscription ("20 + 8 free" offer)
export const PRICE_PER_DAY_BOTH = BOTH_MONTHLY.perDay.toFixed(2);
export const PRICE_PER_SHOT_BOTH = BOTH_MONTHLY.perShot.toFixed(2);
export const PRICE_PER_MONTH_BOTH = BOTH_MONTHLY.price.toFixed(2);

// Single formula -- monthly subscription (same price for Flow and Clear)
export const PRICE_PER_SHOT_FLOW = FLOW_MONTHLY.perShot.toFixed(2);
export const PRICE_PER_SHOT_CLEAR = CLEAR_MONTHLY.perShot.toFixed(2);

// Quarterly subscription -- Both
export const PRICE_PER_DAY_BOTH_QUARTERLY = BOTH_QUARTERLY.perDay.toFixed(2);

// Product facts
export const CONKA_INGREDIENTS_COUNT = "16";

// Coffee comparison (UK average -- Allegra World Coffee Portal / Statista 2025)
const COFFEE_PER_DAY = 5.0;
export const COFFEE_PRICE_PER_DAY = COFFEE_PER_DAY.toFixed(2);

/**
 * Monthly saving against a daily coffee, over a 30-day month. Floored rather
 * than rounded so the figure never overstates what is actually saved.
 */
export const MONTHLY_SAVINGS_VS_COFFEE = String(
  Math.floor((COFFEE_PER_DAY - BOTH_MONTHLY.perDay) * 30),
);
