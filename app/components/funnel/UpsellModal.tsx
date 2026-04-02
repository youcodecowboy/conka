"use client";

import { useEffect } from "react";
import Image from "next/image";
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
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  if (!isOpen || !offer) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onDecline}
        role="button"
        aria-label="Close upgrade offer"
        tabIndex={-1}
      />

      {/* Bottom sheet (mobile) / Centered modal (desktop) */}
      <div className="fixed z-[70] bg-white shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto bottom-0 left-0 right-0 rounded-t-[var(--brand-radius-card)] lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:right-auto lg:w-full lg:max-w-md lg:rounded-[var(--brand-radius-card)]">
        <div className="p-6 pb-8">
          {/* Handle bar (mobile only) */}
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-black/10 lg:hidden" />

          {/* Product image */}
          {offer.image && (
            <div className="relative mb-5 mx-auto w-32 h-32 rounded-xl overflow-hidden">
              <Image
                src={offer.image.src}
                alt={offer.image.alt}
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
          )}

          {/* Headline */}
          <h3 className="text-lg font-semibold text-[var(--brand-black)] tracking-[var(--brand-h2-tracking)]">
            {offer.headline}
          </h3>

          {/* Body */}
          <p className="mt-2 text-sm text-black/60 leading-relaxed">
            {offer.body}
          </p>

          {/* Benefit bullets */}
          {offer.benefits && offer.benefits.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {offer.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-black/80">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-accent" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Price — crossed out original, actual price */}
          {offer.compareAtUpgrade && offer.priceDifference !== undefined && (
            <div className="mt-4 flex items-baseline gap-3">
              <span className="brand-data text-lg text-black/40 line-through">
                {formatPrice(offer.compareAtUpgrade)}
              </span>
              <span className="brand-data text-2xl font-bold text-[var(--brand-black)]">
                {offer.priceDifference > 0
                  ? formatPrice(offer.priceDifference)
                  : formatPrice(offer.compareAtUpgrade + offer.priceDifference)}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={onAccept}
              disabled={loading}
              className="w-full py-4 px-6 rounded-[var(--brand-radius-interactive)] text-white font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              style={{ background: "var(--brand-gradient-accent)" }}
            >
              {loading ? "Processing..." : offer.acceptLabel}
            </button>

            <button
              type="button"
              onClick={onDecline}
              disabled={loading}
              className="w-full py-3 px-6 text-black/40 font-medium text-sm transition-colors hover:text-black/60"
            >
              {offer.declineLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
