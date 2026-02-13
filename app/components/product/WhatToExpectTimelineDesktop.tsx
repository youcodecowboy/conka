"use client";

import { getProductAccent, getProductGradient } from "@/app/lib/productData";
import type { ProductId } from "@/app/lib/productData";
import { whatToExpectByProduct } from "@/app/lib/whatToExpectData";
import type { WhatToExpectStep } from "@/app/lib/whatToExpectData";

interface WhatToExpectTimelineDesktopProps {
  productId: ProductId;
}

export default function WhatToExpectTimelineDesktop({ productId }: WhatToExpectTimelineDesktopProps) {
  const steps = whatToExpectByProduct[productId];
  const gradientConfig = getProductGradient(productId);
  const accentHex = getProductAccent(productId);
  const gradient = `linear-gradient(90deg, ${gradientConfig.start}, ${gradientConfig.end})`;

  return (
    <>
      <div className="relative flex mb-0">
        <span
          className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-[var(--premium-border-color)]"
          aria-hidden
        />
        {steps.map((_, i) => (
          <div key={i} className="flex-1 flex justify-center">
            <span
              className="relative z-10 w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: accentHex }}
              aria-hidden
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-3 mt-4">
        {steps.map((step: WhatToExpectStep, i: number) => (
          <div
            key={i}
            className="bg-white p-4 flex flex-col min-h-[200px] text-black transition-[background] duration-200"
            style={{ borderRadius: "var(--premium-radius-card)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = gradient)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            <p
              className="premium-data uppercase tracking-wider text-xs font-medium mb-1.5"
              style={{ color: accentHex }}
            >
              {step.subheading}
            </p>
            <h3 className="premium-heading text-base md:text-lg leading-snug mb-2">
              {step.heading}
            </h3>
            <p className="premium-body text-sm leading-relaxed opacity-90">{step.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
