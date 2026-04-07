# Landing Benefits Redesign: Ingredient-Forward Cards

> **Status:** Phase 0 (performance) scoped, ready for implementation
> **Created:** 2026-04-02
> **Updated:** 2026-04-07
> **Appetite:** Half day (~4 hours) per phase
> **Priority:** Acquisition/CRO -- section 2 of `/start`, first content after hero for cold paid traffic

---

## Problem

The LandingBenefits section on `/start` has two issues:

1. **Compliance risk (AMBER).** The benefit card titles ("Sharper Focus", "Sleep Quality", "Stress Resilience", "Clearer Thinking") are implied health claims. Lemon Balm and Ashwagandha have no EFSA-authorised health claims, so attributing outcomes to them is risky under EFSA 1924/2006. Flagged as AMBER items #6 and #7 in `docs/development/LANDING_PAGE_CLAIMS_LOG.md`.

2. **Visually weak.** Flat white cards with generic SVG stroke icons, minimal depth/layering, template-y feel. Fails the quality bar test ("does it feel layered and dimensional?"). The tap-to-expand interaction has poor affordance (tiny "Tap a benefit" text, says "tap" on desktop). Trust badges feel detached and low-weight.

## Who It Serves

Cold paid traffic arriving from Meta ads on mobile (74% of traffic). This is section 2 — the first credibility/value content they see after the hero. It needs to build trust and communicate "this is science-backed" fast.

## Business Impact

- Resolves remaining AMBER compliance items on the primary paid traffic page
- Upgrades the weakest visual section on the page (between the strong hero and product split)
- Plays to CONKA's differentiator: transparent dosing, real ingredients, clinical backing

---

## Approach: Ingredient-Forward Cards (Option B)

Replace benefit-claim titles with **ingredient names + dosages** as the primary card content. The card communicates "what's in it" rather than "what it does for you" — sidestepping health claims entirely.

**Card structure:**
- **Title:** Ingredient name + dosage (e.g. "KSM-66 Ashwagandha · 600mg")
- **Subtitle:** Compliant descriptor (e.g. "Clinically studied adaptogen" or EFSA-authorised claim with ††)
- **Expand/collapse:** Observational study detail with PMID (existing content, better affordance)

**Design system:** `brand-base.css` (new system) — absorbs the token migration for this component.

---

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | /start performance optimization -- LCP fix, image compression, font trimming, script deferral | Not Started |
| 1 | Ingredient-forward card redesign + compliance fix + visual upgrade | Not Started (blocked by Phase 0) |

---

## Phase 0: /start Performance Optimization

**Problem:** Mobile Lighthouse score is 63/100 with LCP of 9.2s (target <2.5s). This is the primary paid traffic landing page -- performance is the highest-leverage CRO fix available. Must be resolved before the visual redesign in Phase 1, otherwise new assets compound the problem.

**Lighthouse baseline (2026-04-07, mobile, Slow 4G):**
- Performance: 63/100
- FCP: 3.2s | LCP: 9.2s | SI: 6.7s | TBT: 50ms | CLS: 0

**Root causes identified:**

| Issue | Severity | Detail |
|-------|----------|--------|
| `FlowHold.jpg` 658KB | Critical | Lifestyle image in LandingWhatsInside, no lazy loading |
| Hero image 123KB unoptimized JPG | Critical | LCP candidate, no WebP/AVIF, `scale-[1.15]` on mobile |
| 7 fonts loaded (4 legacy Google Fonts) | High | Poppins, Caveat, IBM Plex Mono, Syne, DM Sans all load globally |
| Triple Pixel sync XHR on load | High | Makes blocking network calls to external domains during render |
| No preconnect for analytics domains | Medium | GA, Meta, Triple Whale domains need DNS prefetch |
| Missing image optimization config | Medium | No WebP/AVIF format, no cache TTL, no explicit device sizes |
| 7 non-composited animations | Low | Inline transitionDuration styles on hero elements |

### Phase 0: Task Breakdown

### 0.1 [Config] Next.js image optimization
- **What:** Add `formats: ['image/avif', 'image/webp']`, explicit `deviceSizes: [390, 640, 1024, 1280]`, and `minimumCacheTTL: 31536000` (1 year) to `next.config.ts` images config.
- **Dependencies:** None
- **Complexity:** Small
- **Files:** `next.config.ts`

### 0.2 [Images] Optimize and lazy-load images
- **What:** Compress `FlowHold.jpg` (658KB target ~200KB) and `ClearDrink.jpg`. Add explicit `width`/`height` to images missing them. Add `loading="lazy"` to all below-fold images. Remove hero `scale-[1.15]` on mobile (use proper sizing instead).
- **Dependencies:** Task 0.1 (formats config)
- **Complexity:** Medium
- **Files:** `app/components/landing/LandingHero.tsx`, `app/components/landing/LandingWhatsInside.tsx`, `app/components/landing/LandingFAQ.tsx`, `app/components/landing/LandingGuarantee.tsx`

### 0.3 [Fonts] Trim legacy font weight subsets
- **What:** Reduce Google Font imports to only the weights actually used: Syne 700 only, DM Sans 400 only, Caveat 400 only, IBM Plex Mono 400 only. Cuts ~60-70% of Google Font download weight without breaking any pages. Full font removal is a separate migration task as pages move to brand-base.
- **Dependencies:** None
- **Complexity:** Small
- **Files:** `app/layout.tsx`

### 0.4 [Scripts] Defer third-party analytics
- **What:** Move Triple Pixel from `afterInteractive` to `lazyOnload` strategy (only custom event is AddToCart on user click, so no attribution risk). Add preconnect hints for `googletagmanager.com`, `connect.facebook.net`, `api.config-security.com`.
- **Dependencies:** None
- **Complexity:** Small
- **Files:** `app/layout.tsx`

### 0.5 [Animations] Fix non-composited animations
- **What:** Replace inline `transitionDuration`/`transitionDelay` styles in LandingHero with CSS classes. Ensure all animations use only `transform` + `opacity` (compositor-friendly properties).
- **Dependencies:** None
- **Complexity:** Small
- **Files:** `app/components/landing/LandingHero.tsx`, `app/globals.css`

### Phase 0: Rabbit Holes
- Don't convert `/start` to RSC (too large, separate task)
- Don't remove legacy fonts entirely (breaks home, PDPs, /our-story, charts)
- Don't redesign anything visually

### Phase 0: Risks
- **Image compression quality.** Product shots must still look premium after compression. Eyeball results before committing.
- **Font weight trimming.** Verify the exact weights used on PDP pages before cutting. If a bold weight is used somewhere unexpected, it falls back to browser synthesis.

---

## Phase 1: Task Breakdown

### 1. [Content] Rewrite benefit card data array
- **What:** Replace the `BENEFITS` array in `LandingBenefits.tsx`. Titles become ingredient names + dosages. Subtitles become compliant descriptors. Keep existing study observations and PMIDs. Ensure only Vitamin C/B12 claims use †† anchor; all others use observational ¶ framing.
- **Dependencies:** None
- **Complexity:** Small
- **Files:** `app/components/landing/LandingBenefits.tsx`

**Proposed card content:**

| Current Title | New Title | New Subtitle | Compliance |
|--------------|-----------|--------------|------------|
| Sharper Focus | Lemon Balm Extract · 300mg | Traditional botanical for calm alertness | Observational ¶ — no EFSA claim |
| Sleep Quality | KSM-66 Ashwagandha · 600mg | Clinically studied adaptogen | Observational ¶ — no EFSA claim |
| Stress Resilience | Reduced Glutathione · 250mg | Cellular antioxidant | Observational ¶ — no EFSA claim |
| Clearer Thinking | Vitamin C + B Vitamins | Contributes to normal psychological function†† | EFSA authorised †† |

> **Note:** The 4th card shifts from Glutathione-led to Vitamin C-led, since Vitamin C is the only ingredient with an EFSA-authorised cognitive claim. Glutathione moves to the 3rd card. This reordering avoids having 2 Ashwagandha cards adjacent.

### 2. [Frontend] Upgrade card visual treatment
- **What:** Redesign cards using `brand-base.css` tokens. Add visual depth (subtle shadow or border treatment), proper `--brand-radius-card` (32px), left-aligned text (per brand guidelines), and better expand/collapse affordance (chevron icon + "See the research" text link instead of relying on the whole card tap).
- **Dependencies:** Task 1 (content)
- **Complexity:** Medium
- **Files:** `app/components/landing/LandingBenefits.tsx`

**Visual changes:**
- Card radius: `var(--brand-radius-card)` (32px)
- Card bg: `var(--brand-white)` with subtle `shadow-sm` or `border border-black/6`
- Text alignment: left-aligned (not centred)
- Icon: keep accent-coloured circle, but consider a more distinctive icon per ingredient
- Expand affordance: chevron that rotates on open + "See the research" micro-link
- Expanded state: accent left-border strip instead of full border highlight
- Dosage shown in `font-brand-data` (JetBrains Mono) for the clinical feel
- All hardcoded colours replaced with design tokens (black/80, black/60, etc.)

### 3. [Frontend] Upgrade trust badges
- **What:** Give trust badges more visual weight. Promote from tiny inline text to proper badge treatment — slightly larger, with card-like containers or pill backgrounds. Keep the 2-col mobile / 4-col desktop grid.
- **Dependencies:** None (can be done in parallel with tasks 1-2)
- **Complexity:** Small
- **Files:** `app/components/landing/LandingBenefits.tsx`

### 4. [Frontend] Extract inline SVGs
- **What:** Move the 4 benefit icons and 4 trust badge icons out of the component into a shared icons file or inline constants file. This was flagged in the landing page review (finding #88).
- **Dependencies:** None
- **Complexity:** Small
- **Files:** `app/components/landing/LandingBenefits.tsx`, new file for icons (e.g. `app/components/landing/icons.tsx`)

### 5. [Compliance] Update claims log
- **What:** Update `docs/development/LANDING_PAGE_CLAIMS_LOG.md` to mark AMBER items #6 and #7 as resolved. Document the new card titles and their compliance status.
- **Dependencies:** Task 1
- **Complexity:** Small
- **Files:** `docs/development/LANDING_PAGE_CLAIMS_LOG.md`

---

## Rabbit Holes

- **Don't redesign the whole section layout.** The 2x2 grid works. The temptation will be to switch to a 1-col stack or accordion — resist. The grid is scannable and compact on mobile.
- **Don't source new icons/illustrations.** Use the existing SVG icon style, just make them slightly more distinctive per ingredient if easy. If it takes more than 15 minutes, keep current icons.
- **Don't touch the section wrapper or page layout.** This is a component-level change only.

## No-Gos

- No new photography or custom illustrations
- No changes to the section background or page-level layout
- No changes to other landing page sections
- No new animations beyond the expand/collapse transition
- No ingredient data fetching — keep it hardcoded in the component

## Risks

- **Copy tone shift.** Ingredient names are more clinical than benefit titles. The section could feel like a supplement label rather than a conversion section. Mitigate by keeping subtitles warm/accessible and ensuring the section heading still leads with a benefit-adjacent hook (e.g. "What's working inside every shot" rather than "Ingredients").
- **Card height variation on expand.** Different study text lengths could cause grid layout shifts. Use `min-h` or ensure both columns expand equally.

## Open Questions

- Should the section heading change? Current: "Why 150,000+ bottles and counting." This still works — it's a proof point, not a health claim. But "What's working inside every shot" might better frame ingredient cards. **Decision needed from user.**

---

## Related Tickets

- **SCRUM-821** (Done) -- Original claims compliance audit
- **SCRUM-839** (In Progress) -- CRO copy hardening (this work absorbs the LandingBenefits portion)
- **SCRUM-840** (In Progress) -- Design system migration (this work absorbs the LandingBenefits portion)
- **SCRUM-850** -- Phase 1: Landing Benefits redesign
- **SCRUM-852** -- Phase 0: /start performance optimization

## References

- Claims log: `docs/development/LANDING_PAGE_CLAIMS_LOG.md`
- Brand voice: `docs/branding/BRAND_VOICE.md`
- Quality standards: `docs/branding/QUALITY_STANDARDS.md`
- Design system: `docs/branding/DESIGN_SYSTEM.md`
- Component: `app/components/landing/LandingBenefits.tsx`
- Page: `app/start/StartPageClient.tsx` (section 2)
