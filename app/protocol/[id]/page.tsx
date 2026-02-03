"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
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
import {
  StickyPurchaseFooter,
  StickyPurchaseFooterMobile,
} from "@/app/components/product";
import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
} from "@/app/lib/productData";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useCart } from "@/app/context/CartContext";
import { getProtocolVariantId } from "@/app/lib/shopifyProductMapping";
import { getAddToCartSource, getQuizSessionId } from "@/app/lib/analytics";

// Valid protocol IDs
const validProtocolIds: ProtocolId[] = ["1", "2", "3", "4"];

export default function ProtocolPage() {
  const params = useParams();
  const router = useRouter();
  const protocolId = params.id as string;
  const isMobile = useIsMobile();
  const { addToCart } = useCart();

  const [selectedTier, setSelectedTier] = useState<ProtocolTier>("pro");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");

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

  // Hero section handler
  const handleAddToCartFromHero = async () => {
    const variantData = getProtocolVariantId(
      protocolId as ProtocolId,
      selectedTier,
      purchaseType,
    );
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId, {
        location: "hero",
        source: getAddToCartSource(),
        sessionId: getQuizSessionId(),
      });
    } else {
      console.warn("Variant ID not configured for:", {
        protocol: protocolId,
        tier: selectedTier,
        type: purchaseType,
      });
    }
  };

  // Sticky footer handler
  const handleAddToCartFromFooter = async () => {
    const variantData = getProtocolVariantId(
      protocolId as ProtocolId,
      selectedTier,
      purchaseType,
    );
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId, {
        location: "sticky_footer",
        source: getAddToCartSource(),
        sessionId: getQuizSessionId(),
      });
    } else {
      console.warn("Variant ID not configured for:", {
        protocol: protocolId,
        tier: selectedTier,
        type: purchaseType,
      });
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
          onAddToCart={handleAddToCartFromHero}
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
          onAddToCart={handleAddToCartFromHero}
        />

        {/* Case Studies - Protocol Specific */}
        <ProtocolCaseStudiesMobile protocolId={protocolId as ProtocolId} />

        {/* Other Protocols - Simplified */}
        <section className="px-4 py-8">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold mb-1">Explore Other Protocols</h2>
            <p className="font-commentary text-sm opacity-70">
              find your perfect match
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {validProtocolIds
              .filter((id) => id !== protocolId)
              .slice(0, 2)
              .map((id) => {
                const otherProtocol = protocolContent[id];
                return (
                  <a key={id} href={`/protocol/${id}`} className="neo-box p-3">
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
            <h3 className="font-bold text-sm mb-2">
              Prefer Individual Formulas?
            </h3>
            <div className="flex gap-3">
              <a
                href="/conka-flow"
                className="flex-1 neo-button-outline px-3 py-2 font-semibold text-xs flex items-center justify-center gap-1"
              >
                <span className="w-2 h-2 bg-[#2563eb] rounded-sm"></span>
                CONKA Flow
              </a>
              <a
                href="/conka-clarity"
                className="flex-1 neo-button-outline px-3 py-2 font-semibold text-xs flex items-center justify-center gap-1"
              >
                <span className="w-2 h-2 bg-amber-500 rounded-sm"></span>
                CONKA Clear
              </a>
            </div>
          </div>
        </section>

        <Footer />

        <StickyPurchaseFooterMobile
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
          purchaseType={purchaseType}
          onAddToCart={handleAddToCartFromFooter}
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
        onAddToCart={handleAddToCartFromHero}
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
                CONKA Flow
              </a>
              <a
                href="/conka-clarity"
                className="neo-button-outline px-6 py-3 font-semibold flex items-center justify-center gap-2"
              >
                <span className="w-3 h-3 bg-amber-500 rounded-sm"></span>
                CONKA Clear
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Sticky Purchase Footer */}
      <StickyPurchaseFooter
        protocolId={protocolId as ProtocolId}
        selectedTier={selectedTier}
        onTierSelect={setSelectedTier}
        purchaseType={purchaseType}
        onPurchaseTypeChange={setPurchaseType}
        onAddToCart={handleAddToCartFromFooter}
      />
    </div>
  );
}
