"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { Banner, useBannerConfig } from "@/app/components/banner";
import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";
import type { NavigationProps, HoveredSection } from "./types";

export default function Navigation({
  cartOpen: _cartOpen,
  setCartOpen: _setCartOpen,
  hideBanner = false,
}: NavigationProps) {
  const isMobile = useIsMobile(1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<HoveredSection>("protocols");
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

  // Render mobile version on smaller viewports
  if (isMobile === true) {
    return (
      <>
        {/* Mobile Header */}
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

        <NavigationMobile
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          hideBanner={hideBanner}
        />
      </>
    );
  }

  // Render desktop version on larger viewports
  if (isMobile === false) {
    return (
      <>
        <NavigationDesktop
          hideBanner={hideBanner}
          shopDropdownOpen={shopDropdownOpen}
          setShopDropdownOpen={setShopDropdownOpen}
          hoveredSection={hoveredSection}
          setHoveredSection={setHoveredSection}
          shopDropdownRef={shopDropdownRef}
          bannerConfig={bannerConfig}
          isScrollingDown={isScrollingDown}
        />

        {/* Spacer to push content down on desktop (accounts for fixed header height) */}
        {/* Only needed on desktop (lg:) where header is fixed */}
        {/* When banner is visible: 136px (banner ~56px + header ~80px) */}
        {!hideBanner && bannerConfig ? (
          <div className="hidden lg:block h-[136px]" />
        ) : (
          /* When banner is hidden or not available: 80px (just header height) */
          <div className="hidden lg:block h-20" />
        )}
      </>
    );
  }

  // During SSR/initial render, return null to avoid hydration mismatch
  return null;
}
