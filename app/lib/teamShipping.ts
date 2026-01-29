/**
 * B2B tiered shipping – TEMPORARY.
 * Bands and amounts are placeholders until distributor confirms.
 * Update getB2BShippingEstimate and B2B_SHIPPING_BANDS when finalised.
 */

export interface B2BShippingEstimate {
  amount: number;
  label?: string;
}

// Placeholder bands by total boxes (Flow + Clear combined). Replace with real values.
const B2B_SHIPPING_BANDS: { minBoxes: number; maxBoxes: number; amount: number; label: string }[] = [
  { minBoxes: 1, maxBoxes: 10, amount: 5, label: "Standard" },
  { minBoxes: 11, maxBoxes: 25, amount: 8, label: "Medium order" },
  { minBoxes: 26, maxBoxes: Infinity, amount: 12, label: "Large order" },
];

/**
 * Get estimated shipping for B2B orders by total box count.
 * Values are temporary; final shipping calculated at checkout.
 */
export function getB2BShippingEstimate(totalBoxes: number): B2BShippingEstimate | null {
  if (totalBoxes <= 0) return null;
  const band = B2B_SHIPPING_BANDS.find(
    (b) => totalBoxes >= b.minBoxes && totalBoxes <= b.maxBoxes
  );
  if (!band) return null;
  return { amount: band.amount, label: band.label };
}
