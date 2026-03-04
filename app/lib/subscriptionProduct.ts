/**
 * Single source of truth for subscription product display data.
 * Merges protocol/formula data from EditSubscriptionModal and PROTOCOL_INFO from utils.
 * Shopify variant IDs stay in the API route — none here.
 */

export type TierType = 'starter' | 'pro' | 'max';
export type FormulaId = '01' | '02';
export type PackSize = 4 | 8 | 12 | 28;

export interface TierInfo {
  name: string;
  frequency: string;
  price: number;
  pricePerShot: number;
  billing: string;
  deliveryShots: number;
}

export interface Protocol {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  tiers: Partial<Record<TierType, { flowCount: number; clarityCount: number; totalShots: number }>>;
}

// All 4 protocols with complete tier data.
// Descriptions come from utils.ts PROTOCOL_INFO (the longer versions).
// Tier breakdowns come from EditSubscriptionModal (includes totalShots).
export const PROTOCOLS: Protocol[] = [
  {
    id: '1',
    name: 'Resilience',
    subtitle: 'Build Resilience, Stay Sharp',
    description: 'Daily adaptogen support with stress management. Flow-heavy for recovery and stress resilience.',
    icon: 'shield',
    color: 'amber',
    tiers: {
      starter: { flowCount: 3, clarityCount: 1, totalShots: 4 },
      pro:     { flowCount: 5, clarityCount: 1, totalShots: 6 },
      max:     { flowCount: 6, clarityCount: 1, totalShots: 7 },
    },
  },
  {
    id: '2',
    name: 'Precision',
    subtitle: 'Peak Cognition, Zero Burnout',
    description: 'Sustained mental clarity for demanding work. Clarity-heavy for cognitive enhancement.',
    icon: 'bolt',
    color: 'teal',
    tiers: {
      starter: { flowCount: 1, clarityCount: 3, totalShots: 4 },
      pro:     { flowCount: 1, clarityCount: 5, totalShots: 6 },
      max:     { flowCount: 1, clarityCount: 6, totalShots: 7 },
    },
  },
  {
    id: '3',
    name: 'Balance',
    subtitle: 'The Best of Both Worlds',
    description: 'Comprehensive support with both formulas. Equal mix for all-round cognitive support.',
    icon: 'balance',
    color: 'mixed',
    tiers: {
      starter: { flowCount: 2, clarityCount: 2, totalShots: 4 },
      pro:     { flowCount: 3, clarityCount: 3, totalShots: 6 },
      max:     { flowCount: 4, clarityCount: 3, totalShots: 7 },
    },
  },
  {
    id: '4',
    name: 'Ultimate',
    subtitle: 'Maximum Power, Every Day',
    description: 'Peak performance with daily dual-formula stack. Both formulas every single day.',
    icon: 'crown',
    color: 'purple',
    tiers: {
      pro: { flowCount: 14, clarityCount: 14, totalShots: 28 }, // Per delivery (bi-weekly)
      max: { flowCount: 28, clarityCount: 28, totalShots: 56 }, // Per delivery (monthly)
    },
  },
];

// Individual formulas (single-formula subscriptions: switch between Flow/Clear at same pack size)
export const FORMULAS: { id: FormulaId; name: string; subtitle: string }[] = [
  { id: '01', name: 'CONKA Flow',  subtitle: 'Caffeine-Free Focus' },
  { id: '02', name: 'CONKA Clear', subtitle: 'Sharp Mind, Clear Head' },
];

export const FORMULA_PACK_SIZES: PackSize[] = [4, 8, 12, 28];

export const FORMULA_PACK_LABELS: Record<PackSize, string> = {
  4:  '4 shots',
  8:  '8 shots',
  12: '12 shots',
  28: '28 shots',
};

// Standard Protocols (1, 2, 3) — same tier structure, same pricing
export const STANDARD_TIERS: Record<TierType, TierInfo> = {
  starter: {
    name: 'Starter',
    frequency: 'Weekly',
    deliveryShots: 4,
    price: 11.99,
    pricePerShot: 3.0,
    billing: 'Billed weekly',
  },
  pro: {
    name: 'Pro',
    frequency: 'Bi-Weekly',
    deliveryShots: 12,
    price: 31.99,
    pricePerShot: 2.67,
    billing: 'Billed every 2 weeks',
  },
  max: {
    name: 'Max',
    frequency: 'Monthly',
    deliveryShots: 28,
    price: 63.99,
    pricePerShot: 2.29,
    billing: 'Billed monthly',
  },
};

// Ultimate Protocol (4) — different pricing and delivery cadence
export const ULTIMATE_TIERS: Partial<Record<TierType, TierInfo>> = {
  pro: {
    name: 'Pro',
    frequency: 'Bi-Weekly',
    deliveryShots: 28,
    price: 63.99,
    pricePerShot: 2.29,
    billing: 'Billed every 2 weeks',
  },
  max: {
    name: 'Max',
    frequency: 'Monthly',
    deliveryShots: 56,
    price: 115.99,
    pricePerShot: 2.07,
    billing: 'Billed monthly',
  },
};

/** Get tier pricing/delivery info for a given protocol + tier */
export function getTierInfo(protocolId: string, tier: TierType): TierInfo | undefined {
  if (protocolId === '4') return ULTIMATE_TIERS[tier];
  return STANDARD_TIERS[tier];
}

/** Get the list of valid tiers for a given protocol */
export function getAvailableTiers(protocolId: string): TierType[] {
  if (protocolId === '4') return ['pro', 'max'];
  return ['starter', 'pro', 'max'];
}

/** Get the formula shot breakdown for a protocol tier */
export function getFormulaBreakdown(
  protocolId: string,
  tier: TierType,
): { flowCount: number; clarityCount: number; totalShots: number } | null {
  const protocol = PROTOCOLS.find((p) => p.id === protocolId);
  if (!protocol) return null;
  return protocol.tiers[tier] ?? null;
}
