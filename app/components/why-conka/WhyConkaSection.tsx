"use client";

import Image from "next/image";
import type { WhyConkaPoint } from "@/app/lib/whyConkaData";
import { AppInstallButtons } from "@/app/components/AppInstallButtons";

interface WhyConkaSectionProps {
  point: WhyConkaPoint;
  totalPoints: number;
}

export function WhyConkaSection({
  point,
  totalPoints,
}: WhyConkaSectionProps) {
  const isLight = point.theme === "light";
  const formattedId = point.id.toString().padStart(2, "0");

  return (
    <section
      className={`px-6 md:px-16 py-24 md:py-32 ${
        isLight ? "bg-white text-black" : "bg-black text-white"
      }`}
      data-section-id={point.id}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Image Side */}
        <div
          className={`flex-1 w-full ${
            point.id % 2 === 0 ? "md:order-1" : "md:order-2"
          }`}
        >
          {point.image ? (
            <div className="relative w-full h-64 md:h-[400px] lg:h-[500px] overflow-hidden">
              <Image
                src={point.image}
                alt={point.headline}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          ) : (
            <div
              className={`w-full h-64 md:h-[400px] lg:h-[500px] border-2 border-dashed flex items-center justify-center ${
                isLight ? "border-black/30" : "border-white/30"
              }`}
            >
              <span
                className={`font-clinical text-sm text-center px-4 ${
                  isLight ? "opacity-40" : "opacity-50"
                }`}
              >
                [IMAGE PLACEHOLDER]
              </span>
            </div>
          )}
        </div>

        {/* Content Side */}
        <div
          className={`flex-1 flex flex-col justify-center ${
            point.id % 2 === 0 ? "md:order-2" : "md:order-1"
          }`}
        >
          {/* Section Number */}
          <div
            className={`font-clinical text-6xl md:text-7xl lg:text-8xl font-bold mb-6 ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            {formattedId}
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {point.headline}
          </h2>

          {/* Subheading */}
          <p className="font-commentary text-xl md:text-2xl mb-8 opacity-70">
            {point.subheading}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg leading-relaxed opacity-80 max-w-xl mb-8">
            {point.description}
          </p>

          {/* App Install Buttons for Section 4 */}
          {point.id === 4 && (
            <div className="mt-6">
              <AppInstallButtons />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WhyConkaSection;
