"use client";

import { useState, useCallback } from "react";
import { PurchaseType } from "@/app/lib/productData";
import GlobalPurchaseToggle from "./GlobalPurchaseToggle";
import AssuranceBanner from "./AssuranceBanner";
import ProductCard from "./ProductCard";
import type { ProtocolVariant } from "./ProtocolVariantSelector";

export default function ProductGrid() {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscription");
  const [protocolVariant, setProtocolVariant] = useState<ProtocolVariant>("balance");

  const handleAddToCart = useCallback((productType: "flow" | "clear" | "protocol") => {
    // TODO: Implement add to cart logic
    console.log(`Add to cart: ${productType}`, { purchaseType, protocolVariant });
  }, [purchaseType, protocolVariant]);

  const scrollToTrialPacks = useCallback(() => {
    const element = document.getElementById("trial-packs");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      {/* Section Header */}
      <div className="mb-8 md:mb-12 text-center">
        <h2 className="premium-section-heading">
          Find Your Formula
        </h2>
        <p className="premium-section-subtitle">
          Individual formulas for specific needs, or protocols for complete performance.
        </p>
      </div>

      {/* Assurance Banner */}
      <AssuranceBanner />

      {/* Global Purchase Toggle */}
      <div className="mb-8">
        <GlobalPurchaseToggle
          purchaseType={purchaseType}
          onToggle={setPurchaseType}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
        <ProductCard
          productType="flow"
          purchaseType={purchaseType}
          onAddToCart={() => handleAddToCart("flow")}
        />
        <ProductCard
          productType="clear"
          purchaseType={purchaseType}
          onAddToCart={() => handleAddToCart("clear")}
        />
        <ProductCard
          productType="protocol"
          purchaseType={purchaseType}
          protocolVariant={protocolVariant}
          onProtocolVariantChange={setProtocolVariant}
          onAddToCart={() => handleAddToCart("protocol")}
        />
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
