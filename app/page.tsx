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
const HomeWhatItDoes = dynamic(
  () => import("./components/home/HomeWhatItDoes"),
  { loading: () => <div className="h-[1400px] lg:h-[1000px]" /> },
);

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

      {/* ===== SECTION 2: WHAT CONKA DOES ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="What CONKA does"
      >
        <div className="brand-track">
          <HomeWhatItDoes />
        </div>
      </section>

      {/* ===== SECTION 3: WHY HIGH PERFORMERS TRUST CONKA ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Athletes who use CONKA"
      >
        <div className="brand-track">
          <AthleteCredibilityCarousel />
        </div>
      </section>

      {/* ===== SECTION 4: PRODUCT GRID (scroll target for hero CTA) ===== */}
      <div id="product-grid" className="scroll-mt-20">
        <section
          className="brand-section brand-bg-tint"
          aria-label="Find Your Formula"
        >
          <div className="brand-track">
            <ProductGrid />
          </div>
        </section>
      </div>

      {/* ===== SECTION 5: CASE STUDIES (measurable outcomes first) ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Clinically validated test scores"
      >
        <div className="brand-track">
          <CaseStudiesDataDriven />
        </div>
      </section>

      {/* ===== SECTION 6: KEY BENEFITS ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Key Benefits"
      >
        <div className="brand-track">
          <KeyBenefits benefits={keyBenefits} />
        </div>
      </section>

      {/* ===== SECTION 7: WHY CONKA WORKS ===== */}
      <section
        className="brand-section brand-bg-white"
        aria-label="Why CONKA Works"
      >
        <div className="brand-track">
          <WhyConkaWorks />
        </div>
      </section>

      {/* ===== SECTION 8: WHAT TO EXPECT ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="What to Expect with CONKA"
      >
        <div className="brand-track">
          <WhatToExpect />
        </div>
      </section>

      {/* ===== SECTION 9: TESTIMONIALS (real voices after data proof) ===== */}
      {shuffledTestimonials.length > 0 && (
        <section
          className="brand-section brand-bg-white"
          aria-label="Customer reviews"
        >
          <div className="brand-track">
            <Testimonials testimonials={shuffledTestimonials} autoScrollOnly />
          </div>
        </section>
      )}

      {/* ===== SECTION 10: OUR STORY / FOUNDERS ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="Our Story"
      >
        <div className="brand-track">
          <FoundersSection />
        </div>
      </section>

      {/* ===== SECTION 11: FAQ ===== */}
      <section
        className="brand-section brand-bg-white"
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
