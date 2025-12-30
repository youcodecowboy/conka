"use client";

import React from "react";
import {
  PackSize,
  PurchaseType,
  formulaPricing,
  formatPrice,
  getBillingLabel,
} from "@/app/lib/productData";

interface PackSelectorProps {
  selectedPack: PackSize;
  onSelect: (pack: PackSize) => void;
  purchaseType: PurchaseType;
  highlightColor?: string;
  className?: string;
}

const packSizes: PackSize[] = ["4", "12", "28"];

const packLabels: Record<PackSize, string> = {
  "4": "4-pack",
  "12": "12-pack",
  "28": "28-pack",
};

export default function PackSelector({
  selectedPack,
  onSelect,
  purchaseType,
  highlightColor = "#AAB9BC",
  className = "",
}: PackSelectorProps) {
  const isInvert = highlightColor === "invert";
  const accentColor = isInvert ? "#1a1a1a" : highlightColor;

  return (
    <div className={`space-y-3 ${className}`}>
      <p className="font-clinical text-xs uppercase opacity-70">Select Pack Size</p>
      <div className="grid grid-cols-3 gap-3">
        {packSizes.map((size) => {
          const pricing = formulaPricing[purchaseType][size];
          const isSelected = selectedPack === size;
          const billingText =
            purchaseType === "subscription"
              ? getBillingLabel((pricing as { billing: string }).billing)
              : "one-time";

          return (
            <button
              key={size}
              onClick={() => onSelect(size)}
              className={`text-left transition-all border-2 overflow-hidden flex flex-col ${
                isSelected
                  ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                  : "hover:shadow-[4px_4px_0px_0px_var(--foreground)]"
              }`}
              style={{
                borderColor: purchaseType === "subscription" ? "var(--foreground)" : accentColor,
              }}
            >
              {/* Pack Size Header - Inverts when selected */}
              <div
                className="px-3 py-1.5"
                style={{
                  backgroundColor: isSelected
                    ? "var(--background)"
                    : purchaseType === "subscription" 
                      ? "var(--foreground)" 
                      : accentColor,
                  color: isSelected
                    ? "var(--foreground)"
                    : purchaseType === "subscription" 
                      ? "var(--background)" 
                      : "white",
                }}
              >
                <p className="text-base font-bold font-clinical">{packLabels[size]}</p>
              </div>

              {/* Price & Billing Body */}
              <div
                className="px-3 py-2 flex-1 flex flex-col justify-end"
                style={{
                  backgroundColor: isSelected 
                    ? (purchaseType === "subscription" ? "#AAB9BC" : accentColor)
                    : "var(--background)",
                  color: isSelected 
                    ? "white" 
                    : "var(--foreground)",
                }}
              >
                <p className="text-xl font-bold mb-0.5">{formatPrice(pricing.price)}</p>
                <p className={`font-clinical text-xs ${isSelected ? "opacity-90" : "opacity-70"}`}>
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
