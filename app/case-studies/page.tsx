"use client";

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import CaseStudiesPageDesktop from "@/app/components/case-studies/CaseStudiesPageDesktop";
import CaseStudiesPageMobile from "@/app/components/case-studies/CaseStudiesPageMobile";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function CaseStudiesPage() {
  const isMobile = useIsMobile();

  return (
    <div className="brand-clinical min-h-screen bg-white text-black flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col">
        {isMobile === undefined ? (
          <div className="min-h-screen pt-32 pb-16 flex items-center justify-center flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 tabular-nums">
              Loading case studies…
            </p>
          </div>
        ) : (
          <section
            className="brand-section brand-hero-first brand-bg-white"
            aria-label="Case Studies"
          >
            <div className="brand-track">
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
