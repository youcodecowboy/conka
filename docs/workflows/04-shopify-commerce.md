# Shopify and Commerce Conventions

> **Purpose:** This document defines how to work with Shopify, the cart/checkout flow, Loop Subscriptions, and other commerce-related logic. Reference this whenever building or modifying anything that touches product data, pricing, cart, checkout, or subscriptions.

---

## When to use this document

- Working with product data (display, filtering, search)
- Modifying the cart or anything near checkout
- Working with Shopify metafields
- Implementing or modifying subscription functionality (Loop)
- Adding or changing collection/product pages
- Dealing with pricing, variants, or inventory

---

## Shopify API usage

### Which API to use

| API | Use when | Access |
|-----|----------|--------|
| **Storefront API** | Reading product data, collections, cart operations, customer data for display | Public token, safe in client-exposed code (but prefer server-side) |
| **Admin API** | Writing data, managing inventory, processing webhooks, accessing order data | Secret token, server-side ONLY (API routes, Server Actions) |

### Storefront API setup
- Client location: `[PATH_TO_SHOPIFY_CLIENT]`
- Access token: `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (env var)
- Endpoint: `https://[STORE].myshopify.com/api/[VERSION]/graphql.json`

### GraphQL query conventions
- All queries live in: `[PATH_TO_SHOPIFY_QUERIES]`
- All response types live in: `[PATH_TO_SHOPIFY_TYPES]`
- Name queries descriptively: `getProduct`, `getCollection`, `getCart`, etc.
- Always request only the fields you need — Shopify rate-limits based on query cost
- Use fragments for shared field sets across queries

```graphql
# Example: keep queries focused
# ✅ Good — only fetches what the product card needs
fragment ProductCard on Product {
  id
  title
  handle
  featuredImage {
    url
    altText
    width
    height
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
}

# ❌ Bad — fetches everything "just in case"
query { product(handle: $handle) { ...everything } }
```

---

## Product data patterns

### Product display hierarchy
```
Product
├── title, description, handle
├── images[] — use featuredImage for cards, images for PDP gallery
├── variants[]
│   ├── id, title, sku
│   ├── price, compareAtPrice
│   ├── availableForSale
│   └── selectedOptions[] (Size, Colour, etc.)
├── options[] — the option definitions (Size: [S, M, L, XL])
├── metafields[] — custom data (ingredients, specs, subscription info, etc.)
└── collections[] — which collections this product belongs to
```

### Metafields
- Metafield definitions: `[LIST YOUR KEY METAFIELDS OR LINK TO SHOPIFY ADMIN]`
- Access pattern:
```tsx
// In your Storefront API query
metafield(namespace: "custom", key: "your_key") {
  value
  type
}

// In your component — always handle null
const metafieldValue = product.metafield?.value;
```

### Key metafields in this project
| Namespace | Key | Type | Purpose |
|-----------|-----|------|---------|
| `[namespace]` | `[key]` | `[type]` | `[what it's for]` |
| `[namespace]` | `[key]` | `[type]` | `[what it's for]` |

> **Fill this table with your actual metafield definitions.**

---

## Variant selection

### How variant selection should work
1. Product page loads with either the first available variant or a default
2. User selects options (Size, Colour, etc.)
3. The selected combination maps to a specific variant ID
4. Price, availability, and images update based on the selected variant
5. "Add to Cart" uses the selected variant ID

### Implementation pattern
```tsx
// Track selected options in state
const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

// Find the matching variant
const selectedVariant = product.variants.find(variant =>
  variant.selectedOptions.every(
    option => selectedOptions[option.name] === option.value
  )
);

// Use selectedVariant for price display and add-to-cart
```

### Edge cases to always handle
- **Variant not available (sold out):** Show as disabled, don't allow add to cart
- **Only one variant:** Hide the option selector, pre-select it
- **Variant-specific images:** Update the image gallery when variant changes
- **Compare-at price:** Show original price crossed out when on sale

---

## Cart operations

### Cart architecture
- Cart is managed via Shopify Storefront API (cart object)
- Cart ID is stored in: `[YOUR_APPROACH — cookie, localStorage, context, etc.]`
- Cart operations location: `[PATH_TO_CART_LOGIC]`

### Cart operations
| Operation | API | Notes |
|-----------|-----|-------|
| Create cart | `cartCreate` mutation | When no cart exists yet |
| Add item | `cartLinesAdd` mutation | Always use variant ID, not product ID |
| Update quantity | `cartLinesUpdate` mutation | Set quantity to 0 to remove |
| Remove item | `cartLinesRemove` mutation | Alternative to updating quantity to 0 |
| Get cart | `cart` query | Fetch on page load to display cart state |
| Apply discount | `cartDiscountCodesUpdate` | Accepts discount codes |

### Cart rules
1. **Always check `availableForSale`** before allowing add-to-cart
2. **Handle cart expiry** — Shopify carts expire after 10 days of inactivity
3. **Optimistic UI** — update the cart UI immediately, revert on API error
4. **Cart count in header** — should update in real-time after add/remove
5. **Never store sensitive data in the cart** — it's client-accessible

---

## Checkout

### Critical rules
- **DO NOT build custom checkout** — use Shopify's hosted checkout (`cart.checkoutUrl`)
- Redirect to `cart.checkoutUrl` when user clicks "Checkout"
- Any customisation happens via Shopify checkout settings or Shopify Functions, NOT in Next.js code
- Post-checkout: use Shopify webhooks for order processing (not polling)

### Checkout URL pattern
```tsx
// In your checkout button
const handleCheckout = () => {
  if (cart?.checkoutUrl) {
    window.location.href = cart.checkoutUrl;
  }
};
```

---

## Loop Subscriptions

### Overview
- Loop handles subscription management: creation, billing, portal
- Integration approach: `[YOUR_APPROACH — embedded widget, API, etc.]`
- Configuration: `[PATH_TO_LOOP_CONFIG_OR_DOCS]`

### Subscription patterns
```
One-time purchase → Standard Shopify checkout
Subscription purchase → Loop-managed checkout flow
Subscription management → Loop customer portal
```

### Working with subscriptions
- Subscription eligibility: `[HOW YOU DETERMINE IF A PRODUCT IS SUBSCRIBABLE — metafield, tag, selling plan, etc.]`
- Selling plan data: available via Storefront API on the product's `sellingPlanGroups`
- Display logic:
  - IF product has selling plans → show subscription option with pricing
  - Show discount compared to one-time price
  - Let user toggle between one-time and subscription

### Key subscription fields
```graphql
# In your product query, include:
sellingPlanGroups(first: 5) {
  edges {
    node {
      name
      sellingPlans(first: 5) {
        edges {
          node {
            id
            name
            options {
              name
              value
            }
            priceAdjustments {
              adjustmentValue {
                ... on SellingPlanPercentagePriceAdjustment {
                  adjustmentPercentage
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Subscription edge cases
- Product available as both one-time and subscription → user must explicitly choose
- Subscription-only products → hide the one-time option
- Subscription price vs one-time price → always show the savings clearly
- Cart with mixed items (subscription + one-time) → ensure both work through checkout

---

## Pricing display

### Rules
1. **Always format prices consistently** — use a shared formatter
2. **Include currency code** — don't assume GBP/USD
3. **Handle compare-at prices** — show original crossed out, sale price highlighted
4. **Subscription pricing** — show per-delivery price AND savings vs one-time

### Price formatting utility
```tsx
// Location: [PATH_TO_PRICE_FORMATTER]
// Should handle:
// - Currency formatting based on currencyCode
// - Locale-appropriate number formatting
// - "From £X" for products with price ranges
// - Sale price display (was / now)
```

---

## Collection and product listing

### Collection pages
- Fetch collection + products via Storefront API
- Support pagination (cursor-based, using Shopify's `after` parameter)
- Support filtering: `[YOUR_FILTERING_APPROACH — Shopify filters, custom, etc.]`
- Support sorting: `[YOUR_SORTING_OPTIONS]`

### Product card consistency
- Every product card should use the same component: `[PATH_TO_PRODUCT_CARD]`
- Required data: title, handle, featured image, price range, availability
- Link to: `/products/[handle]`

---

## Webhooks (if applicable)

- Webhook handler location: `[PATH_TO_WEBHOOK_ROUTES — e.g., app/api/webhooks/]`
- Always verify webhook signatures (HMAC validation)
- Process asynchronously where possible — return 200 quickly
- Key webhooks used:

| Webhook | Purpose | Handler |
|---------|---------|---------|
| `[e.g., orders/create]` | `[Purpose]` | `[Path]` |
| `[e.g., products/update]` | `[Purpose]` | `[Path]` |

---

## Common gotchas

> **Fill this in over time.**

- `[e.g., Shopify Storefront API has a rate limit of 1000 points per second — batch queries to stay under]`
- `[e.g., Cart checkout URLs expire — always fetch a fresh one before redirecting]`
- `[e.g., Product handles can change if the title is edited in Shopify — use ID for stable references]`
- `[e.g., Metafield values are always strings — parse JSON metafields carefully]`
- `[e.g., Selling plan IDs change between Shopify environments — don't hardcode them]`
- `[e.g., Loop subscription portal URL is — [URL_PATTERN]]`

---

## References
- Next.js development: `./03-nextjs-development.md`
- Implementation workflow: `./02-implementation-workflow.md`
- Shopify Storefront API docs: https://shopify.dev/docs/api/storefront
- Loop Subscriptions docs: `[LOOP_DOCS_URL_IF_APPLICABLE]`
