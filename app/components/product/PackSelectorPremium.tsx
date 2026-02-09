"use client";

import React from "react";
import {
  PackSize,
  PurchaseType,
  formulaPricing,
  formatPrice,
  getBillingLabel,
} from "@/app/lib/productData";

interface PackSelectorPremiumProps {
  selectedPack: PackSize;
  onSelect: (pack: PackSize) => void;
  purchaseType: PurchaseType;
  subscriptionAccentColor?: string;
  className?: string;
}

const packSizes: PackSize[] = ["4", "8", "12", "28"];

const packLabels: Record<PackSize, string> = {
  "4": "4-pack",
  "8": "8-pack",
  "12": "12-pack",
  "28": "28-pack",
};

export default function PackSelectorPremium({
  selectedPack,
  onSelect,
  purchaseType,
  subscriptionAccentColor = "#f59e0b",
  className = "",
}: PackSelectorPremiumProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <p className="premium-data uppercase opacity-70">Select Pack Size</p>
      <div className="grid grid-cols-4 gap-2">
        {packSizes.map((size) => {
          const pricing = formulaPricing[purchaseType][size];
          if (!pricing) return null;

          const isSelected = selectedPack === size;
          const billingText =
            purchaseType === "subscription"
              ? getBillingLabel((pricing as { billing: string }).billing)
              : "one-time";

          return (
            <button
              key={size}
              onClick={() => onSelect(size)}
              className={`
                text-left transition-all duration-200 overflow-hidden flex flex-col rounded-lg
                border-[length:var(--premium-border-width)] border-[var(--premium-border-color)]
                hover:border-opacity-70 hover:shadow-md hover:scale-[1.02] active:scale-[0.99]
                cursor-pointer
                ${isSelected ? "bg-current/10 border-opacity-40 ring-2 ring-current/30 shadow-sm" : "bg-transparent border-opacity-20 hover:bg-black/5"}
              `}
            >
              <div
                className="w-full min-w-0 px-2 py-1.5 rounded-t-[calc(var(--premium-radius-base)-1px)]"
                style={{
                  backgroundColor: isSelected
                    ? "var(--foreground)"
                    : "rgba(0,0,0,0.05)",
                  color: isSelected ? "var(--background)" : "var(--foreground)",
                }}
              >
                <p className="text-sm font-bold premium-data">
                  {packLabels[size]}
                </p>
              </div>
              <div
                className="px-2 py-1.5 flex-1 flex flex-col justify-end rounded-b-[calc(var(--premium-radius-base)-1px)]"
                style={{
                  backgroundColor: isSelected
                    ? purchaseType === "subscription"
                      ? subscriptionAccentColor
                      : "var(--foreground)"
                    : "var(--background)",
                  color: isSelected ? "white" : "var(--foreground)",
                }}
              >
                <p className="text-base font-bold mb-0.5">
                  {formatPrice(pricing.price)}
                </p>
                <p
                  className={`premium-data text-[11px] ${
                    isSelected ? "opacity-90" : "opacity-70"
                  }`}
                >
                  {billingText}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
