# CONKA Style Guide 02 – Premium Base

**Version:** 1.0  
**Status:** Foundation (Phase 1)  
**Use with:** Individual PDP refactor; see [PDP_PREMIUM_REFACTOR_PLAN.md](docs/development/PDP_PREMIUM_REFACTOR_PLAN.md)

---

## 1. Purpose and scope

Premium Base is a **token-based layer** that signals trust, calm authority, and restraint. It is **additive**: it does not replace Style Guide 01. It reduces visual noise (fewer borders, one shape language, a small spacing vocabulary) and locks typography to **roles** instead of ad-hoc sizes.

**When to use**

- Individual product page (conka-flow, conka-clarity)
- Protocol product page (`/protocol/[id]`)
- Purchase column and product hero on those pages
- Any new PDP section built for the Phase 2 flow

**When not to use**

- Navigation, footer, homepage, shop, quiz, science, other pages
- Other protocol surfaces (e.g. professionals flow) until explicitly migrated; those stay on Style Guide 01

---

## 2. Token set (reference)

Values live in `app/premium-base.css`. This section describes what each token is for.

### Spacing scale (5 steps + section)

| Token role | Use case |
|------------|----------|
| XS | Inline gaps (e.g. between icon and label) |
| S | Between related items (e.g. label + value) |
| M | Between blocks (e.g. paragraphs, cards in a row) |
| L | Between sections |
| XL | Between major page moments |
| Section | Default vertical and horizontal padding for a section (page rhythm) |

Use only these. No one-off values (e.g. no `gap-10` or `py-20` unless they map to a token).

### Radius scale (2 values)

| Token | Use |
|-------|-----|
| Base | Containers, cards, content boxes. Slightly rounded; no sharp corners. |
| Interactive | Buttons, inputs, controls. More rounded; can remain pill-shaped. |

Do not mix 0 radius and 9999px everywhere. One base, one interactive.

### Typography roles (5)

| Role | Font | Use | Rule |
|------|------|-----|------|
| Display | Primary (Poppins) | Hero headline only. Rare. | Do not use for section titles. |
| Heading | Primary (Poppins) | Section titles. | One size/weight for all section headings. |
| Body | Primary (Poppins) | Default copy. | 90% of text. |
| Data | Clinical (IBM Plex Mono) | Stats, labels, technical. | Numbers, small labels, references. |
| Annotation | Commentary (Caveat) | Subtext, short quotes, occasional. | Not for body copy. |

**Rule:** If you cannot name the role (Display / Heading / Body / Data / Annotation), do not introduce a new size. Pick the closest role.

### Layout

- **Section padding:** One vertical value, one horizontal value. Default rhythm for every section so most pages need no custom layout.
- **Container max-width:** One value. Content width for PDP content area.

### PDP Hero

- **Layout:** PDP hero uses `.premium-hero-layout`: two columns on desktop (media left, stack right), one column on mobile. Left column (media) is sticky; right column is a single vertical stack with one gap between all blocks (from `--premium-hero-stack-gap-*`).
- **Stack order:** Title → immediate proof (stars + one short line, e.g. “X+ satisfied customers”) → subline (dose/format) → description/benefits → variant/options → price and CTA. One gap between each block.
- **Type roles:** Title = Display; social proof line and subline = Data (or Body small); description = Body; labels = Data.
- **Corners:** Hero content container uses `premium-radius-base` (no 0 radius).
- **Step 1 (immediate proof):** When used, Step 1 is rendered **inside** the hero right column, directly under the title (stars + one line). It is not a separate full-width section.
- **Don’t:** Use a full-width colored title bar (neo-brutalist header strip) in the hero; use a simple heading with Display role. Don’t introduce ad-hoc margins or gaps in the hero stack; use only the hero stack gap tokens. Don’t use 0 radius on hero containers.

---

## 3. Borders

Use borders **sparingly**. Let spacing and typography create hierarchy.

- One default border width and one border color (can alias `--foreground` with opacity).
- Use borders for: grouping related content, or marking an interactive boundary. Not for every box.

---

## 4. Don’t use rules

- **CTAs:** Do not stack more than 2 primary CTAs in a single block.
- **Annotation:** Do not use Annotation (Caveat) for body copy or long paragraphs.
- **Accent colour:** Do not use accent colours (teal, amber) for paragraph text.
- **Mixing systems:** Do not mix premium and neo-brutalist in the same section (e.g. no `neo-box` + `premium-section` on the same container).
- **Spacing:** Do not add new spacing values outside the defined scale.

---

### Surface colour

| Token | Value | Use |
|-------|-------|-----|
| `--color-surface` | #f4f6f5 | Subtle grey for panels, selector backgrounds, card fills. Aliased as `--premium-surface` in premium-base.css. Use for light, non-white surfaces that need gentle separation from page background. |

---

## 5. Relationship to Style Guide 01

- **Colours:** Same. Use `--background`, `--foreground`, `--color-surface`, and formula colours (teal, amber).
- **Fonts:** Same. Poppins, Caveat, IBM Plex Mono. SG02 only assigns them to roles and defines sizes/weights for those roles.
- **Components:** Buttons, cards, and other UI components remain defined in Style Guide 01 until we evolve them. Premium Base is tokens and semantic layout/type classes only.

Premium is an evolution: same palette and typefaces, tighter spacing vocabulary, one shape language, and role-based typography.
