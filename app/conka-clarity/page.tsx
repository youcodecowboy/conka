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
import { getSiteTestimonialsClarity } from "@/app/lib/testimonialsFilter";

export default function ConkaClarityPage() {
  const isMobile = useIsMobile();
  const [selectedPack, setSelectedPack] = useState<PackSize>("12");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");
  const { addToCart } = useCart();

  // Meta ViewContent (once per page view; default to 12-shot subscription variant as stable product id for Meta)
  useEffect(() => {
    const variantData = getFormulaVariantId("02", "12", "subscription");
    if (variantData?.variantId) {
      trackMetaViewContent({
        content_ids: [toContentId(variantData.variantId)],
        content_name: "CONKA Clarity",
        content_type: "product",
      });
    }
  }, []);

  // Hero section handler
  const handleAddToCartFromHero = async () => {
    const variantData = getFormulaVariantId("02", selectedPack, purchaseType);
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId, {
        location: "hero",
        source: getAddToCartSource(),
        sessionId: getQuizSessionId(),
      });
    } else {
      console.warn("Variant ID not configured for:", {
        formula: "02",
        pack: selectedPack,
        type: purchaseType,
      });
    }
  };

  const handleAddToCartFromFooter = async () => {
    const variantData = getFormulaVariantId("02", selectedPack, purchaseType);
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId, {
        location: "sticky_footer",
        source: getAddToCartSource(),
        sessionId: getQuizSessionId(),
      });
    } else {
      console.warn("Variant ID not configured for:", {
        formula: "02",
        pack: selectedPack,
        type: purchaseType,
      });
    }
  };

  if (isMobile) {
    return (
      <div
        className="min-h-screen theme-conka-clarity"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Navigation />
        <div className="premium-pdp">
          <ProductHeroMobile
            formulaId="02"
            selectedPack={selectedPack}
            onPackSelect={setSelectedPack}
            purchaseType={purchaseType}
            onPurchaseTypeChange={setPurchaseType}
            onAddToCart={handleAddToCartFromHero}
          />

          <FormulaBenefitsStats formulaId="02" />
          <Testimonials
            testimonials={getSiteTestimonialsClarity()}
            autoScrollOnly
          />

          <WhatToExpectTimeline formulaId="02" />

          <EditorialQuotesCarousel quotes={getEditorialQuotesForFormula("02")} />
          <FormulaIngredients formulaId="02" />
          <HowItWorks formulaId="02" />
          <section
            id="proof-and-science"
            className="premium-section"
            aria-labelledby="proof-and-science-heading"
          >
            <div className="premium-container">
              <FormulaBenefitsMobile formulaId="02" />
            </div>
          </section>
          <FormulaCaseStudiesMobile formulaId="02" />
          <FormulaFAQ formulaId="02" />

          <StickyPurchaseFooterMobile
            formulaId="02"
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

  return (
    <div
      className="min-h-screen theme-conka-clarity lg:pt-8"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />
      <div className="premium-pdp">
        <ProductHero
          formulaId="02"
          selectedPack={selectedPack}
          onPackSelect={setSelectedPack}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCartFromHero}
        />

        <FormulaBenefitsStats formulaId="02" />
        <Testimonials
          testimonials={getSiteTestimonialsClarity()}
          autoScrollOnly
        />

        <WhatToExpectTimeline formulaId="02" />

        <EditorialQuotesCarousel quotes={getEditorialQuotesForFormula("02")} />
        <FormulaIngredients formulaId="02" />
        <HowItWorks formulaId="02" />
        <section
          id="proof-and-science"
          className="premium-section"
          aria-labelledby="proof-and-science-heading"
        >
          <div className="premium-container">
            <FormulaBenefits formulaId="02" />
          </div>
        </section>
        <FormulaCaseStudies formulaId="02" />
        <FormulaFAQ formulaId="02" />

        <section className="premium-section">
          <div className="premium-container">
            <div className="premium-box p-8 md:p-12 text-center">
              <h2 className="premium-section-heading mb-4">
                Want the Complete Experience?
              </h2>
              <p className="premium-annotation mb-6">
                combine CONKA Clear with CONKA Flow in a protocol
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/conka-flow"
                  className="neo-button-outline px-8 py-4 font-semibold text-lg"
                >
                  Explore CONKA Flow
                </a>
                <a
                  href="/protocol/2"
                  className="neo-button px-8 py-4 font-bold text-lg"
                >
                  View Protocols
                </a>
              </div>
            </div>
          </div>
        </section>

        <StickyPurchaseFooter
          formulaId="02"
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
