/**
 * Funnel Page — Data Layer
 *
 * Types, pricing, variant mapping, display data, and upsell logic
 * for the product funnel page (/funnel).
 *
 * Pricing is mock until COGS analysis is finalised. Variant IDs for
 * Flow/Clear monthly reuse existing Shopify products; "Both" and
 * quarterly combos are empty until created in Shopify Admin.
 */

import { formatPrice } from "./productData";
import { GUARANTEE_DAYS } from "./offerConstants";

// ============================================
// TYPES
// ============================================

export type FunnelProduct = "both" | "flow" | "clear";
export type FunnelCadence = "monthly-sub" | "monthly-otp" | "quarterly-sub";

export interface FunnelPricing {
  /** Total price for this combination */
  price: number;
  /** Price per shot */
  perShot: number;
  /** Price per day (shots per day × perShot) */
  perDay: number;
  /** Total shots included */
  shotCount: number;
  /** Crossed-out compare-at price (shown for subscription options) */
  compareAtPrice?: number;
}

export interface FunnelVariantConfig {
  variantId: string;
  sellingPlanId?: string;
}

export interface UpsellOffer {
  headline: string;
  body: string;
  acceptLabel: string;
  declineLabel: string;
  upgradedProduct: FunnelProduct;
  upgradedCadence: FunnelCadence;
  /** What the customer actually pays extra */
  priceDifference?: number;
  /** What the added product would cost on its own (crossed-out reference price) */
  compareAtUpgrade?: number;
  /** Total savings vs buying separately or vs current selection */
  savingsAmount?: number;
  /** Savings as a label (e.g. "Save £29 vs buying separately") */
  savingsLabel?: string;
  /** Product image for the upsell card */
  image?: { src: string; alt: string };
  /** Benefit bullets with tick marks */
  benefits?: string[];
}

// ============================================
// PRICING MATRIX (3 products × 3 cadences)
// ============================================
// Pricing from COGS analysis (2026-03-27). Variant IDs still pending for Both + quarterly.

const FUNNEL_PRICING: Record<FunnelProduct, Record<FunnelCadence, FunnelPricing>> = {
  both: {
    "monthly-sub": {
      price: 89.99,
      perShot: 1.61,
      perDay: 3.22,
      shotCount: 56,
      compareAtPrice: 129.99,
    },
    "monthly-otp": {
      price: 129.99,
      perShot: 2.32,
      perDay: 4.64,
      shotCount: 56,
    },
    "quarterly-sub": {
      price: 229.99,
      perShot: 1.37,
      perDay: 2.74,
      shotCount: 168,
      compareAtPrice: 269.97,
    },
  },
  flow: {
    "monthly-sub": {
      price: 59.99,
      perShot: 2.14,
      perDay: 2.14,
      shotCount: 28,
      compareAtPrice: 79.99,
    },
    "monthly-otp": {
      price: 79.99,
      perShot: 2.86,
      perDay: 2.86,
      shotCount: 28,
    },
    "quarterly-sub": {
      price: 149.99,
      perShot: 1.79,
      perDay: 1.79,
      shotCount: 84,
      compareAtPrice: 179.97,
    },
  },
  clear: {
    "monthly-sub": {
      price: 59.99,
      perShot: 2.14,
      perDay: 2.14,
      shotCount: 28,
      compareAtPrice: 79.99,
    },
    "monthly-otp": {
      price: 79.99,
      perShot: 2.86,
      perDay: 2.86,
      shotCount: 28,
    },
    "quarterly-sub": {
      price: 149.99,
      perShot: 1.79,
      perDay: 1.79,
      shotCount: 84,
      compareAtPrice: 179.97,
    },
  },
};

// ============================================
// VARIANT MAPPING (Shopify GIDs)
// ============================================
// Funnel-specific products created 2026-03-27.
// Monthly uses 28-shot (Flow/Clear) or 56-shot (Both) variant.
// Quarterly uses 84-shot (Flow/Clear) or 168-shot (Both) variant.
// Selling plans: Single = Flow/Clear, Dual = Both.

const FUNNEL_VARIANTS: Record<FunnelProduct, Record<FunnelCadence, FunnelVariantConfig>> = {
  flow: {
    "monthly-sub": {
      variantId: "gid://shopify/ProductVariant/57568795918710",
      sellingPlanId: "gid://shopify/SellingPlan/712527348086",
    },
    "monthly-otp": {
      variantId: "gid://shopify/ProductVariant/57568795918710",
    },
    "quarterly-sub": {
      variantId: "gid://shopify/ProductVariant/57568795951478",
      sellingPlanId: "gid://shopify/SellingPlan/712527413622",
    },
  },
  clear: {
    "monthly-sub": {
      variantId: "gid://shopify/ProductVariant/57568517489014",
      sellingPlanId: "gid://shopify/SellingPlan/712527348086",
    },
    "monthly-otp": {
      variantId: "gid://shopify/ProductVariant/57568517489014",
    },
    "quarterly-sub": {
      variantId: "gid://shopify/ProductVariant/57568746930550",
      sellingPlanId: "gid://shopify/SellingPlan/712527413622",
    },
  },
  both: {
    "monthly-sub": {
      variantId: "gid://shopify/ProductVariant/57568809976182",
      sellingPlanId: "gid://shopify/SellingPlan/712527479158",
    },
    "monthly-otp": {
      variantId: "gid://shopify/ProductVariant/57568809976182",
    },
    "quarterly-sub": {
      variantId: "gid://shopify/ProductVariant/57568810008950",
      sellingPlanId: "gid://shopify/SellingPlan/712527446390",
    },
  },
};

// ============================================
// DISPLAY DATA
// ============================================

export interface FunnelProductDisplay {
  name: string;
  label: string;
  tagline: string;
  shotCount: number;
  description: string;
  /** Small product thumbnail for the card */
  thumbnail: string;
  badge?: string;
  /** Accent colour for the card (warm for Flow, cool for Clear, gradient for Both) */
  accent: string;
  /** Time-of-day indicator */
  timeLabel: string;
  timeEmoji: string;
  features: string[];
}

export const FUNNEL_PRODUCTS: Record<FunnelProduct, FunnelProductDisplay> = {
  both: {
    name: "Both",
    label: "Flow + Clear",
    tagline: "The complete daily system",
    shotCount: 56,
    description: "Morning foundation + evening recovery. Most customers choose Both because the two formulas are designed to work as a daily pair.",
    thumbnail: "/formulas/BothShots.jpg",
    badge: "Most Popular",
    accent: "#4058bb",
    timeLabel: "AM + PM",
    timeEmoji: "☀️🌙",
    features: [
      "2 boxes (56 shots/mo)",
      "Lowest price per shot",
      "Informed Sport Certified",
    ],
  },
  flow: {
    name: "Flow",
    label: "CONKA Flow",
    tagline: "Morning foundation",
    shotCount: 28,
    description: "Adaptogens including KSM-66 Ashwagandha and Lemon Balm. Caffeine-free, UK patented formula.",
    thumbnail: "/formulas/conkaFlow/FlowNoBackground.png",
    accent: "#d97706",
    timeLabel: "Morning",
    timeEmoji: "☀️",
    features: [
      "1 box (28 shots/mo)",
      "Caffeine-free, no crash",
      "UK patented (GB2629279)",
    ],
  },
  clear: {
    name: "Clear",
    label: "CONKA Clear",
    tagline: "Evening wind-down",
    shotCount: 28,
    description: "Nootropics + Vitamin C, which contributes to normal psychological function.†† Glutathione, Alpha GPC, NAC.",
    thumbnail: "/formulas/conkaClear/ClearNoBackground.png",
    accent: "#0369a1",
    timeLabel: "Evening",
    timeEmoji: "🌙",
    features: [
      "1 box (28 shots/mo)",
      "Vitamin C for psychological function††",
      "Glutathione + Alpha GPC",
    ],
  },
};

export interface FunnelCadenceDisplay {
  label: string;
  subtitle: string;
  badge?: string;
  savingsLabel?: string;
  features: string[];
}

export const FUNNEL_CADENCES: Record<FunnelCadence, FunnelCadenceDisplay> = {
  "monthly-sub": {
    label: "Monthly",
    subtitle: "Delivered monthly, cancel anytime",
    badge: "Most Popular",
    features: [
      "Free UK shipping every month",
      "Cancel or pause anytime, no lock-in",
      "Save 25% vs one-time price",
    ],
  },
  "monthly-otp": {
    label: "One-Time",
    subtitle: "Single order, no subscription",
    features: [
      `${GUARANTEE_DAYS}-day money-back guarantee*`,
      "Subscribe later and save 25%",
    ],
  },
  "quarterly-sub": {
    label: "Quarterly",
    subtitle: "3-month supply, lowest price per shot",
    savingsLabel: "Best Value",
    features: [
      "Free UK shipping",
      "Cancel or pause anytime",
      "Lowest cost per shot across all plans",
    ],
  },
};

// ============================================
// HERO IMAGES
// ============================================

/** Product-specific hero images (used in static mode for step 2) */
export const FUNNEL_HERO_IMAGES: Record<FunnelProduct, { src: string; alt: string }> = {
  both: {
    src: "/formulas/ConkaAmPm.jpg",
    alt: "CONKA Flow and Clear — your AM and PM brain performance system",
  },
  flow: {
    src: "/formulas/conkaFlow/FlowBox.jpg",
    alt: "CONKA Flow — morning focus and calm formula",
  },
  clear: {
    src: "/formulas/conkaClear/ClearBox.jpg",
    alt: "CONKA Clear — evening clarity and wind-down formula",
  },
};

/** Step 2: Slideshow images per product (carousel) */
const FUNNEL_PRODUCT_SLIDESHOW_BASE: Record<FunnelProduct, { src: string }[]> = {
  flow: [
    { src: "/formulas/conkaFlow/FlowBox.jpg" },
    { src: "/formulas/conkaFlow/FlowIngredients.jpg" },
    { src: "/formulas/conkaFlow/FlowStats.jpg" },
    { src: "/formulas/conkaFlow/FlowEssentials.jpg" },
    { src: "/formulas/conkaFlow/FlowCertified.jpg" },
    { src: "/formulas/conkaFlow/FlowReviews.jpg" },
  ],
  clear: [
    { src: "/formulas/conkaClear/ClearBox.jpg" },
    { src: "/formulas/conkaClear/ClearIngredients.jpg" },
    { src: "/formulas/conkaClear/ClearStats.jpg" },
    { src: "/formulas/conkaClear/ClearEssentials.jpg" },
    { src: "/formulas/conkaClear/ClearCertified.jpg" },
    { src: "/formulas/conkaClear/ClearReviews.jpg" },
  ],
  both: [
    { src: "/formulas/ConkaAmPm.jpg" },
    { src: "/formulas/conkaFlow/FlowIngredients.jpg" },
    { src: "/formulas/conkaClear/ClearIngredients.jpg" },
    { src: "/formulas/conkaFlow/FlowStats.jpg" },
    { src: "/formulas/conkaClear/ClearStats.jpg" },
    { src: "/formulas/conkaFlow/FlowReviews.jpg" },
    { src: "/formulas/conkaClear/ClearReviews.jpg" },
  ],
};

/** Quarterly swaps the first slide for "Both" only to show the larger shipment */
const QUARTERLY_FIRST_SLIDE: Record<FunnelProduct, { src: string } | null> = {
  flow: null,
  clear: null,
  both: { src: "/formulas/QuartelyDouble.jpg" },
};

/** Get slideshow images for a product, adjusted for cadence */
export function getFunnelProductSlideshow(
  product: FunnelProduct,
  cadence: FunnelCadence,
): { src: string }[] {
  const base = FUNNEL_PRODUCT_SLIDESHOW_BASE[product];
  const quarterlySlide = QUARTERLY_FIRST_SLIDE[product];
  if (cadence === "quarterly-sub" && quarterlySlide) {
    return [quarterlySlide, ...base.slice(1)];
  }
  return base;
}

// ============================================
// HELPERS
// ============================================

export function getOfferPricing(
  product: FunnelProduct,
  cadence: FunnelCadence,
): FunnelPricing {
  return FUNNEL_PRICING[product][cadence];
}

export function getOfferVariant(
  product: FunnelProduct,
  cadence: FunnelCadence,
): FunnelVariantConfig | null {
  const config = FUNNEL_VARIANTS[product][cadence];
  if (!config || !config.variantId) return null;
  return config;
}

export function isVariantReady(
  product: FunnelProduct,
  cadence: FunnelCadence,
): boolean {
  const config = FUNNEL_VARIANTS[product][cadence];
  return Boolean(config?.variantId);
}

/** For "Both", get the price of buying Flow + Clear separately at the same cadence */
export function getBuySeparatelyPrice(cadence: FunnelCadence): number {
  return FUNNEL_PRICING.flow[cadence].price + FUNNEL_PRICING.clear[cadence].price;
}

/** Get the cadence frequency label for cart attributes */
export function getCadenceFrequency(
  cadence: FunnelCadence,
): string {
  switch (cadence) {
    case "monthly-sub":
      return "monthly";
    case "monthly-otp":
      return "one-time";
    case "quarterly-sub":
      return "quarterly";
  }
}

// ============================================
// UPSELL LOGIC
// ============================================

/**
 * Upsell logic for Product > Cadence > Checkout flow.
 *
 * All upsells trigger at checkout (after the user has chosen both product
 * and cadence). Two categories:
 *
 * 1. Product upgrades: Flow/Clear → Both (the user picked a single product,
 *    we offer the pair at a discount vs buying separately).
 * 2. Cadence upgrades: OTP → subscription, monthly → quarterly (the user
 *    picked Both but a less committed cadence, we offer more savings).
 *
 * Priority: product upgrade first (higher AOV impact), then cadence upgrade.
 */
export function getUpsellOffer(
  product: FunnelProduct,
  cadence: FunnelCadence,
): UpsellOffer | null {
  const bothImage = { src: "/formulas/ConkaAmPm.jpg", alt: "CONKA Flow and Clear — AM and PM brain performance" };

  // --- Product upgrades: single product → Both ---

  // Flow → Both (add Clear)
  if (product === "flow") {
    if (!isVariantReady("both", cadence)) return null;
    const currentPrice = getOfferPricing("flow", cadence).price;
    const clearAlonePrice = getOfferPricing("clear", cadence).price;
    const upgradePrice = getOfferPricing("both", cadence).price;
    const priceDiff = upgradePrice - currentPrice;
    const savingsVsSeparate = clearAlonePrice - priceDiff;
    return {
      headline: "Get the full system?",
      body: "Most customers take Flow and Clear together. Flow sharpens your morning, Clear recovers your evening. Together they compound in a way that neither delivers alone.",
      acceptLabel: "Upgrade to Both",
      declineLabel: "No thanks, just Flow",
      upgradedProduct: "both",
      upgradedCadence: cadence,
      priceDifference: priceDiff,
      compareAtUpgrade: clearAlonePrice,
      savingsAmount: savingsVsSeparate,
      savingsLabel: `Save ${formatPrice(savingsVsSeparate)} vs adding Clear separately`,
      image: bothImage,
      benefits: [
        "Add CONKA Clear (PM recovery) to your order",
        `Save ${formatPrice(savingsVsSeparate)} vs buying separately`,
        "Full-day cognitive support, sunrise to sunset",
      ],
    };
  }

  // Clear → Both (add Flow)
  if (product === "clear") {
    if (!isVariantReady("both", cadence)) return null;
    const currentPrice = getOfferPricing("clear", cadence).price;
    const flowAlonePrice = getOfferPricing("flow", cadence).price;
    const upgradePrice = getOfferPricing("both", cadence).price;
    const priceDiff = upgradePrice - currentPrice;
    const savingsVsSeparate = flowAlonePrice - priceDiff;
    return {
      headline: "Get the full system?",
      body: "Most customers take Flow and Clear together. Clear recovers your evening, Flow sharpens your morning. Together they compound in a way that neither delivers alone.",
      acceptLabel: "Upgrade to Both",
      declineLabel: "No thanks, just Clear",
      upgradedProduct: "both",
      upgradedCadence: cadence,
      priceDifference: priceDiff,
      compareAtUpgrade: flowAlonePrice,
      savingsAmount: savingsVsSeparate,
      savingsLabel: `Save ${formatPrice(savingsVsSeparate)} vs adding Flow separately`,
      image: bothImage,
      benefits: [
        "Add CONKA Flow (AM focus) to your order",
        `Save ${formatPrice(savingsVsSeparate)} vs buying separately`,
        "Full-day cognitive support, sunrise to sunset",
      ],
    };
  }

  // --- Cadence upgrades: Both selected, offer better cadence ---

  // Both + OTP → Both + monthly sub
  if (product === "both" && cadence === "monthly-otp") {
    if (!isVariantReady("both", "monthly-sub")) return null;
    const currentPrice = getOfferPricing("both", "monthly-otp").price;
    const upgradePrice = getOfferPricing("both", "monthly-sub").price;
    const savings = currentPrice - upgradePrice;
    return {
      headline: `Subscribe and save ${formatPrice(savings)}/mo`,
      body: `You're paying ${formatPrice(currentPrice)} for a one-time order. Subscribe at ${formatPrice(upgradePrice)}/mo and save ${formatPrice(savings)} every month. Cancel or pause anytime.`,
      acceptLabel: `Subscribe at ${formatPrice(upgradePrice)}/mo`,
      declineLabel: "No thanks, one-time is fine",
      upgradedProduct: "both",
      upgradedCadence: "monthly-sub",
      priceDifference: upgradePrice - currentPrice,
      compareAtUpgrade: currentPrice,
      savingsAmount: savings,
      savingsLabel: `Save ${formatPrice(savings)} every month`,
      image: bothImage,
      benefits: [
        `Save ${formatPrice(savings)} every month`,
        "Cancel or pause anytime, no lock-in",
        "Free UK shipping on every delivery",
      ],
    };
  }

  // Both + monthly sub → Both + quarterly
  if (product === "both" && cadence === "monthly-sub") {
    if (!isVariantReady("both", "quarterly-sub")) return null;
    const monthlyTotal = getOfferPricing("both", "monthly-sub").price * 3;
    const quarterlyPrice = getOfferPricing("both", "quarterly-sub").price;
    const savings = monthlyTotal - quarterlyPrice;
    return {
      headline: "Go quarterly, save more",
      body: `3 months delivered at once for ${formatPrice(quarterlyPrice)} instead of ${formatPrice(monthlyTotal)}. Lowest price per shot, fewer deliveries.`,
      acceptLabel: `Go quarterly at ${formatPrice(quarterlyPrice)}`,
      declineLabel: "No thanks, monthly is fine",
      upgradedProduct: "both",
      upgradedCadence: "quarterly-sub",
      priceDifference: quarterlyPrice - monthlyTotal,
      compareAtUpgrade: monthlyTotal,
      savingsAmount: savings,
      savingsLabel: `Save ${formatPrice(savings)} vs 3x monthly`,
      image: bothImage,
      benefits: [
        `Save ${formatPrice(savings)} vs 3 months of monthly`,
        "Lowest price per shot across all plans",
        "Cancel or pause anytime",
      ],
    };
  }

  // Both + quarterly → no upsell (best option already selected)
  return null;
}
