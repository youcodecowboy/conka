"use client";

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import { AppHero, AppStickyPhoneBlock, AppSubscribersSection, AppDownloadSection, AppComparisonTable } from "@/app/components/app";
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

      {/* Evidence Section — surface to break up bone run per style guide */}
      <section className="premium-section-luxury premium-bg-surface" style={{ color: "var(--color-ink)" }}>
        <div className="premium-track">
          <div className="text-center">
            <p
              className="text-xs uppercase tracking-widest mb-4 opacity-70"
              style={{ fontSize: "var(--premium-font-data-size)" }}
            >
              Evidence-backed brain optimisation
            </p>
            <p
              className="mb-6 mx-auto max-w-[65ch]"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                lineHeight: "var(--premium-font-body-leading)",
              }}
            >
              The CONKA app combines neuroscience-based testing with
              personalised recommendations. Clinical data supports a potential{" "}
              <span className="font-bold">16% improvement in cognitive performance</span>{" "}
              over 30 days when following the recommended brain optimisation plan.
            </p>
            <blockquote
              className="text-xl md:text-2xl italic mx-auto max-w-[52ch] opacity-90"
              style={{
                letterSpacing: "var(--letter-spacing-premium-title)",
                lineHeight: "var(--premium-font-body-leading)",
              }}
            >
              &ldquo;Developed by neuroscientists and tested with professional
              athletes — your brain deserves the same precision and care.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section
        className="premium-section-luxury premium-bg-ink"
        style={{ color: "var(--text-on-ink)" }}
      >
        <div className="premium-track">
          <AppComparisonTable />
        </div>
      </section>

      <Footer />
    </div>
  );
}
