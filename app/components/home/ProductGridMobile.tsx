"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LandingTrustBadges from "../landing/LandingTrustBadges";
import ProductCard from "./ProductCard";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
import type { ProductGridProps } from "./ProductGrid";
import { getProductGridCopy } from "./productGridCopy";

const ALL_CARDS = [
  { productType: "protocol" as const, name: "Both — CONKA Flow and Clear" },
  { productType: "flow" as const, name: "CONKA Flow" },
  { productType: "clear" as const, name: "CONKA Clear" },
];

export default function ProductGridMobile(props?: ProductGridProps) {
  const { exclude = [] } = props ?? {};
  const visibleCards = ALL_CARDS.filter((c) => !exclude.includes(c.productType));
  const maxIndex = Math.max(0, visibleCards.length - 1);
  const copy = getProductGridCopy({ exclude });

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammaticallyRef = useRef(false);

  const handleAddToCart = useCallback((productType: "flow" | "clear" | "protocol") => {
    console.log(`Add to cart: ${productType}`);
  }, []);

  const handleScroll = useCallback(() => {
    if (isScrollingProgrammaticallyRef.current || !carouselRef.current) return;
    const el = carouselRef.current;
    const gapPx = 16;
    const cardWidth = el.offsetWidth * 0.85 + gapPx;
    const index = Math.min(maxIndex, Math.max(0, Math.round(el.scrollLeft / cardWidth)));
    setCurrentIndex(index);
  }, [maxIndex]);

  const goToCard = useCallback((index: number) => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const gapPx = 16;
    const cardWidth = el.offsetWidth * 0.85 + gapPx;
    isScrollingProgrammaticallyRef.current = true;
    setCurrentIndex(index);
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    setTimeout(() => { isScrollingProgrammaticallyRef.current = false; }, 400);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToCard(Math.max(0, currentIndex - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToCard(Math.min(maxIndex, currentIndex + 1));
      }
    },
    [currentIndex, maxIndex, goToCard],
  );

  useEffect(() => {
    if (carouselRef.current && currentIndex !== 0) {
      const el = carouselRef.current;
      const gapPx = 16;
      const cardWidth = el.offsetWidth * 0.85 + gapPx;
      el.scrollLeft = currentIndex * cardWidth;
    }
  }, [currentIndex]);

  const currentCard = visibleCards[currentIndex] ?? visibleCards[0];

  if (visibleCards.length === 0) {
    return <LandingTrustBadges />;
  }

  return (
    <>
      <div className="mb-10 px-4">
        <h2
          className="brand-h1 mb-6"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {copy.title}
        </h2>
        {copy.subtitleNode && (
          <p className="brand-body text-black/60 max-w-xl">
            {copy.subtitleNode}
          </p>
        )}
      </div>

      {visibleCards.length > 1 && (
        <div className="px-4 mb-4 flex items-center justify-center gap-2 flex-wrap">
          {visibleCards.map((card, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={card.productType}
                type="button"
                onClick={() => goToCard(idx)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all"
                style={{
                  borderColor: isActive ? "var(--brand-accent)" : "var(--foreground)",
                  opacity: isActive ? 1 : 0.4,
                  backgroundColor: isActive ? "var(--brand-accent)" : "transparent",
                  color: isActive ? "white" : "var(--foreground)",
                }}
              >
                <span className="font-clinical text-xs">{card.name}</span>
              </button>
            );
          })}
        </div>
      )}

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
        <div className="sr-only" aria-live="polite" aria-atomic="true" key={currentIndex}>
          Showing {currentCard?.name}
        </div>

        {visibleCards.map((card) => {
          if (card.productType === "protocol") {
            return (
              <div key="protocol" className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
                <div className="flex flex-col items-center w-full">
                  <Link
                    href="/protocol/3"
                    className="block relative w-full mx-auto aspect-[4/3] mb-4 rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={getProtocolImage("3")}
                        alt="Both — CONKA Flow and Clear"
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      <div
                        className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--brand-accent)]"
                      >
                        Most Popular
                      </div>
                    </div>
                  </Link>
                  <ProductCard productType="protocol" onAddToCart={() => handleAddToCart("protocol")} />
                </div>
              </div>
            );
          }
          if (card.productType === "flow") {
            return (
              <div key="flow" className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
                <div className="flex flex-col items-center w-full">
                  <Link
                    href="/conka-flow"
                    className="block relative w-full mx-auto aspect-[4/3] mb-4 rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10"
                  >
                    <div className="relative w-full h-full">
                      <Image src={getFormulaImage("01")} alt="CONKA Flow" fill className="object-cover" sizes="100vw" />
                      <div
                        className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--brand-accent)]"
                      >
                        Morning
                      </div>
                    </div>
                  </Link>
                  <ProductCard productType="flow" onAddToCart={() => handleAddToCart("flow")} />
                </div>
              </div>
            );
          }
          return (
            <div key="clear" className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
              <div className="flex flex-col items-center w-full">
                <Link
                  href="/conka-clarity"
                  className="block relative w-full mx-auto aspect-[4/3] mb-4 rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10"
                >
                  <div className="relative w-full h-full">
                    <Image src={getFormulaImage("02")} alt="CONKA Clear" fill className="object-cover" sizes="100vw" />
                    <div
                      className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--brand-accent)]"
                    >
                      Afternoon
                    </div>
                  </div>
                </Link>
                <ProductCard productType="clear" onAddToCart={() => handleAddToCart("clear")} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 px-4">
        <LandingTrustBadges />
      </div>
    </>
  );
}
