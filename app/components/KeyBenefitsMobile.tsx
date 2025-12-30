"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import RadarChart from "./RadarChart";
import { Benefit } from "./KeyBenefits";

interface KeyBenefitsMobileProps {
  benefits: Benefit[];
}

export default function KeyBenefitsMobile({ benefits }: KeyBenefitsMobileProps) {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [clinicalExpanded, setClinicalExpanded] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentBenefit = benefits[activeBenefit];

  // Check scroll position to update indicators
  const updateScrollIndicators = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Scroll active benefit into view when it changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const activeButton = container.children[activeBenefit] as HTMLElement;
    if (activeButton) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      // Calculate scroll position to center the button
      const scrollLeft = activeButton.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2);
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeBenefit]);

  // Initialize scroll indicators
  useEffect(() => {
    updateScrollIndicators();
  }, []);

  // Generate chart data showing baseline vs improved performance
  const chartData = useMemo(() => {
    const statMatch = currentBenefit.stat.match(/(\d+\.?\d*)/);
    const improvementValue = statMatch ? parseFloat(statMatch[1]) : 0;
    
    const baseline = 12;
    
    const benefitCategoryMap: { [key: string]: string } = {
      "focus": "Focus",
      "sleep": "Energy",
      "brain-fog": "Clarity",
      "stress": "Recovery",
      "memory": "Memory",
    };
    
    const primaryCategory = benefitCategoryMap[currentBenefit.id] || "Performance";
    
    const categories = [
      { category: "Focus", baseline, improved: baseline + (primaryCategory === "Focus" ? improvementValue : improvementValue * 0.3) },
      { category: "Memory", baseline, improved: baseline + (primaryCategory === "Memory" ? improvementValue : improvementValue * 0.3) },
      { category: "Energy", baseline, improved: baseline + (primaryCategory === "Energy" ? improvementValue : improvementValue * 0.3) },
      { category: "Clarity", baseline, improved: baseline + (primaryCategory === "Clarity" ? improvementValue : improvementValue * 0.3) },
      { category: "Recovery", baseline, improved: baseline + (primaryCategory === "Recovery" ? improvementValue : improvementValue * 0.3) },
      { category: "Performance", baseline, improved: baseline + (primaryCategory === "Performance" ? improvementValue : improvementValue * 0.4) },
    ];

    return categories;
  }, [currentBenefit.stat, currentBenefit.id]);

  const mainStatValue = useMemo(() => {
    const statMatch = currentBenefit.stat.match(/(\d+\.?\d*)/);
    return statMatch ? parseFloat(statMatch[1]) : 0;
  }, [currentBenefit.stat]);

  return (
    <section className="w-full pt-2 pb-8">
      {/* Header Section - Left Aligned */}
      <div className="px-6 mb-4">
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1">Key Benefits</h2>
          <p className="font-commentary text-lg sm:text-xl">backed by real science</p>
        </div>
      </div>

      {/* Horizontal Scroll Carousel for Benefits */}
      <div className="relative mb-3">
        {/* Fade indicators - only show when scrollable */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
        )}
        
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          onScroll={updateScrollIndicators}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-6 pb-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {benefits.map((benefit, idx) => {
            const isActive = idx === activeBenefit;
            return (
              <button
                key={benefit.id}
                onClick={() => setActiveBenefit(idx)}
                className={`snap-center flex-shrink-0 px-3.5 py-1.5 rounded-full border-2 border-black transition-all flex items-center gap-2 min-h-[36px] ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-transparent text-black active:bg-black/10"
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

      {/* Scroll Indicator */}
      <div className="px-6 mb-5 flex items-center gap-2">
        <div className="flex gap-1">
          {benefits.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === activeBenefit 
                  ? 'w-4 bg-black' 
                  : 'w-1.5 bg-black/20'
              }`}
            />
          ))}
        </div>
        <span className="font-clinical text-xs opacity-50 ml-2">swipe for more</span>
      </div>

      {/* Main Content Area */}
      <div className="px-6">
        {/* Stat Display - Right Aligned */}
        <div className="text-right mb-2 mt-6">
          <p className="font-clinical text-5xl sm:text-6xl font-bold mb-1">
            {currentBenefit.stat}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold mb-1">
            {currentBenefit.title}
          </h3>
          <p className="font-commentary text-base sm:text-lg opacity-80">
            {currentBenefit.annotation}
          </p>
        </div>

        {/* Description - Right Aligned */}
        <p className="text-sm sm:text-base opacity-80 text-right mb-2">
          {currentBenefit.description}
        </p>

        {/* Radar Chart - Large and Prominent */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-full max-w-[340px] sm:max-w-[380px]">
            <RadarChart data={chartData} mainValue={mainStatValue} />
          </div>
        </div>

        {/* Collapsible Clinical Studies */}
        {currentBenefit.clinicalBreakdown && (
          <div className="mb-5">
            <button
              onClick={() => setClinicalExpanded(!clinicalExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 neo-box transition-all active:opacity-80"
            >
              <span className="font-clinical text-sm uppercase">
                {clinicalExpanded ? "Hide Clinical Details" : "View Clinical Study Details"}
              </span>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${clinicalExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expandable Content */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                clinicalExpanded ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="neo-box p-4">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-clinical text-xs uppercase opacity-70">
                    Clinical Study Details
                  </p>
                  <p className="font-clinical text-xs opacity-50">
                    vs. baseline
                  </p>
                </div>
                <div className="space-y-2 font-clinical text-sm">
                  <div>
                    <span className="opacity-70">Study:</span>{" "}
                    <span className="text-xs sm:text-sm">{currentBenefit.clinicalBreakdown.study}</span>
                  </div>
                  <div>
                    <span className="opacity-70">Participants:</span>{" "}
                    <span>{currentBenefit.clinicalBreakdown.participants}</span>
                  </div>
                  <div>
                    <span className="opacity-70">Duration:</span>{" "}
                    <span>{currentBenefit.clinicalBreakdown.duration}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t-2 border-current border-opacity-20">
                    <p className="opacity-70 mb-2 text-xs">Key Results:</p>
                    <ul className="space-y-1 text-xs sm:text-sm">
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
          </div>
        )}

        {/* Testimonial */}
        {currentBenefit.testimonial && (
          <div className="neo-box p-4">
            <p className="font-commentary text-base mb-2">
              &quot;{currentBenefit.testimonial.quote}&quot;
            </p>
            <p className="font-clinical text-xs opacity-70">
              — {currentBenefit.testimonial.author}, {currentBenefit.testimonial.role}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
