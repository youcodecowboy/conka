"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import PremiumDotIndicator from "../premium/PremiumDotIndicator";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
import { getProductAccent } from "@/app/lib/productColors";
import type { ProtocolVariant } from "./ProtocolVariantSelector";

// Get protocol image based on variant
const getProtocolVariantImage = (variant: ProtocolVariant): string => {
  switch (variant) {
    case "flow-heavy":
      return getProtocolImage("1");
    case "balance":
      return getProtocolImage("3");
    case "clear-heavy":
      return getProtocolImage("2");
    default:
      return getProtocolImage("3");
  }
};

const CARDS = [
  { productType: "flow" as const, name: "CONKA Flow" },
  { productType: "clear" as const, name: "CONKA Clear" },
  { productType: "protocol" as const, name: "CONKA Protocol" },
];

export default function ProductGridMobile() {
  const [currentIndex, setCurrentIndex] = useState<0 | 1 | 2>(0);
  const [protocolVariant, setProtocolVariant] = useState<ProtocolVariant>("balance");
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleAddToCart = useCallback((productType: "flow" | "clear" | "protocol") => {
    // TODO: Implement add to cart logic
    console.log(`Add to cart: ${productType}`, { protocolVariant });
  }, [protocolVariant]);

  const scrollToTrialPacks = useCallback(() => {
    const element = document.getElementById("trial-packs");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const goToCard = useCallback((index: 0 | 1 | 2) => {
    setCurrentIndex(index);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    
    if (touchStartX.current === null || touchEndX.current === null) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        // Swipe left - go to next
        setCurrentIndex((prev) => Math.min(2, prev + 1) as 0 | 1 | 2);
      } else {
        // Swipe right - go to previous
        setCurrentIndex((prev) => Math.max(0, prev - 1) as 0 | 1 | 2);
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setCurrentIndex((prev) => Math.max(0, prev - 1) as 0 | 1 | 2);
    } else if (e.key === "ArrowRight") {
      setCurrentIndex((prev) => Math.min(2, prev + 1) as 0 | 1 | 2);
    }
  }, []);

  const currentCard = CARDS[currentIndex];

  return (
    <>
      {/* Section Header */}
      <div className="mb-8 text-left px-4">
        <h2 className="premium-section-heading">
          Find Your Formula
        </h2>
        <p className="premium-section-subtitle">
          Individual formulas for specific needs, or protocols for complete performance.
        </p>
      </div>

      {/* Assurance Banner - Mobile compact layout */}
      <div className="mb-6 px-4">
        <div className="bg-[var(--color-ink)] py-3 px-4 rounded-[var(--premium-radius-nested)]">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.7rem] text-white">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              60-Day Guarantee
            </span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Free Shipping
            </span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Cancel Anytime
            </span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Informed Sport
            </span>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="mb-4 px-4">
        <PremiumDotIndicator
          total={CARDS.length}
          currentIndex={currentIndex}
          onDotClick={(index) => goToCard(index as 0 | 1 | 2)}
          ariaLabel="Product options"
          getDotAriaLabel={(i) => `Go to ${CARDS[i].name}`}
        />
      </div>

      {/* Carousel Container */}
      <div
        role="region"
        aria-label="Product options"
        className="relative w-full overflow-hidden mb-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true" key={currentIndex}>
          Showing {currentCard.name}
        </div>

        {/* Card Track */}
        <div
          className="flex transition-transform duration-[350ms] ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {/* Flow Card */}
          <div className="w-full flex-shrink-0 px-4">
            <div className="flex flex-col items-center">
              <div className="relative w-full mx-auto aspect-square mb-4">
                <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                  <Image
                    src={getFormulaImage("01")}
                    alt="CONKA Flow"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
              <ProductCard
                productType="flow"
                onAddToCart={() => handleAddToCart("flow")}
              />
            </div>
          </div>

          {/* Clear Card */}
          <div className="w-full flex-shrink-0 px-4">
            <div className="flex flex-col items-center">
              <div className="relative w-full mx-auto aspect-square mb-4">
                <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                  <Image
                    src={getFormulaImage("02")}
                    alt="CONKA Clear"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
              <ProductCard
                productType="clear"
                onAddToCart={() => handleAddToCart("clear")}
              />
            </div>
          </div>

          {/* Protocol Card */}
          <div className="w-full flex-shrink-0 px-4">
            <div className="flex flex-col items-center">
              <div className="relative w-full mx-auto aspect-square mb-4">
                <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                  <Image
                    key={protocolVariant}
                    src={getProtocolVariantImage(protocolVariant)}
                    alt="CONKA Protocol"
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="100vw"
                  />
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-bone)]"
                    style={{ 
                      color: getProductAccent(protocolVariant === "flow-heavy" ? "1" : protocolVariant === "clear-heavy" ? "2" : "3") || "#3a9f7e"
                    }}
                  >
                    Most Popular
                  </div>
                </div>
              </div>
              <ProductCard
                productType="protocol"
                protocolVariant={protocolVariant}
                onProtocolVariantChange={setProtocolVariant}
                onAddToCart={() => handleAddToCart("protocol")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trial Pack Button */}
      <div className="text-center px-4">
        <button
          onClick={scrollToTrialPacks}
          className="premium-body-sm px-4 py-2 rounded-full border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] text-[var(--text-on-light-muted)] hover:text-[var(--text-on-light)] hover:bg-white transition-all inline-flex items-center gap-1"
        >
          New to CONKA? → Try a 4-pack trial
        </button>
      </div>
    </>
  );
}
