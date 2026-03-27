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
  /** Price difference to show (e.g. "for just £X more") */
  priceDifference?: number;
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
    src: "/CONKA_46.jpg",
    alt: "CONKA quarterly supply — 3 months of brain performance",
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
export const FUNNEL_PRODUCT_SLIDESHOW: Record<FunnelProduct, { src: string }[]> = {
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
  // "Both" uses the Balance protocol hero images (box + Flow/Clear details)
  both: [
    { src: "/protocols/BalanceBox.jpg" },
    { src: "/formulas/conkaFlow/FlowIngredients.jpg" },
    { src: "/formulas/conkaClear/ClearIngredients.jpg" },
    { src: "/formulas/conkaFlow/FlowStats.jpg" },
    { src: "/formulas/conkaClear/ClearStats.jpg" },
    { src: "/formulas/conkaFlow/FlowReviews.jpg" },
    { src: "/formulas/conkaClear/ClearReviews.jpg" },
  ],
};

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
  // Flow → Both
  if (product === "flow") {
    const upgradedCadence = cadence;
    if (!isVariantReady("both", upgradedCadence)) return null;
    const currentPrice = getOfferPricing("flow", cadence).price;
    const upgradePrice = getOfferPricing("both", upgradedCadence).price;
    return {
      headline: "Add Clear to your routine?",
      body: "Most customers take both. Flow in the morning, Clear in the evening. Together they create a synergistic compounding effect.",
      acceptLabel: `Yes, get Both for ${formatPrice(upgradePrice)}`,
      declineLabel: "No thanks, continue",
      upgradedProduct: "both",
      upgradedCadence,
      priceDifference: upgradePrice - currentPrice,
    };
  }

  // Clear → Both
  if (product === "clear") {
    const upgradedCadence = cadence;
    if (!isVariantReady("both", upgradedCadence)) return null;
    const currentPrice = getOfferPricing("clear", cadence).price;
    const upgradePrice = getOfferPricing("both", upgradedCadence).price;
    return {
      headline: "Add Flow to your routine?",
      body: "Most customers take both. Flow in the morning, Clear in the evening. Together they create a synergistic compounding effect.",
      acceptLabel: `Yes, get Both for ${formatPrice(upgradePrice)}`,
      declineLabel: "No thanks, continue",
      upgradedProduct: "both",
      upgradedCadence,
      priceDifference: upgradePrice - currentPrice,
    };
  }

  // Both + OTP → Both + monthly sub
  if (product === "both" && cadence === "monthly-otp") {
    if (!isVariantReady("both", "monthly-sub")) return null;
    const currentPrice = getOfferPricing("both", "monthly-otp").price;
    const upgradePrice = getOfferPricing("both", "monthly-sub").price;
    return {
      headline: "Subscribe & save 20%?",
      body: `Save ${formatPrice(currentPrice - upgradePrice)} every month. Cancel or pause anytime, no commitment.`,
      acceptLabel: `Yes, subscribe for ${formatPrice(upgradePrice)}/mo`,
      declineLabel: "No thanks, continue",
      upgradedProduct: "both",
      upgradedCadence: "monthly-sub",
      priceDifference: upgradePrice - currentPrice,
    };
  }

  // Both + monthly sub → Both + quarterly
  if (product === "both" && cadence === "monthly-sub") {
    if (!isVariantReady("both", "quarterly-sub")) return null;
    const monthlyTotal = getOfferPricing("both", "monthly-sub").price * 3;
    const quarterlyPrice = getOfferPricing("both", "quarterly-sub").price;
    return {
      headline: "Go quarterly and save more?",
      body: `Save ${formatPrice(monthlyTotal - quarterlyPrice)} vs monthly. 3-month supply delivered at once.`,
      acceptLabel: `Yes, go quarterly for ${formatPrice(quarterlyPrice)}`,
      declineLabel: "No thanks, continue",
      upgradedProduct: "both",
      upgradedCadence: "quarterly-sub",
      priceDifference: quarterlyPrice - monthlyTotal,
    };
  }

  // Both + quarterly → no upsell
  return null;
}
