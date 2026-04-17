"use client";

import {
  FormulaId,
  PackSize,
  PurchaseType,
  formulaContent,
  formulaPricing,
  formatPrice,
  FORMULA_GRADIENTS,
  getGradientTextColor,
  formulaImages,
} from "@/app/lib/productData";
import PackSelectorPremium from "./PackSelectorPremium";
import ProductImageSlideshow from "./ProductImageSlideshow";
import LandingTrustBadges from "../landing/LandingTrustBadges";

interface ProductHeroProps {
  formulaId: FormulaId;
  selectedPack: PackSize;
  onPackSelect: (pack: PackSize) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

/** Shipping frequency badge text based on pack billing cycle */
function getShippingBadge(billing: string): string {
  switch (billing) {
    case "weekly":
      return "Ships weekly";
    case "bi-weekly":
      return "Ships bi-weekly";
    case "monthly":
      return "Ships monthly";
    default:
      return `Ships ${billing}`;
  }
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
  const ctaTextClass =
    getGradientTextColor(formulaId) === "white" ? "text-white" : "text-black";
  const shippingBadge = getShippingBadge(
    (subscriptionPricing as { billing: string }).billing,
  );

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
                    className={
                      formulaId === "01" ? "text-amber-500" : "text-[#94b9ff]"
                    }
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
              purchaseType={purchaseType}
              subscriptionAccentColor={
                formulaId === "01" ? "#f59e0b" : "#94b9ff"
              }
            />
          </div>

          {/* Purchase type tiles */}
          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              {/* Subscribe tile */}
              <button
                onClick={() => onPurchaseTypeChange("subscription")}
                className={`w-full text-left p-4 transition-all cursor-pointer bg-white ${
                  purchaseType === "subscription"
                    ? "ring-2 ring-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    : "border border-[var(--brand-border-color)] shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                }`}
                style={{ borderRadius: "var(--brand-radius-container)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                        purchaseType === "subscription"
                          ? "border-current bg-current/10"
                          : "border-black/30"
                      }`}
                    >
                      {purchaseType === "subscription" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-current" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold">Subscribe</span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-clinical text-white flex-shrink-0"
                          style={{
                            backgroundColor:
                              formulaId === "01" ? "#f59e0b" : "#94b9ff",
                          }}
                        >
                          Save 20%
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-clinical text-black/60 bg-black/[0.04] flex-shrink-0">
                          {shippingBadge}
                        </span>
                      </div>
                      {purchaseType === "subscription" && (
                        <ul className="mt-2 space-y-1 font-clinical text-xs text-black/60">
                          <li>Free UK shipping</li>
                          <li>20% off every order</li>
                          <li>Pause, skip, or cancel anytime</li>
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {purchaseType === "subscription" && (
                      <p className="text-sm font-clinical line-through text-black/40">
                        {formatPrice(oneTimePricing.price)}
                      </p>
                    )}
                    <p
                      className="text-2xl font-bold"
                      style={
                        purchaseType === "subscription"
                          ? {
                              color:
                                formulaId === "01" ? "#d97706" : "#94b9ff",
                            }
                          : undefined
                      }
                    >
                      {formatPrice(subscriptionPricing.price)}
                    </p>
                    <p className="font-clinical text-xs text-black/40">
                      {formatPrice(subscriptionPricing.perShot)}/shot
                    </p>
                  </div>
                </div>
              </button>

              {/* Buy Once tile */}
              <button
                onClick={() => onPurchaseTypeChange("one-time")}
                className={`w-full text-left p-4 transition-all cursor-pointer bg-white ${
                  purchaseType === "one-time"
                    ? "ring-2 ring-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    : "border border-[var(--brand-border-color)] shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                }`}
                style={{ borderRadius: "var(--brand-radius-container)" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        purchaseType === "one-time"
                          ? "border-current bg-current/10"
                          : "border-black/30"
                      }`}
                    >
                      {purchaseType === "one-time" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-current" />
                      )}
                    </span>
                    <span className="font-bold">Buy Once</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold">
                      {formatPrice(oneTimePricing.price)}
                    </p>
                    <p className="font-clinical text-xs text-black/40">
                      {formatPrice(oneTimePricing.perShot)}/shot
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* CTA with price */}
          <button
            onClick={onAddToCart}
            className={`w-full px-8 py-4 font-bold text-lg border-0 transition-opacity hover:opacity-90 active:opacity-80 shadow-[0_2px_8px_rgba(0,0,0,0.12)] ${ctaTextClass}`}
            style={{
              background: `linear-gradient(90deg, ${FORMULA_GRADIENTS[formulaId].start} 0%, ${FORMULA_GRADIENTS[formulaId].end} 100%)`,
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
