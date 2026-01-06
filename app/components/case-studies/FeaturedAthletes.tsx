"use client";

import { AthleteData } from "@/app/lib/caseStudiesData";

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

      <div className="relative">
        {/* Scroll container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:-mx-0 md:px-0">
          {athletes.map((athlete) => {
            const topImprovement = athlete.improvements[0];
            
            return (
              <button
                key={athlete.id}
                onClick={() => onSelectAthlete(athlete.id)}
                className="neo-box overflow-hidden text-left hover:opacity-90 transition-all group flex-shrink-0 w-64 lg:w-72"
              >
                {/* Photo */}
                <div className="relative h-48 lg:h-56 bg-gradient-to-br from-neutral-100 to-neutral-200 border-0 border-b-2 border-current/10 overflow-hidden">
                  {athlete.photo ? (
                    <img 
                      src={athlete.photo} 
                      alt={athlete.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto opacity-30">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-bold text-sm group-hover:opacity-80 transition-opacity truncate">
                    {athlete.name}
                  </h4>
                  <p className="font-clinical text-xs opacity-60 mb-2 truncate">{athlete.profession}</p>
                  
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
        
        {/* Scroll fade indicators */}
        <div className="hidden md:block absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

