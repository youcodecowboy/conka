import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import LandingHero from "../components/landing/LandingHero";
import LandingDisclaimer from "../components/landing/LandingDisclaimer";
import LandingProductShowcase from "../components/landing/LandingProductShowcase";
import LandingDailyBenefits from "../components/landing/LandingDailyBenefits";
import LandingTestimonials from "../components/landing/LandingTestimonials";
import Reveal from "../components/landing/Reveal";

/* Below-fold sections: dynamic import to reduce initial JS bundle */
const LabCaseStudies = dynamic(
  () => import("../components/LabCaseStudies"),
  { loading: () => <div className="h-[600px]" /> },
);
const LandingValueComparison = dynamic(
  () => import("../components/landing/LandingValueComparison"),
  { loading: () => <div className="h-[300px]" /> },
);
const LabTimeline = dynamic(
  () => import("../components/landing/LabTimeline"),
  { loading: () => <div className="h-[500px]" /> },
);
const LabGuarantee = dynamic(
  () => import("../components/landing/LabGuarantee"),
  { loading: () => <div className="h-[500px]" /> },
);
const LabFAQ = dynamic(
  () => import("../components/landing/LabFAQ"),
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
    <div className="brand-clinical min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
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

      {/* ===== 2. FORMULATION — TWO SHOTS, 16 ACTIVES ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Formulation and dosing windows"
      >
        <div className="brand-track">
          <Reveal>
            <LandingProductShowcase />
          </Reveal>
        </div>
      </section>

      {/* ===== 3. ATHLETE PROOF / CASE STUDIES ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Clinically validated test scores"
      >
        <div className="brand-track">
          <Reveal>
            <LabCaseStudies />
          </Reveal>
        </div>
      </section>

      {/* ===== 4. DAILY BENEFITS — LIFELONG PILLARS ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Daily habit, lifelong benefits"
      >
        <div className="brand-track">
          <Reveal>
            <LandingDailyBenefits />
          </Reveal>
        </div>
      </section>

      {/* ===== 5. CONKA vs COFFEE — VALUE COMPARISON ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="CONKA vs coffee cost comparison"
      >
        <div className="brand-track">
          <LandingValueComparison />
        </div>
      </section>

      {/* ===== 6. TESTIMONIALS ===== */}
      <section className="brand-section brand-bg-tint" aria-label="Customer reviews">
        <div className="brand-track">
          <LandingTestimonials />
        </div>
      </section>

      {/* ===== 7. WHAT TO EXPECT TIMELINE ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="What to expect timeline"
      >
        <div className="brand-track">
          <Reveal>
            <LabTimeline />
          </Reveal>
        </div>
      </section>

      {/* ===== 8. 100-DAY GUARANTEE ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="100-day risk-free guarantee"
      >
        <div className="brand-track">
          <Reveal>
            <LabGuarantee />
          </Reveal>
        </div>
      </section>

      {/* ===== 9. FAQ ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="FAQ"
      >
        <div className="brand-track">
          <LabFAQ />
        </div>
      </section>

      {/* ===== 10. DISCLAIMER ===== */}
      <section
        className="brand-section brand-bg-tint"
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
