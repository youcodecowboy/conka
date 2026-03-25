"use client";

/**
 * Landing page benefits — 2x2 grid + trust badges + CTA.
 *
 * Structure:
 *   1. Heading
 *   2. 2x2 benefit cards (icon, stat, title, subtitle)
 *   3. Trust badge row (2x2: free shipping, certified, batch tested, cancel anytime)
 *   4. CTA button
 *
 * Page wraps this in premium-section-luxury + premium-track.
 * Component is content-only.
 */

const FUNNEL_URL = "#";

const BENEFITS = [
  {
    id: "focus",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Sharper Focus",
    subtitle: "Stay locked in without caffeine or jitters",
    stat: "+18%",
  },
  {
    id: "sleep",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "Better Sleep",
    subtitle: "Fall asleep faster, wake up actually rested",
    stat: "+42%",
  },
  {
    id: "stress",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Stress Resilience",
    subtitle: "Pressure doesn't rattle you, deadlines don't drain you",
    stat: "-56%",
  },
  {
    id: "brain-fog",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Clear Thinking",
    subtitle: "No 3pm wall — sharp mornings, clear afternoons",
    stat: "+40%",
  },
];

const TRUST_BADGES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v10a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 17v-3" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Free UK Shipping",
    subtitle: "On subscriptions",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Informed Sport",
    subtitle: "Certified",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: "Every Batch Tested",
    subtitle: "UK lab verified",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
    title: "Cancel Anytime",
    subtitle: "60-day guarantee",
  },
];

export default function LandingBenefits() {
  return (
    <div>
      {/* Heading — white text on dark background */}
      <div className="mb-8">
        <h2
          className="premium-section-heading text-white"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          What you&apos;ll actually feel.
        </h2>
      </div>

      {/* 2x2 Benefit Grid */}
      <div className="grid grid-cols-2 gap-3 lg:gap-5">
        {BENEFITS.map((benefit) => (
          <div
            key={benefit.id}
            className="flex flex-col items-center text-center p-4 lg:p-8 rounded-2xl"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-premium-stroke)",
            }}
          >
            <div
              className="w-11 h-11 flex items-center justify-center rounded-full mb-2"
              style={{
                backgroundColor: "var(--color-neuro-blue-light)",
                color: "var(--color-ink)",
              }}
            >
              {benefit.icon}
            </div>

            <span
              className="text-xl lg:text-2xl font-bold"
              style={{
                backgroundImage: "var(--gradient-neuro-blue-accent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {benefit.stat}
            </span>

            <h3
              className="text-sm lg:text-base font-semibold mt-1.5"
              style={{ color: "var(--color-ink)" }}
            >
              {benefit.title}
            </h3>

            <p
              className="text-xs lg:text-sm mt-1 leading-snug"
              style={{ color: "var(--color-ink)", opacity: 0.5 }}
            >
              {benefit.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Trust Badges — 2x2 grid, white text on dark bg */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-2.5 px-3 py-3"
          >
            <span className="text-white opacity-50">
              {badge.icon}
            </span>
            <div>
              <p className="text-xs font-semibold leading-tight text-white">
                {badge.title}
              </p>
              <p className="text-xs leading-tight text-white opacity-50">
                {badge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <a
          href={FUNNEL_URL}
          className="block w-full lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--gradient-neuro-blue-accent)" }}
        >
          Get Started →
        </a>
      </div>
    </div>
  );
}
