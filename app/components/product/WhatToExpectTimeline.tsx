"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import type { ProductId } from "@/app/lib/productData";
import WhatToExpectTimelineDesktop from "./WhatToExpectTimelineDesktop";
import WhatToExpectTimelineMobile from "./WhatToExpectTimelineMobile";

interface WhatToExpectTimelineProps {
  productId: ProductId;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export default function WhatToExpectTimeline({
  productId,
  sectionTitle = "What to expect",
  sectionSubtitle = "your transformation timeline",
}: WhatToExpectTimelineProps) {
  const isMobile = useIsMobile(1024);

  return (
    <section className="premium-section px-4 md:px-6 lg:px-8" aria-label={sectionTitle}>
      <div className="w-full max-w-full mx-auto lg:max-w-[1600px]">
        <header className="max-w-[75%] text-right mb-8 md:mb-10">
          <h2 className="premium-section-heading mb-2">{sectionTitle}</h2>
          <p className="premium-annotation opacity-70">{sectionSubtitle}</p>
        </header>

        {isMobile ? (
          <WhatToExpectTimelineMobile productId={productId} />
        ) : (
          <WhatToExpectTimelineDesktop productId={productId} />
        )}
      </div>
    </section>
  );
}
