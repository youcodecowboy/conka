# Listicle housekeeping

**Status:** Phases 1 and 2 done (SCRUM-1323). Phases 3 to 6 not started (SCRUM-1324).
**Branch:** `feature/listicle-housekeeping`
**Appetite:** One day, one PR
**Scoped:** 2026-09-09

Follow-on cleanup from `listicle-first-half-upgrade.md` (Phases 1-3, SCRUM-1320/1321/1322, merged as PR #479). This picks up the debt that rebuild left behind, plus one live-copy correction it exposed.

---

## Problem

The three `/go/*` listicles carry a discount claim in the hero CTA that matches no real price, and the Phase 1-3 rebuild left three pieces of dead or triplicated config behind. One item is a paid-traffic accuracy issue; the rest are traps that misfire on the next edit.

**Who it serves:** cold Meta traffic on `/go/adhd-listicle`, `/go/productivity-listicle`, `/go/brain-ageing-listicle`. Secondary: whoever next edits a landing component.

**Business impact:** direct on the discount claim. Indirect on the rest: removes three known ways a future edit silently breaks a live page.

This is a cleanup and code-quality job throughout, with one live-copy correction riding along in Phase 1.

---

## Findings that shaped this scope

Research corrected four premises carried over from the handoff. Recorded here because each one changes what gets built.

| Assumed | Actual |
|---|---|
| The fix extends SCRUM-1322's `landingPricing.ts` pattern | The shipped sticky bar uses `getOfferPricing()` from `offerData.ts` (`ListicleRenderer.tsx:112`), not `PRICE_PER_SHOT_FLOW`. `offerData` is the pattern to extend |
| 46% is merely hardcoded | It is also **wrong**. Flow monthly is 43%, Flow quarterly is 48%. 46% matches neither |
| `landingPricing.ts` may be orphaned | It has 6 importers, so it stays. But it is a hand-maintained mirror of `offerData` whose own header says "Update here if funnel pricing changes" - the same bug as the 46%, not yet fired |
| `trustPills` has no renderer | The renderer exists and ships: `TrustChips.tsx` is used on the home hero. Only the listicle *field* is dead, so `TrustPillIcon` must survive the deletion |
| SCRUM-1176 may have residual scope | None. The dead block types (`quoteBand`, `costBreakdown`, `appSection`) are already gone. Fully delivered by SCRUM-1321 |

### The discount numbers

From `app/lib/offerData.ts`, all three listicles being `productHeroId: "01"` (Flow):

| Cadence | Price | Compare-at | Discount |
|---|---|---|---|
| Flow monthly-sub | 39.99 | 69.98 | 43% |
| Flow quarterly-sub | 109.99 | 209.94 | **48%** |

**Decision: derive from quarterly (48%).** It matches what the sticky bar on the same page already quotes (`quarterly-sub`), so hero and sticky bar finally agree, and it is a stronger number than the 46% currently shown.

---

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Hero discount derives from offerData | Done 2026-09-09 (SCRUM-1323) |
| 2 | `landingPricing.ts` derives from offerData | Done 2026-09-09 (SCRUM-1323) |
| 3 | Delete `trustPills` | Not started |
| 4 | One shared partner-logo array | Not started |
| 5 | De-fork `TrustMicroRow` | Not started (discretionary) |
| 6 | Jira and doc reconciliation | Not started (non-code) |

**Design language:** no change. Nothing here alters rendered layout except Phase 5, which is prop plumbing only. Phases 1 and 2 change how a number is sourced, not what renders (Phase 1 excepted: 46 becomes 48 by design).

---

## Phase 1 - Hero discount derives from offerData

**[Data] Token substitution in hero CTA. Complexity: Small.**

Replace the literal `46%` in the three config CTA strings with a `{savePct}` token, resolved in `ListicleRenderer` via `getDisplayDiscount(getOfferPricing(product, "quarterly-sub"))`.

Files:
- `app/lib/landings/adhd-listicle.ts:42` - "Save 46% on a calmer mind"
- `app/lib/landings/productivity-listicle.ts:47` - "...sharper day"
- `app/lib/landings/brain-ageing-listicle.ts:41` - "...sharper mind"
- `app/components/landing/ListicleRenderer.tsx` - resolve the token
- `app/lib/landings/listicle-types.ts` - document the token on the field

Rules:
- Substitution, not string concatenation. A config that omits the token must still render sane copy.
- Cadence is `quarterly-sub`, matching `stickyOffer()` at `ListicleRenderer.tsx:112`.
- `getDisplayDiscount` returns 0 when an entry has no `compareAtPrice`. The renderer must not print "Save 0%".

**Built as `{percent}`, not `{savePct}`.** The plan named a new token; review found
`ProductGridHeader` already resolves `{percent}` with the identical
`getDisplayDiscount(getOfferPricing(...))` call, and it renders on these same pages. Using a
second name for the same concept would have left two conventions in one subsystem, so the
implementation follows the existing one: the token is the bare number and the copy owns the
`%` sign. Documented in `docs/features/LISTICLE_SYSTEM.md` under "Offer tokens".

Risk: this changes live paid copy from 46% to 48%. Intended, and it makes the claim true.

## Phase 2 - `landingPricing.ts` derives from offerData

**[Data] Remove the manual-sync contract. Complexity: Small.**

`app/lib/landingPricing.ts` holds string copies of six prices that already live in `offerData.ts`. All six match today (verified 2026-09-09), so there is no live error, but the trap is loaded.

Keep the file and every exported name (6 components import them). Change the bodies from literals to derivations:

```ts
// before
export const PRICE_PER_SHOT_BOTH = "1.87";
// after
export const PRICE_PER_SHOT_BOTH = getOfferPricing("both", "monthly-sub").perShot.toFixed(2);
```

Applies to `PRICE_PER_DAY_BOTH`, `PRICE_PER_SHOT_BOTH`, `PRICE_PER_MONTH_BOTH`, `PRICE_PER_SHOT_FLOW`, `PRICE_PER_SHOT_CLEAR`, `PRICE_PER_DAY_BOTH_QUARTERLY`.

`MONTHLY_SAVINGS_VS_COFFEE` is a hand-written derivation (`(5.00 - 3.74) * 30 = 37.80` rounded to "37"). Compute it from `COFFEE_PRICE_PER_DAY` and `PRICE_PER_DAY_BOTH` rather than restating the arithmetic in a comment.

The file still earns its place: `CONKA_INGREDIENTS_COUNT`, `COFFEE_PRICE_PER_DAY` and the coffee savings figure are landing-page facts with no home in `offerData`.

Consumers (must render byte-identically after the change): `LandingProductSplit.tsx`, `LabFAQ.tsx`, `LandingProductShowcase.tsx`, `CrashChart.tsx`, `LandingTestimonials.tsx`, `CROTestimonials.tsx`.

Rules:
- Keep the exports as strings. They render directly in JSX without `.toFixed()`, and changing the type ripples into six components for no gain.
- Update the file header: it currently instructs the reader to hand-sync.

## Phase 3 - Delete `trustPills`

**[Config] Remove the dead field. Complexity: Small.**

The field is typed and populated on all three configs and rendered nowhere. `docs/TODO.md:52` says not to wire it up because it duplicates the navy ticker - but Phase 2 of the previous plan deleted the ticker, so that rationale is dead. The plan's own Phase 1 task 2 listed `trustPills` last in the new hero order, which never shipped.

**Decision: delete rather than render.** The shipped hero went through visual review; adding a pill row back into it is a design change, not housekeeping, and should be judged on screen rather than smuggled in as cleanup. Git holds the values if it is ever wanted.

Files:
- `app/lib/landings/listicle-types.ts:341` - remove `trustPills?: { label, icon }[]`
- `app/lib/landings/adhd-listicle.ts:43`, `brain-ageing-listicle.ts:42`, `productivity-listicle.ts:48` - remove the blocks (identical on all three: "Zero caffeine", "Informed Sport Certified", "100-day guarantee")
- `docs/TODO.md:52` - remove the now-resolved entry

**Keep `TrustPillIcon`** (`listicle-types.ts:143`). `app/components/landing/TrustChips.tsx` imports it for the home hero.

## Phase 4 - One shared partner-logo array

**[Component] Extract `PARTNER_LOGOS`. Complexity: Small.**

Three `LogoMarquee` copies each carry their own hardcoded list of the same 15 partner logo srcs. A logo rename breaks two pages silently and the build still passes. Found during SCRUM-1321's WebP conversion.

Extract the src list to one module; all three components import it. Each keeps its own sizing props so no page's layout moves:

| Component | Route | Sizing props |
|---|---|---|
| `app/components/landing/LogoMarquee.tsx` | `/go/*` via `ListicleProofTier.tsx:38,41` and `ListicleRenderer.tsx:643` | `w`, plus `PRESS_LOGOS` |
| `app/lander/sections/LogoMarquee/LogoMarquee.tsx` | `/lander` (`page.tsx:103`) | `h` only |
| `app/(trial-b)/lander-b/sections/LogoMarquee/LogoMarquee.tsx` | `/lander-b` (`page.tsx:123`) | `nw`/`nh` |

New file: `app/components/landing/partnerLogos.ts`.

`PRESS_LOGOS` (11 entries) stays on the shared component. It has one consumer.

Rules:
- Diff the three lists before extracting. If they are not identical, that is a finding to report, not a conflict to paper over.
- `/lander` and `/lander-b` have no live traffic. Keep them functional; do not build around them and do not restructure them.

## Phase 5 - De-fork `TrustMicroRow` (discretionary)

**[Component] Point the listicle at the shared component. Complexity: Medium.**

The avatars + rating + "622+ reviews, 5,000+ daily users" row exists twice: `app/components/landing/TrustMicroRow.tsx` and a private near-duplicate at `ListicleRenderer.tsx:170` (props `label`/`sub`, used at `:921`). Same output, two code paths, so a copy change has to be made twice or the pages disagree.

Replace the private copy with the shared component, adding `label`/`sub` overrides if the shared one lacks them.

**Circuit breaker:** if the shared component's hardcoded "622+ reviews, 5,000+ daily users" cannot be overridden without reworking its API, stop, leave the fork in place, and file it in `docs/TODO.md`. Do not redesign a shared component to close a housekeeping ticket.

This phase is the headroom in a one-day appetite. If Phases 1-4 consume the day, it defers.

## Phase 6 - Doc reconciliation (non-code)

- **SCRUM-1176: done 2026-09-09.** Moved To Do to For review with a comment recording delivery by SCRUM-1321. Verified before moving: `quoteBand`, `costBreakdown` and `appSection` return no hits across `app/lib/landings/` and `app/components/landing/`, so there was no residual scope.
- **`listicle-first-half-upgrade.md`** header still says "Not yet deployed". PR #479 is merged. Correct it.

---

## Pre-deploy checks: both cleared

The previous plan's Risks section flagged two. Both resolved 2026-09-09, neither blocks anything.

- **Free-week ad-set angle: dropped as a concern.** The pages have run long enough without a significant spike in purchases that whether an ad still carries the angle does not matter. Do not reopen this.
- **Copy-above-asset flip at 390px: confirmed fine.** Reviewed on device, sizing is correct. The SCRUM-1166 reversal stands.

## Rabbit holes

- **Full LogoMarquee collapse into one component.** Ruled out. Rewrites two zero-traffic pages to tidy one live one.
- **Redesigning `TrustMicroRow`'s API.** Phase 5's circuit breaker exists for this.
- **A site-wide hardcoded-number sweep.** Fix the discount claim and the `landingPricing` mirror. Do not open the wider audit.

## No-gos

- Not deleting `landingPricing.ts`. Six components import it, and three of its constants are genuine landing-page facts.
- Not touching `config.body` or reason ordering. That is Phase 4 of `listicle-first-half-upgrade.md`, correctly blocked on data, and it rebases every `section_viewed` id.
- Not rendering `trustPills`.
- Not changing the CTA destination (PDP hand-off vs in-page `#product` anchor). Blocked on a decision, not on code.
- Not swapping the stand-in hero photos. Waiting on the person-drinking shoot; one config line per page when it lands.
- Not building around `/lander-b`.

## Risks

- Phase 1 changes a live discount claim on three paid-traffic pages. The new number is correct and higher; the old one was neither.
- Phase 2 touches six components including two on live pages (`CROTestimonials`, `LabFAQ`). Rendered output must be byte-identical. Verify before and after.
- Phase 4 assumes the three logo lists are identical. Verify before extracting.
- No analytics impact in any phase. No `section_viewed` ids move, no `IntersectionObserver` options change.

## References

- `docs/development/featurePlans/listicle-first-half-upgrade.md` - the parent plan (Phases 1-3 shipped, Phase 4 blocked on data)
- `docs/MASTER_CONTEXT.md:80` - "Offer terms (guarantee period, discounts) live in `app/lib/offerConstants.ts` - never hardcode"
- `docs/development/CART_PRICING_SOURCE_OF_TRUTH.md` - pre-add UI prices from `offerData.ts`
- `docs/features/LISTICLE_SYSTEM.md` - the `/go` listicle format
- `docs/TODO.md:52` - the `trustPills` entry this plan resolves

## Jira tickets

| Ticket | Title | Phases | Status |
|--------|-------|--------|--------|
| SCRUM-1323 | [Website & CRO] Listicle pricing claims derive from offerData | 1, 2 | To Do |
| SCRUM-1324 | [Website & CRO] Remove dead and duplicated listicle landing config | 3, 4, 5, 6 | To Do |
