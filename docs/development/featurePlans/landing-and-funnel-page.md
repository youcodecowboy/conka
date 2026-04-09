# Landing & Funnel Page

> **Status:** Landing page and funnel built. Johnny feedback received 2026-04-09. Next: execute feedback iteration.
> **Created:** 2026-03-24
> **Last updated:** 2026-04-09
> **Routes:** `/start` (landing page), `/funnel` (purchase funnel)
> **Design system:** `brand-base.css`

---

## What's Built

### Landing Page (`/start`)

Standalone conversion page for paid Meta traffic. Not in nav, `noindex`. Every section has a CTA pointing to `/funnel`.

**Page structure:**

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
| `app/funnel/page.tsx` | Server component — metadata (noindex), renders FunnelClient |
| `app/funnel/FunnelClient.tsx` | Client orchestrator — state, step navigation, checkout flow, analytics |
| `app/lib/funnelData.ts` | Types, 3×3 pricing matrix, variant mapping, display data, upsell logic |
| `app/lib/funnelCheckout.ts` | Isolated cart creation, analytics, checkout URL (bypasses CartContext) |

**Funnel components (`app/components/funnel/`):** `FunnelStepIndicator`, `FunnelHeroAsset`, `CadenceSelector`, `ProductSelector`, `FunnelCTA`, `UpsellModal`, `FunnelAssurance`.

**Step flow:**

| Step | Screen | Pre-selected | CTA |
|------|--------|-------------|-----|
| 1 — Plan | Cadence cards (Monthly / Quarterly / Try Once) | Monthly | "Choose Product" |
| 2 — Product | Product cards (Both / Flow / Clear) | Both | "Go to Checkout" |
| 3 — Checkout | Shopify hosted checkout | — | Redirect via `cart.checkoutUrl` |
| 3.5 — Upsell | Bottom sheet modal (contextual) | — | "Yes, upgrade" / "No thanks" |

**What works end-to-end (4 of 9 combos):** Flow and Clear × Monthly Sub and Monthly OTP. Both × any cadence and Any × Quarterly are blocked on Shopify product setup.

---

## Completed Work

### Phase 1: Critical Fixes (Done)

Completed before first paid campaign.

- **Mobile performance** — images to WebP, lazy loading, `fetchpriority="high"` on hero, bundle audit. PageSpeed 64 → 85+.
- **KSM-66 removal** — replaced "KSM-66 Ashwagandha" with "Ashwagandha" across 8 files (landing components, lib/data, shared components). Legal compliance requirement.
- **Mobile CTA safe-area fix** — added `env(safe-area-inset-bottom)` padding so browser URL bar doesn't overlap CTA.
- **SEO** — meta description, H1 verified, alt text, canonical URL. Score 58 → 80+.

### Phase 2: Landing Page Restructure (Done)

- **Section reorder** — moved case studies to #2 (social proof early), benefits to #5, FAQ to #7. Unused sections (What's Inside, Guarantee) stacked at bottom.
- **Hero updates** — H1 changed to "The only brain supplement you can measure." Subheadline now leads with pain point. Removed circular badge. Trust pill font increased.
- **CTA standardisation** — hero keeps "Try Risk-Free →", all others show "Get Both from £1.61/shot →". Added CTA beneath coffee comparison.
- **Benefits grid labels** — changed from feature names to outcome-focused copy (e.g. "Sharper Focus" → "Stay locked in past 2pm").
- **Testimonial cards** — updated to show score changes as data points (matching case study format).
- **FAQ trimmed** — cut from 9 to 5 questions, reordered to lead with guarantee.

### Code Quality Fixes (Done)

- `FUNNEL_URL` consolidated from 7 duplicate definitions to single shared constant
- `page.tsx` converted from Client Component to Server Component (testimonial shuffle in small client wrapper)
- `LandingGuarantee.tsx` raw `<img>` replaced with `next/image`
- `LandingProof.tsx` dead code deleted
- CTA pattern extracted to shared `LandingCTA` component
- `hideCTA` prop added to `CaseStudiesDataDriven` (replaced fragile CSS hack)
- Hardcoded colours in `LandingProductSplit.tsx` replaced with design tokens

### Audit Findings Resolved

- Guarantee mismatch fixed (FAQ/Disclaimer now import from `offerConstants.ts`)
- Missing `noindex` metadata added
- Claims compliance pass completed (see `docs/development/LANDING_PAGE_CLAIMS_LOG.md`)

---

## Next Phase: Johnny Feedback (2026-04-09)

Feedback from Johnny at January Brands after reviewing the landing page and funnel on mobile. Two Loom videos covering the full flow.

**Overall verdict:** Funnel is "really, really impressive" and in a strong place. Landing page has all the right blocks but needs iteration on design consistency, product education for cold traffic, and social proof quality.

**Key reference site:** Magic Mind's landing page is the primary inspiration going forward. Johnny explicitly says to take their section structures and apply CONKA branding — "no shame in it, everyone does it, they have a lot of data."

### Landing Page Feedback

#### Design & Branding

- **Design consistency across sections** — some sections feel like they don't belong next to each other. Suggests getting Freddy (January Brands' brand designer for Overload/Cloud) on a call for pointers on fonts, style, and cohesion.
- **Section title sizing** — titles need to be slightly bigger and more readable throughout.
- **Trust badge icons** — reuse the icons (Informed Sport, money-back guarantee, etc.) in more places across the page. "Things we want to shout about."

#### Hero Section

- **Hero image** — current product-on-white shot (`CONKA_39.jpg`) is unclear about what the product actually is. Replace with either a lifestyle shot (someone drinking CONKA) or a close-up of the two bottles. The phone/app could be a small circle or banner overlay rather than a primary hero element.
- **Hero centering** — something isn't centred (needs investigation).
- **Headline copy** — need multiple headline variants to A/B test. They saw significant conversion rate differences between headline variants on Overload.
- **Offer framing** — use a percentage discount rather than "risk-free for 100 days". Percentages always perform better.

#### Social Proof

- **Testimonials need real photos** — no initials or avatars. Actual customer pictures required. Reference Overload's approach.
- **Testimonial scroll speed** — too fast to read. Should pause/snap between items rather than continuous scroll. Reference Overload's carousel that stops on each item.

#### Content & Education (biggest gap)

- **Product education section needed BEFORE case studies** — cold traffic doesn't know what CONKA is. Need a section early in the page explaining what the product does (mental performance, energy, brain health). Heavy inspiration from Magic Mind's landing page.
- **Case study clarity** — "test score" and "change" metrics need more context. Cold traffic has no idea what these numbers mean.
- **Product split section** — needs more detail than "caffeine-free nootropic, take in morning". Explain what each product actually *does*.
- **Ingredients breakdown** — add a digestible ingredients section (Magic Mind style — ingredient cards with benefits).
- **Timeline section** — add a "what to expect" timeline (Magic Mind has one). Answers "when will I feel it?"

### Funnel Page Feedback

#### Step 1 (Cadence Selection)

- **Simplify pricing display** — the "vs separate" comparison is confusing. Just show: per-shot price, monthly total, and the strike-through price. Remove the "versus separate" line.
- **Per-shot context** — add "2 shots per day" context next to per-shot price (e.g. "£1.61/shot · 2 shots per day").
- **Free shipping callout** — add "Free priority shipping on subscriptions".
- **Delivery clarity** — make it very clear when products arrive (e.g. "2 boxes delivered every month", "delivered quarterly"). This was a major learning from Overload — customers need to understand exactly when they'll get their products.

#### Step 2 (Product Selection)

- **Reorder cards** — put the most popular option in the middle position, not first. Middle position converts better (confirmed by their data).
- **Highlight savings more** — savings amount needs to be more prominent on the "Both" card.

---

## Previously Scoped Work (Unstarted)

The following phases were scoped before Johnny's feedback. Some items overlap with or are superseded by the feedback above. Review before starting — Johnny's feedback takes priority where there's conflict.

### Funnel: Product Selection Page (Phase 3)

- **Header cleanup** — remove feature-bashing caption, change H2 to "Your CONKA plan", remove subtitle
- **Product card copy** — update descriptions to outcome-focused copy. Update Clear terminology from "Evening" to "Afternoon"
- **Dynamic CTA** — CTA updates reactively based on selected product with per-shot pricing

### Funnel: Plan Page (Phase 4)

- **Header cleanup** — change H2 to "Your delivery plan", remove subtitle, remove mobile hero image from step 2
- **Per-product accent colours** — Both: `#378ADD`, Flow: `#F59E0B`, Clear: `#0369a1`. Cards visually adapt to selected product.
- **Price anchor (trial pack reference)** — use £3.75/shot trial pack as crossed-out anchor on all plan cards. Compute `compareAtPrice` as `TRIAL_PACK_PER_SHOT * shotCount`.
- **Dynamic CTA** — CTA updates based on product + cadence selection with full pricing context

### Evening to Afternoon Terminology Audit (Phase 5)

Separate PR. Replaces "Evening" with "Afternoon" in all CONKA Clear context across ~12 files, ~21 edits. Does NOT change customer testimonials (real quotes).

### Upsell Modal Improvements (P2)

- Copy changes: "Clear sustains your afternoon" (replacing evening), outcome-focused bullet points
- Per-shot saving as hero price signal on the modal
- Social nudge line: "Most people who start with Flow switch to Both within 30 days" (verify against real data)

---

## No-Gos

- Not integrating new hero photography until shoot is complete
- Not fixing cut-off logos in current hero image
- Not redesigning the coffee comparison section
- Not touching upsell modal copy or logic until P1 Johnny feedback is done
- Not redesigning card layout or adding new UI patterns in funnel — copy, colours, and CTA changes only
- Not touching checkout flow or Shopify variant mapping
- Not changing customer testimonials that use "evening" (real quotes, cannot alter)
- Not removing desktop left-column hero image on funnel Step 2 (provides visual anchor)

---

## Risks

- **Accent colour shift:** Clear's change from blue to teal needs readability verification against white card backgrounds on mobile
- **Dynamic CTA complexity:** CTA needs product + cadence + step to compute labels. Keep the helper function clean and typed.
- **Evening to Afternoon audit:** Touches ~12 files including shared components on product pages. Needs regression check. Ship as separate PR.
- **Price anchor values:** Computed from `TRIAL_PACK_PER_SHOT` constant. If trial pack price changes, verify before launch.

---

## Blocked / Waiting On

| Item | Waiting for | Blocks |
|------|-------------|--------|
| Final pricing (3×3 matrix) | COGS analysis + margin targets | Shopify setup, funnel full functionality |
| "Both" product in Shopify | Shopify Admin setup | Both × any cadence checkout |
| Quarterly selling plan | Shopify Admin setup | Any × Quarterly checkout |
| Lifestyle hero photography | Photo shoot | Landing page hero |
| Customer photos for testimonials | Real customer/athlete photos | Landing page social proof |
| Freddy brand call | Scheduling with January Brands | Design consistency pass |
| A/B test headline variants | Copy creation | Landing page hero conversion |
| Magic Mind reference analysis | Research task | Product education section, ingredients section, timeline |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-24 | Pre-select "Both" + "Monthly Sub" | Direct customer to highest LTV option |
| 2026-03-24 | Landing page is noindex, not in nav | Strictly for paid traffic |
| 2026-03-25 | Funnel is mobile-first | 95% of paid Meta traffic is mobile |
| 2026-03-25 | Funnel uses isolated cart (not global CartContext) | Separate flow — no drawer, no interference |
| 2026-03-25 | Multi-step paginated funnel | Each step is a focused screen (Fussy pattern) |
| 2026-03-25 | No nav/footer on funnel page | Distraction-free |
| 2026-04-09 | Magic Mind as primary landing page reference | Johnny recommendation — they have significant data and test extensively |
| 2026-04-09 | Product education section needed early on landing page | Cold traffic from ads doesn't know what CONKA is |
| 2026-04-09 | Most popular option goes in middle position (funnel) | January Brands data shows middle position converts better |
| 2026-04-09 | Percentage discounts over "risk-free" messaging | January Brands consistently sees better performance with percentage offers |
| 2026-04-09 | Real customer photos required for testimonials | Initials/avatars feel template-y, hurts trust |

---

## References

- [Website Simplification Plan](../WEBSITE_SIMPLIFICATION_PLAN.md) — broader site simplification context
- [Landing Page Claims Log](../LANDING_PAGE_CLAIMS_LOG.md) — claims compliance audit
- [Design System](../../branding/DESIGN_SYSTEM.md) — brand design system
- [Brand Voice](../../branding/BRAND_VOICE.md) — copy rules and proof assets
- [Offer Constants](../../../app/lib/offerConstants.ts) — guarantee, pricing constants
- **Magic Mind landing page** — primary inspiration for product education, ingredients, timeline sections
- **Overload funnel:** `ovrload.co/pages/funnel` — product picker, pre-selection, middle-position pattern
- **Overload landing:** `ovrload.co/pages/gummy` — hero asset, trust badges, testimonial carousel with snap
- **Fussy subscribe flow:** `getfussy.com/pages/subscribe` — multi-step flow, step indicator UX
