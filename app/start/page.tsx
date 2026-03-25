"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import LandingHero from "../components/landing/LandingHero";
import LandingBenefits from "../components/landing/LandingBenefits";
import LandingWhatsInside from "../components/landing/LandingWhatsInside";
import LandingProductSplit from "../components/landing/LandingProductSplit";
import {
  getSiteTestimonialsGeneral,
  shuffleTestimonials,
} from "../lib/testimonialsFilter";
import type { Testimonial } from "../components/testimonials/types";

const Testimonials = dynamic(
  () => import("../components/testimonials/Testimonials"),
  { loading: () => <div className="h-[450px]" /> },
);

const LandingFAQ = dynamic(() => import("../components/home/LandingFAQ"), {
  loading: () => <div className="h-[350px]" />,
});

/* ------------------------------------------------------------------ */
/*  Funnel CTA — used at the end of testimonials and FAQ              */
/* ------------------------------------------------------------------ */
const FUNNEL_URL = "#";

function SectionCTA() {
  return (
    <div className="mt-8 flex justify-center">
      <a
        href={FUNNEL_URL}
        className="block w-full lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: "var(--gradient-neuro-blue-accent)" }}
      >
        Get Started →
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page — 5 sections, each pushes to the funnel                      */
/* ------------------------------------------------------------------ */
export default function StartPage() {
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

      {/* ===== 1. HERO ===== white */}
      <section
        className="premium-section-luxury premium-hero-first"
        style={{ backgroundColor: "white" }}
        aria-label="Landing page hero"
      >
        <div className="premium-track">
          <LandingHero />
        </div>
      </section>

      {/* ===== 2. BENEFITS + TRUST BADGES ===== dark neuro blue */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
        aria-label="Key Benefits"
      >
        <div className="premium-track">
          <LandingBenefits />
        </div>
      </section>

      {/* ===== 3. PRODUCT SPLIT — AM vs PM ===== bone */}
      <section
        className="premium-section-luxury premium-bg-bone"
        aria-label="Flow and Clear explained"
      >
        <div className="premium-track">
          <LandingProductSplit />
        </div>
      </section>

      {/* ===== 4. WHAT'S INSIDE ===== white */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "white" }}
        aria-label="What's inside CONKA"
      >
        <div className="premium-track">
          <LandingWhatsInside />
        </div>
      </section>

      {/* ===== 4. TESTIMONIALS ===== bone */}
      {shuffledTestimonials.length > 0 && (
        <section
          className="premium-section-luxury premium-bg-bone"
          aria-label="Customer reviews"
        >
          <div className="premium-track">
            <Testimonials testimonials={shuffledTestimonials} autoScrollOnly />
            <SectionCTA />
          </div>
        </section>
      )}

      {/* ===== 5. FAQ ===== white */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "white" }}
        aria-label="FAQ"
      >
        <div className="premium-track">
          <LandingFAQ />
          <SectionCTA />
        </div>
      </section>

      <Footer />
    </div>
  );
}
