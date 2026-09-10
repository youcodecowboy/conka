# PDP Above-the-Fold Conversion

Raise add-to-cart rate on the three main acquisition PDPs (`/conka-flow`, `/conka-clarity`, `/conka-both`) by making the first screen answer "what does this do for me?" and "what do I get?" before the user reaches the price.

Scoped 2026-09-10. Branch `feature/pdp-add-to-cart-tweaks`.

## Phase status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Strapline replaces the spec pill, gift-value line in the identity block | Built 2026-09-10, pending visual review |
| 2 | Check grid above the buy panel on mobile | Future (gated on Phase 1 data) |
| 3 | Desktop convergence + PAGE_NARRATIVES entry | Future |

## Problem

The first screen of the Flow / Clear / Both PDPs never answers "what does this do for me?".

Current mobile order (`ProductHeroMobileV3`):

1. `SocialProofBadge` - "112 others exploring better focus"
2. `h1` - "CONKA Flow"
3. `SpecBadge` - "0MG CAFFEINE | MORNING RITUAL"
4. `HeroRating` - 4.7 (622 reviews)
5. Gallery
6. `ProductBuyPanel` - "Select your plan:", 20 shots, 43% OFF, £39.99
7. `IngredientBenefitLede` - "The Daily Morning Brain Shot / for Sharper, Calmer Focus" + description + 2x2 check grid

The benefit line that does the persuading is at position 7, below the buy decision. The spec pill at position 3 occupies the most valuable row on the page and says nothing a buyer weighs.

The strongest offer we have, a free starter kit worth £82.96 on a Flow monthly subscription, is invisible until the user has scrolled past the price entirely (`GiftValueStack`, inside the subscription summary card).

## Who it serves

Cold paid-social traffic landing directly on a PDP. 74% mobile. The 390px viewport is the design target.

## Business impact

Add-to-cart rate on the three PDPs that carry most paid acquisition.

## Approach

Promote the benefit line into the slot the spec pill currently wastes, and add a derived gift-value line beside it. Do not hoist the whole lede block.

**Design language:** Simple DTC (DESIGN_SYSTEM.md section 8.5 authority table governs PDP acquisition surfaces). Green `--brand-positive` `#1a7f4f` is the sanctioned accent for the gift-value figure. `.brand-clinical` on these pages is vestigial token inheritance only.

## The SCRUM-1260 conflict, and how this resolves it

The obvious version of this work - move `IngredientBenefitLede` above `ProductBuyPanel` on mobile, the way Magic Mind orders its PDP - directly reverses SCRUM-1260, which moved that block *below* the buy panel on purpose so price and CTA would land on the first screen. `ProductHeroMobileV3`'s own header comment records the reasoning.

The full lede costs roughly 330px at 390px: a two-line `h2` at 2.25rem/1.5rem, a description paragraph, and a 2x2 check grid. Hoisting all of it pushes the plan selector off screen again.

The resolution is that the lede is three separable things, and only two of them need to move:

- The `h2` moves to the very top, into the slot the deleted spec pill vacates, condensed to a single-weight strapline. Net height cost near zero, because it replaces something.
- The check grid moves above the buy panel, at roughly 90px rather than 330px (Phase 2).
- The description stays where it is.

Magic Mind accepts price below the fold as the cost of its ordering. We do not have to.

## Why the spec pill is a clean delete

`SPEC_LABEL` in `HeroBadges.tsx` carries two facts per product:

| Product | Pill | Already said by |
|---------|------|-----------------|
| Flow | "0mg caffeine \| morning ritual" | Check grid item 1 ("Zero caffeine, zero crash"); strapline "The Daily **Morning** Brain Shot" |
| Clear | "0mg caffeine \| afternoon clarity" | Check grid item 1; strapline "The **Afternoon** Brain Shot That Cuts Through Brain Fog" |
| Both | "0mg caffeine \| full system" | Check grid item 1; strapline "The Complete Daily Brain Shot **System**" |

Every fact survives the deletion. Nothing needs relocating.

## Gift-value line: the data constraints

`offerData.ts` attaches `STARTER_PACK_GIFTS` to `monthly-sub` and `quarterly-sub` only. One-time cadences have no `gifts` and no `freeShotsValue`.

The total is `freeShotsValue + sum(gifts[].rrp)`, which differs per product and cadence. The £82.96 in the reference screenshot is specifically Flow monthly-sub: £23.99 (8 free shots) + £19.99 (hat) + £28.99 (capsule travel pack) + £9.99 (app access).

Two consequences:

- The line must derive from the currently selected cadence, and render nothing when that cadence has no gifts. It sits above the gallery while the selector sits below it, so the figure changes as the user picks a plan and vanishes on one-time.
- `GiftValueStack` already computes this total. Extract it into a shared helper rather than recomputing, so the hero figure and the stack figure cannot diverge.

**Decision:** show the real per-cadence figure, not a fixed monthly headline number. It is derived, so it cannot drift from what the stack shows lower down.

Every figure here is display-only and pre-add. Cart and checkout still price from Shopify alone (CART_PRICING_SOURCE_OF_TRUTH.md).

## Phase 1: Strapline and gift-value line

Target mobile order after Phase 1:

1. `SocialProofBadge`
2. `h1`
3. **`HeroStrapline`** (new, replaces `SpecBadge`)
4. `HeroRating`
5. **`HeroGiftValue`** (new)
6. Gallery
7. `ProductBuyPanel`
8. `IngredientBenefitLede` (description + check grid, `h2` removed)

### Tasks

**1. Delete `SpecBadge`, add `HeroStrapline`** - Small

- Remove `SpecBadge` and `SPEC_LABEL` from `HeroBadges.tsx`.
- New `HeroStrapline` reads `LEDE_SUBLINE[formulaId] ?? getHeroContent(formulaId).seoHeading`. Same source the lede `h2` uses today, so no new copy is authored.
- Renders as plain text at roughly 1.0625rem, not a pill and not a heading element. It is a descriptor under the `h1`.
- Slots into the identity block of both heroes where the pill was.
- Files: `app/components/product/HeroBadges.tsx`, `app/components/product/ProductHeroMobileV3.tsx`, `app/components/product/ProductHeroV3.tsx`

**2. Drop the duplicated `h2` from `IngredientBenefitLede`** - Small

- Depends on task 1. With the strapline at the top, the two-line `h2` repeats the same sentence within one screen.
- Delete the `h2` and the bold/tail split logic (the `" for "` / `" That "` / comma-fallback parsing). Keep `LEDE_DESCRIPTION` and the check grid.
- `LEDE_SUBLINE` stays, since `HeroStrapline` now consumes it.
- Files: `app/components/product/IngredientBenefitLede.tsx`

**3. Gift-value line in the identity block** - Medium

- Extract the gift total from `GiftValueStack` into a shared helper (`getGiftTiles` plus its `totalFreeValue` reduce), exported from `cadenceData.ts` or a small sibling.
- New `HeroGiftValue` takes the selected cadence's pricing, returns `null` when there are no gift tiles.
- Copy: `Free starter kit worth £82.96 on your first box`. Figure in `--brand-positive` green, rest in body colour. No box, no pill.
- `GiftValueStack` refactored to consume the same helper.
- Files: `app/components/product/GiftValueStack.tsx`, `app/lib/cadenceData.ts`, `app/components/product/HeroBadges.tsx`, both heroes

### Verification

- All three PDPs at 390px: strapline wrapping, gift line present on monthly-sub, absent on one-time.
- Flow and Clear straplines are long. "The Afternoon Brain Shot That Cuts Through Brain Fog" wraps to three lines at 390px. Confirm the plan selector has not moved further down the page than it is today.
- `npm run lint:changed`, `npm run build`.

## Phase 2: Check grid above the buy panel (Future)

Gated on a week of Phase 1 add-to-cart data. Phase 1 may do most of the work on its own by putting the benefit at the very top; Phase 2 should not be built speculatively.

**4. Split the check grid out of the lede** - Medium

- New `HeroBenefitChecks` holding `CHECK_ITEMS` and the `CheckMark` svg. `IngredientBenefitLede` keeps only the description.
- `ProductHeroMobileV3` renders `HeroBenefitChecks` between the gallery and `ProductBuyPanel`.
- Desktop (`ProductHeroV3`) keeps its current position until Phase 3.
- Roughly 90px added above the buy panel at 390px. Measure before and after.
- Files: `app/components/product/IngredientBenefitLede.tsx`, new `app/components/product/HeroBenefitChecks.tsx`, `app/components/product/ProductHeroMobileV3.tsx`

## Phase 3: Desktop convergence and narrative entry (Future)

- Reconcile `ProductHeroV3` with whatever mobile settles on, rather than letting the two drift.
- `PAGE_NARRATIVES.md` has no entry for the PDPs at all, so there is no health rating or section arc for the pages carrying most paid traffic. Add one.

## As built (Phase 1, 2026-09-10)

Commit `ba299874` on `feature/pdp-add-to-cart-tweaks`, SCRUM-1334.

Built as planned, with two things the plan did not anticipate.

**AC 8 is not verified.** The criterion asked that the plan selector sit no lower at 390px than it does on main. That needs eyes on a rendered page and was not measured. Static reckoning of the mobile identity block says it grows by roughly 40px: the spec pill (about 36px) comes out, the strapline goes in at two lines (about 50px on Flow and Clear, whose straplines are the long ones), plus the gift line (about 20px) and one extra 8px flex gap. So the selector probably sits about 40px lower rather than level. That is the deliberate cost of putting the benefit and the offer above the gallery, but it is a real deviation from the criterion as written, and it is the first thing to check on the preview.

**Desktop now states the offer twice.** On `ProductHeroV3` the gift line sits immediately above `ProductBuyPanel`, which renders `GiftValueStack`. Within about 300px the same offer is made twice. On mobile the gallery and the panel separate them, which is the point; on desktop the buy panel was already above the fold, so the hero line may be redundant there. Left in rather than decided during the build. Making `HeroGiftValue` mobile-only is a one-line change if it reads badly.

**Unplanned edit outside the file list.** `ProductHeroV2.tsx` and `ProductHeroMobileV2.tsx` still imported `SpecBadge`. Nothing routes to either file, but `tsc` typechecks them, so deleting the badge broke the build until both lost the import and its one usage. The files are otherwise untouched, and their deletion is logged in `docs/TODO.md` under PDP Structure Rework Cleanup.

## Rabbit holes

- **Rewriting strapline copy per product.** Use what `seoHeading` and `LEDE_SUBLINE` already hold. A copy pass is separate work, and any new benefit claim would need an EFSA check.
- **Reworking `GiftValueStack`.** Only its total is extracted into a helper. Its layout, tiles and struck RRPs are untouched.
- **Reordering the whole mobile hero.** Phase 1 changes one row and adds one. Phase 2 moves one block. That is the whole surface area.

## No-gos

- **No wholesale hoist of the lede above the buy panel.** Re-breaks SCRUM-1260 and pushes price and CTA off the first screen.
- **No discount percentage or price above the gallery.** Decided 2026-09-10: gift-value framing only. Three price anchors on one screen (hero, buy panel, sticky footer) cannibalise each other, and the percentage changes per cadence while sitting above the selector that sets it.
- **No A/B infrastructure.** None exists. `ab-testing-mvp.md` is a settled plan, not a build, and it explicitly rules out reusing `conka_uid` for bucketing. Ship to 100% and read add-to-cart rate against the existing `pdp:section_viewed` instrumentation from PDP rework Phase 1.
- **No new analytics events.** Add-to-cart rate is already measurable on these pages.

## Risks

- The gift line disappearing on a switch to one-time is a layout shift above the gallery. Reserve its height or accept the shift; decide during build with the real measurement.
- Deleting the `h2` removes the only `h2` in the mobile hero. The strapline must not become an `h2` in its place: it sits under the `h1` as a descriptor. Keep the heading structure defensible for SEO.
- Long straplines on Flow and Clear could cost more vertical space than the pill they replace. Check all three at 390px before merging.
- The gift figure now appears twice on one page (hero and `GiftValueStack`). The shared helper is what stops them drifting; do not let either recompute independently.

## References

- `docs/development/featurePlans/pdp-structure-rework.md` - the prior structural push. Phase 1 (SCRUM-1260) is the decision this plan works around; Phases 4 to 6 remain open and are unrelated to this work.
- `docs/development/featurePlans/ab-testing-mvp.md` - why there is no split test here.
- `docs/branding/DESIGN_SYSTEM.md` section 8.5 - Simple DTC spec and per-surface authority table.
- `docs/development/CART_PRICING_SOURCE_OF_TRUTH.md` - pre-add display prices from `offerData.ts`, cart prices from Shopify.
- `docs/branding/MOBILE_OPTIMIZATION.md` - 390px mobile-first mandate.
- Reference sites: Magic Mind PDP (benefit block above the picker, price below the fold), Graymatter Starter Kit PDP (benefit sub-headline on line 2 of the H1, discount pill above the gallery).

## Jira tickets

| Ticket | Description | Phase | Status |
|--------|-------------|-------|--------|
| SCRUM-1334 | [Website & CRO] PDP above-fold Phase 1: benefit strapline replaces the spec pill, gift-value line in the hero | 1 | To Do |

Phase 2 is deliberately unticketed until Phase 1 has a week of add-to-cart data behind it.
