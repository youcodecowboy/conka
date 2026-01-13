"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] md:min-h-screen px-4 sm:px-6 md:px-16 pt-8 sm:pt-10 md:pt-10 lg:pt-12 xl:pt-14 pb-8 md:pb-12 flex flex-col">
      {/* Hero Content - Product Centered */}
      <div className="flex-1 flex flex-col items-center justify-start md:justify-center pt-6 sm:pt-8 md:pt-2 lg:pt-4">
        {/* Top Section: Headlines */}
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-2 text-center">
            Make decisions faster.
          </h1>
          <p className="font-commentary text-xl sm:text-xl md:text-2xl mb-1 sm:mb-2 md:mb-1 text-center">
            clinically designed to optimize your{" "}
            <span className="underline decoration-amber-500">brain</span>
          </p>
        </div>

        {/* Center: Product Image - Scales proportionally across viewports */}
        <div className="relative flex items-center justify-center w-full my-1 sm:my-2 md:my-2">
          <Image
            src="/main.jpg"
            alt="Conka nootropic shot"
            width={500}
            height={625}
            className="w-[352px] sm:w-[396px] md:w-[380px] lg:w-[400px] xl:w-[450px] h-auto object-contain max-w-[85vw] sm:max-w-[80vw] md:max-w-none"
            priority
            sizes="(max-width: 640px) 352px, (max-width: 768px) 396px, (max-width: 1024px) 380px, (max-width: 1280px) 400px, 450px"
          />
        </div>

        {/* Clinical text */}
        <div className="mb-2 sm:mb-3 md:mb-4 text-center max-w-lg sm:max-w-xl md:max-w-6xl px-4">
          <p className="font-clinical text-sm md:text-base mb-1 sm:mb-2 md:mb-1">
            backed by 250+ clinical studies
          </p>
          <p className="font-commentary italic text-xl sm:text-xl md:text-xl lg:text-2xl">
            upgrade focus + reduce stress + eliminate brain fog + boost mental
            clarity
          </p>
        </div>

        {/* CTA Buttons - Pill shaped, always side-by-side */}
        <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-md px-4 mt-6 sm:mt-8 md:mt-0">
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
