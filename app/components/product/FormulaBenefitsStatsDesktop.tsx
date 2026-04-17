"use client";

import Image from "next/image";
import { FormulaId, formulaContent } from "@/app/lib/productData";

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

/** Per-formula lifestyle assets for the 3 supporting thumbnails */
const SUPPORTING_ASSETS: Record<FormulaId, { src: string; alt: string }[]> = {
  "01": [
    { src: "/lifestyle/FlowBoxOpen.jpg", alt: "Unboxing CONKA Flow" },
    { src: "/lifestyle/FlowDrink.jpg", alt: "Drinking CONKA Flow" },
    { src: "/lifestyle/FlowLeaf.jpg", alt: "Holding CONKA Flow bottle" },
  ],
  "02": [
    { src: "/lifestyle/ConkaJeansHold.jpg", alt: "Holding CONKA Clear casually" },
    { src: "/lifestyle/ClearTable.jpg", alt: "CONKA Clear on a desk" },
    { src: "/lifestyle/ClearBag.jpg", alt: "CONKA Clear in a bag" },
  ],
};

/**
 * Curated stats per formula -- 3 compliant stats only.
 *
 * Flow:
 *  - Tiredness/fatigue: EFSA Vitamin C claim (††)
 *  - Memory: observational ingredient-level research (¶)
 *  - Sleep quality: observational ingredient-level research (¶)
 *
 * Clear:
 *  - Memory: observational ingredient-level research (¶)
 *  - Fatigue resistance: ties to EFSA tiredness/fatigue claim (††)
 *  - Cerebral blood flow: observational ingredient-level research (¶)
 *
 * Dropped: stress scores, anxiety ratings (RED -- mood/stress claims
 * not authorised for any CONKA ingredient per CLAIMS_COMPLIANCE.md)
 */
const CURATED_STATS: Record<
  FormulaId,
  Array<{ stat: string; label: string; anchor: string }>
> = {
  "01": [
    {
      stat: "+42%",
      label: "improvement in sleep quality",
      anchor: "¶",
    },
    {
      stat: "+18%",
      label: "improvement in memory performance",
      anchor: "¶",
    },
    {
      stat: "Reduces",
      label: "tiredness and fatigue",
      anchor: "††",
    },
  ],
  "02": [
    {
      stat: "+63%",
      label: "improvement in memory performance",
      anchor: "¶",
    },
    {
      stat: "+30%",
      label: "improvement in fatigue resistance",
      anchor: "¶",
    },
    {
      stat: "+57%",
      label: "increase in cerebral blood flow",
      anchor: "¶",
    },
  ],
};

interface FormulaBenefitsStatsDesktopProps {
  formulaId: FormulaId;
}

export default function FormulaBenefitsStatsDesktop({
  formulaId,
}: FormulaBenefitsStatsDesktopProps) {
  const formula = formulaContent[formulaId];
  const productImage = PRODUCT_IMAGE[formulaId];
  const stats = CURATED_STATS[formulaId];

  return (
    <div className="grid grid-cols-2 md:min-h-[480px] gap-12 md:gap-16 lg:gap-20 items-center">
      {/* Left: content */}
      <div className="flex flex-col justify-center pt-6 md:pt-8">
        <h2
          id="benefits-stats-heading"
          className="brand-h2 mb-8"
          style={{ letterSpacing: "-0.02em" }}
        >
          {formula.subheadline}
        </h2>

        {/* 3 large stats */}
        <div className="flex flex-col gap-6 mb-8">
          {stats.map((item, idx) => (
            <div key={idx}>
              <p className="font-clinical text-4xl md:text-5xl font-bold text-black leading-none">
                {item.stat}
                <sup className="text-sm font-normal opacity-50 ml-0.5">
                  {item.anchor}
                </sup>
              </p>
              <p className="brand-data text-sm md:text-base text-black/60 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <a
          href="#proof-and-science"
          className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--brand-radius-interactive)] bg-black text-white font-semibold brand-body text-sm md:text-base hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 w-fit"
        >
          See the science
        </a>
      </div>

      {/* Right: lifestyle imagery */}
      <div className="space-y-4">
        <div
          className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--brand-tint)] border border-[var(--brand-stroke)]"
          style={{ borderRadius: "var(--brand-radius-card)" }}
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
        <div className="grid grid-cols-3 gap-3 w-full">
          {SUPPORTING_ASSETS[formulaId].map((asset, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden bg-[var(--brand-tint)] border border-[var(--brand-stroke)]"
              style={{ borderRadius: "var(--brand-radius-card)" }}
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
