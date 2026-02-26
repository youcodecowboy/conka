"use client";

import { useIsMobile } from "@/app/hooks/useIsMobile";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import { OurStoryHero } from "@/app/components/our-story/OurStoryHero";
import { OurStoryHeroMobile } from "@/app/components/our-story/OurStoryHeroMobile";
import { StorySection } from "@/app/components/our-story/StorySection";
import { OurStoryCTA } from "@/app/components/our-story/OurStoryCTA";
import { storySections } from "@/app/lib/storyData";

export default function OurStoryPage() {
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
            className="premium-section-luxury premium-hero-first"
            style={{ backgroundColor: "white" }}
            aria-label="Our Story hero"
          >
            <div className="premium-track">
              {isMobile ? <OurStoryHeroMobile /> : <OurStoryHero />}
            </div>
          </section>

          {/* Story sections – Option A: alternating light/dark with palette + air */}
          {storySections.map((section) => {
            const isLight = section.theme === "light";
            return (
              <section
                key={section.id}
                className={`premium-section-luxury ${
                  isLight ? "" : "text-white"
                }`}
                style={{
                  backgroundColor: isLight
                    ? "var(--color-neuro-blue-light)"
                    : "var(--color-neuro-blue-dark)",
                }}
                aria-label={`Story: ${section.headline}`}
              >
                <div className="premium-track">
                  <StorySection
                    section={section}
                    totalSections={storySections.length}
                    variant={isMobile ? "mobile" : "desktop"}
                  />
                </div>
              </section>
            );
          })}

          {/* Final CTA */}
          <section
            className="premium-section-luxury premium-bg-ink text-white"
            aria-label="Join the Journey"
          >
            <div className="premium-track">
              <OurStoryCTA />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
