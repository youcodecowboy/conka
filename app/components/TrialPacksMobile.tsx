"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { getTrialPackVariantId, getFormulaVariantId } from "../lib/shopifyProductMapping";

type FormulaType = "01" | "02";
type PackSize = "4" | "8" | "12";
type PurchaseType = "one-time" | "subscription";

// Formula images with focal points (matching desktop TrialPacks)
const formulaImages = {
  "01": { src: "/CONKA_17.jpg", focalX: 50, focalY: 55 }, // Flow 4-pack (black caps)
  "02": { src: "/CONKA_18.jpg", focalX: 50, focalY: 55 }, // Clarity 4-pack (white caps)
};

// Pricing with subscription discount (20% off)
const packPricing: Record<PackSize, { oneTime: string; subscription: string; perShotOneTime: string; perShotSub: string }> = {
  "4": { oneTime: "£14.99", subscription: "£11.99", perShotOneTime: "£3.75", perShotSub: "£3.00" },
  "8": { oneTime: "£24.99", subscription: "£19.99", perShotOneTime: "£3.12", perShotSub: "£2.50" },
  "12": { oneTime: "£34.99", subscription: "£27.99", perShotOneTime: "£2.92", perShotSub: "£2.33" },
};

// Verified statistics from BRAND_HIGHLIGHTS.md with PMID sources
const formulaExplanations = {
  "01": {
    title: "Conka Flow",
    subtitle: "Caffeine-Free Focus",
    description:
      "Daily adaptogen support with Ashwagandha and Rhodiola builds stress resilience and recovery. Perfect for sustained focus without the crash.",
    keyPoints: [
      { text: "Stress reduction", stat: "-56%", source: "PMID: 23439798" },
      { text: "Memory improvement", stat: "+18%", source: "PMID: 12888775" },
      { text: "Cortisol reduction", stat: "-28%", source: "PMID: 23439798" },
      { text: "Sleep quality", stat: "+42%", source: "PMID: 32021735" },
    ],
  },
  "02": {
    title: "Conka Clarity",
    subtitle: "Peak Performance Boost",
    description:
      "Cognitive enhancers like Alpha GPC and Ginkgo build your neurological foundation. Designed for when you need peak performance.",
    keyPoints: [
      { text: "Glutathione levels", stat: "+40%", source: "PMID: 29559699" },
      { text: "Mental fatigue", stat: "-35%", source: "PMID: 18937015" },
      { text: "Cognitive function", stat: "+22%", source: "PMID: 12882463" },
      { text: "Brain protection", stat: "7x", source: "PMID: 23690582" },
    ],
  },
};

export default function TrialPacksMobile() {
  const [selectedFormula, setSelectedFormula] = useState<FormulaType>("01");
  const [selectedPack, setSelectedPack] = useState<PackSize | null>(null);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("one-time");
  const [showDetails, setShowDetails] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const cart = useCart();

  const accentColor = selectedFormula === "01" ? "#f59e0b" : "#AAB9BC";

  const handlePackSelect = (size: PackSize) => {
    setSelectedPack(size);
    setShowFooter(true);
  };

  const handleAddToCart = async () => {
    if (!selectedPack) return;
    
    let variantId: string | null = null;
    let sellingPlanId: string | undefined = undefined;

    if (purchaseType === "subscription") {
      const variantData = getFormulaVariantId(selectedFormula, selectedPack, "subscription");
      if (variantData) {
        variantId = variantData.variantId;
        sellingPlanId = variantData.sellingPlanId;
      }
    } else {
      variantId = getTrialPackVariantId(selectedFormula, selectedPack);
    }

    if (!variantId) {
      console.error(`No variant ID found for formula ${selectedFormula}, pack ${selectedPack}`);
      return;
    }
    
    setIsAdding(true);
    try {
      await cart.addToCart(variantId, 1, sellingPlanId);
      setShowFooter(false);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section className={`px-6 py-12 ${showFooter && selectedPack ? "pb-52" : "pb-12"}`}>
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
          className="w-4 h-4 rounded-sm"
          style={{ backgroundColor: accentColor }}
        ></div>
        <span className="font-bold text-sm">
          {formulaExplanations[selectedFormula].title}
        </span>
        <span className="font-clinical text-xs opacity-60">
          {formulaExplanations[selectedFormula].subtitle}
        </span>
      </div>

      {/* Product Image */}
      <a 
        href={selectedFormula === "01" ? "/conka-flow" : "/conka-clarity"}
        className="block relative w-full aspect-[4/3] max-w-[280px] mx-auto mb-6 rounded-xl overflow-hidden"
      >
        <Image
          src={formulaImages[selectedFormula].src}
          alt={`${formulaExplanations[selectedFormula].title} bottle`}
          fill
          className="object-cover"
          style={{
            objectPosition: `${formulaImages[selectedFormula].focalX}% ${formulaImages[selectedFormula].focalY}%`,
          }}
        />
      </a>

      {/* Purchase Type Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setPurchaseType("subscription")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${
            purchaseType === "subscription"
              ? "bg-black text-white"
              : "border-2 border-black/10 hover:border-black/30"
          }`}
        >
          <span className="font-clinical text-sm">Subscribe</span>
          <span 
            className="px-1.5 py-0.5 text-[10px] font-clinical rounded-full text-white"
            style={{ backgroundColor: purchaseType === "subscription" ? accentColor : "black" }}
          >
            SAVE
          </span>
        </button>
        <button
          onClick={() => setPurchaseType("one-time")}
          className={`flex-1 py-2 px-3 rounded-lg font-clinical text-sm transition-all ${
            purchaseType === "one-time"
              ? "bg-black text-white"
              : "border-2 border-black/10 hover:border-black/30"
          }`}
        >
          One-Time
        </button>
      </div>

      {/* Pack Size Selection - Styled like formula pages */}
      <div className="mb-4">
        <p className="font-clinical text-xs uppercase opacity-50 mb-2">Select Pack Size</p>
        <div className="grid grid-cols-3 gap-2">
          {(["4", "8", "12"] as PackSize[]).map((size) => {
            const isSelected = selectedPack === size;
            const pricing = packPricing[size];
            
            return (
              <button
                key={size}
                onClick={() => handlePackSelect(size)}
                className="overflow-hidden transition-all border-2"
                style={{
                  borderColor: isSelected ? accentColor : "rgba(0,0,0,0.1)",
                  boxShadow: isSelected ? `3px 3px 0px 0px ${accentColor}` : "none",
                }}
              >
                {/* Pack Header */}
                <div 
                  className="py-1.5 px-2 text-center"
                  style={{
                    backgroundColor: isSelected ? accentColor : "rgba(0,0,0,0.03)",
                    color: isSelected ? "white" : "inherit",
                  }}
                >
                  <p className="font-bold text-xs">{size}-pack</p>
                </div>
                {/* Price Body */}
                <div className="py-2 px-2 text-center bg-white">
                  <p className="font-bold text-sm">
                    {purchaseType === "subscription" ? pricing.subscription : pricing.oneTime}
                  </p>
                  {purchaseType === "subscription" && (
                    <p className="font-clinical text-[10px] line-through opacity-50">{pricing.oneTime}</p>
                  )}
                </div>
              </button>
            );
          })}
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
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: accentColor }}
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="font-clinical text-xs">
                    {point.text} <span className="font-bold" style={{ color: accentColor }}>({point.stat})</span>
                  </span>
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
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: accentColor }}
                ></div>
                <div>
                  <p className="font-bold text-sm">
                    {selectedPack}-pack • {formulaExplanations[selectedFormula].title}
                  </p>
                  <p className="font-clinical text-xs opacity-60">
                    {purchaseType === "subscription" 
                      ? `${packPricing[selectedPack].perShotSub}/shot • Ships monthly`
                      : `${packPricing[selectedPack].perShotOneTime}/shot`
                    }
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">
                  {purchaseType === "subscription" 
                    ? packPricing[selectedPack].subscription 
                    : packPricing[selectedPack].oneTime
                  }
                </p>
                {purchaseType === "subscription" && (
                  <p className="font-clinical text-xs opacity-60">
                    was <span className="line-through">{packPricing[selectedPack].oneTime}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Purchase Type Toggle in Footer */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setPurchaseType("subscription")}
                className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm transition-all ${
                  purchaseType === "subscription"
                    ? "border-2"
                    : "border border-black/10"
                }`}
                style={{
                  borderColor: purchaseType === "subscription" ? accentColor : undefined,
                  backgroundColor: purchaseType === "subscription" ? `${accentColor}10` : undefined,
                }}
              >
                <span className="font-clinical text-xs">Subscribe</span>
                <span 
                  className="px-1 py-0.5 text-[9px] font-clinical rounded-full text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  -20%
                </span>
              </button>
              <button
                onClick={() => setPurchaseType("one-time")}
                className={`flex-1 py-2 rounded-lg font-clinical text-xs transition-all ${
                  purchaseType === "one-time"
                    ? "border-2 border-black bg-black/5"
                    : "border border-black/10"
                }`}
              >
                One-Time
              </button>
            </div>

            {/* Split Buttons */}
            <div className="flex gap-2">
              <a
                href={selectedFormula === "01" ? "/conka-flow" : "/conka-clarity"}
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
                    {purchaseType === "subscription" ? "Subscribe" : "Add to Cart"}
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
