"use client";

import { useState, useCallback, useEffect } from "react";
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
  const [hoveredSide, setHoveredSide] = useState<"flow" | "clear" | null>(null);
  const isMobile = useIsMobile(1024);
  const copy = protocolSynergyCopy;

  const handleFlowToggle = useCallback(() => {
    setExpandedFlow((prev) => !prev);
  }, []);

  const handleClearToggle = useCallback(() => {
    setExpandedClear((prev) => !prev);
  }, []);

  const showSynergy = expandedFlow && expandedClear;

  // Auto-expand both on initial load after a brief delay (optional enhancement)
  useEffect(() => {
    if (!isMobile && !expandedFlow && !expandedClear) {
      const timer = setTimeout(() => {
        // Subtle hint: briefly highlight both sides
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, expandedFlow, expandedClear]);

  return (
    <section className="premium-section" aria-label="The protocol solution">
      <div className="premium-container max-w-6xl mx-auto px-6 md:px-16 pb-24">
        {/* Interactive Image Container */}
        <div className="relative w-full aspect-[2/1] mb-8 md:mb-12 group">
          <Image
            src="/formulas/ConkaSplit.png"
            alt="CONKA Flow and CONKA Clear"
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority={false}
          />

          {/* Visual Hints Overlay - Shows interactivity */}
          {!expandedFlow && !expandedClear && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Left side hint (Clear) */}
              <div
                className={`absolute left-0 top-0 w-1/2 h-full flex items-center justify-center transition-opacity duration-300 ${
                  hoveredSide === "clear" ? "opacity-100" : "opacity-0 group-hover:opacity-30"
                }`}
              >
                <div className="premium-box px-4 py-2 bg-[var(--background)]/95 backdrop-blur-sm">
                  <span className="premium-data text-xs font-semibold uppercase tracking-wider">
                    Tap to explore
                  </span>
                </div>
              </div>
              {/* Right side hint (Flow) */}
              <div
                className={`absolute right-0 top-0 w-1/2 h-full flex items-center justify-center transition-opacity duration-300 ${
                  hoveredSide === "flow" ? "opacity-100" : "opacity-0 group-hover:opacity-30"
                }`}
              >
                <div className="premium-box px-4 py-2 bg-[var(--background)]/95 backdrop-blur-sm">
                  <span className="premium-data text-xs font-semibold uppercase tracking-wider">
                    Tap to explore
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Tap Areas */}
          {/* Left side = Clear */}
          <button
            onClick={handleClearToggle}
            onMouseEnter={() => !isMobile && setHoveredSide("clear")}
            onMouseLeave={() => setHoveredSide(null)}
            className={`absolute left-0 top-0 w-1/2 h-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${
              expandedClear
                ? "bg-current/5"
                : hoveredSide === "clear"
                  ? "bg-current/5"
                  : "bg-transparent hover:bg-current/5"
            }`}
            aria-label="Learn how Clear works"
            aria-expanded={expandedClear}
          >
            {/* Active indicator */}
            {expandedClear && (
              <div className="absolute top-4 left-4 premium-box px-3 py-1.5 bg-[var(--background)]">
                <span className="premium-data text-xs font-semibold">Clear</span>
              </div>
            )}
          </button>
          {/* Right side = Flow */}
          <button
            onClick={handleFlowToggle}
            onMouseEnter={() => !isMobile && setHoveredSide("flow")}
            onMouseLeave={() => setHoveredSide(null)}
            className={`absolute right-0 top-0 w-1/2 h-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${
              expandedFlow
                ? "bg-current/5"
                : hoveredSide === "flow"
                  ? "bg-current/5"
                  : "bg-transparent hover:bg-current/5"
            }`}
            aria-label="Learn how Flow works"
            aria-expanded={expandedFlow}
          >
            {/* Active indicator */}
            {expandedFlow && (
              <div className="absolute top-4 right-4 premium-box px-3 py-1.5 bg-[var(--background)]">
                <span className="premium-data text-xs font-semibold">Flow</span>
              </div>
            )}
          </button>
        </div>

        {/* Expandable Details Sections — order matches image: Clear left, Flow right */}
        <div
          className={`grid gap-4 md:gap-6 mb-8 transition-all duration-300 ${
            expandedFlow || expandedClear ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {/* Clear Details (left, matches left side of image) */}
          {expandedClear && (
            <div
              className="premium-box p-6 md:p-8 overflow-hidden"
              role="region"
              aria-label="Clear mechanism details"
              style={{
                animation: "fade-in-up 0.4s ease-out forwards",
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
                    style={{
                      animation: "fade-in-up 0.3s ease-out forwards",
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    <span className="text-current opacity-60 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Flow Details (right, matches right side of image) */}
          {expandedFlow && (
            <div
              className="premium-box p-6 md:p-8 overflow-hidden"
              role="region"
              aria-label="Flow mechanism details"
              style={{
                animation: "fade-in-up 0.4s ease-out forwards",
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
                    style={{
                      animation: "fade-in-up 0.3s ease-out forwards",
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    <span className="text-current opacity-60 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Synergy Connection Visual - Shows when both are expanded */}
        {showSynergy && expandedFlow && expandedClear && (
          <div
            className="relative mb-8 overflow-hidden"
            style={{
              animation: "fade-in-up 0.5s ease-out forwards",
              animationDelay: "0.2s",
            }}
          >
            {/* Connecting line/arrow between the two boxes */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-current/20 transform -translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 premium-box px-4 py-2 bg-[var(--background)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-current"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Mobile: Tap Buttons Below Image */}
        {isMobile && (
          <div className="flex gap-4 mb-8">
            {/* Left button = Clear (matches image) */}
            <button
              onClick={handleClearToggle}
              className={`flex-1 premium-box p-4 text-center transition-all ${
                expandedClear
                  ? "bg-current text-[var(--background)] shadow-[4px_4px_0px_0px_current]"
                  : "hover:bg-[var(--color-surface)] hover:shadow-[2px_2px_0px_0px_current]"
              }`}
              aria-expanded={expandedClear}
              aria-label="Learn about Clear"
            >
              <span className="premium-body text-sm font-semibold">
                {expandedClear ? "Hide Clear" : "Explore Clear"}
              </span>
            </button>
            {/* Right button = Flow (matches image) */}
            <button
              onClick={handleFlowToggle}
              className={`flex-1 premium-box p-4 text-center transition-all ${
                expandedFlow
                  ? "bg-current text-[var(--background)] shadow-[4px_4px_0px_0px_current]"
                  : "hover:bg-[var(--color-surface)] hover:shadow-[2px_2px_0px_0px_current]"
              }`}
              aria-expanded={expandedFlow}
              aria-label="Learn about Flow"
            >
              <span className="premium-body text-sm font-semibold">
                {expandedFlow ? "Hide Flow" : "Explore Flow"}
              </span>
            </button>
          </div>
        )}

        {/* Synergy Section - Enhanced */}
        {showSynergy && (
          <div
            className="premium-box p-8 md:p-10 overflow-hidden relative"
            role="region"
            aria-label="Synergy between Flow and Clear"
            style={{
              animation: "fade-in-up 0.6s ease-out forwards",
            }}
          >
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current/20 to-transparent" />

            <div className="flex items-start gap-4 mb-6">
              <div className="premium-box p-3 bg-[var(--color-surface)] flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="premium-section-heading text-2xl md:text-3xl font-bold mb-3">
                  {copy.synergy.title}
                </h3>
                <p className="premium-body text-lg md:text-xl leading-relaxed">
                  {copy.synergy.description}
                </p>
              </div>
            </div>

            {/* Outcome Grid - More compact and visual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {copy.outcomeTranslation.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 premium-box p-4 bg-[var(--color-surface)]/50"
                  style={{
                    animation: "fade-in-up 0.4s ease-out forwards",
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 text-current mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="premium-body text-sm md:text-base font-medium">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>

            {/* Compact References Grid */}
            <div className="pt-6 border-t border-current/10">
              <p className="premium-data text-xs uppercase tracking-wider opacity-60 mb-4">
                Scientific References
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {copy.references.map((ref, i) => (
                  <div
                    key={i}
                    className="premium-data text-xs opacity-70"
                    style={{
                      animation: "fade-in-up 0.3s ease-out forwards",
                      animationDelay: `${(copy.outcomeTranslation.length * 80 + i * 30)}ms`,
                    }}
                  >
                    <span className="font-semibold">{ref.author}</span> ({ref.year}).{" "}
                    <span className="italic">{ref.journal}</span>.
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
