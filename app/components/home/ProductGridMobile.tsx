"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
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
  { productType: "flow" as const, name: "CONKA Flow", accentId: "01" as const },
  { productType: "clear" as const, name: "CONKA Clear", accentId: "02" as const },
  { productType: "protocol" as const, name: "CONKA Protocol", accentId: "3" as const },
];

export default function ProductGridMobile() {
  const [currentIndex, setCurrentIndex] = useState<0 | 1 | 2>(0);
  const [protocolVariant, setProtocolVariant] = useState<ProtocolVariant>("balance");
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammaticallyRef = useRef(false);

  const handleAddToCart = useCallback((productType: "flow" | "clear" | "protocol") => {
    // TODO: Implement add to cart logic
    console.log(`Add to cart: ${productType}`, { protocolVariant });
  }, [protocolVariant]);

  const handleScroll = useCallback(() => {
    if (isScrollingProgrammaticallyRef.current || !carouselRef.current) return;

    const el = carouselRef.current;
    const gapPx = 16; // var(--premium-space-m) = 1rem
    const cardWidth = el.offsetWidth * 0.85 + gapPx;
    const index = Math.min(
      2,
      Math.max(0, Math.round(el.scrollLeft / cardWidth))
    );
    const clampedIndex = index as 0 | 1 | 2;

    setCurrentIndex(clampedIndex);
  }, []);

  const goToCard = useCallback((index: 0 | 1 | 2) => {
    if (!carouselRef.current) return;

    const el = carouselRef.current;
    const gapPx = 16; // var(--premium-space-m) = 1rem
    const cardWidth = el.offsetWidth * 0.85 + gapPx;

    isScrollingProgrammaticallyRef.current = true;
    setCurrentIndex(index);

    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrollingProgrammaticallyRef.current = false;
    }, 400);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const newIndex = Math.max(0, currentIndex - 1) as 0 | 1 | 2;
        goToCard(newIndex);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const newIndex = Math.min(2, currentIndex + 1) as 0 | 1 | 2;
        goToCard(newIndex);
      }
    },
    [currentIndex, goToCard],
  );

  useEffect(() => {
    if (carouselRef.current && currentIndex !== 0) {
      const el = carouselRef.current;
      const gapPx = 16;
      const cardWidth = el.offsetWidth * 0.85 + gapPx;
      el.scrollLeft = currentIndex * cardWidth;
    }
  }, [currentIndex]);

  const currentCard = CARDS[currentIndex];

  return (
    <>
      {/* Section Header */}
      <div className="text-center mb-8 px-4">
        <h2 className="premium-section-heading mb-4">
          Find Your Formula
        </h2>
        
        {/* Orientation copy - mobile layout */}
        <div className="max-w-3xl mx-auto space-y-3">
          <p className="premium-body text-[var(--text-on-light)]">
            Two formulas, one system.
          </p>
          
          <div className="grid grid-cols-1 gap-4 text-left">
            {/* Flow */}
            <div className="premium-card-soft-mobile p-4 border border-[var(--color-premium-stroke)]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #AAB9BC, #7A9CA5)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                    viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" 
                    strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-1 text-[var(--text-on-light)]">
                    CONKA Flow
                  </h3>
                  <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                    Caffeine-free energy and focus throughout your day. 
                    Built on adaptogens for stress resilience.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Clear */}
            <div className="premium-card-soft-mobile p-4 border border-[var(--color-premium-stroke)]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                    viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" 
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-1 text-[var(--text-on-light)]">
                    CONKA Clear
                  </h3>
                  <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                    Peak mental performance and complete recovery. 
                    Nootropics for clarity, antioxidants for repair.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="premium-body-sm text-[var(--text-on-light-muted)] pt-2">
            Use individually for targeted support, or combine them as Protocols 
            for complete cognitive performance.
          </p>
        </div>
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

      {/* Formula toggles — scroll carousel to selected card */}
      <div className="px-4 mb-4 flex items-center gap-2 flex-wrap">
        {CARDS.map((card, idx) => {
          const accent = getProductAccent(card.accentId);
          const isActive = currentIndex === idx;
          return (
            <button
              key={card.productType}
              type="button"
              onClick={() => goToCard(idx as 0 | 1 | 2)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all"
              style={{
                borderColor: isActive ? accent : "var(--foreground)",
                opacity: isActive ? 1 : 0.4,
                backgroundColor: isActive ? accent ?? "transparent" : "transparent",
                color: isActive ? "white" : "var(--foreground)",
              }}
            >
              <span className="font-clinical text-xs">{card.name}</span>
            </button>
          );
        })}
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        role="region"
        aria-label="Product options"
        className="flex gap-[var(--premium-space-m)] overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true" key={currentIndex}>
          Showing {currentCard.name}
        </div>

        {/* Flow Card */}
        <div className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full mx-auto aspect-[4/3] mb-4">
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
          <div className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full mx-auto aspect-[4/3] mb-4">
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
          <div className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full mx-auto aspect-[4/3] mb-4">
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
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ 
                      backgroundColor: getProductAccent(protocolVariant === "flow-heavy" ? "1" : protocolVariant === "clear-heavy" ? "2" : "3") || "#3a9f7e"
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
    </>
  );
}
