"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import Hero from "./components/Hero";
import type { Benefit } from "./components/KeyBenefits";
import {
  getSiteTestimonialsGeneral,
  shuffleTestimonials,
} from "./lib/testimonialsFilter";
import type { Testimonial } from "./components/testimonials/types";

// Dynamically import heavy components to reduce initial bundle size
// These components are below the fold and contain heavy dependencies like recharts
const KeyBenefits = dynamic(() => import("./components/KeyBenefits"), {
  loading: () => <div className="h-[600px]" />, // Placeholder to prevent layout shift
});

const WhatIsConka = dynamic(() => import("./components/WhatIsConka"), {
  loading: () => <div className="h-[400px]" />,
});

// const ProtocolBuilder = dynamic(() => import("./components/ProtocolBuilder"), {
//   loading: () => <div className="h-[600px]" />,
// });

const ProductGrid = dynamic(() => import("./components/home/ProductGrid"), {
  loading: () => <div className="h-[600px]" />,
});

const CaseStudiesDataDriven = dynamic(
  () => import("./components/CaseStudiesDataDriven"),
  {
    loading: () => <div className="h-[400px]" />,
  },
);

const Testimonials = dynamic(
  () => import("./components/testimonials/Testimonials"),
  {
    loading: () => <div className="h-[500px]" />,
  },
);

const AthleteCredibilityCarousel = dynamic(
  () => import("./components/AthleteCredibilityCarousel"),
  {
    loading: () => <div className="h-[400px]" />,
  },
);

const faqItems = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    category: "Science",
    question: "How does it work?",
    answer:
      "Our nootropic blends are formulated based on peer-reviewed research and clinical trials. Each ingredient is dosed at effective levels proven in studies.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    category: "Shipping",
    question: "How fast is delivery?",
    answer:
      "UK orders ship within 24 hours. Standard delivery is 2-3 days, express is next day. International shipping available to 30+ countries.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
      </svg>
    ),
    category: "Subscription",
    question: "Can I cancel anytime?",
    answer:
      "Yes, subscriptions can be paused, modified, or cancelled at any time. No contracts, no commitments. We believe in the product.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    category: "Ingredients",
    question: "Are they natural?",
    answer:
      "All ingredients are naturally derived and rigorously tested for purity. No artificial additives, no fillers, no compromises.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    category: "Usage",
    question: "When should I take it?",
    answer:
      "CONKA Flow is best taken in the morning with or without food. CONKA Clear is best 30-60 minutes before you need peak performance.",
  },
];

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [shuffledTestimonials, setShuffledTestimonials] = useState<
    Testimonial[]
  >([]);

  // Shuffle landing page set (Flow + Clarity + Protocol mix) on client to avoid hydration mismatch
  useEffect(() => {
    setShuffledTestimonials(shuffleTestimonials(getSiteTestimonialsGeneral()));
  }, []);

  // Key Benefits Data - All stats from verified PubMed studies
  const keyBenefits: Benefit[] = [
    {
      id: "focus",
      title: "Improved Focus",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      stat: "+18%",
      annotation: "PMID: 12888775 — Lemon Balm",
      description:
        "Balance alertness with tranquility for sustained concentration",
      clinicalBreakdown: {
        study: "Kennedy et al. 2003, Neuropsychopharmacology",
        participants: "20 healthy young adults",
        duration: "Single doses with 7-day intervals",
        results: [
          "+18% improvement in memory performance",
          "+15% increase in calmness scores",
          "Enhanced acetylcholine receptor activity",
          "P<0.05 statistical significance",
        ],
      },
    },
    {
      id: "sleep",
      title: "Better Sleep Quality",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      stat: "+42%",
      annotation: "PMID: 32021735 — Ashwagandha",
      description: "Improved sleep quality and reduced time to fall asleep",
      clinicalBreakdown: {
        study: "Salve et al. 2019, Cureus",
        participants: "58 healthy adults",
        duration: "8 weeks",
        results: [
          "+42% improvement in sleep quality",
          "Reduced morning cortisol levels",
          "Improved stress resistance",
          "Enhanced quality of life scores",
        ],
      },
    },
    {
      id: "brain-fog",
      title: "Reduced Brain Fog",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      stat: "+40%",
      annotation: "PMID: 29559699 — Glutathione",
      description: "Clear cellular waste and keep your mind responsive",
      clinicalBreakdown: {
        study: "Sinha et al. 2018, European Journal of Clinical Nutrition",
        participants: "12 healthy adults",
        duration: "4 weeks",
        results: [
          "+40% increase in blood glutathione levels",
          "2x enhancement in NK cell activity",
          "Improved lymphocyte proliferation",
          "Enhanced immune function markers",
        ],
      },
    },
    {
      id: "stress",
      title: "Stress Resilience",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      stat: "-56%",
      annotation: "PMID: 23439798 — Ashwagandha",
      description: "Reduce cortisol and build natural stress resistance",
      clinicalBreakdown: {
        study:
          "Chandrasekhar et al. 2012, Indian Journal of Psychological Medicine",
        participants: "64 subjects with chronic stress",
        duration: "60 days",
        results: [
          "-56% reduction in stress assessment scores",
          "-28% decrease in serum cortisol levels",
          "P<0.0001 statistical significance",
          "Improved quality of life measures",
        ],
      },
    },
    {
      id: "memory",
      title: "Improve Memory",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
      stat: "+63%",
      annotation: "PMID: 29246725 — Turmeric",
      description: "Enhanced neuroplasticity and memory formation",
      clinicalBreakdown: {
        study:
          "Small et al. 2018, American Journal of Geriatric Psychiatry (UCLA)",
        participants: "40 non-demented adults aged 51-84",
        duration: "18 months",
        results: [
          "+63% improvement in memory (SRT)",
          "+96% improvement in attention",
          "Reduced brain amyloid and tau accumulation",
          "P<0.0001 statistical significance",
        ],
      },
    },
  ];

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
          className="premium-section-luxury premium-bg-bone"
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

      {/* ===== SECTION 2: WHAT IS CONKA ===== */}
      <WhatIsConka />

      {/* ===== SECTION 2.5: KEY BENEFITS SLIDESHOW ===== */}
      <section
        className="premium-section-luxury"
        style={{ backgroundColor: "#eeeff2" }}
        aria-label="Key Benefits"
      >
        <div className="premium-track">
          <KeyBenefits benefits={keyBenefits} />
        </div>
      </section>

      {/* ===== SECTION 5: CASE STUDIES ===== */}
      <CaseStudiesDataDriven />

      {/* ===== SECTION 6: PROTOCOL BUILDER ===== */}
      {/* <div id="protocols">
        <ProtocolBuilder />
      </div> */}

      {/* ===== SECTION 7: OUR STORY TEASER ===== */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-4xl mx-auto">
          <p className="font-commentary text-xl mb-4 text-center">
            the story behind conka
          </p>

          <div className="flex flex-col gap-8 md:gap-12 items-center">
            {/* Icons */}
            <div className="flex gap-4 md:gap-6 justify-center">
              {/* Brain Icon */}
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-current flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
                </svg>
              </div>
              {/* Athletes Icon */}
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-current flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="4" r="2" />
                  <path d="m22 8-4.5 4.5" />
                  <path d="M15.5 10.5 12 14l-4-2-6 6" />
                  <path d="M8.5 16.5 5 20" />
                  <path d="m19 12-2 2-5.5-2.5" />
                </svg>
              </div>
              {/* Science Icon */}
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-current flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 2v7.31" />
                  <path d="M14 9.3V2" />
                  <path d="M8.5 2h7" />
                  <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
                  <path d="M5.58 16.5h12.85" />
                </svg>
              </div>
            </div>

            {/* Story Content */}
            <div className="text-center w-full max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Founded by Two Friends
              </h2>

              {/* Founder Image */}
              <div className="mb-6">
                <div className="relative w-full max-w-xs md:max-w-sm h-64 md:h-80 mx-auto">
                  <Image
                    src="/TwoFounders.jpg"
                    alt="CONKA founders"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <p className="text-lg opacity-80 mb-6 max-w-xl mx-auto">
                After a trip to the Olympics and a career-ending concussion, two
                athletes and best friends set out to solve a problem nobody was
                talking about: recovery for the brain. Over £500,000 in research
                later, CONKA was born.
              </p>
              <a
                href="/our-story"
                className="neo-button-outline px-6 py-2.5 font-semibold text-base inline-flex items-center gap-2"
              >
                Read Our Story
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: FAQ ===== */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Questions?
          </h2>
          <p className="font-commentary text-xl mb-12 text-center">
            we&apos;ve got answers
          </p>

          {/* Icon Row */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {faqItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                  expandedFaq === idx
                    ? "bg-[var(--foreground)] text-[var(--background)] border-current"
                    : "border-current/30 hover:border-current/60"
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="font-clinical text-xs">{item.category}</p>
              </button>
            ))}
          </div>

          {/* Persistent Answer Card */}
          <div className="neo-box p-8 min-h-[200px] flex items-center justify-center">
            {expandedFaq !== null ? (
              <div className="w-full content-transition">
                <h3 className="text-xl font-bold mb-4">
                  {faqItems[expandedFaq].question}
                </h3>
                <p className="text-lg opacity-80">
                  {faqItems[expandedFaq].answer}
                </p>
              </div>
            ) : (
              <div className="text-center opacity-50">
                <p className="font-commentary text-lg">
                  Select a category above to see the answer
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
