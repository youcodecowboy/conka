"use client";

import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
  protocolPricing,
  formatPrice,
  getBillingLabel,
  FORMULA_COLORS,
  getProtocolGradient,
  getProtocolAccent,
  getGradientTextColor,
} from "@/app/lib/productData";
import { getProtocolHeroImages } from "@/app/components/navigation/protocolHeroConfig";
import ProductImageSlideshow from "@/app/components/product/ProductImageSlideshow";
import TierSelectorPremium from "./TierSelectorPremium";

interface ProtocolHeroMobileProps {
  protocolId: ProtocolId;
  selectedTier: ProtocolTier;
  onTierSelect: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

export default function ProtocolHeroMobile({
  protocolId,
  selectedTier,
  onTierSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: ProtocolHeroMobileProps) {
  const protocol = protocolContent[protocolId];
  const tierConfig = protocol.tiers[selectedTier];
  const availableTiers = protocol.availableTiers;
  const protocolAccent = getProtocolAccent(protocolId);
  const protocolGradient = getProtocolGradient(protocolId);
  const ctaTextClass = getGradientTextColor(protocolId) === "white" ? "text-white" : "text-black";

  // Get pricing
  const pricingType = protocolId === "4" ? "ultimate" : "standard";
  const tierPricing = protocolPricing[pricingType][purchaseType];
  const pricing = tierPricing[selectedTier as keyof typeof tierPricing];

  const billingText =
    purchaseType === "subscription" && pricing && "billing" in pricing
      ? getBillingLabel(pricing.billing)
      : "one-time";

  const oneTimePrice =
    selectedTier in protocolPricing[pricingType]["one-time"]
      ? (
          protocolPricing[pricingType]["one-time"] as Record<
            string,
            { price: number }
          >
        )[selectedTier]?.price ?? 0
      : 0;

  return (
    <section className="pt-0 pb-4 px-0 overflow-x-hidden w-full">
      <div className="w-full min-w-0 max-w-full px-3 box-border">
        {/* Header - stars + title + subline (align with desktop ProtocolHero) */}
        <div className="pt-3 pb-2">
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
                  style={{ color: protocolAccent }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="premium-data text-current/90">
              Over 100,000 bottles sold
            </span>
          </div>
          <h1 className="premium-display leading-tight font-primary text-current">
            {protocol.name}
          </h1>
          <div className="mt-2">
            <span className="inline-block px-4 py-1 rounded-full bg-black/[0.04] premium-data text-current/90 text-sm">
              {protocol.subtitle}
            </span>
          </div>
        </div>

        {/* Product Image + thumbnails – full viewport width */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 bg-[#FAFAFA]">
          <ProductImageSlideshow
            images={getProtocolHeroImages(protocolId)}
            alt={`${protocol.name} - Both formulas`}
            fullBleedThumbnails
          />
        </div>

        {/* Content */}
        <div className="pt-3 pb-4 space-y-3">
          {/* Headline description */}
          <p className="premium-title text-current/90 font-bold text-base leading-snug mb-1.5">
            {protocol.description}
          </p>

          {/* What you get – Flow/Clear per week + total shots */}
          {tierConfig && (
            <div className="bg-[var(--color-surface)] rounded-xl px-4 py-3 w-full">
              <p className="premium-data uppercase opacity-70 mb-3">
                Your weekly mix
              </p>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: FORMULA_COLORS["01"].hex }}
                    aria-hidden
                  />
                  <span className="font-clinical text-sm">
                    <span className="font-bold text-current">
                      {tierConfig.conkaFlowCount}
                    </span>{" "}
                    Flow
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: FORMULA_COLORS["02"].hex }}
                    aria-hidden
                  />
                  <span className="font-clinical text-sm">
                    <span className="font-bold text-current">
                      {tierConfig.conkaClarityCount}
                    </span>{" "}
                    Clear
                  </span>
                </span>
                <span className="premium-data text-sm opacity-80">
                  · {tierConfig.shotsPerWeek} shots total
                </span>
              </div>
              {protocol.bestFor[0] && (
                <p className="mt-2 premium-data text-xs opacity-70">
                  {protocol.bestFor[0]}
                </p>
              )}
            </div>
          )}

          {/* Tier Selector */}
          <TierSelectorPremium
            protocolId={protocolId}
            selectedTier={selectedTier}
            onSelect={onTierSelect}
            purchaseType={purchaseType}
            availableTiers={availableTiers}
            subscriptionAccentColor={protocolAccent}
            compact
          />

          {/* Purchase type buttons */}
          <div className="space-y-2">
            <p className="premium-data uppercase opacity-70 mb-2">
              How would you like to purchase?
            </p>
            <button
              onClick={() => onPurchaseTypeChange("subscription")}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-black/[0.06] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] ${
                purchaseType === "subscription"
                  ? "ring-2 ring-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  : ""
              }`}
            >
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
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold">Subscribe</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-clinical text-white flex-shrink-0"
                    style={{ backgroundColor: protocolAccent }}
                  >
                    20% off
                  </span>
                </div>
                {purchaseType === "subscription" && (
                  <ul className="mt-2 space-y-1.5 font-clinical text-xs opacity-80">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      100-day guarantee
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0"
                      >
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      Free UK shipping
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0"
                      >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                      Cancel anytime
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      No minimum commitment
                    </li>
                  </ul>
                )}
              </div>
            </button>
            <button
              onClick={() => onPurchaseTypeChange("one-time")}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 cursor-pointer bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-black/[0.06] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] ${
                purchaseType === "one-time"
                  ? "ring-2 ring-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  : ""
              }`}
            >
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
              <span className="font-bold">One-time</span>
            </button>
          </div>

          {/* Price summary */}
          {pricing && (
            <div className="flex justify-between items-center py-4 rounded-xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-black/[0.06] px-4">
              <div>
                <p className="premium-data uppercase opacity-70">
                  Your Selection
                </p>
                <p className="font-bold">
                  {tierConfig?.name} • {billingText}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-2">
                  {purchaseType === "subscription" && oneTimePrice > 0 && (
                    <span className="text-xl font-clinical line-through opacity-50">
                      {formatPrice(oneTimePrice)}
                    </span>
                  )}
                  <span
                    className="text-3xl font-bold"
                    style={
                      purchaseType === "subscription"
                        ? { color: protocolAccent }
                        : undefined
                    }
                  >
                    {formatPrice(pricing.price)}
                  </span>
                </div>
                {tierConfig && (
                  <p className="font-clinical text-xs opacity-70 mt-0.5">
                    {tierConfig.shotsPerWeek} shots/week
                  </p>
                )}
                {purchaseType === "subscription" && (
                  <span
                    className="inline-flex items-center gap-1 mt-1 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: protocolAccent }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    SAVE 20%
                  </span>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={onAddToCart}
            className={`w-full px-8 py-4 font-bold text-lg rounded-full border-0 transition-opacity hover:opacity-90 active:opacity-80 shadow-[0_2px_8px_rgba(0,0,0,0.12)] ${ctaTextClass}`}
            style={{
              background: `linear-gradient(90deg, ${protocolGradient.start} 0%, ${protocolGradient.end} 100%)`,
            }}
          >
            {purchaseType === "subscription"
              ? "Subscribe Now"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </section>
  );
}
