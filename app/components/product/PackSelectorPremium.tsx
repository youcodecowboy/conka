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
                text-left transition-all duration-200 overflow-hidden flex flex-col rounded-xl
                bg-white border border-black/[0.06]
                shadow-[0_1px 4px_rgba(0,0,0,0.06)]
                hover:shadow-[0_2px 10px_rgba(0,0,0,0.1)] hover:scale-[1.02] active:scale-[0.99]
                cursor-pointer
                ${isSelected ? "ring-2 ring-black/15 shadow-[0_2px 10px_rgba(0,0,0,0.1)]" : ""}
              `}
            >
              <div
                className="w-full min-w-0 px-2 py-1.5 rounded-t-[10px]"
                style={{
                  backgroundColor: isSelected
                    ? "var(--foreground)"
                    : "rgba(0,0,0,0.04)",
                  color: isSelected ? "var(--background)" : "var(--foreground)",
                }}
              >
                <p className="text-sm font-bold premium-data">
                  {packLabels[size]}
                </p>
              </div>
              <div
                className="px-2 py-1.5 flex-1 flex flex-col justify-end rounded-b-[10px]"
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
