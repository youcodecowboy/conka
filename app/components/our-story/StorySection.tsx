"use client";

import Image from "next/image";
import { StorySection as StorySectionType } from "@/app/lib/storyData";

interface StorySectionProps {
  section: StorySectionType;
  totalSections: number;
}

export function StorySection({
  section,
  totalSections,
}: StorySectionProps) {
  const isLight = section.theme === "light";
  const formattedId = section.id.toString().padStart(2, "0");

  return (
    <section
      className={`px-6 md:px-16 py-24 md:py-32 ${
        isLight ? "bg-white text-black" : "bg-black text-white"
      }`}
      data-section-id={section.id}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Content Side */}
        <div
          className={`flex-1 flex flex-col justify-center ${
            section.id % 2 === 0 ? "md:order-2" : "md:order-1"
          }`}
        >
          {/* Section Counter */}
          <div className="font-clinical text-sm md:text-base opacity-40 mb-6 tracking-widest">
            {formattedId} / {totalSections.toString().padStart(2, "0")}
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {section.headline}
          </h2>

          {/* Subtitle */}
          {section.subtitle && (
            <p className="font-commentary text-xl md:text-2xl mb-8 opacity-70">
              {section.subtitle}
            </p>
          )}

          {/* Body Text */}
          <p className="text-base md:text-lg leading-relaxed opacity-80 max-w-xl">
            {section.body}
          </p>

          {/* Quote Block */}
          {section.quote && (
            <div className="mt-10 border-l-4 border-current pl-6 opacity-90">
              <blockquote className="font-commentary text-xl md:text-2xl italic mb-4">
                &ldquo;{section.quote.text}&rdquo;
              </blockquote>
              <div className="font-clinical text-sm opacity-70">
                <span className="font-semibold">{section.quote.author}</span>
                <span className="mx-2">•</span>
                <span>{section.quote.role}</span>
              </div>
            </div>
          )}
        </div>

        {/* Image Side */}
        <div
          className={`flex-1 w-full ${
            section.id % 2 === 0 ? "md:order-1" : "md:order-2"
          }`}
        >
          {section.image ? (
            <div className="relative w-full h-64 md:h-[400px] lg:h-[500px] overflow-hidden">
              <Image
                src={section.image}
                alt={section.headline}
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
              <span className={`font-clinical text-sm text-center px-4 ${isLight ? "opacity-40" : "opacity-50"}`}>
                {section.imagePlaceholder}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default StorySection;

