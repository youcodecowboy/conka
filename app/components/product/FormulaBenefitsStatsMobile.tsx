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

/**
 * Curated stats per formula -- 3 compliant stats only.
 * See FormulaBenefitsStatsDesktop.tsx for compliance rationale.
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

interface FormulaBenefitsStatsMobileProps {
  formulaId: FormulaId;
}

export default function FormulaBenefitsStatsMobile({
  formulaId,
}: FormulaBenefitsStatsMobileProps) {
  const formula = formulaContent[formulaId];
  const productImage = PRODUCT_IMAGE[formulaId];
  const stats = CURATED_STATS[formulaId];

  return (
    <div className="flex flex-col">
      {/* Photo */}
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

      {/* Title */}
      <div className="pt-6">
        <h2
          id="benefits-stats-heading"
          className="brand-h2 mb-2"
          style={{ letterSpacing: "-0.02em" }}
        >
          {formula.subheadline}
        </h2>
      </div>

      {/* 3 large stats - single column for impact */}
      <div className="flex flex-col gap-5 py-6">
        {stats.map((item, idx) => (
          <div key={idx}>
            <p className="font-clinical text-3xl font-bold text-black leading-none">
              {item.stat}
              <sup className="text-xs font-normal opacity-50 ml-0.5">
                {item.anchor}
              </sup>
            </p>
            <p className="brand-data text-sm text-black/60 mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
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
