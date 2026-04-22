"use client";

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import ScienceHero from "@/app/components/science/ScienceHero";
import ScienceQuote from "@/app/components/science/ScienceQuote";
import ScienceAdaptogens from "@/app/components/science/ScienceAdaptogens";
import SciencePillars from "@/app/components/science/SciencePillars";
import FlowVsClear from "@/app/components/science/FlowVsClear";
import ScienceDifferent from "@/app/components/science/ScienceDifferent";
import EvidenceSummary from "@/app/components/science/EvidenceSummary";
import Reveal from "@/app/components/landing/Reveal";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function SciencePage() {
  const isMobile = useIsMobile();

  return (
    <div className="brand-clinical min-h-screen bg-white text-black flex flex-col">
      <Navigation />

      {isMobile === undefined ? (
        <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 animate-pulse">
            // Loading research
          </p>
        </div>
      ) : (
        <>
          {/* ===== SECTION 1: HERO ===== */}
          <section
            className="brand-section brand-hero-first brand-bg-white"
            aria-label="Science hero"
          >
            <div className="brand-track">
              <ScienceHero isMobile={!!isMobile} />
            </div>
          </section>

          {/* ===== SECTION 2: QUOTE ===== */}
          <section
            className="brand-section brand-bg-tint"
            aria-label="Research philosophy"
          >
            <div className="brand-track">
              <Reveal>
                <ScienceQuote isMobile={!!isMobile} />
              </Reveal>
            </div>
          </section>

          {/* ===== SECTION 3: ADAPTOGENS ===== */}
          <section
            className="brand-section brand-bg-white"
            aria-label="What are adaptogens"
          >
            <div className="brand-track">
              <Reveal>
                <ScienceAdaptogens isMobile={!!isMobile} />
              </Reveal>
            </div>
          </section>

          {/* ===== SECTION 4: FIVE PILLARS ===== */}
          <section
            className="brand-section brand-bg-tint"
            aria-label="The five pillars"
          >
            <div className="brand-track">
              <Reveal>
                <SciencePillars isMobile={!!isMobile} />
              </Reveal>
            </div>
          </section>

          {/* ===== SECTION 5: FLOW VS CLEAR ===== */}
          <section
            className="brand-section brand-bg-white"
            aria-label="Flow vs Clear comparison"
          >
            <div className="brand-track">
              <Reveal>
                <FlowVsClear isMobile={!!isMobile} />
              </Reveal>
            </div>
          </section>

          {/* ===== SECTION 6: WHAT MAKES US DIFFERENT ===== */}
          <section
            className="brand-section brand-bg-tint"
            aria-label="What makes CONKA different"
          >
            <div className="brand-track">
              <Reveal>
                <ScienceDifferent isMobile={!!isMobile} />
              </Reveal>
            </div>
          </section>

          {/* ===== SECTION 7: EVIDENCE & RESEARCH ===== */}
          <section
            className="brand-section brand-bg-white"
            aria-label="Evidence and research"
          >
            <div className="brand-track">
              <Reveal>
                <EvidenceSummary isMobile={!!isMobile} />
              </Reveal>
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
