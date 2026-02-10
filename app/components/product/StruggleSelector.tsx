"use client";

import { StruggleId, STRUGGLE_OPTIONS, FormulaId } from "@/app/lib/productData";
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

  return (
    <div className="premium-section">
      <div className="premium-container">
        <div className="text-center premium-stack-m">
          <h2 id="proof-and-science-heading" className="premium-heading premium-stack-s">
            Research by benefit
          </h2>
          <p className="premium-annotation opacity-70">
            Pick a focus to explore the research
          </p>
        </div>

        <div
          className="rounded-[var(--premium-radius-base)] p-6"
          style={{ background: "var(--premium-surface)" }}
        >
          <div className="flex flex-wrap justify-center gap-3 md:flex-nowrap md:gap-4">
            {STRUGGLE_OPTIONS.map((struggle) => {
              const isSelected = selectedStruggle === struggle.id;

              return (
                <button
                  key={struggle.id}
                  onClick={() => handleClick(struggle.id)}
                  className={`
                    group px-4 py-2.5 md:px-5 md:py-3 rounded-[var(--premium-radius-interactive)]
                    transition-all duration-200 flex items-center gap-2
                    border border-[var(--premium-border-color)]
                    ${isSelected
                      ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                      : "bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--foreground)]/40"
                    }
                  `}
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
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => onSelectStruggle(null)}
                className="premium-data text-sm underline underline-offset-2 opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 rounded"
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
