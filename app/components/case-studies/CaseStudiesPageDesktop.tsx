"use client";

import { useState } from "react";
import {
  AthleteData,
  SportCategory,
  athletes,
  getFeaturedAthletes,
  getTotalTestsCompleted,
  getAverageImprovementAcrossAll,
} from "@/app/lib/caseStudiesData";
import AthleteSidebar from "./AthleteSidebar";
import AthleteCard from "./AthleteCard";
import FeaturedAthletes from "./FeaturedAthletes";

export default function CaseStudiesPageDesktop() {
  const [activeAthleteId, setActiveAthleteId] = useState(athletes[0]?.id || "");
  const [selectedSport, setSelectedSport] = useState<SportCategory | "all">(
    "all",
  );

  const activeAthlete =
    athletes.find((a) => a.id === activeAthleteId) || athletes[0];
  const featuredAthletes = getFeaturedAthletes();

  // Filter athletes by sport for sidebar
  const filteredAthletes =
    selectedSport === "all"
      ? athletes
      : athletes.filter((a) => a.sport === selectedSport);

  // When selecting a featured athlete, clear sport filter if needed
  const handleSelectFeaturedAthlete = (id: string) => {
    const athlete = athletes.find((a) => a.id === id);
    if (athlete && selectedSport !== "all" && athlete.sport !== selectedSport) {
      setSelectedSport("all");
    }
    setActiveAthleteId(id);
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <p className="font-clinical text-sm uppercase tracking-wider opacity-50 mb-2">
                Research & Results
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                Case Studies
              </h1>
              <p className="font-commentary text-xl lg:text-2xl">
                real athletes, measurable results
              </p>
            </div>

            {/* Stats overview */}
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-3xl font-bold font-clinical">
                  {athletes.length}
                </p>
                <p className="font-clinical text-sm opacity-70">
                  Athletes & Professionals
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold font-clinical">
                  {getTotalTestsCompleted().toLocaleString()}
                </p>
                <p className="font-clinical text-sm opacity-70">
                  Cognitive Tests
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold font-clinical text-emerald-600">
                  +{getAverageImprovementAcrossAll().toFixed(1)}%
                </p>
                <p className="font-clinical text-sm opacity-70">
                  Avg. Improvement
                </p>
              </div>
            </div>
          </div>

          {/* Featured Athletes */}
          <FeaturedAthletes
            athletes={featuredAthletes}
            onSelectAthlete={handleSelectFeaturedAthlete}
          />
        </div>

        {/* Main Content - Split View */}
        <div className="flex gap-8">
          {/* Left Side - Sidebar */}
          <div className="w-80 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
            <div className="neo-box p-4">
              <AthleteSidebar
                athletes={athletes}
                activeAthleteId={activeAthleteId}
                onSelectAthlete={setActiveAthleteId}
                selectedSport={selectedSport}
                onSelectSport={setSelectedSport}
              />
            </div>
          </div>

          {/* Right Side - Active Athlete Detail */}
          <div className="flex-1 min-w-0">
            {activeAthlete ? (
              <AthleteCard athlete={activeAthlete} />
            ) : (
              <div className="neo-box p-12 text-center">
                <p className="font-commentary text-xl opacity-50">
                  Select an athlete to view their case study
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 neo-box p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Ready to start your own journey?
              </h3>
              <p className="font-commentary text-lg opacity-70">
                Join hundreds of athletes improving their cognitive performance
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="/conka-flow"
                className="neo-button-outline px-6 py-3 font-semibold text-sm"
              >
                Try CONKA Flow
              </a>
              <a
                href="/conka-clarity"
                className="neo-button px-6 py-3 font-semibold text-sm"
              >
                Try CONKA Clear
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
