"use client";

import { useState } from "react";
import Navigation from "@/app/components/Navigation";
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
import CaseStudiesMobile from "@/app/components/CaseStudiesMobile";
import { PackSize, PurchaseType } from "@/app/lib/productData";
import useIsMobile from "@/app/hooks/useIsMobile";

// Athletes data for case studies
const athletes = [
  {
    name: "Marcus Chen",
    sport: "Olympic Swimming",
    achievement: "3x Gold Medalist",
    protocol: "Conka Flow daily + Conka Clarity on competition days",
    duration: "18 months",
    results: ["+12% lap consistency", "-0.3s average time", "Zero crashes"],
    quote: "Finally found something that works without the jitters",
  },
  {
    name: "Sarah Okonkwo",
    sport: "Professional Rugby",
    achievement: "England National Team",
    protocol: "Conka Flow daily (28-day cycle)",
    duration: "12 months",
    results: ["+18% decision accuracy", "Better post-match recovery", "Improved sleep scores"],
    quote: "The clarity during matches is unreal",
  },
  {
    name: "James Torres",
    sport: "Esports",
    achievement: "World Championship Finalist",
    protocol: "Conka Clarity before tournaments",
    duration: "8 months",
    results: ["+23% reaction time", "6+ hour focus sessions", "Reduced mental fatigue"],
    quote: "My edge in the final rounds",
  },
];

export default function ConkaFlowPage() {
  const isMobile = useIsMobile();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<PackSize>("12");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscription");

  const handleAddToCart = () => {
    // TODO: Implement cart functionality with Shopify Storefront API
    setCartOpen(true);
    console.log("Add to cart:", {
      formula: "01",
      pack: selectedPack,
      type: purchaseType,
    });
  };

  // Mobile version
  if (isMobile) {
    return (
      <div
        className="min-h-screen theme-conka-flow"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Navigation cartOpen={cartOpen} setCartOpen={setCartOpen} />

        <ProductHeroMobile
          formulaId="01"
          selectedPack={selectedPack}
          onPackSelect={setSelectedPack}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCart}
        />

        {/* What do you struggle with section */}
        <FormulaBenefitsMobile formulaId="01" />

        {/* Double Your Benefits - Protocol CTAs */}
        <ProtocolBenefitsMobile formulaId="01" />

        {/* Case Studies - Social Proof */}
        <CaseStudiesMobile athletes={athletes} />

        {/* Footer */}
        <footer className="px-4 py-8 pb-28 border-t-2 border-current/10">
          <div className="flex flex-col gap-6">
            {/* Logo & Nav */}
            <div className="flex flex-col gap-3">
              <a href="/" className="text-xl font-bold tracking-tight font-primary hover:opacity-70 transition-all">
                conka.
              </a>
              <nav className="flex flex-wrap items-center gap-2">
                <a href="/#science" className="font-clinical text-xs hover:opacity-70 transition-all">The Science</a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a href="/#ingredients" className="font-clinical text-xs hover:opacity-70 transition-all">Ingredients</a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a href="/#results" className="font-clinical text-xs hover:opacity-70 transition-all">Results</a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a href="/#story" className="font-clinical text-xs hover:opacity-70 transition-all">Our Story</a>
              </nav>
              <p className="font-commentary text-xs opacity-60">built with love ♥</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <a 
                  href="/quiz" 
                  className="flex-1 neo-button-outline px-3 py-2 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  Find Your Protocol
                </a>
                <a 
                  href="#protocols" 
                  className="flex-1 neo-button px-3 py-2 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  Buy Conka
                </a>
              </div>
              <p className="font-clinical text-xs text-center opacity-50 flex items-center justify-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                100-day money-back guarantee
              </p>
            </div>
          </div>
        </footer>

        <StickyPurchaseFooterMobile
          formulaId="01"
          selectedPack={selectedPack}
          purchaseType={purchaseType}
          onAddToCart={handleAddToCart}
        />

        {/* Cart Drawer */}
        {cartOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--background)] border-l-2 border-current shadow-2xl">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b-2 border-current">
                  <h2 className="text-lg font-bold">Your Cart</h2>
                  <button onClick={() => setCartOpen(false)} className="p-2" aria-label="Close cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 p-4 flex items-center justify-center text-center opacity-50">
                  <div>
                    <p className="font-clinical text-sm">Your cart is empty</p>
                    <p className="font-commentary text-sm mt-1">add some brain fuel!</p>
                  </div>
                </div>
                <div className="p-4 border-t-2 border-current">
                  <button className="neo-button w-full py-3 font-semibold">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div
      className="min-h-screen theme-conka-flow lg:pt-20"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Navigation */}
      <Navigation cartOpen={cartOpen} setCartOpen={setCartOpen} />

      {/* Hero Section */}
      <ProductHero
        formulaId="01"
        selectedPack={selectedPack}
        onPackSelect={setSelectedPack}
        purchaseType={purchaseType}
        onPurchaseTypeChange={setPurchaseType}
        onAddToCart={handleAddToCart}
      />

      {/* Benefits Section */}
      <FormulaBenefits formulaId="01" />

      {/* Ingredients Section */}
      <FormulaIngredients formulaId="01" />

      {/* How It Works Section */}
      <HowItWorks formulaId="01" />

      {/* FAQ Section */}
      <FormulaFAQ formulaId="01" />

      {/* Related Products CTA */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="neo-box p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want the Complete Experience?
            </h2>
            <p className="font-commentary text-xl mb-6">
              combine Conka Flow with Conka Clarity in a protocol
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/conka-clarity"
                className="neo-button-outline px-8 py-4 font-semibold text-lg"
              >
                Explore Conka Clarity
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

      {/* Footer */}
      <footer className="px-6 md:px-16 py-16 border-t-2 border-current border-opacity-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-xl md:text-2xl font-bold tracking-tight font-primary">
                conka.
              </span>
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
                  Conka Flow
                </a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a
                  href="/conka-clarity"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Conka Clarity
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
                onClick={handleAddToCart}
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
        formulaId="01"
        selectedPack={selectedPack}
        onPackSelect={setSelectedPack}
        purchaseType={purchaseType}
        onPurchaseTypeChange={setPurchaseType}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--background)] border-l-2 border-current shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b-2 border-current">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:opacity-70 transition-all"
                  aria-label="Close cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-4"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <p className="font-clinical text-sm">Your cart is empty</p>
                  <p className="font-commentary text-sm mt-2">add some brain fuel!</p>
                </div>
              </div>
              <div className="p-6 border-t-2 border-current">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-clinical text-sm">Subtotal</span>
                  <span className="font-clinical text-lg font-bold">£0.00</span>
                </div>
                <button className="neo-button w-full px-8 py-4 font-semibold text-lg">
                  Checkout
                </button>
                <p className="font-clinical text-xs text-center mt-3 opacity-70">
                  Free UK shipping on orders over £50
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

