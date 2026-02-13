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
    <>
      <header className={`mb-8 md:mb-10 ${isMobile ? "text-right" : "max-w-[75%] text-right"}`}>
        <h2
          className="premium-section-heading mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {sectionTitle}
        </h2>
        <p className="premium-annotation opacity-70">{sectionSubtitle}</p>
      </header>

      {isMobile ? (
        <WhatToExpectTimelineMobile productId={productId} />
      ) : (
        <WhatToExpectTimelineDesktop productId={productId} />
      )}
    </>
  );
}
