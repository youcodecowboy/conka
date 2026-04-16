"use client";

import { useState, useEffect, useRef } from "react";
import { useBannerConfig } from "@/app/components/banner";
import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";
import type { NavigationProps } from "./types";

export default function Navigation({
  cartOpen: _cartOpen,
  setCartOpen: _setCartOpen,
  hideBanner = false,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const shopDropdownRef = useRef<HTMLDivElement>(null);
  const bannerConfig = useBannerConfig("founding-member");

  // Hover tracking for shop area (button + menu)
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleShopAreaEnter = () => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    if (!shopDropdownOpen) {
      setShopDropdownOpen(true);
    }
  };

  const handleShopAreaLeave = () => {
    resetTimeoutRef.current = setTimeout(() => {
      setShopDropdownOpen(false);
    }, 150);
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation - Hidden below xl, visible on xl+ */}
      <div className="hidden xl:block">
        <NavigationDesktop
          hideBanner={hideBanner}
          shopDropdownOpen={shopDropdownOpen}
          setShopDropdownOpen={setShopDropdownOpen}
          shopDropdownRef={shopDropdownRef}
          bannerConfig={bannerConfig}
          isScrollingDown={isScrollingDown}
          onShopAreaEnter={handleShopAreaEnter}
          onShopAreaLeave={handleShopAreaLeave}
        />

        {/* Spacer to push content down on desktop (accounts for fixed header height) */}
        {!hideBanner && bannerConfig ? (
          <div className="h-[136px]" />
        ) : (
          <div className="h-20" />
        )}
      </div>

      {/* Mobile Navigation - Visible below xl, hidden on xl+ */}
      <div className="xl:hidden">
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
