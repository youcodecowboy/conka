"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import useIsMobile from "@/app/hooks/useIsMobile";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";
import type { ProtocolId } from "@/app/lib/productData";

interface ProtocolSolutionInteractiveProps {
  protocolId?: ProtocolId;
}

export default function ProtocolSolutionInteractive({
  protocolId,
}: ProtocolSolutionInteractiveProps) {
  const [expandedFlow, setExpandedFlow] = useState(false);
  const [expandedClear, setExpandedClear] = useState(false);
  const isMobile = useIsMobile(1024);
  const copy = protocolSynergyCopy;

  const handleFlowToggle = useCallback(() => {
    setExpandedFlow((prev) => !prev);
  }, []);

  const handleClearToggle = useCallback(() => {
    setExpandedClear((prev) => !prev);
  }, []);

  const showSynergy = expandedFlow && expandedClear;

  return (
    <section className="premium-section" aria-label="The protocol solution">
      <div className="premium-container max-w-6xl mx-auto px-6 md:px-16 pb-24">
        {/* Split Bottle Asset */}
        <div className="relative w-full aspect-[2/1] mb-8 md:mb-12">
          <Image
            src="/formulas/ConkaSplit.png"
            alt="CONKA Flow and CONKA Clear"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority={false}
          />

          {/* Tap Areas Overlay */}
          {/* Left side = Clear */}
          <button
            onClick={handleClearToggle}
            className={`absolute left-0 top-0 w-1/2 h-full cursor-pointer transition-opacity hover:opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${
              expandedClear ? "opacity-5" : "opacity-0"
            }`}
            aria-label="Learn how Clear works"
            aria-expanded={expandedClear}
            style={{
              backgroundColor: expandedClear ? "currentColor" : "transparent",
            }}
          />
          {/* Right side = Flow */}
          <button
            onClick={handleFlowToggle}
            className={`absolute right-0 top-0 w-1/2 h-full cursor-pointer transition-opacity hover:opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${
              expandedFlow ? "opacity-5" : "opacity-0"
            }`}
            aria-label="Learn how Flow works"
            aria-expanded={expandedFlow}
            style={{
              backgroundColor: expandedFlow ? "currentColor" : "transparent",
            }}
          />
        </div>

        {/* Expandable Details Sections */}
        <div
          className={`grid gap-4 md:gap-6 mb-8 transition-all duration-300 ${
            expandedFlow || expandedClear ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {/* Flow Details */}
          {expandedFlow && (
            <div
              className="premium-box p-6 md:p-8 overflow-hidden content-transition"
              role="region"
              aria-label="Flow mechanism details"
              style={{
                animation: "fade-in-up 0.3s ease-out forwards",
              }}
            >
              <h3 className="premium-section-heading text-xl md:text-2xl font-bold mb-4">
                {copy.mechanisms.flow.title}
              </h3>
              <p className="premium-body mb-4 leading-relaxed">
                {copy.mechanisms.flow.description}
              </p>
              <ul className="space-y-2">
                {copy.mechanisms.flow.keyPoints.map((point, i) => (
                  <li
                    key={i}
                    className="premium-body text-sm flex items-start gap-2"
                  >
                    <span className="text-current opacity-60 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Clear Details */}
          {expandedClear && (
            <div
              className="premium-box p-6 md:p-8 overflow-hidden content-transition"
              role="region"
              aria-label="Clear mechanism details"
              style={{
                animation: "fade-in-up 0.3s ease-out forwards",
              }}
            >
              <h3 className="premium-section-heading text-xl md:text-2xl font-bold mb-4">
                {copy.mechanisms.clear.title}
              </h3>
              <p className="premium-body mb-4 leading-relaxed">
                {copy.mechanisms.clear.description}
              </p>
              <ul className="space-y-2">
                {copy.mechanisms.clear.keyPoints.map((point, i) => (
                  <li
                    key={i}
                    className="premium-body text-sm flex items-start gap-2"
                  >
                    <span className="text-current opacity-60 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Mobile: Tap Buttons Below Image */}
        {isMobile && (
          <div className="flex gap-4 mb-8">
            {/* Left button = Clear (matches image) */}
            <button
              onClick={handleClearToggle}
              className={`flex-1 premium-box p-4 text-center transition-all ${
                expandedClear
                  ? "bg-current text-[var(--background)]"
                  : "hover:bg-[var(--color-surface)]"
              }`}
              aria-expanded={expandedClear}
              aria-label="Learn about Clear"
            >
              <span className="premium-body text-sm font-semibold">
                {expandedClear ? "Hide Clear Details" : "Learn about Clear"}
              </span>
            </button>
            {/* Right button = Flow (matches image) */}
            <button
              onClick={handleFlowToggle}
              className={`flex-1 premium-box p-4 text-center transition-all ${
                expandedFlow
                  ? "bg-current text-[var(--background)]"
                  : "hover:bg-[var(--color-surface)]"
              }`}
              aria-expanded={expandedFlow}
              aria-label="Learn about Flow"
            >
              <span className="premium-body text-sm font-semibold">
                {expandedFlow ? "Hide Flow Details" : "Learn about Flow"}
              </span>
            </button>
          </div>
        )}

        {/* Synergy Section */}
        {showSynergy && (
          <div
            className="premium-box p-8 md:p-10 overflow-hidden content-transition"
            role="region"
            aria-label="Synergy between Flow and Clear"
            style={{
              animation: "fade-in-up 0.5s ease-out forwards",
            }}
          >
            <h3 className="premium-section-heading text-2xl md:text-3xl font-bold mb-6">
              {copy.synergy.title}
            </h3>
            <p className="premium-body text-lg md:text-xl mb-8 leading-relaxed">
              {copy.synergy.description}
            </p>

            {/* Outcome Bullets */}
            <div className="space-y-3 mb-8">
              {copy.outcomeTranslation.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 content-transition"
                  style={{
                    animation: "fade-in-up 0.3s ease-out forwards",
                    animationDelay: `${i * 50}ms`,
                  }}
                >
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
                    className="flex-shrink-0 text-current opacity-60 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="premium-body text-sm md:text-base">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>

            {/* Inline Citations */}
            <div className="premium-data text-sm opacity-70 space-y-2 pt-6 border-t border-current/10">
              {copy.references.map((ref, i) => (
                <div
                  key={i}
                  className="content-transition"
                  style={{
                    animation: "fade-in-up 0.3s ease-out forwards",
                    animationDelay: `${(copy.outcomeTranslation.length + i) * 50}ms`,
                  }}
                >
                  <span className="font-semibold">{ref.author}</span> ({ref.year}).{" "}
                  <span className="italic">{ref.journal}</span>.
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
