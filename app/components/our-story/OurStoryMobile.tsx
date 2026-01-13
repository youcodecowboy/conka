"use client";

import Image from "next/image";
import { storySections } from "@/app/lib/storyData";

export function OurStoryMobile() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Full viewport height */}
      <section className="min-h-[calc(100vh-4rem)] bg-white text-black px-6 py-6 flex flex-col">
        {/* Top Content */}
        <div className="flex-1">
          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight mb-1">Our Story</h1>

          {/* Subtitle */}
          <p className="font-commentary text-lg mb-1 opacity-70">
            the journey behind the formula
          </p>

          {/* Founders Tagline */}
          <p className="text-sm opacity-50 mb-5">
            Two founders on a mission to build a better brain.
          </p>

          {/* Patented Formula - Featured */}
          <div className="neo-box p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
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
                className="opacity-50"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="font-clinical text-xs uppercase tracking-widest opacity-50">
                Unique
              </span>
            </div>
            <div className="text-lg font-bold mb-1">
              Patented Nootropic Formula
            </div>
            <div className="font-clinical text-xs opacity-50">#GB2620279</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="neo-box p-3">
              <div className="font-clinical text-xl font-bold mb-0.5">
                £500K+
              </div>
              <div className="font-clinical text-xs opacity-50">Research</div>
            </div>
            <div className="neo-box p-3">
              <div className="font-clinical text-xl font-bold mb-0.5">25+</div>
              <div className="font-clinical text-xs opacity-50">
                Clinical trials
              </div>
            </div>
          </div>

          {/* Key Results Row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span className="font-clinical text-base font-bold">+22%</span>
              <span className="font-clinical text-xs opacity-50">speed</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <span className="font-clinical text-base font-bold">100+</span>
              <span className="font-clinical text-xs opacity-50">
                prototypes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span className="font-clinical text-base font-bold">+33%</span>
              <span className="font-clinical text-xs opacity-50">women</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-clinical text-base font-bold">+15</span>
              <span className="font-clinical text-xs opacity-50">years*</span>
            </div>
          </div>

          {/* Story Preview */}
          <div className="border-t border-black/10 pt-4">
            <p className="font-clinical text-xs uppercase tracking-widest opacity-40 mb-3">
              What you&apos;ll discover
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-clinical text-sm font-bold opacity-30">
                  01
                </span>
                <p className="text-xs opacity-60">
                  How a concussion sparked an 8-month research journey
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-clinical text-sm font-bold opacity-30">
                  02
                </span>
                <p className="text-xs opacity-60">
                  Tested by 12+ elite sports teams worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - At bottom */}
        <div className="flex items-center justify-center gap-2 py-3 opacity-50">
          <p className="font-commentary text-sm">
            scroll to read the full story
          </p>
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
      </section>

      {/* Story Sections */}
      {storySections.map((section) => {
        const isLight = section.theme === "light";
        const formattedId = section.id.toString().padStart(2, "0");

        return (
          <section
            key={section.id}
            className={`px-6 py-12 ${
              isLight ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {/* Section Counter */}
            <div className="font-clinical text-xs opacity-40 mb-4 tracking-widest">
              {formattedId} / {storySections.length.toString().padStart(2, "0")}
            </div>

            {/* Headline */}
            <h2 className="text-2xl font-bold mb-2">{section.headline}</h2>

            {/* Subtitle */}
            {section.subtitle && (
              <p className="font-commentary text-lg mb-5 opacity-70">
                {section.subtitle}
              </p>
            )}

            {/* Image */}
            {section.image ? (
              <div className="relative w-full h-48 mb-6 overflow-hidden">
                <Image
                  src={section.image}
                  alt={section.headline}
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
                  {section.imagePlaceholder}
                </span>
              </div>
            )}

            {/* Body Text */}
            <p className="text-sm leading-relaxed opacity-80">{section.body}</p>

            {/* Quote Block */}
            {section.quote && (
              <div className="mt-6 border-l-2 border-current pl-4 opacity-90">
                <blockquote className="font-commentary text-base italic mb-2">
                  &ldquo;{section.quote.text}&rdquo;
                </blockquote>
                <div className="font-clinical text-xs opacity-60">
                  <span className="font-semibold">{section.quote.author}</span>
                  <span className="mx-1">•</span>
                  <span>{section.quote.role}</span>
                </div>
              </div>
            )}
          </section>
        );
      })}

      {/* Final CTA Section */}
      <section className="bg-black text-white px-6 py-16">
        <div className="text-center">
          <p className="font-commentary text-lg mb-3 opacity-80">
            ready to experience it yourself?
          </p>
          <h2 className="text-2xl font-bold mb-6">Join the Journey</h2>
          <div className="flex flex-col gap-3">
            <a
              href="/conka-flow"
              className="px-6 py-3 font-semibold text-base text-center bg-white text-black rounded-full border-2 border-white hover:bg-transparent hover:text-white transition-all"
            >
              Explore Conka Flow
            </a>
            <a
              href="/conka-clarity"
              className="px-6 py-3 font-semibold text-base text-center bg-transparent text-white rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
            >
              Explore Conka Clarity
            </a>
          </div>
          <p className="font-clinical text-xs mt-6 opacity-50">
            100-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}

export default OurStoryMobile;
