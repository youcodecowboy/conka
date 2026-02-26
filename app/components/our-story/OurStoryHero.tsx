"use client";

export function OurStoryHero() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Headline block — tight grouping */}
      <header>
        <h1
          className="premium-section-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-1 md:mb-2 text-[var(--color-ink)]"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Our{" "}
          <span
            style={{
              background: "var(--gradient-neuro-blue-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Story
          </span>
        </h1>
        <p className="premium-section-subtitle text-xl md:text-2xl mb-1 opacity-70">
          the journey behind the formula
        </p>
        <p
          className="premium-body text-base md:text-lg opacity-60"
          style={{ maxWidth: "var(--premium-body-max-width)" }}
        >
          Two founders on a mission to build a better brain.
        </p>
      </header>

      {/* Stats cards + key stats in one block */}
      <div className="flex flex-col gap-4 md:gap-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <div
          className="p-5 md:p-6 text-white shadow-lg"
          style={{
            borderRadius: "var(--premium-radius-card)",
            backgroundColor: "var(--color-neuro-blue-end)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div className="premium-body-sm uppercase tracking-widest text-white/80">
              Unique
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold mb-1">
            Patented Nootropic Formula
          </div>
          <div className="premium-body-sm text-white/70">#GB2620279</div>
        </div>

        <div
          className="p-5 md:p-6 text-white shadow-lg"
          style={{
            borderRadius: "var(--premium-radius-card)",
            backgroundColor: "var(--color-neuro-blue-end)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <div className="premium-body-sm uppercase tracking-widest text-white/80">
              Research
            </div>
          </div>
          <div className="font-clinical text-3xl md:text-4xl font-bold mb-1">
            £500K+
          </div>
          <div className="premium-body-sm text-white/70">
            Durham & Cambridge
          </div>
        </div>

        <div
          className="p-5 md:p-6 text-white shadow-lg"
          style={{
            borderRadius: "var(--premium-radius-card)",
            backgroundColor: "var(--color-neuro-blue-end)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div className="premium-body-sm uppercase tracking-widest text-white/80">
              Validated
            </div>
          </div>
          <div className="font-clinical text-3xl md:text-4xl font-bold mb-1">
            25+
          </div>
          <div className="premium-body-sm text-white/70">
            Clinical trials with elite teams
          </div>
        </div>
        </div>

        {/* Key stats inline row */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-40"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="font-clinical text-xl md:text-2xl font-bold">
            +22%
          </span>
          <span className="premium-body-sm opacity-50">
            cognitive speed (men)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-40"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="font-clinical text-xl md:text-2xl font-bold">
            +33%
          </span>
          <span className="premium-body-sm opacity-50">
            cognitive speed (women)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-40"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <span className="font-clinical text-xl md:text-2xl font-bold">
            100+
          </span>
          <span className="premium-body-sm opacity-50">prototypes</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-40"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="font-clinical text-xl md:text-2xl font-bold">
            +15
          </span>
          <span className="premium-body-sm opacity-50">years lifespan*</span>
        </div>
        </div>
      </div>

      {/* What you'll discover */}
      <div className="pt-4 md:pt-5 border-t border-[var(--color-neuro-blue-start)]/30">
        <p className="premium-body-sm uppercase tracking-widest opacity-40 mb-3">
          What you&apos;ll discover
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="flex items-start gap-3">
            <span className="font-clinical text-lg font-bold opacity-30">
              01
            </span>
            <p className="premium-body-sm opacity-70">
              How a concussion injury sparked an 8-month research journey
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-clinical text-lg font-bold opacity-30">
              02
            </span>
            <p className="premium-body-sm opacity-70">
              The science behind extending lifespan by 15 years
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-clinical text-lg font-bold opacity-30">
              03
            </span>
            <p className="premium-body-sm opacity-70">
              Why we invented an alcohol-free extraction method
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-clinical text-lg font-bold opacity-30">
              04
            </span>
            <p className="premium-body-sm opacity-70">
              Tested by 12+ elite sports teams worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurStoryHero;
