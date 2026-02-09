"use client";

import { StruggleId, STRUGGLE_OPTIONS, FormulaId, FORMULA_COLORS } from "@/app/lib/productData";
import { StruggleIcon } from "./StruggleIcons";

interface StruggleSelectorProps {
  formulaId: FormulaId;
  selectedStruggle: StruggleId | null;
  onSelectStruggle: (struggle: StruggleId | null) => void;
}

export default function StruggleSelector({
  formulaId,
  selectedStruggle,
  onSelectStruggle,
}: StruggleSelectorProps) {
  const accentColor = FORMULA_COLORS[formulaId];
  const isDark = false;

  const handleClick = (struggleId: StruggleId) => {
    if (selectedStruggle === struggleId) {
      onSelectStruggle(null);
    } else {
      onSelectStruggle(struggleId);
    }
  };

  return (
    <div className="premium-section">
      <div className="premium-container">
        <div className="text-center premium-stack-m">
          <h2 className="premium-heading premium-stack-s">
            What do you struggle with?
          </h2>
          <p className="premium-annotation opacity-70">
            select your challenge below
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:flex-nowrap md:gap-4">
          {STRUGGLE_OPTIONS.map((struggle) => {
            const isSelected = selectedStruggle === struggle.id;

            return (
              <button
                key={struggle.id}
                onClick={() => handleClick(struggle.id)}
                className={`
                  group px-4 py-2.5 md:px-5 md:py-3 rounded-[var(--premium-radius-interactive)] border-2
                  transition-all duration-300 flex items-center gap-2
                  ${isDark
                    ? isSelected
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white/60 hover:border-white hover:bg-white/10"
                    : isSelected
                      ? "bg-black text-white border-black"
                      : "bg-transparent text-black border-black/60 hover:border-black hover:bg-black/5"
                  }
                `}
              >
                <StruggleIcon
                  icon={struggle.icon}
                  className={`transition-transform duration-300 group-hover:scale-110 ${isSelected ? "scale-110" : ""}`}
                />
                <span className="premium-body font-semibold text-sm md:text-base whitespace-nowrap">
                  {struggle.label}
                </span>
              </button>
            );
          })}
        </div>

        {selectedStruggle && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => onSelectStruggle(null)}
              className="premium-data text-sm underline underline-offset-2 opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 rounded"
            >
              Clear selection
            </button>
          </div>
        )}

        {!selectedStruggle && (
          <p className="premium-data text-sm mt-6 text-center opacity-50">
            Click a button above to see how we can help
          </p>
        )}
      </div>
    </div>
  );
}
