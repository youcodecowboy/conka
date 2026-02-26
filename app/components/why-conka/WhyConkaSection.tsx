"use client";

import Image from "next/image";
import type { WhyConkaPoint } from "@/app/lib/whyConkaData";
import { AppInstallButtons } from "@/app/components/AppInstallButtons";

interface WhyConkaSectionProps {
  point: WhyConkaPoint;
  totalPoints: number;
  variant?: "desktop" | "mobile";
}

export function WhyConkaSection({
  point,
  totalPoints,
  variant = "desktop",
}: WhyConkaSectionProps) {
  const formattedId = point.id.toString().padStart(2, "0");

  if (variant === "mobile") {
    return (
      <div data-section-id={point.id}>
        <div className="font-clinical text-5xl font-bold mb-4">
          {formattedId}
        </div>
        <h2
          className="premium-section-heading text-2xl font-bold mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {point.headline}
        </h2>
        <p className="premium-section-subtitle text-lg mb-4 opacity-70">
          {point.subheading}
        </p>
        {point.image ? (
          <div
            className="relative w-full h-48 mb-6 overflow-hidden"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            <Image
              src={point.image}
              alt={point.headline}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ) : (
          <div
            className="w-full h-48 mb-6 border-2 border-dashed border-current/20 flex items-center justify-center"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            <span className="premium-body-sm text-center px-4 opacity-40">
              [IMAGE PLACEHOLDER]
            </span>
          </div>
        )}
        <p
          className="premium-body text-sm leading-relaxed opacity-80 mb-6"
          style={{ lineHeight: "var(--premium-font-body-leading)" }}
        >
          {point.description}
        </p>
        {point.id === 4 && (
          <div className="mt-4">
            <AppInstallButtons
              iconSize={18}
              buttonClassName="px-6 py-3 text-sm"
              inverted={point.theme !== "light"}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20"
      data-section-id={point.id}
    >
      <div
        className={`flex-1 w-full ${
          point.id % 2 === 0 ? "md:order-1" : "md:order-2"
        }`}
      >
        {point.image ? (
          <div
            className="relative w-full h-64 md:h-[400px] lg:h-[500px] overflow-hidden"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
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
            className="w-full h-64 md:h-[400px] lg:h-[500px] border-2 border-dashed border-current/30 flex items-center justify-center"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            <span className="premium-body-sm text-center px-4 opacity-50">
              [IMAGE PLACEHOLDER]
            </span>
          </div>
        )}
      </div>
      <div
        className={`flex-1 flex flex-col justify-center ${
          point.id % 2 === 0 ? "md:order-2" : "md:order-1"
        }`}
      >
        <div className="font-clinical text-6xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6">
          {formattedId}
        </div>
        <h2
          className="premium-section-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {point.headline}
        </h2>
        <p className="premium-section-subtitle text-xl md:text-2xl mb-6 md:mb-8 opacity-70">
          {point.subheading}
        </p>
        <p
          className="premium-body text-base md:text-lg leading-relaxed opacity-80 mb-8"
          style={{
            maxWidth: "var(--premium-body-max-width)",
            lineHeight: "var(--premium-font-body-leading)",
          }}
        >
          {point.description}
        </p>
        {point.id === 4 && (
          <div className="mt-6">
            <AppInstallButtons inverted={point.theme !== "light"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default WhyConkaSection;
