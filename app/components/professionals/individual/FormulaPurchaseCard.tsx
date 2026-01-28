"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FormulaId,
  PackSize,
  PurchaseType,
  formulaPricing,
  formatPrice,
  getBillingLabel,
} from "@/app/lib/productData";
import { formulas } from "@/app/components/shop/formulasShowcaseData";
import { getFormulaImage } from "@/app/components/navigation/protocolImageConfig";
import { getFormulaVariantId } from "@/app/lib/shopifyProductMapping";
import { useCart } from "@/app/context/CartContext";
import PackSelector from "@/app/components/product/PackSelector";
import PurchaseToggle from "@/app/components/product/PurchaseToggle";
import type { FormulaPurchaseCardProps } from "./types";

export default function FormulaPurchaseCard({
  formulaId,
}: FormulaPurchaseCardProps) {
  const { addToCart, openCart } = useCart();
  const formula = formulas.find((f) => f.id === formulaId);

  if (!formula) return null;

  const [selectedPack, setSelectedPack] = useState<PackSize>("12");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get pricing
  const pricing = formulaPricing[purchaseType][selectedPack];
  const currentPrice = pricing?.price || 0;
  const billingText =
    purchaseType === "subscription" && pricing && "billing" in pricing
      ? getBillingLabel(pricing.billing)
      : "one-time";

  // Get formula image
  const formulaImage = getFormulaImage(formulaId) || formula.image.src;

  // Handle add to cart
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const variantData = getFormulaVariantId(
        formulaId,
        selectedPack,
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
      {/* Formula Image */}
      <div className="relative w-full aspect-[4/3] mb-4 md:mb-6 overflow-hidden rounded-lg">
        <Image
          src={formulaImage}
          alt={formula.image.alt}
          fill
          className="object-cover"
          style={{
            objectPosition: `${formula.image.focalX}% ${formula.image.focalY}%`,
          }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Formula Name & Headline */}
      <div className="mb-4 md:mb-6">
        <p className="font-primary text-xs uppercase tracking-wide opacity-60 mb-1">
          {formula.name}
        </p>
        <h3 className="text-lg md:text-xl font-bold leading-tight">
          {formula.headline}
        </h3>
      </div>

      {/* Pack Selector */}
      <div className="mb-4 md:mb-6">
        <PackSelector
          selectedPack={selectedPack}
          onSelect={setSelectedPack}
          purchaseType={purchaseType}
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
          href={formula.href}
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
