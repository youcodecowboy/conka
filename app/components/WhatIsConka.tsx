"use client";

import { useRef, useState, useEffect } from "react";
import useIsMobile from "../hooks/useIsMobile";
import Link from "next/link";
import Image from "next/image";

interface FormulaOverview {
  id: "01" | "02";
  name: string;
  tagline: string;
  description: string;
  positioning: string;
  whenToTake: string;
  accentColor: string;
  keyBenefits: { stat: string; label: string; source: string }[];
  image: string;
  focalX: number;
  focalY: number;
  link: string;
}

const formulas: FormulaOverview[] = [
  {
    id: "01",
    name: "CONKA Flow",
    tagline: "Caffeine-Free Focus",
    description:
      "Your daily foundation. Adaptogenic herbs that build stress resilience, support recovery, and provide sustained energy without caffeine crashes.",
    positioning: "ENERGY",
    whenToTake: "Morning ritual",
    accentColor: "#f59e0b", // Amber
    keyBenefits: [
      // All stats verified in BRAND_HIGHLIGHTS.md with PMID sources
      { stat: "-56%", label: "Stress Score", source: "PMID: 23439798" },
      { stat: "+18%", label: "Memory", source: "PMID: 12888775" },
      { stat: "-28%", label: "Cortisol", source: "PMID: 23439798" },
    ],
    image: "/CONKA_01.jpg",
    focalX: 55,
    focalY: 48,
    link: "/conka-flow",
  },
  {
    id: "02",
    name: "CONKA Clear",
    tagline: "Peak Performance Boost",
    description:
      "Your competitive edge. Nootropic compounds that enhance mental clarity, reaction time, and decision-making when you need peak performance.",
    positioning: "CLARITY",
    whenToTake: "Before peak performance",
    accentColor: "#AAB9BC", // Teal
    keyBenefits: [
      // All stats verified in BRAND_HIGHLIGHTS.md with PMID sources
      { stat: "+40%", label: "Glutathione", source: "PMID: 29559699" },
      { stat: "-35%", label: "Mental Fatigue", source: "PMID: 18937015" },
      { stat: "7x", label: "Brain Protection", source: "PMID: 23690582" },
    ],
    image: "/CONKA_06.jpg",
    focalX: 52,
    focalY: 50,
    link: "/conka-clarity",
  },
];

function FormulaCard({
  formula,
  isActive,
  isMobile = false,
}: {
  formula: FormulaOverview;
  isActive?: boolean;
  isMobile?: boolean;
}) {
  return (
    <div
      className="neo-box p-5 lg:p-6 h-full flex flex-col"
      style={{
        borderColor: isActive ? formula.accentColor : "var(--foreground)",
        borderWidth: isActive ? "3px" : "2px",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p
            className="font-clinical text-xs tracking-wider mb-1"
            style={{ color: formula.accentColor }}
          >
            FORMULA {formula.id} — {formula.positioning}
          </p>
          <h3 className="text-2xl lg:text-3xl font-bold">{formula.name}</h3>
          <p className="font-commentary text-lg mt-1">{formula.tagline}</p>
        </div>
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 mt-2"
          style={{ backgroundColor: formula.accentColor }}
        />
      </div>

      {/* Product Image */}
      <Link
        href={formula.link}
        className="block relative w-full h-40 lg:h-48 rounded-lg overflow-hidden mb-4 hover:opacity-90 transition-opacity"
      >
        <Image
          src={formula.image}
          alt={`${formula.name} product`}
          fill
          className="object-cover"
          style={{
            objectPosition: `${formula.focalX}% ${formula.focalY}%`,
          }}
          sizes="(max-width: 768px) 85vw, 400px"
          loading="lazy"
        />
      </Link>

      {/* Description */}
      <p className="font-clinical text-sm opacity-80 mb-4 leading-relaxed">
        {formula.description}
      </p>

      {/* When to take */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="font-clinical text-xs opacity-60">
          {formula.whenToTake}
        </span>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {formula.keyBenefits.map((benefit, idx) => (
          <div key={idx} className="text-center">
            <p
              className="text-xl lg:text-2xl font-bold"
              style={{ color: formula.accentColor }}
            >
              {benefit.stat}
            </p>
            <p className="font-clinical text-[10px] lg:text-xs opacity-60 leading-tight">
              {benefit.label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Link
          href={formula.link}
          className="neo-button-outline px-4 py-2 font-semibold text-sm inline-flex items-center gap-2 w-full justify-center"
        >
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function WhatIsConkaMobile() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85; // Card is 85vw
      const gap = 16; // gap-4
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, formulas.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth * 0.85;
    const gap = 16;
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="pt-6 md:pt-4 pb-12 overflow-hidden">
      {/* Header */}
      <div className="px-6 mb-6">
        <p className="font-commentary text-lg mb-2">engineered for results</p>
        <h2 className="text-3xl font-bold mb-3">What is CONKA?</h2>
        <p className="font-clinical text-sm opacity-70 max-w-md">
          Two precision-formulated supplements, one complete cognitive system.
          Every ingredient backed by peer-reviewed research. Every claim
          verified by PubMed.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="px-6 mb-4 flex items-center gap-2">
        <div className="flex gap-2">
          {formulas.map((formula, idx) => (
            <button
              key={formula.id}
              onClick={() => scrollToIndex(idx)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all"
              style={{
                borderColor:
                  activeIndex === idx
                    ? formula.accentColor
                    : "var(--foreground)",
                opacity: activeIndex === idx ? 1 : 0.4,
                backgroundColor:
                  activeIndex === idx ? formula.accentColor : "transparent",
                color: activeIndex === idx ? "white" : "var(--foreground)",
              }}
            >
              <span className="font-clinical text-xs">{formula.name}</span>
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1 opacity-40">
          <span className="font-clinical text-xs">swipe</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 snap-x snap-mandatory"
        style={{ scrollPaddingLeft: "24px" }}
      >
        {formulas.map((formula, idx) => (
          <div
            key={formula.id}
            className="flex-shrink-0 snap-start"
            style={{ width: "85vw", maxWidth: "400px" }}
          >
            <FormulaCard
              formula={formula}
              isActive={activeIndex === idx}
              isMobile={true}
            />
          </div>
        ))}
        {/* Spacer for last card */}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* Bottom indicator dots */}
      <div className="flex justify-center gap-2 mt-6">
        {formulas.map((formula, idx) => (
          <button
            key={formula.id}
            onClick={() => scrollToIndex(idx)}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor:
                activeIndex === idx ? formula.accentColor : "var(--foreground)",
              opacity: activeIndex === idx ? 1 : 0.2,
              transform: activeIndex === idx ? "scale(1.5)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

function WhatIsConkaDesktop() {
  return (
    <section className="px-16 pt-8 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-commentary text-xl mb-2">engineered for results</p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            What is CONKA?
          </h2>
          <p className="font-clinical text-base opacity-70 max-w-2xl mx-auto leading-relaxed">
            Two precision-formulated supplements designed for different moments.
            One complete cognitive system. Every ingredient backed by
            peer-reviewed research, every claim verified by studies indexed in
            PubMed.
          </p>
        </div>

        {/* Formula Cards - Side by Side */}
        <div className="grid grid-cols-2 gap-8">
          {formulas.map((formula) => (
            <FormulaCard key={formula.id} formula={formula} />
          ))}
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-8">
          <p className="font-clinical text-sm opacity-50">
            32 peer-reviewed studies • 6,000+ clinical trial participants • 16
            active ingredients
          </p>
        </div>
      </div>
    </section>
  );
}

export default function WhatIsConka() {
  const isMobile = useIsMobile(1024);

  if (isMobile) {
    return <WhatIsConkaMobile />;
  }

  return <WhatIsConkaDesktop />;
}
