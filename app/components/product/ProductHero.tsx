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
import PurchaseToggle from "./PurchaseToggle";
import PackSelector from "./PackSelector";
import ProductTabs from "./ProductTabs";
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
  const accentColor = FORMULA_COLORS[formulaId];

  const billingText =
    purchaseType === "subscription"
      ? getBillingLabel((pricing as { billing: string }).billing)
      : "one-time";

  // Get image path based on formula
  const imagePath = formulaId === "01" ? "/1.png" : "/2.png";
  
  // Slideshow images for Conka Flow (formula 01 - BLACK cap) with focal points
  const flowSlideshowImages = [
    { src: "/CONKA_01.jpg", focalX: 55, focalY: 48 }, // Front view, CONKA branding
    { src: "/CONKA_02.jpg", focalX: 55, focalY: 48 }, // Side view with badges
    { src: "/CONKA_03.jpg", focalX: 50, focalY: 48 }, // "1 BOTTLE DAILY" view
    { src: "/CONKA_04.jpg", focalX: 52, focalY: 48 }, // Back label view
    { src: "/CONKA_05.jpg", focalX: 50, focalY: 58 }, // Horizontal/angled view
  ];
  
  // Slideshow images for Conka Clarity (formula 02 - WHITE cap) with focal points
  const claritySlideshowImages = [
    { src: "/CONKA_06.jpg", focalX: 52, focalY: 50 }, // Clarity vertical, white cap
    { src: "/CONKA_10.jpg", focalX: 45, focalY: 55 }, // Clarity horizontal
    { src: "/CONKA_20.jpg", focalX: 50, focalY: 55 }, // Clarity with lemons
  ];

  // Header color based on purchase type - Conka Flow inverts, Conka Clarity uses teal
  const headerBgClass =
    purchaseType === "subscription"
      ? "bg-[var(--foreground)] text-[var(--background)]"
      : formulaId === "01"
      ? "bg-[var(--background)] text-[var(--foreground)] border-2 border-[var(--foreground)]"
      : "bg-[#AAB9BC] text-white";
  
  const oneTimeColor = formulaId === "01" ? "invert" : accentColor.hex;

  return (
    <section className="px-6 md:px-16 py-8 md:py-16">
      <div className="max-w-6xl mx-auto lg:ml-auto lg:mr-0 lg:max-w-[90%] xl:max-w-[85%]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Product Image */}
          <div className="lg:w-[55%] order-1 lg:order-1 relative z-0">
            <div className="sticky top-24">
              {/* Slideshow for both formulas - larger size, shifted left */}
              <div className="relative w-full aspect-square max-w-2xl lg:-ml-12 xl:-ml-16 group">
                <ProductImageSlideshow
                  images={formulaId === "01" ? flowSlideshowImages : claritySlideshowImages}
                  alt={`${formula.name} bottle`}
                />
              </div>
              {/* Annotation */}
              <p className="font-commentary text-lg text-center lg:text-left lg:-ml-12 xl:-ml-16 mt-4 opacity-70">
                {formula.annotation}
              </p>
            </div>
          </div>

          {/* Right: Product Info Box */}
          <div className="lg:w-1/2 order-2 lg:order-2 relative z-10">
            <div className="neo-box relative z-10">
              {/* Header with conditional color - Fixed height */}
              <div
                className={`p-4 md:p-6 flex justify-between items-center h-[100px] ${headerBgClass}`}
              >
                <div className="flex-shrink-0 flex flex-col justify-center">
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                    {formulaId === "01" ? (
                      <>
                        <span className="font-primary">CONKA</span>{" "}
                        <span className="font-clinical">FL0W</span>
                      </>
                    ) : (
                      formula.name
                    )}
                  </h1>
                  <p className="font-commentary text-lg mt-1 leading-tight">{formula.tagline}</p>
                </div>
                {/* Purchase Toggle - Right aligned in header */}
                <div className="flex-shrink-0 flex items-center">
                  <PurchaseToggle
                    purchaseType={purchaseType}
                    onToggle={onPurchaseTypeChange}
                    highlightColor={oneTimeColor}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 space-y-6">
                {/* Product Tabs Navigation */}
                <ProductTabs formulaId={formulaId} />

                {/* Divider */}
                <div className="border-t-2 border-current border-opacity-10" />

                {/* Pack Selector */}
                <PackSelector
                  selectedPack={selectedPack}
                  onSelect={onPackSelect}
                  purchaseType={purchaseType}
                  highlightColor={oneTimeColor}
                  subscriptionAccentColor={formulaId === "01" ? "#f59e0b" : "#AAB9BC"}
                />

                {/* Price Display */}
                <div
                  className={`flex justify-between items-center p-4 rounded-lg border-2 ${
                    purchaseType === "one-time"
                      ? formulaId === "01"
                        ? "bg-[var(--background)] border-[var(--foreground)]"
                        : "border-[#AAB9BC]"
                      : formulaId === "01"
                        ? "bg-amber-500/10 border-amber-500"
                        : "bg-[#AAB9BC]/10 border-[#AAB9BC]"
                  }`}
                  style={
                    purchaseType === "one-time" && formulaId !== "01"
                      ? {
                          backgroundColor: "rgba(170, 185, 188, 0.1)",
                        }
                      : undefined
                  }
                >
                  <div>
                    <p className="font-clinical text-xs uppercase opacity-70">
                      Your Selection
                    </p>
                    <p className="font-bold">
                      {selectedPack}-pack • {billingText}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{formatPrice(pricing.price)}</p>
                    <p className="font-clinical text-xs opacity-70">
                      {formatPrice(pricing.perShot)}/shot
                    </p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex justify-center gap-6">
                  <span className="font-clinical text-xs opacity-70 flex items-center gap-1">
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
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    100-day guarantee
                  </span>
                  <span className="font-clinical text-xs opacity-70 flex items-center gap-1">
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
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    Free UK shipping
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={onAddToCart}
                    className="w-full neo-button px-8 py-4 font-bold text-lg"
                  >
                    {purchaseType === "subscription" ? "Subscribe Now" : "Add to Cart"}
                  </button>
                  {purchaseType === "subscription" && (
                    <p className="text-center font-clinical text-xs opacity-70">
                      Cancel anytime • No minimum commitment
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

