"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import WhatToExpectDesktop from "./WhatToExpectDesktop";
import WhatToExpectMobile from "./WhatToExpectMobile";

export default function WhatToExpect() {
  const isMobile = useIsMobile(1024);

  if (isMobile) {
    return <WhatToExpectMobile />;
  }

  return <WhatToExpectDesktop />;
}
