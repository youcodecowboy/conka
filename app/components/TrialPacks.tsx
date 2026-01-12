"use client";

import { useState } from "react";
import Image from "next/image";
import useIsMobile from "../hooks/useIsMobile";
import TrialPacksMobile from "./TrialPacksMobile";
import { useCart } from "../context/CartContext";
import {
  getTrialPackVariantId,
  getFormulaVariantId,
} from "../lib/shopifyProductMapping";
import PaymentLogos from "./PaymentLogos";

type FormulaType = "01" | "02";
type PurchaseType = "one-time" | "subscription";

// Formula images with focal points
const formulaImages = {
  "01": { src: "/CONKA_17.jpg", focalX: 50, focalY: 55 }, // Flow 4-pack (black caps)
  "02": { src: "/CONKA_18.jpg", focalX: 50, focalY: 55 }, // Clarity 4-pack (white caps)
};
type PackSize = "4" | "8" | "12";

// Pricing with subscription discount (20% off)
const packPricing: Record<
  PackSize,
  {
    oneTime: string;
    subscription: string;
    perShotOneTime: string;
    perShotSub: string;
  }
> = {
  "4": {
    oneTime: "£14.99",
    subscription: "£11.99",
    perShotOneTime: "£3.75",
    perShotSub: "£3.00",
  },
  "8": {
    oneTime: "£24.99",
    subscription: "£19.99",
    perShotOneTime: "£3.12",
    perShotSub: "£2.50",
  },
  "12": {
    oneTime: "£34.99",
    subscription: "£27.99",
    perShotOneTime: "£2.92",
    perShotSub: "£2.33",
  },
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

export default function TrialPacks() {
  const isMobile = useIsMobile();
  const [selectedFormula, setSelectedFormula] = useState<FormulaType>("01");
  const [selectedPack, setSelectedPack] = useState<PackSize>("4");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("one-time");
  const [isAdding, setIsAdding] = useState(false);
  const cart = useCart();

  const accentColor = selectedFormula === "01" ? "#f59e0b" : "#AAB9BC";

  const handleAddToCart = async () => {
    let variantId: string | null = null;
    let sellingPlanId: string | undefined = undefined;

    if (purchaseType === "subscription") {
      // For subscriptions, use the formula variant with selling plan
      const variantData = getFormulaVariantId(
        selectedFormula,
        selectedPack,
        "subscription",
      );
      if (variantData) {
        variantId = variantData.variantId;
        sellingPlanId = variantData.sellingPlanId;
      }
    } else {
      // For one-time, use trial pack variant
      variantId = getTrialPackVariantId(selectedFormula, selectedPack);
    }

    if (!variantId) {
      console.error(
        `No variant ID found for formula ${selectedFormula}, pack ${selectedPack}`,
      );
      return;
    }

    setIsAdding(true);
    try {
      await cart.addToCart(variantId, 1, sellingPlanId);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  // Render mobile version on smaller screens
  if (isMobile) {
    return <TrialPacksMobile />;
  }

  const currentPrice =
    purchaseType === "subscription"
      ? packPricing[selectedPack].subscription
      : packPricing[selectedPack].oneTime;

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header with Formula Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Left: Heading */}
          <div className="text-left">
            <p className="font-commentary text-xl mb-1">
              not ready for a protocol?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              try our trial packs
            </h2>
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
              <span className="font-clinical text-sm font-medium">
                Conka Flow
              </span>
            </button>
            <button
              onClick={() => setSelectedFormula("02")}
              className={`px-6 py-3 rounded-full border-2 border-current transition-all ${
                selectedFormula === "02"
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-transparent hover:bg-current/10"
              }`}
            >
              <span className="font-clinical text-sm font-medium">
                Conka Clarity
              </span>
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
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
              />
            </a>
          </div>

          {/* Right: Selections */}
          <div className="lg:w-3/5 space-y-6">
            {/* Formula Explanation */}
            <div className="neo-box p-6">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold">
                  {formulaExplanations[selectedFormula].title}
                </h3>
                <span className="font-clinical text-sm opacity-70">
                  {formulaExplanations[selectedFormula].subtitle}
                </span>
              </div>
              <p className="text-base mb-4">
                {formulaExplanations[selectedFormula].description}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {formulaExplanations[selectedFormula].keyPoints.map(
                  (point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
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
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: accentColor }}
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span className="font-clinical text-sm">
                        {point.text}{" "}
                        <span
                          className="font-bold"
                          style={{ color: accentColor }}
                        >
                          ({point.stat})
                        </span>
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Purchase Type Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPurchaseType("subscription")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all ${
                  purchaseType === "subscription"
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                    : "bg-transparent border-black/20 hover:border-black/40"
                }`}
              >
                <span className="font-clinical text-sm font-medium">
                  Subscribe
                </span>
                <span
                  className="px-2 py-0.5 text-xs font-clinical rounded-full text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  SAVE 20%
                </span>
              </button>
              <button
                onClick={() => setPurchaseType("one-time")}
                className={`px-5 py-2.5 rounded-full border-2 transition-all ${
                  purchaseType === "one-time"
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                    : "bg-transparent border-black/20 hover:border-black/40"
                }`}
              >
                <span className="font-clinical text-sm font-medium">
                  One-Time
                </span>
              </button>
            </div>

            {/* Pack Size Selection - Styled like formula pages */}
            <div className="space-y-3">
              <p className="font-clinical text-sm uppercase opacity-70">
                Select Pack Size
              </p>
              <div className="grid grid-cols-3 gap-4">
                {(["4", "8", "12"] as PackSize[]).map((size) => {
                  const isSelected = selectedPack === size;
                  const pricing = packPricing[size];

                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedPack(size)}
                      className="overflow-hidden transition-all border-2"
                      style={{
                        borderColor: isSelected
                          ? accentColor
                          : "rgba(0,0,0,0.1)",
                        boxShadow: isSelected
                          ? `4px 4px 0px 0px ${accentColor}`
                          : "none",
                      }}
                    >
                      {/* Pack Header */}
                      <div
                        className="py-2 px-3 text-center"
                        style={{
                          backgroundColor: isSelected
                            ? accentColor
                            : "rgba(0,0,0,0.03)",
                          color: isSelected ? "white" : "inherit",
                        }}
                      >
                        <p className="font-bold text-sm">{size}-pack</p>
                      </div>
                      {/* Price Body */}
                      <div className="py-3 px-3 text-center bg-white">
                        <p className="font-bold text-lg">
                          {purchaseType === "subscription"
                            ? pricing.subscription
                            : pricing.oneTime}
                        </p>
                        {purchaseType === "subscription" && (
                          <p className="font-clinical text-xs line-through opacity-50">
                            {pricing.oneTime}
                          </p>
                        )}
                        <p className="font-clinical text-xs opacity-60 mt-1">
                          {purchaseType === "subscription"
                            ? pricing.perShotSub
                            : pricing.perShotOneTime}
                          /shot
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Display */}
            <div
              className="p-6 rounded-lg border-2"
              style={{
                borderColor: accentColor,
                backgroundColor: `${accentColor}10`,
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-clinical text-sm uppercase opacity-70">
                    Your Selection
                  </p>
                  <p className="text-xl font-bold mt-1">
                    {selectedPack}-pack •{" "}
                    {formulaExplanations[selectedFormula].title}
                  </p>
                  {purchaseType === "subscription" && (
                    <p
                      className="font-clinical text-sm mt-1"
                      style={{ color: accentColor }}
                    >
                      Ships monthly • Cancel anytime
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-clinical text-sm opacity-70">
                    {purchaseType === "subscription" ? "Monthly" : "Total"}
                  </p>
                  <p className="text-3xl font-bold mt-1">{currentPrice}</p>
                  {purchaseType === "subscription" && (
                    <p className="font-clinical text-xs opacity-60">
                      was{" "}
                      <span className="line-through">
                        {packPricing[selectedPack].oneTime}
                      </span>
                    </p>
                  )}
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
                {isAdding
                  ? "Adding..."
                  : purchaseType === "subscription"
                    ? "Subscribe Now"
                    : "Add to Cart"}
              </button>
              <a
                href={
                  selectedFormula === "01" ? "/conka-flow" : "/conka-clarity"
                }
                className="block w-full neo-button-outline px-8 py-3 font-semibold text-center"
              >
                Learn More
              </a>
              {/* Payment Logos */}
              <PaymentLogos size="sm" className="mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
