"use client";

import { useState } from "react";
import KeyBenefits, { Benefit } from "./components/KeyBenefits";
import CaseStudies from "./components/CaseStudies";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProtocolBuilder from "./components/ProtocolBuilder";
import TrialPacks from "./components/TrialPacks";

// Formula content data
const formulaContent = {
  "01": {
    name: "Formula 01",
    tagline: "Caffeine-Free Focus",
    patent: "Patented: GB2629279",
    headline: "Unlock sustained clarity without the crash",
    subheadline: "Designed for daily cognitive enhancement",
    annotation: "your daily foundation",
    ingredients: [
      { name: "Lemon Balm", part: "Leaves", percentage: "26.7%" },
      { name: "Turmeric", part: "Root", percentage: "25.4%" },
      { name: "Ashwagandha", part: "Plant", percentage: "26.7%" },
      { name: "Rhodiola rosea", part: "Root", percentage: "9.4%" },
      { name: "Bilberry", part: "Berries", percentage: "9.4%" },
      { name: "Black Pepper", part: "Root", percentage: "0.5%" },
    ],
    taste: "Citrus",
    benefits: [
      {
        title: "Improved Focus",
        stat: "+22.1%",
        annotation: "tested across 125 clinical trials",
        description: "Enhanced concentration without stimulants",
      },
      {
        title: "Better Sleep Quality",
        stat: "+31.4%",
        annotation: "university of exeter study",
        description: "Deeper REM cycles and improved recovery",
      },
      {
        title: "Reduced Brain Fog",
        stat: "+18.7%",
        annotation: "peer reviewed research",
        description: "Clearer thinking throughout the day",
      },
      {
        title: "Decrease Anxiety",
        stat: "+24.2%",
        annotation: "adaptogens at work",
        description: "Better response to daily stressors",
      },
    ],
    clinicalResults: [
      { metric: "Processing Speed", value: "+22.1%", pValue: "P<0.01", gender: "men" },
      { metric: "Processing Speed", value: "+33.5%", pValue: "P<0.01", gender: "women" },
      { metric: "Accuracy", value: "+10.8%", pValue: "P<0.01", gender: "men" },
      { metric: "Accuracy", value: "+13.4%", pValue: "P=0.42", gender: "women" },
      { metric: "Cognitive Index", value: "+16.5%", pValue: "P<0.05", gender: "men" },
      { metric: "Cognitive Index", value: "+23.4%", pValue: "P<0.05", gender: "women" },
    ],
  },
  "02": {
    name: "Formula 02",
    tagline: "Peak Performance Boost",
    headline: "Elevate your performance when it matters most",
    subheadline: "Strategic enhancement for high-stakes moments",
    annotation: "your competitive edge",
    ingredients: [
      { name: "Vitamin C", part: "", percentage: "50.46%" },
      { name: "Alpha GPC", part: "Seeds", percentage: "16.11%" },
      { name: "Glutathione", part: "Amino acid", percentage: "10.07%" },
      { name: "N-Acetyl Cysteine", part: "Amino acid", percentage: "10.07%" },
      { name: "Acetyl-L-Carnitine", part: "Amino acid", percentage: "5.04%" },
      { name: "Ginkgo Biloba", part: "Leaves", percentage: "3.02%" },
      { name: "Lecithin", part: "Seeds", percentage: "1.51%" },
      { name: "Lemon essential oil", part: "natural flavouring", percentage: "0.60%" },
      { name: "Alpha Lipoic Acid (ALA)", part: "Fatty acid", percentage: "0.20%" },
      { name: "Vitamin B12", part: "(bacterial fermentation)", percentage: "0.03%" },
    ],
    taste: "Lemons",
    benefits: [
      {
        title: "Reaction Time",
        stat: "-47ms",
        annotation: "measurable improvement",
        description: "Faster cognitive response under pressure",
      },
      {
        title: "Mental Endurance",
        stat: "+38.2%",
        annotation: "olympic athlete tested",
        description: "Sustained peak performance longer",
      },
      {
        title: "Memory Recall",
        stat: "+27.9%",
        annotation: "double-blind study",
        description: "Enhanced short-term memory access",
      },
      {
        title: "Neural Connectivity",
        stat: "+19.3%",
        annotation: "neuroimaging confirmed",
        description: "Improved brain region communication",
      },
    ],
    clinicalResults: [
      { metric: "Reaction Time", value: "-47ms", pValue: "P<0.001", gender: "all" },
      { metric: "Working Memory", value: "+27.9%", pValue: "P<0.01", gender: "all" },
      { metric: "Executive Function", value: "+21.3%", pValue: "P<0.05", gender: "men" },
      { metric: "Executive Function", value: "+19.8%", pValue: "P<0.05", gender: "women" },
      { metric: "Mental Fatigue Onset", value: "+45min", pValue: "P<0.01", gender: "all" },
      { metric: "Peak Performance Duration", value: "+38.2%", pValue: "P<0.01", gender: "all" },
    ],
  },
};

const athletes = [
  {
    name: "Marcus Chen",
    sport: "Olympic Swimming",
    achievement: "3x Gold Medalist",
    protocol: "Formula 01 daily + Formula 02 on competition days",
    duration: "18 months",
    results: ["+12% lap consistency", "-0.3s average time", "Zero crashes"],
    quote: "Finally found something that works without the jitters",
  },
  {
    name: "Sarah Okonkwo",
    sport: "Professional Rugby",
    achievement: "England National Team",
    protocol: "Formula 01 daily (28-day cycle)",
    duration: "12 months",
    results: ["+18% decision accuracy", "Better post-match recovery", "Improved sleep scores"],
    quote: "The clarity during matches is unreal",
  },
  {
    name: "James Torres",
    sport: "Esports",
    achievement: "World Championship Finalist",
    protocol: "Formula 02 before tournaments",
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
    answer: "Formula 01 is best taken in the morning with or without food. Formula 02 is best 30-60 minutes before you need peak performance." 
  },
];

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeFormula, setActiveFormula] = useState<"01" | "02">("01");

  // Use Formula 01 content as base (unified page)
  const formula01 = formulaContent["01"];
  const formula02 = formulaContent["02"];
  const currentFormula = formulaContent[activeFormula];

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
      className="min-h-screen theme-formula-01"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* ===== SECTION 1: HERO ===== */}
      <Navigation cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <Hero />

      {/* ===== SECTION 2: KEY BENEFITS SLIDESHOW ===== */}
      <KeyBenefits benefits={keyBenefits} />

      {/* ===== SECTION 3: INGREDIENTS ===== */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header with Toggle */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Ingredients & Taste</h2>
              <p className="font-commentary text-xl">what&apos;s inside</p>
            </div>
            {/* Formula Toggle */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveFormula("01")}
                className={`px-6 py-2 rounded-full border-2 border-black transition-all ${
                  activeFormula === "01"
                    ? "bg-black text-white"
                    : "bg-transparent text-black hover:bg-black/10"
                }`}
              >
                <span className="font-clinical text-sm font-medium">Formula 01</span>
              </button>
              <button
                onClick={() => setActiveFormula("02")}
                className={`px-6 py-2 rounded-full border-2 border-black transition-all ${
                  activeFormula === "02"
                    ? "bg-black text-white"
                    : "bg-transparent text-black hover:bg-black/10"
                }`}
              >
                <span className="font-clinical text-sm font-medium">Formula 02</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Left: Image */}
            <div className="md:w-1/2">
              <div className="placeholder-box w-full h-80 md:h-[450px]">
                <span className="font-clinical text-sm">[INGREDIENT IMAGE]</span>
              </div>
            </div>

            {/* Right: Formula Box */}
            <div className="md:w-1/2">
              <div className="neo-box">
                <div className="neo-box-inverted p-4 flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{currentFormula.name}</h3>
                  {'patent' in currentFormula && currentFormula.patent ? (
                    <span className="font-clinical text-sm">{currentFormula.patent}</span>
                  ) : (
                    <span className="font-commentary text-lg">{currentFormula.tagline}</span>
                  )}
                </div>
                
                <div className="p-6">
                  <p className="font-clinical text-sm mb-4 opacity-70">FORMULA BREAKDOWN</p>
                  
                  <div className="space-y-3">
                    {currentFormula.ingredients.map((ing, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-current border-opacity-20 last:border-0">
                        <div>
                          <span className="font-medium">{ing.name}</span>
                          {ing.part && (
                            <span className="font-clinical text-sm opacity-70 ml-2">– {ing.part}</span>
                          )}
                        </div>
                        <span className="font-clinical font-medium">{ing.percentage}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t-2 border-current border-opacity-20">
                    <div className="flex justify-between items-center">
                      <p className="font-clinical text-sm opacity-70">tastes like</p>
                      <p className="font-commentary text-xl">{currentFormula.taste}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <p className="font-clinical text-sm font-medium">Antioxidant Heavy</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <p className="font-clinical text-sm font-medium">Zero Calories</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                  <line x1="2" y1="8" x2="22" y2="8"/>
                </svg>
              </div>
              <p className="font-clinical text-sm font-medium">No Caffeine</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <p className="font-clinical text-sm font-medium">Vegan Friendly</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: CASE STUDIES ===== */}
      <CaseStudies athletes={athletes} />

      {/* ===== SECTION 6: PROTOCOL BUILDER ===== */}
      <ProtocolBuilder />

      {/* ===== SECTION 6.5: TRIAL PACKS ===== */}
      <TrialPacks />

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
            <button className="neo-button-outline px-8 py-4 font-semibold text-lg">
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
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {faqItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className={`px-5 py-4 rounded-full border-2 border-current transition-all flex flex-col items-center ${
                  expandedFaq === idx ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-transparent hover:bg-current/10"
                }`}
              >
                <div className="w-6 h-6 mb-1 flex items-center justify-center">
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
      <footer className="px-6 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* Left Side */}
            <div className="flex flex-col gap-6">
              <span className="text-xl md:text-2xl font-bold tracking-tight font-primary">conka.</span>
              
              {/* Mini Nav */}
              <nav className="flex flex-wrap items-center gap-2">
                <a href="#" className="font-clinical text-sm hover:opacity-70 transition-all">The Science</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="#" className="font-clinical text-sm hover:opacity-70 transition-all">Ingredients</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="#" className="font-clinical text-sm hover:opacity-70 transition-all">Results</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="#" className="font-clinical text-sm hover:opacity-70 transition-all">Our Story</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="#" className="font-clinical text-sm hover:opacity-70 transition-all">Shop</a>
              </nav>
              
              <p className="font-clinical text-sm opacity-70">
                Patent #GB2620279 • 125 Clinical Trials • £500,000+ in Research
              </p>
              <p className="font-commentary text-sm">built with love ♥</p>
            </div>

            {/* Right Side - CTA */}
            <div className="flex flex-col items-start lg:items-end gap-4">
              <p className="font-commentary text-xl lg:text-right">ready to unlock your potential?</p>
              <button className="neo-button px-8 py-3 font-bold text-base">
                buy CONKA
              </button>
              <p className="font-clinical text-sm opacity-70 lg:text-right">
                100 day money-back guarantee
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
