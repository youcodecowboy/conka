"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  formulaContent,
  FORMULA_COLORS,
  FORMULA_GRADIENTS,
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
  usePremium?: boolean;
}

const packSizes: PackSize[] = ["4", "8", "12", "28"];
const packLabels: Record<PackSize, string> = {
  "4": "4-pack",
  "8": "8-pack",
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
  usePremium = false,
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
  let originalPrice = 0;
  let billingText = "";
  let productLabel = "";
  let showPackSelector = false;
  let showTierSelector = false;
  let availableTiers: ProtocolTier[] = [];
  const isSubscription = purchaseType === "subscription";

  if (formulaId && selectedPack) {
    const pricing = formulaPricing[purchaseType][selectedPack];
    price = pricing.price;
    // Get original price for comparison
    originalPrice = formulaPricing["one-time"][selectedPack].price;
    billingText = isSubscription
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
      // Get original price for comparison
      const oneTimePricing = protocolPricing[pricingType]["one-time"];
      if (selectedTier in oneTimePricing) {
        originalPrice =
          (oneTimePricing as Record<string, { price: number }>)[selectedTier]
            ?.price || 0;
      }
      billingText =
        isSubscription && "billing" in pricing
          ? getBillingLabel(pricing.billing)
          : "one-time";
    }
    const tierName =
      selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1);
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

  // Product name and thumbnail for left block (im8-style)
  let productName = "";
  let thumbnailSrc = "";
  if (formulaId) {
    productName = formulaContent[formulaId].name;
    thumbnailSrc =
      formulaId === "01"
        ? "/formulas/conkaFlow/FlowBox.jpg"
        : "/formulas/conkaClear/ClearBox.jpg";
  } else if (protocolId) {
    const protocol = protocolContent[protocolId];
    productName = protocol?.name ?? "";
    thumbnailSrc = protocol?.image ?? "";
  }

  // Selector display: variant + savings, and cost per shot / price (two rows, like mobile)
  let selectorVariantLabel = "";
  let selectorPriceLine = "";
  if (formulaId && selectedPack) {
    selectorVariantLabel = packLabels[selectedPack];
    const pricing = formulaPricing[purchaseType][selectedPack];
    selectorPriceLine = `${formatPrice(pricing.perShot)} / serving`;
  } else if (protocolId && selectedTier) {
    selectorVariantLabel = tierLabels[selectedTier];
    selectorPriceLine = formatPrice(price);
  }
  const accentColor = formulaId ? FORMULA_COLORS[formulaId] : null;
  const selectorAccentTextClass = accentColor ? accentColor.text : "";

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
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              {/* Left: Thumbnail + Product name + Variant (im8-style) - single bordered component */}
              <div className="flex items-center gap-3 w-fit border-2 border-black rounded-lg p-2 md:p-2.5 shrink-0">
                {thumbnailSrc && (
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-md overflow-hidden flex-shrink-0 bg-black/5">
                    <Image
                      src={thumbnailSrc}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className={usePremium ? "premium-data font-bold truncate" : "font-clinical font-bold text-sm md:text-base truncate"}>
                    {productName}
                  </p>
                  <p className={usePremium ? "premium-data text-xs opacity-70 truncate" : "font-clinical text-xs opacity-70 truncate"}>
                    {productLabel}
                  </p>
                </div>
              </div>

              {/* Right: Pack/Tier Selector + Subscribe Toggle + Add to Cart */}
              <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-end shrink-0">
                {(showPackSelector && selectedPack && onPackSelect) ||
                (showTierSelector && selectedTier && onTierSelect) ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowPackDropdown(!showPackDropdown)}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-current rounded-lg font-clinical text-sm hover:bg-current/5 transition-colors min-w-[200px] text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-bold whitespace-nowrap truncate">
                          {selectorVariantLabel}
                          {isSubscription ? " (Save 20%)" : ""}
                        </p>
                        <p
                          className={`text-xs mt-0.5 whitespace-nowrap truncate ${
                            isSubscription
                              ? selectorAccentTextClass
                              : "opacity-70"
                          }`}
                        >
                          {selectorPriceLine}
                        </p>
                      </div>
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
                        {showPackSelector &&
                          packSizes.map((pack) => {
                            const packPricing =
                              formulaPricing[purchaseType][pack];
                            const packBillingText =
                              purchaseType === "subscription"
                                ? getBillingLabel(
                                    (packPricing as { billing: string })
                                      .billing,
                                  )
                                : "one-time";
                            return (
                              <button
                                key={pack}
                                onClick={() => {
                                  onPackSelect?.(pack);
                                  setShowPackDropdown(false);
                                }}
                                className={`w-full px-4 py-2 text-left font-clinical text-sm hover:bg-current/10 transition-colors ${
                                  selectedPack === pack
                                    ? "bg-current/10 font-bold"
                                    : ""
                                }`}
                              >
                                <div className="flex justify-between items-center gap-4">
                                  <span className="whitespace-nowrap">
                                    {packLabels[pack]} {packBillingText}
                                  </span>
                                  <span className="opacity-70 whitespace-nowrap">
                                    {formatPrice(packPricing.price)}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        {showTierSelector &&
                          protocolId &&
                          availableTiers.map((tier) => {
                            const pricingType =
                              protocolId === "4" ? "ultimate" : "standard";
                            const tierPricing =
                              protocolPricing[pricingType][purchaseType];
                            const tierPricingData =
                              tierPricing[tier as keyof typeof tierPricing];
                            if (!tierPricingData) return null;
                            const tierBillingText =
                              purchaseType === "subscription" &&
                              "billing" in tierPricingData
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
                                  selectedTier === tier
                                    ? "bg-current/10 font-bold"
                                    : ""
                                }`}
                              >
                                <div className="flex justify-between items-center gap-4">
                                  <span className="whitespace-nowrap">
                                    {tierLabels[tier]} {tierBillingText}
                                  </span>
                                  <span className="opacity-70 whitespace-nowrap">
                                    {formatPrice(tierPricingData.price)}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Subscribe Toggle */}
                <button
                  onClick={() =>
                    onPurchaseTypeChange(
                      purchaseType === "subscription"
                        ? "one-time"
                        : "subscription",
                    )
                  }
                  className="flex items-center gap-2 px-3 py-2 border-2 border-current rounded-lg font-clinical text-xs hover:bg-current/5 transition-colors"
                >
                  <div
                    className={`w-8 h-4 rounded-full relative transition-colors ${
                      purchaseType === "subscription" && accentColor
                        ? accentColor.bg
                        : "bg-gray-300"
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

                {/* Add to Cart Button: pill, no border; formula = gradient + black text, protocol = black; price inside */}
                <button
                  onClick={onAddToCart}
                  className={
                    formulaId
                      ? "min-w-[10rem] px-6 py-2.5 font-bold text-sm whitespace-nowrap text-black rounded-full transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 inline-flex items-center justify-center gap-2"
                      : "min-w-[10rem] px-6 py-2.5 font-bold text-sm whitespace-nowrap text-white bg-black rounded-full border-0 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 inline-flex items-center justify-center gap-2"
                  }
                  style={
                    formulaId
                      ? {
                          background: `linear-gradient(to right, ${FORMULA_GRADIENTS[formulaId].start}, ${FORMULA_GRADIENTS[formulaId].end})`,
                        }
                      : undefined
                  }
                >
                  <span>Add to Cart</span>
                  <span className="opacity-90">·</span>
                  <span>{formatPrice(price)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
