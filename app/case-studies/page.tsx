"use client";

import { useState } from "react";
import Navigation from "@/app/components/Navigation";
import CaseStudiesPageDesktop from "@/app/components/case-studies/CaseStudiesPageDesktop";
import CaseStudiesPageMobile from "@/app/components/case-studies/CaseStudiesPageMobile";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function CaseStudiesPage() {
  const isMobile = useIsMobile();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Navigation */}
      <Navigation cartOpen={cartOpen} setCartOpen={setCartOpen} />

      {/* Main Content */}
      {isMobile ? <CaseStudiesPageMobile /> : <CaseStudiesPageDesktop />}

      {/* Footer */}
      <footer className={`px-4 ${isMobile ? "py-8" : "px-16 py-16"} border-t-2 border-current/10`}>
        <div className="max-w-6xl mx-auto">
          <div className={`flex ${isMobile ? "flex-col gap-6" : "flex-row justify-between items-start gap-12"}`}>
            {/* Logo & Nav */}
            <div className="flex flex-col gap-4">
              <a href="/" className={`${isMobile ? "text-xl" : "text-2xl"} font-bold tracking-tight font-primary hover:opacity-70 transition-all`}>
                conka.
              </a>
              <nav className="flex flex-wrap items-center gap-2">
                <a href="/" className="font-clinical text-sm hover:opacity-70 transition-all">Home</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="/conka-flow" className="font-clinical text-sm hover:opacity-70 transition-all">Conka Flow</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="/conka-clarity" className="font-clinical text-sm hover:opacity-70 transition-all">Conka Clarity</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="/ingredients" className="font-clinical text-sm hover:opacity-70 transition-all">Ingredients</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="/case-studies" className="font-clinical text-sm hover:opacity-70 transition-all font-medium">Case Studies</a>
              </nav>
              <p className="font-clinical text-sm opacity-70">
                Patent #GB2620279 • 125 Clinical Trials • £500,000+ in Research
              </p>
              <p className="font-commentary text-sm">built with love ♥</p>
            </div>

            {/* CTA */}
            <div className={`flex flex-col ${isMobile ? "items-start" : "items-end"} gap-4`}>
              <p className="font-commentary text-xl">
                ready to unlock your potential?
              </p>
              <div className="flex gap-3">
                <a
                  href="/conka-flow"
                  className="neo-button-outline px-6 py-3 font-semibold text-sm"
                >
                  Try Conka Flow
                </a>
                <a
                  href="/conka-clarity"
                  className="neo-button px-6 py-3 font-semibold text-sm"
                >
                  Try Conka Clarity
                </a>
              </div>
              <p className="font-clinical text-sm opacity-70">
                100 day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </footer>

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

