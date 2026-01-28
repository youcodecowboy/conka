"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
  protocolPricing,
  formatPrice,
  getBillingLabel,
} from "@/app/lib/productData";
import { protocolSelectorData } from "@/app/components/shop/protocolSelectorData";
import { getProtocolImage } from "@/app/components/navigation/protocolImageConfig";
import { getProtocolVariantId } from "@/app/lib/shopifyProductMapping";
import { useCart } from "@/app/context/CartContext";
import TierSelector from "@/app/components/protocol/TierSelector";
import PurchaseToggle from "@/app/components/product/PurchaseToggle";
import type { ProtocolPurchaseCardProps } from "./types";

export default function ProtocolPurchaseCard({
  protocolId,
}: ProtocolPurchaseCardProps) {
  const { addToCart, openCart } = useCart();
  const protocol = protocolContent[protocolId];
  const selectorData = protocolSelectorData[protocolId];
  const availableTiers = protocol.availableTiers;

  // Default to "pro" if available, otherwise first available tier
  const defaultTier: ProtocolTier =
    availableTiers.includes("pro") ? "pro" : availableTiers[0];

  const [selectedTier, setSelectedTier] =
    useState<ProtocolTier>(defaultTier);
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get pricing
  const pricingType = protocolId === "4" ? "ultimate" : "standard";
  const tierPricing = protocolPricing[pricingType][purchaseType];
  const pricing = tierPricing[selectedTier as keyof typeof tierPricing];

  // Calculate current price
  const currentPrice = pricing?.price || 0;
  const billingText =
    purchaseType === "subscription" && pricing && "billing" in pricing
      ? getBillingLabel(pricing.billing)
      : "one-time";

  // Get protocol image
  const protocolImage = getProtocolImage(protocolId) || protocol.image;

  // Handle add to cart
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const variantData = getProtocolVariantId(
        protocolId,
        selectedTier,
        purchaseType
      );

      if (variantData?.variantId) {
        await addToCart(
          variantData.variantId,
          1,
          variantData.sellingPlanId,
          {
            location: "professional_individual",
            source: "professional_portal",
          }
        );
        openCart();
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="neo-box p-6 md:p-8 flex flex-col h-full">
      {/* Protocol Image */}
      <div className="relative w-full aspect-[5/2.2] mb-4 md:mb-6 overflow-hidden rounded-lg">
        <Image
          src={protocolImage}
          alt={`${protocol.name} - ${selectorData.outcome}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Protocol Name & Outcome */}
      <div className="mb-4 md:mb-6">
        <p className="font-primary text-xs uppercase tracking-wide opacity-60 mb-1">
          {protocol.name}
        </p>
        <h3 className="text-lg md:text-xl font-bold leading-tight">
          {selectorData.outcome}
        </h3>
      </div>

      {/* Tier Selector */}
      <div className="mb-4 md:mb-6">
        <TierSelector
          selectedTier={selectedTier}
          onSelect={setSelectedTier}
          purchaseType={purchaseType}
          protocolId={protocolId}
          availableTiers={availableTiers}
          highlightColor="#f59e0b"
        />
      </div>

      {/* Purchase Type Toggle */}
      <div className="mb-4 md:mb-6">
        <PurchaseToggle
          purchaseType={purchaseType}
          onToggle={setPurchaseType}
          highlightColor="#f59e0b"
        />
      </div>

      {/* Price Display */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-xl md:text-2xl font-bold">
            {formatPrice(currentPrice)}
          </span>
          {purchaseType === "subscription" && (
            <span className="font-clinical text-sm opacity-70">
              / {billingText}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-3 mt-auto">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="neo-button px-6 py-3 font-semibold text-sm flex items-center justify-center gap-2 flex-1"
        >
          {isAddingToCart ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Adding...
            </>
          ) : (
            <>
              Add to Cart
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
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </>
          )}
        </button>
        <Link
          href={`/protocol/${protocolId}`}
          className="neo-button-outline px-6 py-3 font-semibold text-sm flex items-center justify-center gap-2 flex-1"
        >
          View Details
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
