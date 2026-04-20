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
      {/* Split: column on mobile (image top), row on desktop (text left / image right) */}
      <div className="flex flex-col lg:flex-row lg:gap-12 lg:items-stretch">

        {/* Text column — below image on mobile, left on desktop */}
        <div className="order-2 lg:order-1 lg:flex-1 flex flex-col justify-center mt-7 lg:mt-0 lg:py-8">
          <p className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.25em] text-black/40 mb-5">
            Clinical Formula
          </p>
          <p className="text-black/55 text-sm lg:text-base mb-7 max-w-sm leading-relaxed">
            16 active ingredients. Two shots per day. Formulated at Cambridge and Durham.
          </p>
          <LabCTA>Get Started Today</LabCTA>
        </div>

        {/* Image column — full-bleed on mobile, right column on desktop */}
        <div className="order-1 lg:order-2 lg:flex-[1.5] relative overflow-hidden
          -mx-5 w-[calc(100%+2.5rem)] aspect-[4/3]
          lg:mx-0 lg:w-auto lg:aspect-[4/5] lg:lab-asset-frame">
          <Image
            src="/lifestyle/CreationOfConka.jpg"
            alt="Two hands exchanging a CONKA brain performance shot"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />

          {/* H1 — top-left overlay, black text on light bg */}
          <div className="absolute top-4 left-4 right-4 lg:top-6 lg:left-6 lg:right-10">
            <h1 className="text-black font-semibold text-2xl lg:text-[2.25rem] leading-[1.1] tracking-[-0.025em]">
              The only brain supplement<br className="hidden lg:block" /> you can measure.
            </h1>
          </div>

          {/* Label — bottom-left overlay */}
          <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
            <p className="font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.22em] text-black/50">
              Daily Brain Performance
            </p>
          </div>
        </div>
      </div>

      {/* Stat strip — full width below both columns */}
      <div className="lab-asset-frame mt-8 grid grid-cols-1 lg:grid-cols-3
        divide-y lg:divide-y-0 lg:divide-x divide-black/8 overflow-hidden">
        {STATS.map((stat) => (
          <div
            key={stat.value}
            className="flex items-center gap-5 px-5 py-4 lg:flex-col lg:items-start lg:gap-1 lg:px-6 lg:py-5"
          >
            <p className="font-mono text-base lg:text-xl font-bold text-black tracking-tight whitespace-pre-line leading-snug min-w-[5.5rem] lg:min-w-0">
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
