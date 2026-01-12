"use client";

import { storySections } from "@/app/lib/storyData";
import { OurStoryHero } from "./OurStoryHero";
import { StorySection } from "./StorySection";
import { FoundingMemberSection } from "./FoundingMemberSection";

export function OurStoryDesktop() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <OurStoryHero />

      {/* Story Sections */}
      {storySections.map((section) => (
        <StorySection
          key={section.id}
          section={section}
          totalSections={storySections.length}
        />
      ))}

      {/* Founding Member Section */}
      <FoundingMemberSection />

      {/* Final CTA Section */}
      <section className="bg-black text-white px-6 md:px-16 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-commentary text-xl md:text-2xl mb-4 opacity-80">
            ready to experience it yourself?
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Join the Journey
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/conka-flow"
              className="px-8 py-4 font-semibold text-lg bg-white text-black rounded-full border-2 border-white hover:bg-transparent hover:text-white transition-all"
            >
              Explore Conka Flow
            </a>
            <a
              href="/conka-clarity"
              className="px-8 py-4 font-semibold text-lg bg-transparent text-white rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
            >
              Explore Conka Clarity
            </a>
          </div>
          <p className="font-clinical text-sm mt-8 opacity-50">
            100-day money-back guarantee • Free UK shipping
          </p>
        </div>
      </section>
    </div>
  );
}

export default OurStoryDesktop;

