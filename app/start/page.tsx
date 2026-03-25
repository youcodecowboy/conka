"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import LandingHero from "../components/landing/LandingHero";
import { keyBenefits } from "../components/KeyBenefits";
import {
  getSiteTestimonialsGeneral,
  shuffleTestimonials,
} from "../lib/testimonialsFilter";
import type { Testimonial } from "../components/testimonials/types";

// Heavy below-fold components — dynamic imports (matches homepage pattern)
const KeyBenefits = dynamic(() => import("../components/KeyBenefits"), {
  loading: () => <div className="h-[800px]" />,
});

const CaseStudiesDataDriven = dynamic(
  () => import("../components/CaseStudiesDataDriven"),
  { loading: () => <div className="h-[1200px]" /> },
);

const Testimonials = dynamic(
  () => import("../components/testimonials/Testimonials"),
  { loading: () => <div className="h-[450px]" /> },
);

const AthleteCredibilityCarousel = dynamic(
  () => import("../components/AthleteCredibilityCarousel"),
  { loading: () => <div className="h-[350px]" /> },
);

const FoundersSection = dynamic(
  () => import("../components/home/FoundersSection"),
  { loading: () => <div className="h-[350px]" /> },
);

const LandingFAQ = dynamic(() => import("../components/home/LandingFAQ"), {
  loading: () => <div className="h-[350px]" />,
});

const AppHero = dynamic(
  () =>
    import("../components/app/AppHero").then((mod) => ({
      default: mod.AppHero,
    })),
  { loading: () => <div className="h-[600px]" /> },
);

/* ------------------------------------------------------------------ */
/*  Inline CTA — reused between sections                              */
/* ------------------------------------------------------------------ */
function CTABanner({ text }: { text?: string }) {
  return (
    <div className="py-6 md:py-10 px-5">
      <div className="max-w-md mx-auto flex flex-col items-center gap-3">
        {text && (
          <p className="premium-body text-center opacity-70">{text}</p>
        )}
        <a
          href="#"
          className="block w-full text-center py-4 px-8 rounded-[var(--premium-radius-interactive)] text-white font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--gradient-neuro-blue-accent)" }}
        >
          Get Started →
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Placeholder — for sections not yet built                          */
/* ------------------------------------------------------------------ */
function Placeholder({ title, note }: { title: string; note: string }) {
  return (
    <div className="premium-card-soft text-center py-16">
      <h2 className="premium-section-heading">{title}</h2>
      <p className="premium-body mx-auto mt-4 opacity-50">{note}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
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

      {/* ===== 2. KEY BENEFITS — What you'll actually feel ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        aria-label="Key Benefits"
      >
        <div className="premium-track">
          <KeyBenefits benefits={keyBenefits} />
        </div>
      </section>

      {/* ===== 3. CASE STUDIES / REAL DATA ===== */}
      <section className="premium-section-luxury premium-bg-bone">
        <div className="premium-track">
          <CaseStudiesDataDriven />
        </div>
      </section>

      {/* ===== 4. US VS THEM (placeholder) ===== */}
      <section className="premium-section-luxury premium-bg-bone">
        <div className="premium-track">
          <Placeholder
            title="CONKA vs Coffee & Energy Drinks"
            note="Comparison content — placeholder for copy from January Brands."
          />
        </div>
      </section>

      <CTABanner />

      {/* ===== 4. PRODUCT EXPLAINER (placeholder) ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
      >
        <div className="premium-track">
          <Placeholder
            title="Flow (AM) + Clear (PM) = Both"
            note="Product explainer — AM/PM positioning, synergistic effect. Placeholder for copy."
          />
        </div>
      </section>

      <CTABanner />

      {/* ===== 6. TESTIMONIALS ===== */}
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

      <CTABanner />

      {/* ===== 7. ATHLETES — Why Athletes Trust CONKA ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "white" }}
        aria-label="Athletes who use CONKA"
      >
        <div className="premium-track">
          <AthleteCredibilityCarousel />
        </div>
      </section>

      {/* ===== 8. THE APP ===== */}
      <section aria-label="The CONKA App">
        <AppHero />
      </section>

      {/* ===== 9. FOUNDER STORY ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
        aria-label="Our Story"
      >
        <div className="premium-track">
          <FoundersSection />
        </div>
      </section>

      {/* ===== 10. FAQ ===== */}
      <section
        className="premium-section-luxury premium-bg-bone"
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
