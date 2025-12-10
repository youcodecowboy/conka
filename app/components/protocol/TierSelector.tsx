"use client";

import React from "react";
import {
  ProtocolTier,
  PurchaseType,
  protocolPricing,
  formatPrice,
  getBillingLabel,
  ProtocolId,
} from "@/app/lib/productData";

interface TierSelectorProps {
  selectedTier: ProtocolTier;
  onSelect: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  protocolId: ProtocolId;
  availableTiers: ProtocolTier[];
  highlightColor?: string;
  className?: string;
}

const tierLabels: Record<ProtocolTier, string> = {
  starter: "Starter",
  pro: "Pro",
  max: "Max",
};

export default function TierSelector({
  selectedTier,
  onSelect,
  purchaseType,
  protocolId,
  availableTiers,
  highlightColor = "#AAB9BC",
  className = "",
}: TierSelectorProps) {
  const pricingType = protocolId === "4" ? "ultimate" : "standard";
  const tierPricing = protocolPricing[pricingType][purchaseType];

  return (
    <div className={`space-y-3 ${className}`}>
      <p className="font-clinical text-xs uppercase opacity-70">Select Your Plan</p>
      <div className="grid grid-cols-3 gap-3">
        {availableTiers.map((tier) => {
          const pricing = tierPricing[tier as keyof typeof tierPricing];
          if (!pricing) return null;
          
          const isSelected = selectedTier === tier;
          const billingText =
            purchaseType === "subscription" && "billing" in pricing
              ? getBillingLabel(pricing.billing)
              : "one-time";

          const isInvert = highlightColor === "invert";
          const tealColor = isInvert ? "#AAB9BC" : highlightColor;

          const borderClass = "border-2 border-[var(--foreground)]";
          const shadowClass = isSelected
            ? "shadow-[4px_4px_0px_0px_#14b8a6]"
            : "hover:shadow-[4px_4px_0px_0px_var(--foreground)]";

          return (
            <button
              key={tier}
              onClick={() => onSelect(tier)}
              className={`text-left transition-all ${borderClass} ${shadowClass} overflow-hidden flex flex-col`}
              style={
                purchaseType === "one-time" && !isInvert
                  ? { borderColor: highlightColor }
                  : undefined
              }
            >
              {/* Tier Name Header */}
              <div 
                className={`px-3 py-1.5 ${purchaseType === "subscription" ? "bg-[var(--foreground)] text-[var(--background)]" : isInvert ? "bg-[var(--background)] text-[var(--foreground)]" : ""}`}
                style={
                  purchaseType === "one-time" && !isInvert
                    ? { backgroundColor: highlightColor, color: "white" }
                    : undefined
                }
              >
                <p className="text-base font-bold font-clinical">{tierLabels[tier]}</p>
              </div>
              
              {/* Price & Billing Body */}
              <div 
                className={`px-3 py-2 flex-1 flex flex-col justify-end ${
                  isSelected 
                    ? "" 
                    : purchaseType === "subscription" 
                    ? "bg-[var(--background)] text-[var(--foreground)]" 
                    : isInvert 
                    ? "bg-[var(--foreground)] text-[var(--background)]" 
                    : "bg-[var(--background)] text-[var(--foreground)]"
                }`}
                style={
                  isSelected
                    ? { backgroundColor: tealColor, color: "white" }
                    : undefined
                }
              >
                <p className="text-xl font-bold mb-0.5">{formatPrice(pricing.price)}</p>
                <p className={`font-clinical text-xs ${isSelected ? "opacity-90" : "opacity-70"}`}>{billingText}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

