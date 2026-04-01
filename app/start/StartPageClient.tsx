"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import LandingHero from "../components/landing/LandingHero";
import LandingBenefits from "../components/landing/LandingBenefits";
import LandingProductSplit from "../components/landing/LandingProductSplit";
import LandingWhatsInside from "../components/landing/LandingWhatsInside";
import LandingGuarantee from "../components/landing/LandingGuarantee";
import LandingFAQ from "../components/landing/LandingFAQ";
import LandingDisclaimer from "../components/landing/LandingDisclaimer";
import LandingCTA from "../components/landing/LandingCTA";
import {
  getSiteTestimonialsGeneral,
  shuffleTestimonials,
} from "../lib/testimonialsFilter";
import type { Testimonial } from "../components/testimonials/types";

const Testimonials = dynamic(
  () => import("../components/testimonials/Testimonials"),
  { loading: () => <div className="h-[450px]" /> },
);

const CaseStudiesDataDriven = dynamic(
  () => import("../components/CaseStudiesDataDriven"),
  { loading: () => <div className="h-[600px]" /> },
);

export default function StartPageClient() {
  const [shuffledTestimonials, setShuffledTestimonials] = useState<
    Testimonial[]
  >([]);

  useEffect(() => {
    setShuffledTestimonials(shuffleTestimonials(getSiteTestimonialsGeneral()));
  }, []);

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

      {/* ===== 2. BENEFITS + TRUST BADGES ===== */}
      {/* Black background: high-impact section with white cards on dark canvas */}
      <section
        className="brand-section brand-bg-black"
        aria-label="Key Benefits"
      >
        <div className="brand-track">
          <LandingBenefits />
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

      {/* ===== 4. WHAT'S INSIDE ===== */}
      {/* Neutral: soft break before testimonials, accordion content is dense */}
      <section
        className="brand-section brand-bg-neutral"
        aria-label="What's inside CONKA"
      >
        <div className="brand-track">
          <LandingWhatsInside />
        </div>
      </section>

      {/* ===== 5. TESTIMONIALS ===== */}
      {shuffledTestimonials.length > 0 && (
        <section
          className="brand-section brand-bg-white"
          aria-label="Customer reviews"
        >
          <div className="brand-track">
            <Testimonials testimonials={shuffledTestimonials} autoScrollOnly />
            <div className="mt-8 flex justify-start">
              <LandingCTA>Try Risk-Free →</LandingCTA>
            </div>
          </div>
        </section>
      )}

      {/* ===== 6. APP GUARANTEE ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Money-back guarantee"
      >
        <div className="brand-track">
          <LandingGuarantee />
        </div>
      </section>

      {/* ===== 7. CASE STUDIES ===== */}
      {/* Note: CaseStudiesDataDriven is a shared component using premium-base tokens.
          It assumes a light background. Migrate separately when ready. */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Clinically validated test scores"
      >
        <div className="brand-track">
          <CaseStudiesDataDriven hideCTA />
          <div className="mt-8 flex justify-start">
            <LandingCTA>Try Risk-Free →</LandingCTA>
          </div>
        </div>
      </section>

      {/* ===== 8. FAQ ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="FAQ"
      >
        <div className="brand-track">
          <LandingFAQ />
        </div>
      </section>

      {/* ===== 9. DISCLAIMER ===== */}
      {/* Neutral: visually separates the legal footer from content above */}
      <section
        className="brand-section brand-bg-neutral"
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
