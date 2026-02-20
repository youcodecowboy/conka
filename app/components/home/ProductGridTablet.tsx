"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import AssuranceBanner from "./AssuranceBanner";
import ProductCard from "./ProductCard";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
import { getProductAccent } from "@/app/lib/productColors";
import type { ProtocolVariant } from "./ProtocolVariantSelector";
import type { ProductGridProps } from "./ProductGrid";

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

export default function ProductGridTablet(props?: ProductGridProps) {
  const { exclude = [], disabledProtocolVariants } = props ?? {};
  const [protocolVariant, setProtocolVariant] = useState<ProtocolVariant>("balance");

  const handleAddToCart = useCallback((productType: "flow" | "clear" | "protocol") => {
    console.log(`Add to cart: ${productType}`, { protocolVariant });
  }, [protocolVariant]);

  const showFlow = !exclude.includes("flow");
  const showClear = !exclude.includes("clear");
  const showProtocol = !exclude.includes("protocol");

  return (
    <>
      <div className="text-left mb-8">
        <h2 className="premium-section-heading mb-3">
          Find Your Formula
        </h2>
        <p className="premium-body text-[var(--text-on-light-muted)] max-w-xl">
          <span className="font-bold">Two formulas, one system.</span>
          <br />
          CONKA Flow for daytime energy and focus. CONKA Clear for clarity and recovery. Use separately or combine as a Protocol.
        </p>
      </div>

      <div className={`grid gap-6 mb-8 ${showProtocol && (showFlow || showClear) ? "grid-cols-2" : "grid-cols-1"}`}>
        {showProtocol && (
          <div className={showFlow || showClear ? "col-span-2 flex flex-col items-center max-w-[480px] mx-auto w-full" : "flex flex-col items-center max-w-[480px] mx-auto w-full"}>
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
              disabledProtocolVariants={disabledProtocolVariants}
            />
          </div>
        )}

        {showFlow && (
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
        )}

        {showClear && (
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
        )}
      </div>

      <AssuranceBanner />
    </>
  );
}
