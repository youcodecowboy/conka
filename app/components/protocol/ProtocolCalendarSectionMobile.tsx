"use client";

import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
  protocolPricing,
  formatPrice,
  getBillingLabel,
  generateProtocolCalendarDays,
  FORMULA_COLORS,
} from "@/app/lib/productData";

interface ProtocolCalendarSectionMobileProps {
  protocolId: ProtocolId;
  selectedTier: ProtocolTier;
  onTierSelect: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

const tierLabels: Record<ProtocolTier, string> = {
  starter: "Starter",
  pro: "Pro",
  max: "Max",
};

const dayNames = ["M", "T", "W", "T", "F", "S", "S"];

export default function ProtocolCalendarSectionMobile({
  protocolId,
  selectedTier,
  onTierSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: ProtocolCalendarSectionMobileProps) {
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
      : "one-time purchase";

  // Render single week (first week only)
  const weekDays = calendarDays.slice(0, 7);

  return (
    <section className="w-full bg-[var(--color-surface)] px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="premium-section-heading text-2xl font-bold mb-1">
          Your Protocol Schedule
        </h2>
        <p className="premium-annotation text-base opacity-70">
          your weekly schedule
        </p>
      </div>

      {/* Calendar Card */}
      <div className="premium-box overflow-hidden">
        {/* Tier & Purchase Selection */}
        <div className="p-4 border-b-2 border-current/10">
          <div className="flex items-center justify-between gap-2 mb-4">
            {/* Tier Selection */}
            <div className="flex gap-1">
              {(["starter", "pro", "max"] as ProtocolTier[]).map((tier) => {
                const isAvailable = availableTiers.includes(tier);
                const isSelected = selectedTier === tier;
                const tierConf = protocol.tiers[tier];
                return (
                  <button
                    key={tier}
                    onClick={() => isAvailable && onTierSelect(tier)}
                    disabled={!isAvailable}
                    className={`px-3 py-1.5 rounded-lg font-clinical text-xs transition-all flex flex-col items-center ${
                      isSelected
                        ? "bg-amber-500 text-white"
                        : isAvailable
                          ? "border-2 border-black/10 hover:border-black/30"
                          : "border-2 border-black/5 text-black/30 cursor-not-allowed"
                    }`}
                  >
                    <span className="font-semibold">{tierLabels[tier]}</span>
                    {tierConf && (
                      <span
                        className={`text-[10px] ${isSelected ? "opacity-80" : "opacity-50"}`}
                      >
                        {tierConf.shotsPerWeek}/week
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Purchase Toggle */}
            <div className="flex gap-1">
              <button
                onClick={() => onPurchaseTypeChange("subscription")}
                className={`px-2 py-1.5 rounded font-clinical text-xs transition-all ${
                  purchaseType === "subscription"
                    ? "bg-black text-white"
                    : "border border-black/10 hover:border-black/30"
                }`}
              >
                Subscribe
              </button>
              <button
                onClick={() => onPurchaseTypeChange("one-time")}
                className={`px-2 py-1.5 rounded font-clinical text-xs transition-all ${
                  purchaseType === "one-time"
                    ? "bg-black text-white"
                    : "border border-black/10 hover:border-black/30"
                }`}
              >
                One-time
              </button>
            </div>
          </div>

          {/* Quantity & Description */}
          {tierConfig && (
            <div>
              <p className="font-bold text-sm mb-1">
                {tierConfig.shotsPerWeek} shots per week
                <span className="font-normal opacity-60 ml-1">
                  ({tierConfig.conkaFlowCount}× Flow +{" "}
                  {tierConfig.conkaClarityCount}× Clear)
                </span>
              </p>
              <p className="premium-annotation text-sm opacity-70">
                {tierConfig.description}
              </p>
            </div>
          )}
        </div>

        {/* Calendar */}
        <div className="p-4">
          {/* Legend */}
          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-1">
              <div
                className={`w-3 h-3 rounded-sm ${FORMULA_COLORS["01"].bg}`}
              ></div>
              <span className="font-clinical text-xs">CONKA Flow</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`w-3 h-3 rounded-sm ${FORMULA_COLORS["02"].bg}`}
              ></div>
              <span className="font-clinical text-xs">CONKA Clear</span>
            </div>
            {protocolId === "4" && (
              <div className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{
                    background: `linear-gradient(135deg, #f59e0b 50%, #AAB9BC 50%)`,
                  }}
                ></div>
                <span className="font-clinical text-xs">Both Daily</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-gray-200"></div>
              <span className="font-clinical text-xs">Rest</span>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day, idx) => (
              <div
                key={idx}
                className="text-center font-clinical text-xs opacity-50"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Single Week */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day, dayIdx) => {
              if (day.formula === "both") {
                return (
                  <div
                    key={dayIdx}
                    className="aspect-square rounded overflow-hidden relative flex items-center justify-center text-xs font-clinical text-white"
                    style={{
                      background: `linear-gradient(135deg, #f59e0b 50%, #AAB9BC 50%)`,
                    }}
                  >
                    <span className="relative z-10 drop-shadow-sm">
                      {day.day}
                    </span>
                  </div>
                );
              }

              const bgColor =
                day.formula === "01"
                  ? FORMULA_COLORS["01"].bg
                  : day.formula === "02"
                    ? FORMULA_COLORS["02"].bg
                    : "bg-gray-100";
              const textColor =
                day.formula === "rest" ? "text-black/30" : "text-white";
              return (
                <div
                  key={dayIdx}
                  className={`aspect-square rounded flex items-center justify-center text-xs font-clinical ${bgColor} ${textColor}`}
                >
                  {day.day}
                </div>
              );
            })}
          </div>

          {/* Clarifying message */}
          <p className="premium-annotation text-sm text-center mt-4 opacity-70">
            Repeat this cycle weekly for the month
          </p>
        </div>

        {/* Pricing & Buy Section */}
        <div className="p-4 bg-amber-500/10 border-t-2 border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold">
                {pricing ? formatPrice(pricing.price) : "—"}
              </p>
              <p className="font-clinical text-xs opacity-60">{billingText}</p>
            </div>
            {tierConfig && (
              <div className="text-right">
                <p className="font-bold text-sm">
                  {tierConfig.shotsPerWeek} shots/week
                </p>
                <p className="font-clinical text-xs opacity-60">
                  {tierConfig.conkaFlowCount}x F01 +{" "}
                  {tierConfig.conkaClarityCount}x F02
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onAddToCart}
            className="w-full neo-button px-6 py-3 font-bold text-base flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
            Add to Cart
          </button>

          <p className="font-clinical text-xs text-center mt-2 opacity-50 flex items-center justify-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            100-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
