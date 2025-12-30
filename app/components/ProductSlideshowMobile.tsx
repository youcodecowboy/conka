"use client";

export default function ProductSlideshowMobile() {
  return (
    <section className="py-6 md:hidden">
      {/* Image Carousel - Edge to Edge */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4">
          {/* Placeholder Image 1 */}
          <div className="flex-shrink-0 w-64 h-40 rounded-xl bg-gradient-to-br from-black/5 to-black/10 border-2 border-black/10 flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-30">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="font-clinical text-xs opacity-40">[PRODUCT LIFESTYLE]</p>
            </div>
          </div>
          {/* Placeholder Image 2 */}
          <div className="flex-shrink-0 w-64 h-40 rounded-xl bg-gradient-to-br from-[#AAB9BC]/20 to-[#AAB9BC]/30 border-2 border-[#AAB9BC]/30 flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-30">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="font-clinical text-xs opacity-40">[BOTH FORMULAS]</p>
            </div>
          </div>
          {/* Placeholder Image 3 */}
          <div className="flex-shrink-0 w-64 h-40 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/20 border-2 border-amber-500/20 flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-30">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="font-clinical text-xs opacity-40">[IN ACTION]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

