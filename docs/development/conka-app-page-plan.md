# CONKA App Page — High Level Plan

**URL:** `/app`  
**Status:** Planning  
**Goal:** Educate visitors on the app, establish credibility, drive downloads  
**Emotional arc:** Curiosity → Credibility → Desire → Download

---

## Positioning Principles

### On the test (Cognica)
Never claim to have built it. Never mention Cognetivity by name. Let the test's credentials stand on their own.
Safe language patterns:
- "Powered by clinically validated cognitive science"
- "The test behind CONKA has been used in clinical dementia screening"
- "Developed from Cambridge University research"
- "FDA cleared cognitive assessment technology"
- "The same test used by leading research institutions"

This is honest, defensible, and doesn't require drawing a corporate line.

### On the app overall
Position it as the thing that makes CONKA different from every other supplement brand. 
Core claim: **"The only supplement you can measure working."**
The app isn't a loyalty scheme or a tracker. It's proof infrastructure.

---

## Page Flow

### Section 1 — Hero
**Purpose:** Immediate wow factor. Different feel from rest of site.  
**Design:** Full-width dark section. Large headline. Sticky/fixed phone mockup enters here.  
**Content:**
- Headline: "The only supplement you can measure working."
- Subheadline: One sentence on what the app is — cognitive testing, wellness tracking, measurable progress
- App store badges (iOS + Android)
- Device mockup showing home screen or test UI

**Assets needed:** Clean hero screenshot of app home or test screen

---

### Section 2 — The Test
**Purpose:** Establish the credibility anchor. This is what no other brand has.  
**Design:** Sticky phone transitions to show test UI. Copy scrolls on the right.  
**Content:**
- "Not a quiz. Not a questionnaire."
- Clinical origin — Cambridge University research, FDA cleared for cognitive screening
- Key differentiators:
  - Can't be gamed — no improvement from practice alone
  - No language, numeracy, or cultural bias — image-based only
  - 3 minutes. Objective. Repeatable.
- Supporting line: "Used in clinical research to assess cognitive function — now in your pocket."

**Assets needed:** Screenshot of test running (animal images), ideally a short video/GIF

---

### Section 3 — What You Track
**Purpose:** Show the practical daily value. Connect wellness inputs to cognitive output.  
**Design:** Phone shows wellness check-in or results breakdown. Animated or static.  
**Content:**
- "Understand what's affecting your brain today."
- Wellness factors: sleep, caffeine, alcohol, stress, training load, hydration
- Your score is mapped against your inputs — you see the relationship over time
- Personalised, actionable advice after every test

**Assets needed:** Screenshot of wellness input screen + results/breakdown screen

---

### Section 4 — Track Your Progress
**Purpose:** Show the longitudinal value. This is the thing that keeps people coming back.  
**Design:** Phone shows the time series graph. This is a hero asset — the graph component is impressive.  
**Content:**
- "See your brain improve over 30 days."
- Clinical data: up to 16% improvement in cognitive performance following the recommended plan
- The graph can't lie — you're either improving or you're not
- Pairs with CONKA formulas to show what's working

**Assets needed:** Screenshot of the graph/progress screen with real data if possible

---

### Section 5 — Compete and Connect
**Purpose:** Social and fun layer. Lightens tone after science sections.  
**Design:** Split layout or phone showing leaderboard. Energetic feel.  
**Content:**
- Global leaderboard — see how you stack up
- Benchmark against professional athletes across football, F1, rugby, ultra running
- Add friends, challenge them, nudge them
- "Your brain is competitive. Now you can prove it."

**Assets needed:** Screenshot of leaderboard screen

---

### Section 6 — CONKA Subscribers
**Purpose:** Connect app back to product. Reward loop for paying customers.  
**Design:** Simple feature callout. Could be a banner or card.  
**Content:**
- Exclusive merch rewards for CONKA subscribers
- Token system — earn by testing consistently
- "The more you test, the more you earn."

**Assets needed:** Merch/reward visual if available

---

### Section 7 — Download
**Purpose:** Final conversion. Clean and simple.  
**Design:** Centred, light background, contrasts with dark sections above.  
**Content:**
- "Start measuring your brain today. It's free."
- iOS + Android badges
- Optional: QR code for desktop visitors
- Reassurance: Free to use. No subscription required to access core features.

---

## Design Direction

### Sticky Phone Mechanic
The phone mockup enters in Section 1 and stays fixed (CSS `position: sticky`) in the center or right of the viewport while the left-side copy scrolls through Sections 2–5. Each scroll threshold swaps the screenshot inside the phone, revealing a new screen. On mobile this collapses to a standard stacked layout.

This is achievable with:
- IntersectionObserver to detect which section is active
- State-driven image swap inside the phone frame
- CSS sticky positioning — no scroll-jacking required
- Smooth crossfade transition between screens

### Visual Tone
- Sections 1–5: Dark backgrounds (black or deep navy) — signals different product category from the main site
- Section 6–7: Lighter — brings it back to CONKA brand feel
- Typography: Large, confident, minimal. Let the credentials do the work.
- No ingredient lists. No feature tables in the hero sections.

### Mobile
- Sticky phone collapses — each section gets its own screenshot inline
- Sections stack vertically
- App store badges prominent throughout

---

## Assets Checklist

| Asset | Section | Notes |
|-------|---------|-------|
| App home screen screenshot | Hero | Clean, high-res |
| Cognica test screenshot | Section 2 | Animal images visible |
| Test video / GIF | Section 2 | People doing test on iPad if available |
| Wellness input screen | Section 3 | |
| Results / breakdown screen | Section 3 | With real data if possible |
| Progress graph screen | Section 4 | Real data preferred — shows credibility |
| Leaderboard screen | Section 5 | |
| Merch / rewards visual | Section 6 | Optional |
| QR code | Section 7 | Auto-generate |

---

## Next Steps

1. Lock copy for each section headline + subheadline
2. Gather and prepare assets (screenshots, video/GIF)
3. Build sticky phone component first — this is the structural foundation
4. Build sections 1–7 around it
5. Mobile responsive pass
6. Wire into navigation and landing page section
