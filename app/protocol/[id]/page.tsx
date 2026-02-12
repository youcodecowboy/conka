"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import {
  ProtocolHero,
  ProtocolHeroMobile,
  ProtocolCalendar,
  ProtocolCalendarMobile,
  ProtocolFAQ,
  ProtocolStruggleMobile,
} from "@/app/components/protocol";
import FormulaCaseStudies, { FormulaCaseStudiesMobile } from "@/app/components/FormulaCaseStudies";
import ProtocolWhySection from "@/app/components/protocol/why/ProtocolWhySection";
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
import { protocolSelectorData } from "@/app/components/shop/protocolSelectorData";
import ProtocolCard from "@/app/components/shop/ProtocolCard";
import ProtocolCardMobile from "@/app/components/shop/ProtocolCardMobile";
import FormulasShowcase from "@/app/components/shop/FormulasShowcase";
import WhatToExpectTimeline from "@/app/components/product/WhatToExpectTimeline";
import Testimonials from "@/app/components/testimonials/Testimonials";
import { getSiteTestimonialsProtocol } from "@/app/lib/testimonialsFilter";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";
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

  const protocolTestimonials = getSiteTestimonialsProtocol();

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

          <ProtocolStruggleMobile protocolId={protocolId as ProtocolId} />

          {/* Why Two Formulas Section */}
          <section
            className="premium-section bg-[var(--color-surface)]"
            aria-labelledby="why-two-formulas-heading"
          >
            <div className="premium-container max-w-6xl mx-auto px-6 md:px-16 pb-10">
              <div className="text-center">
                <h2
                  id="why-two-formulas-heading"
                  className="premium-section-heading text-3xl md:text-4xl font-bold mb-3"
                >
                  {protocolSynergyCopy.framing.headline}
                </h2>
                <p className="premium-annotation text-xl md:text-2xl opacity-80">
                  {protocolSynergyCopy.framing.subheadline}
                </p>
              </div>
            </div>
          </section>

          <ProtocolWhySection protocolId={protocolId as ProtocolId} />

          <ProtocolCalendarMobile
            protocolId={protocolId as ProtocolId}
            selectedTier={selectedTier}
            onTierSelect={setSelectedTier}
            availableTiers={protocolContent[protocolId as ProtocolId].availableTiers}
          />

          <WhatToExpectTimeline
            productId={protocolId as ProtocolId}
            sectionTitle="Expected results"
          />

          {protocolTestimonials.length > 0 && (
            <Testimonials testimonials={protocolTestimonials} autoScrollOnly />
          )}

          <FormulaCaseStudiesMobile productId={protocolId as ProtocolId} />

          <ProtocolFAQ protocolId={protocolId as ProtocolId} />

          {/* Cross-sell — mobile */}
          <section className="w-full px-3 py-8">
            <div className="w-full">
              <div className="text-center mb-4">
                <h2 className="premium-section-heading text-lg font-bold mb-1">
                  Explore Other Protocols
                </h2>
                <p className="premium-annotation text-sm opacity-70">
                  find your perfect match
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {validProtocolIds
                  .filter((id) => id !== protocolId)
                  .map((id) => (
                    <ProtocolCardMobile
                      key={id}
                      protocol={protocolSelectorData[id]}
                      isFirst={
                        id === validProtocolIds.filter((x) => x !== protocolId)[0]
                      }
                    />
                  ))}
              </div>
              <div className="mt-8">
                <FormulasShowcase />
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
        <ProtocolHero
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
          onTierSelect={setSelectedTier}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCartFromHero}
        />

        {/* Why Two Formulas Section */}
        <section
          className="premium-section bg-[var(--color-surface)]"
          aria-labelledby="why-two-formulas-heading"
        >
          <div className="premium-container max-w-6xl mx-auto px-6 md:px-16 pb-10">
            <div className="text-center">
              <h2
                id="why-two-formulas-heading"
                className="premium-section-heading text-3xl md:text-4xl font-bold mb-3"
              >
                {protocolSynergyCopy.framing.headline}
              </h2>
              <p className="premium-annotation text-xl md:text-2xl opacity-80">
                {protocolSynergyCopy.framing.subheadline}
              </p>
            </div>
          </div>
        </section>

        <ProtocolWhySection protocolId={protocolId as ProtocolId} />

        <ProtocolCalendar
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
          onTierSelect={setSelectedTier}
          availableTiers={protocolContent[protocolId as ProtocolId].availableTiers}
        />

        <WhatToExpectTimeline
          productId={protocolId as ProtocolId}
          sectionTitle="Expected results"
        />

        {protocolTestimonials.length > 0 && (
          <section className="premium-section" aria-label="What others say">
            <Testimonials testimonials={protocolTestimonials} autoScrollOnly />
          </section>
        )}

        <FormulaCaseStudies productId={protocolId as ProtocolId} />

        <ProtocolFAQ protocolId={protocolId as ProtocolId} />

        {/* Cross-sell — desktop */}
        <section className="premium-section px-6 md:px-16 py-24">
          <div className="premium-container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="premium-section-heading text-2xl md:text-3xl font-bold mb-2">
                Explore Other Protocols
              </h2>
              <p className="premium-annotation text-xl">
                find your perfect match
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {validProtocolIds
                .filter((id) => id !== protocolId)
                .map((id) => (
                  <ProtocolCard key={id} protocol={protocolSelectorData[id]} />
                ))}
            </div>
            <div className="mt-12">
              <FormulasShowcase />
            </div>
          </div>
        </section>

        <Footer />

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
