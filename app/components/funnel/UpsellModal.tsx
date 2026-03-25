"use client";

import { type UpsellOffer } from "@/app/lib/funnelData";
import { formatPrice } from "@/app/lib/productData";

interface UpsellModalProps {
  isOpen: boolean;
  offer: UpsellOffer | null;
  onAccept: () => void;
  onDecline: () => void;
  loading: boolean;
}

export default function UpsellModal({
  isOpen,
  offer,
  onAccept,
  onDecline,
  loading,
}: UpsellModalProps) {
  if (!isOpen || !offer) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onDecline}
      />

      {/* Bottom sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-2xl shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto">
        <div className="p-6 pb-8">
          {/* Handle bar */}
          <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-gray-200" />

          {/* Content */}
          <h3 className="text-xl font-semibold text-[var(--color-ink)] tracking-[var(--letter-spacing-premium-title)]">
            {offer.headline}
          </h3>

          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            {offer.body}
          </p>

          {offer.priceDifference !== undefined && offer.priceDifference > 0 && (
            <p className="mt-2 text-sm font-medium text-[var(--color-ink)]">
              For just {formatPrice(offer.priceDifference)} more
            </p>
          )}

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={onAccept}
              disabled={loading}
              className="w-full py-4 px-6 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              style={{ background: "var(--gradient-neuro-blue-accent)" }}
            >
              {loading ? "Processing..." : offer.acceptLabel}
            </button>

            <button
              type="button"
              onClick={onDecline}
              disabled={loading}
              className="w-full py-3 px-6 rounded-[var(--premium-radius-interactive)] text-gray-500 font-medium text-sm transition-colors hover:text-[var(--color-ink)] hover:bg-gray-50"
            >
              {offer.declineLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
