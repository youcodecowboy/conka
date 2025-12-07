"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import RadarChart from "./RadarChart";

export interface Benefit {
  id: string;
  title: string;
  icon?: React.ReactNode; // SVG icon component
  stat: string;
  annotation: string;
  description: string;
  clinicalBreakdown?: {
    study: string;
    participants: string;
    duration: string;
    results: string[];
  };
  image?: string; // Image path
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

interface KeyBenefitsProps {
  benefits: Benefit[];
}

export default function KeyBenefits({ benefits }: KeyBenefitsProps) {
  const [activeBenefit, setActiveBenefit] = useState(0);

  const currentBenefit = benefits[activeBenefit];

  // Generate chart data showing baseline vs improved performance
  const chartData = useMemo(() => {
    // Extract percentage from stat (e.g., "+22.1%" -> 22.1)
    const statMatch = currentBenefit.stat.match(/(\d+\.?\d*)/);
    const improvementValue = statMatch ? parseFloat(statMatch[1]) : 0;
    
    // Baseline human performance (all dimensions start at ~12%)
    const baseline = 12;
    
    // Map benefit IDs to their primary category
    const benefitCategoryMap: { [key: string]: string } = {
      "focus": "Focus",
      "sleep": "Energy", // Sleep improves Energy/Recovery
      "brain-fog": "Clarity", // Brain fog relates to Clarity
      "stress": "Recovery", // Stress resilience relates to Recovery
      "memory": "Memory",
    };
    
    const primaryCategory = benefitCategoryMap[currentBenefit.id] || "Performance";
    
    // Create categories with the primary category getting full improvement,
    // and others getting smaller improvements
    const categories = [
      { 
        category: "Focus", 
        baseline: baseline, 
        improved: baseline + (primaryCategory === "Focus" ? improvementValue : improvementValue * 0.3)
      },
      { 
        category: "Memory", 
        baseline: baseline, 
        improved: baseline + (primaryCategory === "Memory" ? improvementValue : improvementValue * 0.3)
      },
      { 
        category: "Energy", 
        baseline: baseline, 
        improved: baseline + (primaryCategory === "Energy" ? improvementValue : improvementValue * 0.3)
      },
      { 
        category: "Clarity", 
        baseline: baseline, 
        improved: baseline + (primaryCategory === "Clarity" ? improvementValue : improvementValue * 0.3)
      },
      { 
        category: "Recovery", 
        baseline: baseline, 
        improved: baseline + (primaryCategory === "Recovery" ? improvementValue : improvementValue * 0.3)
      },
      { 
        category: "Performance", 
        baseline: baseline, 
        improved: baseline + (primaryCategory === "Performance" ? improvementValue : improvementValue * 0.4)
      },
    ];

    return categories;
  }, [currentBenefit.stat, currentBenefit.id]);

  const mainStatValue = useMemo(() => {
    const statMatch = currentBenefit.stat.match(/(\d+\.?\d*)/);
    return statMatch ? parseFloat(statMatch[1]) : 0;
  }, [currentBenefit.stat]);

  return (
    <section className="w-full">
      {/* Navigation - Edge to edge, right-aligned */}
      <div className="w-full bg-[var(--background)]">
        <div className="px-6 md:px-16 py-6">
          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Key Benefits</h2>
              <p className="font-commentary text-xl">backed by real science</p>
            </div>
            
            {/* Benefit Navigation Buttons - Pill shaped */}
            <div className="flex flex-wrap gap-3 justify-end">
              {benefits.map((benefit, idx) => {
                const isActive = idx === activeBenefit;
                return (
                  <button
                    key={benefit.id}
                    onClick={() => setActiveBenefit(idx)}
                    className={`px-5 py-2 rounded-full border-2 border-black transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-transparent text-black hover:bg-black/10"
                    }`}
                  >
                    {benefit.icon && (
                      <span className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-black"}`}>
                        {benefit.icon}
                      </span>
                    )}
                    <span className="font-primary font-medium text-sm whitespace-nowrap">
                      {benefit.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Content Section - Edge to edge */}
      <div className="w-full bg-[var(--background)]">
        <div className="px-6 md:px-16 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Main Content */}
              <div className="space-y-6">
                {/* Title Section with Radar Chart - 2 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Left Column: Stat, Title, Annotation, Description */}
                  <div>
                    <p className="font-clinical text-6xl font-bold mb-2">
                      {currentBenefit.stat}
                    </p>
                    <h3 className="text-3xl font-bold mb-2">
                      {currentBenefit.title}
                    </h3>
                    <p className="font-commentary text-xl mb-4">
                      {currentBenefit.annotation}
                    </p>
                    <p className="text-lg opacity-80">
                      {currentBenefit.description}
                    </p>
                  </div>
                  
                  {/* Right Column: Radar Chart */}
                  <div className="w-full flex items-center justify-center overflow-visible">
                    <div className="w-[280px] md:w-[320px] overflow-visible">
                      <RadarChart data={chartData} mainValue={mainStatValue} />
                    </div>
                  </div>
                </div>

                {/* Clinical Breakdown */}
                {currentBenefit.clinicalBreakdown && (
                  <div className="mt-4">
                    {/* Clinical Study Details */}
                    <div className="neo-box p-6">
                      <div className="flex justify-between items-center mb-4">
                        <p className="font-clinical text-sm uppercase opacity-70">
                          Clinical Study Details
                        </p>
                        <p className="font-clinical text-xs opacity-50">
                          vs. baseline human performance
                        </p>
                      </div>
                    <div className="space-y-3 font-clinical text-sm">
                      <div>
                        <span className="opacity-70">Study:</span>{" "}
                        <span>{currentBenefit.clinicalBreakdown.study}</span>
                      </div>
                      <div>
                        <span className="opacity-70">Participants:</span>{" "}
                        <span>{currentBenefit.clinicalBreakdown.participants}</span>
                      </div>
                      <div>
                        <span className="opacity-70">Duration:</span>{" "}
                        <span>{currentBenefit.clinicalBreakdown.duration}</span>
                      </div>
                      <div className="mt-4 pt-4 border-t-2 border-current border-opacity-20">
                        <p className="opacity-70 mb-2">Key Results:</p>
                        <ul className="space-y-1">
                          {currentBenefit.clinicalBreakdown.results.map(
                            (result, idx) => (
                              <li key={idx}>• {result}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                {currentBenefit.testimonial && (
                  <div className="neo-box p-6 mt-6">
                    <p className="font-commentary text-lg mb-2">
                      &quot;{currentBenefit.testimonial.quote}&quot;
                    </p>
                    <p className="font-clinical text-sm opacity-70">
                      — {currentBenefit.testimonial.author}, {currentBenefit.testimonial.role}
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Image/Visual */}
              <div className="flex items-center justify-center">
                {currentBenefit.image ? (
                  <div className="neo-box w-full h-[400px] md:h-[500px] flex items-center justify-center">
                    <Image
                      src={currentBenefit.image}
                      alt={currentBenefit.title}
                      width={600}
                      height={600}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="placeholder-box w-full h-[400px] md:h-[500px]">
                    <span className="font-clinical text-sm opacity-50">
                      [BENEFIT IMAGE]
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

