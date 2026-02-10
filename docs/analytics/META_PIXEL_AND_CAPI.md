# Meta Pixel & Conversions API (CAPI)

This doc describes how Meta tracking is implemented and how to get **Purchase** and **AddPaymentInfo** coverage (they occur on Shopify checkout, not in this repo).

## What This Repo Sends

| Event              | When / Where                                      | Deduplication      |
|--------------------|---------------------------------------------------|--------------------|
| **PageView**       | Every page load (client component after pixel)    | `event_id` + CAPI  |
| **ViewContent**    | Product/protocol pages (conka-flow, conka-clarity, protocol/[id]) | `event_id` + CAPI  |
| **AddToCart**      | After successful add in `CartContext`              | `event_id` + CAPI  |
| **InitiateCheckout** | When user clicks “Checkout” in `CartDrawer`      | `event_id` + CAPI  |

**AddPaymentInfo** and **Purchase** do **not** run in this frontend. Checkout happens on **Shopify hosted pages** (`cart.checkoutUrl`). To get those events and improve event coverage:

1. **Shopify’s Meta channel** – In Shopify Admin, install/use the **Facebook & Instagram** channel (or Meta’s official app). Configure it to send **Purchase** (and optionally **AddPaymentInfo**) from Shopify checkout. Use the **same Pixel ID** as this site and, if the channel supports it, send a stable **order ID** as `event_id` for deduplication with any pixel event you send on a thank-you page.
2. **Thank-you page on this domain** – If Shopify redirects to a thank-you URL on this site, you can fire Pixel + CAPI **Purchase** (and optionally **AddPaymentInfo**) there with the order ID as `event_id`.
3. **Server-side (webhook)** – Use Shopify order webhooks to send **Purchase** (and optionally **AddPaymentInfo**) to Meta CAPI from your backend, with order ID as `event_id`.

Until one of the above is in place, Ads Manager may show low coverage for **Purchase** and **AddPaymentInfo**; the events implemented in this repo (PageView, ViewContent, AddToCart, InitiateCheckout) are fully covered with CAPI and deduplication.

## Implementation Details

- **Client:** `app/lib/metaPixel.ts` – generates `event_id`, calls `fbq('track', ..., { eventID })`, and sends the same event to `POST /api/meta/events` (CAPI) with `event_id` and optional `fbp` cookie.
- **Server:** `app/api/meta/events/route.ts` – forwards to Meta Graph API with `event_id`, `user_data.fbp`, and `event_source_url` for deduplication. If `META_CAPI_ACCESS_TOKEN` or pixel ID is missing, the route returns 200 and does nothing so the client never fails.
- **Deduplication:** Same `event_id` is sent with the pixel and with CAPI so Meta can merge them. The `_fbp` cookie is sent as `user_data.fbp` when available to improve matching.

## Environment Variables

- **`NEXT_PUBLIC_META_PIXEL_ID`** – Meta Pixel ID (required for pixel and CAPI).
- **`META_CAPI_ACCESS_TOKEN`** – Server-only; used by the CAPI route. Without it, CAPI is skipped but the site still works.

See `.env.example` for a template.
