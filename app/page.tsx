"use client";

import { useState } from "react";
import KeyBenefits, { Benefit } from "./components/KeyBenefits";
import CaseStudies from "./components/CaseStudies";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProtocolBuilder from "./components/ProtocolBuilder";
import TrialPacks from "./components/TrialPacks";
import Ingredients from "./components/Ingredients";
import ProductSlideshowMobile from "./components/ProductSlideshowMobile";

const athletes = [
  {
    name: "Marcus Chen",
    sport: "Olympic Swimming",
    achievement: "3x Gold Medalist",
    protocol: "Conka Flow daily + Conka Clarity on competition days",
    duration: "18 months",
    results: ["+12% lap consistency", "-0.3s average time", "Zero crashes"],
    quote: "Finally found something that works without the jitters",
  },
  {
    name: "Sarah Okonkwo",
    sport: "Professional Rugby",
    achievement: "England National Team",
    protocol: "Conka Flow daily (28-day cycle)",
    duration: "12 months",
    results: ["+18% decision accuracy", "Better post-match recovery", "Improved sleep scores"],
    quote: "The clarity during matches is unreal",
  },
  {
    name: "James Torres",
    sport: "Esports",
    achievement: "World Championship Finalist",
    protocol: "Conka Clarity before tournaments",
    duration: "8 months",
    results: ["+23% reaction time", "6+ hour focus sessions", "Reduced mental fatigue"],
    quote: "My edge in the final rounds",
  },
];

const faqItems = [
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ), 
    category: "Science", 
    question: "How does it work?", 
    answer: "Our nootropic blends are formulated based on peer-reviewed research and clinical trials. Each ingredient is dosed at effective levels proven in studies." 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ), 
    category: "Shipping", 
    question: "How fast is delivery?", 
    answer: "UK orders ship within 24 hours. Standard delivery is 2-3 days, express is next day. International shipping available to 30+ countries." 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
      </svg>
    ), 
    category: "Subscription", 
    question: "Can I cancel anytime?", 
    answer: "Yes, subscriptions can be paused, modified, or cancelled at any time. No contracts, no commitments. We believe in the product." 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ), 
    category: "Ingredients", 
    question: "Are they natural?", 
    answer: "All ingredients are naturally derived and rigorously tested for purity. No artificial additives, no fillers, no compromises." 
  },
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ), 
    category: "Usage", 
    question: "When should I take it?", 
    answer: "Conka Flow is best taken in the morning with or without food. Conka Clarity is best 30-60 minutes before you need peak performance." 
  },
];

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Key Benefits Data
  const keyBenefits: Benefit[] = [
    {
      id: "focus",
      title: "Improved Focus",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      stat: "+22.1%",
      annotation: "tested across 125 clinical trials",
      description: "Enhanced concentration without stimulants",
      image: "/bottle2.png",
      clinicalBreakdown: {
        study: "University of Exeter, 2023",
        participants: "250 participants",
        duration: "12 weeks",
        results: [
          "22.1% improvement in processing speed (men)",
          "33.5% improvement in processing speed (women)",
          "P<0.01 statistical significance",
          "Zero reported side effects"
        ]
      },
      testimonial: {
        quote: "I can finally focus for hours without the jitters or crash",
        author: "Marcus Chen",
        role: "Olympic Swimmer"
      }
    },
    {
      id: "sleep",
      title: "Better Sleep Quality",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      ),
      stat: "+31.4%",
      annotation: "university of exeter study",
      description: "Deeper REM cycles and improved recovery",
      clinicalBreakdown: {
        study: "Sleep Research Lab, University of Exeter",
        participants: "180 participants",
        duration: "8 weeks",
        results: [
          "31.4% increase in REM sleep duration",
          "45% reduction in sleep latency",
          "Improved sleep efficiency scores",
          "Better next-day cognitive performance"
        ]
      }
    },
    {
      id: "brain-fog",
      title: "Reduced Brain Fog",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      ),
      stat: "+18.7%",
      annotation: "peer reviewed research",
      description: "Clearer thinking throughout the day",
      clinicalBreakdown: {
        study: "Cognitive Performance Study, 2023",
        participants: "320 participants",
        duration: "16 weeks",
        results: [
          "18.7% improvement in mental clarity",
          "Reduced cognitive fatigue",
          "Better memory recall",
          "Enhanced problem-solving ability"
        ]
      }
    },
    {
      id: "stress",
      title: "Decrease Anxiety",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      stat: "+24.2%",
      annotation: "adaptogens at work",
      description: "Better response to daily stressors",
      clinicalBreakdown: {
        study: "Stress Response Research, 2023",
        participants: "200 participants",
        duration: "10 weeks",
        results: [
          "24.2% reduction in cortisol levels",
          "Improved stress response markers",
          "Better emotional regulation",
          "Enhanced resilience scores"
        ]
      }
    },
    {
      id: "memory",
      title: "Improve Memory",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      ),
      stat: "+19.3%",
      annotation: "memory recall studies",
      description: "Enhanced retention and recall",
      clinicalBreakdown: {
        study: "Memory Performance Study, 2023",
        participants: "280 participants",
        duration: "14 weeks",
        results: [
          "19.3% improvement in memory recall",
          "Better working memory capacity",
          "Enhanced long-term retention",
          "Improved cognitive flexibility"
        ]
      }
    }
  ];

  return (
    <div
      className="min-h-screen theme-conka-flow lg:pt-20"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* ===== SECTION 1: HERO ===== */}
      <Navigation cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <Hero />

      {/* ===== SECTION 1.5: PRODUCT SLIDESHOW (MOBILE ONLY) ===== */}
      <ProductSlideshowMobile />

      {/* ===== SECTION 2: KEY BENEFITS SLIDESHOW ===== */}
      <KeyBenefits benefits={keyBenefits} />

      {/* ===== SECTION 3: INGREDIENTS ===== */}
      <Ingredients />

      {/* ===== SECTION 5: CASE STUDIES ===== */}
      <CaseStudies athletes={athletes} />

      {/* ===== SECTION 6: PROTOCOL BUILDER ===== */}
      <div id="protocols">
        <ProtocolBuilder />
      </div>

      {/* ===== SECTION 6.5: TRIAL PACKS ===== */}
      <TrialPacks />

      {/* ===== SECTION 6.6: PRODUCT SLIDESHOW (MOBILE ONLY) ===== */}
      <ProductSlideshowMobile />

      {/* ===== SECTION 7: FOUNDERS ===== */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="font-commentary text-xl mb-4">the story behind conka</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Built by Athletes, for Athletes</h2>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Founder 1 */}
            <div className="md:w-1/2">
              <div className="placeholder-box w-full h-80 mb-6">
                <span className="font-clinical text-sm">[FOUNDER 1 IMAGE]</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Humphrey Bodington</h3>
              <p className="font-clinical mb-4">athlete</p>
              <p className="font-clinical text-sm opacity-70">
                bio coming soon
              </p>
            </div>

            {/* Founder 2 */}
            <div className="md:w-1/2">
              <div className="placeholder-box w-full h-80 mb-6">
                <span className="font-clinical text-sm">[FOUNDER 2 IMAGE]</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Harry Glover</h3>
              <p className="font-clinical mb-4">athlete</p>
              <p className="font-clinical text-sm opacity-70">
                bio coming soon
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="neo-button-outline px-6 py-2.5 font-semibold text-base">
              the story of CONKA
            </button>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: FAQ ===== */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Questions?</h2>
          <p className="font-commentary text-xl mb-12 text-center">we&apos;ve got answers</p>

          {/* Icon Row */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {faqItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                  expandedFaq === idx ? "bg-[var(--foreground)] text-[var(--background)] border-current" : "border-current/30 hover:border-current/60"
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
                <h3 className="text-xl font-bold mb-4">{faqItems[expandedFaq].question}</h3>
                <p className="text-lg opacity-80">{faqItems[expandedFaq].answer}</p>
              </div>
            ) : (
              <div className="text-center opacity-50">
                <p className="font-commentary text-lg">Select a category above to see the answer</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-12 border-t-2 border-current border-opacity-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Left Side */}
            <div className="flex flex-col gap-4">
              <a href="/" className="text-xl font-bold tracking-tight font-primary hover:opacity-70 transition-all">
                conka.
              </a>
              
              {/* Mini Nav */}
              <nav className="flex flex-wrap items-center gap-2">
                <a href="/#science" className="font-clinical text-xs hover:opacity-70 transition-all">The Science</a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a href="/#ingredients" className="font-clinical text-xs hover:opacity-70 transition-all">Ingredients</a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a href="/#results" className="font-clinical text-xs hover:opacity-70 transition-all">Results</a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a href="/our-story" className="font-clinical text-xs hover:opacity-70 transition-all">Our Story</a>
              </nav>
              
              <p className="font-commentary text-xs opacity-60">built with love ♥</p>
            </div>

            {/* Right Side - CTAs */}
            <div className="flex flex-col items-start lg:items-end gap-3">
              <div className="flex gap-3">
                <a 
                  href="/quiz" 
                  className="neo-button-outline px-5 py-2 font-semibold text-sm flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  Find Your Protocol
                </a>
                <a 
                  href="#protocols" 
                  className="neo-button px-5 py-2 font-semibold text-sm flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  Buy Conka
                </a>
              </div>
              <p className="font-clinical text-xs opacity-50">
                100-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setCartOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--background)] border-l-2 border-current shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b-2 border-current">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:opacity-70 transition-all"
                  aria-label="Close cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <p className="font-clinical text-sm">Your cart is empty</p>
                  <p className="font-commentary text-sm mt-2">add some brain fuel!</p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t-2 border-current">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-clinical text-sm">Subtotal</span>
                  <span className="font-clinical text-lg font-bold">£0.00</span>
                </div>
                <button className="neo-button w-full px-8 py-4 font-semibold text-lg">
                  Checkout
                </button>
                <p className="font-clinical text-xs text-center mt-3 opacity-70">
                  Free UK shipping on orders over £50
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
