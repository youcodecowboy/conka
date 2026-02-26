"use client";

import Image from "next/image";
import { StorySection as StorySectionType } from "@/app/lib/storyData";

interface StorySectionProps {
  section: StorySectionType;
  totalSections: number;
  variant?: "desktop" | "mobile";
}

export function StorySection({
  section,
  totalSections,
  variant = "desktop",
}: StorySectionProps) {
  const formattedId = section.id.toString().padStart(2, "0");

  if (variant === "mobile") {
    return (
      <div data-section-id={section.id}>
        <div className="premium-body-sm opacity-40 mb-4 tracking-widest">
          {formattedId} / {totalSections.toString().padStart(2, "0")}
        </div>
        <h2
          className="premium-section-heading text-2xl font-bold mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {section.headline}
        </h2>
        {section.subtitle && (
          <p className="premium-section-subtitle text-lg mb-5 opacity-70">
            {section.subtitle}
          </p>
        )}
        {section.image ? (
          <div
            className="relative w-full h-48 mb-6 overflow-hidden"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            <Image
              src={section.image}
              alt={section.headline}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ) : (
          <div
            className="w-full h-48 mb-6 border-2 border-dashed flex items-center justify-center border-current/30"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            <span className="premium-body-sm text-center px-4 opacity-40">
              {section.imagePlaceholder}
            </span>
          </div>
        )}
        <p
          className="premium-body text-sm leading-relaxed opacity-80"
          style={{ lineHeight: "var(--premium-font-body-leading)" }}
        >
          {section.body}
        </p>
        {section.quote && (
          <div className="mt-6 border-l-2 border-current pl-4 opacity-90">
            <blockquote className="premium-body italic mb-2">
              &ldquo;{section.quote.text}&rdquo;
            </blockquote>
            <div className="premium-body-sm opacity-60">
              <span className="font-semibold">{section.quote.author}</span>
              <span className="mx-1">•</span>
              <span>{section.quote.role}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
      data-section-id={section.id}
    >
      {/* Content Side */}
      <div
        className={`flex-1 flex flex-col justify-center ${
          section.id % 2 === 0 ? "md:order-2" : "md:order-1"
        }`}
      >
        <div className="premium-body-sm opacity-40 mb-6 tracking-widest">
          {formattedId} / {totalSections.toString().padStart(2, "0")}
        </div>
        <h2
          className="premium-section-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {section.headline}
        </h2>
        {section.subtitle && (
          <p className="premium-section-subtitle text-xl md:text-2xl mb-8 opacity-70">
            {section.subtitle}
          </p>
        )}
        <p
          className="premium-body text-base md:text-lg opacity-80"
          style={{
            maxWidth: "var(--premium-body-max-width)",
            lineHeight: "var(--premium-font-body-leading)",
          }}
        >
          {section.body}
        </p>
        {section.quote && (
          <div className="mt-10 border-l-4 border-current pl-6 opacity-90">
            <blockquote className="premium-section-subtitle text-xl md:text-2xl italic mb-4">
              &ldquo;{section.quote.text}&rdquo;
            </blockquote>
            <div className="premium-body-sm opacity-70">
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
          <div
            className="relative w-full h-64 md:h-[400px] lg:h-[500px] overflow-hidden"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
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
            className="w-full h-64 md:h-[400px] lg:h-[500px] border-2 border-dashed flex items-center justify-center border-current/30"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            <span className="premium-body-sm text-center px-4 opacity-50">
              {section.imagePlaceholder}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StorySection;
