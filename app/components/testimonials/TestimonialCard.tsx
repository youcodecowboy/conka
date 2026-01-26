"use client";

import { useState } from "react";
import { TestimonialCardProps } from "./types";

/**
 * Star Rating Component
 * Displays 5 stars, filled based on rating value (1-5)
 * Uses amber accent color for filled stars
 */
function StarRating({ rating, isMobile = false }: { rating: number; isMobile?: boolean }) {
  const starSize = isMobile ? 12 : 16;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          width={starSize}
          height={starSize}
          viewBox="0 0 24 24"
          fill={star <= rating ? "#f59e0b" : "none"}
          stroke={star <= rating ? "#f59e0b" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={star <= rating ? "" : "opacity-30"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Verified Customer Badge
 * Blue checkmark badge similar to Meta/X verified accounts
 */
function VerifiedBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span className="font-clinical text-[10px] text-blue-600 font-medium">
        Verified Customer
      </span>
    </div>
  );
}

/**
 * Format date string to readable format
 * e.g., "2025-07-29" -> "July 29, 2025"
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Reusable testimonial card component
 * Displays name, country, rating, headline, body, and date
 */
export default function TestimonialCard({
  testimonial,
  showRating = true,
  isMobile = false,
}: TestimonialCardProps) {
  const { name, country, rating, headline, body, date } = testimonial;
  const [isExpanded, setIsExpanded] = useState(false);

  // Character limit for truncation
  const CHAR_LIMIT = 200;
  const isLongText = body.length > CHAR_LIMIT;
  const displayText = isExpanded
    ? body
    : isLongText
      ? `${body.slice(0, CHAR_LIMIT)}...`
      : body;

  return (
    <div
      className={`border-2 ${isMobile ? "p-3" : "p-6"} flex flex-col bg-[var(--background)]`}
      style={{
        borderColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* Header: Name, Verified Badge, and Country */}
      <div className={isMobile ? "mb-2" : "mb-3"}>
        <div className={`flex items-start justify-between ${isMobile ? "mb-1" : "mb-2"} gap-2`}>
          <div className="flex-1 min-w-0">
            <div className={`flex items-center gap-1.5 ${isMobile ? "mb-1" : "mb-1.5"}`}>
              <h3 className={`font-bold ${isMobile ? "text-sm" : "text-lg"}`}>{name}</h3>
              {!isMobile && <VerifiedBadge />}
            </div>
            <span className={`font-clinical ${isMobile ? "text-[10px]" : "text-xs"} opacity-70`}>{country}</span>
          </div>
        </div>

        {/* Rating Stars */}
        {showRating && rating && (
          <div className={isMobile ? "mb-2" : "mb-3"}>
            <StarRating rating={rating} isMobile={isMobile} />
          </div>
        )}
      </div>

      {/* Headline */}
      <h4 className={`font-bold ${isMobile ? "text-sm mb-2" : "text-xl mb-3"}`}>{headline}</h4>

      {/* Body Text - With Read More */}
      <div className={`flex-grow ${isMobile ? "mb-2" : "mb-4"}`}>
        <p className={`${isMobile ? "text-xs" : "text-sm"} opacity-80 ${isMobile ? "leading-snug" : "leading-relaxed"} ${isMobile ? "mb-1" : "mb-2"} whitespace-pre-line`}>
          {displayText}
        </p>
        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`font-clinical ${isMobile ? "text-[10px]" : "text-xs"} opacity-70 hover:opacity-100 transition-opacity underline`}
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      {/* Date */}
      <div className="mt-auto">
        <p className={`font-clinical ${isMobile ? "text-[10px]" : "text-xs"} opacity-60`}>{formatDate(date)}</p>
      </div>
    </div>
  );
}
