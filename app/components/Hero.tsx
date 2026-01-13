"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] md:min-h-screen px-4 sm:px-6 md:px-16 pt-4 sm:pt-5 md:pt-5 lg:pt-6 xl:pt-7 pb-8 md:pb-12 flex flex-col">
      {/* Hero Content - Product Centered */}
      <div className="flex-1 flex flex-col items-center justify-start md:justify-center pt-3 sm:pt-4 md:pt-1 lg:pt-2">
        {/* Top Section: Headlines */}
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-2 text-center">
            Sustainable energy. Unstoppable clarity.
          </h1>
          <p className="font-clinical text-base sm:text-lg md:text-xl mb-1 sm:mb-2 md:mb-1 text-center">
            Clinically designed to optimize your{" "}
            <span className="underline decoration-amber-500">brain</span>.
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

        {/* Proof Cards - 3 Columns Desktop, Horizontal Row Mobile */}
        <div className="flex flex-row md:grid md:grid-cols-3 gap-2 sm:gap-3 md:gap-6 mb-2 sm:mb-3 md:mb-4 w-full max-w-6xl px-4">
          {/* Card 1: Patented Formula */}
          <div className="neo-box p-2 sm:p-3 md:p-5 lg:p-6 flex-1 flex flex-col items-center justify-center text-center">
            {/* Row 1: Icon + Label */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60 md:w-6 md:h-6"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div className="font-clinical text-[10px] sm:text-xs uppercase tracking-widest opacity-50">
                Unique
              </div>
            </div>
            {/* Row 2: Main Title */}
            <div className="text-xs sm:text-sm md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 min-h-[32px] sm:min-h-[36px] md:min-h-[60px] lg:min-h-[80px] flex items-center justify-center">
              Patented Nootropic Formula
            </div>
            {/* Row 3: Tertiary Detail */}
            <div className="font-clinical text-[10px] sm:text-xs md:text-sm opacity-50">
              #GB2620279
            </div>
          </div>

          {/* Card 2: Research Investment */}
          <div className="neo-box p-2 sm:p-3 md:p-5 lg:p-6 flex-1 flex flex-col items-center justify-center text-center">
            {/* Row 1: Icon + Label */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60 md:w-6 md:h-6"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <div className="font-clinical text-[10px] sm:text-xs uppercase tracking-widest opacity-50">
                Research
              </div>
            </div>
            {/* Row 2: Main Value */}
            <div className="font-clinical text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 min-h-[32px] sm:min-h-[36px] md:min-h-[60px] lg:min-h-[80px] flex items-center justify-center">
              £500K+
            </div>
            {/* Row 3: Tertiary Detail */}
            <div className="font-clinical text-[10px] sm:text-xs md:text-sm opacity-50">
              Durham & Cambridge
            </div>
          </div>

          {/* Card 3: Clinical Validation */}
          <div className="neo-box p-2 sm:p-3 md:p-5 lg:p-6 flex-1 flex flex-col items-center justify-center text-center">
            {/* Row 1: Icon + Label */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60 md:w-6 md:h-6"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div className="font-clinical text-[10px] sm:text-xs uppercase tracking-widest opacity-50">
                Validated
              </div>
            </div>
            {/* Row 2: Main Value */}
            <div className="font-clinical text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 min-h-[32px] sm:min-h-[36px] md:min-h-[60px] lg:min-h-[80px] flex items-center justify-center">
              25+
            </div>
            {/* Row 3: Tertiary Detail */}
            <div className="font-clinical text-[10px] sm:text-xs md:text-sm opacity-50">
              Clinical trials with elite teams
            </div>
          </div>
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
