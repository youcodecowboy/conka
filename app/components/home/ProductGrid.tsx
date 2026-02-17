"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import AssuranceBanner from "./AssuranceBanner";
import ProductCard from "./ProductCard";
import ProductGridMobile from "./ProductGridMobile";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
import { getProductAccent } from "@/app/lib/productColors";
import type { ProtocolVariant } from "./ProtocolVariantSelector";

// Get protocol image based on variant (same logic as ProductCard)
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

export default function ProductGrid() {
  const [protocolVariant, setProtocolVariant] = useState<ProtocolVariant>("balance");
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Render mobile carousel if on mobile
  if (isMobile === true) {
    return <ProductGridMobile />;
  }

  // Render desktop/tablet grid
  if (isMobile === false) {
    return (
      <>
      {/* Section Header */}
      <div className="mb-8 md:mb-12 text-left">
        <h2 className="premium-section-heading">
          Find Your Formula
        </h2>
        <p className="premium-section-subtitle">
          Individual formulas for specific needs, or protocols for complete performance.
        </p>
      </div>

      {/* Assurance Banner */}
      <AssuranceBanner />

      {/* Product Grid */}
      <div className="product-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-8 mb-8">
        {/* Flow Card */}
        <div className="product-card-wrapper product-card-formula flex flex-col items-center">
          <div className="relative w-full mx-auto aspect-square mb-4">
            <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
              <Image
                src={getFormulaImage("01")}
                alt="CONKA Flow"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
            </div>
          </div>
          <ProductCard
            productType="flow"
            onAddToCart={() => handleAddToCart("flow")}
          />
        </div>

        {/* Clear Card */}
        <div className="product-card-wrapper product-card-formula flex flex-col items-center">
          <div className="relative w-full mx-auto aspect-square mb-4">
            <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
              <Image
                src={getFormulaImage("02")}
                alt="CONKA Clear"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
            </div>
          </div>
          <ProductCard
            productType="clear"
            onAddToCart={() => handleAddToCart("clear")}
          />
        </div>

        {/* Protocol Card */}
        <div className="product-card-wrapper product-card-protocol">
          {/* Desktop/Mobile: Floating image above card */}
          <div className="product-card-protocol-image-float md:hidden lg:flex flex-col items-center">
            <div className="relative w-full mx-auto aspect-square mb-4 z-10">
              <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                <Image
                  key={protocolVariant}
                  src={getProtocolVariantImage(protocolVariant)}
                  alt="CONKA Protocol"
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
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
          
          {/* Tablet: Image left, card right */}
          <div className="product-card-protocol-tablet hidden md:flex lg:hidden gap-4">
            {/* Image - left side, vertically centered */}
            <div className="flex items-center justify-center flex-shrink-0 w-1/2">
              <div className="relative w-full aspect-square">
                <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                  <Image
                    key={protocolVariant}
                    src={getProtocolVariantImage(protocolVariant)}
                    alt="CONKA Protocol"
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="50vw"
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
            </div>
            {/* Card - right side */}
            <div className="flex-1">
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

      {/* Trial Pack Anchor Link */}
      <div className="text-center">
        <button
          onClick={scrollToTrialPacks}
          className="premium-body-sm text-[var(--text-on-light-muted)] hover:text-[var(--text-on-light)] transition-colors inline-flex items-center gap-1"
        >
          New to CONKA? → Try a 4-pack trial
        </button>
      </div>
      </>
    );
  }

  // Loading state during SSR/hydration
  return null;
}
