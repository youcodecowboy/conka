"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { pathData, PathType } from "@/app/components/ProtocolBuilder";
import { protocolPricing } from "@/app/lib/productData";

// Primary outcomes mapping
const primaryOutcomes: Record<Exclude<PathType, null>, string> = {
  path1: "Sustainable energy and focus",
  path2: "Unstoppable clarity",
  path3: "The perfect balance",
  path4: "Your mind on the next level",
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

export default function ProtocolsGridMobile() {
  const [expandedProtocolId, setExpandedProtocolId] = useState<string | null>(
    null,
  );

  const handleCardToggle = (protocolId: string) => {
    setExpandedProtocolId(
      expandedProtocolId === protocolId ? null : protocolId,
    );
  };

  return (
    <div className="px-6 py-12 border-t-2 border-current border-opacity-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Quiz CTA */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-1">Choose Your Protocol</h2>
              <p className="font-commentary text-base">
                curated combinations for specific goals
              </p>
            </div>
          </div>
          <Link
            href="/quiz"
            className="neo-button-outline px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 w-full hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
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

        {/* Stacked Cards */}
        <div className="space-y-3">
          {protocols.map((protocol) => {
            const isExpanded = expandedProtocolId === protocol.id;

            return (
              <div
                key={protocol.id}
                className="neo-box overflow-hidden transition-all duration-300"
              >
                {/* Card Header - Always visible, clickable */}
                <button
                  onClick={() => handleCardToggle(protocol.id)}
                  className="w-full text-left"
                  aria-expanded={isExpanded}
                  aria-controls={`protocol-content-${protocol.id}`}
                >
                  {/* Lifestyle Image */}
                  <div className="relative w-full aspect-[3/2] overflow-hidden">
                    <Image
                      src={protocol.lifestyleImage.src}
                      alt={protocol.lifestyleImage.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    {/* Icon Overlay */}
                    <div className="absolute bottom-2 left-2 p-1.5 bg-[var(--background)]/90 border-2 border-current rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <div className="w-5 h-5 flex items-center justify-center">
                        {protocol.icon}
                      </div>
                    </div>
                    {/* Chevron Overlay */}
                    <div className="absolute bottom-2 right-2 p-1.5 bg-[var(--background)]/90 border-2 border-current rounded-lg backdrop-blur-sm flex items-center justify-center">
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
                        className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold leading-tight mb-0.5">
                      {protocol.primaryOutcome}
                    </h3>
                    <p className="font-commentary text-sm opacity-80">
                      {protocol.subtitle}
                    </p>

                    {/* 1-2 Key Benefits (collapsed) */}
                    {!isExpanded && (
                      <div className="mt-2 space-y-1">
                        {protocol.benefits.slice(0, 2).map((benefit, idx) => (
                          <p
                            key={idx}
                            className="font-clinical text-xs opacity-70 flex items-start gap-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
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
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <div
                  id={`protocol-content-${protocol.id}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={!isExpanded}
                >
                  <div className="px-4 pb-4 pt-0 border-t border-current border-opacity-10">
                    {/* Full Description */}
                    <p className="text-sm opacity-80 mb-4 mt-4">
                      {protocol.description}
                    </p>

                    {/* All Benefits */}
                    <ul className="space-y-2 mb-4">
                      {protocol.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 font-clinical text-xs"
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
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-current border-opacity-10">
                      <span className="font-clinical text-xs opacity-70">
                        {protocol.startingPrice}
                      </span>
                      <Link
                        href={`/protocol/${protocol.id}`}
                        className="neo-button px-5 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Protocol
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
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
