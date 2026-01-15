"use client";

import Link from "next/link";
import { FORMULA_COLORS } from "@/app/lib/productData";

export default function ShopHeroMobile() {
  return (
    <div className="px-6 py-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* ===== Headline ===== */}
        <h1 className="text-2xl font-bold mb-3 leading-tight">
          Sharpen Focus. Boost Clarity.
        </h1>

        {/* ===== Subhead ===== */}
        <p className="font-clinical text-sm mb-6 opacity-70">
          Take the quiz to see which protocol suits your goal, browse our proven
          protocols, or try Flow & Clarity individually.
        </p>

        {/* ===== Mobile CTA Buttons ===== */}
        <div className="flex flex-col gap-3 mb-6">
          {/* CTA 1: Find Your Protocol (Primary) */}
          <Link
            href="/quiz"
            className="neo-button px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-3 w-full"
          >
            {/* Quiz icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <circle cx="10" cy="10" r="8" />
              <path d="M7.57 7.5a2.5 2.5 0 0 1 4.86.83c0 1.67-2.5 2.5-2.5 2.5" />
              <line x1="10" y1="14" x2="10.01" y2="14" />
            </svg>
            <div className="flex-1 text-center">
              <div>Find Your Protocol</div>
              <div className="text-xs opacity-70 font-normal">2-minute quiz</div>
            </div>
            {/* Arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M5 12l5-5-5-5" />
            </svg>
          </Link>

          {/* CTA 2: Browse Protocols (Secondary) */}
          <a
            href="#protocols"
            className="neo-button-outline px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-3 w-full"
          >
            {/* Protocol/shield icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M10 1l7 3.5v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10v-5L10 1z" />
            </svg>
            <div className="flex-1 text-center">
              <div>Browse Protocols</div>
              <div className="text-xs opacity-70 font-normal">4 proven protocols</div>
            </div>
            {/* Arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M5 12l5-5-5-5" />
            </svg>
          </a>

          {/* CTA 3: Try Flow or Clarity (Secondary) */}
          <a
            href="#trial-packs"
            className="neo-button-outline px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-3 w-full"
          >
            {/* Formula color indicators */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: FORMULA_COLORS["01"].hex }}
              />
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: FORMULA_COLORS["02"].hex }}
              />
            </div>
            <div className="flex-1 text-center">
              <div>Try Flow or Clarity</div>
              <div className="text-xs opacity-70 font-normal">Trial packs available</div>
            </div>
            {/* Arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M5 12l5-5-5-5" />
            </svg>
          </a>
        </div>

        {/* ===== Trust / Proof Microline ===== */}
        <p className="font-clinical text-xs text-center opacity-70">
          250+ clinical studies • Patent-protected formulas • Used by athletes
          worldwide
        </p>
      </div>
    </div>
  );
}
