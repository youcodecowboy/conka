"use client";

import { headlineStats } from "@/app/lib/scienceData";

interface ScienceHeroProps {
  isMobile?: boolean;
}

export default function ScienceHero({ isMobile = false }: ScienceHeroProps) {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {/* Main Header */}
      <header>
        <p className="premium-body-sm uppercase tracking-widest opacity-50 mb-2">
          The Science Behind CONKA
        </p>
        <h1
          className={`premium-section-heading font-bold ${
            isMobile ? "text-3xl mb-3" : "text-5xl lg:text-6xl mb-4"
          }`}
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Cognitive Performance,
          <br />
          <span className="font-normal italic">rooted in science</span>
        </h1>
        <p
          className="premium-body opacity-80"
          style={{ maxWidth: "var(--premium-body-max-width)" }}
        >
          Every ingredient in our formulas is backed by peer-reviewed clinical
          research. We&apos;ve studied the science of adaptogens, nootropics,
          and neuroprotection to create a comprehensive approach to brain health.
        </p>
      </header>

      {/* Stats Grid */}
      <div
        className={`grid gap-4 ${isMobile ? "grid-cols-2" : "grid-cols-4"}`}
      >
        {headlineStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white premium-card-soft-stroke p-4 lg:p-6 text-center text-[var(--color-ink)]"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            <p
              className={`font-bold font-clinical ${
                isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
              }`}
            >
              {stat.value}
              {stat.suffix && (
                <span
                  style={{
                    color: "var(--color-neuro-blue-end)",
                  }}
                >
                  {stat.suffix}
                </span>
              )}
            </p>
            <p className="premium-body-sm opacity-70 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Research Note */}
      <div
        className={`premium-card-soft premium-card-soft-stroke p-4 ${isMobile ? "mt-2" : "mt-4"}`}
        style={{ borderRadius: "var(--premium-radius-card)" }}
      >
        <p className="premium-body-sm opacity-80">
          <span className="font-bold">Note:</span> These statistics represent
          the combined body of research supporting our formulations, including
          CONKA&apos;s proprietary clinical studies and peer-reviewed research
          from leading universities and medical institutions worldwide. All
          studies are indexed in PubMed.
        </p>
      </div>

      {/* Subtext pills */}
      <div className="flex flex-wrap gap-4 items-center">
        <span className="premium-body-sm px-3 py-1.5 rounded-full border border-[var(--color-premium-stroke)]">
          Patent #GB2620279
        </span>
        <span className="premium-body-sm px-3 py-1.5 rounded-full border border-[var(--color-premium-stroke)]">
          £500,000+ in Research
        </span>
        <span className="premium-body-sm px-3 py-1.5 rounded-full border border-[var(--color-premium-stroke)]">
          PubMed Indexed Studies
        </span>
      </div>
    </div>
  );
}
