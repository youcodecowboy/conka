"use client";

import { useIsMobile } from "@/app/hooks/useIsMobile";
import Navigation from "@/app/components/navigation";
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
      ) : isMobile ? <WhyConkaMobile /> : <WhyConkaDesktop />}

      {/* Footer */}
      <footer className="bg-white border-t-2 border-black px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">conka.</h3>
              <p className="font-clinical text-xs opacity-50">
                Daily nootropic brain shots
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <a
                href="/shop"
                className="neo-button px-6 py-3 font-semibold text-sm flex items-center gap-2"
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
                Buy CONKA
              </a>
              <p className="font-clinical text-xs opacity-50">
                100-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
