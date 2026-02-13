"use client";

import Image from "next/image";
import { FormulaId, STRUGGLE_OPTIONS, formulaContent } from "@/app/lib/productData";

const PRODUCT_IMAGE: Record<FormulaId, { src: string; alt: string }> = {
  "01": {
    src: "/formulas/conkaFlow/FlowBlack.jpg",
    alt: "CONKA Flow bottle on black background",
  },
  "02": {
    src: "/formulas/conkaClear/ClearBlack.jpg",
    alt: "CONKA Clear bottle on black background",
  },
};

interface FormulaBenefitsStatsDesktopProps {
  formulaId: FormulaId;
}

export default function FormulaBenefitsStatsDesktop({
  formulaId,
}: FormulaBenefitsStatsDesktopProps) {
  const formula = formulaContent[formulaId];
  const productImage = PRODUCT_IMAGE[formulaId];

  return (
    <div className="grid grid-cols-2 md:min-h-[480px] gap-12 md:gap-16 lg:gap-20 items-center">
      {/* Left: content */}
      <div className="flex flex-col justify-center pt-6 md:pt-8">
        <h2
          id="benefits-stats-heading"
          className="premium-section-heading text-white mb-8"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {formula.subheadline}
        </h2>

        {/* Stat facts grid (Huel-style) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
              {STRUGGLE_OPTIONS.map((struggle) => {
                const solution = formula.struggleSolutions[struggle.id];
                if (!solution) return null;
                return (
                  <div key={struggle.id}>
                    <p className="font-clinical text-2xl md:text-3xl font-bold text-white leading-tight">
                      {solution.stat}
                    </p>
                    <p className="premium-data text-sm text-white/70 mt-0.5">
                      {solution.statLabel}
                    </p>
                  </div>
                );
              })}
            </div>

        <a
          href="#proof-and-science"
          className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--premium-radius-interactive)] bg-white text-black font-semibold premium-body text-sm md:text-base hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black w-fit"
        >
          See the science
        </a>
      </div>

      {/* Right: product image — drives section height */}
      <div className="relative min-h-[480px] h-full">
        <Image
          src={productImage.src}
          alt={productImage.alt}
          fill
          className="object-contain object-bottom"
          sizes="50vw"
          priority={false}
        />
      </div>
    </div>
  );
}
