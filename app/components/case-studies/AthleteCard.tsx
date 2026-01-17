"use client";

import { AthleteData } from "@/app/lib/caseStudiesData";
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
      case "01":
        return "CONKA Flow";
      case "02":
        return "CONKA Clear";
      case "both":
        return "Flow + Clear";
    }
  };

  const getColor = () => {
    switch (version) {
      case "01":
        return "bg-amber-500";
      case "02":
        return "bg-[#AAB9BC]";
      case "both":
        return "bg-gradient-to-r from-amber-500 to-[#AAB9BC]";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-clinical font-medium text-white ${getColor()}`}
    >
      {getLabel()}
    </span>
  );
}

export default function AthleteCard({
  athlete,
  compact = false,
}: AthleteCardProps) {
  if (compact) {
    // Compact view for featured section or list items
    return (
      <div className="neo-box overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
        {/* Photo */}
        <div className="h-48 w-full border-0 border-b-2 border-current/10 bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
          {athlete.photo ? (
            <img
              src={athlete.photo}
              alt={athlete.name}
              className="w-full h-full object-cover"
              style={{
                objectPosition: athlete.focalPoint
                  ? `${athlete.focalPoint.x}% ${athlete.focalPoint.y}%`
                  : "center",
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-30"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <h4 className="font-bold text-sm">{athlete.name}</h4>
            <p className="font-clinical text-xs opacity-70">
              {athlete.profession}
            </p>
          </div>

          {/* Top improvement */}
          {athlete.improvements[0] && (
            <div className="pt-2 border-t border-current/10">
              <p className="text-lg font-bold font-clinical text-emerald-600">
                {athlete.improvements[0].value}
              </p>
              <p className="font-clinical text-xs opacity-60">
                {athlete.improvements[0].metric}
              </p>
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
        {/* Large Photo */}
        <div className="h-80 lg:h-[400px] bg-gradient-to-br from-neutral-100 to-neutral-200 border-b-2 border-current/10 overflow-hidden">
          {athlete.photo ? (
            <img
              src={athlete.photo}
              alt={athlete.name}
              className="w-full h-full object-cover"
              style={{
                objectPosition: athlete.focalPoint
                  ? `${athlete.focalPoint.x}% ${athlete.focalPoint.y}%`
                  : "center",
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto mb-2 opacity-30"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <p className="font-clinical text-xs opacity-40 uppercase tracking-wider">
                  Athlete Photo
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">{athlete.name}</h2>
                {athlete.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-current/10 text-xs font-clinical">
                    Featured
                  </span>
                )}
              </div>
              <p className="font-clinical text-sm opacity-80">
                {athlete.profession}
              </p>
              {athlete.achievement && (
                <p className="font-clinical text-xs opacity-60 mt-1">
                  {athlete.achievement}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <ProductBadge version={athlete.productVersion} />
              {athlete.protocolUsed && (
                <span className="px-3 py-1 rounded-full border-2 border-current text-xs font-clinical">
                  {athlete.protocolUsed}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 pt-4 border-t border-current/10">
            <p className="text-sm leading-relaxed">{athlete.description}</p>
          </div>
        </div>
      </div>

      {/* Testing Period Info */}
      <div className="neo-box p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold font-clinical">
              {athlete.testsCompleted}
            </p>
            <p className="font-clinical text-xs opacity-70">Total Tests</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-clinical">
              {athlete.baselineTests}
            </p>
            <p className="font-clinical text-xs opacity-70">Baseline</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-clinical">
              {athlete.postBaselineTests}
            </p>
            <p className="font-clinical text-xs opacity-70">Post-Baseline</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-current/10 text-center">
          <p className="font-clinical text-sm opacity-70">
            {athlete.testingPeriod}
          </p>
        </div>
      </div>

      {/* Stats */}
      <AthleteStats athlete={athlete} />
    </div>
  );
}
