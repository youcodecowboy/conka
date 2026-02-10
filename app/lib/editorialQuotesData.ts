/**
 * Editorial quotes from publications about ingredients (not about CONKA).
 * One compelling quote per card; logos from public/logos; articleUrl for source.
 */

export type FormulaId = "01" | "02";

export interface EditorialQuote {
  id: string;
  quote: string;
  publicationName: string;
  publicationLogoUrl?: string;
  articleUrl?: string;
  ingredientTag: string;
  formulaIds: FormulaId[];
}

export const editorialQuotes: EditorialQuote[] = [
  {
    id: "gq-ashwagandha",
    quote:
      "Research into Ashwagandha has found a whole range of benefits, mostly around blocking stress hormones... I was able to fall gently back to sleep and work out like an angry Jason Statham the next day.",
    publicationName: "GQ",
    publicationLogoUrl: "/logos/GQ.avif",
    articleUrl:
      "https://www.gq-magazine.co.uk/article/fitness-supplements-benefits-1",
    ingredientTag: "Ashwagandha",
    formulaIds: ["01"],
  },
  {
    id: "forbes-rhodiola",
    quote:
      "The herb Rhodiola rosea is an adaptogen promoted to improve energy, balance mood and enhance brain function.",
    publicationName: "Forbes",
    publicationLogoUrl: "/logos/Forbes.avif",
    articleUrl: "https://www.forbes.com/health/supplements/best-nootropics/",
    ingredientTag: "Rhodiola rosea",
    formulaIds: ["01"],
  },
  {
    id: "mens-health-ginkgo",
    quote:
      "Supplements containing extracts of ginkgo biloba can improve the physical endurance of active young men... they were also found to recover more quickly afterwards.",
    publicationName: "Men's Health",
    publicationLogoUrl: "/logos/MensHealth.avif",
    articleUrl:
      "https://www.menshealth.com/uk/health/a36912268/biloba-and-rhodiola-rose-benefits-endurance/",
    ingredientTag: "Ginkgo biloba",
    formulaIds: ["02"],
  },
];

export function getEditorialQuotesForFormula(
  _formulaId: FormulaId,
): EditorialQuote[] {
  // For now show all quotes on both product pages; filter by formulaId when we have more data
  return editorialQuotes;
}
