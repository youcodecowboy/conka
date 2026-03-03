# Cart / checkout attributes (LTV tagging)

Single source of truth for attributes we send at add-to-cart. These are passed as **cart line attributes** to Shopify and appear as **line item properties** on the order.

See [LTV_TAGGING_PLAN.md](./LTV_TAGGING_PLAN.md) for context and implementation details.

---

## Attributes (v1)

| Key | Values | When set | Notes |
|-----|--------|----------|--------|
| **source** | `quiz` \| `product_page` \| `protocol_page` \| `product_grid` \| `professional_portal` | Every add-to-cart | Where the add came from. Set by call site via `metadata.source`. |
| **plan_frequency** | `weekly` \| `biweekly` \| `monthly` | Only when the line has a selling plan (subscription) | Derived from `sellingPlanId` via Loop plan IDs. Omitted for one-time purchases. |

---

## Source semantics

| Value | Meaning |
|-------|---------|
| `quiz` | Add from quiz results page (quiz-recommended CTA). |
| `product_page` | Add from a formula PDP (Conka Flow or Conka Clarity page). |
| `protocol_page` | Add from a protocol PDP (`/protocol/[id]`). |
| `product_grid` | Add from the main app product grid (homepage/shop grid). |
| `professional_portal` | Add from the professionals formulas or protocol page. |

---

## How `source` is determined

We do **not** infer the page from the URL at add-to-cart time. We use two pieces together:

1. **Page awareness (call site)**  
   Each place that calls `addToCart` knows which page it is, so it passes the right fallback:
   - Quiz results page → always `source: "quiz"`.
   - Protocol page (`/protocol/[id]`) → `source: getAddToCartSource() === "quiz" ? "quiz" : "protocol_page"`.
   - Formula pages (Conka Flow, Conka Clarity) → same pattern with fallback `"product_page"`.
   - Product grid (ProductCard) → always `source: "product_grid"`.
   - Professionals pages → always `source: "professional_portal"`.

2. **Quiz awareness (`getAddToCartSource()`)**  
   Used only on protocol and formula pages to decide: “Is this add-to-cart still in a quiz flow?” It returns:
   - `"quiz"` if `sessionStorage.quizSessionId` is set (user started the quiz and hasn’t cleared it), or if `document.referrer` contains `"/quiz"`.
   - `"direct"` otherwise.

So: **Page** comes from which component is calling (we hardcode the fallback). **Quiz vs not-quiz** comes from sessionStorage + referrer. We never “detect the page” from the URL inside a shared helper; the call site always provides the page-specific source when it’s not quiz.

`quizSessionId` is set when the user starts the quiz (`trackQuizStarted` in `app/lib/analytics.ts`, which is called from the quiz page with the session id from `useQuizAnalytics`). It persists in the same tab until they close it or clear storage, so if they go quiz → results → “View protocol” → protocol page and add to cart there, we still tag `source: "quiz"`.

---

Mapped from Shopify selling plan GID (Loop subscription plans):

| sellingPlanId (numeric) | plan_frequency |
|-------------------------|----------------|
| 711429882230 | weekly |
| 711429947766 | biweekly |
| 711429980534 | monthly |

GIDs are in the form `gid://shopify/SellingPlan/711429882230`; we match on the numeric part. One-time purchases do not send `plan_frequency`.

---

## Where attributes are sent

- **Cart create** – When creating a new cart with an initial line, attributes are sent on that line (`CartInput.lines[].attributes`).
- **Cart add** – When adding a line to an existing cart, attributes are sent on the new line (`CartLineInput.attributes`).
- **Order** – Shopify stores these as line item properties on the order. No changes to CartDrawer, update, or remove.

---

## Optional attributes (future)

May be added later for richer LTV segmentation:

- `recommended_by_quiz` – `true` when add-to-cart is from quiz results with the quiz-recommended protocol.
- `protocol` – Protocol id (e.g. `1`–`4`) for protocol products.
- `formula` – `flow` \| `clarity` for formula products.
