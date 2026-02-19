"use client";

import Image from "next/image";
import { FormulaId, StruggleId, STRUGGLE_OPTIONS, formulaContent, FORMULA_COLORS } from "@/app/lib/productData";
import { StruggleIcon } from "./StruggleIcons";

interface BenefitListProps {
  formulaId: FormulaId;
  selectedStruggle: StruggleId;
  onSelect: (id: StruggleId) => void;
}

export default function BenefitList({
  formulaId,
  selectedStruggle,
  onSelect,
}: BenefitListProps) {
  const formula = formulaContent[formulaId];
  const accentColor = FORMULA_COLORS[formulaId];
  
  // Get formula name for pill
  const formulaName = formulaId === "01" ? "CONKA Flow" : "CONKA Clear";

  const handleKeyDown = (e: React.KeyboardEvent, struggleId: StruggleId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(struggleId);
    }
  };

  const currentSolution = formula.struggleSolutions[selectedStruggle];

  // Desktop: Vertical list + ingredient asset card
  const desktopList = (
    <div className="hidden lg:block">
      <div
        className="rounded-[40px] overflow-hidden"
        style={{ 
          border: "1px solid var(--color-premium-stroke)",
          background: "var(--color-bone)"
        }}
      >
        <div style={{ padding: "2em" }} className="space-y-2">
          {STRUGGLE_OPTIONS.map((struggle) => {
            const isSelected = selectedStruggle === struggle.id;
            const solution = formula.struggleSolutions[struggle.id];
            const stat = solution?.stat || "";

            return (
              <button
                key={struggle.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => onSelect(struggle.id)}
                onKeyDown={(e) => handleKeyDown(e, struggle.id)}
                className={`
                  flex items-center gap-3 px-4 py-3.5 rounded-[20px] cursor-pointer 
                  transition-all duration-200 w-full text-left
                  ${isSelected
                    ? "bg-[var(--color-ink)] text-white"
                    : "bg-white border border-[var(--color-premium-stroke)] hover:bg-[var(--color-premium-bg-soft)]"
                  }
                `}
              >
                {/* Icon */}
                <div className={`w-5 h-5 flex-shrink-0 ${isSelected ? "text-white" : "opacity-60"}`}>
                  <StruggleIcon icon={struggle.icon} />
                </div>

                {/* Benefit name */}
                <span className={`premium-body font-medium flex-1 ${isSelected ? "text-white" : "text-[var(--color-ink)]"}`}>
                  {struggle.label}
                </span>

                {/* Spacer */}
                <span className="flex-1" />

                {/* Stat */}
                <span className={`font-bold ${isSelected ? "text-white" : accentColor.text}`}>
                  {stat}
                </span>

                {/* Chevron */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 transition-opacity duration-200 ${
                    isSelected ? "text-white opacity-90" : "opacity-30"
                  }`}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ingredient asset card — updates with active benefit */}
      {currentSolution?.ingredientAsset && (
        <div
          key={`ingredient-${selectedStruggle}`}
          className="mt-4 rounded-[24px] overflow-hidden [animation:fadeIn_0.3s_ease]"
          style={{ border: "1px solid var(--color-premium-stroke)" }}
        >
          {/* Square image */}
          <div className="relative w-full aspect-[2/1] bg-[var(--color-premium-bg-soft)]">
            <Image
              src={currentSolution.ingredientAsset.image}
              alt={currentSolution.ingredientAsset.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Label strip */}
          <div
            className="px-4 py-3"
            style={{ background: "var(--color-bone)" }}
          >
            <p className="premium-body-sm font-medium text-[var(--color-ink)]">
              {currentSolution.ingredientAsset.name}
            </p>
            <p className="premium-body-sm opacity-50 text-[var(--color-ink)]">
              {currentSolution.ingredientAsset.dosage}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  // Tablet/Mobile: Horizontal pill row
  const mobilePills = (
    <div className="lg:hidden overflow-x-auto flex gap-2 pb-2">
      {STRUGGLE_OPTIONS.map((struggle) => {
        const isSelected = selectedStruggle === struggle.id;

        return (
          <button
            key={struggle.id}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            onClick={() => onSelect(struggle.id)}
            onKeyDown={(e) => handleKeyDown(e, struggle.id)}
            className={`
              px-4 py-2 rounded-full text-sm flex items-center gap-1.5 whitespace-nowrap
              transition-all duration-200
              ${isSelected
                ? "bg-[var(--color-ink)] text-[var(--color-bone)]"
                : "bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)]"
              }
            `}
          >
            {/* Icon */}
            <div className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-[var(--color-bone)]" : accentColor.text}`}>
              <StruggleIcon icon={struggle.icon} />
            </div>

            {/* Label */}
            <span>{struggle.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {desktopList}
      {mobilePills}
    </>
  );
}
