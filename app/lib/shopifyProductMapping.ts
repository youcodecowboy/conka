/**
 * Shopify Product Variant Mapping
 *
 * This file maps internal product identifiers to Shopify variant GIDs.
 *
 * HOW TO GET VARIANT IDs:
 * 1. Create products in Shopify Admin
 * 2. Go to Products > [Product] > Variants
 * 3. Click on a variant and find the ID in the URL, or use Shopify's GraphQL API
 * 4. Format: "gid://shopify/ProductVariant/XXXXXXXXXX"
 *
 * IMPORTANT: Leave as empty strings until products are created in Shopify.
 * The cart system will validate and show errors for missing variant IDs.
 */

import {
  FormulaId,
  PackSize,
  PurchaseType,
  ProtocolId,
  ProtocolTier,
  B2BTier,
} from "./productData";

// ============================================
// INDIVIDUAL FORMULA VARIANTS
// ============================================

// Formula variants support both one-time and subscription with selling plans
type FormulaVariantConfig = {
  variantId: string;
  sellingPlanId?: string; // Only needed for subscription
};

// Extended pack sizes for individual formulas (includes 8 and 28)
type FormulaPackSize = "4" | "8" | "12" | "28";

// Selling plan mapping by pack size
export const FORMULA_SELLING_PLANS: Record<FormulaPackSize, string> = {
  "4": "gid://shopify/SellingPlan/711429882230", // 4x shots weekly
  "8": "gid://shopify/SellingPlan/711429947766", // 8x shots bi-weekly (uses Pro plan)
  "12": "gid://shopify/SellingPlan/711429947766", // 12x shots bi-weekly
  "28": "gid://shopify/SellingPlan/711429980534", // 28x shots monthly
};

export const FORMULA_VARIANTS: Record<
  FormulaId,
  Record<FormulaPackSize, string>
> = {
  // CONKA Flow (Formula 01) - CONFIGURED
  "01": {
    "4": "gid://shopify/ProductVariant/57000187363702", // FLOW_TRIAL_4 - £14.99
    "8": "gid://shopify/ProductVariant/56999967785334", // FLOW_TRIAL_8 - £28.99
    "12": "gid://shopify/ProductVariant/56999967752566", // FLOW_TRIAL_12 - £39.99
    "28": "gid://shopify/ProductVariant/56999967818102", // FLOW_TRIAL_28 - £79.99
  },
  // CONKA Clear (Formula 02) - CONFIGURED
  "02": {
    "4": "gid://shopify/ProductVariant/57000418607478", // CLEAR_TRIAL_4 - £14.99
    "8": "gid://shopify/ProductVariant/57000418640246", // CLEAR_TRIAL_8 - £28.99
    "12": "gid://shopify/ProductVariant/57000418673014", // CLEAR_TRIAL_12 - £39.99
    "28": "gid://shopify/ProductVariant/57000418705782", // CLEAR_TRIAL_28 - £79.99
  },
};

// ============================================
// TRIAL PACK VARIANTS (one-time only, home page)
// These are the smaller trial packs for first-time buyers
// ============================================

type TrialPackSize = "4" | "8" | "12";

export const TRIAL_PACK_VARIANTS: Record<
  FormulaId,
  Record<TrialPackSize, string>
> = {
  // CONKA Flow Trial Packs - CONFIGURED
  "01": {
    "4": "gid://shopify/ProductVariant/57000187363702", // FLOW_TRIAL_4 - £14.99
    "8": "gid://shopify/ProductVariant/56999967785334", // FLOW_TRIAL_8 - £28.99
    "12": "gid://shopify/ProductVariant/56999967752566", // FLOW_TRIAL_12 - £39.99
  },
  // CONKA Clear Trial Packs - CONFIGURED
  "02": {
    "4": "gid://shopify/ProductVariant/57000418607478", // CLEAR_TRIAL_4 - £14.99
    "8": "gid://shopify/ProductVariant/57000418640246", // CLEAR_TRIAL_8 - £28.99
    "12": "gid://shopify/ProductVariant/57000418673014", // CLEAR_TRIAL_12 - £39.99
  },
};

// ============================================
// B2B FORMULA VARIANTS
// ============================================
// One variant per tier per formula. B2B products in Shopify (CONKA Flow/Clear – B2B).
// Subscription uses same selling plan as 28-shot monthly for now.
export const B2B_FORMULA_VARIANTS: Record<
  FormulaId,
  Record<B2BTier, { variantId: string; sellingPlanId: string }>
> = {
  "01": {
    starter: {
      variantId: "gid://shopify/ProductVariant/57172474134902", // Flow B2B Starter
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    squad: {
      variantId: "gid://shopify/ProductVariant/57172474167670", // Flow B2B Squad
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    elite: {
      variantId: "gid://shopify/ProductVariant/57172474200438", // Flow B2B Elite
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
  },
  "02": {
    starter: {
      variantId: "gid://shopify/ProductVariant/57172529774966", // Clear B2B Starter
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    squad: {
      variantId: "gid://shopify/ProductVariant/57172529807734", // Clear B2B Squad
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    elite: {
      variantId: "gid://shopify/ProductVariant/57172529840502", // Clear B2B Elite
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
  },
};

// ============================================
// B2B PROTOCOL VARIANTS
// ============================================
// One variant per tier per protocol (Resilience, Precision, Balance, Ultimate – B2B).
// Subscription uses same selling plan as 28-shot monthly. Ultimate = 2 boxes per unit for tier count.
export const B2B_PROTOCOL_VARIANTS: Record<
  ProtocolId,
  Record<B2BTier, { variantId: string; sellingPlanId: string }>
> = {
  "1": {
    starter: {
      variantId: "gid://shopify/ProductVariant/57172721598838", // Resilience B2B Starter
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    squad: {
      variantId: "gid://shopify/ProductVariant/57172721631606", // Resilience B2B Squad
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    elite: {
      variantId: "gid://shopify/ProductVariant/57172721664374", // Resilience B2B Elite
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
  },
  "2": {
    starter: {
      variantId: "gid://shopify/ProductVariant/57172828389750", // Precision B2B Starter
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    squad: {
      variantId: "gid://shopify/ProductVariant/57172828422518", // Precision B2B Squad
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    elite: {
      variantId: "gid://shopify/ProductVariant/57172828455286", // Precision B2B Elite
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
  },
  "3": {
    starter: {
      variantId: "gid://shopify/ProductVariant/57172753056118", // Balance B2B Starter
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    squad: {
      variantId: "gid://shopify/ProductVariant/57172753088886", // Balance B2B Squad
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    elite: {
      variantId: "gid://shopify/ProductVariant/57172753121654", // Balance B2B Elite
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
  },
  "4": {
    starter: {
      variantId: "gid://shopify/ProductVariant/57172801126774", // Ultimate B2B Starter
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    squad: {
      variantId: "gid://shopify/ProductVariant/57172801159542", // Ultimate B2B Squad
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
    elite: {
      variantId: "gid://shopify/ProductVariant/57172885111158", // Ultimate B2B Elite
      sellingPlanId: "gid://shopify/SellingPlan/711429980534",
    },
  },
};

// ============================================
// PROTOCOL VARIANTS
// ============================================

// Protocol variants now include both the variant ID and the selling plan ID for subscriptions
type ProtocolTierVariant = {
  variantId: string;
  sellingPlanId: string; // Used for subscription purchases
};

type ProtocolTierVariants = Partial<Record<ProtocolTier, ProtocolTierVariant>>;

export const PROTOCOL_VARIANTS: Record<ProtocolId, ProtocolTierVariants> = {
  // Protocol 1 (Resilience) - CONFIGURED
  "1": {
    starter: {
      variantId: "gid://shopify/ProductVariant/56999240597878", // RESILIANCE_STARTER_4 - £14.99
      sellingPlanId: "gid://shopify/SellingPlan/711429882230", // 20% discount - £11.99
    },
    pro: {
      variantId: "gid://shopify/ProductVariant/56999240630646", // RESILIANCE_PRO_12 - £39.99
      sellingPlanId: "gid://shopify/SellingPlan/711429947766", // 20% discount - £31.99
    },
    max: {
      variantId: "gid://shopify/ProductVariant/56999240663414", // RESILIANCE_MAX_28 - £79.99
      sellingPlanId: "gid://shopify/SellingPlan/711429980534", // 20% discount - £63.99
    },
  },
  // Protocol 2 (Precision) - CONFIGURED
  "2": {
    starter: {
      variantId: "gid://shopify/ProductVariant/56999234503030", // PRECISION_STARTER_4 - £14.99
      sellingPlanId: "gid://shopify/SellingPlan/711429882230", // 20% discount - £11.99
    },
    pro: {
      variantId: "gid://shopify/ProductVariant/56999234535798", // PRECISION_PRO_12 - £39.99
      sellingPlanId: "gid://shopify/SellingPlan/711429947766", // 20% discount - £31.99
    },
    max: {
      variantId: "gid://shopify/ProductVariant/56999234568566", // PRECISION_MAX_28 - £79.99
      sellingPlanId: "gid://shopify/SellingPlan/711429980534", // 20% discount - £63.99
    },
  },
  // Protocol 3 (Balance) - CONFIGURED
  "3": {
    starter: {
      variantId: "gid://shopify/ProductVariant/56998884573558", // BALANCED_STARTER_4 - £14.99
      sellingPlanId: "gid://shopify/SellingPlan/711429882230", // 20% discount - £11.99
    },
    pro: {
      variantId: "gid://shopify/ProductVariant/56998884606326", // BALANCED_PRO_12 - £39.99
      sellingPlanId: "gid://shopify/SellingPlan/711429947766", // 20% discount - £31.99
    },
    max: {
      variantId: "gid://shopify/ProductVariant/56998884639094", // BALANCED_MAX_28 - £79.99
      sellingPlanId: "gid://shopify/SellingPlan/711429980534", // 20% discount - £63.99
    },
  },
  // Protocol 4 (Ultimate) - CONFIGURED - no starter tier
  "4": {
    pro: {
      variantId: "gid://shopify/ProductVariant/56999249478006", // ULTAMATE_PRO_28 - £79.99
      sellingPlanId: "gid://shopify/SellingPlan/711429947766", // 20% discount - £63.99
    },
    max: {
      variantId: "gid://shopify/ProductVariant/56999249510774", // ULTAMATE_MAX_56 - £144.99
      sellingPlanId: "gid://shopify/SellingPlan/711429980534", // 20% discount - £115.99
    },
  },
};

// Subscription discount percentage (for visual display)
export const SUBSCRIPTION_DISCOUNT_PERCENT = 20;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get the Shopify variant ID for an individual formula
 * For subscriptions, also returns the selling plan ID
 */
export function getFormulaVariantId(
  formulaId: FormulaId,
  packSize: PackSize,
  purchaseType: PurchaseType,
): { variantId: string; sellingPlanId?: string } | null {
  // Cast packSize to FormulaPackSize (formulas support 4, 8, 12, 28)
  const variantId =
    FORMULA_VARIANTS[formulaId]?.[
      packSize as keyof (typeof FORMULA_VARIANTS)["01"]
    ];
  if (!variantId) return null;

  if (purchaseType === "subscription") {
    const sellingPlanId =
      FORMULA_SELLING_PLANS[packSize as keyof typeof FORMULA_SELLING_PLANS];
    return { variantId, sellingPlanId };
  }

  return { variantId };
}

/**
 * Get the Shopify variant ID for a trial pack
 */
export function getTrialPackVariantId(
  formulaId: FormulaId,
  packSize: TrialPackSize,
): string | null {
  const variantId = TRIAL_PACK_VARIANTS[formulaId]?.[packSize];
  return variantId || null;
}

/**
 * Get the Shopify variant ID for a protocol
 * For one-time purchases, only returns variantId
 * For subscriptions, returns both variantId and sellingPlanId
 */
export function getProtocolVariantId(
  protocolId: ProtocolId,
  tier: ProtocolTier,
  purchaseType: PurchaseType,
): { variantId: string; sellingPlanId?: string } | null {
  const tierVariant = PROTOCOL_VARIANTS[protocolId]?.[tier];
  if (!tierVariant || !tierVariant.variantId) return null;

  if (purchaseType === "subscription") {
    return {
      variantId: tierVariant.variantId,
      sellingPlanId: tierVariant.sellingPlanId || undefined,
    };
  }

  // One-time purchase - no selling plan
  return { variantId: tierVariant.variantId };
}

/**
 * Get the Shopify variant ID for a B2B formula by tier and purchase type.
 */
export function getB2BFormulaVariantId(
  formulaId: FormulaId,
  tier: B2BTier,
  purchaseType: PurchaseType,
): { variantId: string; sellingPlanId?: string } | null {
  const tierVariant = B2B_FORMULA_VARIANTS[formulaId]?.[tier];
  if (!tierVariant?.variantId) return null;
  if (purchaseType === "subscription") {
    return {
      variantId: tierVariant.variantId,
      sellingPlanId: tierVariant.sellingPlanId,
    };
  }
  return { variantId: tierVariant.variantId };
}

/**
 * Get the Shopify variant ID for a B2B protocol by tier and purchase type.
 * Protocol 4 (Ultimate) = 2 boxes per unit for tier count.
 */
export function getB2BProtocolVariantId(
  protocolId: ProtocolId,
  tier: B2BTier,
  purchaseType: PurchaseType,
): { variantId: string; sellingPlanId?: string } | null {
  const tierVariant = B2B_PROTOCOL_VARIANTS[protocolId]?.[tier];
  if (!tierVariant?.variantId) return null;
  if (purchaseType === "subscription") {
    return {
      variantId: tierVariant.variantId,
      sellingPlanId: tierVariant.sellingPlanId,
    };
  }
  return { variantId: tierVariant.variantId };
}

/**
 * Check if a variant ID is configured (not empty)
 */
export function isVariantConfigured(variantId: string | null): boolean {
  return variantId !== null && variantId !== "";
}

/**
 * Validate that all required variant IDs are configured
 * Useful for debugging during setup
 */
export function getUnconfiguredVariants(): string[] {
  const unconfigured: string[] = [];

  // Check formulas
  for (const formulaId of ["01", "02"] as FormulaId[]) {
    for (const packSize of ["4", "8", "12", "28"] as PackSize[]) {
      for (const purchaseType of [
        "subscription",
        "one-time",
      ] as PurchaseType[]) {
        const variantData = getFormulaVariantId(
          formulaId,
          packSize,
          purchaseType,
        );
        if (!isVariantConfigured(variantData?.variantId || null)) {
          unconfigured.push(
            `Formula ${formulaId} - ${packSize}-pack - ${purchaseType}`,
          );
        }
      }
    }
  }

  // Check trial packs
  for (const formulaId of ["01", "02"] as FormulaId[]) {
    for (const packSize of ["4", "8", "12"] as TrialPackSize[]) {
      const variantId = getTrialPackVariantId(formulaId, packSize);
      if (!isVariantConfigured(variantId)) {
        unconfigured.push(`Trial Pack ${formulaId} - ${packSize}-pack`);
      }
    }
  }

  // Check protocols
  for (const protocolId of ["1", "2", "3", "4"] as ProtocolId[]) {
    const tiers =
      protocolId === "4"
        ? (["pro", "max"] as ProtocolTier[])
        : (["starter", "pro", "max"] as ProtocolTier[]);

    for (const tier of tiers) {
      for (const purchaseType of [
        "subscription",
        "one-time",
      ] as PurchaseType[]) {
        const variantData = getProtocolVariantId(
          protocolId,
          tier,
          purchaseType,
        );
        if (!isVariantConfigured(variantData?.variantId || null)) {
          unconfigured.push(
            `Protocol ${protocolId} - ${tier} - ${purchaseType}`,
          );
        }
      }
    }
  }

  return unconfigured;
}
