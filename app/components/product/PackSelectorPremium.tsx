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
                relative text-center transition-colors duration-200 w-full
                border-2 cursor-pointer px-2 py-2.5 font-mono font-bold tracking-[0.08em] uppercase tabular-nums text-[11px]
                ${isSelected
                  ? "bg-[var(--brand-black)] border-[var(--brand-black)] text-white"
                  : "bg-white border-black/10 text-[var(--brand-black)] hover:border-black/20"
                }
              `}
            >
              {size === "12" && (
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-px font-mono text-[7px] font-bold uppercase tracking-[0.14em] bg-[var(--brand-accent)] text-white whitespace-nowrap leading-tight [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)]">
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
