"use client";

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import CaseStudiesPageDesktop from "@/app/components/case-studies/CaseStudiesPageDesktop";
import CaseStudiesPageMobile from "@/app/components/case-studies/CaseStudiesPageMobile";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function CaseStudiesPage() {
  const isMobile = useIsMobile();

  return (
    <div
      className="min-h-screen flex flex-col theme-conka-flow premium-pdp"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Navigation */}
      <Navigation />

      {/* Main Content - wait for hydration to determine layout */}
      <main className="flex-1 flex flex-col">
        {isMobile === undefined ? (
          <div className="min-h-screen pt-32 pb-16 flex items-center justify-center flex-1">
            <div className="animate-pulse text-center">
              <p className="font-clinical text-sm opacity-50">Loading...</p>
            </div>
          </div>
        ) : (
          <section
            className="premium-section-luxury premium-section-reduced-top"
            style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
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
