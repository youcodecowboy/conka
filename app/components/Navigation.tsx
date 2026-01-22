"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CiBeaker1 } from "react-icons/ci";
import { protocolContent, formulaContent } from "@/app/lib/productData";
import { formulas } from "@/app/components/shop/formulasShowcaseData";
import FormulaCardCompact from "@/app/components/Navigation/FormulaCardCompact";
import { protocolSelectorData } from "@/app/components/shop/protocolSelectorData";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { Banner, useBannerConfig } from "@/app/components/banner";

interface NavigationProps {
  cartOpen?: boolean;
  setCartOpen?: (open: boolean) => void;
  /** Hide banner on this page */
  hideBanner?: boolean;
}

export default function Navigation({
  cartOpen: _cartOpen,
  setCartOpen: _setCartOpen,
  hideBanner = false,
}: NavigationProps) {
  // Use cart context - props are deprecated but kept for backwards compatibility
  const { openCart, itemCount } = useCart();
  const { isAuthenticated, customer, loading: authLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<"protocols" | "formulas" | "quiz">("protocols");
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const shopDropdownRef = useRef<HTMLDivElement>(null);
  const bannerConfig = useBannerConfig("founding-member");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only hide header when scrolling down past a threshold
      if (currentScrollY > 100) {
        setIsScrollingDown(currentScrollY > lastScrollY);
      } else {
        setIsScrollingDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shopDropdownRef.current &&
        !shopDropdownRef.current.contains(event.target as Node)
      ) {
        setShopDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Fixed container for banner + header on desktop */}
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
          <div className="px-6 md:px-16 py-1 flex justify-between items-center">
            {/* Logo - Left (links to home) */}
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

            {/* Desktop Navigation & Cart - Right */}
            <div className="hidden lg:flex items-center">
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
                <a
                  href="/quiz"
                  className="hidden lg:flex items-center gap-2 font-clinical text-sm tracking-wide hover:opacity-70 transition-all"
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

                  {/* Full-Width Mega Menu */}
                  {shopDropdownOpen && (
                    <div 
                      className="fixed left-0 right-0 bg-[var(--background)] border-b-2 border-current shadow-lg z-50"
                      style={{ 
                        top: bannerConfig && !hideBanner ? '136px' : '80px',
                      }}
                      onMouseLeave={() => setHoveredSection("protocols")}
                    >
                      <div className="w-full px-6 md:px-16 py-8">
                        <div className="flex gap-12 max-w-[1920px] mx-auto">
                          {/* Left Side: Dynamic Content Area */}
                          <div className="flex-1 min-w-0">
                            {/* Shop by Protocol - Default/Expanded */}
                            {hoveredSection === "protocols" && (
                              <div>
                                <div className="mb-6">
                                  <h3 className="font-bold text-xl mb-2">Protocols</h3>
                                  <p className="font-clinical text-base opacity-70">
                                    Mixed plans combining CONKA Flow and CONKA Clear for maximum performance
                                  </p>
                                </div>
                                <div className="grid grid-cols-4 gap-6">
                                  {(["1", "2", "3", "4"] as const).map((protocolId) => {
                                    const protocol = protocolContent[protocolId];
                                    const selectorData = protocolSelectorData[protocolId];
                                    return (
                                      <a
                                        key={protocolId}
                                        href={`/protocol/${protocolId}`}
                                        className="group block"
                                        onClick={() => setShopDropdownOpen(false)}
                                      >
                                        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-current transition-all">
                                          <Image
                                            src={protocol.image}
                                            alt={protocol.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                          />
                                          {/* Hover Overlay */}
                                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-white">
                                            <h4 className="font-bold text-lg mb-3 text-center">{protocol.name}</h4>
                                            <ul className="space-y-2 text-sm font-clinical">
                                              {selectorData.benefits.slice(0, 3).map((benefit, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
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
                                                    className="flex-shrink-0"
                                                  >
                                                    <polyline points="20 6 9 17 4 12" />
                                                  </svg>
                                                  <span>{benefit}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>
                                        <h4 className="font-bold text-base mb-2">{protocol.name}</h4>
                                        <p className="font-clinical text-sm opacity-70 mb-2">{protocol.subtitle}</p>
                                        <p className="font-clinical text-xs opacity-60 line-clamp-2">{protocol.description}</p>
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Shop by Individual Formula - Expanded */}
                            {hoveredSection === "formulas" && (
                              <div>
                                <div className="mb-6">
                                  <h3 className="font-bold text-xl mb-2">Individual Formulas</h3>
                                  <p className="font-clinical text-base opacity-70">
                                    Order CONKA Flow or CONKA Clear separately
                                  </p>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                  {formulas.map((formula) => (
                                    <FormulaCardCompact
                                      key={formula.id}
                                      formula={formula}
                                      onNavigate={() => setShopDropdownOpen(false)}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Help me Choose - Expanded */}
                            {hoveredSection === "quiz" && (
                              <div className="flex items-center justify-center min-h-[400px]">
                                <div className="max-w-md w-full p-8 bg-[var(--foreground)] text-[var(--background)] rounded-lg">
                                  <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
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
                                        className="text-black"
                                      >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                      </svg>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <p className="font-bold text-lg text-white">Find Your Protocol</p>
                                        <span className="px-2 py-0.5 bg-green-500 text-white font-clinical text-xs font-bold rounded-full">
                                          RECOMMENDED
                                        </span>
                                      </div>
                                      <p className="font-clinical text-sm opacity-80 text-white">
                                        Take our 2-minute quiz to find your perfect match.
                                      </p>
                                    </div>
                                  </div>
                                  <a
                                    href="/quiz"
                                    onClick={() => setShopDropdownOpen(false)}
                                    className="block w-full py-3 px-6 bg-[#f59e0b] text-black font-bold text-base rounded-full hover:bg-[#d97706] transition-colors text-center"
                                  >
                                    Take the Quiz
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right Side: Section Headers Stacked Vertically */}
                          <div className="w-64 flex-shrink-0 border-l-2 border-current pl-8 pr-0">
                            <div className="flex flex-col gap-4">
                              <button
                                onMouseEnter={() => setHoveredSection("protocols")}
                                className={`px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-lg border-2 ${
                                  hoveredSection === "protocols"
                                    ? "border-current bg-current/5"
                                    : "border-transparent opacity-60 hover:opacity-100 hover:border-current/30"
                                }`}
                              >
                                Shop by Protocol
                              </button>
                              <button
                                onMouseEnter={() => setHoveredSection("formulas")}
                                className={`px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-lg border-2 ${
                                  hoveredSection === "formulas"
                                    ? "border-current bg-current/5"
                                    : "border-transparent opacity-60 hover:opacity-100 hover:border-current/30"
                                }`}
                              >
                                Shop by Individual Formula
                              </button>
                              <button
                                onMouseEnter={() => setHoveredSection("quiz")}
                                className={`px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-lg border-2 ${
                                  hoveredSection === "quiz"
                                    ? "border-current bg-current/5"
                                    : "border-transparent opacity-60 hover:opacity-100 hover:border-current/30"
                                }`}
                              >
                                Help me Choose
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
              <button
                onClick={openCart}
                className="ml-6 p-2 hover:opacity-70 transition-all relative"
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

            {/* Mobile - Menu Only (Cart moved to menu) */}
            <div className="lg:hidden flex items-center">
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
          </div>
        </header>
      </div>

      {/* Spacer to push content down on desktop (accounts for fixed header height) */}
      {/* Only needed on desktop (lg:) where header is fixed */}
      {/* When banner is visible: 136px (banner ~56px + header ~80px) */}
      {!hideBanner && bannerConfig ? (
        <div className="hidden lg:block h-[136px]" />
      ) : (
        /* When banner is hidden or not available: 80px (just header height) */
        <div className="hidden lg:block h-20" />
      )}

      {/* Mobile Menu */}
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
      )}
    </>
  );
}
