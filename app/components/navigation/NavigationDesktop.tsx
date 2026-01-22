"use client";

import Image from "next/image";
import { CiBeaker1 } from "react-icons/ci";
import { useCart } from "@/app/context/CartContext";
import { Banner } from "@/app/components/banner";
import ShopMegaMenu from "./ShopMegaMenu";
import type { NavigationDesktopProps } from "./types";

export default function NavigationDesktop({
  hideBanner,
  shopDropdownOpen,
  setShopDropdownOpen,
  hoveredSection,
  setHoveredSection,
  shopDropdownRef,
  bannerConfig,
  isScrollingDown,
}: NavigationDesktopProps) {
  const { openCart, itemCount } = useCart();

  return (
    <div
      className={`w-full lg:fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isScrollingDown ? "lg:-translate-y-full" : "lg:translate-y-0"
      }`}
      ref={shopDropdownRef}
    >
      {/* Founding Member Banner */}
      {!hideBanner && bannerConfig && <Banner config={bannerConfig} />}

      {/* Header - Edge to edge */}
      <header className="w-full bg-[var(--background)] border-b-2 border-current border-opacity-10">
        <div className="px-6 md:px-16 py-1 flex items-center relative">
          {/* Logo - Left */}
          <a href="/" className="flex items-center">
            <Image
              src="/conka.svg"
              alt="CONKA logo"
              width={270}
              height={90}
              className="h-16 md:h-20 w-auto invert"
              priority
            />
          </a>

          {/* Shop + Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 ml-6">
            {/* Shop Mega Menu */}
            <div className="relative">
              <button
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                className="px-6 py-1.5 rounded-full bg-transparent font-clinical text-sm border-2 border-current hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all flex items-center gap-2"
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
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Shop
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${
                    shopDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <ShopMegaMenu
                isOpen={shopDropdownOpen}
                onClose={() => setShopDropdownOpen(false)}
                hoveredSection={hoveredSection}
                setHoveredSection={setHoveredSection}
                bannerConfig={bannerConfig}
                hideBanner={hideBanner}
              />
            </div>

            <nav className="flex items-center gap-6">
              <a
                href="/science"
                className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2"
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
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                The Science
              </a>
              <a
                href="/ingredients"
                className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2"
              >
                <CiBeaker1 size={16} />
                Ingredients
              </a>
              <a
                href="/case-studies"
                className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2"
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Case Studies
              </a>
              <a
                href="/our-story"
                className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2"
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Our Story
              </a>
            </nav>
          </div>

          {/* White Space */}
          <div className="flex-1"></div>

          {/* Right: Take Quiz + Account + Cart */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Take the Quiz */}
            <a
              href="/quiz"
              className="flex items-center gap-2 font-clinical text-sm tracking-wide hover:opacity-70 transition-all"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Take the Quiz
            </a>
            {/* Account Icon */}
            <a
              href="/account/login"
              className="p-2 hover:opacity-70 transition-all"
              aria-label="Account"
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </a>
            <button
              onClick={openCart}
              className="p-2 hover:opacity-70 transition-all relative"
              aria-label="Open cart"
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
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
