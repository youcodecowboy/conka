"use client";

import Image from "next/image";
import { FormulaId } from "@/app/lib/productData";
import { formulas } from "@/app/components/shop/formulasShowcaseData";
import { getFormulaImage } from "@/app/components/navigation/protocolImageConfig";

interface FormulaSelectorProps {
  selectedFormula: FormulaId | null;
  onSelect: (formulaId: FormulaId) => void;
}

export default function FormulaSelector({
  selectedFormula,
  onSelect,
}: FormulaSelectorProps) {
  const formulaIds: FormulaId[] = ["01", "02"];

  return (
    <section className="px-6 md:px-16 py-6 md:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Individual Formulas
          </h2>
          <p className="font-clinical text-sm md:text-base opacity-70">
            Purchase individual formulas separately
          </p>
        </div>

        {/* Formula Cards - Desktop Grid, Mobile Horizontal Scroll */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {formulaIds.map((formulaId) => {
            const formula = formulas.find((f) => f.id === formulaId);
            if (!formula) return null;

            const formulaImage = getFormulaImage(formulaId) || formula.image.src;
            const isSelected = selectedFormula === formulaId;

            return (
              <button
                key={formulaId}
                onClick={() => onSelect(formulaId)}
                className={`flex flex-col border-2 border-black/10 rounded-lg overflow-hidden bg-white p-3 h-full transition-all duration-200 text-left ${
                  isSelected
                    ? "scale-105 opacity-100 shadow-[4px_4px_0px_0px_var(--foreground)]"
                    : "opacity-60 hover:opacity-100 hover:shadow-[4px_4px_0px_0px_var(--foreground)]"
                }`}
              >
                {/* Formula Image - Larger, Square */}
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={formulaImage}
                    alt={formula.image.alt}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: `${formula.image.focalX}% ${formula.image.focalY}%`,
                    }}
                    sizes="(max-width: 1024px) 25vw, 200px"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1">
                  {/* Formula Name */}
                  <p className="font-primary text-xs uppercase tracking-wide opacity-60 mb-1">
                    {formula.name}
                  </p>

                  {/* Headline */}
                  <h3 className="text-lg font-bold leading-tight mb-3 flex-1">
                    {formula.headline}
                  </h3>

                  {/* CTA Button */}
                  <div
                    className={`px-5 py-2.5 rounded-full font-bold text-sm inline-flex items-center gap-2 w-full justify-center mt-auto border-2 border-[var(--foreground)] ${
                      isSelected
                        ? "bg-white text-black"
                        : "bg-[var(--foreground)] text-[var(--background)]"
                    }`}
                  >
                    {isSelected ? "Selected" : "View"}
                    {!isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
          {formulaIds.map((formulaId) => {
            const formula = formulas.find((f) => f.id === formulaId);
            if (!formula) return null;

            const formulaImage = getFormulaImage(formulaId) || formula.image.src;
            const isSelected = selectedFormula === formulaId;

            return (
              <button
                key={formulaId}
                onClick={() => onSelect(formulaId)}
                className={`flex-shrink-0 w-64 flex flex-col border-2 border-black/10 rounded-lg overflow-hidden bg-white p-3 h-full transition-all duration-200 text-left ${
                  isSelected
                    ? "opacity-100 shadow-[4px_4px_0px_0px_var(--foreground)]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {/* Formula Image */}
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={formulaImage}
                    alt={formula.image.alt}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: `${formula.image.focalX}% ${formula.image.focalY}%`,
                    }}
                    sizes="256px"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1">
                  {/* Formula Name */}
                  <p className="font-primary text-xs uppercase tracking-wide opacity-60 mb-1">
                    {formula.name}
                  </p>

                  {/* Headline */}
                  <h3 className="text-lg font-bold leading-tight mb-3 flex-1">
                    {formula.headline}
                  </h3>

                  {/* CTA Button */}
                  <div
                    className={`px-5 py-2.5 rounded-full font-bold text-sm inline-flex items-center gap-2 w-full justify-center mt-auto border-2 border-[var(--foreground)] ${
                      isSelected
                        ? "bg-white text-black"
                        : "bg-[var(--foreground)] text-[var(--background)]"
                    }`}
                  >
                    {isSelected ? "Selected" : "View"}
                    {!isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
