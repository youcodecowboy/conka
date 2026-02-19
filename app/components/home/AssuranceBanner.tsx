"use client";

export default function AssuranceBanner() {
  return (
    <div className="py-5 px-4">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[var(--text-on-light-muted)]">

        {/* Certified — shield tick */}
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
          Informed Sport Certified
        </span>

        <span aria-hidden className="hidden md:inline text-[var(--color-premium-stroke)]">•</span>

        {/* Free shipping — package */}
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <path d="M21 10V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v10a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 17v-3"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          Free UK Shipping on Subscriptions
        </span>

        <span aria-hidden className="hidden md:inline text-[var(--color-premium-stroke)]">•</span>

        {/* Cancel anytime — refresh/cycle */}
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Cancel Anytime
        </span>

        <span aria-hidden className="hidden md:inline text-[var(--color-premium-stroke)]">•</span>

        {/* Money back — 60-day guarantee */}
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          60-Day Money-Back Guarantee
        </span>

      </div>
    </div>
  );
}
