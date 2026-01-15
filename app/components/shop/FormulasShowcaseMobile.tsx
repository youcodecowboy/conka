"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formulas, FormulaShowcaseData } from "./formulasShowcaseData";

// Mobile Formula Card Component
function FormulaCard({
  formula,
  isActive,
}: {
  formula: FormulaShowcaseData;
  isActive?: boolean;
}) {
  return (
    <div
      className="neo-box p-5 h-full flex flex-col"
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
          <h3 className="text-2xl font-bold">{formula.name}</h3>
          <p className="font-commentary text-lg mt-1">{formula.subtitle}</p>
        </div>
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 mt-2"
          style={{ backgroundColor: formula.accentColor }}
        />
      </div>

      {/* Product Image */}
      <Link
        href={formula.href}
        className="block relative w-full h-40 rounded-lg overflow-hidden mb-4 hover:opacity-90 transition-opacity"
      >
        <Image
          src={formula.image.src}
          alt={formula.image.alt}
          fill
          className="object-cover"
          style={{
            objectPosition: `${formula.image.focalX}% ${formula.image.focalY}%`,
          }}
          sizes="85vw"
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
        {formula.stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <p
              className="text-xl font-bold"
              style={{ color: formula.accentColor }}
            >
              {stat.value}
            </p>
            <p className="font-clinical text-[10px] opacity-60 leading-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Link
          href={formula.href}
          className="neo-button px-4 py-2.5 font-semibold text-sm inline-flex items-center gap-2 w-full justify-center rounded-lg"
        >
          Shop {formula.name}
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

export default function FormulasShowcaseMobile() {
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
    <section className="py-12 overflow-hidden">
      {/* Header */}
      <div className="px-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">Individual Formulas</h2>
        <p className="font-commentary text-sm opacity-70">
          build your own stack
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
            <FormulaCard formula={formula} isActive={activeIndex === idx} />
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

      {/* Comparison note */}
      <div className="mt-6 text-center px-6">
        <p className="font-commentary text-base opacity-70">
          both formulas work together synergistically
        </p>
      </div>
    </section>
  );
}
