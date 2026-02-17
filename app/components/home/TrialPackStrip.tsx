"use client";

import { useState, useCallback } from "react";
import { PurchaseType } from "@/app/lib/productData";
import GlobalPurchaseToggle from "./GlobalPurchaseToggle";
import Link from "next/link";

interface TrialPackCardProps {
  name: string;
  copy: string;
  price: string;
  ctaText: string;
  onAddToCart: () => void;
}

function TrialPackCard({ name, copy, price, ctaText, onAddToCart }: TrialPackCardProps) {
  return (
    <div className="premium-card-soft premium-card-soft-stroke flex flex-col">
      <div className="flex-1 flex flex-col">
        <h3 className="premium-heading text-lg font-bold mb-2">{name}</h3>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-4 flex-1">
          {copy}
        </p>
        <div className="mt-auto pt-4 border-t border-black/10">
          <div className="mb-3">
            <p className="premium-heading text-lg font-bold">{price}</p>
          </div>
          <button
            onClick={onAddToCart}
            className="w-full py-2.5 rounded-[var(--premium-radius-interactive)] font-semibold text-white bg-[var(--color-ink)] transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)]"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TrialPackStrip() {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscription");

  // Placeholder pricing
  const priceDisplay = purchaseType === "subscription" ? "£X" : "£X";

  const handleAddToCart = useCallback((trialType: "flow" | "clear" | "protocol") => {
    // TODO: Implement add to cart logic
    console.log(`Add trial pack to cart: ${trialType}`, { purchaseType });
  }, [purchaseType]);

  return (
    <section
      id="trial-packs"
      className="premium-section-luxury premium-bg-bone"
      aria-label="Trial Packs"
    >
      <div className="premium-track">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="premium-section-heading">
            New to CONKA? Start Here.
          </h2>
          <p className="premium-section-subtitle">
            Try before you commit. 4-shot trial packs at a lower price point.
          </p>
        </div>

        {/* Global Toggle */}
        <div className="mb-6">
          <GlobalPurchaseToggle
            purchaseType={purchaseType}
            onToggle={setPurchaseType}
          />
        </div>

        {/* Trial Pack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <TrialPackCard
            name="Flow Trial"
            copy="4-shot introduction to CONKA Flow"
            price={priceDisplay}
            ctaText="Try Flow"
            onAddToCart={() => handleAddToCart("flow")}
          />
          <TrialPackCard
            name="Clear Trial"
            copy="4-shot introduction to CONKA Clear"
            price={priceDisplay}
            ctaText="Try Clear"
            onAddToCart={() => handleAddToCart("clear")}
          />
          <TrialPackCard
            name="Protocol Trial"
            copy="4-shot introduction (2 Flow + 2 Clear)"
            price={priceDisplay}
            ctaText="Try Protocol"
            onAddToCart={() => handleAddToCart("protocol")}
          />
        </div>
      </div>
    </section>
  );
}
