"use client";

import Image from "next/image";
import ConkaCTAButton from "@/app/components/landing/ConkaCTAButton";

export default function FoundersSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Left: Copy */}
      <div>
        {/* Eyebrow */}
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
          Our Story · Founders
        </p>

        <h2
          className="brand-h1 mb-2 text-black"
          style={{ letterSpacing: "-0.02em" }}
        >
          Built from a brain injury. Backed by £500,000 of research.
        </h2>

        {/* Mono sub-line */}
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-8">
          Est. 2020 · Two founders · One mission
        </p>

        <p className="brand-body text-black/80 leading-relaxed mb-8">
          After a trip to the Olympics and a career-ending concussion, two
          athletes set out to solve a problem nobody was talking about:
          recovery for the brain. CONKA is the result — two formulas, years
          of research, and a belief that your brain deserves better than
          caffeine and hope.
        </p>

        <ConkaCTAButton href="/our-story" meta="// read the founders' story">
          Read Our Story
        </ConkaCTAButton>
      </div>

      {/* Right: Image with clinical corner brackets */}
      <div className="relative w-full aspect-square lg:aspect-[4/5] overflow-hidden">
        <Image
          src="/TwoFounders.jpg"
          alt="CONKA founders"
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-3 left-3 w-[20%] h-[20%] border-t-[6px] border-l-[6px] border-white"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 w-[20%] h-[20%] border-b-[6px] border-r-[6px] border-white"
        />
      </div>
    </div>
  );
}
