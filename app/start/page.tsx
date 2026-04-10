import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import LandingHero from "../components/landing/LandingHero";
import LandingCTA from "../components/landing/LandingCTA";
import LandingDisclaimer from "../components/landing/LandingDisclaimer";
import Reveal from "../components/landing/Reveal";
import { PRICE_PER_SHOT_BOTH } from "../lib/landingPricing";
import TestimonialsSection from "./TestimonialsSection";

/* Below-fold sections: dynamic import to reduce initial JS bundle */
const CaseStudiesDataDriven = dynamic(
  () => import("../components/CaseStudiesDataDriven"),
  { loading: () => <div className="h-[600px]" /> },
);
const LandingProductSplit = dynamic(
  () => import("../components/landing/LandingProductSplit"),
  { loading: () => <div className="h-[400px]" /> },
);
const LandingValueComparison = dynamic(
  () => import("../components/landing/LandingValueComparison"),
  { loading: () => <div className="h-[300px]" /> },
);
const LandingBenefits = dynamic(
  () => import("../components/landing/LandingBenefits"),
  { loading: () => <div className="h-[300px]" /> },
);
const LandingTimeline = dynamic(
  () => import("../components/landing/LandingTimeline"),
  { loading: () => <div className="h-[500px]" /> },
);
const LandingFAQ = dynamic(
  () => import("../components/landing/LandingFAQ"),
  { loading: () => <div className="h-[400px]" /> },
);

export const metadata: Metadata = {
  title: "Try CONKA | Daily Nootropic Brain Shots",
  description:
    "Two shots a day. 16 active ingredients. Informed Sport certified. Try CONKA Flow and Clear with a 100-day money-back guarantee.",
  alternates: {
    canonical: "https://www.conka.io/start",
  },
  openGraph: {
    title: "Try CONKA | Daily Nootropic Brain Shots",
    description:
      "Two shots a day. 16 active ingredients. Informed Sport certified. Start your daily brain performance routine.",
  },
};

export default function StartPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
      <Navigation />

      {/* ===== 1. HERO ===== */}
      <section
        className="brand-section brand-hero-first brand-bg-white"
        aria-label="Landing page hero"
      >
        <div className="brand-track">
          <LandingHero />
        </div>
      </section>

      {/* ===== 2. ATHLETE PROOF / CASE STUDIES ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Clinically validated test scores"
      >
        <div className="brand-track">
          <Reveal>
            <CaseStudiesDataDriven hideCTA />
            <div className="mt-8 flex justify-start">
              <LandingCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot →</LandingCTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 3. PRODUCT SPLIT — AM vs PM ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Flow and Clear explained"
      >
        <div className="brand-track">
          <LandingProductSplit />
        </div>
      </section>

      {/* ===== 4. CONKA vs COFFEE — VALUE COMPARISON ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="CONKA vs coffee cost comparison"
      >
        <div className="brand-track">
          <LandingValueComparison />
        </div>
      </section>

      {/* ===== 5. BENEFITS + TRUST BADGES ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Key Benefits"
      >
        <div className="brand-track">
          <LandingBenefits />
        </div>
      </section>

      {/* ===== 6. WHAT TO EXPECT TIMELINE ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="What to expect timeline"
      >
        <div className="brand-track">
          <Reveal>
            <LandingTimeline />
          </Reveal>
        </div>
      </section>

      {/* ===== 7. TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== 8. FAQ ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="FAQ"
      >
        <div className="brand-track">
          <LandingFAQ />
        </div>
      </section>

      {/* ===== 9. DISCLAIMER ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Important information and disclaimers"
      >
        <div className="brand-track">
          <LandingDisclaimer />
        </div>
      </section>

      <Footer />
    </div>
  );
}
