"use client";

import type { AthleteData } from "@/app/lib/caseStudiesData";
import {
  getCaseStudyPhotoPath,
  SPORT_INFO,
} from "@/app/lib/caseStudiesData";

interface FeaturedAthletesCarouselProps {
  athletes: AthleteData[];
  activeAthleteId: string;
  onSelectAthlete: (id: string) => void;
}

export default function FeaturedAthletesCarousel({
  athletes,
  activeAthleteId,
  onSelectAthlete,
}: FeaturedAthletesCarouselProps) {
  return (
    <div className="flex gap-4 overflow-x-auto overflow-y-visible px-4 pb-2 pt-2 scrollbar-hide">
      {athletes.map((athlete) => {
        const improvement = athlete.improvements.find(
          (i) => i.metric === "Total Score",
        );
        const photoSrc =
          getCaseStudyPhotoPath(athlete.id) || athlete.photo || "";
        const focalPoint = athlete.focalPoint ?? { x: 50, y: 50 };
        const isActive = activeAthleteId === athlete.id;

        return (
          <button
            key={athlete.id}
            type="button"
            onClick={() => onSelectAthlete(athlete.id)}
            className={`relative flex-shrink-0 w-[140px] aspect-[3/4] rounded-[var(--premium-radius-card)] overflow-hidden text-left transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)] focus:ring-offset-2 ${
              isActive
                ? "ring-2 ring-[var(--color-ink)] ring-offset-2"
                : "hover:opacity-95"
            }`}
            aria-pressed={isActive}
            aria-label={`View case study: ${athlete.name}, ${improvement?.value ?? "+0%"} improvement`}
          >
            {photoSrc ? (
              <img
                src={photoSrc}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: `${focalPoint.x}% ${focalPoint.y}%`,
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-[var(--color-premium-bg-soft)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <p className="text-xs font-semibold truncate mb-0.5">
                {athlete.name}
              </p>
              <p className="text-lg font-bold font-clinical text-emerald-400">
                {improvement?.value ?? "+0%"}
              </p>
              <p className="text-[10px] uppercase tracking-wide opacity-80">
                {SPORT_INFO[athlete.sport]?.name ?? athlete.sport}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
