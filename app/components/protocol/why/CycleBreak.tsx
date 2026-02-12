"use client";

import Image from "next/image";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";

export default function CycleBreak() {
  const copy = protocolSynergyCopy;

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

        {/* Three-column layout: Clear | Image | Flow */}
        <div className="grid grid-cols-3 gap-12 w-full mx-auto items-start">
          {/* Clear Card - Left */}
          <div className="premium-box h-full bg-[var(--color-surface)]/30">
            <h3 className="premium-heading text-lg font-bold mb-3">
              {copy.mechanisms.clear.title}
            </h3>
            <p className="premium-body text-sm leading-relaxed opacity-90 mb-5">
              {copy.mechanisms.clear.description}
            </p>
            <ul className="space-y-2.5">
              {copy.mechanisms.clear.keyPoints.map((point, idx) => (
                <li key={idx} className="premium-body text-sm opacity-80 flex items-start gap-3">
                  <span className="text-current mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                  <span className="flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image - Center - Scaled down */}
          <div className="relative w-full flex items-center justify-center overflow-hidden">
            <div className="relative w-full aspect-[2/1] min-h-[500px] overflow-hidden">
              <div 
                className="absolute inset-0"
                style={{
                  transform: "scale(0.9)",
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
          <div className="premium-box h-full bg-[var(--color-surface)]/30">
            <h3 className="premium-heading text-lg font-bold mb-3">
              {copy.mechanisms.flow.title}
            </h3>
            <p className="premium-body text-sm leading-relaxed opacity-90 mb-5">
              {copy.mechanisms.flow.description}
            </p>
            <ul className="space-y-2.5">
              {copy.mechanisms.flow.keyPoints.map((point, idx) => (
                <li key={idx} className="premium-body text-sm opacity-80 flex items-start gap-3">
                  <span className="text-current mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                  <span className="flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
