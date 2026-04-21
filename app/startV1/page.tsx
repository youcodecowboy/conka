import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import LabHero from "./LabHero";
import LabWhatItDoes from "./LabWhatItDoes";
import LabValueComparison from "./LabValueComparison";
import LabTimeline from "./LabTimeline";
import LabGuarantee from "./LabGuarantee";
import LabFAQ from "./LabFAQ";
import LabTestimonials from "./LabTestimonials";
import LandingDisclaimer from "../components/landing/LandingDisclaimer";
import Reveal from "../components/landing/Reveal";
import "./lab.css";

const LabCaseStudies = dynamic(
  () => import("./LabCaseStudies"),
  { loading: () => <div className="h-[600px]" /> },
);

export const metadata: Metadata = {
  title: "Lab | CONKA",
  description: "Clinical visual prototype — internal review only.",
  robots: { index: false, follow: false },
};

export default function StartV1Page() {
  return (
    <div className="lab-theme min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
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
            <LabWhatItDoes />
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
            <LabCaseStudies />
          </Reveal>
        </div>
      </section>

      {/* ===== 4. VALUE COMPARISON ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="CONKA vs coffee cost comparison"
      >
        <div className="brand-track">
          <LabValueComparison />
        </div>
      </section>

      {/* ===== 5. TESTIMONIALS ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Customer reviews"
      >
        <div className="brand-track">
          <LabTestimonials />
        </div>
      </section>

      {/* ===== 6. TIMELINE ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="What to expect timeline"
      >
        <div className="brand-track">
          <Reveal>
            <LabTimeline />
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
            <LabGuarantee />
          </Reveal>
        </div>
      </section>

      {/* ===== 8. FAQ ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="FAQ"
      >
        <div className="brand-track">
          <LabFAQ />
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
