"use client";

import {
  PackSize,
  PurchaseType,
  ProtocolTier,
  formulaPricing,
  protocolPricing,
  formatPrice,
  getBillingLabel,
  FormulaId,
  ProtocolId,
} from "@/app/lib/productData";

interface StickyPurchaseFooterMobileProps {
  // For formula pages
  formulaId?: FormulaId;
  selectedPack?: PackSize;
  // For protocol pages
  protocolId?: ProtocolId;
  selectedTier?: ProtocolTier;
  // Shared
  purchaseType: PurchaseType;
  onAddToCart: () => void;
}

export default function StickyPurchaseFooterMobile({
  formulaId,
  selectedPack,
  protocolId,
  selectedTier,
  purchaseType,
  onAddToCart,
}: StickyPurchaseFooterMobileProps) {
  // Calculate price and billing frequency
  let price = 0;
  let billingText = "";

  if (formulaId && selectedPack) {
    const pricing = formulaPricing[purchaseType][selectedPack];
    price = pricing.price;
    if (purchaseType === "subscription" && "billing" in pricing) {
      billingText = getBillingLabel(pricing.billing);
    }
  } else if (protocolId && selectedTier) {
    const pricingType = protocolId === "4" ? "ultimate" : "standard";
    const tierPricing = protocolPricing[pricingType][purchaseType];
    if (selectedTier in tierPricing) {
      const pricing = tierPricing[selectedTier as keyof typeof tierPricing];
      price = pricing.price;
      if (purchaseType === "subscription" && pricing && "billing" in pricing) {
        billingText = getBillingLabel(pricing.billing);
      }
    }
  }

  // Always visible - no scroll logic needed
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--background)] border-t-2 border-black shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Price Section */}
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">{formatPrice(price)}</span>
              <span className="font-clinical text-xs opacity-60">+ Free Shipping</span>
            </div>
            <p className="font-clinical text-xs opacity-50 mt-0.5">
              {purchaseType === "subscription" && billingText
                ? `Billed ${billingText}`
                : "One-time purchase"}
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-black/10"></div>

          {/* CTA Section */}
          <div className="flex flex-col items-center">
            <button
              onClick={onAddToCart}
              className="neo-button px-5 py-2 font-bold text-sm whitespace-nowrap flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart
            </button>
            <span className="font-clinical text-xs opacity-50 mt-1 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              100-day guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
