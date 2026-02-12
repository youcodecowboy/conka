"use client";

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
import ProtocolCalendar from "./ProtocolCalendar";
import WhatToExpectTimeline from "@/app/components/product/WhatToExpectTimeline";
import Testimonials from "@/app/components/testimonials/Testimonials";
import { getSiteTestimonialsProtocol } from "@/app/lib/testimonialsFilter";
import ProtocolCalendarMobile from "./ProtocolCalendarMobile";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";
import ProtocolWhySection from "./why/ProtocolWhySection";
import ProtocolFAQ from "./ProtocolFAQ";
import ProtocolStruggleMobile from "./ProtocolStruggleMobile";
import ProtocolCaseStudiesMobile from "./ProtocolCaseStudiesMobile";

interface ProtocolPDPSectionsProps {
  protocolId: ProtocolId;
  selectedTier: ProtocolTier;
  onTierSelect: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
  validProtocolIds: ProtocolId[];
  isMobile: boolean;
}

export default function ProtocolPDPSections({
  protocolId,
  selectedTier,
  onTierSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
  validProtocolIds,
  isMobile,
}: ProtocolPDPSectionsProps) {
  const protocolTestimonials = getSiteTestimonialsProtocol();

  if (isMobile) {
    return (
      <>
        <ProtocolStruggleMobile protocolId={protocolId} />

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
        <ProtocolWhySection protocolId={protocolId} />

        <ProtocolCalendarMobile
          protocolId={protocolId}
          selectedTier={selectedTier}
          onTierSelect={onTierSelect}
          availableTiers={protocolContent[protocolId].availableTiers}
        />

        <WhatToExpectTimeline
          productId={protocolId}
          sectionTitle="Expected results"
        />

        {protocolTestimonials.length > 0 && (
          <Testimonials testimonials={protocolTestimonials} autoScrollOnly />
        )}

        <section className="premium-section">
          <ProtocolCaseStudiesMobile protocolId={protocolId} />
        </section>

        <section className="premium-section">
          <ProtocolFAQ protocolId={protocolId} />
        </section>

        {/* Cross-sell — mobile */}
        <section className="premium-section px-4 py-8">
          <div className="premium-container">
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
      </>
    );
  }

  // Desktop
  return (
    <>
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
      <ProtocolWhySection protocolId={protocolId} />

      <ProtocolCalendar
        protocolId={protocolId}
        selectedTier={selectedTier}
        onTierSelect={onTierSelect}
        availableTiers={protocolContent[protocolId].availableTiers}
      />

      <WhatToExpectTimeline
        productId={protocolId}
        sectionTitle="Expected results"
      />
      {protocolTestimonials.length > 0 && (
        <section className="premium-section" aria-label="What others say">
          <Testimonials testimonials={protocolTestimonials} autoScrollOnly />
        </section>
      )}

      <section className="premium-section">
        <ProtocolFAQ protocolId={protocolId} />
      </section>

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
    </>
  );
}
