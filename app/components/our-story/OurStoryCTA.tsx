"use client";

export function OurStoryCTA() {
  return (
    <div className="text-center">
      <p className="brand-body opacity-80 mb-4">
        ready to experience it yourself?
      </p>
      <h2
        className="brand-h1-bold text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
        style={{ letterSpacing: "-0.02em" }}
      >
        Join the Journey
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/conka-flow"
          className="px-8 py-4 font-semibold text-lg bg-black text-white hover:opacity-90 transition-all"
          style={{ borderRadius: "var(--brand-radius-interactive)" }}
        >
          Explore CONKA Flow
        </a>
        <a
          href="/conka-clarity"
          className="px-8 py-4 font-semibold text-lg bg-transparent text-black border border-black/20 hover:bg-black hover:text-white transition-all"
          style={{ borderRadius: "var(--brand-radius-interactive)" }}
        >
          Explore CONKA Clear
        </a>
      </div>
      <p className="brand-caption mt-8 text-black/60">
        100-day money-back guarantee • Free UK shipping
      </p>
    </div>
  );
}

export default OurStoryCTA;
