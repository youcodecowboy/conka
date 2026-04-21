"use client";

import Image from "next/image";
import {
  FormulaId,
  StruggleId,
  STRUGGLE_OPTIONS,
  formulaContent,
  FORMULA_COLORS,
} from "@/app/lib/productData";
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
      {/* Benefit spec list — flat hairline container */}
      <div className="bg-white border border-black/12">
        {/* Header row */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-black/8">
          <span className="font-mono text-[11px] font-bold tabular-nums text-black/40">
            BENEFITS
          </span>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
            {STRUGGLE_OPTIONS.length} Outcomes
          </span>
        </div>

        {/* Rows */}
        <ul>
          {STRUGGLE_OPTIONS.map((struggle, i) => {
            const isSelected = selectedStruggle === struggle.id;
            const isLast = i === STRUGGLE_OPTIONS.length - 1;
            const solution = formula.struggleSolutions[struggle.id];
            const stat = solution?.stat || "";

            return (
              <li key={struggle.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelect(struggle.id)}
                  onKeyDown={(e) => handleKeyDown(e, struggle.id)}
                  className={`group flex items-center gap-3 w-full text-left px-5 py-4 min-h-[44px] transition-colors duration-150 ${
                    isSelected
                      ? "bg-[var(--brand-accent)] text-white"
                      : "bg-white hover:bg-[var(--brand-tint)] text-black"
                  } ${isLast ? "" : "border-b border-black/8"}`}
                >
                  {/* Row counter */}
                  <span
                    className={`font-mono text-[10px] font-bold tabular-nums leading-none shrink-0 ${
                      isSelected ? "text-white/70" : "text-black/35"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-5 h-5 shrink-0 flex items-center justify-center ${
                      isSelected ? "text-white" : "text-black/60"
                    }`}
                  >
                    <StruggleIcon icon={struggle.icon} />
                  </div>

                  {/* Label */}
                  <span
                    className={`brand-body flex-1 font-medium ${
                      isSelected ? "text-white" : "text-black"
                    }`}
                  >
                    {struggle.label}
                  </span>

                  {/* Stat — mono tabular-nums */}
                  <span
                    className={`font-mono text-sm font-bold tabular-nums shrink-0 ${
                      isSelected
                        ? "text-white"
                        : accentColor.text
                    }`}
                  >
                    {stat}
                  </span>

                  {/* Chevron */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 transition-opacity duration-150 ${
                      isSelected
                        ? "text-white opacity-90"
                        : "text-black/30 group-hover:opacity-60"
                    }`}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Ingredient asset — flat hairline card with lab-asset-frame photo */}
      {currentSolution?.ingredientAsset && (
        <div
          key={`ingredient-${selectedStruggle}`}
          className="mt-6 bg-white border border-black/12 [animation:fadeIn_0.3s_ease]"
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/8">
            <span className="font-mono text-[11px] font-bold tabular-nums text-black/40">
              INGREDIENT
            </span>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Key Actives
            </span>
          </div>

          {/* Photo */}
          <div className="px-4 pt-4">
            <div className="relative w-full aspect-[2/1] overflow-hidden bg-[var(--brand-tint)]">
              <Image
                src={currentSolution.ingredientAsset.image}
                alt={currentSolution.ingredientAsset.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </div>
          </div>

          {/* Mono label strip */}
          <div className="px-4 pt-4 pb-4">
            <p className="text-base font-semibold text-black leading-tight">
              {currentSolution.ingredientAsset.name}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mt-1.5 leading-tight">
              {currentSolution.ingredientAsset.dosage}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  // Tablet/Mobile: squared segmented row
  const mobilePills = (
    <div className="lg:hidden overflow-x-auto flex gap-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {STRUGGLE_OPTIONS.map((struggle) => {
        const isSelected = selectedStruggle === struggle.id;

        return (
          <button
            key={struggle.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(struggle.id)}
            onKeyDown={(e) => handleKeyDown(e, struggle.id)}
            className={`px-4 py-2 min-h-[44px] flex items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors duration-150 ${
              isSelected
                ? "bg-[var(--brand-accent)] text-white border-[var(--brand-accent)]"
                : "bg-white text-black border-black/12"
            }`}
          >
            <div
              className={`w-4 h-4 shrink-0 ${
                isSelected ? "text-white" : "text-black/60"
              }`}
            >
              <StruggleIcon icon={struggle.icon} />
            </div>
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
