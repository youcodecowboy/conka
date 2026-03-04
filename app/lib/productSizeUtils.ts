/**
 * Single source of truth for size-to-tier-key mapping.
 * Previously duplicated between MultiLineEditModal.tsx and pause/route.ts.
 */

export type TierKey = 'starter' | 'pro_8' | 'pro' | 'max';

/**
 * Maps product + pack size to Loop tier key.
 * Ultimate (productKey='4') only has pro(28) and max(56).
 */
export function sizeToTierKey(productKey: string, size: number): TierKey {
  if (productKey === '4') return size >= 56 ? 'max' : 'pro';
  if (size <= 4)  return 'starter';
  if (size <= 8)  return 'pro_8';
  if (size <= 12) return 'pro';
  return 'max';
}

/**
 * Infer pack size from variant title string or quantity,
 * snapping to valid sizes for the product.
 */
export function inferPackSize(
  variantTitle: string,
  quantity: number,
  productKey: string,
): number {
  const v = (variantTitle || '').toLowerCase();
  for (const s of [56, 28, 12, 8, 4]) {
    if (v.includes(String(s))) return s;
  }
  const sizes = productKey === '4' ? [28, 56] : [4, 8, 12, 28];
  return sizes.reduce((prev, curr) =>
    Math.abs(curr - quantity) < Math.abs(prev - quantity) ? curr : prev,
  );
}
