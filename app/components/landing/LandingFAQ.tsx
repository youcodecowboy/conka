"use client";

import { useState } from "react";
import Image from "next/image";
import { GUARANTEE_LABEL_FULL, GUARANTEE_COPY_TRIAL } from "@/app/lib/offerConstants";
import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";
import LandingCTA from "./LandingCTA";

const FAQ_ITEMS = [
  {
    question: "What if my score doesn\u2019t improve?",
    answer:
      `We offer a ${GUARANTEE_LABEL_FULL}. ${GUARANTEE_COPY_TRIAL}, and if you're not satisfied, contact us for a full refund. No returns needed. We're confident enough in the product to take the risk for you.`,
  },
  {
    question: "What\u2019s the difference between Flow and Clear?",
    answer:
      "CONKA Flow (black cap) is your morning foundation. It uses adaptogens like Ashwagandha and Lemon Balm for calm focus without caffeine. CONKA Clear (white cap) is your afternoon recovery shot. It combines nootropics like Alpha GPC and Glutathione with Vitamin C, which contributes to normal psychological function.\u2020\u2020 One of each, every day.",
  },
  {
    question: "Can I take just one shot?",
    answer:
      "Yes. You can subscribe to Flow or Clear individually. However, the two formulas are designed to work as a daily pair. Flow supports your daytime focus and energy, Clear supports your afternoon recovery. Together they cover the full 24-hour cycle, and the combined subscription is better value per shot.",
  },
  {
    question: "How quickly will it arrive?",
    answer:
      "Orders placed before 2pm ship same day. Most UK customers receive their order within 1 to 2 working days. Subscriptions ship free. You\u2019ll receive tracking information by email as soon as your order dispatches.",
  },
  {
    question: "How do I cancel?",
    answer:
      `Cancel, pause, or modify anytime from your account. No contracts, no commitments, no questions asked. We also offer a ${GUARANTEE_LABEL_FULL}, so if you're not satisfied, you get a full refund.`,
  },
];

export default function LandingFAQ({ hideCTA = false }: { hideCTA?: boolean } = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Desktop: two-column (image left, content right) */}
      {/* Mobile: image above heading, then accordion */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
        {/* Lifestyle image — sticky on desktop */}
        <div className="lg:w-2/5 lg:sticky lg:top-8 mb-8 lg:mb-0">
          <div className="overflow-hidden rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] max-w-md mx-auto lg:max-w-none">
            <Image
              src="/lifestyle/ClearDrink.jpg"
              alt="Woman drinking CONKA Clear in the gym"
              width={800}
              height={800}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Content column */}
        <div className="lg:w-3/5">
          {/* Heading */}
          <div className="mb-10">
            <h2 className="brand-h1 mb-0">
              Frequently asked questions
            </h2>
          </div>

          {/* Accordion */}
          <div className="rounded-[var(--brand-radius-container)] overflow-hidden bg-white border border-black/6">
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
                    <span className={`text-base text-black ${isOpen ? "font-semibold" : "font-medium"}`}>
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
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-black/80" : "text-black/40"}`}
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
                    <div className="px-5 pb-5 text-sm leading-relaxed text-black/60">
                      {item.answer}
                    </div>
                  </div>

                  {!isLast && (
                    <div className="mx-5 h-px bg-black/8" />
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          {!hideCTA && (
            <div className="mt-8 flex justify-center lg:justify-start">
              <LandingCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot →</LandingCTA>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
