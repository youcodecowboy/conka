"use client";

import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
  protocolPricing,
  formatPrice,
  getProtocolTierTotalShots,
} from "@/app/lib/productData";
import { getProtocolHeroImages } from "@/app/components/navigation/protocolHeroConfig";
import ProductImageSlideshow from "@/app/components/product/ProductImageSlideshow";
import LandingTrustBadges from "@/app/components/landing/LandingTrustBadges";
import ProtocolRatioSelector from "./ProtocolRatioSelector";

interface ProtocolHeroMobileProps {
  protocolId: ProtocolId;
  selectedTier: ProtocolTier;
  onTierSelect: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
  onProtocolChange?: (id: ProtocolId) => void;
}

const TIER_OPTIONS: ProtocolTier[] = ["starter", "pro", "max"];

const TIER_LABELS: Record<ProtocolTier, string> = {
  starter: "4 Shots",
  pro: "12 Shots",
  max: "28 Shots",
};

export default function ProtocolHeroMobile({
  protocolId,
  selectedTier,
  onTierSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
  onProtocolChange,
}: ProtocolHeroMobileProps) {
  const protocol = protocolContent[protocolId];
  const totalShots = getProtocolTierTotalShots(protocolId, selectedTier);
  const tierConfig = protocol.tiers[selectedTier];

  // Get pricing
  const pricingType = protocolId === "4" ? "ultimate" : "standard";
  const subscriptionPricing =
    protocolPricing[pricingType]["subscription"][
      selectedTier as keyof (typeof protocolPricing)[typeof pricingType]["subscription"]
    ];
  const oneTimePricing =
    protocolPricing[pricingType]["one-time"][
      selectedTier as keyof (typeof protocolPricing)[typeof pricingType]["one-time"]
    ];

  const subPrice = subscriptionPricing?.price ?? 0;
  const otpPrice = oneTimePricing?.price ?? 0;
  const currentPrice = purchaseType === "subscription" ? subPrice : otpPrice;
  const subPerShot = totalShots > 0 ? subPrice / totalShots : 0;
  const otpPerShot = totalShots > 0 ? otpPrice / totalShots : 0;

  // Delivery description from tier config
  const deliveryDesc = tierConfig
    ? `${totalShots} shots (${tierConfig.conkaFlowCount} Flow + ${tierConfig.conkaClarityCount} Clear per week)`
    : "";

  return (
    <>
      {/* Header */}
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
                className="text-amber-500"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="brand-data text-black/60">
            Over 150,000 bottles sold
          </span>
        </div>
        <h1
          className="brand-h1-bold leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          {protocol.name}
        </h1>
        {protocolId !== "3" && (
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
              {protocol.subtitle} · {totalShots} shots
            </span>
          </div>
        )}
      </div>

      {/* Product Image */}
      <div className="relative w-full bg-[#FAFAFA]">
        <ProductImageSlideshow
          images={getProtocolHeroImages(protocolId)}
          alt={`${protocol.name} - Both formulas`}
          fullBleedThumbnails
        />
      </div>

      {/* Content */}
      <div className="pt-3 pb-4 space-y-3">
        {/* Description */}
        <p className="brand-body text-black/80 text-base leading-snug">
          {protocol.description}
        </p>

        {/* Ratio selector for non-Balance protocols */}
        {onProtocolChange && (
          <ProtocolRatioSelector
            value={protocolId}
            onChange={onProtocolChange}
          />
        )}

        {/* Pack Selector */}
        <div className="grid grid-cols-3 gap-2">
          {TIER_OPTIONS.filter((tier) => protocol.availableTiers.includes(tier)).map((tier) => {
            const isSelected = selectedTier === tier;
            return (
              <button
                key={tier}
                onClick={() => onTierSelect(tier)}
                className={`
                  relative text-center transition-all duration-200 rounded-xl w-full
                  border-2 cursor-pointer px-2 py-2.5 font-semibold text-xs
                  ${isSelected
                    ? "bg-[var(--brand-black)] border-[var(--brand-black)] text-white"
                    : "bg-white border-black/10 text-[var(--brand-black)] hover:border-black/20"
                  }
                `}
              >
                {tier === "pro" && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-px text-[7px] font-bold uppercase tracking-wide bg-[var(--brand-accent)] text-white rounded-full whitespace-nowrap leading-tight">
                    Most Popular
                  </span>
                )}
                {TIER_LABELS[tier]}
              </button>
            );
          })}
        </div>

        {/* Subscribe tile */}
        <div className="space-y-2">
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
            {purchaseType === "subscription" && (
              <div
                className="text-center py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: "var(--brand-accent)" }}
              >
                Best Value · Save 20%
              </div>
            )}

            <div className="p-4">
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
                    <span className="ml-2 inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--brand-accent)]/10 text-[var(--brand-accent)]">
                      Save 20%
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-clinical line-through text-black/50">
                    {formatPrice(otpPrice)}
                  </p>
                  <p className="text-2xl font-bold text-[var(--brand-black)]">
                    {formatPrice(subPrice)}
                  </p>
                  <p className="font-clinical text-xs text-black">
                    {formatPrice(subPerShot)}/shot
                  </p>
                </div>
              </div>

              {purchaseType === "subscription" && (
                <>
                  <p className="text-sm text-black/80 mt-3 ml-8">
                    {deliveryDesc}
                  </p>
                  <div className="mt-2 ml-8 space-y-1">
                    {["Free UK shipping", "Pause, skip, or cancel anytime", "100-day money-back guarantee"].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-black/80">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-[var(--brand-accent)]">
                          <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
                  {formatPrice(otpPrice)}
                </p>
                <p className="font-clinical text-xs text-black">
                  {formatPrice(otpPerShot)}/shot
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={onAddToCart}
          className="w-full px-8 py-4 font-bold text-lg text-white border-0 transition-opacity hover:opacity-90 active:opacity-80 shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
          style={{
            backgroundColor: "var(--brand-accent)",
            borderRadius: "var(--brand-radius-interactive)",
          }}
        >
          Add to Cart · {formatPrice(currentPrice)}
        </button>

        {/* Trust badges */}
        <LandingTrustBadges />
      </div>
    </>
  );
}
