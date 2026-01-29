"use client";

import { useState } from "react";
import Image from "next/image";
import { formulas } from "@/app/components/shop/formulasShowcaseData";
import {
  formulaPricing,
  formatPrice,
  getBillingLabel,
  FORMULA_COLORS,
} from "@/app/lib/productData";
import type { TeamFormulaCardProps } from "./types";

export default function TeamFormulaCard({
  formulaId,
  selectedPurchaseType,
  quantity,
  onPurchaseTypeChange,
  onQuantityChange,
  onAddToCart,
}: TeamFormulaCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const formula = formulas.find((f) => f.id === formulaId);

  if (!formula) return null;

  const formulaImage = formula.image.src;
  const pricing = formulaPricing[selectedPurchaseType]["28"];
  const oneTimePricing = formulaPricing["one-time"]["28"];
  const pricePerBox = pricing.price;
  const totalPrice = pricePerBox * quantity;
  const billingText =
    selectedPurchaseType === "subscription" && "billing" in pricing
      ? getBillingLabel(pricing.billing)
      : "one-time";
  const saveAmount = oneTimePricing.price - pricing.price;
  const savePercentage = Math.round((saveAmount / oneTimePricing.price) * 100);

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

  return (
    <div className="flex flex-col h-full border-2 border-black/10 rounded-lg overflow-hidden">
      {/* Image Container - Shorter */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0" style={{ bottom: "-30%" }}>
          <Image
            src={formulaImage}
            alt={formula.image.alt}
            fill
            className="object-cover"
            style={{
              objectPosition: `${formula.image.focalX}% ${formula.image.focalY}%`,
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-4 px-6 flex-1 flex flex-col">
        {/* Product Name and Tagline */}
        <div className="flex items-start gap-3 mb-3 pb-3 border-b border-black/5">
          <div
            className={`w-10 h-10 ${formula.bgColor} text-white rounded-md flex items-center justify-center flex-shrink-0`}
          >
            <span className="font-clinical text-sm font-bold">
              {formula.id}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-primary opacity-100">
              {formula.subtitle}
            </h3>
            <p className="font-primary text-lg opacity-80 mt-1">
              {formula.name}
            </p>
            <p className="font-clinical text-sm opacity-70 mt-1">
              {formula.headline}
            </p>
          </div>
        </div>

        {/* Purchase Controls */}
        <div className="space-y-3 mb-4">
          {/* Purchase Type Toggle */}
          <div>
            <p className="font-clinical text-xs uppercase opacity-70 mb-2">
              Purchase Type
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onPurchaseTypeChange("subscription")}
                className={`px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2 ${
                  selectedPurchaseType === "subscription"
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                    : "bg-transparent border-[var(--foreground)]/30 text-[var(--foreground)] hover:border-[var(--foreground)]/50"
                }`}
              >
                <span className="font-clinical text-sm font-medium">Subscribe</span>
                <span
                  className="px-2 py-0.5 rounded-full text-white font-clinical text-xs"
                  style={{ backgroundColor: formula.accentColor }}
                >
                  SAVE {savePercentage}%
                </span>
              </button>
              <button
                onClick={() => onPurchaseTypeChange("one-time")}
                className={`px-4 py-2 rounded-full border-2 transition-all ${
                  selectedPurchaseType === "one-time"
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                    : "bg-transparent border-[var(--foreground)]/30 text-[var(--foreground)] hover:border-[var(--foreground)]/50"
                }`}
              >
                <span className="font-clinical text-sm font-medium">One-off</span>
              </button>
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <p className="font-clinical text-xs uppercase opacity-70 mb-2">
              Quantity
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="w-10 h-10 md:w-12 md:h-12 border-2 border-[var(--foreground)] rounded-lg flex items-center justify-center font-bold text-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--foreground)]/10 transition-colors"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <p className="text-2xl md:text-3xl font-bold">{quantity}</p>
                <p className="font-clinical text-xs opacity-70">
                  {quantity === 1 ? "box" : "boxes"}
                </p>
                <p className="font-clinical text-xs opacity-60 mt-0.5">
                  ({quantity * 28} shots)
                </p>
              </div>
              <button
                onClick={handleIncrement}
                className="w-10 h-10 md:w-12 md:h-12 border-2 border-[var(--foreground)] rounded-lg flex items-center justify-center font-bold text-lg hover:bg-[var(--foreground)]/10 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Display */}
          <div className="pt-4 border-t border-black/5">
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-clinical text-sm opacity-70">
                Per box ({billingText}):
              </span>
              <span className="text-xl font-bold">
                {formatPrice(pricePerBox)}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-clinical text-base font-semibold">
                Total:
              </span>
              <div className="flex flex-col items-end">
                {selectedPurchaseType === "subscription" && (
                  <span className="text-lg font-bold line-through opacity-50 mb-1">
                    {formatPrice(oneTimePricing.price * quantity)}
                  </span>
                )}
                <span className="text-2xl font-bold">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto pb-4">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="neo-button px-8 py-3 rounded-full font-bold text-base inline-flex items-center gap-2 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
