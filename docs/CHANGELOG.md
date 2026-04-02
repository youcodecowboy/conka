# Changelog

> High-level record of what changed, when, and why. One entry per meaningful change. For implementation details, see git history or the referenced docs/PRs.

---

## April 2026

### 2026-04-02 — Landing page visual system
Replaced the heavy black/neutral section backgrounds with a single subtle tint (`#f4f5f8`). CTA buttons now use brand accent (`#4058bb`). Established 4-tier text colour system (100/80/60/40%), consistent heading spacing (`mb-10`), and killed all inline style opacity. Product split cards now show individual bottle images instead of shared AM/PM lifestyle shot. Footnote anchors styled as muted superscript.
**Why:** Competitive analysis (Headstrong, Overload, AG1, Magic Mind) showed the page was too heavy. Evidence-based approach documented in `docs/branding/LANDING_PAGE_VISUAL_SYSTEM.md`.
**PR:** #150

### 2026-04-01 — Testimonial section on homepage
Testimonial heading/subtitle now inherit text colour from the parent section background.
**PR:** #149

### 2026-04-01 — Funnel CRO optimisation (3 phases)
Reordered funnel to Product > Cadence > Checkout. Reworked upsell logic. Hardened copy across landing and funnel pages. Migrated landing + funnel from `premium-base.css` to `brand-base.css`. Fixed compliance, alt text, and anchor consistency.
**Why:** Conversion rate optimisation following initial funnel build.
**PR:** #148

### 2026-04-01 — Cookie consent banner
Added CookieYes consent banner for GDPR compliance.
**PR:** #146

### 2026-04-01 — Legal pages
Created terms, privacy policy, and cookies pages. Updated contact email to info@conka.io.
**Why:** Legal requirement before running paid traffic.
**PR:** #145

### 2026-04-01 — Landing page code quality
Review-driven cleanup: guarantee mismatch fix, noindex added, server component conversion, code quality pass.
**PR:** #144

---

## March 2026

### 2026-03-31 — Brand guidelines integration
New `brand-base.css` design system tokens. Added Neue Haas Grotesk and JetBrains Mono fonts. Created claims compliance doc, brand voice doc, quality standards. Established local rules for components and pages.
**Why:** New brand direction from marketing. Previous system (`premium-base.css`) was ad-hoc. Needed a single source of truth.
**PR:** #143

### 2026-03-31 — Development workflow improvement
Added quality standards doc. Enforced mobile-first across workflows. Added brand voice, code review, UX iteration, and Jira workflow docs.
**PR:** #142

### 2026-03-30 — Funnel bug fixes (Henry feedback)
Fixed offer constants, icons, copy, and count display issues flagged during internal review.
**PR:** #141

### 2026-03-27 — Funnel page UX iteration
Better styling, layout, pre-selection defaults, copy refinement, upsell improvements. Integrated real Shopify product data for Flow/Clear monthly variants.
**Why:** Iterating toward launch-ready state after initial build.
**PRs:** #137, #138, #139, #140

### 2026-03-25-26 — Funnel page built
Multi-step paginated funnel (Plan > Product > Checkout). Standalone data layer (`funnelData.ts`), isolated checkout flow (`funnelCheckout.ts`), step indicator, upsell modal, analytics events. Mobile-first.
**Why:** January Brands workshop identified frictionless funnel as the primary conversion lever. Overload/Fussy pattern.
**PR:** #137

### 2026-03-25 — Landing page built
8-section landing page at `/start` for paid Meta traffic. Hero, benefits, product split, what's inside, testimonials, guarantee, case studies, FAQ. All CTAs point to `/funnel`. Noindex.
**Why:** Paid traffic needs a dedicated conversion page, not the homepage.
**PR:** #136

### 2026-03-24 — Website simplification plan
Created `WEBSITE_SIMPLIFICATION_PLAN.md` and `CONKA_BUSINESS_CONTEXT.md` documenting the pivot from protocols to Flow/Clear/Both.
**Why:** January Brands workshop. Protocols are too confusing, killing conversion from paid traffic.

### 2026-03-13 — Customer portal aligned to Loop
Added cancellation modal with winback discount, reorder for single products, apply discount code functionality.
**Why:** Aligning the customer portal to Loop's subscription management features.
**PR:** #135

---

## February 2026

### 2026-02-20-27 — Customer portal, app page, abandoned cart
Customer portal with order history, subscription editing, payment methods. Full app page with cognitive test integration. Abandoned cart Klaviyo flow. Our Story page refactor.
**PRs:** #99-119

### 2026-02-16-19 — Homepage refactor
Athlete credibility carousel, product grid, formula benefits with ingredient images, case study redesign, hero banner carousel, what-to-expect timeline, founders section, FAQ.
**Why:** Complete visual overhaul of the homepage after product page work was done.
**PRs:** #81-98

### 2026-02-10-13 — Product and protocol page refactors
Meta Pixel + CAPI analytics. Conka Flow product page redesign. Protocol page full refactor with premium styling.
**PRs:** #61-80

### 2026-02-03-09 — Product page redesign and design system
Created `premium-base.css` design token system. Product page structure, image slideshow, testimonial strip, what-to-expect timeline.
**Why:** Moving from ad-hoc styling to a consistent design system.
**PRs:** #51-60

---

## January 2026

### 2026-01-27-31 — B2B professionals portal
Full B2B purchasing portal with individual/team modes, tier pricing system, cart tier normalisation, VAT pricing.
**PRs:** #39-50

### 2026-01-20-26 — Navigation rebuild and analytics
Navigation refactored into sub-components. Shop mega menu. Add-to-cart source tracking, quiz session ID capture. Barry campaign page.
**PRs:** #25-38

### 2026-01-13-19 — Launch polish
Founding members banner, hero overhaul, buy-now funnel, Trustpilot reviews, shop overview page.
**PRs:** #14-24

### 2026-01-06-12 — Science page and launch
Science page with embedded Cognica cognitive test SDK, email capture, Klaviyo integration. Nike QR campaign pages. Privacy policy, favicon, payment logos.
**PRs:** #1-13
