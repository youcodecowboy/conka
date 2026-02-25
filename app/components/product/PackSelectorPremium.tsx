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
  /** When true (mobile), hide "one-time" billing label under pack prices */
  compact?: boolean;
}

const packSizes: PackSize[] = ["4", "8", "12", "28"];

const packLabels: Record<PackSize, string> = {
  "4": "4-pack",
  "8": "8-pack",
  "12": "12-pack",
  "28": "28-pack",
};

/** Tier name for protocol mapping (4=Starter, 12=Pro, 28=Max; 8 has no tier) */
const packTierLabel: Partial<Record<PackSize, string>> = {
  "4": "Starter",
  "12": "Pro",
  "28": "Max",
};

export default function PackSelectorPremium({
  selectedPack,
  onSelect,
  purchaseType,
  subscriptionAccentColor,
  className = "",
  compact = false,
}: PackSelectorPremiumProps) {
  const accent = subscriptionAccentColor ?? "var(--color-neuro-blue-dark)";
  return (
    <div className={`space-y-2 ${className}`}>
      <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">Select Pack Size</p>
      <div className="grid grid-cols-4 gap-2">
        {packSizes.map((size) => {
          const pricing = formulaPricing[purchaseType][size];
          if (!pricing) return null;

          const isSelected = selectedPack === size;
          const billingText =
            purchaseType === "subscription"
              ? getBillingLabel((pricing as { billing: string }).billing)
              : "one-time";
          const tierLabel = packTierLabel[size as PackSize];

          return (
            <button
              key={size}
              onClick={() => onSelect(size)}
              className={`
                text-left transition-all duration-200 overflow-hidden flex flex-col rounded-[var(--premium-radius-nested)] w-full
                border cursor-pointer
                ${isSelected
                  ? "bg-[var(--color-ink)] border-[var(--color-ink)] ring-2 ring-[var(--color-ink)]/20"
                  : "bg-[var(--color-premium-bg-soft)] border-[var(--color-premium-stroke)] hover:border-[var(--color-neuro-blue-light)] hover:bg-[var(--color-premium-stroke)]/20"
                }
              `}
            >
              <div
                className={`w-full min-w-0 flex-shrink-0 px-2 py-1.5 rounded-t-[var(--premium-radius-nested)] ${
                  isSelected
                    ? "bg-[var(--color-ink)] text-[var(--text-on-ink)]"
                    : "bg-[var(--color-premium-stroke)] text-[var(--color-ink)]"
                }`}
              >
                <p className="text-sm font-bold" style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}>
                  {packLabels[size]}
                </p>
                {tierLabel && (
                  <p className={`text-[10px] font-semibold uppercase tracking-wide ${isSelected ? "text-[var(--text-on-ink)] opacity-90" : "text-[var(--text-on-light-muted)]"}`}>
                    {tierLabel}
                  </p>
                )}
              </div>
              <div
                className="w-full min-w-0 flex-1 flex flex-col justify-end px-2 py-1.5 rounded-b-[var(--premium-radius-nested)] min-h-[52px]"
                style={{
                  backgroundColor: isSelected
                    ? purchaseType === "subscription"
                      ? accent
                      : "var(--color-ink)"
                    : "var(--color-premium-bg-soft)",
                  color: isSelected ? "var(--text-on-ink)" : "var(--color-ink)",
                }}
              >
                <p className="text-base font-bold mb-0.5">
                  {formatPrice(pricing.price)}
                </p>
                {!(compact && purchaseType === "one-time") && (
                  <p
                    className={`premium-body-sm ${isSelected ? "opacity-90" : "text-[var(--text-on-light-muted)]"}`}
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
