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
} from "@/app/components/product";
import WhatToExpect from "@/app/components/home/WhatToExpect";
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
import ProductGrid from "@/app/components/home/ProductGrid";

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
        {/* Hero outside premium-pdp so sticky left column is not trapped by overflow-x-hidden */}
        <section
          className="premium-section-luxury premium-hero-first bg-white"
          aria-label="Product hero"
        >
          <div className="premium-track">
            <ProductHeroMobile
              formulaId="01"
              selectedPack={selectedPack}
              onPackSelect={setSelectedPack}
              purchaseType={purchaseType}
              onPurchaseTypeChange={setPurchaseType}
              onAddToCart={handleAddToCartFromHero}
            />
          </div>
        </section>

        <div className="premium-pdp">
          {/* Dark section for high-impact stats */}
          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
            aria-labelledby="benefits-stats-heading"
          >
            <div className="premium-track">
              <FormulaBenefitsStats formulaId="01" />
            </div>
          </section>

          {/* Testimonials */}
          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
          >
            <div className="premium-track">
              <Testimonials
                testimonials={getSiteTestimonialsFlow()}
                autoScrollOnly
              />
            </div>
          </section>

          <section
            className="premium-section-luxury premium-bg-bone"
            aria-label="Formula ingredients"
          >
            <div className="premium-track">
              <FormulaIngredients formulaId="01" />
            </div>
          </section>

          {/* Formula Benefits — after ingredients */}
          <section
            id="proof-and-science"
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
            aria-labelledby="proof-and-science-heading"
          >
            <div className="premium-track">
              <FormulaBenefitsMobile formulaId="01" />
            </div>
          </section>

          {/* What to expect */}
          <section
            className="premium-section-luxury premium-bg-bone"
            aria-label="What to expect"
          >
            <div className="premium-track">
              <WhatToExpect productId="01" />
            </div>
          </section>

          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
            aria-labelledby="how-it-works-heading"
          >
            <div className="premium-track">
              <HowItWorks formulaId="01" />
            </div>
          </section>

          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
            aria-label="CONKA Case Studies"
          >
            <div className="premium-track">
              <FormulaCaseStudiesMobile formulaId="01" />
            </div>
          </section>
          <section
            className="premium-section-luxury premium-bg-bone"
            aria-label="FAQ"
          >
            <div className="premium-track">
              <FormulaFAQ formulaId="01" />
            </div>
          </section>
          <section
            className="premium-section-luxury bg-white"
            aria-label="Explore other protocols and formulas"
          >
            <div className="premium-track">
              <ProductGrid exclude={["flow"]} />
            </div>
          </section>

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
      {/* Hero outside premium-pdp so sticky left column is not trapped by overflow-x-hidden */}
      <section
        className="premium-section-luxury premium-hero-first bg-white"
        aria-label="Product hero"
      >
        <div className="premium-track">
          <ProductHero
            formulaId="01"
            selectedPack={selectedPack}
            onPackSelect={setSelectedPack}
            purchaseType={purchaseType}
            onPurchaseTypeChange={setPurchaseType}
            onAddToCart={handleAddToCartFromHero}
          />
        </div>
      </section>

      <div className="premium-pdp">
        {/* Dark section for high-impact stats */}
        <section
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
          aria-labelledby="benefits-stats-heading"
        >
          <div className="premium-track">
            <FormulaBenefitsStats formulaId="01" />
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        >
          <div className="premium-track">
            <Testimonials
              testimonials={getSiteTestimonialsFlow()}
              autoScrollOnly
            />
          </div>
        </section>

        <section
          className="premium-section-luxury premium-bg-bone"
          aria-label="Formula ingredients"
        >
          <div className="premium-track">
            <FormulaIngredients formulaId="01" />
          </div>
        </section>
      </div>

      {/* Formula Benefits outside premium-pdp so sticky left column works (no overflow-x) */}
      <section
        id="proof-and-science"
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        aria-labelledby="proof-and-science-heading"
      >
        <div className="premium-track">
          <FormulaBenefits formulaId="01" />
        </div>
      </section>

      {/* What to expect */}
      <section
        className="premium-section-luxury premium-bg-bone"
        aria-label="What to expect"
      >
        <div className="premium-track">
          <WhatToExpect productId="01" />
        </div>
      </section>

      <div className="premium-pdp">
        <section
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
          aria-labelledby="how-it-works-heading"
        >
          <div className="premium-track">
            <HowItWorks formulaId="01" />
          </div>
        </section>

        <section
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
          aria-label="CONKA Case Studies"
        >
          <div className="premium-track">
            <FormulaCaseStudies formulaId="01" />
          </div>
        </section>
        <section
          className="premium-section-luxury premium-bg-bone"
          aria-label="FAQ"
        >
          <div className="premium-track">
            <FormulaFAQ formulaId="01" />
          </div>
        </section>
        <section
          className="premium-section-luxury bg-white"
          aria-label="Explore other protocols and formulas"
        >
          <div className="premium-track">
            <ProductGrid exclude={["flow"]} />
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
