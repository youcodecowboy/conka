"use client";

import { AthleteData, SPORT_INFO } from "@/app/lib/caseStudiesData";
import SportIcon from "./SportIcon";

interface FeaturedAthletesProps {
  athletes: AthleteData[];
  onSelectAthlete: (id: string) => void;
}

export default function FeaturedAthletes({ athletes, onSelectAthlete }: FeaturedAthletesProps) {
  if (athletes.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <h3 className="text-xl font-bold">Featured Case Studies</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {athletes.map((athlete) => {
          const sportInfo = SPORT_INFO[athlete.sport];
          const topImprovement = athlete.improvements[0];
          
          return (
            <button
              key={athlete.id}
              onClick={() => onSelectAthlete(athlete.id)}
              className="neo-box overflow-hidden text-left hover:opacity-90 transition-all group"
            >
              {/* Photo placeholder with sport icon overlay */}
              <div className="relative h-32 placeholder-box border-0 border-b-2 border-current">
                <span className="font-clinical text-xs">[PHOTO]</span>
                <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center">
                  <SportIcon sport={athlete.sport} size={16} />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-bold text-sm group-hover:opacity-80 transition-opacity">
                  {athlete.name}
                </h4>
                <p className="font-clinical text-xs opacity-60 mb-2">{athlete.profession}</p>
                
                {/* Key stat */}
                {topImprovement && (
                  <div className="flex items-center justify-between pt-2 border-t border-current/10">
                    <span className="font-clinical text-xs opacity-50">{topImprovement.metric}</span>
                    <span className="font-clinical text-lg font-bold text-emerald-600">
                      {topImprovement.value}
                    </span>
                  </div>
                )}
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--foreground)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

