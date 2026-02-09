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

        {/* Step 0 — Hero + Purchase */}
        <ProductHeroMobile
          formulaId="01"
          selectedPack={selectedPack}
          onPackSelect={setSelectedPack}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCartFromHero}
        />

        {/* Step 1 — Immediate proof */}
        <PDPPlaceholder step={1} />

        {/* Step 2 — Problem */}
        <PDPPlaceholder step={2} />

        {/* Step 3 — Outcomes */}
        <PDPPlaceholder step={3} />

        {/* Step 4 — Timeline */}
        <PDPPlaceholder step={4} />

        {/* Step 5 — How it works */}
        <HowItWorks formulaId="01" />

        {/* Step 6 — Ingredients */}
        <FormulaIngredients formulaId="01" />

        {/* Step 7 — Proof and science */}
        <FormulaBenefitsMobile formulaId="01" />

        {/* Step 8 — Comparison */}
        <PDPPlaceholder step={8} />

        {/* Step 9 — Social proof */}
        <FormulaCaseStudiesMobile formulaId="01" />

        {/* Protocol CTAs (mobile-only) */}
        <ProtocolBenefitsMobile formulaId="01" />

        {/* Step 10 — FAQ */}
        <FormulaFAQ formulaId="01" />

        <Footer />

        {/* Step 11 — Final CTA */}
        <StickyPurchaseFooterMobile
          formulaId="01"
          selectedPack={selectedPack}
          onPackSelect={setSelectedPack}
          purchaseType={purchaseType}
          onAddToCart={handleAddToCartFromFooter}
        />
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

      {/* Step 0 — Hero + Purchase */}
      <ProductHero
        formulaId="01"
        selectedPack={selectedPack}
        onPackSelect={setSelectedPack}
        purchaseType={purchaseType}
        onPurchaseTypeChange={setPurchaseType}
        onAddToCart={handleAddToCartFromHero}
      />

      {/* Step 1 — Immediate proof */}
      <PDPPlaceholder step={1} />

      {/* Step 2 — Problem */}
      <PDPPlaceholder step={2} />

      {/* Step 3 — Outcomes */}
      <PDPPlaceholder step={3} />

      {/* Step 4 — Timeline */}
      <PDPPlaceholder step={4} />

      {/* Step 5 — How it works */}
      <HowItWorks formulaId="01" />

      {/* Step 6 — Ingredients */}
      <FormulaIngredients formulaId="01" />

      {/* Step 7 — Proof and science */}
      <FormulaBenefits formulaId="01" />

      {/* Step 8 — Comparison */}
      <PDPPlaceholder step={8} />

      {/* Step 9 — Social proof */}
      <FormulaCaseStudies formulaId="01" />

      {/* Step 10 — FAQ */}
      <FormulaFAQ formulaId="01" />

      {/* Related Products CTA */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="neo-box p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want the Complete Experience?
            </h2>
            <p className="font-commentary text-xl mb-6">
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

      <Footer />

      {/* Step 11 — Final CTA */}
      <StickyPurchaseFooter
        formulaId="01"
        selectedPack={selectedPack}
        onPackSelect={setSelectedPack}
        purchaseType={purchaseType}
        onPurchaseTypeChange={setPurchaseType}
        onAddToCart={handleAddToCartFromFooter}
      />
    </div>
  );
}
