# Development Changelog

## December 9, 2025

### 16:00 - Formula 02 Theme Update: Dark to Light Mode
Converted Formula 02 page from dark mode to light mode to maintain consistent white background across the entire site.

#### Changes Made:
- Updated CSS theme: `.theme-formula-02` now uses white background and black foreground (matching Formula 01)
- Updated all product components to use light mode styling:
  - `SolutionSlide.tsx` - Removed dark background, now uses light gray background
  - `StruggleSelector.tsx` - Updated button styles for light mode
  - `FormulaBenefits.tsx` - Updated all background colors and borders for light mode
  - `ClinicalStudyCard.tsx` - Updated card backgrounds and text colors for light mode
- Updated `ProductHero.tsx` to use amber/orange accent color instead of teal for Formula 02
- Fixed cart drawer overlay and button styles in `formula-02/page.tsx` to match light mode
- Updated `productData.ts` to reflect theme change from "dark" to "light"

#### Design Consistency:
- Formula 02 now maintains orange/amber accent color (`#f59e0b`) for differentiation from Formula 01's blue
- Both formulas now share consistent light mode base (white background, black text)
- All interactive elements updated to work properly in light mode

---

## December 9, 2025

### 15:30 - Formula Benefits Section Rework
Major redesign of the FormulaBenefits section on product pages to be more interactive and research-focused.

#### New "What do you struggle with?" Interactive Section:
- Replaced static "Proven Benefits" grid with interactive struggle selector
- Six struggle categories: Sleep, Energy, Crashing Mid-Day, Stress, Anxiety, Focus
- Each formula has unique solution content per struggle (Formula 01 adaptogen-focused, Formula 02 nootropic-focused)
- Clicking a struggle reveals a dedicated solution slide with:
  - Research explanation specific to that struggle
  - Key ingredients highlighted
  - Statistical improvement metrics

#### Triple Radar Charts Visualization:
- 3 radar charts side by side showing before/during/after treatment
- Visual progression from baseline through 2 weeks to 8 weeks
- Formula-specific accent colors (teal for 01, amber for 02)
- Six performance metrics per chart

#### Enhanced Clinical Study Card Component:
- Lab report style design replacing simple data grid
- Study metadata: Professor name, University, Year
- Participant demographics: Total count, Age range, Gender split, Selection criteria
- Abstract section with full study description
- Key results with visual indicators for statistical significance (P-values)
- Color-coded result cards with metric, value, and description
- Conclusion section highlighting study findings
- Study ID and publication info footer

#### New Components Created:
- `StruggleSelector.tsx` - Centered question with struggle button grid
- `SolutionSlide.tsx` - Full solution display with radar charts
- `ClinicalStudyCard.tsx` - Lab report style study details

#### Data Layer Updates (`productData.ts`):
- New `StruggleSolution` interface with comprehensive data structure
- New `ClinicalStudy` interface for detailed research data
- `STRUGGLE_OPTIONS` constant for struggle categories
- Complete struggle solutions data for both Formula 01 and Formula 02
- Each formula has 6 unique clinical studies (one per struggle)

---

## December 8, 2025

### 14:30 - Product Page Architecture Implementation
Major new feature: Complete product and protocol page system with shared components.

#### New Routes Created:
- `/formula-01` - Formula 01 individual product page (light theme, Energy positioning)
- `/formula-02` - Formula 02 individual product page (dark theme, Clarity positioning)
- `/protocol/[id]` - Dynamic protocol pages for Protocol 1-4

#### New Components - Product (`app/components/product/`):
- `ProductHero.tsx` - Product hero with image, info box, pack selector, purchase toggle
- `PackSelector.tsx` - 4-pack, 12-pack, 28-pack selection with pricing
- `PurchaseToggle.tsx` - Subscription vs One-Time purchase toggle
- `StickyPurchaseFooter.tsx` - Fixed bottom bar with quantity, subscribe toggle, add to cart
- `FormulaIngredients.tsx` - Ingredient breakdown in neo-box styling
- `FormulaBenefits.tsx` - Benefits grid with clinical stats
- `FormulaFAQ.tsx` - Expandable FAQ accordion
- `HowItWorks.tsx` - Usage guidance with when to take information

#### New Components - Protocol (`app/components/protocol/`):
- `ProtocolHero.tsx` - Protocol info with tier selector and both formula images
- `ProtocolCalendar.tsx` - 4-week calendar visualization with formula colors
- `ProtocolBenefits.tsx` - Combined benefits from both formulas
- `ProtocolFAQ.tsx` - Protocol-specific and general FAQs

#### Data Layer (`app/lib/productData.ts`):
- Centralized pricing for subscriptions and one-time purchases
- Formula content (ingredients, benefits, clinical results, FAQ)
- Protocol content (4 protocols with Starter/Pro/Max tiers)
- Helper functions for pricing and calendar generation

#### Navigation Update:
- Added Shop dropdown with protocol quiz CTA, all 4 protocols, and individual formulas
- Updated mobile menu with full shop navigation grid
- Links to protocol and formula pages

#### Protocol System:
- **Protocol 1:** Formula 01 Daily + Formula 02 Weekly
- **Protocol 2:** Formula 02 Daily + Formula 01 Weekly
- **Protocol 3:** Balanced alternating approach
- **Protocol 4:** Ultimate - Both formulas daily (Pro/Max only)

#### Pricing Structure:
- Formula packs: 4-pack (weekly), 12-pack (bi-weekly), 28-pack (monthly)
- Subscription pricing at discount vs one-time purchases
- Protocol tiers: Starter (4/week), Pro (6/week), Max (7/week)

#### Mobile Optimizations:
- Sticky footer lightweight design
- Large touch targets
- Mobile-first layouts throughout

---

## December 7, 2025

### 16:15 - Trial Packs Section Added
- Created new `TrialPacks.tsx` component below Protocol Builder section
- Section heading: "not ready for a protocol? try our trial packs"
- Formula toggle between Formula 01 and Formula 02
- Three pack size options: 4-pack (£14.99), 8-pack (£24.99), 12-pack (£34.99)
- Layout: Formula image on left, selections and options on right
- Pack selection cards with descriptions and pricing
- "How to Try It" explanation box
- Price display showing selected pack and total
- Add to Cart button (primary action)
- Learn More button (secondary action)
- Responsive design matching site aesthetic

### 15:45 - FAQ Section & Footer Redesign
- Completely overhauled FAQ section with persistent answer card
- FAQ buttons now toggle to populate a persistent card below (instead of expanding/collapsing)
- Card shows "Select a category above to see the answer" when no category is selected
- Moved CTA section (Buy Conka Now button, "ready to unlock your potential" text, guarantee info) to footer
- Redesigned footer layout:
  - Left side: Logo, mini navigation links, Patent info, "built with love" text
  - Right side: CTA content (ready to unlock text, Buy Conka Now button, guarantee text)
- Removed border line from footer for seamless integration
- Footer now has better information hierarchy and visual balance

### 15:15 - Founders Section & FAQ Updates
- Updated founders section with new names: Humphrey Bodington and Harry Glover
- Changed founder subtext to "athlete" for both
- Added "bio coming soon" placeholder text for both founders
- Replaced "Two best friends..." text section with button: "the story of CONKA"
- Replaced emoji icons in FAQ section with SVG icons matching the rest of the page design
- FAQ icons now use consistent SVG styling (checkmark, package, refresh, leaf, clock)

### 14:30 - Protocol Builder Rework
- Completely redesigned "Build Your Protocol" section into new "Choose Your Path" section
- Created new `ProtocolBuilder.tsx` component with interactive two-path system
- **Two Paths Available:**
  - **Endurance Path**: Formula 02 daily + Formula 01 weekly (for endurance athletes, runners, cyclists, swimmers)
  - **Performance Path**: Formula 01 daily + Formula 02 weekly (for contact sports, rugby, football, combat sports)
- **Expandable View**: Clicking a path reveals:
  - Formula product image on left
  - Interactive 28-day calendar visualization on right
  - Color-coded days: teal for daily formula, amber for weekly boost
  - Protocol tier selector (Starter/Pro/Max)
- **Three Protocol Tiers:**
  - Starter: 3 primary + 1 secondary per week (gentle introduction)
  - Pro: 5 primary + 1 secondary per week (balanced protocol)
  - Max: 6 primary + 1 secondary per week (full coverage)
- **Navigation Features:**
  - "Back to Options" button to return to path selection
  - "View the Other Path" button to quickly switch between paths
- Benefits explanation for each path with checkmark list
- Removed unused state variables from page.tsx (`selectedPlan`, `planDetails`)

---

## December 7, 2024

### 19:45 - Initial Project Setup
- Created Next.js 16.0.7 application with TypeScript, Tailwind CSS v4, ESLint
- Configured for Vercel deployment
- Set up import alias `@/*`
- Zero vulnerabilities in npm audit

### 19:50 - Style Guide 01 Implementation
- Created `STYLE_GUIDE_01.md` documenting the design system
- Created `STYLE_GUIDE_01_USAGE.md` with quick reference examples
- Implemented typography system:
  - **Poppins** - Primary/marketing font (400, 500, 600, 700)
  - **Caveat** - Commentary/brand voice font (400, 500)  
  - **IBM Plex Mono** - Clinical/metrics font (400, 500)
- Set up CSS variables for colors and theming
- Created theme classes: `.theme-formula-01` (light), `.theme-formula-02` (dark)
- Added typography utility classes: `.font-primary`, `.font-commentary`, `.font-clinical`

### 20:15 - Homepage Wireframe (Style Guide 01)
- Built complete homepage wireframe with 8 interactive sections
- Implemented formula toggle that transforms entire page between light/dark themes
- Smooth CSS transitions on theme switch (500ms)

#### Sections Implemented:
1. **Hero** - Formula toggle, headline, product placeholder, CTAs
2. **Benefits Carousel** - Interactive slideshow with neo-brutalist boxes, navigation dots/arrows
3. **Clinical Report** - Clickable data cards with lab report aesthetic, detail panel
4. **Ingredients** - Formula breakdown with percentages, script annotations
5. **Plan Builder** - Interactive calendar, plan selector (4/12/28 shots), bundle paths
6. **Case Studies** - Athlete profiles with lab report cards, click-through navigation
7. **Founders** - Story section with image placeholders
8. **FAQ** - Icon-driven accordion with categories

#### Technical Details:
- React state management for all interactive elements
- Content arrays for Formula 01 and Formula 02 (easily swappable)
- Neo-brutalist CSS utilities: `.neo-box`, `.neo-button`, `.neo-button-outline`
- Placeholder boxes for images: `.placeholder-box`
- All placeholder content marked with `[PLACEHOLDER]` text

