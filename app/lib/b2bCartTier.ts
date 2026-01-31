/**
 * B2B cart-tier: one tier (Starter/Squad/Elite) for all B2B lines from total B2B boxes.
 * Ultimate protocol = 2 boxes per unit; all others = 1.
 */

import type { CartLine } from "./shopify";
import { B2B_FORMULA_VARIANTS, B2B_PROTOCOL_VARIANTS } from "./shopifyProductMapping";
import type { B2BTier, FormulaId, ProtocolId } from "./productData";
import { getB2BTier } from "./productData";

type B2BProductType = "formula" | "protocol";

interface B2BVariantMeta {
  productType: B2BProductType;
  productId: FormulaId | ProtocolId;
  boxesPerUnit: number;
}

const B2B_VARIANT_META = new Map<string, B2BVariantMeta>();

function buildB2BMap(): void {
  if (B2B_VARIANT_META.size > 0) return;
  for (const formulaId of ["01", "02"] as FormulaId[]) {
    for (const tier of ["starter", "squad", "elite"] as B2BTier[]) {
      const v = B2B_FORMULA_VARIANTS[formulaId]?.[tier];
      if (v?.variantId)
        B2B_VARIANT_META.set(v.variantId, {
          productType: "formula",
          productId: formulaId,
          boxesPerUnit: 1,
        });
    }
  }
  for (const protocolId of ["1", "2", "3", "4"] as ProtocolId[]) {
    for (const tier of ["starter", "squad", "elite"] as B2BTier[]) {
      const v = B2B_PROTOCOL_VARIANTS[protocolId]?.[tier];
      if (v?.variantId)
        B2B_VARIANT_META.set(v.variantId, {
          productType: "protocol",
          productId: protocolId,
          boxesPerUnit: protocolId === "4" ? 2 : 1,
        });
    }
  }
}

buildB2BMap();

/** True if this cart line is a B2B product (formula or protocol). */
export function isB2BLine(line: CartLine): boolean {
  return B2B_VARIANT_META.has(line.merchandise.id);
}

/** True if the cart contains any B2B lines. */
export function cartHasB2BLines(lines: CartLine[]): boolean {
  return lines.some(isB2BLine);
}

/** Sum of line totals (inc-VAT) for B2B lines only. Use for cart VAT breakdown. */
export function getB2BLinesTotalIncVat(lines: CartLine[]): number {
  let total = 0;
  for (const line of lines) {
    if (!isB2BLine(line)) continue;
    const amount = line.cost?.totalAmount?.amount
      ? parseFloat(line.cost.totalAmount.amount)
      : line.quantity * parseFloat(line.merchandise.price.amount);
    total += amount;
  }
  return total;
}

export function getB2BTotalBoxes(
  lines: CartLine[],
  pending?: Array<{ variantId: string; quantity: number }>
): number {
  let total = 0;
  for (const line of lines) {
    const meta = B2B_VARIANT_META.get(line.merchandise.id);
    if (meta) total += line.quantity * meta.boxesPerUnit;
  }
  if (pending) {
    for (const p of pending) {
      const meta = B2B_VARIANT_META.get(p.variantId);
      if (meta) total += p.quantity * meta.boxesPerUnit;
    }
  }
  return total;
}

/** Pending boxes for an add: formula = 1 per unit, protocol 4 (Ultimate) = 2 per unit, others = 1. */
export function getB2BPendingBoxes(
  productType: "formula" | "protocol",
  productId: string,
  quantity: number
): number {
  const boxesPerUnit = productType === "protocol" && productId === "4" ? 2 : 1;
  return quantity * boxesPerUnit;
}

export interface B2BLineUpdate {
  lineId: string;
  merchandiseId: string;
  sellingPlanId?: string;
}

export interface B2BCartTierResult {
  totalBoxes: number;
  tier: B2BTier;
  updates: B2BLineUpdate[];
}

export function getB2BCartTierUpdates(lines: CartLine[]): B2BCartTierResult {
  const totalBoxes = getB2BTotalBoxes(lines);
  const tier = getB2BTier(totalBoxes);
  const updates: B2BLineUpdate[] = [];

  if (totalBoxes === 0) return { totalBoxes: 0, tier: "starter", updates: [] };

  for (const line of lines) {
    const meta = B2B_VARIANT_META.get(line.merchandise.id);
    if (!meta) continue;

    const isSubscription = !!line.sellingPlanAllocation?.sellingPlan?.id;
    const target =
      meta.productType === "formula"
        ? B2B_FORMULA_VARIANTS[meta.productId as FormulaId]?.[tier]
        : B2B_PROTOCOL_VARIANTS[meta.productId as ProtocolId]?.[tier];

    if (!target?.variantId) continue;
    if (line.merchandise.id === target.variantId) {
      const currentPlanId = line.sellingPlanAllocation?.sellingPlan?.id;
      const needPlan = isSubscription ? target.sellingPlanId : undefined;
      if (currentPlanId === needPlan) continue;
    }

    updates.push({
      lineId: line.id,
      merchandiseId: target.variantId,
      sellingPlanId: isSubscription ? target.sellingPlanId : undefined,
    });
  }

  return { totalBoxes, tier, updates };
}
