"use client";

import Link from "next/link";
import { pathData, PathType } from "@/app/components/ProtocolBuilder";
import { protocolPricing } from "@/app/lib/productData";

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
      description: data.description,
      benefits: data.benefits,
      startingPrice: mapping.startingPrice,
      isUltimate: data.isUltimate,
      icon: data.icon,
    };
  }
);

export default function ProtocolsGrid() {
  return (
    <div className="px-6 md:px-16 py-12 md:py-24 border-t-2 border-current border-opacity-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Left aligned on mobile */}
        <div className="mb-8 md:mb-12 text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Choose Your Protocol
          </h2>
          <p className="font-commentary text-lg md:text-xl">
            curated combinations for specific goals
          </p>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {protocols.map((protocol) => (
            <Link
              key={protocol.id}
              href={`/protocol/${protocol.id}`}
              className="neo-box p-4 md:p-6 hover:shadow-[4px_4px_0px_0px_var(--foreground)] md:hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group block"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 border-2 border-current rounded-lg group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                  {protocol.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">{protocol.title}</h3>
                    {protocol.isUltimate && (
                      <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-clinical rounded-full">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <p className="font-commentary text-lg opacity-80">
                    {protocol.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-base mb-4 opacity-80">{protocol.description}</p>

              {/* Benefits */}
              <ul className="space-y-2 mb-6">
                {protocol.benefits.map((benefit, idx) => (
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
              <div className="flex items-center justify-between pt-4 border-t-2 border-current border-opacity-10">
                <span className="font-clinical text-xs opacity-70">
                  {protocol.startingPrice}
                </span>
                <span className="px-4 md:px-6 py-2 rounded-lg lg:rounded-full border-2 border-current font-semibold text-sm inline-flex items-center gap-2 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all">
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
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quiz CTA */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="font-commentary text-base md:text-lg mb-4 opacity-70">
            not sure which protocol is right for you?
          </p>
          <Link
            href="/quiz"
            className="px-6 md:px-8 py-3 rounded-lg lg:rounded-full border-2 border-current font-semibold inline-flex items-center gap-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
            Take the Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
