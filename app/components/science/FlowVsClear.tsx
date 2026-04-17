"use client";

import Image from "next/image";
import { formulaComparison } from "@/app/lib/scienceData";
import { FORMULA_COLORS } from "@/app/lib/productColors";

interface FlowVsClearProps {
  isMobile?: boolean;
}

const FORMULA_IMAGES: Record<string, { src: string; alt: string }> = {
  "01": {
    src: "/lifestyle/ConkaDesk.jpg",
    alt: "CONKA Flow bottle on a desk beside a keyboard",
  },
  "02": {
    src: "/lifestyle/ConkaJeansHold.jpg",
    alt: "Hand holding a CONKA Clear bottle",
  },
};

export default function FlowVsClear({ isMobile = false }: FlowVsClearProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8 lg:mb-10">
        <p className="brand-caption uppercase tracking-widest text-black mb-3">
          Choose Your Formula
        </p>
        <h2 className="brand-h2 mb-0 tracking-tight">Flow vs Clear</h2>
        <p className="brand-body text-base lg:text-lg mt-2 text-black">
          Two formulas. Five pillars. Complete coverage together.
        </p>
      </div>

      {/* Formula cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
        {formulaComparison.map((formula) => {
          const colors = FORMULA_COLORS[formula.formula];
          const image = FORMULA_IMAGES[formula.formula];
          return (
            <div
              key={formula.formula}
              className="brand-card-bordered overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] lg:aspect-[3/2]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 lg:p-8">
                {/* Formula name + accent bar */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: colors.hex }}
                  />
                  <div>
                    <h3 className="brand-h3 mb-0 text-lg lg:text-xl">
                      {formula.name}
                    </h3>
                    <p className="brand-caption text-black">
                      {formula.tagline}
                    </p>
                  </div>
                </div>

                {/* Primary pillars */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {formula.primaryPillars.map((pillar) => (
                    <span
                      key={pillar}
                      className="brand-caption px-3 py-1 rounded-full border border-black/10"
                      style={{ backgroundColor: `${colors.hex}10` }}
                    >
                      {pillar}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="brand-body text-sm lg:text-base text-black">
                  {formula.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Combined banner */}
      <div
        className="brand-card-bordered p-4 lg:p-6 text-center"
        style={{ backgroundColor: "rgba(64, 88, 187, 0.04)" }}
      >
        <p className="brand-body text-base lg:text-lg text-black">
          <span className="font-semibold">Take both</span> for complete
          coverage across all five pillars. Circulation is the shared foundation
          in both formulas.
        </p>
      </div>
    </div>
  );
}
