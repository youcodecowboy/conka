"use client";

import { SportCategory, SPORT_INFO, getAllSports, athletes } from "@/app/lib/caseStudiesData";
import SportIcon from "./SportIcon";

interface AthleteFilterBarProps {
  selectedSport: SportCategory | "all";
  onSelectSport: (sport: SportCategory | "all") => void;
}

export default function AthleteFilterBar({
  selectedSport,
  onSelectSport,
}: AthleteFilterBarProps) {
  const availableSports = getAllSports();

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
      <div className="flex gap-2 pb-2">
        {/* All filter */}
        <button
          onClick={() => onSelectSport("all")}
          className={`flex-shrink-0 px-4 py-2 rounded-full border-2 border-current transition-all font-clinical text-sm flex items-center gap-2 ${
            selectedSport === "all"
              ? "bg-[var(--foreground)] text-[var(--background)]"
              : "bg-transparent"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a10 10 0 0 1 0 20"/>
            <path d="M12 2v20"/>
            <path d="M2 12h20"/>
          </svg>
          <span>All</span>
        </button>

        {/* Sport filters */}
        {availableSports.map((sport) => {
          const info = SPORT_INFO[sport];
          const count = athletes.filter(a => a.sport === sport).length;
          
          return (
            <button
              key={sport}
              onClick={() => onSelectSport(sport)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border-2 border-current transition-all font-clinical text-sm flex items-center gap-2 ${
                selectedSport === sport
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-transparent"
              }`}
            >
              <SportIcon sport={sport} size={16} />
              <span>{info.name}</span>
              <span className="opacity-50 text-xs">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

