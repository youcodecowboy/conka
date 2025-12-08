# Development Changelog

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

