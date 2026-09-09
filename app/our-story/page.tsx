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
   page is Simple DTC, not clinical: see DESIGN_SYSTEM.md §8.5.

   The hero and the chapters are full-bleed split bands, so their sections
   carry only a background and a label: no brand-section gutters, no
   brand-track, because the image has to reach the viewport edge. Those two
   components own their own layout and pad their copy side by
   --brand-track-inset so the text still lines up with the CTA below and with
   every tracked section elsewhere on the site. The CTA is an ordinary tracked
   section. This is the documented exception in DESIGN_SYSTEM.md §8.5, not
   a drift from §6. */
export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />

      <section className="brand-bg-white" aria-label="Introduction">
        <OurStoryHero />
      </section>

      {storyChapters.map((chapter, index) => (
        <section
          key={chapter.id}
          className={index % 2 === 0 ? "brand-bg-tint" : "brand-bg-white"}
          aria-label={chapter.heading}
        >
          <StorySection chapter={chapter} />
        </section>
      ))}

      <section
        className={`brand-section ${
          storyChapters.length % 2 === 0 ? "brand-bg-tint" : "brand-bg-white"
        }`}
        aria-label="Try CONKA"
      >
        <div className="brand-track">
          <OurStoryCTA />
          <ReviewedDate
            isoDate="2026-09"
            label="September 2026"
            tone="onLight"
            divider
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
