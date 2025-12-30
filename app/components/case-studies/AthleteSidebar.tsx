"use client";

import { AthleteData, SportCategory, SPORT_INFO, getAllSports } from "@/app/lib/caseStudiesData";
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
  const availableSports = getAllSports();

  // Filter athletes by sport
  const filteredAthletes = selectedSport === "all"
    ? athletes
    : athletes.filter(a => a.sport === selectedSport);

  return (
    <div className="space-y-6">
      {/* Sport Filter */}
      <div>
        <p className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3">Filter by Sport</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectSport("all")}
            className={`px-3 py-1.5 rounded-full border-2 border-current transition-all font-clinical text-xs ${
              selectedSport === "all"
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "bg-transparent hover:bg-current/10"
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
                className={`px-3 py-1.5 rounded-full border-2 border-current transition-all font-clinical text-xs flex items-center gap-1.5 ${
                  selectedSport === sport
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "bg-transparent hover:bg-current/10"
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
        <p className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3">
          Athletes ({filteredAthletes.length})
        </p>
        <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
          {filteredAthletes.map((athlete) => {
            const isActive = athlete.id === activeAthleteId;
            const topImprovement = athlete.improvements[0];
            
            return (
              <button
                key={athlete.id}
                onClick={() => onSelectAthlete(athlete.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  isActive
                    ? "border-current bg-[var(--foreground)] text-[var(--background)]"
                    : "border-current/20 hover:border-current/50 bg-transparent"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Photo placeholder */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isActive ? "bg-[var(--background)]/20" : "bg-current/10"
                  }`}>
                    <SportIcon sport={athlete.sport} size={18} className={isActive ? "opacity-80" : "opacity-50"} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{athlete.name}</p>
                      {athlete.featured && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-clinical ${
                          isActive ? "bg-[var(--background)]/20" : "bg-current/10"
                        }`}>
                          ★
                        </span>
                      )}
                    </div>
                    <p className={`font-clinical text-xs truncate ${isActive ? "opacity-70" : "opacity-50"}`}>
                      {athlete.profession}
                    </p>
                    
                    {/* Top improvement preview */}
                    {topImprovement && (
                      <div className={`mt-1 flex items-center gap-1 ${isActive ? "text-emerald-300" : "text-emerald-600"}`}>
                        <span className="font-clinical text-xs font-bold">{topImprovement.value}</span>
                        <span className={`font-clinical text-[10px] ${isActive ? "opacity-70" : "opacity-50"}`}>
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

