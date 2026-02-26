"use client";

export function OurStoryHeroMobile() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1">
        <h1
          className="premium-section-heading text-4xl font-bold tracking-tight mb-1 text-[var(--color-ink)]"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Our Story
        </h1>
        <p className="premium-section-subtitle text-lg mb-1 opacity-70">
          the journey behind the formula
        </p>
        <p className="premium-body-sm opacity-50 mb-5">
          Two founders on a mission to build a better brain.
        </p>

        <div className="premium-card-soft premium-card-soft-stroke p-4 mb-3 text-[var(--color-ink)]">
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="premium-body-sm uppercase tracking-widest opacity-50">
              Unique
            </span>
          </div>
          <div className="text-lg font-bold mb-1">Patented Nootropic Formula</div>
          <div className="premium-body-sm opacity-50">#GB2620279</div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="premium-card-soft premium-card-soft-stroke p-3 text-[var(--color-ink)]">
            <div className="font-clinical text-xl font-bold mb-0.5">£500K+</div>
            <div className="premium-body-sm opacity-50">Research</div>
          </div>
          <div className="premium-card-soft premium-card-soft-stroke p-3 text-[var(--color-ink)]">
            <div className="font-clinical text-xl font-bold mb-0.5">25+</div>
            <div className="premium-body-sm opacity-50">Clinical trials</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-40"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="font-clinical text-base font-bold">+22%</span>
            <span className="premium-body-sm opacity-50">speed</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-40"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span className="font-clinical text-base font-bold">100+</span>
            <span className="premium-body-sm opacity-50">prototypes</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-40"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="font-clinical text-base font-bold">+33%</span>
            <span className="premium-body-sm opacity-50">women</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-40"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-clinical text-base font-bold">+15</span>
            <span className="premium-body-sm opacity-50">years*</span>
          </div>
        </div>

        <div className="border-t border-black/10 pt-4">
          <p className="premium-body-sm uppercase tracking-widest opacity-40 mb-3">
            What you&apos;ll discover
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-clinical text-sm font-bold opacity-30">
                01
              </span>
              <p className="premium-body-sm opacity-60">
                How a concussion sparked an 8-month research journey
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-clinical text-sm font-bold opacity-30">
                02
              </span>
              <p className="premium-body-sm opacity-60">
                Tested by 12+ elite sports teams worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-3 opacity-50">
        <p className="premium-body text-sm">scroll to read the full story</p>
        <div className="animate-bounce-slow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default OurStoryHeroMobile;
