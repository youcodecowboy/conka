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
import PremiumCarouselToggle from "../premium/PremiumCarouselToggle";

const STAT_LABELS = ["Total", "Acc.", "Speed"];

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

function shortenMetric(metric: string): string {
  const m = metric.toLowerCase();
  if (m.includes("total")) return "Total";
  if (m.includes("accuracy") || m.includes("acc")) return "Acc.";
  if (m.includes("speed")) return "Speed";
  return metric;
}

export default function CaseStudiesPageMobile() {
  const [selectedSport, setSelectedSport] = useState<SportCategory | "all">(
    "all",
  );
  const [activeAthleteIndex, setActiveAthleteIndex] = useState(0);
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
    <div className="-mx-[var(--premium-gutter-mobile)] px-[var(--premium-gutter-mobile-tight)] pt-3 pb-8 min-h-screen">
      {/* 1. Header — compact */}
      <div className="mb-2">
        <p className="premium-body-sm uppercase tracking-wider text-[var(--text-on-light-muted)] mb-0.5">
          Research & Results
        </p>
        <h1 className="premium-section-heading mb-1">Case Studies</h1>
        <p className="premium-body-sm text-[var(--text-on-light-muted)]">
          {athletes.length} Athletes • {totalTests} Tests • +{avgImprovement}%
          Avg
        </p>
      </div>

      {/* 2. Sport filter pills — horizontal scroll, sticky */}
      <div className="sticky top-0 z-10 py-2 -mx-[var(--premium-gutter-mobile-tight)] px-[var(--premium-gutter-mobile-tight)] mb-3 bg-[var(--color-neuro-blue-light)] border-b border-[var(--color-premium-stroke)] overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-0.5">
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

      {/* 3. Trading-card: photo tile with gradient + all info on card + overlay toggles */}
      {activeAthlete ? (
        <div className="relative w-full aspect-[3/4] rounded-[var(--premium-radius-card)] overflow-hidden">
          {(() => {
            const photoSrc =
              getCaseStudyPhotoPath(activeAthlete.id) || activeAthlete.photo;
            const showPlaceholder =
              !photoSrc || photoErrorIds.has(activeAthlete.id);
            if (showPlaceholder) {
              return (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-neutral-200">
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
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: activeAthlete.focalPoint
                    ? `${activeAthlete.focalPoint.x}% ${activeAthlete.focalPoint.y}%`
                    : "center",
                }}
                onError={() => addPhotoError(activeAthlete.id)}
              />
            );
          })()}
          {/* Dark gradient from bottom (same as CaseStudiesDataDriven) */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            aria-hidden
          />
          {/* Chevrons: white transparent circle, black icons */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
            <PremiumCarouselToggle
              variant="overlayLight"
              direction="prev"
              onClick={handlePrev}
              ariaLabel="Previous athlete"
            />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
            <PremiumCarouselToggle
              variant="overlayLight"
              direction="next"
              onClick={handleNext}
              ariaLabel="Next athlete"
            />
          </div>
          {/* Info overlay — bottom of card, white text */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pt-8 text-white">
            <p className="font-bold text-[15px] mb-0.5">
              {activeAthlete.name}
            </p>
            <p className="text-xs opacity-90 mb-1">
              {SPORT_INFO[activeAthlete.sport].name}
            </p>
            <div className="mb-2">
              <ProductBadge version={activeAthlete.productVersion} />
            </div>
            <div className="border-t border-white/30 my-2" />
            <div className="grid grid-cols-3 text-center gap-1">
              {[0, 1, 2].map((i) => {
                const stat = activeAthlete.improvements[i];
                const label = stat
                  ? shortenMetric(stat.metric)
                  : STAT_LABELS[i];
                const value = stat?.value ?? "—";
                return (
                  <div key={i}>
                    <div className="text-xl font-bold font-clinical text-emerald-300">
                      {value}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider opacity-85">
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-white/30 my-2" />
            <p className="text-[11px] opacity-85">
              {activeAthlete.testingPeriod} • {activeAthlete.testsCompleted} tests
            </p>
            <p className="font-clinical text-xs opacity-80 text-center mt-1.5">
              {activeAthleteIndex + 1} of {filteredAthletes.length}
            </p>
          </div>
        </div>
      ) : (
        <div className="premium-card-soft premium-card-soft-stroke p-6 text-center rounded-[var(--premium-radius-card)] mt-2">
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
