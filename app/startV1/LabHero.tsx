import Image from "next/image";
import LabCTA from "./LabCTA";

const STATS = [
  {
    value: "32",
    label: "Peer-Reviewed\nStudies",
  },
  {
    value: "Informed\nSport",
    label: "Batch Tested\nCertified",
  },
  {
    value: "Cambridge\n+ Durham",
    label: "R&D\nOrigin",
  },
];

export default function LabHero() {
  return (
    <div>
      {/* Full-bleed hero — no rounding, bleeds to screen edges on mobile */}
      <div className="relative overflow-hidden -mx-5 w-[calc(100%+2.5rem)] lg:mx-0 lg:w-full aspect-[4/3] lg:aspect-[16/9]">
        <Image
          src="/lifestyle/CreationOfConka.jpg"
          alt="Two hands exchanging a CONKA brain performance shot"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 1024px) 95vw, 90vw"
          className="object-cover object-center"
        />

        {/* Gradient scrim — bottom-weighted so text overlay reads cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/5" />

        {/* Text overlay — bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 lg:max-w-3xl">
          <p className="font-mono text-[10px] lg:text-xs uppercase tracking-[0.25em] text-white/60 mb-3">
            Daily Brain Performance
          </p>
          <h1 className="text-white font-semibold text-3xl lg:text-5xl leading-[1.08] tracking-[-0.02em] mb-4">
            The only brain supplement<br className="hidden lg:block" /> you can measure.
          </h1>
          <p className="text-white/70 text-sm lg:text-base mb-6 max-w-md leading-relaxed">
            16 active ingredients. Two shots per day. Formulated at Cambridge and Durham.
          </p>
          <LabCTA>Get Started Today</LabCTA>
        </div>
      </div>

      {/* Clinical stat strip */}
      <div className="mt-5 grid grid-cols-3 divide-x divide-black/10 border border-black/10 rounded-[4px] overflow-hidden">
        {STATS.map((stat) => (
          <div key={stat.value} className="px-4 py-4 lg:px-6 lg:py-5">
            <p className="font-mono text-base lg:text-xl font-semibold text-black tracking-tight whitespace-pre-line leading-snug">
              {stat.value}
            </p>
            <p className="font-mono text-[9px] lg:text-[11px] uppercase tracking-[0.14em] text-black/45 mt-1.5 leading-snug whitespace-pre-line">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
