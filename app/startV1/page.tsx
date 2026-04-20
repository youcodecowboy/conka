import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import LabHero from "./LabHero";
import LabCTA from "./LabCTA";
import LandingDisclaimer from "../components/landing/LandingDisclaimer";
import LandingWhatItDoes from "../components/landing/LandingWhatItDoes";
import Reveal from "../components/landing/Reveal";
import { PRICE_PER_SHOT_BOTH } from "../lib/landingPricing";
import TestimonialsSection from "../start/TestimonialsSection";

const CaseStudiesDataDriven = dynamic(
  () => import("../components/CaseStudiesDataDriven"),
  { loading: () => <div className="h-[600px]" /> },
);
const LandingValueComparison = dynamic(
  () => import("../components/landing/LandingValueComparison"),
  { loading: () => <div className="h-[300px]" /> },
);
const LandingTimeline = dynamic(
  () => import("../components/landing/LandingTimeline"),
  { loading: () => <div className="h-[500px]" /> },
);
const LandingGuarantee = dynamic(
  () => import("../components/landing/LandingGuarantee"),
  { loading: () => <div className="h-[500px]" /> },
);
const LandingFAQ = dynamic(
  () => import("../components/landing/LandingFAQ"),
  { loading: () => <div className="h-[400px]" /> },
);

export const metadata: Metadata = {
  title: "Lab | CONKA",
  description: "Clinical visual prototype — internal review only.",
  robots: { index: false, follow: false },
};

export default function StartV1Page() {
  return (
    <div className="min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
      <Navigation />

      {/* ===== 1. HERO ===== */}
      <section
        className="brand-section brand-hero-first brand-bg-white"
        aria-label="Clinical hero"
      >
        <div className="brand-track">
          <LabHero />
        </div>
      </section>

      {/* ===== 2. WHAT CONKA DOES ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="What CONKA does and what's inside"
      >
        <div className="brand-track">
          <Reveal>
            <LandingWhatItDoes />
          </Reveal>
        </div>
      </section>

      {/* ===== 3. CASE STUDIES ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Clinically validated test scores"
      >
        <div className="brand-track">
          <Reveal>
            <CaseStudiesDataDriven hideCTA />
            <div className="mt-8 flex justify-start">
              <LabCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot →</LabCTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 4. VALUE COMPARISON ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="CONKA vs coffee cost comparison"
      >
        <div className="brand-track">
          <LandingValueComparison />
        </div>
      </section>

      {/* ===== 5. TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== 6. TIMELINE ===== */}
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

      {/* ===== 7. GUARANTEE ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="100-day risk-free guarantee"
      >
        <div className="brand-track">
          <Reveal>
            <LandingGuarantee />
          </Reveal>
        </div>
      </section>

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
