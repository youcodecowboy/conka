"use client";

import { useState } from "react";

type FormulaType = "01" | "02";
type PackSize = "4" | "8" | "12";

const packPricing: Record<PackSize, string> = {
  "4": "£14.99",
  "8": "£24.99",
  "12": "£34.99",
};

const formulaExplanations = {
  "01": {
    title: "Formula 01",
    subtitle: "Caffeine-Free Focus",
    description: "Daily adaptogen support with Ashwagandha and Rhodiola builds stress resilience and recovery. Perfect for sustained focus without the crash.",
    keyPoints: [
      "Improved focus (+22.1%)",
      "Better sleep quality (+31.4%)",
      "Reduced brain fog",
      "Decreased anxiety"
    ]
  },
  "02": {
    title: "Formula 02",
    subtitle: "Peak Performance Boost",
    description: "Cognitive enhancers like Alpha GPC and Vitamin C build your neurological foundation. Designed for when you need peak performance.",
    keyPoints: [
      "Faster reaction time (-47ms)",
      "Enhanced mental endurance (+38%)",
      "Better memory recall (+27.9%)",
      "Improved neural connectivity"
    ]
  }
};

export default function TrialPacks() {
  const [selectedFormula, setSelectedFormula] = useState<FormulaType>("01");
  const [selectedPack, setSelectedPack] = useState<PackSize>("4");

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header with Formula Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Left: Heading */}
          <div className="text-left">
            <p className="font-commentary text-xl mb-1">not ready for a protocol?</p>
            <h2 className="text-3xl md:text-4xl font-bold">try our trial packs</h2>
          </div>

          {/* Right: Formula Toggle */}
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedFormula("01")}
              className={`px-6 py-3 rounded-full border-2 border-current transition-all ${
                selectedFormula === "01"
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-transparent hover:bg-current/10"
              }`}
            >
              <span className="font-clinical text-sm font-medium">Formula 01</span>
            </button>
            <button
              onClick={() => setSelectedFormula("02")}
              className={`px-6 py-3 rounded-full border-2 border-current transition-all ${
                selectedFormula === "02"
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-transparent hover:bg-current/10"
              }`}
            >
              <span className="font-clinical text-sm font-medium">Formula 02</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Formula Image Placeholder */}
          <div className="lg:w-2/5">
            <div className="placeholder-box w-full h-96">
              <span className="font-clinical text-sm">[FORMULA {selectedFormula} IMAGE]</span>
            </div>
          </div>

          {/* Right: Selections */}
          <div className="lg:w-3/5 space-y-6">

            {/* Formula Explanation */}
            <div className="neo-box p-6">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold">{formulaExplanations[selectedFormula].title}</h3>
                <span className="font-clinical text-sm opacity-70">{formulaExplanations[selectedFormula].subtitle}</span>
              </div>
              <p className="text-base mb-4">{formulaExplanations[selectedFormula].description}</p>
              <div className="grid grid-cols-2 gap-2">
                {formulaExplanations[selectedFormula].keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500 flex-shrink-0 mt-0.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <span className="font-clinical text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pack Size Selection */}
            <div className="space-y-4">
              <p className="font-clinical text-sm uppercase opacity-70">Select Pack Size</p>
              <div className="grid grid-cols-3 gap-4">
                {(["4", "8", "12"] as PackSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedPack(size)}
                    className={`p-4 text-center transition-all ${
                      selectedPack === size
                        ? "neo-box-inverted"
                        : "neo-box hover:shadow-[4px_4px_0px_0px_var(--foreground)]"
                    }`}
                  >
                    <div className="flex items-baseline justify-center gap-2">
                      <p className="text-2xl font-bold font-clinical">{size}-pack</p>
                      <p className="font-bold text-lg">{packPricing[size]}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="neo-box p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-clinical text-sm uppercase opacity-70">Your Selection</p>
                  <p className="text-xl font-bold mt-1">
                    {selectedPack}-pack • Formula {selectedFormula}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-clinical text-sm opacity-70">Total</p>
                  <p className="text-3xl font-bold mt-1">{packPricing[selectedPack]}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full neo-button px-8 py-4 font-bold text-lg">
                Add to Cart
              </button>
              <button className="w-full neo-button-outline px-8 py-3 font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

