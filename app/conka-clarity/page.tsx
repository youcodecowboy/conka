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

export default function ConkaClarityPage() {
  const isMobile = useIsMobile();
  const [selectedPack, setSelectedPack] = useState<PackSize>("12");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");
  const { addToCart } = useCart();

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

          <PDPPlaceholder step={1} />
          <PDPPlaceholder step={2} />
          <PDPPlaceholder step={3} />
          <PDPPlaceholder step={4} />

          <HowItWorks formulaId="02" />
          <FormulaIngredients formulaId="02" />
          <FormulaBenefitsMobile formulaId="02" />
          <PDPPlaceholder step={8} />
          <FormulaCaseStudiesMobile formulaId="02" />
          <ProtocolBenefitsMobile formulaId="02" />
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
      className="min-h-screen theme-conka-clarity lg:pt-20"
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

        <PDPPlaceholder step={1} />
        <PDPPlaceholder step={2} />
        <PDPPlaceholder step={3} />
        <PDPPlaceholder step={4} />

        <HowItWorks formulaId="02" />
        <FormulaIngredients formulaId="02" />
        <FormulaBenefits formulaId="02" />
        <PDPPlaceholder step={8} />
        <FormulaCaseStudies formulaId="02" />
        <FormulaFAQ formulaId="02" />

        <section className="premium-section">
          <div className="premium-container">
            <div className="premium-box p-8 md:p-12 text-center">
              <h2 className="premium-heading mb-4">
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
