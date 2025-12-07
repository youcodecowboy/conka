# Conka Style Guide 01

**Version:** 1.0  
**Last Updated:** December 7, 2024  
**Status:** Active (Subject to Change)

---

## Design Philosophy

Conka's visual identity is built on **minimalism** and **modern neo-brutalism** principles:

- **White space heavy** - Generous use of negative space for clarity and focus
- **Neo-brutalist elements** - Bold, unapologetic design with strong borders and clear hierarchy
- **No drop shadows** - Flat design aesthetic
- **No aggressive pop colors** - Restrained color palette
- **Clinical precision** - Scientific, evidence-based presentation reflecting the brand's university partnerships and clinical trials

---

## Color Palette

### Primary Colors
- **Black:** `#000000` - Primary text, borders, strong elements
- **White:** `#FFFFFF` - Background, negative space, contrast

### Accent Color
- **Teal:** `#14B8A6` (or similar teal variant) - Used sparingly for highlights, CTAs, and emphasis

### Product-Specific Modes
- **Formula 01:** Light mode (white background, black text)
- **Formula 02:** Dark mode (black background, white text)

---

## Typography

### 1. Primary Font: Poppins
**Usage:** Main body text, headings, primary UI elements  
**Weights:** Regular (400), Medium (500), Semi-Bold (600), Bold (700)  
**Google Fonts:** `Poppins`

**Example Usage:**
- Brand name: "conka."
- Product names: "conka flow"
- Headings and subheadings
- Body text
- Button text

### 2. Commentary Font: Script/Script-like
**Usage:** Subtext, commentary, handwritten-style annotations  
**Alternative:** Caveat or Kalam (Google Fonts) - Similar to Linotype Felt Pen  
**Weights:** Regular (400), Medium (500)  
**Style:** Italicized, casual, handwritten aesthetic

**Example Usage:**
- "Used Daily by Olympians and Professional Athletes"
- "Caffeine-Free Focus"
- "protocol: once daily for optimal results"
- Descriptive annotations
- Secondary commentary text

### 3. Clinical Font: IBM Plex Mono
**Usage:** Clinical data, trial results, scientific information, numbers  
**Weights:** Regular (400), Medium (500)  
**Google Fonts:** `IBM Plex Mono`

**Example Usage:**
- Clinical trial results: "+22.1%", "+33.5%"
- Statistical data: "P<0.01", "P = 0.42"
- Formula percentages: "26.7%", "25.4%"
- Patent numbers: "#GB2620279"
- Scientific measurements
- Any data-driven content

---

## Product Information

### Products
- **Formula 01** - Light mode theme
- **Formula 02** - Dark mode theme

### Purchase Options
- **One-time purchase**
- **Subscription** (recurring)

### Pack Sizes
- 4-pack
- 12-pack
- 28-pack

### Bundle Paths
1. **Path 1:** Formula 01 (daily) + Formula 02 (supplemental)
2. **Path 2:** Formula 02 (daily) + Formula 01 (supplemental)

### Bundle Combinations
- Single formula packs (4, 12, or 28)
- Mixed formula bundles (combinations of both formulas)

---

## Design Elements

### Borders
- **Strong, bold borders** - Black borders (`2px` or `3px` solid)
- **No rounded corners** - Sharp, angular edges (neo-brutalist aesthetic)
- **Boxed sections** - Information organized in clear, bordered containers

### Layout Principles
- **Modular components** - Clear, distinct sections
- **Left-aligned text** - Primary alignment within sections
- **Grid-based structure** - Organized, systematic layout
- **Clear hierarchy** - Visual weight through size, weight, and spacing

### Icons
- **Simple line-art icons** - Minimalist, functional
- **Examples:**
  - Moon with 'zz' for sleep benefits
  - Brain icon for cognitive performance
  - Atom/molecular structures for scientific content

### Interactive Elements
- **Buttons:** Solid black rectangles with white text
- **No hover shadows** - Flat design
- **Clear CTAs:** "buy conka" style buttons

---

## Brand Assets

### Logo
- **File:** `/public/conka.webp`
- **Usage:** Top-left positioning typically
- **Format:** WebP

---

## Implementation Notes

### CSS Variables
- Font families should be defined as CSS variables for easy theming
- Color palette should use CSS variables for consistency
- Product-specific themes (light/dark) should be toggleable

### Responsive Design
- Mobile-first approach
- Maintain white space and clarity across breakpoints
- Typography scales appropriately

### Accessibility
- Ensure sufficient contrast ratios (WCAG AA minimum)
- Maintain readability with script fonts (use sparingly)
- Clear focus states for interactive elements

---

## Examples from Reference Materials

### Product Page Elements
- **Patent information:** Black header with white text
- **Clinical trial results:** Structured boxes with IBM Plex Mono for numbers
- **Formula breakdown:** Percentage-based ingredient lists
- **Guarantees:** Highlighted boxes (e.g., "100 days guaranteed results")
- **Benefits:** Icon + text combinations in bordered boxes

### Typography Hierarchy
1. **Brand/Product name** - Poppins Bold, large
2. **Headings** - Poppins Semi-Bold/Medium
3. **Body text** - Poppins Regular
4. **Commentary** - Script font, italicized, smaller
5. **Clinical data** - IBM Plex Mono, regular weight

---

## Future Considerations

- This is Style Guide 01 - additional style guides may be created for different art directions
- Multiple homepage examples may use different styling approaches
- Multiple product page examples may vary in presentation
- Flexibility is key - this is a playground for experimentation

---

## Notes

- All styling decisions should prioritize clarity and scientific credibility
- The brand identity should reflect the clinical, evidence-based approach
- Maintain consistency within Style Guide 01, but allow for evolution
- Test readability of script fonts at various sizes
- Ensure teal accent color is used purposefully, not excessively

