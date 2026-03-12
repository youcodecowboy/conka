# Testing and Validation (Website)

> **Purpose:** This document defines how to verify that implemented code works correctly on the website project. Follow this process to validate work before marking it complete.

---

## When to use this document

- After implementing a feature or fix
- When verifying a bug fix resolves the issue
- When checking that changes don't break existing functionality

---

## Testing layers

### Layer 1: Local development
Quick checks during development.

- [ ] Page renders without errors
- [ ] No console errors or warnings
- [ ] Data loads correctly from Shopify
- [ ] Interactive elements work (buttons, forms, navigation)
- [ ] Responsive: check at mobile (375px), tablet (768px), desktop (1280px)

### Layer 2: Preview deployment (PRIMARY testing environment)
This is where real testing happens — the preview is a production-like environment.

1. **Push your branch** — Vercel auto-creates a preview
2. **Wait for build to succeed** — check Vercel dashboard or GitHub status check
3. **Test on the preview URL** — this is what you should verify, not just localhost

**Why preview > localhost:**
- Uses real environment variables (same as production)
- Runs on real Edge/Serverless infrastructure
- Shopify API calls behave as they will in production
- Catches build errors that don't appear in dev mode
- Shareable with others for feedback

---

## Commerce flow testing

### Product display
- [ ] Product title, description, images load correctly
- [ ] Price displays correctly (including currency)
- [ ] Compare-at price shows sale formatting when applicable
- [ ] All variants are shown and selectable
- [ ] Sold-out variants are disabled / marked as unavailable
- [ ] Variant selection updates price and image
- [ ] Metafield data displays correctly (if applicable)
- [ ] Subscription option shows with correct pricing (if applicable)
- [ ] "From" price shows on product cards with price ranges

### Cart operations
| Test | Expected |
|------|----------|
| Add item to empty cart | Cart creates, item appears, count updates |
| Add item to existing cart | Item added, count increments |
| Add same item twice | Quantity increases (not duplicate line) |
| Change quantity | Price updates, total recalculates |
| Set quantity to 0 or remove | Item removed, cart updates |
| Add sold-out variant | Should be prevented (button disabled) |
| Add subscription item | Selling plan attached, subscription price shown |
| Cart with mixed items | Both one-time and subscription items display correctly |
| Apply discount code | Discount applied, totals updated |
| Cart after page refresh | Cart persists (from cookie/storage) |
| Empty cart state | Helpful message, link to continue shopping |

### Checkout flow
- [ ] "Checkout" button redirects to Shopify checkout
- [ ] Cart items appear correctly in Shopify checkout
- [ ] Subscription items show correct billing frequency
- [ ] Discount codes carry through to checkout
- [ ] Return to site from checkout works (back button / continue shopping)

> **Note:** You cannot test payment processing in preview. Verify the redirect works and items are correct in the Shopify checkout page.

---

## Page and navigation testing

For every new or modified page:

| Check | How |
|-------|-----|
| Page loads without error | Navigate to URL directly and via internal links |
| Loading state works | Throttle network in DevTools, verify skeleton/spinner |
| Error state works | Temporarily break the data source, verify error boundary |
| Empty state works | Use a query that returns no results |
| Navigation to and from | Click to the page, click away, use back button |
| Deep linking | Paste the URL directly into a new tab |
| 404 handling | Navigate to a non-existent variant of the URL |

---

## SEO verification

For every new or modified page, check in the browser:

1. **View page source** (not DevTools) — verify SSR content is present:
   - [ ] Title tag is correct
   - [ ] Meta description is present
   - [ ] OG tags are present
   - [ ] Content is in the HTML (not loaded client-side only)

2. **Structured data:**
   - [ ] Paste URL into Google's Rich Results Test (if applicable)
   - [ ] Product pages have Product structured data
   - [ ] Prices in structured data match displayed prices

3. **Accessibility basics:**
   - [ ] All images have alt text
   - [ ] Page has a single H1
   - [ ] Interactive elements are keyboard-accessible
   - [ ] Colour contrast is sufficient

---

## Performance verification

Run on the **preview deployment** (not localhost):

### Lighthouse check
1. Open Chrome DevTools → Lighthouse tab
2. Run for Mobile and Desktop
3. Target scores:

| Category | Target |
|----------|--------|
| Performance | 90+ |
| Accessibility | 90+ |
| Best Practices | 90+ |
| SEO | 95+ |

### Core Web Vitals
- [ ] LCP < 2.5s (check the largest element loads fast)
- [ ] CLS < 0.1 (no layout shift — elements don't jump)
- [ ] FID < 100ms (page responds to clicks quickly)

### Common performance issues to check
- [ ] Images are optimised (using next/image, appropriate sizes)
- [ ] No large JavaScript bundles loaded unnecessarily
- [ ] Fonts don't cause FOUT/FOIT (flash of unstyled/invisible text)
- [ ] Third-party scripts don't block rendering

---

## Cross-browser and device testing

### Minimum test matrix
- [ ] Chrome desktop
- [ ] Safari desktop (for macOS users)
- [ ] Chrome mobile (Android)
- [ ] Safari mobile (iOS)

### Key things that break across browsers
- CSS features (check Can I Use for anything unusual)
- Scroll behaviour
- Form input handling (especially on iOS Safari)
- Touch targets (minimum 44x44px on mobile)

> **If you can only test one browser, test mobile Safari — it's the most restrictive.**

---

## Regression check

### Quick regression after any change
- [ ] Homepage loads correctly
- [ ] Product listing pages load and show products
- [ ] A product detail page loads with correct data
- [ ] Add to cart works
- [ ] Cart page shows correct items and totals
- [ ] Checkout redirect works
- [ ] Navigation (header, footer, menus) works
- [ ] No new console errors on any page

### When to do deeper regression
- Changes to layout components (header, footer, global nav)
- Changes to the Shopify data layer (queries, types, client)
- Changes to cart logic
- Changes to middleware
- Changes to `next.config.js`
- Adding/updating major dependencies

---

## Bug fix validation

1. **Reproduce the original bug** on the preview deployment
2. **Apply the fix** and push
3. **Verify on the new preview deployment** — the bug is gone
4. **Test adjacent scenarios** — nothing nearby is broken
5. **Test the edge case** that likely caused the bug

---

## Test output format

```
## Testing: [Feature/Fix Name]
**Preview URL:** [Vercel preview URL]

### Tested
- ✅ [What was tested and passed]
- ✅ [What was tested and passed]
- ❌ [What was tested and failed — with details]

### Not tested (flagged)
- ⚠️ [What couldn't be tested and why]

### Performance
- Lighthouse mobile: [score]
- Lighthouse desktop: [score]
- Notable CWV issues: [none / details]

### Notes
- [Any observations, edge cases, or recommendations]
```

---

## References
- Code review: `./06-code-review.md`
- Implementation workflow: `./02-implementation-workflow.md`
- Next.js development: `./03-nextjs-development.md`
- Shopify conventions: `./04-shopify-commerce.md`
