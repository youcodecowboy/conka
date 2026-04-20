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
        Trial Terms · Protocol 100
      </p>

      <div className="mb-8">
        <h2
          className="brand-h1 mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {GUARANTEE_DAYS}-Day Risk Free Trial
        </h2>
        {/* Oversized mono spec display — the number as data, not promise */}
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-5xl lg:text-6xl font-bold tabular-nums text-black leading-none">
            {GUARANTEE_DAYS}d
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/45 leading-tight">
            Evaluation window
            <br />
            Full refund eligible
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
        <div className="flex-1 order-2 lg:order-1 w-full">
          <p className="brand-body text-black/70">
            Try CONKA for {GUARANTEE_DAYS} days. If your mental performance
            doesn&apos;t noticeably improve, we&apos;ll refund your purchase
            completely. No return necessary.
            <sup className="text-[0.5em] text-black/40 align-super">*</sup>
          </p>

          {/* Numbered mono checklist — clinical-trial-protocol framing */}
          <ul className="mt-6 border-t border-black/10">
            {BULLETS.map((bullet, i) => (
              <li
                key={bullet}
                className="flex items-baseline gap-4 py-3 border-b border-black/8"
              >
                <span className="font-mono text-[11px] font-bold tabular-nums text-black/50 leading-none shrink-0 w-7">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span className="text-sm lg:text-base text-black/80 leading-snug">
                  {bullet}
                </span>
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

        {/* Phone mockup — lab-asset-frame wraps it as a data surface */}
        <div className="relative flex justify-center order-1 lg:order-2 w-full lg:w-auto">
          <div
            className="lab-asset-frame relative overflow-hidden bg-white"
            style={{ width: "clamp(180px, 40vw, 240px)" }}
          >
            <Image
              src="/app/AppConkaRing.png"
              alt="CONKA app showing cognitive performance score"
              width={240}
              height={480}
              loading="lazy"
              className="block w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
