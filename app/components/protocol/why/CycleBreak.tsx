"use client";

import { useState } from "react";
import Image from "next/image";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";
import {
  sectionHeadings,
  interventionPoints,
} from "@/app/lib/protocolWhyCopy";

export default function CycleBreak() {
  const [refsExpanded, setRefsExpanded] = useState(false);
  const copy = protocolSynergyCopy;

  return (
    <section
      className="premium-section"
      aria-label="How to break the cycle"
    >
      <div className="premium-container max-w-6xl mx-auto px-6 md:px-16 pb-24">
        <h2 className="premium-section-heading text-2xl md:text-3xl font-bold text-center mb-6">
          {sectionHeadings.break}
        </h2>
        <p className="premium-body text-lg max-w-2xl mx-auto text-center opacity-90 mb-12">
          The intervention requires two forces. Flow reduces pressure at one
          point; Clear builds capacity at another. Together they break the cycle.
        </p>

        {/* Split bottles image */}
        <div className="relative w-full max-w-3xl mx-auto mb-12 aspect-[2/1] min-h-[300px]">
          <Image
            src="/formulas/ConkaSplit.png"
            alt="CONKA Flow and CONKA Clear"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority={false}
          />
        </div>

        {/* Two break points */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto mb-12">
          <div className="text-center sm:text-left">
            <p className="premium-data text-xs uppercase tracking-wider opacity-70 mb-2">
              First break point
            </p>
            <p className="premium-body font-semibold">{interventionPoints.flow.label}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="premium-data text-xs uppercase tracking-wider opacity-70 mb-2">
              Second break point
            </p>
            <p className="premium-body font-semibold">{interventionPoints.clear.label}</p>
          </div>
        </div>

        {/* Flow + Clear mechanisms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div>
            <h3 className="premium-section-heading text-xl font-bold mb-4">
              {copy.mechanisms.flow.title}
            </h3>
            <p className="premium-body leading-relaxed opacity-90">
              {copy.mechanisms.flow.description}
            </p>
          </div>
          <div>
            <h3 className="premium-section-heading text-xl font-bold mb-4">
              {copy.mechanisms.clear.title}
            </h3>
            <p className="premium-body leading-relaxed opacity-90">
              {copy.mechanisms.clear.description}
            </p>
          </div>
        </div>

        {/* Synergy */}
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h3 className="premium-section-heading text-xl md:text-2xl font-bold mb-4">
            {copy.synergy.title}
          </h3>
          <p className="premium-body text-lg leading-relaxed opacity-90">
            {copy.synergy.description}
          </p>
        </div>

        {/* Collapsible references */}
        <div className="premium-box overflow-hidden max-w-xl mx-auto">
          <button
            onClick={() => setRefsExpanded(!refsExpanded)}
            className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-current/5 transition-colors"
            aria-expanded={refsExpanded}
            aria-controls="scientific-references-list"
          >
            <span className="premium-section-heading text-lg font-bold">
              Scientific References
            </span>
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
                refsExpanded ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {refsExpanded && (
            <div
              id="scientific-references-list"
              className="px-6 pb-6 space-y-3"
            >
              {copy.references.map((ref, idx) => (
                <div
                  key={idx}
                  className="premium-data text-sm opacity-80 border-b border-current/10 pb-2 last:border-0 last:pb-0"
                >
                  <span className="font-semibold">{ref.author}</span> (
                  {ref.year}). <span className="italic">{ref.journal}</span>.
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
