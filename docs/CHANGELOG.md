# Changelog

> High-level record of what changed, when, and why. One entry per meaningful change. For implementation details, see git history or the referenced docs/PRs.

---

## April 2026

### 2026-04-16 — TQBF lifestyle assets, navigation simplification, ProductGrid reorder, CTA + trust badge pass

Multi-part update integrating new TQBF lifestyle photography and simplifying the site towards the Flow/Clear/Both offering.

**Hero simplification (LandingHero + Hero):**
Social proof pill restyled to brand-accent badge ("150,000+ bottles sold"). Star rating moved to plain text line below hero image. CTA copy changed to "Try CONKA Today". Tightened vertical spacing between avatars and trust badges. 5% top crop on mobile hero image.

**Product image overhaul (productImageConfig):**
Flow, Clear, and Balance navigation/grid images replaced with TQBF lifestyle hold photos (`FlowHold.jpg`, `ClearHold.jpg`, `BothHold.jpg`). Single config change cascaded to 30+ consumers (ProductGrid, Navigation, subscriptions, account pages, B2B portal).

**Navigation mega-menu simplification:**
Replaced tabbed sidebar (Shop by Bundle / Shop Individual Formula / Help me Choose quiz) with simplified two-column layout: left sidebar has "Shop by Product" label + "Learn More" links (Ingredients, Why CONKA, CONKA App), right side shows 3 product cards (Both, Flow, Clear) with lifestyle images. Mobile menu updated with product cards, learn more section, and full nav links. Removed `HoveredSection` state, deleted `ShopMegaMenuContent.tsx`. Quiz link removed from desktop nav.

**ProductGrid reorder + brand-accent buttons:**
Reordered all three breakpoint variants (Desktop/Tablet/Mobile) to show Both first, then Flow, then Clear. Badge colours replaced from product-specific gradients to `var(--brand-accent)`. Badge labels updated to "Most Popular" / "Morning" / "Afternoon". CTA buttons simplified from product-specific gradients to brand-accent blue. Protocol renamed to "Both (Flow + Clear)" throughout ProductCard with updated copy removing protocol language.

**Lifestyle images in WhatItDoes sections (Landing + Home):**
Added `CreationOfConka.jpg` lifestyle image with desktop split layout (sticky image left, title + pillar cards right; stacked on mobile). Added CTA buttons between bottle visuals and lifestyle image ("Get Both from £X/shot" on landing, "Try CONKA Today" on homepage). LandingTrustBadges placed under each CTA.

**LandingTrustBadges added under CTAs:**
Trust badges (Free UK Shipping, Informed Sport, Every Batch Tested, Cancel Anytime) added beneath CTAs in `CaseStudiesDataDriven` and `LandingValueComparison`.

**Other asset updates:**
LandingTimeline desktop sidebar image swapped to `ConkaAtWorkDesk.jpg`. WhatToExpect (Desktop/Mobile) lifestyle images replaced with `FlowBoxOpen.jpg` (Flow) and `ClearLaugh.jpg` (Clear). Protocol 3 PDP hero image aligned with funnel (`BothBox.jpg`).

**Why:** TQBF lifestyle shoot provided premium photography to replace colour-based product renders. Navigation and ProductGrid simplified ahead of full protocol deprecation. Trust badges and CTAs distributed across more sections to reduce friction.
**Branch:** `lifestyle-asset-intergration`

### 2026-04-14 -- Homepage Phase 3: landing parity + Balance-only ProductGrid (SCRUM-885/886/887/888)
Four-part homepage upgrade that brings the organic entry point into parity with `/start` and locks the product offering to Balance ahead of the protocol deprecation.

**Section composition + reordering (3.1 + 3.2):**

- **`LandingHero` reused on homepage.** Homepage no longer runs a bespoke hero — `LandingHero` now backs both pages via optional `ctaHref` / `ctaLabel` props (defaults preserve `/start` funnel behaviour). Homepage passes a Balance-routed CTA. `Hero` / `HeroDesktop` / `HeroMobile` / `HeroBannerCarousel` flagged as orphaned for a follow-up cleanup pass.
- **CTA copy unified.** Both heroes now read `Get Both from £{PRICE_PER_SHOT_BOTH}/shot →`. Homepage hero keeps the `/protocol/3` destination per the homepage-for-organic-traffic divergence; `/start` keeps the funnel destination.
- **`LandingWhatItDoes` added as homepage section 2.** Replaces the previous "what CONKA does" slot with the same component `/start` uses. Homepage hides the trailing CTA + trust badges (ProductGrid below is the chooser).
- **Athlete carousel renamed + repositioned.** Heading "Why Athletes Trust CONKA" → "Why High Performers Trust CONKA". Case Studies moved above Testimonials, with white/tint alternation re-cascaded so adjacent backgrounds never collide.

**ProductGrid Balance-only + protocol PDP selector removed (3.3):**

- **Protocol variant selector gone from `ProductGrid` (Desktop / Tablet / Mobile) and from the protocol PDP hero.** All three grid variants render Balance imagery unconditionally; `protocolVariant` state and flow-heavy/clear-heavy plumbing removed. `/protocol/1` and `/protocol/2` URLs still route (no deep-link breakage) — just no UI to switch between them.
- **ProductGrid card normalisation.** `FunnelAssurance` swapped for `LandingTrustBadges` across Desktop/Tablet/Mobile. Cards now stretch to cell height (`items-stretch` + `flex-1`), Protocol card got clinical stats (Memory / Stress / Sleep) so every card has the same sections, Best-For rendering unified to the bulleted list across all three products (Protocol's paragraph variant + `BALANCE_PROTOCOL_BEST_FOR` dead-code deleted), and `min-h` reservations on the benefit headline + body copy so shorter copy no longer creates empty whitespace between content and pricing.
- **Cart / pricing / B2B tier logic untouched.**

**Component-level style alignment (3.4):**

- Mechanical token + spacing migration across the remaining homepage-only components (`KeyBenefits` Desktop + Mobile, `WhyConkaWorks`, `WhatToExpect` Desktop + Mobile, `FoundersSection`, home `LandingFAQ`) to match `/start` patterns — left-aligned headings, `text-black/60` subtitles, accent CTAs, `brand-radius-card` radii. No content rewrites, no structural changes.

**Explicit no-gos held:** Navigation (including the Shop mega-menu) and Footer untouched. Quiz untouched. No protocol content / metafield / pricing changes beyond the variant-picker removal. No `/start` page-level code changes (only backwards-compatible prop additions to shared components).

**Why:** The homepage was drifting behind `/start` on both hero pattern and product-education framing, and the homepage ProductGrid was still offering flow-heavy/clear-heavy variants that will never ship. Reusing the landing components via props avoids a fork, and locking ProductGrid to Balance prepares for Phase 4 (full protocol deprecation).
**Plan:** `docs/development/featurePlans/homepage-upgrade.md` (Phase 3)
**Tickets:** SCRUM-885, SCRUM-886, SCRUM-887, SCRUM-888
**Branch:** `home-page-alingment-and-performance-improvement`

### 2026-04-14 -- Landing page Phase E + iteration: merged WhatItDoes, 100-day guarantee, branded timeline, ProductSplit dropped (SCRUM-877)
Three structural fixes shipped as one PR, plus a heavy iteration pass after the first cut.

**Phase E core (SCRUM-877):**

- **Merged `LandingWhatItDoes` + `LandingWhatsInside`.** The two sections covered the same 3 functional pillars twice — once as generic benefits, once as ingredient evidence. Merged into one component: each tile now carries the WhatItDoes heading + body and slots WhatsInside's ingredient pills + tap-to-reveal study observation + PMID beneath it. `LandingWhatsInside.tsx` and `IngredientAccordion.tsx` deleted (consumed only by the deleted WhatsInside). All `††` EFSA anchors and `¶` observational phrasing ported across without regression. Component became a Client Component for the per-tile expand state. After iteration, ingredient pills moved into the reveal panel (default-collapsed) so collapsed cards show only icon + heading + body + trigger — much lower cognitive load.
- **Resurrected `LandingGuarantee` as a dedicated 100-day section.** Previously dead code. Now wired between Timeline and FAQ with Magic Mind copy adapted to CONKA voice: title "100-Day Risk Free Trial", four-bullet refund mechanic (Free UK shipping, Money back guarantee, No return required, Nothing to lose), CTA "Try it 100% Risk Free Now". `GUARANTEE_DAYS` constant templated throughout (no hardcoded "100"). Phone mockup retained as visual proof — the cognitive score is the receipt that the guarantee is meaningful. Mounted via `next/dynamic`.
- **Branded timeline header asset.** `LandingTimeline` text title swapped for `/story/YourBrainOptimised.jpg` (1125x2250 portrait). Mobile renders full-bleed, edge-to-edge — negative margin + `calc()` width cancels the brand-section mobile gutter, `-mt-20` on the component root cancels the section's mobile padding-top so the asset sits flush with the section start, `aspect-[1/1.9]` trims ~5% off the bottom whitespace. Tablet (md+) keeps a contained 16:6 cropped banner with rounded corners. Desktop (lg+) hides the banner entirely and shows the original "Your Brain, Optimised." h2 + subtitle text with SatWoman.jpg lifestyle image as the right-side sticky sidebar (sr-only h2 on mobile/tablet so the asset image doesn't double up the heading).
- **`AmPmConnector` shared component.** Morning ↔ Afternoon connector strip extracted from inline `LandingProductSplit` markup into a reusable component. Used in both `LandingProductSplit` and the merged `LandingWhatItDoes` (above the bottle tiles).
- **`WhatsInsideProductMini` polish.** Bottle tile backgrounds flipped to white (was `bg-black/[0.02]`). Bottle image rendering aligned with `LandingProductSplit` — same `w-20 h-44 lg:w-32 lg:h-64` container + `scale-150` (was `scale-200` on a smaller container which upsampled visibly). Time badges made explicit ("Take in the morning" / "Take in the afternoon" instead of bare "Morning"/"Afternoon"). Ingredient-list line ("Lemon Balm · Ashwagandha · +4 more...") replaced with benefit-led summary sentences ("Calm focus without caffeine." / "Afternoon clarity ritual.") — observational phrasing, no new claim surface.

**Section composition iteration (heavier than originally scoped):**

- **Removed `LandingProductSplit` from `/start`.** Component file kept on disk in case it returns. Section count drops 10 → 9.
- **Reorder.** `vs Coffee` ↔ `ProductSplit` swap (before ProductSplit was dropped). After ProductSplit removal: `Testimonials` moved up into its slot. Then `Testimonials` ↔ `Guarantee` swapped, putting the guarantee earlier in the page where risk reversal can do more work. Cascade-flipped backgrounds for sections 7-9 so white/tint alternation holds end-to-end with no adjacent same-bg breaks.
- **Final flow (9 sections):** Hero (white) → WhatItDoes merged (tint) → Case Studies (white) → vs Coffee (tint) → 100-Day Guarantee (white) → Timeline (tint) → Testimonials (white) → FAQ (tint) → Disclaimer (white).
- **Landing testimonial headlines overridden.** Loox-imported headlines are the customer's own opening sentence, often long, repetitive, or mid-thought. On the landing carousel, overridden via a name-keyed map in `TestimonialsSection.tsx` to short, varied summary titles ("Sharper training, no crash", "Words just flow", "An edge on the pitch", etc.). Body copy unchanged. Source data untouched.

**Why:** Two of the original 10 sections were duplicative (WhatItDoes/WhatsInside) and the 100-day guarantee — a category-leading differentiator — was buried in trust badges and footnotes. Magic Mind landing page was the reference. Iterative tightening through the build dropped ProductSplit, reordered around the guarantee, and gave the timeline a branded full-bleed header.
**Plan:** `docs/development/featurePlans/landing-and-funnel-page.md` (Phase E, marked Done)
**Claims log:** entries 55-64
**Ticket:** SCRUM-877
**Branch:** `feature/landing-merge-whatItDoes-guarantee`

### 2026-04-13 -- Landing page Phase D: product education polish + Ingredients modal
Three connected pieces on `/start` shipped as one Phase D.

**Product education polish (LandingWhatItDoes):** Section title from "What CONKA does." to "Daily habit. Lifelong benefits." (Magic Mind habit framing per Johnny). Tile descriptions tightened to one scannable sentence each, hedging ("help", "not just") dropped. EFSA Vitamin C `††` anchor retained on Brain Health tile.

**Ingredients modal (new):** Native per-product `IngredientsPanel` launched from outlined "Ingredients" buttons on both `LandingProductSplit` and `LandingWhatsInside` ProductMini tiles. New `app/lib/supplementFacts.ts` data module sourced from `FORMULATION_SPEC.md`. Explicit mg amounts deliberately NOT shipped to the client -- ingredient order (descending concentration, per supplement-facts convention) communicates relative quantity without exposing the formula. Only %NRV retained on Clear's Vit C (3,125%) and B12 (60,000%) to substantiate EFSA claims. Modal uses single-column layout (nutritional disclosure, not a benefits document) with focus management, ESC/backdrop close, body-scroll lock, `role="dialog"` + `aria-modal`. `landing:ingredients_viewed` Vercel Analytics event fires with `source: "product_split" | "whats_inside"` for attribution. Shared `IngredientsButton` extracted to avoid markup duplication.

**Bottle image deblur (LandingProductSplit):** Source PNGs are 1000 x 1000 8-bit colormap with transparent padding around the bottle, so large-render upscaling caused visible banding. Reverted to small container + `scale-150` matching the crisp approach used in `WhatToExpectMobile` / `FormulaToggle` / `ProductMini`. Follow-up: re-export source PNGs to 24-bit full-colour tight-crop as a separate asset task.

**Tile height normalisation (LandingWhatsInside):** `mt-auto` on `IngredientsButton` pins it to the bottom of each ProductMini flex column so Flow and Clear CTAs align horizontally regardless of ingredient-preview text wrap.

**CaseStudiesDataDriven metric labels:** Tile label changed from generic "Change in test score" to metric-specific descriptions of what the Cognetivity CognICA test measures -- "Cognitive function" (Total Score), "Cognitive speed" (Speed), "Cognitive accuracy" (Accuracy). Total Score as a proxy for cognitive function is peer-reviewed (Modarres et al., Front Aging Neurosci 2023, doi:10.3389/fnagi.2023.1243316) and the device is FDA-cleared as a cognitive assessment (21 CFR 882.1470). `^^` test-validation anchor and global disclaimer footer remain.

**Why:** Cold traffic landing on `/start` needed a native path to ingredient transparency without leaving the page, and the competitive IP around formulation concentrations needed protecting. CognICA labels replace a meaningless generic label with the metric the published research actually supports.
**Plan:** `docs/development/featurePlans/landing-and-funnel-page.md` (Phase D)
**Claims log:** entries 44-53
**Branch:** `next-stage-improvements`

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
