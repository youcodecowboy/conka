"use client";

import { SciencePillar } from "@/app/lib/scienceData";

interface PillarCardProps {
  pillar: SciencePillar;
  isExpanded: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

// Map pillar color class to background style (neural blue palette where possible)
function getIconBgStyle(colorClass: string): React.CSSProperties {
  // Use neural blue for amber/emerald-like accents; keep others distinct
  if (
    colorClass === "bg-amber-500" ||
    colorClass === "bg-emerald-500" ||
    colorClass === "bg-purple-500"
  ) {
    return { backgroundColor: "var(--brand-accent)" };
  }
  if (colorClass === "bg-blue-500" || colorClass === "bg-red-500") {
    return { backgroundColor: "var(--brand-accent)" };
  }
  return { backgroundColor: "var(--brand-accent)" };
}

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
      ? "CONKA Flow"
      : pillar.forFormula === "02"
        ? "CONKA Clear"
        : "Both Formulas";

  const formulaDotStyle: React.CSSProperties =
    pillar.forFormula === "01"
      ? { backgroundColor: "var(--brand-accent)" }
      : pillar.forFormula === "02"
        ? { backgroundColor: "var(--brand-neutral)" }
        : {
            background:
              "linear-gradient(to right, var(--brand-accent), var(--brand-neutral))",
          };

  return (
    <div
      className="brand-card-bordered overflow-hidden"
      style={{ borderRadius: "var(--brand-radius-card)" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`w-full text-left hover:opacity-90 transition-opacity ${
          isMobile ? "p-4" : "p-6"
        }`}
      >
        <div className="flex flex-col gap-3">
          {/* Icon on its own line */}
          <div
            className="text-white p-3 rounded-lg w-fit self-center"
            style={{
              ...getIconBgStyle(pillar.color),
              borderRadius: "var(--brand-radius-container)",
            }}
          >
            {icons[pillar.icon]}
          </div>
          {/* Title and dropdown in a row */}
          <div className="flex items-start justify-between gap-4">
            <h3 className={`brand-h3 flex-1 min-w-0 ${isMobile ? "text-lg" : "text-xl"}`}>
              {pillar.name}
            </h3>
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
          {/* Tagline / description */}
          <p className="brand-body opacity-70">
            {pillar.tagline}
          </p>
          {/* Formula label */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={formulaDotStyle}
            />
            <span className="brand-caption opacity-50">
              {formulaLabel}
            </span>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div
          className={`border-t border-[var(--brand-stroke)] ${isMobile ? "p-4 space-y-4" : "p-6 space-y-6"}`}
        >
          <div className={isMobile ? "" : "mb-6"}>
            <p className="brand-caption uppercase opacity-50 mb-2">
              What Is It?
            </p>
            <p
              className={`brand-body${isMobile ? "text-sm" : "text-base"}`}
              style={{ lineHeight: "var(--brand-body-leading)" }}
            >
              {pillar.description}
            </p>
          </div>

          <div
            className={
              isMobile
                ? "brand-card-bordered"
                : "p-4 rounded-[var(--brand-radius-container)] border border-[var(--brand-stroke)]"
            }
            style={isMobile ? undefined : { backgroundColor: "var(--brand-tint)" }}
          >
            <p className="brand-caption uppercase opacity-50 mb-2">
              How It Works
            </p>
            <p
              className="brand-caption leading-relaxed opacity-80"
              style={{ lineHeight: "var(--brand-body-leading)" }}
            >
              {pillar.mechanism}
            </p>
          </div>

          <div className={isMobile ? "" : "mb-6"}>
            <p className="brand-caption uppercase opacity-50 mb-3">
              Clinical Evidence
            </p>
            <div
              className={`grid gap-2 md:gap-3 ${
                isMobile ? "grid-cols-2" : "grid-cols-4"
              }`}
            >
              {pillar.keyStats.map((stat, idx) => (
                <div
                  key={idx}
                  className={
                    isMobile
                      ? "brand-card-bordered text-center"
                      : "p-3 text-center rounded-[var(--brand-radius-container)] border border-[var(--brand-stroke)]"
                  }
                  style={isMobile ? undefined : { backgroundColor: "var(--brand-tint)" }}
                >
                  <p
                    className="text-2xl font-bold font-clinical"
                    style={{ color: "var(--brand-accent)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="brand-caption opacity-70 mt-1">
                    {stat.label}
                  </p>
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${stat.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-caption hover:underline mt-1 block"
                    style={{
                      fontSize: "10px",
                      color: "var(--brand-accent)",
                    }}
                  >
                    PMID: {stat.pmid}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="brand-caption uppercase opacity-50 mb-3">
              Key Ingredients
            </p>
            <div className="space-y-2">
              {pillar.ingredients.map((ingredient, idx) => (
                <div
                  key={idx}
                  className={
                    isMobile
                      ? "brand-card-bordered flex items-center gap-3"
                      : "flex items-center gap-3 p-3 rounded-[var(--brand-radius-container)] border border-[var(--brand-stroke)]"
                  }
                  style={isMobile ? undefined : { backgroundColor: "var(--brand-tint)" }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={
                      ingredient.formula === "01"
                        ? { backgroundColor: "var(--brand-accent)" }
                        : ingredient.formula === "02"
                          ? { backgroundColor: "var(--brand-neutral)" }
                          : {
                              background:
                                "linear-gradient(to right, var(--brand-accent), var(--brand-neutral))",
                            }
                    }
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{ingredient.name}</p>
                    <p className="brand-caption opacity-70">
                      {ingredient.role}
                    </p>
                  </div>
                  <span className="brand-caption opacity-50">
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
