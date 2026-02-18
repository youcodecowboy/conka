"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  AthleteData, 
  getTotalTestsCompleted,
  getAverageImprovementAcrossAll,
  SportCategory,
  athletes,
  getAverageImprovement,
} from "@/app/lib/caseStudiesData";

// Bar chart for baseline vs result
function ComparisonBars({ athlete }: { athlete: AthleteData }) {
  const metrics = [
    { label: "Total", baseline: athlete.baseline.totalScore || 0, result: athlete.results.totalScore || 0 },
    { label: "Accuracy", baseline: athlete.baseline.accuracy || 0, result: athlete.results.accuracy || 0 },
    { label: "Speed", baseline: athlete.baseline.speed || 0, result: athlete.results.speed || 0 },
  ];

  return (
    <div className="space-y-2">
      {metrics.map((m) => {
        const improvement = ((m.result - m.baseline) / m.baseline * 100);
        return (
          <div key={m.label} className="space-y-1">
            <div className="flex justify-between premium-body-sm">
              <span className="text-[var(--text-on-light-muted)]">{m.label}</span>
              <span className={improvement > 0 ? "text-emerald-600" : "text-blue-600"}>
                {improvement > 0 ? "+" : ""}{improvement.toFixed(1)}%
              </span>
            </div>
            <div className="flex gap-1 h-2">
              <div className="flex-1 bg-[var(--color-premium-stroke)] rounded overflow-hidden">
                <div 
                  className="h-full bg-current/30 rounded"
                  style={{ width: `${m.baseline}%` }}
                />
              </div>
              <div className="flex-1 bg-[var(--color-premium-stroke)] rounded overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded"
                  style={{ width: `${m.result}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-center gap-4 pt-1">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded bg-current/30" />
          <span className="premium-body-sm text-[var(--text-on-light-muted)]">Baseline</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded bg-emerald-500" />
          <span className="premium-body-sm text-[var(--text-on-light-muted)]">Result</span>
        </div>
      </div>
    </div>
  );
}

// Single athlete card
function AthleteMetricCard({ athlete, isActive, onClick }: { 
  athlete: AthleteData; 
  isActive: boolean;
  onClick: () => void;
}) {
  const totalImprovement = athlete.improvements.find(i => i.metric === "Total Score");
  const accentColor = totalImprovement && totalImprovement.percentage > 0 ? "emerald-600" : "blue-600";

  const ringClass = isActive 
    ? (accentColor === "emerald-600" ? "ring-2 ring-emerald-600" : "ring-2 ring-blue-600")
    : "";

  return (
    <div 
      className={`premium-card-soft premium-card-soft-stroke overflow-hidden cursor-pointer transition-all text-center ${ringClass} hover:-translate-y-0.5`}
      onClick={onClick}
    >
      {/* Athlete photo or sport icon */}
      <div className="flex justify-center mb-3">
        {athlete.photo ? (
          <img 
            src={athlete.photo} 
            alt={athlete.name}
            className="rounded-full object-cover"
            style={{ width: '60px', height: '60px' }}
          />
        ) : (
          <div className="rounded-full bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] flex items-center justify-center" style={{ width: '60px', height: '60px' }}>
            <span className="text-2xl">{athlete.sport === 'rugby' || athlete.sport === 'rugby7s' ? '🏉' : athlete.sport === 'football' ? '⚽' : athlete.sport === 'motorsport' ? '🏎️' : '💼'}</span>
          </div>
        )}
      </div>

      {/* Name and organization */}
      <h4 className="text-sm font-bold mb-1 text-[var(--text-on-light)]">{athlete.name}</h4>
      <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-3">{athlete.organization}</p>

      {/* Primary stat */}
      <div className="mb-2">
        <p className={`text-3xl font-bold font-clinical ${totalImprovement && totalImprovement.percentage > 0 ? 'text-emerald-600' : 'text-blue-600'}`}>
          {totalImprovement?.value}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">{athlete.testsCompleted} tests</p>
      </div>
    </div>
  );
}

// Expanded detail view with image
function AthleteDetailPanel({ athlete }: { athlete: AthleteData }) {
  const totalImprovement = athlete.improvements.find(i => i.metric === "Total Score");
  const improvementPercentage = totalImprovement?.percentage || 0;

  return (
    <div className="premium-card-soft overflow-hidden h-full flex flex-col text-[var(--text-on-light)]">
      {/* Athlete Photo */}
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center overflow-hidden">
        {athlete.photo ? (
          <img 
            src={athlete.photo} 
            alt={athlete.name}
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: `${athlete.focalPoint?.x || 50}% ${athlete.focalPoint?.y || 50}%` 
            }}
          />
        ) : (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-30">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <p className="premium-body-sm opacity-40 uppercase tracking-wider">Athlete Photo</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h3 className="premium-heading mb-2">{athlete.name}</h3>
          <p className="premium-body-sm text-[var(--text-on-light-muted)]">{athlete.position ? `${athlete.position} • ` : ''}{athlete.organization}</p>
          {athlete.achievement && (
            <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">{athlete.achievement}</p>
          )}
        </div>

        {/* Primary improvement card */}
        <div className={`premium-card-soft mb-6 text-center ${improvementPercentage > 0 ? 'bg-emerald-50' : 'bg-blue-50'}`}>
          <p className={`text-5xl font-bold font-clinical ${improvementPercentage > 0 ? 'text-emerald-600' : 'text-blue-600'}`}>
            {totalImprovement?.value}
          </p>
          <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-2">Total Improvement</p>
        </div>

        {/* Comparison bars */}
        <div className="mb-6">
          <ComparisonBars athlete={athlete} />
        </div>

        {/* Test Info */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="premium-card-soft p-3 text-center">
            <p className="text-xl font-bold font-clinical">{athlete.testsCompleted}</p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">Total Tests</p>
          </div>
          <div className="premium-card-soft p-3 text-center">
            <p className="text-xl font-bold font-clinical">{athlete.baselineTests}</p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">Baseline</p>
          </div>
          <div className="premium-card-soft p-3 text-center">
            <p className="text-xl font-bold font-clinical">{athlete.postBaselineTests}</p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">Post-Baseline</p>
          </div>
        </div>

        {/* Protocol & Period - pushed to bottom */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--color-premium-stroke)]">
          {athlete.protocolUsed && (
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 premium-body-sm">
              {athlete.protocolUsed}
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-[var(--color-premium-stroke)] premium-body-sm text-[var(--text-on-light-muted)]">
            {athlete.testingPeriod}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesDataDriven() {
  const allAthletes = athletes;
  const [sportFilter, setSportFilter] = useState<SportCategory | "all">("all");
  const [productFilter, setProductFilter] = useState<"01" | "02" | "both" | "all">("all");
  const [sortBy, setSortBy] = useState<"improvement" | "tests" | "recent">("improvement");

  const totalTests = getTotalTestsCompleted();
  const avgImprovement = getAverageImprovementAcrossAll();

  // Filter and sort athletes
  const filteredAthletes = useMemo(() => {
    let filtered = [...allAthletes];

    // Apply sport filter
    if (sportFilter !== "all") {
      filtered = filtered.filter(a => a.sport === sportFilter);
    }

    // Apply product filter
    if (productFilter !== "all") {
      if (productFilter === "both") {
        filtered = filtered.filter(a => a.productVersion === "both");
      } else {
        filtered = filtered.filter(a => 
          a.productVersion === productFilter || a.productVersion === "both"
        );
      }
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "improvement") {
        const aImp = getAverageImprovement(a);
        const bImp = getAverageImprovement(b);
        return bImp - aImp;
      } else if (sortBy === "tests") {
        return b.testsCompleted - a.testsCompleted;
      } else {
        // Most recent - sort by tier (tier 1 first) then by improvement
        if (a.tier !== b.tier) {
          return a.tier - b.tier;
        }
        return getAverageImprovement(b) - getAverageImprovement(a);
      }
    });

    return filtered;
  }, [sportFilter, productFilter, sortBy, allAthletes]);

  // Show 8 on desktop, 6 on tablet, all filtered on mobile (horizontal scroll)
  const displayedAthletes = filteredAthletes.slice(0, 8);

  // Initialize active athlete
  const [activeAthlete, setActiveAthlete] = useState(() => allAthletes[0]);

  // Update active athlete if current one is filtered out
  useEffect(() => {
    if (filteredAthletes.length > 0) {
      if (!filteredAthletes.find(a => a.id === activeAthlete.id)) {
        setActiveAthlete(filteredAthletes[0]);
      }
    }
  }, [filteredAthletes, activeAthlete.id]);

  return (
    <section className="premium-section-luxury premium-bg-bone" aria-label="Verified Performance Data">
      <div className="premium-track">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="premium-section-heading">Verified Performance Data</h2>
          <p className="premium-section-subtitle text-[var(--text-on-light-muted)]">
            Real athletes. Real tests. Real improvements.<br />
            All measured via the CONKA cognitive testing app.
          </p>
        </div>

        {/* Hero Stats Block */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="premium-card-soft text-center p-6">
            <p className="text-3xl md:text-6xl font-bold font-clinical text-[var(--text-on-light)]">
              {totalTests.toLocaleString()}
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase mt-2">Total Tests Completed</p>
          </div>
          <div className="premium-card-soft text-center p-6">
            <p className="text-3xl md:text-6xl font-bold font-clinical text-[var(--text-on-light)]">
              {allAthletes.length}
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase mt-2">Total Athletes Tracked</p>
          </div>
          <div className="premium-card-soft text-center p-6">
            <p className="text-3xl md:text-6xl font-bold font-clinical text-emerald-600">
              +{avgImprovement.toFixed(1)}%
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase mt-2">Average Improvement</p>
          </div>
        </div>

        {/* Verification Banner */}
        <div className="text-center mb-12">
          <p className="premium-body-sm text-[var(--text-on-light-muted)]">
            Measured via CONKA cognitive testing app • Informed Sport certified athletes • Independently verified data
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value as SportCategory | "all")}
            className="premium-card-soft premium-card-soft-stroke px-4 py-2 rounded-[var(--premium-radius-interactive)] inline-flex text-[var(--text-on-light)]"
          >
            <option value="all">All Sports</option>
            <option value="rugby">Rugby</option>
            <option value="rugby7s">Rugby 7s</option>
            <option value="football">Football</option>
            <option value="motorsport">Motorsport</option>
            <option value="business">Business</option>
          </select>

          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value as "01" | "02" | "both" | "all")}
            className="premium-card-soft premium-card-soft-stroke px-4 py-2 rounded-[var(--premium-radius-interactive)] inline-flex text-[var(--text-on-light)]"
          >
            <option value="all">All Products</option>
            <option value="01">Flow (01)</option>
            <option value="02">Clear (02)</option>
            <option value="both">Protocol (Both)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "improvement" | "tests" | "recent")}
            className="premium-card-soft premium-card-soft-stroke px-4 py-2 rounded-[var(--premium-radius-interactive)] inline-flex text-[var(--text-on-light)]"
          >
            <option value="improvement">Highest Improvement</option>
            <option value="tests">Most Tests</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Athlete cards - left side */}
          <div className="lg:col-span-2">
            {/* Desktop/Tablet: Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-2 gap-4">
              {displayedAthletes.map((athlete) => (
                <AthleteMetricCard 
                  key={athlete.id}
                  athlete={athlete}
                  isActive={activeAthlete.id === athlete.id}
                  onClick={() => setActiveAthlete(athlete)}
                />
              ))}
            </div>

            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              <div className="flex gap-4" style={{ width: 'max-content' }}>
                {filteredAthletes.map((athlete) => (
                  <div key={athlete.id} className="snap-start flex-shrink-0" style={{ width: 'calc(100vw - 2rem)' }}>
                    <AthleteMetricCard 
                      athlete={athlete}
                      isActive={activeAthlete.id === athlete.id}
                      onClick={() => setActiveAthlete(athlete)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail panel - right side */}
          <div className="lg:col-span-3">
            <AthleteDetailPanel athlete={activeAthlete} />
          </div>
        </div>

        {/* Testing App Callout */}
        <div className="max-w-[600px] mx-auto mb-8">
          <div className="premium-card-soft text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-emerald-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 className="premium-heading mb-2 text-[var(--text-on-light)]">How we measure results</h3>
            <p className="premium-body text-[var(--text-on-light-muted)] mb-4">
              All data collected via the CONKA cognitive testing app — reaction time, decision-making, pattern recognition, and memory recall measured across 1,000+ sessions.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 premium-body-sm">
                ✓ Informed Sport Certified
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 premium-body-sm">
                ✓ Independently Verified
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 premium-body-sm">
                ✓ 4+ Month Testing Periods
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/case-studies"
            className="px-8 py-3 rounded-[var(--premium-radius-interactive)] bg-[var(--color-ink)] text-white inline-flex items-center gap-2 font-semibold hover:opacity-90 transition-all"
          >
            View Full Research Database
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
