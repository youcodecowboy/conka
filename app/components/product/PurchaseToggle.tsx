"use client";

import { PurchaseType } from "@/app/lib/productData";

interface PurchaseToggleProps {
  purchaseType: PurchaseType;
  onToggle: (type: PurchaseType) => void;
  highlightColor?: string;
  className?: string;
}

export default function PurchaseToggle({
  purchaseType,
  onToggle,
  highlightColor = "#AAB9BC",
  className = "",
}: PurchaseToggleProps) {
  // When in header, buttons need to adapt to header background
  const isInvert = highlightColor === "invert";
  const isWhiteHeader = isInvert && purchaseType === "one-time";
  
  return (
    <div className={`flex items-center gap-2 h-9 ${className}`}>
      <button
        onClick={() => onToggle("subscription")}
        className={`px-4 py-1.5 rounded-full border-2 transition-all flex items-center justify-center gap-2 h-9 ${
          purchaseType === "subscription"
            ? isWhiteHeader
              ? "bg-black text-white border-black"
              : "bg-white text-black border-white"
            : isWhiteHeader
            ? "bg-transparent border-black/50 text-black hover:bg-black/10"
            : "bg-transparent border-white/50 text-white hover:bg-white/20"
        }`}
      >
        <span className="font-clinical text-xs font-medium whitespace-nowrap">Subscribe</span>
        <span
          className="px-1.5 py-0.5 text-white text-xs font-clinical rounded-full whitespace-nowrap flex-shrink-0"
          style={{
            backgroundColor:
              purchaseType === "one-time"
                ? "black"
                : highlightColor === "invert"
                ? "#f59e0b"
                : highlightColor,
          }}
        >
          SAVE
        </span>
      </button>
      <button
        onClick={() => onToggle("one-time")}
        className={`px-4 py-1.5 rounded-full border-2 transition-all h-9 flex items-center justify-center ${
          purchaseType === "one-time"
            ? isWhiteHeader
              ? "bg-black text-white border-black"
              : "bg-white text-black border-white"
            : isWhiteHeader
            ? "bg-transparent border-black/50 text-black hover:bg-black/10"
            : "bg-transparent border-white/50 text-white hover:bg-white/20"
        }`}
      >
        <span className="font-clinical text-xs font-medium whitespace-nowrap">One-Time</span>
      </button>
    </div>
  );
}

