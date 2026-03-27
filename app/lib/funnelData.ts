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
    tagline: "The complete cognitive day",
    shotCount: 56,
    description: "Most people optimise their mornings. The best people optimise their full day.",
    thumbnail: "/formulas/BothShots.jpg",
    badge: "Most Popular",
    accent: "#4058bb",
    timeLabel: "AM + PM",
    timeEmoji: "☀️🌙",
    features: [
      "2 boxes (56 shots)",
      "Flow starts it, Clear completes it",
      "Best value per shot",
    ],
  },
  flow: {
    name: "Flow",
    label: "CONKA Flow",
    tagline: "Your morning edge",
    shotCount: 28,
    description: "Calm focus that builds across the day. Not a stimulant, an upgrade.",
    thumbnail: "/formulas/conkaFlow/FlowNoBackground.png",
    accent: "#d97706",
    timeLabel: "Morning",
    timeEmoji: "☀️",
    features: [
      "1 box (28 shots)",
      "Show up the same at 4pm as at 9am",
      "Caffeine-free, patented formula",
    ],
  },
  clear: {
    name: "Clear",
    label: "CONKA Clear",
    tagline: "Your evening reset",
    shotCount: 28,
    description: "Clears the mental debt of a hard day. Recovery isn\u2019t just physical.",
    thumbnail: "/formulas/conkaClear/ClearNoBackground.png",
    accent: "#0369a1",
    timeLabel: "Evening",
    timeEmoji: "🌙",
    features: [
      "1 box (28 shots)",
      "Wake up ready to go again",
      "Glutathione precursor blend",
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
    label: "1-Month Supply",
    subtitle: "Delivered monthly, cancel anytime",
    features: [
      "Free UK shipping",
      "Cancel or pause anytime",
      "20% off vs one-time",
    ],
  },
  "monthly-otp": {
    label: "Try Once",
    subtitle: "No subscription, no commitment",
    features: [
      "No strings attached",
      "Subscribe later if you love it",
    ],
  },
  "quarterly-sub": {
    label: "3-Month Supply",
    subtitle: "Biggest savings, delivered quarterly",
    badge: "Most Popular",
    savingsLabel: "Save 25%",
    features: [
      "Free UK shipping",
      "Cancel or pause anytime",
      "Biggest savings per day",
    ],
  },
};

// ============================================
// HERO IMAGES
// ============================================

/** Step 1: Static hero per cadence selection */
export const FUNNEL_CADENCE_HERO: Record<FunnelCadence, { src: string; alt: string }> = {
  "monthly-sub": {
    src: "/CONKA_41.jpg",
    alt: "CONKA monthly subscription — delivered to your door every month",
  },
  "monthly-otp": {
    src: "/CONKA_41.jpg",
    alt: "CONKA one-time purchase",
  },
  "quarterly-sub": {
    src: "/formulas/QuartelySingle.jpg",
    alt: "CONKA quarterly supply — 3 boxes delivered every 3 months",
  },
};

/** Step 2: Product-specific hero (static fallback) */
export const FUNNEL_HERO_IMAGES: Record<FunnelProduct, { src: string; alt: string }> = {
  both: {
    src: "/formulas/ConkaAmPm.jpg",
    alt: "CONKA Flow and Clear — your AM and PM brain performance system",
  },
  flow: {
    src: "/formulas/conkaFlow/FlowBox.jpg",
    alt: "CONKA Flow — morning energy and focus formula",
  },
  clear: {
    src: "/formulas/conkaClear/ClearBox.jpg",
    alt: "CONKA Clear — evening clarity and recovery formula",
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

/** Quarterly swaps the first slide to show the larger shipment */
const QUARTERLY_FIRST_SLIDE: Record<FunnelProduct, { src: string }> = {
  flow: { src: "/formulas/QuartelySingle.jpg" },
  clear: { src: "/formulas/QuartelySingle.jpg" },
  both: { src: "/formulas/QuartelyDouble.jpg" },
};

/** Get slideshow images for a product, adjusted for cadence */
export function getFunnelProductSlideshow(
  product: FunnelProduct,
  cadence: FunnelCadence,
): { src: string }[] {
  const base = FUNNEL_PRODUCT_SLIDESHOW_BASE[product];
  if (cadence === "quarterly-sub") {
    return [QUARTERLY_FIRST_SLIDE[product], ...base.slice(1)];
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

export function getUpsellOffer(
  product: FunnelProduct,
  cadence: FunnelCadence,
): UpsellOffer | null {
  const bothImage = { src: "/formulas/ConkaAmPm.jpg", alt: "CONKA Flow and Clear — AM and PM brain performance" };

  // Flow → Both (add Clear)
  if (product === "flow") {
    const upgradedCadence = cadence;
    if (!isVariantReady("both", upgradedCadence)) return null;
    const currentPrice = getOfferPricing("flow", cadence).price;
    const clearAlonePrice = getOfferPricing("clear", cadence).price;
    const upgradePrice = getOfferPricing("both", upgradedCadence).price;
    const priceDiff = upgradePrice - currentPrice;
    return {
      headline: "Add Clear to your routine?",
      body: "Flow starts your day. Clear completes it. Together they create a synergistic compounding effect that neither delivers alone.",
      acceptLabel: "Add offer and go to checkout",
      declineLabel: "no thanks",
      upgradedProduct: "both",
      upgradedCadence,
      priceDifference: priceDiff,
      compareAtUpgrade: clearAlonePrice,
      savingsAmount: clearAlonePrice - priceDiff,
      image: bothImage,
      benefits: [
        "Add CONKA Clear (PM recovery) to your order",
        `Save ${formatPrice(clearAlonePrice - priceDiff)} vs buying separately`,
        "Most customers take both for full-day coverage",
      ],
    };
  }

  // Clear → Both (add Flow)
  if (product === "clear") {
    const upgradedCadence = cadence;
    if (!isVariantReady("both", upgradedCadence)) return null;
    const currentPrice = getOfferPricing("clear", cadence).price;
    const flowAlonePrice = getOfferPricing("flow", cadence).price;
    const upgradePrice = getOfferPricing("both", upgradedCadence).price;
    const priceDiff = upgradePrice - currentPrice;
    return {
      headline: "Add Flow to your routine?",
      body: "Clear recovers your evening. Flow sharpens your morning. Together they create a synergistic compounding effect that neither delivers alone.",
      acceptLabel: "Add offer and go to checkout",
      declineLabel: "no thanks",
      upgradedProduct: "both",
      upgradedCadence,
      priceDifference: priceDiff,
      compareAtUpgrade: flowAlonePrice,
      savingsAmount: flowAlonePrice - priceDiff,
      image: bothImage,
      benefits: [
        "Add CONKA Flow (AM focus) to your order",
        `Save ${formatPrice(flowAlonePrice - priceDiff)} vs buying separately`,
        "Most customers take both for full-day coverage",
      ],
    };
  }

  // Both + OTP → Both + monthly sub
  if (product === "both" && cadence === "monthly-otp") {
    if (!isVariantReady("both", "monthly-sub")) return null;
    const currentPrice = getOfferPricing("both", "monthly-otp").price;
    const upgradePrice = getOfferPricing("both", "monthly-sub").price;
    const savings = currentPrice - upgradePrice;
    return {
      headline: "Subscribe & save every month",
      body: "Your supply arrives automatically so you never run out. No lock-in, cancel or pause anytime.",
      acceptLabel: "Subscribe and go to checkout",
      declineLabel: "no thanks",
      upgradedProduct: "both",
      upgradedCadence: "monthly-sub",
      priceDifference: upgradePrice - currentPrice,
      compareAtUpgrade: currentPrice,
      savingsAmount: savings,
      image: bothImage,
      benefits: [
        `Save ${formatPrice(savings)} every month`,
        "Cancel or pause anytime, no commitment",
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
      headline: "Go quarterly and save more",
      body: "3-month supply delivered at once. Biggest savings per shot, fewer deliveries to worry about.",
      acceptLabel: "Go quarterly and checkout",
      declineLabel: "no thanks",
      upgradedProduct: "both",
      upgradedCadence: "quarterly-sub",
      priceDifference: quarterlyPrice - monthlyTotal,
      compareAtUpgrade: monthlyTotal,
      savingsAmount: savings,
      image: bothImage,
      benefits: [
        `Save ${formatPrice(savings)} vs 3 months of monthly`,
        "Lowest price per shot across all plans",
        "Cancel or pause anytime",
      ],
    };
  }

  // Both + quarterly → no upsell
  return null;
}
