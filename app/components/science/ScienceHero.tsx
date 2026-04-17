"use client";

interface ScienceHeroProps {
  isMobile?: boolean;
}

export default function ScienceHero({ isMobile = false }: ScienceHeroProps) {
  return (
    <div className="flex flex-col gap-5 lg:gap-6 max-w-3xl">
      <header>
        <p className="brand-caption uppercase tracking-widest text-black/40 mb-3">
          The Science
        </p>
        <h1 className="brand-h1-bold text-4xl lg:text-6xl xl:text-7xl mb-4 tracking-tight">
          Every ingredient. Clinically dosed. Peer-reviewed.
        </h1>
        <p
          className="brand-body text-lg lg:text-xl text-black/80 mb-2"
          style={{ maxWidth: "var(--brand-body-max-width)" }}
        >
          CONKA&apos;s formulas are built on 32 peer-reviewed studies across
          6,000+ participants. Every ingredient is dosed at the levels proven
          effective in clinical trials — not marketing doses, not pixie dust.
        </p>
        <p
          className="brand-body text-base lg:text-lg text-black/60"
          style={{ maxWidth: "var(--brand-body-max-width)" }}
        >
          We partnered with Durham and Cambridge universities to develop, test,
          and patent our approach to cognitive performance nutrition.
        </p>
      </header>
    </div>
  );
}
