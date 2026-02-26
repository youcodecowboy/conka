"use client";

import { useState, useEffect } from "react";
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
import { getSiteTestimonialsClarity } from "@/app/lib/testimonialsFilter";
import ProductGrid from "@/app/components/home/ProductGrid";

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
        {/* Hero outside premium-pdp so sticky left column is not trapped by overflow-x-hidden */}
        <section
          id="hero"
          className="premium-section-luxury premium-hero-first bg-white"
          aria-label="Product hero"
        >
          <div className="premium-track">
            <ProductHeroMobile
              formulaId="02"
              selectedPack={selectedPack}
              onPackSelect={setSelectedPack}
              purchaseType={purchaseType}
              onPurchaseTypeChange={setPurchaseType}
              onAddToCart={handleAddToCartFromHero}
            />
          </div>
        </section>

        <div className="premium-pdp">
          <section
            id="benefits-stats"
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
            aria-labelledby="benefits-stats-heading"
          >
            <div className="premium-track">
              <FormulaBenefitsStats formulaId="02" />
            </div>
          </section>

          {/* Testimonials */}
          <section
            id="testimonials"
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
          >
            <div className="premium-track">
              <Testimonials
                testimonials={getSiteTestimonialsClarity()}
                autoScrollOnly
              />
            </div>
          </section>

          <section
            id="ingredients"
            className="premium-section-luxury premium-bg-bone"
            aria-label="Formula ingredients"
          >
            <div className="premium-track">
              <FormulaIngredients formulaId="02" />
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
              <FormulaBenefitsMobile formulaId="02" />
            </div>
          </section>

          {/* What to expect */}
          <section
            id="what-to-expect"
            className="premium-section-luxury premium-bg-bone"
            aria-label="What to expect"
          >
            <div className="premium-track">
              <WhatToExpect productId="02" />
            </div>
          </section>

          <section
            id="how-it-works"
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
            aria-labelledby="how-it-works-heading"
          >
            <div className="premium-track">
              <HowItWorks formulaId="02" />
            </div>
          </section>

          <section
            id="case-studies"
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
            aria-label="CONKA Case Studies"
          >
            <div className="premium-track">
              <FormulaCaseStudiesMobile formulaId="02" />
            </div>
          </section>

          <section
            id="faq"
            className="premium-section-luxury premium-bg-bone"
            aria-label="FAQ"
          >
            <div className="premium-track">
              <FormulaFAQ formulaId="02" />
            </div>
          </section>

          <section
            id="explore"
            className="premium-section-luxury bg-white"
            aria-label="Explore other protocols and formulas"
          >
            <div className="premium-track">
              <ProductGrid exclude={["clear"]} />
            </div>
          </section>

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
      {/* Hero outside premium-pdp so sticky left column is not trapped by overflow-x-hidden */}
      <section
        id="hero"
        className="premium-section-luxury premium-hero-first bg-white"
        aria-label="Product hero"
      >
        <div className="premium-track">
          <ProductHero
            formulaId="02"
            selectedPack={selectedPack}
            onPackSelect={setSelectedPack}
            purchaseType={purchaseType}
            onPurchaseTypeChange={setPurchaseType}
            onAddToCart={handleAddToCartFromHero}
          />
        </div>
      </section>

      <div className="premium-pdp">
        <section
          id="benefits-stats"
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
          aria-labelledby="benefits-stats-heading"
        >
          <div className="premium-track">
            <FormulaBenefitsStats formulaId="02" />
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        >
          <div className="premium-track">
            <Testimonials
              testimonials={getSiteTestimonialsClarity()}
              autoScrollOnly
            />
          </div>
        </section>

        <section
          id="ingredients"
          className="premium-section-luxury premium-bg-bone"
          aria-label="Formula ingredients"
        >
          <div className="premium-track">
            <FormulaIngredients formulaId="02" />
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
          <FormulaBenefits formulaId="02" />
        </div>
      </section>

      {/* What to expect */}
      <section
        id="what-to-expect"
        className="premium-section-luxury premium-bg-bone"
        aria-label="What to expect"
      >
        <div className="premium-track">
          <WhatToExpect productId="02" />
        </div>
      </section>

      <div className="premium-pdp">
        <section
          id="how-it-works"
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
          aria-labelledby="how-it-works-heading"
        >
          <div className="premium-track">
            <HowItWorks formulaId="02" />
          </div>
        </section>

        <section
          id="case-studies"
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
          aria-label="CONKA Case Studies"
        >
          <div className="premium-track">
            <FormulaCaseStudies formulaId="02" />
          </div>
        </section>

        <section
          id="faq"
          className="premium-section-luxury premium-bg-bone"
          aria-label="FAQ"
        >
          <div className="premium-track">
            <FormulaFAQ formulaId="02" />
          </div>
        </section>

        <section
          id="explore"
          className="premium-section-luxury bg-white"
          aria-label="Explore other protocols and formulas"
        >
          <div className="premium-track">
            <ProductGrid exclude={["clear"]} />
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
