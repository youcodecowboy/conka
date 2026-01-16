"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProtocolId } from "@/app/lib/productData";
import { ProtocolSelectorData } from "./protocolSelectorData";

// Protocol images mapping
const protocolImages: Record<ProtocolId, string> = {
  "1": "/protocols/Resilience.jpg",
  "2": "/protocols/Precision.jpg",
  "3": "/protocols/Balance.jpg",
  "4": "/protocols/Ultimate.jpg",
};

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

  return (
    <div className="flex flex-col h-full group border-2 border-black/10 rounded-lg overflow-hidden">
      {/* Image Container with Hover Overlay */}
      <div
        className="relative aspect-[6/2] overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Protocol Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={protocolImages[protocol.id]}
            alt={`${protocol.name} - ${protocol.outcome}`}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="50vw"
            priority
          />
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-[var(--background)] flex flex-col justify-center p-3 transition-all duration-300 ${
            isHovered ? "opacity-95" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Protocol Name (Centered Header) */}
          <h4 className="text-xs font-primary opacity-80 text-center mb-2">
            {protocol.name}
          </h4>

          {/* Situation / Outcome */}
          <p className="text-sm font-bold mb-2 leading-snug">
            For those who {protocol.forPeopleWho}
          </p>

          {/* Key Benefits */}
          <ul className="space-y-1 mb-3">
            {visibleBenefits.map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-start gap-1.5 font-clinical text-xs"
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
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Secondary Ratio Info */}
          <div className="flex gap-4">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-teal-600">
                {protocol.flowPercentage}%
              </span>
              <span className="font-clinical text-[10px] opacity-70">Flow</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-amber-600">
                {protocol.clarityPercentage}%
              </span>
              <span className="font-clinical text-[10px] opacity-70">
                Clarity
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section (Always Visible) */}
      <div className="pt-3 px-5 flex-1 flex flex-col">
        {/* Outcome Headline */}
        <div className="mb-2 pb-2 border-b border-black/5">
          <h3 className="text-lg font-bold mb-0.5">{protocol.outcome}</h3>
          <p className="font-primary text-sm opacity-80 mb-0.5">
            Commonly chosen when:
          </p>
          <p className="font-primary text-sm opacity-80">
            {situationalCues[protocol.id]}
          </p>
        </div>

        {/* Ratios tertiary */}
        <div className="flex gap-6 mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-bold text-teal-600">
              {protocol.flowPercentage}%
            </span>
            <span className="font-clinical text-[10px] opacity-70">Flow</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-bold text-amber-600">
              {protocol.clarityPercentage}%
            </span>
            <span className="font-clinical text-[10px] opacity-70">
              Clarity
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pb-3 flex flex-col items-center">
          <Link
            href={`/protocol/${protocol.id}`}
            className="neo-button px-6 py-2 rounded-full font-bold text-sm inline-flex items-center gap-2 w-auto"
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
