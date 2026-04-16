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
    <div className="min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
      <Navigation />

      {isMobile === undefined ? (
        <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="font-clinical text-sm opacity-50">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {/* ===== SECTION 1: HERO ===== */}
          <section
            className="brand-section brand-hero-first brand-bg-tint"
            aria-label="Science hero"
          >
            <div className="brand-track">
              <ScienceHero isMobile={!!isMobile} />
            </div>
          </section>

          {/* ===== SECTION 2: QUOTE ===== */}
          <section
            className="brand-section brand-bg-white"
            aria-label="Research philosophy"
          >
            <div className="brand-track">
              <ScienceQuote isMobile={!!isMobile} />
            </div>
          </section>

          {/* ===== SECTION 3: ADAPTOGENS ===== */}
          <section
            className="brand-section brand-bg-tint"
            aria-label="What are adaptogens"
          >
            <div className="brand-track">
              <ScienceAdaptogens isMobile={!!isMobile} />
            </div>
          </section>

          {/* ===== SECTION 4: FIVE PILLARS ===== */}
          <section
            className="brand-section brand-bg-white"
            aria-label="The five pillars"
          >
            <div className="brand-track">
              <SciencePillars isMobile={!!isMobile} />
            </div>
          </section>

          {/* ===== SECTION 5: SYNERGY CHART ===== */}
          <section
            className="brand-section brand-bg-tint"
            aria-label="Formula synergy"
          >
            <div className="brand-track">
              <SynergyChart isMobile={!!isMobile} />
            </div>
          </section>

          {/* ===== SECTION 6: WHAT MAKES US DIFFERENT ===== */}
          <section
            className="brand-section brand-bg-white"
            aria-label="What makes CONKA different"
          >
            <div className="brand-track">
              <ScienceDifferent isMobile={!!isMobile} />
            </div>
          </section>

          {/* ===== SECTION 7: EVIDENCE SUMMARY ===== */}
          <section
            className="brand-section brand-bg-tint"
            aria-label="Evidence-based formulation"
          >
            <div className="brand-track">
              <EvidenceSummary isMobile={!!isMobile} />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
