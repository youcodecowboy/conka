"use client";

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import ScienceHero from "@/app/components/science/ScienceHero";
import ScienceQuote from "@/app/components/science/ScienceQuote";
import ScienceAdaptogens from "@/app/components/science/ScienceAdaptogens";
import SciencePillars from "@/app/components/science/SciencePillars";
import SynergyChart from "@/app/components/science/SynergyChart";
import ScienceDifferent from "@/app/components/science/ScienceDifferent";
import EvidenceSummary from "@/app/components/science/EvidenceSummary";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function SciencePage() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <Navigation />

      {isMobile === undefined ? (
        <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="font-clinical text-sm opacity-50">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero */}
          <section
            className="premium-section-luxury premium-hero-first premium-section-reduced-bottom premium-bg-bone"
            aria-label="Science hero"
          >
            <div className="premium-track">
              <ScienceHero isMobile={!!isMobile} />
            </div>
          </section>

          {/* Quote */}
          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
            aria-label="Research philosophy"
          >
            <div className="premium-track">
              <ScienceQuote isMobile={!!isMobile} />
            </div>
          </section>

          {/* What Are Adaptogens */}
          <section
            className="premium-section-luxury premium-bg-bone"
            aria-label="What are adaptogens"
          >
            <div className="premium-track">
              <ScienceAdaptogens isMobile={!!isMobile} />
            </div>
          </section>

          {/* Five Pillars */}
          <section
            className="premium-section-luxury text-white"
            style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
            aria-label="The five pillars"
          >
            <div className="premium-track">
              <SciencePillars isMobile={!!isMobile} />
            </div>
          </section>

          {/* Synergy Chart */}
          <section
            className="premium-section-luxury"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
            aria-label="Formula synergy"
          >
            <div className="premium-track">
              <SynergyChart isMobile={!!isMobile} />
            </div>
          </section>

          {/* How We're Different */}
          <section
            className="premium-section-luxury premium-bg-bone"
            aria-label="What makes CONKA different"
          >
            <div className="premium-track">
              <ScienceDifferent isMobile={!!isMobile} />
            </div>
          </section>

          {/* Evidence Summary */}
          <section
            className="premium-section-luxury premium-bg-ink text-white"
            aria-label="Evidence-based formulation"
          >
            <div className="premium-track">
              <EvidenceSummary isMobile={!!isMobile} />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
