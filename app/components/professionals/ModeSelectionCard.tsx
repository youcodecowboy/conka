"use client";

import Link from "next/link";
import type { ModeSelectionCardProps } from "./types";

export default function ModeSelectionCard({
  heading,
  description,
  ctaText,
  href,
  icon,
}: ModeSelectionCardProps) {
  return (
    <div className="neo-box p-6 md:p-8 flex flex-col h-full">
      {/* Icon */}
      <div className="mb-4 md:mb-6 flex-shrink-0">{icon}</div>

      {/* Heading */}
      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{heading}</h3>

      {/* Description */}
      <p className="font-clinical text-sm opacity-70 mb-4 md:mb-6 flex-1">
        {description}
      </p>

      {/* CTA Button */}
      <Link
        href={href}
        className="neo-button px-6 py-3 font-semibold text-sm inline-flex items-center justify-center gap-2 w-full"
      >
        {ctaText}
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
  );
}
