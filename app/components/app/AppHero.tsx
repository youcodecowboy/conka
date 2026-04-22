"use client";

import Image from "next/image";
import { AppInstallButtons } from "@/app/components/AppInstallButtons";

const STATS = [
  { value: "1,000+", label: "Active users" },
  { value: "16%", label: "Avg. 30-day lift" },
  { value: "Free", label: "Always" },
];

export function AppHero() {
  return (
    <>
      <style jsx global>{`
        @keyframes appHeroFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes appHeroMount {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .app-hero-mount-left {
          animation: appHeroMount 0.6s ease-out forwards;
          opacity: 0;
        }
        .app-hero-mount-right {
          animation: appHeroMount 0.6s ease-out 0.12s forwards;
          opacity: 0;
        }
        .app-hero-float {
          animation: appHeroFloat 5s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Copy column */}
        <div className="app-hero-mount-left order-2 lg:order-1 lg:flex-1 mt-10 lg:mt-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3 tabular-nums">
            The CONKA App · Free · iOS &amp; Android
          </p>
          <h1
            className="brand-h1 text-black mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            The only supplement you can measure working.
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-6">
            3-min test · Wellness log · Measurable progress
          </p>

          <div className="space-y-4 max-w-xl">
            <p className="text-sm md:text-base text-black/75 leading-relaxed">
              A 3-minute cognitive test, a daily wellness log, and a measurable
              progress graph — tracked against your own data over time.
            </p>
          </div>

          {/* Spec strip — stats */}
          <div className="mt-8 grid grid-cols-3 gap-0 border border-black/12 bg-white max-w-lg">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`p-4 ${idx < STATS.length - 1 ? "border-r border-black/8" : ""}`}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/40 leading-none">
                  {stat.label}
                </p>
                <p className="font-mono text-2xl font-bold tabular-nums text-[#1B2757] mt-2 leading-none">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Install buttons */}
          <div className="mt-8">
            <AppInstallButtons variant="clinical" />
          </div>

          {/* Credibility line */}
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-black/45 tabular-nums max-w-md">
            Powered by Cambridge-derived cognitive testing · FDA cleared
          </p>
        </div>

        {/* Phone mockup column — figure plate */}
        <div className="app-hero-mount-right relative order-1 lg:order-2 lg:flex-[1.05] w-full">
          <div className="relative aspect-[4/5] lg:aspect-[5/6] border border-black/12 bg-[#f5f5f5] overflow-hidden flex items-center justify-center">
            <div className="relative h-[80%] w-auto app-hero-float">
              <Image
                src="/app/AppConkaRing.png"
                alt="CONKA app on iPhone showing cognitive test score"
                width={360}
                height={720}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-black/55 px-2 py-1 tabular-nums">
              Fig. 01 · App interface
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-black/55 px-2 py-1 tabular-nums">
              iOS · Android
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppHero;
