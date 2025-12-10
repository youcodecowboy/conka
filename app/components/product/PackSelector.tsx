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

          const isInvert = highlightColor === "invert";
          const tealColor = isInvert ? "#AAB9BC" : highlightColor;
          
          // Header: Black bg/white text for subscription, inverted for one-time Formula 01
          const headerBg = purchaseType === "subscription"
            ? "bg-[var(--foreground)] text-[var(--background)]"
            : isInvert
            ? "bg-[var(--background)] text-[var(--foreground)]"
            : `bg-[${highlightColor}] text-white`;
          
          // Body: Teal bg/white text when selected, otherwise white bg/black text for subscription
          // For one-time: teal bg/white text when selected, otherwise transparent or black bg

          const borderClass = "border-2 border-[var(--foreground)]";
          const shadowClass = isSelected
            ? "shadow-[4px_4px_0px_0px_#14b8a6]"
            : "hover:shadow-[4px_4px_0px_0px_var(--foreground)]";

          return (
            <button
              key={size}
              onClick={() => onSelect(size)}
              className={`text-left transition-all ${borderClass} ${shadowClass} overflow-hidden flex flex-col`}
              style={
                purchaseType === "one-time" && !isInvert
                  ? { borderColor: highlightColor }
                  : undefined
              }
            >
              {/* Pack Size Header - Black background, white text */}
              <div 
                className={`px-3 py-1.5 ${purchaseType === "subscription" ? "bg-[var(--foreground)] text-[var(--background)]" : isInvert ? "bg-[var(--background)] text-[var(--foreground)]" : ""}`}
                style={
                  purchaseType === "one-time" && !isInvert
                    ? { backgroundColor: highlightColor, color: "white" }
                    : undefined
                }
              >
                <p className="text-base font-bold font-clinical">{packLabels[size]}</p>
              </div>
              
              {/* Price & Billing Body - Teal when selected, otherwise default */}
              <div 
                className={`px-3 py-2 flex-1 flex flex-col justify-end ${
                  isSelected 
                    ? "" 
                    : purchaseType === "subscription" 
                    ? "bg-[var(--background)] text-[var(--foreground)]" 
                    : isInvert 
                    ? "bg-[var(--foreground)] text-[var(--background)]" 
                    : ""
                }`}
                style={
                  isSelected
                    ? { backgroundColor: tealColor, color: "white" }
                    : purchaseType === "one-time" && !isInvert
                    ? { backgroundColor: "transparent", color: "white" }
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

