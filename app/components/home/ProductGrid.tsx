"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LandingTrustBadges from "../landing/LandingTrustBadges";
import ProductCard from "./ProductCard";
import ProductGridMobile from "./ProductGridMobile";
import ProductGridTablet from "./ProductGridTablet";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
import { getProductAccent } from "@/app/lib/productColors";
import { getProductGridCopy } from "./productGridCopy";

export interface ProductGridProps {
  exclude?: ("flow" | "clear" | "protocol")[];
}

export default function ProductGrid(props?: ProductGridProps) {
  const { exclude = [] } = props ?? {};
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const check = () => setWidth(window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleAddToCart = useCallback((productType: "flow" | "clear" | "protocol") => {
    console.log(`Add to cart: ${productType}`);
  }, []);

  const showFlow = !exclude.includes("flow");
  const showClear = !exclude.includes("clear");
  const showProtocol = !exclude.includes("protocol");
  const copy = getProductGridCopy({ exclude });

  if (width !== undefined && width < 768) {
    return <ProductGridMobile exclude={exclude} />;
  }

  if (width !== undefined && width < 1024) {
    return <ProductGridTablet exclude={exclude} />;
  }

  if (width !== undefined && width >= 1024) {
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

        <div className="product-grid-container grid grid-cols-3 gap-8 mb-8">
          {/* Column 1: Flow or empty — always 3 columns so card size stays same with 2 cards */}
          {showFlow ? (
            <div className="product-card-wrapper product-card-formula flex flex-col items-stretch h-full">
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
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: getProductAccent("01") || "#111" }}
                  >
                    Energy
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

          {/* Column 2: Clear or empty */}
          {showClear ? (
            <div className="product-card-wrapper product-card-formula flex flex-col items-stretch h-full">
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
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: getProductAccent("02") || "#111" }}
                  >
                    Recovery
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

          {/* Column 3: Protocol (Balance) or empty */}
          {showProtocol ? (
            <div className="product-card-wrapper product-card-formula product-card-protocol flex flex-col items-stretch h-full">
              <Link
                href="/protocol/3"
                className="block relative w-full mx-auto aspect-square mb-4 rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={getProtocolImage("3")}
                    alt="CONKA Protocol"
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: getProductAccent("3") || "#3a9f7e" }}
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
        </div>

        <LandingTrustBadges />
      </>
    );
  }

  return null;
}
