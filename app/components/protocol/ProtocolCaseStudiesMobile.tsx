"use client";

import { useState } from "react";
import { ProtocolId } from "@/app/lib/productData";

interface ProtocolCaseStudiesMobileProps {
  protocolId: ProtocolId;
}

interface Athlete {
  name: string;
  sport: string;
  protocol: string;
  quote: string;
  results: string[];
}

// Protocol-specific case studies
const protocolCaseStudies: Record<ProtocolId, Athlete[]> = {
  "1": [
    {
      name: "Sarah Okonkwo",
      sport: "Professional Rugby",
      protocol: "Protocol 1 - Pro Tier",
      quote: "The daily Conka Flow keeps me sharp during training, and the weekly Conka Clarity boost is perfect for match days.",
      results: ["+18% decision accuracy", "Better recovery", "Improved sleep"],
    },
    {
      name: "David Chen",
      sport: "Marathon Runner",
      protocol: "Protocol 1 - Max Tier",
      quote: "My endurance training has never been better. The stress resilience is game-changing.",
      results: ["-24% cortisol", "Faster recovery", "No crashes"],
    },
  ],
  "2": [
    {
      name: "James Torres",
      sport: "Esports Pro",
      protocol: "Protocol 2 - Pro Tier",
      quote: "Six-hour tournament sessions with zero mental fatigue. This is my competitive edge.",
      results: ["+23% reaction time", "6+ hour focus", "Reduced fatigue"],
    },
    {
      name: "Emma Williams",
      sport: "Chess Grandmaster",
      protocol: "Protocol 2 - Max Tier",
      quote: "The sustained cognitive enhancement is remarkable. I calculate deeper, faster.",
      results: ["+38% mental endurance", "Clearer analysis", "Better recall"],
    },
  ],
  "3": [
    {
      name: "Marcus Chen",
      sport: "Olympic Swimming",
      protocol: "Protocol 3 - Pro Tier",
      quote: "The balanced approach gives me the best of both worlds. Perfect for my training cycle.",
      results: ["+12% consistency", "-0.3s average time", "Zero crashes"],
    },
    {
      name: "Lisa Park",
      sport: "CrossFit Athlete",
      protocol: "Protocol 3 - Max Tier",
      quote: "Alternating formulas matches my varied training perfectly. I feel optimized every day.",
      results: ["Balanced energy", "Better adaptation", "Peak readiness"],
    },
  ],
  "4": [
    {
      name: "Alex Rodriguez",
      sport: "F1 Development Driver",
      protocol: "Protocol 4 - Pro Tier",
      quote: "Maximum cognitive support for maximum performance. Nothing else compares at this level.",
      results: ["2.3x effect", "All-day clarity", "Elite focus"],
    },
    {
      name: "Nina Volkov",
      sport: "Professional Poker",
      protocol: "Protocol 4 - Max Tier",
      quote: "Tournament poker demands peak cognition for 12+ hours. This protocol delivers.",
      results: ["8+ hour sessions", "Sharp decisions", "No fatigue"],
    },
  ],
};

export default function ProtocolCaseStudiesMobile({ protocolId }: ProtocolCaseStudiesMobileProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const athletes = protocolCaseStudies[protocolId] || protocolCaseStudies["1"];
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
        <p className="font-commentary text-base opacity-70">real results from real users</p>
      </div>

      {/* Profile Card */}
      <div className="neo-box overflow-hidden">
        {/* Athlete Photo Placeholder */}
        <div className="w-full h-40 bg-gradient-to-br from-[#AAB9BC]/20 to-[#AAB9BC]/40 flex items-center justify-center border-b-2 border-current/10">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-30">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <p className="font-clinical text-xs opacity-40">[ATHLETE PHOTO]</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name & Sport */}
          <div className="mb-3">
            <h3 className="text-lg font-bold">{currentAthlete.name}</h3>
            <p className="font-clinical text-sm opacity-70">{currentAthlete.sport}</p>
          </div>

          {/* Protocol Badge */}
          <div className="mb-3">
            <span className="px-2 py-1 bg-[#AAB9BC]/20 text-[#AAB9BC] rounded-full font-clinical text-xs font-bold">
              {currentAthlete.protocol}
            </span>
          </div>

          {/* Quote */}
          <div className="mb-4 py-3 border-t border-b border-current/10">
            <p className="font-commentary text-base italic">
              &quot;{currentAthlete.quote}&quot;
            </p>
          </div>

          {/* Results */}
          <div>
            <p className="font-clinical text-xs uppercase opacity-50 mb-2">Key Results</p>
            <div className="flex flex-wrap gap-2">
              {currentAthlete.results.map((result, idx) => (
                <span key={idx} className="px-2 py-1 bg-current/10 rounded-full font-clinical text-xs">
                  {result}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#AAB9BC] text-white">
          <button
            onClick={handlePrev}
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Previous athlete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <span className="font-clinical text-sm">
              {activeIndex + 1} / {athletes.length}
            </span>
          </div>

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
                ? "bg-[#AAB9BC] w-4"
                : "bg-black/30"
            }`}
            aria-label={`Go to athlete ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

