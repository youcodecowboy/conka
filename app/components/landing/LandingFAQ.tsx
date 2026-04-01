"use client";

import { useState } from "react";
import Image from "next/image";
import { FUNNEL_URL } from "@/app/lib/landingConstants";
import { GUARANTEE_DAYS, GUARANTEE_LABEL_FULL, GUARANTEE_COPY_TRIAL } from "@/app/lib/offerConstants";

/**
 * Landing page FAQ — conversion-focused questions.
 * Inspired by Magic Mind's framing: addresses hesitations, not just features.
 * Questions ordered by purchase intent: what → results → safety → logistics → risk.
 *
 * Page wraps this in premium-section-luxury + premium-track.
 * Component is content-only.
 */

const FAQ_ITEMS = [
  {
    question: "What makes CONKA different from coffee or energy drinks?",
    answer:
      "CONKA doesn't stimulate, it supports. CONKA Flow uses adaptogens like Ashwagandha and Lemon Balm to regulate your stress response and energy naturally, with no caffeine, no jitters, and no crash. CONKA Clear uses nootropics like Alpha GPC and Glutathione alongside Vitamin C, which contributes to normal psychological function and the protection of cells from oxidative stress.†† Together they support your daily cognitive routine rather than relying on stimulants.",
  },
  {
    question: "When will I notice results?",
    answer:
      `Everyone responds differently. Some people notice they feel calmer and more focused early on, while for others it takes a few weeks of consistent daily use. We recommend giving CONKA at least ${GUARANTEE_DAYS} days as part of your daily routine. That's why we offer a ${GUARANTEE_LABEL_FULL}, so you have time to find out what works for you.`,
  },
  {
    question: "Is CONKA safe to take every day?",
    answer:
      "Yes. Both formulas are designed specifically for daily use with naturally derived ingredients at clinically studied doses. CONKA is Informed Sport Certified, meaning every batch is independently tested for purity and banned substances. The same certification used by professional athletes.",
  },
  {
    question: "Which shot do I take when?",
    answer:
      "CONKA Flow (black cap) in the morning, with or without food. It's your daily foundation for focus and calm energy. CONKA Clear (white cap) in the evening, ideally 30 to 60 minutes before you need peak clarity, or before bed to support overnight recovery. One of each, every day.",
  },
  {
    question: "What are the ingredients?",
    answer:
      "CONKA Flow contains Lemon Balm, KSM-66 Ashwagandha, Turmeric, Rhodiola Rosea, Bilberry, and Black Pepper. CONKA Clear contains Vitamin C, Alpha GPC, Glutathione, N-Acetyl Cysteine, Acetyl-L-Carnitine, Ginkgo Biloba, and Vitamin B12. All ingredients are clinically dosed with full amounts on the label. No proprietary blends.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      `Yes. Cancel, pause, or modify anytime from your account. No contracts, no commitments, no questions asked. We also offer a ${GUARANTEE_LABEL_FULL}, so if you're not satisfied, you get a full refund.`,
  },
  {
    question: "When will I receive my order?",
    answer:
      "Orders placed before 2pm ship same day. Most UK customers receive their order within 1 to 2 working days. Subscriptions ship free. You'll receive tracking information by email as soon as your order dispatches.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      `We offer a ${GUARANTEE_LABEL_FULL}. ${GUARANTEE_COPY_TRIAL}, and if you're not satisfied, contact us for a full refund. No returns needed. We're confident enough in the product to take the risk for you.`,
  },
];

export default function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Desktop: two-column (image left, content right) */}
      {/* Mobile: image above heading, then accordion */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
        {/* Lifestyle image — sticky on desktop */}
        <div className="lg:w-2/5 lg:sticky lg:top-8 mb-8 lg:mb-0">
          <div className="overflow-hidden rounded-2xl lg:rounded-[var(--premium-radius-card)] max-w-md mx-auto lg:max-w-none">
            <Image
              src="/lifestyle/ClearDrink.jpg"
              alt="Woman drinking CONKA Clear in the gym"
              width={800}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Content column */}
        <div className="lg:w-3/5">
          {/* Heading */}
          <div className="mb-8">
            <h2
              className="premium-section-heading"
              style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
            >
              Frequently asked questions
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
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          const isLast = i === FAQ_ITEMS.length - 1;

          return (
            <div key={item.question}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span
                  className="text-base"
                  style={{
                    fontWeight: isOpen ? 600 : 500,
                    color: "var(--color-ink)",
                  }}
                >
                  {item.question}
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
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: isOpen ? "400px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div
                  className="px-5 pb-5 text-sm leading-relaxed"
                  style={{ color: "var(--color-ink)", opacity: 0.7 }}
                >
                  {item.answer}
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
              Try Risk-Free →
            </a>
          </div>
        </div>{/* end content column */}
      </div>{/* end flex-row */}
    </div>
  );
}
