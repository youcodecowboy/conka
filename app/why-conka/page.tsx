"use client";

import { useIsMobile } from "@/app/hooks/useIsMobile";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import { WhyConkaHero } from "@/app/components/why-conka/WhyConkaHero";
import { WhyConkaHeroMobile } from "@/app/components/why-conka/WhyConkaHeroMobile";
import { WhyConkaSection } from "@/app/components/why-conka/WhyConkaSection";
import { WhyConkaCTA } from "@/app/components/why-conka/WhyConkaCTA";
import { whyConkaPoints } from "@/app/lib/whyConkaData";

export default function WhyConkaPage() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <Navigation />

      {isMobile === undefined ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="font-clinical text-sm opacity-50">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero */}
          <section
            className="premium-section-luxury premium-hero-first premium-bg-bone"
            aria-label="Why CONKA"
          >
            <div className="premium-track">
              {isMobile ? <WhyConkaHeroMobile /> : <WhyConkaHero />}
            </div>
          </section>

          {/* Why CONKA points — alternating light/dark with palette */}
          {whyConkaPoints.map((point) => {
            const isLight = point.theme === "light";
            return (
              <section
                key={point.id}
                className={`premium-section-luxury ${isLight ? "" : "text-white"}`}
                style={{
                  backgroundColor: isLight
                    ? "var(--color-neuro-blue-light)"
                    : "var(--color-neuro-blue-dark)",
                }}
                aria-label={point.headline}
              >
                <div className="premium-track">
                  <WhyConkaSection
                    point={point}
                    totalPoints={whyConkaPoints.length}
                    variant={isMobile ? "mobile" : "desktop"}
                  />
                </div>
              </section>
            );
          })}

          {/* Final CTA */}
          <section
            className="premium-section-luxury premium-bg-ink text-white"
            aria-label="Explore CONKA"
          >
            <div className="premium-track">
              <WhyConkaCTA />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
