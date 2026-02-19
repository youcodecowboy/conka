"use client";

import { useState } from "react";

const landingFaqItems = [
  {
    question: "How long until I feel results?",
    answer:
      "Within 30 minutes you'll notice a clearer mind and calm focus. The full benefits — improved stress resilience, sleep quality, and sustained performance — compound over 2–4 weeks of daily use.",
  },
  {
    question: "How does it work?",
    answer:
      "Each formula combines clinically-studied ingredients dosed at levels proven in peer-reviewed trials. Flow uses adaptogens to regulate your stress response and energy systems. Clear uses nootropics and antioxidants to boost cerebral blood flow and cellular repair.",
  },
  {
    question: "Are the science claims backed by research?",
    answer:
      "Yes. Every benefit claim links to a published clinical trial. Ingredients like Ashwagandha, Lemon Balm, and Ginkgo Biloba are dosed at the exact levels used in those peer-reviewed studies.",
  },
  {
    question: "Is it safe to take every day?",
    answer:
      "Yes. Both formulas are designed for daily use. CONKA Flow is your morning foundation; CONKA Clear can be taken daily or strategically before peak performance moments. All ingredients are naturally derived and Informed Sport certified.",
  },
  {
    question: "Can I take it with medication?",
    answer:
      "CONKA Clear contains Ginkgo Biloba, which has mild blood-thinning properties. If you're taking blood thinners, immunosuppressants, or diabetes medication, please consult your doctor or pharmacist before use.",
  },
  {
    question: "Are the ingredients natural?",
    answer:
      "All ingredients are naturally derived — adaptogens, nootropics, and antioxidants with no artificial additives or fillers. Both formulas are Informed Sport certified, meaning every batch is third-party tested for banned substances.",
  },
  {
    question: "What does it taste like?",
    answer:
      "CONKA Flow is honey and citrus with a hint of turmeric. CONKA Clear is a fresh citrus taste. Both are 30ml liquid shots — smooth and easy to take.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. Pause, modify, or cancel at any time — no contracts, no commitments. We believe in the product, so we don't lock you in.",
  },
];

export default function LandingFAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <>
      {/* Desktop: [image] | [heading + accordion] */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-8 lg:gap-12 py-12 lg:py-16">
          {/* Left: image */}
          <div className="flex items-start justify-start">
            <div
              className="relative w-full max-w-[520px] aspect-square overflow-hidden shadow-lg"
              style={{ borderRadius: "var(--premium-radius-card)" }}
            >
              <img
                src="/CONKA_21.jpg"
                alt="CONKA product"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 25%" }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: heading + accordion */}
          <div>
            <div className="mb-8">
              <p
                className="text-3xl lg:text-4xl font-bold text-black mb-2"
                style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
              >
                Questions?
              </p>
              <p className="text-xl lg:text-2xl text-black/80 premium-body">
                We&apos;re here to help
              </p>
            </div>
            <div className="flex flex-col border-t border-black/10">
              {landingFaqItems.map((item, idx) => {
                const isExpanded = expandedIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border-b border-black/10"
                    data-state={isExpanded ? "open" : "closed"}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedIndex(expandedIndex === idx ? null : idx)
                      }
                      className="w-full py-4 text-left flex justify-between items-center gap-4 hover:opacity-80 transition-opacity"
                      aria-expanded={isExpanded}
                      aria-controls={`landing-faq-answer-${idx}`}
                    >
                      <span className="flex-1 min-w-0">
                        <p className="text-base lg:text-lg font-medium text-black">
                          {item.question}
                        </p>
                      </span>
                      <span className="flex-shrink-0" aria-hidden>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          role="img"
                          aria-label="Collapse/Expand"
                          className={`w-5 h-5 text-black transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                          />
                        </svg>
                      </span>
                    </button>
                    {isExpanded && (
                      <div
                        id={`landing-faq-answer-${idx}`}
                        className="pb-4"
                      >
                        <p className="text-sm lg:text-base text-black/80 leading-relaxed pr-8">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: image on top, then heading + accordion */}
      <div className="md:hidden flex flex-col">
        <div className="pt-6 pb-2">
          <div
            className="relative w-full max-w-[280px] mx-auto aspect-square overflow-hidden shadow-lg"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            <img
              src="/CONKA_21.jpg"
              alt="CONKA product"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 25%" }}
              loading="lazy"
            />
          </div>
        </div>
        <div className="py-6">
          <div className="mb-6">
            <p
              className="text-2xl font-bold text-black mb-1"
              style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
            >
              Questions?
            </p>
            <p className="text-lg text-black/80 premium-body">
              We&apos;re here to help
            </p>
          </div>
          <div className="flex flex-col border-t border-black/10">
            {landingFaqItems.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-black/10"
                  data-state={isExpanded ? "open" : "closed"}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === idx ? null : idx)
                    }
                    className="w-full py-4 text-left flex justify-between items-center gap-3 hover:opacity-80 transition-opacity"
                    aria-expanded={isExpanded}
                    aria-controls={`landing-faq-answer-m-${idx}`}
                  >
                    <span className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black">
                        {item.question}
                      </p>
                    </span>
                    <span className="flex-shrink-0" aria-hidden>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        role="img"
                        aria-label="Collapse/Expand"
                        className={`w-5 h-5 text-black transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    </span>
                  </button>
                  {isExpanded && (
                    <div
                      id={`landing-faq-answer-m-${idx}`}
                      className="pb-4"
                    >
                      <p className="text-sm text-black/80 leading-relaxed pr-6">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
