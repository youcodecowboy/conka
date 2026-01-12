"use client";

import { useState } from "react";
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
import ProductImageSlideshow from "./ProductImageSlideshow";
import PaymentLogos from "../PaymentLogos";

interface ProductHeroMobileProps {
  formulaId: FormulaId;
  selectedPack: PackSize;
  onPackSelect: (pack: PackSize) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

type TabType = "info" | "benefits" | "ingredients" | "taste";

const tabs: { id: TabType; label: string }[] = [
  { id: "info", label: "Info" },
  { id: "benefits", label: "Benefits" },
  { id: "ingredients", label: "Ingredients" },
  { id: "taste", label: "Taste" },
];

const packSizes: PackSize[] = ["4", "8", "12", "28"];
const packLabels: Record<PackSize, string> = {
  "4": "4-pack",
  "8": "8-pack",
  "12": "12-pack",
  "28": "28-pack",
};

export default function ProductHeroMobile({
  formulaId,
  selectedPack,
  onPackSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: ProductHeroMobileProps) {
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(null);

  const formula = formulaContent[formulaId];
  const pricing = formulaPricing[purchaseType][selectedPack];
  const accentColor = FORMULA_COLORS[formulaId];
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
    { src: "/CONKA_63.jpg", focalX: 50, focalY: 48 }, // Clarity bottle centered
    { src: "/CONKA_64.jpg", focalX: 50, focalY: 48 }, // Clarity bottle centered
    { src: "/CONKA_65.jpg", focalX: 50, focalY: 48 }, // Clarity bottle centered
    { src: "/CONKA_66.jpg", focalX: 50, focalY: 48 }, // Clarity bottle centered
    { src: "/CONKA_67.jpg", focalX: 50, focalY: 48 }, // Clarity bottle centered
    { src: "/CONKA_06.jpg", focalX: 52, focalY: 50 }, // Clarity vertical, white cap
    { src: "/CONKA_10.jpg", focalX: 45, focalY: 55 }, // Clarity horizontal
    { src: "/CONKA_20.jpg", focalX: 50, focalY: 55 }, // Clarity with lemons
  ];

  const billingText =
    purchaseType === "subscription"
      ? getBillingLabel((pricing as { billing: string }).billing)
      : "one-time";

  // Header color based on purchase type - matches desktop behavior
  const headerBgClass =
    purchaseType === "subscription"
      ? "bg-[var(--foreground)] text-[var(--background)]"
      : formulaId === "01"
        ? "bg-white text-black border-b-2 border-black"
        : "bg-amber-500 text-white";

  // Toggle button colors depend on header background
  const isLightHeader = purchaseType === "one-time" && formulaId === "01";
  const toggleActiveClass = isLightHeader
    ? "bg-black text-white border-black"
    : "bg-white text-black border-white";
  const toggleInactiveClass = isLightHeader
    ? "bg-transparent border-black/50 text-black hover:bg-black/10"
    : "bg-transparent border-white/50 text-white hover:bg-white/20";

  // Selection summary accent colors
  const summaryBgClass =
    purchaseType === "subscription"
      ? "bg-current/5"
      : formulaId === "01"
        ? "bg-black/5 border-t-2 border-black/20"
        : "bg-amber-500/10 border-t-2 border-amber-500/30";

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <div className="space-y-4">
            <h3 className="text-[15px] font-bold">{formula.headline}</h3>
            <p className="font-commentary text-base opacity-80">
              {formula.subheadline}
            </p>
            <div className="space-y-3">
              {formula.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`${accentColor.text} flex-shrink-0 mt-0.5`}>
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="font-primary text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "benefits":
        return (
          <div className="space-y-3">
            {formula.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="border-b border-current/10 pb-3 last:border-0"
              >
                <button
                  onClick={() =>
                    setExpandedBenefit(expandedBenefit === idx ? null : idx)
                  }
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`${accentColor.text} text-xl font-bold font-clinical`}
                    >
                      {benefit.stat}
                    </span>
                    <span className="font-bold text-sm">{benefit.title}</span>
                  </div>
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
                    className={`transition-transform ${expandedBenefit === idx ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {expandedBenefit === idx && (
                  <div className="mt-2 pl-12 space-y-1">
                    <p className="font-clinical text-xs opacity-70">
                      {benefit.annotation}
                    </p>
                    <p className="text-sm opacity-80">{benefit.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "ingredients":
        return (
          <div className="space-y-2">
            {formula.ingredients.map((ing, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-2 border-b border-current/10 last:border-0"
              >
                <div>
                  <span className="font-medium text-sm">{ing.name}</span>
                  {ing.part && (
                    <span className="font-clinical text-xs opacity-70 ml-1">
                      – {ing.part}
                    </span>
                  )}
                </div>
                <span className="font-clinical text-sm font-medium">
                  {ing.percentage}
                </span>
              </div>
            ))}
          </div>
        );

      case "taste":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-current/5 rounded-lg">
              <p className="font-clinical text-xs opacity-70">Tastes Like:</p>
              <p className="font-commentary text-xl">{formula.taste}</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: "shield", label: "Antioxidant" },
                { icon: "zero", label: "Zero Cal" },
                { icon: "coffee", label: "No Caffeine" },
                { icon: "leaf", label: "Vegan" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-8 h-8 mb-1 flex items-center justify-center opacity-70">
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
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <p className="font-clinical text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="px-4 pt-6 pb-4">
      {/* Product Card */}
      <div className="neo-box overflow-hidden">
        {/* Header */}
        <div className={`p-4 relative z-10 transition-colors ${headerBgClass}`}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold">
                {formulaId === "01" ? (
                  <>
                    <span className="font-primary">CONKA</span>{" "}
                    <span className="font-clinical">FL0W</span>
                  </>
                ) : (
                  formula.name
                )}
              </h1>
              <p className="font-commentary text-base mt-0.5 opacity-90">
                {formula.tagline}
              </p>
            </div>
            {/* Purchase Toggle */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPurchaseTypeChange("subscription")}
                className={`px-3 py-1.5 rounded-full border-2 font-clinical text-xs transition-all ${
                  purchaseType === "subscription"
                    ? toggleActiveClass
                    : toggleInactiveClass
                }`}
              >
                Subscribe
              </button>
              <button
                onClick={() => onPurchaseTypeChange("one-time")}
                className={`px-3 py-1.5 rounded-full border-2 font-clinical text-xs transition-all ${
                  purchaseType === "one-time"
                    ? toggleActiveClass
                    : toggleInactiveClass
                }`}
              >
                One-Time
              </button>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative w-full aspect-square bg-[#FAFAFA] overflow-hidden">
          <ProductImageSlideshow
            images={
              formulaId === "01" ? flowSlideshowImages : claritySlideshowImages
            }
            alt={`${formula.name} bottle`}
          />
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b-2 border-current/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 font-clinical text-xs text-center transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "hover:bg-current/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 min-h-[180px]">{renderTabContent()}</div>

        {/* Divider */}
        <div className="border-t-2 border-current/10" />

        {/* Pack Selector */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-clinical text-xs uppercase opacity-50">
              Select Pack Size
            </p>
            {/* Payment Logos - Show when pack is selected */}
            {selectedPack && <PaymentLogos size="sm" />}
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {packSizes.map((size) => {
              const packPricing = formulaPricing[purchaseType][size];
              const oneTimePricing = formulaPricing["one-time"][size];
              const isSelected = selectedPack === size;

              // Dynamic shadow color based on formula
              const shadowColor = formulaId === "01" ? "#f59e0b" : "#14b8a6";
              // Dynamic selected background for subscription
              const selectedSubBg =
                formulaId === "01" ? "bg-amber-500" : "bg-teal-500";

              return (
                <button
                  key={size}
                  onClick={() => onPackSelect(size)}
                  className={`overflow-hidden transition-all border-2 ${
                    isSelected
                      ? "border-black"
                      : "border-black/10 hover:border-black/30"
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? `3px 3px 0px 0px ${shadowColor}`
                      : "none",
                  }}
                >
                  {/* Pack Header */}
                  <div
                    className={`py-1 px-1 text-center ${
                      isSelected
                        ? purchaseType === "subscription"
                          ? "bg-black text-white"
                          : `${accentColor.bg} text-white`
                        : purchaseType === "subscription"
                          ? "bg-black text-white"
                          : `${accentColor.bg}/10`
                    }`}
                  >
                    <p className="font-bold text-xs">{packLabels[size]}</p>
                  </div>
                  {/* Price Body */}
                  <div
                    className={`py-1.5 px-1 text-center ${
                      isSelected
                        ? purchaseType === "subscription"
                          ? `${selectedSubBg} text-white`
                          : `${accentColor.bg} text-white`
                        : "bg-white"
                    }`}
                  >
                    {purchaseType === "subscription" && (
                      <p
                        className={`font-clinical text-[9px] line-through ${isSelected ? "opacity-70" : "opacity-50"}`}
                      >
                        {formatPrice(oneTimePricing.price)}
                      </p>
                    )}
                    <p
                      className={`font-bold text-sm ${
                        purchaseType === "subscription" && !isSelected
                          ? formulaId === "01"
                            ? "text-amber-600"
                            : "text-teal-600"
                          : ""
                      }`}
                    >
                      {formatPrice(packPricing.price)}
                    </p>
                    <p
                      className={`font-clinical text-[9px] ${isSelected ? "opacity-80" : "opacity-60"}`}
                    >
                      {purchaseType === "subscription" &&
                      "billing" in packPricing
                        ? getBillingLabel(packPricing.billing)
                        : "one-time"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selection Summary */}
        <div
          className={`p-4 transition-colors ${
            purchaseType === "subscription"
              ? formulaId === "01"
                ? "bg-amber-500/10 border-t-2 border-amber-500/30"
                : "bg-teal-500/10 border-t-2 border-teal-500/30"
              : summaryBgClass
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-clinical text-xs uppercase opacity-50">
                Your Selection
              </p>
              <p className="font-bold text-sm">
                {packLabels[selectedPack]} • {billingText}
              </p>
              {purchaseType === "subscription" && (
                <span
                  className={`inline-flex items-center gap-1 mt-1 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    formulaId === "01" ? "bg-amber-500" : "bg-teal-500"
                  }`}
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
                  Save 20%
                </span>
              )}
            </div>
            <div className="text-right">
              {purchaseType === "subscription" && (
                <p className="font-clinical text-xs line-through opacity-50">
                  {formatPrice(formulaPricing["one-time"][selectedPack].price)}
                </p>
              )}
              <p
                className={`text-2xl font-bold ${
                  purchaseType === "subscription"
                    ? formulaId === "01"
                      ? "text-amber-600"
                      : "text-teal-600"
                    : ""
                }`}
              >
                {formatPrice(pricing.price)}
              </p>
              <p className="font-clinical text-xs opacity-70">
                {formatPrice(pricing.perShot)}/shot
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-center gap-4 mb-4">
            <span className="font-clinical text-xs opacity-70 flex items-center gap-1">
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
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              100-day guarantee
            </span>
            <span className="font-clinical text-xs opacity-70 flex items-center gap-1">
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
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Free shipping
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={onAddToCart}
            className="w-full neo-button py-4 font-bold text-base"
          >
            {purchaseType === "subscription" ? "Subscribe Now" : "Add to Cart"}
          </button>
          {purchaseType === "subscription" && (
            <p className="text-center font-clinical text-xs opacity-70 mt-2">
              Cancel anytime • No minimum commitment
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
