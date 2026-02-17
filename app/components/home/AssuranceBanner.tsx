"use client";

export default function AssuranceBanner() {
  return (
    <div className="bg-[var(--color-ink)] py-4 px-6 rounded-[var(--premium-radius-nested)] mb-6">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-white">
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          60-Day Money-Back Guarantee
        </span>
        <span className="hidden md:inline" aria-hidden>
          •
        </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Free UK Shipping on Subscriptions
        </span>
        <span className="hidden md:inline" aria-hidden>
          •
        </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Cancel Anytime
        </span>
        <span className="hidden md:inline" aria-hidden>
          •
        </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Informed Sport Certified
        </span>
      </div>
    </div>
  );
}
