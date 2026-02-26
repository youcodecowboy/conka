"use client";

export function WhyConkaHero() {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <h1
        className="premium-section-heading text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--color-ink)]"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Why CONKA?
      </h1>
      <p className="premium-section-subtitle text-xl md:text-2xl opacity-70" style={{ maxWidth: "42ch" }}>
        CONKA could change your life. Here&apos;s why.
      </p>
      <p
        className="premium-body text-base md:text-lg opacity-80 leading-relaxed"
        style={{ maxWidth: "var(--premium-body-max-width)" }}
      >
        Here are the top seven reasons why so many smart people are choosing
        CONKA&apos;s research-backed cognitive enhancement.
      </p>
    </div>
  );
}

export default WhyConkaHero;
