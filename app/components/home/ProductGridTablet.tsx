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
      <div className="mb-8 md:mb-12 text-left text-[var(--color-ink)]">
        <h2 className="premium-section-heading">
          Find Your Formula
        </h2>
        <p className="premium-section-subtitle">
          Individual formulas for specific needs, or protocols for complete performance.
        </p>
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
