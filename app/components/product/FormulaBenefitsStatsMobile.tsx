"use client";

import Image from "next/image";
import { FormulaId, STRUGGLE_OPTIONS, formulaContent } from "@/app/lib/productData";

const PRODUCT_IMAGE: Record<FormulaId, { src: string; alt: string }> = {
  "01": {
    src: "/lifestyle/ConkaAtWorkDesk.jpg",
    alt: "CONKA Flow at a work desk",
  },
  "02": {
    src: "/lifestyle/BlurGrab.jpg",
    alt: "Reaching for CONKA Clear",
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
    <div className="flex flex-col">
      {/* 1. Photo — square with rounded corners, 90% size, zoomed in */}
      <div className="relative w-[90%] aspect-square overflow-hidden mx-auto" style={{ borderRadius: "var(--brand-radius-card)" }}>
        <Image
          src={productImage.src}
          alt={productImage.alt}
          fill
          className="object-cover"
          style={{ 
            objectPosition: "center center",
            transform: formulaId === "02" ? "scale(1.3)" : "scale(1)",
          }}
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* 2. Title + subtitle */}
      <div className="pt-6">
        <h2
          id="benefits-stats-heading"
          className="brand-h2 mb-2"
          style={{ letterSpacing: "-0.02em" }}
        >
          {formula.subheadline}
        </h2>
      </div>

      {/* 3. 2 x 3 grid of data */}
      <div className="grid grid-cols-2 grid-rows-3 gap-4 py-6">
        {STRUGGLE_OPTIONS.map((struggle) => {
          const solution = formula.struggleSolutions[struggle.id];
          if (!solution) return null;
          return (
            <div key={struggle.id}>
              <p className="font-clinical text-xl font-bold text-black leading-tight">
                {solution.stat}
              </p>
              <p className="brand-data text-xs text-black/60 mt-0.5">
                {solution.statLabel}
              </p>
            </div>
          );
        })}
      </div>

      {/* 4. CTA button */}
      <div className="pb-8">
        <a
          href="#proof-and-science"
          className="inline-flex items-center justify-center w-full py-3 rounded-[var(--brand-radius-interactive)] bg-black text-white font-semibold text-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          See the science
        </a>
      </div>
    </div>
  );
}
