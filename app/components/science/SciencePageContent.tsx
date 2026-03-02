"use client";

import ScienceHero from "./ScienceHero";
import ScienceQuote from "./ScienceQuote";
import ScienceAdaptogens from "./ScienceAdaptogens";
import SciencePillars from "./SciencePillars";
import SynergyChart from "./SynergyChart";
import ScienceDifferent from "./ScienceDifferent";
import EvidenceSummary from "./EvidenceSummary";

interface SciencePageContentProps {
  isMobile: boolean;
}

/**
 * Renders the science sections: each section is wrapped in premium-section-luxury + premium-track here
 * so the parent (Professionals page) can drop this in without duplicating section structure.
 * The Science page itself renders sections on the page and does not use this component.
 */
export default function SciencePageContent({ isMobile }: SciencePageContentProps) {
  return (
    <>
      <section
        className="premium-section-luxury premium-hero-first premium-hero-with-top-air premium-section-reduced-bottom premium-bg-bone"
        aria-label="Science hero"
      >
        <div className="premium-track">
          <ScienceHero isMobile={isMobile} />
        </div>
      </section>

      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        aria-label="Research philosophy"
      >
        <div className="premium-track">
          <ScienceQuote isMobile={isMobile} />
        </div>
      </section>

      <section
        className="premium-section-luxury premium-bg-bone"
        aria-label="What are adaptogens"
      >
        <div className="premium-track">
          <ScienceAdaptogens isMobile={isMobile} />
        </div>
      </section>

      <section
        className="premium-section-luxury text-white"
        style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
        aria-label="The five pillars"
      >
        <div className="premium-track">
          <SciencePillars isMobile={isMobile} />
        </div>
      </section>

      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        aria-label="Formula synergy"
      >
        <div className="premium-track">
          <SynergyChart isMobile={isMobile} />
        </div>
      </section>

      <section
        className="premium-section-luxury premium-bg-bone"
        aria-label="What makes CONKA different"
      >
        <div className="premium-track">
          <ScienceDifferent isMobile={isMobile} />
        </div>
      </section>

      <section
        className="premium-section-luxury premium-bg-ink text-white"
        aria-label="Evidence-based formulation"
      >
        <div className="premium-track">
          <EvidenceSummary isMobile={isMobile} />
        </div>
      </section>
    </>
  );
}
