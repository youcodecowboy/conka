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

          return (
            <button
              key={productKey}
              type="button"
              onClick={() => onChange(productKey)}
              className={`relative w-full text-left rounded-xl border-2 transition-all select-none overflow-hidden ${
                isActive
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)]/[0.02]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Badge banner */}
              {display.badge && (
                <div
                  className={`text-center py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-[var(--color-ink)] text-white"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  ★ {display.badge}
                </div>
              )}

              <div className={isActive ? "p-4" : "px-4 py-3"}>
                {/* Header row: radio + name + price */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Radio circle */}
                    <div
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        isActive
                          ? "border-[var(--color-ink)] bg-[var(--color-ink)]"
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
                      {/* Collapsed: short description */}
                      {!isActive && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {pricing.shotCount} shots · {formatPrice(pricing.price)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-semibold ${isActive ? "text-base text-[var(--color-ink)]" : "text-sm text-gray-600"}`}>
                      {formatPrice(pricing.price)}
                    </p>
                    {pricing.compareAtPrice && isActive && (
                      <p className="text-xs text-gray-400 line-through">
                        {formatPrice(pricing.compareAtPrice)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Expanded: full details for selected product */}
                {isActive && (
                  <div className="mt-3 ml-8">
                    {/* What you get */}
                    <div className="bg-gray-50 rounded-lg px-3 py-2 mb-3">
                      <p className="text-sm font-medium text-[var(--color-ink)]">
                        {display.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {pricing.shotCount} shots · {formatPrice(pricing.perShot)}/shot
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
