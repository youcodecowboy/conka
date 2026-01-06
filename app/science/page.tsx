"use client";

import Navigation from "@/app/components/Navigation";
import { SciencePageDesktop, SciencePageMobile } from "@/app/components/science";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function SciencePage() {
  const isMobile = useIsMobile();

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Navigation */}
      <Navigation />

      {/* Main Content - Responsive */}
      {isMobile === undefined ? (
        <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="font-clinical text-sm opacity-50">Loading...</p>
          </div>
        </div>
      ) : isMobile ? <SciencePageMobile /> : <SciencePageDesktop />}
    </div>
  );
}

