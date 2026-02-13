"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  AthleteData,
  getAthletesForFormula,
  getAthletesForProtocol,
} from "@/app/lib/caseStudiesData";
import type { ProductId, FormulaId, ProtocolId } from "@/app/lib/productData";

interface FormulaCaseStudiesProps {
  formulaId?: FormulaId;
  productId?: ProductId;
  athletes?: AthleteData[];
}

const METRIC_RING_COLORS = [
  { label: "Total", color: "#10b981" },
  { label: "Accuracy", color: "#3b82f6" },
  { label: "Speed", color: "#f59e0b" },
] as const;

function AthleteCard({ athlete }: { athlete: AthleteData }) {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const imagePosition =
    athlete.focalPoint != null
      ? `${athlete.focalPoint.x}% ${athlete.focalPoint.y}%`
      : "center";

  return (
    <article
      className="overflow-hidden flex flex-col rounded-[var(--premium-radius-base)] border border-[var(--premium-border-color)] h-full"
      style={{ color: "var(--color-base-black)" }}
    >
      {/* Image: fixed aspect ratio, rounded top corners, asset-ready */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-t-[var(--premium-radius-base)] bg-[var(--premium-surface)]">
        {athlete.photo ? (
          <img
            src={athlete.photo}
            alt={athlete.name}
            className="w-full h-full object-cover rounded-t-[var(--premium-radius-base)]"
            style={{ objectPosition: imagePosition }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-[var(--premium-space-xs)] text-current/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="premium-data text-[10px] uppercase tracking-wider">
              Photo
            </span>
          </div>
        )}
      </div>

      {/* Card body: showcase content (white, dark text) */}
      <div
        className="flex flex-1 flex-col p-[var(--premium-space-m)] gap-[var(--premium-space-s)] bg-white"
        style={{ color: "var(--color-base-black)" }}
      >
        <h3 className="premium-heading text-[var(--premium-font-heading-size)] font-bold leading-tight">
          {athlete.name}
        </h3>
        <p className="premium-data opacity-70 text-sm">
          {[athlete.position, athlete.organization].filter(Boolean).join(" • ")}
          {athlete.achievement != null && athlete.achievement !== ""
            ? ` · ${athlete.achievement}`
            : ""}
        </p>

        {/* Improvement rings: Total, Accuracy, Speed */}
        <div className="grid grid-cols-3 gap-[var(--premium-space-s)] py-[var(--premium-space-s)]">
          {METRIC_RING_COLORS.map(({ label, color }, idx) => {
            const result =
              label === "Total"
                ? (athlete.results.totalScore ?? 0)
                : label === "Accuracy"
                  ? (athlete.results.accuracy ?? 0)
                  : (athlete.results.speed ?? 0);
            const change = athlete.improvements[idx];
            return (
              <div
                key={label}
                className="flex flex-col items-center gap-[var(--premium-space-xs)]"
              >
                <div className="relative w-14 h-14 flex-shrink-0">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity={0.12}
                      strokeWidth="2"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeDasharray={`${result} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="premium-data text-xs font-semibold">
                      {result.toFixed(0)}
                    </span>
                  </div>
                </div>
                <span className="premium-data text-[10px] opacity-70">
                  {label}
                </span>
                {change != null && (
                  <span
                    className="premium-data text-[10px] font-medium"
                    style={{ color }}
                  >
                    {change.value}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Tests & period */}
        <div className="flex flex-wrap items-center gap-x-[var(--premium-space-m)] gap-y-[var(--premium-space-xs)] premium-data text-xs opacity-70">
          <span>{athlete.testsCompleted} tests</span>
          <span>{athlete.testingPeriod}</span>
          {athlete.protocolUsed != null && athlete.protocolUsed !== "" && (
            <span
              className="px-2 py-0.5 rounded-full bg-white border border-[var(--color-base-black)] premium-data text-xs"
              style={{ color: "var(--color-base-black)" }}
            >
              {athlete.protocolUsed}
            </span>
          )}
        </div>

        <div className={!descriptionExpanded ? "min-h-[4.5rem]" : ""}>
          <p
            className={`premium-body text-sm opacity-80 leading-relaxed ${!descriptionExpanded ? "line-clamp-3" : ""}`}
          >
            {athlete.description}
          </p>
          <button
            type="button"
            onClick={() => setDescriptionExpanded((prev) => !prev)}
            className="premium-data text-xs font-medium mt-[var(--premium-space-xs)] underline underline-offset-2 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-base-black)] focus-visible:ring-offset-1 rounded"
            style={{ color: "var(--color-base-black)" }}
          >
            {descriptionExpanded ? "Show less" : "Read more"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FormulaCaseStudies({
  formulaId,
  productId,
}: FormulaCaseStudiesProps) {
  // Determine athletes: use productId or formulaId
  let athletes: AthleteData[] = [];

  if (productId) {
    // Check if it's a protocol (1-4) or formula (01-02)
    if (
      productId === "1" ||
      productId === "2" ||
      productId === "3" ||
      productId === "4"
    ) {
      athletes = getAthletesForProtocol(productId as ProtocolId);
    } else if (productId === "01" || productId === "02") {
      athletes = getAthletesForFormula(productId as FormulaId);
    }
  } else if (formulaId) {
    athletes = getAthletesForFormula(formulaId);
  } else {
    throw new Error(
      "FormulaCaseStudies requires either formulaId or productId",
    );
  }

  if (athletes.length === 0) return null;

  return (
    <>
      <header className="mb-[var(--premium-space-l)] flex flex-col gap-[var(--premium-space-xs)]">
        <p className="premium-data text-xs uppercase tracking-wider premium-text-muted">
          Verified Results
        </p>
        <h2
          className="premium-section-heading"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          CONKA Case Studies
        </h2>
        <p className="premium-annotation premium-text-muted">
          real data, measured improvement
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--premium-space-m)]">
        {athletes.map((athlete) => (
          <AthleteCard key={athlete.id} athlete={athlete} />
        ))}
      </div>

      <div className="mt-[var(--premium-space-xl)] text-center">
        <Link
          href="/case-studies"
          className="inline-flex items-center justify-center gap-[var(--premium-space-s)] px-[var(--premium-space-l)] py-[var(--premium-space-s)] rounded-[var(--premium-radius-interactive)] border border-white text-white premium-body font-semibold text-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          View All Case Studies
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}

export function FormulaCaseStudiesMobile({
  formulaId,
  productId,
  athletes: providedAthletes,
}: FormulaCaseStudiesProps) {
  // Determine athletes: use provided, or compute based on productId/formulaId
  let athletes: AthleteData[] = [];

  if (providedAthletes) {
    athletes = providedAthletes;
  } else if (productId) {
    // Check if it's a protocol (1-4) or formula (01-02)
    if (
      productId === "1" ||
      productId === "2" ||
      productId === "3" ||
      productId === "4"
    ) {
      athletes = getAthletesForProtocol(productId as ProtocolId);
    } else if (productId === "01" || productId === "02") {
      athletes = getAthletesForFormula(productId as FormulaId);
    }
  } else if (formulaId) {
    athletes = getAthletesForFormula(formulaId);
  }

  if (athletes.length === 0) return null;

  const caseStudiesCarouselRef = useRef<HTMLDivElement>(null);
  const [caseStudiesCarouselIndex, setCaseStudiesCarouselIndex] = useState(0);

  return (
    <>
      <header className="mb-[var(--premium-space-l)] flex flex-col gap-[var(--premium-space-xs)]">
        <p className="premium-data text-xs uppercase tracking-wider premium-text-muted">
          Verified Results
        </p>
        <h2
          className="premium-section-heading"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          CONKA Case Studies
        </h2>
        <p className="premium-annotation premium-text-muted">
          real data, measured improvement
        </p>
      </header>

      {/* Swipeable horizontal carousel */}
      <div
        ref={caseStudiesCarouselRef}
        className="flex gap-[var(--premium-space-m)] overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
        role="region"
        aria-label="CONKA case studies - swipe to view all"
        onScroll={() => {
          const el = caseStudiesCarouselRef.current;
          if (!el) return;
          const cardWidth = el.offsetWidth * 0.85 + 24;
          const index = Math.min(
            athletes.length - 1,
            Math.max(0, Math.round(el.scrollLeft / cardWidth)),
          );
          setCaseStudiesCarouselIndex(index);
        }}
      >
        {athletes.map((athlete) => (
          <div
            key={athlete.id}
            className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center"
          >
            <AthleteCard athlete={athlete} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {athletes.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full bg-white transition-opacity ${
              caseStudiesCarouselIndex === idx ? "opacity-100" : "opacity-30"
            }`}
            aria-hidden
          />
        ))}
      </div>

      <div className="mt-[var(--premium-space-xl)] text-center">
        <Link
          href="/case-studies"
          className="inline-flex items-center justify-center gap-[var(--premium-space-s)] px-[var(--premium-space-l)] py-[var(--premium-space-s)] rounded-[var(--premium-radius-interactive)] border border-white text-white premium-body font-semibold text-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          View All Case Studies
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
