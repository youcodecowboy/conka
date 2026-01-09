"use client";

export default function WinPrize() {
  return (
    <div className="px-6 md:px-16 py-4 md:py-6">
      <div className="max-w-2xl mx-auto">
        <div className="neo-box p-6 md:p-8">
          <p className="font-clinical text-xs uppercase opacity-70 mb-4">
            what you&apos;ll receive
          </p>
          <ul className="space-y-3 font-clinical text-sm">
            <li className="flex items-start gap-2">
              <span className="opacity-70">•</span>
              <span>30-day personalised protocol</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="opacity-70">•</span>
              <span>full delivery — no cost</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="opacity-70">•</span>
              <span>ongoing guidance as you respond</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
