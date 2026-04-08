"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import LandingHero from "../components/landing/LandingHero";
import LandingBenefits from "../components/landing/LandingBenefits";
import LandingProductSplit from "../components/landing/LandingProductSplit";
import LandingValueComparison from "../components/landing/LandingValueComparison";
import LandingWhatsInside from "../components/landing/LandingWhatsInside";
import LandingFAQ from "../components/landing/LandingFAQ";
import LandingDisclaimer from "../components/landing/LandingDisclaimer";
import LandingCTA from "../components/landing/LandingCTA";
import { PRICE_PER_SHOT_BOTH } from "../lib/landingPricing";
import Reveal from "../components/landing/Reveal";
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
          <Reveal>
            <LandingBenefits />
          </Reveal>
        </div>
      </section>

      {/* ===== 6. TESTIMONIALS ===== */}
      {shuffledTestimonials.length > 0 && (
        <section
          className="brand-section brand-bg-tint"
          aria-label="Customer reviews"
        >
          <div className="brand-track">
            <Reveal>
              <Testimonials testimonials={shuffledTestimonials} autoScrollOnly />
              <div className="mt-8 flex justify-start">
                <LandingCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot →</LandingCTA>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== 7. FAQ ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="FAQ"
      >
        <div className="brand-track">
          <Reveal>
            <LandingFAQ />
          </Reveal>
        </div>
      </section>

      {/* ===== 8. WHAT'S INSIDE ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="What's inside CONKA"
      >
        <div className="brand-track">
          <Reveal>
            <LandingWhatsInside />
          </Reveal>
        </div>
      </section>

      {/* ===== 9. DISCLAIMER ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Important information and disclaimers"
      >
        <div className="brand-track">
          <Reveal>
            <LandingDisclaimer />
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
