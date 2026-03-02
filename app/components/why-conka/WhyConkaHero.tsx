"use client";

export function WhyConkaHero() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <header>
        <p className="premium-body-sm uppercase tracking-widest opacity-50 mb-2">
          the reasons behind the formula
        </p>
        <h1
          className="premium-section-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-1 md:mb-2 text-[var(--color-ink)]"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Why{" "}
          <span
            style={{
              background: "var(--gradient-neuro-blue-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CONKA
          </span>
          ?
        </h1>
        <p
          className="premium-body text-base md:text-lg opacity-60"
          style={{ maxWidth: "var(--premium-body-max-width)" }}
        >
          CONKA could change your life. Here&apos;s why.
        </p>
        <p
          className="premium-body text-base md:text-lg opacity-80 leading-relaxed mt-2"
          style={{ maxWidth: "var(--premium-body-max-width)" }}
        >
          Here are the top seven reasons why so many smart people are choosing
          CONKA&apos;s research-backed cognitive enhancement.
        </p>
      </header>
    </div>
  );
}

export default WhyConkaHero;
