"use client";

import {
  FormulaId,
  PackSize,
  PurchaseType,
  formulaContent,
  formulaPricing,
  formatPrice,
  getBillingLabel,
} from "@/app/lib/productData";
import { testimonials } from "@/app/lib/testimonialsData";
import Testimonials from "../testimonials/Testimonials";
import PackSelectorPremium from "./PackSelectorPremium";
import ProductImageSlideshow from "./ProductImageSlideshow";

interface ProductHeroProps {
  formulaId: FormulaId;
  selectedPack: PackSize;
  onPackSelect: (pack: PackSize) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

export default function ProductHero({
  formulaId,
  selectedPack,
  onPackSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: ProductHeroProps) {
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

  return (
    <section className="premium-section pt-4 md:pt-6 pb-8 md:pb-16">
      <div className="w-full lg:w-[90vw] lg:max-w-[90vw] lg:mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
          {/* Left: Product Image */}
          <div className="relative z-0 lg:w-[44%] lg:flex-shrink-0 lg:sticky lg:top-24 order-1 lg:order-1">
            <div className="relative w-full group">
              <ProductImageSlideshow
                  images={
                    formulaId === "01"
                      ? flowSlideshowImages
                      : claritySlideshowImages
                  }
                  alt={`${formula.name} bottle`}
                />
            </div>
          </div>

          {/* Right: Product Info Box */}
          <div className="flex flex-col gap-2.5 lg:gap-[1.875rem] flex-1 lg:w-[48%] lg:flex-shrink-0 min-w-0 order-2 lg:order-2 relative z-10">
            <div className="premium-box flex flex-col gap-1.5 lg:gap-3 !border-0 relative z-10 px-4 md:px-6 pt-3 md:pt-4 pb-4 md:pb-6">
              {/* Top section: stars above title + title + subline bubble */}
              <div className="mb-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <div className="flex" aria-hidden>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={formulaId === "01" ? "text-amber-500" : "text-[#94b9ff]"}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="premium-data text-current/90">
                    Over 100,000 shots sold
                  </span>
                </div>
                <h1 className="premium-display leading-tight font-primary text-current">
                  {formulaId === "01" ? (
                    <>
                      CONKA <span className="font-primary">FL0W</span>
                    </>
                  ) : (
                    formula.name
                  )}
                </h1>
                <div className="mt-2">
                  <span className="inline-block px-4 py-1 rounded-full bg-black/[0.04] premium-data text-current/90 text-sm">
                    Liquid · 1 shot (30ml) daily · {selectedPack}-pack
                  </span>
                </div>
              </div>

              {/* Headline description */}
              <p className="premium-body text-current/90 font-medium text-base md:text-lg leading-snug mb-1.5">
                {formula.headline}
              </p>

              {/* Benefit stats – flat, in grey section, full width, evenly spread */}
              <div className="bg-[#f4f6f5] rounded-xl px-4 py-3 pb-5 w-full">
                <div className="flex w-full justify-between gap-2">
                  {formula.benefits.slice(0, 4).map((benefit, idx) => (
                    <div
                      key={idx}
                      className="font-primary text-sm flex flex-1 min-w-0 flex-col items-center justify-center gap-0 text-center"
                    >
                      <span
                        className="font-clinical text-base font-bold"
                        style={{
                          color:
                            formulaId === "01" ? "#f59e0b" : "#94b9ff",
                        }}
                      >
                        {benefit.stat}
                      </span>
                      <span className="leading-tight text-current/90">{benefit.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Block 5: Pack Selector */}
              <div>
                <PackSelectorPremium
                  selectedPack={selectedPack}
                  onSelect={onPackSelect}
                  purchaseType={purchaseType}
                  subscriptionAccentColor={
                    formulaId === "01" ? "#f59e0b" : "#94b9ff"
                  }
                />
              </div>

              {/* Block 6: Purchase type + price */}
              <div className="flex flex-col gap-3">
                <div className="space-y-2">
                  <p className="premium-data uppercase opacity-70 mb-2">
                    How would you like to purchase?
                  </p>
                  <button
                    onClick={() => onPurchaseTypeChange("subscription")}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer bg-white shadow-[0_1px 4px_rgba(0,0,0,0.06)] border border-black/[0.06] hover:shadow-[0_2px 8px_rgba(0,0,0,0.08)] ${
                      purchaseType === "subscription"
                        ? "ring-2 ring-black/10 shadow-[0_2px 8px_rgba(0,0,0,0.08)]"
                        : ""
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                        purchaseType === "subscription"
                          ? "border-current bg-current/10"
                          : "border-black/30"
                      }`}
                    >
                      {purchaseType === "subscription" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-current" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold">Subscribe</span>
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
                        <ul className="mt-2 space-y-1.5 font-clinical text-xs opacity-80">
                          <li className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
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
                              width="14"
                              height="14"
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
                              width="14"
                              height="14"
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
                              width="14"
                              height="14"
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
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 cursor-pointer bg-white shadow-[0_1px 4px_rgba(0,0,0,0.06)] border border-black/[0.06] hover:shadow-[0_2px 8px_rgba(0,0,0,0.08)] ${
                      purchaseType === "one-time"
                        ? "ring-2 ring-black/10 shadow-[0_2px 8px_rgba(0,0,0,0.08)]"
                        : ""
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        purchaseType === "one-time"
                          ? "border-current bg-current/10"
                          : "border-black/30"
                      }`}
                    >
                      {purchaseType === "one-time" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-current" />
                      )}
                    </span>
                    <span className="font-bold">One-time</span>
                  </button>
                </div>
                <div className="flex justify-between items-center py-4 rounded-xl bg-white shadow-[0_1px 4px_rgba(0,0,0,0.06)] border border-black/[0.06] px-4">
                  <div>
                    <p className="premium-data uppercase opacity-70">
                      Your Selection
                    </p>
                    <p className="font-bold">
                      {selectedPack}-pack • {billingText}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-2">
                      {purchaseType === "subscription" && (
                        <span className="text-xl font-clinical line-through opacity-50">
                          {formatPrice(
                            formulaPricing["one-time"][selectedPack].price
                          )}
                        </span>
                      )}
                      <span
                        className="text-3xl font-bold"
                        style={
                          purchaseType === "subscription"
                            ? {
                                color:
                                  formulaId === "01" ? "#d97706" : "#94b9ff",
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
                          formulaId === "01"
                            ? "bg-amber-500"
                            : "bg-[#94b9ff]"
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
              </div>

              {/* Block 7: CTA */}
              <div className="pb-4 md:pb-6">
                <button
                  onClick={onAddToCart}
                  className="w-full px-8 py-4 font-bold text-lg text-white rounded-full border-0 transition-opacity hover:opacity-90 active:opacity-80 shadow-[0_2px 8px_rgba(0,0,0,0.12)]"
                  style={
                    formulaId === "01"
                      ? { background: "linear-gradient(90deg, #ffde59 0%, #ff914d 100%)" }
                      : { background: "linear-gradient(90deg, #cdffd8 0%, #94b9ff 100%)" }
                  }
                >
                  {purchaseType === "subscription"
                    ? "Subscribe Now"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
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
