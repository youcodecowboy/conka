"use client";

export function WhyConkaCTA() {
  return (
    <div className="text-center">
      <p className="premium-section-subtitle opacity-80 mb-4">
        Ready to unlock your cognitive potential?
      </p>
      <h2
        className="premium-section-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-white"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Explore the full CONKA range today
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 md:mb-8">
        <a
          href="/conka-flow"
          className="px-8 py-4 font-semibold text-lg bg-white text-[var(--color-ink)] hover:bg-white/90 transition-all"
          style={{ borderRadius: "var(--premium-radius-interactive)" }}
        >
          Explore CONKA Flow
        </a>
        <a
          href="/conka-clarity"
          className="px-8 py-4 font-semibold text-lg bg-transparent text-white border border-white/40 hover:bg-white hover:text-[var(--color-ink)] transition-all"
          style={{ borderRadius: "var(--premium-radius-interactive)" }}
        >
          Explore CONKA Clarity
        </a>
      </div>
      <p className="premium-body opacity-70 mb-2">Not sure which product is right for you?</p>
      <p className="premium-body mb-6 opacity-80" style={{ maxWidth: "var(--premium-body-max-width)", marginLeft: "auto", marginRight: "auto" }}>
        Take the CONKA quiz to find your perfect protocol, and prepare to unlock your best performance yet.
      </p>
      <a
        href="/quiz"
        className="inline-block px-8 py-4 font-semibold text-lg bg-white text-[var(--color-ink)] hover:bg-white/90 transition-all"
        style={{ borderRadius: "var(--premium-radius-interactive)" }}
      >
        Take the Quiz
      </a>
      <p className="premium-body-sm mt-8 text-white/70">
        100-day money-back guarantee • Free UK shipping
      </p>
    </div>
  );
}

export default WhyConkaCTA;
