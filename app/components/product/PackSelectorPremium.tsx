"use client";

import { PackSize } from "@/app/lib/productData";

interface PackSelectorPremiumProps {
  selectedPack: PackSize;
  onSelect: (pack: PackSize) => void;
  className?: string;
}

const packSizes: PackSize[] = ["4", "8", "12", "28"];

const packLabels: Record<PackSize, string> = {
  "4": "4 Shots",
  "8": "8 Shots",
  "12": "12 Shots",
  "28": "28 Shots",
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
                relative text-center transition-all duration-200 rounded-xl w-full
                border-2 cursor-pointer px-2 py-2.5 font-semibold text-xs
                ${isSelected
                  ? "bg-[var(--brand-black)] border-[var(--brand-black)] text-white"
                  : "bg-white border-black/10 text-[var(--brand-black)] hover:border-black/20"
                }
              `}
            >
              {size === "12" && (
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-px text-[7px] font-bold uppercase tracking-wide bg-[var(--brand-accent)] text-white rounded-full whitespace-nowrap leading-tight">
                  Most Popular
                </span>
              )}
              {packLabels[size]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
