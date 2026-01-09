"use client";

import Image from "next/image";

export default function WinHero() {
  return (
    <section className="px-6 md:px-16 py-12 lg:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Win a Month&apos;s Supply of CONKA
          </h1>
          <p className="font-commentary text-xl md:text-2xl mb-3 opacity-90">
            Balance Protocol
          </p>
          <p className="text-base md:text-lg opacity-70 max-w-2xl mx-auto mb-6">
            Experience both formulas for a whole month. One shot daily for
            better thinking.
          </p>

          {/* Color accent badges */}
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-teal-500 rounded-full bg-teal-500/10">
              <div className="w-3 h-3 bg-teal-500 rounded-sm"></div>
              <span className="font-clinical text-xs font-medium">
                Conka Flow
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-amber-500 rounded-full bg-amber-500/10">
              <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
              <span className="font-clinical text-xs font-medium">
                Conka Clarity
              </span>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl h-48 sm:h-64 md:h-80">
            <Image
              src="/CONKA_16.jpg"
              alt="Conka Flow and Conka Clarity - Balance Protocol"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <p className="text-center font-commentary text-lg md:text-xl opacity-80 max-w-xl mx-auto">
          Enter for your chance to experience what elite athletes trust
        </p>
      </div>
    </section>
  );
}
