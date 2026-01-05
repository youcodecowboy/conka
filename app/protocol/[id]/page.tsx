"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navigation from "@/app/components/Navigation";
import {
  ProtocolHero,
  ProtocolHeroMobile,
  ProtocolCalendar,
  ProtocolBenefits,
  ProtocolFAQ,
  ProtocolStruggleMobile,
  ProtocolCalendarSectionMobile,
  ProtocolCaseStudiesMobile,
} from "@/app/components/protocol";
import { StickyPurchaseFooter, StickyPurchaseFooterMobile } from "@/app/components/product";
import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
} from "@/app/lib/productData";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useCart } from "@/app/context/CartContext";
import { getProtocolVariantId } from "@/app/lib/shopifyProductMapping";

// Valid protocol IDs
const validProtocolIds: ProtocolId[] = ["1", "2", "3", "4"];

export default function ProtocolPage() {
  const params = useParams();
  const router = useRouter();
  const protocolId = params.id as string;
  const isMobile = useIsMobile();
  const { addToCart } = useCart();

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

  const handleAddToCart = async () => {
    const variantData = getProtocolVariantId(protocolId as ProtocolId, selectedTier, purchaseType);
    if (variantData?.variantId) {
      // Pass selling plan ID for subscription purchases
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId);
    } else {
      console.warn("Variant ID not configured for:", { protocol: protocolId, tier: selectedTier, type: purchaseType });
    }
  };

  // Mobile version
  if (isMobile) {
    return (
      <div
        className="min-h-screen theme-conka-flow"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Navigation />

        <ProtocolHeroMobile
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
          onTierSelect={setSelectedTier}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCart}
        />

        {/* What do you struggle with? */}
        <ProtocolStruggleMobile protocolId={protocolId as ProtocolId} />

        {/* Full Calendar Section with Buy Options */}
        <ProtocolCalendarSectionMobile
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
          onTierSelect={setSelectedTier}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCart}
        />

        {/* Case Studies - Protocol Specific */}
        <ProtocolCaseStudiesMobile protocolId={protocolId as ProtocolId} />

        {/* Other Protocols - Simplified */}
        <section className="px-4 py-8">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold mb-1">Explore Other Protocols</h2>
            <p className="font-commentary text-sm opacity-70">find your perfect match</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {validProtocolIds
              .filter((id) => id !== protocolId)
              .slice(0, 2)
              .map((id) => {
                const otherProtocol = protocolContent[id];
                return (
                  <a
                    key={id}
                    href={`/protocol/${id}`}
                    className="neo-box p-3"
                  >
                    <h3 className="font-bold text-sm">{otherProtocol.name}</h3>
                    <p className="font-clinical text-xs opacity-70 mt-1">
                      {otherProtocol.subtitle}
                    </p>
                  </a>
                );
              })}
          </div>

          {/* Individual Formulas CTA */}
          <div className="mt-6 neo-box p-4 text-center">
            <h3 className="font-bold text-sm mb-2">Prefer Individual Formulas?</h3>
            <div className="flex gap-3">
              <a
                href="/conka-flow"
                className="flex-1 neo-button-outline px-3 py-2 font-semibold text-xs flex items-center justify-center gap-1"
              >
                <span className="w-2 h-2 bg-[#2563eb] rounded-sm"></span>
                Conka Flow
              </a>
              <a
                href="/conka-clarity"
                className="flex-1 neo-button-outline px-3 py-2 font-semibold text-xs flex items-center justify-center gap-1"
              >
                <span className="w-2 h-2 bg-amber-500 rounded-sm"></span>
                Conka Clarity
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 pb-28 border-t-2 border-current/10">
          <div className="flex flex-col gap-6">
            {/* Logo & Nav */}
            <div className="flex flex-col gap-3">
              <a href="/" className="flex items-center hover:opacity-70 transition-all">
                <Image
                  src="/conka.png"
                  alt="Conka logo"
                  width={90}
                  height={30}
                  className="h-6 w-auto"
                />
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
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
          purchaseType={purchaseType}
          onAddToCart={handleAddToCart}
        />

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
      <Navigation />

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
                href="/conka-flow"
                className="neo-button-outline px-6 py-3 font-semibold flex items-center justify-center gap-2"
              >
                <span className="w-3 h-3 bg-[#2563eb] rounded-sm"></span>
                Conka Flow
              </a>
              <a
                href="/conka-clarity"
                className="neo-button-outline px-6 py-3 font-semibold flex items-center justify-center gap-2"
              >
                <span className="w-3 h-3 bg-amber-500 rounded-sm"></span>
                Conka Clarity
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

    </div>
  );
}
