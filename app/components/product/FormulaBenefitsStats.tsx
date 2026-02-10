"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import { FormulaId } from "@/app/lib/productData";
import FormulaBenefitsStatsDesktop from "./FormulaBenefitsStatsDesktop";
import FormulaBenefitsStatsMobile from "./FormulaBenefitsStatsMobile";

interface FormulaBenefitsStatsProps {
  formulaId: FormulaId;
}

export default function FormulaBenefitsStats({
  formulaId,
}: FormulaBenefitsStatsProps) {
  const isMobile = useIsMobile();

  // Avoid hydration mismatch: render desktop by default, then switch on client
  if (isMobile === undefined) {
    return <FormulaBenefitsStatsDesktop formulaId={formulaId} />;
  }

  return isMobile ? (
    <FormulaBenefitsStatsMobile formulaId={formulaId} />
  ) : (
    <FormulaBenefitsStatsDesktop formulaId={formulaId} />
  );
}
