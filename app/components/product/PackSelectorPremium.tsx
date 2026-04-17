"use client";

import React from "react";
import { PackSize, PurchaseType } from "@/app/lib/productData";

interface PackSelectorPremiumProps {
  selectedPack: PackSize;
  onSelect: (pack: PackSize) => void;
  purchaseType: PurchaseType;
  className?: string;
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
  className = "",
}: PackSelectorPremiumProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-2">
        {packSizes.map((size) => {
          const isSelected = selectedPack === size;

          return (
            <button
              key={size}
              onClick={() => onSelect(size)}
              className={`
                text-center transition-all duration-200 rounded-xl w-full
                border-2 cursor-pointer px-2 py-2.5 font-semibold text-xs
                ${isSelected
                  ? "bg-[var(--brand-black)] border-[var(--brand-black)] text-white"
                  : "bg-white border-black/10 text-[var(--brand-black)] hover:border-black/20"
                }
              `}
            >
              {packLabels[size]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
