# /our-story simplification (Figma V1)

**Status:** ARCHIVED - delivered 2026-09-09. Living truth now lives in `docs/PAGE_NARRATIVES.md` (the `/our-story` entry) and `docs/branding/DESIGN_SYSTEM.md` (§8 clinical list, §8.5 authority table). Kept for the rationale and the verbatim Figma copy.
**Branch:** `feature/our-story-simplification`
**Scale:** B (one day)
**Design source:** Figma `Our Story`, file key `kG2CX5AvjTgP3pAjZdedFs`, the **V1** column (frames at `x=0`). The V2 (Cadence) column at `x=4484` is out of scope.

---

## Problem

`/our-story` is the noisiest page on the site. It renders 9 sections, a fixed chapter rail, a dark scrubbed manifesto interstitial, and uses GSAP in all five of its components (847 lines of components plus 147 lines of data). The page reads as a showcase of scroll effects rather than a story.

Henry's V1 is a six-frame page: a split hero, four alternating image/copy chapters, and one CTA. No rail, no dark break, no motion implied. The register is Cadence (`usecadence.com/pages/our-story`) and Gray Matter (`trygraymatter.com/pages/about-us`): calm, editorial, near-zero chrome.

**Who it serves:** warm and mid-funnel visitors checking the brand is real before they buy. Not a paid-traffic entry point.

**Business impact:** brand trust and coherence, plus a genuine maintenance and performance win (roughly two thirds of the page's component code goes, along with all GSAP on the route). Not a direct conversion lever, which is why the appetite is capped at one day.

---

## Design language decision

**Simple DTC** (`DESIGN_SYSTEM.md` §8.5). The page drops `.brand-clinical` from its root.

| Property | Decision |
|---|---|
| Radius | Tailwind utilities. `rounded-md` on image containers, `rounded-full` on the CTA button. No `--brand-radius-*` tokens. |
| Eyebrows | None. No `// TOPIC-0X` eyebrows, no `.brand-mono-sub`. Lead with `brand-h2` plus `brand-body` in solid black. |
| Type | Sans throughout (`--font-brand-primary`). Solid `text-black` for headings, `text-black/80` for body. No mono anywhere on this page. |
| CTA | `ConkaCTAButton` with `meta={null}`. |
| Mobile hero padding | The `style={{ paddingTop: "5rem" }}` hack is removed with `.brand-clinical`. `brand-hero-first` behaves normally once the clinical scope is gone. |

`DESIGN_SYSTEM.md` §8 lists `/our-story` among the `.brand-clinical` pages and the §8.5 authority table does not cover it. Both need updating in Phase 3. This is a deliberate extension of the authority table, not an existing rule.

---

## Structure

The V1 column, frame by frame.

| # | Frame | Layout (desktop) | Heading |
|---|---|---|---|
| 1 | Hero (`1:3`) | Copy left / full-bleed photo right, 50/50 | Two athletes. One obsession. Zero shortcuts |
| 2 | Chapter 1 (`1:30`) | Image **left**, copy right | It started with one question |
| 3 | Chapter 2 (`1:35`) | Copy left, image **right** | Uncharted territory. Directed by the best. |
| 4 | Chapter 3 (`2:23`) | Image **left**, copy right | Tested where fakes wouldn't survive. |
| 5 | Chapter 4 (`2:31`) | Copy left, image **right** | A science-grade test. In your pocket. |
| 6 | CTA (`2:42`) | Centred | Everyone has a brain. |

**Mobile:** every frame stacks. Image first, copy second, in every chapter, regardless of the desktop side. The alternation is a desktop-only affordance. One `lg:grid-cols-2` with `lg:order-*` driven by an `imageSide` field handles both, so no Desktop/Mobile file split is needed (`MOBILE_OPTIMIZATION.md` splits are for genuinely divergent layouts).

**Backgrounds:** hero white, then chapters alternate tint/white, CTA tint. The Figma uses a single flat near-white throughout, but at 96% lightness the alternation is visually near-identical and keeps the colour-rhythm rule (`DESIGN_SYSTEM.md` §6: never two identical backgrounds adjacent).

**Motion:** one shared `revealUp` on section entry from `@/app/lib/motion`, `gsap.from()` only, SSR carrying the final state, reduced-motion respected (`MOTION_GUIDE.md`). Nothing else.

---

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Assets and data layer | Done (SCRUM-1325) |
| 2 | Components and page rebuild | Done (SCRUM-1326) |
| 3 | Deletion and docs | Done (SCRUM-1327) |

### What changed against the plan during the build

Three corrections worth recording, because the plan asserted otherwise:

1. **`StoryRail.tsx`, `StoryManifesto.tsx` and `storyMotion.ts` were deleted in the Phase 2 commit, not Phase 3.** `StoryRail` reads `chapter.label`, which the new chapter shape does not have, so the branch would not typecheck until it went.
2. **`public/TwoFounders.jpg` and `public/story/Screenshot_2025-11-10_171922.webp` were NOT deleted.** The plan listed both as deletion candidates and called the second one "already unused today". Both are live: `TwoFounders.jpg` is used by `app/components/appv2/AppV2Origin.tsx` and `app/lib/whyConkaData.ts`, and the screenshot by `whyConkaData.ts`. Only `GettyImages-1330621508.webp`, `Screenshot_2025-11-10_143714.webp` and `Conka_Images_2.webp` were orphaned.
3. **`app/components/landing/ExploreMoreRow.tsx` was deleted.** Not anticipated by the plan. `/our-story` was its only consumer, so removing the explore-links row from the CTA orphaned it.
4. **The layout was reworked into full-bleed split bands after visual comparison against the two reference sites.** The plan assumed the page would sit inside `.brand-section` + `.brand-track` throughout, with a "fixed aspect ratio on mobile" and "one tuned `object-position` on desktop". That is not how Cadence and Gray Matter read. The hero and all four chapters are now **full-bleed split bands**: the image owns half the viewport edge to edge and top to bottom, the copy owns the other half. Their sections carry only a background and an `aria-label`.

   This made the component own its own layout, so it is now the **documented §6 exception** written up in `DESIGN_SYSTEM.md` §8.5, together with a new Layer 1 token, **`--brand-track-inset`**, that lets the copy side keep its text aligned with tracked sections. `.claude/rules/components.md` carries the same carve-out.

   Getting there took two passes. The first tried to keep `.brand-section` and cancel its padding with negative margins (`-mt-20`, `-mt-4`, `-mx-5`); that worked but coupled the component to three spacing tokens. Dropping `.brand-section` from those sections removed all three couplings, which is why none survive in the shipped code. The `object-position` was dropped too: the hero frame is square on mobile and stretches on desktop, so a vertical percentage could never apply. The hero stat row is centred per column, because three uneven left-aligned blocks read as ragged at 390px where the labels wrap to different line counts.

### Gotcha found during review

`app/globals.css` imports `brand-base.css` after Tailwind and **unlayered**, so `.brand-body`'s own `max-width: 65ch` beats any Tailwind `max-w-*` utility placed on the same element. Constrain the width on a wrapper element instead. This is a general trap on this codebase, not specific to this page.

---

### Phase 1: Assets and data layer

**1. Export and optimise the six Figma images**

- **What:** pull the raw image fills from the V1 frames via the Figma MCP `download_assets`. Verified resolutions are 2000px+ on the ones sampled (hero 2196x1568, Durham 2172x1906), so no re-export from source is needed. Convert to webp, cap the max edge at ~1600px, land in `public/story/v1/`.
- **Assets:** hero (two founders in hi-vis, warehouse), founders portrait (Chapter 1), Durham scientist in a lab (Chapter 2), athlete taking a shot in a gym (Chapter 3), app screen (Chapter 4).
- **Note:** the hero stat strip in the Figma is a flattened screenshot (1588x236). Do not export it. It is rebuilt in HTML, see task 4.
- **Complexity:** Small
- **Files:** `public/story/v1/*.webp`

**2. Rewrite `storyData.ts` to the V1 shape**

- **What:** replace the current 6-chapter structure (`image`/`imageAlt`/`imagePosition`/`imageFit`/`quote`/`stat`/`teamMarquee`) with:
  - a `storyHero` block: `heading`, `body`, `stats: { value, label }[]`
  - a `storyChapters` array of 4: `id`, `heading`, `paragraphs: string[]`, `image`, `imageAlt`, `imageSide: "left" | "right"`
  - a `storyCta` block: `heading`, `body`, `ctaLabel`
- Copy is transcribed **verbatim** from the Figma, em dashes included. See the copy appendix below.
- **Dependencies:** task 1
- **Complexity:** Small
- **Files:** `app/lib/storyData.ts`

### Phase 2: Components and page rebuild

**3. `StorySection` becomes a plain alternating split**

- **What:** strip the clip-path wipe, the parallax, the CSS marquee, and the quote and stat slots. Reduce to a two-column `lg:grid-cols-2` with `lg:order-*` driven by `imageSide`, stacked image-then-copy on mobile. `next/image` in a `rounded-md` container with explicit `sizes`, lazy. One `revealUp` on entry.
- Component stays content-only: no `<section>`, no `max-w-*`, no `px-*` at root (`DESIGN_SYSTEM.md` §6).
- **Dependencies:** task 2
- **Complexity:** Medium
- **Files:** `app/components/our-story/StorySection.tsx`

**4. Simplify `OurStoryHero`**

- **What:** drop the masked-line H1 reveal, the image wipe, the count-ups and the hand-written figure plate caption. Copy left / full-bleed photo right at `lg`, stacked on mobile with the photo at a fixed aspect ratio. Hero image gets `priority`.
- Stat row rebuilt in HTML: three columns, hairline top border (`border-black/12`), value in solid black at `text-lg font-semibold`, label at `text-xs text-black/60`. Sans, no mono, no count-up, no `tabular-nums` styling flourish beyond what the numbers need.
- **Dependencies:** task 2
- **Complexity:** Medium
- **Files:** `app/components/our-story/OurStoryHero.tsx`

**5. Simplify `OurStoryCTA`**

- **What:** centred heading, body paragraph, `ConkaCTAButton meta={null}` pointing at `/build-your-order` with the label "Try CONKA". Drop the proof strip and the laurel badge. This is the one place on the page where centre alignment is correct, per the Figma.
- **Dependencies:** task 2
- **Complexity:** Small
- **Files:** `app/components/our-story/OurStoryCTA.tsx`

**6. Rebuild `page.tsx`**

- **What:** remove `.brand-clinical` and the `paddingTop: "5rem"` clinical workaround. Remove `StoryRail` and `StoryManifesto`. Flatten to hero, four chapters, CTA. Backgrounds alternate white/tint. Keep `ReviewedDate` under the CTA. Keep the existing `metadata` block (Durham and Cambridge both still appear in the new copy, so the description stays accurate).
- **Dependencies:** tasks 3, 4, 5
- **Complexity:** Small
- **Files:** `app/our-story/page.tsx`

### Phase 3: Deletion and docs

**7. Delete the dead code and assets**

- **What:** delete `StoryRail.tsx`, `StoryManifesto.tsx`, `storyMotion.ts`; prune `index.ts`. Grep to confirm nothing else imports them before deleting. Delete now-unreferenced files under `public/story/` (including `Screenshot_2025-11-10_171922.webp`, already unused today) and any of `/TwoFounders.jpg`, `/story/GettyImages-1330621508.webp`, `/story/Screenshot_2025-11-10_143714.webp`, `/story/Conka_Images_2.webp` that no other page references.
- **Dependencies:** task 6
- **Complexity:** Small

**8. Update the records**

- **What:**
  - `docs/PAGE_NARRATIVES.md` - rewrite the `/our-story` entry (currently rated all-OK with "weakest link: unproven, motion upgrade shipped June 2026").
  - `docs/branding/DESIGN_SYSTEM.md` - remove `/our-story` from the `.brand-clinical` page list in §8, add it to the §8.5 per-surface authority table under Simple DTC.
  - `docs/CHANGELOG.md` - entry.
- **Dependencies:** task 7
- **Complexity:** Small

---

## Rabbit holes

- **Hero crop.** The hero photo is a wide video still filling a full-height 50% column. Chasing a perfect crop across every breakpoint could eat the whole appetite. Mitigation: fixed aspect ratio on mobile, `object-cover` with one tuned `object-position` on desktop. No art direction, no second export, no `<picture>` sources.
- **Image weight.** Six new photographs on a page that previously carried fewer. Hard budget: every image webp, max edge ~1600px, `next/image` with explicit `sizes`, hero `priority`, the rest lazy. If total page weight rises versus today, resize rather than accept it (`PERFORMANCE_OPTIMISATION.md`).

## No-gos

- No chapter rail, no dark manifesto, no parallax, wipes, marquees, or count-ups.
- No mid-page CTA. The Figma has one conversion moment and that is the design.
- No work on the V2 (Cadence) column in the Figma file.
- No reconciling `/science` or PDP stat figures against the new copy in this piece of work.
- No new shared components. Everything stays under `app/components/our-story/`.

## Risks

- **Stat numbers diverge from other pages.** The Figma copy ships verbatim by decision, so "25+ trials with professional teams", "150,000+ shots taken to date", "4 clinical studies on one product" and "Over a million tests" will sit alongside whatever `/science` and the PDPs currently claim. **Accepted, known inconsistency.** Reconciling the site-wide proof figures against the `BRAND_VOICE.md` proof-assets table is separate work and is not blocked by this.
- **Content loss.** Chapters 5 and 6 (Beyond Sport) and the dark manifesto are deleted. They were the page's only explicit "this is not just for athletes" beat, which now rests entirely on the CTA copy ("Not athletes. Just people curious about what a clearer mind could do for them"). Deliberate.
- **SEO.** Page word count drops substantially. `/our-story` ranks on brand terms only, so the exposure is low, and the existing metadata description stays accurate under the new copy.

## Assumptions

- `ReviewedDate` stays under the CTA. It is an AEO trust signal and reads as quiet, not as noise.
- CTA target is `/build-your-order`, label "Try CONKA".
- Em dashes present in Henry's Figma copy are transcribed verbatim. The house no-em-dash rule applies to copy authored here, not to approved brand copy.

---

## Copy appendix (from Figma V1, verbatim)

Paragraph breaks below follow the rendered frames. Confirm each against its frame during implementation before committing the strings.

**Hero**

> Two athletes. One obsession. Zero shortcuts
>
> Harry and Humphrey didn't set out to build a supplement. They just couldn't accept that brain performance was left to chance. So they spent £500K and five years changing that.

Stats: `£500K+` / invested into brain research · `25+` / trials with professional teams · `150,000+` / shots taken to date

**Chapter 1 - It started with one question**

> Harry and Humphrey met as teammates. Both wired the same way: Improve, Improve, Improve.
>
> One question stuck with them: How can we improve our brain's performance?
>
> For Humphrey it got personal... a run of concussions had shown him just how much sharper a mind could be, and how much there was to gain.
>
> The more they looked, the more it added up. That edge everyone wants — a faster start, a clearer afternoon, a mind that keeps up — no one had built a real way to reach it.
>
> So they did.

**Chapter 2 - Uncharted territory. Directed by the best.**

> They took the question to neuroscientists at Durham University. Not for a quick answer. For a real one.
>
> The thing they found: the right natural ingredients work far better together than any one does alone. Take one out and the whole effect drops. The combination is the point.
>
> Getting there took £500K of their own money and years of testing. No shortcuts. That was always the deal.
>
> £500K+ of their own money, invested in the research

**Chapter 3 - Tested where fakes wouldn't survive.**

> To know it actually worked, they needed to test CONKA rigorously. So they took it to where the stakes are highest, where a fraction of a percent is the difference between winning and losing, and no one has patience for something that doesn't.
>
> If it worked there, it worked.
>
> 4 clinical studies on one product.

**Chapter 4 - A science-grade test. In your pocket.**

> The tools that measure the brain properly used to live in university labs. CONKA put one in an app.
>
> Developed with neuroscientists at Cambridge University, it reads your focus, memory and reaction speed and turns them into a single score. The same kind of test used in the trials. Now yours, every morning.
>
> Every score feeds one of the largest brain datasets ever built outside a research institution. Over a million tests, and counting.

**CTA - Everyone has a brain.**

> What started with two people is now a daily habit for thousands. Not athletes. Just people curious about what a clearer mind could do for them. Yours is the next one worth measuring.

Button: `Try CONKA`

> The trailing lines in Chapters 2, 3 and 4 ("£500K+ of their own money...", "4 clinical studies on one product.", "Over a million tests, and counting.") read as pull-out proof lines in the Figma. Check each frame at build time to decide whether they render as an emphasised final line or as ordinary body copy.

---

## References

| Doc / file | Why |
|---|---|
| Figma `kG2CX5AvjTgP3pAjZdedFs`, V1 column | The design source |
| `trygraymatter.com/pages/about-us`, `usecadence.com/pages/our-story` | Register references |
| `docs/branding/DESIGN_SYSTEM.md` §8.5 | Simple DTC grammar and the clinical-to-DTC mechanical map |
| `docs/branding/MOBILE_OPTIMIZATION.md` | Why no Desktop/Mobile file split is needed here |
| `docs/development/MOTION_GUIDE.md` | `revealUp`, SSR final state, reduced motion |
| `docs/development/PERFORMANCE_OPTIMISATION.md` | Image budget |
| `docs/development/featurePlans/archive/home-page-round-2.md` | Precedent: home was benchmarked against Gray Matter and cut from 14 sections to 11 |
| `docs/development/featurePlans/archive/account-portal-simple-dtc.md` | Precedent: a clinical to Simple DTC conversion |

## Jira tickets

Sprint 31. Epic: SCRUM-763 (Website & CRO). Linked as a blocking chain 1325 blocks 1326 blocks 1327.

| Ticket | Title | Phase | Status |
|---|---|---|---|
| SCRUM-1325 | Our Story Phase 1: export the Figma V1 assets and rewrite storyData | 1 | To Do |
| SCRUM-1326 | Our Story Phase 2: rebuild the page as the Figma V1 alternating split in Simple DTC | 2 | To Do |
| SCRUM-1327 | Our Story Phase 3: delete the dead story components and assets, update the docs | 3 | To Do |
