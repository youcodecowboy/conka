"use client";

import { useState, useCallback } from "react";
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

export default function ProductGridTablet(props?: ProductGridProps) {
  const { exclude = [], disabledProtocolVariants } = props ?? {};
  const [protocolVariant, setProtocolVariant] = useState<ProtocolVariant>("balance");

  const handleAddToCart = useCallback((productType: "flow" | "clear" | "protocol") => {
    console.log(`Add to cart: ${productType}`, { protocolVariant });
  }, [protocolVariant]);

  const showFlow = !exclude.includes("flow");
  const showClear = !exclude.includes("clear");
  const showProtocol = !exclude.includes("protocol");
  const copy = getProductGridCopy({ exclude, disabledProtocolVariants });

  return (
    <>
      <div className="text-left mb-8">
        <h2 className="premium-section-heading mb-3">
          {copy.title}
        </h2>
        {copy.subtitleNode && (
          <p className="premium-body text-[var(--text-on-light-muted)] max-w-xl">
            {copy.subtitleNode}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Column 1: Flow or empty — always 3 columns so card size matches 3-card layout */}
        {showFlow ? (
          <div className="flex flex-col items-center">
            <div className="relative w-full mx-auto aspect-square mb-4">
              <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                <Image
                  src={getFormulaImage("01")}
                  alt="CONKA Flow"
                  fill
                  className="object-cover"
                  sizes="33vw"
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
        ) : (
          <div aria-hidden="true" />
        )}

        {showClear ? (
          <div className="flex flex-col items-center">
            <div className="relative w-full mx-auto aspect-square mb-4">
              <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                <Image
                  src={getFormulaImage("02")}
                  alt="CONKA Clear"
                  fill
                  className="object-cover"
                  sizes="33vw"
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
        ) : (
          <div aria-hidden="true" />
        )}

        {showProtocol ? (
          <div className="flex flex-col items-center">
            <div className="relative w-full mx-auto aspect-square mb-4">
              <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                <Image
                  key={protocolVariant}
                  src={getProtocolVariantImage(protocolVariant)}
                  alt="CONKA Protocol"
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="33vw"
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
        ) : (
          <div aria-hidden="true" />
        )}
      </div>

      <AssuranceBanner />
    </>
  );
}
