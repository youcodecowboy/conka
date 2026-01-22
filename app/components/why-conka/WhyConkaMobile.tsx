"use client";

import Image from "next/image";
import { whyConkaPoints } from "@/app/lib/whyConkaData";

export function WhyConkaMobile() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] bg-white text-black px-6 py-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight mb-2">Why CONKA?</h1>

          {/* Subtitle */}
          <p className="font-commentary text-lg mb-4 opacity-70">
            CONKA could change your life. Here&apos;s why.
          </p>

          {/* Introduction */}
          <p className="text-sm opacity-60 mb-8 leading-relaxed">
            Here are the top seven reasons why so many smart people are choosing
            CONKA&apos;s research-backed cognitive enhancement.
          </p>

          {/* Scroll Indicator */}
          <div className="flex items-center justify-center gap-2 py-3 opacity-50">
            <p className="font-commentary text-sm">scroll to discover why</p>
            <div className="animate-bounce-slow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Why CONKA Points */}
      {whyConkaPoints.map((point) => {
        const isLight = point.theme === "light";
        const formattedId = point.id.toString().padStart(2, "0");

        return (
          <section
            key={point.id}
            className={`px-6 py-12 ${
              isLight ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {/* Section Number */}
            <div className="font-clinical text-5xl font-bold mb-4 opacity-20">
              {formattedId}
            </div>

            {/* Headline */}
            <h2 className="text-2xl font-bold mb-2">{point.headline}</h2>

            {/* Subheading */}
            <p className="font-commentary text-lg mb-4 opacity-70">
              {point.subheading}
            </p>

            {/* Image */}
            {point.image ? (
              <div className="relative w-full h-48 mb-6 overflow-hidden">
                <Image
                  src={point.image}
                  alt={point.headline}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div
                className={`w-full h-48 mb-6 border-2 border-dashed flex items-center justify-center ${
                  isLight ? "border-black/20" : "border-white/20"
                }`}
              >
                <span className="font-clinical text-xs text-center px-4 opacity-40">
                  [IMAGE PLACEHOLDER]
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-sm leading-relaxed opacity-80">
              {point.description}
            </p>
          </section>
        );
      })}

      {/* Final CTA Section */}
      <section className="bg-black text-white px-6 py-16">
        <div className="text-center">
          <p className="font-commentary text-lg mb-3 opacity-80">
            Ready to unlock your cognitive potential?
          </p>
          <h2 className="text-2xl font-bold mb-4">
            Explore the full CONKA range today
          </h2>
          <div className="flex flex-col gap-3 mb-6">
            <a
              href="/conka-flow"
              className="px-6 py-3 font-semibold text-base text-center bg-white text-black rounded-full border-2 border-white hover:bg-transparent hover:text-white transition-all"
            >
              Explore CONKA Flow
            </a>
            <a
              href="/conka-clarity"
              className="px-6 py-3 font-semibold text-base text-center bg-transparent text-white rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
            >
              Explore CONKA Clarity
            </a>
          </div>
          <p className="font-commentary text-base mb-2 opacity-70">
            Not sure which product is right for you?
          </p>
          <p className="text-sm opacity-60 mb-4">
            Take the CONKA quiz to find your perfect protocol, and prepare to
            unlock your best performance yet.
          </p>
          <a
            href="/quiz"
            className="inline-block px-6 py-3 font-semibold text-base bg-white text-black rounded-full border-2 border-white hover:bg-transparent hover:text-white transition-all"
          >
            Take the Quiz
          </a>
          <p className="font-clinical text-xs mt-6 opacity-50">
            100-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}

export default WhyConkaMobile;
