"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
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

const DEFAULT_PROTOCOL_ID: ProtocolId = "3";

export default function ProtocolPage() {
  const params = useParams();
  const router = useRouter();
  const idFromParams = params.id as string;
  const isMobile = useIsMobile();
  const { addToCart } = useCart();

  const [selectedProtocolId, setSelectedProtocolId] = useState<ProtocolId>(() =>
    validProtocolIds.includes(idFromParams as ProtocolId)
      ? (idFromParams as ProtocolId)
      : DEFAULT_PROTOCOL_ID,
  );
  const [selectedTier, setSelectedTier] = useState<ProtocolTier>("pro");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  const whyEntryNodeIndex = useMemo(
    () => symptomEntries.find((s) => s.id === selectedSymptom)?.entryNode ?? 0,
    [selectedSymptom],
  );

  // Validate protocol ID from URL and redirect invalid to Balance
  useEffect(() => {
    if (!validProtocolIds.includes(idFromParams as ProtocolId)) {
      router.push("/protocol/3");
    }
  }, [idFromParams, router]);

  // Sync selected protocol from URL when navigating (e.g. back/forward or direct link)
  useEffect(() => {
    if (validProtocolIds.includes(idFromParams as ProtocolId)) {
      setSelectedProtocolId(idFromParams as ProtocolId);
    }
  }, [idFromParams]);

  const protocol = protocolContent[selectedProtocolId];

  // Set default tier based on protocol (Protocol 4 doesn't have starter)
  useEffect(() => {
    if (selectedProtocolId === "4" && selectedTier === "starter") {
      setSelectedTier("pro");
    }
  }, [selectedProtocolId, selectedTier]);

  const handleProtocolChange = useCallback(
    (id: ProtocolId) => {
      setSelectedProtocolId(id);
      router.replace(`/protocol/${id}`, { scroll: false });
    },
    [router],
  );

  if (!protocol) {
    return null; // Will redirect
  }

  // Meta ViewContent on initial load and when selected protocol changes
  useEffect(() => {
    const variantData = getProtocolVariantId(
      selectedProtocolId,
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
  }, [selectedProtocolId]);

  // Hero section handler
  const handleAddToCartFromHero = async () => {
    const variantData = getProtocolVariantId(
      selectedProtocolId,
      selectedTier,
      purchaseType,
    );
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId, {
        location: "hero",
        source: getAddToCartSource() === "quiz" ? "quiz" : "protocol_page",
        sessionId: getQuizSessionId(),
      });
    } else {
      console.warn("Variant ID not configured for:", {
        protocol: selectedProtocolId,
        tier: selectedTier,
        type: purchaseType,
      });
    }
  };

  // Sticky footer handler
  const handleAddToCartFromFooter = async () => {
    const variantData = getProtocolVariantId(
      selectedProtocolId,
      selectedTier,
      purchaseType,
    );
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId, {
        location: "sticky_footer",
        source: getAddToCartSource() === "quiz" ? "quiz" : "protocol_page",
        sessionId: getQuizSessionId(),
      });
    } else {
      console.warn("Variant ID not configured for:", {
        protocol: selectedProtocolId,
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
              protocolId={selectedProtocolId}
              selectedTier={selectedTier}
              onTierSelect={setSelectedTier}
              purchaseType={purchaseType}
              onPurchaseTypeChange={setPurchaseType}
              onAddToCart={handleAddToCartFromHero}
              onProtocolChange={handleProtocolChange}
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
            protocolId={selectedProtocolId}
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
              <CycleTransformation protocolId={selectedProtocolId} />
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
                productId={selectedProtocolId}
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
                protocolId={selectedProtocolId}
                selectedTier={selectedTier}
                onTierSelect={setSelectedTier}
                availableTiers={
                  protocolContent[selectedProtocolId].availableTiers
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
              <FormulaCaseStudiesMobile productId={selectedProtocolId} />
            </div>
          </section>

          <section
            className="premium-section-luxury premium-bg-bone"
            aria-label="FAQ"
          >
            <div className="premium-track">
              <ProtocolFAQ protocolId={selectedProtocolId} />
            </div>
          </section>

          <section
            className="premium-section-luxury bg-white"
            aria-label="Explore other protocols and formulas"
          >
            <div className="premium-track">
              <ProductGrid exclude={["protocol"]} />
            </div>
          </section>

          <Footer />

          <StickyPurchaseFooterMobile
            protocolId={selectedProtocolId}
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
            protocolId={selectedProtocolId}
            selectedTier={selectedTier}
            onTierSelect={setSelectedTier}
            purchaseType={purchaseType}
            onPurchaseTypeChange={setPurchaseType}
            onAddToCart={handleAddToCartFromHero}
            onProtocolChange={handleProtocolChange}
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
          protocolId={selectedProtocolId}
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
            <CycleTransformation protocolId={selectedProtocolId} />
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
              productId={selectedProtocolId}
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
              protocolId={selectedProtocolId}
              selectedTier={selectedTier}
              onTierSelect={setSelectedTier}
              availableTiers={
                protocolContent[selectedProtocolId].availableTiers
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
            <FormulaCaseStudies productId={selectedProtocolId} />
          </div>
        </section>

        <section
          className="premium-section-luxury premium-bg-bone"
          aria-label="FAQ"
        >
          <div className="premium-track">
            <ProtocolFAQ protocolId={selectedProtocolId} />
          </div>
        </section>

        <section
          className="premium-section-luxury bg-white"
          aria-label="Explore other protocols and formulas"
        >
          <div className="premium-track">
            <ProductGrid exclude={["protocol"]} />
          </div>
        </section>

        <Footer />

        <StickyPurchaseFooter
          protocolId={selectedProtocolId}
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
