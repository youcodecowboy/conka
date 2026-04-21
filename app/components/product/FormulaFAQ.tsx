"use client";

import { useState } from "react";
import Image from "next/image";
import { FormulaId, formulaContent } from "@/app/lib/productData";
import ConkaCTAButton from "../landing/ConkaCTAButton";

const FAQ_ASSETS: Record<FormulaId, { src: string; alt: string }> = {
  "01": { src: "/lifestyle/FlowDrink.jpg", alt: "Drinking CONKA Flow" },
  "02": { src: "/lifestyle/ClearDrink.jpg", alt: "Drinking CONKA Clear" },
};

interface FormulaFAQProps {
  formulaId: FormulaId;
  hideCTA?: boolean;
}

export default function FormulaFAQ({ formulaId, hideCTA = false }: FormulaFAQProps) {
  const formula = formulaContent[formulaId];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = formula.faq;
  const asset = FAQ_ASSETS[formulaId];

  return (
    <div>
      {/* Desktop: two-column (image left, content right) */}
      {/* Mobile: image above heading, then accordion */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
        {/* Lifestyle image — sticky on desktop */}
        <div className="lg:w-2/5 lg:sticky lg:top-8 mb-8 lg:mb-0">
          <div className="overflow-hidden max-w-md mx-auto lg:max-w-none">
            <Image
              src={asset.src}
              alt={asset.alt}
              width={800}
              height={800}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Content column */}
        <div className="lg:w-3/5">
          {/* Eyebrow */}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
            Common Questions · Quick Answers
          </p>

          {/* Heading */}
          <div className="mb-10">
            <h2 className="brand-h1 mb-0" style={{ letterSpacing: "-0.02em" }}>
              Frequently asked questions
            </h2>
          </div>

          {/* Accordion */}
          <div className="overflow-hidden bg-white border border-black/6">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              const isLast = i === faqs.length - 1;

              return (
                <div key={item.question}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`formula-faq-${formulaId}-${i}`}
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
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-black/80" : "text-black/40"
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  <div
                    id={`formula-faq-${formulaId}-${i}`}
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

                  {!isLast && <div className="mx-5 h-px bg-black/8" />}
                </div>
              );
            })}
          </div>

          {/* CTA — scrolls back to hero for purchase */}
          {!hideCTA && (
            <div className="mt-8 flex justify-start">
              <ConkaCTAButton href="#hero" meta={`// order ${formula.name.toLowerCase()}`}>
                Order {formula.name}
              </ConkaCTAButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
