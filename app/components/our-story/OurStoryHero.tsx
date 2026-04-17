export function OurStoryHero() {
  return (
    <div className="flex flex-col gap-5 lg:gap-8">
      {/* Headline block */}
      <header>
        <p className="brand-caption uppercase tracking-widest text-black/40 mb-2">
          the journey behind the formula
        </p>
        <h1
          className="brand-h1-bold text-4xl lg:text-7xl xl:text-8xl mb-1 lg:mb-2 tracking-tight"
        >
          Our{" "}
          <span
            style={{
              background: "var(--brand-gradient-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Story
          </span>
        </h1>
        <p
          className="brand-body text-base lg:text-lg text-black/60"
          style={{ maxWidth: "var(--brand-body-max-width)" }}
        >
          Two founders on a mission to build a better brain.
        </p>
      </header>

      {/* Stats cards */}
      <div className="flex flex-col gap-4 lg:gap-5">
        {/* 3 accent cards — stacked on mobile with 2-col sub-grid, 3-col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
          {/* Patent card — always full width on mobile */}
          <div
            className="p-4 lg:p-6 text-white shadow-lg"
            style={{
              borderRadius: "var(--brand-radius-card)",
              backgroundColor: "var(--brand-accent)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div className="flex items-center gap-2 lg:gap-3 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80 lg:w-6 lg:h-6"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="brand-caption uppercase tracking-widest text-white/80">
                Unique
              </span>
            </div>
            <div className="text-lg lg:text-2xl font-bold mb-1">
              Patented Nootropic Formula
            </div>
            <div className="brand-caption text-white/60">#GB2620279</div>
          </div>

          {/* Research + Validated — 2-col grid on mobile, individual cols on desktop */}
          <div className="grid grid-cols-2 lg:contents gap-2">
            <div
              className="p-3 lg:p-6 text-white shadow-lg"
              style={{
                borderRadius: "var(--brand-radius-card)",
                backgroundColor: "var(--brand-accent)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="hidden lg:flex items-center gap-3 mb-2">
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
                <span className="brand-caption uppercase tracking-widest text-white/80">
                  Research
                </span>
              </div>
              <div className="font-clinical text-xl lg:text-4xl font-bold mb-0.5 lg:mb-1">
                £500K+
              </div>
              <div className="brand-caption text-white/60">
                <span className="lg:hidden">Research</span>
                <span className="hidden lg:inline">Durham &amp; Cambridge</span>
              </div>
            </div>

            <div
              className="p-3 lg:p-6 text-white shadow-lg"
              style={{
                borderRadius: "var(--brand-radius-card)",
                backgroundColor: "var(--brand-accent)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="hidden lg:flex items-center gap-3 mb-2">
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
                <span className="brand-caption uppercase tracking-widest text-white/80">
                  Validated
                </span>
              </div>
              <div className="font-clinical text-xl lg:text-4xl font-bold mb-0.5 lg:mb-1">
                25+
              </div>
              <div className="brand-caption text-white/60">
                <span className="lg:hidden">Clinical trials</span>
                <span className="hidden lg:inline">Clinical trials with elite teams</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key stats inline row */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-6">
          <div className="flex items-center gap-1.5 lg:gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-black/40 lg:w-5 lg:h-5"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="font-clinical text-base lg:text-2xl font-bold">
              +22%
            </span>
            <span className="brand-caption text-black/60">
              <span className="hidden lg:inline">cognitive speed (men)</span>
              <span className="lg:hidden">speed (men)</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 lg:gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-black/40 lg:w-5 lg:h-5"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="font-clinical text-base lg:text-2xl font-bold">
              +33%
            </span>
            <span className="brand-caption text-black/60">
              <span className="hidden lg:inline">cognitive speed (women)</span>
              <span className="lg:hidden">speed (women)</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 lg:gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-black/40 lg:w-5 lg:h-5"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span className="font-clinical text-base lg:text-2xl font-bold">
              100+
            </span>
            <span className="brand-caption text-black/60">prototypes</span>
          </div>
          <div className="flex items-center gap-1.5 lg:gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-black/40 lg:w-5 lg:h-5"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-clinical text-base lg:text-2xl font-bold">
              +15
            </span>
            <span className="brand-caption text-black/60">years lifespan*</span>
          </div>
        </div>
      </div>

      {/* What you'll discover — all 4 items at all sizes */}
      <div className="pt-4 lg:pt-5 border-t border-[var(--brand-accent)]/20">
        <p className="brand-caption uppercase tracking-widest text-black/40 mb-3">
          What you&apos;ll discover
        </p>
        <div className="space-y-2 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4">
          <div className="flex items-start gap-2 lg:gap-3">
            <span className="font-clinical text-sm lg:text-lg font-bold text-black/40">
              01
            </span>
            <p className="brand-caption text-black/60">
              How a concussion injury sparked an 8-month research journey
            </p>
          </div>
          <div className="flex items-start gap-2 lg:gap-3">
            <span className="font-clinical text-sm lg:text-lg font-bold text-black/40">
              02
            </span>
            <p className="brand-caption text-black/60">
              The science behind extending lifespan by 15 years
            </p>
          </div>
          <div className="flex items-start gap-2 lg:gap-3">
            <span className="font-clinical text-sm lg:text-lg font-bold text-black/40">
              03
            </span>
            <p className="brand-caption text-black/60">
              Why we invented an alcohol-free extraction method
            </p>
          </div>
          <div className="flex items-start gap-2 lg:gap-3">
            <span className="font-clinical text-sm lg:text-lg font-bold text-black/40">
              04
            </span>
            <p className="brand-caption text-black/60">
              Tested by 12+ elite sports teams worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurStoryHero;
