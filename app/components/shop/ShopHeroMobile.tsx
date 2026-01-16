"use client";

import { FORMULA_COLORS } from "@/app/lib/productData";

export default function ShopHeroMobile() {
  return (
    <div className="px-6 py-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* ===== Headline ===== */}
        <h1 className="text-2xl font-bold mb-3 leading-tight">
          Clarity and Focus You Can Feel
        </h1>

        {/* ===== Subhead ===== */}
        <p className="font-clinical text-sm mb-6 opacity-70">
          Start with Flow or Clarity, try a small pack, or explore a protocol
          when you're ready.
        </p>

        {/* ===== Mobile CTA Buttons ===== */}
        <div className="flex flex-col gap-3 mb-6">
          {/* CTA 1: Start with Flow or Clarity (Primary) */}
          <a
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("formulas")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            href="#formulas"
            className="neo-button px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-3 w-full"
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
              <div>Start with Flow or Clarity</div>
              <div className="text-xs opacity-70 font-normal">
                Order individually or try small packs first
              </div>
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

          {/* CTA 2: Explore Proven Protocols (Secondary) */}
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
              <div>Explore Proven Protocols</div>
              <div className="text-xs opacity-70 font-normal">
                Designed for specific mental goals
              </div>
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
