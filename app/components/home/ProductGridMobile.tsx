"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import AssuranceBanner from "./AssuranceBanner";
import ProductCard from "./ProductCard";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
import { getProductAccent } from "@/app/lib/productColors";
import type { ProtocolVariant } from "./ProtocolVariantSelector";
import type { ProductGridProps } from "./ProductGrid";
import { getProductGridCopy } from "./productGridCopy";

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

const ALL_CARDS = [
  { productType: "flow" as const, name: "CONKA Flow", accentId: "01" as const },
  { productType: "clear" as const, name: "CONKA Clear", accentId: "02" as const },
  { productType: "protocol" as const, name: "CONKA Protocol", accentId: "3" as const },
];

export default function ProductGridMobile(props?: ProductGridProps) {
  const { exclude = [], disabledProtocolVariants } = props ?? {};
  const visibleCards = ALL_CARDS.filter((c) => !exclude.includes(c.productType));
  const maxIndex = Math.max(0, visibleCards.length - 1);
  const copy = getProductGridCopy({ exclude, disabledProtocolVariants });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [protocolVariant, setProtocolVariant] = useState<ProtocolVariant>("balance");
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammaticallyRef = useRef(false);

  const handleAddToCart = useCallback((productType: "flow" | "clear" | "protocol") => {
    console.log(`Add to cart: ${productType}`, { protocolVariant });
  }, [protocolVariant]);

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
    return <AssuranceBanner />;
  }

  return (
    <>
      <div className="text-left mb-8 px-4">
        <h2 className="premium-section-heading mb-3">{copy.title}</h2>
        {copy.subtitleNode && (
          <p className="premium-body text-[var(--text-on-light-muted)] max-w-xl">
            {copy.subtitleNode}
          </p>
        )}
      </div>

      {visibleCards.length > 1 && (
        <div className="px-4 mb-4 flex items-center gap-2 flex-wrap">
          {visibleCards.map((card, idx) => {
            const accent = getProductAccent(card.accentId);
            const isActive = currentIndex === idx;
            return (
              <button
                key={card.productType}
                type="button"
                onClick={() => goToCard(idx)}
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
          if (card.productType === "flow") {
            return (
              <div key="flow" className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
                <div className="flex flex-col items-center w-full">
                  <div className="relative w-full mx-auto aspect-[4/3] mb-4">
                    <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                      <Image src={getFormulaImage("01")} alt="CONKA Flow" fill className="object-cover" sizes="100vw" />
                    </div>
                  </div>
                  <ProductCard productType="flow" onAddToCart={() => handleAddToCart("flow")} />
                </div>
              </div>
            );
          }
          if (card.productType === "clear") {
            return (
              <div key="clear" className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
                <div className="flex flex-col items-center w-full">
                  <div className="relative w-full mx-auto aspect-[4/3] mb-4">
                    <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                      <Image src={getFormulaImage("02")} alt="CONKA Clear" fill className="object-cover" sizes="100vw" />
                    </div>
                  </div>
                  <ProductCard productType="clear" onAddToCart={() => handleAddToCart("clear")} />
                </div>
              </div>
            );
          }
          return (
            <div key="protocol" className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
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
                        backgroundColor: getProductAccent(protocolVariant === "flow-heavy" ? "1" : protocolVariant === "clear-heavy" ? "2" : "3") || "#3a9f7e",
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
                  disabledProtocolVariants={disabledProtocolVariants}
                />
              </div>
            </div>
          );
        })}
      </div>

      <AssuranceBanner />
    </>
  );
}
