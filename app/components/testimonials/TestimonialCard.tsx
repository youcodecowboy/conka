"use client";

import { useState } from "react";
import { TestimonialCardProps } from "./types";

/**
 * Star Rating Component
 * Displays 5 stars, filled based on rating value (1-5)
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={star <= rating ? "text-current" : "text-current opacity-30"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
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
      className={`border-2 ${isMobile ? "p-5" : "p-6"} h-full flex flex-col bg-[var(--background)]`}
      style={{
        borderColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* Header: Name and Country */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{name}</h3>
          <span className="font-clinical text-xs opacity-70">{country}</span>
        </div>

        {/* Rating Stars */}
        {showRating && rating && (
          <div className="mb-3">
            <StarRating rating={rating} />
          </div>
        )}
      </div>

      {/* Headline */}
      <h4 className="font-bold text-xl mb-3">{headline}</h4>

      {/* Body Text - With Read More */}
      <div className="flex-grow mb-4">
        <p className="text-sm opacity-80 leading-relaxed mb-2 whitespace-pre-line">
          {displayText}
        </p>
        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="font-clinical text-xs opacity-70 hover:opacity-100 transition-opacity underline"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      {/* Date */}
      <div className="mt-auto">
        <p className="font-clinical text-xs opacity-60">{formatDate(date)}</p>
      </div>
    </div>
  );
}
