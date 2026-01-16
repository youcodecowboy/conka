"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProtocolId } from "@/app/lib/productData";
import { protocolsArray, ProtocolSelectorData } from "./protocolSelectorData";

// Protocol images mapping
const protocolImages: Record<ProtocolId, string> = {
  "1": "/protocols/Resilience.jpg",
  "2": "/protocols/Precision.jpg",
  "3": "/protocols/Balance.jpg",
  "4": "/protocols/Ultimate.jpg",
};

// Protocol Card Component
function ProtocolCard({ protocol }: { protocol: ProtocolSelectorData }) {
  const [isHovered, setIsHovered] = useState(false);

  // Limit benefits to 3 max for hover display
  const visibleBenefits = protocol.benefits.slice(0, 3);

  return (
    <div className="flex flex-col h-full group">
      {/* Image Container with Hover Overlay */}
      <div
        className="relative aspect-[5/5] rounded-lg overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Protocol Image */}
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(0.95)",
            bottom: "-5%",
          }}
        >
          <Image
            src={protocolImages[protocol.id]}
            alt={`${protocol.name} - ${protocol.outcome}`}
            fill
            className="object-cover"
            style={{ objectPosition: "50% 30%" }}
            sizes="50vw"
            priority
          />
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-[var(--background)] bg-opacity-95 flex flex-col justify-center p-6 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Situation / Outcome */}
          <p className="text-lg font-bold mb-4 leading-snug">
            For those who {protocol.forPeopleWho}
          </p>

          {/* Key Benefits */}
          <ul className="space-y-2 mb-6">
            {visibleBenefits.map((benefit, idx) => (
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

          {/* Secondary Ratio Info */}
          <div className="flex gap-6">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-teal-600">
                {protocol.flowPercentage}%
              </span>
              <span className="font-clinical text-xs opacity-70">Flow</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-amber-600">
                {protocol.clarityPercentage}%
              </span>
              <span className="font-clinical text-xs opacity-70">Clarity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section (Always Visible) */}
      <div className="pt-4 flex-1 flex flex-col">
        {/* Outcome Headline */}
        <h3 className="text-2xl font-bold mb-1">{protocol.outcome}</h3>
        <p className="font-primary text-lg opacity-80 mb-2">{protocol.name}</p>

        {/* Ratios tertiary */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-teal-600">
              {protocol.flowPercentage}%
            </span>
            <span className="font-clinical text-xs opacity-70">Flow</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-amber-600">
              {protocol.clarityPercentage}%
            </span>
            <span className="font-clinical text-xs opacity-70">Clarity</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto">
          <p className="font-clinical text-sm opacity-60 mb-2">
            {protocol.startingPrice}
          </p>
          <Link
            href={`/protocol/${protocol.id}`}
            className="neo-button px-8 py-3 rounded-full font-bold text-base inline-flex items-center gap-2 w-full justify-center"
          >
            Shop {protocol.name}
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
  );
}

// Main Protocols Grid (Desktop)
export default function ProtocolsGridDesktop() {
  return (
    <section className="px-16 pt-12 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Quiz CTA */}
        <div className="flex items-center justify-between mb-10">
          <div className="text-left">
            <h2 className="text-4xl lg:text-5xl font-bold mb-3">
              Choose Your Protocol
            </h2>
            <p className="font-clinical text-lg md:text-xl opacity-70">
              Optimised Flow + Clarity combinations for specific mental goals
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

        {/* 2x2 Protocol Grid */}
        <div className="grid grid-cols-2 gap-12">
          {protocolsArray.map((protocol) => (
            <ProtocolCard key={protocol.id} protocol={protocol} />
          ))}
        </div>

        {/* Comparison note */}
        <div className="mt-12 text-center">
          <p className="font-commentary text-lg opacity-70">
            All protocols can be combined for full cognitive coverage
          </p>
        </div>
      </div>
    </section>
  );
}
