# Professional Portal Implementation Plan

**Created:** January 28, 2026  
**Status:** Planning  
**Feature Branch:** `professional-portal`

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
│ /professionals/individual │    │ /professionals/bulk      │
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

- [ ] Add "For Professionals" link to Shop dropdown menu (desktop)
- [ ] Add "For Professionals" link to mobile navigation menu
- [ ] Create `/app/professionals/page.tsx` gateway page
- [ ] Create gateway page components (desktop + mobile)
- [ ] Integrate case studies section (reuse homepage pattern)
- [ ] Create mode selection cards (Individual vs Bulk)

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

- [ ] "For Professionals" link visible in Shop dropdown (desktop)
- [ ] "For Professionals" link visible in mobile nav
- [ ] Gateway page accessible at `/professionals`
- [ ] Context section explains purpose clearly
- [ ] Case studies section displays (if included)
- [ ] Two mode cards displayed side-by-side (desktop) or stacked (mobile)
- [ ] CTAs navigate to correct paths
- [ ] Mobile layout works correctly
- [ ] No visual distinction from DTC pages
- [ ] Matches neo-brutalist style guide

---

### Phase 2: Individual Purchase Page - Protocols Section

**Branch:** `professional-portal/phase-2-individual-protocols`

#### Tasks

- [ ] Create `/app/professionals/individual/page.tsx`
- [ ] Create inline purchase components for protocols
- [ ] Build protocol cards with embedded purchase controls
- [ ] Implement pack size selector (12, 30, etc.)
- [ ] Implement subscription vs one-time toggle
- [ ] Display pricing inline
- [ ] Connect to cart context
- [ ] Create mobile versions

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

- [ ] Page accessible at `/professionals/individual`
- [ ] Protocols section displays all 4 protocols
- [ ] Each protocol card shows image, name, outcome
- [ ] Pack size selector works and updates price
- [ ] Purchase type toggle works and updates price
- [ ] Pricing displays correctly for all combinations
- [ ] "Add to Cart" adds correct variant to cart
- [ ] Cart drawer opens automatically after add
- [ ] "View Details" links to protocol detail pages
- [ ] Mobile layout works correctly
- [ ] All interactions smooth and responsive
- [ ] No TypeScript errors

---

### Phase 3: Individual Purchase Page - Formulas Section

**Branch:** `professional-portal/phase-3-individual-formulas`

#### Tasks

- [ ] Add formulas section to individual purchase page
- [ ] Create formula cards with inline purchase controls
- [ ] Reuse same purchase component patterns from protocols
- [ ] Ensure visual hierarchy separates protocols from formulas
- [ ] Test mobile layout

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
app/components/professionals/individual/
├── FormulaPurchaseCard.tsx           # Formula card with inline purchase
└── FormulaPurchaseCardMobile.tsx    # Mobile version
```

#### Acceptance Criteria

- [ ] Formulas section displays below protocols
- [ ] Visual hierarchy clearly separates sections
- [ ] Both formulas (Flow and Clear) displayed
- [ ] Same purchase controls as protocols
- [ ] All functionality works (pack selector, toggle, add to cart)
- [ ] Mobile layout stacks formulas vertically
- [ ] Consistent styling with protocols section

---

### Phase 4: Bulk Purchase Page

**Branch:** `professional-portal/phase-4-bulk`

#### Tasks

- [ ] Create `/app/professionals/bulk/page.tsx`
- [ ] Build bulk box definition component
- [ ] Create quantity incrementer (+/- buttons)
- [ ] Display pricing per box
- [ ] Implement add to cart for bulk boxes
- [ ] Create mobile version

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

#### Components to Create

```
app/components/professionals/
├── bulk/
│   ├── index.ts
│   ├── types.ts
│   ├── BulkPurchasePage.tsx          # Desktop wrapper
│   ├── BulkPurchasePageMobile.tsx    # Mobile wrapper
│   ├── BulkBoxDefinition.tsx         # Box contents display
│   ├── QuantityIncrementer.tsx       # +/- quantity controls
│   └── BulkAddToCart.tsx              # Add multiple boxes
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

- [ ] Page accessible at `/professionals/bulk`
- [ ] Bulk box definition clearly shows contents
- [ ] Price per box displayed
- [ ] Quantity incrementer works (+/- buttons)
- [ ] Total price updates when quantity changes
- [ ] "Add to Cart" adds correct items to cart
- [ ] Cart drawer opens automatically
- [ ] Mobile layout works correctly
- [ ] No minimum quantity enforced
- [ ] All calculations correct

---

### Phase 5: Mobile Optimization & Polish

**Branch:** `professional-portal/phase-5-mobile-polish`

#### Tasks

- [ ] Review all pages on mobile viewports
- [ ] Optimize touch targets (44px minimum)
- [ ] Test pack selector on mobile (dropdown vs pills)
- [ ] Ensure cart drawer works correctly on mobile
- [ ] Test quantity incrementer on mobile
- [ ] Verify spacing and typography on mobile
- [ ] Test on actual devices (iOS Safari, Android Chrome)

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

- [ ] All pages usable on mobile viewports
- [ ] Touch targets meet accessibility standards
- [ ] No horizontal scrolling
- [ ] Text readable without zooming
- [ ] Cart drawer works on mobile
- [ ] All interactions smooth (60fps)
- [ ] Tested on iOS Safari
- [ ] Tested on Android Chrome

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

## File Structure (Final)

```
app/
├── professionals/
│   ├── page.tsx                          # Gateway page
│   ├── individual/
│   │   └── page.tsx                      # Individual purchase page
│   └── bulk/
│       └── page.tsx                      # Bulk purchase page
│
└── components/
    └── professionals/
        ├── index.ts                      # Barrel exports
        ├── types.ts                      # TypeScript interfaces
        ├── ProfessionalsGateway.tsx      # Gateway desktop
        ├── ProfessionalsGatewayMobile.tsx # Gateway mobile
        ├── ModeSelectionCard.tsx         # Reusable mode card
        ├── ProfessionalsContext.tsx      # Context section
        ├── individual/
        │   ├── index.ts
        │   ├── types.ts
        │   ├── IndividualPurchasePage.tsx
        │   ├── IndividualPurchasePageMobile.tsx
        │   ├── ProtocolPurchaseCard.tsx
        │   ├── ProtocolPurchaseCardMobile.tsx
        │   ├── FormulaPurchaseCard.tsx
        │   ├── FormulaPurchaseCardMobile.tsx
        │   ├── PackSizeSelector.tsx
        │   └── PurchaseTypeToggle.tsx
        └── bulk/
            ├── index.ts
            ├── types.ts
            ├── BulkPurchasePage.tsx
            ├── BulkPurchasePageMobile.tsx
            ├── BulkBoxDefinition.tsx
            ├── QuantityIncrementer.tsx
            └── BulkAddToCart.tsx
```

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
