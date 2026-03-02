"use client";

import { useState, useEffect } from "react";
import {
  SportCategory,
  athletes,
  getCaseStudyPhotoPath,
  getFeaturedAthletes,
  getTotalTestsCompleted,
  getAverageImprovementAcrossAll,
} from "@/app/lib/caseStudiesData";
import AthleteSidebar from "./AthleteSidebar";
import { ComparisonChart } from "./AthleteStats";
import FeaturedAthletesCarousel from "./FeaturedAthletesCarousel";

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
    <div className="pb-8 md:pb-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
          <header>
            <p className="premium-body-sm uppercase tracking-widest opacity-50 mb-2 text-[var(--color-ink)]">
              Research & Results
            </p>
            <h1
              className="premium-section-heading font-bold text-[var(--color-ink)] text-4xl lg:text-5xl mb-2"
              style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
            >
              Case{" "}
              <span
                style={{
                  background: "var(--gradient-neuro-blue-accent)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Studies
              </span>
            </h1>
            <p className="premium-section-subtitle text-[var(--color-ink)] opacity-80">
              real athletes, measurable results
            </p>
          </header>

          {/* Stats overview */}
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold font-clinical text-[var(--color-ink)]">
                {athletes.length}
              </p>
              <p className="premium-body-sm text-[var(--color-ink)] opacity-70">
                Athletes & Professionals
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold font-clinical text-[var(--color-ink)]">
                {getTotalTestsCompleted().toLocaleString()}
              </p>
              <p className="premium-body-sm text-[var(--color-ink)] opacity-70">
                Cognitive Tests
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold font-clinical text-emerald-600">
                +{getAverageImprovementAcrossAll().toFixed(1)}%
              </p>
              <p className="premium-body-sm text-[var(--color-ink)] opacity-70">
                Avg. Improvement
              </p>
            </div>
          </div>
        </div>

        {/* Featured Athletes - Small photo tiles in a row */}
        <div className="mb-6">
          <FeaturedAthletesCarousel
            athletes={featuredAthletes}
            activeAthleteId={activeAthleteId}
            onSelectAthlete={handleSelectFeaturedAthlete}
          />
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex gap-8">
        {/* Left Side - Sidebar */}
        <div className="w-80 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--premium-radius-card)] bg-white border border-[var(--color-premium-stroke)] p-3">
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
            <div className="rounded-[var(--premium-radius-card)] bg-white border border-[var(--color-premium-stroke)] p-6">
              {/* Row 1: [asset] [high level info / bars] */}
              <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 mb-8">
                <div className="relative aspect-square rounded-[var(--premium-radius-nested)] overflow-hidden bg-[var(--color-premium-bg-soft)]">
                  {(() => {
                    const photoSrc =
                      getCaseStudyPhotoPath(activeAthlete.id) ||
                      activeAthlete.photo;
                    const showPlaceholder = !photoSrc || photoError;
                    if (showPlaceholder) {
                      return (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="premium-body-sm text-[var(--color-ink)] opacity-70">
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
                <div className="flex flex-col">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-1 text-[var(--color-ink)]">
                      {activeAthlete.name}
                    </h2>
                    <p className="premium-body-sm text-[var(--color-ink)] opacity-70">
                      {[activeAthlete.position, activeAthlete.organization]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                    {activeAthlete.achievement && (
                      <p className="premium-body-sm text-[var(--color-ink)] opacity-70 mt-1">
                        {activeAthlete.achievement}
                      </p>
                    )}
                  </div>
                  <div className="border-t border-[var(--color-premium-stroke)] mb-6" />
                  <div>
                    <p className="premium-body-sm font-medium text-[var(--color-ink)] mb-3">
                      Baseline vs Results
                    </p>
                    <ComparisonChart athlete={activeAthlete} />
                  </div>
                </div>
              </div>

              {/* Row 2: [stat][stat][stat] */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  {
                    label: "Total Improvement",
                    value: activeAthlete.improvements[0]?.value || "+0%",
                  },
                  {
                    label: "Accuracy",
                    value: activeAthlete.improvements[1]?.value || "+0%",
                  },
                  {
                    label: "Speed",
                    value: activeAthlete.improvements[2]?.value || "+0%",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[var(--premium-radius-nested)] bg-white border border-[var(--color-premium-stroke)] text-center py-6 px-5"
                  >
                    <p className="text-4xl md:text-5xl font-bold font-clinical text-emerald-600 mb-2">
                      {stat.value}
                    </p>
                    <p className="premium-body-sm text-[var(--color-ink)] opacity-70 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Row 3: [test count][date][product] */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] premium-body-sm text-[var(--color-ink)] opacity-70">
                  {activeAthlete.testsCompleted} tests
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] premium-body-sm text-[var(--color-ink)] opacity-70">
                  {activeAthlete.testingPeriod}
                </span>
                {activeAthlete.protocolUsed && (
                  <span className="px-3 py-1 rounded-full bg-[var(--color-ink)] text-white premium-body-sm font-medium">
                    {activeAthlete.protocolUsed}
                  </span>
                )}
              </div>

              {/* Row 4: description */}
              <div>
                <p className="premium-body-sm text-[var(--color-ink)] opacity-70 leading-relaxed">
                  {activeAthlete.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-[var(--premium-radius-card)] bg-white border border-[var(--color-premium-stroke)] p-12 text-center">
              <p className="premium-body text-[var(--color-ink)] opacity-70">
                Select an athlete to view their case study
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-[var(--premium-radius-card)] bg-white border border-[var(--color-premium-stroke)] p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-[var(--color-ink)]">
              Ready to start your own journey?
            </h3>
            <p className="premium-body text-[var(--color-ink)] opacity-70">
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
