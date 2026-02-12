"use client";

import Image from "next/image";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";
import { useState } from "react";


export default function CycleBreakMobile() {
  const copy = protocolSynergyCopy;
  const [expandedCards, setExpandedCards] = useState<Set<"clear" | "flow">>(
    new Set(),
  );

  const handleSideClick = (side: "clear" | "flow") => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(side)) {
        next.delete(side);
      } else {
        next.add(side);
      }
      return next;
    });
  };

  return (
    <section
      className="bg-white text-black"
      aria-label="How to break the cycle"
    >
      <div className="w-full max-w-full mx-auto px-6 md:px-12 lg:px-20">
        {/* Two halves - full viewport width so each half goes edge-to-edge */}
        <div className="relative left-1/2 -translate-x-1/2 w-screen max-w-none">
          <div className="grid grid-cols-2 w-full">
            {/* Left half - tap zone (Clear) */}
            <div
              className="relative min-h-[500px] cursor-pointer"
              onClick={() => handleSideClick("clear")}
            >
              {/* Background: white by default, black when expanded */}
              <div
                className="absolute inset-0 z-0 transition-colors duration-[400ms] ease-out"
                style={{
                  backgroundColor: expandedCards.has("clear") ? "#000" : "#fff",
                }}
              />
              {/* ClearHalf.png at right edge of column; grayscale until expanded; white glow when active */}
              <div
                className="absolute inset-0 z-[1] flex items-center justify-end transition-[filter] duration-[400ms] ease-out"
                style={{
                  filter: expandedCards.has("clear")
                    ? "drop-shadow(0 0 32px rgba(255,255,255,0.5))"
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
              {/* Text - outer ~67% (1.5× former 45%), padding on external (left) edge */}
              <div className="relative z-10 pt-4 pl-8 md:pl-12 lg:pl-16 max-w-[67%]">
                {expandedCards.has("clear") ? (
                  <div className="text-white">
                    <h3 className="premium-section-heading text-lg font-bold mb-4 pt-4 text-white">
                      {copy.mechanisms.clear.title}
                    </h3>
                    <ul className="space-y-2.5 pt-2">
                      {copy.mechanisms.clear.keyPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="premium-body text-sm flex items-start gap-3 text-white"
                        >
                          <span className="text-white mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                          <span className="flex-1 text-white">{point}</span>
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
                      Tap to discover
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right half - tap zone (Flow) */}
            <div
              className="relative min-h-[500px] cursor-pointer"
              onClick={() => handleSideClick("flow")}
            >
              {/* Background: white by default, black when expanded */}
              <div
                className="absolute inset-0 z-0 transition-colors duration-[400ms] ease-out"
                style={{
                  backgroundColor: expandedCards.has("flow") ? "#000" : "#fff",
                }}
              />
              {/* FlowHalf.png at left edge of column; grayscale until expanded; white glow when active */}
              <div
                className="absolute inset-0 z-[1] flex items-center justify-start transition-[filter] duration-[400ms] ease-out"
                style={{
                  filter: expandedCards.has("flow")
                    ? "drop-shadow(0 0 32px rgba(255,255,255,0.5))"
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
              {/* Text - outer ~67% (1.5× former 45%), padding on external (right) edge */}
              <div className="relative z-10 pt-4 flex justify-end pr-8 md:pr-12 lg:pr-16">
                <div className="max-w-[67%] text-right">
                  {expandedCards.has("flow") ? (
                    <div className="text-white text-right inline-block max-w-full">
                      <h3 className="premium-section-heading text-lg font-bold mb-4 pt-4 text-white text-right">
                        {copy.mechanisms.flow.title}
                      </h3>
                      <ul className="space-y-2.5 text-right pt-2">
                        {copy.mechanisms.flow.keyPoints.map((point, idx) => (
                          <li
                            key={idx}
                            className="premium-body text-sm flex items-start gap-3 justify-end text-white"
                          >
                            <span className="text-white mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-50 order-2" />
                            <span className="flex-1 text-white order-1 text-right">{point}</span>
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
                        Tap to discover
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
