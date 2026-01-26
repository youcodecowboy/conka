"use client";

import { useState } from "react";
import Image from "next/image";
import Navigation from "@/app/components/navigation";
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
      await addToCart(
        variantData.variantId,
        1,
        variantData.sellingPlanId,
        {
          location: "hero",
          source: getAddToCartSource(),
          sessionId: getQuizSessionId(),
        }
      );
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
      await addToCart(
        variantData.variantId,
        1,
        variantData.sellingPlanId,
        {
          location: "sticky_footer",
          source: getAddToCartSource(),
          sessionId: getQuizSessionId(),
        }
      );
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

        {/* Footer */}
        <footer className="px-4 py-8 pb-28 border-t-2 border-current/10">
          <div className="flex flex-col gap-6">
            {/* Logo & Nav */}
            <div className="flex flex-col gap-3">
              <a
                href="/"
                className="flex items-center hover:opacity-70 transition-all"
              >
                <Image
                  src="/conka.png"
                  alt="CONKA logo"
                  width={90}
                  height={30}
                  className="h-6 w-auto"
                />
              </a>
              <nav className="flex flex-wrap items-center gap-2">
                <a
                  href="/science"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  The Science
                </a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a
                  href="/ingredients"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  Ingredients
                </a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a
                  href="/case-studies"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  Results
                </a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a
                  href="/our-story"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  Our Story
                </a>
              </nav>
              <p className="font-commentary text-xs opacity-60">
                built with love ♥
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <a
                  href="/quiz"
                  className="flex-1 neo-button-outline px-3 py-2 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Find Your Protocol
                </a>
                <a
                  href="#protocols"
                  className="flex-1 neo-button px-3 py-2 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Buy CONKA
                </a>
              </div>
              <p className="font-clinical text-xs text-center opacity-50 flex items-center justify-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                100-day money-back guarantee
              </p>
            </div>
          </div>
        </footer>

        <StickyPurchaseFooterMobile
          formulaId="02"
          selectedPack={selectedPack}
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

      {/* Footer */}
      <footer className="px-6 md:px-16 py-16 border-t-2 border-current border-opacity-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            <div className="flex flex-col gap-6">
              <a
                href="/"
                className="flex items-center hover:opacity-70 transition-all"
              >
                <Image
                  src="/conka.png"
                  alt="CONKA logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </a>
              <nav className="flex flex-wrap items-center gap-2">
                <a
                  href="/"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Home
                </a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a
                  href="/conka-flow"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  CONKA Flow
                </a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a
                  href="/conka-clarity"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  CONKA Clear
                </a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a
                  href="/protocol/1"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Protocols
                </a>
              </nav>
              <p className="font-clinical text-sm opacity-70">
                Patent #GB2620279 • 125 Clinical Trials • £500,000+ in Research
              </p>
              <p className="font-commentary text-sm">built with love ♥</p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-4">
              <p className="font-commentary text-xl lg:text-right">
                ready to unlock your potential?
              </p>
              <button
                onClick={handleAddToCartFromHero}
                className="neo-button px-8 py-3 font-bold text-base"
              >
                Add to Cart
              </button>
              <p className="font-clinical text-sm opacity-70 lg:text-right">
                100 day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </footer>

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
