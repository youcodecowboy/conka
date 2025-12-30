"use client";

import { useState } from "react";
import Image from "next/image";
import useIsMobile from "../hooks/useIsMobile";
import ProtocolBuilderMobile from "./ProtocolBuilderMobile";

export type PathType = "path1" | "path2" | "path3" | "path4" | null;
export type ProtocolTier = "starter" | "pro" | "max";

// Formula colors - ALWAYS consistent regardless of path
export const FORMULA_COLORS = {
  "01": "bg-[#AAB9BC]", // Conka Flow is ALWAYS teal
  "02": "bg-amber-500", // Conka Clarity is ALWAYS amber
};

export interface PathInfo {
  id: PathType;
  title: string;
  subtitle: string;
  primaryFormula: "01" | "02";
  secondaryFormula: "01" | "02" | null; // null for path3 (balanced)
  icon: React.ReactNode;
  bestFor: string[];
  description: string;
  benefits: string[];
  isBalanced?: boolean; // for path3
  isUltimate?: boolean; // for path4 - both formulas daily
  availableTiers?: ProtocolTier[]; // restrict which tiers are available
}

export const pathData: Record<Exclude<PathType, null>, PathInfo> = {
  path1: {
    id: "path1",
    title: "Protocol 1",
    subtitle: "Conka Flow Daily • Conka Clarity Weekly",
    primaryFormula: "01",
    secondaryFormula: "02",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    bestFor: ["Recovery Focus", "Stress Management", "Daily Wellness"],
    description: "Daily adaptogen support with Conka Flow's Ashwagandha and Rhodiola builds stress resilience and recovery. Weekly Conka Clarity boosts provide peak cognitive performance when you need it most.",
    benefits: [
      "Better stress response (-24% cortisol)",
      "Reduced brain fog & faster recovery",
      "Improved sleep quality (+31%)",
      "Sharp reaction time when it counts"
    ]
  },
  path2: {
    id: "path2",
    title: "Protocol 2",
    subtitle: "Conka Clarity Daily • Conka Flow Weekly",
    primaryFormula: "02",
    secondaryFormula: "01",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    bestFor: ["Peak Performance", "Mental Endurance", "Cognitive Enhancement"],
    description: "Front-load with cognitive enhancers for sustained mental endurance. Conka Clarity's Alpha GPC and Vitamin C build your neurological foundation, while weekly Conka Flow adaptogens prevent burnout.",
    benefits: [
      "Sustained focus during long sessions",
      "Enhanced mental endurance (+38%)",
      "Optimized neurotransmitter production",
      "Reduced cognitive fatigue over time"
    ]
  },
  path3: {
    id: "path3",
    title: "Protocol 3",
    subtitle: "Conka Flow & Conka Clarity Balanced",
    primaryFormula: "01",
    secondaryFormula: "02",
    isBalanced: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
    bestFor: ["Balanced Approach", "All-Rounders", "Hybrid Athletes"],
    description: "The best of both worlds. Alternate between Conka Flow and Conka Clarity for comprehensive cognitive support. Perfect for those who want the full spectrum of benefits without committing to one dominant formula.",
    benefits: [
      "Complete cognitive coverage",
      "Adaptogen + nootropic synergy",
      "Flexible scheduling",
      "Holistic brain optimization"
    ]
  },
  path4: {
    id: "path4",
    title: "Protocol 4",
    subtitle: "Both Formulas Daily",
    primaryFormula: "01",
    secondaryFormula: "02",
    isUltimate: true,
    availableTiers: ["pro", "max"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
    bestFor: ["Elite Performance", "Maximum Results", "No Compromise"],
    description: "Maximum cognitive enhancement with both Conka Flow and Conka Clarity every single day. This is the most comprehensive protocol for those who demand peak performance in every aspect of their cognitive function.",
    benefits: [
      "Daily adaptogen + nootropic stack",
      "Peak energy AND clarity every day",
      "Maximum neurological support",
      "The complete cognitive toolkit"
    ]
  }
};

export const protocolTiers: Record<ProtocolTier, { name: string; primaryCount: number; secondaryCount: number; description: string }> = {
  starter: {
    name: "Starter",
    primaryCount: 3,
    secondaryCount: 1,
    description: "Gentle introduction for newcomers"
  },
  pro: {
    name: "Pro",
    primaryCount: 5,
    secondaryCount: 1,
    description: "Balanced protocol for consistent results"
  },
  max: {
    name: "Max",
    primaryCount: 6,
    secondaryCount: 1,
    description: "Full month coverage for maximum effect"
  }
};

// For balanced path (Path 3)
export const balancedTiers: Record<ProtocolTier, { name: string; conkaFlowCount: number; conkaClarityCount: number; description: string }> = {
  starter: {
    name: "Starter",
    conkaFlowCount: 2,
    conkaClarityCount: 2,
    description: "Gentle introduction with balanced formulas"
  },
  pro: {
    name: "Pro",
    conkaFlowCount: 3,
    conkaClarityCount: 3,
    description: "Balanced weekly coverage"
  },
  max: {
    name: "Max",
    conkaFlowCount: 4,
    conkaClarityCount: 3,
    description: "Maximum balanced coverage"
  }
};

// For ultimate path (Path 4) - both formulas daily
export const ultimateTiers: Record<"pro" | "max", { name: string; conkaFlowCount: number; conkaClarityCount: number; description: string }> = {
  pro: {
    name: "Pro",
    conkaFlowCount: 6,
    conkaClarityCount: 6,
    description: "Bi-weekly delivery of the full stack"
  },
  max: {
    name: "Max",
    conkaFlowCount: 7,
    conkaClarityCount: 7,
    description: "Daily coverage of both formulas"
  }
};

// Pricing data
export const pricingData: Record<ProtocolTier, { price: string; billingCycle: string }> = {
  starter: { price: "£15.99", billingCycle: "billed weekly" },
  pro: { price: "£39.99", billingCycle: "billed bi-weekly" },
  max: { price: "£79.99", billingCycle: "billed monthly" }
};

// Ultimate pricing (higher due to double formulas)
export const ultimatePricingData: Record<"pro" | "max", { price: string; billingCycle: string }> = {
  pro: { price: "£59.99", billingCycle: "billed bi-weekly" },
  max: { price: "£99.99", billingCycle: "billed monthly" }
};

export default function ProtocolBuilder() {
  const isMobile = useIsMobile();
  const [selectedPath, setSelectedPath] = useState<PathType>(null);
  const [selectedTier, setSelectedTier] = useState<ProtocolTier>("pro");

  // Render mobile version on smaller screens
  if (isMobile) {
    return <ProtocolBuilderMobile />;
  }

  const handlePathSelect = (path: PathType) => {
    setSelectedPath(path);
  };

  const handleBackToOptions = () => {
    setSelectedPath(null);
  };

  const getOtherPaths = (currentPath: Exclude<PathType, null>): Exclude<PathType, null>[] => {
    const allPaths: Exclude<PathType, null>[] = ["path1", "path2", "path3", "path4"];
    return allPaths.filter(p => p !== currentPath);
  };

  // Generate calendar days for a 4-week view
  // Returns the actual formula ("01" or "02") for color consistency
  const generateCalendarDays = (tier: ProtocolTier, path: PathInfo) => {
    const days: Array<{ day: number; formula: "01" | "02" | "both" | "rest" }> = [];
    
    if (path.isUltimate) {
      // Ultimate path: both formulas every day (or most days)
      for (let week = 0; week < 4; week++) {
        for (let day = 0; day < 7; day++) {
          const dayNum = week * 7 + day + 1;
          
          if (tier === "pro") {
            // Pro ultimate (6+6): Mon-Sat both formulas, Sun rest
            if (day >= 0 && day <= 5) {
              days.push({ day: dayNum, formula: "both" });
            } else {
              days.push({ day: dayNum, formula: "rest" });
            }
          } else {
            // Max ultimate (7+7): Every day both formulas
            days.push({ day: dayNum, formula: "both" });
          }
        }
      }
    } else if (path.isBalanced) {
      // Balanced path: alternate between formulas, evenly distributed
      for (let week = 0; week < 4; week++) {
        for (let day = 0; day < 7; day++) {
          const dayNum = week * 7 + day + 1;
          
          if (tier === "starter") {
            // Starter balanced (2+2): Mon = 01, Wed = 02, Fri = 01, Sun = 02
            // Evenly distributed throughout the week
            if (day === 0 || day === 4) {
              days.push({ day: dayNum, formula: "01" });
            } else if (day === 2 || day === 6) {
              days.push({ day: dayNum, formula: "02" });
            } else {
              days.push({ day: dayNum, formula: "rest" });
            }
          } else if (tier === "pro") {
            // Pro balanced (3+3): Mon/Wed/Fri = 01, Tue/Thu/Sat = 02
            // Alternating pattern for even distribution
            if (day === 0 || day === 2 || day === 4) {
              days.push({ day: dayNum, formula: "01" });
            } else if (day === 1 || day === 3 || day === 5) {
              days.push({ day: dayNum, formula: "02" });
            } else {
              days.push({ day: dayNum, formula: "rest" });
            }
          } else {
            // Max balanced (4+3): Mon/Wed/Fri/Sun = 01, Tue/Thu/Sat = 02
            // Full week coverage alternating
            if (day === 0 || day === 2 || day === 4 || day === 6) {
              days.push({ day: dayNum, formula: "01" });
            } else {
              days.push({ day: dayNum, formula: "02" });
            }
          }
        }
      }
    } else {
      // Standard path: primary formula on most days, secondary formula once weekly
      const { primaryFormula, secondaryFormula } = path;
      
      for (let week = 0; week < 4; week++) {
        for (let day = 0; day < 7; day++) {
          const dayNum = week * 7 + day + 1;
          
          if (tier === "starter") {
            // Starter (3+1): Mon, Wed, Fri primary (evenly spaced), Sunday secondary
            if (day === 0 || day === 2 || day === 4) {
              days.push({ day: dayNum, formula: primaryFormula });
            } else if (day === 6) {
              days.push({ day: dayNum, formula: secondaryFormula! });
            } else {
              days.push({ day: dayNum, formula: "rest" });
            }
          } else if (tier === "pro") {
            // Pro (5+1): Mon-Fri primary, Sunday secondary
            if (day >= 0 && day <= 4) {
              days.push({ day: dayNum, formula: primaryFormula });
            } else if (day === 6) {
              days.push({ day: dayNum, formula: secondaryFormula! });
            } else {
              days.push({ day: dayNum, formula: "rest" });
            }
          } else {
            // Max (6+1): Mon-Sat primary, Sunday secondary
            if (day >= 0 && day <= 5) {
              days.push({ day: dayNum, formula: primaryFormula });
            } else {
              days.push({ day: dayNum, formula: secondaryFormula! });
            }
          }
        }
      }
    }
    
    return days;
  };

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Protocol</h2>
          <p className="font-commentary text-xl">two formulas, four paths</p>
        </div>

        {/* Path Selection View */}
        {selectedPath === null ? (
          <div className="space-y-12">
            {/* Formula Images Side by Side */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <Image
                  src="/3.png"
                  alt="Conka Conka Flow and Conka Clarity"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Path Cards - Four Columns */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(["path1", "path2", "path3", "path4"] as const).map((pathKey) => {
                const path = pathData[pathKey];
                return (
                  <button
                    key={pathKey}
                    onClick={() => handlePathSelect(pathKey)}
                    className="neo-box p-6 text-left hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2.5 border-2 border-current rounded-lg group-hover:bg-current group-hover:text-[var(--background)] transition-colors">
                        {path.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{path.title}</h3>
                        <p className="font-clinical text-xs opacity-70 mt-1">{path.subtitle}</p>
                      </div>
                    </div>

                    <p className="font-commentary text-base mb-3">best for {path.bestFor[0].toLowerCase()}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {path.bestFor.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 border border-current rounded-full font-clinical text-xs">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 font-clinical text-sm opacity-70">
                      <span>Click to explore</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Formula Legend - Always consistent colors */}
            <div className="flex justify-center gap-8 pt-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#AAB9BC] rounded-sm"></div>
                <span className="font-clinical text-sm">Conka Flow – Caffeine-Free Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded-sm"></div>
                <span className="font-clinical text-sm">Conka Clarity – Peak Performance</span>
              </div>
            </div>
          </div>
        ) : (
          /* Expanded Path View */
          <div className="space-y-8">
            {/* Navigation Bar */}
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <button
                onClick={handleBackToOptions}
                className="flex items-center gap-2 neo-button-outline px-5 py-2.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span className="font-clinical text-sm">Back to Options</span>
              </button>

              <div className="flex gap-2">
                {getOtherPaths(selectedPath).map((otherPath) => (
                  <button
                    key={otherPath}
                    onClick={() => setSelectedPath(otherPath)}
                    className="flex items-center gap-2 neo-button-outline px-4 py-2"
                  >
                    <span className="font-clinical text-sm">
                      View {pathData[otherPath].title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Formula Image & Info */}
              <div className="lg:w-2/5 space-y-6">
                <div className="neo-box p-6">
                  <div className="relative w-full h-64 mb-6">
                    <Image
                      src={selectedPath === "path2" ? "/2.png" : "/1.png"}
                      alt={`Formula ${pathData[selectedPath].primaryFormula}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 border-2 border-current rounded-lg">
                      {pathData[selectedPath].icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{pathData[selectedPath].title}</h3>
                      <p className="font-clinical text-sm opacity-70">{pathData[selectedPath].subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {pathData[selectedPath].bestFor.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 border border-current rounded-full font-clinical text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="neo-box-inverted p-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold">{pricingData[selectedTier].price}</span>
                    <span className="font-clinical text-sm opacity-80">{pricingData[selectedTier].billingCycle}</span>
                  </div>
                  <p className="font-clinical text-xs opacity-70 mb-4">
                    {protocolTiers[selectedTier].name} Plan • {protocolTiers[selectedTier].primaryCount + protocolTiers[selectedTier].secondaryCount} shots/week
                  </p>
                  <button className="w-full px-6 py-3 font-semibold mb-3 rounded-full bg-white text-black border-2 border-white hover:bg-white/90 transition-all">
                    Subscribe Now
                  </button>
                  <button className="w-full text-center font-clinical text-sm underline opacity-80 hover:opacity-100 transition-opacity">
                    Try a trial pack instead →
                  </button>
                </div>

                {/* Formula Legend for this path */}
                <div className="neo-box p-4 space-y-3">
                  <p className="font-clinical text-xs uppercase opacity-70">Your Protocol</p>
                  {pathData[selectedPath].isBalanced ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-md bg-[#AAB9BC] flex items-center justify-center">
                          <span className="text-white font-clinical text-xs font-bold">01</span>
                        </div>
                        <span className="font-clinical text-sm">
                          Conka Flow – Alternating Days
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center">
                          <span className="text-white font-clinical text-xs font-bold">02</span>
                        </div>
                        <span className="font-clinical text-sm">
                          Conka Clarity – Alternating Days
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-md ${FORMULA_COLORS[pathData[selectedPath].primaryFormula]} flex items-center justify-center`}>
                          <span className="text-white font-clinical text-xs font-bold">
                            {pathData[selectedPath].primaryFormula}
                          </span>
                        </div>
                        <span className="font-clinical text-sm">
                          Formula {pathData[selectedPath].primaryFormula} – Daily Foundation
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-md ${FORMULA_COLORS[pathData[selectedPath].secondaryFormula!]} flex items-center justify-center`}>
                          <span className="text-white font-clinical text-xs font-bold">
                            {pathData[selectedPath].secondaryFormula}
                          </span>
                        </div>
                        <span className="font-clinical text-sm">
                          Formula {pathData[selectedPath].secondaryFormula} – Weekly Boost
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Tier Description - moved here from right side */}
                <div className="p-4 border-l-4 border-current opacity-80">
                  <p className="font-commentary text-lg">
                    {pathData[selectedPath].isBalanced 
                      ? balancedTiers[selectedTier].description 
                      : protocolTiers[selectedTier].description}
                  </p>
                  <p className="font-clinical text-sm mt-2">
                    {pathData[selectedPath].isBalanced ? (
                      <>
                        {selectedTier === "starter" && "Perfect for newcomers wanting to experience both formulas equally."}
                        {selectedTier === "pro" && "The balanced approach — alternating formulas for comprehensive coverage."}
                        {selectedTier === "max" && "Full spectrum support with near-daily alternation between formulas."}
                      </>
                    ) : (
                      <>
                        {selectedTier === "starter" && "Perfect for first-timers looking to experience the benefits gradually."}
                        {selectedTier === "pro" && "The sweet spot — consistent weekday dosing with weekend recovery."}
                        {selectedTier === "max" && "For athletes who need peak cognitive function six days a week."}
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Right: Calendar & Tiers */}
              <div className="lg:w-3/5 space-y-6">
                {/* Protocol Tier Selector */}
                <div className="flex gap-3">
                  {(Object.keys(protocolTiers) as ProtocolTier[]).map((tier) => {
                    const isBalanced = pathData[selectedPath].isBalanced;
                    const tierData = isBalanced ? balancedTiers[tier] : protocolTiers[tier];
                    const countDisplay = isBalanced 
                      ? `${balancedTiers[tier].conkaFlowCount}+${balancedTiers[tier].conkaClarityCount}`
                      : `${protocolTiers[tier].primaryCount}+${protocolTiers[tier].secondaryCount}`;
                    
                    return (
                      <button
                        key={tier}
                        onClick={() => setSelectedTier(tier)}
                        className={`flex-1 p-4 transition-all ${
                          selectedTier === tier ? "neo-box-inverted" : "neo-box hover:shadow-[4px_4px_0px_0px_var(--foreground)]"
                        }`}
                      >
                        <p className="font-clinical text-xs uppercase opacity-70">{tierData.name}</p>
                        <p className="text-lg font-bold mt-1">{countDisplay}</p>
                        <p className="font-commentary text-sm mt-1">weekly</p>
                      </button>
                    );
                  })}
                </div>

                {/* Calendar */}
                <div className="neo-box p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold">Your Month</h4>
                    <span className="font-clinical text-sm opacity-70">
                      {(() => {
                        const isBalanced = pathData[selectedPath].isBalanced;
                        if (isBalanced) {
                          const { conkaFlowCount, conkaClarityCount } = balancedTiers[selectedTier];
                          return `${conkaFlowCount * 4} × F01 + ${conkaClarityCount * 4} × F02`;
                        } else {
                          const { primaryCount, secondaryCount } = protocolTiers[selectedTier];
                          return `${primaryCount * 4} + ${secondaryCount * 4} doses`;
                        }
                      })()}
                    </span>
                  </div>

                  {/* Week Days Header */}
                  <div className="grid grid-cols-7 gap-2 mb-3">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-center font-clinical text-xs opacity-70 py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid - Colors tied to FORMULA, not role */}
                  <div className="grid grid-cols-7 gap-2">
                    {generateCalendarDays(selectedTier, pathData[selectedPath]).map((day, idx) => (
                      <div
                        key={idx}
                        className={`aspect-square flex items-center justify-center font-clinical text-sm rounded-md transition-all ${
                          day.formula === "01"
                            ? "bg-[#AAB9BC] text-white"
                            : day.formula === "02"
                            ? "bg-amber-500 text-white"
                            : day.formula === "both"
                            ? "bg-gradient-to-br from-[#AAB9BC] to-amber-500 text-white"
                            : "border-2 border-current opacity-20"
                        }`}
                      >
                        {day.day}
                      </div>
                    ))}
                  </div>

                  {/* Legend - Always consistent formula colors */}
                  <div className="flex gap-6 mt-4 pt-4 border-t border-current border-opacity-20 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-teal-500"></div>
                      <span className="font-clinical text-xs">Conka Flow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-amber-500"></div>
                      <span className="font-clinical text-xs">Conka Clarity</span>
                    </div>
                  </div>
                </div>

                {/* Protocol Description */}
                <div className="neo-box p-6">
                  <p className="font-clinical text-xs uppercase opacity-70 mb-3">Why This Path Works</p>
                  <p className="text-base mb-4">{pathData[selectedPath].description}</p>
                  
                  <div className="space-y-2">
                    {pathData[selectedPath].benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#AAB9BC] flex-shrink-0 mt-0.5">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span className="font-clinical text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

