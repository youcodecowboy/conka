"use client";

import { AthleteData, SPORT_INFO } from "@/app/lib/caseStudiesData";
import SportIcon from "./SportIcon";
import AthleteStats from "./AthleteStats";

interface AthleteCardProps {
  athlete: AthleteData;
  compact?: boolean;
}

// Product version badge
function ProductBadge({ version }: { version?: "01" | "02" | "both" }) {
  if (!version) return null;
  
  const getLabel = () => {
    switch (version) {
      case "01": return "Conka Flow";
      case "02": return "Conka Clarity";
      case "both": return "Flow + Clarity";
    }
  };
  
  const getColor = () => {
    switch (version) {
      case "01": return "bg-[#AAB9BC]";
      case "02": return "bg-amber-500";
      case "both": return "bg-gradient-to-r from-[#AAB9BC] to-amber-500";
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-clinical font-medium text-white ${getColor()}`}>
      {getLabel()}
    </span>
  );
}

export default function AthleteCard({ athlete, compact = false }: AthleteCardProps) {
  const sportInfo = SPORT_INFO[athlete.sport];

  if (compact) {
    // Compact view for featured section or list items
    return (
      <div className="neo-box overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
        {/* Photo */}
        <div className="placeholder-box h-32 w-full border-0 border-b-2 border-current">
          <span className="font-clinical text-xs">[PHOTO]</span>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-bold text-sm">{athlete.name}</h4>
              <p className="font-clinical text-xs opacity-70">{athlete.profession}</p>
            </div>
            <SportIcon sport={athlete.sport} size={20} className="opacity-50 flex-shrink-0" />
          </div>
          
          {/* Top improvement */}
          {athlete.improvements[0] && (
            <div className="pt-2 border-t border-current/10">
              <p className="text-lg font-bold font-clinical text-emerald-600">
                {athlete.improvements[0].value}
              </p>
              <p className="font-clinical text-xs opacity-60">{athlete.improvements[0].metric}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full detailed view
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="neo-box overflow-hidden">
        <div className="neo-box-inverted p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              {/* Photo placeholder */}
              <div className="placeholder-box w-20 h-20 rounded-full flex-shrink-0 border-2 border-[var(--background)]">
                <span className="font-clinical text-xs">[PHOTO]</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold">{athlete.name}</h2>
                  {athlete.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-[var(--background)] text-[var(--foreground)] text-xs font-clinical">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <SportIcon sport={athlete.sport} size={16} className="opacity-70" />
                  <p className="font-clinical text-sm opacity-80">{athlete.profession}</p>
                </div>
                {athlete.achievement && (
                  <p className="font-clinical text-xs opacity-60 mt-1">{athlete.achievement}</p>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <ProductBadge version={athlete.productVersion} />
              {athlete.protocolUsed && (
                <span className="px-3 py-1 rounded-full border-2 border-[var(--background)] text-xs font-clinical">
                  {athlete.protocolUsed}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="p-6">
          <p className="text-sm leading-relaxed">{athlete.description}</p>
        </div>
      </div>

      {/* Quote */}
      {athlete.quote && (
        <div className="neo-box p-6">
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="opacity-20 flex-shrink-0">
              <path d="M11 7H7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H6v2h1a4 4 0 0 0 4-4V7zm8 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7z"/>
            </svg>
            <div>
              <p className="font-commentary text-xl mb-3">&quot;{athlete.quote}&quot;</p>
              <p className="font-clinical text-sm opacity-70">— {athlete.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <AthleteStats athlete={athlete} />
    </div>
  );
}

