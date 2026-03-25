"use client";

const FUNNEL_URL = "#";

/**
 * Landing guarantee — app as confidence booster.
 * "Measure it working. 30 days or your money back."
 *
 * Mobile: phone mockup on top, copy below.
 * Desktop: copy left, phone mockup right.
 *
 * Page wraps this in premium-section-luxury + premium-track.
 * Component is content-only.
 */
export default function LandingGuarantee() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      {/* Copy — first on desktop (left), second on mobile */}
      <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
        <h2
          className="font-bold leading-tight"
          style={{
            fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)",
            letterSpacing: "var(--letter-spacing-premium-title)",
            color: "var(--color-ink)",
          }}
        >
          The only supplement you can{" "}
          <span
            style={{
              backgroundImage: "var(--gradient-neuro-blue-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            measure working.
          </span>
        </h2>

        <p
          className="mt-4 text-sm lg:text-base leading-relaxed"
          style={{ color: "var(--color-ink)", opacity: 0.6 }}
        >
          Track your cognitive performance with the free CONKA app. Take a
          3-minute test, see your baseline, and watch your scores improve over
          time.
        </p>

        {/* Guarantee callout */}
        <div
          className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-xl"
          style={{
            backgroundColor: "var(--color-neuro-blue-light)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-ink)", opacity: 0.6, flexShrink: 0 }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--color-ink)" }}
          >
            No improvement in 30 days? Full refund.
          </span>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-6">
          <div>
            <div className="text-xl font-bold" style={{ color: "var(--color-ink)" }}>
              1,000+
            </div>
            <div className="text-xs" style={{ color: "var(--color-ink)", opacity: 0.4 }}>
              Active app users
            </div>
          </div>
          <div>
            <div className="text-xl font-bold" style={{ color: "var(--color-ink)" }}>
              16%
            </div>
            <div className="text-xs" style={{ color: "var(--color-ink)", opacity: 0.4 }}>
              Avg. improvement in 30 days
            </div>
          </div>
        </div>

        {/* CTA + app link */}
        <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-3">
          <a
            href={FUNNEL_URL}
            className="block w-full sm:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--gradient-neuro-blue-accent)" }}
          >
            Try Risk-Free →
          </a>
          <a
            href="/app"
            className="text-sm font-medium underline underline-offset-2"
            style={{ color: "var(--color-ink)", opacity: 0.5 }}
          >
            Learn more about the app
          </a>
        </div>
      </div>

      {/* Phone mockup */}
      <div className="relative flex justify-center order-1 lg:order-2">
        <img
          src="/app/AppConkaRing.png"
          alt="CONKA app showing cognitive score of 92"
          width={240}
          height={480}
          className="relative z-[1] h-auto rounded-[24px]"
          style={{
            width: "clamp(180px, 40vw, 240px)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
