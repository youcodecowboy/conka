"use client";

import Image from "next/image";
import {
  FormulaId,
  FORMULA_GRADIENTS,
  interpolateHex,
  STRUGGLE_OPTIONS,
  formulaContent,
} from "@/app/lib/productData";
import { StruggleIcon } from "./StruggleIcons";

/** Card background grey (slightly darker); section remains black. */
const CARD_BG = "#e5e8e6";

const STATS_IMAGE: Record<FormulaId, { src: string; alt: string }> = {
  "01": {
    src: "/formulas/conkaFlow/FlowStats.jpg",
    alt: "Clinically proven benefits for CONKA Flow",
  },
  "02": {
    src: "/formulas/conkaClear/ClearStats.jpg",
    alt: "Clinically proven benefits for CONKA Clear",
  },
};

interface FormulaBenefitsAtGlanceProps {
  formulaId: FormulaId;
}

export default function FormulaBenefitsAtGlance({
  formulaId,
}: FormulaBenefitsAtGlanceProps) {
  const formula = formulaContent[formulaId];
  const statsImage = STATS_IMAGE[formulaId];
  const gradient = FORMULA_GRADIENTS[formulaId];
  const totalStats = STRUGGLE_OPTIONS.length;

  return (
    <section
      className="premium-section bg-black text-white"
      aria-labelledby="benefits-at-glance-heading"
    >
      {/* Wider container: 90rem vs default 72rem */}
      <div className="mx-auto w-full max-w-[90rem]">
        <header className="premium-stack-m flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="benefits-at-glance-heading"
            className="premium-heading text-white"
          >
            Why {formula.name} works
          </h2>
          <a
            href="#proof-and-science"
            className="premium-body font-semibold text-white underline underline-offset-2 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
          >
            See the science
          </a>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
          <div
            className="relative aspect-square min-h-[280px] w-full overflow-hidden rounded-[var(--premium-radius-base)]"
            style={{ background: CARD_BG }}
          >
            <Image
              src={statsImage.src}
              alt={statsImage.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-8">
            {STRUGGLE_OPTIONS.map((struggle, index) => {
              const solution = formula.struggleSolutions[struggle.id];
              if (!solution) return null;
              const t = totalStats > 1 ? index / (totalStats - 1) : 0;
              const statColor = interpolateHex(gradient.start, gradient.end, t);

              return (
                <div
                  key={struggle.id}
                  className="flex flex-col justify-center rounded-[var(--premium-radius-base)] p-8 text-black"
                  style={{ background: CARD_BG }}
                >
                  <span
                    className="font-clinical text-[60px] font-bold leading-[0.9]"
                    style={{
                      color: statColor,
                      fontVariantNumeric: "tabular-nums",
                      textShadow:
                        "0.5px 0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, -0.5px -0.5px 0 #000, 0.5px 0 0 #000, -0.5px 0 0 #000, 0 0.5px 0 #000, 0 -0.5px 0 #000",
                    }}
                  >
                    {solution.stat}
                  </span>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="flex-shrink-0 text-black opacity-70">
                      <StruggleIcon icon={struggle.icon} className="h-4 w-4" />
                    </span>
                    <span className="premium-body text-sm font-medium text-black/90">
                      {struggle.label}
                    </span>
                  </div>
                  <p className="premium-data mt-2 text-xs text-black/70">
                    {solution.statLabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
