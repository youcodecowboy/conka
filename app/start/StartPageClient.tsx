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
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      {/* ===== 1. HERO ===== */}
      <section
        className="premium-section-luxury premium-hero-first"
        style={{ backgroundColor: "white" }}
        aria-label="Landing page hero"
      >
        <div className="premium-track">
          <LandingHero />
        </div>
      </section>

      {/* ===== 2. BENEFITS + TRUST BADGES ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
        aria-label="Key Benefits"
      >
        <div className="premium-track">
          <LandingBenefits />
        </div>
      </section>

      {/* ===== 3. PRODUCT SPLIT — AM vs PM ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "white" }}
        aria-label="Flow and Clear explained"
      >
        <div className="premium-track">
          <LandingProductSplit />
        </div>
      </section>

      {/* ===== 4. WHAT'S INSIDE ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        aria-label="What's inside CONKA"
      >
        <div className="premium-track">
          <LandingWhatsInside />
        </div>
      </section>

      {/* ===== 5. TESTIMONIALS ===== */}
      {shuffledTestimonials.length > 0 && (
        <section
          className="premium-section-luxury"
          style={{ backgroundColor: "white" }}
          aria-label="Customer reviews"
        >
          <div className="premium-track">
            <Testimonials testimonials={shuffledTestimonials} autoScrollOnly />
            <div className="mt-8 flex justify-center">
              <LandingCTA>Join Them →</LandingCTA>
            </div>
          </div>
        </section>
      )}

      {/* ===== 6. APP GUARANTEE ===== */}
      <section
        className="premium-section-luxury premium-bg-bone"
        aria-label="Money-back guarantee"
      >
        <div className="premium-track">
          <LandingGuarantee />
        </div>
      </section>

      {/* ===== 7. CASE STUDIES ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        aria-label="Clinically validated test scores"
      >
        <div className="premium-track">
          <CaseStudiesDataDriven hideCTA />
          <div className="mt-8 flex justify-center">
            <LandingCTA>Start Your Journey →</LandingCTA>
          </div>
        </div>
      </section>

      {/* ===== 8. FAQ ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        aria-label="FAQ"
      >
        <div className="premium-track">
          <LandingFAQ />
        </div>
      </section>

      {/* ===== 9. DISCLAIMER ===== */}
      <section
        className="premium-section-luxury premium-bg-bone"
        aria-label="Important information and disclaimers"
      >
        <div className="premium-track">
          <LandingDisclaimer />
        </div>
      </section>

      <Footer />
    </div>
  );
}
