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
    <div className="min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
      <Navigation />

      {isMobile === undefined ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="font-clinical text-sm opacity-50">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {/* ===== SECTION 1: HERO ===== */}
          <section
            className="brand-section brand-hero-first brand-bg-tint"
            aria-label="Our Story hero"
          >
            <div className="brand-track">
              {isMobile ? <OurStoryHeroMobile /> : <OurStoryHero />}
            </div>
          </section>

          {/* ===== STORY SECTIONS: alternating white/tint ===== */}
          {storySections.map((section, index) => (
            <section
              key={section.id}
              className={`brand-section ${index % 2 === 0 ? "brand-bg-white" : "brand-bg-tint"}`}
              aria-label={`Story: ${section.headline}`}
            >
              <div className="brand-track">
                <StorySection
                  section={section}
                  totalSections={storySections.length}
                  variant={isMobile ? "mobile" : "desktop"}
                />
              </div>
            </section>
          ))}

          {/* ===== FINAL CTA ===== */}
          <section
            className={`brand-section ${storySections.length % 2 === 0 ? "brand-bg-white" : "brand-bg-tint"}`}
            aria-label="Join the Journey"
          >
            <div className="brand-track">
              <OurStoryCTA />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
