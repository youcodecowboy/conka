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
import HomeWhatItDoes from "@/app/components/home/HomeWhatItDoes";
import CaseStudiesDataDriven from "@/app/components/CaseStudiesDataDriven";
import LandingGuarantee from "@/app/components/landing/LandingGuarantee";
import LandingTimeline from "@/app/components/landing/LandingTimeline";
import LandingFAQ from "@/app/components/landing/LandingFAQ";
import ProductGrid from "@/app/components/home/ProductGrid";
import Testimonials from "@/app/components/testimonials/Testimonials";
import { getSiteTestimonialsProtocol } from "@/app/lib/testimonialsFilter";
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

  // Meta ViewContent on initial load and when selected protocol changes
  useEffect(() => {
    if (!protocol) return;
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
  }, [selectedProtocolId, protocol]);

  if (!protocol) {
    return null; // Will redirect
  }

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

  // Shared sections used by both mobile and desktop
  const testimonialSection = protocolTestimonials.length > 0 && (
    <section
      className="brand-section brand-bg-tint"
      aria-label="Customer reviews"
    >
      <div className="brand-track">
        <Testimonials
          testimonials={protocolTestimonials}
          autoScrollOnly
        />
      </div>
    </section>
  );

  const whatItDoesSection = (
    <section
      className="brand-section brand-bg-white"
      aria-label="What CONKA does"
    >
      <div className="brand-track">
        <HomeWhatItDoes hideCTA />
      </div>
    </section>
  );

  const caseStudiesSection = (
    <section
      className="brand-section brand-bg-white"
      aria-label="Clinically validated results"
    >
      <div className="brand-track">
        <CaseStudiesDataDriven ctaLabel="See all case studies" ctaHref="/case-studies" />
      </div>
    </section>
  );

  const guaranteeSection = (
    <section
      className="brand-section brand-bg-white"
      aria-label="Risk-free guarantee"
    >
      <div className="brand-track">
        <LandingGuarantee ctaLabel="Learn more about the CONKA app" ctaHref="/app" />
      </div>
    </section>
  );

  const timelineSection = (
    <section
      className="brand-section brand-bg-tint"
      aria-label="What to expect"
    >
      <div className="brand-track">
        <LandingTimeline hideCTA />
      </div>
    </section>
  );

  const faqSection = (
    <section
      className="brand-section brand-bg-tint"
      aria-label="FAQ"
    >
      <div className="brand-track">
        <LandingFAQ hideCTA />
      </div>
    </section>
  );

  const exploreSection = (
    <section
      className="brand-section brand-bg-white"
      aria-label="Explore other protocols and formulas"
    >
      <div className="brand-track">
        <ProductGrid exclude={["protocol"]} />
      </div>
    </section>
  );

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

        {/* ===== SECTION 2: TESTIMONIALS ===== */}
        {testimonialSection}

        {/* ===== SECTION 3: WHAT CONKA DOES ===== */}
        {whatItDoesSection}

        {/* ===== SECTION 4: CALENDAR ===== */}
        <section
          className="brand-section brand-bg-tint"
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

        {/* ===== SECTION 5: CASE STUDIES ===== */}
        {caseStudiesSection}

        {/* ===== SECTION 6: TIMELINE ===== */}
        {timelineSection}

        {/* ===== SECTION 7: GUARANTEE ===== */}
        {guaranteeSection}

        {/* ===== SECTION 8: FAQ ===== */}
        {faqSection}

        {/* ===== SECTION 9: EXPLORE ===== */}
        {exploreSection}

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

      {/* ===== SECTION 2: TESTIMONIALS ===== */}
      {testimonialSection}

      {/* ===== SECTION 3: WHAT CONKA DOES ===== */}
      {whatItDoesSection}

      {/* ===== SECTION 4: CALENDAR ===== */}
      <section
        className="brand-section brand-bg-tint"
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

      {/* ===== SECTION 5: CASE STUDIES ===== */}
      {caseStudiesSection}

      {/* ===== SECTION 6: TIMELINE ===== */}
      {timelineSection}

      {/* ===== SECTION 7: GUARANTEE ===== */}
      {guaranteeSection}

      {/* ===== SECTION 8: FAQ ===== */}
      {faqSection}

      {/* ===== SECTION 9: EXPLORE ===== */}
      {exploreSection}

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
