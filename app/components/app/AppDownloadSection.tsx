"use client";

import { AppInstallButtons } from "@/app/components/AppInstallButtons";

export function AppDownloadSection() {
  return (
    <div className="bg-white border border-black/12 p-6 lg:p-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3 tabular-nums">
        Download · Free · iOS &amp; Android
      </p>
      <h2
        className="brand-h2 text-black mb-3 max-w-[20ch]"
        style={{ letterSpacing: "-0.02em" }}
      >
        Start measuring your brain today.
      </h2>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-8">
        Free to use · No subscription required · Core features included
      </p>

      <AppInstallButtons variant="clinical" />

      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/45 tabular-nums mt-6 max-w-md">
        Cambridge-derived cognitive testing · FDA cleared · Validated across NHS Memory Clinics
      </p>
    </div>
  );
}

export default AppDownloadSection;
