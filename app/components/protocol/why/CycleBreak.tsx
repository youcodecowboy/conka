"use client";

import Image from "next/image";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";

export default function CycleBreak() {
  const copy = protocolSynergyCopy;

  return (
    <section
      className="bg-white text-black py-24"
      aria-label="How to break the cycle"
    >
      <div className="w-full max-w-full mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="premium-section-heading text-2xl md:text-3xl font-bold mb-4">
            But there's a way out.
          </h2>
          <h3 className="premium-section-heading text-xl md:text-2xl font-bold">
            Together: Break the Cycle
          </h3>
        </div>

        {/* Three-column layout: Clear | Image | Flow */}
        <div className="grid grid-cols-3 gap-16 w-full mx-auto items-start">
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

          {/* Image - Center - Cropped 10% each side and scaled */}
          <div className="relative w-full flex items-center justify-center overflow-hidden">
            <div className="relative w-full aspect-[2/1] min-h-[650px] overflow-hidden">
              <div 
                className="absolute inset-0"
                style={{
                  width: "120%",
                  left: "-10%",
                  transform: "scale(1.3)",
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
