"use client";

import { useEffect } from "react";
import Image from "next/image";
import { type UpsellOffer } from "@/app/lib/funnelData";
import { formatPrice } from "@/app/lib/productData";

interface UpsellBottomSheetProps {
  isOpen: boolean;
  offer: UpsellOffer | null;
  onAccept: () => void;
  /** "No thanks" — proceeds to checkout with original selection */
  onDecline: () => void;
  /** Backdrop tap / swipe dismiss — returns to selection, no checkout */
  onDismiss: () => void;
  loading: boolean;
}

export default function UpsellBottomSheet({
  isOpen,
  offer,
  onAccept,
  onDecline,
  onDismiss,
  loading,
}: UpsellBottomSheetProps) {
  // Lock body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  if (!isOpen || !offer) return null;

  const hasPerShotHero = Boolean(offer.perShotHero);

  return (
    <>
      {/* Backdrop — dismiss (return to selection), not decline (proceed to checkout) */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onDismiss}
        role="button"
        aria-label="Close upgrade offer"
        tabIndex={-1}
      />

      {/* Bottom sheet (mobile) / Centered modal (desktop) */}
      <div className="fixed z-[70] bg-white shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto bottom-0 left-0 right-0 rounded-t-[var(--brand-radius-card)] lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:right-auto lg:w-full lg:max-w-md lg:rounded-[var(--brand-radius-card)]">
        <div className="px-5 pt-4 pb-5 lg:p-6 lg:pb-8">
          {/* Handle bar (mobile only) — tap to dismiss */}
          <button
            type="button"
            onClick={onDismiss}
            className="mx-auto mb-4 block h-1 w-10 rounded-full bg-black/10 lg:hidden"
            aria-label="Dismiss"
          />

          {/* Product image — wide, centred */}
          {offer.image && (
            <div className="relative mb-4 mx-auto w-full max-w-[200px] aspect-square rounded-[var(--brand-radius-container)] overflow-hidden" style={{ backgroundColor: "var(--brand-tint)" }}>
              <Image
                src={offer.image.src}
                alt={offer.image.alt}
                fill
                className="object-contain p-2"
                sizes="200px"
              />
            </div>
          )}

          {/* Headline — primary text, sets context */}
          <h3 className="text-xl font-semibold text-[var(--brand-black)] tracking-[var(--brand-h2-tracking)]">
            {offer.headline}
          </h3>

          {/* Per-shot hero block — the key value proposition */}
          {offer.perShotHero && (
            <div className="mt-3 rounded-[var(--brand-radius-container)] p-4" style={{ backgroundColor: "rgba(64, 88, 187, 0.06)" }}>
              {/* Price drop — the hero data point */}
              <div className="flex items-baseline gap-2.5">
                <span className="brand-data text-3xl font-bold text-[var(--brand-black)]">
                  {formatPrice(offer.perShotHero.upgradedPerShot)}
                </span>
                <span className="brand-data-label text-sm text-black/50">/shot</span>
                <span className="brand-data text-base text-black/30 line-through ml-1">
                  {formatPrice(offer.perShotHero.currentPerShot)}
                </span>
              </div>
              {/* Context line */}
              <p className="mt-1.5 text-sm text-black/60">
                Drop from {formatPrice(offer.perShotHero.currentPerShot)} — add {offer.perShotHero.addedProductName} for {offer.perShotHero.extraCostLabel}
              </p>
            </div>
          )}

          {/* Benefit bullets — supporting proof */}
          {offer.benefits && offer.benefits.length > 0 && (
            <ul className="mt-4 space-y-2">
              {offer.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-black/70">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="rgba(64, 88, 187, 0.1)" />
                    <path d="M5 8.5L7 10.5L11 6" stroke="var(--brand-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Fallback price display (cadence upgrades — no perShotHero) */}
          {!hasPerShotHero && offer.compareAtUpgrade && offer.priceDifference !== undefined && (
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

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onAccept}
            disabled={loading}
            className="w-full mt-5 py-4 px-6 rounded-[var(--brand-radius-interactive)] text-white font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
            style={{ background: "var(--brand-gradient-accent)" }}
          >
            {loading ? "Processing..." : offer.acceptLabel}
          </button>

          {/* Decline — proceeds to checkout with original selection */}
          <button
            type="button"
            onClick={onDecline}
            disabled={loading}
            className="w-full py-2 mt-1 text-black/40 font-medium text-sm transition-colors hover:text-black/60"
          >
            {offer.declineLabel}
          </button>

          {/* Social nudge */}
          {offer.socialNudge && (
            <p className="mt-3 text-center text-xs text-black/50 px-4 py-2.5 rounded-[var(--brand-radius-interactive)]" style={{ backgroundColor: "rgba(64, 88, 187, 0.06)" }}>
              {offer.socialNudge}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
