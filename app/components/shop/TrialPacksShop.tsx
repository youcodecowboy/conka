"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { getFormulaVariantId } from "@/app/lib/shopifyProductMapping";
import {
  formulaPricing,
  formulaContent,
  FORMULA_COLORS,
  FormulaId,
  PackSize as ProductPackSize,
  PurchaseType as ProductPurchaseType,
} from "@/app/lib/productData";

type FormulaType = FormulaId;
type PackSize = "4" | "8" | "12";
type PurchaseType = ProductPurchaseType;

// Build pricing from actual data
const getPackPricing = (size: PackSize) => {
  const oneTimeData = formulaPricing["one-time"][size];
  const subData = formulaPricing.subscription[size];
  return {
    oneTime: `£${oneTimeData.price.toFixed(2)}`,
    subscription: `£${subData.price.toFixed(2)}`,
    perShotOneTime: `£${oneTimeData.perShot.toFixed(2)}/shot`,
    perShotSub: `£${subData.perShot.toFixed(2)}/shot`,
    billing: subData.billing,
  };
};

// Build formula info from actual data
const formulaInfo = {
  "01": {
    name: formulaContent["01"].name,
    subtitle: formulaContent["01"].tagline,
    accentColor: FORMULA_COLORS["01"].hex,
    bgColor: FORMULA_COLORS["01"].bg,
  },
  "02": {
    name: formulaContent["02"].name,
    subtitle: formulaContent["02"].tagline,
    accentColor: FORMULA_COLORS["02"].hex,
    bgColor: FORMULA_COLORS["02"].bg,
  },
};

export default function TrialPacksShop() {
  const [selectedFormula, setSelectedFormula] = useState<FormulaType>("01");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscription");
  const [isAdding, setIsAdding] = useState<PackSize | null>(null);
  const cart = useCart();

  const formula = formulaInfo[selectedFormula];

  const handleAddToCart = async (packSize: PackSize) => {
    setIsAdding(packSize);

    try {
      let variantId: string | null = null;
      let sellingPlanId: string | undefined = undefined;

      if (purchaseType === "subscription") {
        const variantData = getFormulaVariantId(
          selectedFormula,
          packSize,
          "subscription"
        );
        if (variantData) {
          variantId = variantData.variantId;
          sellingPlanId = variantData.sellingPlanId;
        }
      } else {
        const variantData = getFormulaVariantId(
          selectedFormula,
          packSize,
          "one-time"
        );
        if (variantData) {
          variantId = variantData.variantId;
        }
      }

      if (variantId) {
        await cart.addItem(variantId, 1, sellingPlanId);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(null);
    }
  };

  return (
    <div className="px-6 md:px-16 py-12 md:py-24 border-t-2 border-current border-opacity-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header - Left aligned on mobile */}
        <div className="mb-6 md:mb-8 text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Try Before You Commit
          </h2>
          <p className="font-commentary text-lg md:text-xl">
            start with a trial pack
          </p>
        </div>

        {/* Formula Toggle */}
        <div className="flex gap-2 md:gap-3 mb-4 md:mb-6 justify-start overflow-x-auto">
          <button
            onClick={() => setSelectedFormula("01")}
            className={`px-4 md:px-6 py-2 rounded-lg lg:rounded-full border-2 border-current transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedFormula === "01"
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "bg-transparent hover:bg-current/10"
            }`}
          >
            <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
            <span className="font-clinical text-xs md:text-sm font-medium">
              CONKA Flow
            </span>
          </button>
          <button
            onClick={() => setSelectedFormula("02")}
            className={`px-4 md:px-6 py-2 rounded-lg lg:rounded-full border-2 border-current transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedFormula === "02"
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "bg-transparent hover:bg-current/10"
            }`}
          >
            <div className="w-3 h-3 bg-[#AAB9BC] rounded-sm"></div>
            <span className="font-clinical text-xs md:text-sm font-medium">
              CONKA Clarity
            </span>
          </button>
        </div>

        {/* Purchase Type Toggle */}
        <div className="flex gap-2 md:gap-3 mb-6 md:mb-8 justify-start">
          <button
            onClick={() => setPurchaseType("subscription")}
            className={`px-3 md:px-5 py-2 rounded-lg lg:rounded-full border-2 transition-all flex items-center gap-1.5 md:gap-2 ${
              purchaseType === "subscription"
                ? "bg-[var(--foreground)] text-[var(--background)] border-current"
                : "border-current/30 hover:border-current/60"
            }`}
          >
            <span className="font-clinical text-xs md:text-sm">Subscribe</span>
            <span
              className="px-1.5 py-0.5 text-[9px] md:text-[10px] font-clinical rounded-full text-white"
              style={{
                backgroundColor:
                  purchaseType === "subscription"
                    ? formula.accentColor
                    : "black",
              }}
            >
              SAVE 20%
            </span>
          </button>
          <button
            onClick={() => setPurchaseType("one-time")}
            className={`px-3 md:px-5 py-2 rounded-lg lg:rounded-full border-2 font-clinical text-xs md:text-sm transition-all ${
              purchaseType === "one-time"
                ? "bg-[var(--foreground)] text-[var(--background)] border-current"
                : "border-current/30 hover:border-current/60"
            }`}
          >
            One-Time
          </button>
        </div>

        {/* Selected Formula Info */}
        <div className="mb-6 md:mb-8 flex items-center gap-3">
          <div
            className={`w-8 h-8 ${formula.bgColor} text-white rounded-md flex items-center justify-center`}
          >
            <span className="font-clinical text-xs font-bold">
              {selectedFormula}
            </span>
          </div>
          <div>
            <p className="font-bold text-sm md:text-base">{formula.name}</p>
            <p className="font-commentary text-xs md:text-sm opacity-70">
              {formula.subtitle}
            </p>
          </div>
        </div>

        {/* Pack Size Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-6">
          {(["4", "8", "12"] as PackSize[]).map((size) => {
            const pricing = getPackPricing(size);
            const price =
              purchaseType === "subscription"
                ? pricing.subscription
                : pricing.oneTime;
            const perShot =
              purchaseType === "subscription"
                ? pricing.perShotSub
                : pricing.perShotOneTime;

            return (
              <div
                key={size}
                className="neo-box p-3 md:p-6 hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all text-center"
              >
                {/* Pack Size Label */}
                <p className="font-clinical text-[10px] md:text-xs uppercase opacity-50 mb-1 md:mb-2">
                  {size}-Pack
                </p>

                {/* Price */}
                <p className="text-lg md:text-3xl font-bold mb-0.5 md:mb-1">
                  {price}
                </p>

                {/* Per Shot */}
                <p className="font-clinical text-[10px] md:text-xs opacity-70 mb-2 md:mb-4">
                  {perShot}
                </p>

                {/* Subscription billing note */}
                {purchaseType === "subscription" && (
                  <p className="font-clinical text-[9px] md:text-[10px] opacity-50 mb-2 md:mb-4">
                    {pricing.billing}
                  </p>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(size)}
                  disabled={isAdding !== null}
                  className="neo-button w-full py-1.5 md:py-3 rounded-lg lg:rounded-full font-semibold text-xs md:text-sm flex items-center justify-center gap-1 md:gap-2 disabled:opacity-50"
                >
                  {isAdding === size ? (
                    <span>Adding...</span>
                  ) : (
                    <>
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
                        className="hidden md:block"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span className="hidden md:inline">Add to Cart</span>
                      <span className="md:hidden">Add</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Money back guarantee */}
        <div className="mt-6 md:mt-8 text-center">
          <p className="font-clinical text-[10px] md:text-xs opacity-50">
            100-day money-back guarantee • Free shipping on orders over £30
          </p>
        </div>
      </div>
    </div>
  );
}
