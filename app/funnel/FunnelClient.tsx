"use client";

import { useState, useCallback, useEffect } from "react";
import { track } from "@vercel/analytics/react";
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
  const [product, setProduct] = useState<FunnelProduct>("both");
  const [cadence, setCadence] = useState<FunnelCadence>("monthly-sub");

  // Checkout state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [upsellOffer, setUpsellOffer] = useState<UpsellOffer | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Track page view
  useEffect(() => {
    safeTrack("funnel:viewed", {
      defaultProduct: "both",
      defaultCadence: "monthly-sub",
    });
  }, []);

  // Reset checkout state when page is restored from bfcache (browser back from Shopify)
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsCheckingOut(false);
        setError(null);
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // --- Step navigation ---

  const goToStep = useCallback((step: 1 | 2) => {
    setCurrentStep(step);
    setError(null);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // --- Step 1: Product ---

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

  const handleStep1Next = useCallback(() => {
    safeTrack("funnel:step1_completed", { product, cadence });
    goToStep(2);
  }, [product, cadence, goToStep]);

  // --- Step 2: Cadence ---

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

  const step1Label = "Continue";
  const step2Label = "Checkout Now";


  return (
    <div className="min-h-screen bg-white text-[var(--color-ink)]">
      {/* Fixed header with step breadcrumb */}
      <FunnelStepIndicator
        currentStep={currentStep}
        onStepClick={goToStep}
      />

      {/* Spacer for fixed header */}
      <div className="h-12 lg:h-14" />

      {/* Main funnel content */}
      <main className="lg:flex lg:min-h-[calc(100vh-56px)]">
        {/* Desktop: Left column — sticky hero asset */}
        <div className="hidden lg:flex lg:w-1/2 lg:sticky lg:top-14 lg:h-[calc(100vh-56px)] lg:items-center lg:justify-center lg:p-8 lg:bg-gray-50">
          <FunnelHeroAsset
            product={product}
            cadence={cadence}
            mode={currentStep === 1 ? "carousel" : "static"}
          />
        </div>

        {/* Right column (full width on mobile, constrained on desktop) */}
        <div className="w-full lg:w-1/2 lg:overflow-y-auto lg:px-8 lg:max-w-2xl">

          {/* ===== STEP 1: Choose Product ===== */}
          {currentStep === 1 && (
            <>
              {/* Mobile hero — carousel, scrolls naturally with content */}
              <div className="lg:hidden px-5 pt-5">
                <FunnelHeroAsset
                  product={product}
                  cadence={cadence}
                  mode="carousel"
                />
              </div>

              <div className="px-5 pt-5 pb-6 lg:px-10 lg:pt-8">
                <ProductSelector
                  product={product}
                  cadence={cadence}
                  onChange={handleProductChange}
                />
              </div>

              {/* Spacer for sticky CTA */}
              <div className="h-24 lg:hidden" />

              {/* Desktop: assurance + CTA */}
              <div className="hidden lg:block px-10 pb-8">
                <FunnelAssurance />
                <FunnelCTA
                  label={step1Label}
                  onClick={handleStep1Next}
                  loading={false}
                  error={error}
                />
              </div>
            </>
          )}

          {/* ===== STEP 2: Choose Plan ===== */}
          {currentStep === 2 && (
            <>
              {/* Mobile hero — static product image, scrolls naturally */}
              <div className="lg:hidden px-5 pt-5">
                <FunnelHeroAsset
                  product={product}
                  cadence={cadence}
                  mode="static"
                />
              </div>

              <div className="px-5 pt-5 pb-6 lg:px-10 lg:pt-8">
                <CadenceSelector
                  cadence={cadence}
                  product={product}
                  onChange={handleCadenceChange}
                />
              </div>

              {/* Spacer for sticky CTA */}
              <div className="h-24 lg:hidden" />

              {/* Desktop: assurance + CTA */}
              <div className="hidden lg:block px-10 pb-8">
                <FunnelAssurance />
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
