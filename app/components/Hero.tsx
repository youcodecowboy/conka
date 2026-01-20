"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-0 md:min-h-0 px-4 sm:px-6 md:px-16 pt-2 sm:pt-5 md:pt-12 lg:pt-5 xl:pt-6 pb-2 mb-2 md:pb-12 md:mb-0 flex flex-col">
      {/* Hero Content - Product Centered */}
      <div className="flex flex-col items-center justify-start md:justify-start pt-2 sm:pt-2 md:pt-0 lg:pt-1">
        {/* Top Section: Headlines */}
        <div className="w-full mb-1 sm:mb-3 md:mb-2">
          <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 md:mb-2 text-center">
            Sustainable Energy. Unstoppable Clarity.
          </h1>
          <p className="font-clinical text-xs sm:text-base md:text-lg mb-0 sm:mb-2 md:mb-1 text-center">
            Clinically designed to optimize your{" "}
            <span className="underline decoration-amber-500">brain</span>.
          </p>
        </div>

        {/* Center: Product Image - Scales proportionally across viewports */}
        <div className="relative flex items-center justify-center w-full my-0.5 sm:my-2 md:my-1">
          <Image
            src="/HeroImage.jpg"
            alt="CONKA nootropic shot"
            width={500}
            height={625}
            className="w-[300px] sm:w-[396px] md:w-[380px] lg:w-[400px] xl:w-[450px] h-auto md:h-auto max-h-[260px] md:max-h-none object-cover object-center max-w-[85vw] sm:max-w-[80vw] md:max-w-none"
            priority
            sizes="(max-width: 640px) 300px, (max-width: 768px) 396px, (max-width: 1024px) 380px, (max-width: 1280px) 400px, 450px"
          />
        </div>

        {/* Benefits Section - Tighter spacing */}
        <div className="flex flex-col items-center w-full max-w-2xl px-4 mb-1 sm:mb-4 md:mb-4 text-center">
          {/* <p className="font-clinical text-sm md:text-base mb-1 sm:mb-2 md:mb-1">
            backed by 250+ clinical studies
          </p> */}
          <p className="font-clinical text-sm sm:text-lg md:text-xl lg:text-2xl leading-tight">
            Upgrade Focus + Reduce Stress + Eliminate Brain Fog + Boost Mental
            Clarity
          </p>
        </div>

        {/* CTA Button - Single decision - Reduced top margin */}
        <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-md px-4 mt-2 sm:mt-6 md:mt-4 mb-0 sm:mb-6 md:mb-6">
          <div className="w-full max-w-[280px] sm:max-w-none mb-2 sm:mb-5 md:mb-3">
            <a
              href="#trial-packs"
              className="block w-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-2.5 rounded-full bg-amber-500 text-black font-semibold text-base md:text-lg border-2 border-amber-500 hover:bg-amber-600 hover:border-amber-600 transition-all text-center"
            >
              Buy CONKA
            </a>
          </div>
          {/* Scroll indicator - smaller on mobile */}
          <div className="text-center">
            <p className="font-commentary text-sm md:text-lg">
              scroll to explore
            </p>
            <div className="mt-0.5 sm:mt-2 md:mt-2 animate-bounce text-lg md:text-xl">
              ↓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
