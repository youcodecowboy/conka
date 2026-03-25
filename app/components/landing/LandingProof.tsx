"use client";

import Image from "next/image";
import {
  athletes,
  getAverageImprovementAcrossAll,
  getAthleteById,
} from "@/app/lib/caseStudiesData";

const FUNNEL_URL = "/funnel";

// 4 featured athletes for the landing page
const PROOF_ATHLETE_IDS = [
  "jade-shekells",
  "finn-russell",
  "patrick-bamford",
  "jack-willis",
];

/**
 * Landing proof section — lightweight case study tiles.
 * Shows 4 athletes with photo + name + sport + improvement %.
 * Horizontal scroll on mobile, 4-col on desktop.
 *
 * Page wraps this in premium-section-luxury + premium-track.
 * Component is content-only.
 */
export default function LandingProof() {
  const proofAthletes = PROOF_ATHLETE_IDS.map((id) => getAthleteById(id)).filter(
    Boolean
  );
  const avgImprovement = getAverageImprovementAcrossAll();

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h2
          className="premium-section-heading"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Measured with a clinically validated test.^^
        </h2>
        <p className="text-sm mt-2 opacity-50">
          Cognitive test scores measured using the CONKA app&apos;s FDA-cleared assessment, developed from Cambridge University research. Individual results — many factors may influence test performance.
        </p>
      </div>

      {/* Avg improvement callout */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
        style={{
          backgroundColor: "var(--color-neuro-blue-light)",
          color: "var(--color-ink)",
        }}
      >
        <span className="text-sm font-bold">
          +{avgImprovement.toFixed(0)}%
        </span>
        <span className="text-xs opacity-60">
          average change in test scores^^
        </span>
      </div>

      {/* Athlete tiles — horizontal scroll mobile, 4-col desktop */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:gap-4">
        {proofAthletes.map((athlete) => {
          if (!athlete) return null;
          const topImprovement = athlete.improvements[0];

          return (
            <div
              key={athlete.id}
              className="flex-shrink-0 w-[160px] lg:w-auto overflow-hidden rounded-2xl"
              style={{
                backgroundColor: "var(--color-ink)",
              }}
            >
              {/* Photo */}
              {athlete.photo && (
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={athlete.photo}
                    alt={athlete.name}
                    fill
                    sizes="(max-width: 1024px) 160px, 25vw"
                    className="object-cover"
                    style={{
                      objectPosition: athlete.focalPoint
                        ? `${athlete.focalPoint.x}% ${athlete.focalPoint.y}%`
                        : "center top",
                    }}
                  />
                  {/* Gradient overlay at bottom */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(17,17,17,0.9) 0%, transparent 50%)",
                    }}
                  />
                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    {topImprovement && (
                      <span
                        className="text-lg font-bold"
                        style={{
                          backgroundImage: "var(--gradient-neuro-blue-accent)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        +{topImprovement.percentage}%
                      </span>
                    )}
                    <p className="text-white text-xs font-semibold mt-0.5">
                      {athlete.name}
                    </p>
                    <p className="text-white text-xs opacity-50">
                      {athlete.profession}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <a
          href={FUNNEL_URL}
          className="block w-full lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--gradient-neuro-blue-accent)" }}
        >
          See Your Options →
        </a>
      </div>
    </div>
  );
}
