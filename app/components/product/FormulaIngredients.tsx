"use client";

import Image from "next/image";
import {
  FormulaId,
  formulaContent,
  FORMULA_COLORS,
} from "@/app/lib/productData";

interface FormulaIngredientsProps {
  formulaId: FormulaId;
  usePremium?: boolean;
}

export default function FormulaIngredients({
  formulaId,
  usePremium = false,
}: FormulaIngredientsProps) {
  const formula = formulaContent[formulaId];
  const accentColor = FORMULA_COLORS[formulaId];

  const sectionClass = usePremium ? "premium-section" : "px-6 md:px-16 py-24";
  const containerClass = usePremium ? "premium-container" : "max-w-6xl mx-auto";
  const headingClass = usePremium ? "premium-heading mb-2" : "text-3xl md:text-4xl font-bold mb-2";
  const subheadingClass = usePremium ? "premium-annotation" : "font-commentary text-xl";
  const boxClass = usePremium ? "premium-box" : "neo-box";
  const boxInvertedClass = usePremium ? "premium-box-inverted p-4 flex justify-between items-center" : "neo-box-inverted p-4 flex justify-between items-center";

  // Image path - using turmeric for CONKA Flow, CONKA_52.jpg for CONKA Clear
  const ingredientImage = formulaId === "01" ? "/tumeric.jpg" : "/CONKA_52.jpg";

  return (
    <section className={sectionClass}>
      <div className={containerClass}>
        {/* Header */}
        <div className="mb-12">
          <h2 className={headingClass}>
            Ingredients & Taste
          </h2>
          <p className={subheadingClass}>what&apos;s inside</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left: Image */}
          <div className="md:w-1/2">
            {ingredientImage ? (
              <div className="relative w-full h-80 md:h-[450px]">
                <Image
                  src={ingredientImage}
                  alt="Key ingredient"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="placeholder-box w-full h-80 md:h-[450px]">
                <span className="font-clinical text-sm">
                  [INGREDIENT IMAGE]
                </span>
              </div>
            )}
          </div>

          {/* Right: Formula Box */}
          <div className="md:w-1/2">
            <div className={boxClass}>
              <div className={boxInvertedClass}>
                <h3 className="text-2xl font-bold">{formula.name}</h3>
                {formula.patent ? (
                  <span className="font-clinical text-sm">
                    {formula.patent}
                  </span>
                ) : (
                  <span className="font-commentary text-lg">
                    {formula.tagline}
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="font-clinical text-sm mb-4 opacity-70">
                  FORMULA BREAKDOWN
                </p>

                <div className="space-y-3">
                  {formula.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-b border-current border-opacity-20 last:border-0"
                    >
                      <div>
                        <span className="font-medium">{ing.name}</span>
                        {ing.part && (
                          <span className="font-clinical text-sm opacity-70 ml-2">
                            – {ing.part}
                          </span>
                        )}
                      </div>
                      <span className="font-clinical font-medium">
                        {ing.percentage}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t-2 border-current border-opacity-20">
                  <div className="flex justify-between items-center">
                    <p className="font-clinical text-sm opacity-70">
                      tastes like
                    </p>
                    <p className="font-commentary text-xl">{formula.taste}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p className="font-clinical text-sm font-medium">
              Antioxidant Heavy
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <p className="font-clinical text-sm font-medium">Zero Calories</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
                <line x1="2" y1="8" x2="22" y2="8" />
              </svg>
            </div>
            <p className="font-clinical text-sm font-medium">No Caffeine</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <p className="font-clinical text-sm font-medium">Vegan Friendly</p>
          </div>
        </div>
      </div>
    </section>
  );
}
