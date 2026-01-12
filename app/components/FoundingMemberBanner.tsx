"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import FoundingMemberCounter from "./FoundingMemberCounter";

const FOUNDING_MEMBER_DEADLINE = new Date("2026-03-31T23:59:59");

export default function FoundingMemberBanner() {
  const isMobile = useIsMobile();
  const [dismissed, setDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Check if deadline has passed
  useEffect(() => {
    if (new Date() > FOUNDING_MEMBER_DEADLINE) {
      setIsVisible(false);
    }
  }, []);

  // Check localStorage for dismissal (only on mobile)
  useEffect(() => {
    if (typeof window !== "undefined" && isMobile === true) {
      const wasDismissed = localStorage.getItem(
        "foundingMemberBannerDismissed",
      );
      if (wasDismissed === "true") {
        setDismissed(true);
      }
    }
  }, [isMobile]);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("foundingMemberBannerDismissed", "true");
    }
  };

  // Early return if not visible or dismissed
  if (!isVisible || dismissed) {
    return null;
  }

  // Marquee text content
  const marqueeText =
    "Founding Member • Use code FOUNDING1000 for 20% off any subscription for an entire year • ";
  const spotsText = "492 spots remaining";

  // Desktop version with marquee
  if (isMobile === false) {
    return (
      <div className="w-full bg-black text-white border-b-2 border-black relative z-[60]">
        <div className="px-6 md:px-16 py-3 md:py-4 flex items-center">
          <div className="flex-1 overflow-hidden relative min-w-0">
            {/* Marquee container */}
            <div className="marquee flex items-center gap-4">
              {/* Duplicate content for seamless loop */}
              <span className="font-clinical text-xs md:text-sm whitespace-nowrap">
                {marqueeText}
                <span className="font-bold">{spotsText}</span>
              </span>
              <span className="font-clinical text-xs md:text-sm whitespace-nowrap">
                {marqueeText}
                <span className="font-bold">{spotsText}</span>
              </span>
            </div>
          </div>
          {/* Fixed Learn More button */}
          <a
            href="/our-story#founding-members"
            className="ml-6 px-4 py-1.5 md:px-6 md:py-2 font-semibold text-xs md:text-sm whitespace-nowrap border-2 border-white text-white hover:bg-white hover:text-black transition-all rounded-full flex-shrink-0"
          >
            Learn More
          </a>
        </div>
      </div>
    );
  }

  // Mobile version - simplified with dismiss
  if (isMobile === true) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[60] bg-black text-white border-b-2 border-black">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-clinical text-xs uppercase tracking-wider opacity-80">
                  Founding Member
                </span>
                <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                <span className="font-clinical text-xs opacity-80">
                  Code: FOUNDING1000
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-clinical text-xs opacity-80">
                  20% off subscriptions
                </span>
              </div>
              <a
                href="/our-story#founding-members"
                className="inline-block mt-1 text-xs underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Learn More
              </a>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
              aria-label="Dismiss banner"
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // During SSR/hydration when isMobile is undefined, show desktop version
  return (
    <div className="w-full bg-black text-white border-b-2 border-black relative z-[60]">
      <div className="px-6 md:px-16 py-3 md:py-4 flex items-center">
        <div className="flex-1 overflow-hidden relative min-w-0">
          <div className="marquee flex items-center gap-4">
            <span className="font-clinical text-xs md:text-sm whitespace-nowrap">
              {marqueeText}
              <span className="font-bold">{spotsText}</span>
            </span>
            <span className="font-clinical text-xs md:text-sm whitespace-nowrap">
              {marqueeText}
              <span className="font-bold">{spotsText}</span>
            </span>
          </div>
        </div>
        <a
          href="/our-story#founding-members"
          className="ml-6 px-4 py-1.5 md:px-6 md:py-2 font-semibold text-xs md:text-sm whitespace-nowrap border-2 border-white text-white hover:bg-white hover:text-black transition-all rounded-full flex-shrink-0"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
