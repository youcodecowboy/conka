"use client";

import Image from "next/image";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";

export default function CycleBreak() {
  const copy = protocolSynergyCopy;

  return (
    <section
      className="premium-section"
      aria-label="How to break the cycle"
    >
      <div className="premium-container max-w-[95%] mx-auto px-6 md:px-16 pb-24">
        {/* Header with synergy copy */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="premium-section-heading text-2xl md:text-3xl font-bold mb-4">
            Together: Break the Cycle
          </h2>
          <p className="premium-body text-lg leading-relaxed opacity-90">
            Flow reduces load while Clear improves capacity. Together, they create a system that breaks the problem cycle—reducing pressure while strengthening repair mechanisms.
          </p>
        </div>

        {/* Three-column layout: Clear | Image | Flow */}
        <div className="grid grid-cols-3 gap-16 max-w-full mx-auto items-start">
          {/* Clear Card - Left */}
          <div className="premium-box h-full">
            <p className="premium-data text-xs uppercase tracking-wider opacity-70 mb-4">
              First break point
            </p>
            <h3 className="premium-heading text-xl font-bold mb-4">
              {copy.mechanisms.clear.title}
            </h3>
            <p className="premium-body text-sm leading-relaxed opacity-90 mb-6">
              {copy.mechanisms.clear.description}
            </p>
            <ul className="space-y-2.5">
              {copy.mechanisms.clear.keyPoints.map((point, idx) => (
                <li key={idx} className="premium-body text-sm opacity-80 flex items-start gap-2">
                  <span className="text-current mt-1.5 flex-shrink-0">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image - Center - Cropped 20% each side and scaled up */}
          <div className="relative w-full flex items-center justify-center overflow-hidden">
            <div className="relative w-full aspect-[2/1] min-h-[650px] overflow-hidden">
              <div 
                className="absolute inset-0"
                style={{
                  width: "140%",
                  left: "-20%",
                  transform: "scale(1.67)",
                  transformOrigin: "center center"
                }}
              >
                <Image
                  src="/formulas/ConkaSplit.png"
                  alt="CONKA Flow and CONKA Clear"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Flow Card - Right */}
          <div className="premium-box h-full">
            <p className="premium-data text-xs uppercase tracking-wider opacity-70 mb-4">
              Second break point
            </p>
            <h3 className="premium-heading text-xl font-bold mb-4">
              {copy.mechanisms.flow.title}
            </h3>
            <p className="premium-body text-sm leading-relaxed opacity-90 mb-6">
              {copy.mechanisms.flow.description}
            </p>
            <ul className="space-y-2.5">
              {copy.mechanisms.flow.keyPoints.map((point, idx) => (
                <li key={idx} className="premium-body text-sm opacity-80 flex items-start gap-2">
                  <span className="text-current mt-1.5 flex-shrink-0">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
