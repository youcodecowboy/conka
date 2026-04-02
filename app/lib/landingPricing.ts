/**
 * Pricing constants for the /start landing page.
 *
 * Source of truth: app/lib/funnelData.ts (FUNNEL_PRICING matrix).
 * These are string constants so they render directly in JSX without .toFixed().
 * Update here if funnel pricing changes.
 */

// Both (Flow + Clear) -- monthly subscription
export const PRICE_PER_DAY_BOTH = "3.22";
export const PRICE_PER_SHOT_BOTH = "1.61";
export const PRICE_PER_MONTH_BOTH = "89.99";

// Single formula -- monthly subscription (same price for Flow and Clear)
export const PRICE_PER_SHOT_FLOW = "2.14";
export const PRICE_PER_SHOT_CLEAR = "2.14";

// Quarterly subscription -- Both
export const PRICE_PER_DAY_BOTH_QUARTERLY = "2.74";

// Product facts
export const CONKA_INGREDIENTS_COUNT = "16";

// Coffee comparison (UK average -- Allegra World Coffee Portal / Statista 2025)
export const COFFEE_PRICE_PER_DAY = "5.00";

// Savings calculation: (5.00 - 3.22) * 30 = 53.40
export const MONTHLY_SAVINGS_VS_COFFEE = "53";
