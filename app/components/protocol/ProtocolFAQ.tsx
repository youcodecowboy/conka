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
      "Yes, absolutely! In fact, our Ultimate Protocol involves taking both formulas every day. Take Conka Flow in the morning and Conka Clarity later in the day for optimal results.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Most users notice improvements within the first 1-2 weeks. However, the full benefits typically develop over 4-6 weeks of consistent protocol use as the compounds build up in your system.",
  },
];

const protocolSpecificFAQs: Record<ProtocolId, { question: string; answer: string }[]> = {
  "1": [
    {
      question: "Why is Conka Flow the daily formula in this protocol?",
      answer:
        "Resilience Protocol is designed for those prioritizing sustained energy and stress resilience. Conka Flow's adaptogens work best when taken consistently, building up your body's ability to handle daily stressors.",
    },
  ],
  "2": [
    {
      question: "Why is Conka Clarity the daily formula in this protocol?",
      answer:
        "Precision Protocol is optimized for those who need peak cognitive performance regularly. Conka Clarity's nootropics provide consistent mental clarity and focus when taken daily.",
    },
  ],
  "3": [
    {
      question: "How do I alternate between formulas?",
      answer:
        "The balanced protocol alternates days - for example, Conka Flow on Monday, Conka Clarity on Tuesday, and so on. This gives you the benefits of both formulas while allowing each to work independently.",
    },
  ],
  "4": [
    {
      question: "Is taking both formulas every day safe?",
      answer:
        "Yes, our formulas are designed to be complementary and safe to take together. Conka Flow in the morning for energy and Conka Clarity later for clarity creates an optimal cognitive support system.",
    },
  ],
};

export default function ProtocolFAQ({ protocolId }: ProtocolFAQProps) {
  const protocol = protocolContent[protocolId];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Combine general FAQs with protocol-specific ones
  const allFAQs = [...(protocolSpecificFAQs[protocolId] || []), ...generalFAQs];

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Common Questions
          </h2>
          <p className="font-commentary text-xl">about {protocol.name}</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {allFAQs.map((item, idx) => (
            <div key={idx} className="neo-box overflow-hidden">
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === idx ? null : idx)
                }
                className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-current/5 transition-colors"
              >
                <h3 className="text-lg font-bold">{item.question}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`flex-shrink-0 transition-transform ${
                    expandedIndex === idx ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {expandedIndex === idx && (
                <div className="px-6 pb-6">
                  <p className="opacity-80">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="font-commentary text-lg mb-4">Still have questions?</p>
          <button className="neo-button-outline px-8 py-3 font-semibold">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}

