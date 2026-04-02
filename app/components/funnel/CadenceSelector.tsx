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

const CADENCE_ORDER: FunnelCadence[] = ["monthly-sub", "quarterly-sub", "monthly-otp"];

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

/** Cadence-aware frequency label */
function getPriceFrequency(cadence: FunnelCadence): string {
  switch (cadence) {
    case "monthly-sub":
      return "/mo";
    case "monthly-otp":
      return "";
    case "quarterly-sub":
      return "/quarter";
  }
}

/** Explicit "what ships" — uses actual product shot count */
function getWhatShips(cadence: FunnelCadence, product: FunnelProduct, shotCount: number): string {
  const isBoth = product === "both";
  switch (cadence) {
    case "monthly-sub":
      return isBoth
        ? `2 boxes (${shotCount} shots) delivered every month`
        : `1 box (${shotCount} shots) delivered every month`;
    case "monthly-otp":
      return isBoth
        ? `2 boxes (${shotCount} shots), one-time delivery`
        : `1 box (${shotCount} shots), one-time delivery`;
    case "quarterly-sub":
      return isBoth
        ? `6 boxes (${shotCount} shots total) delivered every 3 months`
        : `3 boxes (${shotCount} shots total) delivered every 3 months`;
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
        className="text-2xl lg:text-3xl font-semibold tracking-[var(--brand-h2-tracking)] mb-2"
        style={{ color: "var(--brand-black)" }}
      >
        Choose your plan
      </h2>
      <p className="text-sm text-black/50 mb-5">
        Select how often you&apos;d like CONKA delivered
      </p>

      <div className="flex flex-col gap-3">
        {CADENCE_ORDER.map((cadenceKey) => {
          const display = FUNNEL_CADENCES[cadenceKey];
          const isActive = cadence === cadenceKey;
          const pricing = getOfferPricing(product, cadenceKey);
          const frequency = getPriceFrequency(cadenceKey);

          return (
            <button
              key={cadenceKey}
              type="button"
              onClick={() => onChange(cadenceKey)}
              className={`relative w-full text-left rounded-xl border-2 transition-all duration-200 select-none overflow-hidden ${
                isActive
                  ? "border-brand-accent bg-brand-accent/[0.03] shadow-md"
                  : "border-black/10 hover:border-black/20 shadow-sm"
              }`}
            >
              {/* Badge banner */}
              {display.badge && (
                <div
                  className="text-center py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: "var(--brand-black)" }}
                >
                  {display.savingsLabel
                    ? `${display.badge} · ${display.savingsLabel}`
                    : display.badge}
                </div>
              )}

              <div className={isActive ? "p-4" : "px-4 py-3"}>
                {/* Header row: radio + name + per-shot price */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Radio circle */}
                    <div
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        isActive
                          ? "border-brand-accent bg-brand-accent scale-110"
                          : "border-black/30 scale-100"
                      }`}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`transition-all duration-200 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                      >
                        <path d="M2.5 8.5L6.5 12L13.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <div>
                      <p className={`font-semibold ${isActive ? "text-base text-[var(--brand-black)]" : "text-sm text-black/60"}`}>
                        {display.label}
                      </p>
                      {/* Collapsed: delivery + shots */}
                      {!isActive && (
                        <p className="text-xs text-black/40 mt-0.5">
                          {getDeliveryLabel(cadenceKey)} · {pricing.shotCount} shots
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Per-shot price — the primary anchor */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-semibold ${isActive ? "text-base text-[var(--brand-black)]" : "text-sm text-black/60"}`}>
                      <span className="brand-data">{formatPrice(pricing.perShot)}</span><span className="brand-data-label text-black/40">/shot</span>
                    </p>
                    {/* Collapsed: total price underneath */}
                    {!isActive && (
                      <p className="text-xs text-black/40 mt-0.5">
                        <span className="brand-data-label">{formatPrice(pricing.price)}</span>{frequency}
                      </p>
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {isActive && (
                  <div className="mt-3 ml-8 space-y-3">
                    {/* Per-shot cost — large, prominent */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="brand-data text-xl font-bold text-[var(--brand-black)]">
                        {formatPrice(pricing.perShot)}
                      </span>
                      <span className="brand-data-label text-black/50">per shot</span>
                    </div>

                    {/* Total price — secondary */}
                    <div className="flex items-baseline gap-2">
                      <span className="brand-data text-base font-semibold text-[var(--brand-black)]">
                        {formatPrice(pricing.price)}{frequency}
                      </span>
                      {pricing.compareAtPrice && (
                        <span className="brand-data-label text-black/40 line-through">
                          {formatPrice(pricing.compareAtPrice)}
                        </span>
                      )}
                    </div>

                    {/* What ships */}
                    <p className="text-sm text-black/60">
                      📦 {getWhatShips(cadenceKey, product, pricing.shotCount)}
                    </p>

                    {/* Feature bullets */}
                    <div className="space-y-1.5">
                      {display.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-black/60">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-brand-accent">
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
