"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  
  // Hover tracking for shop area (button + menu)
  // Opens dropdown on hover, closes when mouse leaves
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleShopAreaEnter = () => {
    // Cancel any pending close
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    // Open dropdown on hover (if not already open)
    if (!shopDropdownOpen) {
      setShopDropdownOpen(true);
    }
  };
  
  const handleShopAreaLeave = () => {
    // Close dropdown when leaving shop area (with delay for smooth movement)
    resetTimeoutRef.current = setTimeout(() => {
      setShopDropdownOpen(false);
      setHoveredSection("protocols");
    }, 150); // 150ms delay to allow smooth mouse movement between button and menu
  };
  
  // Cleanup timeout on unmount or when dropdown closes
  useEffect(() => {
    if (!shopDropdownOpen && resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [shopDropdownOpen]);

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
        setHoveredSection("protocols");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
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
          onShopAreaEnter={handleShopAreaEnter}
          onShopAreaLeave={handleShopAreaLeave}
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
