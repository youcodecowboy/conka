"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AthleteData,
  getTotalTestsCompleted,
  getAverageImprovementAcrossAll,
  athletes,
  SportCategory,
  getAthleteById,
} from "@/app/lib/caseStudiesData";

// Helper to get readable sport labels
function getSportLabel(sport: SportCategory): string {
  const labels: Record<SportCategory, string> = {
    rugby: "Rugby Union",
    rugby7s: "Rugby 7s",
    football: "Football",
    motorsport: "Motorsport",
    business: "Business",
    other: "Other",
  };
  return labels[sport] || sport;
}

// Get the 8 hardcoded athletes for the teaser
function getTeaserAthletes(): AthleteData[] {
  const athleteIds = [
    "jade-shekells",
    "finn-russell",
    "jack-willis",
    "pierre-louis-barassi",
    "patrick-bamford",
    "nimisha-kurup",
    "callum-sheedy",
    "will-stuart",
  ];

  return athleteIds
    .map((id) => getAthleteById(id))
    .filter((athlete): athlete is AthleteData => athlete !== undefined);
}

// Map athlete ID to new asset path
function getTeaserPhotoPath(athleteId: string): string {
  const pathMap: Record<string, string> = {
    "jade-shekells": "/caseStudies/JadeShekells.jpg",
    "finn-russell": "/caseStudies/FinnRussell.jpg",
    "jack-willis": "/caseStudies/JackWillis.jpg",
    "pierre-louis-barassi": "/caseStudies/PierreLouisBarassi.jpg",
    "patrick-bamford": "/caseStudies/PatrickBamford.jpg",
    "nimisha-kurup": "/caseStudies/NimishaKurup.jpg",
    "callum-sheedy": "/caseStudies/CallumSheedy.jpg",
    "will-stuart": "/caseStudies/WillStuart.jpg",
  };
  return pathMap[athleteId] || "/placeholder.jpg";
}

// Photo tile component (non-interactive)
function AthletePhotoTile({ athlete }: { athlete: AthleteData }) {
  const totalImprovement = athlete.improvements.find(
    (i) => i.metric === "Total Score",
  );
  const photoPath = getTeaserPhotoPath(athlete.id);
  const focalPoint = athlete.focalPoint || { x: 50, y: 50 };

  return (
    <div className="relative aspect-[3/4] rounded-[var(--premium-radius-card)] overflow-hidden group">
      <Image
        src={photoPath}
        alt={athlete.name}
        width={2000}
        height={2000}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        style={{
          objectPosition: `${focalPoint.x}% ${focalPoint.y}%`,
        }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="text-sm font-semibold mb-1">{athlete.name}</p>
        <p className="text-3xl font-bold font-clinical mb-0.5">
          {totalImprovement?.value || "+0%"}
        </p>
        <p className="text-[10px] uppercase tracking-wide opacity-80 mb-1">
          {totalImprovement?.metric === "Total Score"
            ? "Cognitive improvement"
            : (totalImprovement?.metric ?? "Improvement")}
        </p>
        <p className="text-xs opacity-80">{getSportLabel(athlete.sport)}</p>
      </div>
    </div>
  );
}

export default function CaseStudiesDataDriven() {
  const teaserAthletes = getTeaserAthletes();
  const totalTests = getTotalTestsCompleted();
  const avgImprovement = getAverageImprovementAcrossAll();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotUpdate = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const tileWidth = 280 + 16; // max-w + gap
    const index = Math.round(scrollLeft / tileWidth);
    setCurrentIndex(Math.min(7, Math.max(0, index)));
  };

  return (
    <section className="premium-section-luxury premium-bg-bone">
      <div className="premium-track">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="premium-section-heading">Verified Performance Data</h2>
          <p className="premium-section-subtitle text-[var(--text-on-light-muted)]">
            Real athletes. Real tests. Real improvements.
            <br />
            All measured via the CONKA cognitive testing app.
          </p>
        </div>

        {/* Hero Stats Block */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-4">
          <div className="premium-card-soft px-4 py-4 md:px-6 md:py-8 text-center">
            <p className="text-3xl md:text-5xl lg:text-6xl font-bold font-clinical text-[var(--text-on-light)]">
              {totalTests.toLocaleString()}
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase mt-2">
              Total Tests
            </p>
          </div>
          <div className="premium-card-soft px-4 py-4 md:px-6 md:py-8 text-center">
            <p className="text-3xl md:text-5xl lg:text-6xl font-bold font-clinical text-[var(--text-on-light)]">
              {athletes.length}
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase mt-2">
              Total Athletes
            </p>
          </div>
          <div className="premium-card-soft px-4 py-4 md:px-6 md:py-8 text-center">
            <p className="text-3xl md:text-5xl lg:text-6xl font-bold font-clinical text-emerald-600">
              +{avgImprovement.toFixed(1)}%
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase mt-2">
              Average Improvement
            </p>
          </div>
        </div>

        {/* Verification Banner */}
        <div className="text-center mb-8">
          <p className="premium-body-sm text-[var(--text-on-light-muted)]">
            Measured via CONKA cognitive testing app • Informed Sport certified
            athletes • Independently verified data
          </p>
        </div>

        {/* Desktop/Tablet: Photo Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {teaserAthletes.map((athlete) => (
            <AthletePhotoTile key={athlete.id} athlete={athlete} />
          ))}
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden mb-8">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 -mx-4 px-4 scrollbar-hide"
            onScroll={handleDotUpdate}
          >
            {teaserAthletes.map((athlete) => (
              <div
                key={athlete.id}
                className="flex-shrink-0 w-[70vw] max-w-[280px] snap-center"
              >
                <AthletePhotoTile athlete={athlete} />
              </div>
            ))}
          </div>
          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {teaserAthletes.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx
                    ? "bg-[var(--color-ink)] w-6"
                    : "bg-[var(--color-ink)] opacity-30 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div className="text-center mb-8">
          <p className="premium-body-sm text-xs text-[var(--text-on-light-muted)] opacity-70">
            * Baseline scores vary by individual. Improvements measured over 4+
            month testing periods with the CONKA App.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/case-studies"
            className="max-w-[500px] w-full px-8 py-4 rounded-[var(--premium-radius-interactive)] bg-[var(--color-ink)] text-white font-semibold text-base hover:opacity-90 transition-all inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)]"
          >
            View All CONKA App Case Studies
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
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
