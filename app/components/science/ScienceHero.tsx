"use client";

import Image from "next/image";

interface ScienceHeroProps {
  isMobile?: boolean;
}

export default function ScienceHero({ isMobile = false }: ScienceHeroProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
      {/* Copy */}
      <div className="order-2 lg:order-1 lg:flex-1 text-center lg:text-left mt-8 lg:mt-0">
        <p className="brand-caption uppercase tracking-widest text-black mb-3">
          The Science
        </p>
        <h1 className="brand-h1-bold text-4xl lg:text-6xl xl:text-7xl mb-4 tracking-tight">
          Every ingredient. Clinically dosed. Peer-reviewed.
        </h1>
        <p
          className="brand-body text-lg lg:text-xl text-black mb-2"
          style={{ maxWidth: "var(--brand-body-max-width)" }}
        >
          CONKA&apos;s formulas are built on 32 peer-reviewed studies across
          6,000+ participants. Every ingredient is dosed at the levels proven
          effective in clinical trials — not marketing doses, not pixie dust.
        </p>
        <p
          className="brand-body text-base lg:text-lg text-black"
          style={{ maxWidth: "var(--brand-body-max-width)" }}
        >
          We partnered with Durham and Cambridge universities to develop, test,
          and patent our approach to cognitive performance nutrition.
        </p>
      </div>

      {/* Hero image */}
      <div className="relative order-1 lg:order-2 lg:flex-[1.2] w-full">
        <div
          className="relative overflow-hidden aspect-[5/3] lg:aspect-[4/3]"
          style={{ borderRadius: "var(--brand-radius-container)" }}
        >
          <Image
            src="/lifestyle/CreationOfConka.jpg"
            alt="Two hands passing a CONKA bottle"
            fill
            priority
            sizes="(max-width: 1024px) 95vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
