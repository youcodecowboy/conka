"use client";

import {
  type FunnelCadence,
  type FunnelProduct,
  getOfferPricing,
  getCTAText,
} from "@/app/lib/funnelData";

interface FunnelCTAProps {
  cadence: FunnelCadence;
  product: FunnelProduct;
  onCheckout: () => void;
  loading: boolean;
  error: string | null;
}

export default function FunnelCTA({
  cadence,
  product,
  onCheckout,
  loading,
  error,
}: FunnelCTAProps) {
  const pricing = getOfferPricing(product, cadence);
  const ctaText = getCTAText(cadence, pricing.price);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 p-4 lg:static lg:border-0 lg:p-0 lg:bg-transparent">
      <button
        type="button"
        onClick={onCheckout}
        disabled={loading}
        className="w-full py-4 px-6 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
        style={{ background: "var(--gradient-neuro-blue-accent)" }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          <>{ctaText} →</>
        )}
      </button>

      {error && (
        <p className="mt-2 text-center text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
