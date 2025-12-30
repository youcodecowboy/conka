"use client";

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

interface IngredientsMobileProps {
  activeFormula: "01" | "02";
  setActiveFormula: (formula: "01" | "02") => void;
  formulaContent: {
    "01": FormulaContent;
    "02": FormulaContent;
  };
}

export default function IngredientsMobile({
  activeFormula,
  setActiveFormula,
  formulaContent,
}: IngredientsMobileProps) {
  const currentFormula = formulaContent[activeFormula];

  return (
    <section className="px-6 pt-4 pb-10">
      {/* Header - Left Aligned */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-1">Ingredients & Taste</h2>
        <p className="font-commentary text-lg">what&apos;s inside</p>
      </div>

      {/* Formula Toggle - Slim Side-by-Side Buttons */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setActiveFormula("01")}
          className={`flex-1 py-1.5 px-4 rounded-full border-2 border-black transition-all text-center ${
            activeFormula === "01"
              ? "bg-black text-white"
              : "bg-transparent text-black"
          }`}
        >
          <span className="font-clinical text-sm font-medium">Conka Flow</span>
        </button>
        <button
          onClick={() => setActiveFormula("02")}
          className={`flex-1 py-1.5 px-4 rounded-full border-2 border-black transition-all text-center ${
            activeFormula === "02"
              ? "bg-black text-white"
              : "bg-transparent text-black"
          }`}
        >
          <span className="font-clinical text-sm font-medium">Conka Clarity</span>
        </button>
      </div>

      {/* Formula Title Bar */}
      <div className="bg-black text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="text-lg font-bold">{currentFormula.name}</h3>
        {currentFormula.patent ? (
          <span className="font-clinical text-xs">{currentFormula.patent}</span>
        ) : (
          <span className="font-commentary text-sm">{currentFormula.tagline}</span>
        )}
      </div>

      {/* Ingredients Table */}
      <div className="border-2 border-t-0 border-black rounded-b-lg">
        <div className="p-4">
          <p className="font-clinical text-xs mb-3 opacity-70 uppercase tracking-wider">Formula Breakdown</p>
          
          <div className="space-y-0">
            {currentFormula.ingredients.map((ing, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-2.5 border-b border-black/10 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm">{ing.name}</span>
                  {ing.part && (
                    <span className="font-clinical text-xs opacity-60 ml-1.5">– {ing.part}</span>
                  )}
                </div>
                <span className="font-clinical text-sm font-medium ml-3">{ing.percentage}</span>
              </div>
            ))}
          </div>

          {/* Taste Info */}
          <div className="mt-4 pt-4 border-t-2 border-black/20">
            <div className="flex justify-between items-center">
              <p className="font-clinical text-xs opacity-70 uppercase">tastes like</p>
              <p className="font-commentary text-lg">{currentFormula.taste}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Grid - 2x2 */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 p-3 bg-black/5 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <p className="font-clinical text-xs font-medium">Antioxidant Heavy</p>
        </div>
        <div className="flex items-center gap-2 p-3 bg-black/5 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <p className="font-clinical text-xs font-medium">Zero Calories</p>
        </div>
        <div className="flex items-center gap-2 p-3 bg-black/5 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
              <line x1="6" y1="1" x2="6" y2="4"/>
              <line x1="10" y1="1" x2="10" y2="4"/>
              <line x1="14" y1="1" x2="14" y2="4"/>
              <line x1="2" y1="8" x2="22" y2="8"/>
            </svg>
          </div>
          <p className="font-clinical text-xs font-medium">No Caffeine</p>
        </div>
        <div className="flex items-center gap-2 p-3 bg-black/5 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </div>
          <p className="font-clinical text-xs font-medium">Vegan Friendly</p>
        </div>
      </div>
    </section>
  );
}

