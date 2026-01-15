"use client";

import Link from "next/link";
import { pathData, PathType } from "@/app/components/ProtocolBuilder";
import { FORMULA_COLORS } from "@/app/lib/productData";

export default function ShopHero() {
  // Get protocol icons for Block 2
  const protocolIcons = [
    pathData.path1.icon,
    pathData.path2.icon,
    pathData.path3.icon,
    pathData.path4.icon,
  ];

  return (
    <div className="px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* ===== Headline ===== */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center leading-tight">
          Sharpen focus, boost memory, and unlock your brain's potential.
        </h1>

        {/* ===== Subhead ===== */}
        <p className="font-commentary text-lg md:text-xl lg:text-2xl mb-12 md:mb-16 text-center opacity-90">
          Take the quiz to see which protocol suits your goal, browse our proven
          protocols, or try Flow & Clarity individually.
        </p>

        {/* ===== Visual Flow Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {/* Block 1: Help Me → Quiz */}
          <Link
            href="/quiz"
            className="neo-box p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group text-left"
          >
            {/* Visual Elements */}
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* Flow + Clarity Bottles */}
              <div className="flex items-center gap-2">
                <div
                  className="w-12 h-16 md:w-14 md:h-20 rounded-md flex items-center justify-center text-white font-clinical text-xs font-bold"
                  style={{ backgroundColor: FORMULA_COLORS["01"].hex }}
                >
                  01
                </div>
                <div
                  className="w-12 h-16 md:w-14 md:h-20 rounded-md flex items-center justify-center text-white font-clinical text-xs font-bold"
                  style={{ backgroundColor: FORMULA_COLORS["02"].hex }}
                >
                  02
                </div>
              </div>
              {/* Stylized Protocol Icon */}
              <div className="p-3 border-2 border-current rounded-lg group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              </div>
            </div>

            {/* Microcopy */}
            <p className="font-clinical text-sm md:text-base opacity-80">
              Not sure which protocol is right for you? Take our 2-minute quiz
              to find the proven protocol for your goals.
            </p>
          </Link>

          {/* Block 2: I Know → Protocols */}
          <a
            href="#protocols"
            className="neo-box p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group text-left"
          >
            {/* Visual Elements - 2x2 Protocol Icons Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {protocolIcons.map((icon, idx) => (
                <div
                  key={idx}
                  className="p-3 border-2 border-current rounded-md flex items-center justify-center group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8">{icon}</div>
                </div>
              ))}
            </div>

            {/* Microcopy */}
            <p className="font-clinical text-sm md:text-base opacity-80">
              Choose a proven protocol to boost focus, memory, or overall
              cognitive performance.
            </p>
          </a>

          {/* Block 3: I Want to Try → Single Formula / Trial Packs */}
          <a
            href="#trial-packs"
            className="neo-box p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group text-left"
          >
            {/* Visual Elements */}
            <div className="flex flex-col items-center gap-3 mb-4">
              {/* Flow + Clarity Bottles */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-16 md:w-14 md:h-20 rounded-md flex items-center justify-center text-white font-clinical text-xs font-bold"
                  style={{ backgroundColor: FORMULA_COLORS["01"].hex }}
                >
                  01
                </div>
                <div
                  className="w-12 h-16 md:w-14 md:h-20 rounded-md flex items-center justify-center text-white font-clinical text-xs font-bold"
                  style={{ backgroundColor: FORMULA_COLORS["02"].hex }}
                >
                  02
                </div>
              </div>
              {/* Trial Pack Indicators */}
              <div className="flex items-center gap-2">
                {["4", "8", "12"].map((size) => (
                  <div
                    key={size}
                    className="w-8 h-8 md:w-10 md:h-10 border-2 border-current rounded-md flex items-center justify-center font-clinical text-xs opacity-60"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            {/* Microcopy */}
            <p className="font-clinical text-sm md:text-base opacity-80">
              Order Flow or Clarity individually, or try small packs first.
            </p>
          </a>
        </div>

        {/* ===== CTA Button Row ===== */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-8 md:mb-12">
          {/* Find Your Protocol */}
          <Link
            href="/quiz"
            className="neo-button px-6 md:px-8 py-3 md:py-4 rounded-lg lg:rounded-full font-bold text-sm md:text-base lg:text-lg inline-flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
            Find Your Protocol
          </Link>

          {/* See Pre-Built Protocols */}
          <a
            href="#protocols"
            className="px-6 md:px-8 py-3 md:py-4 rounded-lg lg:rounded-full border-2 border-current font-semibold text-sm md:text-base lg:text-lg inline-flex items-center justify-center gap-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            See Pre-Built Protocols
          </a>

          {/* Try Flow or Clarity */}
          <a
            href="#trial-packs"
            className="px-6 md:px-8 py-3 md:py-4 rounded-lg lg:rounded-full border-2 border-current font-semibold text-sm md:text-base lg:text-lg inline-flex items-center justify-center gap-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Try Flow or Clarity
          </a>
        </div>

        {/* ===== Trust / Proof Microline ===== */}
        <p className="font-clinical text-xs md:text-sm text-center opacity-70">
          250+ clinical studies • Patent-protected formulas • Used by athletes
          worldwide
        </p>
      </div>
    </div>
  );
}
