"use client";

import { GUARANTEE_LABEL } from "@/app/lib/offerConstants";

/**
 * Funnel trust strip — sits directly above the CTA.
 *
 * Premium, minimal. A single horizontal line of trust signals
 * separated by subtle dots. Reduces purchase anxiety at the
 * moment of decision.
 */
export default function FunnelAssurance() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 py-3 text-[10px] text-black tracking-wide">
      <span className="flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
        {GUARANTEE_LABEL}
      </span>

      <span className="text-black/20" aria-hidden>·</span>

      <span className="flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v10a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 17v-3" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        Free Shipping
      </span>

      <span className="text-black/20" aria-hidden>·</span>

      <span className="flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
        Cancel Anytime
      </span>

    </div>
  );
}
