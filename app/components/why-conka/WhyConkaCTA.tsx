"use client";

const btnBase =
  "px-8 py-4 font-semibold text-lg transition-all";
const btnRadius = { borderRadius: "var(--premium-radius-interactive)" };

export function WhyConkaCTA() {
  return (
    <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-12 md:gap-14">
      {/* Headline block */}
      <header className="space-y-3">
        <p className="premium-body-sm uppercase tracking-widest text-white/60">
          Ready to unlock your cognitive potential?
        </p>
        <h2
          className="premium-section-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Explore the full{" "}
          <span
            style={{
              background: "var(--gradient-neuro-blue-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CONKA
          </span>{" "}
          range today
        </h2>
      </header>

      {/* Primary CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
        <a
          href="/conka-flow"
          className={`${btnBase} bg-white text-[var(--color-ink)] hover:bg-white/90`}
          style={btnRadius}
        >
          Explore CONKA Flow
        </a>
        <a
          href="/conka-clarity"
          className={`${btnBase} bg-transparent text-white border border-white/40 hover:bg-white hover:text-[var(--color-ink)]`}
          style={btnRadius}
        >
          Explore CONKA Clarity
        </a>
      </div>

      {/* Not sure? — Quiz block */}
      <div className="space-y-4 w-full">
        <p className="premium-body-sm uppercase tracking-widest text-white/50">
          Not sure which product is right for you?
        </p>
        <p
          className="premium-body text-white/80 leading-relaxed"
          style={{ maxWidth: "var(--premium-body-max-width)", margin: "0 auto" }}
        >
          Take the CONKA quiz to find your perfect protocol, and prepare to unlock your best performance yet.
        </p>
        <a
          href="/quiz"
          className={`inline-block ${btnBase} bg-white text-[var(--color-ink)] hover:bg-white/90`}
          style={btnRadius}
        >
          Take the Quiz
        </a>
      </div>

      {/* Trust line */}
      <p className="premium-body-sm text-white/60 border-t border-white/20 pt-8 w-full">
        100-day money-back guarantee • Free UK shipping
      </p>
    </div>
  );
}

export default WhyConkaCTA;
