"use client";

import { useState } from "react";
import Image from "next/image";
import { ProtocolId } from "@/app/lib/productData";
import { ProtocolSelectorData } from "./protocolSelectorData";
import { getProtocolImage } from "@/app/components/navigation/protocolImageConfig";

// Situational cues mapping
const situationalCues: Record<ProtocolId, string> = {
  "1": "Long days • stress builds up • steady energy",
  "2": "Thinking is demanding • accuracy matters • mental fatigue shows up",
  "3": "Training hard • thinking hard • recovery matters",
  "4": "You want everything working, every day",
};

interface ProtocolCardProps {
  protocol: ProtocolSelectorData;
}

export default function ProtocolCard({ protocol }: ProtocolCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Limit benefits to 3 max for hover display
  const visibleBenefits = protocol.benefits.slice(0, 3);

  const href = `/protocol/${protocol.id}`;

  return (
    <a
      href={href}
      className="flex flex-col h-full group border-2 border-black/10 rounded-[var(--premium-radius-base)] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)]"
    >
      {/* Image Container — asset fills space; surface bg for non-white assets */}
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-[var(--color-surface)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={getProtocolImage(protocol.id)}
          alt={`${protocol.name} - ${protocol.outcome}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
          priority
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-[var(--background)] flex flex-col justify-center p-4 transition-all duration-300 ${
            isHovered ? "opacity-95" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Protocol Name (Centered Header) */}
          <h4 className="text-sm font-primary opacity-80 text-center mb-3">
            {protocol.name}
          </h4>

          {/* Situation / Outcome */}
          <p className="text-base font-bold mb-3 leading-snug">
            For those who {protocol.forPeopleWho}
          </p>

          {/* Key Benefits */}
          <ul className="space-y-1.5 mb-4">
            {visibleBenefits.map((benefit, idx) => (
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
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Secondary Ratio Info */}
          <div className="flex gap-5">
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
              <span className="font-clinical text-xs opacity-70">Clear</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section (Always Visible) */}
      <div className="py-5 px-5">
        {/* Title - Full Width */}
        <h3 className="text-lg font-bold leading-tight mb-3">
          {protocol.outcome}
        </h3>

        {/* Context & Price/Button Row */}
        <div className="flex items-start justify-between gap-4">
          {/* Left: Context */}
          <div className="flex-1 min-w-0">
            <p className="font-primary text-xs uppercase tracking-wide opacity-50 mb-1">
              Commonly chosen when
            </p>
            <p className="font-primary text-sm opacity-70 leading-relaxed">
              {situationalCues[protocol.id]}
            </p>
          </div>

          {/* Right: Price & Button (vertically stacked) */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="font-clinical text-xs opacity-90">
              {protocol.startingPrice}
            </span>
            {/* CTA - visual only; whole card is the link */}
            <span className="neo-button px-5 py-2.5 rounded-full font-bold text-sm inline-flex items-center gap-2">
              View product
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
        </div>
      </div>
    </a>
  );
}
