"use client";

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

const PRODUCT_ORDER: FunnelProduct[] = ["both", "flow", "clear"];

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
  return (
    <div>
      <h2
        className="text-2xl lg:text-3xl font-semibold tracking-[var(--letter-spacing-premium-title)] mb-2"
        style={{ color: "var(--color-ink)" }}
      >
        Choose your product
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        What would you like in your plan?
      </p>

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
              key={productKey}
              type="button"
              onClick={() => onChange(productKey)}
              className={`relative w-full text-left rounded-2xl border-2 transition-all select-none overflow-hidden ${
                isActive
                  ? "border-[#4058bb] bg-white shadow-md"
                  : "border-gray-200 hover:border-gray-300 bg-white"
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

                        <p className="text-base font-semibold text-[var(--color-ink)]">
                          {display.label}
                        </p>

                        <p
                          className={`text-xs mt-0.5 transition-colors ${
                            isActive ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          {isBoth
                            ? `2 boxes (${pricing.shotCount} shots)`
                            : `1 box (${pricing.shotCount} shots)`}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-base font-semibold text-[var(--color-ink)]">
                          {formatPrice(pricing.price)}
                          {frequency && <span className="text-xs font-normal text-gray-500">{frequency}</span>}
                        </p>
                        {isBoth && separatePrice && savings > 0 && (
                          <p className="text-xs text-gray-400 line-through">
                            {formatPrice(separatePrice)}
                          </p>
                        )}
                        {!isBoth && pricing.compareAtPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            {formatPrice(pricing.compareAtPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded details for selected product */}
                {isActive && (
                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--color-premium-stroke, #eee)" }}>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {display.description}
                    </p>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-sm font-semibold" style={{ color: display.accent }}>
                        {formatPrice(pricing.perShot)}/shot
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-sm text-gray-500">
                        {pricing.shotCount} shots
                      </span>
                    </div>

                    {/* Feature bullets */}
                    <div className="space-y-1.5">
                      {display.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
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
                  style={{ background: "var(--gradient-neuro-blue-accent)" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
