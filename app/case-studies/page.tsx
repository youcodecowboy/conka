"use client";

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import CaseStudiesPageDesktop from "@/app/components/case-studies/CaseStudiesPageDesktop";
import CaseStudiesPageMobile from "@/app/components/case-studies/CaseStudiesPageMobile";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function CaseStudiesPage() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col">
        {isMobile === undefined ? (
          <div className="min-h-screen pt-32 pb-16 flex items-center justify-center flex-1">
            <div className="animate-pulse text-center">
              <p className="font-clinical text-sm opacity-50">Loading...</p>
            </div>
          </div>
        ) : (
          <section
            className="premium-section-luxury premium-hero-first premium-hero-with-top-air premium-section-reduced-bottom premium-bg-bone"
            aria-label="Case Studies"
          >
            <div className="premium-track">
              {isMobile ? (
                <CaseStudiesPageMobile />
              ) : (
                <CaseStudiesPageDesktop />
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
