"use client";

import { getProductAccent } from "@/app/lib/productData";
import type { ProductId } from "@/app/lib/productData";
import { whatToExpectByProduct } from "@/app/lib/whatToExpectData";
import type { WhatToExpectStep } from "@/app/lib/whatToExpectData";

interface WhatToExpectTimelineDesktopProps {
  productId: ProductId;
}

export default function WhatToExpectTimelineDesktop({ productId }: WhatToExpectTimelineDesktopProps) {
  const steps = whatToExpectByProduct[productId];
  const accentHex = getProductAccent(productId);

  return (
    <div className="w-full" style={{ ["--accent" as string]: accentHex }}>
      <div className="relative flex items-center mb-12">
        <div className="absolute h-[1px] w-full bg-black/5" aria-hidden />
        {steps.map((_, i) => (
          <div key={i} className="flex-1 flex justify-center relative">
            <div
              className="w-3 h-3 rounded-full ring-4 ring-white shadow-sm transition-transform duration-300 hover:scale-125"
              style={{ backgroundColor: accentHex }}
              aria-hidden
            />
            <span className="absolute -top-6 premium-data text-[10px] opacity-40 uppercase tracking-widest">
              Step {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {steps.map((step: WhatToExpectStep, i: number) => (
          <div
            key={i}
            className="bg-white p-6 flex flex-col min-h-[240px] border-2 border-[var(--premium-border-color)] transition-all duration-200 hover:border-[var(--accent)] hover:shadow-lg hover:-translate-y-1"
            style={{
              borderRadius: "var(--premium-radius-card)",
            }}
          >
            <p
              className="premium-data uppercase text-[10px] font-bold mb-3 tracking-[0.1em]"
              style={{ color: accentHex }}
            >
              {step.subheading}
            </p>
            <h3 className="premium-heading text-lg leading-tight mb-3">{step.heading}</h3>
            <p className="premium-body-sm leading-relaxed text-black/60">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
