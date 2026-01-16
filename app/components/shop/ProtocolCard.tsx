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
        className="relative aspect-[4/2.5] overflow-hidden cursor-pointer"
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
          className={`absolute inset-0 bg-[var(--background)] flex flex-col justify-center p-4 transition-all duration-300 ${
            isHovered ? "opacity-95" : "opacity-0 pointer-events-none"
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
      <div className="pt-6 px-6 flex-1 flex flex-col">
        {/* Outcome Headline */}
        <div className="mb-4 pb-4 border-b border-black/5">
          <h3 className="text-xl font-bold mb-1">{protocol.outcome}</h3>
          <p className="font-primary text-sm opacity-80">{protocol.name}</p>
        </div>

        {/* Ratios tertiary */}
        <div className="flex gap-6 mb-6">
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
        <div className="mt-auto pb-6 flex flex-col items-center">
          <Link
            href={`/protocol/${protocol.id}`}
            className="neo-button px-7 py-2.5 rounded-full font-bold text-sm inline-flex items-center gap-2 w-auto"
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
