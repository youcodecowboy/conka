"use client";

import Image from "next/image";

interface ScienceAdaptogensProps {
  isMobile?: boolean;
}

const TAGS = [
  "HPA Axis Modulation",
  "Cortisol Regulation",
  "Non-Sedating",
];

export default function ScienceAdaptogens({
  isMobile = false,
}: ScienceAdaptogensProps) {
  return (
    <div
      className={`grid gap-8 md:gap-12 ${
        isMobile ? "grid-cols-1" : "lg:grid-cols-2 lg:gap-12 lg:items-center"
      }`}
    >
      {/* Text: second on mobile, first on desktop */}
      <div className={isMobile ? "order-2 space-y-6" : ""}>
        <p className="premium-body-sm uppercase tracking-widest opacity-50 mb-2">
          Understanding The Basics
        </p>
        <h2
          className="premium-section-heading mb-4"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          What Are Adaptogens?
        </h2>
        {isMobile ? (
          <>
            {/* Mobile: lead in a card so it's not a wall of text */}
            <div
              className="p-4 rounded-[var(--premium-radius-nested)] border border-[var(--color-premium-stroke)]"
              style={{ backgroundColor: "var(--color-premium-bg-soft)" }}
            >
              <p className="premium-body font-medium">
                Adaptogens are natural compounds that help your body
                &ldquo;adapt&rdquo; to stress by normalizing physiological
                functions—unlike stimulants that force a response.
              </p>
            </div>
            <div className="space-y-5">
              <p className="premium-body opacity-80">
                The term was coined by Soviet scientist Dr. Nikolai Lazarev in
                1947, and these compounds have been used in traditional medicine
                for thousands of years. Modern research has validated their
                effects on the hypothalamic-pituitary-adrenal (HPA) axis.
              </p>
              <p className="premium-body opacity-80">
                Key adaptogens in our formulas include{" "}
                <strong>Ashwagandha</strong>, <strong>Rhodiola rosea</strong>,
                and <strong>Lemon Balm</strong>, each clinically proven to
                reduce cortisol and improve stress resilience.
              </p>
            </div>
          </>
        ) : (
          <div
            className="space-y-4 opacity-80"
            style={{ maxWidth: "var(--premium-body-max-width)" }}
          >
            <p className="premium-body">
              Adaptogens are a unique class of natural compounds that help your
              body &ldquo;adapt&rdquo; to stress. Unlike stimulants that force a
              response, adaptogens work by normalizing physiological functions
              and maintaining homeostasis.
            </p>
            <p className="premium-body">
              The term was coined by Soviet scientist Dr. Nikolai Lazarev in
              1947, and these compounds have been used in traditional medicine
              for thousands of years. Modern research has validated their
              effects on the hypothalamic-pituitary-adrenal (HPA) axis.
            </p>
            <p className="premium-body">
              Key adaptogens in our formulas include{" "}
              <strong>Ashwagandha</strong>, <strong>Rhodiola rosea</strong>, and{" "}
              <strong>Lemon Balm</strong>, each clinically proven to reduce
              cortisol and improve stress resilience.
            </p>
          </div>
        )}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-6">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="premium-body-sm px-3 py-1.5 rounded-full border border-[var(--color-premium-stroke)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div
        className={`premium-card-soft overflow-hidden ${isMobile ? "order-1" : ""}`}
        style={{ borderRadius: "var(--premium-radius-card)" }}
      >
        <div
          className={`relative overflow-hidden ${isMobile ? "aspect-video" : "aspect-square"}`}
          style={{ borderRadius: "var(--premium-radius-card)" }}
        >
          <Image
            src="/CONKA_07.jpg"
            alt="Adaptogenic herbs"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-white">
            <p className="premium-body-sm opacity-70 mb-1">
              CONKA Flow Contains
            </p>
            <p className="font-bold text-lg md:text-xl">
              3 Research-Backed Adaptogens
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
