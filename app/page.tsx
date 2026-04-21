"use client";

import dynamic from "next/dynamic";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import LandingHero from "./components/landing/LandingHero";
import { keyBenefits } from "./components/KeyBenefits";

// Dynamically import heavy components to reduce initial bundle size
const LandingWhatItDoes = dynamic(
  () => import("./components/landing/LandingWhatItDoes"),
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

const LabCaseStudies = dynamic(
  () => import("./components/LabCaseStudies"),
  { loading: () => <div className="h-[1200px]" /> },
);

const LandingTestimonials = dynamic(
  () => import("./components/landing/LandingTestimonials"),
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

const LabFAQ = dynamic(() => import("./components/landing/LabFAQ"), {
  loading: () => <div className="h-[350px]" />,
});

const WhatToExpect = dynamic(() => import("./components/home/WhatToExpect"), {
  loading: () => <div className="h-[450px]" />,
});

export default function Home() {
  return (
    <div className="brand-clinical min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
      {/* ===== SECTION 1: HERO ===== */}
      <Navigation />
      <section
        className="brand-section brand-hero-first brand-bg-white"
        aria-label="Homepage hero"
      >
        <div className="brand-track">
          <LandingHero />
        </div>
      </section>

      {/* ===== SECTION 2: WHAT CONKA DOES ===== */}
      <section
        className="brand-section brand-bg-tint"
        aria-label="What CONKA does"
      >
        <div className="brand-track">
          <LandingWhatItDoes />
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
          <LabCaseStudies />
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
      <section
        className="brand-section brand-bg-white"
        aria-label="Customer reviews"
      >
        <div className="brand-track">
          <LandingTestimonials />
        </div>
      </section>

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
          <LabFAQ />
        </div>
      </section>

      <Footer />
    </div>
  );
}
