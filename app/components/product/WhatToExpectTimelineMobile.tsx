"use client";

import { useState } from "react";
import { getProductAccent } from "@/app/lib/productData";
import type { ProductId } from "@/app/lib/productData";
import type { WhatToExpectStep } from "@/app/lib/whatToExpectData";
import { whatToExpectByProduct } from "@/app/lib/whatToExpectData";

interface WhatToExpectTimelineMobileProps {
  productId: ProductId;
}

const MOBILE_STEP_INDICES = [0, 1, 3]; // Within 30 mins, 7 Days, 30 Days

export default function WhatToExpectTimelineMobile({ productId }: WhatToExpectTimelineMobileProps) {
  const allSteps = whatToExpectByProduct[productId];
  const steps = MOBILE_STEP_INDICES.map((idx) => allSteps[idx]);
  const accentHex = getProductAccent(productId);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {steps.map((step: WhatToExpectStep, i: number) => {
        const isExpanded = expandedIndex === i;
        return (
          <button
            key={i}
            type="button"
            className="w-full text-left flex gap-4 border border-black/10 bg-white p-4 min-h-[44px] transition-colors duration-200"
            style={{ borderRadius: "var(--premium-radius-card)" }}
            onClick={() => setExpandedIndex((prev) => (prev === i ? null : i))}
            aria-expanded={isExpanded}
          >
            <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
              <span
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: accentHex }}
                aria-hidden
              />
              {i < steps.length - 1 && (
                <span
                  className="w-px flex-1 min-h-[12px] mt-2 bg-[var(--premium-border-color)]"
                  aria-hidden
                />
              )}
            </div>
            <div className="flex-1 min-w-0 text-black">
              <p
                className="premium-data uppercase tracking-wider text-xs font-medium mb-1.5"
                style={{ color: accentHex }}
              >
                {step.subheading}
              </p>
              <h3 className="premium-heading text-lg leading-snug mb-2">{step.heading}</h3>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isExpanded ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
                }`}
              >
                <p className="premium-body text-sm leading-relaxed opacity-90">{step.body}</p>
              </div>
              <span className="premium-data text-[10px] uppercase tracking-wider opacity-50 mt-2 block">
                {isExpanded ? "Tap to close" : "Tap for more"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
