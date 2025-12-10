"use client";

import { useState } from "react";
import { FormulaId, formulaContent } from "@/app/lib/productData";

interface FormulaFAQProps {
  formulaId: FormulaId;
}

export default function FormulaFAQ({ formulaId }: FormulaFAQProps) {
  const formula = formulaContent[formulaId];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Common Questions
          </h2>
          <p className="font-commentary text-xl">about {formula.name}</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {formula.faq.map((item, idx) => (
            <div key={idx} className="neo-box overflow-hidden">
              <button
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
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

