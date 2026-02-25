import Link from "next/link";
import Image from "next/image";
import { getFormulaImage } from "@/app/lib/productImageConfig";

export function EmptySubscriptionsState() {
  const flowImage = getFormulaImage("01");
  const clearImage = getFormulaImage("02");
  return (
    <div className="rounded-[var(--premium-radius-card)] bg-[var(--color-bone)] border border-[var(--color-premium-stroke)] shadow-sm p-10 md:p-12 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto mb-6 text-[var(--text-on-light-muted)]"
      >
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
      <h2
        className="premium-heading mb-2 text-[var(--color-ink)]"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        No active subscriptions
      </h2>
      <p className="premium-body text-[var(--text-on-light-muted)] mb-8 max-w-[65ch] mx-auto">
        Subscribe to your favorite protocols for automatic deliveries and
        savings.
      </p>
      {(flowImage || clearImage) && (
        <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto mb-8">
          {flowImage && (
            <Link
              href="/conka-flow"
              className="rounded-[var(--premium-radius-card)] bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] p-5 hover:border-[var(--color-neuro-blue-light)] transition-colors text-left overflow-hidden"
            >
              <div className="w-full aspect-square max-w-[180px] mx-auto rounded-[var(--premium-radius-nested)] overflow-hidden mb-4 bg-[var(--color-premium-stroke)]">
                <Image src={flowImage} alt="CONKA Flow" width={180} height={180} className="w-full h-full object-cover" />
              </div>
              <p className="font-semibold text-[var(--color-ink)]">CONKA Flow</p>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">Caffeine-Free Focus</p>
            </Link>
          )}
          {clearImage && (
            <Link
              href="/conka-clarity"
              className="rounded-[var(--premium-radius-card)] bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] p-5 hover:border-[var(--color-neuro-blue-light)] transition-colors text-left overflow-hidden"
            >
              <div className="w-full aspect-square max-w-[180px] mx-auto rounded-[var(--premium-radius-nested)] overflow-hidden mb-4 bg-[var(--color-premium-stroke)]">
                <Image src={clearImage} alt="CONKA Clear" width={180} height={180} className="w-full h-full object-cover" />
              </div>
              <p className="font-semibold text-[var(--color-ink)]">CONKA Clear</p>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">Peak Performance</p>
            </Link>
          )}
        </div>
      )}
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
  );
}
