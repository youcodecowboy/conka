"use client";

import { useIsMobile } from "@/app/hooks/useIsMobile";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import { WhyConkaDesktop } from "@/app/components/why-conka/WhyConkaDesktop";
import { WhyConkaMobile } from "@/app/components/why-conka/WhyConkaMobile";

export default function WhyConkaPage() {
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
      ) : isMobile ? (
        <WhyConkaMobile />
      ) : (
        <WhyConkaDesktop />
      )}

      <Footer />
    </div>
  );
}
