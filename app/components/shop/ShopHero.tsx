"use client";

import Link from "next/link";

export default function ShopHero() {
  return (
    <div className="px-6 md:px-16 py-12 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
          Find Your Cognitive Stack
        </h1>

        {/* Subtitle */}
        <p className="font-commentary text-lg md:text-xl lg:text-2xl mb-4 md:mb-6">
          Choose from proven protocols, individual formulas, or trial packs
        </p>

        {/* Trust indicator */}
        <p className="font-clinical text-xs md:text-sm lg:text-base opacity-70 mb-6 md:mb-8">
          Backed by 250+ clinical studies • Patent-protected formulas
        </p>

        {/* CTAs - Hero exception: keep centered */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
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
              className="w-4 h-4 md:w-5 md:h-5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Find Your Protocol
          </Link>
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
              className="w-4 h-4 md:w-5 md:h-5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            Explore Products
          </a>
        </div>
      </div>
    </div>
  );
}
