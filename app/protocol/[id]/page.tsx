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
import { trackMetaViewContent, toContentId } from "@/app/lib/metaPixel";

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

  // Meta ViewContent (once per page view)
  useEffect(() => {
    if (!validProtocolIds.includes(protocolId as ProtocolId)) return;
    const variantData = getProtocolVariantId(
      protocolId as ProtocolId,
      "pro",
      "subscription"
    );
    if (variantData?.variantId) {
      trackMetaViewContent({
        content_ids: [toContentId(variantData.variantId)],
        content_name: protocol.name,
        content_type: "product",
      });
    }
  }, [protocolId]);

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
        <div className="premium-pdp">
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
        <section className="premium-section px-4 py-8">
          <div className="premium-container">
            <div className="text-center mb-4">
              <h2 className="premium-section-heading text-lg font-bold mb-1">Explore Other Protocols</h2>
              <p className="premium-annotation text-sm opacity-70">
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
                    <a key={id} href={`/protocol/${id}`} className="premium-box p-3 block">
                      <h3 className="font-bold text-sm">{otherProtocol.name}</h3>
                      <p className="premium-data text-xs opacity-70 mt-1">
                        {otherProtocol.subtitle}
                      </p>
                    </a>
                  );
                })}
            </div>

            {/* Individual Formulas CTA */}
            <div className="mt-6 premium-box p-4 text-center">
              <h3 className="premium-section-heading text-sm font-bold mb-2">
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
          </div>
        </section>

        <Footer />

        <StickyPurchaseFooterMobile
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
          onTierSelect={setSelectedTier}
          purchaseType={purchaseType}
          onAddToCart={handleAddToCartFromFooter}
          usePremium
        />
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div
      className="min-h-screen theme-conka-flow lg:pt-8"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Navigation */}
      <Navigation />
      <div className="premium-pdp">
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
      <section className="premium-section">
        <ProtocolCalendar
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
        />
      </section>

      {/* Benefits Section */}
      <section className="premium-section">
        <ProtocolBenefits protocolId={protocolId as ProtocolId} />
      </section>

      {/* FAQ Section */}
      <section className="premium-section">
        <ProtocolFAQ protocolId={protocolId as ProtocolId} />
      </section>

      {/* Other Protocols CTA */}
      <section className="premium-section px-6 md:px-16 py-24">
        <div className="premium-container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="premium-section-heading text-2xl md:text-3xl font-bold mb-2">
              Explore Other Protocols
            </h2>
            <p className="premium-annotation text-xl">find your perfect match</p>
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
                    className="premium-box p-4 block transition-all hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
                  >
                    <h3 className="font-bold">{otherProtocol.name}</h3>
                    <p className="premium-data text-xs opacity-70 mt-1">
                      {otherProtocol.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {otherProtocol.bestFor.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-current/10 rounded-full premium-data text-xs"
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
          <div className="mt-12 premium-box p-8 text-center">
            <h3 className="premium-section-heading text-xl font-bold mb-2">
              Prefer Individual Formulas?
            </h3>
            <p className="premium-annotation text-lg mb-6">
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
        usePremium
      />
      </div>
    </div>
  );
}
