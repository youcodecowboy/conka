"use client";

import { useState } from "react";
import { AthleteData, getCaseStudyPhotoPath } from "@/app/lib/caseStudiesData";
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
  const [photoError, setPhotoError] = useState(false);

  if (compact) {
    const photoSrc = getCaseStudyPhotoPath(athlete.id) || athlete.photo;
    const showPlaceholder = !photoSrc || photoError;
    return (
      <div className="premium-card-soft premium-card-soft-stroke overflow-hidden hover:opacity-90 transition-opacity cursor-pointer p-0">
        <div className="h-48 w-full border-0 border-b border-[var(--color-premium-stroke)] bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
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
              className="w-full h-full object-cover"
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
          <div className="mb-2">
            <h4 className="font-bold text-sm text-[var(--text-on-light)]">{athlete.name}</h4>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">
              {athlete.profession}
            </p>
          </div>
          {athlete.improvements[0] && (
            <div className="pt-2 border-t border-[var(--color-premium-stroke)]">
              <p className="text-lg font-bold font-clinical text-emerald-600">
                {athlete.improvements[0].value}
              </p>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                {athlete.improvements[0].metric}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full detailed view
  const photoSrc = getCaseStudyPhotoPath(athlete.id) || athlete.photo;
  const showPlaceholder = !photoSrc || photoError;
  return (
    <div className="space-y-6">
      <div className="premium-card-soft premium-card-soft-stroke overflow-hidden p-0">
        <div className="h-80 lg:h-[400px] bg-gradient-to-br from-neutral-100 to-neutral-200 border-b border-[var(--color-premium-stroke)] overflow-hidden">
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
              className="w-full h-full object-cover"
              style={{
                objectPosition: athlete.focalPoint
                  ? `${athlete.focalPoint.x}% ${athlete.focalPoint.y}%`
                  : "center",
              }}
              onError={() => setPhotoError(true)}
            />
          )}
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-[var(--text-on-light)]">{athlete.name}</h2>
                {athlete.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-black/10 text-xs font-clinical text-[var(--text-on-light)]">
                    Featured
                  </span>
                )}
              </div>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                {athlete.profession}
              </p>
              {athlete.achievement && (
                <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">
                  {athlete.achievement}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <ProductBadge version={athlete.productVersion} />
              {athlete.protocolUsed && (
                <span className="px-3 py-1 rounded-full border-2 border-[var(--color-premium-stroke)] text-xs font-clinical text-[var(--text-on-light)]">
                  {athlete.protocolUsed}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--color-premium-stroke)]">
            <p className="premium-body text-[var(--text-on-light)] leading-relaxed">
              {athlete.description}
            </p>
          </div>
        </div>
      </div>

      <div className="premium-card-soft premium-card-soft-stroke p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold font-clinical text-[var(--text-on-light)]">
              {athlete.testsCompleted}
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">Total Tests</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-clinical text-[var(--text-on-light)]">
              {athlete.baselineTests}
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">Baseline</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-clinical text-[var(--text-on-light)]">
              {athlete.postBaselineTests}
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">Post-Baseline</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[var(--color-premium-stroke)] text-center">
          <p className="premium-body-sm text-[var(--text-on-light-muted)]">
            {athlete.testingPeriod}
          </p>
        </div>
      </div>

      <AthleteStats athlete={athlete} />
    </div>
  );
}
