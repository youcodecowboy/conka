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
    <div className="brand-clinical min-h-screen bg-white text-black flex flex-col">
      <Navigation />

      {isMobile === undefined ? (
        <div className="min-h-screen flex items-center justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 tabular-nums">
            // loading
          </p>
        </div>
      ) : (
        <>
          {/* Hero */}
          <section
            className="brand-section brand-hero-first brand-bg-white"
            aria-labelledby="why-conka-hero-heading"
          >
            <div className="brand-track">
              {isMobile ? <WhyConkaHeroMobile /> : <WhyConkaHero />}
            </div>
          </section>

          {/* Why CONKA points — alternating white/tint for rhythm */}
          {whyConkaPoints.map((point) => {
            const isLight = point.theme === "light";
            return (
              <section
                key={point.id}
                className={`brand-section ${isLight ? "brand-bg-white" : "brand-bg-tint"}`}
                aria-label={point.headline}
              >
                <div className="brand-track">
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
            className="brand-section brand-bg-white"
            aria-label="Explore CONKA"
          >
            <div className="brand-track">
              <WhyConkaCTA />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
