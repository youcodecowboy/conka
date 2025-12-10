"use client";

import Image from "next/image";
import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
  protocolPricing,
  formatPrice,
  getBillingLabel,
  FORMULA_COLORS,
} from "@/app/lib/productData";
import PurchaseToggle from "../product/PurchaseToggle";
import TierSelector from "./TierSelector";
import ProtocolTabs from "./ProtocolTabs";

interface ProtocolHeroProps {
  protocolId: ProtocolId;
  selectedTier: ProtocolTier;
  onTierSelect: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

// Protocol icons
const protocolIcons: Record<string, React.ReactNode> = {
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  bolt: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  balance: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M3 12h18" />
      <circle cx="6" cy="8" r="3" />
      <circle cx="18" cy="8" r="3" />
      <circle cx="6" cy="16" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  crown: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  ),
};

export default function ProtocolHero({
  protocolId,
  selectedTier,
  onTierSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: ProtocolHeroProps) {
  const protocol = protocolContent[protocolId];
  const tierConfig = protocol.tiers[selectedTier];
  const availableTiers = protocol.availableTiers;

  // Get pricing
  const pricingType = protocolId === "4" ? "ultimate" : "standard";
  const tierPricing = protocolPricing[pricingType][purchaseType];
  const pricing = tierPricing[selectedTier as keyof typeof tierPricing];

  const billingText =
    purchaseType === "subscription" && pricing && "billing" in pricing
      ? getBillingLabel(pricing.billing)
      : "one-time";

  // Header color based on purchase type - use teal for protocols
  const headerBgClass =
    purchaseType === "subscription"
      ? "bg-[var(--foreground)] text-[var(--background)]"
      : "bg-[#AAB9BC] text-white";
  
  const oneTimeColor = "#AAB9BC";

  return (
    <section className="px-6 md:px-16 py-8 md:py-16">
      <div className="max-w-6xl mx-auto lg:ml-auto lg:mr-0 lg:max-w-[90%] xl:max-w-[85%]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Product Image */}
          <div className="lg:w-1/2 order-1 lg:order-1 relative z-0">
            <div className="sticky top-24">
              <div className="relative w-full aspect-square max-w-2xl mx-auto scale-[2] origin-center z-0">
                <Image
                  src="/protocol.png"
                  alt={`${protocol.name} - Both formulas`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {/* Annotation */}
              <p className="font-commentary text-lg text-center mt-4 opacity-70">
                the complete cognitive stack
              </p>
            </div>
          </div>

          {/* Right: Protocol Info Box */}
          <div className="lg:w-1/2 order-2 lg:order-2 relative z-10">
            <div className="neo-box relative z-10">
              {/* Header with conditional color - Fixed height */}
              <div
                className={`p-4 md:p-6 flex justify-between items-center h-[100px] ${headerBgClass}`}
              >
                <div className="flex-shrink-0 flex flex-col justify-center">
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight">{protocol.name}</h1>
                  <p className="font-commentary text-lg mt-1 leading-tight">{protocol.subtitle}</p>
                </div>
                {/* Purchase Toggle - Right aligned in header */}
                <div className="flex-shrink-0 flex items-center">
                  <PurchaseToggle
                    purchaseType={purchaseType}
                    onToggle={onPurchaseTypeChange}
                    highlightColor={oneTimeColor}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 space-y-6">
                {/* Protocol Tabs Navigation */}
                <ProtocolTabs protocolId={protocolId} />

                {/* Divider */}
                <div className="border-t-2 border-current border-opacity-10" />

                {/* Tier Selector */}
                <TierSelector
                  selectedTier={selectedTier}
                  onSelect={onTierSelect}
                  purchaseType={purchaseType}
                  protocolId={protocolId}
                  availableTiers={availableTiers}
                  highlightColor={oneTimeColor}
                />

                {/* What's Included */}
                {tierConfig && (
                  <div className={`p-4 rounded-lg ${
                    purchaseType === "one-time" 
                      ? "bg-[#AAB9BC]/10 border-2 border-[#AAB9BC]" 
                      : "bg-current/5"
                  }`}>
                    <p className="font-clinical text-xs uppercase opacity-70 mb-3">
                      What&apos;s Included
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-md ${FORMULA_COLORS["01"].bg} flex items-center justify-center`}>
                          <span className="text-white font-clinical text-xs font-bold">01</span>
                        </div>
                        <div>
                          <p className="font-bold text-[var(--foreground)]">
                            {tierConfig.formula01Count}x Formula 01
                          </p>
                          <a href="/formula-01" className="font-clinical text-xs text-[#AAB9BC] hover:underline">
                            Learn more →
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-md ${FORMULA_COLORS["02"].bg} flex items-center justify-center`}>
                          <span className="text-white font-clinical text-xs font-bold">02</span>
                        </div>
                        <div>
                          <p className="font-bold text-[var(--foreground)]">
                            {tierConfig.formula02Count}x Formula 02
                          </p>
                          <a href="/formula-02" className="font-clinical text-xs text-amber-500 hover:underline">
                            Learn more →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Price Display */}
                {pricing && (
                  <div
                    className={`flex justify-between items-center p-4 rounded-lg border-2 ${
                      purchaseType === "one-time"
                        ? "border-[#AAB9BC]"
                        : "bg-[#AAB9BC]/10 border-[#AAB9BC]"
                    }`}
                    style={
                      purchaseType === "one-time"
                        ? {
                            backgroundColor: "rgba(170, 185, 188, 0.1)",
                          }
                        : undefined
                    }
                  >
                    <div>
                      <p className="font-clinical text-xs uppercase opacity-70">
                        Your Selection
                      </p>
                      <p className="font-bold">
                        {tierConfig?.name} • {billingText}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{formatPrice(pricing.price)}</p>
                      {tierConfig && (
                        <p className="font-clinical text-xs opacity-70">
                          {tierConfig.shotsPerWeek} shots/week
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="flex justify-center gap-6">
                  <span className="font-clinical text-xs opacity-70 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    100-day guarantee
                  </span>
                  <span className="font-clinical text-xs opacity-70 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    Free UK shipping
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={onAddToCart}
                    className="w-full neo-button px-8 py-4 font-bold text-lg"
                  >
                    {purchaseType === "subscription" ? "Subscribe Now" : "Add to Cart"}
                  </button>
                  {purchaseType === "subscription" && (
                    <p className="text-center font-clinical text-xs opacity-70">
                      Cancel anytime • No minimum commitment
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
