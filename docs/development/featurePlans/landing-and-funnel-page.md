# Landing & Funnel Page

> **Status:** Landing page and funnel built. Johnny feedback received 2026-04-09. Executing Phase A (CRO quick wins) and Phase B (product education).
> **Created:** 2026-03-24
> **Last updated:** 2026-04-09
> **Routes:** `/start` (landing page), `/funnel` (purchase funnel)
> **Design system:** `brand-base.css`

---

## What's Built

### Landing Page (`/start`)

Standalone conversion page for paid Meta traffic. Not in nav, `noindex`. Every section has a CTA pointing to `/funnel`.

**Current page structure:**

| # | Section | Component |
|---|---------|-----------|
| 1 | Hero | `LandingHero` |
| 2 | Case Studies | `CaseStudiesDataDriven` |
| 3 | Product Split (AM/PM) | `LandingProductSplit` |
| 4 | Value Comparison | `LandingValueComparison` |
| 5 | Benefits + Trust Badges | `LandingBenefits` |
| 6 | Testimonials | `TestimonialsSection` |
| 7 | FAQ | `LandingFAQ` |
| 8 | Disclaimer | `LandingDisclaimer` |

**Landing-specific components (`app/components/landing/`):** `LandingHero`, `LandingBenefits`, `LandingProductSplit`, `LandingValueComparison`, `LandingFAQ`, `LandingDisclaimer`, `LandingCTA`, `Reveal`.

### Funnel Page (`/funnel`)

Multi-step paginated funnel (Fussy/Overload pattern). Each step is its own focused screen, no nav/footer.

**Architecture:**

| File | Purpose |
|------|---------|
| `app/funnel/page.tsx` | Server component, metadata (noindex), renders FunnelClient |
| `app/funnel/FunnelClient.tsx` | Client orchestrator, state, step navigation, checkout flow, analytics |
| `app/lib/funnelData.ts` | Types, 3x3 pricing matrix, variant mapping, display data, upsell logic |
| `app/lib/funnelCheckout.ts` | Isolated cart creation, analytics, checkout URL (bypasses CartContext) |

**Funnel components (`app/components/funnel/`):** `FunnelStepIndicator`, `FunnelHeroAsset`, `CadenceSelector`, `ProductSelector`, `FunnelCTA`, `UpsellModal`, `FunnelAssurance`.

**Step flow:**

| Step | Screen | Pre-selected | CTA |
|------|--------|-------------|-----|
| 1 | Cadence cards (Monthly / Quarterly / Try Once) | Monthly | "Choose Product" |
| 2 | Product cards (Both / Flow / Clear) | Both | "Go to Checkout" |
| 3 | Shopify hosted checkout | -- | Redirect via `cart.checkoutUrl` |
| 3.5 | Upsell bottom sheet (contextual) | -- | "Yes, upgrade" / "No thanks" |

**What works end-to-end (4 of 9 combos):** Flow and Clear x Monthly Sub and Monthly OTP. Both x any cadence and Any x Quarterly are blocked on Shopify product setup.

---

## Completed Work

### Phase 1: Critical Fixes (Done)

- **Mobile performance** -- images to WebP, lazy loading, `fetchpriority="high"` on hero, bundle audit. PageSpeed 64 to 85+.
- **KSM-66 removal** -- replaced "KSM-66 Ashwagandha" with "Ashwagandha" across 8 files. Legal compliance.
- **Mobile CTA safe-area fix** -- added `env(safe-area-inset-bottom)` padding.
- **SEO** -- meta description, H1 verified, alt text, canonical URL. Score 58 to 80+.

### Phase 2: Landing Page Restructure (Done)

- **Section reorder** -- moved case studies to #2 (social proof early), benefits to #5, FAQ to #7.
- **Hero updates** -- H1 changed to "The only brain supplement you can measure." Subheadline leads with pain point. Removed circular badge. Trust pill font increased.
- **CTA standardisation** -- hero keeps "Try Risk-Free", all others show "Get Both from £1.61/shot". Added CTA beneath coffee comparison.
- **Benefits grid labels** -- changed to outcome-focused copy (e.g. "Sharper Focus" to "Stay locked in past 2pm").
- **Testimonial cards** -- updated to show score changes as data points.
- **FAQ trimmed** -- cut from 9 to 5 questions, reordered to lead with guarantee.

### Code Quality Fixes (Done)

- `FUNNEL_URL` consolidated to single shared constant
- `page.tsx` converted from Client Component to Server Component
- `LandingGuarantee.tsx` raw `<img>` replaced with `next/image`
- `LandingProof.tsx` dead code deleted
- CTA pattern extracted to shared `LandingCTA` component
- `hideCTA` prop added to `CaseStudiesDataDriven`
- Hardcoded colours replaced with design tokens

---

## Johnny Feedback (2026-04-09)

Feedback from Johnny at January Brands after reviewing landing page and funnel on mobile.

**Overall verdict:** Funnel is "really, really impressive". Landing page has all the right blocks but needs product education for cold traffic, design consistency, and social proof quality.

**Key reference:** Magic Mind's landing page. Take their section structures and apply CONKA branding.

### Landing Page Feedback

**Design & Branding:**
- Design consistency across sections -- some feel disconnected. Get Freddy on a call.
- Section title sizing -- slightly bigger and more readable.
- Trust badge icons -- reuse in more places.

**Hero:**
- Hero image unclear about what the product is. Replace with lifestyle or bottle close-up (blocked on assets).
- Hero centering -- something is off.
- Need multiple headline variants to A/B test.
- Use percentage discount rather than "risk-free for 100 days".

**Social Proof:**
- Testimonials need real customer photos, not initials.
- Carousel too fast -- should snap between items.

**Content & Education (biggest gap):**
- Product education section needed BEFORE case studies.
- Case study "test score" metrics need more context for cold traffic.
- Product split needs more detail on what each product does.
- Add digestible ingredients section (Magic Mind style).
- Add "what to expect" timeline.

### Funnel Page Feedback

- Simplify pricing display -- remove "vs separate", just show per-shot + total + strikethrough.
- Add "2 shots per day" context next to per-shot price.
- Add "Free priority shipping on subscriptions".
- Delivery clarity -- "2 boxes delivered every month".
- Most popular option in middle position (confirmed better conversion).
- Highlight savings more on "Both" card.

---

## Phase A: CRO Quick Wins -- ACTIVE

| # | Task | Complexity | Status |
|---|------|-----------|--------|
| A.1 | Center social proof pill above hero | Small | Not Started |
| A.2 | Hero image swap + badge overlay | Small | Not Started |
| A.3 | Hero headline variants (config array, one active) | Small | Not Started |
| A.4 | Hero CTA label variants (config array, one active) | Small | Not Started |
| A.5 | Avatar photo slots (replace initials with real photos) | Small | Not Started |
| A.6 | Landing testimonials component (new, snap-scroll, curated 10) | Medium | Not Started |
| A.7 | "What to Expect" timeline section (new landing component) | Medium | Done |
| A.8 | Section title sizing -- all titles to brand-h1 | Small | Done |
| A.9 | Extract trust badges to shared LandingTrustBadges component | Small | Done |

### A.1 Center social proof pill

- What: The "150,000+ bottles sold" pill at L36-45 appears misaligned on mobile. The pill uses `reveal-fade hero-delay-0` inside the parent flex column. Investigate alignment classes and fix centering.
- Files: `app/components/landing/LandingHero.tsx` (~L36-45)

### A.2 Hero image swap + badge overlay

- What: Replace `AppShotsHero.jpg` (boxes + bottles + phone, unclear product shot) with `ShotsHero.jpg` (two bottles on white, clean product shot). Add a small badge/chip overlay on the image corner (e.g. "Track results on the CONKA app" or "Measure your improvement").
- Current: L121-130, `<Image src="/hero/AppShotsHero.jpg" width={1920} height={1080} priority>`. Update src, check dimensions of `ShotsHero.jpg`, update width/height/sizes.
- Badge: `absolute` positioned chip inside the image wrapper div. Small, subtle, not competing with headline. Use `brand-bg-tint` or white bg with subtle border.
- Files: `app/components/landing/LandingHero.tsx` (~L118-131)

### A.3 Hero headline variants

- What: Create a documented config array of headline options with one active. Current: "The only brain supplement you can measure." (L53-57).
- Copy constraints: Lead with pain or counterintuitive truth. Awareness stage 1-2. Under ~10 words.
- Documented variants (with rationale):
  1. "The only brain supplement you can measure." -- current, proof-led, differentiator
  2. "Your brain fades by 2pm. Fix it." -- pain-led, direct, creates urgency
  3. "For people who refuse to fade by 2pm" -- identity-led, aspirational, targets high-performers
  4. "What if your supplement could prove it works?" -- counterintuitive question, challenges category norms
- Implementation: Config array at top of file. `ACTIVE_HEADLINE_INDEX = 0` constant selects which is live. Comment each variant with its direction.
- Files: `app/components/landing/LandingHero.tsx` (~L51-58)

### A.4 Hero CTA label variants

- What: Create a documented config array of CTA options with one active. Current: "Try Risk-Free for {GUARANTEE_DAYS} Days" (L76-79). Johnny says percentages always outperform "risk-free" messaging.
- Documented variants (with rationale):
  1. "Get Both from £1.61/shot" -- value-anchored, matches section CTAs, low per-unit price
  2. "Save 25% -- subscribe today" -- percentage-led, Johnny's recommendation
  3. "Start for £3.21/day" -- daily cost anchor, lower than a coffee
  4. "See your plan" -- low-commitment, curiosity-driven, soft CTA
- Implementation: Config array like A.3. `ACTIVE_CTA_INDEX = 0` constant. Only one renders on the live site. All documented in code for easy swap per campaign.
- Files: `app/components/landing/LandingHero.tsx` (~L73-79)

### A.5 Avatar photo slots

- What: Replace 5 hard-coded initial divs (L87-101) with `next/image` using existing assets at `/avatars/1.jpg` through `/avatars/5.jpg`. Keep initials as fallback via `onError`.
- Assets: 5 files exist, 1.7-2.7KB each (already compressed). Mount via `next/image` with `width={48} height={48}`, `className="rounded-full object-cover"`.
- Implementation: Avatar data array: `{ src: "/avatars/1.jpg", initials: "JM", bg: "#e8d5b7" }`. Render `<Image>` by default. On `onError`, swap to initials div. Keep the overlapping `-space-x-2` stack and review count label.
- Files: `app/components/landing/LandingHero.tsx` (~L87-106)

### A.6 Landing testimonials component

- What: New landing-specific testimonial component. Does NOT modify the shared `TestimonialsAutoScrollStrip` or `TestimonialCard`. Curate 10 best reviews, snap-scroll with periodic auto-advance, photo slots on cards.
- Data: Use first 10 IDs from `GENERAL_TESTIMONIAL_IDS` in `testimonialsFilter.ts` (L25-36, already curated as "hero reviews"). Import via `getSiteTestimonialsGeneral()` and slice. No shuffle -- fixed curated order.
- Carousel behavior:
  - `overflow-x-auto snap-x snap-mandatory` on container
  - Cards: `snap-center`, fixed width (~300px mobile, ~340px desktop), `flex-shrink-0`
  - Auto-advance: `setInterval` every ~4s, `scrollBy` one card width. Pauses on touch (`touchstart`) and hover (`mouseenter`). Resumes after 5s inactivity.
  - Dot indicators for position
- Card design: Name, star rating, headline, truncated body (200 char), product label badge (e.g. "CONKA Flow"). Photo slot if `testimonial.photo` exists (currently none have photos, but slot is ready).
- Replaces the shared `Testimonials` component in `TestimonialsSection.tsx`. Section wrapper stays the same (`brand-section brand-bg-tint`).
- Files: New `app/components/landing/LandingTestimonials.tsx`, edit `app/start/TestimonialsSection.tsx`
- Risk: Must not regress homepage testimonials (shared component untouched, so safe).

### A.7 "What to Expect" timeline -- DONE

**What was built:**
- Redesigned `LandingTimeline` with card-style layout (3 cards: Day 1, 14 Days, 30 Days)
- Header: "Your Brain, Optimised." (brand-h1) + subtitle "What to expect after 30 days"
- Copy rewritten to feeling-first tone (Magic Mind-inspired): no product names leading, no ingredient jargon
- Each card has accent-tinted timeframe pill, large heading (text-xl/2xl), body copy
- Desktop: two-column layout with lifestyle image (SatWoman.jpg, 450px, sticky) on right
- Mobile: single column, image hidden
- Proof point: "Based on 5,000+ cognitive tests across 150+ participants"
- CTA: "Try Both from £1.61/shot" + shared LandingTrustBadges beneath
- Files: `app/components/landing/LandingTimeline.tsx`

### A.8 Section title sizing -- DONE

- All section titles across `/start` upgraded from `brand-h2` to `brand-h1` per Johnny feedback ("slightly bigger and more readable")
- Affected: LandingProductSplit, LandingValueComparison, LandingBenefits, CaseStudiesDataDriven, LandingFAQ
- Not changed: LandingHero (already brand-h1-bold), LandingDisclaimer (intentionally small)

### A.9 Extract trust badges -- DONE

- Extracted trust badges (Free UK Shipping, Informed Sport, Every Batch Tested, Cancel Anytime) from LandingBenefits into shared `LandingTrustBadges` component
- Rendered below CTA in both LandingBenefits and LandingTimeline for consistency
- Files: New `app/components/landing/LandingTrustBadges.tsx`, updated `LandingBenefits.tsx`

---

## Phase B: Product Education & Ingredients -- ACTIVE

| # | Task | Complexity | Status |
|---|------|-----------|--------|
| B.1 | "What CONKA Does" 3-tile section | Small | Not Started |
| B.2 | Upgrade LandingBenefits to "What's Inside" ingredient education | Medium | Not Started |
| B.3 | Reorder page sections + rename component | Small | Not Started |

### B.1 "What CONKA Does" section

- What: 3-tile grid explaining what CONKA does for cold traffic. Goes after Hero, BEFORE Case Studies. Magic Mind pattern: quick scan, one idea per tile.
- Tiles:
  1. **Mental Performance** -- Sharp focus and clear thinking when it counts
  2. **Sustained Energy** -- All-day energy without caffeine, jitters, or crashes
  3. **Brain Health** -- Long-term cognitive protection, not just a quick fix
- Design: 3-column grid desktop, 3 stacked cards mobile. Icon-led (reuse BenefitIcon* from icons.tsx). `brand-bg-tint`.
- No images, no interactivity. Lightweight.
- Files: New `app/components/landing/LandingWhatItDoes.tsx`, `app/start/page.tsx`

### B.2 Upgrade LandingBenefits to "What's Inside" ingredient education

- What: Rename `LandingBenefits` to `LandingWhatsInside`. Restructure from 4 individual ingredient cards to 3 functional groups (Magic Mind "Daily habit. Lifelong benefits." pattern). Each group lists 2-3 key ingredients by bold name with dosage and brief description.
- Keep tap-to-reveal study interaction on individual ingredients.
- Headline: "16 active ingredients. Two shots. One daily system." (or similar)
- 3 groups:
  1. **Focus & Clarity** -- **Lemon Balm** (300mg), **Alpha GPC**, **Rhodiola**
  2. **Energy & Resilience** -- **Ashwagandha** (600mg), **Turmeric**, **Vitamin B12**††
  3. **Protection & Recovery** -- **Glutathione** (250mg), **NAC**, **Vitamin C**††
- Claims compliance: `††` anchors for EFSA-authorised claims on Vitamin C and B12. Non-authorised ingredients use observational framing.
- Trust badges (LandingTrustBadges) + CTA beneath, consistent with other sections.
- Files: Rename + rewrite `app/components/landing/LandingBenefits.tsx` to `LandingWhatsInside.tsx`, update imports in `app/start/page.tsx`

### B.3 Reorder page sections

- Insert LandingWhatItDoes at position 2 (after Hero)
- Move LandingWhatsInside to position 3 (after What It Does)
- Maintain white/tint alternation
- Files: `app/start/page.tsx`

### Updated page order (after Phase A + B)

| # | Section | Component | Background |
|---|---------|-----------|------------|
| 1 | Hero | `LandingHero` | white |
| 2 | **What CONKA Does** (NEW) | `LandingWhatItDoes` | tint |
| 3 | **What's Inside** (UPGRADED) | `LandingWhatsInside` | white |
| 4 | Case Studies | `CaseStudiesDataDriven` | tint |
| 5 | Product Split (AM/PM) | `LandingProductSplit` | white |
| 6 | Value Comparison | `LandingValueComparison` | tint |
| 7 | What to Expect | `LandingTimeline` | white |
| 8 | Testimonials | `TestimonialsSection` | tint |
| 9 | FAQ | `LandingFAQ` | white |
| 10 | Disclaimer | `LandingDisclaimer` | tint |

---

## Funnel Iteration (Future -- Separate PR)

Johnny's funnel feedback, to be executed after Phase A + B:

- Simplify pricing display -- remove "vs separate" comparison
- Add "2 shots per day" context to per-shot price
- Free shipping callout on subscription cards
- Delivery clarity ("2 boxes delivered every month")
- Most popular option in middle position
- Highlight savings more on "Both" card

---

## Previously Scoped Work (Unstarted)

Review before starting -- Johnny's feedback takes priority where there's conflict.

### Funnel: Product Selection Page

- Header cleanup, product card copy (outcome-focused), dynamic CTA

### Funnel: Plan Page

- Header cleanup, per-product accent colours, price anchor (trial pack reference), dynamic CTA

### Evening to Afternoon Terminology Audit

Separate PR. ~12 files, ~21 edits. Does NOT change customer testimonials.

### Upsell Modal Improvements (P2)

- Copy changes, per-shot saving as hero price signal, social nudge line

---

## No-Gos

- Not swapping hero photography (blocked on photo shoot)
- Not building A/B testing infrastructure -- just preparing variant copy for manual swap
- Not redesigning case studies section (separate task)
- Not touching funnel page in this PR
- Not modifying the PDP WhatToExpectTimeline component (building landing-specific version)
- Not adding analytics events (follow-up)
- Not doing Evening-to-Afternoon audit (separate PR)
- Not touching upsell modal until Phase A + B complete

---

## Risks

- **Testimonial carousel (A.4):** Modifies shared component. Test on homepage after change.
- **Claims compliance (B.1, B.2):** New ingredient copy must use observational framing and `††` anchors. Review against claims log.
- **Section count:** Page goes from 8 to 11 sections. Keep new sections concise (one mobile screen each).
- **Background alternation:** 11 sections maintains white/tint rhythm in proposed order.

---

## Blocked / Waiting On

| Item | Waiting for | Blocks |
|------|-------------|--------|
| Final pricing (3x3 matrix) | COGS analysis | Shopify setup, funnel full functionality |
| "Both" product in Shopify | Shopify Admin | Both x any cadence checkout |
| Quarterly selling plan | Shopify Admin | Any x Quarterly checkout |
| Lifestyle hero photography | Photo shoot | Landing page hero swap |
| ~~Customer photos for testimonials~~ | ~~Real photos~~ | User creating 96x96px assets in Canva |
| Freddy brand call | Scheduling with January Brands | Design consistency pass |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-24 | Pre-select "Both" + "Monthly Sub" | Direct customer to highest LTV option |
| 2026-03-24 | Landing page is noindex, not in nav | Strictly for paid traffic |
| 2026-03-25 | Funnel is mobile-first | 95% of paid Meta traffic is mobile |
| 2026-03-25 | Funnel uses isolated cart (not global CartContext) | Separate flow, no drawer, no interference |
| 2026-03-25 | Multi-step paginated funnel | Each step is a focused screen (Fussy pattern) |
| 2026-03-25 | No nav/footer on funnel page | Distraction-free |
| 2026-04-09 | Magic Mind as primary landing page reference | Johnny: they have significant data and test extensively |
| 2026-04-09 | Product education before case studies | Cold traffic needs to understand CONKA before seeing proof |
| 2026-04-09 | Most popular option in middle position (funnel) | January Brands data: middle converts better |
| 2026-04-09 | Percentage discounts over "risk-free" messaging | January Brands: percentages consistently perform better |
| 2026-04-09 | Real customer photos for testimonials | Initials feel template-y, hurts trust |
| 2026-04-09 | Landing-specific timeline, not PDP refactor | Simpler, faster, no risk to existing PDP component |
| 2026-04-09 | Timeline shows Both by default with product picker | Combined timeline is most relevant for "Both" hero product, picker for exploration |
| 2026-04-09 | Ingredient groupings cross both formulas | Grouped by function (focus/energy/protection) not by product |

---

## Jira Tickets

| Key | Summary | Phase | Status |
|-----|---------|-------|--------|
| SCRUM-869 | Landing page: CRO quick wins -- hero, testimonials, avatars | A | To Do |
| SCRUM-870 | Landing page: What to Expect timeline section | A | To Do |
| SCRUM-871 | Landing page: Product education and ingredients sections | B | To Do |

---

## References

- [Website Simplification Plan](../WEBSITE_SIMPLIFICATION_PLAN.md) -- broader site simplification context
- [Landing Page Claims Log](../LANDING_PAGE_CLAIMS_LOG.md) -- claims compliance audit
- [Design System](../../branding/DESIGN_SYSTEM.md) -- brand design system
- [Brand Voice](../../branding/BRAND_VOICE.md) -- copy rules and proof assets
- [Offer Constants](../../../app/lib/offerConstants.ts) -- guarantee, pricing constants
- **Magic Mind landing page** -- primary inspiration for product education, ingredients, timeline
- **Overload funnel:** `ovrload.co/pages/funnel` -- product picker, middle-position pattern
- **Overload landing:** `ovrload.co/pages/gummy` -- hero, trust badges, testimonial snap carousel
- **Fussy subscribe flow:** `getfussy.com/pages/subscribe` -- multi-step flow, step indicator UX
