# Listicle First-Half Upgrade

> **Status:** Phases 1 to 3 active, Phase 4 deferred.
> **Branch:** `feature/listicle-preframe-upgrade`
> **Scope owner:** Rudh. Origin: agency feedback (Ash), Sept 2026, with an annotated ARMRA comparison.
> **Applies to:** the three `im8` listicles at `/go/adhd-listicle`, `/go/productivity-listicle`, `/go/brain-ageing-listicle`.
>
> Read alongside `docs/features/LISTICLE_SYSTEM.md` (the format contract) and
> `docs/analytics/LISTICLE_PERFORMANCE.md` (the data this plan argues from).

## Phase status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Hero preframe rebuild | Not Started (SCRUM-1320) |
| 2 | Proof wall raised + reasons section header | Not Started (SCRUM-1321) |
| 3 | Sticky bar rework with price anchoring | Not Started (SCRUM-1322) |
| 4 | Reasons consolidation, 7 to 5, cross-page dedup | Future |

## Problem

Between 56% and 67% of paid visitors never reach reason 1 (first-section
retention: ADHD 44%, Productivity 39%, Brain-ageing 33%). Hero plus sticky close
93% of attributed orders: of all 69 tagged orders, 35 closed on the sticky bar,
29 on the hero, 5 on the bridge and **0** on the end-of-page product block.

The first half is effectively the whole page, and it currently opens badly:

- A hard list headline ("7 Reasons an ADHD Brain Runs Better on CONKA") as the H1,
  which asks a cold visitor to commit to an article before it has connected with them.
- Two stacked offer surfaces: a green `OfferPill` ("+1 week of free brain
  supplements on your first order") immediately above a navy CTA ("Try it risk
  free, now 46% off"). Both say "offer", neither says "outcome".
- The rating strip sits *above* both, so the proof is spent before the ask.
- No social proof wall until after every reason. `ListicleLogoBand` renders in
  Zone 3a, above the buy box.
- No price anchoring anywhere in the first half, and none at all in the sticky
  bar, which is the single highest-closing surface on the page.
- The ADHD subcopy is stale: it still sells two shots (Flow and Clear) on a page
  whose buy box is Flow-primary since 31 Jul.

## Who it serves

Cold Meta traffic on a phone. 74% of traffic is mobile, no brand awareness,
arriving from founder-led and outcome-led creative.

## Business impact

Lifts first-fold retention and hero CTA rate on the two zones that already do
all the closing, and puts per-serving price anchoring into the sticky bar.

**Scoreboard caveat, recorded so a flat CPA is not misread as failure.** ADHD's
marginal CPA moved from £73 to £169 because click price rose 91% at 2.9
frequency while CVR fell only 18%. That is an auction and creative-fatigue
problem, and no hero rewrite fixes it. Productivity is the page with a genuine
conversion problem (click price +9%, CVR **-27%**, worst CPA at £150), so it is
where this rework should show up most clearly. Brain-ageing is healthy on both
axes (£90 CPA, CVR rising).

## Approach

Turn the hero into a soft educational preframe, raise the proof wall, and demote
the list headline to a section header above the reasons block.

| Zone | Today | After |
|------|-------|-------|
| Hero H1 | "7 Reasons an ADHD Brain Runs Better on CONKA" | Soft outcome headline, e.g. "Discover the natural way to finally calm racing thoughts" |
| Hero subcopy | Product summary, stale two-shot pitch | Educational contrast: what other approaches do vs what CONKA does |
| Hero offer | Green offer pill **and** navy CTA | One outcome-led offer CTA, e.g. "Save 46% on a calmer mind" |
| Rating | Above the pill and CTA | Directly beneath the CTA |
| Hero asset | `/lifestyle/BlurGrab.jpg`, a hand, no face | A person with the product, large |
| Mobile order | Asset above copy | Copy above asset |
| Logo band | After all reasons, above the buy box | Directly below the hero |
| Reasons block | Starts cold at reason 1 | Opens on an eyebrow plus the demoted "N Reasons..." headline |
| Sticky bar | Label plus sub, CTA pill, mint free-shots chip | Price anchor plus rating, CTA pill, mint free-shots chip |

## Design language

**Simple DTC** (`DESIGN_SYSTEM.md` §8.5). The `im8` renderer was converted under
SCRUM-1189, so this is an extension of the existing grammar, not a conversion.

- Hero H1 uses the **DTC display-heading tier**: `clamp(2.5rem, 8vw, 3.5rem)`,
  `leading-none`, inline `letterSpacing: "-0.02em"`, solid `text-black`. The
  standard `brand-h1` floor of `2.25rem` is too small at 390px for a headline
  that now carries the whole hierarchy.
- Rounded-full CTA pill, `rounded-md` containers, hairlines at `border-black/8`
  to `/15`.
- Savings green `#1a7f4f` is retained **only** for the sticky bar free-shots
  chip. The hero green offer pill is deleted.
- One deliberate `im8` exception continues to hold: numbered reason titles stay
  navy (`--brand-navy`), not black.

## Key technical decision: the analytics baseline survives

Listicle `section` ids are `${kind}_${index}` over `config.body`, so inserting or
reordering a body block rebases every id below it and silently voids the
scroll-funnel trend.

**Therefore: every new element in this plan is a fixed renderer zone, not a
`body` entry, and `config.body` is not touched in Phases 1 to 3.** Existing ids
(`reason_2`, `statsBand_1`, `reviewStrip_6`, and so on) keep their meaning, and
the funnel stays readable straight across the change. Two new fixed zone ids are
added alongside `hero` / `bridge` / `sticky` / `product`: **`proofWall`** and
**`reasonsHeader`**.

The `IntersectionObserver` options (`threshold: 0`,
`rootMargin: "0px 0px -15% 0px"`, once-per-section unobserve) must not change,
per `LISTICLE_SYSTEM.md`, or every historical `section_viewed` count is rebased.

This constraint is also the reason Phase 4 is a separate phase: cutting 7 reasons
to 5 *does* touch `config.body` and *does* rebase the ids, so it must ship on its
own and be annotated on the timeline.

## Decisions taken

| Decision | Call | Rationale |
|----------|------|-----------|
| New slugs or edit in place | **Edit in place** | No A/B infra, and last week's traffic was ~2,000 visitors across all three, too thin for a slug split. The pages have run long enough to simply be upgraded. Recorded as a timeline event instead. |
| "+1 week free" hero pill | **Dropped from the hero, kept in the sticky bar** | It is the noise the feedback flags. `offerBadge.sticky` ("+8 free shots") stays, so the free-shots cue survives on the highest-closing surface. |
| Reasons cut 7 to 5 | **Deferred to Phase 4** | Body blocks have closed 5 of 69 orders all trial. Shipping it alongside the hero would confound attribution on both, and it is the change that rebases the analytics ids. |
| Hero assets | ADHD `/lifestyle/GirlsLaughing.jpg` (1500x1500, `aspect: "1/1"`), Productivity `/lifestyle/flow/FlowDrink.jpg` (1500x1000, `aspect: "1500/1000"`), Brain-ageing keeps `/lifestyle/ageing/WorkingWoman.jpg` (900x675, `aspect: "900/675"`) | Stand-ins. A proper "person drinking the shot" shoot is coming; swapping is a one-line config change per page. |
| Rating figure | **Keep what we have: "Excellent 4.7", "622+ reviews · 5,000+ daily users"** | The 4.9/5 placeholder in the landing-conversion decision log stays unresolved and unused. |
| Price anchor source | `PRICE_PER_SHOT_FLOW` ("2.00") from `app/lib/landingPricing.ts` | All three pages are Flow-primary since 31 Jul, so the Both price ("1.87") used elsewhere would be wrong here. Never hardcode the price in a config. |
| Mobile stacking | **Copy above asset**, reversing SCRUM-1166 | The soft educational headline has to be the first thing read for the preframe to work, and it matches the reference. Flagged as the change most likely to need a second look at 390px. |
| Logo band position | **Moved, not duplicated** | Two partner bands on one page reads as filler. The buy box is `ProductHeroV3` since 20 Aug and carries its own badges. |

## Active phase task breakdown

### Phase 1: Hero preframe rebuild

1. **[Types] Hero config changes**
   - What: make `hero.offerBadge.hero` optional and remove it from all three configs, keeping `offerBadge.sticky`. Add an optional `hero.priceAnchor` string for Phase 3.
   - Dependencies: none
   - Complexity: Small
   - Files: `app/lib/landings/listicle-types.ts`

2. **[Renderer] Reorder and restyle the hero copy column**
   - What: new order is headline, subcopy, CTA, `TrustMicroRow`, `trustPills`. Delete the `OfferPill` render path. Copy column moves above the asset on mobile. H1 goes to the DTC display tier.
   - Dependencies: task 1
   - Complexity: Medium
   - Files: `app/components/go/listicle/ListicleRenderer.tsx`

3. **[Content] Per-page hero copy and assets**
   - What: outcome headline, contrast subcopy and a single outcome-led offer CTA per persona; new `asset.src` and `aspect` per the decisions table. Fixes the stale ADHD two-shot subcopy.
   - Dependencies: task 2
   - Complexity: Medium
   - Files: `app/lib/landings/adhd-listicle.ts`, `productivity-listicle.ts`, `brain-ageing-listicle.ts`

### Phase 2: Proof wall raised + reasons section header

4. **[Renderer] Move `ListicleLogoBand` to directly below the hero**
   - What: relocate the Zone 3a render to sit between the ticker and the body loop. One band per page.
   - Dependencies: Phase 1
   - Complexity: Small
   - Files: `ListicleRenderer.tsx`, `app/components/go/listicle/ListicleProofTier.tsx`

5. **[Types + Renderer] `reasonsHeader` zone**
   - What: new optional top-level `reasonsHeader: { eyebrow, headline }`, rendered as a fixed zone above the first body block, carrying the demoted "N Reasons..." headline under an eyebrow such as "Brain health at the cellular level".
   - Dependencies: task 4
   - Complexity: Small
   - Files: `listicle-types.ts`, `ListicleRenderer.tsx`, the three configs

6. **[Analytics] Track the two new zones**
   - What: add `proofWall` and `reasonsHeader` to the fixed-zone id set. No event-shape change, no observer-option change, no new event names.
   - Dependencies: tasks 4 and 5
   - Complexity: Small
   - Files: `app/components/go/listicle/listicleAnalytics.tsx`, `ListicleRenderer.tsx`

### Phase 3: Sticky bar rework with price anchoring

7. **[Renderer] Rebuild the sticky bar**
   - What: left column becomes price anchor plus rating in place of `stickyBar.label` and `.sub`; right keeps the navy CTA pill with the mint "+8 free shots" chip. Single row at 390px, 44px minimum tap target.
   - Dependencies: Phase 1
   - Complexity: Medium
   - Files: `ListicleRenderer.tsx`, `listicle-types.ts`

8. **[Data] Source the price from constants**
   - What: read `PRICE_PER_SHOT_FLOW` from `app/lib/landingPricing.ts`. No hardcoded price string in a listicle config.
   - Dependencies: task 7
   - Complexity: Small
   - Files: `ListicleRenderer.tsx`, `app/lib/landingPricing.ts`

### Docs and flags (ship with the last active phase)

9. Update `docs/features/LISTICLE_SYSTEM.md` with the new zones and the changed
   hero fields; append a timeline entry to `docs/analytics/LISTICLE_PERFORMANCE.md`;
   add a `docs/CHANGELOG.md` entry; plant a `/notion-flag` on the ship date so the
   CPA trend carries a marker.

## Phase 4 (Future): reasons consolidation

Deferred deliberately. The duplication is real and documented here so it is not
re-researched later:

- **"100 Days to Feel It, or Your Money Back"** is reason 7 on **all three**
  pages, and duplicates both the `guarantee` trustPill and `stickyBar.sub`.
- **"Backed by Trials, Not Testimonials"** appears verbatim on ADHD reason 6 and
  Brain-ageing reason 6.
- **The measure-it-in-the-app reason** appears three times in near-identical
  wording: ADHD 4, Productivity 6, Brain-ageing 4.
- **The caffeine / afternoon-slump reason** appears on ADHD 3 and Brain-ageing 5,
  and is already covered by the `no-caffeine` trustPill and the ticker.

That is 4 of 7 reasons duplicated across pages. Cutting to 5 also means retitling
all three pages, since `title` and the Meta `content_name` both carry the number.
This phase **will** rebase the `section_viewed` ids, so it ships alone and gets
its own timeline annotation.

## Rabbit holes

- **Rewriting reason copy while "in there".** Explicitly out of Phases 1 to 3.
- **Making the logo band position configurable.** One band, one position, moved. No new flag.
- **Chasing the ARMRA gradient background.** Their yellow-green wash is their brand. Take the structure and the hierarchy, not the palette.
- **Rebuilding the buy box.** It went to `ProductHeroV3` on 20 Aug and is not in scope.
- **Turning the preframe into a new body block kind.** It is a fixed zone precisely so the analytics ids hold.

## No-gos

- No A/B, no new slugs. Editing in place, recorded as a timeline event.
- Not touching `config.body` in Phases 1 to 3.
- Not adding a `pressBand`. The press marquee stays on reason 4.
- No substitution or medication-alternative language in the copy. Keep it on the
  outcome. This is a Meta ad-delivery risk, not only a claims one.
- No change to the `IntersectionObserver` options.

## Risks

- **Copy-first on mobile reverses SCRUM-1166**, which deliberately put the asset
  above the copy. Right call for a soft headline, but the change most likely to
  need a second look at 390px.
- **The hero photos are stand-ins.** All three read as brand lifestyle, not the
  "person drinking" shot the feedback asks for.
- **`GirlsLaughing.jpg` is square**, so it takes more vertical space above the
  fold on mobile than the current 3:2. May need an `objectPosition` crop.
- **Dropping the "+1 week free" hero pill removes the message-match** for any live
  creative still running the free-week angle. Check the active ad set before
  Phase 1 ships.
- **`hero.laurel` is not rendered in the hero.** It is injected into the first
  body block via `LaurelBadge`. Do not assume it moves with the hero rework.
- **SCRUM-1176 (listicle post-reasons upgrade, proof tier rebuild) is open** and
  overlaps the logo-band move. Reconcile before starting Phase 2.

## References

- `docs/features/LISTICLE_SYSTEM.md` - format contract, zone anatomy, copy standard, analytics ids
- `docs/features/GO_LANDING_PAGES.md` - shared `/go` rules
- `docs/analytics/LISTICLE_PERFORMANCE.md` - the retention, CTA-zone and CPA data quoted above
- `docs/branding/DESIGN_SYSTEM.md` §8.5 - Simple DTC grammar and the display-heading tier
- `docs/development/featurePlans/landing-conversion/README.md` - programme status and decision log
- `app/components/go/listicle/ListicleRenderer.tsx` - the zones being changed
- `app/lib/landingPricing.ts` - `PRICE_PER_SHOT_FLOW`
- Prior art: SCRUM-1189 (im8 to Simple DTC), SCRUM-1187 (Productivity founder reposition), SCRUM-1166 (asset above copy on mobile, reversed here)

## Jira tickets

Sprint 31, epic SCRUM-763 (Website & CRO). All three linked "Relates to" each
other; SCRUM-1321 is also linked to SCRUM-1176.

| Ticket | Title | Phase | Status |
|--------|-------|-------|--------|
| [SCRUM-1320](https://conka-team-jr1mzvwm.atlassian.net/browse/SCRUM-1320) | Listicle hero: rebuild as a soft educational preframe | 1 | To Do |
| [SCRUM-1321](https://conka-team-jr1mzvwm.atlassian.net/browse/SCRUM-1321) | Listicle: raise the proof wall and add a reasons section header | 2 | To Do |
| [SCRUM-1322](https://conka-team-jr1mzvwm.atlassian.net/browse/SCRUM-1322) | Listicle sticky bar: rework layout and add per-serving price anchoring | 3 | To Do |

Phase 4 is deliberately unticketed. It is re-scoped when the first three have
shipped and been read.
