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
// TODO: Replace with real pricing once COGS analysis is complete.

const FUNNEL_PRICING: Record<FunnelProduct, Record<FunnelCadence, FunnelPricing>> = {
  both: {
    "monthly-sub": {
      price: 111.99,
      perShot: 2.0,
      shotCount: 56,
      compareAtPrice: 139.99,
    },
    "monthly-otp": {
      price: 139.99,
      perShot: 2.5,
      shotCount: 56,
    },
    "quarterly-sub": {
      price: 299.99,
      perShot: 1.79,
      shotCount: 168,
      compareAtPrice: 419.97,
    },
  },
  flow: {
    "monthly-sub": {
      price: 63.99,
      perShot: 2.29,
      shotCount: 28,
      compareAtPrice: 79.99,
    },
    "monthly-otp": {
      price: 79.99,
      perShot: 2.86,
      shotCount: 28,
    },
    "quarterly-sub": {
      price: 171.99,
      perShot: 2.05,
      shotCount: 84,
      compareAtPrice: 239.97,
    },
  },
  clear: {
    "monthly-sub": {
      price: 63.99,
      perShot: 2.29,
      shotCount: 28,
      compareAtPrice: 79.99,
    },
    "monthly-otp": {
      price: 79.99,
      perShot: 2.86,
      shotCount: 28,
    },
    "quarterly-sub": {
      price: 171.99,
      perShot: 2.05,
      shotCount: 84,
      compareAtPrice: 239.97,
    },
  },
};

// ============================================
// VARIANT MAPPING (Shopify GIDs)
// ============================================
// Empty strings = not yet created in Shopify Admin.

const FUNNEL_VARIANTS: Record<FunnelProduct, Record<FunnelCadence, FunnelVariantConfig>> = {
  flow: {
    "monthly-sub": {
      variantId: "gid://shopify/ProductVariant/56999967818102",
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    "monthly-otp": {
      variantId: "gid://shopify/ProductVariant/56999967818102",
    },
    "quarterly-sub": { variantId: "", sellingPlanId: "" },
  },
  clear: {
    "monthly-sub": {
      variantId: "gid://shopify/ProductVariant/57000418705782",
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    "monthly-otp": {
      variantId: "gid://shopify/ProductVariant/57000418705782",
    },
    "quarterly-sub": { variantId: "", sellingPlanId: "" },
  },
  both: {
    "monthly-sub": { variantId: "", sellingPlanId: "" },
    "monthly-otp": { variantId: "" },
    "quarterly-sub": { variantId: "", sellingPlanId: "" },
  },
};

// ============================================
// DISPLAY DATA
// ============================================

export interface FunnelProductDisplay {
  name: string;
  label: string;
  shotCount: number;
  description: string;
  image: string;
  badge?: string;
  features: string[];
}

export const FUNNEL_PRODUCTS: Record<FunnelProduct, FunnelProductDisplay> = {
  both: {
    name: "Both",
    label: "Flow + Clear",
    shotCount: 56,
    description: "AM energy + PM clarity — the complete daily system",
    image: "/formulas/BothShots.jpg",
    badge: "Most Popular",
    features: [
      "2 boxes (56 shots)",
      "Synergistic AM + PM formula",
      "Best value per shot",
    ],
  },
  flow: {
    name: "Flow",
    label: "CONKA Flow",
    shotCount: 28,
    description: "Morning energy & focus",
    image: "/formulas/conkaFlow/FlowNoBackground.png",
    features: [
      "1 box (28 shots)",
      "AMPK activation for energy",
      "Take in the morning",
    ],
  },
  clear: {
    name: "Clear",
    label: "CONKA Clear",
    shotCount: 28,
    description: "Evening clarity & recovery",
    image: "/formulas/conkaClear/ClearNoBackground.png",
    features: [
      "1 box (28 shots)",
      "Glutathione precursors for recovery",
      "Take in the evening",
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
    label: "Subscribe & Save",
    subtitle: "Billed monthly, delivered to your door",
    badge: "Most Popular",
    savingsLabel: "Save 20%",
    features: [
      "Free UK shipping",
      "Cancel or pause anytime",
      "20% off every order",
    ],
  },
  "monthly-otp": {
    label: "One-Time Purchase",
    subtitle: "Single order, no commitment",
    features: [
      "Try once, no strings attached",
      "Subscribe later if you love it",
    ],
  },
  "quarterly-sub": {
    label: "Quarterly",
    subtitle: "3-month supply, biggest savings",
    badge: "Best Value",
    savingsLabel: "Save 25%",
    features: [
      "Free UK shipping",
      "Cancel or pause anytime",
      "Biggest savings per shot",
    ],
  },
};

// ============================================
// HERO IMAGES (swap per product selection)
// ============================================

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

/** Format the CTA button text based on cadence and price */
export function getCTAText(
  cadence: FunnelCadence,
  price: number,
): string {
  const formatted = formatPrice(price);
  switch (cadence) {
    case "monthly-sub":
      return `Subscribe & Save — ${formatted}/mo`;
    case "monthly-otp":
      return `Buy Now — ${formatted}`;
    case "quarterly-sub":
      return `Subscribe & Save — ${formatted}/quarter`;
  }
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
      body: "Most customers take both — Flow in the morning, Clear in the evening. Together they create a synergistic compounding effect.",
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
      body: "Most customers take both — Flow in the morning, Clear in the evening. Together they create a synergistic compounding effect.",
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
      body: `Save ${formatPrice(currentPrice - upgradePrice)} every month. Cancel or pause anytime — no commitment.`,
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
