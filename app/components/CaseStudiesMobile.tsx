"use client";

import { useState } from "react";
import { Athlete } from "./CaseStudies";

interface CaseStudiesMobileProps {
  athletes: Athlete[];
}

export default function CaseStudiesMobile({ athletes }: CaseStudiesMobileProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentAthlete = athletes[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? athletes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === athletes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="px-6 pt-4 pb-10">
      {/* Header - Left Aligned */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-1">Case Studies</h2>
        <p className="font-commentary text-lg">real athletes, real results</p>
      </div>

      {/* Single Profile Card */}
      <div className="border-2 border-black rounded-lg overflow-hidden">
        {/* Athlete Photo */}
        <div className="placeholder-box w-full h-48 rounded-none border-0 border-b-2 border-black">
          <span className="font-clinical text-sm">[ATHLETE PHOTO]</span>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Name & Sport */}
          <div className="mb-4">
            <h3 className="text-xl font-bold">{currentAthlete.name}</h3>
            <p className="font-clinical text-sm opacity-70">{currentAthlete.sport}</p>
          </div>

          {/* Protocol */}
          <div className="mb-4">
            <p className="font-clinical text-xs opacity-60 uppercase tracking-wider mb-1">Protocol</p>
            <p className="text-sm font-medium">{currentAthlete.protocol}</p>
          </div>

          {/* Quote */}
          <div className="mb-4 py-3 border-t border-b border-black/10">
            <p className="font-commentary text-lg italic">
              &quot;{currentAthlete.quote}&quot;
            </p>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-black text-white">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Previous athlete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* Position Indicator */}
          <div className="flex items-center gap-3">
            <span className="font-clinical text-sm">
              {activeIndex + 1} / {athletes.length}
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Next athlete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {athletes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === activeIndex
                ? "bg-black w-4"
                : "bg-black/30"
            }`}
            aria-label={`Go to athlete ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

