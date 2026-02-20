"use client";

import Image from "next/image";

/** Capitalised words for "[Word] Brain Performance" hero headline. */
export const ROTATING_WORDS = [
  "Clearer",
  "Calmer",
  "Focused",
  "Sharper",
  "Steadier",
  "Sustained",
  "Confident",
];

export const ROTATION_INTERVAL_MS = 3000;
export const FADE_DURATION_MS = 500;

export function HeroTrustBadges({
  textClass = "text-[var(--text-on-light-muted)]",
}: {
  textClass?: string;
}) {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-x-5 gap-y-3 justify-start text-sm md:text-base font-bold">
      <span
        className={`flex items-center gap-2 ${textClass} md:whitespace-nowrap md:shrink-0`}
      >
        <Image
          src="/logos/InformedSportLogo.png"
          alt="Informed Sport certified"
          width={240}
          height={240}
          className="h-16 w-auto md:h-20 object-contain"
          aria-hidden
        />
        <span className="sr-only">Informed Sport Certified</span>
      </span>
      <span
        className={`flex items-center gap-2 ${textClass} md:whitespace-nowrap md:shrink-0`}
      >
        <Image
          src="/logos/MadeInBritain.png"
          alt="Made in Britain"
          width={360}
          height={180}
          className="h-14 w-auto md:h-16 object-contain"
          aria-hidden
        />
        <span className="sr-only">Made in Britain</span>
      </span>
    </div>
  );
}
