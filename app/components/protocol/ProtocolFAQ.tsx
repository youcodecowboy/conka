"use client";

import { useState } from "react";
import { ProtocolId, protocolContent } from "@/app/lib/productData";

interface ProtocolFAQProps {
  protocolId: ProtocolId;
}

// General protocol FAQs plus protocol-specific ones
const generalFAQs = [
  {
    question: "How does a protocol differ from buying individual formulas?",
    answer:
      "Protocols are designed to give you both formulas in the optimal ratio for your goals. They're also more cost-effective than buying each formula separately, and you get a structured plan for when to take each one.",
  },
  {
    question: "Can I switch protocols?",
    answer:
      "Yes! You can change your protocol at any time. Many users start with one protocol and adjust based on their experience. Your subscription can be modified before any billing cycle.",
  },
  {
    question: "What if I miss a day?",
    answer:
      "Don't worry - missing an occasional day won't affect your results significantly. The benefits of our formulas are cumulative, so consistency over time matters more than perfection.",
  },
  {
    question: "Can I take both formulas on the same day?",
    answer:
      "Yes, absolutely! In fact, our Ultimate Protocol involves taking both formulas every day. Take CONKA Flow in the morning and CONKA Clear later in the day for optimal results.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Most users notice improvements within the first 1-2 weeks. However, the full benefits typically develop over 4-6 weeks of consistent protocol use as the compounds build up in your system.",
  },
  {
    question: "How flexible is the timing?",
    answer:
      "You can take your shots at whatever time fits your day. Many people take CONKA Flow in the morning and CONKA Clear when they need a clarity boost. The calendar is a guide—shifting a day or adjusting within the week is fine.",
  },
  {
    question: "Can I pause or adjust my protocol?",
    answer:
      "Yes. You can change your tier, switch protocols, or pause your subscription before any billing cycle. If you're travelling or need a lighter week, missing the odd day won't undo your progress—consistency over time matters most.",
  },
];

const protocolSpecificFAQs: Record<
  ProtocolId,
  { question: string; answer: string }[]
> = {
  "1": [
    {
      question: "Why is CONKA Flow the daily formula in this protocol?",
      answer:
        "Resilience Protocol is designed for those prioritizing sustained energy and stress resilience. CONKA Flow's adaptogens work best when taken consistently, building up your body's ability to handle daily stressors.",
    },
  ],
  "2": [
    {
      question: "Why is CONKA Clear the daily formula in this protocol?",
      answer:
        "Precision Protocol is optimized for those who need peak cognitive performance regularly. CONKA Clear's nootropics provide consistent mental clarity and focus when taken daily.",
    },
  ],
  "3": [
    {
      question: "How do I alternate between formulas?",
      answer:
        "The balanced protocol alternates days - for example, CONKA Flow on Monday, CONKA Clear on Tuesday, and so on. This gives you the benefits of both formulas while allowing each to work independently.",
    },
  ],
  "4": [
    {
      question: "Is taking both formulas every day safe?",
      answer:
        "Yes, our formulas are designed to be complementary and safe to take together. CONKA Flow in the morning for energy and CONKA Clear later for clarity creates an optimal cognitive support system.",
    },
  ],
};

export default function ProtocolFAQ({ protocolId }: ProtocolFAQProps) {
  const protocol = protocolContent[protocolId];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Combine general FAQs with protocol-specific ones
  const allFAQs = [...(protocolSpecificFAQs[protocolId] || []), ...generalFAQs];

  return (
    <section className="w-full overflow-hidden bg-[var(--color-surface)]">
      {/* Desktop: [asset in rounded box] | [sticky questions] */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          {/* Left: asset sat in column with rounded corners */}
          <div className="flex items-start justify-start pt-8">
            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/CONKA_21.jpg"
                alt="CONKA product"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: sticky question section */}
          <div className="sticky top-24 self-start">
            <div className="mb-8">
              <p className="text-3xl lg:text-4xl font-bold text-black mb-2">
                Questions?
              </p>
              <p className="text-xl lg:text-2xl text-black/80">
                We're here to help
              </p>
            </div>
            <div className="flex flex-col border-t border-black/10">
              {allFAQs.map((item, idx) => {
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
                      aria-controls={`faq-answer-${idx}`}
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
                        id={`faq-answer-${idx}`}
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

      {/* Mobile: [asset - smaller] then [collapsible sections] */}
      <div className="md:hidden flex flex-col">
        {/* Smaller asset block with rounded corners */}
        <div className="px-4 pt-4">
          <div className="relative w-full aspect-[4/3] max-h-[200px] rounded-2xl overflow-hidden">
            <img
              src="/CONKA_21.jpg"
              alt="CONKA product"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
        {/* Collapsible section - same component style as desktop */}
        <div className="px-4 py-6">
          <div className="mb-6">
            <p className="text-2xl font-bold text-black mb-1">
              Questions?
            </p>
            <p className="text-lg text-black/80">
              We're here to help
            </p>
          </div>
          <div className="flex flex-col border-t border-black/10">
            {allFAQs.map((item, idx) => {
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
                    aria-controls={`faq-answer-m-${idx}`}
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
                      id={`faq-answer-m-${idx}`}
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
    </section>
  );
}
