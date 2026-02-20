"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import {
  ProtocolHero,
  ProtocolHeroMobile,
  ProtocolCalendar,
  ProtocolCalendarMobile,
  ProtocolFAQ,
} from "@/app/components/protocol";
import FormulaCaseStudies, {
  FormulaCaseStudiesMobile,
} from "@/app/components/FormulaCaseStudies";
import CycleTrap from "@/app/components/protocol/why/CycleTrap";
import CycleBreak from "@/app/components/protocol/why/CycleBreak";
import CycleTransformation from "@/app/components/protocol/why/CycleTransformation";
import { symptomEntries } from "@/app/lib/protocolWhyCopy";
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
import WhatToExpectTimeline from "@/app/components/product/WhatToExpectTimeline";
import ProductGrid from "@/app/components/home/ProductGrid";
import type { ProtocolVariant } from "@/app/components/home/ProtocolVariantSelector";
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

// Disable the current protocol variant in the ProductGrid cross-sell so we don't show the same card
function getDisabledProtocolVariantsForPage(protocolId: string): ProtocolVariant[] {
  switch (protocolId) {
    case "1":
      return ["flow-heavy"];
    case "2":
      return ["clear-heavy"];
    case "3":
    case "4":
      return ["balance"];
    default:
      return [];
  }
}

export default function ProtocolPage() {
  const params = useParams();
  const router = useRouter();
  const protocolId = params.id as string;
  const isMobile = useIsMobile();
  const { addToCart } = useCart();

  const [selectedTier, setSelectedTier] = useState<ProtocolTier>("pro");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  const whyEntryNodeIndex = useMemo(
    () => symptomEntries.find((s) => s.id === selectedSymptom)?.entryNode ?? 0,
    [selectedSymptom],
  );

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
      "subscription",
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
        <section
          className="premium-section-luxury premium-hero-first bg-white"
          aria-label="Product hero"
        >
          <div className="premium-track">
            <ProtocolHeroMobile
              protocolId={protocolId as ProtocolId}
              selectedTier={selectedTier}
              onTierSelect={setSelectedTier}
              purchaseType={purchaseType}
              onPurchaseTypeChange={setPurchaseType}
              onAddToCart={handleAddToCartFromHero}
            />
          </div>
        </section>

        <div className="premium-pdp">
          <section
            className="premium-section-luxury premium-bg-bone"
            aria-labelledby="why-two-formulas-heading"
          >
            <div className="premium-track">
              <div
                className="text-center"
                style={{ marginBottom: "var(--space-text-gap)" }}
              >
                <h2
                  id="why-two-formulas-heading"
                  className="premium-section-heading text-3xl md:text-4xl font-bold"
                  style={{
                    letterSpacing: "var(--letter-spacing-premium-title)",
                  }}
                >
                  {protocolSynergyCopy.framing.headline}
                </h2>
                <p className="premium-annotation text-xl md:text-2xl opacity-80 hidden md:block mt-3">
                  {protocolSynergyCopy.framing.subheadline}
                </p>
              </div>
            </div>
          </section>

          <CycleTrap
            protocolId={protocolId as ProtocolId}
            initialNode={whyEntryNodeIndex}
            selectedSymptomId={selectedSymptom}
            onSelectSymptom={setSelectedSymptom}
          />

          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
            aria-label="But there's a way out"
          >
            <div className="premium-track">
              <div className="text-center">
                <h2
                  className="premium-section-heading text-2xl md:text-3xl font-bold mb-3"
                  style={{
                    letterSpacing: "var(--letter-spacing-premium-title)",
                  }}
                >
                  But there's a way out.
                </h2>
                <h3
                  className="premium-section-heading text-xl md:text-2xl font-bold"
                  style={{
                    letterSpacing: "var(--letter-spacing-premium-title)",
                  }}
                >
                  Together: Break the Cycle
                </h3>
              </div>
            </div>
          </section>

          <CycleBreak />

          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
            aria-label="The outcome"
          >
            <div className="premium-track">
              <CycleTransformation protocolId={protocolId as ProtocolId} />
            </div>
          </section>

          {protocolTestimonials.length > 0 && (
            <section
              className="premium-section-luxury"
              style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
            >
              <div className="premium-track">
                <Testimonials
                  testimonials={protocolTestimonials}
                  autoScrollOnly
                />
              </div>
            </section>
          )}

          <section
            className="premium-section-luxury premium-bg-bone"
            aria-label="Expected results"
          >
            <div className="premium-track">
              <WhatToExpectTimeline
                productId={protocolId as ProtocolId}
                sectionTitle="Expected results"
              />
            </div>
          </section>

          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
            aria-label="How to follow your protocol"
          >
            <div className="premium-track">
              <ProtocolCalendarMobile
                protocolId={protocolId as ProtocolId}
                selectedTier={selectedTier}
                onTierSelect={setSelectedTier}
                availableTiers={
                  protocolContent[protocolId as ProtocolId].availableTiers
                }
              />
            </div>
          </section>

          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
            aria-label="Case studies"
          >
            <div className="premium-track">
              <FormulaCaseStudiesMobile productId={protocolId as ProtocolId} />
            </div>
          </section>

          <section
            className="premium-section-luxury premium-bg-bone"
            aria-label="FAQ"
          >
            <div className="premium-track">
              <ProtocolFAQ protocolId={protocolId as ProtocolId} />
            </div>
          </section>

          <section
            className="premium-section-luxury bg-white"
            aria-label="Explore other protocols and formulas"
          >
            <div className="premium-track">
              <ProductGrid disabledProtocolVariants={getDisabledProtocolVariantsForPage(protocolId)} />
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
      <Navigation />
      <section
        className="premium-section-luxury premium-hero-first bg-white"
        aria-label="Product hero"
      >
        <div className="premium-track">
          <ProtocolHero
            protocolId={protocolId as ProtocolId}
            selectedTier={selectedTier}
            onTierSelect={setSelectedTier}
            purchaseType={purchaseType}
            onPurchaseTypeChange={setPurchaseType}
            onAddToCart={handleAddToCartFromHero}
          />
        </div>
      </section>

      <div className="premium-pdp">
        <section
          className="premium-section-luxury premium-bg-bone"
          aria-labelledby="why-two-formulas-heading"
        >
          <div className="premium-track">
            <div
              className="text-center"
              style={{ marginBottom: "var(--space-text-gap)" }}
            >
              <h2
                id="why-two-formulas-heading"
                className="premium-section-heading text-3xl md:text-4xl font-bold"
                style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
              >
                {protocolSynergyCopy.framing.headline}
              </h2>
              <p className="premium-annotation text-xl md:text-2xl opacity-80 mt-3">
                {protocolSynergyCopy.framing.subheadline}
              </p>
            </div>
          </div>
        </section>

        <CycleTrap
          protocolId={protocolId as ProtocolId}
          initialNode={whyEntryNodeIndex}
          selectedSymptomId={selectedSymptom}
          onSelectSymptom={setSelectedSymptom}
        />

        <section
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
          aria-label="But there's a way out"
        >
          <div className="premium-track">
            <div className="text-center">
              <h2
                className="premium-section-heading text-2xl md:text-3xl font-bold mb-3"
                style={{
                  letterSpacing: "var(--letter-spacing-premium-title)",
                }}
              >
                But there's a way out.
              </h2>
              <h3
                className="premium-section-heading text-xl md:text-2xl font-bold"
                style={{
                  letterSpacing: "var(--letter-spacing-premium-title)",
                }}
              >
                Together: Break the Cycle
              </h3>
            </div>
          </div>
        </section>

        <CycleBreak />

        <section
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
          aria-label="The outcome"
        >
          <div className="premium-track">
            <CycleTransformation protocolId={protocolId as ProtocolId} />
          </div>
        </section>

        {protocolTestimonials.length > 0 && (
          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
          >
            <div className="premium-track">
              <Testimonials
                testimonials={protocolTestimonials}
                autoScrollOnly
              />
            </div>
          </section>
        )}

        <section
          className="premium-section-luxury premium-bg-bone"
          aria-label="Expected results"
        >
          <div className="premium-track">
            <WhatToExpectTimeline
              productId={protocolId as ProtocolId}
              sectionTitle="Expected results"
            />
          </div>
        </section>

        <section
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
          aria-label="How to follow your protocol"
        >
          <div className="premium-track">
            <ProtocolCalendar
              protocolId={protocolId as ProtocolId}
              selectedTier={selectedTier}
              onTierSelect={setSelectedTier}
              availableTiers={
                protocolContent[protocolId as ProtocolId].availableTiers
              }
            />
          </div>
        </section>

        <section
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
          aria-label="Case studies"
        >
          <div className="premium-track">
            <FormulaCaseStudies productId={protocolId as ProtocolId} />
          </div>
        </section>

        <section
          className="premium-section-luxury premium-bg-bone"
          aria-label="FAQ"
        >
          <div className="premium-track">
            <ProtocolFAQ protocolId={protocolId as ProtocolId} />
          </div>
        </section>

        <section
          className="premium-section-luxury bg-white"
          aria-label="Explore other protocols and formulas"
        >
          <div className="premium-track">
            <ProductGrid disabledProtocolVariants={getDisabledProtocolVariantsForPage(protocolId)} />
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
