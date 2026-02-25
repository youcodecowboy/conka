"use client";

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import { AppHero, AppStickyPhoneBlock, AppSubscribersSection, AppDownloadSection, AppComparisonTable } from "@/app/components/app";
import CaseStudiesDataDriven from "@/app/components/CaseStudiesDataDriven";
import {
  CognitiveTestSection,
  CognitiveTestSectionMobile,
} from "@/app/components/cognitive-test";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function AppPage() {
  const isMobile = useIsMobile();

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      <AppHero />

      <AppStickyPhoneBlock />

      <AppSubscribersSection />

      <AppDownloadSection />

      {/* Cognitive Test Section */}
      <section
        className="premium-section-luxury premium-bg-bone"
        style={{ color: "var(--color-ink)" }}
        aria-labelledby="cognitive-test-heading"
      >
        <div className="premium-track">
          {isMobile !== undefined &&
            (isMobile ? <CognitiveTestSectionMobile /> : <CognitiveTestSection />)}
        </div>
      </section>

      <CaseStudiesDataDriven />

      {/* Comparison Table Section — bone for rhythm (guide: dark max 2x) */}
      <section
        className="premium-section-luxury premium-bg-bone"
        style={{ color: "var(--color-ink)" }}
      >
        <div className="premium-track">
          <AppComparisonTable />
        </div>
      </section>

      <Footer />
    </div>
  );
}
