"use client";

import { useState } from "react";
import { ProtocolId } from "@/app/lib/productData";
import { 
  AthleteData, 
  athletes as allAthletes,
} from "@/app/lib/caseStudiesData";

interface ProtocolCaseStudiesMobileProps {
  protocolId: ProtocolId;
}

// Map protocols to formula preferences
const protocolToFormula: Record<ProtocolId, "01" | "02" | "both"> = {
  "1": "01",     // Resilience - Flow-heavy
  "2": "02",     // Precision - Clarity-heavy
  "3": "both",   // Balance - Both
  "4": "both",   // Ultimate - Both
};

// Get athletes for a protocol
function getAthletesForProtocol(protocolId: ProtocolId): AthleteData[] {
  const formulaPreference = protocolToFormula[protocolId];
  
  return allAthletes
    .filter(a => {
      if (formulaPreference === "both") {
        return a.productVersion === "both";
      }
      return a.productVersion === formulaPreference || a.productVersion === "both";
    })
    .sort((a, b) => {
      const aTotal = a.improvements.find(i => i.metric === "Total Score")?.percentage || 0;
      const bTotal = b.improvements.find(i => i.metric === "Total Score")?.percentage || 0;
      return bTotal - aTotal;
    })
    .slice(0, 3);
}

// Compact athlete card with data visualization
function AthleteDataCard({ athlete }: { athlete: AthleteData }) {
  const totalImprovement = athlete.improvements.find(i => i.metric === "Total Score");

  return (
    <div className="neo-box overflow-hidden">
      {/* Image Placeholder */}
      <div className="relative h-28 bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1 opacity-40">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <p className="font-clinical text-[9px] text-white/40 uppercase tracking-wider">Photo</p>
        </div>
      </div>

      {/* Header */}
      <div className="neo-box-inverted p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-sm">{athlete.name}</h3>
            <p className="font-clinical text-xs opacity-80">{athlete.organization}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold font-clinical text-emerald-400">{totalImprovement?.value}</p>
            <p className="font-clinical text-[10px] opacity-60">improvement</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="p-4 border-b border-current/10">
        <p className="text-sm leading-relaxed opacity-80 line-clamp-3">{athlete.description}</p>
      </div>

      {/* Circular progress metrics */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Total", value: athlete.results.totalScore || 0, change: athlete.improvements[0], color: "#10b981" },
            { label: "Accuracy", value: athlete.results.accuracy || 0, change: athlete.improvements[1], color: "#3b82f6" },
            { label: "Speed", value: athlete.results.speed || 0, change: athlete.improvements[2], color: "#f59e0b" },
          ].map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="relative w-14 h-14 mx-auto mb-1">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2"/>
                  <circle 
                    cx="18" cy="18" r="15.915" fill="none" stroke={metric.color} strokeWidth="2"
                    strokeDasharray={`${metric.value} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold font-clinical">{metric.value.toFixed(0)}</span>
                </div>
              </div>
              <p className="font-clinical text-[9px] opacity-60">{metric.label}</p>
              <p className="font-clinical text-[9px]" style={{ color: metric.color }}>
                {metric.change?.value}
              </p>
            </div>
          ))}
        </div>

        {/* Baseline vs Result comparison */}
        <div className="space-y-2 mb-3">
          {[
            { label: "Total", baseline: athlete.baseline.totalScore || 0, result: athlete.results.totalScore || 0 },
            { label: "Accuracy", baseline: athlete.baseline.accuracy || 0, result: athlete.results.accuracy || 0 },
            { label: "Speed", baseline: athlete.baseline.speed || 0, result: athlete.results.speed || 0 },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between text-[9px] font-clinical mb-0.5">
                <span className="opacity-60">{m.label}</span>
                <span className="opacity-60">{m.baseline.toFixed(1)} → {m.result.toFixed(1)}</span>
              </div>
              <div className="flex gap-1 h-1.5">
                <div className="flex-1 bg-current/10 rounded-full overflow-hidden">
                  <div className="h-full bg-current/30 rounded-full" style={{ width: `${m.baseline}%` }} />
                </div>
                <div className="flex-1 bg-current/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${m.result}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Test stats */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-current/10">
          <div className="text-center">
            <p className="text-lg font-bold font-clinical">{athlete.testsCompleted}</p>
            <p className="font-clinical text-[9px] opacity-50">Tests</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold font-clinical">{athlete.baselineTests}</p>
            <p className="font-clinical text-[9px] opacity-50">Baseline</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold font-clinical">{athlete.postBaselineTests}</p>
            <p className="font-clinical text-[9px] opacity-50">Post</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-current/5 flex items-center justify-between">
        <span className="font-clinical text-[10px] opacity-60">{athlete.testingPeriod}</span>
        {athlete.protocolUsed && (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 text-[9px] font-clinical">
            {athlete.protocolUsed}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProtocolCaseStudiesMobile({ protocolId }: ProtocolCaseStudiesMobileProps) {
  const athletes = getAthletesForProtocol(protocolId);
  const [activeIndex, setActiveIndex] = useState(0);

  if (athletes.length === 0) return null;

  const currentAthlete = athletes[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? athletes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === athletes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="px-4 py-8">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-1">Athletes on This Protocol</h2>
        <p className="font-commentary text-base opacity-70">real results from verified testing</p>
      </div>

      {/* Athlete Card */}
      <AthleteDataCard athlete={currentAthlete} />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrev}
          className="neo-button p-2"
          aria-label="Previous athlete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div className="flex items-center gap-3">
          {athletes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === activeIndex
                  ? "bg-amber-500 w-4"
                  : "bg-current/20"
              }`}
              aria-label={`Go to athlete ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="neo-button p-2"
          aria-label="Next athlete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
