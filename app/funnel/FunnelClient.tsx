"use client";

import { useState, useCallback, useEffect } from "react";
import { track } from "@vercel/analytics/react";
import Image from "next/image";
import FunnelStepIndicator from "../components/funnel/FunnelStepIndicator";
import FunnelHeroAsset from "../components/funnel/FunnelHeroAsset";
import CadenceSelector from "../components/funnel/CadenceSelector";
import ProductSelector from "../components/funnel/ProductSelector";
import FunnelCTA from "../components/funnel/FunnelCTA";
import UpsellModal from "../components/funnel/UpsellModal";
import FunnelAssurance from "../components/funnel/FunnelAssurance";
import {
  type FunnelCadence,
  type FunnelProduct,
  type UpsellOffer,
  getOfferPricing,
  getUpsellOffer,
  getCTAText,
} from "../lib/funnelData";
import {
  funnelCheckout,
  isFunnelCheckoutError,
} from "../lib/funnelCheckout";

function safeTrack(event: string, props: Record<string, string | number | boolean | null>): void {
  try {
    track(event, props);
  } catch {
    // Analytics should never break the funnel
  }
}

export default function FunnelClient() {
  // Navigation state — paginated funnel
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Selection state — pre-selected defaults (highest LTV)
  const [cadence, setCadence] = useState<FunnelCadence>("monthly-sub");
  const [product, setProduct] = useState<FunnelProduct>("both");

  // Checkout state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [upsellOffer, setUpsellOffer] = useState<UpsellOffer | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Track page view
  useEffect(() => {
    safeTrack("funnel:viewed", {
      defaultCadence: "monthly-sub",
      defaultProduct: "both",
    });
  }, []);

  // --- Step 1: Cadence ---

  const handleCadenceChange = useCallback(
    (newCadence: FunnelCadence) => {
      setCadence(newCadence);
      setError(null);
      safeTrack("funnel:cadence_changed", {
        from: cadence,
        to: newCadence,
        product,
      });
    },
    [cadence, product],
  );

  const handleStep1Next = useCallback(() => {
    safeTrack("funnel:step1_completed", { cadence, product });
    setCurrentStep(2);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [cadence, product]);

  // --- Step 2: Product ---

  const handleProductChange = useCallback(
    (newProduct: FunnelProduct) => {
      setProduct(newProduct);
      setError(null);
      safeTrack("funnel:product_changed", {
        from: product,
        to: newProduct,
        cadence,
      });
    },
    [product, cadence],
  );

  const handleBack = useCallback(() => {
    setCurrentStep(1);
    setError(null);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // --- Checkout ---

  const proceedToCheckout = useCallback(
    async (
      finalProduct: FunnelProduct,
      finalCadence: FunnelCadence,
      upsellAccepted: boolean,
    ) => {
      setIsCheckingOut(true);
      setError(null);

      safeTrack("funnel:checkout", {
        product: finalProduct,
        cadence: finalCadence,
        upsellAccepted,
        price: getOfferPricing(finalProduct, finalCadence).price,
      });

      const result = await funnelCheckout({
        product: finalProduct,
        cadence: finalCadence,
        upsellAccepted,
      });

      if (isFunnelCheckoutError(result)) {
        setError(result.error);
        setIsCheckingOut(false);
        return;
      }

      window.location.href = result.checkoutUrl;
    },
    [],
  );

  const handleCheckout = useCallback(() => {
    setError(null);

    safeTrack("funnel:cta_clicked", {
      product,
      cadence,
      price: getOfferPricing(product, cadence).price,
    });

    // Check for upsell
    const offer = getUpsellOffer(product, cadence);
    if (offer) {
      setUpsellOffer(offer);
      setIsUpsellOpen(true);
      safeTrack("funnel:upsell_shown", {
        product,
        cadence,
        upgradedProduct: offer.upgradedProduct,
        upgradedCadence: offer.upgradedCadence,
      });
      return;
    }

    proceedToCheckout(product, cadence, false);
  }, [product, cadence, proceedToCheckout]);

  const handleUpsellAccept = useCallback(() => {
    if (!upsellOffer) return;
    safeTrack("funnel:upsell_accepted", {
      originalProduct: product,
      originalCadence: cadence,
      upgradedProduct: upsellOffer.upgradedProduct,
      upgradedCadence: upsellOffer.upgradedCadence,
    });
    setIsUpsellOpen(false);
    proceedToCheckout(upsellOffer.upgradedProduct, upsellOffer.upgradedCadence, true);
  }, [upsellOffer, product, cadence, proceedToCheckout]);

  const handleUpsellDecline = useCallback(() => {
    safeTrack("funnel:upsell_declined", { product, cadence });
    setIsUpsellOpen(false);
    proceedToCheckout(product, cadence, false);
  }, [product, cadence, proceedToCheckout]);

  // --- CTA labels ---

  const pricing = getOfferPricing(product, cadence);
  const step1Label = "Choose Product";
  const step2Label = getCTAText(cadence, pricing.price);

  return (
    <div className="min-h-screen bg-white text-[var(--color-ink)]">
      {/* Minimal header — logo only */}
      <header className="flex items-center justify-center py-4 px-4 border-b border-gray-100">
        <Image
          src="/conka.svg"
          alt="CONKA"
          width={100}
          height={28}
          priority
        />
      </header>

      {/* Main funnel content */}
      <main className="lg:flex lg:min-h-[calc(100vh-57px)]">
        {/* Desktop: Left column — sticky hero asset */}
        <div className="hidden lg:flex lg:w-1/2 lg:sticky lg:top-0 lg:h-screen lg:items-center lg:justify-center lg:p-8 lg:bg-gray-50">
          <FunnelHeroAsset product={product} />
        </div>

        {/* Right column (full width on mobile) */}
        <div className="w-full lg:w-1/2 lg:overflow-y-auto">
          {/* Step Indicator */}
          <div className="px-5 pt-4 lg:px-10 lg:pt-8">
            <FunnelStepIndicator currentStep={currentStep} />
          </div>

          {/* ===== STEP 1: Choose Plan ===== */}
          {currentStep === 1 && (
            <>
              {/* Mobile hero */}
              <div className="px-5 pt-2 pb-5 lg:hidden">
                <FunnelHeroAsset product={product} />
              </div>

              <div className="px-5 pb-6 lg:px-10">
                <CadenceSelector
                  cadence={cadence}
                  product={product}
                  onChange={handleCadenceChange}
                />
              </div>

              <div className="px-5 pb-6 lg:px-10">
                <FunnelAssurance />
              </div>

              {/* Spacer for sticky CTA */}
              <div className="h-24 lg:hidden" />

              {/* Desktop CTA */}
              <div className="hidden lg:block px-10 pb-8">
                <FunnelCTA
                  label={step1Label}
                  onClick={handleStep1Next}
                  loading={false}
                  error={error}
                />
              </div>
            </>
          )}

          {/* ===== STEP 2: Choose Product ===== */}
          {currentStep === 2 && (
            <>
              {/* Mobile hero */}
              <div className="px-5 pt-2 pb-5 lg:hidden">
                <FunnelHeroAsset product={product} />
              </div>

              {/* Back button */}
              <div className="px-5 lg:px-10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[var(--color-ink)] transition-colors mb-4"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              </div>

              <div className="px-5 pb-6 lg:px-10">
                <ProductSelector
                  product={product}
                  cadence={cadence}
                  onChange={handleProductChange}
                />
              </div>

              <div className="px-5 pb-6 lg:px-10">
                <FunnelAssurance />
              </div>

              {/* Spacer for sticky CTA */}
              <div className="h-24 lg:hidden" />

              {/* Desktop CTA */}
              <div className="hidden lg:block px-10 pb-8">
                <FunnelCTA
                  label={step2Label}
                  onClick={handleCheckout}
                  loading={isCheckingOut}
                  error={error}
                />
              </div>
            </>
          )}
        </div>
      </main>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden">
        {currentStep === 1 ? (
          <FunnelCTA
            label={step1Label}
            onClick={handleStep1Next}
            loading={false}
            error={error}
          />
        ) : (
          <FunnelCTA
            label={step2Label}
            onClick={handleCheckout}
            loading={isCheckingOut}
            error={error}
          />
        )}
      </div>

      {/* Upsell modal */}
      <UpsellModal
        isOpen={isUpsellOpen}
        offer={upsellOffer}
        onAccept={handleUpsellAccept}
        onDecline={handleUpsellDecline}
        loading={isCheckingOut}
      />
    </div>
  );
}
