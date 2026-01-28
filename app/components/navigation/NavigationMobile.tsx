"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiBeaker1 } from "react-icons/ci";
import { useCart } from "@/app/context/CartContext";
import { Banner } from "@/app/components/banner";
import { protocolContent } from "@/app/lib/productData";
import { protocolSelectorData } from "@/app/components/shop/protocolSelectorData";
import { formulas } from "@/app/components/shop/formulasShowcaseData";
import { getProtocolImage, getFormulaImage } from "./protocolImageConfig";
import type { NavigationMobileProps } from "./types";

export default function NavigationMobile({
  mobileMenuOpen,
  setMobileMenuOpen,
  hideBanner,
  bannerConfig,
}: NavigationMobileProps) {
  const { openCart, itemCount } = useCart();
  const [shopView, setShopView] = useState<"protocols" | "formulas">("protocols");

  return (
    <>
      {/* Founding Member Banner */}
      {!hideBanner && bannerConfig && <Banner config={bannerConfig} />}

      {/* Mobile Header - Always visible */}
      <header className="w-full bg-[var(--background)] border-b-2 border-current border-opacity-10">
        <div className="px-6 md:px-16 py-1 flex items-center">
          {/* Left: Hamburger */}
          <div className="lg:hidden">
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
          <div className="flex-1 flex justify-center">
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
          </div>

          {/* Right: Account + Cart */}
          <div className="lg:hidden flex items-center gap-2">
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
            {/* Cart Icon */}
            <button
              onClick={() => {
                openCart();
                setMobileMenuOpen(false);
              }}
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

      {/* Mobile Menu Overlay - Only visible when mobileMenuOpen is true */}
      {mobileMenuOpen && (
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
          <div className="block p-3 pb-4 mb-4 border-b-8 border-gray-200 bg-black text-white rounded-lg">
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

          {/* Shop Toggle */}
          <div className="flex gap-0 mb-4 bg-gray-100 p-1 rounded-full border-2 border-current">
            <button
              onClick={() => setShopView("protocols")}
              className={`flex-1 px-4 py-2 rounded-full transition-all ${
                shopView === "protocols"
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-transparent"
              }`}
            >
              <span className="font-clinical text-sm font-medium">Shop by Protocol</span>
            </button>
            <button
              onClick={() => setShopView("formulas")}
              className={`flex-1 px-4 py-2 rounded-full transition-all ${
                shopView === "formulas"
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-transparent"
              }`}
            >
              <span className="font-clinical text-sm font-medium">Shop Individual Formula</span>
            </button>
          </div>

          {/* Shop by Protocol Section */}
          {shopView === "protocols" && (
            <div className="pb-4 mb-4">
              <div className="grid grid-cols-2 gap-3">
                {(["1", "2", "3", "4"] as const).map((protocolId) => {
                  const protocol = protocolContent[protocolId];
                  const selectorData = protocolSelectorData[protocolId];
                  // Get image based on config
                  const imageSrc = getProtocolImage(protocolId) || protocol.image;
                  return (
                    <div
                      key={protocolId}
                      className="flex flex-col border-2 border-black/10 rounded-lg overflow-hidden bg-white p-3"
                    >
                      <a
                        href={`/protocol/${protocolId}`}
                        className="block mb-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
                          <Image
                            src={imageSrc}
                            alt={protocol.name}
                            fill
                            className="object-cover"
                            sizes="50vw"
                          />
                        </div>
                        <p className="font-primary text-[10px] uppercase tracking-wide opacity-60 mb-1">
                          {protocol.name}
                        </p>
                        <h3 className="text-base font-bold leading-tight mb-2">
                          {selectorData.outcome}
                        </h3>
                      </a>
                      <a
                        href={`/protocol/${protocolId}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="neo-button px-3 py-1.5 rounded-full font-bold text-xs inline-flex items-center gap-1.5 w-fit mx-auto"
                      >
                        View product
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
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Shop Individual Formula Section */}
          {shopView === "formulas" && (
            <div className="pb-4 mb-4">
              <div className="flex flex-col gap-4">
                {formulas.map((formula) => {
                  // Get image based on config
                  const imageSrc = getFormulaImage(formula.id) || formula.image.src;
                  return (
                    <Link
                      key={formula.id}
                      href={formula.href}
                      className="block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex flex-col border-2 border-black/10 rounded-lg overflow-hidden bg-white p-3">
                        <div className="relative aspect-[3/2] mb-3 rounded-lg overflow-hidden">
                          <Image
                            src={imageSrc}
                            alt={formula.image.alt}
                            fill
                            className="object-cover"
                            style={{
                              objectPosition: `${formula.image.focalX}% ${formula.image.focalY}%`,
                            }}
                            sizes="100vw"
                          />
                        </div>
                        <div className="flex flex-col flex-1">
                          {/* Formula Name - Small, Above Headline */}
                          <p className="font-primary text-xs uppercase tracking-wide opacity-60 mb-1">
                            {formula.name}
                          </p>
                          
                          {/* Headline - Always Visible */}
                          <h3 className="text-lg font-bold leading-tight mb-3">
                            {formula.headline}
                          </h3>

                          {/* CTA Button */}
                          <div className="neo-button px-3 py-1.5 rounded-full font-bold text-xs inline-flex items-center gap-1.5 w-fit mx-auto">
                            View product
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
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* For Professionals Link */}
          <div className="pb-4 mb-4 border-t-2 border-current/10 pt-4">
            <Link
              href="/professionals"
              className="block p-4 bg-white border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-60"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-base mb-1">Professional purchasing portal</p>
                  <p className="font-clinical text-xs opacity-70">
                    Trusted by practitioners • Athletes, teams, clients • Streamlined ordering
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation - Neutral background with white tiles */}
          <div className="bg-neutral-100 py-4 px-4 -mx-6 mb-4">
            <p className="font-clinical text-xs uppercase opacity-50 mb-3">
              Navigation
            </p>

            {/* Main Nav Links - Vertically stacked white tiles */}
            <nav className="flex flex-col gap-2">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
