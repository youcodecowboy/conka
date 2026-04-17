import type { Metadata } from "next";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import { OurStoryHero } from "@/app/components/our-story/OurStoryHero";
import { StorySection } from "@/app/components/our-story/StorySection";
import { OurStoryCTA } from "@/app/components/our-story/OurStoryCTA";
import Reveal from "@/app/components/landing/Reveal";
import { storySections } from "@/app/lib/storyData";

export const metadata: Metadata = {
  title: "Our Story | CONKA",
  description:
    "From a concussion injury to a patented nootropic formula. How two founders invested £500K+ into brain performance research with Durham and Cambridge universities.",
  openGraph: {
    title: "Our Story | CONKA",
    description:
      "From a concussion injury to a patented nootropic formula. How two founders invested £500K+ into brain performance research with Durham and Cambridge universities.",
  },
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-white)] text-[var(--brand-black)]">
      <Navigation />

      {/* ===== SECTION 1: HERO ===== */}
      <section
        className="brand-section brand-hero-first brand-bg-white"
        aria-label="Our Story hero"
      >
        <div className="brand-track">
          <OurStoryHero />
        </div>
      </section>

      {/* ===== STORY SECTIONS: alternating white/tint ===== */}
      {storySections.map((section, index) => (
        <section
          key={section.id}
          className={`brand-section ${index % 2 === 0 ? "brand-bg-tint" : "brand-bg-white"}`}
          aria-label={`Story: ${section.headline}`}
        >
          <div className="brand-track">
            <Reveal>
              <StorySection
                section={section}
                totalSections={storySections.length}
              />
            </Reveal>
          </div>
        </section>
      ))}

      {/* ===== FINAL CTA ===== */}
      <section
        className={`brand-section ${storySections.length % 2 === 0 ? "brand-bg-tint" : "brand-bg-white"}`}
        aria-label="Join the Journey"
      >
        <div className="brand-track">
          <Reveal>
            <OurStoryCTA />
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
