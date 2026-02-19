"use client";

import Image from "next/image";

export default function FoundersSection() {
  return (
    <section className="px-6 md:px-16 py-16 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <p className="premium-body-sm uppercase tracking-widest text-[var(--text-on-light-muted)] mb-4">
              Our Story
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-black mb-6"
              style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
            >
              Built from a brain injury. Backed by £500,000 of research.
            </h2>
            <p className="text-lg text-black/70 leading-relaxed mb-8">
              After a trip to the Olympics and a career-ending concussion, two
              athletes set out to solve a problem nobody was talking about:
              recovery for the brain. CONKA is the result — two formulas, years
              of research, and a belief that your brain deserves better than
              caffeine and hope.
            </p>

            <a
              href="/our-story"
              className="neo-button-outline px-6 py-2.5 font-semibold text-base inline-flex items-center gap-2"
            >
              Read Our Story
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right: Image */}
          <div
            className="relative w-full aspect-square lg:aspect-[4/5] overflow-hidden shadow-lg"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            <Image
              src="/TwoFounders.jpg"
              alt="CONKA founders"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
