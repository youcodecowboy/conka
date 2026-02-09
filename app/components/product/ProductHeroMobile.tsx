"use client";

import {
  FormulaId,
  PackSize,
  PurchaseType,
  formulaContent,
  formulaPricing,
  formatPrice,
  getBillingLabel,
  FORMULA_COLORS,
} from "@/app/lib/productData";
import { testimonials } from "@/app/lib/testimonialsData";
import Testimonials from "../testimonials/Testimonials";
import ProductImageSlideshow from "./ProductImageSlideshow";
import PackSelector from "./PackSelector";
import PaymentLogos from "../PaymentLogos";

interface ProductHeroMobileProps {
  formulaId: FormulaId;
  selectedPack: PackSize;
  onPackSelect: (pack: PackSize) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

export default function ProductHeroMobile({
  formulaId,
  selectedPack,
  onPackSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: ProductHeroMobileProps) {
  const formula = formulaContent[formulaId];
  const pricing = formulaPricing[purchaseType][selectedPack];

  const billingText =
    purchaseType === "subscription"
      ? getBillingLabel((pricing as { billing: string }).billing)
      : "one-time";

  const flowSlideshowImages = [
    { src: "/formulas/conkaFlow/FlowBox.jpg" },
    { src: "/formulas/conkaFlow/FlowIngredients.jpg" },
    { src: "/formulas/conkaFlow/FlowStats.jpg" },
    { src: "/formulas/conkaFlow/FlowReplaces.jpg" },
    { src: "/formulas/conkaFlow/FlowEssentials.jpg" },
    { src: "/formulas/conkaFlow/FlowSteps.jpg" },
    { src: "/formulas/conkaFlow/FlowCertified.jpg" },
    { src: "/formulas/conkaFlow/FlowReviews.jpg" },
  ];

  const claritySlideshowImages = [
    { src: "/formulas/conkaClear/ClearBox.jpg" },
    { src: "/formulas/conkaClear/ClearIngredients.jpg" },
    { src: "/formulas/conkaClear/ClearStats.jpg" },
    { src: "/formulas/conkaClear/ClearReplaces.jpg" },
    { src: "/formulas/conkaClear/ClearEssentials.jpg" },
    { src: "/formulas/conkaClear/ClearSteps.jpg" },
    { src: "/formulas/conkaClear/ClearCertified.jpg" },
    { src: "/formulas/conkaClear/ClearReviews.jpg" },
  ];

  const oneTimeColor =
    formulaId === "01" ? "invert" : FORMULA_COLORS[formulaId].hex;

  return (
    <section className="pt-0 pb-4 px-0">
      <div className="w-full min-w-0 px-3">
        {/* Header - product name + subtitle (premium, no colored strip) */}
        <div className="pt-3 pb-2">
          <h1 className="premium-display">
            {formulaId === "01" ? (
              <>
                <span className="font-primary">CONKA</span>{" "}
                <span className="font-clinical">FL0W</span>
              </>
            ) : (
              formula.name
            )}
          </h1>
          <p className="premium-data mt-1 leading-tight opacity-90">
            Liquid · 1 shot (30ml) daily · {selectedPack}-pack
          </p>
        </div>

        {/* Product Image + thumbnails – full width */}
        <div className="relative w-full bg-[#FAFAFA] -mx-3">
          <ProductImageSlideshow
            images={
              formulaId === "01" ? flowSlideshowImages : claritySlideshowImages
            }
            alt={`${formula.name} bottle`}
          />
        </div>

        {/* Content */}
        <div className="pt-3 pb-4 space-y-3">
          <p className="premium-body opacity-90">{formula.headline}</p>

          <div className="flex flex-wrap gap-2">
            {formula.benefits.slice(0, 4).map((benefit, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-[80px] px-3 py-2.5 rounded-2xl bg-current/5 font-primary text-xs text-center flex flex-col items-center gap-0.5"
              >
                <span
                  className="font-clinical text-sm font-bold"
                  style={{
                    color: formulaId === "01" ? "#f59e0b" : "#94b9ff",
                  }}
                >
                  {benefit.stat}
                </span>
                <span className="leading-tight">{benefit.title}</span>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-current border-opacity-10" />

          <PackSelector
            selectedPack={selectedPack}
            onSelect={onPackSelect}
            purchaseType={purchaseType}
            highlightColor={oneTimeColor}
            subscriptionAccentColor={formulaId === "01" ? "#f59e0b" : "#94b9ff"}
          />

          <div className="space-y-2">
            <p className="premium-data uppercase opacity-70 mb-2">
              How would you like to purchase?
            </p>
            <button
              onClick={() => onPurchaseTypeChange("subscription")}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-start gap-3 cursor-pointer ${
                purchaseType === "subscription"
                  ? "border-current border-opacity-40 bg-current/5"
                  : "border-current border-opacity-20"
              }`}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                  purchaseType === "subscription"
                    ? "border-current"
                    : "border-current border-opacity-50"
                }`}
              >
                {purchaseType === "subscription" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-current" />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm">Subscribe</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-clinical text-white flex-shrink-0"
                    style={{
                      backgroundColor:
                        formulaId === "01" ? "#f59e0b" : "#94b9ff",
                    }}
                  >
                    20% off
                  </span>
                </div>
                {purchaseType === "subscription" && (
                  <ul className="mt-2 space-y-1 font-clinical text-[11px] opacity-80">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      100-day guarantee
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0"
                      >
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      Free UK shipping
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0"
                      >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                      Cancel anytime
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      No minimum commitment
                    </li>
                  </ul>
                )}
              </div>
            </button>
            <button
              onClick={() => onPurchaseTypeChange("one-time")}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3 cursor-pointer ${
                purchaseType === "one-time"
                  ? "border-current border-opacity-40 bg-current/5"
                  : "border-current border-opacity-20"
              }`}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  purchaseType === "one-time"
                    ? "border-current"
                    : "border-current border-opacity-50"
                }`}
              >
                {purchaseType === "one-time" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-current" />
                )}
              </span>
              <span className="font-bold text-sm">One-time</span>
            </button>
          </div>

          <div className="flex justify-between items-center p-4 rounded-lg border-2 border-current border-opacity-20 bg-current/5">
            <div>
              <p className="premium-data uppercase opacity-70">
                Your Selection
              </p>
              <p className="font-bold text-sm">
                {selectedPack}-pack • {billingText}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-1.5">
                {purchaseType === "subscription" && (
                  <span className="text-base font-clinical line-through opacity-50">
                    {formatPrice(
                      formulaPricing["one-time"][selectedPack].price,
                    )}
                  </span>
                )}
                <span
                  className="text-2xl font-bold"
                  style={
                    purchaseType === "subscription"
                      ? {
                          color: formulaId === "01" ? "#d97706" : "#94b9ff",
                        }
                      : undefined
                  }
                >
                  {formatPrice(pricing.price)}
                </span>
              </div>
              <p className="font-clinical text-xs opacity-70 mt-0.5">
                {formatPrice(pricing.perShot)}/shot
              </p>
              {purchaseType === "subscription" && (
                <span
                  className={`inline-flex items-center gap-1 mt-1 ${
                    formulaId === "01" ? "bg-amber-500" : "bg-[#94b9ff]"
                  } text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  SAVE 20%
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onAddToCart}
            className={
              formulaId === "01"
                ? "w-full neo-button py-4 font-bold text-base"
                : "w-full py-4 font-bold text-base text-white rounded-full border-0 transition-opacity hover:opacity-90 active:opacity-80"
            }
            style={
              formulaId !== "01"
                ? {
                    background:
                      "linear-gradient(90deg, #cdffd8 0%, #94b9ff 100%)",
                  }
                : undefined
            }
          >
            {purchaseType === "subscription" ? "Subscribe Now" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Social proof: auto-scrolling testimonials */}
      {testimonials.length > 0 && (
        <Testimonials
          testimonials={testimonials}
          maxReviews={8}
          autoScrollOnly
        />
      )}
    </section>
  );
}
