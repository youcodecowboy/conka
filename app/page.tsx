"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import Hero from "./components/Hero";
import { keyBenefits } from "./components/KeyBenefits";
import {
  getSiteTestimonialsGeneral,
  shuffleTestimonials,
} from "./lib/testimonialsFilter";
import type { Testimonial } from "./components/testimonials/types";

// Dynamically import heavy components to reduce initial bundle size
const KeyBenefits = dynamic(() => import("./components/KeyBenefits"), {
  loading: () => <div className="h-[800px]" />,
});

const ProductGrid = dynamic(() => import("./components/home/ProductGrid"), {
  loading: () => <div className="h-[900px]" />,
});

const WhyConkaWorks = dynamic(() => import("./components/WhyConkaWorks"), {
  loading: () => <div className="h-[600px]" />,
});

const CaseStudiesDataDriven = dynamic(
  () => import("./components/CaseStudiesDataDriven"),
  { loading: () => <div className="h-[1200px]" /> },
);

const Testimonials = dynamic(
  () => import("./components/testimonials/Testimonials"),
  { loading: () => <div className="h-[450px]" /> },
);

const AthleteCredibilityCarousel = dynamic(
  () => import("./components/AthleteCredibilityCarousel"),
  { loading: () => <div className="h-[350px]" /> },
);

const FoundersSection = dynamic(
  () => import("./components/home/FoundersSection"),
  { loading: () => <div className="h-[350px]" /> },
);

const LandingFAQ = dynamic(() => import("./components/home/LandingFAQ"), {
  loading: () => <div className="h-[350px]" />,
});

const WhatToExpect = dynamic(() => import("./components/home/WhatToExpect"), {
  loading: () => <div className="h-[450px]" />,
});

export default function Home() {
  const [shuffledTestimonials, setShuffledTestimonials] = useState<
    Testimonial[]
  >([]);

  // Shuffle landing page set (Flow + Clarity + Protocol mix) on client to avoid hydration mismatch
  useEffect(() => {
    setShuffledTestimonials(shuffleTestimonials(getSiteTestimonialsGeneral()));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
      {/* ===== SECTION 1: HERO ===== */}
      <Navigation />
      <section
        className="brand-section brand-hero-first brand-bg-white"
        aria-label="Homepage hero"
      >
        <div className="brand-track">
          <Hero />
        </div>
      </section>

      {/* ===== ATHLETE CREDIBILITY CAROUSEL ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Athletes who use CONKA"
      >
        <div className="brand-track">
          <AthleteCredibilityCarousel />
        </div>
      </section>

      {/* ===== PRODUCT GRID (scroll target for hero CTA) ===== */}
      <div id="product-grid" className="scroll-mt-20">
        <section
          className="brand-section brand-bg-white"
          aria-label="Find Your Formula"
        >
          <div className="brand-track">
            <ProductGrid />
          </div>
        </section>
      </div>

      {/* ===== TESTIMONIALS ===== */}
      {shuffledTestimonials.length > 0 && (
        <section
          className="brand-section brand-bg-tint"
          aria-label="Customer reviews"
        >
          <div className="brand-track">
            <Testimonials testimonials={shuffledTestimonials} autoScrollOnly />
          </div>
        </section>
      )}

      {/* ===== KEY BENEFITS ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Key Benefits"
      >
        <div className="brand-track">
          <KeyBenefits benefits={keyBenefits} />
        </div>
      </section>

      {/* ===== WHY CONKA WORKS ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Why CONKA Works"
      >
        <div className="brand-track">
          <WhyConkaWorks />
        </div>
      </section>

      {/* ===== WHAT TO EXPECT ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="What to Expect with CONKA"
      >
        <div className="brand-track">
          <WhatToExpect />
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Clinically validated test scores"
      >
        <div className="brand-track">
          <CaseStudiesDataDriven />
        </div>
      </section>

      {/* ===== OUR STORY / FOUNDERS ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Our Story"
      >
        <div className="brand-track">
          <FoundersSection />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="FAQ"
      >
        <div className="brand-track">
          <LandingFAQ />
        </div>
      </section>

      <Footer />
    </div>
  );
}
