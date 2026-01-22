"use client";

import { useState, useEffect, useRef } from "react";
import { Banner, useBannerConfig } from "@/app/components/banner";
import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";
import type { NavigationProps, HoveredSection } from "./types";

export default function Navigation({
  cartOpen: _cartOpen,
  setCartOpen: _setCartOpen,
  hideBanner = false,
}: NavigationProps) {
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

  // Render both desktop and mobile versions immediately
  // CSS classes (hidden lg:block, lg:hidden) handle visibility
  // This ensures SSR renders immediately without waiting for JavaScript
  return (
    <>
      {/* Desktop Navigation - Hidden on mobile, visible on lg+ */}
      <div className="hidden lg:block">
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
          <div className="h-[136px]" />
        ) : (
          /* When banner is hidden or not available: 80px (just header height) */
          <div className="h-20" />
        )}
      </div>

      {/* Mobile Navigation - Visible on mobile, hidden on lg+ */}
      <div className="lg:hidden">
        <NavigationMobile
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          hideBanner={hideBanner}
          bannerConfig={bannerConfig}
        />
      </div>
    </>
  );
}
