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
| Flow | 1 box (28 shots) | TBC | TBC | TBC |
| Clear | 1 box (28 shots) | TBC | TBC | TBC |
| Both | 2 boxes (56 shots) | TBC | TBC | TBC |

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

## Phase 2: Ad Landing Page (can start now, copy-dependent)

### 2A. Build the landing page

**What:** New route (URL TBD — e.g. `/lp`, `/start`, `/get-started`) as a standalone page for paid Meta traffic.
**Why:** Sending paid traffic to the homepage kills conversion. The landing page educates cold audiences and funnels them to purchase. This is the single highest-impact change for paid acquisition.

**Page structure (based on January Brands guidance + AG1/Overload/Fussy patterns):**

1. **Hero** — Bold functional headline. AM/PM product framing. Product imagery (not lifestyle). Trust badges (Informed Sport, 4.7★, 500+ reviews, 150,000 bottles sold).
2. **Social proof bar** — Athlete names and logos ABOVE the fold. This is the #1 change from current site — elite endorsements are currently buried at the bottom.
3. **Us vs Them** — CONKA vs Coffee / Energy Drinks. Simple comparison grid. Functional benefits, not science.
4. **Product explanation** — AM = Flow (daily foundation, caffeine-free focus). PM = Clear (recovery, peak performance). Both = the full stack. Keep it "five-year-old simple."
5. **Clinical results** — Scannable stats (+18% focus, +42% sleep, etc.). Not heavy science — just proof points.
6. **Testimonials** — Real customers with product in hand. Athletes. Results-focused quotes.
7. **The app** — "The only supplement you can measure working." App screenshots, score improvement stats. Money-back guarantee hook.
8. **Founder story** — Brief. Builds trust. Why we built this.
9. **CTA sections** — Repeated throughout. All push to the funnel page.

**Design:** Follows existing Soft-Tech Luxury system but can have its own section flow. No main nav (or minimal nav — just logo + CTA). No footer nav clutter.

**SEO:** `noindex` — this page is for paid traffic only.

**Analytics:** Meta Pixel ViewContent, CAPI server-side, Vercel custom events (`lp:viewed`, `lp:cta_clicked`), UTM preservation.

**Size:** Large
**Dependencies:** Copy direction (can scaffold with placeholder copy and iterate)
**Blocked by:** Nothing — can start with layout and placeholder content

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

### 4A. Build the funnel page

**What:** New route (URL TBD) — the conversion page. Minimal UI, maximum clarity.

**Flow:**
1. **Choose cadence** — 3 tabs/pills: Monthly Subscription (pre-selected, tagged "Most Popular"), Monthly One-Time, Quarterly Subscription.
2. **Choose product** — 3 cards: Flow (1 box), Clear (1 box), Both (2 boxes, pre-selected, tagged "Most Popular"). Quarterly adjusts quantities (3/3/6).
3. **Price display** — Updates dynamically based on selection. Show per-shot price and total.
4. **CTA** — "Start My Subscription" / "Buy Now" / "Subscribe & Save". Single button.
5. **Checkout** — Straight to Shopify checkout. No cart drawer. Add to cart → immediately redirect to `cart.checkoutUrl`.

**Design references:** AG1 funnel, Overload offer page, Fussy subscription page, Magic Mind, Ketone IQ.

**Key psychological levers (from January Brands):**
- Pre-select the highest-value option (Both + Monthly Sub)
- "Most Popular" badge on Both
- Show savings vs one-time on subscription tabs
- Minimal information — just enough to choose and buy
- Large product imagery

**Analytics:** Full tracking — Meta Pixel AddToCart + InitiateCheckout, CAPI, Triple Whale, Vercel events with `source: "funnel_page"`.

**Size:** Large
**Dependencies:** 3A, 3B (real variant IDs and pricing)
**Can scaffold early:** Layout and component structure can be built with mock data

### 4B. Direct-to-checkout cart logic

**What:** New cart flow for the funnel page that bypasses the cart drawer:
1. Create a fresh Shopify cart
2. Add the selected variant (with selling plan if subscription)
3. Immediately redirect to `cart.checkoutUrl`

**Why:** The funnel is about minimal friction. Opening a cart drawer adds a step and an exit point. The customer has already made their choice — take them straight to payment.

**Cart attributes:** `source: "funnel_page"`, `plan_frequency` for subscriptions.

**Size:** Medium
**Files:** New utility or modification to `CartContext.tsx` (probably a standalone function, not the global cart)
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
- Competitor references: AG1, Overload, Fussy, Magic Mind, Ketone IQ
