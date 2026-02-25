"use client";

import Image from "next/image";
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
  onShopAreaEnter,
  onShopAreaLeave,
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

      {/* Header - Edge to edge (nav does not use premium gutter/track) */}
      <header className="w-full bg-[var(--background)] border-b border-[var(--color-premium-stroke)]">
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
            <div
              className="relative"
              onMouseEnter={onShopAreaEnter}
              onMouseLeave={onShopAreaLeave}
            >
              <button
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                className="px-6 py-1.5 rounded-full bg-transparent font-clinical text-sm border border-[var(--color-premium-stroke)] hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all flex items-center gap-2"
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
                onShopAreaEnter={onShopAreaEnter}
                onShopAreaLeave={onShopAreaLeave}
              />
            </div>

            <nav className="flex items-center gap-6">
              <a
                href="/science"
                className="font-clinical text-sm tracking-wide border-b-2 border-transparent hover:border-current transition-colors pb-0.5"
              >
                The Science
              </a>
              <a
                href="/ingredients"
                className="font-clinical text-sm tracking-wide border-b-2 border-transparent hover:border-current transition-colors pb-0.5"
              >
                Ingredients
              </a>
              <a
                href="/case-studies"
                className="font-clinical text-sm tracking-wide border-b-2 border-transparent hover:border-current transition-colors pb-0.5"
              >
                Case Studies
              </a>
              <a
                href="/app"
                className="font-clinical text-sm tracking-wide border-b-2 border-transparent hover:border-current transition-colors pb-0.5"
              >
                CONKA App
              </a>
              <a
                href="/our-story"
                className="font-clinical text-sm tracking-wide border-b-2 border-transparent hover:border-current transition-colors pb-0.5"
              >
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
              className="font-clinical text-sm tracking-wide border-b-2 border-transparent hover:border-current transition-colors pb-0.5"
            >
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
