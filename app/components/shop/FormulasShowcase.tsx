"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import type { FormulaId } from "@/app/lib/productData";
import FormulasShowcaseMobile from "./FormulasShowcaseMobile";
import FormulasShowcaseDesktop from "./FormulasShowcaseDesktop";

export interface FormulasShowcaseProps {
  /** When set (e.g. on a formula PDP), only show the other formula(s) — exclude this one from cross-sell */
  excludeFormulaId?: FormulaId;
}

export default function FormulasShowcase({ excludeFormulaId }: FormulasShowcaseProps) {
  const isMobile = useIsMobile(1024);

  if (isMobile) {
    return <FormulasShowcaseMobile excludeFormulaId={excludeFormulaId} />;
  }

  return <FormulasShowcaseDesktop excludeFormulaId={excludeFormulaId} />;
}
