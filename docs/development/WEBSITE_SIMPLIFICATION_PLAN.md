# Website Simplification & Ad Funnel Plan

> **Status:** Phase 2 complete, Phase 4 UX iterated (pricing populated, mobile optimised), blocked on Shopify product setup (Phase 3A)
> **Created:** 2026-03-24
> **Last updated:** 2026-03-27
> **Context:** Following workshop with January Brands (Overload). CONKA is pivoting from a 4-protocol system to a simplified Flow / Clear / Both offering, with a dedicated ad landing page and frictionless funnel page for paid Meta traffic.

---

## Why we're doing this

The current site has too much cognitive load. Four protocols, multiple tiers, pack sizes, and a quiz-driven funnel — all of which confuse customers and kill conversion rates from paid traffic. January Brands (who scaled Overload creatine gummies to significant D2C revenue) identified this as the primary bottleneck.

**The shift:**
- Protocols are gone. The product is simple: Flow, Clear, or Both.
- Paid traffic should never hit the main homepage. It goes to a dedicated landing page that educates, then pushes to a funnel page that converts.
- The funnel page removes decision fatigue: pre-select the best option, minimal steps, straight to Shopify checkout (no cart drawer).
- The main website still exists but becomes secondary — it aligns with the new offering over time.

---

## The new product offering

| Product | What ships | Monthly Sub | Monthly OTP | Quarterly Sub |
|---------|-----------|-------------|-------------|---------------|
| **Both** (hero) | 2 boxes (56 shots) | TBC | TBC | TBC |
| Flow | 1 box (28 shots) | TBC | TBC | TBC |
| Clear | 1 box (28 shots) | TBC | TBC | TBC |

- **"Both" is the hero product.** Taking Flow + Clear daily provides the best efficacy — synergistic compounding effect (Flow generates AMPK for energy, Clear provides glutathione precursors for recovery/detox). The entire funnel is oriented around pushing customers toward Both. Flow and Clear individually are available but secondary.
- Pricing targets: ~£89.99 / £129.99 / £229.99 (awaiting final COGS)
- "Both" = single Shopify product (not two line items)
- Quarterly subscription requires a new selling plan in Shopify
- 20% subscription discount preserved

---

## Phase 1: Foundations (can start now)

These tasks have no pricing/SKU dependency and unblock everything else.

### 1A. Hide the quiz

**What:** Remove quiz from navigation, add redirect `/quiz` → homepage. Keep code in repo.
**Why:** Quiz recommends protocols which no longer exist. Hiding is faster than rebuilding and avoids breaking anything.
**Files:** `NavigationDesktop.tsx`, `NavigationMobile.tsx`, `ShopMegaMenu.tsx`, `next.config.ts`
**Size:** Small

### 1B. Remove protocols from navigation

**What:** Remove "Shop by Bundle" from the mega menu. Simplify to: Flow, Clear, and a primary CTA (e.g. "Get Started" or "Shop").
**Why:** Protocols are being scrapped. Keeping them in nav while building the new funnel creates confusion.
**Files:** `ShopMegaMenu.tsx`, `ShopMegaMenuContent.tsx`, `NavigationDesktop.tsx`, `NavigationMobile.tsx`, navigation card components
**Size:** Small

### 1C. Add redirects for protocol pages

**What:** `/protocol/*` → homepage (or landing page URL once defined). Update existing redirect rules.
**Why:** Protocol pages will still get traffic from bookmarks, search, old links. Redirects prevent 404s and preserve any SEO equity.
**Files:** `next.config.ts`
**Size:** Small

### 1D. Update homepage product grid

**What:** Remove the protocol card from the 3-card product grid. Replace with a "Both" card or a CTA card that pushes to the funnel.
**Why:** Homepage still shows protocols after nav removal — needs to be consistent.
**Files:** `ProductGrid.tsx`, `ProductCard.tsx`
**Size:** Small

### 1E. Delete shop page

**What:** Remove `/shop` route, add redirect to homepage (or funnel page later).
**Why:** Shop page shows the old formula browsing experience. All purchase intent should flow through the funnel.
**Files:** `app/shop/` (delete), `next.config.ts` (redirect)
**Size:** Small

---

## Phase 2: Ad Landing Page

> **Status:** Built. CTAs now point to `/funnel`.
> **Route:** `/start` (`app/start/page.tsx`)
> **SEO:** `noindex` via metadata in server component wrapper.

### 2A. Landing page — what's built

The landing page is live at `/start`. It's a standalone conversion page for paid Meta traffic. Every section has its own CTA pointing to the funnel page (`/funnel`). All components are landing-specific — they don't modify shared site components.

**Page structure (8 sections):**

| # | Section | Component | Background | CTA |
|---|---------|-----------|------------|-----|
| 1 | Hero | `LandingHero` | White | Try CONKA Today → |
| 2 | Benefits + Trust Badges | `LandingBenefits` | Dark neuro blue | See Your Options → |
| 3 | Product Split (AM/PM) | `LandingProductSplit` | White | Get Both → |
| 4 | What's Inside | `LandingWhatsInside` | Neuro-blue-light | Start Your Routine → |
| 5 | Testimonials | `Testimonials` (shared, reused) | White | Join Them → |
| 6 | App Guarantee | `LandingGuarantee` | Bone | Try Risk-Free → |
| 7 | Case Studies | `CaseStudiesDataDriven` (shared, reused) | Neuro-blue-light | Start Your Journey → |
| 8 | FAQ | `LandingFAQ` | Neuro-blue-light | Try Risk-Free → |

**Landing-specific components created (`app/components/landing/`):**

| Component | Purpose |
|-----------|---------|
| `LandingHero.tsx` | Banner hero — product image, headline, trust badges, CTA. Desktop: copy left, image right. |
| `LandingBenefits.tsx` | 2x2 benefit grid (tappable tiles with science detail) + 2x2 trust badge row. Dark background. |
| `LandingProductSplit.tsx` | AM/PM product split — `ConkaAmPm.jpg` asset, two product cards (warm/cool), CTA. |
| `LandingWhatsInside.tsx` | Collapsible accordion (what it does, ingredients, science, how to take). Desktop: lifestyle image left, accordion right. |
| `LandingGuarantee.tsx` | App as confidence booster — 30-day money-back guarantee, phone mockup, stats, CTA. |
| `LandingFAQ.tsx` | 8 conversion-focused FAQ items ordered by purchase intent. Desktop: lifestyle image left, accordion right. |
| `LandingProof.tsx` | Case study proof section with athlete data. |

**Assets used:**
- `/CONKA_39.jpg` — hero product shot (both boxes + bottles)
- `/formulas/ConkaAmPm.jpg` — AM/PM split shot with sun/moon labels
- `/app/AppConkaRing.png` — app score screen mockup
- `/lifestyle/FlowHold.jpg` — man holding CONKA Flow (What's Inside section)
- `/lifestyle/ClearDrink.jpg` — woman drinking CONKA Clear (FAQ section)

### 2B. Landing page — what's next

**Immediate (no dependencies):**
- Add a "What to Expect" timeline section (simplified version of homepage `WhatToExpect`) — answers "when will I feel it?"
- Copy pass on hero headline and benefit subtitles — current copy is functional but not optimised for cold traffic conversion
- Analytics: add `lp:viewed`, `lp:cta_clicked` Vercel events, UTM param passthrough on CTA links

**Blocked by assets:**
- Hero lifestyle image — current `CONKA_39.jpg` is a product-on-white shot. Needs a lifestyle/context hero image (someone taking CONKA in the morning)
- Better product photography for the split section (individual bottle shots)
- Customer avatar photos for trust cluster below hero CTA

**Blocked by decisions:**
- ~~Funnel page URL — all CTAs currently point to `#`. Once the funnel page is built, update the `FUNNEL_URL` constant in each landing component.~~ **Done.** All CTAs now point to `/funnel`.
- Offer / value proposition — what's the paid traffic offer? (e.g. "Save 20%", "First box free"). Needed for hero value badge and CTA copy.
- Final headline copy from January Brands

---

## Phase 3: Shopify Setup & Product Data (blocked by pricing)

### 3A. Create new Shopify products/variants

**What:** Set up the new product structure in Shopify Admin:
- 3 products: Flow (28 shots), Clear (28 shots), Both (56 shots)
- Each needs variants for: Monthly Sub, Monthly OTP, Quarterly Sub
- Create a new quarterly selling plan in Shopify
- Total: 9 variant/plan combinations

**Why:** The funnel page needs real Shopify variant IDs to add to cart and redirect to checkout.

**Size:** Medium
**Blocked by:** Final pricing from COGS analysis
**Note:** This is Shopify Admin work, not code. But it must happen before Phase 4 is fully functional.

### 3B. Update product data layer

**What:** ~~Add new types, pricing, and variant mappings for the simplified offering.~~ **Partially done.** The funnel data layer (`app/lib/funnelData.ts`) is built as a standalone module with its own types, pricing matrix, and variant mapping. It does not modify the existing product data modules.

**What's built:**
- `FunnelProduct = "both" | "flow" | "clear"` and `FunnelCadence = "monthly-sub" | "monthly-otp" | "quarterly-sub"` types
- 3×3 pricing matrix with mock values (price, perShot, shotCount, compareAtPrice)
- 3×3 variant mapping — Flow/Clear monthly-sub and monthly-otp use real existing Shopify variant IDs; Both and quarterly are empty strings awaiting Shopify setup
- `getOfferPricing()`, `getOfferVariant()`, `isVariantReady()` helpers
- Product and cadence display data with feature bullets

**What's remaining:**
- Replace mock pricing with real values from COGS analysis
- Fill in "Both" variant IDs after Shopify product creation (3A)
- Fill in quarterly selling plan IDs after Shopify setup (3A)

**Files:** `app/lib/funnelData.ts` (new, standalone)
**Dependencies:** 3A (variant IDs) for full functionality

---

## Phase 4: Funnel Page

> **Status:** Built and iterated. Pricing populated, UX refined, ready for Shopify product setup.
> **Route:** `/funnel` (`app/funnel/page.tsx`)
> **SEO:** `noindex` via metadata.
> **Branch:** `funnel-page`
> **Last updated:** 2026-03-27

### 4A. Funnel page - what's built

The funnel page is live at `/funnel`. It's a **multi-step paginated funnel** (Fussy/Overload pattern) - each step is its own focused screen, not a single scroll.

**Architecture:**

| File | Purpose |
|------|---------|
| `app/funnel/page.tsx` | Server component - metadata (noindex), renders FunnelClient |
| `app/funnel/FunnelClient.tsx` | Client orchestrator - all state, step navigation, checkout flow, analytics |
| `app/lib/funnelData.ts` | Types, 3x3 pricing matrix, variant mapping, display data, upsell logic |
| `app/lib/funnelCheckout.ts` | Isolated cart creation, analytics, checkout URL (bypasses CartContext) |

**Funnel components (`app/components/funnel/`):**

| Component | Purpose |
|-----------|---------|
| `FunnelStepIndicator.tsx` | Fixed header - CONKA logo (right), numbered step breadcrumb with ticks for completed steps (Plan > Product > Checkout) |
| `FunnelHeroAsset.tsx` | Two modes: static square image (step 1) and carousel without thumbnails (step 2) |
| `CadenceSelector.tsx` | Step 1: 3 stacked cards (Monthly > Quarterly > Try Once) - per-shot price, no total price shown |
| `ProductSelector.tsx` | Step 2: 3 stacked product cards - full price revealed here, "Both" shows savings vs buying separately |
| `FunnelCTA.tsx` | Sticky CTA button - simple text + arrow icon |
| `UpsellModal.tsx` | Bottom sheet - contextual upgrade offer before checkout |
| `FunnelAssurance.tsx` | Trust strip (guarantee, shipping, cancel anytime) |

**Step flow:**

| Step | Screen | Pre-selected | CTA |
|------|--------|-------------|-----|
| 1 - Plan | Cadence cards (1-Month Supply / 3-Month Supply / Try Once) | 1-Month Supply | "Choose Product" |
| 2 - Product | Product cards (Both / Flow / Clear) | Both | "Go to Checkout" |
| 3 - Checkout | Shopify hosted checkout | - | Redirect via `cart.checkoutUrl` |
| 3.5 - Upsell | Bottom sheet modal (contextual) | - | "Yes, upgrade" / "No thanks" |

**Pricing strategy (two-stage reveal):**
- **Step 1 shows per-shot price only** (e.g. "£1.77/shot") - anchors on a small number, no sticker shock. Always shows single-box (28/84 shots) regardless of product selection.
- **Step 2 reveals full price** (e.g. "£89/mo") with cadence frequency. For "Both", shows the buy-separately price crossed out and savings in the badge (e.g. "Save £29").

**Current pricing (estimated, pre-COGS):**

| Cadence | Per Shot | Flow/Clear | Both | Both saves |
|---------|---------|-----------|------|-----------|
| Monthly Sub | £2.11 | £59 | £89 | £29 (25%) |
| Quarterly Sub | £1.77 | £149 | £229 | £69 (23%) |
| One-Time | £2.82 | £79 | £129 | £29 (18%) |

**Key UX patterns:**
- **Multi-step pagination** - each step is its own screen. CTA advances to next step.
- **Numbered step indicator** - circles with numbers (1, 2), tick replaces number on completed steps. Consistent on mobile and desktop.
- **Expanded/collapsed cards** - selected card shows full details. Unselected cards collapse to name + key metric.
- **Scrolling hero on mobile** - product image scrolls naturally with content (not sticky). Square aspect ratio, constrained to `max-h-[65vw]`, rounded corners, padded.
- **Product carousel (step 2)** - reuses `ProductImageSlideshow` with arrows only (no thumbnails on any breakpoint).
- **"Most Popular" badge** - single badge on Quarterly cadence (step 1) and Both product (step 2). Ink/black background, always prominent regardless of selection state.
- **Neuro-blue selected state** - selected card border and radio tick use `#4058bb`.
- **Pre-selection** - Both + Monthly Subscription always selected on page load (highest LTV bias).
- **No navigation/footer** - distraction-free focused view, just logo + step indicator.
- **Desktop** - two-column layout: left = sticky hero asset, right = step flow with `max-w-2xl` and extra padding for readability.

**Checkout flow (isolated from CartContext):**
1. User clicks final CTA → check for upsell opportunity
2. If upsell applies → show bottom sheet modal → accept upgrades variant, decline proceeds
3. `POST /api/cart` with `action: "create"`, selected variantId + sellingPlanId + attributes
4. Fire analytics (Meta Pixel AddToCart + InitiateCheckout, Triple Whale, Vercel events) — non-blocking
5. `window.location.href = cart.checkoutUrl` — straight to Shopify checkout, no cart drawer

**Analytics events tracked:**
- `funnel:viewed`, `funnel:cadence_changed`, `funnel:product_changed`
- `funnel:step1_completed`, `funnel:cta_clicked`
- `funnel:upsell_shown`, `funnel:upsell_accepted`, `funnel:upsell_declined`
- `funnel:checkout` (with product, cadence, price, upsellAccepted)
- Meta Pixel: AddToCart + InitiateCheckout with CAPI deduplication
- Triple Whale: AddToCart
- Vercel: `purchase:add_to_cart` with `source: "funnel_page"`

**What works end-to-end now (4 of 9 combos):**

| Combination | Status |
|-------------|--------|
| Flow × Monthly Subscription | **Works** — real variant + selling plan |
| Flow × Monthly One-Time | **Works** — real variant |
| Clear × Monthly Subscription | **Works** — real variant + selling plan |
| Clear × Monthly One-Time | **Works** — real variant |
| Both × any cadence | **Blocked** — no "Both" product in Shopify yet |
| Any × Quarterly Subscription | **Blocked** — no quarterly selling plan yet |

### 4B. Direct-to-checkout cart logic

> **Status:** Built.
> **File:** `app/lib/funnelCheckout.ts`

Standalone checkout utility. Creates a fresh Shopify cart via `/api/cart`, fires all analytics, returns `checkoutUrl`. Completely isolated from global `CartContext` — never opens cart drawer. No changes were needed to the existing cart API route.

**Cart attributes set:** `source: "funnel_page"`, `plan_frequency`, `upsell_accepted`, `selected_product`.

### 4C. Funnel page - what's next

**Immediate (no dependencies):**
- Create product photography assets for step 1 hero (square, centred product on clean background)
- Create "Both" product carousel images (AM/PM split, flatlay, ingredients)
- Refine card copy and feature bullets based on conversion testing
- Add UTM parameter passthrough from landing page CTAs to funnel checkout
- Review and refine upsell logic copy and thresholds

**Blocked by Shopify setup (Phase 3A):**
- Create "Both" product in Shopify (single product, 56 shots)
- Create quarterly selling plan in Shopify
- Wire up "Both" variant IDs in `funnelData.ts`
- Wire up quarterly selling plan IDs in `funnelData.ts`
- Replace estimated pricing with final COGS-based pricing
- End-to-end test all 9 combinations

**Blocked by assets:**
- "Both" product photography (two boxes side-by-side, AM/PM split)
- Better hero photography for step 1 cadence views (square format, centred)

---

## Phase 5: Main Website Alignment (after funnel is live)

This is lower priority. The funnel handles paid traffic. These changes align the organic/direct experience.

### 5A. Update homepage hero

**What:** Replace current hero imagery with product-focused shots. Update copy to align with AM/PM positioning.
**Depends on:** Asset availability (product photography)
**Size:** Small

### 5B. Elevate the app on the homepage

**What:** Move app section higher. Add money-back guarantee messaging. "The only supplement you can measure working."
**Size:** Small

### 5C. Update formula product pages

**What:** Align `/conka-flow` and `/conka-clarity` copy with new positioning (AM/PM, functional messaging). Update pack selector to match new offering structure. Improve Clear's value proposition specifically.
**Size:** Medium
**Note:** This may change significantly once we see how the funnel performs. Don't over-invest until we have data.

### 5D. Simplify B2B portal

**What:** Replace protocol options in `/professionals` with the new Flow/Clear/Both at standard pricing. Remove B2B-specific tiered pricing. Delete B2B products in Shopify.
**Size:** Medium
**Note:** Separate conversation needed on B2B pricing strategy.

### 5E. Clean up protocol code

**What:** Once protocols are fully removed from all user-facing paths, clean up the codebase:
- Delete `app/protocol/` route folder
- Delete `app/components/protocol/` component folder
- Remove protocol exports from `productData.ts`
- Optionally remove `protocolContent.ts` and protocol sections of `productPricing.ts`
- Clean up `shopifyProductMapping.ts` protocol variants

**Why:** Reduces codebase complexity and prevents confusion in future development.
**Size:** Medium
**Note:** Do this last. Redirects (Phase 1C) handle the user-facing side. This is housekeeping.

---

## Phase 6: Post-Purchase App Flow (later)

### 6A. Deep link infrastructure

**What:** Create deep links so post-purchase emails/pages can push customers directly into the CONKA app.
**Why:** Get customers baselining on the app before their product arrives. Then show them their improvement once they start taking it. This is the "only supplement you can measure working" promise made real.

### 6B. Post-purchase flow

**What:** Order confirmation → email with app download CTA + deep link → app onboarding → baseline test → product arrives → track improvement → retention hook.
**Dependencies:** App team work, Klaviyo/Skio integration, deep link setup.

---

## Blocked / Waiting On

| Item | Waiting for | Blocks |
|------|-------------|--------|
| Final pricing (3×3 matrix) | COGS analysis + margin targets | Phase 3, 4 (full functionality) |
| Quarterly selling plan | Shopify Admin setup | Phase 3A |
| Skio call (tomorrow) | Migration decision | Subscription portal work, selling plan setup |
| Shopify legacy frontend call | Understanding constraints | Any checkout customisation |
| Product photography | Asset creation | Hero update (5A), landing page imagery (2A) |
| Landing page copy | Internal + January Brands direction | 2A (can scaffold without) |
| "Both" product setup | Shopify Admin | Phase 3A |
| **Landing page hero banner asset** | Product photography — needs a wide-format (16:9 or wider) hero shot showing Both boxes + bottles. Current `CONKA_39.jpg` is a square product shot, not a banner. Ideal: lifestyle context or styled flat-lay at wider aspect ratio. | 2A hero quality |
| **Landing page offer / value proposition** | What is the offer for paid traffic? (e.g. "Save 20%", "First month free", "Try for £X"). Needed for a value badge overlay on the hero and CTA copy. Without this the CTA is generic "Get Started". | 2A hero conversion |
| **Landing page headline + subheadline copy** | Final copy direction from January Brands. Current placeholder: "Your daily brain performance system". Needs to be benefit-first, not feature-first. | 2A hero copy |
| **Customer avatar photos** | 3–5 small circular customer/athlete face photos for a trust cluster below the CTA (Purdy & Figg pattern). Could use existing athlete headshots if available. | 2A social proof |
| **"Featured In" / authority logos** | If CONKA has press mentions or partnerships (e.g. Men's Health, BBC, etc.), monochrome logos for an authority row below the hero. | 2A authority row |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-24 | Scrap protocols | Too confusing for customers, killing conversion |
| 2026-03-24 | "Both" = single Shopify product | Cleaner checkout, simpler subscription management |
| 2026-03-24 | No cart drawer on funnel | Minimal friction — straight to Shopify checkout |
| 2026-03-24 | Hide quiz (don't delete) | May repurpose later for Flow vs Clear recommendation |
| 2026-03-24 | Landing page is noindex, not in nav | Strictly for paid traffic, prevents diluting conversion data |
| 2026-03-24 | Pre-select "Both" + "Monthly Sub" | Psychological lever — direct the customer to highest LTV option |
| 2026-03-25 | Funnel is mobile-first | Paid Meta traffic is overwhelmingly mobile — mobile UX is the success criteria |
| 2026-03-25 | Hidden upsell step in funnel | Contextual upsell after CTA click, before checkout redirect (e.g. Flow→Both, OTP→Sub) |
| 2026-03-25 | Funnel uses isolated cart (not global CartContext) | Funnel checkout is a separate flow — fresh cart, no drawer, no interference with browsing cart |
| 2026-03-25 | Step indicator in funnel | Visible progress (Fussy pattern) reduces anxiety and improves completion rate |
| 2026-03-25 | Multi-step paginated funnel (not single scroll) | Each step is its own focused screen — clearer, less overwhelming, Fussy pattern |
| 2026-03-25 | No nav/footer on funnel page | Distraction-free focused view — only logo + step breadcrumb |
| 2026-03-25 | Funnel data layer is standalone (`funnelData.ts`) | Clean separation from protocol-era product data; easy to wire up real Shopify IDs later |
| 2026-03-25 | Funnel route = `/funnel` | Landing page CTAs updated from `#` to `/funnel` |
| TBD | Skio vs Loop | Call scheduled for 2026-03-25 |

---

## Reference

- [January Brands Workshop Notes](../../CONKA_BUSINESS_CONTEXT.md) — Full business context
- [Product Data Docs](../PRODUCT_DATA.md) — Current product module structure
- [Cart Logic](../features/CART_LOGIC.md) — Current cart implementation
- [Design System](../SOFT_TECH_LUXURY_STYLE_SHEET_GUIDELINES.md) — Soft-Tech Luxury guidelines
- [Shopify Commerce Workflow](../workflows/04-shopify-commerce.md) — Shopify conventions
- **Overload funnel page:** `ovrload.co/pages/funnel` — Product picker, pre-selection, upsell step, mobile layout (built by January Brands)
- **Overload landing page:** `ovrload.co/pages/gummy` — Hero asset, trust badges, mobile scroll structure
- **Fussy subscribe flow:** `getfussy.com/pages/subscribe` — Multi-step flow (Case → Plan → Scent → Checkout), step indicator UX
- Other competitor references: AG1, Magic Mind, Ketone IQ (find their landing pages via [Meta Ad Library](https://facebook.com/ads/library))
