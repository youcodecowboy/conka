"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProtocolId } from "@/app/lib/productData";
import {
  protocolsArray,
  ProtocolSelectorData,
} from "./protocolSelectorData";

// Protocol images mapping
const protocolImages: Record<ProtocolId, string> = {
  "1": "/protocols/Resilience.jpg",
  "2": "/protocols/Precision.jpg",
  "3": "/protocols/Balance.jpg",
  "4": "/protocols/Ultimate.jpg",
};

// Protocol-specific hover microcopy
const hoverMicrocopy: Record<ProtocolId, string> = {
  "1": "What you'll feel",
  "2": "How it helps",
  "3": "Why it works",
  "4": "The full stack",
};

// Protocol Card Component
function ProtocolCard({ protocol }: { protocol: ProtocolSelectorData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Image Container with Hover Overlay */}
      <div
        className="relative aspect-[5/5] rounded-lg overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Protocol Image */}
        <div className="absolute inset-0" style={{ bottom: "-20%" }}>
          <Image
            src={protocolImages[protocol.id]}
            alt={`${protocol.name} - ${protocol.outcome}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              objectPosition: "50% 30%",
            }}
            sizes="50vw"
            priority
          />
        </div>

        {/* Hover Indicator Badge (visible in default state, hidden on hover) */}
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background)] border-2 border-[var(--foreground)] transition-opacity duration-300 z-10 ${
            isHovered ? "opacity-0" : "opacity-80"
          }`}
        >
          <span className="font-clinical text-xs">
            {hoverMicrocopy[protocol.id]}
          </span>
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-[var(--background)] flex flex-col justify-center p-8 transition-all duration-300 ${
            isHovered ? "opacity-95" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* For People Who... */}
          <p className="text-base mb-6 leading-relaxed opacity-90">
            For people who {protocol.forPeopleWho}
          </p>

          {/* Ratio Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold mb-1 text-teal-600">
                {protocol.flowPercentage}%
              </p>
              <p className="font-clinical text-xs font-semibold">Flow</p>
              <p className="font-clinical text-[10px] opacity-60">
                Adaptogens
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold mb-1 text-amber-600">
                {protocol.clarityPercentage}%
              </p>
              <p className="font-clinical text-xs font-semibold">Clarity</p>
              <p className="font-clinical text-[10px] opacity-60">
                Nootropics
              </p>
            </div>
          </div>

          {/* Key Benefits */}
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

          {/* CTA in Overlay */}
          <Link
            href={`/protocol/${protocol.id}`}
            className="neo-button px-6 py-3 rounded-full font-bold text-sm inline-flex items-center gap-2 justify-center"
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

      {/* Content Section (Always Visible) */}
      <div className="pt-6 flex-1 flex flex-col">
        {/* Outcome Headline + Protocol Name */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold font-primary opacity-100">
            {protocol.outcome}
          </h3>
          <p className="font-primary text-lg opacity-80 mt-1">
            {protocol.name}
          </p>
        </div>

        {/* Ratio Info (Tertiary) */}
        <div className="flex gap-4 mb-6">
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

        {/* Price + CTA Button */}
        <div className="mt-auto">
          <p className="font-clinical text-sm opacity-60 mb-3">
            {protocol.startingPrice}
          </p>
          <Link
            href={`/protocol/${protocol.id}`}
            className="neo-button px-8 py-3 rounded-full font-bold text-base inline-flex items-center gap-2 w-full justify-center"
          >
            Shop Protocol
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
              Pre-optimised Flow + Clarity ratios for different mental demands
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
            all protocols work synergistically
          </p>
        </div>
      </div>
    </section>
  );
}
