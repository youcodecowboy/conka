"use client";

import { useIsMobile } from "@/app/hooks/useIsMobile";
import Navigation from "@/app/components/Navigation";
import { OurStoryDesktop } from "@/app/components/our-story/OurStoryDesktop";
import { OurStoryMobile } from "@/app/components/our-story/OurStoryMobile";

export default function OurStoryPage() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      {/* Navigation - positioned fixed for scroll-snap pages */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <Navigation />
      </div>

      {/* Spacer for fixed nav */}
      <div className="h-16 lg:h-20" />

      {/* Main Content - Responsive */}
      {isMobile ? <OurStoryMobile /> : <OurStoryDesktop />}
    </div>
  );
}
