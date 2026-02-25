import Link from "next/link";
import Image from "next/image";
import { getFormulaImage } from "@/app/lib/productImageConfig";

export function EmptyOrdersState() {
  const flowImage = getFormulaImage("01");
  const clearImage = getFormulaImage("02");
  return (
    <div className="rounded-[var(--premium-radius-card)] bg-[var(--color-bone)] border border-[var(--color-premium-stroke)] shadow-sm p-10 md:p-12 text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-premium-stroke)] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--text-on-light-muted)]"
        >
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      </div>
      <h2
        className="premium-heading mb-2 text-[var(--color-ink)]"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        No orders yet
      </h2>
      <p className="premium-body text-[var(--text-on-light-muted)] mb-8 max-w-[65ch] mx-auto">
        Once you place an order, you&apos;ll be able to track it here and see
        your complete order history.
      </p>

      <div className="border-t border-[var(--color-premium-stroke)] pt-8 mt-8">
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-4">
          Start Shopping
        </p>
        <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto mb-8">
          <Link
            href="/conka-flow"
            className="rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] p-5 hover:border-[var(--color-neuro-blue-start)] transition-colors text-left overflow-hidden bg-[var(--color-premium-bg-soft)]"
          >
            {flowImage ? (
              <div className="w-full aspect-square max-w-[180px] mx-auto rounded-[var(--premium-radius-nested)] overflow-hidden mb-4 bg-[var(--color-premium-stroke)]">
                <Image src={flowImage} alt="CONKA Flow" width={180} height={180} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 bg-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] mb-4" />
            )}
            <p className="font-semibold text-[var(--color-ink)]">
              CONKA Flow
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">
              Caffeine-Free Focus
            </p>
          </Link>
          <Link
            href="/conka-clarity"
            className="rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] p-5 hover:border-[var(--color-neuro-blue-start)] transition-colors text-left overflow-hidden bg-[var(--color-premium-bg-soft)]"
          >
            {clearImage ? (
              <div className="w-full aspect-square max-w-[180px] mx-auto rounded-[var(--premium-radius-nested)] overflow-hidden mb-4 bg-[var(--color-premium-stroke)]">
                <Image src={clearImage} alt="CONKA Clear" width={180} height={180} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 bg-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] mb-4" />
            )}
            <p className="font-semibold text-[var(--color-ink)]">
              CONKA Clear
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">
              Peak Performance
            </p>
          </Link>
        </div>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 rounded-[var(--premium-radius-interactive)] bg-[var(--color-ink)] px-8 py-3 font-semibold text-white text-sm hover:opacity-90 transition-opacity"
        >
          Find your protocol
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
