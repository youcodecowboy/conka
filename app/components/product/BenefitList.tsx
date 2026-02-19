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
      <div className="space-y-2 rounded-[var(--premium-radius-card)]" style={{ border: "1px solid var(--color-premium-stroke)", padding: "2em" }}>
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
                  ? "bg-[var(--color-ink)] text-[var(--color-bone)]"
                  : "bg-white border border-[var(--color-premium-stroke)] hover:bg-[var(--color-premium-bg-soft)]"
                }
              `}
            >
              {/* Icon */}
              <div className={`w-5 h-5 flex-shrink-0 ${isSelected ? accentColor.text : "opacity-60"}`}>
                <StruggleIcon icon={struggle.icon} />
              </div>

              {/* Benefit name */}
              <span className="premium-body flex-1">
                {struggle.label}
              </span>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Stat */}
              <span className={`font-bold ${isSelected ? "text-[var(--color-bone)]" : accentColor.text}`}>
                {stat}
              </span>

              {/* Formula pill */}
              <span
                className={`
                  px-2 py-0.5 rounded-full text-xs font-medium ml-2
                  ${isSelected
                    ? "bg-[var(--color-bone)] text-[var(--color-ink)]"
                    : ""}
                `}
                style={!isSelected ? {
                  backgroundColor: `${accentColor.hex}26`, // 15% opacity (hex alpha)
                  color: accentColor.hex,
                } : undefined}
              >
                {formulaName}
              </span>
            </button>
          );
        })}
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
