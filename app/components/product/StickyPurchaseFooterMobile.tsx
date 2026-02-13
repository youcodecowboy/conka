"use client";

import { useState, useEffect, useRef } from "react";
import {
  PackSize,
  PurchaseType,
  ProtocolTier,
  formulaPricing,
  protocolPricing,
  protocolContent,
  formatPrice,
  getBillingLabel,
  getProtocolTierPackLabel,
  FormulaId,
  ProtocolId,
  getProductGradient,
  getProductAccent,
  getGradientTextColor,
} from "@/app/lib/productData";

const packSizes: PackSize[] = ["4", "8", "12", "28"];
const packLabels: Record<PackSize, string> = {
  "4": "4-pack",
  "8": "8-pack",
  "12": "12-pack",
  "28": "28-pack",
};
interface StickyPurchaseFooterMobileProps {
  formulaId?: FormulaId;
  selectedPack?: PackSize;
  onPackSelect?: (pack: PackSize) => void;
  protocolId?: ProtocolId;
  selectedTier?: ProtocolTier;
  onTierSelect?: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  onAddToCart: () => void;
  usePremium?: boolean;
}

export default function StickyPurchaseFooterMobile({
  formulaId,
  selectedPack,
  onPackSelect,
  protocolId,
  selectedTier,
  onTierSelect,
  purchaseType,
  onAddToCart,
  usePremium = false,
}: StickyPurchaseFooterMobileProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSubscription = purchaseType === "subscription";

  let variantLabel = "";
  let priceLine = "";
  let price = 0;
  let showPackSelector = false;
  let showTierSelector = false;
  let availableTiers: ProtocolTier[] = [];

  if (formulaId && selectedPack) {
    variantLabel = packLabels[selectedPack];
    const pricing = formulaPricing[purchaseType][selectedPack];
    price = pricing.price;
    priceLine = `${formatPrice(pricing.perShot)} / serving`;
    showPackSelector = !!onPackSelect;
  } else if (protocolId && selectedTier) {
    variantLabel = getProtocolTierPackLabel(protocolId, selectedTier);
    const pricingType = protocolId === "4" ? "ultimate" : "standard";
    const tierPricing = protocolPricing[pricingType][purchaseType];
    if (selectedTier in tierPricing) {
      const pricing = tierPricing[selectedTier as keyof typeof tierPricing];
      price = pricing.price;
    }
    priceLine = formatPrice(price);
    const protocol = protocolContent[protocolId];
    availableTiers = protocol?.availableTiers ?? [];
    showTierSelector = !!onTierSelect;
  }

  const hasSelector =
    (showPackSelector && selectedPack) ||
    (showTierSelector && selectedTier && availableTiers.length > 0);

  // Get accent color for border and text
  const accentColor = formulaId
    ? formulaId === "01"
      ? "#f59e0b" // amber-500
      : "#94b9ff" // Clear blue
    : protocolId
      ? getProductAccent(protocolId)
      : "#14b8a6"; // fallback teal

  const productGradient = formulaId
    ? getProductGradient(formulaId)
    : protocolId
      ? getProductGradient(protocolId)
      : null;

  const productId = formulaId ?? protocolId;
  const gradientTextClass = productId
    ? getGradientTextColor(productId) === "white"
      ? "text-white"
      : "text-black"
    : "text-black";

  return (
    <>
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
          aria-hidden
        />
      )}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--background)] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
        style={{
          borderTopWidth: "var(--premium-border-width)",
          borderTopStyle: "solid",
          borderTopColor: isSubscription
            ? accentColor
            : "var(--premium-border-color)",
        }}
      >
        <div className="px-5 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0 flex flex-col">
              {hasSelector ? (
                <div className="relative w-full min-w-0" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full bg-[var(--background)] px-4 py-2 text-left flex items-center gap-2 hover:bg-black/5 transition-colors min-w-0"
                    style={{
                      borderWidth: "var(--premium-border-width)",
                      borderStyle: "solid",
                      borderColor: "var(--premium-border-color)",
                      borderRadius: "var(--premium-radius-nested)",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-clinical text-sm font-medium truncate">
                        {variantLabel}
                        {isSubscription ? " (Save 20%)" : ""}
                      </p>
                      <p
                        className="font-clinical text-xs mt-0.5"
                        style={{
                          color: isSubscription ? accentColor : undefined,
                          opacity: isSubscription ? undefined : 0.7,
                        }}
                      >
                        {priceLine}
                      </p>
                    </div>
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
                      className={`flex-shrink-0 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                    >
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div
                      className="absolute bottom-full left-0 mb-2 w-full min-w-[200px] bg-[var(--background)] overflow-hidden shadow-lg max-h-[60vh] overflow-y-auto"
                      style={{
                        borderWidth: "var(--premium-border-width)",
                        borderStyle: "solid",
                        borderColor: "var(--premium-border-color)",
                        borderRadius: "var(--premium-radius-nested)",
                      }}
                    >
                      {showPackSelector &&
                        packSizes.map((pack) => {
                          const packPricing =
                            formulaPricing[purchaseType][pack];
                          const billingText =
                            purchaseType === "subscription" &&
                            "billing" in packPricing
                              ? getBillingLabel(packPricing.billing)
                              : "One-time";
                          return (
                            <button
                              key={pack}
                              type="button"
                              onClick={() => {
                                onPackSelect?.(pack);
                                setShowDropdown(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-sm hover:bg-black/5 transition-colors flex justify-between items-center gap-3 ${
                                selectedPack === pack
                                  ? "bg-black/5 font-semibold"
                                  : ""
                              }`}
                            >
                              <span className="font-clinical">
                                {packLabels[pack]} {billingText}
                              </span>
                              <span className="font-clinical text-xs opacity-70 whitespace-nowrap">
                                {formatPrice(packPricing.price)}
                              </span>
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
                          const tierData =
                            tierPricing[tier as keyof typeof tierPricing];
                          if (!tierData) return null;
                          const billingText =
                            purchaseType === "subscription" &&
                            "billing" in tierData
                              ? getBillingLabel(tierData.billing)
                              : "One-time";
                          return (
                            <button
                              key={tier}
                              type="button"
                              onClick={() => {
                                onTierSelect?.(tier);
                                setShowDropdown(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-sm hover:bg-black/5 transition-colors flex justify-between items-center gap-3 ${
                                selectedTier === tier
                                  ? "bg-black/5 font-semibold"
                                  : ""
                              }`}
                            >
                              <span className="font-clinical">
                                {getProtocolTierPackLabel(protocolId!, tier)} {billingText}
                              </span>
                              <span className="font-clinical text-xs opacity-70 whitespace-nowrap">
                                {formatPrice(tierData.price)}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <p className="font-clinical text-sm font-medium truncate">
                    {variantLabel}
                    {isSubscription ? " (Save 20%)" : ""}
                  </p>
                  <p
                    className="font-clinical text-xs mt-0.5"
                    style={{
                      color: isSubscription ? accentColor : undefined,
                      opacity: isSubscription ? undefined : 0.7,
                    }}
                  >
                    {priceLine}
                  </p>
                </>
              )}
            </div>
            <button
              onClick={onAddToCart}
              className={
                formulaId || protocolId
                  ? `px-5 py-2.5 font-bold text-sm whitespace-nowrap shrink-0 border-0 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 inline-flex items-center justify-center gap-1.5 ${gradientTextClass}`
                  : "px-5 py-2.5 font-bold text-sm whitespace-nowrap shrink-0 text-white bg-black border-0 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 inline-flex items-center justify-center gap-1.5"
              }
              style={{
                borderRadius: "var(--premium-radius-interactive)",
                ...(productGradient
                  ? {
                      background: `linear-gradient(to right, ${productGradient.start}, ${productGradient.end})`,
                    }
                  : {}),
              }}
            >
              <span>Add</span>
              <span className="opacity-90">·</span>
              <span>{formatPrice(price)}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
