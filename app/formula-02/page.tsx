"use client";

import { useState } from "react";
import Image from "next/image";
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

export default function ConkaClarityPage() {
  const isMobile = useIsMobile();
  const [selectedPack, setSelectedPack] = useState<PackSize>("12");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");
  const { addToCart } = useCart();

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

  // Sticky footer handler
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

  // Mobile version
  if (isMobile) {
    return (
      <div
        className="min-h-screen theme-conka-clarity"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Navigation />

        <ProductHeroMobile
          formulaId="02"
          selectedPack={selectedPack}
          onPackSelect={setSelectedPack}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCartFromHero}
        />

        {/* What do you struggle with section */}
        <FormulaBenefitsMobile formulaId="02" />

        {/* Double Your Benefits - Protocol CTAs */}
        <ProtocolBenefitsMobile formulaId="02" />

        {/* Case Studies - Social Proof */}
        <FormulaCaseStudiesMobile formulaId="02" />

        <Footer />

        <StickyPurchaseFooterMobile
          formulaId="02"
          selectedPack={selectedPack}
          onPackSelect={setSelectedPack}
          purchaseType={purchaseType}
          onAddToCart={handleAddToCartFromFooter}
        />
      </div>
    );
  }

  // Desktop version
  return (
    <div
      className="min-h-screen theme-conka-clarity lg:pt-20"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <ProductHero
        formulaId="02"
        selectedPack={selectedPack}
        onPackSelect={setSelectedPack}
        purchaseType={purchaseType}
        onPurchaseTypeChange={setPurchaseType}
        onAddToCart={handleAddToCartFromHero}
      />

      {/* Benefits Section */}
      <FormulaBenefits formulaId="02" />

      {/* Ingredients Section */}
      <FormulaIngredients formulaId="02" />

      {/* How It Works Section */}
      <HowItWorks formulaId="02" />

      {/* FAQ Section */}
      <FormulaFAQ formulaId="02" />

      {/* Related Products CTA */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="neo-box p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want the Complete Experience?
            </h2>
            <p className="font-commentary text-xl mb-6">
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

      <Footer />

      {/* Sticky Purchase Footer */}
      <StickyPurchaseFooter
        formulaId="02"
        selectedPack={selectedPack}
        onPackSelect={setSelectedPack}
        purchaseType={purchaseType}
        onPurchaseTypeChange={setPurchaseType}
        onAddToCart={handleAddToCartFromFooter}
      />
    </div>
  );
}
