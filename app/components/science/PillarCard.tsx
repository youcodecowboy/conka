"use client";

import { SciencePillar } from "@/app/lib/scienceData";

interface PillarCardProps {
  pillar: SciencePillar;
  isExpanded: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

// Icon components
const icons = {
  shield: (
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
  ),
  brain: (
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
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54" />
    </svg>
  ),
  sparkles: (
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
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
    </svg>
  ),
  heart: (
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  clock: (
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
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

export default function PillarCard({
  pillar,
  isExpanded,
  onToggle,
  isMobile = false,
}: PillarCardProps) {
  const formulaLabel =
    pillar.forFormula === "01"
      ? "Conka Flow"
      : pillar.forFormula === "02"
      ? "Conka Clarity"
      : "Both Formulas";

  const formulaColor =
    pillar.forFormula === "01"
      ? "bg-amber-500"
      : pillar.forFormula === "02"
      ? "bg-[#AAB9BC]"
      : "bg-gradient-to-r from-amber-500 to-[#AAB9BC]";

  return (
    <div className="neo-box overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className={`w-full text-left hover:bg-current/5 transition-colors ${
          isMobile ? "p-4" : "p-6"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`${pillar.color} text-white p-3 rounded-lg flex-shrink-0`}
            >
              {icons[pillar.icon]}
            </div>
            {/* Title */}
            <div>
              <h3 className={`font-bold ${isMobile ? "text-lg" : "text-xl"}`}>
                {pillar.name}
              </h3>
              <p className="font-commentary text-sm opacity-70 mt-0.5">
                {pillar.tagline}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`w-2 h-2 rounded-full ${formulaColor}`}
                ></span>
                <span className="font-clinical text-xs opacity-50">
                  {formulaLabel}
                </span>
              </div>
            </div>
          </div>
          {/* Expand Icon */}
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
            className={`transition-transform flex-shrink-0 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div
          className={`border-t-2 border-current/10 ${
            isMobile ? "p-4" : "p-6"
          }`}
        >
          {/* Description */}
          <div className="mb-6">
            <p className="font-clinical text-xs uppercase opacity-50 mb-2">
              What Is It?
            </p>
            <p className={`${isMobile ? "text-sm" : "text-base"} leading-relaxed`}>
              {pillar.description}
            </p>
          </div>

          {/* Mechanism */}
          <div className="mb-6 neo-box p-4">
            <p className="font-clinical text-xs uppercase opacity-50 mb-2">
              How It Works
            </p>
            <p className="text-sm leading-relaxed opacity-80">
              {pillar.mechanism}
            </p>
          </div>

          {/* Key Stats */}
          <div className="mb-6">
            <p className="font-clinical text-xs uppercase opacity-50 mb-3">
              Clinical Evidence
            </p>
            <div
              className={`grid gap-3 ${
                isMobile ? "grid-cols-2" : "grid-cols-4"
              }`}
            >
              {pillar.keyStats.map((stat, idx) => (
                <div key={idx} className="neo-box p-3 text-center">
                  <p className="text-2xl font-bold font-clinical text-amber-600">
                    {stat.value}
                  </p>
                  <p className="font-clinical text-xs opacity-70 mt-1">
                    {stat.label}
                  </p>
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${stat.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-clinical text-[10px] text-amber-500 hover:underline mt-1 block"
                  >
                    PMID: {stat.pmid}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <p className="font-clinical text-xs uppercase opacity-50 mb-3">
              Key Ingredients
            </p>
            <div className="space-y-2">
              {pillar.ingredients.map((ingredient, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 border-2 border-current/10 rounded"
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      ingredient.formula === "01"
                        ? "bg-amber-500"
                        : ingredient.formula === "02"
                        ? "bg-[#AAB9BC]"
                        : "bg-gradient-to-r from-amber-500 to-[#AAB9BC]"
                    }`}
                  ></span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{ingredient.name}</p>
                    <p className="font-clinical text-xs opacity-70">
                      {ingredient.role}
                    </p>
                  </div>
                  <span className="font-clinical text-[10px] opacity-50">
                    {ingredient.formula === "01"
                      ? "F01"
                      : ingredient.formula === "02"
                      ? "F02"
                      : "BOTH"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

