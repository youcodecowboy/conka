# B2B Portal

Concise overview of the B2B professional portal: individual vs team purchasing, tiered volume pricing, and cart upgrades.

---

## Summary

The B2B portal (`/professionals`) lets buyers purchase for **an individual** or **for a team**. Both flows use the same volume tier (Starter / Squad / Elite) and the same B2B products. Prices are shown **ex. VAT**; tier is driven by **total B2B boxes in the cart**.

- **Individual** (`/professionals/individual`): Flow, Clear, and one protocol at a time; add-to-cart uses B2B variants and current cart tier.
- **Team** (`/professionals/team`): Flow and Clear only; same B2B tier logic and “Your volume” brick bar.

---

## Why 6 New B2B Products

We introduced **6 new Shopify products** (2 formulas + 4 protocols), each with **3 variants** (Starter, Squad, Elite), so we can:

1. **Track boxes per line** – Each B2B line is a known variant (e.g. Flow B2B – Squad). We map variant ID → product type and boxes-per-unit (Ultimate = 2 boxes, others = 1).
2. **Apply one tier to the whole cart** – Total B2B boxes (including Ultimate × 2) determines the single tier; all B2B lines are normalized to that tier’s variant and price.

Retail products are unchanged; B2B products are separate and only used under `/professionals`. See `docs/development/TEAM_B2B_SHOPIFY_INTEGRATION.md` for Shopify setup and variant IDs.

---

## How the Tiered System Works

- **Tier bands** (from total B2B boxes in cart): **Starter** 1–10, **Squad** 11–25, **Elite** 26+.
- **One tier for all B2B lines** – Every B2B item in the cart uses the same tier (Starter, Squad, or Elite). When total boxes cross a band (e.g. 10 → 11), all B2B lines are updated to the new tier’s variant and price.
- **Pricing** – We show the **subscription** (best) price per box ex-VAT: Starter £61, Squad £55, Elite £50. One-off ex-VAT: £76.25 / £68.75 / £62.50 so that 20% off = £61 / £55 / £50. **Shopify** B2B variant prices are stored **inc-VAT** (one-off £91.50/£82.50/£75.00; subscription £73.20/£66/£60); the **portal UI** displays ex-VAT from app constants so B2B users see the ex-VAT numbers. The **cart drawer** shows line prices as inc-VAT (what they pay) and, when the cart has B2B products, a permanent message that VAT is included plus an optional breakdown (Subtotal ex-VAT · VAT 20% · Total) for the B2B portion only.
- **“Your volume” bar** – The TeamTierKey shows a 26-brick scale (10 Starter | 15 Squad | 1 Elite) filled by current cart B2B boxes; caption shows “26+” when at Elite.

---

## Terms

- **Line** – One cart line item: one variant × quantity (e.g. “2× CONKA Flow B2B – Squad”). `getCartItems()` returns the array of lines in the current cart. B2B logic loops over lines to sum boxes and to decide which lines need a variant/plan swap.
- **Pending boxes** – Boxes not in the cart yet: the quantity the user has selected (e.g. “3” in the Flow selector) but not yet added. We use “cart boxes + pending boxes” so each card can show “if you add this, your tier will be X” and so add-to-cart uses the correct tier variant. The volume bar uses only what’s in the cart (no pending).
- **quantity** (in cart API) – Number of units for that line. Optional in `updateMultiple` so we can send only variant/plan changes.
- **merchandiseId** – Shopify’s variant ID (e.g. `gid://shopify/ProductVariant/…`). Identifies which product variant the line is. We send it in `updateMultiple` to change a line to a different variant (e.g. re-tier from Flow B2B Starter to Flow B2B Squad).
- **sellingPlanId** – Shopify’s selling plan ID (e.g. Loop subscription). When we swap a line’s variant we also send the correct selling plan so the line stays subscription with the right plan.

---

## Why flow tier and clear tier

There is one cart-wide tier. We compute **flow** and **clear** tier separately because we have two cards, each answering: “If I add *this* product with *this* quantity, what tier would I get?” So `flowTotalBoxes` = cart boxes + Flow quantity (e.g. 2); `clearTotalBoxes` = cart boxes + Clear quantity (e.g. 5). Flow tier and clear tier often match (same band) but can differ when the user has selected different quantities. We need both so each card shows the correct price and next-tier message for that product’s add.

---

## How B2B normalization works

After every cart change (fetch, add, update quantity, remove), we run normalization:

1. **Input** – Current cart lines (from `getCartItems()` / `cart.lines.edges`).
2. **Compute tier** – Sum total B2B boxes from all lines (Ultimate = 2 per unit, others = 1); only lines whose variant is in our B2B map count. Call `getB2BTier(totalBoxes)` → one of Starter / Squad / Elite.
3. **Decide updates** – For each B2B line, check if its current variant (and selling plan) already match that tier. If not, add an update: `{ lineId, merchandiseId, sellingPlanId? }` to switch that line to the correct tier variant (and plan if subscription).
4. **Apply** – If there are updates, POST to `/api/cart` with `action: 'updateMultiple'` and those line updates. Shopify updates each line to the new variant/plan.
5. **Feedback** – Set `b2bTierUpdatedTo` so the cart drawer shows “Volume pricing updated to [Tier]”, or `b2bNormalizeError` if the API fails.

Result: all B2B lines stay on the same tier and correct subscription plan.

---

## Cart System Upgrades

To support cart-total tiering we:

1. **B2B variant and box mapping** (`app/lib/b2bCartTier.ts`) – Map each B2B variant ID to product type and `boxesPerUnit`. From cart lines we compute `totalB2BBoxes` and the target `B2BTier`, and produce a list of line updates (variant + optional selling plan) so every B2B line matches that tier.

2. **Cart API** – Extended the cart update path so a line update can include `merchandiseId` and `sellingPlanId` (variant/selling-plan swap), not only quantity.

3. **Normalization after every cart change** (`CartContext`) – After fetch, add-to-cart, quantity update, or remove we call `normalizeB2BTier(cart)`: compute tier from current lines, and if any B2B line’s variant doesn’t match, we PATCH those lines via the cart API. Success is surfaced in the cart drawer (“Volume pricing updated to [Tier]”); failures show a short error with dismiss.

4. **Add-to-cart tier** – On individual and team pages we compute tier from **current cart B2B boxes + pending quantity** and add the correct B2B variant for that tier so the first add is already right; normalization then keeps the cart consistent when quantities change.

Implementation details: `docs/development/B2B_CART_TIER_PLAN.md`.

---

## Loop / subscriptions on B2B products

For B2B subscription add-to-cart to show a **subscription** in the cart (badge, 20% off, selling plan), the **selling plan must be attached to each B2B product** in Shopify. The app sends a selling plan ID when the user selects subscription; if that plan is not attached to the B2B product, Shopify does not apply it and the line appears as one-time.

**What to do in Shopify**

- Attach a **Loop** (or Shopify) selling plan to every B2B variant (all 18: 2 formulas × 3 tiers + 4 protocols × 3 tiers).  
- Either **reuse** the same 28-shot monthly plan you use for retail (`gid://shopify/SellingPlan/711429980534` is what the app uses today), or **create a B2B-specific plan** in Loop with 20% off and attach it to the B2B products only.
- If you create a **new** B2B selling plan, get its GID from Shopify (e.g. Settings → Checkout → Selling plans or the plan URL) and share it so the app can be updated: `app/lib/shopifyProductMapping.ts` has `sellingPlanId` in `B2B_FORMULA_VARIANTS` and `B2B_PROTOCOL_VARIANTS`; replace the current plan ID with the new one for B2B subscription to work.

---

## Checkout: VAT and shipping (Shopify / Loop)

The app sends users to Shopify checkout via `cart.checkoutUrl`. VAT and shipping are **configured in Shopify Admin** (and in Loop if Loop hosts checkout).

### Current VAT approach (inc-VAT in Shopify, ex-VAT in portal)

- **Shopify B2B prices** are stored **including VAT** (one-off £91.50/£82.50/£75.00; subscription £73.20/£66/£60 per tier). Checkout uses the same market as DTC; no separate B2B market. Customers pay the inc-VAT total; Harry creates the formal invoice (e.g. in Xero) with ex-VAT + VAT breakdown.
- **Portal UI** (TeamTierKey, formula/protocol cards) shows **ex-VAT** from app constants (`productData.ts`), so B2B users see £61/£55/£50 subscription and £76.25/£68.75/£62.50 one-off per box.
- **Cart drawer**: When the cart contains any B2B lines, a permanent message explains that prices include VAT at 20% and shows an optional breakdown (Subtotal ex-VAT · VAT 20% · Total) for the B2B portion only. Line items display the inc-VAT price (what they pay). B2C carts are unchanged.

Helpers: `incVatToExVat` / `getVatFromIncVat` in `productData.ts`; `isB2BLine` / `cartHasB2BLines` / `getB2BLinesTotalIncVat` in `b2bCartTier.ts`.

### 1. VAT (20%) at checkout (if you later use a B2B market)

If you introduce a separate B2B market with tax-exclusive pricing:

- **Settings → Taxes and duties** (or **Settings → Markets** → your market → **Duties and import taxes**).
- For **United Kingdom** (or the market used for B2B):
  - Ensure **VAT** is enabled and set to **20%**.
  - Set **“Prices include tax”** to **No** for that region. Then Shopify treats your variant prices as **ex-VAT** and **adds** 20% VAT at checkout (checkout will show: Subtotal, VAT, Total).
- With the **current** setup (inc-VAT prices, single market), no change to Shopify tax settings is required; the cart message and Xero invoicing handle the breakdown.

If Loop hosts checkout, check Loop’s tax settings and ensure they are aligned (prices ex-VAT, VAT added at checkout for UK).

### 2. Shipping (£1.30 per box)

You want shipping to be **£1.30 per box** at checkout. Shopify does not support “per box” as a native dimension; the usual approach is **weight-based** so that “per box” becomes “per unit of weight”.

**Recommended: weight-based shipping**

1. **Give each B2B variant a weight** (e.g. 1 box = 1 kg):
   - In Shopify Admin: **Products** → each B2B product → **Variants** → set **Weight** to **1 kg** (or 0.5 kg if you prefer; see below).
2. **Create a shipping profile** (or use the default) for the region(s) where B2B ships:
   - **Settings → Shipping and delivery** → **Manage rates** for the relevant profile.
3. **Add a rate** that matches “£1.30 per box”:
   - If 1 box = 1 kg: add a rate **“£1.30 per 1 kg”** (or “£1.30 per kg”). Then 5 boxes (5 kg) = £6.50 at checkout.
   - If 1 box = 0.5 kg: use **“£2.60 per 1 kg”** so 1 box (0.5 kg) = £1.30.

**Optional: B2B-only shipping**

- If B2B uses a different shipping profile (e.g. a different delivery service or only certain products), create a **shipping profile** that applies only to the B2B products (or to a “B2B” tag), and add the “£1.30 per 1 kg” (or equivalent) rate there. That way retail products keep their own shipping rules.

**What the app can do**

- The app can show an **estimate** of shipping (e.g. “Shipping (est.): £1.30 × 5 boxes = £6.50”) in the cart drawer or on the B2B pages using `getB2BShippingEstimate` in `app/lib/teamShipping.ts`. Right now that file uses placeholder bands; you can replace them with **£1.30 × totalBoxes** so the estimate matches checkout. The **actual** charge is always calculated by Shopify at checkout based on the weight-based rate above.

### Summary

| Item        | Where it’s done                         | What to do |
|------------|------------------------------------------|------------|
| VAT 20%    | Shopify (and Loop if applicable)        | UK market: “Prices include tax” = No, VAT 20% on. Variant prices stay ex-VAT; VAT added at checkout. |
| Shipping   | Shopify Shipping and delivery           | Set B2B variant weight (e.g. 1 kg per box). Add rate “£1.30 per 1 kg” (or equivalent) so checkout = £1.30 per box. |
| Estimate   | Optional in app (`teamShipping.ts`)     | Use £1.30 × totalBoxes for B2B so the estimate matches checkout. |
