"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  AthleteData, 
  getAthletesForFormula,
} from "@/app/lib/caseStudiesData";

interface FormulaCaseStudiesProps {
  formulaId: "01" | "02";
}

function AthleteMetricCardCompact({ athlete, isActive, onClick }: { 
  athlete: AthleteData; 
  isActive: boolean;
  onClick: () => void;
}) {
  const totalImprovement = athlete.improvements.find(i => i.metric === "Total Score");

  return (
    <div 
      className={`premium-box p-4 cursor-pointer transition-all ${isActive ? 'ring-2 ring-amber-500' : 'hover:opacity-90'}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-current/10 flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate">{athlete.name}</h4>
          <p className="font-clinical text-xs opacity-70 truncate">{athlete.organization}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold font-clinical text-emerald-600">{totalImprovement?.value}</p>
          <p className="font-clinical text-[10px] opacity-50">{athlete.testsCompleted} tests</p>
        </div>
      </div>
    </div>
  );
}

function AthleteDetailCompact({ athlete }: { athlete: AthleteData }) {
  return (
    <div className="premium-box overflow-hidden">
      {/* Athlete Photo */}
      <div className="relative h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center border-b-2 border-current/10 overflow-hidden">
        {athlete.photo ? (
          <img 
            src={athlete.photo} 
            alt={athlete.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1 opacity-30">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <p className="font-clinical text-[10px] opacity-40 uppercase tracking-wider">Photo</p>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="p-4 border-b border-current/10">
        <h3 className="font-bold text-lg">{athlete.name}</h3>
        <p className="font-clinical text-xs opacity-70">{athlete.position ? `${athlete.position} • ` : ''}{athlete.organization}</p>
        {athlete.achievement && (
          <p className="font-clinical text-[10px] opacity-50 mt-1">{athlete.achievement}</p>
        )}
      </div>

      {/* Bio */}
      <div className="p-4 border-b border-current/10">
        <p className="text-sm leading-relaxed opacity-80 line-clamp-3">{athlete.description}</p>
      </div>

      {/* Metrics Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Total", value: athlete.results.totalScore || 0, change: athlete.improvements[0], color: "#10b981" },
            { label: "Accuracy", value: athlete.results.accuracy || 0, change: athlete.improvements[1], color: "#3b82f6" },
            { label: "Speed", value: athlete.results.speed || 0, change: athlete.improvements[2], color: "#f59e0b" },
          ].map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-1">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2"/>
                  <circle 
                    cx="18" cy="18" r="15.915" fill="none" stroke={metric.color} strokeWidth="2"
                    strokeDasharray={`${metric.value} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold font-clinical">{metric.value.toFixed(0)}</span>
                </div>
              </div>
              <p className="font-clinical text-[10px] opacity-60">{metric.label}</p>
              <p className="font-clinical text-[10px]" style={{ color: metric.color }}>
                {metric.change?.value}
              </p>
            </div>
          ))}
        </div>

        {/* Baseline vs Result bars */}
        <div className="space-y-2 mb-4">
          {[
            { label: "Total Score", baseline: athlete.baseline.totalScore || 0, result: athlete.results.totalScore || 0 },
            { label: "Accuracy", baseline: athlete.baseline.accuracy || 0, result: athlete.results.accuracy || 0 },
            { label: "Speed", baseline: athlete.baseline.speed || 0, result: athlete.results.speed || 0 },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between text-[10px] font-clinical mb-1">
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
          <div className="flex justify-center gap-4 pt-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-current/30" />
              <span className="text-[9px] font-clinical opacity-50">Baseline</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-emerald-500" />
              <span className="text-[9px] font-clinical opacity-50">Result</span>
            </div>
          </div>
        </div>

        {/* Test Info */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-current/10">
          <div className="text-center">
            <p className="text-lg font-bold font-clinical">{athlete.testsCompleted}</p>
            <p className="font-clinical text-[10px] opacity-50">Tests</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold font-clinical">{athlete.baselineTests}</p>
            <p className="font-clinical text-[10px] opacity-50">Baseline</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold font-clinical">{athlete.postBaselineTests}</p>
            <p className="font-clinical text-[10px] opacity-50">Post</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-current/5 flex items-center justify-between border-t border-current/10">
        <span className="font-clinical text-xs opacity-60">{athlete.testingPeriod}</span>
        {athlete.protocolUsed && (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 text-[10px] font-clinical">
            {athlete.protocolUsed}
          </span>
        )}
      </div>
    </div>
  );
}

export default function FormulaCaseStudies({ formulaId }: FormulaCaseStudiesProps) {
  const athletes = getAthletesForFormula(formulaId);
  const [activeAthlete, setActiveAthlete] = useState(athletes[0]);

  if (athletes.length === 0) return null;

  return (
    <section className="premium-section">
      <div className="premium-container">
      <div className="mb-6">
        <p className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-1">Verified Results</p>
        <h2 className="premium-heading mb-1">Athlete Case Studies</h2>
        <p className="premium-annotation opacity-70">real data, measured improvement</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-3">
          {athletes.map((athlete) => (
            <AthleteMetricCardCompact
              key={athlete.id}
              athlete={athlete}
              isActive={activeAthlete.id === athlete.id}
              onClick={() => setActiveAthlete(athlete)}
            />
          ))}
        </div>

        <div>
          <AthleteDetailCompact athlete={activeAthlete} />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <Link 
          href="/case-studies"
          className="neo-button-outline px-6 py-2 inline-flex items-center gap-2 font-semibold text-sm"
        >
          View All Case Studies
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
      </div>
    </section>
  );
}

export function FormulaCaseStudiesMobile({ formulaId }: FormulaCaseStudiesProps) {
  const athletes = getAthletesForFormula(formulaId);
  const [activeIndex, setActiveIndex] = useState(0);

  if (athletes.length === 0) return null;

  const athlete = athletes[activeIndex];

  return (
    <section className="premium-section">
      <div className="mb-5">
        <p className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-1">Verified Results</p>
        <h2 className="premium-heading mb-1">Athlete Case Studies</h2>
        <p className="premium-annotation opacity-70">real data, measured improvement</p>
      </div>

      <div className="relative">
        <AthleteDetailCompact athlete={athlete} />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setActiveIndex(prev => prev === 0 ? athletes.length - 1 : prev - 1)}
            className="neo-button p-2"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className="flex gap-2">
            {athletes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === activeIndex ? "bg-amber-500 w-4" : "bg-current/20"
                }`}
                aria-label={`Go to athlete ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIndex(prev => prev === athletes.length - 1 ? 0 : prev + 1)}
            className="neo-button p-2"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <Link 
          href="/case-studies"
          className="neo-button-outline px-6 py-2 inline-flex items-center gap-2 font-semibold text-sm"
        >
          View All Case Studies
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
