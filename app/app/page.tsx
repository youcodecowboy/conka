"use client";

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import { AppHero, AppStickyPhoneBlock, AppSubscribersSection, AppDownloadSection, AppComparisonTable } from "@/app/components/app";
import LabCaseStudies from "@/app/components/LabCaseStudies";
import {
  CognitiveTestSection,
  CognitiveTestSectionMobile,
} from "@/app/components/cognitive-test";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function AppPage() {
  const isMobile = useIsMobile();

  return (
    <div className="brand-clinical min-h-screen bg-white text-black flex flex-col">
      <Navigation />

      {/* ===== HERO ===== */}
      <section
        className="brand-section brand-hero-first brand-bg-white"
        aria-labelledby="app-hero-heading"
      >
        <div className="brand-track">
          <AppHero />
        </div>
      </section>

      {/* ===== STICKY PHONE BLOCK ===== */}
      <AppStickyPhoneBlock />

      {/* ===== SUBSCRIBERS ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="CONKA app rewards for subscribers"
      >
        <div className="brand-track">
          <AppSubscribersSection />
        </div>
      </section>

      {/* ===== DOWNLOAD CTA ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Download the CONKA app"
      >
        <div className="brand-track">
          <AppDownloadSection />
        </div>
      </section>

      {/* ===== COGNITIVE TEST ===== */}
      {isMobile !== undefined && (
        <section
          className="brand-section brand-bg-tint"
          aria-labelledby="cognitive-test-heading"
        >
          <div className="brand-track">
            {isMobile ? <CognitiveTestSectionMobile /> : <CognitiveTestSection />}
          </div>
        </section>
      )}

      {/* ===== CASE STUDIES ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Clinically validated test scores"
      >
        <div className="brand-track">
          <LabCaseStudies />
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="App feature comparison"
      >
        <div className="brand-track">
          <AppComparisonTable />
        </div>
      </section>

      <Footer />
    </div>
  );
}
