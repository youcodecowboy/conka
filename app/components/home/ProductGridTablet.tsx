"use client";

import { useCallback } from "react";
import LabTrustBadges from "../landing/LabTrustBadges";
import ProductCard from "./ProductCard";
import type { ProductGridProps } from "./ProductGrid";
import { getProductGridCopy } from "./productGridCopy";

export default function ProductGridTablet(props?: ProductGridProps) {
  const { exclude = [] } = props ?? {};

  const handleAddToCart = useCallback(
    (productType: "flow" | "clear" | "protocol") => {
      console.log(`Add to cart: ${productType}`);
    },
    [],
  );

  const showFlow = !exclude.includes("flow");
  const showClear = !exclude.includes("clear");
  const showProtocol = !exclude.includes("protocol");
  const copy = getProductGridCopy({ exclude });

  return (
    <>
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
          {copy.eyebrow}
        </p>
        <h2
          className="brand-h1 mb-2 text-black"
          style={{ letterSpacing: "-0.02em" }}
        >
          {copy.title}
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
          {copy.monoSub}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5 items-stretch mb-8">
        {showProtocol ? (
          <ProductCard
            productType="protocol"
            onAddToCart={() => handleAddToCart("protocol")}
          />
        ) : (
          <div aria-hidden="true" />
        )}

        {showFlow ? (
          <ProductCard
            productType="flow"
            onAddToCart={() => handleAddToCart("flow")}
          />
        ) : (
          <div aria-hidden="true" />
        )}

        {showClear ? (
          <ProductCard
            productType="clear"
            onAddToCart={() => handleAddToCart("clear")}
          />
        ) : (
          <div aria-hidden="true" />
        )}
      </div>

      <LabTrustBadges />
    </>
  );
}
