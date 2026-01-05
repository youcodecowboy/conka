"use client";

import { useState } from "react";
import Image from "next/image";
import useIsMobile from "../hooks/useIsMobile";
import TrialPacksMobile from "./TrialPacksMobile";
import { useCart } from "../context/CartContext";
import { getTrialPackVariantId } from "../lib/shopifyProductMapping";

type FormulaType = "01" | "02";

// Formula images with focal points
const formulaImages = {
  "01": { src: "/CONKA_17.jpg", focalX: 50, focalY: 55 }, // Flow 4-pack (black caps)
  "02": { src: "/CONKA_18.jpg", focalX: 50, focalY: 55 }, // Clarity 4-pack (white caps)
};
type PackSize = "4" | "8" | "12";

const packPricing: Record<PackSize, string> = {
  "4": "£14.99",
  "8": "£24.99",
  "12": "£34.99",
};

const formulaExplanations = {
  "01": {
    title: "Conka Flow",
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
    title: "Conka Clarity",
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
  const isMobile = useIsMobile();
  const [selectedFormula, setSelectedFormula] = useState<FormulaType>("01");
  const [selectedPack, setSelectedPack] = useState<PackSize>("4");
  const [isAdding, setIsAdding] = useState(false);
  const cart = useCart();

  const handleAddToCart = async () => {
    const variantId = getTrialPackVariantId(selectedFormula, selectedPack);
    if (!variantId) {
      console.error(`No variant ID found for formula ${selectedFormula}, pack ${selectedPack}`);
      return;
    }
    
    setIsAdding(true);
    try {
      await cart.addToCart(variantId);
      // Cart drawer opens automatically after adding
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  // Render mobile version on smaller screens
  if (isMobile) {
    return <TrialPacksMobile />;
  }

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
              <span className="font-clinical text-sm font-medium">Conka Flow</span>
            </button>
            <button
              onClick={() => setSelectedFormula("02")}
              className={`px-6 py-3 rounded-full border-2 border-current transition-all ${
                selectedFormula === "02"
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-transparent hover:bg-current/10"
              }`}
            >
              <span className="font-clinical text-sm font-medium">Conka Clarity</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Formula Image */}
          <div className="lg:w-2/5">
            <a 
              href={selectedFormula === "01" ? "/conka-flow" : "/conka-clarity"}
              className="block relative w-full h-96 rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
            >
              <Image
                src={formulaImages[selectedFormula].src}
                alt={`Conka ${selectedFormula === "01" ? "Flow" : "Clarity"} bottles`}
                fill
                className="object-cover"
                style={{
                  objectPosition: `${formulaImages[selectedFormula].focalX}% ${formulaImages[selectedFormula].focalY}%`,
                }}
              />
            </a>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 flex-shrink-0 mt-0.5">
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
              <button 
                onClick={handleAddToCart}
                disabled={isAdding || cart.loading}
                className="w-full neo-button px-8 py-4 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
              <a 
                href={selectedFormula === "01" ? "/conka-flow" : "/conka-clarity"}
                className="block w-full neo-button-outline px-8 py-3 font-semibold text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

