# B2B Cart-Total Tier – Implementation Plan

**Purpose:** Implement cart-total tier for all B2B products (Flow, Clear, Resilience, Precision, Balance, Ultimate). Tier is determined by **total B2B boxes in the cart**; all B2B lines are normalized to that single tier. Individual and team pages under `/professionals` are B2B; no mixing with retail tier logic.

---

## 1. Scope

| Item | Decision |
|------|----------|
| **B2B products** | Flow, Clear, Resilience, Precision, Balance, Ultimate (all 6 B2B products; 18 variants) |
| **Pages** | Everything under `/professionals` (individual + team) is B2B |
| **Tier logic** | Applied only to B2B products; retail lines untouched |
| **Normalization** | Client-side only (in CartContext after cart fetch/add/update/remove) |
| **User feedback** | Small message in cart drawer when tier is updated; show error in drawer if normalization fails |
| **Mixing** | No mixing: only B2B lines are re-tiered; cart can contain retail + B2B, but B2B lines share one tier |

---

## 2. Definition of Done

- User on professionals (individual or team) adds B2B products (formulas and/or protocols).
- Cart shows **one** tier (Starter/Squad/Elite) for all B2B lines, based on **total B2B boxes** (Ultimate = 2 boxes per unit).
- Changing quantities so total crosses a tier boundary (e.g. 25 → 26) updates all B2B lines to the new tier; user sees a short message in the cart drawer (e.g. “Volume pricing updated to Elite”).
- If normalization fails (API error), show a non-blocking message in the drawer; cart remains as-is.
- CartDrawer and checkout unchanged for display; retail carts (no B2B) behave exactly as today.

---

## 3. Prerequisites

- **B2B formula variants** – Already in `B2B_FORMULA_VARIANTS` (Flow, Clear).
- **B2B protocol variants** – Add `B2B_PROTOCOL_VARIANTS` (or equivalent) with 12 variant IDs (Starter/Squad/Elite for Resilience, Precision, Balance, Ultimate). Use the variant IDs from the Postman response (see Appendix).
- **Ultimate = 2 boxes** – When counting total B2B boxes, 1 unit of Ultimate counts as 2 boxes; all others 1 box per unit.

---

## 4. Implementation Phases

### Phase A: Data and API

1. **Add B2B protocol variant mapping**
   - In `app/lib/shopifyProductMapping.ts` (or a small B2B-specific module), add a structure mapping protocol ID (`"1"`–`"4"`) and `B2BTier` to `{ variantId, sellingPlanId }` for all 12 B2B protocol variants.
   - Expose a helper e.g. `getB2BProtocolVariantId(protocolId, tier, purchaseType)`.
   - Build a **set of all B2B variant IDs** (formulas + protocols) and a **reverse map**: variant ID → `{ productType: "formula"|"protocol", productId: string, boxesPerUnit: number }` (Ultimate = 2, others = 1). Use this for “is this line B2B?” and “how many boxes does this line contribute?”.

2. **Extend cart API for variant (and selling plan) swap**
   - In `app/api/cart/route.ts`, extend the `update` action (or add a new action e.g. `updateLines`) so that each line in the request can include optional `merchandiseId` and `sellingPlanId` (in addition to `id` and `quantity`).
   - In `app/lib/shopifyQueries.ts`, ensure the `cartLinesUpdate` mutation is called with `CartLineUpdateInput` that includes `merchandiseId` and `sellingPlanId` when provided.
   - Validate that Shopify Storefront API accepts these fields (it does per [Shopify docs](https://shopify.dev/docs/api/storefront/latest/mutations/cartLinesUpdate)).

### Phase B: B2B Tier Logic (client)

3. **B2B cart-tier helper module**
   - New file e.g. `app/lib/b2bCartTier.ts` (or under `app/lib/cart/`).
   - **Input:** Cart lines (from Cart context / API response).
   - **Output:**
     - `totalB2BBoxes`: number (formulas × quantity + protocols × quantity, Ultimate × 2).
     - `chosenTier`: `B2BTier` via `getB2BTier(totalB2BBoxes)`.
     - `updates`: array of `{ lineId, merchandiseId, sellingPlanId? }` for each B2B line whose current variant (and selling plan) does not match the chosen tier.
   - Use the reverse map (variant ID → product type + boxes per unit) to identify B2B lines and compute total boxes; use `B2B_FORMULA_VARIANTS` and `B2B_PROTOCOL_VARIANTS` to get the target variant and selling plan per line for `chosenTier`.
   - **Idempotent:** Only include a line in `updates` if its current `merchandise.id` (and selling plan) differs from the target for `chosenTier`.

4. **CartContext: run normalization after cart changes**
   - After every path that results in a new cart (e.g. `fetchCart` success, `addToCart` success, `updateQuantity` success, `removeItem` success), call the B2B tier helper with the new cart’s lines.
   - If `updates.length > 0`, call the cart API to apply the line updates (variant + optional selling plan), then set cart state from the API response.
   - If the API call fails, set a small, non-blocking error state (e.g. `b2bNormalizeError: string | null`) and leave the cart as-is; do not clear the cart.
   - Optionally set a short success state (e.g. `b2bTierUpdatedTo: B2BTier | null`) when normalization applied updates, so the drawer can show “Volume pricing updated to Squad”.

5. **CartDrawer: show message and error**
   - Consume `b2bTierUpdatedTo` and `b2bNormalizeError` from context (or pass as props if you prefer).
   - When `b2bTierUpdatedTo` is set, show a small message in the drawer (e.g. “Volume pricing updated to [Squad]”) and clear it after a few seconds or when the drawer is closed.
   - When `b2bNormalizeError` is set, show a small error message in the drawer (e.g. “Couldn’t update volume pricing. Please try again.”) with an option to dismiss or retry.

### Phase C: Professionals Pages (B2B)

6. **Individual page: use B2B formulas (and protocols when applicable)**
   - Switch formula add-to-cart to use B2B variant resolution: e.g. derive tier from **current cart B2B boxes + new quantity** (or use a default tier and rely on normalization after add).
   - Use `getB2BFormulaVariantId("01" | "02", tier, purchaseType)` and ensure protocol add-to-cart uses B2B protocol variants when the individual flow is B2B (per your decision that everything under `/professionals` is B2B).
   - Ensure tier shown on the page (if any) is consistent with “cart total” once cart is loaded (e.g. optional: read cart from context and show “Your current volume tier: Squad” when cart has B2B lines).

7. **Team page: keep or refine add-to-cart**
   - Either keep adding with page-derived tier and let normalization fix to cart total, or (recommended) before add, compute `totalB2BBoxes = existing B2B boxes from cart + new quantity` and use `getB2BTier(totalB2BBoxes)` to choose the variant for the new line. Reduces unnecessary variant swaps.
   - Ensure team page tier UI (e.g. TeamTierKey, TeamFormulaCard) can reflect cart total when cart is loaded (e.g. show “Current cart tier: Squad” if desired).

### Phase D: Testing and Edge Cases

8. **Manual testing**
   - Cart with only B2B lines: add Flow + Clear + protocol; change quantity to cross tier; confirm all lines update and message appears.
   - Cart with retail + B2B: confirm only B2B lines are re-tiered; retail unchanged.
   - Cart with only retail: confirm no B2B logic runs, no errors.
   - Normalization failure: simulate API error; confirm error message in drawer and cart unchanged.

9. **Edge cases**
   - Empty cart: no normalization.
   - Single B2B line: tier = getB2BTier(quantity); no-op if already correct variant.
   - Ultimate: 1 unit counts as 2 boxes in total; when we have B2B protocol variants, Ultimate uses same tier grid (Starter/Squad/Elite).

---

## 5. Files to Touch (Summary)

| Area | Files |
|------|--------|
| **Variant mapping** | `app/lib/shopifyProductMapping.ts` (add B2B protocol variants + reverse map / helpers) |
| **Cart API** | `app/api/cart/route.ts`, `app/lib/shopifyQueries.ts` (line update with merchandiseId/sellingPlanId) |
| **B2B tier logic** | New: `app/lib/b2bCartTier.ts` (or similar) |
| **Cart state / normalization** | `app/context/CartContext.tsx` (run normalization, expose b2bTierUpdatedTo / b2bNormalizeError) |
| **Drawer UI** | `app/components/CartDrawer.tsx` (show message and error) |
| **Professionals pages** | `app/professionals/protocol/page.tsx`, `app/professionals/formulas/page.tsx` (use B2B variants; optional cart-tier display) |

---

## 6. Safety

- Only B2B lines (variant ID in the B2B set) are considered for tier and updates; retail lines are never modified by this logic.
- Normalization is idempotent: only send updates when current variant (and selling plan) differs from the target for the chosen tier.
- On normalization failure, do not clear or overwrite the cart; show error and leave cart as-is.
- Existing retail flows (shop, quiz, etc.) unchanged; cart API remains backward compatible (quantity-only updates still work).

---

## Appendix: Postman Request for B2B Variant IDs

Use this to fetch all 18 variant IDs (Starter, Squad, Elite for each of the 6 B2B products) in one call.

**Request**

- **Method:** `POST`
- **URL:** `https://conka-6770.myshopify.com/admin/api/2024-01/graphql.json`
- **Headers:**
  - `Content-Type`: `application/json`
  - `X-Shopify-Access-Token`: `<your Admin API access token>`

**Body (raw JSON)**

```json
{
  "query": "query GetB2BVariantIds { nodes(ids: [\"gid://shopify/Product/15573230780790\", \"gid://shopify/Product/15573251031414\", \"gid://shopify/Product/15573265809782\", \"gid://shopify/Product/15573280293238\", \"gid://shopify/Product/15573268005238\", \"gid://shopify/Product/15573271445878\"]) { ... on Product { title variants(first: 10) { nodes { id title } } } } }"
}
```

**Product IDs in the query**

| Product | Product GID |
|---------|-------------|
| CONKA Flow – B2B | `gid://shopify/Product/15573230780790` |
| CONKA Clear – B2B | `gid://shopify/Product/15573251031414` |
| Resilience – B2B | `gid://shopify/Product/15573265809782` |
| Precision – B2B | `gid://shopify/Product/15573280293238` |
| Balance – B2B | `gid://shopify/Product/15573268005238` |
| Ultimate – B2B | `gid://shopify/Product/15573271445878` |

**Response**

- `data.nodes` is an array of 6 products; each has `title` and `variants.nodes[]` with `id` (variant GID) and `title` (Starter / Squad / Elite).
- Use the `id` values as the 18 variant GIDs for `B2B_FORMULA_VARIANTS` (Flow, Clear) and `B2B_PROTOCOL_VARIANTS` (Resilience, Precision, Balance, Ultimate).

**Optional: Pretty-printed query (same request, for readability)**

If you prefer to send a multi-line query, use this in Postman (Body → raw → JSON) and escape newlines as `\n` in the JSON string, or use a variable. Equivalent query:

```graphql
query GetB2BVariantIds {
  nodes(ids: [
    "gid://shopify/Product/15573230780790",
    "gid://shopify/Product/15573251031414",
    "gid://shopify/Product/15573265809782",
    "gid://shopify/Product/15573280293238",
    "gid://shopify/Product/15573268005238",
    "gid://shopify/Product/15573271445878"
  ]) {
    ... on Product {
      title
      variants(first: 10) {
        nodes {
          id
          title
        }
      }
    }
  }
}
```

In raw JSON body, the `query` field must be a single line; the one-line version in the Body (raw JSON) above is valid as-is.
