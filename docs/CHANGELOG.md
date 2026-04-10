# Changelog

> High-level record of what changed, when, and why. One entry per meaningful change. For implementation details, see git history or the referenced docs/PRs.

---

## April 2026

### 2026-04-10 -- Landing page: What to Expect timeline + product education (SCRUM-870, SCRUM-871)
Two new sections and one major redesign on `/start`, all driven by Johnny's feedback and Magic Mind as reference.

**What to Expect timeline (SCRUM-870):** Redesigned `LandingTimeline` from vertical-line-and-dots to card-style layout (Day 1, 14 Days, 30 Days). Copy rewritten to feeling-first tone. Desktop shows lifestyle image (SatWoman.jpg) on right. Proof point ("5,000+ cognitive tests across 150+ participants") + CTA + trust badges beneath.

**What CONKA Does (SCRUM-871):** New 3-tile section at position 2 (after Hero, before proof). Mental Performance / Sustained Energy / Brain Health. Cards with icons, brand-h1 headings, 2-sentence descriptions. Claims-compliant (EFSA Vitamin C `††` anchor).

**What's Inside (SCRUM-871):** Replaced `LandingBenefits` with `LandingWhatsInside`. 3 functional ingredient groups (Focus & Clarity, Energy & Resilience, Protection & Recovery) with tap-to-reveal studies per group. Ingredient pills with bold names and dosages. Mini product split (Flow + Clear bottles) on mobile and desktop. Old `LandingBenefits.tsx` deleted.

**Cross-cutting:** All section titles bumped from `brand-h2` to `brand-h1`. Trust badges extracted to shared `LandingTrustBadges` component. Page reordered: product education before case studies. Background alternation maintained across 10 sections.
**Why:** Johnny flagged product education as the biggest gap for cold traffic. "They need to understand what CONKA is before seeing proof."
**Tickets:** SCRUM-870, SCRUM-871
**Plan:** `docs/development/featurePlans/landing-and-funnel-page.md` (Phase A.7-A.9, Phase B)
**Branch:** `what-you-will-feel`, `SCRUM-871`

### 2026-04-09 — Case study showcase update (IP-safe list)
Replaced showcased case study athletes to remove those with team logo IP issues. New highlight list: Jack Willis, Nimisha Kurup, Max Lahiff, Josh Stanton, Ben Cox, Aaron Hope, Shane Corstorphine, Liz Glover (Millie Hammond ready but held back). Added data entries and photos for Ben Cox (Revolut) and Liz Glover (Retired Banker). Updated `featured` flags so `/case-studies` page (desktop carousel + mobile sort) aligns with homepage teaser. Deleted 3 unused legacy components (`CaseStudies.tsx`, `CaseStudiesDesktop.tsx`, `CaseStudiesMobile.tsx`).
**Why:** Several original featured athletes had team logos visible in photos, creating IP risk. Also rebalanced the list to better represent business/corporate users alongside athletes.
**Branch:** `updating-showcased-case-study-data`

### 2026-04-08 — /start performance optimisation (65 → 71, ongoing)
Four rounds of performance work on the ad landing page.

**Round 1 (65 → 69):** Moved page composition from a single `"use client"` wrapper (`StartPageClient`) to a server component so HTML is pre-rendered — eliminated ~2.3s LCP element render delay. Dynamic-imported 5 below-fold sections (ProductSplit, ValueComparison, Benefits, FAQ, CaseStudies) to reduce initial JS bundle. Removed `will-change` and 0ms `reveal-cleanup` animations that caused non-composited animation warnings. Added explicit width/height to footer logo. Removed unused Shopify preconnect hints (cart API is server-side proxied).

**Round 2 (logo + script deferral):** Replaced nav logo `conka.svg` (593KB — embedded raster PNG in an SVG wrapper) with a generated `conka-logo.webp` (7.5KB, 440×112 2x retina), saving 585KB on every page load site-wide. Switched footer logo from `conka.png` (48KB) to the same WebP. Tightened hero image `sizes` attribute. Attempted deferring CookieYes/Klaviyo to `lazyOnload` — insufficient, CookieYes banner still claimed LCP.

**Round 3 (CookieYes LCP fix → 71):** Research showed LCP updates until first user interaction and Lighthouse lab tests have no interaction, so script deferral alone can't prevent CookieYes from claiming LCP. Fixed with two-layer approach: (1) interaction-triggered script loading — CookieYes only loads on scroll/click/touch/keypress with 7s failsafe timeout, (2) CSS `translateY(100%)` on `.cky-consent-container` so banner renders off-screen initially (off-screen elements excluded from LCP by spec), then slides in. Also switched CookieYes dashboard from full-width Banner to Box layout (top-left) to reduce rendered area. Result: LCP element correctly became the hero image. FCP dropped from 3.1s to 1.2s, SI from 6.1s to 4.1s.

**Round 4 (hero + Klaviyo revert):** Added explicit `fetchPriority="high"` to hero image — Lighthouse flagged it as missing despite Next.js `priority` prop (not output in SSR for client components). Reverted Klaviyo from `lazyOnload` back to `afterInteractive` — the change caused 170KB of Klaviyo chunks to load within the desktop measurement window, dropping desktop score from 90 to 80. Klaviyo was `afterInteractive` in the original baseline so reverting doesn't affect mobile gains.

**Why:** `/start` is the primary paid traffic landing page (74% mobile). Score started at 65; currently 71 mobile. Key remaining bottleneck is LCP element render delay (1,120ms) caused by render-blocking CSS.
**Note:** GDPR compliance gap discovered — no consent gating exists for GTM, Meta Pixel, Klaviyo, or Triple Pixel despite cookie policy claiming otherwise. Separate issue from performance.
**Branches:** `second-optimisatio-round`, `third-round-optimisation`, `please-please-please`, `fetch-quick-hero-image`

### 2026-04-08 — Funnel P2: product selection, plan page, upsell, and Evening-to-Afternoon audit
Funnel product selection (Step 1): removed feature-bashing caption, header to "Your CONKA plan", product descriptions rewritten to outcome-focused copy, dynamic CTA showing product name + per-shot price with sub-label. Funnel plan page (Step 2): header to "Your delivery plan", mobile hero removed, per-product accent colors on cadence cards (blue/amber/teal), price anchors switched to £3.75/shot trial pack reference with savings %, dynamic CTA per cadence. Upsell bottom sheet (renamed from UpsellModal): per-shot hero block showing price drop, new copy and benefit bullets, social nudge line, backdrop dismiss separated from decline-to-checkout. Global terminology audit: replaced "Evening" with "Afternoon" for CONKA Clear across 10 files (testimonials untouched).
**Why:** P2 priority work before scaling paid spend. Sharper copy, dynamic pricing CTAs, and per-product visual identity reduce decision fatigue in the funnel. "Afternoon" aligns with updated product positioning.
**Tickets:** SCRUM-862, SCRUM-863, SCRUM-864
**Plan:** `docs/development/featurePlans/landing-page-upgrades.md` (Phases 3-5)
**Branch:** `landing-page-upgrades`

### 2026-04-07 — Homepage performance + brand-base migration
Simplified homepage hero from 4-image carousel to single product image (matching `/start` LandingHero pattern). Removed rotating headline words, desktop/mobile split, and carousel JS. Added `loading="lazy"` to all below-fold images across 7 components (~25 images). Converted raw `<img>` tags to `next/image` in LandingFAQ and KeyBenefitsDesktop. Then migrated all 10 homepage sections from `premium-base.css` to `brand-base.css`: replaced section wrappers, applied white/tint alternating backgrounds, updated all component tokens (74 replacements across 11 files), moved WhyConkaWorks from dark to light background, left-aligned all headers, updated radius values (32/24/16px), and applied accent-only CTA buttons.
**Why:** Homepage was visually inconsistent with `/start` landing page (different design system, dark sections, centred headers, pill buttons). Carousel added JS weight and 3 unnecessary image requests. Homepage is the primary organic entry point and needed to match the brand standard.
**Tickets:** SCRUM-855, SCRUM-856
**Plan:** `docs/development/featurePlans/homepage-upgrade.md`
**Migration tracker:** `docs/development/WEBSITE_STYLING_MIGRATION.md`

### 2026-04-07 — /start mobile performance optimization
Lighthouse mobile score was 63/100 with 9.2s LCP. Added AVIF/WebP image formats and cache config to `next.config.ts`. Lazy-loaded below-fold images (FlowHold 658KB, ClearDrink, AppConkaRing). Trimmed legacy Google Font weights (Syne, DM Sans, Caveat, IBM Plex Mono) to only weights actually used. Deferred Triple Pixel from `afterInteractive` to `lazyOnload`. Added preconnect hints for GA and Meta domains. Replaced inline hero animation styles with CSS classes. Updated `/implement` and `/review` skills with performance-conscious defaults.
**Why:** Performance is the highest-leverage CRO fix for the primary paid traffic landing page (74% mobile). Prerequisite for Phase 1 benefits redesign (SCRUM-850).
**Ticket:** SCRUM-852
**Plan:** `docs/development/featurePlans/landing-benefits-redesign.md` (Phase 0)

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
