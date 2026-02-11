"use client";

import { ProtocolId, ProtocolTier, PurchaseType, protocolContent } from "@/app/lib/productData";
import ProtocolSectionPlaceholder from "./ProtocolSectionPlaceholder";
import ProtocolCalendar from "./ProtocolCalendar";
import ProtocolCalendarSectionMobile from "./ProtocolCalendarSectionMobile";
import ProtocolBenefits from "./ProtocolBenefits";
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
  if (isMobile) {
    return (
      <>
        <ProtocolStruggleMobile protocolId={protocolId} />

        <ProtocolSectionPlaceholder id="whats-included" title="What's Included" />

        <section className="premium-section">
          <ProtocolCalendarSectionMobile
            protocolId={protocolId}
            selectedTier={selectedTier}
            onTierSelect={onTierSelect}
            purchaseType={purchaseType}
            onPurchaseTypeChange={onPurchaseTypeChange}
            onAddToCart={onAddToCart}
          />
        </section>

        <section className="premium-section">
          <ProtocolBenefits protocolId={protocolId} />
        </section>

        <ProtocolSectionPlaceholder id="flexibility" title="Flexibility" />
        <ProtocolSectionPlaceholder id="expected-results" title="Expected Results" />
        <ProtocolSectionPlaceholder id="comparison" title="Why a Protocol?" />

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
                .slice(0, 2)
                .map((id) => {
                  const otherProtocol = protocolContent[id];
                  return (
                    <a
                      key={id}
                      href={`/protocol/${id}`}
                      className="premium-box p-3 block"
                    >
                      <h3 className="font-bold text-sm">{otherProtocol.name}</h3>
                      <p className="premium-data text-xs opacity-70 mt-1">
                        {otherProtocol.subtitle}
                      </p>
                    </a>
                  );
                })}
            </div>
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
      </>
    );
  }

  // Desktop
  return (
    <>
      <ProtocolSectionPlaceholder id="whats-included" title="What's Included" />

      <section className="premium-section">
        <ProtocolCalendar protocolId={protocolId} selectedTier={selectedTier} />
      </section>

      <section className="premium-section">
        <ProtocolBenefits protocolId={protocolId} />
      </section>

      <ProtocolSectionPlaceholder id="flexibility" title="Flexibility" />
      <ProtocolSectionPlaceholder id="expected-results" title="Expected Results" />
      <ProtocolSectionPlaceholder id="comparison" title="Why a Protocol?" />
      <ProtocolSectionPlaceholder id="social-proof" title="What Others Say" />

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
    </>
  );
}
