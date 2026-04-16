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
          className="brand-h2 mb-0 mb-2"
          style={{ letterSpacing: "-0.02em" }}
        >
          {sectionTitle}
        </h2>
        <p className="brand-caption italic opacity-70">{sectionSubtitle}</p>
      </header>

      {isMobile ? (
        <WhatToExpectTimelineMobile productId={productId} />
      ) : (
        <WhatToExpectTimelineDesktop productId={productId} />
      )}
    </>
  );
}
