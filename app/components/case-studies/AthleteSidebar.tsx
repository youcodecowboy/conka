"use client";

import { useState } from "react";
import { AthleteData, SportCategory, SPORT_INFO, getAllSports, getCaseStudyPhotoPath } from "@/app/lib/caseStudiesData";
import SportIcon from "./SportIcon";

interface AthleteSidebarProps {
  athletes: AthleteData[];
  activeAthleteId: string;
  onSelectAthlete: (id: string) => void;
  selectedSport: SportCategory | "all";
  onSelectSport: (sport: SportCategory | "all") => void;
}

export default function AthleteSidebar({
  athletes,
  activeAthleteId,
  onSelectAthlete,
  selectedSport,
  onSelectSport,
}: AthleteSidebarProps) {
  const [photoErrorIds, setPhotoErrorIds] = useState<Set<string>>(new Set());
  const addPhotoError = (id: string) => setPhotoErrorIds((prev) => new Set(prev).add(id));
  const availableSports = getAllSports();

  // Filter athletes by sport
  const filteredAthletes = selectedSport === "all"
    ? athletes
    : athletes.filter(a => a.sport === selectedSport);

  return (
    <div className="space-y-6">
      {/* Sport Filter */}
      <div>
        <p className="premium-body-sm uppercase tracking-wider text-[var(--text-on-light-muted)] mb-3">Filter by Sport</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectSport("all")}
            className={`px-2.5 py-1 rounded-[var(--premium-radius-interactive)] border-2 border-current transition-all font-clinical text-xs ${
              selectedSport === "all"
                ? "bg-[var(--color-ink)] text-[var(--text-on-ink)]"
                : "bg-transparent hover:bg-black/5 text-[var(--text-on-light)]"
            }`}
          >
            All ({athletes.length})
          </button>
          {availableSports.map((sport) => {
            const count = athletes.filter(a => a.sport === sport).length;
            const info = SPORT_INFO[sport];
            return (
              <button
                key={sport}
                onClick={() => onSelectSport(sport)}
                className={`px-2.5 py-1 rounded-[var(--premium-radius-interactive)] border-2 border-current transition-all font-clinical text-xs flex items-center gap-1.5 ${
                  selectedSport === sport
                    ? "bg-[var(--color-ink)] text-[var(--text-on-ink)]"
                    : "bg-transparent hover:bg-black/5 text-[var(--text-on-light)]"
                }`}
              >
                <SportIcon sport={sport} size={12} />
                <span>{info.name}</span>
                <span className="opacity-50">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Athletes List */}
      <div>
        <p className="premium-body-sm uppercase tracking-wider text-[var(--text-on-light-muted)] mb-3">
          Athletes ({filteredAthletes.length})
        </p>
        <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
          {filteredAthletes.map((athlete) => {
            const isActive = athlete.id === activeAthleteId;
            const topImprovement = athlete.improvements[0];
            const photoSrc = getCaseStudyPhotoPath(athlete.id) || athlete.photo;
            const showPhotoPlaceholder = !photoSrc || photoErrorIds.has(athlete.id);
            return (
              <button
                key={athlete.id}
                onClick={() => onSelectAthlete(athlete.id)}
                className={`w-full text-left p-3 rounded-[var(--premium-radius-nested)] border-2 transition-all ${
                  isActive
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--text-on-ink)]"
                    : "border-[var(--color-premium-stroke)] hover:border-black/20 hover:bg-black/5 bg-transparent text-[var(--text-on-light)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    isActive ? "bg-white/20" : "bg-black/10"
                  }`}>
                    {showPhotoPlaceholder ? (
                      <SportIcon sport={athlete.sport} size={20} className={isActive ? "opacity-80" : "opacity-50"} />
                    ) : (
                      <img
                        src={photoSrc}
                        alt={athlete.name}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: athlete.focalPoint
                            ? `${athlete.focalPoint.x}% ${athlete.focalPoint.y}%`
                            : "center",
                        }}
                        onError={() => addPhotoError(athlete.id)}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{athlete.name}</p>
                      {athlete.featured && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-clinical ${
                          isActive ? "bg-white/20" : "bg-black/10"
                        }`}>
                          ★
                        </span>
                      )}
                    </div>
                    <p className={`premium-body-sm truncate ${isActive ? "text-[var(--text-on-ink-muted)]" : "text-[var(--text-on-light-muted)]"}`}>
                      {athlete.profession}
                    </p>
                    {topImprovement && (
                      <div className={`mt-1 flex items-center gap-1 ${isActive ? "text-emerald-300" : "text-emerald-600"}`}>
                        <span className="font-clinical text-xs font-bold">{topImprovement.value}</span>
                        <span className={`premium-body-sm ${isActive ? "opacity-80" : "opacity-70"}`}>
                          {topImprovement.metric}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

