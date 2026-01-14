"use client";

import Image from "next/image";

interface Ingredient {
  name: string;
  part: string;
  percentage: string;
}

interface FormulaContent {
  name: string;
  tagline: string;
  patent?: string;
  ingredients: Ingredient[];
  taste: string;
}

interface IngredientsDesktopProps {
  activeFormula: "01" | "02";
  setActiveFormula: (formula: "01" | "02") => void;
  formulaContent: {
    "01": FormulaContent;
    "02": FormulaContent;
  };
}

export default function IngredientsDesktop({
  activeFormula,
  setActiveFormula,
  formulaContent,
}: IngredientsDesktopProps) {
  const currentFormula = formulaContent[activeFormula];

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header with Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Ingredients & Taste
            </h2>
            <p className="font-commentary text-xl">what&apos;s inside</p>
          </div>
          {/* Formula Toggle */}
          <div className="flex gap-3">
            <button
              onClick={() => setActiveFormula("01")}
              className={`px-6 py-2 rounded-full border-2 border-black transition-all ${
                activeFormula === "01"
                  ? "bg-black text-white"
                  : "bg-transparent text-black hover:bg-black/10"
              }`}
            >
              <span className="font-clinical text-sm font-medium">
                Conka Flow
              </span>
            </button>
            <button
              onClick={() => setActiveFormula("02")}
              className={`px-6 py-2 rounded-full border-2 border-black transition-all ${
                activeFormula === "02"
                  ? "bg-black text-white"
                  : "bg-transparent text-black hover:bg-black/10"
              }`}
            >
              <span className="font-clinical text-sm font-medium">
                Conka Clarity
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left: Image */}
          <div className="md:w-1/2">
            {activeFormula === "01" ? (
              <div className="relative w-full h-80 md:h-[450px]">
                <Image
                  src="/tumeric.jpg"
                  alt="Turmeric ingredient"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full h-80 md:h-[450px]">
                <Image
                  src="/Walnuts.jpg"
                  alt="Walnuts ingredient"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Right: Formula Box */}
          <div className="md:w-1/2">
            <div className="neo-box">
              <div className="neo-box-inverted p-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold">{currentFormula.name}</h3>
                {currentFormula.patent ? (
                  <span className="font-clinical text-sm">
                    {currentFormula.patent}
                  </span>
                ) : (
                  <span className="font-commentary text-lg">
                    {currentFormula.tagline}
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="font-clinical text-sm mb-4 opacity-70">
                  FORMULA BREAKDOWN
                </p>

                <div className="space-y-3">
                  {currentFormula.ingredients.map((ing, idx) => (
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
                    <p className="font-commentary text-xl">
                      {currentFormula.taste}
                    </p>
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
