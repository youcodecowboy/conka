"use client";

import { PurchaseType } from "@/app/lib/productData";

interface GlobalPurchaseToggleProps {
  purchaseType: PurchaseType;
  onToggle: (type: PurchaseType) => void;
  className?: string;
}

export default function GlobalPurchaseToggle({
  purchaseType,
  onToggle,
  className = "",
}: GlobalPurchaseToggleProps) {
  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      <button
        onClick={() => onToggle("subscription")}
        className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
          purchaseType === "subscription"
            ? "bg-[var(--color-ink)] text-white"
            : "bg-white text-[var(--text-on-light-muted)] border border-black/10 hover:bg-black/5"
        }`}
      >
        Subscribe & Save 20%
      </button>
      <button
        onClick={() => onToggle("one-time")}
        className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
          purchaseType === "one-time"
            ? "bg-[var(--color-ink)] text-white"
            : "bg-white text-[var(--text-on-light-muted)] border border-black/10 hover:bg-black/5"
        }`}
      >
        One-time Purchase
      </button>
    </div>
  );
}
