"use client";

import { StruggleId, STRUGGLE_OPTIONS, FormulaId, FORMULA_COLORS } from "@/app/lib/productData";

interface StruggleSelectorProps {
  formulaId: FormulaId;
  selectedStruggle: StruggleId | null;
  onSelectStruggle: (struggle: StruggleId) => void;
}

// Icon components for each struggle type
const StruggleIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const iconClass = `w-5 h-5 ${className || ""}`;
  
  switch (icon) {
    case "moon":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      );
    case "bolt":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      );
    case "battery-low":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/>
          <line x1="23" y1="13" x2="23" y2="11"/>
          <line x1="5" y1="10" x2="5" y2="14"/>
        </svg>
      );
    case "heart-pulse":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
          <path d="M12 6l-2 4h4l-2 4"/>
        </svg>
      );
    case "brain":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2"/>
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2"/>
        </svg>
      );
    case "target":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function StruggleSelector({
  formulaId,
  selectedStruggle,
  onSelectStruggle,
}: StruggleSelectorProps) {
  const accentColor = FORMULA_COLORS[formulaId];
  const isDark = false; // Both formulas use light mode

  return (
    <div className="py-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Question Header */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          What do you struggle with?
        </h2>
        <p className="font-commentary text-xl mb-10 opacity-70">
          select your challenge below
        </p>

        {/* Struggle Buttons Grid */}
        <div className="flex flex-wrap justify-center gap-3 md:flex-nowrap md:gap-3">
          {STRUGGLE_OPTIONS.map((struggle) => {
            const isSelected = selectedStruggle === struggle.id;
            
            return (
              <button
                key={struggle.id}
                onClick={() => onSelectStruggle(struggle.id)}
                className={`
                  group px-4 py-2.5 md:px-5 md:py-3 rounded-full border-2 
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
                  className={`
                    transition-transform duration-300 group-hover:scale-110
                    ${isSelected ? "scale-110" : ""}
                  `}
                />
                <span className="font-primary font-semibold text-sm md:text-base whitespace-nowrap">
                  {struggle.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Helper text */}
        {!selectedStruggle && (
          <p className="font-clinical text-sm mt-8 opacity-50">
            Click a button above to see how we can help
          </p>
        )}
      </div>
    </div>
  );
}

