# CRO Value Messaging + Offer Strategy

> **Status:** Phase A ticketed. Phase B pending team review.
> **Created:** 2026-04-02
> **Appetite:** Phase A: 1-2 days. Phase B: TBD after team alignment.
> **Branch:** `CRO-landing-and-funnel-work`
> **Epic:** SCRUM-763 (Website & CRO)
> **Continues:** `funnel-cro-optimisation.md` (all 3 phases complete)

---

## Problem

The landing page (/start) sells the *what* but never the *why-now-at-this-price*. There is zero pricing anywhere on the page. No daily cost anchor. The caffeine comparison is limited to one line in the hero and one FAQ answer, despite CONKA costing less per day than a single coffee.

The funnel (/funnel) presents sticker shock to cold Meta traffic (£89.99/mo or £129.99 one-time) with no introductory sweetener. The default cadence is monthly, but the unit economics strongly favour quarterly (profitable after CPA on first order vs underwater for monthly).

Meanwhile, the dashboard shows avg tenure (4.4m) is shorter than CPA payback (5.4m), meaning the business loses money on the average customer before they churn.

## Who it serves

Cold paid Meta traffic arriving on mobile with zero brand awareness.

## Business impact

**Acquisition:** Reframing CONKA's daily cost vs coffee on the landing page addresses the biggest missing conversion lever. The maths genuinely works: the full Both system (2 shots/day, 16 active ingredients) costs £3.22/day -- less than a single UK coffee.

**Retention/Payback:** Pushing quarterly as the default cadence locks in 3 months mechanically (vs monthly where they can churn after month 1). Quarterly Both is the only subscription that covers CPA on the first order (+£37.01 after £71 CPA).

**Cadence economics:**

| Cadence | Price | COGS | Gross Margin | After CPA (£71) | Months locked |
|---------|-------|------|-------------|-----------------|---------------|
| Monthly Both | £89.99 | £40.64 | £49.35 (55%) | -£21.72 | 1 |
| Quarterly Both | £229.99 | £121.91 | £108.08 (47%) | +£37.01 | 3 |
| OTP Both | £129.99 | £40.64 | £89.35 (69%) | +£18.28 | 0 (0% converts to sub) |

## Design system

Both pages use `brand-base.css` (new system, migrated in SCRUM-840).

---

## Phases

| Phase | Description | Ticket | Status |
|-------|-------------|--------|--------|
| A | Landing page value messaging (daily cost, coffee comparison, per-shot pricing) | SCRUM-843 | Not Started |
| B | Offer strategy + funnel quarterly push (intro pricing, cadence default, coffee anchoring) | SCRUM-844 | Pending team review |
| C | OTP-to-Sub conversion flow (Klaviyo post-purchase) | -- | Future (separate workstream) |

---

## Phase A: Landing Page Value Messaging

Add the "why it's worth it" layer that's completely missing. No pricing currently appears anywhere on the landing page.

### Tasks

1. **[Copy] Daily cost anchor in hero**
   - Add "From £2.14/day" or "Less than your morning coffee" to hero subheadline
   - Reframes the entire page before they scroll
   - Files: `app/components/landing/LandingHero.tsx`
   - Complexity: Small

2. **[Section] CONKA vs Coffee value comparison**
   - New section: visual side-by-side comparison
   - Left: "Your daily coffee" -- £3.50-4.50/day, caffeine crash, 0 active ingredients, borrows energy
   - Right: "Your daily CONKA" -- from £1.61/shot, 16 active ingredients, Informed Sport certified, no crash
   - Key message: the full AM+PM system costs less per day than a single coffee
   - Must stay within EFSA claims compliance (factual comparison only, no health claims for non-authorised ingredients)
   - Reference: `docs/development/LANDING_PAGE_CLAIMS_LOG.md`
   - Files: New `app/components/landing/LandingValueComparison.tsx`, `app/start/StartPageClient.tsx`
   - Complexity: Medium

3. **[Copy] Per-shot value callout in product split**
   - Add "from £2.14/shot" on Flow and Clear cards, "from £1.61/shot" on Both
   - Makes "Get Both for Less" CTA concrete
   - Files: `app/components/landing/LandingProductSplit.tsx`
   - Complexity: Small

4. **[Copy] Cost comparison in FAQ**
   - Update "What makes CONKA different from coffee?" FAQ to include cost comparison
   - "A daily coffee habit costs £105-135/month. CONKA Flow costs £59.99/month (£2.14/day) with 16 active ingredients and no caffeine."
   - Files: `app/components/landing/LandingFAQ.tsx`
   - Complexity: Small

5. **[QA] Claims compliance check**
   - Review all new copy against EFSA rules
   - Factual price comparison: safe
   - "16 active ingredients" vs "0 active ingredients": factual, safe
   - Avoid any implied superiority claims beyond what's factual
   - Reference: `docs/branding/CLAIMS_COMPLIANCE.md`, `docs/development/LANDING_PAGE_CLAIMS_LOG.md`
   - Complexity: Small

---

## Phase B: Offer Strategy + Funnel Quarterly Push

Requires team alignment on introductory pricing and Shopify/Loop setup. This section is structured as a strategy document to take to the team.

### Decision 1: Default cadence change

**Proposal:** Change funnel default from Monthly to Quarterly.

**Rationale:**
- Quarterly Both is profitable after CPA on first order (+£37.01). Monthly is not (-£21.72).
- Locks in 3 months mechanically. Current avg tenure is 4.4 months -- many monthly subscribers churn before month 3.
- Aligns with existing messaging: "We recommend trying CONKA for 100 days" (FAQ) and the 100-day guarantee.
- Per-shot cost is genuinely the best value (£1.37 vs £1.61 monthly).

**Messaging shift:**
- Current: Monthly = "Most Popular", Quarterly = "Best Value"
- Proposed: Quarterly = "Recommended" (or "Most Popular"), Monthly = standard option
- Frame quarterly as "the way most people start" rather than a premium upsell

**Implementation:** Data change in `app/lib/funnelData.ts` + copy updates in `CadenceSelector.tsx`. Small effort.

### Decision 2: First-quarter introductory discount

**Proposal:** Offer a discount on the first quarterly shipment to make the commitment feel generous.

**Options modelled against likely COGS:**

| Offer | First Quarter Price | Saving vs Standard | Gross Margin | After CPA (£71) | Break-even? |
|-------|--------------------|--------------------|-------------|-----------------|-------------|
| No discount (current) | £229.99 | -- | £108.08 (47%) | +£37.01 | Yes, day 1 |
| 10% off first quarter | £206.99 | £23 | £85.08 (41%) | +£14.01 | Yes, day 1 |
| "Save £30" first quarter | £199.99 | £30 | £78.08 (39%) | +£7.01 | Yes, barely |
| "Save £40" first quarter | £189.99 | £40 | £68.08 (36%) | -£2.99 | Near-breakeven |
| Monthly-equivalent framing | £199.99 | "Save £70 vs paying monthly" | £78.08 | +£7.01 | Yes |

**Recommendation:** £199.99 first quarter ("Save £30"). Still profitable after CPA. Messaging: "Your first quarter for £199.99 -- that's £1.19/shot, less than half a coffee."

**Per-shot at £199.99:** £1.19/shot (168 shots). This is the most compelling number in the entire product line.

**Implementation options:**
- Loop introductory pricing (if supported): first billing cycle at discounted rate, subsequent at standard
- Auto-applied discount code at checkout for first-time customers
- Shopify selling plan with intro pricing tier
- Needs investigation: which mechanism Loop/Shopify supports cleanly

### Decision 3: No monthly discount

**Confirmed:** Keep monthly at £89.99 with no first-order sweetener. Let the quarterly value proposition do the work. Monthly exists as a fallback for people who won't commit to quarterly, not as the recommended path.

### Decision 4: Coffee price anchoring in funnel

**Proposal:** Show "Less than a daily coffee" context alongside per-shot pricing in the funnel.

**Implementation:** Small copy addition next to per-shot price display in ProductSelector and CadenceSelector. E.g., "£1.37/shot -- less than a coffee" or a small coffee cup icon with "vs £3.50+".

**Complexity:** Small. Pure copy/UI, no pricing logic changes.

### What we expect to see

If these changes work:
- **Cadence mix shifts toward quarterly:** Target 40%+ of new subscriptions choosing quarterly (vs current unknown split)
- **Subscription rate improves:** Currently 50% and declining. Quarterly's lower per-shot cost + "recommended" framing should help.
- **CPA decreases:** Better value messaging on landing page should improve click-to-purchase conversion
- **Payback period shortens:** Quarterly locks in 3 months minimum, reducing churn-before-payback risk
- **First-order profitability:** Quarterly Both at £199.99 intro is still +£7.01 after CPA -- first-order profitable

### Metrics to track
- Cadence mix (% quarterly vs monthly vs OTP)
- Subscription rate (new customers subscribing)
- Landing page to funnel click-through rate
- Funnel completion rate by cadence
- CPA (Meta)
- Month 3 retention rate (do quarterly subscribers renew after first quarter?)
- Revenue per new customer (first 90 days)

---

## Phase C: OTP-to-Sub Conversion (Future)

0% OTP-to-sub conversion is a separate problem. Likely a Klaviyo post-purchase flow:
- Email sequence after OTP delivery: "Love it? Subscribe and save 25%"
- Timed to arrive after they've tried the product (day 7-14)
- Possibly a one-time discount code for their first subscription
- Separate workstream, not website changes

---

## Rabbit Holes

- **Shopify/Loop introductory pricing mechanics:** Need to confirm Loop supports "first billing at X, then Y" before committing to the discount code approach. Don't build a custom discount system.
- **Claims compliance on coffee comparison:** Factual price comparison is safe. "0 active ingredients" vs "16 active ingredients" is factual. Avoid any implied therapeutic superiority. Run new copy through the claims checklist.
- **Quarterly default A/B testing:** Could A/B test quarterly vs monthly default, but with current traffic (3,170 sessions/mo) statistical significance would take months. Better to commit and measure.

## No-Gos

- No monthly first-order discount (margin doesn't support it at current CPA)
- No OTP discounting (problem is post-purchase conversion, not price)
- No "free trial" or "£1 first box" (tenure too short to recover)
- No changes to funnel step flow (already reordered in SCRUM-838)
- No structural changes to landing page sections (beyond the new value comparison section)

## Risks

- **Quarterly sticker shock:** £229.99 (or £199.99 intro) is a bigger number than £89.99. The per-shot anchoring and coffee comparison must do the heavy lifting.
- **Quarterly churn at renewal:** If people subscribe quarterly but don't renew, you've gained 3 months but lost the customer. Track Q1-to-Q2 renewal rate.
- **Coffee comparison tone:** Must feel confident and factual, not defensive or gimmicky. Brand voice is "confident-clinical."

## Open Questions

- [ ] Does Loop support introductory pricing on selling plans? (First cycle at £199.99, then £229.99 ongoing)
- [ ] If not, can an auto-applied discount code work for first-time quarterly subscribers only?
- [ ] What's the current cadence mix? (% of new subs choosing monthly vs quarterly vs OTP)
- [ ] Should the intro discount apply to single-formula quarterly too, or just Both?

---

## Related Docs

- [Funnel CRO Optimisation Plan](./funnel-cro-optimisation.md) (predecessor, all phases complete)
- [Landing Page Review Plan](./landing-page-review-and-upgrade.md) (phases 1-2 complete)
- [Website Simplification Plan](../WEBSITE_SIMPLIFICATION_PLAN.md)
- [Claims Log](../LANDING_PAGE_CLAIMS_LOG.md)
- [Brand Voice](../../branding/BRAND_VOICE.md)
- [Quality Standards](../../branding/QUALITY_STANDARDS.md)
