"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { pathData, PathType } from "@/app/components/ProtocolBuilder";
import { protocolPricing } from "@/app/lib/productData";

// Primary outcomes mapping
const primaryOutcomes: Record<Exclude<PathType, null>, string> = {
  path1: "Sustainable Energy & Focus",
  path2: "Unstoppable Clarity",
  path3: "The Perfect Balance",
  path4: "Your Mind on the Next Level",
};

// Lifestyle images mapping
const lifestyleImages: Record<
  Exclude<PathType, null>,
  { src: string; alt: string }
> = {
  path1: {
    src: "/protocols/ResilianceProtocol.jpg",
    alt: "Person focused and energized, representing sustainable energy and focus",
  },
  path2: {
    src: "/protocols/PrecisionProtocol.jpg",
    alt: "Person with clear mental clarity, representing unstoppable focus and memory",
  },
  path3: {
    src: "/protocols/BalanceProtocol.jpg",
    alt: "Person in calm balanced state, representing stress resilience and harmony",
  },
  path4: {
    src: "/protocols/UltimateProtocol.jpg",
    alt: "Person at peak performance, representing ultimate cognitive enhancement",
  },
};

// Map path keys to protocol IDs and starting prices
const protocolMapping: Record<
  Exclude<PathType, null>,
  { id: string; startingPrice: string }
> = {
  path1: {
    id: "1",
    startingPrice: `From £${protocolPricing.standard.subscription.starter.price}`,
  },
  path2: {
    id: "2",
    startingPrice: `From £${protocolPricing.standard.subscription.starter.price}`,
  },
  path3: {
    id: "3",
    startingPrice: `From £${protocolPricing.standard.subscription.starter.price}`,
  },
  path4: {
    id: "4",
    startingPrice: `From £${protocolPricing.ultimate.subscription.pro.price}`,
  },
};

// Build protocols array from pathData
const protocols = (Object.keys(pathData) as Exclude<PathType, null>[]).map(
  (key) => {
    const data = pathData[key];
    const mapping = protocolMapping[key];
    return {
      id: mapping.id,
      path: key,
      title: data.title,
      subtitle: data.subtitle,
      primaryOutcome: primaryOutcomes[key],
      description: data.description,
      benefits: data.benefits,
      startingPrice: mapping.startingPrice,
      isUltimate: data.isUltimate,
      icon: data.icon,
      lifestyleImage: lifestyleImages[key],
    };
  },
);

export default function ProtocolsGridDesktop() {
  const [expandedProtocolId, setExpandedProtocolId] = useState<string | null>(
    null,
  );

  const handleCardClick = (protocolId: string) => {
    setExpandedProtocolId(protocolId);
  };

  const handleClose = () => {
    setExpandedProtocolId(null);
  };

  const expandedProtocol = expandedProtocolId
    ? protocols.find((p) => p.id === expandedProtocolId)
    : null;

  return (
    <div className="px-6 md:px-16 py-12 md:py-24 border-t-2 border-current border-opacity-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Quiz CTA */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Choose Your Protocol
            </h2>
            <p className="font-clinical text-lg md:text-xl">
              Curated combinations for specific goals
            </p>
          </div>
          <Link
            href="/quiz"
            className="neo-button-outline px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Not sure? Take the quiz
          </Link>
        </div>

        {/* Grid Container */}
        <div className="relative min-h-[600px]">
          {/* 2x2 Grid - Visible when no card is expanded */}
          <div
            className={`grid grid-cols-2 gap-8 transition-all duration-300 ${
              expandedProtocolId
                ? "opacity-0 pointer-events-none absolute inset-0"
                : "opacity-100"
            }`}
          >
            {protocols.map((protocol) => (
              <button
                key={protocol.id}
                onClick={() => handleCardClick(protocol.id)}
                className="neo-box overflow-hidden hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group text-left cursor-pointer"
              >
                {/* Lifestyle Image */}
                <div className="relative w-full aspect-[3/2] overflow-hidden">
                  <Image
                    src={protocol.lifestyleImage.src}
                    alt={protocol.lifestyleImage.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Icon Overlay */}
                  <div className="absolute bottom-3 left-3 p-2 bg-[var(--background)]/90 border-2 border-current rounded-lg backdrop-blur-sm">
                    {protocol.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Header */}
                  <h3 className="text-xl font-bold leading-tight mb-1">
                    {protocol.primaryOutcome}
                  </h3>
                  <p className="font-commentary text-base opacity-80 mb-3">
                    {protocol.subtitle}
                  </p>

                  {/* 1-2 Key Benefits */}
                  <ul className="space-y-1.5 mb-3">
                    {protocol.benefits.slice(0, 2).map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 font-clinical text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="flex-shrink-0 mt-0.5 text-teal-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tap to expand indicator */}
                  <p className="font-clinical text-xs opacity-50 text-center">
                    Click to learn more
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Expanded Card View */}
          {expandedProtocol && (
            <div
              className="absolute inset-0 animate-fade-in-scale"
              role="dialog"
              aria-modal="true"
              aria-labelledby="expanded-protocol-title"
            >
              <div className="neo-box p-8 h-full relative">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-3 border-2 border-current rounded-lg hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors z-10"
                  aria-label="Close"
                >
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="flex gap-8 h-full">
                  {/* Left: Lifestyle Image */}
                  <div className="w-2/5 flex-shrink-0">
                    <div className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden">
                      <Image
                        src={expandedProtocol.lifestyleImage.src}
                        alt={expandedProtocol.lifestyleImage.alt}
                        fill
                        className="object-cover"
                        sizes="40vw"
                      />
                      {/* Icon Overlay */}
                      <div className="absolute bottom-4 left-4 p-3 bg-[var(--background)]/90 border-2 border-current rounded-lg backdrop-blur-sm">
                        {expandedProtocol.icon}
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="mb-4">
                      <h3
                        id="expanded-protocol-title"
                        className="text-3xl font-bold leading-tight mb-1"
                      >
                        {expandedProtocol.primaryOutcome}
                      </h3>
                      <p className="font-commentary text-xl opacity-80">
                        {expandedProtocol.subtitle}
                      </p>
                    </div>

                    {/* Full Description */}
                    <p className="text-base opacity-80 mb-4">
                      {expandedProtocol.description}
                    </p>

                    {/* All Benefits */}
                    <ul className="space-y-2 mb-6 flex-1">
                      {expandedProtocol.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 font-clinical text-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="flex-shrink-0 mt-0.5 text-teal-500"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t-2 border-current border-opacity-10 mt-auto">
                      <span className="font-clinical text-sm opacity-70">
                        {expandedProtocol.startingPrice}
                      </span>
                      <Link
                        href={`/protocol/${expandedProtocol.id}`}
                        className="neo-button px-8 py-3 rounded-lg lg:rounded-full font-semibold inline-flex items-center gap-2"
                      >
                        View Protocol
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
