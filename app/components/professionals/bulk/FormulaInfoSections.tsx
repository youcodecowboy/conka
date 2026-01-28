"use client";

import { FormulaId, formulaContent, FORMULA_COLORS } from "@/app/lib/productData";

interface FormulaInfoSectionsProps {
  formulaId: FormulaId;
}

export default function FormulaInfoSections({
  formulaId,
}: FormulaInfoSectionsProps) {
  const formula = formulaContent[formulaId];
  const accentColor = FORMULA_COLORS[formulaId];

  // Info icons
  const infoIcons = [
    <svg
      key="sleep"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>,
    <svg
      key="shield"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>,
    <svg
      key="energy"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
      <line x1="6" y1="7" x2="6" y2="5" />
      <line x1="10" y1="7" x2="10" y2="5" />
      <line x1="14" y1="7" x2="14" y2="5" />
      <line x1="18" y1="7" x2="18" y2="5" />
      <line x1="6" y1="11" x2="18" y2="11" />
    </svg>,
    <svg
      key="motivation"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>,
  ];

  return (
    <div className="space-y-8">
      {/* Info Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Info</h3>
        <div className="mb-4">
          <h4 className="text-lg font-bold mb-2">{formula.headline}</h4>
          <p className="font-commentary text-lg opacity-80">{formula.subheadline}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formula.keyPoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`${accentColor.text} flex-shrink-0 mt-0.5`}>
                {infoIcons[idx] || (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                )}
              </div>
              <span className="font-primary text-sm leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Benefits</h3>
        <div className="space-y-4">
          {formula.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className={`${accentColor.text} text-2xl font-bold font-clinical flex-shrink-0`}>
                {benefit.stat}
              </div>
              <div>
                <p className="font-bold">{benefit.title}</p>
                <p className="font-clinical text-xs opacity-70 mt-1">
                  {benefit.annotation}
                </p>
                <p className="text-sm opacity-80 mt-1">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingredients Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Ingredients</h3>
        <div className="space-y-2">
          {formula.ingredients.map((ing, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-2 border-b border-current/10 last:border-0"
            >
              <div>
                <span className="font-medium">{ing.name}</span>
                {ing.part && (
                  <span className="font-clinical text-sm opacity-70 ml-2">
                    – {ing.part}
                  </span>
                )}
              </div>
              <span className="font-clinical font-medium">{ing.percentage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Taste Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Taste</h3>
        <div className="flex items-center justify-between p-4 bg-current/5 rounded-lg mb-6">
          <p className="font-clinical text-sm opacity-70">Tastes Like:</p>
          <p className="font-commentary text-2xl">{formula.taste}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 mb-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            <p className="font-clinical text-xs font-medium">Antioxidant Heavy</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 mb-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            <p className="font-clinical text-xs font-medium">Zero Calories</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 mb-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            <p className="font-clinical text-xs font-medium">No Caffeine</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 mb-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            <p className="font-clinical text-xs font-medium">Vegan Friendly</p>
          </div>
        </div>
      </div>
    </div>
  );
}
