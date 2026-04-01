"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Landing page "What's Inside" collapsible accordion.
 * Follows the Overload pattern: "what does it do?" / "ingredients" / "science" / "how to use"
 * Adapted for CONKA with real product data.
 *
 * Page wraps this in premium-section-luxury + premium-track.
 * Component is content-only.
 */

import { FUNNEL_URL } from "@/app/lib/landingConstants";

const SECTIONS = [
  {
    id: "what",
    question: "What does CONKA do?",
    content: (
      <>
        <p>
          <strong><em>Morning foundation:</em></strong> CONKA Flow supports your nervous system and focus with adaptogens like Ashwagandha and Lemon Balm, so you stay sharp without caffeine, jitters, or a crash.
        </p>
        <p className="mt-3">
          <strong><em>Evening recovery:</em></strong> CONKA Clear combines nootropics like Alpha GPC and Glutathione with Vitamin C, which contributes to normal psychological function†† and the reduction of tiredness and fatigue.††
        </p>
        <p className="mt-3">
          <strong><em>Better together:</em></strong> Designed to work as a daily pair. CONKA Flow provides your morning foundation with adaptogens, while CONKA Clear supports your evening with nootropics and antioxidants. A complete daily routine in two shots.
        </p>
      </>
    ),
  },
  {
    id: "ingredients",
    question: "What's in it?",
    content: (
      <>
        <p className="font-semibold mb-2">CONKA Flow (Morning)</p>
        <p className="opacity-70">
          Lemon Balm · Turmeric · KSM-66® Ashwagandha · Rhodiola Rosea · Bilberry · Black Pepper
        </p>
        <p className="font-semibold mt-4 mb-2">CONKA Clear (Evening)</p>
        <p className="opacity-70">
          Vitamin C · Alpha GPC · Glutathione · N-Acetyl Cysteine · Acetyl-L-Carnitine · Ginkgo Biloba · Vitamin B12
        </p>
        <p className="mt-4 text-xs opacity-40">
          All ingredients are clinically dosed.† No proprietary blends. Full amounts on the label.
        </p>
      </>
    ),
  },
  {
    id: "science",
    question: "Science & certifications",
    content: (
      <>
        <p>
          Every batch is third-party tested by the UK&apos;s leading supplement testing laboratory. CONKA is <strong>Informed Sport Certified</strong>, the same standard used by professional athletes.
        </p>
        <p className="mt-3">
          All key ingredients are backed by peer-reviewed clinical studies (PubMed-indexed). CONKA Flow holds a UK patent (GB2629279).
        </p>
        <p className="mt-3 opacity-50">
          Made in Britain · GMP Certified · Vegan Friendly
        </p>
      </>
    ),
  },
  {
    id: "how",
    question: "How do I take it?",
    content: (
      <>
        <p>
          <strong>CONKA Flow:</strong> One shot in the morning, with or without food. Works as a coffee replacement.
        </p>
        <p className="mt-3">
          <strong>CONKA Clear:</strong> One shot in the evening, 30–60 minutes before you want peak clarity or before bed for overnight recovery.
        </p>
        <p className="mt-3">
          Each box contains 28 shots (one per day). Both together = 56 shots per month.
        </p>
      </>
    ),
  },
];

export default function LandingWhatsInside() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {/* Desktop: two-column (image left, content right) */}
      {/* Mobile: image above heading, then accordion */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
        {/* Lifestyle image — square, sticky on desktop */}
        <div className="lg:w-2/5 lg:sticky lg:top-8 mb-8 lg:mb-0">
          <div className="overflow-hidden rounded-2xl lg:rounded-[var(--premium-radius-card)] max-w-md mx-auto lg:max-w-none">
            <Image
              src="/lifestyle/FlowHold.jpg"
              alt="Man holding CONKA Flow bottle outdoors"
              width={800}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Content column */}
        <div className="lg:w-3/5">
          {/* Heading */}
          <div className="mb-6">
            <h2
              className="premium-section-heading"
              style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
            >
              Everything you need to know.
            </h2>
          </div>

          {/* Accordion */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-premium-stroke)",
            }}
          >
        {SECTIONS.map((section, i) => {
          const isOpen = openId === section.id;
          const isLast = i === SECTIONS.length - 1;

          return (
            <div key={section.id}>
              <button
                onClick={() => setOpenId(isOpen ? null : section.id)}
                aria-expanded={isOpen}
                aria-controls={`lp-inside-${section.id}`}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span
                  className="text-base"
                  style={{
                    fontWeight: isOpen ? 600 : 500,
                    color: "var(--color-ink)",
                  }}
                >
                  {section.question}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 transition-transform duration-300"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    color: "var(--color-ink)",
                    opacity: isOpen ? 0.7 : 0.25,
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div
                id={`lp-inside-${section.id}`}
                role="region"
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: isOpen ? "600px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div
                  className="px-5 pb-5 text-sm leading-relaxed"
                  style={{ color: "var(--color-ink)", opacity: 0.7 }}
                >
                  {section.content}
                </div>
              </div>

              {!isLast && (
                <div
                  className="mx-5"
                  style={{ height: "1px", background: "var(--color-ink)", opacity: 0.08 }}
                />
              )}
            </div>
          );
        })}
      </div>

          {/* CTA */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <a
              href={FUNNEL_URL}
              className="block w-full lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: "var(--color-ink)" }}
            >
              Start Your Routine →
            </a>
          </div>
        </div>{/* end content column */}
      </div>{/* end flex-row */}
    </div>
  );
}
