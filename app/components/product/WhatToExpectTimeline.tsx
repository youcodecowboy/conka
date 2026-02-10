"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import WhatToExpectTimelineDesktop from "./WhatToExpectTimelineDesktop";
import WhatToExpectTimelineMobile from "./WhatToExpectTimelineMobile";
import type { FormulaId } from "@/app/lib/productData";

interface WhatToExpectTimelineProps {
  formulaId: FormulaId;
}

export default function WhatToExpectTimeline({ formulaId }: WhatToExpectTimelineProps) {
  const isMobile = useIsMobile(1024);

  return (
    <section className="premium-section px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-full mx-auto lg:max-w-[1600px]">
        <header className="max-w-[75%] text-right mb-8 md:mb-10">
          <h2 className="premium-section-heading mb-2">What to expect</h2>
          <p className="premium-annotation opacity-70">your transformation timeline</p>
        </header>

        {isMobile ? (
          <WhatToExpectTimelineMobile formulaId={formulaId} />
        ) : (
          <WhatToExpectTimelineDesktop formulaId={formulaId} />
        )}
      </div>
    </section>
  );
}
