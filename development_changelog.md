# Development Changelog

## December 30, 2025

### 23:00 - Updated Key Statistics with Verified Clinical Data

Updated all 16 ingredient keyStats sections to use data derived from the verified PubMed studies, replacing placeholder statistics with real research findings.

#### All keyStats Now Reference Verified Studies:

**Conka Flow (Formula 01):**
1. **Lemon Balm** - Anxiety reduction (-28%), memory (+18%), calmness (+15%) from Kennedy 2003 & 2006
2. **Turmeric** - Memory (+63%), attention (+96%), working memory (+12%) from Small 2018 & Rainey-Smith 2016
3. **Ashwagandha** - Stress score (-56%), cortisol (-28%), sleep quality (+42%) from Chandrasekhar 2012 & Salve 2019
4. **Rhodiola** - Burnout (-28%), physical fitness (+17%), mental performance (+12%) from Olsson 2009 & Spasov 2000
5. **Bilberry** - Word recall (+18%), paired learning (+22%), cognitive errors (-18%) from Krikorian 2010 & Schrager 2015
6. **Black Pepper** - Curcumin absorption (2000%), serotonin (+28%), dopamine (+35%) from Shoba 1998 & Rinwa 2013

**Conka Clarity (Formula 02):**
7. **Vitamin C** - Attention (+14%), memory (+12%), anxiety (-22%) from Travica 2017 & de Oliveira 2015
8. **Alpha GPC** - Isometric force (+14%), ADAS-Cog (-22%), MMSE (+15%) from Parker 2015 & De Jesus Moreno 2003
9. **Glutathione** - Blood GSH (+40%), NK cell activity (+100%), whole blood GSH (+35%) from Sinha 2018 & Richie 2015
10. **NAC** - Cognitive function (+22%), negative symptoms (-25%), OCD symptoms (-32%) from Berk 2008 & Oliver 2015
11. **ALCAR** - Mental fatigue (-35%), cognitive function (+24%), attention (+16%) from Malaguarnera 2008
12. **Ginkgo** - Cognition (+16%), attention (+14%), processing speed (+15%) from Laws 2012 & Kaschel 2009
13. **Lecithin** - Verbal memory (+12%), visual memory (+8%) from Poly 2011 (1,391 participants)
14. **Lemon Oil** - Positive mood (+23%), cognitive function (+18%), personal orientation (+25%) from Kiecolt-Glaser 2008 & Jimbo 2009
15. **Alpha Lipoic Acid** - Memory (+15%), oxidative stress (-22%), disease progression (-65%) from Kim 2020 & Hager 2007
16. **Vitamin B12** - Brain atrophy (-86%), atrophy reduction (-30%), high homocysteine group (-53%) from Douaud 2013 & Smith 2010

#### Format Improvements:
- Each stat now includes PMID citation for traceability
- Dosage information derived from actual study protocols
- Effect sizes based on reported outcomes from clinical trials

---

### 22:45 - Added Second Clinical Study for Each Ingredient

Added a second verified PubMed-cited clinical study for all 16 ingredients, doubling the evidence base.

#### New Studies Added:

**Conka Flow (Formula 01):**
1. **Lemon Balm** - Kennedy et al. 2003 (PMID: 12888775) - Mood and cognitive modulation via CNS receptor binding
2. **Turmeric/Curcumin** - Rainey-Smith et al. 2016 (PMID: 26878105) - Working memory improvement in older adults
3. **Ashwagandha** - Salve et al. 2019 (PMID: 32021735) - Adaptogenic and anxiolytic effects study
4. **Rhodiola rosea** - Spasov et al. 2000 (PMID: 10839209) - Student exam stress study
5. **Bilberry** - Krikorian et al. 2010 (PMID: 20047325) - Memory improvement in older adults
6. **Black Pepper/Piperine** - Rinwa & Kumar 2013 (PMID: 23268377) - Antidepressant activity via monoamines

**Conka Clarity (Formula 02):**
7. **Vitamin C** - de Oliveira et al. 2015 (PMID: 26327060) - Anxiety reduction in students
8. **Alpha GPC** - De Jesus Moreno 2003 (PMID: 12882463) - Cognitive improvement in dementia (261 participants)
9. **Glutathione** - Richie et al. 2015 (PMID: 25900085) - 6-month oral supplementation RCT
10. **NAC** - Oliver et al. 2015 (PMID: 26243567) - OCD and related disorders systematic review
11. **ALCAR** - Montgomery et al. 2003 (PMID: 12535484) - Cochrane meta-analysis of 11 RCTs
12. **Ginkgo Biloba** - Kaschel 2009 (PMID: 19395013) - Systematic review of 29 clinical trials
13. **Lecithin** - Zeisel 2012 (PMID: 22048568) - Choline's role in brain development review
14. **Lemon Essential Oil** - Jimbo et al. 2009 (PMID: 20377818) - Alzheimer's aromatherapy study
15. **Alpha Lipoic Acid** - Hager et al. 2007 (PMID: 17982897) - 48-month Alzheimer's follow-up analysis
16. **Vitamin B12** - Smith et al. 2010 (PMID: 20838622) - Brain atrophy reduction study

#### Documentation Updates:
- **`SOURCES.md`** - Now contains 32 complete citations (2 per ingredient) with full PubMed/DOI links

---

### 22:15 - Clinical Studies Verification & PubMed Citations
Replaced all 16 placeholder clinical studies on the ingredients page with real, verified PubMed-cited research.

#### Data Layer Updates (`app/lib/ingredientsData.ts`):
- **Extended `ClinicalStudyData` interface** with new fields:
  - `authors` - Study author list
  - `journal` - Publication journal name
  - `pmid` - PubMed ID for direct linking
  - `doi` - Digital Object Identifier for permanent reference

#### All 16 Ingredients Now Have Verified Studies:

**Conka Flow (Formula 01):**
1. **Lemon Balm** - Kennedy et al. 2006 (PMID: 16444660) - Anxiolytic effects study from Northumbria University
2. **Turmeric/Curcumin** - Small et al. 2018 (PMID: 29246725) - UCLA memory and brain amyloid study
3. **Ashwagandha** - Chandrasekhar et al. 2012 (PMID: 23439798) - Stress and cortisol reduction study
4. **Rhodiola rosea** - Olsson et al. 2009 (PMID: 19016404) - Stress-related fatigue treatment study
5. **Bilberry** - Schrager et al. 2015 (PMID: 25660920) - Cognitive function and mobility study
6. **Black Pepper/Piperine** - Shoba et al. 1998 (PMID: 9619120) - 2000% curcumin bioavailability study

**Conka Clarity (Formula 02):**
7. **Vitamin C** - Travica et al. 2017 (PMID: 28208784) - Systematic review of cognitive function
8. **Alpha GPC** - Parker et al. 2015 (PMID: 26500463) - Force production and cognitive performance
9. **Glutathione** - Sinha et al. 2018 (PMID: 29559699) - Liposomal glutathione and immune function
10. **NAC** - Berk et al. 2008 (PMID: 18436195) - Glutathione precursor cognitive function trial
11. **ALCAR** - Malaguarnera et al. 2008 (PMID: 18937015) - Cognitive function improvement study
12. **Ginkgo Biloba** - Laws et al. 2012 (PMID: 22628390) - Meta-analysis of 13 RCTs (2,372 participants)
13. **Lecithin** - Poly et al. 2011 (PMID: 22071706) - Framingham study on choline and cognition
14. **Lemon Essential Oil** - Kiecolt-Glaser et al. 2008 (PMID: 18295416) - Ohio State mood study
15. **Alpha Lipoic Acid** - Kim et al. 2020 (PMID: 32631710) - Memory and oxidative stress study
16. **Vitamin B12** - Douaud et al. 2013 (PMID: 23690582) - Oxford brain atrophy prevention study

#### Component Updates (`app/components/ingredients/IngredientStudies.tsx`):
- Added authors and journal display below study title
- Added citation links section with clickable PMID and DOI badges
- Links open directly to PubMed abstract and DOI resolver
- Improved visual hierarchy with author/journal metadata

#### New Documentation:
- **`SOURCES.md`** - Complete citation document with:
  - Full APA-style citations for all 16 studies
  - Direct PubMed links (https://pubmed.ncbi.nlm.nih.gov/PMID/)
  - DOI links for permanent access
  - Study design, participant counts, durations, and key findings
  - Organized by formula (Conka Flow / Conka Clarity)

---

### 21:00 - Find Your Protocol Quiz System
Created a comprehensive "Find Your Protocol" quiz feature at `/quiz` with configurable questions, weighted scoring, percentage-based results, and detailed score breakdowns.

#### New Data Layer:
- **`app/lib/quizData.ts`** - Complete quiz configuration system
  - `QuizQuestion` interface with questions, options, and weighted scoring per protocol
  - `QuizResult` interface with percentage match, total points, and question breakdowns
  - `ProtocolMatchInfo` interface with protocol descriptions and key benefits
  - 3 placeholder questions (expandable to 10) demonstrating the scoring system
  - `calculateQuizResults()` function computing percentages for all 4 protocols
  - `getRecommendedProtocol()` helper for top match
  - Each question includes a `measures` field explaining what it assesses

#### New Components (`app/components/quiz/`):
- **`QuizQuestion.tsx`** - Individual question display
  - Question counter (1 of X format)
  - Question text with optional subtitle
  - 3 answer options (Yes/Sometimes/No) with icons
  - Selected state with visual feedback
  - Large touch targets for mobile

- **`QuizProgress.tsx`** - Bottom progress bar and navigation
  - Visual progress bar showing completion percentage
  - Previous/Next buttons with disabled states
  - Step indicator dots
  - "See Results" button on final question

- **`QuizLoader.tsx`** - Pre-results loading animation
  - Circular progress ring with percentage
  - 3-stage loading messages (Analyzing, Calculating, Finding)
  - Animated brain icon transitioning to checkmark
  - Smooth transition to results page

- **`QuizResultsOverview.tsx`** - Results summary for all protocols
  - All 4 protocols with percentage match bars
  - "RECOMMENDED" badge on top match
  - Expandable score breakdown per protocol
  - Click to view detailed breakdown
  - Scroll prompt to recommended section

- **`QuizScoreBreakdown.tsx`** - Detailed scoring explanation
  - Question-by-question breakdown
  - Shows user's answer and points awarded
  - Max points possible per question
  - Total score with percentage
  - Explains what each question measures

- **`QuizRecommendedSection.tsx`** - Dynamic product section
  - Based on selected/top-matched protocol
  - Protocol icon and description
  - "Why this protocol?" explanation
  - Key benefits with checkmarks
  - Week 1 calendar preview
  - Tier and purchase type selectors
  - Pricing with billing frequency
  - "Add to Cart" and "Learn More" CTAs
  - 100-day guarantee badge

#### New Pages:
- **`app/quiz/page.tsx`** - Main quiz flow
  - Step-by-step question navigation
  - Answer state management
  - Stores answers in sessionStorage
  - Loading transition before results

- **`app/quiz/results/page.tsx`** - Results page
  - Loads answers from sessionStorage
  - Calculates and displays all protocol matches
  - Expandable score breakdowns
  - Dynamic recommended section based on selection
  - Sticky purchase footer (appears when scrolling)
  - Retake quiz option
  - Full cart drawer integration

#### Scoring System:
- Each question awards points to protocols based on answers
- Example: "Do you experience brain fog?"
  - Yes: +3 to Protocol 2 (Clarity focused)
  - Sometimes: +2 to Protocol 2, +2 to Protocol 3
  - No: +2 to Protocol 1 (Flow focused)
- Percentages calculated as: (earned points / max possible) × 100
- Results sorted by percentage, ties favor lower protocol number

#### Reused Components:
- `StickyPurchaseFooter` / `StickyPurchaseFooterMobile` for cart integration
- `Navigation` for consistent header
- `useIsMobile` hook for responsive behavior

---

### 18:30 - Our Story Page (Immersive Scroll Experience)
Created a dedicated "Our Story" page at `/our-story` featuring an immersive, TikTok-style scroll-snap experience that tells the Conka founders' journey through 10 narrative sections.

#### New Data Layer:
- **`app/lib/storyData.ts`** - Complete story data
  - 6 hero stats: 2 Founders, £500K+ Research, 100+ Prototypes, 25+ Clinical Trials, 1 Patented Formula, 1 Cognitive App
  - 10 story sections with alternating light/dark themes
  - Each section includes: headline, subtitle, body text, optional founder quote, image placeholder
  - Teams that have tested CONKA list
  - Research stats (cognitive improvements by gender)

#### New Components (`app/components/our-story/`):
- **`OurStoryHero.tsx`** - Landing section with key brand stats
  - Large "Our Story" headline with subtitle
  - 6-stat grid showing company achievements
  - Animated scroll indicator to begin journey

- **`StorySection.tsx`** - Reusable section component
  - Section counter (01/10 format)
  - Headlines with parallax effect
  - Founder quotes with styled blockquotes
  - Alternating image placement (left/right based on section)

- **`StoryProgress.tsx`** - Desktop navigation dots
  - Fixed position on right side
  - Click to jump to any section
  - Active state indicator
  - Adapts color based on current section theme

- **`OurStoryDesktop.tsx`** - Full desktop experience
  - Scroll-snap container with smooth transitions
  - Section tracking for progress indicator
  - Final CTA section with product links

- **`OurStoryMobile.tsx`** - Mobile-optimized experience
  - Simplified hero with 4 key stats
  - Touch-friendly scroll-snap
  - Bottom progress dots indicator
  - Stacked layout with full-width images

#### New CSS Utilities (`globals.css`):
- `.story-scroll-container` - Scroll-snap parent with hidden scrollbar
- `.story-section` - Full-viewport snap sections
- `.story-light` / `.story-dark` - Theme variants
- `.story-progress-dot` - Navigation dot styling
- `.animate-bounce-slow` - Gentle scroll indicator animation
- `.animate-fade-in-up` - Content entrance animation
- `.stagger-1/2/3/4` - Animation delay classes
- `.story-quote` - Quote styling with decorative quote mark

#### New Page:
- **`app/our-story/page.tsx`** - Main story page
  - Responsive desktop/mobile rendering
  - Fixed navigation header
  - Cart drawer integration

#### Navigation Updates:
- Updated "Our Story" links in Navigation.tsx from `/#story` to `/our-story`
- Updated footer link in page.tsx to point to new dedicated page

#### The 10 Story Sections:
1. Where It All Began - University, teammates, shared drive
2. The Spark - Concussion injury, 8-month PCS recovery (with founder quote)
3. Breakthrough Discovery - Durham University research, lifespan extension
4. Parallel Paths - Harry's 2021 Olympics with Team GB
5. Half a Million in Research - £500K neuroscience investment
6. Building the Technology - Cambridge partnership, ICA cognitive testing
7. Reinventing Extraction - Alcohol-free formula, Dr. Katekhaye
8. Pro Sport Validation - First clinical trial, 16% brain performance increase
9. The Second Formula - Elite team testing, dual-formula development
10. The Journey Continues - Summary and CTA

---

### 16:45 - Case Studies Page
Created a comprehensive Case Studies page at `/case-studies` showcasing athlete performance improvements using the Conka App, with detailed performance metrics, sport filtering, and featured athletes section.

#### New Data Layer:
- **`app/lib/caseStudiesData.ts`** - Comprehensive athlete database
  - 11 athletes across 10 sports: Football, Tennis, Esports, Running, Chess, Golf, Boxing, Business, Cycling, Swimming, Creative
  - Each athlete includes: name, sport, profession, achievement, description, quote, product version, protocol used
  - Performance data: baseline metrics, results, improvements with percentages
  - Featured flag for highlighting key case studies
  - Sport category types with display info
  - Helper functions: `getAthleteById()`, `getFeaturedAthletes()`, `getAthletesBySport()`, `getAllSports()`

#### New Components (`app/components/case-studies/`):
- **`CaseStudiesPageDesktop.tsx`** - Desktop layout with sidebar and main content
  - Featured athletes section at top with horizontal cards
  - Sticky sidebar with sport filtering and athlete list
  - Full athlete detail view with stats, quote, and performance charts
  - Summary stats (total athletes, tests completed, average improvement)

- **`CaseStudiesPageMobile.tsx`** - Mobile layout with horizontal filter and swipe cards
  - Horizontal scrolling sport filter bar
  - Featured athletes carousel
  - Single athlete card view with navigation
  - "View Full Case Study" expanded detail view
  - Swipe navigation with dot indicators

- **`AthleteSidebar.tsx`** - Desktop sidebar component
  - Sport filter pills with counts
  - Scrollable athlete list with active state
  - Preview of top improvement stat per athlete

- **`AthleteFilterBar.tsx`** - Mobile horizontal filter component
  - Horizontally scrolling sport category pills
  - Sport icons and counts

- **`AthleteCard.tsx`** - Full athlete profile display
  - Photo placeholder with sport icon
  - Product version badge (Conka Flow, Clarity, or both)
  - Protocol used indicator
  - Quote section with styling
  - Integrated AthleteStats component

- **`AthleteStats.tsx`** - Performance metrics visualization
  - Key improvements grid with progress bars
  - Baseline vs Results comparison chart
  - Tests completed and duration display

- **`FeaturedAthletes.tsx`** - Featured section for homepage display
  - 4-column grid of featured athlete cards
  - Key stat highlight per athlete

- **`SportIcon.tsx`** - SVG icons for each sport category
  - 12 custom icons: Football, Tennis, Golf, Running, Cycling, Swimming, Boxing, Esports, Chess, Business, Creative, Other

#### New Page:
- **`app/case-studies/page.tsx`** - Main case studies page
  - Responsive desktop/mobile rendering
  - Full navigation and footer
  - Cart drawer integration

#### Design Patterns:
- Follows neo-brutalist style guide matching ingredients page
- Uses `neo-box`, `neo-box-inverted` for cards
- Uses `font-clinical` for data, `font-commentary` for quotes
- Sport icons in consistent SVG style
- Emerald/green accent color for improvements
- Mobile horizontal scroll with `scrollbar-hide` utility

---

### 14:30 - Ingredients Deep-Dive Page
Created a comprehensive, interactive ingredients page at `/ingredients` showcasing all ingredient research, benefits, clinical studies, and formula composition with distinct desktop and mobile experiences.

#### New Data Layer:
- **`app/lib/ingredientsData.ts`** - Comprehensive ingredient database
  - 6 ingredients for Conka Flow (Lemon Balm, Turmeric, Ashwagandha, Rhodiola rosea, Bilberry, Black Pepper)
  - 10 ingredients for Conka Clarity (Vitamin C, Alpha GPC, Glutathione, NAC, ALCAR, Ginkgo Biloba, Lecithin, Lemon Oil, ALA, B12)
  - Each ingredient includes: scientific name, category, percentage, mechanism of action, key stats, benefits, clinical studies, safety profile, synergies
  - Helper functions: `getIngredientsByFormula()`, `getIngredientById()`, `getAllIngredients()`
  - Category info with colors for visual identification

#### New Components (`app/components/ingredients/`):
- **`IngredientsPageDesktop.tsx`** - Desktop layout with split-view
  - Left side: Sticky ingredient image with percentage badge, chemical structure placeholder
  - Right side: Scrollable content with header, stats, mechanism, benefits, studies, safety
  - Horizontal pill navigation for ingredient switching
  
- **`IngredientsPageMobile.tsx`** - Mobile layout with horizontal swipe carousel
  - Top formula toggle (Conka Flow / Conka Clarity)
  - Horizontal scrolling ingredient cards with images and percentages
  - Long-form vertical scroll for selected ingredient details
  - All sections adapted for mobile reading

- **`IngredientCarousel.tsx`** - Horizontal swipe carousel for mobile ingredient selection
  - Auto-scrolls to active ingredient
  - Gradient fade edges for scroll indication
  - "Swipe to explore" hint

- **`IngredientSelector.tsx`** - Desktop pill navigation
  - Color-coded category dots
  - Active state with inverted colors
  - Percentage badges on each pill

- **`IngredientStats.tsx`** - 4-column grid of key statistics
  - Large numbers with clinical font
  - Source attribution for each stat

- **`IngredientBenefits.tsx`** - Accordion-style benefits
  - Icon mapping for 14+ benefit types
  - Expandable descriptions

- **`IngredientStudies.tsx`** - Clinical studies section
  - Expandable study cards with metadata
  - Participant count, duration, significance (P-value)
  - Integrated bar charts for results visualization

- **`StudyBarChart.tsx`** - Recharts bar chart component
  - Baseline vs Result grouped bars
  - Clinical styling matching site aesthetic

#### New Page:
- **`app/ingredients/page.tsx`** - Main ingredients page
  - Formula toggle between Conka Flow and Conka Clarity
  - Responsive desktop/mobile rendering
  - Full navigation and footer
  - Cart drawer integration

#### Design Patterns:
- Follows neo-brutalist style guide with `neo-box`, `neo-box-inverted`
- Uses `font-clinical` for data, `font-commentary` for annotations
- Formula colors: Teal for Flow, Amber for Clarity
- Category colors: Adaptogen (emerald), Nootropic (purple), Vitamin (orange), Amino Acid (blue), Antioxidant (red)
- Mobile horizontal scroll with `scrollbar-hide` utility

---

### 10:46 - Product Renaming: Formula 01/02 → Conka Flow/Clarity
Comprehensive renaming of all product references throughout the application.

#### Changes:
- **Display Names**: Renamed "Formula 01" → "Conka Flow" and "Formula 02" → "Conka Clarity" across all user-facing text
- **URLs**: Updated routes from `/formula-01` → `/conka-flow` and `/formula-02` → `/conka-clarity`
- **CSS Classes**: Renamed theme classes from `theme-formula-01` → `theme-conka-flow` and `theme-formula-02` → `theme-conka-clarity`
- **Variable Names**: Updated internal variables:
  - `formula01Count` → `conkaFlowCount`
  - `formula02Count` → `conkaClarityCount`
  - `isPrimaryFormula01` → `isPrimaryConkaFlow`
- **Function Names**: Renamed page components:
  - `Formula01Page` → `ConkaFlowPage`
  - `Formula02Page` → `ConkaClarityPage`
- **Directories**: Renamed route directories:
  - `app/formula-01/` → `app/conka-flow/`
  - `app/formula-02/` → `app/conka-clarity/`

#### Files Updated:
- All component files, page files, and data files
- Style guide documentation files
- Global CSS theme classes

---

## December 28, 2025

### 20:00 - Homepage Product Slideshow (Mobile)
Added product image slideshow component to homepage in two locations: below hero section and between TrialPacks and Founders section.

#### New Component:
- **`ProductSlideshowMobile.tsx`** - Horizontal scrolling product image carousel
  - Extracted from ProtocolBenefitsMobile component
  - Shows 3 placeholder product images with labels
  - Edge-to-edge horizontal scroll with hidden scrollbar
  - Only visible on mobile viewports (hidden on desktop with `md:hidden`)

#### Files Updated:
- `app/page.tsx` - Added ProductSlideshowMobile component in two locations:
  1. Between Hero and KeyBenefits sections
  2. Between TrialPacks and Founders (Story Behind Conka) sections
- `app/components/ProductSlideshowMobile.tsx` - New standalone component created

---

### 19:15 - Mobile Navigation Cart & Checkout Buttons
Reorganized mobile navigation to move cart functionality into the menu.

#### Changes:
- Removed cart icon from mobile header (kept on desktop only)
- Mobile header now shows only the hamburger menu icon
- Replaced sticky cart footer with full Cart & Checkout section:
  - "View Cart" button (outline style with cart icon)
  - "Checkout" button (filled style with credit card icon)
  - Both buttons side-by-side, full width
  - Black border-top divider
  - Consistent padding and styling with rest of nav

---

### 19:00 - Tagline Styling & Marketing Copy Update
Improved hero taglines and updated protocol subtitles to marketing speak.

#### Styling Updates:
- Tagline text increased from `text-sm` to `text-base`
- Reduced margin from `mt-1` to `mt-0.5` for tighter spacing
- Increased opacity from `80` to `90` for better readability
- Applied to both `ProductHeroMobile` and `ProtocolHeroMobile`

#### Protocol Subtitles (Marketing Taglines):
- Protocol 1: "Build Resilience, Stay Sharp" (was "Formula 01 Daily • Formula 02 Weekly")
- Protocol 2: "Peak Cognition, Zero Burnout" (was "Formula 02 Daily • Formula 01 Weekly")
- Protocol 3: "The Best of Both Worlds" (was "Formula 01 & Formula 02 Balanced")
- Protocol 4: "Maximum Power, Every Day" (was "The Ultimate Protocol")

---

### 18:45 - Protocol Key Benefits Styling & Sticky Footer
Enhanced the protocol overview section and fixed sticky footer border.

#### Protocol Key Benefits:
- Added icons to each benefit tag (checkmark, shield, bolt, target)
- Added accent colors alternating teal and amber
- Added "About this Protocol" label before the description paragraph

#### Sticky Footer:
- Changed border from `border-black/20` (gray) to `border-black` (solid black)

---

### 18:30 - Updated Hero & Protocol Images
Replaced placeholder images with main.jpg across key pages.

#### Files Updated:
- `Hero.tsx`: Changed hero image from `/3.png` to `/main.jpg`
- `ProtocolHeroMobile.tsx`: Changed from `/protocol.png` to `/main.jpg`
- `ProtocolHero.tsx`: Changed from `/protocol.png` to `/main.jpg`

---

### 18:15 - Protocol 4 Diagonal Split & Case Studies
Enhanced Protocol 4 calendar display and added protocol-specific case studies.

#### Protocol 4 Calendar Enhancement:
- Days now show diagonal split (blue/teal on left, orange on right)
- Uses CSS `linear-gradient(135deg, #AAB9BC 50%, #f59e0b 50%)` for smooth diagonal
- Legend updated to show "Both Daily" swatch for Protocol 4
- Other protocols still show individual colors + Rest

#### New Component: `ProtocolCaseStudiesMobile.tsx`
Protocol-specific social proof section:
- 2 athletes per protocol with relevant achievements
- Protocol 1: Sarah Okonkwo (Rugby), David Chen (Marathon)
- Protocol 2: James Torres (Esports), Emma Williams (Chess)
- Protocol 3: Marcus Chen (Swimming), Lisa Park (CrossFit)
- Protocol 4: Alex Rodriguez (F1), Nina Volkov (Poker)
- Each card shows: name, sport, protocol tier, quote, key results
- Prev/next navigation with dot indicators
- Teal accent color matching protocol branding

---

### 18:00 - Protocol Page UX Improvements
Multiple enhancements to the protocol mobile experience.

#### ProtocolHeroMobile Updates:
- Fixed Subscribe/One-Time button sizing: Added `whitespace-nowrap` and `flex-shrink-0` to prevent button resizing on different viewports
- Added "Key Benefits" label above the tags in overview tab
- Ensured at least 4 tags display for visual balance (adds extra tags from pool if needed)

#### New Component: `ProtocolCalendarSectionMobile.tsx`
Persistent calendar section below the struggle selector with full month view:
- 4-week calendar grid with color-coded formula days
- Formula legend (F01 = teal, F02 = amber, Rest = gray)
- Tier selector (Starter/Pro/Max buttons)
- Purchase toggle (Subscribe/One-time)
- Pricing display with billing frequency
- Full-width "Add to Cart" button with cart icon
- 100-day guarantee badge

---

### 17:45 - Protocol Page Struggle Section & Legend Removal
Added struggle selector to protocol pages and removed unnecessary legend.

#### Changes:
- Removed "Formula 01 / Formula 02" legend overlay from ProtocolHeroMobile (not needed)
- Created new `ProtocolStruggleMobile.tsx` component with:
  - 6 protocol-specific struggles: Performance, Stress, Energy, Focus, Recovery, Consistency
  - Teal accent color to match protocol branding
  - Solution cards with stats, descriptions, and key benefits
  - Protocol-specific benefits pulled from data
  - Same progressive disclosure pattern as FormulaBenefitsMobile
- Added ProtocolStruggleMobile to protocol/[id]/page.tsx mobile view

---

### 17:30 - Image Carousel in Protocol Benefits Section
Added visual interest with a horizontal scrolling image carousel placeholder.

#### Changes:
- Added 3-image horizontal scroll carousel above "Double Your Benefits" header
- Placeholders with gradient backgrounds matching formula colors:
  - Product Lifestyle (neutral)
  - Both Formulas (teal/Formula 01)
  - In Action (amber/Formula 02)
- Edge-to-edge scrolling with inner padding for cards
- Rounded corners and subtle borders on each card

---

### 17:15 - Mobile Navigation Menu Reorganization
Reordered mobile menu to prioritize conversion-focused actions at the top.

#### New Order:
1. **Find Your Protocol** (RECOMMENDED) - Now at the very top
2. **Shop Protocols** - 2x2 grid of protocols
3. **Individual Formulas** - Formula 01 & 02
4. **Navigation** - The Science, Ingredients, Results, Our Story (moved to bottom)

---

### 17:00 - Consistent Footer Across Product Pages
Updated all product page mobile footers to match the homepage footer design.

#### Footer Updates:
- Logo with hover effect
- Mini navigation: The Science, Ingredients, Results, Our Story
- "built with love" tagline
- Two CTA buttons: "Find Your Protocol" (with question icon) and "Buy Conka" (with cart icon)
- 100-day money-back guarantee badge with shield icon

#### Pages Updated:
- `formula-01/page.tsx`
- `formula-02/page.tsx`
- `protocol/[id]/page.tsx`

---

### 16:45 - New Protocol Benefits & Case Studies Sections
Added two new mobile sections to formula product pages for better conversion flow.

#### New Component:
- **`ProtocolBenefitsMobile.tsx`** - "Double Your Benefits" section
  - Header explaining standalone vs combined benefits
  - Visual comparison: "Alone = Effective" → "Combined = Powerful"
  - 3-stat grid showing combined results (2.3x effect, 47% faster, 8+ hrs duration)
  - 2x2 protocol grid with icons, names, taglines, and descriptions
  - Link to explore the other formula

#### Page Updates:
- Replaced "Want the Complete Experience?" section with new components
- Added `CaseStudiesMobile` component for social proof
- Athletes data imported (Marcus Chen, Sarah Okonkwo, James Torres)
- Both formula-01 and formula-02 pages updated

---

### 16:15 - Sticky Footer & Benefits Section Polish
Enhanced the mobile sticky footer and fixed FormulaBenefitsMobile component.

#### Sticky Footer Updates:
- Added top border divider (2px black/20%)
- Button now always says "Add to Cart" (no dynamic text)
- Added billing frequency below price (e.g., "Billed weekly")
- Added vertical divider line between price and button sections
- Added cart icon to the button
- Added "100-day guarantee" badge with shield icon below button
- Slightly larger footer to accommodate new elements

#### FormulaBenefitsMobile Fixes:
- Fixed runtime error: `participants` is an object, now accessing `participants.total`
- Header now centered with larger text (2xl)
- Subtext increased to base size
- Reduced top padding to bring section closer to hero card

#### Layout Adjustments:
- ProductHeroMobile and ProtocolHeroMobile bottom padding reduced
- Footer sections on all product pages now have extra bottom padding (pb-28) for sticky footer clearance

---

### 15:45 - Product Pages Mobile v2 Overhaul
Fixed key issues and added missing sections for complete mobile experience.

#### Fixes:
- **Sticky Footer:** Now always visible from landing (removed scroll-based visibility)
- **Accent Color Changes:** Header now changes color when toggling Subscribe/One-Time
  - Formula 01: Dark header (subscribe) → Light with black border (one-time)
  - Formula 02: Dark header (subscribe) → Amber header (one-time)
  - Protocols: Dark header (subscribe) → Teal header (one-time)
- **Toggle Buttons:** Colors adapt to header background context

#### New Component:
- **`FormulaBenefitsMobile.tsx`** - "What do you struggle with?" section
  - 2x3 grid for struggle selection (Sleep, Energy, Crashing, Stress, Anxiety, Focus)
  - Solution card appears when struggle selected with:
    - Primary stat and stat label
    - Description text
    - Key ingredients tags
    - Collapsible clinical study details
  - Progressive disclosure pattern

#### Files Updated:
- `StickyPurchaseFooterMobile.tsx` - Always visible, no dismiss button
- `ProductHeroMobile.tsx` - Header color transitions, toggle button styling
- `ProtocolHeroMobile.tsx` - Header color transitions, toggle button styling
- `formula-01/page.tsx` - Added FormulaBenefitsMobile section
- `formula-02/page.tsx` - Added FormulaBenefitsMobile section
- `app/components/product/index.ts` - Exported FormulaBenefitsMobile

---

### 14:30 - Product Pages Mobile Optimization
Complete mobile optimization for Formula and Protocol product pages with dedicated mobile components.

#### New Components Created:
- **`StickyPurchaseFooterMobile.tsx`** - Simplified single-row sticky footer
  - Always visible from landing
  - Shows price + single CTA button
  - Much cleaner than desktop multi-row version

- **`ProductHeroMobile.tsx`** - Mobile hero for Formula pages (01 & 02)
  - All-in-one card layout with embedded image
  - Tabbed content (Info, Benefits, Ingredients, Taste)
  - Benefits tab has collapsible detail sections
  - Integrated pack selector (3-column grid)
  - Selection summary with pricing and trust badges
  - Inline CTA button

- **`ProtocolHeroMobile.tsx`** - Mobile hero for Protocol pages
  - Tabbed content (Overview, Schedule, Benefits, FAQ)
  - Schedule tab features 1-week calendar with "View Full Month" expand
  - Formula legend overlay on product image
  - Tier selector (horizontal buttons)
  - FAQ with collapsible Q&A sections
  - Inline CTA button

#### Files Updated:
- **`formula-01/page.tsx`** - Conditional mobile/desktop rendering
- **`formula-02/page.tsx`** - Conditional mobile/desktop rendering
- **`protocol/[id]/page.tsx`** - Conditional mobile/desktop rendering

#### Key Mobile Design Patterns:
1. **Single Card Layout:** All product info in one scrollable card
2. **Tabbed Information:** Info, Benefits, Ingredients, Taste/Schedule tabs
3. **Progressive Disclosure:** Collapsible sections within tabs
4. **Simplified Footer:** Compact "Other Protocols" and "Individual Formulas" CTAs
5. **Sticky Purchase Footer:** Appears on scroll, dismissable
6. **Conversion-First:** Optimized for social media traffic quick conversion

#### Index Exports Updated:
- `app/components/product/index.ts` - Added ProductHeroMobile, StickyPurchaseFooterMobile
- `app/components/protocol/index.ts` - Added ProtocolHeroMobile

---

### 11:37 - FAQ Button Styling Update
Restyled the FAQ category buttons to match the site's consistent button styling.

#### Changes:
- **Padding:** Reduced from `px-5 py-4` to `px-4 py-2` (slimmer)
- **Shape:** Changed from `rounded-full` to `rounded-lg`
- **Layout:** Changed from vertical (icon above text) to horizontal (icon beside text)
- **Icon Size:** Reduced from `w-6 h-6` to `w-4 h-4`
- **Border:** Changed to `border-current/30` with hover state `border-current/60`
- **Gap:** Container gap reduced from `gap-4` to `gap-2`

---

### 11:36 - Mobile Optimization Documentation
Created comprehensive documentation capturing all mobile optimization lessons and patterns.

#### New File:
- **`docs/MOBILE_OPTIMIZATION.md`** - Guide for mobile optimization patterns

#### Contents:
- Core principles (component splitting, visual hierarchy, progressive disclosure)
- Component patterns (sticky footers, accordions, selection grids, carousels)
- Button styling guidelines
- Typography and spacing rules
- Image guidelines (when to include/exclude)
- Navigation structure
- Footer design
- Checklist for new mobile components
- Product page optimization notes

---

### 11:26 - Footer Redesign - Minimal & Consistent Styling
Redesigned the homepage footer to match the navigation styling with a cleaner, more minimal layout.

#### Changes:
- **Top Divider Line:** Added `border-t-2` to match header styling
- **Removed:** Patent #, clinical trials, research spend text
- **Removed:** "ready to unlock your potential?" text
- **Nav Links:** Changed from text-sm to text-xs for consistency
- **Two CTA Buttons:**
  - "Find Your Protocol" - outline button with question mark icon, links to `/quiz`
  - "Buy Conka" - filled button with cart icon, anchor link to `#protocols`
- **Protocol Anchor:** Added `id="protocols"` wrapper around ProtocolBuilder component
- **Guarantee Text:** Made smaller and more subtle (text-xs, opacity-50)
- **Overall:** Cleaner spacing (py-12 vs py-16, gap-8 vs gap-12)

---

### 11:17 - Mobile Trial Packs - Collapsible Sticky Footer
Enhanced the sticky footer to be collapsible and appear only after pack selection.

#### Behavior Changes:
- **No default footer** - Footer is hidden by default (not shown until user action)
- **Appears on selection** - Footer slides up with animation when user selects a pack size
- **Dismissable** - Added X close button in top-right corner to dismiss footer
- **Re-openable** - Selecting a different pack or re-selecting a pack re-opens the footer
- **Selection persists** - Pack selection remains highlighted even after dismissing footer

#### Technical Updates:
- Added `showFooter` state to control footer visibility
- `selectedPack` now starts as `null` instead of default "4"
- Added `handlePackSelect()` function to set both pack and show footer
- Dynamic bottom padding: `pb-40` when footer visible, `pb-12` when hidden
- Added CSS `@keyframes slide-up` animation in `globals.css`

---

### 11:12 - Mobile Trial Packs Optimization
Created a mobile-optimized Trial Packs component matching the product page styling patterns.

#### New Components:
- **`app/components/TrialPacksMobile.tsx`** - Mobile-optimized trial pack selection

#### Mobile Component Features:
- **Header Section:**
  - Left-aligned "not ready for a protocol?" subtitle and "try our trial packs" heading
  - Side-by-side Formula 01/02 toggle buttons with selected state styling
  - Formula info label with color indicator (teal/amber)

- **Product Image:**
  - Centered product bottle image that changes based on selected formula
  - Uses `/1.png` for Formula 01 and `/2.png` for Formula 02

- **Pack Size Selection:**
  - 3-column grid for 4-pack / 8-pack / 12-pack options
  - Each button shows pack size and price
  - Selected state with inverted colors (black background)

- **Collapsible Details:**
  - "What's in Formula 01/02?" accordion
  - Shows formula description and key benefits with checkmark icons

- **Sticky Purchase Footer (Product Page Styling):**
  - Fixed at bottom with shadow for visual separation
  - Product info row: color indicator, pack/formula label, per-shot price
  - Price display with "+ Free Shipping" text
  - Split action buttons:
    - "Learn More" outline button → links to formula page
    - "Add to Cart" filled button with cart icon

#### Pricing Data:
- Added per-shot pricing: £3.75/shot (4-pack), £3.12/shot (8-pack), £2.92/shot (12-pack)

#### Integration:
- Updated `TrialPacks.tsx` wrapper to use `useIsMobile` hook
- Conditionally renders `TrialPacksMobile` on mobile viewports (<1024px)
- Desktop version remains unchanged

---

### 10:58 - Mobile Protocol Selector Implementation
Created a mobile-optimized Protocol Selector component with progressive disclosure pattern for all 4 protocols.

#### New Components:
- **`app/components/ProtocolBuilderMobile.tsx`** - Full mobile-optimized protocol selection and detail view

#### Protocol 4 (Ultimate) Addition:
- Added new Protocol 4 "Ultimate" path with both formulas daily
- Ultimate pricing: £59.99 bi-weekly (Pro), £99.99 monthly (Max)
- Only Pro and Max tiers available (no Starter for Ultimate)
- Calendar shows gradient cells for "both formulas" days

#### Mobile Component Features:
- **Protocol Selection View:**
  - 4 horizontal-scroll protocol pills with swipe indicator
  - Each pill shows icon, protocol name, and subtitle
  - Formula 01/02 color legend

- **Expanded Protocol Detail View:**
  - Back button with protocol name and subtitle
  - Black header bar with formula legend, shots/week count, and pricing
  - Tier toggle (Starter/Pro/Max) - dynamically shows only available tiers
  - 1-week calendar sample with color-coded days:
    - Teal (#AAB9BC) for Formula 01
    - Amber for Formula 02
    - Gradient for both formulas (Protocol 4)
    - Gray border for rest days
  - Collapsible accordion sections:
    - "Why This Path Works" - description + benefits list
    - "What's Included" - shots per week breakdown per formula
    - "View Full Month" - expandable 4-week calendar grid
  - "Best For" tags display
  - Quick protocol switch buttons
  - **Sticky CTA footer** - always visible with pricing and "Subscribe Now" button

#### Desktop Updates:
- Updated ProtocolBuilder.tsx to show all 4 protocols in grid
- Changed grid from 3-column to 4-column layout
- Updated calendar to handle "both" formula display with gradient
- Exported types and data for mobile component reuse

#### Data Layer Updates:
- Added `ultimateTiers` for Protocol 4 tier data
- Added `ultimatePricingData` for Protocol 4 pricing
- Extended `PathInfo` interface with `isUltimate` and `availableTiers`
- Exported all types and data objects for component sharing

---

### 10:35 - Mobile Navigation Polish
Improved the mobile navigation menu to match desktop styling and improve UX.

#### Changes to `app/components/Navigation.tsx`:
- **Sticky cart footer**: Cart button now always visible at bottom of menu
- **2x2 nav links grid**: "The Science", "Ingredients", "Results", "Our Story" now in grid with matching desktop icons
- **Find Your Protocol CTA**: Larger styling with RECOMMENDED tag, black background matching desktop dropdown
- **Scrollable content area**: Menu content scrolls independently of sticky footer
- **Consistent styling**: Icons and text sizes now match desktop navigation
- **Section labels**: Added "mixed plans" and "order individually" subtitles

#### Visual Improvements:
- Navigation links now have subtle borders and icons for consistency
- Quiz CTA prominently displayed with green RECOMMENDED badge
- Cart button always accessible without scrolling

---

### 10:29 - Case Studies Mobile Optimization
Created a simplified mobile version of the Case Studies section with single-profile view and navigation controls.

#### New Components:
- **`app/components/CaseStudies.tsx`** - Wrapper component with useIsMobile conditional rendering
- **`app/components/CaseStudiesDesktop.tsx`** - Full carousel with 75%/25% split view
- **`app/components/CaseStudiesMobile.tsx`** - Simplified single-profile view

#### Mobile Component Features:
- **Single profile card**: One athlete visible at a time
- **Athlete photo placeholder**: Full-width with dashed border
- **Name + Sport**: Left-aligned, bold name with sport title
- **Protocol section**: Label + protocol description
- **Quote**: Commentary font with italic styling
- **Black navigation footer**: Previous/Next arrows with position indicator (1/3)
- **Dot indicators**: Quick navigation with active state highlighting
- **Smooth navigation**: Wrap-around prev/next with circular navigation

#### UX Improvements:
- Simplified from complex carousel to clean single-card view
- Easy forward/backward navigation with clear position feedback
- Reduced cognitive load by focusing on one athlete at a time
- Dot indicators allow direct jump to any athlete

---

### 10:25 - Ingredients & Taste Mobile Optimization
Created a mobile-exclusive version of the Ingredients & Taste section with formula toggle and no image.

#### New Components:
- **`app/components/Ingredients.tsx`** - Wrapper component with useIsMobile conditional rendering
- **`app/components/IngredientsDesktop.tsx`** - Desktop version with image and neo-box styling
- **`app/components/IngredientsMobile.tsx`** - Mobile-optimized component

#### Mobile Component Features:
- **Left-aligned header**: "Ingredients & Taste" with "what's inside" subtitle
- **Slim toggle buttons**: Side-by-side Formula 01 / Formula 02 pills
- **Black title bar**: Formula name with patent or tagline
- **Full-width ingredients table**: Proper spacing with right-aligned percentages
- **Taste info**: "tastes like" with flavor name
- **2x2 benefits grid**: Antioxidant Heavy, Zero Calories, No Caffeine, Vegan Friendly
- **No image on mobile**: Focus on the ingredients table

#### page.tsx Cleanup:
- Removed unused `formulaContent` constant (data now in Ingredients component)
- Removed `activeFormula` state (now managed internally)
- Removed `Image` import (no longer needed)
- Replaced 140+ line inline section with single `<Ingredients />` component

---

### 10:15 - KeyBenefits Mobile Optimization
Created a fully mobile-optimized version of the KeyBenefits section with responsive component architecture.

#### New Architecture:
- **`app/hooks/useIsMobile.ts`** - Custom hook for viewport detection at lg breakpoint (1024px)
- **`app/components/KeyBenefitsDesktop.tsx`** - Extracted desktop version with full image support
- **`app/components/KeyBenefitsMobile.tsx`** - New mobile-optimized component
- **`app/components/KeyBenefits.tsx`** - Wrapper component for conditional rendering

#### Mobile Component Features:
- **Horizontal scroll carousel** for benefit pills with snap scrolling
- **Scroll indicators** - Dot indicators showing current position + "swipe for more" text
- **Fade gradients** on edges to indicate more content available
- **Collapsible clinical studies** - Accordion-style toggle to show/hide clinical research data
- **Left-aligned header** and **right-aligned statistics** for visual hierarchy contrast
- **Larger radar chart** taking full width with proper label margins (no cutoff)
- **Slimmer benefit pills** for sleek mobile appearance
- **No product image** on mobile (desktop only) - focused on radar chart as primary visual

#### CSS Utilities Added:
- `.scrollbar-hide` utility class in `globals.css` for hidden scrollbars on carousels

#### RadarChart Updates:
- Increased margins from 50px to 60px to prevent label cutoff
- Reduced outer radius to 60% for better label spacing

---

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

