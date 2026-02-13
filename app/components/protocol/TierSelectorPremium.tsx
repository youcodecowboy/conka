"use client";

import React from "react";
import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolPricing,
  formatPrice,
  getBillingLabel,
  getProtocolTierPackLabel,
} from "@/app/lib/productData";

interface TierSelectorPremiumProps {
  protocolId: ProtocolId;
  selectedTier: ProtocolTier;
  onSelect: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  availableTiers: ProtocolTier[];
  subscriptionAccentColor?: string;
  className?: string;
  /** When true (mobile), hide "one-time" billing label under tier prices */
  compact?: boolean;
}

export default function TierSelectorPremium({
  protocolId,
  selectedTier,
  onSelect,
  purchaseType,
  availableTiers,
  subscriptionAccentColor = "#14b8a6",
  className = "",
  compact = false,
}: TierSelectorPremiumProps) {
  const pricingType = protocolId === "4" ? "ultimate" : "standard";
  const tierPricing = protocolPricing[pricingType][purchaseType];

  return (
    <div className={`space-y-2 ${className}`}>
      <p className="premium-data uppercase opacity-70">Select Your Plan</p>
      <div
        className={`grid gap-2 ${availableTiers.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}
      >
        {availableTiers.map((tier) => {
          const pricing = tierPricing[tier as keyof typeof tierPricing];
          if (!pricing) return null;

          const isSelected = selectedTier === tier;
          const billingText =
            purchaseType === "subscription" && "billing" in pricing
              ? getBillingLabel(pricing.billing)
              : "one-time";

          return (
            <button
              key={tier}
              onClick={() => onSelect(tier)}
              className={`
                text-left transition-all duration-200 overflow-hidden flex flex-col rounded-xl w-full
                bg-white border border-black/[0.06]
                shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                hover:shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:scale-[1.02] active:scale-[0.99]
                cursor-pointer
                ${isSelected ? "ring-2 ring-black/15 shadow-[0_2px_10px_rgba(0,0,0,0.1)]" : ""}
              `}
            >
              <div
                className="w-full min-w-0 flex-shrink-0 px-2 py-1.5 rounded-t-xl"
                style={{
                  backgroundColor: isSelected
                    ? "var(--foreground)"
                    : "rgba(0,0,0,0.04)",
                  color: isSelected ? "var(--background)" : "var(--foreground)",
                }}
              >
                <p className="text-sm font-bold premium-data">
                  {getProtocolTierPackLabel(protocolId, tier)}
                </p>
              </div>
              <div
                className="w-full min-w-0 flex-1 flex flex-col justify-end px-2 py-1.5 rounded-b-xl min-h-[52px]"
                style={{
                  backgroundColor: isSelected
                    ? purchaseType === "subscription"
                      ? subscriptionAccentColor
                      : "var(--foreground)"
                    : "white",
                  color: isSelected ? "white" : "var(--foreground)",
                }}
              >
                <p className="text-base font-bold mb-0.5">
                  {formatPrice(pricing.price)}
                </p>
                {!(compact && purchaseType === "one-time") && (
                  <p
                    className={`premium-data text-[11px] ${
                      isSelected ? "opacity-90" : "opacity-70"
                    }`}
                  >
                    {billingText}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
