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
      {isMobile ? <SciencePageMobile /> : <SciencePageDesktop />}
    </div>
  );
}

