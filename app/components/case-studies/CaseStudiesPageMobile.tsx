"use client";

import { useState, useEffect } from "react";
import {
  SportCategory,
  SPORT_INFO,
  athletes,
  getFeaturedAthletes,
  getAllSports,
  getTotalTestsCompleted,
  getAverageImprovementAcrossAll,
} from "@/app/lib/caseStudiesData";
import SportIcon from "./SportIcon";
import AthleteStats from "./AthleteStats";

export default function CaseStudiesPageMobile() {
  const [selectedSport, setSelectedSport] = useState<SportCategory | "all">("all");
  const [activeAthleteIndex, setActiveAthleteIndex] = useState(0);

  const featuredAthletes = getFeaturedAthletes();
  const availableSports = getAllSports();
  
  // Filter athletes by sport
  const filteredAthletes = selectedSport === "all"
    ? athletes
    : athletes.filter(a => a.sport === selectedSport);

  const activeAthlete = filteredAthletes[activeAthleteIndex];

  // Reset index when filter changes
  useEffect(() => {
    setActiveAthleteIndex(0);
  }, [selectedSport]);

  const handlePrev = () => {
    setActiveAthleteIndex((prev) => 
      prev === 0 ? filteredAthletes.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveAthleteIndex((prev) => 
      prev === filteredAthletes.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelectFeatured = (id: string) => {
    // Find in filtered list first
    let index = filteredAthletes.findIndex(a => a.id === id);
    if (index >= 0) {
      setActiveAthleteIndex(index);
    } else {
      // If not in filtered list, reset filter to "all" and find
      setSelectedSport("all");
      index = athletes.findIndex(a => a.id === id);
      if (index >= 0) {
        setActiveAthleteIndex(index);
      }
    }
  };

  // Product version badge
  const ProductBadge = ({ version }: { version?: "01" | "02" | "both" }) => {
    if (!version) return null;
    
    const getLabel = () => {
      switch (version) {
        case "01": return "Conka Flow";
        case "02": return "Conka Clarity";
        case "both": return "Flow + Clarity";
      }
    };
    
    const getColor = () => {
      switch (version) {
        case "01": return "bg-amber-500";
        case "02": return "bg-[#AAB9BC]";
        case "both": return "bg-gradient-to-r from-amber-500 to-[#AAB9BC]";
      }
    };

    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-clinical font-medium text-white ${getColor()}`}>
        {getLabel()}
      </span>
    );
  };

  return (
    <div className="min-h-screen pt-4 pb-8">
      <div className="px-6">
        {/* Header - Larger title with inline stats */}
        <div className="mb-8">
          <p className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-2">Research & Results</p>
          <h1 className="text-4xl font-bold mb-1">Case Studies</h1>
          <p className="font-commentary text-xl mb-4">real athletes, measurable results</p>
          
          {/* Inline stats - like desktop */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="font-clinical font-bold text-2xl">{athletes.length}</span>
              <span className="font-clinical text-sm opacity-60">Athletes</span>
            </div>
            <span className="opacity-20 text-xl">•</span>
            <div className="flex items-center gap-2">
              <span className="font-clinical font-bold text-2xl">
                {athletes.reduce((sum, a) => sum + a.testsCompleted, 0)}
              </span>
              <span className="font-clinical text-sm opacity-60">Tests</span>
            </div>
            <span className="opacity-20 text-xl">•</span>
            <div className="flex items-center gap-2">
              <span className="font-clinical font-bold text-2xl text-emerald-600">+26%</span>
              <span className="font-clinical text-sm opacity-60">Avg</span>
            </div>
          </div>
        </div>

        {/* Featured Athletes (Horizontal Scroll) */}
        {featuredAthletes.length > 0 && (
          <div className="mb-6">
            <p className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Featured
            </p>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2">
              {featuredAthletes.map((athlete) => {
                return (
                  <button
                    key={athlete.id}
                    onClick={() => handleSelectFeatured(athlete.id)}
                    className="neo-box flex-shrink-0 w-36 overflow-hidden text-left"
                  >
                    <div className="h-32 w-full border-0 border-b-2 border-current overflow-hidden bg-neutral-100">
                      {athlete.photo ? (
                        <img 
                          src={athlete.photo} 
                          alt={athlete.name}
                          className="w-full h-full object-cover"
                          style={{
                            objectPosition: athlete.focalPoint 
                              ? `${athlete.focalPoint.x}% ${athlete.focalPoint.y}%` 
                              : 'center'
                          }}
                        />
                      ) : (
                        <div className="placeholder-box h-full w-full border-0">
                          <span className="font-clinical text-[10px]">[PHOTO]</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <SportIcon sport={athlete.sport} size={12} className="opacity-50" />
                        <p className="font-bold text-xs truncate">{athlete.name}</p>
                      </div>
                      <p className="font-clinical text-[10px] opacity-60 truncate mb-2">{athlete.profession}</p>
                      {athlete.improvements[0] && (
                        <p className="font-clinical text-sm font-bold text-emerald-600">
                          {athlete.improvements[0].value}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sport Filter Bar with scroll indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="font-clinical text-xs uppercase tracking-wider opacity-50">Filter by Sport</p>
            <div className="flex items-center gap-1 opacity-40">
              <span className="font-clinical text-[10px]">swipe</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
            <div className="flex gap-2 pb-2">
              {/* All filter */}
              <button
                onClick={() => setSelectedSport("all")}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full border-2 border-current transition-all font-clinical text-xs flex items-center gap-1.5 ${
                  selectedSport === "all"
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "bg-transparent"
                }`}
              >
                All
              </button>

              {/* Sport filters */}
              {availableSports.map((sport) => {
                const info = SPORT_INFO[sport];
                
                return (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full border-2 border-current transition-all font-clinical text-xs flex items-center gap-1.5 ${
                      selectedSport === sport
                        ? "bg-[var(--foreground)] text-[var(--background)]"
                        : "bg-transparent"
                    }`}
                  >
                    <SportIcon sport={sport} size={12} />
                    <span>{info.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Case Study View - Full Detail */}
      {activeAthlete ? (
        <div className="px-6">
          {/* Navigation Header */}
          <div className="neo-box-inverted p-4 mb-0 rounded-t-lg rounded-b-none">
            <div className="flex items-center justify-between">
              {/* Prev Arrow */}
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                aria-label="Previous athlete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                <span className="font-clinical text-xs hidden xs:inline">Prev</span>
              </button>

              {/* Center - Name & Counter */}
              <div className="text-center flex-1 px-2">
                <p className="font-bold text-sm truncate">{activeAthlete.name}</p>
                <p className="font-clinical text-xs opacity-70">
                  Case Study {activeAthleteIndex + 1} of {filteredAthletes.length}
                </p>
              </div>

              {/* Next Arrow */}
              <button
                onClick={handleNext}
                className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                aria-label="Next athlete"
              >
                <span className="font-clinical text-xs hidden xs:inline">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Photo */}
          <div className="h-72 w-full border-2 border-current border-t-0 overflow-hidden bg-neutral-100">
            {activeAthlete.photo ? (
              <img 
                src={activeAthlete.photo} 
                alt={activeAthlete.name}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: activeAthlete.focalPoint 
                    ? `${activeAthlete.focalPoint.x}% ${activeAthlete.focalPoint.y}%` 
                    : 'center'
                }}
              />
            ) : (
              <div className="placeholder-box h-full w-full border-0 flex items-center justify-center">
                <span className="font-clinical text-sm">[ATHLETE PHOTO]</span>
              </div>
            )}
          </div>

          {/* Content Card */}
          <div className="neo-box border-t-0 rounded-t-none">
            {/* Header Info */}
            <div className="p-5 border-b-2 border-current/10">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <SportIcon sport={activeAthlete.sport} size={16} className="opacity-60" />
                    <p className="font-clinical text-sm opacity-70">{activeAthlete.profession}</p>
                  </div>
                  {activeAthlete.achievement && (
                    <p className="font-clinical text-xs opacity-50">{activeAthlete.achievement}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 justify-end">
                  <ProductBadge version={activeAthlete.productVersion} />
                  {activeAthlete.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-current/10 text-[10px] font-clinical">★ Featured</span>
                  )}
                </div>
              </div>
              
              {activeAthlete.protocolUsed && (
                <p className="font-clinical text-xs opacity-60 mt-2">
                  Protocol: {activeAthlete.protocolUsed}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="p-5 border-b-2 border-current/10">
              <p className="text-sm leading-relaxed">{activeAthlete.description}</p>
            </div>

            {/* Stats Section */}
            <div className="p-5">
              <AthleteStats athlete={activeAthlete} />
            </div>
          </div>

          {/* Quick Navigation Dots */}
          {filteredAthletes.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-4">
              {filteredAthletes.slice(0, 10).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAthleteIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeAthleteIndex
                      ? "bg-[var(--foreground)] w-5"
                      : "bg-[var(--foreground)]/30"
                  }`}
                  aria-label={`Go to athlete ${idx + 1}`}
                />
              ))}
              {filteredAthletes.length > 10 && (
                <span className="font-clinical text-xs opacity-50 ml-1">+{filteredAthletes.length - 10}</span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="px-6">
          <div className="neo-box p-8 text-center">
            <p className="font-commentary text-lg opacity-50">No athletes found for this filter</p>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="px-6 mt-8">
        <div className="neo-box p-5 text-center">
          <h3 className="font-bold mb-2">Start your journey</h3>
          <p className="font-commentary text-sm opacity-70 mb-4">Join hundreds of athletes</p>
          <div className="flex gap-2">
            <a
              href="/conka-flow"
              className="flex-1 neo-button-outline px-4 py-2 font-semibold text-xs text-center"
            >
              Conka Flow
            </a>
            <a
              href="/conka-clarity"
              className="flex-1 neo-button px-4 py-2 font-semibold text-xs text-center"
            >
              Conka Clarity
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
