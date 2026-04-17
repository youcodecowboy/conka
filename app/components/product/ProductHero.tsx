"use client";

import {
  FormulaId,
  PackSize,
  PurchaseType,
  formulaContent,
  formulaPricing,
  formatPrice,
  formulaImages,
} from "@/app/lib/productData";
import PackSelectorPremium from "./PackSelectorPremium";
import ProductImageSlideshow from "./ProductImageSlideshow";
import LandingTrustBadges from "../landing/LandingTrustBadges";
import { getDeliveryDescription } from "./formulaStatsData";

interface ProductHeroProps {
  formulaId: FormulaId;
  selectedPack: PackSize;
  onPackSelect: (pack: PackSize) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

export default function ProductHero({
  formulaId,
  selectedPack,
  onPackSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: ProductHeroProps) {
  const formula = formulaContent[formulaId];
  const pricing = formulaPricing[purchaseType][selectedPack];
  const subscriptionPricing = formulaPricing["subscription"][selectedPack];
  const oneTimePricing = formulaPricing["one-time"][selectedPack];

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-[var(--brand-space-m)]">
      {/* Left: Product Image - sticky on desktop */}
      <div className="relative z-0 lg:w-[44%] lg:flex-shrink-0 order-1 lg:order-1 lg:sticky lg:top-24 lg:self-start">
        <div className="relative w-full group">
          <ProductImageSlideshow
            images={
              formulaId === "01" ? formulaImages.flow : formulaImages.clear
            }
            alt={`${formula.name} bottle`}
          />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col gap-[var(--brand-space-s)] lg:gap-[var(--brand-space-l)] flex-1 lg:w-[48%] lg:flex-shrink-0 min-w-0 order-2 lg:order-2 relative z-10">
        <div
          className="brand-card flex flex-col gap-[var(--brand-space-s)] lg:gap-[var(--brand-space-m)] !border-0 relative z-10"
          style={{
            paddingLeft: "var(--brand-space-m)",
            paddingRight: "var(--brand-space-m)",
            paddingTop: "var(--brand-space-s)",
            paddingBottom: "var(--brand-space-m)",
            backgroundColor: "#fff",
          }}
        >
          {/* Top section: stars + title + meta pill */}
          <div className="mb-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <div className="flex" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-amber-500"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="brand-data text-black/60">
                {formulaId === "01"
                  ? "Over 90,000 bottles sold"
                  : "Over 60,000 bottles sold"}
              </span>
            </div>
            <h1
              className="brand-h1-bold leading-tight font-primary text-current"
              style={{ letterSpacing: "-0.02em" }}
            >
              {formulaId === "01" ? (
                <>
                  CONKA <span className="font-primary">FL0W</span>
                </>
              ) : (
                formula.name
              )}
            </h1>
            <div className="mt-2">
              <span
                className="inline-block py-1 brand-data text-black/60 text-sm"
                style={{
                  paddingLeft: "var(--brand-space-m)",
                  paddingRight: "var(--brand-space-m)",
                  borderRadius: "var(--brand-radius-interactive)",
                  background: "rgba(0,0,0,0.04)",
                }}
              >
                Liquid · 1 shot (30ml) daily · {selectedPack}-pack
              </span>
            </div>
          </div>

          {/* Headline description */}
          <p className="brand-body text-black/80 text-base md:text-lg leading-snug mb-1.5">
            {formula.headline}
          </p>

          {/* Pack Selector */}
          <div>
            <PackSelectorPremium
              selectedPack={selectedPack}
              onSelect={onPackSelect}
            />
          </div>

          {/* Purchase type tiles */}
          <div className="space-y-2">
            {/* Subscribe tile - always expanded */}
            <button
              onClick={() => onPurchaseTypeChange("subscription")}
              className={`w-full text-left transition-all cursor-pointer bg-white overflow-hidden ${
                purchaseType === "subscription"
                  ? "ring-2 shadow-md"
                  : "border border-black/10 shadow-sm"
              }`}
              style={{
                borderRadius: "var(--brand-radius-container)",
                ...(purchaseType === "subscription"
                  ? { ringColor: "var(--brand-accent)", borderColor: "var(--brand-accent)" }
                  : {}),
              }}
            >
              {/* Badge banner when selected */}
              {purchaseType === "subscription" && (
                <div
                  className="text-center py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: "var(--brand-accent)" }}
                >
                  Best Value · Save 20%
                </div>
              )}

              <div className="p-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                        purchaseType === "subscription"
                          ? "border-[var(--brand-accent)] bg-[var(--brand-accent)]"
                          : "border-black/30"
                      }`}
                    >
                      {purchaseType === "subscription" && (
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                          <path d="M2.5 8.5L6.5 12L13.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[var(--brand-black)]">Subscribe</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-clinical line-through text-black/50">
                      {formatPrice(oneTimePricing.price)}
                    </p>
                    <p className="text-2xl font-bold text-[var(--brand-black)]">
                      {formatPrice(subscriptionPricing.price)}
                    </p>
                    <p className="font-clinical text-xs text-black/60">
                      {formatPrice(subscriptionPricing.perShot)}/shot
                    </p>
                  </div>
                </div>

                {/* Delivery description */}
                <p className="text-sm text-black/80 mt-3 ml-8">
                  📦 {getDeliveryDescription(selectedPack)}
                </p>

                {/* Feature bullets - always visible */}
                <div className="mt-2 ml-8 space-y-1">
                  {["Free UK shipping", "20% off every order", "Pause, skip, or cancel anytime", "100-day money-back guarantee"].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-black/80">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-[var(--brand-accent)]">
                        <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </button>

            {/* Buy Once tile */}
            <button
              onClick={() => onPurchaseTypeChange("one-time")}
              className={`w-full text-left p-4 transition-all cursor-pointer bg-white ${
                purchaseType === "one-time"
                  ? "ring-2 shadow-md"
                  : "border border-black/10 shadow-sm"
              }`}
              style={{
                borderRadius: "var(--brand-radius-container)",
                ...(purchaseType === "one-time"
                  ? { ringColor: "var(--brand-accent)", borderColor: "var(--brand-accent)" }
                  : {}),
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      purchaseType === "one-time"
                        ? "border-[var(--brand-accent)] bg-[var(--brand-accent)]"
                        : "border-black/30"
                    }`}
                  >
                    {purchaseType === "one-time" && (
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M2.5 8.5L6.5 12L13.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="font-bold text-[var(--brand-black)]">Buy Once</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-[var(--brand-black)]">
                    {formatPrice(oneTimePricing.price)}
                  </p>
                  <p className="font-clinical text-xs text-black/60">
                    {formatPrice(oneTimePricing.perShot)}/shot
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* CTA with price - brand accent */}
          <button
            onClick={onAddToCart}
            className="w-full px-8 py-4 font-bold text-lg text-white border-0 transition-opacity hover:opacity-90 active:opacity-80 shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            style={{
              backgroundColor: "var(--brand-accent)",
              borderRadius: "var(--brand-radius-interactive)",
            }}
          >
            Add to Cart · {formatPrice(pricing.price)}
          </button>

          {/* Trust badges */}
          <LandingTrustBadges />
        </div>
      </div>
    </div>
  );
}
