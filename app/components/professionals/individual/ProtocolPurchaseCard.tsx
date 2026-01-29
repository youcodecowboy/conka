"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ProtocolId,
  PurchaseType,
  getProtocolPricing,
  formatPrice,
  getBillingLabel,
} from "@/app/lib/productData";
import { getProtocolImage } from "@/app/components/navigation/protocolImageConfig";
import { protocolContent } from "@/app/lib/productData";
import { professionalProtocolCopy } from "./protocolCopy";

interface ProtocolPurchaseCardProps {
  protocolId: ProtocolId;
  selectedPurchaseType: PurchaseType;
  quantity: number;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

export default function ProtocolPurchaseCard({
  protocolId,
  selectedPurchaseType,
  quantity,
  onPurchaseTypeChange,
  onQuantityChange,
  onAddToCart,
}: ProtocolPurchaseCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const copy = professionalProtocolCopy[protocolId];
  const protocolImage =
    getProtocolImage(protocolId) || protocolContent[protocolId]?.image || "";

  const pricing = getProtocolPricing(protocolId, "max", selectedPurchaseType);
  const oneTimePricing = getProtocolPricing(protocolId, "max", "one-time");
  const pricePerUnit = pricing?.price ?? 0;
  const totalPrice = pricePerUnit * quantity;
  const billingText =
    selectedPurchaseType === "subscription" && pricing && "billing" in pricing
      ? getBillingLabel(pricing.billing)
      : "one-time";

  const saveAmount =
    oneTimePricing?.price && pricing?.price
      ? oneTimePricing.price - pricing.price
      : 0;
  const savePercentage =
    oneTimePricing?.price && saveAmount > 0
      ? Math.round((saveAmount / oneTimePricing.price) * 100)
      : 0;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart();
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  if (!copy) return null;

  return (
    <div className="flex flex-col h-full border-2 border-black/10 rounded-lg overflow-hidden">
      {/* Image Container - shorter aspect */}
      <div className="relative aspect-[5/2] overflow-hidden">
        <div className="absolute inset-0" style={{ bottom: "-20%" }}>
          {protocolImage && (
            <Image
              src={protocolImage}
              alt={copy.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-2 px-4 md:px-5 flex-1 flex flex-col">
        {/* Protocol Name and Tagline */}
        <div className="flex items-start gap-2 mb-2 pb-2 border-b border-black/5">
          <div className="min-w-0">
            <h3 className="text-lg md:text-xl font-bold font-primary opacity-100">
              {copy.name}
            </h3>
          </div>
          <div>
            <p className="font-clinical text-xs opacity-70 mt-0.5">
              {copy.tagline}
            </p>
          </div>
        </div>

        {/* Purchase Controls */}
        <div className="space-y-2 mb-3">
          {/* Purchase Type Toggle */}
          <div>
            <p className="font-clinical text-[10px] uppercase opacity-70 mb-1">
              Purchase Type
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => onPurchaseTypeChange("subscription")}
                className={`px-3 py-1.5 rounded-full border-2 transition-all flex items-center gap-1.5 text-sm ${
                  selectedPurchaseType === "subscription"
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                    : "bg-transparent border-[var(--foreground)]/30 text-[var(--foreground)] hover:border-[var(--foreground)]/50"
                }`}
              >
                <span className="font-clinical text-sm font-medium">
                  Subscribe
                </span>
                {savePercentage > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-black/20 text-white font-clinical text-xs">
                    SAVE {savePercentage}%
                  </span>
                )}
              </button>
              <button
                onClick={() => onPurchaseTypeChange("one-time")}
                className={`px-3 py-1.5 rounded-full border-2 transition-all text-sm ${
                  selectedPurchaseType === "one-time"
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                    : "bg-transparent border-[var(--foreground)]/30 text-[var(--foreground)] hover:border-[var(--foreground)]/50"
                }`}
              >
                <span className="font-clinical text-sm font-medium">
                  One-off
                </span>
              </button>
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <p className="font-clinical text-[10px] uppercase opacity-70 mb-1">
              Quantity
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="w-8 h-8 md:w-9 md:h-9 border-2 border-[var(--foreground)] rounded-lg flex items-center justify-center font-bold text-base disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--foreground)]/10 transition-colors"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <p className="text-xl md:text-2xl font-bold">{quantity}</p>
                <p className="font-clinical text-[10px] opacity-70">
                  {quantity === 1 ? "box" : "boxes"} (28 shots)
                </p>
              </div>
              <button
                onClick={handleIncrement}
                className="w-8 h-8 md:w-9 md:h-9 border-2 border-[var(--foreground)] rounded-lg flex items-center justify-center font-bold text-base hover:bg-[var(--foreground)]/10 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Display */}
          <div className="pt-2 border-t border-black/5">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="font-clinical text-xs opacity-70">
                Per box ({billingText}):
              </span>
              <span className="text-base font-bold">
                {formatPrice(pricePerUnit)}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-clinical text-sm font-semibold">
                Total:
              </span>
              <div className="flex flex-col items-end">
                {selectedPurchaseType === "subscription" &&
                  oneTimePricing?.price && (
                    <span className="text-sm font-bold line-through opacity-50 mb-0.5">
                      {formatPrice(oneTimePricing.price * quantity)}
                    </span>
                  )}
                <span className="text-lg font-bold">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto pb-3">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="neo-button px-6 py-2.5 rounded-full font-bold text-sm inline-flex items-center gap-2 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
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
                Add {quantity} {quantity === 1 ? "Box" : "Boxes"} to Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
        </div>
      </div>
    </div>
  );
}
