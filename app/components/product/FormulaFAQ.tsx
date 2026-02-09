"use client";

import { useState } from "react";
import { FormulaId, formulaContent } from "@/app/lib/productData";

interface FormulaFAQProps {
  formulaId: FormulaId;
  usePremium?: boolean;
}

export default function FormulaFAQ({ formulaId, usePremium = false }: FormulaFAQProps) {
  const formula = formulaContent[formulaId];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sectionClass = usePremium ? "premium-section" : "px-6 md:px-16 py-24";
  const containerClass = "max-w-4xl mx-auto";
  const headingClass = usePremium ? "premium-heading mb-2" : "text-3xl md:text-4xl font-bold mb-2";
  const subheadingClass = usePremium ? "premium-annotation" : "font-commentary text-xl";
  const itemBoxClass = usePremium ? "premium-box overflow-hidden" : "neo-box overflow-hidden";

  return (
    <section className={sectionClass}>
      <div className={containerClass}>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={headingClass}>
            Common Questions
          </h2>
          <p className={subheadingClass}>about {formula.name}</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {formula.faq.map((item, idx) => (
            <div key={idx} className={itemBoxClass}>
              <button
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-current/5 transition-colors"
              >
                <h3 className={usePremium ? "premium-heading text-lg" : "text-lg font-bold"}>{item.question}</h3>
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

