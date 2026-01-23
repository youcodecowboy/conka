# Triple Whale Setup for Shopify Headless

**Your Setup:** Next.js frontend + Shopify backend (headless)
**Checkout:** Happens on Shopify's hosted checkout page

---

## What You Need to Do

### Step 1: Add Triple Pixel to Next.js Site

**Why:** Track add-to-cart events that happen on your Next.js site.

**Where:** Triple Whale Dashboard → Settings → Pixel Settings

**What to get:**
- Triple Pixel installation code (script tag or JavaScript snippet)
- Your Triple Whale pixel ID

---

### Step 2: Verify Shopify Connection

**Why:** Purchase events happen on Shopify checkout, so Triple Whale needs to be connected to Shopify.

**Check:**
- Triple Whale Dashboard → Settings → Integrations → Shopify
- Should show "Connected" if already set up
- If not connected, connect it (Triple Whale will guide you)

---

## Implementation Steps

### Step 1: Get Triple Pixel Code

1. In Triple Whale Dashboard
2. Go to **Settings → Pixel Settings** (or **Installation**)
3. Copy the installation code
4. It will be either:
   - A script URL: `https://cdn.triplewhale.com/pixel/...`
   - JavaScript code: `window.TW = ...` or `twq('init', ...)`
   - A pixel ID: `TW-1234567890`

### Step 2: Add to Next.js Site

Once you have the code, I'll add it to `app/layout.tsx` (similar to how Meta Pixel is added).

### Step 3: Track Add-to-Cart Events

I'll add Triple Pixel tracking to your `addToCart` function in `CartContext.tsx`.

**What gets tracked:**
- Product ID
- Variant ID
- Quantity
- Price
- Product name

### Step 4: Purchase Tracking

**Good news:** If Triple Whale is connected to Shopify, purchase events are **automatically tracked** when users complete checkout on Shopify's hosted checkout page.

**You don't need to do anything** - Shopify sends order data to Triple Whale automatically.

---

## What Events Will Be Tracked

### On Your Next.js Site (via Triple Pixel):
- ✅ Add to cart
- ✅ Product page views (optional)
- ✅ Cart viewed (optional)

### On Shopify Checkout (automatic):
- ✅ Checkout started
- ✅ Purchase completed
- ✅ Order details (products, revenue, customer)

---

## Quick Checklist

**In Triple Whale:**
- [ ] Found Pixel Settings
- [ ] Copied installation code
- [ ] Verified Shopify integration is connected

**What to tell me:**
- What format is the code? (script URL, JavaScript, or pixel ID)
- Paste the code here and I'll add it to your site

---

## Next Steps

1. **Get Triple Pixel code** from Triple Whale
2. **Share it with me** (paste here)
3. **I'll add it** to your site
4. **Test** add-to-cart tracking
5. **Verify** purchase tracking (should work automatically via Shopify)

---

**Last Updated:** 2025-01-23
