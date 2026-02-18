"use client";

import { useState, useEffect } from "react";
import {
  SportCategory,
  athletes,
  getCaseStudyPhotoPath,
  getFeaturedAthletes,
  getTotalTestsCompleted,
  getAverageImprovementAcrossAll,
  SPORT_INFO,
} from "@/app/lib/caseStudiesData";
import AthleteSidebar from "./AthleteSidebar";
import { ComparisonChart } from "./AthleteStats";

export default function CaseStudiesPageDesktop() {
  const [activeAthleteId, setActiveAthleteId] = useState(athletes[0]?.id || "");
  const [selectedSport, setSelectedSport] = useState<SportCategory | "all">(
    "all",
  );
  const [photoError, setPhotoError] = useState(false);

  const activeAthlete =
    athletes.find((a) => a.id === activeAthleteId) || athletes[0];
  const featuredAthletes = getFeaturedAthletes();

  const filteredAthletes =
    selectedSport === "all"
      ? athletes
      : athletes.filter((a) => a.sport === selectedSport);

  // Reset photo error when switching athlete
  useEffect(() => {
    setPhotoError(false);
  }, [activeAthleteId]);

  const handleSelectFeaturedAthlete = (id: string) => {
    const athlete = athletes.find((a) => a.id === id);
    if (athlete && selectedSport !== "all" && athlete.sport !== selectedSport) {
      setSelectedSport("all");
    }
    setActiveAthleteId(id);
  };

  return (
    <div className="min-h-screen pt-8 pb-8 md:pt-6 md:pb-6">
      {/* Header Section */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
          <div>
            <p className="premium-body-sm uppercase tracking-wider text-[var(--text-on-light-muted)] mb-2">
              Research & Results
            </p>
            <h1 className="premium-section-heading mb-2">Case Studies</h1>
            <p className="premium-section-subtitle">
              real athletes, measurable results
            </p>
          </div>

          {/* Stats overview */}
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold font-clinical text-[var(--text-on-light)]">
                {athletes.length}
              </p>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                Athletes & Professionals
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold font-clinical text-[var(--text-on-light)]">
                {getTotalTestsCompleted().toLocaleString()}
              </p>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                Cognitive Tests
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold font-clinical text-emerald-600">
                +{getAverageImprovementAcrossAll().toFixed(1)}%
              </p>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                Avg. Improvement
              </p>
            </div>
          </div>
        </div>

        {/* Featured Athletes - Small photo tiles in a row */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide mb-6">
          {featuredAthletes.map((athlete) => {
            const improvement = athlete.improvements.find(
              (i) => i.metric === "Total Score",
            );
            const photoSrc =
              getCaseStudyPhotoPath(athlete.id) || athlete.photo || "";
            const focalPoint = athlete.focalPoint ?? { x: 50, y: 50 };
            const isActive = activeAthleteId === athlete.id;

            return (
              <button
                key={athlete.id}
                type="button"
                onClick={() => handleSelectFeaturedAthlete(athlete.id)}
                className={`relative flex-shrink-0 w-[140px] aspect-[3/4] rounded-[var(--premium-radius-card)] overflow-hidden text-left transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)] focus:ring-offset-2 ${
                  isActive
                    ? "ring-2 ring-[var(--color-ink)] ring-offset-2"
                    : "hover:opacity-95"
                }`}
                aria-pressed={isActive}
                aria-label={`View case study: ${athlete.name}, ${improvement?.value ?? "+0%"} improvement`}
              >
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      objectPosition: `${focalPoint.x}% ${focalPoint.y}%`,
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[var(--color-premium-bg-soft)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="text-xs font-semibold truncate mb-0.5">
                    {athlete.name}
                  </p>
                  <p className="text-lg font-bold font-clinical text-emerald-400">
                    {improvement?.value ?? "+0%"}
                  </p>
                  <p className="text-[10px] uppercase tracking-wide opacity-80">
                    {SPORT_INFO[athlete.sport]?.name ?? athlete.sport}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex gap-8">
        {/* Left Side - Sidebar */}
        <div className="w-80 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
          <div className="premium-card-soft premium-card-soft-stroke p-3">
            <AthleteSidebar
              athletes={athletes}
              activeAthleteId={activeAthleteId}
              onSelectAthlete={setActiveAthleteId}
              selectedSport={selectedSport}
              onSelectSport={setSelectedSport}
            />
          </div>
        </div>

        {/* Right Side - Active Athlete Detail (horizontal layout) */}
        <div className="flex-1 min-w-0">
          {activeAthlete ? (
            <div className="premium-card-soft premium-card-soft-stroke">
              <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 p-6">
                {/* LEFT COLUMN: Photo + stacked stat cards */}
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-square rounded-[var(--premium-radius-card)] overflow-hidden bg-[var(--color-premium-bg-soft)]">
                    {(() => {
                      const photoSrc =
                        getCaseStudyPhotoPath(activeAthlete.id) ||
                        activeAthlete.photo;
                      const showPlaceholder = !photoSrc || photoError;
                      if (showPlaceholder) {
                        return (
                          <div className="w-full h-full flex items-center justify-center">
                            <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                              {activeAthlete.name || "No photo available"}
                            </p>
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
                              : "center center",
                          }}
                          onError={() => setPhotoError(true)}
                        />
                      );
                    })()}
                  </div>
                  {/* Three stat cards stacked (premium, number-dominant) */}
                  {[
                    {
                      label: "Total Improvement",
                      value: activeAthlete.improvements[0]?.value || "+0%",
                      color: "text-emerald-600",
                    },
                    {
                      label: "Accuracy",
                      value: activeAthlete.improvements[1]?.value || "+0%",
                      color: "text-blue-600",
                    },
                    {
                      label: "Speed",
                      value: activeAthlete.improvements[2]?.value || "+0%",
                      color: "text-amber-600",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="premium-card-soft premium-card-soft-stroke text-center py-6 px-5"
                    >
                      <p
                        className={`text-4xl md:text-5xl font-bold font-clinical ${stat.color} mb-2`}
                      >
                        {stat.value}
                      </p>
                      <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* RIGHT COLUMN: Name first, then comparison, pills, bio */}
                <div className="flex flex-col">
                  {/* 1. Name + Org + Achievement */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-1 text-[var(--text-on-light)]">
                      {activeAthlete.name}
                    </h2>
                    <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                      {[activeAthlete.position, activeAthlete.organization]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                    {activeAthlete.achievement && (
                      <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">
                        {activeAthlete.achievement}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-[var(--color-premium-stroke)] mb-6" />

                  {/* 2. Baseline vs Results */}
                  <div className="mb-6">
                    <p className="premium-body-sm font-medium text-[var(--text-on-light)] mb-3">
                      Baseline vs Results
                    </p>
                    <ComparisonChart athlete={activeAthlete} />
                  </div>

                  <div className="border-t border-[var(--color-premium-stroke)] mb-6" />

                  {/* 3. Test Info Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] premium-body-sm text-[var(--text-on-light-muted)]">
                      {activeAthlete.testsCompleted} tests
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] premium-body-sm text-[var(--text-on-light-muted)]">
                      {activeAthlete.testingPeriod}
                    </span>
                    {activeAthlete.protocolUsed && (
                      <span className="px-3 py-1 rounded-full bg-[var(--color-ink)] text-white premium-body-sm font-medium">
                        {activeAthlete.protocolUsed}
                      </span>
                    )}
                  </div>

                  <div className="border-t border-[var(--color-premium-stroke)] mb-6" />

                  {/* 4. Bio */}
                  <div>
                    <p className="premium-body-sm text-[var(--text-on-light-muted)] leading-relaxed">
                      {activeAthlete.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="premium-card-soft premium-card-soft-stroke p-12 text-center">
              <p className="premium-body text-[var(--text-on-light-muted)]">
                Select an athlete to view their case study
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 premium-card-soft premium-card-soft-stroke p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-[var(--text-on-light)]">
              Ready to start your own journey?
            </h3>
            <p className="premium-body text-[var(--text-on-light-muted)]">
              Join hundreds of athletes improving their cognitive performance
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/conka-flow"
              className="neo-button-outline px-6 py-3 font-semibold text-sm rounded-[var(--premium-radius-interactive)]"
            >
              Try CONKA Flow
            </a>
            <a
              href="/conka-clarity"
              className="neo-button px-6 py-3 font-semibold text-sm rounded-[var(--premium-radius-interactive)]"
            >
              Try CONKA Clear
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
