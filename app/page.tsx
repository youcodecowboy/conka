"use client";

import { useState } from "react";
import KeyBenefits, { Benefit } from "./components/KeyBenefits";
import CaseStudies from "./components/CaseStudies";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";

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
  { icon: "🧪", category: "Science", question: "How does it work?", answer: "Our nootropic blends are formulated based on peer-reviewed research and clinical trials. Each ingredient is dosed at effective levels proven in studies." },
  { icon: "📦", category: "Shipping", question: "How fast is delivery?", answer: "UK orders ship within 24 hours. Standard delivery is 2-3 days, express is next day. International shipping available to 30+ countries." },
  { icon: "🔄", category: "Subscription", question: "Can I cancel anytime?", answer: "Yes, subscriptions can be paused, modified, or cancelled at any time. No contracts, no commitments. We believe in the product." },
  { icon: "🌱", category: "Ingredients", question: "Are they natural?", answer: "All ingredients are naturally derived and rigorously tested for purity. No artificial additives, no fillers, no compromises." },
  { icon: "⏰", category: "Usage", question: "When should I take it?", answer: "Formula 01 is best taken in the morning with or without food. Formula 02 is best 30-60 minutes before you need peak performance." },
];

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "recommended" | "maximum">("recommended");
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

  const planDetails = {
    starter: { shots: 4, frequency: "Once weekly", description: "Gentle introduction" },
    recommended: { shots: 12, frequency: "3x weekly", description: "Optimal results" },
    maximum: { shots: 28, frequency: "Daily", description: "Maximum effectiveness" },
  };

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
                  {currentFormula.patent ? (
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

      {/* ===== SECTION 6: PLAN BUILDER / CALENDAR ===== */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Build Your Protocol</h2>
          <p className="font-commentary text-xl mb-12">find your optimal routine</p>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Plan Selector */}
            <div className="md:w-1/3 space-y-4">
              {(Object.keys(planDetails) as Array<keyof typeof planDetails>).map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full p-6 text-left transition-all ${
                    selectedPlan === plan ? "neo-box-inverted" : "neo-box"
                  }`}
                >
                  <p className="font-clinical text-sm uppercase opacity-70">{plan}</p>
                  <p className="text-3xl font-bold font-clinical">{planDetails[plan].shots} shots</p>
                  <p className="text-sm mt-2">{planDetails[plan].frequency}</p>
                  <p className="font-commentary text-sm mt-1">{planDetails[plan].description}</p>
                </button>
              ))}
            </div>

            {/* Right: Calendar Visualization */}
            <div className="md:w-2/3 neo-box p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Your Month</h3>
                <span className="font-clinical text-sm opacity-70">
                  {planDetails[selectedPlan].shots} doses / {selectedPlan === "maximum" ? "28 days" : selectedPlan === "recommended" ? "12 days" : "4 days"}
                </span>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                  <div key={idx} className="text-center font-clinical text-sm opacity-70 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 28 }, (_, idx) => {
                  const dayNum = idx + 1;
                  let isActive = false;
                  if (selectedPlan === "maximum") isActive = true;
                  if (selectedPlan === "recommended") isActive = dayNum % 2 === 1 || dayNum % 3 === 0;
                  if (selectedPlan === "starter") isActive = dayNum % 7 === 1;
                  
                  return (
                    <div
                      key={idx}
                      className={`aspect-square flex items-center justify-center font-clinical text-sm border-2 border-current ${
                        isActive ? "neo-box-inverted" : "opacity-30"
                      }`}
                    >
                      {dayNum}
                    </div>
                  );
                })}
              </div>

              <p className="font-commentary text-lg text-center">
                over £500,000 in research so far!
              </p>

              {/* Bundle Option */}
              <div className="mt-8 pt-8 border-t-2 border-current border-opacity-30">
                <p className="font-clinical text-sm mb-4 opacity-70">BUNDLE SUGGESTION</p>
                <div className="flex gap-4">
                  <div className="neo-box p-4 flex-1">
                    <p className="font-bold">Path 1</p>
                    <p className="font-clinical text-sm mt-2">28× Formula 01 (daily)</p>
                    <p className="font-clinical text-sm">4× Formula 02 (weekly boost)</p>
                  </div>
                  <div className="neo-box p-4 flex-1">
                    <p className="font-bold">Path 2</p>
                    <p className="font-clinical text-sm mt-2">28× Formula 01 (daily)</p>
                    <p className="font-clinical text-sm">8× Formula 02 (2× weekly)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <h3 className="text-2xl font-bold mb-2">Alex Thompson</h3>
              <p className="font-clinical mb-4">Olympic Swimmer • Team GB</p>
              <p className="mb-4">
                After three concussions during training, Alex experienced persistent brain fog 
                and struggled to maintain the focus that had defined his career.
              </p>
              <p className="font-commentary text-lg">
                &quot;I needed something that actually worked. So we built it.&quot;
              </p>
            </div>

            {/* Founder 2 */}
            <div className="md:w-1/2">
              <div className="placeholder-box w-full h-80 mb-6">
                <span className="font-clinical text-sm">[FOUNDER 2 IMAGE]</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Ryan Mitchell</h3>
              <p className="font-clinical mb-4">Professional Rugby • Premiership</p>
              <p className="mb-4">
                Multiple head injuries led to early retirement and years of cognitive challenges. 
                Traditional supplements never delivered on their promises.
              </p>
              <p className="font-commentary text-lg">
                &quot;We partnered with universities because we wanted proof, not marketing.&quot;
              </p>
            </div>
          </div>

          <div className="neo-box p-8 mt-12 text-center">
            <p className="text-xl mb-4">
              Two best friends. Former elite athletes. Both affected by the mental toll of their sports.
            </p>
            <p className="font-commentary text-2xl">
              They built Conka for themselves first—then realized others needed it too.
            </p>
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
                className={`px-5 py-4 rounded-full border-2 border-current transition-all ${
                  expandedFaq === idx ? "bg-current text-[var(--background)]" : "bg-transparent hover:bg-current/10"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="font-clinical text-xs mt-1">{item.category}</p>
              </button>
            ))}
          </div>

          {/* Expanded Answer */}
          {expandedFaq !== null && (
            <div className="neo-box p-8 content-transition">
              <h3 className="text-xl font-bold mb-4">{faqItems[expandedFaq].question}</h3>
              <p className="text-lg opacity-80">{faqItems[expandedFaq].answer}</p>
            </div>
          )}

          {/* Final CTA */}
          <div className="text-center mt-16">
            <p className="font-commentary text-2xl mb-6">ready to unlock your potential?</p>
            <button className="neo-button px-12 py-5 font-bold text-xl">
              Buy Conka Now
            </button>
            <p className="font-clinical text-sm mt-4 opacity-70">
              100 day money-back guarantee • Free UK shipping • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-12 border-t-2 border-current border-opacity-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-xl md:text-2xl font-bold tracking-tight font-primary">conka.</span>
          <p className="font-clinical text-sm opacity-70">
            Patent #GB2620279 • 125 Clinical Trials • £500,000+ in Research
          </p>
          <p className="font-commentary">built with love ♥</p>
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
