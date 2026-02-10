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
  const handleClick = (struggleId: StruggleId) => {
    if (selectedStruggle === struggleId) {
      onSelectStruggle(null);
    } else {
      onSelectStruggle(struggleId);
    }
  };

  const accentColor = FORMULA_COLORS[formulaId];

  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-8 md:px-12 md:py-10">
        <div className="flex flex-col items-end gap-6">
          <div className="text-right premium-stack-s">
            <h2 id="proof-and-science-heading" className="premium-heading text-white">
              Research by benefit
            </h2>
            <p className="premium-annotation text-white/70">
              Pick a focus to explore the research
            </p>
          </div>

          <div className="flex flex-wrap justify-end gap-3 md:flex-nowrap md:gap-4">
            {STRUGGLE_OPTIONS.map((struggle) => {
              const isSelected = selectedStruggle === struggle.id;

              return (
                <button
                  key={struggle.id}
                  onClick={() => handleClick(struggle.id)}
                  className={`
                    group px-4 py-2.5 md:px-5 md:py-3 rounded-[var(--premium-radius-interactive)]
                    transition-all duration-200 flex items-center gap-2
                    border
                    ${isSelected
                      ? "border-transparent text-white"
                      : "border-white/40 text-white hover:border-white/70 bg-transparent"
                    }
                  `}
                  style={isSelected ? { backgroundColor: accentColor.hex } : undefined}
                >
                  <StruggleIcon
                    icon={struggle.icon}
                    className={`transition-transform duration-200 group-hover:scale-110 ${isSelected ? "scale-110" : ""}`}
                  />
                  <span className="premium-body font-semibold text-sm md:text-base whitespace-nowrap">
                    {struggle.label}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedStruggle && (
            <div className="w-full flex justify-end mt-2">
              <button
                type="button"
                onClick={() => onSelectStruggle(null)}
                className="premium-data text-sm text-white/70 underline underline-offset-2 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
              >
                Clear selection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
