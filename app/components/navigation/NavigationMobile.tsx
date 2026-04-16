"use client";

import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { Banner } from "@/app/components/banner";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
import type { NavigationMobileProps } from "./types";

const PRODUCTS = [
  {
    name: "Both (Flow + Clear)",
    description: "The full daily system",
    href: "/protocol/3",
    image: getProtocolImage("3"),
    alt: "CONKA Flow and Clear",
  },
  {
    name: "CONKA Flow",
    description: "Morning focus & energy",
    href: "/conka-flow",
    image: getFormulaImage("01"),
    alt: "CONKA Flow",
  },
  {
    name: "CONKA Clear",
    description: "Afternoon clarity & recovery",
    href: "/conka-clarity",
    image: getFormulaImage("02"),
    alt: "CONKA Clear",
  },
];

const LEARN_MORE = [
  { label: "What is in CONKA Flow and Clear?", href: "/ingredients" },
  { label: "Why CONKA?", href: "/why-conka" },
  { label: "What is the CONKA App?", href: "/app" },
];

const NAV_LINKS = [
  {
    label: "The Science",
    href: "/science",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    label: "Ingredients",
    href: "/ingredients",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <path d="M8.5 2h7" />
      </svg>
    ),
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    label: "Why CONKA?",
    href: "/why-conka",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    label: "CONKA App",
    href: "/app",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    label: "Our Story",
    href: "/our-story",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function NavigationMobile({
  mobileMenuOpen,
  setMobileMenuOpen,
  hideBanner,
  bannerConfig,
}: NavigationMobileProps) {
  const { openCart, itemCount } = useCart();

  return (
    <>
      {/* Founding Member Banner */}
      {!hideBanner && bannerConfig && <Banner config={bannerConfig} />}

      {/* Mobile Header - Always visible; tight gutter on mobile */}
      <header className="relative w-full bg-[var(--background)] border-b border-[var(--color-premium-stroke)]">
        <div className="px-[var(--premium-gutter-mobile-tight)] md:px-16 py-1 flex items-center justify-between min-h-[4.5rem]">
          {/* Left: Hamburger */}
          <div className="xl:hidden w-10 flex-shrink-0 flex items-center justify-start">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:opacity-70 transition-all"
              aria-label="Toggle menu"
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
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Center: Logo */}
          <a
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center pointer-events-auto"
            aria-label="CONKA home"
          >
            <Image
              src="/conka-logo.webp"
              alt="CONKA logo"
              width={440}
              height={112}
              className="h-7 md:h-9 w-auto"
              priority
            />
          </a>

          {/* Right: Account + Cart */}
          <div className="xl:hidden min-w-[5.5rem] flex-shrink-0 flex items-center justify-end gap-2">
            <a
              href="/account/login"
              className="p-2 hover:opacity-70 transition-all"
              aria-label="Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </a>
            <button
              onClick={() => {
                openCart();
                setMobileMenuOpen(false);
              }}
              className="p-2 hover:opacity-70 transition-all relative"
              aria-label="Open cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-40 bg-[var(--background)] flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 pb-16 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <a href="/" className="flex items-center">
                <Image
                  src="/conka-logo.webp"
                  alt="CONKA logo"
                  width={440}
                  height={112}
                  className="h-7 w-auto invert"
                  priority
                />
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="mt-4">
              {/* Shop by Product */}
              <p className="font-clinical text-xs uppercase tracking-wide opacity-50 mb-3">
                Shop by Product
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {PRODUCTS.map((product) => (
                  <a
                    key={product.href}
                    href={product.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-3 border border-[var(--color-premium-stroke)] rounded-[var(--brand-radius-card)] bg-white"
                  >
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-black/6">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-black">
                        {product.name}
                      </p>
                      <p className="font-clinical text-xs text-black/50 mt-0.5">
                        {product.description}
                      </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 flex-shrink-0">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Learn More */}
              <p className="font-clinical text-xs uppercase tracking-wide opacity-50 mb-3">
                Learn More
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {LEARN_MORE.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 border border-[var(--color-premium-stroke)] rounded-[var(--brand-radius-card)] bg-white"
                  >
                    <span className="font-clinical text-sm">{link.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 flex-shrink-0">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Navigation */}
              <div className="bg-neutral-100 py-4 px-4 -mx-6 mb-4">
                <p className="font-clinical text-xs uppercase opacity-50 mb-3">
                  Navigation
                </p>
                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 py-2 px-3 bg-white border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-card)] hover:border-black/20 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.icon}
                      <span className="font-clinical text-sm tracking-wide">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
