"use client";

import Image from "next/image";
import { FormulaId, STRUGGLE_OPTIONS, formulaContent } from "@/app/lib/productData";

const PRODUCT_IMAGE: Record<FormulaId, { src: string; alt: string }> = {
  "01": {
    src: "/CONKA_01.jpg",
    alt: "CONKA Flow bottle",
  },
  "02": {
    src: "/CONKA_06.jpg",
    alt: "CONKA Clear bottle",
  },
};

/** Shared lifestyle assets for benefits stats (Flow and Clear) */
const SUPPORTING_ASSETS = [
  { src: "/lifestyle/FlowBoxOpen.jpg", alt: "Unboxing CONKA" },
  { src: "/lifestyle/HoldingBottle.jpg", alt: "Holding CONKA bottle" },
  { src: "/lifestyle/HoldBoth.jpg", alt: "CONKA Flow and Clear bottles" },
];

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
          className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--premium-radius-interactive)] bg-white text-[var(--color-ink)] font-semibold premium-body text-sm md:text-base hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black w-fit"
        >
          See the science
        </a>
      </div>

      {/* Right: Seed-style — primary rectangular asset + 3 small square placeholders (desktop only) */}
      <div className="space-y-4">
        {/* Primary: same width as the row of three below; image fills the frame */}
        <div
          className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]"
          style={{ borderRadius: "var(--premium-radius-card)" }}
        >
          <Image
            src={productImage.src}
            alt={productImage.alt}
            fill
            className="object-cover object-center"
            sizes="50vw"
            priority={false}
          />
        </div>
        {/* Three supporting assets — full width to match primary above */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {SUPPORTING_ASSETS.map((asset, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]"
              style={{ borderRadius: "var(--premium-radius-card)" }}
            >
              <Image
                src={asset.src}
                alt={asset.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 33vw, 16vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
