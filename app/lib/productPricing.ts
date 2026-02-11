/**
 * All pricing data and VAT/B2B constants.
 */

import type { PurchaseType, B2BTier } from "./productTypes";

// ===== PRICING =====
// Base prices match Shopify. Subscription = 20% off base price.

// Individual Formula Pricing (matches Shopify)
export const formulaPricing = {
  // One-time = base price (no discount)
  "one-time": {
    "4": { price: 14.99, perShot: 3.75 },
    "8": { price: 28.99, perShot: 3.62 },
    "12": { price: 39.99, perShot: 3.33 },
    "28": { price: 79.99, perShot: 2.86 },
  },
  // Subscription = 20% off base price
  subscription: {
    "4": { price: 11.99, billing: "weekly", perShot: 3.0, basePrice: 14.99 },
    "8": { price: 23.19, billing: "bi-weekly", perShot: 2.9, basePrice: 28.99 },
    "12": {
      price: 31.99,
      billing: "bi-weekly",
      perShot: 2.67,
      basePrice: 39.99,
    },
    "28": { price: 63.99, billing: "monthly", perShot: 2.29, basePrice: 79.99 },
  },
} as const;

// Protocol Pricing (per tier)
// Base prices match Shopify. Subscription = 20% off base price.
export const protocolPricing = {
  // Protocols 1, 2, 3 - all three tiers available
  standard: {
    // One-time = base price (no discount)
    "one-time": {
      starter: { price: 14.99 },
      pro: { price: 39.99 },
      max: { price: 79.99 },
    },
    // Subscription = 20% off base price
    subscription: {
      starter: { price: 11.99, billing: "weekly", basePrice: 14.99 },
      pro: { price: 31.99, billing: "bi-weekly", basePrice: 39.99 },
      max: { price: 63.99, billing: "monthly", basePrice: 79.99 },
    },
  },
  // Protocol 4 (Ultimate) - only pro and max available
  ultimate: {
    "one-time": {
      pro: { price: 79.99 },
      max: { price: 144.99 },
    },
    subscription: {
      pro: { price: 63.99, billing: "bi-weekly", basePrice: 79.99 },
      max: { price: 115.99, billing: "monthly", basePrice: 144.99 },
    },
  },
} as const;

// ===== B2B PRICING =====
// Tier bands: Starter 1–10, Squad 11–25, Elite 26+

export const VAT_RATE = 1.2;

/** Convert inc-VAT amount to ex-VAT (e.g. for display or breakdown). */
export function incVatToExVat(amountIncVat: number): number {
  return amountIncVat / VAT_RATE;
}

/** VAT portion from an inc-VAT amount (20% of ex-VAT). */
export function getVatFromIncVat(amountIncVat: number): number {
  return amountIncVat - incVatToExVat(amountIncVat);
}

export const B2B_TIER_BANDS = {
  starter: { min: 1, max: 10 },
  squad: { min: 11, max: 25 },
  elite: { min: 26, max: Infinity },
} as const;

// B2B pricing ex-VAT. Subscription (20% off one-time) = £61/£55/£50 per box (displayed as best price).
// One-time = £76.25/£68.75/£62.50 so that 0.8 × one-time = £61/£55/£50. Shopify variant prices = one-time.
export const B2B_SUBSCRIPTION_PRICE_EX_VAT = { starter: 61, squad: 55, elite: 50 } as const;
export const B2B_ONE_TIME_PRICE_EX_VAT = {
  starter: 61 / 0.8,
  squad: 55 / 0.8,
  elite: 50 / 0.8,
} as const;

export const b2bFormulaPricing = {
  "one-time": {
    starter: { price: B2B_ONE_TIME_PRICE_EX_VAT.starter, priceIncVat: B2B_ONE_TIME_PRICE_EX_VAT.starter * VAT_RATE },
    squad: { price: B2B_ONE_TIME_PRICE_EX_VAT.squad, priceIncVat: B2B_ONE_TIME_PRICE_EX_VAT.squad * VAT_RATE },
    elite: { price: B2B_ONE_TIME_PRICE_EX_VAT.elite, priceIncVat: B2B_ONE_TIME_PRICE_EX_VAT.elite * VAT_RATE },
  },
  subscription: {
    starter: { price: B2B_SUBSCRIPTION_PRICE_EX_VAT.starter, priceIncVat: B2B_SUBSCRIPTION_PRICE_EX_VAT.starter * VAT_RATE, billing: "monthly" as const, basePrice: B2B_ONE_TIME_PRICE_EX_VAT.starter },
    squad: { price: B2B_SUBSCRIPTION_PRICE_EX_VAT.squad, priceIncVat: B2B_SUBSCRIPTION_PRICE_EX_VAT.squad * VAT_RATE, billing: "monthly" as const, basePrice: B2B_ONE_TIME_PRICE_EX_VAT.squad },
    elite: { price: B2B_SUBSCRIPTION_PRICE_EX_VAT.elite, priceIncVat: B2B_SUBSCRIPTION_PRICE_EX_VAT.elite * VAT_RATE, billing: "monthly" as const, basePrice: B2B_ONE_TIME_PRICE_EX_VAT.elite },
  },
} as const;

/** B2B per-box prices INCLUDING 20% VAT for UI. */
export const B2B_PRICE_DISPLAY_INC_VAT: Record<PurchaseType, Record<B2BTier, number>> = {
  "one-time": { starter: B2B_ONE_TIME_PRICE_EX_VAT.starter * VAT_RATE, squad: B2B_ONE_TIME_PRICE_EX_VAT.squad * VAT_RATE, elite: B2B_ONE_TIME_PRICE_EX_VAT.elite * VAT_RATE },
  subscription: { starter: B2B_SUBSCRIPTION_PRICE_EX_VAT.starter * VAT_RATE, squad: B2B_SUBSCRIPTION_PRICE_EX_VAT.squad * VAT_RATE, elite: B2B_SUBSCRIPTION_PRICE_EX_VAT.elite * VAT_RATE },
};
