"use client";

import Image from "next/image";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";
import { useState } from "react";

export default function CycleBreak() {
  const copy = protocolSynergyCopy;
  const [hoveredSide, setHoveredSide] = useState<"clear" | "flow" | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<"clear" | "flow">>(
    new Set(),
  );

  const handleSideEnter = (side: "clear" | "flow") => {
    setHoveredSide(side);
    setExpandedCards((prev) => new Set(prev).add(side));
  };

  const handleSideLeave = (side: "clear" | "flow") => {
    setHoveredSide(null);
  };

  return (
    <section
      className="bg-white text-black py-12"
      aria-label="How to break the cycle"
    >
      <div className="w-full max-w-full mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="premium-section-heading text-2xl md:text-3xl font-bold mb-3">
            But there's a way out.
          </h2>
          <h3 className="premium-section-heading text-xl md:text-2xl font-bold">
            Together: Break the Cycle
          </h3>
        </div>

        {/* Two halves - full viewport width so each half goes edge-to-edge */}
        <div className="relative left-1/2 -translate-x-1/2 w-screen max-w-none">
          <div className="grid grid-cols-2 w-full">
          {/* Left half - hover zone (Clear) */}
          <div
            className="relative min-h-[500px] cursor-pointer"
            onMouseEnter={() => handleSideEnter("clear")}
            onMouseLeave={() => handleSideLeave("clear")}
          >
            {/* Background: white by default, black when hovered or expanded */}
            <div
              className="absolute inset-0 z-0 transition-colors duration-[400ms] ease-out"
              style={{
                backgroundColor:
                  hoveredSide === "clear" || expandedCards.has("clear")
                    ? "#000"
                    : "#fff",
              }}
            />
            {/* ClearHalf.png at right edge of column; grayscale until hovered or once expanded */}
            <div
              className="absolute inset-0 z-[1] flex items-center justify-end transition-[filter] duration-[400ms] ease-out"
              style={{
                filter:
                  hoveredSide === "clear" || expandedCards.has("clear")
                    ? "none"
                    : "grayscale(100%)",
              }}
            >
              <div className="relative h-full w-1/2 min-w-[200px]">
                <Image
                  src="/formulas/ClearHalf.png"
                  alt=""
                  fill
                  className="object-contain object-right"
                  sizes="50vw"
                  priority={false}
                  aria-hidden
                />
              </div>
            </div>
            {/* Text - outer 45%, above image; padding on external (left) edge */}
            <div className="relative z-10 pt-4 pl-8 md:pl-12 lg:pl-16 max-w-[45%]">
              {expandedCards.has("clear") ? (
                <div className="text-white">
                  <h3 className="premium-section-heading text-lg md:text-xl font-bold mb-3">
                    {copy.mechanisms.clear.title}
                  </h3>
                  <p className="premium-body text-sm leading-relaxed opacity-90 mb-6">
                    {copy.mechanisms.clear.description}
                  </p>
                  <ul className="space-y-2.5">
                    {copy.mechanisms.clear.keyPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="premium-body text-sm opacity-80 flex items-start gap-3"
                      >
                        <span className="text-current mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                        <span className="flex-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <p className="premium-section-heading text-xl md:text-2xl font-bold text-black mb-2">
                    How does CONKA Clear help?
                  </p>
                  <p className="premium-data text-xs uppercase tracking-wider opacity-60 text-black">
                    Hover to discover
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right half - hover zone (Flow) */}
          <div
            className="relative min-h-[500px] cursor-pointer"
            onMouseEnter={() => handleSideEnter("flow")}
            onMouseLeave={() => handleSideLeave("flow")}
          >
            {/* Background: white by default, black when hovered or expanded */}
            <div
              className="absolute inset-0 z-0 transition-colors duration-[400ms] ease-out"
              style={{
                backgroundColor:
                  hoveredSide === "flow" || expandedCards.has("flow")
                    ? "#000"
                    : "#fff",
              }}
            />
            {/* FlowHalf.png at left edge of column; grayscale until hovered or once expanded */}
            <div
              className="absolute inset-0 z-[1] flex items-center justify-start transition-[filter] duration-[400ms] ease-out"
              style={{
                filter:
                  hoveredSide === "flow" || expandedCards.has("flow")
                    ? "none"
                    : "grayscale(100%)",
              }}
            >
              <div className="relative h-full w-1/2 min-w-[200px]">
                <Image
                  src="/formulas/FlowHalf.png"
                  alt=""
                  fill
                  className="object-contain object-left"
                  sizes="50vw"
                  priority={false}
                  aria-hidden
                />
              </div>
            </div>
            {/* Text - outer 45%, above image; padding on external (right) edge */}
            <div className="relative z-10 pt-4 flex justify-end pr-8 md:pr-12 lg:pr-16">
              <div className="max-w-[45%] text-right">
                {expandedCards.has("flow") ? (
                  <div className="text-white text-left inline-block">
                    <h3 className="premium-section-heading text-lg md:text-xl font-bold mb-3">
                      {copy.mechanisms.flow.title}
                    </h3>
                    <p className="premium-body text-sm leading-relaxed opacity-90 mb-6">
                      {copy.mechanisms.flow.description}
                    </p>
                    <ul className="space-y-2.5">
                      {copy.mechanisms.flow.keyPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="premium-body text-sm opacity-80 flex items-start gap-3"
                        >
                          <span className="text-current mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                          <span className="flex-1">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p className="premium-section-heading text-xl md:text-2xl font-bold text-black mb-2">
                      How does CONKA Flow help?
                    </p>
                    <p className="premium-data text-xs uppercase tracking-wider opacity-60 text-black">
                      Hover to discover
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
