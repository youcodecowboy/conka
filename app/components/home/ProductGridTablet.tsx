"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import LandingTrustBadges from "../landing/LandingTrustBadges";
import ProductCard from "./ProductCard";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
import type { ProductGridProps } from "./ProductGrid";
import { getProductGridCopy } from "./productGridCopy";

export default function ProductGridTablet(props?: ProductGridProps) {
  const { exclude = [] } = props ?? {};

  const handleAddToCart = useCallback((productType: "flow" | "clear" | "protocol") => {
    console.log(`Add to cart: ${productType}`);
  }, []);

  const showFlow = !exclude.includes("flow");
  const showClear = !exclude.includes("clear");
  const showProtocol = !exclude.includes("protocol");
  const copy = getProductGridCopy({ exclude });

  return (
    <>
      <div className="mb-10">
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

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Column 1: Protocol (Both) */}
        {showProtocol ? (
          <div className="flex flex-col items-center">
            <Link
              href="/protocol/3"
              className="block relative w-full mx-auto aspect-square mb-4 rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10"
            >
              <div className="relative w-full h-full">
                <Image
                  src={getProtocolImage("3")}
                  alt="Both — CONKA Flow and Clear"
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--brand-accent)]"
                >
                  Most Popular
                </div>
              </div>
            </Link>
            <ProductCard
              productType="protocol"
              onAddToCart={() => handleAddToCart("protocol")}
            />
          </div>
        ) : (
          <div aria-hidden="true" />
        )}

        {/* Column 2: Flow */}
        {showFlow ? (
          <div className="flex flex-col items-center">
            <Link
              href="/conka-flow"
              className="block relative w-full mx-auto aspect-square mb-4 rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10"
            >
              <div className="relative w-full h-full">
                <Image
                  src={getFormulaImage("01")}
                  alt="CONKA Flow"
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--brand-accent)]"
                >
                  Morning
                </div>
              </div>
            </Link>
            <ProductCard
              productType="flow"
              onAddToCart={() => handleAddToCart("flow")}
            />
          </div>
        ) : (
          <div aria-hidden="true" />
        )}

        {/* Column 3: Clear */}
        {showClear ? (
          <div className="flex flex-col items-center">
            <Link
              href="/conka-clarity"
              className="block relative w-full mx-auto aspect-square mb-4 rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10"
            >
              <div className="relative w-full h-full">
                <Image
                  src={getFormulaImage("02")}
                  alt="CONKA Clear"
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--brand-accent)]"
                >
                  Afternoon
                </div>
              </div>
            </Link>
            <ProductCard
              productType="clear"
              onAddToCart={() => handleAddToCart("clear")}
            />
          </div>
        ) : (
          <div aria-hidden="true" />
        )}
      </div>

      <LandingTrustBadges />
    </>
  );
}
