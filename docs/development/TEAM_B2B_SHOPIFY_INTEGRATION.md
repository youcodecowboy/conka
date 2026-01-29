# Team B2B – Shopify Integration

**Purpose:** What to create in Shopify (all products + protocols), step-by-step how to do it (including duplicate-then-edit), what to return to the developer, and why this approach is sane.

---

## 1. Is this the right approach?

**Yes.** Creating 6 new B2B products (2 formulas + 4 protocols), each with 3 variants (Starter, Squad, Elite), is the right and sane approach.

- **Same physical product, different price:** Each variant is the same 28-shot box; the only difference is the price tier. You do **not** need new physical SKUs for fulfilment unless you want to track tiers in warehouse/accounting. In Shopify you can leave variant SKU blank or reuse the same SKU for all three tiers; the variant ID is what the site uses. If Xero or inventory needs to distinguish, use something like `FLOW-TEAM-STARTER` / `FLOW-TEAM-SQUAD` / `FLOW-TEAM-ELITE` per variant—that’s a business choice, not a technical requirement.
- **Simplest way in Shopify:** Duplicate the existing product (e.g. CONKA Flow 28-shot), rename it, then replace variants with the 3 tiers and set prices. No need to build from scratch. Repeat for all 6 products.

---

## 2. Scope: what you’re creating

| Type      | Products | Variants each | Total variants |
|-----------|----------|---------------|----------------|
| Formulas  | CONKA Flow – B2B, CONKA Clear – B2B | 3 (Starter, Squad, Elite) | 6  |
| Protocols | Resilience – B2B, Precision – B2B, Balance – B2B, Ultimate – B2B | 3 (Starter, Squad, Elite) | 12 |
| **Total** | **6 products** | | **18 variants** |

**Prices (ex-VAT) for every variant:** Starter £61, Squad £55, Elite £50 per box. Subscription = 20% off (use existing 28-shot monthly plan or one new “Team” plan).

**Ultimate Protocol = 2 boxes per unit:** One unit of Ultimate is 1× Flow + 1× Clear (2 physical boxes). When computing total B2B boxes for tier (Starter/Squad/Elite), count 1 unit of Ultimate as **2 boxes**. All other B2B products: 1 unit = 1 box.

---

## 3. Created B2B products (Shopify admin)

Products were duplicated and renamed to end with **– B2B**. Same SKUs as source. Tier option: Starter (£61), Squad (£55), Elite (£50) ex-VAT. All drafts; sales channel: **Conka Headless** only.

| Product | Admin URL | Product GID |
|---------|-----------|-------------|
| CONKA Flow – B2B | [admin …/products/15573230780790](https://admin.shopify.com/store/conka-6770/products/15573230780790) | `gid://shopify/Product/15573230780790` |
| CONKA Clear – B2B | [admin …/products/15573251031414](https://admin.shopify.com/store/conka-6770/products/15573251031414) | `gid://shopify/Product/15573251031414` |
| Resilience – B2B | [admin …/products/15573265809782](https://admin.shopify.com/store/conka-6770/products/15573265809782) | `gid://shopify/Product/15573265809782` |
| Precision – B2B | [admin …/products/15573280293238](https://admin.shopify.com/store/conka-6770/products/15573280293238) | `gid://shopify/Product/15573280293238` |
| Balance – B2B | [admin …/products/15573268005238](https://admin.shopify.com/store/conka-6770/products/15573268005238) | `gid://shopify/Product/15573268005238` |
| Ultimate – B2B | [admin …/products/15573271445878](https://admin.shopify.com/store/conka-6770/products/15573271445878) | `gid://shopify/Product/15573271445878` |

**What's next / still needed:** The **18 variant GIDs** (Starter, Squad, Elite for each product). Product URLs above give product IDs only; add-to-cart needs each variant's ID. See section 5 for the template to fill and send.

---

## 4. Step-by-step: what to do in Shopify

Do the following for **each** of the 6 products (2 formulas, then 4 protocols). Use “duplicate then edit” so you keep title, description, and media; you only change name, variants, and prices.

### 4.1 Duplicate the right product

- **Formulas:** Duplicate your existing **CONKA Flow** (28-shot) product once, and your existing **CONKA Clear** (28-shot) product once.
- **Protocols:** Duplicate your existing **Resilience**, **Precision**, **Balance**, and **Ultimate** products once each (use the 28-shot or main variant product as the source if you have multiple).

You should now have 6 duplicated products in draft (or active).

### 4.2 Rename the product

- Change the product title to the B2B name, e.g.:
  - `CONKA Flow – Team`
  - `CONKA Clear – Team`
  - `Resilience Protocol – Team`
  - `Precision Protocol – Team`
  - `Balance Protocol – Team`
  - `Ultimate Protocol – Team`

(Optional: add “B2B” or “Volume” if you prefer; the site only needs the variant IDs.)

### 4.3 Replace variants with the 3 tiers

- Open the duplicated product → **Variants**.
- Remove all existing variants except one (or delete all and add new).
- You need **exactly 3 variants** with:
  - **Option name:** e.g. `Tier` or `Volume`.
  - **Values:** `Starter`, `Squad`, `Elite`.
- Set **Price** for each variant (ex-VAT):
  - Starter: **£61.00**
  - Squad: **£55.00**
  - Elite: **£50.00**
- **SKU:** Leave blank or set the same/different per tier depending on your accounting (see section 1). Not required for the website.

### 4.4 Attach subscription (20% off)

- For each of the 3 variants, attach a selling plan:
  - Either your **existing 28-shot monthly** selling plan (20% off), or
  - A **new** selling plan (e.g. “Team monthly”, 20% off) and attach it to all B2B variants.
- Ensure the plan applies 20% discount so subscription prices are £48.80 / £44 / £40 per box (ex-VAT).

### 4.5 Save and repeat

- Save the product. Repeat **3.1–3.4** for the other 5 products so all 6 B2B products have 3 variants each at £61 / £55 / £50 with subscription attached.

### 4.6 Get variant IDs to send to the developer

- For each product: open it → **Variants** → click each variant (Starter, Squad, Elite).
- In the URL you’ll see the variant ID (numeric). Format it as: `gid://shopify/ProductVariant/XXXXXXXXXX`
- Collect all **18 variant GIDs**. If you created a **new** selling plan, get its GID from **Settings → Checkout → Selling plans** (or from the plan’s URL).

---

## 5. Information to return to the developer

Send a single list with **all 18 variant GIDs**, clearly labelled by product and tier. Example:

```
CONKA Flow – B2B:
  Starter:  gid://shopify/ProductVariant/_______
  Squad:    gid://shopify/ProductVariant/_______
  Elite:    gid://shopify/ProductVariant/_______

CONKA Clear – B2B:
  Starter:  gid://shopify/ProductVariant/_______
  Squad:    gid://shopify/ProductVariant/_______
  Elite:    gid://shopify/ProductVariant/_______

Resilience – B2B:
  Starter:  gid://shopify/ProductVariant/_______
  Squad:    gid://shopify/ProductVariant/_______
  Elite:    gid://shopify/ProductVariant/_______

Precision – B2B:
  ... (same)

Balance – B2B:
  ... (same)

Ultimate – B2B:
  ... (same)
```

If you created a **new** selling plan for B2B, also send:

```
Selling plan:  gid://shopify/SellingPlan/_______
```

If you reused the existing 28-shot monthly plan, say “same as 28-shot monthly”.

---

## 6. What the developer does with this

- Pastes the 18 variant IDs into the codebase (formulas in `TEAM_FORMULA_VARIANTS`, protocols in a matching structure, e.g. `TEAM_PROTOCOL_VARIANTS`).
- Implements **Option B (cart-total tier):** when the cart is opened or updated, the app (1) counts total B2B boxes (formulas + protocols; **1 unit of Ultimate = 2 boxes**), (2) picks one tier (Starter/Squad/Elite) for the whole order, (3) updates every B2B line to that tier’s variant via Shopify’s cart line update API. No discount codes; prices stay variant prices.
- Switches the team B2B UI to show **ex-VAT** prices and labels.

---

## 6. Option B in one sentence

Tier is determined by **total B2B boxes in the cart**; the app then updates every B2B line item to use the variant (and price) for that tier so the whole order is on one price tier.

---

## 8. Summary checklist

| Step | Action |
|------|--------|
| 1 | In Shopify: Duplicate the 6 source products (Flow, Clear, Resilience, Precision, Balance, Ultimate). |
| 2 | Rename each to "[Name] – B2B". |
| 3 | Replace variants with 3 only: Starter (£61), Squad (£55), Elite (£50) ex-VAT. |
| 4 | Attach subscription (20% off) to all 18 variants. |
| 5 | Collect all 18 variant GIDs (and new selling plan GID if created). |
| 6 | Send the list to the developer. |
