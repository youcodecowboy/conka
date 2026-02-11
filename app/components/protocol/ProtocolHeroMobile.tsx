"use client";

import { useState } from "react";
import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
  protocolPricing,
  formatPrice,
  getBillingLabel,
  FORMULA_COLORS,
  generateProtocolCalendarDays,
  getProtocolAccent,
} from "@/app/lib/productData";
import { getProtocolSlideshowImages } from "@/app/components/navigation/protocolImageConfig";
import ProductImageSlideshow from "@/app/components/product/ProductImageSlideshow";
import PaymentLogos from "../PaymentLogos";
import TierSelectorPremium from "./TierSelectorPremium";

interface ProtocolHeroMobileProps {
  protocolId: ProtocolId;
  selectedTier: ProtocolTier;
  onTierSelect: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

type TabType = "overview" | "schedule" | "benefits" | "faq";

const tabs: { id: TabType; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "schedule", label: "Schedule" },
  { id: "benefits", label: "Benefits" },
  { id: "faq", label: "FAQ" },
];

export default function ProtocolHeroMobile({
  protocolId,
  selectedTier,
  onTierSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: ProtocolHeroMobileProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const protocol = protocolContent[protocolId];
  const tierConfig = protocol.tiers[selectedTier];
  const availableTiers = protocol.availableTiers;
  const calendarDays = generateProtocolCalendarDays(protocolId, selectedTier);

  // Get pricing
  const pricingType = protocolId === "4" ? "ultimate" : "standard";
  const tierPricing = protocolPricing[pricingType][purchaseType];
  const pricing = tierPricing[selectedTier as keyof typeof tierPricing];

  const billingText =
    purchaseType === "subscription" && pricing && "billing" in pricing
      ? getBillingLabel(pricing.billing)
      : "one-time";

  // Header color based on purchase type - protocols use amber accent
  const headerBgClass =
    purchaseType === "subscription"
      ? "bg-[var(--foreground)] text-[var(--background)]"
      : "bg-amber-500 text-white";

  // Toggle button colors - always on dark/colored header
  const toggleActiveClass = "bg-white text-black border-white";
  const toggleInactiveClass =
    "bg-transparent border-white/50 text-white hover:bg-white/20";

  // Selection summary accent colors
  const summaryBgClass =
    purchaseType === "subscription"
      ? "bg-current/5"
      : "bg-amber-500/10 border-t-2 border-amber-500/30";

  // FAQ items for this protocol
  const faqItems = [
    {
      q: "How do I take the protocol?",
      a: "Take CONKA Flow in the morning for sustained energy and focus. Take CONKA Clear before demanding tasks or in the evening for mental clarity and calm.",
    },
    {
      q: "Can I switch tiers?",
      a: "Yes! You can upgrade or downgrade your tier at any time. Changes take effect on your next billing cycle.",
    },
    {
      q: "What if it doesn't work for me?",
      a: "We offer a 100-day money-back guarantee. If you're not satisfied, we'll refund your purchase, no questions asked.",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        // Ensure we have at least 4 tags for better visual balance
        const allTags = [...protocol.bestFor];
        if (allTags.length < 4) {
          const extraTags = [
            "Optimized Performance",
            "Clinical Grade",
            "Easy Routine",
            "Proven Results",
          ];
          while (allTags.length < 4) {
            allTags.push(extraTags[allTags.length - protocol.bestFor.length]);
          }
        }
        // Icons for benefits
        const benefitIcons = [
          <svg
            key="icon-0"
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
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>,
          <svg
            key="icon-1"
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
          </svg>,
          <svg
            key="icon-2"
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
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>,
          <svg
            key="icon-3"
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
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>,
        ];
        // Accent colors for tags - alternating teal and amber
        const tagColors = [
          "bg-amber-500/20 text-amber-600",
          "bg-[#AAB9BC]/20 text-[#AAB9BC]",
          "bg-amber-500/20 text-amber-600",
          "bg-[#AAB9BC]/20 text-[#AAB9BC]",
        ];
        return (
          <div className="space-y-4">
            <div>
              <p className="font-clinical text-xs uppercase opacity-50 mb-2">
                Key Benefits
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-full font-clinical text-xs flex items-center gap-1 ${tagColors[idx]}`}
                  >
                    {benefitIcons[idx]}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-clinical text-xs uppercase opacity-50 mb-2">
                About this Protocol
              </p>
              <p className="text-sm opacity-80">{protocol.description}</p>
            </div>
            {tierConfig && (
              <div className="p-3 bg-current/5 rounded-lg space-y-2">
                <p className="font-clinical text-xs uppercase opacity-50">
                  What&apos;s Included
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded ${FORMULA_COLORS["01"].bg} flex items-center justify-center`}
                    >
                      <span className="text-white font-clinical text-xs">
                        01
                      </span>
                    </div>
                    <span className="text-sm font-bold">
                      {tierConfig.conkaFlowCount}x
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded ${FORMULA_COLORS["02"].bg} flex items-center justify-center`}
                    >
                      <span className="text-white font-clinical text-xs">
                        02
                      </span>
                    </div>
                    <span className="text-sm font-bold">
                      {tierConfig.conkaClarityCount}x
                    </span>
                  </div>
                  <span className="text-sm opacity-70">per week</span>
                </div>
              </div>
            )}
          </div>
        );

      case "schedule":
        // Show 1 week by default, 4 weeks if expanded
        const daysToShow = showFullCalendar
          ? calendarDays
          : calendarDays.slice(0, 7);
        const weeksToShow = showFullCalendar ? 4 : 1;

        return (
          <div className="space-y-4">
            {/* Legend */}
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-1">
                <div
                  className={`w-3 h-3 rounded-sm ${FORMULA_COLORS["01"].bg}`}
                ></div>
                <span className="font-clinical text-xs">F01</span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className={`w-3 h-3 rounded-sm ${FORMULA_COLORS["02"].bg}`}
                ></div>
                <span className="font-clinical text-xs">F02</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm border border-current opacity-30"></div>
                <span className="font-clinical text-xs">Rest</span>
              </div>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                <div
                  key={idx}
                  className="text-center font-clinical text-xs opacity-50 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {daysToShow.map((day, idx) => (
                <div
                  key={idx}
                  className={`aspect-square flex items-center justify-center font-clinical text-xs rounded transition-all ${
                    day.formula === "01"
                      ? `${FORMULA_COLORS["01"].bg} text-white`
                      : day.formula === "02"
                        ? `${FORMULA_COLORS["02"].bg} text-white`
                        : "border border-current/20"
                  }`}
                >
                  {day.day}
                </div>
              ))}
            </div>

            {/* Expand/Collapse */}
            <button
              onClick={() => setShowFullCalendar(!showFullCalendar)}
              className="w-full py-2 border-2 border-current/10 rounded-lg font-clinical text-xs flex items-center justify-center gap-2"
            >
              {showFullCalendar ? "Show 1 Week" : "View Full Month"}
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
                className={`transition-transform ${showFullCalendar ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Tier Description */}
            {tierConfig && (
              <p className="text-sm opacity-70 text-center">
                {tierConfig.description}
              </p>
            )}
          </div>
        );

      case "benefits":
        return (
          <div className="space-y-3">
            {protocol.benefits?.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-current/5 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm">{benefit}</p>
                </div>
              </div>
            )) || (
              <p className="text-sm opacity-70">
                This protocol combines both formulas for maximum cognitive
                enhancement.
              </p>
            )}
          </div>
        );

      case "faq":
        return (
          <div className="space-y-2">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="border-b border-current/10 pb-2 last:border-0"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === idx ? null : idx)
                  }
                  className="w-full flex items-center justify-between py-2"
                >
                  <span className="font-bold text-sm text-left">{item.q}</span>
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
                    className={`transition-transform flex-shrink-0 ${expandedFaq === idx ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {expandedFaq === idx && (
                  <p className="text-sm opacity-70 pb-2">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="premium-section px-4 pt-6 pb-4">
      {/* Product Card */}
      <div className="premium-box overflow-hidden">
        {/* Header */}
        <div className={`p-4 relative z-10 transition-colors rounded-t-xl ${headerBgClass}`}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="premium-display text-xl font-bold">{protocol.name}</h1>
              <p className="premium-annotation text-base mt-0.5 opacity-90">
                {protocol.subtitle}
              </p>
            </div>
            {/* Purchase Toggle */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => onPurchaseTypeChange("subscription")}
                className={`px-3 py-1.5 rounded-full border-2 font-clinical text-xs transition-all whitespace-nowrap ${
                  purchaseType === "subscription"
                    ? toggleActiveClass
                    : toggleInactiveClass
                }`}
              >
                Subscribe
              </button>
              <button
                onClick={() => onPurchaseTypeChange("one-time")}
                className={`px-3 py-1.5 rounded-full border-2 font-clinical text-xs transition-all whitespace-nowrap ${
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

        {/* Product Image + thumbnails */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 bg-[#FAFAFA] flex-shrink-0">
          <ProductImageSlideshow
            images={getProtocolSlideshowImages(protocolId, protocol.image)}
            alt={`${protocol.name} - Both formulas`}
            fullBleedThumbnails
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
        <div className="border-t border-current/10" />

        {/* Tier Selector */}
        <div className="p-4">
          <TierSelectorPremium
            protocolId={protocolId}
            selectedTier={selectedTier}
            onSelect={onTierSelect}
            purchaseType={purchaseType}
            availableTiers={availableTiers}
            subscriptionAccentColor={getProtocolAccent(protocolId)}
            compact
          />
        </div>

        {/* Selection Summary */}
        {pricing && tierConfig && (
          <div
            className={`p-4 transition-colors ${
              purchaseType === "subscription"
                ? "bg-amber-500/10 border-t-2 border-amber-500/30"
                : "bg-current/5"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-clinical text-xs uppercase opacity-50">
                  Your Selection
                </p>
                <p className="font-bold text-sm">
                  {tierConfig.name} • {billingText}
                </p>
                {purchaseType === "subscription" && (
                  <span className="inline-flex items-center gap-1 mt-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
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
                {purchaseType === "subscription" &&
                  (() => {
                    const pricingTypeLocal =
                      protocolId === "4" ? "ultimate" : "standard";
                    const oneTimeObj =
                      protocolPricing[pricingTypeLocal]["one-time"];
                    const oneTimePrice =
                      selectedTier in oneTimeObj
                        ? (oneTimeObj as Record<string, { price: number }>)[
                            selectedTier
                          ]?.price || 0
                        : 0;
                    return (
                      <p className="font-clinical text-xs line-through opacity-50">
                        {formatPrice(oneTimePrice)}
                      </p>
                    );
                  })()}
                <p
                  className={`text-2xl font-bold ${purchaseType === "subscription" ? "text-amber-600" : ""}`}
                >
                  {formatPrice(pricing.price)}
                </p>
                <p className="font-clinical text-xs opacity-70">
                  {tierConfig.shotsPerWeek} shots/week
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
              {purchaseType === "subscription"
                ? "Subscribe Now"
                : "Add to Cart"}
            </button>
            {purchaseType === "subscription" && (
              <p className="text-center font-clinical text-xs opacity-70 mt-2">
                Cancel anytime • No minimum commitment
              </p>
            )}
            {/* Payment Logos */}
            <PaymentLogos size="sm" className="mt-3" />
          </div>
        )}
      </div>
    </section>
  );
}
