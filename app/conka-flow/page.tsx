"use client";

import { useState } from "react";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import {
  ProductHero,
  ProductHeroMobile,
  FormulaIngredients,
  FormulaBenefits,
  FormulaBenefitsMobile,
  ProtocolBenefitsMobile,
  FormulaFAQ,
  HowItWorks,
  PDPPlaceholder,
  StickyPurchaseFooter,
  StickyPurchaseFooterMobile,
} from "@/app/components/product";
import { FormulaCaseStudiesMobile } from "@/app/components/FormulaCaseStudies";
import FormulaCaseStudies from "@/app/components/FormulaCaseStudies";
import { PackSize, PurchaseType } from "@/app/lib/productData";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useCart } from "@/app/context/CartContext";
import { getFormulaVariantId } from "@/app/lib/shopifyProductMapping";
import { getAddToCartSource, getQuizSessionId } from "@/app/lib/analytics";

export default function ConkaFlowPage() {
  const isMobile = useIsMobile();
  const [selectedPack, setSelectedPack] = useState<PackSize>("12");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");
  const { addToCart } = useCart();

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
            usePremium
          />

          {/* Step 1 — Immediate proof */}
          <PDPPlaceholder step={1} usePremium />

          {/* Step 2 — Problem */}
          <PDPPlaceholder step={2} usePremium />

          {/* Step 3 — Outcomes */}
          <PDPPlaceholder step={3} usePremium />

          {/* Step 4 — Timeline */}
          <PDPPlaceholder step={4} usePremium />

          {/* Step 5 — How it works */}
          <HowItWorks formulaId="01" usePremium />

          {/* Step 6 — Ingredients */}
          <FormulaIngredients formulaId="01" usePremium />

          {/* Step 7 — Proof and science */}
          <FormulaBenefitsMobile formulaId="01" usePremium />

          {/* Step 8 — Comparison */}
          <PDPPlaceholder step={8} usePremium />

          {/* Step 9 — Social proof */}
          <FormulaCaseStudiesMobile formulaId="01" usePremium />

          {/* Protocol CTAs (mobile-only) */}
          <ProtocolBenefitsMobile formulaId="01" usePremium />

          {/* Step 10 — FAQ */}
          <FormulaFAQ formulaId="01" usePremium />

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
      className="min-h-screen theme-conka-flow lg:pt-20"
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
          usePremium
        />

        {/* Step 1 — Immediate proof */}
        <PDPPlaceholder step={1} usePremium />

        {/* Step 2 — Problem */}
        <PDPPlaceholder step={2} usePremium />

        {/* Step 3 — Outcomes */}
        <PDPPlaceholder step={3} usePremium />

        {/* Step 4 — Timeline */}
        <PDPPlaceholder step={4} usePremium />

        {/* Step 5 — How it works */}
        <HowItWorks formulaId="01" usePremium />

        {/* Step 6 — Ingredients */}
        <FormulaIngredients formulaId="01" usePremium />

        {/* Step 7 — Proof and science */}
        <FormulaBenefits formulaId="01" usePremium />

        {/* Step 8 — Comparison */}
        <PDPPlaceholder step={8} usePremium />

        {/* Step 9 — Social proof */}
        <FormulaCaseStudies formulaId="01" usePremium />

        {/* Step 10 — FAQ */}
        <FormulaFAQ formulaId="01" usePremium />

        {/* Related Products CTA */}
        <section className="premium-section">
          <div className="premium-container">
            <div className="premium-box p-8 md:p-12 text-center">
              <h2 className="premium-heading mb-4">
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
