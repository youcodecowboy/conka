"use client";

import {
  type FunnelCadence,
  type FunnelProduct,
  FUNNEL_CADENCES,
  getOfferPricing,
} from "@/app/lib/funnelData";
import { formatPrice } from "@/app/lib/productData";

interface CadenceSelectorProps {
  cadence: FunnelCadence;
  product: FunnelProduct;
  onChange: (cadence: FunnelCadence) => void;
}

const CADENCE_ORDER: FunnelCadence[] = ["monthly-sub", "monthly-otp", "quarterly-sub"];

/** Short delivery label for collapsed cards */
function getDeliveryLabel(cadence: FunnelCadence): string {
  switch (cadence) {
    case "monthly-sub":
      return "Delivered monthly";
    case "monthly-otp":
      return "One-time delivery";
    case "quarterly-sub":
      return "Delivered quarterly";
  }
}

/** Explicit "what ships" for the expanded card — e.g. "2 boxes (56 shots) delivered monthly" */
function getWhatShips(cadence: FunnelCadence, product: FunnelProduct, shotCount: number): string {
  const boxes = product === "both" ? "2 boxes" : "1 box";
  switch (cadence) {
    case "monthly-sub":
      return `${boxes} (${shotCount} shots) delivered every month`;
    case "monthly-otp":
      return `${boxes} (${shotCount} shots), one-time delivery`;
    case "quarterly-sub":
      return product === "both"
        ? `6 boxes (${shotCount} shots) delivered every 3 months`
        : `3 boxes (${shotCount} shots) delivered every 3 months`;
  }
}

export default function CadenceSelector({
  cadence,
  product,
  onChange,
}: CadenceSelectorProps) {
  return (
    <div>
      <h2
        className="text-2xl lg:text-3xl font-semibold tracking-[var(--letter-spacing-premium-title)] mb-2"
        style={{ color: "var(--color-ink)" }}
      >
        Choose your plan
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Select how often you&apos;d like CONKA delivered
      </p>

      <div className="flex flex-col gap-3">
        {CADENCE_ORDER.map((cadenceKey) => {
          const display = FUNNEL_CADENCES[cadenceKey];
          const isActive = cadence === cadenceKey;
          const pricing = getOfferPricing(product, cadenceKey);

          return (
            <button
              key={cadenceKey}
              type="button"
              onClick={() => onChange(cadenceKey)}
              className={`relative w-full text-left rounded-xl border-2 transition-all select-none overflow-hidden ${
                isActive
                  ? "border-[#4058bb] bg-[#4058bb]/[0.03]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Badge banner */}
              {display.badge && (
                <div
                  className={`text-center py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-white"
                      : "bg-gray-50 text-gray-400"
                  }`}
                  style={isActive ? { background: "var(--gradient-neuro-blue-accent)" } : undefined}
                >
                  {display.savingsLabel
                    ? `⚡ ${display.badge} · ${display.savingsLabel} ⚡`
                    : display.badge}
                </div>
              )}

              <div className={isActive ? "p-4" : "px-4 py-3"}>
                {/* Header row: radio + name + per-shot price */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Radio circle */}
                    <div
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        isActive
                          ? "border-[#4058bb] bg-[#4058bb]"
                          : "border-gray-300"
                      }`}
                    >
                      {isActive && (
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                          <path d="M2.5 8.5L6.5 12L13.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>

                    <div>
                      <p className={`font-semibold ${isActive ? "text-base text-[var(--color-ink)]" : "text-sm text-gray-600"}`}>
                        {display.label}
                      </p>
                      {/* Collapsed: delivery + shots */}
                      {!isActive && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {getDeliveryLabel(cadenceKey)} · {pricing.shotCount} shots
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Per-day price — the anchor number */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-semibold ${isActive ? "text-base text-[var(--color-ink)]" : "text-sm text-gray-600"}`}>
                      {formatPrice(pricing.perDay)}<span className="text-xs font-normal text-gray-500">/day</span>
                    </p>
                  </div>
                </div>

                {/* Expanded: full details for selected card */}
                {isActive && (
                  <div className="mt-3 ml-8">
                    {/* What ships */}
                    <div className="bg-gray-50 rounded-lg px-3 py-2.5 mb-3">
                      <p className="text-sm font-medium text-[var(--color-ink)]">
                        📦 {getWhatShips(cadenceKey, product, pricing.shotCount)}
                      </p>
                    </div>

                    {/* Feature bullets */}
                    <div className="space-y-1.5 text-[var(--color-ink)]">
                      {display.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-green-600">
                            <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
