"use client";

import { useIsMobile } from "@/app/hooks/useIsMobile";
import Navigation from "@/app/components/navigation";
import { OurStoryDesktop } from "@/app/components/our-story/OurStoryDesktop";
import { OurStoryMobile } from "@/app/components/our-story/OurStoryMobile";

export default function OurStoryPage() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      {/* Navigation with Banner */}
      <Navigation />

      {/* Main Content - Responsive */}
      {isMobile === undefined ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="font-clinical text-sm opacity-50">Loading...</p>
          </div>
        </div>
      ) : isMobile ? <OurStoryMobile /> : <OurStoryDesktop />}
    </div>
  );
}
