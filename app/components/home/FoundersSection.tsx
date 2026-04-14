"use client";

import Image from "next/image";

export default function FoundersSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Left: Copy */}
      <div>
        <div className="mb-10">
          <p className="brand-caption uppercase tracking-widest text-black/60 mb-4">
            Our Story
          </p>
          <h2
            className="brand-h1 mb-6 text-black"
            style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
          >
            Built from a brain injury. Backed by £500,000 of research.
          </h2>
          <p className="brand-body text-black/80 leading-relaxed">
            After a trip to the Olympics and a career-ending concussion, two
            athletes set out to solve a problem nobody was talking about:
            recovery for the brain. CONKA is the result — two formulas, years
            of research, and a belief that your brain deserves better than
            caffeine and hope.
          </p>
        </div>

        <a
          href="/our-story"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[var(--brand-radius-interactive)] font-semibold text-base border border-[var(--brand-accent)] text-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-white transition-colors"
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
        style={{ borderRadius: "var(--brand-radius-card)" }}
      >
        <Image
          src="/TwoFounders.jpg"
          alt="CONKA founders"
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
