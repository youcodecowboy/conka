import Image from "next/image";
import LabCTA from "./LabCTA";

const STATS = [
  { value: "32", label: "PEER-REVIEWED\nSTUDIES" },
  { value: "INFORMED\nSPORT", label: "BATCH TESTED\nCERTIFIED" },
  { value: "CAMBRIDGE\n+ DURHAM", label: "R&D\nORIGIN" },
];

export default function LabHero() {
  return (
    <div>
      {/* Full-bleed image — no text overlay, light bg reads cleanly without scrim */}
      <div className="relative overflow-hidden -mx-5 w-[calc(100%+2.5rem)] lg:mx-0 lg:w-full aspect-[4/3] lg:aspect-[16/7]">
        <Image
          src="/lifestyle/CreationOfConka.jpg"
          alt="Two hands exchanging a CONKA brain performance shot"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 1024px) 100vw, 90vw"
          className="object-cover object-center"
        />
      </div>

      {/* Text block — below image, black on white */}
      <div className="mt-8 lg:mt-10 lg:max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/40 mb-3">
          Daily Brain Performance
        </p>
        <h1 className="text-black font-semibold text-3xl lg:text-5xl leading-[1.08] tracking-[-0.02em] mb-4">
          The only brain supplement<br className="hidden lg:block" /> you can measure.
        </h1>
        <p className="text-black/55 text-sm lg:text-base mb-8 max-w-lg leading-relaxed">
          16 active ingredients. Two shots per day. Formulated at Cambridge and Durham.
        </p>
        <LabCTA>Get Started Today</LabCTA>
      </div>

      {/* Clinical stat strip — stacked on mobile, 3-col on desktop */}
      <div className="lab-asset-frame mt-10 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-black/8 overflow-hidden">
        {STATS.map((stat) => (
          <div
            key={stat.value}
            className="flex items-center gap-5 px-5 py-4 lg:flex-col lg:items-start lg:gap-1 lg:px-6 lg:py-5"
          >
            <p className="font-mono text-base lg:text-xl font-bold text-black tracking-tight whitespace-pre-line leading-snug min-w-[5rem] lg:min-w-0">
              {stat.value}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/40 leading-snug whitespace-pre-line lg:mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
