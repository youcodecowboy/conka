"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen px-6 md:px-16 pt-2 pb-12 flex flex-col">
      {/* Hero Content - Product Centered */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Main headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center">
          Make decisions faster.
        </h1>
        <p className="font-commentary text-xl md:text-2xl mb-3 text-center">
          clinically designed to optimize your <span className="underline decoration-[#AAB9BC]">brain</span>
        </p>

        {/* Center: Product Image */}
        <div className="relative mb-3">
          <Image
            src="/3.png"
            alt="Conka nootropic shot"
            width={500}
            height={625}
            className="w-[175px] h-auto md:w-[300px] lg:w-[400px] object-contain"
            priority
          />
        </div>

        {/* Clinical text */}
        <div className="mb-6 text-center max-w-6xl px-4">
          <p className="font-clinical text-sm md:text-base mb-1">
            backed by 250+ clinical studies
          </p>
          <p className="font-commentary italic text-lg md:text-xl lg:text-2xl whitespace-nowrap overflow-x-auto md:overflow-x-visible">
            upgrade focus + decrease anxiety + eliminate brain fog + improve sleep quality
          </p>
        </div>

        {/* CTA Buttons - Pill shaped, skinnier, wider */}
        <div className="flex flex-col items-center w-full max-w-md px-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button className="flex-1 px-8 py-2 rounded-full bg-black text-white font-commentary text-lg md:text-xl border-2 border-black hover:opacity-80 transition-all">
              Find Your Stack
            </button>
            <button className="flex-1 px-8 py-2 rounded-full bg-transparent text-black font-semibold text-base md:text-lg border-2 border-black hover:bg-black hover:text-white transition-all">
              buy CONKA
            </button>
          </div>
          {/* Scroll indicator */}
          <div className="text-center mt-3">
            <p className="font-commentary text-lg">scroll to explore</p>
            <div className="mt-2 animate-bounce">↓</div>
          </div>
        </div>
      </div>
    </section>
  );
}

