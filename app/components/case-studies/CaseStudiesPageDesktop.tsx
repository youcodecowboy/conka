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

export default function CaseStudiesPageDesktop() {
  const [activeAthleteId, setActiveAthleteId] = useState(athletes[0]?.id || "");
  const [selectedSport, setSelectedSport] = useState<SportCategory | "all">(
    "all",
  );
  const [bioExpanded, setBioExpanded] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const activeAthlete =
    athletes.find((a) => a.id === activeAthleteId) || athletes[0];
  const featuredAthletes = getFeaturedAthletes();

  const filteredAthletes =
    selectedSport === "all"
      ? athletes
      : athletes.filter((a) => a.sport === selectedSport);

  // Reset photo error and bio expanded when switching athlete
  useEffect(() => {
    setPhotoError(false);
    setBioExpanded(false);
  }, [activeAthleteId]);

  const handleSelectFeaturedAthlete = (id: string) => {
    const athlete = athletes.find((a) => a.id === id);
    if (athlete && selectedSport !== "all" && athlete.sport !== selectedSport) {
      setSelectedSport("all");
    }
    setActiveAthleteId(id);
  };

  return (
    <div className="min-h-screen pt-16 pb-8 md:pt-12 md:pb-6">
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

        {/* Featured Athletes - Horizontal Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {featuredAthletes.map((athlete) => {
            const improvement = athlete.improvements.find(
              (i) => i.metric === "Total Score",
            );
            return (
              <button
                key={athlete.id}
                onClick={() => handleSelectFeaturedAthlete(athlete.id)}
                className={`px-4 py-2 rounded-full border transition-all premium-body-sm font-medium ${
                  activeAthleteId === athlete.id
                    ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
                    : "bg-white border-[var(--color-premium-stroke)] hover:border-[var(--color-ink)] text-[var(--text-on-light)]"
                }`}
              >
                {athlete.name}
                {improvement && (
                  <span className="ml-2 text-emerald-600">
                    {improvement.value}
                  </span>
                )}
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
                {/* LEFT COLUMN: Photo */}
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

                {/* RIGHT COLUMN: Stats first, then name/bio */}
                <div className="flex flex-col">
                  {/* 1. Hero Stats Block */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      {
                        label: "Total",
                        value:
                          activeAthlete.improvements[0]?.value || "+0%",
                        color: "text-emerald-600",
                      },
                      {
                        label: "Accuracy",
                        value:
                          activeAthlete.improvements[1]?.value || "+0%",
                        color: "text-blue-600",
                      },
                      {
                        label: "Speed",
                        value:
                          activeAthlete.improvements[2]?.value || "+0%",
                        color: "text-amber-600",
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="premium-card-soft-mobile premium-card-soft-stroke text-center p-4"
                      >
                        <p
                          className={`text-3xl md:text-4xl font-bold font-clinical ${stat.color} mb-1`}
                        >
                          {stat.value}
                        </p>
                        <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 2. Comparison Bars */}
                  <div className="mb-6">
                    <p className="premium-body-sm font-medium text-[var(--text-on-light)] mb-3">
                      Baseline vs Results
                    </p>
                    <ComparisonChart athlete={activeAthlete} />
                  </div>

                  {/* 3. Test Info Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] premium-body-sm text-[var(--text-on-light)]">
                      {activeAthlete.testsCompleted} tests
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] premium-body-sm text-[var(--text-on-light)]">
                      {activeAthlete.testingPeriod}
                    </span>
                    {activeAthlete.protocolUsed && (
                      <span className="px-3 py-1 rounded-full bg-[var(--color-ink)] text-white premium-body-sm font-medium">
                        {activeAthlete.protocolUsed}
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[var(--color-premium-stroke)] mb-6" />

                  {/* 4. Name + Org + Achievement */}
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

                  {/* 5. Bio - Collapsible */}
                  <div>
                    <p
                      className={`premium-body-sm text-[var(--text-on-light-muted)] leading-relaxed ${
                        !bioExpanded ? "line-clamp-3" : ""
                      }`}
                    >
                      {activeAthlete.description}
                    </p>
                    {activeAthlete.description.length > 200 && (
                      <button
                        type="button"
                        onClick={() => setBioExpanded(!bioExpanded)}
                        className="premium-body-sm font-medium text-blue-600 hover:underline mt-2"
                      >
                        {bioExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
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
