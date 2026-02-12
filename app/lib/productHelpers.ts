/**
 * Product helper functions and calendar generator.
 */

import type { PackSize, PurchaseType, ProtocolId, ProtocolTier, B2BTier, FormulaId } from "./productTypes";
import {
  formulaPricing,
  protocolPricing,
  b2bFormulaPricing,
  B2B_TIER_BANDS,
  VAT_RATE,
} from "./productPricing";
import { protocolContent } from "./protocolContent";

export function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

export function getFormulaPricing(
  packSize: PackSize,
  purchaseType: PurchaseType,
) {
  return formulaPricing[purchaseType][packSize];
}

export function getProtocolPricing(
  protocolId: ProtocolId,
  tier: ProtocolTier,
  purchaseType: PurchaseType,
) {
  const pricingType = protocolId === "4" ? "ultimate" : "standard";
  const tierPricing = protocolPricing[pricingType][purchaseType];

  if (tier in tierPricing) {
    return tierPricing[tier as keyof typeof tierPricing];
  }
  return null;
}

export function getBillingLabel(billing: string): string {
  switch (billing) {
    case "weekly":
      return "billed weekly";
    case "bi-weekly":
      return "billed bi-weekly";
    case "monthly":
      return "billed monthly";
    default:
      return billing;
  }
}

/** B2B: tier from quantity. Starter 1–10, Squad 11–25, Elite 26+. */
export function getB2BTier(quantity: number): B2BTier {
  if (quantity >= B2B_TIER_BANDS.elite.min) return "elite";
  if (quantity >= B2B_TIER_BANDS.squad.min) return "squad";
  return "starter";
}

/** B2B: pricing for a tier and purchase type. Same price for both formulas. */
export function getB2BFormulaPricing(
  _formulaId: FormulaId,
  tier: B2BTier,
  purchaseType: PurchaseType,
) {
  return b2bFormulaPricing[purchaseType][tier];
}

/** B2B: protocol pricing uses same tier grid as formulas (Starter/Squad/Elite). */
export function getB2BProtocolPricing(
  _protocolId: ProtocolId,
  tier: B2BTier,
  purchaseType: PurchaseType,
) {
  return b2bFormulaPricing[purchaseType][tier];
}

/** Format price including VAT for B2B display. */
export function formatPriceWithVAT(priceExVAT: number): string {
  return `£${(priceExVAT * VAT_RATE).toFixed(2)}`;
}

/** B2B: info for "next tier" message (boxes needed, tier name, and that tier's per-box price ex VAT), or null if at max tier. Uses subscription (best) price for display. */
export function getB2BNextTierInfo(quantity: number): { boxesToNext: number; tierName: string; pricePerBoxExVat: number } | null {
  if (quantity >= B2B_TIER_BANDS.elite.min) return null;
  if (quantity >= B2B_TIER_BANDS.squad.min) {
    const boxesToNext = B2B_TIER_BANDS.elite.min - quantity;
    return { boxesToNext, tierName: "Elite", pricePerBoxExVat: b2bFormulaPricing.subscription.elite.price };
  }
  const boxesToNext = B2B_TIER_BANDS.squad.min - quantity;
  return { boxesToNext, tierName: "Squad", pricePerBoxExVat: b2bFormulaPricing.subscription.squad.price };
}

// Generate calendar days for protocol visualization
export function generateProtocolCalendarDays(
  protocolId: ProtocolId,
  tier: ProtocolTier,
): Array<{ day: number; formula: "01" | "02" | "rest" | "both" }> {
  const protocol = protocolContent[protocolId];
  const tierConfig = protocol.tiers[tier];

  if (!tierConfig) return [];

  const days: Array<{ day: number; formula: "01" | "02" | "rest" | "both" }> = [];

  // Generate 4 weeks (28 days)
  for (let week = 0; week < 4; week++) {
    for (let day = 0; day < 7; day++) {
      const dayNum = week * 7 + day + 1;

      if (protocolId === "4") {
        // Ultimate: Pro = 6+6 (6 days both, 1 rest e.g. Sunday); Max = 7+7 (both every day)
        if (tier === "pro") {
          days.push({ day: dayNum, formula: day === 6 ? "rest" : "both" }); // Sunday = rest
        } else {
          days.push({ day: dayNum, formula: "both" });
        }
      } else if (protocolId === "3") {
        // Balanced: Alternating pattern
        const { conkaFlowCount, conkaClarityCount } = tierConfig;
        const totalDoses = conkaFlowCount + conkaClarityCount;

        if (tier === "starter") {
          // 2+2: Mon=01, Tue=02, Thu=01, Sat=02
          if (day === 0 || day === 3) days.push({ day: dayNum, formula: "01" });
          else if (day === 1 || day === 5)
            days.push({ day: dayNum, formula: "02" });
          else days.push({ day: dayNum, formula: "rest" });
        } else if (tier === "pro") {
          // 3+3: Mon/Wed/Fri=01, Tue/Thu/Sat=02
          if (day === 0 || day === 2 || day === 4)
            days.push({ day: dayNum, formula: "01" });
          else if (day === 1 || day === 3 || day === 5)
            days.push({ day: dayNum, formula: "02" });
          else days.push({ day: dayNum, formula: "rest" });
        } else {
          // 4+3: Mon/Wed/Fri/Sun=01, Tue/Thu/Sat=02
          if (day === 0 || day === 2 || day === 4 || day === 6)
            days.push({ day: dayNum, formula: "01" });
          else days.push({ day: dayNum, formula: "02" });
        }
      } else {
        // Protocol 1 or 2: Primary formula most days, secondary once weekly
        const isPrimaryConkaFlow = protocolId === "1";
        const { conkaFlowCount, conkaClarityCount } = tierConfig;

        if (tier === "starter") {
          // 3+1: Mon/Wed/Fri primary, Sun secondary
          if (day === 0 || day === 2 || day === 4) {
            days.push({
              day: dayNum,
              formula: isPrimaryConkaFlow ? "01" : "02",
            });
          } else if (day === 6) {
            days.push({
              day: dayNum,
              formula: isPrimaryConkaFlow ? "02" : "01",
            });
          } else {
            days.push({ day: dayNum, formula: "rest" });
          }
        } else if (tier === "pro") {
          // 5+1: Mon-Fri primary, Sun secondary
          if (day >= 0 && day <= 4) {
            days.push({
              day: dayNum,
              formula: isPrimaryConkaFlow ? "01" : "02",
            });
          } else if (day === 6) {
            days.push({
              day: dayNum,
              formula: isPrimaryConkaFlow ? "02" : "01",
            });
          } else {
            days.push({ day: dayNum, formula: "rest" });
          }
        } else {
          // 6+1: Mon-Sat primary, Sun secondary
          if (day >= 0 && day <= 5) {
            days.push({
              day: dayNum,
              formula: isPrimaryConkaFlow ? "01" : "02",
            });
          } else {
            days.push({
              day: dayNum,
              formula: isPrimaryConkaFlow ? "02" : "01",
            });
          }
        }
      }
    }
  }

  return days;
}
