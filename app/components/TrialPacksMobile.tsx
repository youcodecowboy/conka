"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { getTrialPackVariantId } from "../lib/shopifyProductMapping";

type FormulaType = "01" | "02";
type PackSize = "4" | "8" | "12";

const packPricing: Record<PackSize, { price: string; perShot: string }> = {
  "4": { price: "£14.99", perShot: "£3.75" },
  "8": { price: "£24.99", perShot: "£3.12" },
  "12": { price: "£34.99", perShot: "£2.92" },
};

const formulaExplanations = {
  "01": {
    title: "Conka Flow",
    subtitle: "Caffeine-Free Focus",
    description:
      "Daily adaptogen support with Ashwagandha and Rhodiola builds stress resilience and recovery. Perfect for sustained focus without the crash.",
    keyPoints: [
      "Improved focus (+22.1%)",
      "Better sleep quality (+31.4%)",
      "Reduced brain fog",
      "Decreased anxiety",
    ],
  },
  "02": {
    title: "Conka Clarity",
    subtitle: "Peak Performance Boost",
    description:
      "Cognitive enhancers like Alpha GPC and Vitamin C build your neurological foundation. Designed for when you need peak performance.",
    keyPoints: [
      "Faster reaction time (-47ms)",
      "Enhanced mental endurance (+38%)",
      "Better memory recall (+27.9%)",
      "Improved neural connectivity",
    ],
  },
};

export default function TrialPacksMobile() {
  const [selectedFormula, setSelectedFormula] = useState<FormulaType>("01");
  const [selectedPack, setSelectedPack] = useState<PackSize | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const cart = useCart();

  const handlePackSelect = (size: PackSize) => {
    setSelectedPack(size);
    setShowFooter(true);
  };

  const handleAddToCart = async () => {
    if (!selectedPack) return;
    
    const variantId = getTrialPackVariantId(selectedFormula, selectedPack);
    if (!variantId) {
      console.error(`No variant ID found for formula ${selectedFormula}, pack ${selectedPack}`);
      return;
    }
    
    setIsAdding(true);
    try {
      await cart.addToCart(variantId);
      // Cart drawer opens automatically after adding
      setShowFooter(false);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section className={`px-6 py-12 ${showFooter && selectedPack ? "pb-40" : "pb-12"}`}>
      {/* Header */}
      <div className="text-left mb-4">
        <p className="font-commentary text-base opacity-70">not ready for a protocol?</p>
        <h2 className="text-2xl font-bold">try our trial packs</h2>
      </div>

      {/* Formula Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedFormula("01")}
          className={`flex-1 py-2 px-4 rounded-lg font-clinical text-sm transition-all ${
            selectedFormula === "01"
              ? "bg-black text-white"
              : "border-2 border-black/10 hover:border-black/30"
          }`}
        >
          Conka Flow
        </button>
        <button
          onClick={() => setSelectedFormula("02")}
          className={`flex-1 py-2 px-4 rounded-lg font-clinical text-sm transition-all ${
            selectedFormula === "02"
              ? "bg-black text-white"
              : "border-2 border-black/10 hover:border-black/30"
          }`}
        >
          Conka Clarity
        </button>
      </div>

      {/* Formula Quick Info */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-4 h-4 rounded-sm ${
            selectedFormula === "01" ? "bg-amber-500" : "bg-[#AAB9BC]"
          }`}
        ></div>
        <span className="font-bold text-sm">
          {formulaExplanations[selectedFormula].title}
        </span>
        <span className="font-clinical text-xs opacity-60">
          {formulaExplanations[selectedFormula].subtitle}
        </span>
      </div>

      {/* Product Image */}
      <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-6">
        <Image
          src={selectedFormula === "01" ? "/1.png" : "/2.png"}
          alt={`Formula ${selectedFormula} bottle`}
          fill
          className="object-contain scale-150"
        />
      </div>

      {/* Pack Size Selection */}
      <div className="mb-4">
        <p className="font-clinical text-xs uppercase opacity-50 mb-2">Select Pack Size</p>
        <div className="grid grid-cols-3 gap-2">
          {(["4", "8", "12"] as PackSize[]).map((size) => (
            <button
              key={size}
              onClick={() => handlePackSelect(size)}
              className={`py-3 px-2 rounded-lg text-center transition-all ${
                selectedPack === size
                  ? "bg-black text-white"
                  : "border-2 border-black/10 hover:border-black/30"
              }`}
            >
              <p className="font-bold text-sm">{size}-pack</p>
              <p className="font-clinical text-xs opacity-70">{packPricing[size].price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Collapsible Formula Details */}
      <div className="border-2 border-black/10 rounded-lg overflow-hidden mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between p-3"
        >
          <span className="font-bold text-sm">
            What&apos;s in {formulaExplanations[selectedFormula].title}?
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${showDetails ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {showDetails && (
          <div className="px-3 pb-3">
            <p className="font-clinical text-sm opacity-70 mb-3">
              {formulaExplanations[selectedFormula].description}
            </p>
            <div className="space-y-2">
              {formulaExplanations[selectedFormula].keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="font-clinical text-xs">{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Footer - Only shows after pack selection */}
      {showFooter && selectedPack && (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-black/10 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] animate-slide-up">
          <div className="px-4 py-3">
            {/* Close Button */}
            <button
              onClick={() => setShowFooter(false)}
              className="absolute top-2 right-2 p-1 opacity-50 hover:opacity-100 transition-opacity"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Product Info Row */}
            <div className="flex items-center justify-between mb-3 pr-6">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-sm ${
                    selectedFormula === "01" ? "bg-amber-500" : "bg-[#AAB9BC]"
                  }`}
                ></div>
                <div>
                  <p className="font-bold text-sm">
                    {selectedPack}-pack • Formula {selectedFormula}
                  </p>
                  <p className="font-clinical text-xs opacity-60">
                    {packPricing[selectedPack].perShot}/shot
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{packPricing[selectedPack].price}</p>
                <p className="font-clinical text-xs opacity-60">+ Free Shipping</p>
              </div>
            </div>

            {/* Split Buttons */}
            <div className="flex gap-2">
              <a
                href={`/formula-${selectedFormula}`}
                className="flex-1 py-3 px-4 border-2 border-black rounded-lg font-semibold text-sm text-center hover:bg-black/5 transition-colors"
              >
                Learn More
              </a>
              <button 
                onClick={handleAddToCart}
                disabled={isAdding || cart.loading}
                className="flex-1 neo-button py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  'Adding...'
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

