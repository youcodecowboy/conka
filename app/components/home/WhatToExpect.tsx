"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import WhatToExpectDesktop from "./WhatToExpectDesktop";
import WhatToExpectMobile from "./WhatToExpectMobile";

interface WhatToExpectProps {
  /** When set (PDP), show single product only and hide the Flow/Clear toggle. */
  productId?: "01" | "02";
}

export default function WhatToExpect({ productId }: WhatToExpectProps) {
  const isMobile = useIsMobile(1024);

  if (isMobile) {
    return <WhatToExpectMobile productId={productId} />;
  }

  return <WhatToExpectDesktop productId={productId} />;
}
