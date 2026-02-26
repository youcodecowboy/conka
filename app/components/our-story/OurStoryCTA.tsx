"use client";

export function OurStoryCTA() {
  return (
    <div className="text-center">
      <p className="premium-section-subtitle opacity-80 mb-4">
        ready to experience it yourself?
      </p>
      <h2
        className="premium-section-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Join the Journey
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/conka-flow"
          className="px-8 py-4 font-semibold text-lg bg-white text-[var(--color-ink)] hover:bg-[var(--text-on-ink-muted)] hover:text-white transition-all"
          style={{ borderRadius: "var(--premium-radius-interactive)" }}
        >
          Explore CONKA Flow
        </a>
        <a
          href="/conka-clarity"
          className="px-8 py-4 font-semibold text-lg bg-transparent text-white border border-white/40 hover:bg-white hover:text-[var(--color-ink)] transition-all"
          style={{ borderRadius: "var(--premium-radius-interactive)" }}
        >
          Explore CONKA Clear
        </a>
      </div>
      <p className="premium-body-sm mt-8 text-white/70">
        100-day money-back guarantee • Free UK shipping
      </p>
    </div>
  );
}

export default OurStoryCTA;
