"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import {
  ProductHero,
  ProductHeroMobile,
  FormulaIngredients,
  FormulaBenefits,
  FormulaBenefitsStats,
  FormulaBenefitsMobile,
  FormulaFAQ,
  HowItWorks,
  StickyPurchaseFooter,
  StickyPurchaseFooterMobile,
  WhatToExpectTimeline,
  EditorialQuotesCarousel,
} from "@/app/components/product";
import { getEditorialQuotesForFormula } from "@/app/lib/editorialQuotesData";
import { FormulaCaseStudiesMobile } from "@/app/components/FormulaCaseStudies";
import FormulaCaseStudies from "@/app/components/FormulaCaseStudies";
import { PackSize, PurchaseType } from "@/app/lib/productData";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useCart } from "@/app/context/CartContext";
import { getFormulaVariantId } from "@/app/lib/shopifyProductMapping";
import { getAddToCartSource, getQuizSessionId } from "@/app/lib/analytics";
import { trackMetaViewContent, toContentId } from "@/app/lib/metaPixel";
import Testimonials from "@/app/components/testimonials/Testimonials";
import { getSiteTestimonialsFlow } from "@/app/lib/testimonialsFilter";

export default function ConkaFlowPage() {
  const isMobile = useIsMobile();
  const [selectedPack, setSelectedPack] = useState<PackSize>("12");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");
  const { addToCart } = useCart();

  // Meta ViewContent (once per page view; default to 12-shot subscription variant as stable product id for Meta)
  useEffect(() => {
    const variantData = getFormulaVariantId("01", "12", "subscription");
    if (variantData?.variantId) {
      trackMetaViewContent({
        content_ids: [toContentId(variantData.variantId)],
        content_name: "CONKA Flow",
        content_type: "product",
      });
    }
  }, []);

  // Hero section handler
  const handleAddToCartFromHero = async () => {
    const variantData = getFormulaVariantId("01", selectedPack, purchaseType);
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId, {
        location: "hero",
        source: getAddToCartSource(),
        sessionId: getQuizSessionId(),
      });
    } else {
      console.warn("Variant ID not configured for:", {
        formula: "01",
        pack: selectedPack,
        type: purchaseType,
      });
    }
  };

  // Sticky footer handler
  const handleAddToCartFromFooter = async () => {
    const variantData = getFormulaVariantId("01", selectedPack, purchaseType);
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId, {
        location: "sticky_footer",
        source: getAddToCartSource(),
        sessionId: getQuizSessionId(),
      });
    } else {
      console.warn("Variant ID not configured for:", {
        formula: "01",
        pack: selectedPack,
        type: purchaseType,
      });
    }
  };

  // Mobile version — Phase 2 flow: 0 → 1 → … → 11
  if (isMobile) {
    return (
      <div
        className="min-h-screen theme-conka-flow"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Navigation />
        <div className="premium-pdp">
          {/* Step 0 — Hero + Purchase */}
          <ProductHeroMobile
            formulaId="01"
            selectedPack={selectedPack}
            onPackSelect={setSelectedPack}
            purchaseType={purchaseType}
            onPurchaseTypeChange={setPurchaseType}
            onAddToCart={handleAddToCartFromHero}
          />

          <FormulaBenefitsStats formulaId="01" />
          <Testimonials
            testimonials={getSiteTestimonialsFlow()}
            autoScrollOnly
          />

          <WhatToExpectTimeline productId="01" />

          <EditorialQuotesCarousel quotes={getEditorialQuotesForFormula("01")} />
          <FormulaIngredients formulaId="01" />
          <HowItWorks formulaId="01" />
          <section
            id="proof-and-science"
            className="premium-section"
            aria-labelledby="proof-and-science-heading"
          >
            <div className="premium-container">
              <FormulaBenefitsMobile formulaId="01" />
            </div>
          </section>
          <FormulaCaseStudiesMobile formulaId="01" />
          <FormulaFAQ formulaId="01" />

          {/* Step 11 — Final CTA */}
          <StickyPurchaseFooterMobile
            formulaId="01"
            selectedPack={selectedPack}
            onPackSelect={setSelectedPack}
            purchaseType={purchaseType}
            onAddToCart={handleAddToCartFromFooter}
            usePremium
          />
        </div>
        <Footer />
      </div>
    );
  }

  // Desktop version — Phase 2 flow: 0 → 1 → … → 11
  return (
    <div
      className="min-h-screen theme-conka-flow lg:pt-8"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />
      <div className="premium-pdp">
        {/* Step 0 — Hero + Purchase */}
        <ProductHero
          formulaId="01"
          selectedPack={selectedPack}
          onPackSelect={setSelectedPack}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCartFromHero}
        />

        <FormulaBenefitsStats formulaId="01" />
        <Testimonials
          testimonials={getSiteTestimonialsFlow()}
          autoScrollOnly
        />

        <WhatToExpectTimeline productId="01" />

        <EditorialQuotesCarousel quotes={getEditorialQuotesForFormula("01")} />
        <FormulaIngredients formulaId="01" />
        <HowItWorks formulaId="01" />
        <section
          id="proof-and-science"
          className="premium-section"
          aria-labelledby="proof-and-science-heading"
        >
          <div className="premium-container">
            <FormulaBenefits formulaId="01" />
          </div>
        </section>
        <FormulaCaseStudies formulaId="01" />
        <FormulaFAQ formulaId="01" />

        {/* Related Products CTA */}
        <section className="premium-section">
          <div className="premium-container">
            <div className="premium-box p-8 md:p-12 text-center">
              <h2 className="premium-section-heading mb-4">
                Want the Complete Experience?
              </h2>
              <p className="premium-annotation mb-6">
                combine CONKA Flow with CONKA Clear in a protocol
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/conka-clarity"
                  className="neo-button-outline px-8 py-4 font-semibold text-lg"
                >
                  Explore CONKA Clear
                </a>
                <a
                  href="/protocol/1"
                  className="neo-button px-8 py-4 font-bold text-lg"
                >
                  View Protocols
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Step 11 — Final CTA */}
        <StickyPurchaseFooter
          formulaId="01"
          selectedPack={selectedPack}
          onPackSelect={setSelectedPack}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCartFromFooter}
          usePremium
        />
      </div>
      <Footer />
    </div>
  );
}
