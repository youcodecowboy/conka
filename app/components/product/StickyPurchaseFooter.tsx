"use client";

import { useState, useEffect, useRef } from "react";
import {
  PackSize,
  PurchaseType,
  ProtocolTier,
  formulaPricing,
  protocolPricing,
  formatPrice,
  getBillingLabel,
  FormulaId,
  ProtocolId,
  protocolContent,
} from "@/app/lib/productData";

interface StickyPurchaseFooterProps {
  // For formula pages
  formulaId?: FormulaId;
  selectedPack?: PackSize;
  onPackSelect?: (pack: PackSize) => void;
  // For protocol pages
  protocolId?: ProtocolId;
  selectedTier?: ProtocolTier;
  onTierSelect?: (tier: ProtocolTier) => void;
  // Shared
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

const packSizes: PackSize[] = ["4", "12", "28"];
const packLabels: Record<PackSize, string> = {
  "4": "4-pack",
  "12": "12-pack",
  "28": "28-pack",
};

export default function StickyPurchaseFooter({
  formulaId,
  selectedPack,
  onPackSelect,
  protocolId,
  selectedTier,
  onTierSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: StickyPurchaseFooterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPackDropdown, setShowPackDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Show footer always on desktop, after scrolling on mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint
      setIsVisible(isDesktop || scrollY > 500);
    };

    // Check on mount and resize
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowPackDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate price based on formula or protocol
  let price = 0;
  let billingText = "";
  let productLabel = "";
  let showPackSelector = false;
  let showTierSelector = false;
  let availableTiers: ProtocolTier[] = [];

  if (formulaId && selectedPack) {
    const pricing = formulaPricing[purchaseType][selectedPack];
    price = pricing.price;
    billingText =
      purchaseType === "subscription"
        ? getBillingLabel((pricing as { billing: string }).billing)
        : "one-time";
    productLabel = `${packLabels[selectedPack]} ${billingText}`;
    showPackSelector = true;
  } else if (protocolId && selectedTier) {
    const pricingType = protocolId === "4" ? "ultimate" : "standard";
    const tierPricing = protocolPricing[pricingType][purchaseType];
    if (selectedTier in tierPricing) {
      const pricing = tierPricing[selectedTier as keyof typeof tierPricing];
      price = pricing.price;
      billingText =
        purchaseType === "subscription" && "billing" in pricing
          ? getBillingLabel(pricing.billing)
          : "one-time";
    }
    const tierName = selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1);
    productLabel = `${tierName} ${billingText}`;
    showTierSelector = true;
    // Get available tiers from protocol content
    const protocol = protocolContent[protocolId];
    availableTiers = protocol?.availableTiers || [];
  }

  const tierLabels: Record<ProtocolTier, string> = {
    starter: "Starter",
    pro: "Pro",
    max: "Max",
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop for pack dropdown */}
      {showPackDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowPackDropdown(false)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--background)] border-t-2 border-current shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto lg:ml-auto lg:mr-0 lg:max-w-[90%] xl:max-w-[85%] px-4 md:px-6 lg:pl-0 lg:pr-16 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            {/* Left: Your Selection with Pack/Tier Selector */}
            <div className="flex items-center gap-4 w-full md:w-auto md:flex-none">
              <span className="font-clinical text-xs uppercase opacity-70 whitespace-nowrap">Your Selection</span>
              {(showPackSelector && selectedPack && onPackSelect) || (showTierSelector && selectedTier && onTierSelect) ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowPackDropdown(!showPackDropdown)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-current rounded-full font-clinical text-sm hover:bg-current/5 transition-colors min-w-[200px]"
                  >
                    <span className="font-bold whitespace-nowrap">
                      {showPackSelector && selectedPack ? (
                        <>
                          {packLabels[selectedPack]}{" "}
                          <span className="font-commentary">{billingText}</span>
                        </>
                      ) : showTierSelector && selectedTier ? (
                        <>
                          {tierLabels[selectedTier]}{" "}
                          <span className="font-commentary">{billingText}</span>
                        </>
                      ) : (
                        productLabel
                      )}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform flex-shrink-0 ${showPackDropdown ? "rotate-180" : ""}`}
                    >
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </button>

                  {/* Pack/Tier Dropdown (drops UP from footer) */}
                  {showPackDropdown && (
                    <div className="absolute bottom-full left-0 mb-2 bg-[var(--background)] border-2 border-current rounded-lg overflow-hidden min-w-[240px] shadow-lg">
                      {showPackSelector && packSizes.map((pack) => {
                        const packPricing = formulaPricing[purchaseType][pack];
                        const packBillingText =
                          purchaseType === "subscription"
                            ? getBillingLabel((packPricing as { billing: string }).billing)
                            : "one-time";
                        return (
                          <button
                            key={pack}
                            onClick={() => {
                              onPackSelect?.(pack);
                              setShowPackDropdown(false);
                            }}
                            className={`w-full px-4 py-2 text-left font-clinical text-sm hover:bg-current/10 transition-colors ${
                              selectedPack === pack ? "bg-current/10 font-bold" : ""
                            }`}
                          >
                            <div className="flex justify-between items-center gap-4">
                              <span className="whitespace-nowrap">
                                {packLabels[pack]}{" "}
                                <span className="font-commentary">{packBillingText}</span>
                              </span>
                              <span className="opacity-70 whitespace-nowrap">{formatPrice(packPricing.price)}</span>
                            </div>
                          </button>
                        );
                      })}
                      {showTierSelector && protocolId && availableTiers.map((tier) => {
                        const pricingType = protocolId === "4" ? "ultimate" : "standard";
                        const tierPricing = protocolPricing[pricingType][purchaseType];
                        const tierPricingData = tierPricing[tier as keyof typeof tierPricing];
                        if (!tierPricingData) return null;
                        const tierBillingText =
                          purchaseType === "subscription" && "billing" in tierPricingData
                            ? getBillingLabel(tierPricingData.billing)
                            : "one-time";
                        return (
                          <button
                            key={tier}
                            onClick={() => {
                              onTierSelect?.(tier);
                              setShowPackDropdown(false);
                            }}
                            className={`w-full px-4 py-2 text-left font-clinical text-sm hover:bg-current/10 transition-colors ${
                              selectedTier === tier ? "bg-current/10 font-bold" : ""
                            }`}
                          >
                            <div className="flex justify-between items-center gap-4">
                              <span className="whitespace-nowrap">
                                {tierLabels[tier]}{" "}
                                <span className="font-commentary">{tierBillingText}</span>
                              </span>
                              <span className="opacity-70 whitespace-nowrap">{formatPrice(tierPricingData.price)}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="font-bold text-sm md:text-base">{productLabel}</p>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-current opacity-20"></div>

            {/* Right: Subscribe Toggle, CTA & Price */}
            <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-end">
              {/* Subscribe Toggle */}
              <button
                onClick={() =>
                  onPurchaseTypeChange(
                    purchaseType === "subscription" ? "one-time" : "subscription"
                  )
                }
                className="flex items-center gap-2 px-3 py-2 border-2 border-current rounded-full font-clinical text-xs hover:bg-current/5 transition-colors"
              >
                <div
                  className={`w-8 h-4 rounded-full relative transition-colors ${
                    purchaseType === "subscription" ? "bg-[#AAB9BC]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                      purchaseType === "subscription" ? "left-4" : "left-0.5"
                    }`}
                  />
                </div>
                <span className="hidden sm:inline">Subscribe</span>
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={onAddToCart}
                className="neo-button px-4 py-2 font-bold text-sm whitespace-nowrap"
              >
                Add to Cart
              </button>

              {/* Price Display */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <span className="text-xl md:text-2xl font-bold">{formatPrice(price)}</span>
                  <span className="font-clinical text-xs opacity-70 font-normal leading-none">+ Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
