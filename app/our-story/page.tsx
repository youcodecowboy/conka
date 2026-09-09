import type { Metadata } from "next";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import {
  OurStoryHero,
  StorySection,
  OurStoryCTA,
} from "@/app/components/our-story";
import { storyChapters } from "@/app/lib/storyData";
import ReviewedDate from "@/app/components/ReviewedDate";

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

/* Story spine (Figma V1): split hero -> four alternating chapters -> CTA.
   Backgrounds alternate white/tint so no two adjacent sections match. The
   page is Simple DTC, not clinical: see DESIGN_SYSTEM.md §8.5. */
export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />

      <section
        className="brand-section brand-hero-first brand-bg-white"
        aria-label="Our Story hero"
      >
        <div className="brand-track">
          <OurStoryHero />
        </div>
      </section>

      {storyChapters.map((chapter, index) => (
        <section
          key={chapter.id}
          className={`brand-section ${
            index % 2 === 0 ? "brand-bg-tint" : "brand-bg-white"
          }`}
          aria-label={chapter.heading}
        >
          <div className="brand-track">
            <StorySection chapter={chapter} />
          </div>
        </section>
      ))}

      <section
        className={`brand-section ${
          storyChapters.length % 2 === 0 ? "brand-bg-tint" : "brand-bg-white"
        }`}
        aria-label="The next chapter is yours"
      >
        <div className="brand-track">
          <OurStoryCTA />
          <ReviewedDate isoDate="2026-09" label="September 2026" tone="onLight" divider />
        </div>
      </section>

      <Footer />
    </div>
  );
}
