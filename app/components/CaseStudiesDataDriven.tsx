"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  AthleteData, 
  getHomepageAthletes, 
  getTotalTestsCompleted,
  getAverageImprovementAcrossAll,
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
            <div className="flex justify-between text-xs font-clinical">
              <span className="opacity-60">{m.label}</span>
              <span className={improvement > 0 ? "text-emerald-600" : "text-blue-600"}>
                {improvement > 0 ? "+" : ""}{improvement.toFixed(1)}%
              </span>
            </div>
            <div className="flex gap-1 h-2">
              <div className="flex-1 bg-current/10 rounded overflow-hidden">
                <div 
                  className="h-full bg-current/30 rounded"
                  style={{ width: `${m.baseline}%` }}
                />
              </div>
              <div className="flex-1 bg-current/10 rounded overflow-hidden">
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
          <span className="text-[10px] font-clinical opacity-50">Baseline</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded bg-emerald-500" />
          <span className="text-[10px] font-clinical opacity-50">Result</span>
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

  return (
    <div 
      className={`neo-box overflow-hidden cursor-pointer transition-all ${isActive ? 'ring-2 ring-amber-500' : 'hover:opacity-90'}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="neo-box-inverted p-4">
        <div>
          <h4 className="font-bold text-sm">{athlete.name}</h4>
          <p className="font-clinical text-xs opacity-80">{athlete.organization}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4">
        {/* Key improvement */}
        <div className="text-center mb-3 pb-3 border-b border-current/10">
          <p className="text-3xl font-bold font-clinical text-emerald-600">
            {totalImprovement?.value}
          </p>
          <p className="font-clinical text-xs opacity-60">Total Improvement</p>
        </div>

        {/* Mini bars */}
        <ComparisonBars athlete={athlete} />

        {/* Test count */}
        <div className="mt-3 pt-3 border-t border-current/10 flex justify-between text-xs font-clinical">
          <span className="opacity-60">{athlete.testsCompleted} tests</span>
          <span className="opacity-60">{athlete.testingPeriod}</span>
        </div>
      </div>
    </div>
  );
}

// Expanded detail view with image
function AthleteDetailPanel({ athlete }: { athlete: AthleteData }) {
  return (
    <div className="neo-box overflow-hidden h-full flex flex-col">
      {/* Athlete Photo */}
      <div className="relative h-72 lg:h-96 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center border-b-2 border-current/10 overflow-hidden">
        {athlete.photo ? (
          <img 
            src={athlete.photo} 
            alt={athlete.name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-30">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <p className="font-clinical text-xs opacity-40 uppercase tracking-wider">Athlete Photo</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold">{athlete.name}</h3>
          <p className="font-clinical text-sm opacity-70">{athlete.position ? `${athlete.position} • ` : ''}{athlete.organization}</p>
          {athlete.achievement && (
            <p className="font-clinical text-xs opacity-50 mt-1">{athlete.achievement}</p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-6 opacity-80">{athlete.description}</p>

        {/* Circular Progress Charts */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total", value: athlete.results.totalScore || 0, color: "#10b981", change: athlete.improvements[0] },
            { label: "Accuracy", value: athlete.results.accuracy || 0, color: "#3b82f6", change: athlete.improvements[1] },
            { label: "Speed", value: athlete.results.speed || 0, color: "#f59e0b", change: athlete.improvements[2] },
          ].map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2.5"/>
                  <circle 
                    cx="18" cy="18" r="15.915" fill="none" stroke={metric.color} strokeWidth="2.5"
                    strokeDasharray={`${metric.value} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold font-clinical">{metric.value.toFixed(0)}</span>
                </div>
              </div>
              <p className="font-clinical text-xs opacity-70">{metric.label}</p>
              <p className="font-clinical text-xs" style={{ color: metric.color }}>
                {metric.change?.value}
              </p>
            </div>
          ))}
        </div>

        {/* Test Info */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="neo-box p-3 text-center">
            <p className="text-xl font-bold font-clinical">{athlete.testsCompleted}</p>
            <p className="font-clinical text-[10px] opacity-60">Total Tests</p>
          </div>
          <div className="neo-box p-3 text-center">
            <p className="text-xl font-bold font-clinical">{athlete.baselineTests}</p>
            <p className="font-clinical text-[10px] opacity-60">Baseline</p>
          </div>
          <div className="neo-box p-3 text-center">
            <p className="text-xl font-bold font-clinical">{athlete.postBaselineTests}</p>
            <p className="font-clinical text-[10px] opacity-60">Post-Baseline</p>
          </div>
        </div>

        {/* Protocol & Period - pushed to bottom */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-current/10">
          {athlete.protocolUsed && (
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 text-xs font-clinical">
              {athlete.protocolUsed}
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-current/10 text-xs font-clinical opacity-70">
            {athlete.testingPeriod}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesDataDriven() {
  const athletes = getHomepageAthletes();
  const [activeAthlete, setActiveAthlete] = useState(athletes[0]);
  const totalTests = getTotalTestsCompleted();
  const avgImprovement = getAverageImprovementAcrossAll();

  return (
    <section className="px-4 md:px-16 py-12 md:py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="font-clinical text-sm uppercase tracking-wider opacity-50 mb-2">Verified Results</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Athlete Case Studies</h2>
          <p className="font-commentary text-lg md:text-xl opacity-70">real data from real athletes</p>
        </div>
        
        {/* Aggregate stats */}
        <div className="flex gap-6">
          <div className="text-right">
            <p className="text-2xl md:text-3xl font-bold font-clinical">{totalTests.toLocaleString()}</p>
            <p className="font-clinical text-xs opacity-60">Cognitive Tests</p>
          </div>
          <div className="text-right">
            <p className="text-2xl md:text-3xl font-bold font-clinical text-emerald-600">+{avgImprovement.toFixed(1)}%</p>
            <p className="font-clinical text-xs opacity-60">Avg. Improvement</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Athlete cards - left side */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {athletes.map((athlete) => (
            <AthleteMetricCard 
              key={athlete.id}
              athlete={athlete}
              isActive={activeAthlete.id === athlete.id}
              onClick={() => setActiveAthlete(athlete)}
            />
          ))}
        </div>

        {/* Detail panel - right side */}
        <div className="lg:col-span-3">
          <AthleteDetailPanel athlete={activeAthlete} />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link 
          href="/case-studies"
          className="neo-button px-8 py-3 inline-flex items-center gap-2 font-semibold"
        >
          View All Case Studies
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
