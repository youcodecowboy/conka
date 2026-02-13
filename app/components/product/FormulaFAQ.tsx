"use client";

import { useState } from "react";
import { FormulaId, formulaContent } from "@/app/lib/productData";

interface FormulaFAQProps {
  formulaId: FormulaId;
}

export default function FormulaFAQ({ formulaId }: FormulaFAQProps) {
  const formula = formulaContent[formulaId];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const faqs = formula.faq;

  return (
    <>
      {/* Desktop: [asset] | [questions] */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-8 lg:gap-12 py-12 lg:py-16">
          {/* Left: asset in rounded box, square, ~20% cropped from top */}
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

          {/* Right: questions */}
          <div>
            <div className="mb-8">
              <p
                className="text-3xl lg:text-4xl font-bold text-black mb-2"
                style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
              >
                Questions?
              </p>
              <p className="text-xl lg:text-2xl text-black/80 premium-body">
                We're here to help
              </p>
            </div>
            <div className="flex flex-col border-t border-black/10">
              {faqs.map((item, idx) => {
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

      {/* Mobile: asset on top, then FAQ */}
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
              We're here to help
            </p>
          </div>
          <div className="flex flex-col border-t border-black/10">
            {faqs.map((item, idx) => {
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
    </>
  );
}
