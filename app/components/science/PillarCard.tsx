"use client";

import { SciencePillar } from "@/app/lib/scienceData";

interface PillarCardProps {
  pillar: SciencePillar;
  index: number;
  total: number;
  isExpanded: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const icons = {
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  brain: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54" />
    </svg>
  ),
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
    </svg>
  ),
  heart: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

function formulaLabel(forFormula: "01" | "02" | "both"): string {
  if (forFormula === "01") return "CONKA Flow";
  if (forFormula === "02") return "CONKA Clear";
  return "Flow + Clear";
}

function formulaBadge(formula: "01" | "02" | "both"): string {
  if (formula === "01") return "F01";
  if (formula === "02") return "F02";
  return "BOTH";
}

export default function PillarCard({
  pillar,
  index,
  total,
  isExpanded,
  onToggle,
  isMobile = false,
}: PillarCardProps) {
  const headlineStat = pillar.keyStats[pillar.headlineStatIndex];
  const idLabel = `P-${String(index + 1).padStart(2, "0")}`;

  return (
    <div className="bg-white border border-black/12 overflow-hidden">
      {/* Header row — pillar counter + formula */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/45 tabular-nums">
          {idLabel} · Pillar {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1B2757] tabular-nums">
          {formulaLabel(pillar.forFormula)}
        </span>
      </div>

      {/* Collapsed body — always visible */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full text-left hover:bg-black/[0.02] active:bg-black/[0.03] transition-colors"
      >
        <div className={`grid grid-cols-[auto_1fr_auto] items-start gap-4 ${isMobile ? "p-4" : "p-5 lg:p-6"}`}>
          {/* Icon tile */}
          <div
            className="w-11 h-11 flex items-center justify-center text-white flex-shrink-0"
            style={{ backgroundColor: "#1B2757" }}
          >
            {icons[pillar.icon]}
          </div>

          {/* Content */}
          <div className="min-w-0">
            <h3
              className={`text-black font-semibold leading-tight mb-1 ${
                isMobile ? "text-base" : "text-lg lg:text-xl"
              }`}
            >
              {pillar.name}
            </h3>
            <p className="text-sm text-black/65 leading-relaxed">
              {pillar.tagline}
            </p>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="font-mono text-2xl font-bold tabular-nums text-[#1B2757] leading-none">
                {headlineStat.value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/55 tabular-nums">
                {headlineStat.label}
              </span>
            </div>
          </div>

          {/* Chevron */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={`transition-transform flex-shrink-0 text-black/45 mt-2 ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Expanded panel */}
      {isExpanded && (
        <div
          className={`border-t border-black/8 ${isMobile ? "p-4 space-y-5" : "p-5 lg:p-6 space-y-6"}`}
        >
          {/* Mechanism */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-2">
              Mechanism of action
            </p>
            <p className="text-sm text-black/75 leading-relaxed">
              {pillar.description}
            </p>
          </div>

          {/* Evidence grid — hairline data table */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
              The evidence · PubMed-linked
            </p>
            <div
              className={`grid border border-black/12 ${
                isMobile ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {pillar.keyStats.map((stat, idx) => {
                const col = isMobile ? idx % 2 : idx % 4;
                const row = isMobile ? Math.floor(idx / 2) : 0;
                const isLastCol = isMobile ? col === 1 : col === 3;
                const isLastRow = isMobile
                  ? row === Math.floor((pillar.keyStats.length - 1) / 2)
                  : true;
                return (
                  <div
                    key={idx}
                    className={`p-3 lg:p-4 bg-white ${
                      !isLastCol ? "border-r border-black/8" : ""
                    } ${!isLastRow ? "border-b border-black/8" : ""}`}
                  >
                    <p className="font-mono text-2xl lg:text-3xl font-bold tabular-nums text-[#1B2757] leading-none">
                      {stat.value}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/55 tabular-nums mt-2 leading-tight">
                      {stat.label}
                    </p>
                    <p className="text-[11px] text-black/55 leading-snug mt-2">
                      {stat.translation}
                    </p>
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${stat.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1B2757] hover:underline tabular-nums mt-3 inline-flex items-center min-h-[24px]"
                    >
                      PMID {stat.pmid} ↗
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
              Key ingredients
            </p>
            <div className="border border-black/12 bg-white">
              {pillar.ingredients.map((ingredient, idx) => (
                <div
                  key={idx}
                  className={`flex items-baseline justify-between gap-4 px-4 py-3 ${
                    idx < pillar.ingredients.length - 1
                      ? "border-b border-black/8"
                      : ""
                  }`}
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-[10px] text-black/35 tabular-nums flex-shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-black truncate">
                        {ingredient.name}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/55 tabular-nums leading-tight mt-0.5">
                        {ingredient.role}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#1B2757] bg-[#1B2757]/6 border border-[#1B2757]/20 px-2 py-0.5 tabular-nums flex-shrink-0">
                    {formulaBadge(ingredient.formula)}
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
