"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "@/app/components/Navigation";
import {
  ProtocolHero,
  ProtocolCalendar,
  ProtocolBenefits,
  ProtocolFAQ,
} from "@/app/components/protocol";
import { StickyPurchaseFooter } from "@/app/components/product";
import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
} from "@/app/lib/productData";

// Valid protocol IDs
const validProtocolIds: ProtocolId[] = ["1", "2", "3", "4"];

export default function ProtocolPage() {
  const params = useParams();
  const router = useRouter();
  const protocolId = params.id as string;

  const [cartOpen, setCartOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<ProtocolTier>("pro");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscription");

  // Validate protocol ID
  useEffect(() => {
    if (!validProtocolIds.includes(protocolId as ProtocolId)) {
      router.push("/protocol/1"); // Redirect to default protocol
    }
  }, [protocolId, router]);

  // Get protocol data
  const protocol = protocolContent[protocolId as ProtocolId];

  // Set default tier based on protocol (Protocol 4 doesn't have starter)
  useEffect(() => {
    if (protocolId === "4" && selectedTier === "starter") {
      setSelectedTier("pro");
    }
  }, [protocolId, selectedTier]);

  if (!protocol) {
    return null; // Will redirect
  }

  const handleAddToCart = () => {
    setCartOpen(true);
    console.log("Add to cart:", {
      protocol: protocolId,
      tier: selectedTier,
      type: purchaseType,
    });
  };

  return (
    <div
      className="min-h-screen theme-formula-01 lg:pt-20"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Navigation */}
      <Navigation cartOpen={cartOpen} setCartOpen={setCartOpen} />

      {/* Hero Section */}
      <ProtocolHero
        protocolId={protocolId as ProtocolId}
        selectedTier={selectedTier}
        onTierSelect={setSelectedTier}
        purchaseType={purchaseType}
        onPurchaseTypeChange={setPurchaseType}
        onAddToCart={handleAddToCart}
      />

      {/* Calendar Section */}
      <ProtocolCalendar
        protocolId={protocolId as ProtocolId}
        selectedTier={selectedTier}
      />

      {/* Benefits Section */}
      <ProtocolBenefits protocolId={protocolId as ProtocolId} />

      {/* FAQ Section */}
      <ProtocolFAQ protocolId={protocolId as ProtocolId} />

      {/* Other Protocols CTA */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Explore Other Protocols
            </h2>
            <p className="font-commentary text-xl">find your perfect match</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {validProtocolIds
              .filter((id) => id !== protocolId)
              .map((id) => {
                const otherProtocol = protocolContent[id];
                return (
                  <a
                    key={id}
                    href={`/protocol/${id}`}
                    className="neo-box p-4 hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all"
                  >
                    <h3 className="font-bold">{otherProtocol.name}</h3>
                    <p className="font-clinical text-xs opacity-70 mt-1">
                      {otherProtocol.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {otherProtocol.bestFor.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-current/10 rounded-full font-clinical text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                );
              })}
          </div>

          {/* Individual Formulas CTA */}
          <div className="mt-12 neo-box p-8 text-center">
            <h3 className="text-xl font-bold mb-2">
              Prefer Individual Formulas?
            </h3>
            <p className="font-commentary text-lg mb-6">
              not ready for a protocol? try our trial packs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/formula-01"
                className="neo-button-outline px-6 py-3 font-semibold flex items-center justify-center gap-2"
              >
                <span className="w-3 h-3 bg-[#AAB9BC] rounded-sm"></span>
                Formula 01
              </a>
              <a
                href="/formula-02"
                className="neo-button-outline px-6 py-3 font-semibold flex items-center justify-center gap-2"
              >
                <span className="w-3 h-3 bg-amber-500 rounded-sm"></span>
                Formula 02
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
                Start Protocol
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
        protocolId={protocolId as ProtocolId}
        selectedTier={selectedTier}
        onTierSelect={setSelectedTier}
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
                  <p className="font-commentary text-sm mt-2">
                    add some brain fuel!
                  </p>
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

