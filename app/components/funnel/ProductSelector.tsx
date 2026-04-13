"use client";

import { useState } from "react";
import Image from "next/image";
import {
  type FunnelProduct,
  type FunnelCadence,
  FUNNEL_PRODUCTS,
  getOfferPricing,
  getBuySeparatelyPrice,
} from "@/app/lib/funnelData";
import { formatPrice } from "@/app/lib/productData";

interface ProductSelectorProps {
  product: FunnelProduct;
  cadence: FunnelCadence;
  onChange: (product: FunnelProduct) => void;
}

const PRODUCT_ORDER: FunnelProduct[] = ["flow", "both", "clear"];

/** Static per-product "what ships" label — decoupled from cadence */
function getWhatShipsLabel(product: FunnelProduct): string {
  return product === "both" ? "2 boxes · 28 shots each" : "1 box · 28 shots";
}

/** Cadence-aware frequency label for price display */
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

export default function ProductSelector({
  product,
  cadence,
  onChange,
}: ProductSelectorProps) {
  const [pulseKey, setPulseKey] = useState(0);

  const handleChange = (newProduct: FunnelProduct) => {
    setPulseKey((k) => k + 1);
    onChange(newProduct);
  };

  return (
    <div>
      <h2
        className="text-2xl lg:text-3xl font-semibold tracking-[var(--brand-h2-tracking)] mb-5"
        style={{ color: "var(--brand-black)" }}
      >
        Your CONKA plan
      </h2>

      <div className="flex flex-col gap-3">
        {PRODUCT_ORDER.map((productKey) => {
          const display = FUNNEL_PRODUCTS[productKey];
          const isActive = product === productKey;
          const pricing = getOfferPricing(productKey, cadence);
          const frequency = getPriceFrequency(cadence);
          const isBoth = productKey === "both";
          const separatePrice = isBoth ? getBuySeparatelyPrice(cadence) : null;
          const savings = separatePrice ? separatePrice - pricing.price : 0;

          return (
            <button
              key={isActive ? `active-${pulseKey}` : productKey}
              type="button"
              onClick={() => handleChange(productKey)}
              className={`relative w-full text-left rounded-[var(--brand-radius-card)] border-2 transition-all duration-200 select-none overflow-hidden ${
                isActive
                  ? "card-pulse border-brand-accent bg-white shadow-md lg:scale-[1.01]"
                  : "border-black/10 hover:border-black/20 bg-white shadow-sm"
              }`}
            >
              {/* Top accent bar for Both */}
              {isBoth && (
                <div
                  className="h-1 w-full"
                  style={{ background: "var(--brand-gradient-accent)" }}
                />
              )}

              {/* Badge banner */}
              {display.badge && (
                <div
                  className="text-center py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: "var(--brand-black)" }}
                >
                  {isBoth && savings > 0
                    ? `★ ${display.badge} · Save ${formatPrice(savings)}`
                    : `★ ${display.badge}`}
                </div>
              )}

              <div className="p-4">
                {/* Main card content — thumbnail + details */}
                <div className="flex gap-4">
                  {/* Product thumbnail */}
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: `${display.accent}10`,
                      outline: isActive ? `2px solid ${display.accent}` : undefined,
                      outlineOffset: isActive ? "2px" : undefined,
                    }}
                  >
                    <Image
                      src={display.thumbnail}
                      alt={display.label}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {/* Time badge */}
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider mb-1"
                          style={{ color: display.accent }}
                        >
                          {display.timeEmoji} {display.timeLabel}
                        </span>

                        <p className="text-base font-semibold text-[var(--brand-black)]">
                          {display.label}
                        </p>

                        <span
                          className={`inline-flex items-center gap-1 text-xs mt-1 px-2 py-0.5 rounded-full font-medium ${
                            isActive
                              ? "bg-[var(--brand-neutral)] text-[var(--brand-black)]"
                              : "bg-black/[0.04] text-black/50"
                          }`}
                        >
                          📦 {getWhatShipsLabel(productKey)}
                        </span>
                      </div>

                      {/* Per-shot price — primary anchor */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-base font-semibold text-[var(--brand-black)]">
                          <span className="brand-data">{formatPrice(pricing.perShot)}</span><span className="brand-data-label text-black/40">/shot</span>
                        </p>
                        {/* Total price underneath */}
                        <p className="text-xs text-black/50 mt-0.5">
                          <span className="brand-data-label">{formatPrice(pricing.price)}</span>{frequency}
                        </p>
                        {pricing.compareAtPrice && (
                          <p className="text-xs text-black/40 mt-0.5">
                            <span className="line-through">{formatPrice(pricing.compareAtPrice)}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded details for selected product */}
                {isActive && (
                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--brand-divider-subtle)" }}>
                    <p className="text-sm text-black/60 leading-relaxed mb-3">
                      {display.description}
                    </p>

                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full mb-3"
                      style={{ backgroundColor: `${display.accent}12`, color: display.accent }}
                    >
                      <span className="brand-data">{formatPrice(pricing.perShot)}</span>/shot · {isBoth ? "2" : "1"} shot{isBoth ? "s" : ""} per day
                    </span>

                    {/* Feature bullets */}
                    <div className="space-y-1.5">
                      {display.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-[var(--brand-black)]">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0" style={{ color: display.accent }}>
                            <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Selection indicator — bottom accent bar */}
              {isActive && (
                <div
                  className="h-1 w-full"
                  style={{ background: "var(--brand-gradient-accent)" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
