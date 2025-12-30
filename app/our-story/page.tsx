"use client";

import { useIsMobile } from "@/app/hooks/useIsMobile";
import Navigation from "@/app/components/Navigation";
import { OurStoryDesktop } from "@/app/components/our-story/OurStoryDesktop";
import { OurStoryMobile } from "@/app/components/our-story/OurStoryMobile";
import { useState } from "react";

export default function OurStoryPage() {
  const isMobile = useIsMobile();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation - positioned fixed for scroll-snap pages */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <Navigation cartOpen={cartOpen} setCartOpen={setCartOpen} />
      </div>

      {/* Spacer for fixed nav */}
      <div className="h-16 lg:h-20" />

      {/* Main Content - Responsive */}
      {isMobile ? <OurStoryMobile /> : <OurStoryDesktop />}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--background)] border-l-2 border-current shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
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

              {/* Cart Content */}
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
                  <p className="font-commentary text-sm mt-2">
                    add some brain fuel!
                  </p>
                </div>
              </div>

              {/* Footer */}
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

