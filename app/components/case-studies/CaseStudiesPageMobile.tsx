"use client";

import { useState, useEffect } from "react";
import {
  SportCategory,
  SPORT_INFO,
  athletes,
  getCaseStudyPhotoPath,
  getAllSports,
  getAverageImprovementAcrossAll,
} from "@/app/lib/caseStudiesData";
import SportIcon from "./SportIcon";

const STAT_LABELS = ["Total", "Accuracy", "Speed"];

function ProductBadge({ version }: { version?: "01" | "02" | "both" }) {
  if (!version) return null;
  const getLabel = () => {
    switch (version) {
      case "01":
        return "CONKA Flow";
      case "02":
        return "CONKA Clear";
      case "both":
        return "Flow + Clear";
    }
  };
  const getColor = () => {
    switch (version) {
      case "01":
        return "bg-amber-500";
      case "02":
        return "bg-[#AAB9BC]";
      case "both":
        return "bg-gradient-to-r from-amber-500 to-[#AAB9BC]";
    }
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-clinical font-medium text-white ${getColor()}`}
    >
      {getLabel()}
    </span>
  );
}

export default function CaseStudiesPageMobile() {
  const [selectedSport, setSelectedSport] = useState<SportCategory | "all">(
    "all",
  );
  const [activeAthleteIndex, setActiveAthleteIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [photoErrorIds, setPhotoErrorIds] = useState<Set<string>>(new Set());
  const addPhotoError = (id: string) =>
    setPhotoErrorIds((prev) => new Set(prev).add(id));

  const availableSports = getAllSports();
  const filteredAthletes =
    selectedSport === "all"
      ? athletes
      : athletes.filter((a) => a.sport === selectedSport);
  const activeAthlete = filteredAthletes[activeAthleteIndex];
  const totalTests = athletes.reduce((sum, a) => sum + a.testsCompleted, 0);
  const avgImprovement = getAverageImprovementAcrossAll().toFixed(1);

  useEffect(() => {
    setActiveAthleteIndex(0);
  }, [selectedSport]);

  useEffect(() => {
    setIsExpanded(false);
  }, [activeAthleteIndex]);

  const handlePrev = () => {
    setActiveAthleteIndex((prev) =>
      prev === 0 ? filteredAthletes.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveAthleteIndex((prev) =>
      prev === filteredAthletes.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="min-h-screen pt-4 pb-8">
      {/* 1. Page header — compact */}
      <div className="mb-4">
        <p className="premium-body-sm uppercase tracking-wider text-[var(--text-on-light-muted)] mb-1">
          Research & Results
        </p>
        <h1 className="premium-section-heading mb-2">Case Studies</h1>
        <p className="premium-body-sm text-[var(--text-on-light-muted)]">
          {athletes.length} Athletes • {totalTests} Tests • +{avgImprovement}%
          Avg
        </p>
      </div>

      {/* 2. Sport filter pills — sticky below header, horizontal scroll */}
      <div className="sticky top-0 z-10 -mx-[var(--premium-gutter-mobile)] px-[var(--premium-gutter-mobile)] py-2 mb-4 bg-[var(--color-neuro-blue-light)] overflow-x-auto scrollbar-hide border-b border-[var(--color-premium-stroke)]">
        <div className="flex gap-2 pb-1">
          <button
            onClick={() => setSelectedSport("all")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-[var(--premium-radius-interactive)] border-2 border-current transition-all font-clinical text-xs flex items-center gap-1.5 ${
              selectedSport === "all"
                ? "bg-[var(--color-ink)] text-[var(--text-on-ink)]"
                : "bg-transparent text-[var(--text-on-light)]"
            }`}
          >
            All
          </button>
          {availableSports.map((sport) => {
            const info = SPORT_INFO[sport];
            return (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-[var(--premium-radius-interactive)] border-2 border-current transition-all font-clinical text-xs flex items-center gap-1.5 ${
                  selectedSport === sport
                    ? "bg-[var(--color-ink)] text-[var(--text-on-ink)]"
                    : "bg-transparent text-[var(--text-on-light)]"
                }`}
              >
                <SportIcon sport={sport} size={12} />
                <span>{info.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Athlete card — full width, single card */}
      {activeAthlete ? (
        <div className="space-y-4">
          <div
            className="premium-card-soft premium-card-soft-stroke rounded-[var(--premium-radius-card)] overflow-hidden"
            style={{ boxShadow: "var(--premium-shadow-soft)" }}
          >
            {/* Photo */}
            <div className="h-56 w-full overflow-hidden bg-neutral-100 rounded-t-[var(--premium-radius-card)]">
              {(() => {
                const photoSrc =
                  getCaseStudyPhotoPath(activeAthlete.id) || activeAthlete.photo;
                const showPlaceholder =
                  !photoSrc || photoErrorIds.has(activeAthlete.id);
                if (showPlaceholder) {
                  return (
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="premium-body-sm text-[var(--text-on-light-muted)]">
                        {activeAthlete.name || "Photo"}
                      </span>
                    </div>
                  );
                }
                return (
                  <img
                    src={photoSrc}
                    alt={activeAthlete.name}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: activeAthlete.focalPoint
                        ? `${activeAthlete.focalPoint.x}% ${activeAthlete.focalPoint.y}%`
                        : "center",
                    }}
                    onError={() => addPhotoError(activeAthlete.id)}
                  />
                );
              })()}
            </div>

            {/* Identity block */}
            <div className="p-4 border-b border-[var(--color-premium-stroke)]">
              <div className="flex items-center gap-2 mb-1">
                <SportIcon sport={activeAthlete.sport} size={16} className="opacity-60" />
                <span className="font-bold text-base text-[var(--text-on-light)] flex-1 truncate">
                  {activeAthlete.name}
                </span>
                <ProductBadge version={activeAthlete.productVersion} />
              </div>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                {activeAthlete.profession}
              </p>
              {activeAthlete.achievement && (
                <p className="premium-body-sm text-[var(--text-on-light-muted)] italic mt-1 text-xs">
                  {activeAthlete.achievement}
                </p>
              )}
            </div>

            {/* Stats strip — 3 columns, numbers only */}
            <div className="grid grid-cols-3 px-4 py-5 border-b border-[var(--color-premium-stroke)]">
              {[0, 1, 2].map((i) => {
                const stat = activeAthlete.improvements[i];
                const label = stat?.metric ?? STAT_LABELS[i];
                const value = stat?.value ?? "—";
                return (
                  <div
                    key={i}
                    className={`text-center ${i < 2 ? "border-r border-[var(--color-premium-stroke)]" : ""}`}
                  >
                    <div className="text-3xl font-bold font-clinical text-emerald-600">
                      {value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-on-light-muted)] mt-1">
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Meta row */}
            <div className="px-4 py-3 border-b border-[var(--color-premium-stroke)]">
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                {activeAthlete.testingPeriod}
              </p>
            </div>

            {/* Description — collapsed by default, Read more toggle */}
            <div className="px-4 py-4">
              <p className="premium-body-sm text-[var(--text-on-light)]">
                {isExpanded
                  ? activeAthlete.description
                  : activeAthlete.description.length <= 100
                    ? activeAthlete.description
                    : `${activeAthlete.description.slice(0, 100).trim()}...`}
              </p>
              {activeAthlete.description.length > 100 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded((e) => !e)}
                  className="mt-2 font-clinical text-xs text-[var(--color-ink)] hover:underline"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>
          </div>

          {/* 4. Card navigation — below the card */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-[var(--premium-radius-interactive)] hover:bg-black/5 transition-colors"
              aria-label="Previous athlete"
            >
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
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="font-clinical text-sm text-[var(--text-on-light-muted)] min-w-[6rem] text-center">
              {activeAthleteIndex + 1} of {filteredAthletes.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="p-3 rounded-[var(--premium-radius-interactive)] hover:bg-black/5 transition-colors"
              aria-label="Next athlete"
            >
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
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="premium-card-soft premium-card-soft-stroke p-8 text-center rounded-[var(--premium-radius-card)]">
          <p className="premium-body text-[var(--text-on-light-muted)]">
            No athletes found for this filter
          </p>
        </div>
      )}

      {/* 5. Bottom CTA */}
      <div className="mt-8">
        <div className="premium-card-soft premium-card-soft-stroke p-5 text-center rounded-[var(--premium-radius-card)]">
          <h3 className="font-bold mb-2 text-[var(--text-on-light)]">
            Start your journey
          </h3>
          <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-4">
            Join hundreds of athletes
          </p>
          <div className="flex gap-2">
            <a
              href="/conka-flow"
              className="flex-1 neo-button-outline px-4 py-2 font-semibold text-xs text-center rounded-[var(--premium-radius-interactive)]"
            >
              CONKA Flow
            </a>
            <a
              href="/conka-clarity"
              className="flex-1 neo-button px-4 py-2 font-semibold text-xs text-center rounded-[var(--premium-radius-interactive)]"
            >
              CONKA Clear
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
