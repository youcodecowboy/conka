"use client";

import Image from "next/image";

export default function WinPrize() {
  return (
    <div className="px-4 md:px-16 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Product Image - Outside box, larger */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl h-64 sm:h-80 md:h-96">
            <Image
              src="/CONKA_16.jpg"
              alt="Conka Flow and Conka Clarity - Balance Protocol"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Text box - Narrower, centered */}
        <div className="max-w-md mx-auto">
          <div className="neo-box p-6 md:p-8">
            <p className="font-clinical text-xs uppercase opacity-70 mb-4">
              what you&apos;ll receive
            </p>
            <ul className="space-y-3 font-clinical text-sm">
              <li className="flex items-start gap-2">
                <span className="opacity-70">•</span>
                <span>1 month balance protocol</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-70">•</span>
                <span>12 shots of EACH formula </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-70">•</span>
                <span>full delivery — no cost</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
