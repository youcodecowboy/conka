"use client";

import { useState } from "react";
import Navigation from "@/app/components/Navigation";
import {
  ProductHero,
  FormulaIngredients,
  FormulaBenefits,
  FormulaFAQ,
  HowItWorks,
  StickyPurchaseFooter,
} from "@/app/components/product";
import { PackSize, PurchaseType } from "@/app/lib/productData";

export default function Formula02Page() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<PackSize>("12");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscription");

  const handleAddToCart = () => {
    // TODO: Implement cart functionality with Shopify Storefront API
    setCartOpen(true);
    console.log("Add to cart:", {
      formula: "02",
      pack: selectedPack,
      type: purchaseType,
    });
  };

  return (
    <div
      className="min-h-screen theme-formula-02 lg:pt-20"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Navigation */}
      <Navigation cartOpen={cartOpen} setCartOpen={setCartOpen} />

      {/* Hero Section */}
      <ProductHero
        formulaId="02"
        selectedPack={selectedPack}
        onPackSelect={setSelectedPack}
        purchaseType={purchaseType}
        onPurchaseTypeChange={setPurchaseType}
        onAddToCart={handleAddToCart}
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
              combine Formula 02 with Formula 01 in a protocol
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/formula-01"
                className="neo-button-outline px-8 py-4 font-semibold text-lg"
              >
                Explore Formula 01
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
                  href="/formula-01"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Formula 01
                </a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a
                  href="/formula-02"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Formula 02
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
        formulaId="02"
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

