"use client";

import { whyConkaPoints } from "@/app/lib/whyConkaData";
import { WhyConkaHero } from "./WhyConkaHero";
import { WhyConkaSection } from "./WhyConkaSection";

export function WhyConkaDesktop() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <WhyConkaHero />

      {/* Why CONKA Points */}
      {whyConkaPoints.map((point) => (
        <WhyConkaSection
          key={point.id}
          point={point}
          totalPoints={whyConkaPoints.length}
        />
      ))}

      {/* Final CTA Section */}
      <section className="bg-black text-white px-6 md:px-16 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-commentary text-xl md:text-2xl mb-4 opacity-80">
            Ready to unlock your cognitive potential?
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Explore the full CONKA range today
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/conka-flow"
              className="px-8 py-4 font-semibold text-lg bg-white text-black rounded-full border-2 border-white hover:bg-transparent hover:text-white transition-all"
            >
              Explore CONKA Flow
            </a>
            <a
              href="/conka-clarity"
              className="px-8 py-4 font-semibold text-lg bg-transparent text-white rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
            >
              Explore CONKA Clarity
            </a>
          </div>
          <p className="font-commentary text-lg md:text-xl mb-4 opacity-70">
            Not sure which product is right for you?
          </p>
          <p className="text-base md:text-lg opacity-80 mb-6">
            Take the CONKA quiz to find your perfect protocol, and prepare to
            unlock your best performance yet.
          </p>
          <a
            href="/quiz"
            className="inline-block px-8 py-4 font-semibold text-lg bg-white text-black rounded-full border-2 border-white hover:bg-transparent hover:text-white transition-all"
          >
            Take the Quiz
          </a>
          <p className="font-clinical text-sm mt-8 opacity-50">
            100-day money-back guarantee • Free UK shipping
          </p>
        </div>
      </section>
    </div>
  );
}

export default WhyConkaDesktop;
