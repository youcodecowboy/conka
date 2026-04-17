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
      <div className="min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
        <Navigation />

        {/* ===== SECTION 1: HERO ===== */}
        <section
          className="brand-section brand-hero-first brand-bg-white"
          aria-label="Product hero"
        >
          <div className="brand-track">
            <ProtocolHeroMobile
              protocolId={selectedProtocolId}
              selectedTier={selectedTier}
              onTierSelect={setSelectedTier}
              purchaseType={purchaseType}
              onPurchaseTypeChange={setPurchaseType}
              onAddToCart={handleAddToCartFromHero}
            />
          </div>
        </section>

        {/* ===== SECTION 2: WHY TWO FORMULAS ===== */}
        <section
          className="brand-section brand-bg-tint"
          aria-labelledby="why-two-formulas-heading"
        >
          <div className="brand-track">
            <div className="text-center" style={{ marginBottom: "var(--brand-text-gap)" }}>
              <h2
                id="why-two-formulas-heading"
                className="brand-h2 mb-0 text-3xl md:text-4xl font-bold"
              >
                {protocolSynergyCopy.framing.headline}
              </h2>
              <p className="brand-caption text-xl md:text-2xl opacity-80 hidden md:block mt-3">
                {protocolSynergyCopy.framing.subheadline}
              </p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: CYCLE TRAP (self-contained, owns bg) ===== */}
        <CycleTrap
          protocolId={selectedProtocolId}
          initialNode={whyEntryNodeIndex}
          selectedSymptomId={selectedSymptom}
          onSelectSymptom={setSelectedSymptom}
        />

        {/* ===== SECTION 4: WAY OUT ===== */}
        <section
          className="brand-section brand-bg-white"
          aria-label="But there's a way out"
        >
          <div className="brand-track">
            <div className="text-center">
              <h2 className="brand-h2 text-2xl md:text-3xl font-bold mb-3">
                But there's a way out.
              </h2>
              <h3 className="brand-h3 text-xl md:text-2xl font-bold">
                Together: Break the Cycle
              </h3>
            </div>
          </div>
        </section>

        {/* ===== SECTION 5: CYCLE BREAK (self-contained, owns bg) ===== */}
        <CycleBreak />

        {/* ===== SECTION 6: TRANSFORMATION ===== */}
        <section
          className="brand-section brand-bg-tint"
          aria-label="The outcome"
        >
          <div className="brand-track">
            <CycleTransformation protocolId={selectedProtocolId} />
          </div>
        </section>

        {/* ===== SECTION 7: TESTIMONIALS ===== */}
        {protocolTestimonials.length > 0 && (
          <section
            className="brand-section brand-bg-white"
            aria-label="Customer reviews"
          >
            <div className="brand-track">
              <Testimonials
                testimonials={protocolTestimonials}
                autoScrollOnly
              />
            </div>
          </section>
        )}

        {/* ===== SECTION 8: EXPECTED RESULTS ===== */}
        <section
          className="brand-section brand-bg-tint"
          aria-label="Expected results"
        >
          <div className="brand-track">
            <WhatToExpectTimeline
              productId={selectedProtocolId}
              sectionTitle="Expected results"
            />
          </div>
        </section>

        {/* ===== SECTION 9: CALENDAR ===== */}
        <section
          className="brand-section brand-bg-white"
          aria-label="How to follow your protocol"
        >
          <div className="brand-track">
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

        {/* ===== SECTION 10: CASE STUDIES ===== */}
        <section
          className="brand-section brand-bg-tint"
          aria-label="Case studies"
        >
          <div className="brand-track">
            <FormulaCaseStudiesMobile productId={selectedProtocolId} />
          </div>
        </section>

        {/* ===== SECTION 11: FAQ ===== */}
        <section
          className="brand-section brand-bg-white"
          aria-label="FAQ"
        >
          <div className="brand-track">
            <ProtocolFAQ protocolId={selectedProtocolId} />
          </div>
        </section>

        {/* ===== SECTION 12: EXPLORE ===== */}
        <section
          className="brand-section brand-bg-tint"
          aria-label="Explore other protocols and formulas"
        >
          <div className="brand-track">
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

        />
      </div>
    );
  }

  // Desktop version
  return (
    <div className="min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
      <Navigation />

      {/* ===== SECTION 1: HERO ===== */}
      <section
        className="brand-section brand-hero-first brand-bg-white"
        aria-label="Product hero"
      >
        <div className="brand-track">
          <ProtocolHero
            protocolId={selectedProtocolId}
            selectedTier={selectedTier}
            onTierSelect={setSelectedTier}
            purchaseType={purchaseType}
            onPurchaseTypeChange={setPurchaseType}
            onAddToCart={handleAddToCartFromHero}
          />
        </div>
      </section>

      {/* ===== SECTION 2: WHY TWO FORMULAS ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-labelledby="why-two-formulas-heading"
      >
        <div className="brand-track">
          <div className="text-center" style={{ marginBottom: "var(--brand-text-gap)" }}>
            <h2
              id="why-two-formulas-heading"
              className="brand-h2 mb-0 text-3xl md:text-4xl font-bold"
            >
              {protocolSynergyCopy.framing.headline}
            </h2>
            <p className="brand-caption text-xl md:text-2xl opacity-80 mt-3">
              {protocolSynergyCopy.framing.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: CYCLE TRAP (self-contained, owns bg) ===== */}
      <CycleTrap
        protocolId={selectedProtocolId}
        initialNode={whyEntryNodeIndex}
        selectedSymptomId={selectedSymptom}
        onSelectSymptom={setSelectedSymptom}
      />

      {/* ===== SECTION 4: WAY OUT ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="But there's a way out"
      >
        <div className="brand-track">
          <div className="text-center">
            <h2 className="brand-h2 text-2xl md:text-3xl font-bold mb-3">
              But there's a way out.
            </h2>
            <h3 className="brand-h3 text-xl md:text-2xl font-bold">
              Together: Break the Cycle
            </h3>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: CYCLE BREAK (self-contained, owns bg) ===== */}
      <CycleBreak />

      {/* ===== SECTION 6: TRANSFORMATION ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="The outcome"
      >
        <div className="brand-track">
          <CycleTransformation protocolId={selectedProtocolId} />
        </div>
      </section>

      {/* ===== SECTION 7: TESTIMONIALS ===== */}
      {protocolTestimonials.length > 0 && (
        <section
          className="brand-section brand-bg-white"
          aria-label="Customer reviews"
        >
          <div className="brand-track">
            <Testimonials
              testimonials={protocolTestimonials}
              autoScrollOnly
            />
          </div>
        </section>
      )}

      {/* ===== SECTION 8: EXPECTED RESULTS ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Expected results"
      >
        <div className="brand-track">
          <WhatToExpectTimeline
            productId={selectedProtocolId}
            sectionTitle="Expected results"
          />
        </div>
      </section>

      {/* ===== SECTION 9: CALENDAR ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="How to follow your protocol"
      >
        <div className="brand-track">
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

      {/* ===== SECTION 10: CASE STUDIES ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Case studies"
      >
        <div className="brand-track">
          <FormulaCaseStudies productId={selectedProtocolId} />
        </div>
      </section>

      {/* ===== SECTION 11: FAQ ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="FAQ"
      >
        <div className="brand-track">
          <ProtocolFAQ protocolId={selectedProtocolId} />
        </div>
      </section>

      {/* ===== SECTION 12: EXPLORE ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Explore other protocols and formulas"
      >
        <div className="brand-track">
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
      />
    </div>
  );
}
