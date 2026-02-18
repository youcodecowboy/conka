"use client";

import { useState } from "react";
import { AthleteData, getCaseStudyPhotoPath } from "@/app/lib/caseStudiesData";

interface FeaturedAthletesProps {
  athletes: AthleteData[];
  onSelectAthlete: (id: string) => void;
}

function FeaturedAthleteTile({
  athlete,
  onSelect,
}: {
  athlete: AthleteData;
  onSelect: () => void;
}) {
  const [photoError, setPhotoError] = useState(false);
  const photoSrc = getCaseStudyPhotoPath(athlete.id) || athlete.photo;
  const topImprovement = athlete.improvements[0];
  const showPlaceholder = !photoSrc || photoError;

  return (
    <button
      onClick={onSelect}
      className="premium-card-soft premium-card-soft-stroke overflow-hidden text-left hover:opacity-90 transition-all group flex-shrink-0 w-64 lg:w-72 p-0 relative"
    >
      <div className="relative h-48 lg:h-56 bg-gradient-to-br from-neutral-100 to-neutral-200 border-0 border-b border-[var(--color-premium-stroke)] overflow-hidden">
        {showPlaceholder ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="premium-body-sm text-[var(--text-on-light-muted)]">
              {athlete.name || "Photo"}
            </span>
          </div>
        ) : (
          <img
            src={photoSrc}
            alt={athlete.name}
            className="w-full h-full object-cover object-center"
            style={{
              objectPosition: athlete.focalPoint
                ? `${athlete.focalPoint.x}% ${athlete.focalPoint.y}%`
                : "center",
            }}
            onError={() => setPhotoError(true)}
          />
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-sm text-[var(--text-on-light)] group-hover:opacity-80 transition-opacity truncate">
          {athlete.name}
        </h4>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-2 truncate">
          {athlete.profession}
        </p>
        {topImprovement && (
          <div className="flex items-center justify-between pt-2 border-t border-[var(--color-premium-stroke)]">
            <span className="premium-body-sm text-[var(--text-on-light-muted)]">
              {topImprovement.metric}
            </span>
            <span className="font-clinical text-lg font-bold text-emerald-600">
              {topImprovement.value}
            </span>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-ink)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-[var(--premium-radius-card)]" />
    </button>
  );
}

export default function FeaturedAthletes({ athletes, onSelectAthlete }: FeaturedAthletesProps) {
  if (athletes.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <h3 className="text-xl font-bold text-[var(--text-on-light)]">Featured Case Studies</h3>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:-mx-0 md:px-0">
          {athletes.map((athlete) => (
            <FeaturedAthleteTile
              key={athlete.id}
              athlete={athlete}
              onSelect={() => onSelectAthlete(athlete.id)}
            />
          ))}
        </div>
        <div className="hidden md:block absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-[var(--color-bone)] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

