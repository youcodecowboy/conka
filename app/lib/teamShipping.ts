/**
 * B2B shipping: £1.30 per box.
 * Final shipping is calculated at Shopify checkout (weight-based: 1 box = 1 kg, £1.30 per kg).
 * This estimate matches that so the app can show "Shipping (est.): £X.XX".
 */

export interface B2BShippingEstimate {
  amount: number;
  label?: string;
}

const B2B_SHIPPING_PER_BOX = 1.3;

/**
 * Get estimated shipping for B2B orders by total box count.
 * £1.30 per box; final amount calculated at checkout.
 */
export function getB2BShippingEstimate(totalBoxes: number): B2BShippingEstimate | null {
  if (totalBoxes <= 0) return null;
  const amount = Math.round(totalBoxes * B2B_SHIPPING_PER_BOX * 100) / 100;
  return { amount, label: "Est." };
}
