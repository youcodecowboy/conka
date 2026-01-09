"use client";

import Image from "next/image";

export default function WinPrize() {
  return (
    <div className="px-6 md:px-16 py-4 md:py-6">
      <div className="max-w-2xl mx-auto">
        <div className="neo-box p-6 md:p-8">
          {/* Product Image */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-xl h-48 sm:h-64 md:h-80">
              <Image
                src="/CONKA_16.jpg"
                alt="Conka Flow and Conka Clarity - Balance Protocol"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

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
  );
}
