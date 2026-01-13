"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] md:min-h-0 px-4 sm:px-6 md:px-16 pt-4 sm:pt-5 md:pt-12 lg:pt-5 xl:pt-6 pb-8 md:pb-12 flex flex-col">
      {/* Hero Content - Product Centered */}
      <div className="flex-1 flex flex-col items-center justify-start md:justify-start pt-1 sm:pt-2 md:pt-0 lg:pt-1">
        {/* Top Section: Headlines */}
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-2 text-center">
            Sustainable energy. Unstoppable clarity.
          </h1>
          <p className="font-clinical text-sm sm:text-base md:text-lg mb-1 sm:mb-2 md:mb-1 text-center">
            Clinically designed to optimize your{" "}
            <span className="underline decoration-amber-500">brain</span>.
          </p>
        </div>

        {/* Center: Product Image - Scales proportionally across viewports */}
        <div className="relative flex items-center justify-center w-full my-1 sm:my-2 md:my-1">
          <Image
            src="/HeroImage.jpg"
            alt="Conka nootropic shot"
            width={500}
            height={625}
            className="w-[352px] sm:w-[396px] md:w-[380px] lg:w-[400px] xl:w-[450px] h-auto object-contain max-w-[85vw] sm:max-w-[80vw] md:max-w-none"
            priority
            sizes="(max-width: 640px) 352px, (max-width: 768px) 396px, (max-width: 1024px) 380px, (max-width: 1280px) 400px, 450px"
          />
        </div>

        {/* Benefits Section */}
        <div className="flex flex-col items-center w-full max-w-2xl px-4 mb-3 sm:mb-4 md:mb-4 text-center">
          {/* <p className="font-clinical text-sm md:text-base mb-1 sm:mb-2 md:mb-1">
            backed by 250+ clinical studies
          </p> */}
          <p className="font-clinical text-sm sm:text-lg md:text-xl lg:text-2xl">
            upgrade focus + reduce stress + eliminate brain fog + boost mental
            clarity
          </p>
        </div>

        {/* CTA Buttons - Pill shaped, always side-by-side */}
        <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-md px-4 mt-4 sm:mt-6 md:mt-4 mb-4 sm:mb-6 md:mb-6">
          <div className="flex flex-row gap-3 sm:gap-4 md:gap-3 w-full mb-4 sm:mb-5 md:mb-3">
            <a
              href="/quiz"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-2.5 rounded-full bg-amber-500 text-black font-semibold text-base md:text-lg border-2 border-amber-500 hover:bg-amber-600 hover:border-amber-600 transition-all whitespace-nowrap"
            >
              Take the Quiz
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="#protocols"
              className="flex-1 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-2.5 rounded-full bg-transparent text-black font-semibold text-base md:text-lg border-2 border-black hover:bg-black hover:text-white transition-all text-center"
            >
              buy CONKA
            </a>
          </div>
          {/* Scroll indicator */}
          <div className="text-center">
            <p className="font-commentary text-base md:text-lg">
              scroll to explore
            </p>
            <div className="mt-1 sm:mt-2 md:mt-2 animate-bounce">↓</div>
          </div>
        </div>
      </div>
    </section>
  );
}
