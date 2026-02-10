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

interface FormulaBenefitsStatsMobileProps {
  formulaId: FormulaId;
}

export default function FormulaBenefitsStatsMobile({
  formulaId,
}: FormulaBenefitsStatsMobileProps) {
  const formula = formulaContent[formulaId];
  const productImage = PRODUCT_IMAGE[formulaId];

  return (
    <section
      className="bg-black text-white"
      aria-labelledby="benefits-stats-heading"
    >
      <div className="flex flex-col">
        {/* 1. Photo — full width, top */}
        <div className="relative w-full aspect-[4/3] min-h-[240px]">
          <Image
            src={productImage.src}
            alt={productImage.alt}
            fill
            className="object-contain object-top"
            sizes="100vw"
            priority={false}
          />
        </div>

        {/* 2. Title + subtitle */}
        <div className="px-6 pt-6">
          <h2
            id="benefits-stats-heading"
            className="premium-display text-white mb-2 text-2xl font-bold leading-tight"
          >
            {formula.headline}
          </h2>
          <p className="premium-annotation text-white/80 text-base">
            {formula.subheadline}
          </p>
        </div>

        {/* 3. 2 x 3 grid of data */}
        <div className="grid grid-cols-2 grid-rows-3 gap-4 px-6 py-6">
          {STRUGGLE_OPTIONS.map((struggle) => {
            const solution = formula.struggleSolutions[struggle.id];
            if (!solution) return null;
            return (
              <div key={struggle.id}>
                <p className="font-clinical text-xl font-bold text-white leading-tight">
                  {solution.stat}
                </p>
                <p className="premium-data text-xs text-white/70 mt-0.5">
                  {solution.statLabel}
                </p>
              </div>
            );
          })}
        </div>

        {/* 4. CTA button */}
        <div className="px-6 pb-8">
          <a
            href="#proof-and-science"
            className="inline-flex items-center justify-center w-full py-3 rounded-lg bg-white text-black font-semibold text-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            See the science
          </a>
        </div>
      </div>
    </section>
  );
}
