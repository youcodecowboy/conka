import Image from "next/image";
import { GUARANTEE_DAYS } from "@/app/lib/offerConstants";
import LabCTA from "./LabCTA";

const BULLETS = [
  "Free UK shipping",
  "Money back guarantee",
  "No return required",
  "Nothing to lose (other than brain fog and burnout)",
];

export default function LabGuarantee({
  hideCTA = false,
  ctaLabel,
  ctaHref,
}: {
  hideCTA?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
} = {}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
        Risk-Free Trial
      </p>
      <div className="mb-8">
        <h2
          className="brand-h1 mb-0"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {GUARANTEE_DAYS}-Day Risk Free Trial
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="flex-1 order-2 lg:order-1 w-full">
          <p className="brand-body text-black/70">
            Try CONKA for {GUARANTEE_DAYS} days. If your mental performance
            doesn&apos;t noticeably improve, we&apos;ll refund your purchase
            completely. No return necessary.
            <sup className="text-[0.5em] text-black/40 align-super">*</sup>
          </p>

          <ul className="mt-6 space-y-3">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-[var(--brand-radius-interactive)] bg-black/6 text-black shrink-0 mt-0.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-sm lg:text-base text-black/80">{bullet}</span>
              </li>
            ))}
          </ul>

          {!hideCTA && (
            <div className="mt-8">
              <LabCTA href={ctaHref} className="sm:w-auto">
                {ctaLabel ?? "Try it 100% Risk Free Now"}
              </LabCTA>
            </div>
          )}

          <p className="mt-4 text-xs text-black/40">
            *First-time customers only. Contact info@conka.io within{" "}
            {GUARANTEE_DAYS} days of your first order for a full refund.
          </p>
        </div>

        <div className="relative flex justify-center order-1 lg:order-2">
          <Image
            src="/app/AppConkaRing.png"
            alt="CONKA app showing cognitive performance score"
            width={240}
            height={480}
            loading="lazy"
            className="relative z-[1] h-auto lab-asset-frame"
            style={{ width: "clamp(180px, 40vw, 240px)" }}
          />
        </div>
      </div>
    </div>
  );
}
