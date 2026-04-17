"use client";

import React from "react";
import {
  PackSize,
  PurchaseType,
  formulaPricing,
  formatPrice,
} from "@/app/lib/productData";

interface PackSelectorPremiumProps {
  selectedPack: PackSize;
  onSelect: (pack: PackSize) => void;
  purchaseType: PurchaseType;
  subscriptionAccentColor?: string;
  className?: string;
  /** When true (mobile), hide "one-time" billing label under pack prices */
  compact?: boolean;
}

const packSizes: PackSize[] = ["4", "8", "12", "28"];

const packLabels: Record<PackSize, string> = {
  "4": "4 Bottles",
  "8": "8 Bottles",
  "12": "12 Bottles",
  "28": "28 Bottles",
};

export default function PackSelectorPremium({
  selectedPack,
  onSelect,
  purchaseType,
  subscriptionAccentColor,
  className = "",
}: PackSelectorPremiumProps) {
  const accent = subscriptionAccentColor ?? "var(--brand-black)";
  return (
    <div className={`space-y-2 ${className}`}>
      <p className="brand-caption text-[var(--brand-black)] uppercase tracking-wide">Select Pack Size</p>
      <div className="grid grid-cols-4 gap-2">
        {packSizes.map((size) => {
          const pricing = formulaPricing[purchaseType][size];
          if (!pricing) return null;

          const isSelected = selectedPack === size;

          return (
            <button
              key={size}
              onClick={() => onSelect(size)}
              className={`
                text-left transition-all duration-200 overflow-hidden flex flex-col rounded-[var(--brand-radius-container)] w-full
                border cursor-pointer
                ${isSelected
                  ? "bg-[var(--brand-black)] border-[var(--brand-black)] ring-2 ring-[var(--brand-black)]/20"
                  : "bg-[var(--brand-white)] border-[var(--brand-stroke)] hover:border-[var(--brand-tint)] hover:bg-[var(--brand-stroke)]/20"
                }
              `}
            >
              <div
                className={`w-full min-w-0 flex-shrink-0 px-2 py-1.5 rounded-t-[var(--brand-radius-container)] ${
                  isSelected
                    ? "bg-[var(--brand-black)] text-[var(--brand-white)]"
                    : "bg-[var(--brand-stroke)] text-[var(--brand-black)]"
                }`}
              >
                <p className="text-sm font-bold" style={{ letterSpacing: "-0.02em" }}>
                  {packLabels[size]}
                </p>
              </div>
              <div
                className="w-full min-w-0 flex-1 flex flex-col justify-center px-2 py-2 rounded-b-[var(--brand-radius-container)]"
                style={{
                  backgroundColor: isSelected
                    ? purchaseType === "subscription"
                      ? accent
                      : "var(--brand-black)"
                    : "var(--brand-white)",
                  color: isSelected ? "var(--brand-white)" : "var(--brand-black)",
                }}
              >
                <p className="text-base font-bold">
                  {formatPrice(pricing.price)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
