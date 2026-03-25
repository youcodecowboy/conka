"use client";

import { useState, useCallback, useEffect } from "react";
import { track } from "@vercel/analytics/react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
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
  // Pre-selected defaults — Both + Monthly Subscription (highest LTV)
  const [cadence, setCadence] = useState<FunnelCadence>("monthly-sub");
  const [product, setProduct] = useState<FunnelProduct>("both");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [upsellOffer, setUpsellOffer] = useState<UpsellOffer | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Derive current step from state
  const currentStep: 1 | 2 | 3 = isCheckingOut ? 3 : 2;

  // Track page view
  useEffect(() => {
    safeTrack("funnel:viewed", {
      defaultCadence: "monthly-sub",
      defaultProduct: "both",
    });
  }, []);

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

      // Redirect to Shopify checkout
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

    // Check for upsell opportunity
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

    // No upsell — go straight to checkout
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
    safeTrack("funnel:upsell_declined", {
      product,
      cadence,
    });

    setIsUpsellOpen(false);
    proceedToCheckout(product, cadence, false);
  }, [product, cadence, proceedToCheckout]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      {/* Main funnel content */}
      <main className="lg:flex lg:gap-0 lg:min-h-[calc(100vh-80px)]">
        {/* Desktop: Left column — sticky hero asset */}
        <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-0 lg:h-screen lg:p-8">
          <FunnelHeroAsset product={product} />
        </div>

        {/* Right column (full width on mobile) */}
        <div className="w-full lg:w-1/2 lg:overflow-y-auto">
          {/* Step Indicator */}
          <div className="px-4 pt-4 lg:px-8 lg:pt-8">
            <FunnelStepIndicator currentStep={currentStep} />
          </div>

          {/* Mobile: Hero asset */}
          <div className="px-4 pt-2 pb-4 lg:hidden">
            <FunnelHeroAsset product={product} />
          </div>

          {/* Step 1: Cadence */}
          <div className="px-4 pb-6 lg:px-8">
            <CadenceSelector
              cadence={cadence}
              product={product}
              onChange={handleCadenceChange}
            />
          </div>

          {/* Step 2: Product */}
          <div className="px-4 pb-6 lg:px-8">
            <ProductSelector
              product={product}
              cadence={cadence}
              onChange={handleProductChange}
            />
          </div>

          {/* Assurance badges */}
          <div className="px-4 pb-6 lg:px-8">
            <FunnelAssurance />
          </div>

          {/* Desktop CTA (mobile CTA is sticky fixed) */}
          <div className="hidden lg:block px-8 pb-8">
            <FunnelCTA
              cadence={cadence}
              product={product}
              onCheckout={handleCheckout}
              loading={isCheckingOut}
              error={error}
            />
          </div>

          {/* Spacer for mobile sticky CTA */}
          <div className="h-24 lg:hidden" />
        </div>
      </main>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden">
        <FunnelCTA
          cadence={cadence}
          product={product}
          onCheckout={handleCheckout}
          loading={isCheckingOut}
          error={error}
        />
      </div>

      {/* Upsell modal */}
      <UpsellModal
        isOpen={isUpsellOpen}
        offer={upsellOffer}
        onAccept={handleUpsellAccept}
        onDecline={handleUpsellDecline}
        loading={isCheckingOut}
      />

      <Footer />
    </div>
  );
}
