"use client";

import { headlineStats } from "@/app/lib/scienceData";

interface ScienceHeroProps {
  isMobile?: boolean;
}

export default function ScienceHero({ isMobile = false }: ScienceHeroProps) {
  return (
    <section className={`${isMobile ? "px-4 py-12" : "px-16 py-20"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Main Header */}
        <div className={`${isMobile ? "mb-8" : "mb-12"}`}>
          <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
            The Science Behind Conka
          </p>
          <h1
            className={`font-bold leading-tight ${
              isMobile ? "text-3xl mb-3" : "text-5xl lg:text-6xl mb-4"
            }`}
          >
            Cognitive Performance,
            <br />
            <span className="font-commentary">rooted in science</span>
          </h1>
          <p
            className={`opacity-80 max-w-2xl ${
              isMobile ? "text-base" : "text-lg"
            }`}
          >
            Every ingredient in our formulas is backed by peer-reviewed clinical
            research. We've studied the science of adaptogens, nootropics, and
            neuroprotection to create a comprehensive approach to brain health.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className={`grid gap-4 ${
            isMobile ? "grid-cols-2" : "grid-cols-4"
          }`}
        >
          {headlineStats.map((stat, idx) => (
            <div
              key={idx}
              className="neo-box p-4 lg:p-6 text-center"
            >
              <p
                className={`font-bold font-clinical ${
                  isMobile ? "text-3xl" : "text-4xl lg:text-5xl"
                }`}
              >
                {stat.value}
                {stat.suffix && (
                  <span className="text-amber-500">{stat.suffix}</span>
                )}
              </p>
              <p className="font-clinical text-xs opacity-70 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Research Note */}
        <div className={`${isMobile ? "mt-6" : "mt-8"} neo-box p-4`}>
          <p className={`font-clinical ${isMobile ? "text-xs" : "text-sm"} opacity-80`}>
            <span className="font-bold">Note:</span> These statistics represent the combined body of research supporting our formulations—including Conka's proprietary clinical studies and peer-reviewed research from leading universities and medical institutions worldwide. All studies are indexed in PubMed.
          </p>
        </div>

        {/* Subtext */}
        <div className={`${isMobile ? "mt-4" : "mt-6"} flex flex-wrap gap-4 items-center`}>
          <span className="font-clinical text-xs px-3 py-1.5 border-2 border-current/20 rounded-full">
            Patent #GB2620279
          </span>
          <span className="font-clinical text-xs px-3 py-1.5 border-2 border-current/20 rounded-full">
            £500,000+ in Research
          </span>
          <span className="font-clinical text-xs px-3 py-1.5 border-2 border-current/20 rounded-full">
            PubMed Indexed Studies
          </span>
        </div>
      </div>
    </section>
  );
}

