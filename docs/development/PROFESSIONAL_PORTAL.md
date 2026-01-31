# Professional Portal Implementation Plan

**Created:** January 28, 2026  
**Status:** In Progress (Phases 1-4 Complete, Phase 5 Mostly Complete)  
**Feature Branch:** `professional-portal`

---

## Progress Summary

### ✅ Completed Phases

- **Phase 1: Navigation & Gateway Page** - ✅ Complete
  - Navigation links added (desktop & mobile)
  - Gateway page created with mode selection cards
  - Case studies integrated
  
- **Phase 2: Individual Purchase - Protocols** - ✅ Complete
  - Protocol selector with horizontal banner layout
  - Expanded protocol views with inline purchase controls
  - Tier selector and subscription toggle
  
- **Phase 3: Individual Purchase - Formulas** - ✅ Complete
  - Formula selector matching protocol style
  - Expanded formula views
  - Case studies section always visible
  
- **Phase 4: Bulk Purchase Page** - ✅ Complete
  - Two large formula cards (Flow & Clear)
  - Quantity incrementer with shots count
  - Subscription pricing with slashed prices
  - Side-by-side comparison sections
  - Mobile toggle for all sections
  
- **Phase 5: Mobile Optimization** - ✅ Mostly Complete
  - Mobile layouts implemented
  - Touch targets optimized
  - Horizontal scroll for selectors
  - Pending: Device testing (iOS Safari, Android Chrome)

### 🔄 Remaining Work

- **Phase 6: Testing & Documentation** - ⏳ Pending
  - End-to-end testing
  - Cross-browser testing
  - Performance audit
  - Documentation updates

---

## Overview

Build a Professional Purchasing Portal that enables trusted professionals (nutritionists, physios, S&C coaches, clubs, teams, clinics) to purchase CONKA products for individuals or at scale. This is a soft-gated entry point that becomes a natural destination for professional buyers.

**Key Principles:**
- **Calm, precise, confident** tone (infrastructure, not marketing)
- **Reuse existing components** where possible
- **Same pricing/copy as DTC** initially (can differentiate later)
- **No visual distinction** from DTC pages
- **Mobile-first** with desktop parity

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Navigation                                │
│  Shop Dropdown → "For Professionals" link (bottom)          │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              /professionals (Gateway Page)                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Context: Who this is for                             │  │
│  │  Case Studies: Select highlighted athletes            │  │
│  │  ┌──────────────────┐  ┌──────────────────┐          │  │
│  │  │ Individual Mode  │  │ Bulk/Team Mode   │          │  │
│  │  │ Purchase for     │  │ Purchase for     │          │  │
│  │  │ Individuals      │  │ Teams/Clubs     │          │  │
│  │  └──────────────────┘  └──────────────────┘          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▼
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│ /professionals/protocol   │    │ /professionals/bulk      │
│                          │    │                          │
│ Protocols Section        │    │ Bulk Box Builder         │
│ - Inline purchase cards  │    │ - 28 Flow + 28 Clear    │
│ - Pack size selector     │    │ - Quantity incrementer   │
│ - Subscription toggle    │    │ - Pricing per box        │
│ - Add to cart inline     │    │ - Add boxes to cart      │
│                          │    │                          │
│ Formulas Section         │    │                          │
│ - Same as above          │    │                          │
└──────────────────────────┘    └──────────────────────────┘
```

---

## Data Flow

### Individual Purchase Flow
```
User selects protocol/formula
        ▼
Inline purchase component shows:
  - Pack size options (12, 30, etc.)
  - Subscription vs one-time toggle
  - Pricing displayed inline
        ▼
User selects pack + purchase type
        ▼
Clicks "Add to Cart"
        ▼
Cart drawer opens automatically
        ▼
User can continue shopping or checkout
```

### Bulk Purchase Flow
```
User views bulk page
        ▼
Sees "Bulk Box" definition:
  - 28 shots CONKA Flow
  - 28 shots CONKA Clear
  - Price per box displayed
        ▼
User increments quantity (+/- buttons)
        ▼
Clicks "Add X Boxes to Cart"
        ▼
Cart drawer opens with multiple items
```

---

## Phases

### Phase 1: Navigation & Gateway Page

**Branch:** `professional-portal/phase-1-gateway`

#### Tasks

- [x] Add "For Professionals" link to Shop dropdown menu (desktop)
- [x] Add "For Professionals" link to mobile navigation menu
- [x] Create `/app/professionals/page.tsx` gateway page
- [x] Create gateway page components (desktop + mobile)
- [x] Integrate case studies section (reuse homepage pattern)
- [x] Create mode selection cards (Individual vs Bulk)

#### Navigation Updates

**Desktop (`NavigationDesktop.tsx`):**
- Add "For Professionals" link at bottom of ShopMegaMenu
- Copy: "Purchasing for a team or individual?"
- Link to `/professionals`

**Mobile (`NavigationMobile.tsx`):**
- Add "For Professionals" link in shop section
- Same copy and link

#### Gateway Page Structure

**Desktop:**
```
┌─────────────────────────────────────────────────────────────┐
│  px-16 py-16                                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  max-w-6xl mx-auto                                    │ │
│  │                                                        │ │
│  │  Section 1: Context                                   │ │
│  │  - Heading: "For Professionals"                        │ │
│  │  - Subtext: "CONKA protocols are already used..."     │ │
│  │  - Description: Who this is for                        │ │
│  │                                                        │ │
│  │  Section 2: Case Studies (Optional)                   │ │
│  │  - Reuse CaseStudiesDataDriven component              │ │
│  │  - Show select highlighted athletes                   │ │
│  │  - Link to /case-studies                              │ │
│  │                                                        │ │
│  │  Section 3: Mode Selection                            │ │
│  │  ┌──────────────────────┐  ┌──────────────────────┐  │ │
│  │  │  Individual Mode     │  │  Bulk/Team Mode      │  │ │
│  │  │  Icon + Heading      │  │  Icon + Heading      │  │ │
│  │  │  Description         │  │  Description         │  │ │
│  │  │  CTA Button          │  │  CTA Button          │  │ │
│  │  └──────────────────────┘  └──────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Mobile:**
- Single column layout
- Stacked mode cards (full width)
- Simplified case studies (if included)

#### Components to Create

```
app/components/professionals/
├── index.ts
├── types.ts
├── ProfessionalsGateway.tsx          # Desktop wrapper
├── ProfessionalsGatewayMobile.tsx   # Mobile wrapper
├── ModeSelectionCard.tsx             # Reusable card component
└── ProfessionalsContext.tsx         # Context section
```

#### Copy/Content

**Gateway Page Heading:** "For Professionals"  
**Subtext:** "CONKA protocols are already used in elite performance environments. This portal allows professionals to purchase for individuals or teams."

**Individual Mode:**
- Heading: "Purchase for an Individual"
- Description: "For nutritionists, physios, S&C coaches working 1-to-1"
- CTA: "Purchase for an Individual"

**Bulk Mode:**
- Heading: "Bulk / Team Purchase"
- Description: "For clubs, academies, teams, clinics"
- CTA: "Bulk & Team Orders"

#### Acceptance Criteria

- [x] "For Professionals" link visible in Shop dropdown (desktop)
- [x] "For Professionals" link visible in mobile nav
- [x] Gateway page accessible at `/professionals`
- [x] Context section explains purpose clearly
- [x] Case studies section displays (if included)
- [x] Two mode cards displayed side-by-side (desktop) or stacked (mobile)
- [x] CTAs navigate to correct paths
- [x] Mobile layout works correctly
- [x] No visual distinction from DTC pages
- [x] Matches neo-brutalist style guide

**Status:** ✅ **COMPLETED**

---

### Phase 2: Individual Purchase Page - Protocols Section

**Branch:** `professional-portal/phase-2-individual-protocols`

**Note:** Implementation differs from original plan. Instead of inline purchase cards, we implemented a selector-based approach:
- Horizontal protocol selector (black banner, compact cards)
- Selected protocol expands to show full product sections (Hero, Calendar, Benefits)
- Inline purchase controls (tier selector, subscription toggle, add to cart)
- No auto-selection on mount

#### Tasks

- [x] Create `/app/professionals/protocol/page.tsx`
- [x] Create protocol selector component
- [x] Build expanded protocol view with existing product sections
- [x] Implement tier selector (Starter, Pro, Max)
- [x] Implement subscription vs one-time toggle
- [x] Display pricing inline
- [x] Connect to cart context
- [x] Create mobile versions (horizontal scroll for selector)

#### Page Structure

**Desktop:**
```
┌─────────────────────────────────────────────────────────────┐
│  Protocols Section                                          │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Section Header                                       │ │
│  │  - Heading: "Protocols"                               │ │
│  │  - Subtext: Professional context copy                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Protocol Grid (2x2)                                   │ │
│  │  ┌──────────────┐  ┌──────────────┐                  │ │
│  │  │ Protocol 1   │  │ Protocol 2   │                  │ │
│  │  │ - Image     │  │ - Image     │                  │ │
│  │  │ - Name      │  │ - Name      │                  │ │
│  │  │ - Outcome   │  │ - Outcome   │                  │ │
│  │  │ ┌──────────┐│  │ ┌──────────┐│                  │ │
│  │  │ │Pack Size ││  │ │Pack Size ││                  │ │
│  │  │ │Selector  ││  │ │Selector  ││                  │ │
│  │  │ └──────────┘│  │ └──────────┘│                  │ │
│  │  │ ┌──────────┐│  │ ┌──────────┐│                  │ │
│  │  │ │Sub/One   ││  │ │Sub/One   ││                  │ │
│  │  │ │Toggle    ││  │ │Toggle    ││                  │ │
│  │  │ └──────────┘│  │ └──────────┘│                  │ │
│  │  │ Price: £XX  │  │ Price: £XX  │                  │ │
│  │  │ [Add to Cart]│  │ [Add to Cart]│                  │ │
│  │  │ [View Details]│ │ [View Details]│                │ │
│  │  └──────────────┘  └──────────────┘                  │ │
│  │  ┌──────────────┐  ┌──────────────┐                  │ │
│  │  │ Protocol 3   │  │ Protocol 4   │                  │ │
│  │  │ ...          │  │ ...          │                  │ │
│  │  └──────────────┘  └──────────────┘                  │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Mobile:**
- Single column layout
- Stacked protocol cards
- Full-width purchase controls
- Simplified pack selector (dropdown or pills)

#### Components to Create

```
app/components/professionals/
├── individual/
│   ├── index.ts
│   ├── types.ts
│   ├── IndividualPurchasePage.tsx        # Desktop wrapper
│   ├── IndividualPurchasePageMobile.tsx  # Mobile wrapper
│   ├── ProtocolPurchaseCard.tsx           # Protocol card with inline purchase
│   ├── ProtocolPurchaseCardMobile.tsx    # Mobile version
│   ├── PackSizeSelector.tsx              # Reusable selector
│   └── PurchaseTypeToggle.tsx            # Subscription vs one-time
```

#### Inline Purchase Component Requirements

**Pack Size Selector:**
- Dropdown or button group
- Options: 12-pack, 30-pack (from existing product data)
- Shows pricing per pack size
- Updates price display on change

**Purchase Type Toggle:**
- Two options: "One-time" and "Subscribe"
- Visual toggle (similar to existing patterns)
- Updates pricing display
- Shows savings if subscription

**Pricing Display:**
- Shows current price based on selections
- Format: "£XX.XX" or "£XX.XX/month" for subscription
- Updates reactively when pack/purchase type changes

**Add to Cart:**
- Uses existing `useCart` context
- Calls `addToCart` with correct variant ID
- Opens cart drawer automatically (existing behavior)
- Shows loading state during add

**View Details:**
- Links to `/protocol/[id]` page
- Opens in same tab (standard navigation)

#### Data Integration

- Reuse `protocolContent` from `@/app/lib/productData`
- Reuse `getFormulaVariantId` from `@/app/lib/shopifyProductMapping`
- Reuse pricing logic from existing product pages
- Use same variant IDs as DTC shop

#### Acceptance Criteria

- [x] Page accessible at `/professionals/protocol`
- [x] Protocols section displays all 4 protocols
- [x] Protocol selector shows product name and benefit lead copy
- [x] Selected protocol expands to show Hero, Calendar, Benefits sections
- [x] Tier selector works and updates price
- [x] Purchase type toggle works and updates price
- [x] Pricing displays correctly for all combinations
- [x] "Add to Cart" adds correct variant to cart
- [x] Cart drawer opens automatically after add
- [x] Mobile layout works correctly (horizontal scroll for selector)
- [x] All interactions smooth and responsive
- [x] No TypeScript errors

**Status:** ✅ **COMPLETED** (with implementation variations)

---

### Phase 3: Individual Purchase Page - Formulas Section

**Branch:** `professional-portal/phase-3-individual-formulas`

**Note:** Implementation follows same pattern as protocols:
- Formula selector matching protocol selector style
- Only Flow ("01") and Clear ("02") displayed
- Selected formula expands to show Hero, Benefits, FAQ, HowItWorks
- Inline purchase controls (pack selector, subscription toggle, add to cart)
- Case studies moved to always-visible section (not in expanded formula view)
- Users can have both protocol and formula expanded simultaneously

#### Tasks

- [x] Add formulas section to individual purchase page
- [x] Create formula selector component
- [x] Build expanded formula view with existing product sections
- [x] Reuse same purchase component patterns from protocols
- [x] Ensure visual hierarchy separates protocols from formulas
- [x] Add case studies section (always visible, matches homepage)
- [x] Test mobile layout

#### Page Structure Update

Add below protocols section:
```
┌─────────────────────────────────────────────────────────────┐
│  Visual Separator (border-top, spacing)                    │
│                                                            │
│  Formulas Section                                          │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Section Header                                       │ │
│  │  - Heading: "Individual Formulas"                     │ │
│  │  - Subtext: Professional context copy                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Formula Grid (2 columns desktop)                      │ │
│  │  ┌──────────────┐  ┌──────────────┐                  │ │
│  │  │ CONKA Flow   │  │ CONKA Clear  │                  │ │
│  │  │ - Image     │  │ - Image     │                  │ │
│  │  │ - Name      │  │ - Name      │                  │ │
│  │  │ - Headline  │  │ - Headline  │                  │ │
│  │  │ [Purchase    │  │ [Purchase    │                  │ │
│  │  │  Controls]   │  │  Controls]   │                  │ │
│  │  └──────────────┘  └──────────────┘                  │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Components to Create

```
app/components/professionals/protocol/
├── FormulaPurchaseCard.tsx           # Formula card with inline purchase
└── FormulaPurchaseCardMobile.tsx    # Mobile version
```

#### Acceptance Criteria

- [x] Formulas section displays below protocols
- [x] Visual hierarchy clearly separates sections
- [x] Both formulas (Flow and Clear) displayed in selector
- [x] Same purchase controls as protocols (pack selector, toggle, add to cart)
- [x] All functionality works correctly
- [x] Mobile layout works (horizontal scroll for selector)
- [x] Consistent styling with protocols section
- [x] Case studies section displays correctly (matches homepage)
- [x] Multiple selections allowed (protocol + formula can both be expanded)

**Status:** ✅ **COMPLETED**

---

### Phase 4: Bulk Purchase Page

**Branch:** `professional-portal/phase-4-bulk`

**Note:** Implementation includes:
- Two large cards (Flow and Clear) with images
- Purchase type toggle (Subscribe with save % / One-off)
- Quantity incrementer (+/- buttons)
- Shots count display (1 box = 28 shots)
- Subscription pricing shows slashed old price + new price
- Info sections refactored for side-by-side comparison
- Black banner headers with white text for all sections
- Ingredients link to full breakdown page
- Mobile toggle to switch between Flow/Clear for all sections

#### Tasks

- [x] Create `/app/professionals/bulk/page.tsx`
- [x] Build bulk formula cards (Flow and Clear)
- [x] Create quantity incrementer (+/- buttons)
- [x] Display pricing per box
- [x] Implement purchase type toggle (Subscribe/One-off)
- [x] Implement add to cart for bulk boxes
- [x] Add subscription pricing display (slashed old price)
- [x] Add shots count display
- [x] Refactor info sections for comparison (Info, Benefits, Ingredients, Taste)
- [x] Add black banner headers for sections
- [x] Add ingredients link CTA
- [x] Create mobile toggle for formula selection
- [x] Create mobile version

#### Page Structure

**Desktop:**
```
┌─────────────────────────────────────────────────────────────┐
│  px-16 py-16                                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  max-w-4xl mx-auto                                      │ │
│  │                                                          │ │
│  │  Section Header                                         │ │
│  │  - Heading: "Bulk & Team Orders"                        │ │
│  │  - Subtext: "For clubs, teams, and organisations..."   │ │
│  │                                                          │ │
│  │  Bulk Box Definition                                    │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  neo-box                                         │  │ │
│  │  │  ┌──────────────┐  ┌──────────────┐             │  │ │
│  │  │  │ 28x Flow     │  │ 28x Clear    │             │  │ │
│  │  │  │ Icon + Label │  │ Icon + Label│             │  │ │
│  │  │  └──────────────┘  └──────────────┘             │  │ │
│  │  │  Price per box: £XX.XX                          │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                          │ │
│  │  Quantity Selector                                      │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  [ - ]  Quantity: [ 1 ]  [ + ]                  │  │ │
│  │  │  Total: £XX.XX                                    │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                          │ │
│  │  [Add X Boxes to Cart]                                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Mobile:**
- Single column layout
- Full-width bulk box definition
- Larger +/- buttons for touch
- Full-width CTA button

#### Components Created

```
app/components/professionals/
├── bulk/
│   ├── index.ts
│   ├── types.ts
│   ├── BulkPurchaseHeader.tsx        # Page header
│   ├── BulkFormulaCard.tsx            # Formula card with purchase controls
│   └── FormulaInfoSections.tsx        # Info sections (Info, Benefits, Ingredients, Taste)
│       ├── InfoSection
│       ├── BenefitsSection
│       ├── IngredientsSection
│       └── TasteSection
```

#### Bulk Box Logic

**Box Contents:**
- 28 shots CONKA Flow (Formula 01)
- 28 shots CONKA Clear (Formula 02)
- Default pack size: 12-pack (so 2.33 boxes ≈ 28 shots)
- Actually: Need to calculate correct variant IDs for 28 shots

**Pricing Calculation:**
- Price per box = (Flow 12-pack price / 12 * 28) + (Clear 12-pack price / 12 * 28)
- Or use 30-pack pricing if available
- Display: "£XX.XX per box"
- Total = Price per box × Quantity

**Add to Cart:**
- Adds both Flow and Clear variants
- Quantity for each = quantity selected
- Uses correct variant IDs from product mapping
- Opens cart drawer automatically

#### Acceptance Criteria

- [x] Page accessible at `/professionals/bulk`
- [x] Two large formula cards displayed (Flow and Clear)
- [x] Price per box displayed
- [x] Quantity incrementer works (+/- buttons)
- [x] Shots count displayed (quantity × 28)
- [x] Subscription pricing shows slashed old price + new price
- [x] Total price updates when quantity changes
- [x] Purchase type toggle works (Subscribe/One-off)
- [x] "Add to Cart" adds correct items to cart
- [x] Cart drawer opens automatically
- [x] Info sections display side-by-side comparison
- [x] Black banner headers for all sections
- [x] Ingredients link works
- [x] Mobile toggle switches all sections between Flow/Clear
- [x] Mobile layout works correctly
- [x] No minimum quantity enforced
- [x] All calculations correct

**Status:** ✅ **COMPLETED**

---

### Phase 5: Mobile Optimization & Polish

**Branch:** `professional-portal/phase-5-mobile-polish`

#### Tasks

- [x] Review all pages on mobile viewports
- [x] Optimize touch targets (44px minimum)
- [x] Implement horizontal scroll for selectors on mobile
- [x] Ensure cart drawer works correctly on mobile
- [x] Test quantity incrementer on mobile
- [x] Verify spacing and typography on mobile
- [x] Implement mobile toggle for bulk page sections
- [ ] Test on actual devices (iOS Safari, Android Chrome) - **Pending device testing**

#### Mobile-Specific Considerations

**Individual Purchase Page:**
- Pack selector: Use dropdown on mobile (better UX than pills)
- Purchase toggle: Larger touch targets
- Cards: Full width, stacked vertically
- Spacing: Adequate padding between sections

**Bulk Purchase Page:**
- Quantity buttons: Larger (48px+ height)
- CTA button: Full width
- Box definition: Simplified layout

#### Acceptance Criteria

- [x] All pages usable on mobile viewports
- [x] Touch targets meet accessibility standards
- [x] Horizontal scrolling implemented for selectors (intentional UX)
- [x] Text readable without zooming
- [x] Cart drawer works on mobile
- [x] All interactions smooth (60fps)
- [ ] Tested on iOS Safari - **Pending device testing**
- [ ] Tested on Android Chrome - **Pending device testing**

**Status:** ✅ **MOSTLY COMPLETED** (pending device testing)

---

### Phase 6: Testing & Documentation

**Branch:** `professional-portal/phase-6-testing`

#### Tasks

- [ ] End-to-end testing of all flows
- [ ] Test cart integration
- [ ] Test navigation between pages
- [ ] Verify all links work correctly
- [ ] Test edge cases (zero quantity, etc.)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Performance audit
- [ ] Update changelog

#### Test Scenarios

1. **Gateway → Individual → Add Protocol to Cart**
   - Navigate from gateway
   - Select protocol
   - Choose pack size
   - Toggle subscription
   - Add to cart
   - Verify cart contents

2. **Gateway → Individual → Add Formula to Cart**
   - Same as above but with formula

3. **Gateway → Bulk → Add Multiple Boxes**
   - Navigate to bulk page
   - Increment quantity
   - Add to cart
   - Verify both Flow and Clear added

4. **Mobile Navigation**
   - Open mobile menu
   - Navigate to professionals
   - Complete purchase flow
   - Verify cart drawer works

#### Acceptance Criteria

- [ ] All test scenarios pass
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Performance: Pages load in < 2s
- [ ] Cart integration works correctly
- [ ] All navigation links work
- [ ] Documentation updated

---

## File Structure (Actual Implementation)

```
app/
├── professionals/
│   ├── page.tsx                          # Gateway page ✅
│   ├── individual/
│   │   └── page.tsx                      # Individual purchase page ✅
│   └── bulk/
│       └── page.tsx                      # Bulk purchase page ✅
│
└── components/
    └── professionals/
        ├── index.ts                      # Barrel exports ✅
        ├── gateway/
        │   ├── ProfessionalsGateway.tsx  # Gateway component ✅
        │   ├── ModeSelectionCard.tsx     # Mode card ✅
        │   └── ProfessionalsContext.tsx # Context section ✅
        ├── individual/
        │   ├── index.ts
        │   ├── IndividualPurchaseHeader.tsx # Page header ✅
        │   ├── ProtocolSelector.tsx       # Protocol selector ✅
        │   ├── ExpandedProtocolView.tsx  # Expanded protocol ✅
        │   ├── FormulaSelector.tsx       # Formula selector ✅
        │   └── ExpandedFormulaView.tsx   # Expanded formula ✅
        └── bulk/
            ├── index.ts
            ├── types.ts
            ├── BulkPurchaseHeader.tsx    # Page header ✅
            ├── BulkFormulaCard.tsx       # Formula card ✅
            └── FormulaInfoSections.tsx   # Info sections ✅
                ├── InfoSection
                ├── BenefitsSection
                ├── IngredientsSection
                └── TasteSection
```

**Note:** Implementation uses responsive components rather than separate mobile/desktop files. Components adapt using Tailwind breakpoints.

---

## Style Guide Reference

All components must follow existing patterns:

### Typography

| Element             | Font          | Class                                                        |
| ------------------- | ------------- | ------------------------------------------------------------ |
| Section label       | IBM Plex Mono | `font-clinical text-xs uppercase tracking-widest opacity-50` |
| Headings            | Poppins Bold  | `text-3xl lg:text-4xl font-bold`                             |
| Subtext/Annotations | Caveat        | `font-commentary text-xl`                                    |
| Body text           | Poppins       | `text-base opacity-80`                                       |

### Components

| Element                 | Class                | Notes                     |
| ----------------------- | -------------------- | ------------------------- |
| Containers              | `neo-box`            | Sharp corners, 2px border |
| Primary buttons         | `neo-button`         | Pill-shaped, filled       |
| Secondary buttons       | `neo-button-outline` | Pill-shaped, outline      |
| Desktop section padding | `px-16 py-16`        | Standard desktop spacing  |
| Mobile section padding  | `px-6 py-12`         | Standard mobile spacing   |
| Max width               | `max-w-6xl mx-auto`  | Content container         |

---

## Branch Strategy

```
main
└── professional-portal (feature branch)
    ├── professional-portal/phase-1-gateway
    │   └── merge → professional-portal
    ├── professional-portal/phase-2-individual-protocols
    │   └── merge → professional-portal
    ├── professional-portal/phase-3-individual-formulas
    │   └── merge → professional-portal
    ├── professional-portal/phase-4-bulk
    │   └── merge → professional-portal
    ├── professional-portal/phase-5-mobile-polish
    │   └── merge → professional-portal
    └── professional-portal/phase-6-testing
        └── merge → professional-portal
            └── (finally) merge → main
```

---

## Questions / Decisions Log

| Question                          | Decision                                         | Date       |
| --------------------------------- | ------------------------------------------------ | ---------- |
| Where to place nav link?          | Bottom of Shop dropdown menu                     | Jan 28 26 |
| Gateway page tone?                | Professional, calm, confident                     | Jan 28 26 |
| Case studies on gateway?          | Yes, select highlighted few (like homepage)    | Jan 28 26 |
| Individual page layout?           | Protocols first, then formulas                    | Jan 28 26 |
| Purchase controls?                | Inline on cards, no separate pages               | Jan 28 26 |
| Pack size options?                | Same as DTC (12, 30, etc.)                       | Jan 28 26 |
| Subscription toggle?              | Yes, same as DTC                                 | Jan 28 26 |
| Bulk box definition?               | 28 Flow + 28 Clear = 1 box                       | Jan 28 26 |
| Pricing display?                  | Per box for bulk, inline for individual          | Jan 28 26 |
| Visual distinction from DTC?      | No, keep identical styling                       | Jan 28 26 |
| Mobile approach?                  | Mirror desktop with sensible adjustments          | Jan 28 26 |
| Gating/access control?            | None for now (soft-gated)                        | Jan 28 26 |

---

## Notes

- All pricing and product data comes from existing `productData.ts` and `shopifyProductMapping.ts`
- Cart integration uses existing `CartContext` and `useCart` hook
- Product pages remain unchanged - we're not modifying `/protocol/[id]` or formula pages
- Case studies integration reuses `getHomepageAthletes()` from `caseStudiesData.ts`
- Mobile optimization follows patterns from `MOBILE_OPTIMIZATION.md`
- All components should follow `CODING_STANDARDS.md` patterns

---

## Future Enhancements (Out of Scope)

- Hard gating with login/verification
- Different pricing for professionals
- Custom product copy for professional context
- Account management for professional buyers
- Saved orders/reorder functionality
- Custom quantity builder (beyond predefined boxes)
- Invoice/PO support for bulk orders
