# Product Data Organization

Overview of how product data is organized and how to use helpers.

## Module Structure

Product data is split into focused modules with clear dependencies:

```
productTypes.ts       → Core types (no dependencies)
    ↓
productColors.ts      → Colors and gradients
productPricing.ts     → Pricing data and VAT/B2B constants
formulaContent.ts    → Formula content and struggle types
protocolContent.ts   → Protocol content
    ↓
productHelpers.ts    → Helper functions and utilities
```

**Barrel export:** `productData.ts` re-exports everything, so consumers continue using `from "@/app/lib/productData"`.

## Modules

### `productTypes.ts`
**Purpose:** Shared type definitions  
**Dependencies:** None  
**Exports:** `FormulaId`, `PackSize`, `PurchaseType`, `ProtocolId`, `ProtocolTier`, `B2BTier`, `ProductId`

### `productColors.ts`
**Purpose:** Colors, gradients, and color utilities  
**Dependencies:** `productTypes` (types only)  
**Exports:** `FORMULA_COLORS`, `PRODUCT_GRADIENTS`, `getProductGradient`, `getProductAccent`, `PROTOCOL_COLORS`, `getProtocolGradient`, `getProtocolAccent`, `interpolateHex`

### `productPricing.ts`
**Purpose:** All pricing data, VAT rates, and B2B constants  
**Dependencies:** `productTypes` (types only)  
**Exports:** `formulaPricing`, `protocolPricing`, `VAT_RATE`, `incVatToExVat`, `getVatFromIncVat`, `B2B_TIER_BANDS`, `B2B_SUBSCRIPTION_PRICE_EX_VAT`, `B2B_ONE_TIME_PRICE_EX_VAT`, `b2bFormulaPricing`, `B2B_PRICE_DISPLAY_INC_VAT`

### `formulaContent.ts`
**Purpose:** Formula content, struggle types, and clinical data  
**Dependencies:** `productTypes` (FormulaId)  
**Exports:** `StruggleId`, `RadarDataPoint`, `ClinicalStudy`, `StruggleSolution`, `Ingredient`, `ClinicalResult`, `FormulaBenefit`, `FormulaContent`, `formulaContent`, `STRUGGLE_OPTIONS`

### `protocolContent.ts`
**Purpose:** Protocol content and tier configurations  
**Dependencies:** `productTypes` (ProtocolId, ProtocolTier)  
**Exports:** `ProtocolTierConfig`, `ProtocolBenefitStat`, `ProtocolContent`, `protocolContent`

### `productHelpers.ts`
**Purpose:** Pure helper functions and calendar generation  
**Dependencies:** `productTypes`, `productPricing`, `protocolContent`  
**Exports:** `formatPrice`, `getFormulaPricing`, `getProtocolPricing`, `getBillingLabel`, `getB2BTier`, `getB2BFormulaPricing`, `getB2BProtocolPricing`, `formatPriceWithVAT`, `getB2BNextTierInfo`, `generateProtocolCalendarDays`

## Using Helpers

### Pricing Helpers

```typescript
import { getFormulaPricing, getProtocolPricing, formatPrice } from "@/app/lib/productData";

// Get formula pricing for a pack size and purchase type
const pricing = getFormulaPricing("28", "subscription");
// Returns: { price: number, priceExVat: number, billing: string }

// Get protocol pricing
const protocolPricing = getProtocolPricing("1", "pro", "subscription");
// Returns: { price: number, priceExVat: number, billing: string } | null

// Format price for display
const displayPrice = formatPrice(123.45); // "£123.45"
```

### B2B Helpers

```typescript
import { getB2BTier, getB2BFormulaPricing, getB2BProtocolPricing } from "@/app/lib/productData";

// Determine B2B tier from quantity
const tier = getB2BTier(50); // "starter" | "squad" | "elite"

// Get B2B pricing
const b2bPricing = getB2BFormulaPricing("01", "squad", "subscription");
const b2bProtocolPricing = getB2BProtocolPricing("1", "squad", "subscription");
```

### Calendar Generation

```typescript
import { generateProtocolCalendarDays } from "@/app/lib/productData";

// Generate calendar days for a protocol subscription
const calendarDays = generateProtocolCalendarDays(
  "1",           // protocolId
  "pro",         // tier
  "subscription", // purchaseType
  new Date()     // startDate
);
// Returns array of calendar day objects with dates, doses, and labels
```

### Color Helpers

```typescript
import { getProductGradient, getProductAccent, getProtocolGradient } from "@/app/lib/productData";

// Get gradient colors
const gradient = getProductGradient("01"); // { start: "#ffde59", end: "#ff914d" }
const protocolGradient = getProtocolGradient("1"); // { start: "#ff914d", end: "#ff3131" }

// Get accent color
const accent = getProductAccent("01"); // "#f59e0b"
```

## Import Pattern

**Always import from the barrel:**

```typescript
import {
  FormulaId,
  formulaContent,
  getFormulaPricing,
  formatPrice,
  PRODUCT_GRADIENTS,
} from "@/app/lib/productData";
```

This ensures:
- ✅ Tree-shaking works (bundler only includes what you use)
- ✅ No circular dependencies
- ✅ Consistent import paths across the codebase

## Key Principles

1. **No circular dependencies:** Types → Colors/Pricing/Content → Helpers only
2. **Single source of truth:** Each piece of data lives in one module
3. **Tree-shaking friendly:** Barrel uses `export *`, so unused modules aren't bundled
4. **Backward compatible:** All existing `from "@/app/lib/productData"` imports continue to work
