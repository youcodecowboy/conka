"use client";

import Link from "next/link";
import { pathData } from "@/app/components/ProtocolBuilder";
import { FORMULA_COLORS } from "@/app/lib/productData";

export default function ShopHero() {
  const protocolIcons = [
    pathData.path1.icon,
    pathData.path2.icon,
    pathData.path3.icon,
    pathData.path4.icon,
  ];

  return (
    <div className="px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-6xl mx-auto text-center">
        {/* ===== Headline ===== */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
          Sharpen Focus. Boost Clarity.
        </h1>

        {/* ===== Subhead ===== */}
        <p className="font-clinical text-lg md:text-xl lg:text-2xl mb-12 md:mb-16 opacity-70">
          Take the quiz to see which protocol suits your goal, browse our proven
          protocols, or try Flow & Clarity individually.
        </p>

        {/* ===== Visual Flow Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-16">
          {/* Block 1: Help Me → Quiz */}
          <Link
            href="/quiz"
            className="neo-box p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group text-left flex flex-col items-center"
          >
            <h3 className="font-bold text-xl md:text-2xl mb-2">
              Find Your Protocol
            </h3>
            <div className="flex items-center justify-center gap-4 mb-4">
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
              <div className="p-3 border-2 border-current rounded-lg group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                {/* Stylized protocol icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
            <p className="font-clinical text-sm md:text-base opacity-80 text-center">
              Not sure which protocol is right for you? Take our 2-minute quiz
              to find the proven protocol for your goals.
            </p>
          </Link>

          {/* Block 2: I Know → Protocols */}
          <a
            href="#protocols"
            className="neo-box p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group text-left flex flex-col items-center"
          >
            <h3 className="font-bold text-xl md:text-2xl mb-2">
              Browse Proven Protocols
            </h3>
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
            <p className="font-clinical text-sm md:text-base opacity-80 text-center">
              Choose a proven protocol to boost focus, memory, or overall
              cognitive performance.
            </p>
          </a>

          {/* Block 3: I Want to Try → Single Formula / Trial Packs */}
          <a
            href="#trial-packs"
            className="neo-box p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group text-left flex flex-col items-center"
          >
            <h3 className="font-bold text-xl md:text-2xl mb-2">
              Try Flow or Clarity
            </h3>
            <div className="flex flex-col items-center gap-3 mb-4">
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
            <p className="font-clinical text-sm md:text-base opacity-80 text-center">
              Order Flow or Clarity individually, or try small packs first.
            </p>
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
