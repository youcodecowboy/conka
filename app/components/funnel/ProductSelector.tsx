"use client";

import {
  type FunnelProduct,
  type FunnelCadence,
  FUNNEL_PRODUCTS,
  getOfferPricing,
} from "@/app/lib/funnelData";
import { formatPrice } from "@/app/lib/productData";

interface ProductSelectorProps {
  product: FunnelProduct;
  cadence: FunnelCadence;
  onChange: (product: FunnelProduct) => void;
}

const PRODUCT_ORDER: FunnelProduct[] = ["both", "flow", "clear"];

export default function ProductSelector({
  product,
  cadence,
  onChange,
}: ProductSelectorProps) {
  return (
    <div>
      <div className="mb-4">
        <h2
          className="text-2xl lg:text-3xl font-semibold tracking-[var(--letter-spacing-premium-title)]"
          style={{ color: "var(--color-ink)" }}
        >
          Choose your product
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {PRODUCT_ORDER.map((productKey) => {
          const display = FUNNEL_PRODUCTS[productKey];
          const isActive = product === productKey;
          const pricing = getOfferPricing(productKey, cadence);
          const isBoth = productKey === "both";

          return (
            <button
              key={productKey}
              type="button"
              onClick={() => onChange(productKey)}
              className={`relative w-full text-left rounded-xl border-2 transition-all select-none ${
                isActive
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)]/[0.03]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Badge banner */}
              {display.badge && (
                <div
                  className={`rounded-t-[10px] text-center py-1.5 text-xs font-semibold uppercase tracking-wide ${
                    isActive
                      ? "bg-[var(--color-ink)] text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {display.badge}
                </div>
              )}

              <div className={`p-4 ${isBoth && !display.badge ? "pt-4" : ""}`}>
                {/* Header row: checkmark + name + price */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Radio / Checkmark */}
                    <div
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        isActive
                          ? "border-[var(--color-ink)] bg-[var(--color-ink)]"
                          : "border-gray-300"
                      }`}
                    >
                      {isActive && (
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M2.5 8.5L6.5 12L13.5 4"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    <div>
                      <p className="text-base font-semibold text-[var(--color-ink)]">
                        {display.label}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {display.description}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-base font-semibold text-[var(--color-ink)]">
                      {formatPrice(pricing.price)}
                    </p>
                    {pricing.compareAtPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        {formatPrice(pricing.compareAtPrice)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Shot count + per-shot */}
                <div className="mt-2 flex items-center gap-3 text-sm">
                  <span className={isActive ? "text-[var(--color-ink)]" : "text-gray-500"}>
                    {pricing.shotCount} shots
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className={isActive ? "text-[var(--color-ink)]" : "text-gray-500"}>
                    {formatPrice(pricing.perShot)}/shot
                  </span>
                </div>

                {/* Feature bullets */}
                <div className={`mt-3 space-y-1.5 ${isActive ? "text-[var(--color-ink)]" : "text-gray-400"}`}>
                  {display.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M3 8.5L6.5 12L13 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
