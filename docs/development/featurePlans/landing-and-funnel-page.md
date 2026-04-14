# Landing & Funnel Page

> **Status:** Landing page and funnel built. Phases A, B, D, E complete; funnel iteration + previously scoped funnel/upsell/terminology work complete. Phase C (funnel copy + nutrition modal) active. Friday 2026-04-10 lifestyle shoot pending delivery; Freddy brand deck review pending.
> **Created:** 2026-03-24
> **Last updated:** 2026-04-14
> **Routes:** `/start` (landing page), `/funnel` (purchase funnel)
> **Design system:** `brand-base.css`

---

## What's Built

### Landing Page (`/start`)

Standalone conversion page for paid Meta traffic. Not in nav, `noindex`. Every section has a CTA pointing to `/funnel`.

**Current page structure (after Phase A + B):**

| # | Section | Component | Background |
|---|---------|-----------|------------|
| 1 | Hero | `LandingHero` | white |
| 2 | What CONKA Does | `LandingWhatItDoes` | tint |
| 3 | What's Inside | `LandingWhatsInside` | white |
| 4 | Case Studies | `CaseStudiesDataDriven` | tint |
| 5 | Product Split (AM/PM) | `LandingProductSplit` | white |
| 6 | Value Comparison | `LandingValueComparison` | tint |
| 7 | What to Expect | `LandingTimeline` | white |
| 8 | Testimonials | `TestimonialsSection` | tint |
| 9 | FAQ | `LandingFAQ` | white |
| 10 | Disclaimer | `LandingDisclaimer` | tint |

**Landing-specific components (`app/components/landing/`):** `LandingHero`, `LandingWhatItDoes`, `LandingWhatsInside`, `LandingProductSplit`, `LandingValueComparison`, `LandingTimeline`, `LandingFAQ`, `LandingDisclaimer`, `LandingCTA`, `LandingTrustBadges`, `Reveal`.

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

**What works end-to-end:** All 9 combos (3 products x 3 cadences). Both product and Quarterly selling plan now live in Shopify.

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
| A.1 | Center social proof pill above hero | Small | Done |
| A.2 | Hero image swap + badge overlay | Small | Done |
| A.3 | Hero headline variants (config array, one active) | Small | Done |
| A.4 | Hero CTA label variants (config array, one active) | Small | Done |
| A.5 | Avatar photo slots (replace initials with real photos) | Small | Done |
| A.6 | Landing testimonials component (new, snap-scroll, curated 10) | Medium | Done |
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
| B.1 | "What CONKA Does" 3-tile section | Small | Done |
| B.2 | Upgrade LandingBenefits to "What's Inside" ingredient education | Medium | Done |
| B.3 | Reorder page sections + rename component | Small | Done |

### B.1 "What CONKA Does" section -- DONE

- 3-tile card grid (Mental Performance / Sustained Energy / Brain Health) at position 2
- Icons on right of title, brand-h1 sized headings, 2-sentence descriptions
- Claims-compliant copy: EFSA Vitamin C claim with `††` anchor on Brain Health tile
- 3-column desktop, stacked mobile. Server component, no interactivity
- Files: `app/components/landing/LandingWhatItDoes.tsx`

### B.2 "What's Inside" ingredient education -- DONE

> **⚠️ 2026-04-13:** mg values below are research-dose figures, not the formulated per-shot amounts. Actual per-shot doses: Lemon Balm 1,500mg, Ashwagandha 1,500mg, Glutathione 500mg, Vitamin C 2,500mg, Vitamin B12 1.5mg. See [FORMULATION_SPEC.md](../../product/FORMULATION_SPEC.md). Pending decision on whether to show mg at all on herbals/aminos (scientist advises against) — component needs updating either way.

- Replaced `LandingBenefits` with `LandingWhatsInside`. Old component deleted.
- 3 functional groups with tap-to-reveal studies per group:
  - Focus & Clarity: Lemon Balm (300mg), Alpha GPC, Rhodiola
  - Energy & Resilience: Ashwagandha (600mg), Turmeric, Vitamin B12††
  - Protection & Recovery: Glutathione (250mg), NAC, Vitamin C††
- Heading: "Two shots. 16 active ingredients."
- Mini product split (Flow + Clear bottles side by side) above ingredient groups on mobile, right column on desktop
- Ingredient pills with bold names, dosages, `††` EFSA anchors
- CTA + LandingTrustBadges beneath
- Claims audit passed (2 AMBER items resolved)
- Files: `app/components/landing/LandingWhatsInside.tsx`

### B.3 Reorder page sections -- DONE

- LandingWhatItDoes at position 2, LandingWhatsInside at position 3
- Case Studies pushed to position 4 (product education before proof, per Johnny)
- Background alternation maintained across all 10 sections
- TestimonialsSection updated from white to tint
- Files: `app/start/page.tsx`, `app/start/TestimonialsSection.tsx`

---

## Funnel Iteration -- DONE

Johnny's funnel feedback (2026-04-09), executed as a single PR:

- ~~Simplify pricing display -- remove "vs separate" comparison~~ Done
- ~~Add "2 shots per day" context to per-shot price~~ Done
- ~~Free shipping callout on subscription cards~~ Done
- ~~Delivery clarity ("2 boxes delivered every month")~~ Already in place via `getWhatShips()`
- ~~Most popular option in middle position~~ Done (products: Flow/Both/Clear; cadences: Quarterly/Monthly/OTP)
- ~~Highlight savings more on "Both" card~~ Done (savings pill badge on Both)

---

## Phase D: Product Education Polish (Magic Mind wave 2) -- ACTIVE

Landing-page follow-up after Phase B. Three connected fixes on `/start`, one PR.

1. **ProductSplit images look blurry** — `scale-200` class upscales the PNG by 2x, causing visible upsampling on retina displays. Premium-brand visual bug.
2. **`LandingWhatItDoes` copy is flat** — Johnny flagged that the section doesn't frame CONKA as a compounding daily habit the way Magic Mind does ("Daily habit. Lifelong benefits."). Tile descriptions hedge with "help" / "can" / "not just" language.
3. **No regulatory-grade ingredient verification on landing** — cold traffic arriving from Meta ads has no path to check what's actually in Flow / Clear without scrolling to checkout. Magic Mind's per-product native-rendered "Ingredients" modal is the proven pattern.

| # | Task | Complexity | Status |
|---|------|-----------|--------|
| D.1 | Fix ProductSplit image blur (remove `scale-200`) | Small | Done |
| D.2 | `LandingWhatItDoes` copy refresh (Magic Mind framing) | Small | Done |
| D.3-data | New `supplementFacts.ts` data module | Small | Done |
| D.3 | New `IngredientsPanel` native modal component | Medium | Done |
| D.4 | Wire per-tile "Ingredients" button on ProductSplit | Small | Done |
| D.5 | Update claims log + plan doc | Small | Done |

**Phase D polish pass (2026-04-13):**
- Removed "See the research" link from `LandingWhatItDoes` — clutter with rest of page rough.
- Reverted `LandingProductSplit` bottle render: source PNGs are 1000² 8-bit colormap (indexed palette), blur visible at large render. Back to small container + `scale-150` (`w-20 h-44 lg:w-32 lg:h-64`), matching the crisp approach used in `WhatToExpectMobile` / `FormulaToggle` / `ProductMini`. Follow-up: re-export source PNGs to full-colour 24-bit with tight crop (separate asset task).
- Extracted `WhatsInsideProductMini` as a client sub-component. Adds outlined "Ingredients" button beneath each Flow/Clear tile. Opens same `IngredientsPanel`. Fires `landing:ingredients_viewed` with `{ product, source: "whats_inside" }` to distinguish from `LandingProductSplit` triggers.
- **Stripped explicit mg from the supplement facts panel and data module.** Ingredient order preserved (descending concentration per supplement-facts convention, so relative quantity is still communicated). Only %NRV retained on Clear's Vit C (3,125%) + B12 (60,000%) to substantiate EFSA claims. Competitive IP protection — mg no longer shipped in the client bundle. Claims log entry 52.

**Phase D summary (2026-04-13):**
- `scale-200` removed from Flow/Clear bottle images; containers resized to natural render (`w-40 h-80` mobile, `w-56 h-[28rem]` desktop). No upsampling artefacts on retina.
- `LandingWhatItDoes` title swapped to "Daily habit. Lifelong benefits." Tile descriptions tightened to one scannable sentence each; hedging dropped. EFSA `††` anchor retained on Brain Health tile. "See the research" link added to `/science`.
- New `app/lib/supplementFacts.ts` module, sourced directly from `FORMULATION_SPEC.md`. Separate from `ingredientsData.ts` and `formulaContent.ts`.
- New `app/components/landing/IngredientsPanel.tsx` modal: body-scroll lock, ESC/X/backdrop close, `role="dialog"`, `aria-modal`, focus-on-close-button. Left column = ingredients paragraph + supplement facts table; right column = functional-group cards. %NRV column hidden on Flow, shown on Clear.
- Per-tile outlined "Ingredients" button wired on `LandingProductSplit`. Fires `landing:ingredients_viewed` Vercel Analytics event with `{ product }`. Min 44px tap target. Does not compete with the primary Get Both CTA.
- Claims log updated (entries 44–51). No new claim surface introduced.

### D.1 ProductSplit image blur fix

- Remove `scale-200` from the image wrapper on Flow + Clear tiles (`app/components/landing/LandingProductSplit.tsx` L51, L101)
- Resize the container so the image renders at its natural display size without upscaling
- Source PNGs (`FlowNoBackground.png` / `ClearNoBackground.png`) are already high-res — no new assets

### D.2 `LandingWhatItDoes` copy refresh

- Title: punchier habit-framing (options proposed at implement time, pick one)
- Tile descriptions: single scannable sentence each, drop hedging language
- Subtitle stays: "Two daily brain shots. 16 active ingredients. One system."
- Claims check: observational framing carries through, `††` stays on Brain Health tile's Vitamin C reference
- Optional: subtle "See the research" link to `/science` (Magic Mind pattern)

### D.3-data `supplementFacts.ts` data module

- New narrow module `app/lib/supplementFacts.ts` containing canonical per-product supplement-facts records
- Sourced from `docs/product/FORMULATION_SPEC.md`
- Separate from `ingredientsData.ts` (research-dose storytelling) and `formulaContent.ts` (outdated percentages — out of scope for this PR)
- Types:
  ```ts
  type SupplementFacts = {
    productId: "flow" | "clear";
    servingSize: string;
    ingredientsParagraph: string;
    nutrients: Array<{ name: string; source: string; perServing: string; nrv?: string }>;
    actives: Array<{ name: string; source: string; perServing?: string }>;
    base: Array<{ name: string; role: string }>;
    functionalGroups: Array<{ heading: string; bullets: string[] }>;
  };
  ```

### D.3 `IngredientsPanel` native modal

- NEW `app/components/landing/IngredientsPanel.tsx`, accepts `product: "flow" | "clear"`
- Layout (Magic Mind structure):
  - Header: product name + close button. No product imagery (just text for clarity).
  - Left column (60%): Ingredients paragraph, then Supplement Facts table with "Amount per serving" + "%NRV". %NRV column hidden on Flow (no authorised nutrients); shown on Clear for Vit C + B12.
  - Right column (38%): Functional-group benefit cards with ingredient bullet lists. Observational phrasing only.
  - Mobile: columns stack.
- Modal shell follows `UpsellBottomSheet` conventions: backdrop + sheet on mobile, centred on desktop, body-scroll lock, ESC/X/backdrop close, `role="dialog"`, `aria-modal`, initial focus on close button.
- All `brand-base.css` tokens.

### D.4 Wire "Ingredients" button on ProductSplit tiles

- Add outlined-pill secondary CTA on each product card (above "Taste" line, below benefits list)
- Flow tile opens Flow modal, Clear tile opens Clear modal
- Tap target ≥ 44px
- Fires `landing:ingredients_viewed` Vercel Analytics event with `{ product }`
- Does NOT compete with the primary "Get Both" CTA below the split

### D.5 Docs

- Append Phase D summary to this plan doc
- Add entry to `docs/development/LANDING_PAGE_CLAIMS_LOG.md` logging the native supplement-facts panel (factual disclosure, no new claims — paper trail for future audits)

### Appetite

One day. Single PR.

### Design system

`brand-base.css`.

### No-Gos (Phase D)

- Not migrating the funnel `NutritionInfoModal` to the new native component (explicit user call — follow-up work).
- Not adding ingredient assets/illustrations inside ProductSplit tiles (duplicates `LandingWhatsInside`).
- Not changing ProductSplit's primary CTA or the AM/PM connector strip.
- Not fixing `ingredientsData.ts` / `formulaContent.ts` percentage drift from formulation spec (separate cleanup).
- Not adding product imagery inside the modal — text-only header for clarity.

### Risks

- Claims compliance on functional-group copy — handled by reusing approved observational phrasing and `††` anchors from the claims log.
- %NRV column must hide on Flow's panel and show on Clear's.
- Data-entry fidelity — `supplementFacts.ts` must match `FORMULATION_SPEC.md` exactly, audit twice.
- Mobile scroll length on Clear modal (more content than Flow) — body needs `overflow-y: auto`, backdrop tap still dismisses.

---

## Phase C: Funnel Copy + Nutrition Modal -- ACTIVE

Follow-up pass on the funnel after the Phase B landing work. Three friction points addressed in a single PR:

1. **Product-card copy leaks cadence context** -- step 1 shows "3 or 6 boxes delivered every quarter" when quarterly is pre-selected, forcing shoppers to reason about delivery frequency before they've chosen one. Static per-product labels are clearer.
2. **Cadence labels are jargon-y** -- "Monthly / Quarterly / One-Time" is technical shorthand. Johnny's feedback: plain-English supply language converts better for cold traffic.
3. **No ingredient transparency in the funnel** -- shoppers who want to verify what's in the product before checkout have no native path. Landing page covers ingredients, but paid traffic can enter the funnel directly from lower-funnel ads that skip `/start`.

| # | Task | Complexity | Status |
|---|------|-----------|--------|
| C.1 | Simplify product-card "what ships" copy (static per-product) | Small | Not Started |
| C.2 | Rename cadence labels to supply language | Small | Not Started |
| C.3 | Build `NutritionInfoModal` component (scroll layout) | Medium | Not Started |
| C.4 | Wire nutrition trigger into cadence stage only | Small | Not Started |

### C.1 Product-card "what ships" copy

- What: Replace cadence-aware `getBoxLabel()` in `ProductSelector` with a static per-product label. Flow = "1 box · 28 shots", Clear = "1 box · 28 shots", Both = "2 boxes · 28 shots each".
- Rationale: Step 1 is about choosing what you take, step 2 is about how often you receive it. Keep the concerns separated. The cadence-aware `getWhatShips()` on step 2 still surfaces full box counts once the user has chosen a cadence, so no information is lost.
- Files: `app/components/funnel/ProductSelector.tsx` (L23-33, L153)

### C.2 Cadence labels -- supply language

- What: Update `FUNNEL_CADENCES` display labels: Monthly -> "1-month supply", Quarterly -> "3-month supply", One-Time -> "Try once".
- Keep: subtitles, features, shipping callouts, CTA labels in `getFunnelCTALabels` ("Start monthly...", "Start quarterly...", "Buy once..."). Those are action-oriented and read cleanly alongside the new supply labels.
- Files: `app/lib/funnelData.ts` (L294-323)

### C.3 NutritionInfoModal component

- What: Reusable modal accepting `product: FunnelProduct`. Renders `/formulas/FlowNutrition.jpg` for Flow, `/formulas/ClearNutrition.jpg` for Clear, both stacked (scrollable) with labelled "Flow" / "Clear" headings for Both.
- Pattern: Mobile-first full-screen sheet modeled on `UpsellBottomSheet` conventions. Close via backdrop tap, X button, and ESC. No pinch-zoom library -- rely on native browser zoom if needed.
- Accessibility: focus trap, `aria-modal`, labelled by heading.
- Files: NEW `app/components/funnel/NutritionInfoModal.tsx`

### C.4 Wire nutrition trigger (cadence stage only)

- What: Add a tappable row beneath the cadence cards and **above** `FunnelAssurance`, with a help-circle icon + "Nutritional facts & ingredients" label. Only renders in step 2. Opens `NutritionInfoModal` scoped to the current `product` state. Not included in the mobile sticky footer.
- Analytics: fire `funnel:nutrition_viewed` with `{ product, cadence }` on open.
- Files: `app/funnel/FunnelClient.tsx` (step 2 block)

### Appetite

Half-day to one day. Single PR.

### Design system

`brand-base.css` (funnel is already on the new system).

### No-Gos (Phase C specifically)

- Not adding the nutrition trigger to the product picker (step 1) -- carousel already surfaces Ingredients slides.
- Not expanding cadence copy beyond the three label swaps (subtitles, features, CTA copy all stay).
- Not touching `getWhatShips()` on the cadence stage -- cadence-aware copy is correct once a cadence is chosen.
- Not updating upsell modal copy.
- No pinch-zoom library -- native browser zoom only.

### Risks

- Nutrition label images are text-dense screenshots. If unreadable at 390px via native zoom, may need to crop/split the source assets -- handle before shipping, don't pull in a zoom dependency.
- Confirm "Both" modal stacked layout (Flow label -> Flow image -> Clear label -> Clear image) reads cleanly on mobile without visual confusion between the two labels.

---

## Phase E: Landing Reshape + 100-Day Guarantee Section -- DONE

Two structural problems on `/start` motivate this phase:

1. **Sections 2 + 3 are conceptually duplicative.** `LandingWhatItDoes` covers 3 generic benefit pillars (Mental Performance / Sustained Energy / Brain Health). `LandingWhatsInside` covers 3 functional ingredient groups (Focus & Clarity / Energy & Resilience / Protection & Recovery). The categories already map 1:1 — the page asks the visitor to read the same answer twice, once as benefits and once as evidence.
2. **The 100-day guarantee is buried.** Category-leading risk reversal currently lives only as a trust badge and a footnote. The unused `LandingGuarantee` component (already built, currently dead code) is the natural home, with Magic Mind's "100-Day Risk Free Trial" pattern as the proven reference.

| # | Task | Complexity | Status |
|---|------|-----------|--------|
| E.1 | Merge `LandingWhatItDoes` + `LandingWhatsInside` into single component | Medium | Done |
| E.2 | Resurrect `LandingGuarantee` as dedicated 100-day section | Small | Done |
| E.3 | Page composition update (`app/start/page.tsx`) | Small | Done |
| E.4 | Lifestyle asset mapping (docs only) | Small | Done |
| E.5 | Claims log entry for guarantee section + merged component re-audit | Small | Done |

### E.1 Merge `LandingWhatItDoes` + `LandingWhatsInside`

- **What:** Single component that pairs each functional pillar with its supporting ingredient evidence. Keep `LandingWhatItDoes`' 3-up tile shell (icon + heading + body), slot `LandingWhatsInside`' ingredient pills + tap-to-reveal evidence panel beneath each tile.
- **Naming:** Reuse the `LandingWhatItDoes` filename to minimise import churn. Delete `LandingWhatsInside.tsx`. Refactor `WhatsInsideProductMini.tsx` into the merged component or delete if no longer needed.
- **Must preserve:**
  - `††` EFSA anchors on Vitamin C and B12 references (Brain Health pillar)
  - Observational phrasing throughout (no quantified health claims)
  - `IngredientsPanel` modal trigger from Phase D wiring
  - `LandingTrustBadges` footer beneath CTA
  - Mini Flow + Clear bottle visuals (currently in WhatsInside)
- **Mobile:** Tiles collapse to single column. Tap-to-reveal stays default-collapsed to prevent excessive section height.
- **Files:** `app/components/landing/LandingWhatItDoes.tsx` (rewritten), delete `LandingWhatsInside.tsx`, refactor or delete `WhatsInsideProductMini.tsx`, update `app/start/page.tsx` (remove section 3).

### E.2 Resurrect `LandingGuarantee` as 100-day section

- **What:** Re-frame around the 100-day money-back guarantee, keeping the app cognitive-score angle as the proof-of-credibility (the app is the receipt that the guarantee is meaningful).
- **Copy direction (Magic Mind adapted):**
  - Title: "100-Day Risk Free Trial"
  - Body: "Try CONKA for 100 days. If your mental performance doesn't noticeably improve, we'll refund your purchase completely. No return necessary."
  - Bullets: Free UK shipping · Money back guarantee · No return required · Nothing to lose (other than brain fog and burnout)
  - CTA: "Try it 100% Risk Free Now"
- **Layout:** Keep existing two-column shell (copy left, app phone mockup right). Do NOT replace the phone mockup with lifestyle imagery — the app-as-receipt is the visual story.
- **Sizing:** Migrate `brand-h2` to `brand-h1` per Phase A.8 sizing rule.
- **Bundle:** Mount via `next/dynamic` like other below-fold sections.
- **Files:** `app/components/landing/LandingGuarantee.tsx`, `app/start/page.tsx`.

### E.3 Page composition (`app/start/page.tsx`)

- Sections 2 and 3 collapse into one (the merged `LandingWhatItDoes`).
- New `LandingGuarantee` section inserted between Timeline (#7) and FAQ.
- **No other reorder this phase.** Value Comparison, Testimonials, and Case Studies stay where they are. (User explicit: hold the broader reorder until Friday lifestyle assets land — that becomes Phase H.)
- Re-validate white/tint background alternation across the new 10-section count.

**Resulting flow:**

| # | Section | Background |
|---|---------|------------|
| 1 | Hero | white |
| 2 | What CONKA Does + Inside (merged) | tint |
| 3 | Case Studies | white |
| 4 | Product Split (AM/PM) | tint |
| 5 | Value Comparison (vs Coffee) | white |
| 6 | What to Expect Timeline | tint |
| 7 | Testimonials | white |
| 8 | **100-Day Guarantee (NEW)** | tint |
| 9 | FAQ | white |
| 10 | Disclaimer | tint |

### E.4 Lifestyle asset mapping (docs only, no ship)

Working draft of where existing `/public/lifestyle/*` assets could land, plus gaps the Friday 2026-04-10 shoot needs to fill. **No code changes in this phase** — placement decisions made when new assets arrive (Phase H).

| Asset | Candidate placement | Notes |
|-------|---------------------|-------|
| `HoldBoth.jpg` | Header band on merged WhatItDoes section | Anchors the "two shots, one system" framing |
| `FlowDrink.jpg` | ProductSplit Flow tile (replace/augment bottle render) | Lifestyle proof of the AM ritual |
| `ClearDrink.jpg` | ProductSplit Clear tile (replace/augment bottle render) | Lifestyle proof of the PM ritual |
| `FlowHold.jpg` | Hero alternative variant for A/B testing | Currently using `ShotsHero.jpg` (clean product) |
| `FlowBoxOpen.jpg` | Funnel checkout assurance / unboxing context | Better suited to funnel than landing |
| `HoldingBottle.jpg` | Testimonial card photo (when Phase H ships) | Generic lifestyle, fills in until customer-supplied photos arrive |
| `WomanPink.jpg` | Testimonial card photo (when Phase H ships) | Same as above |
| `SatWoman.jpg` | Already used in Timeline (Phase A.7) | No change |
| `ClearFocusShot.jpg` | Hold for Phase H reorder (candidate for vs Coffee section visual) | Do NOT place in Guarantee section — phone mockup stays |

**Gaps the Friday shoot should fill:**
- Real customer testimonial photos (5–10 head-and-shoulders)
- "Both" product hero shot (Flow + Clear together, lifestyle context)
- Morning + evening ritual companion shots (cup of coffee on desk vs CONKA shot)
- Outdoor / active lifestyle (gym, run, work commute) for ad creative reuse

### E.5 Claims log

- New entry in `LANDING_PAGE_CLAIMS_LOG.md` for the Guarantee section copy. Verify "100-day" wording, refund mechanics ("no return necessary"), and that no implied health claim slips in via the "mental performance doesn't noticeably improve" phrasing.
- Re-audit merged `LandingWhatItDoes` to confirm no regression: every `††` anchor and observational phrase from the two source components ports across intact. Side-by-side pre/post diff.

### Appetite

Two days. Single PR.

### Design system

`brand-base.css`.

### No-Gos (Phase E)

- Not building the `IngredientCarousel` on landing (held; possibly never — `LandingWhatItDoes` merge already covers ingredient depth).
- Not adding the absorption-speed "liquid hits in minutes, not hours" strip (held as TBC for Phase F; claims log entry required if pursued).
- Not reordering vs Coffee, Testimonials, Case Studies, ProductSplit, or Timeline (user explicit hold; reshape lives in Phase H).
- Not replacing testimonial cards or sourcing real customer photos (Phase H, gated on Friday shoot delivery).
- Not integrating Friday shoot assets in this PR.
- Not touching the funnel page.
- Not modifying Hero, Case Studies, ProductSplit, Value Comparison, Timeline, Testimonials, FAQ, or Disclaimer beyond `page.tsx` orchestration.
- Not replacing the Guarantee section's app phone mockup with lifestyle imagery.

### Risks

- **Claims regression on merge** — porting two compliant components into one risks dropping a `††` anchor or weakening observational phrasing. Mitigation: explicit pre/post copy diff in E.5.
- **Mobile section length on the merged component** — 3 tiles × (heading + body + ingredient pills + reveal panel) + bottle visuals + CTA + trust badges in one section could exceed one-screen-per-idea. Mitigation: progressive disclosure (tap-to-reveal stays collapsed by default).
- **Bundle weight from `LandingGuarantee`** — currently unused so it's tree-shaken. Wiring it adds `AppConkaRing.png` to the critical path. Mitigation: `next/dynamic` import.
- **Background rhythm break** — net-zero section count, but indices shift. Validate white/tint alternation in `page.tsx` after the change.
- **Guarantee copy phrasing under UK consumer law** — "money back guarantee" and "no return necessary" need verification against the existing footnote mechanics. Likely fine (the footnote already says this) but worth a 10-minute sanity check.

### Future Phases (parked here, not active)

- **Phase F** — Absorption-speed messaging strip ("liquid hits in minutes, not hours"). Magic Mind framing. Claims log entry required. Decision pending.
- **Phase G** — Ingredient carousel as visual depth surface. On hold; merged `LandingWhatItDoes` may make this redundant.
- **Phase H** — Friday lifestyle shoot integration + real testimonial photos + broader section reorder (move vs Coffee up, consolidate Disclaimer/Value Comparison). Gated on shoot delivery.

---

## Previously Scoped Work -- DONE

- ~~Funnel: Product Selection Page (header cleanup, outcome-focused copy, dynamic CTA)~~ Done
- ~~Funnel: Plan Page (header cleanup, per-product accents, price anchor, dynamic CTA)~~ Done
- ~~Evening to Afternoon Terminology Audit~~ Done
- ~~Upsell Modal Improvements (copy, per-shot saving as hero price, social nudge)~~ Done

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
| Final pricing (3x3 matrix) | COGS analysis | Funnel full functionality |
| ~~"Both" product in Shopify~~ | ~~Shopify Admin~~ | Product live |
| ~~Quarterly selling plan~~ | ~~Shopify Admin~~ | Selling plan live |
| Lifestyle hero photography | Photos taken -- waiting on company to send files over | Landing page hero swap |
| ~~Customer photos for testimonials~~ | ~~Real photos~~ | User creating 96x96px assets in Canva |
| Review Freddy's brand deck | Deck delivered post-call -- needs review + action list | Design consistency pass |

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
| 2026-04-13 | Nutrition modal on cadence stage only, not product picker | Step 1 carousel already has Ingredients slides; extra trigger there would clutter. Shoppers at step 2 have committed to a product and are the audience most likely to want verification before checkout. |
| 2026-04-13 | Product-card copy decoupled from cadence | Step 1 = what you take, step 2 = how often you receive it. Separating concerns reduces cognitive load on the product picker. |
| 2026-04-13 | Cadence labels use supply language ("1-month supply") | Johnny: plain-English supply framing reads clearer to cold traffic than "Monthly/Quarterly/One-Time". |
| 2026-04-13 | Stacked nutrition layout for Both (not tabs) | Two items, no need for tabs overhead. Scrollable stack with labelled sections is simpler on mobile. |
| 2026-04-14 | Merge `LandingWhatItDoes` + `LandingWhatsInside` (Phase E) | The two sections cover the same 3 functional pillars — once as generic benefits, once as ingredient evidence. Visitors read the same answer twice. Merging gives one "what + why" surface and earns space for a dedicated guarantee section without page bloat. |
| 2026-04-14 | Resurrect `LandingGuarantee` as 100-day section, keep app phone mockup | 100-day guarantee is a category-leading differentiator currently buried in trust badges and footnotes. Magic Mind's "100-Day Risk Free Trial" pattern is proven. App phone mockup stays because the cognitive score is the proof the guarantee is credible — replacing it with lifestyle would weaken the story. |
| 2026-04-14 | Hold broader section reorder (vs Coffee, Testimonials) until Phase H | Reorder is high-value but better executed alongside Friday lifestyle shoot integration so testimonial real photos ship at the same time as the new card positions. |
| 2026-04-14 | Defer ingredient carousel on landing | Merged `LandingWhatItDoes` + ingredient evidence already covers the depth. Adding a carousel risks triple-covering ingredients on one page and adds bundle weight. Park as Phase G. |

---

## Jira Tickets

| Key | Summary | Phase | Status |
|-----|---------|-------|--------|
| SCRUM-869 | Landing page: CRO quick wins -- hero, testimonials, avatars | A | Done |
| SCRUM-870 | Landing page: What to Expect timeline section | A | Done |
| SCRUM-871 | Landing page: Product education and ingredients sections | B | Done |
| SCRUM-873 | Funnel: Pricing & layout iteration from January Brands feedback | Funnel Iteration | Done |
| SCRUM-874 | Funnel: copy simplification + nutrition info modal | C | In Progress |
| SCRUM-875 | Landing: ProductSplit blur fix + WhatItDoes copy + Ingredients modal | D | Done |
| SCRUM-877 | Landing: merge WhatItDoes/WhatsInside + 100-day guarantee section | E | Done |

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
