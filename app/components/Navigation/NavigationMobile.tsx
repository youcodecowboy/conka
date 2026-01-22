"use client";

import Image from "next/image";
import { CiBeaker1 } from "react-icons/ci";
import { useCart } from "@/app/context/CartContext";
import type { NavigationMobileProps } from "./types";

export default function NavigationMobile({
  mobileMenuOpen,
  setMobileMenuOpen,
  hideBanner,
}: NavigationMobileProps) {
  const { openCart, itemCount } = useCart();

  if (!mobileMenuOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-40 bg-[var(--background)] flex flex-col">
      {/* Scrollable Content - Centered vertically */}
      <div className="flex-1 overflow-y-auto p-6 pb-16 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <a href="/" className="flex items-center">
            <Image
              src="/conka.svg"
              alt="CONKA logo"
              width={270}
              height={90}
              className="h-16 w-auto invert"
              priority
            />
          </a>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2"
            aria-label="Close menu"
          >
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content - With top spacing */}
        <div className="mt-4">
          {/* Quiz CTA - Prominent with RECOMMENDED tag - FIRST */}
          <div className="block p-3 pb-4 mb-4 border-b-2 border-black bg-black text-white rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="font-bold text-base">Find Your Protocol</p>
                  <span className="px-1.5 py-0.5 bg-green-500 text-white font-clinical text-[10px] font-bold rounded-full">
                    RECOMMENDED
                  </span>
                </div>
                <p className="font-clinical text-xs opacity-80">
                  2-minute quiz
                </p>
              </div>
            </div>
            <a
              href="/quiz"
              className="block w-full py-2 bg-white text-black text-center font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Take the Quiz
            </a>
          </div>

          {/* Shop Protocols Section */}
          <div className="space-y-2 pb-4 mb-4 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <p className="font-clinical text-xs uppercase opacity-50">
                Shop Protocols
              </p>
              <p className="font-primary text-xs opacity-70">mixed plans</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/protocol/1"
                className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
                onClick={() => setMobileMenuOpen(false)}
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
                  className="opacity-50 flex-shrink-0"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div>
                  <p className="font-bold text-sm">Resilience Protocol</p>
                  <p className="font-clinical text-xs opacity-70">
                    For those that want more focus
                  </p>
                </div>
              </a>
              <a
                href="/protocol/2"
                className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
                onClick={() => setMobileMenuOpen(false)}
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
                  className="opacity-50 flex-shrink-0"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <div>
                  <p className="font-bold text-sm">Precision Protocol</p>
                  <p className="font-clinical text-xs opacity-70">
                    For those that feel foggy
                  </p>
                </div>
              </a>
              <a
                href="/protocol/3"
                className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
                onClick={() => setMobileMenuOpen(false)}
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
                  className="opacity-50 flex-shrink-0"
                >
                  <line x1="12" y1="3" x2="12" y2="21" />
                  <path d="M3 12h18" />
                </svg>
                <div>
                  <p className="font-bold text-sm">Balance Protocol</p>
                  <p className="font-clinical text-xs opacity-70">
                    Alternate daily between CONKA Flow and CONKA Clear
                  </p>
                </div>
              </a>
              <a
                href="/protocol/4"
                className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
                onClick={() => setMobileMenuOpen(false)}
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
                  className="opacity-50 flex-shrink-0"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <div>
                  <p className="font-bold text-sm">Ultimate Protocol</p>
                  <p className="font-clinical text-xs opacity-70">
                    Take CONKA Flow and CONKA Clear both daily
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Individual Formulas Section */}
          <div className="space-y-2 pb-4 mb-4 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <p className="font-clinical text-xs uppercase opacity-50">
                Individual Formulas
              </p>
              <p className="font-primary text-xs opacity-70">
                order individually
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/conka-flow"
                className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="w-3 h-3 bg-amber-500 rounded-sm flex-shrink-0"></span>
                <span className="font-bold text-sm">CONKA Flow</span>
              </a>
              <a
                href="/conka-clarity"
                className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="w-3 h-3 bg-[#AAB9BC] rounded-sm flex-shrink-0"></span>
                <span className="font-bold text-sm">CONKA Clear</span>
              </a>
            </div>
          </div>

          {/* Navigation - Visually separated */}
          <div className="py-4 mb-4">
            <p className="font-clinical text-xs uppercase opacity-50 mb-2">
              Navigation
            </p>

            {/* Main Nav Links - 2x2 Grid with Icons */}
            <nav className="grid grid-cols-2 gap-2">
              <a
                href="/science"
                className="flex items-center gap-2 py-2 px-3 bg-white border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
                onClick={() => setMobileMenuOpen(false)}
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
                  className="opacity-60 flex-shrink-0"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="font-clinical text-sm tracking-wide">
                  The Science
                </span>
              </a>
              <a
                href="/ingredients"
                className="flex items-center gap-2 py-2 px-3 bg-white border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CiBeaker1 size={16} className="opacity-60 flex-shrink-0" />
                <span className="font-clinical text-sm tracking-wide">
                  Ingredients
                </span>
              </a>
              <a
                href="/case-studies"
                className="flex items-center gap-2 py-2 px-3 bg-white border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
                onClick={() => setMobileMenuOpen(false)}
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
                  className="opacity-60 flex-shrink-0"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span className="font-clinical text-sm tracking-wide">
                  Case Studies
                </span>
              </a>
              <a
                href="/our-story"
                className="flex items-center gap-2 py-2 px-3 bg-white border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
                onClick={() => setMobileMenuOpen(false)}
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
                  className="opacity-60 flex-shrink-0"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="font-clinical text-sm tracking-wide">
                  Our Story
                </span>
              </a>
            </nav>
          </div>

          {/* Cart & Account Buttons - Always visible */}
          <div className="grid grid-cols-2 gap-2 pt-4 mt-auto border-t-2 border-black">
            <button
              onClick={() => {
                openCart();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-black text-white font-bold text-sm rounded-lg hover:opacity-90 transition-all"
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
              Cart{" "}
              {itemCount > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px]">
                  {itemCount}
                </span>
              )}
            </button>
            <a
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-black text-black font-bold text-sm rounded-lg hover:bg-black hover:text-white transition-all"
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
