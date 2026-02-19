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

export default function Home() {
  const [shuffledTestimonials, setShuffledTestimonials] = useState<
    Testimonial[]
  >([]);

  // Shuffle landing page set (Flow + Clarity + Protocol mix) on client to avoid hydration mismatch
  useEffect(() => {
    setShuffledTestimonials(shuffleTestimonials(getSiteTestimonialsGeneral()));
  }, []);

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* ===== SECTION 1: HERO ===== */}
      <Navigation />
      <section aria-label="Homepage hero">
        <Hero variant="default" />
      </section>

      {/* ===== ATHLETE CREDIBILITY CAROUSEL ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "white" }}
        aria-label="Athletes who use CONKA"
      >
        <div className="premium-track">
          <AthleteCredibilityCarousel />
        </div>
      </section>

      {/* ===== PRODUCT GRID (scroll target for hero CTA) ===== */}
      <div id="product-grid" className="scroll-mt-20">
        <section
          className="premium-section-luxury"
          style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
          aria-label="Find Your Formula"
        >
          <div className="premium-track">
            <ProductGrid />
          </div>
        </section>
      </div>

      {/* ===== SECTION 1.5: TESTIMONIALS (landing page mix: Flow, Clarity, Protocol) ===== */}
      {shuffledTestimonials.length > 0 && (
        <section
          className="premium-section-luxury premium-bg-bone"
          aria-label="Customer reviews"
        >
          <div className="premium-track">
            <Testimonials testimonials={shuffledTestimonials} autoScrollOnly />
          </div>
        </section>
      )}


      {/* ===== SECTION 2.5: KEY BENEFITS SLIDESHOW ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        aria-label="Key Benefits"
      >
        <div className="premium-track">
          <KeyBenefits benefits={keyBenefits} />
        </div>
      </section>

      {/* ===== SECTION: WHY CONKA WORKS ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
        aria-label="Why CONKA Works"
      >
        <div className="premium-track">
          <WhyConkaWorks />
        </div>
      </section>

      {/* ===== SECTION 5: CASE STUDIES ===== */}
      <CaseStudiesDataDriven />

      {/* ===== SECTION 6: PROTOCOL BUILDER ===== */}
      {/* <div id="protocols">
        <ProtocolBuilder />
      </div> */}

      {/* ===== SECTION 7: OUR STORY / FOUNDERS ===== */}
      <section
        className="premium-section-luxury premium-bg-bone"
        aria-label="Our Story"
      >
        <div className="premium-track">
          <FoundersSection />
        </div>
      </section>

      {/* ===== SECTION 8: FAQ ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        aria-label="FAQ"
      >
        <div className="premium-track">
          <LandingFAQ />
        </div>
      </section>

      <Footer />
    </div>
  );
}
