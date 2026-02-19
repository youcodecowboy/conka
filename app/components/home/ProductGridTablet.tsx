"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import AssuranceBanner from "./AssuranceBanner";
import ProductCard from "./ProductCard";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
import { getProductAccent } from "@/app/lib/productColors";
import type { ProtocolVariant } from "./ProtocolVariantSelector";

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

export default function ProductGridTablet() {
  const [protocolVariant, setProtocolVariant] = useState<ProtocolVariant>("balance");

  const handleAddToCart = useCallback((productType: "flow" | "clear" | "protocol") => {
    console.log(`Add to cart: ${productType}`, { protocolVariant });
  }, [protocolVariant]);

  return (
    <>
      <div className="text-center mb-8 md:mb-12">
        <h2 className="premium-section-heading mb-4">
          Find Your Formula
        </h2>
        
        {/* Orientation copy - tablet layout */}
        <div className="max-w-3xl mx-auto space-y-3">
          <p className="premium-body text-[var(--text-on-light)]">
            Two formulas, one system.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left">
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

      <AssuranceBanner />

      {/* Tablet: [Protocol] full width, then [Flow][Clear] side by side */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Protocol — full width */}
        <div className="col-span-2 flex flex-col items-center max-w-[480px] mx-auto w-full">
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

        {/* Flow */}
        <div className="flex flex-col items-center">
          <div className="relative w-full mx-auto aspect-square mb-4">
            <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
              <Image
                src={getFormulaImage("01")}
                alt="CONKA Flow"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div
                className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: getProductAccent("01") || "#111" }}
              >
                Energy
              </div>
            </div>
          </div>
          <ProductCard
            productType="flow"
            onAddToCart={() => handleAddToCart("flow")}
          />
        </div>

        {/* Clear */}
        <div className="flex flex-col items-center">
          <div className="relative w-full mx-auto aspect-square mb-4">
            <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
              <Image
                src={getFormulaImage("02")}
                alt="CONKA Clear"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div
                className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: getProductAccent("02") || "#111" }}
              >
                Recovery
              </div>
            </div>
          </div>
          <ProductCard
            productType="clear"
            onAddToCart={() => handleAddToCart("clear")}
          />
        </div>
      </div>
    </>
  );
}
