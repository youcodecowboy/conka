# Website Simplification & Ad Funnel Plan

> **Status:** Planning
> **Created:** 2026-03-24
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

> **Status:** Built — iterating on copy and assets.
> **Route:** `/start` (`app/start/page.tsx`)
> **SEO:** `noindex` via metadata in server component wrapper.

### 2A. Landing page — what's built

The landing page is live at `/start`. It's a standalone conversion page for paid Meta traffic. Every section has its own CTA pointing to the funnel page (currently `#`, will be updated when the funnel is built). All components are landing-specific — they don't modify shared site components.

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
- Funnel page URL — all CTAs currently point to `#`. Once the funnel page is built, update the `FUNNEL_URL` constant in each landing component.
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
**Note:** This is Shopify Admin work, not code. But it must happen before Phase 4.

### 3B. Update product data layer

**What:** Add new types, pricing, and variant mappings for the simplified offering:
- New type (e.g. `OfferProduct = "flow" | "clear" | "both"`)
- New type (e.g. `OfferCadence = "monthly-sub" | "monthly-otp" | "quarterly-sub"`)
- New pricing data structure
- New variant ID mappings in `shopifyProductMapping.ts`
- New helper: `getOfferPricing(product, cadence)` and `getOfferVariantId(product, cadence)`

**Why:** Clean separation from old protocol data. The funnel page imports from this. Old data stays until the main site is fully migrated.

**Files:** `productTypes.ts`, `productPricing.ts`, `shopifyProductMapping.ts`, `productHelpers.ts`, `productData.ts`
**Size:** Medium
**Dependencies:** 3A (variant IDs)

---

## Phase 4: Funnel Page (blocked by Phase 3)

> **Design principle #1: Mobile-first.** If it doesn't perform and look great on mobile, we have failed. Paid Meta traffic is overwhelmingly mobile. Every decision below is evaluated through a mobile lens first.

### Reference pages

| Brand | Page | URL | What to study |
|-------|------|-----|---------------|
| Overload | Funnel | `ovrload.co/pages/funnel` | Product picker UX, pre-selection, upsell step, mobile layout |
| Overload | Landing | `ovrload.co/pages/gummy` | Hero asset, trust badges, mobile scroll structure |
| Fussy | Subscribe | `getfussy.com/pages/subscribe` | Multi-step flow (Case → Plan → Scent → Checkout), step indicator |

**How to find more:** Search each brand in [Meta Ad Library](https://facebook.com/ads/library) → click through active ads to find their landing/funnel URLs (these pages are hidden from main nav, only reachable via ads).

### 4A. Build the funnel page

**What:** New route (URL TBD) — the conversion page. Mobile-first, minimal UI, maximum clarity.

**Page structure (top to bottom on mobile):**

1. **Hero asset** — Large product imagery at the top. Full-width on mobile. This is the first thing the customer sees — it sets quality perception instantly. No headline competing for attention above the fold; the product IS the headline.

2. **Step indicator** — Visible progress (like Fussy's 1-2-3-4 pills). Shows the customer exactly where they are in the flow. Reduces anxiety ("how long is this going to take?"). Steps:
   - Step 1: Choose your plan (cadence)
   - Step 2: Choose your product
   - Step 3: Confirm & checkout
   - (Hidden) Step 3.5: Upsell (contextual, see below)

3. **Step 1 — Choose cadence** — 3 options as tabs/pills:
   - Monthly Subscription (**pre-selected**, tagged "Most Popular")
   - Monthly One-Time
   - Quarterly Subscription
   - Show savings vs one-time on subscription options (e.g. "Save 20%")

4. **Step 2 — Choose product** — 3 cards:
   - **Both** (2 boxes, 56 shots) — **pre-selected**, tagged "Most Popular", visually dominant (larger card, highlighted border, or elevated position). This is the hero product — the entire funnel pushes toward it.
   - Flow (1 box, 28 shots)
   - Clear (1 box, 28 shots)
   - Quarterly adjusts quantities (6/3/3 boxes)
   - Price display updates dynamically based on cadence + product selection. Show per-shot price and total.

5. **Step 3 — CTA** — Single prominent button: "Start My Subscription" / "Buy Now" / "Subscribe & Save" (copy varies by cadence selection). Full-width on mobile.

6. **Step 3.5 — Hidden upsell** — Triggered AFTER the customer clicks the CTA, BEFORE checkout redirect. Contextual based on selection:
   - If customer selected **Flow only** → upsell to Both ("Add Clear for £X more — most customers take both")
   - If customer selected **Clear only** → upsell to Both ("Add Flow for £X more — most customers take both")
   - If customer selected **Both** → upsell to quarterly ("Save £X by switching to quarterly — most popular choice")
   - If customer selected **Monthly One-Time** → upsell to subscription ("Subscribe & save 20%")
   - This is a single interstitial modal/sheet — one question, two buttons ("Yes, upgrade" / "No thanks, continue"). Not a new page.
   - If declined → proceed to checkout. If accepted → update the variant, then proceed to checkout.

7. **Checkout** — Straight to Shopify checkout. No cart drawer. Create cart → add variant → redirect to `cart.checkoutUrl`. Zero intermediate steps.

**Pre-selection strategy (critical):**
- Both + Monthly Subscription is ALWAYS the default state when the page loads
- Pre-selection has a massive bias effect on what people choose — this is the single most important conversion lever
- "Most Popular" badges reinforce the default as the social proof choice
- The page should feel like the customer is confirming a good default, not building from scratch

**Mobile-specific requirements:**
- Full-width product imagery, edge-to-edge
- Stacked layout — no side-by-side cards on mobile
- Sticky CTA button at bottom of viewport (like Overload)
- Touch-friendly tap targets (min 44px)
- Step indicator always visible (sticky or at top of current step)
- Fast — no heavy animations, lazy load below-fold assets

**Desktop:**
- Can show product cards side-by-side (3 columns)
- Hero asset can be contained/centred rather than edge-to-edge
- Otherwise same flow and logic

**Analytics:** Full tracking — Meta Pixel AddToCart + InitiateCheckout, CAPI, Triple Whale, Vercel events with `source: "funnel_page"`. Track upsell accept/decline rates.

**Size:** Large
**Dependencies:** 3A, 3B (real variant IDs and pricing)
**Can scaffold early:** Layout, step flow, and component structure can be built with mock data. The upsell logic can be wired up with placeholder variants.

### 4B. Direct-to-checkout cart logic

**What:** New cart flow for the funnel page that bypasses the cart drawer:
1. Create a fresh Shopify cart (do NOT reuse the browsing cart)
2. Add the selected variant (with selling plan if subscription)
3. If upsell accepted → update the line item to the upgraded variant before redirect
4. Immediately redirect to `cart.checkoutUrl`

**Why:** The funnel is about minimal friction. Opening a cart drawer adds a step and an exit point. The customer has already made their choice — take them straight to payment.

**Cart attributes:** `source: "funnel_page"`, `plan_frequency` for subscriptions, `upsell_accepted: true/false`.

**Size:** Medium
**Files:** New standalone utility (NOT the global CartContext — this is an isolated checkout flow)
**Dependencies:** 3B

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
| Final pricing (3×3 matrix) | COGS analysis + margin targets | Phase 3, 4 |
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
| TBD | Skio vs Loop | Call scheduled for 2026-03-25 |
| TBD | Landing page URL | — |
| TBD | Funnel page URL | — |

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
