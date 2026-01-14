# WebSDK Cognitive Test Integration

**Created:** January 2026  
**Status:** In Progress  
**Feature Branch:** `websdk`

---

## Overview

Integrate the Cognica WebSDK cognitive test into the science page with:

- Email capture modal before test starts
- Iframe-based SDK rendering (short version only for now)
- Custom post-test results UI matching CONKA's neo-brutalist style
- Responsive design for desktop and mobile

**Implementation Strategy:** Each phase is split into Desktop (A) and Mobile (B) sub-phases. Complete Desktop first, then adapt for Mobile.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Science Page                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Hero Section                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            Cognitive Test Section (NEW)              │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │  Intro + "Start Test" Button                  │  │   │
│  │  │         ▼                                     │  │   │
│  │  │  Email Capture Modal (gate)                   │  │   │
│  │  │         ▼                                     │  │   │
│  │  │  WebSDK iframe (test runs)                    │  │   │
│  │  │         ▼                                     │  │   │
│  │  │  Custom Results UI                            │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 Rest of Page...                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
User clicks "Start Test"
        ▼
Email Capture Modal appears
        ▼
User submits email
        ▼
Email stored (state now, Convex later)
        ▼
WebSDK iframe loads with params:
  - shortVersion=true
  - websiteExperience=true
  - subjectId=website_{timestamp}
  - sex=prefer_not_to_say
  - yearOfBirth=2000
        ▼
User completes cognitive test
        ▼
SDK sends results via window.postMessage()
        ▼
Next.js receives message event
        ▼
Parse results: { score, accuracy, speed }
        ▼
Display custom Results UI
        ▼
Show product recommendations
```

### Expected Result Structure from SDK

```typescript
interface TestResult {
  score: number; // Overall cognitive score (0-100)
  accuracy: number; // Accuracy percentage (0-100)
  speed: number; // Speed percentage (0-100)
  testInstanceId?: string;
}
```

### PostMessage Listener Example

```typescript
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    // Validate origin if needed
    try {
      const data = JSON.parse(event.data);
      if (data.score !== undefined) {
        setTestResult({
          score: Math.round(data.score),
          accuracy: Math.round(data.accuracy),
          speed: Math.round(data.speed),
        });
        setTestState("results");
      }
    } catch (e) {
      // Not a JSON message, ignore
    }
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);
```

---

## Phases

### Phase 1A: Foundation and Email Capture (Desktop)

**Branch:** `websdk/phase-1a-desktop`

#### Tasks

- [ ] Create component folder structure (`app/components/cognitive-test/`)
- [ ] Create `types.ts` with TypeScript interfaces
- [ ] Create `index.ts` barrel exports
- [ ] Build `EmailCaptureModal.tsx` with neo-brutalist styling
- [ ] Build `CognitiveTestSection.tsx` for desktop
- [ ] Add section to `SciencePageDesktop.tsx` (after hero, before quote)
- [ ] Implement state machine: `idle` → `email` → `testing` → `results`

#### Components to Create

```
app/components/cognitive-test/
├── index.ts
├── types.ts
├── CognitiveTestSection.tsx    # Desktop version
└── EmailCaptureModal.tsx       # Shared (responsive)
```

#### Section Layout (Desktop)

```
┌─────────────────────────────────────────────────────────────────────┐
│  px-16 py-16                                                        │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  max-w-6xl mx-auto                                            │ │
│  │                                                                │ │
│  │  ┌─────────────────────────────────────────────────────────┐  │ │
│  │  │  grid lg:grid-cols-2 gap-12 items-center                │  │ │
│  │  │  ┌──────────────────┐  ┌──────────────────────────────┐ │  │ │
│  │  │  │  Text Content    │  │  Visual/CTA Box              │ │  │ │
│  │  │  │  - Label         │  │  neo-box                     │ │  │ │
│  │  │  │  - Heading       │  │  - Icon/illustration         │ │  │ │
│  │  │  │  - Description   │  │  - "Start Test" button       │ │  │ │
│  │  │  │  - Benefits list │  │  - "~2 minutes" note         │ │  │ │
│  │  │  └──────────────────┘  └──────────────────────────────┘ │  │ │
│  │  └─────────────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

#### EmailCaptureModal Requirements

- Fixed overlay with semi-transparent black backdrop (`bg-black/50`)
- Centered `neo-box` container (sharp corners, white bg)
- Close button (X) in top-right corner
- Heading: "Before You Begin" (Poppins bold)
- Subtext: "we'll send you a detailed breakdown of your results" (font-commentary)
- Email input field (`border-2 border-current`)
- Checkbox: "I agree to receive my results via email"
- Submit button (`neo-button`)
- Escape key closes modal

#### Copy/Content

**Section Heading:** "Test Your Cognitive Performance"
**Section Subtext:** "measure what matters" (font-commentary)
**Description:** "Take our 2-minute cognitive assessment powered by Cognetivity. Discover your baseline scores for speed, accuracy, and overall cognitive function."
**Benefits:**

- Clinically-validated assessment
- Instant results
- Personalized recommendations

**CTA Button:** "Start Free Test"
**Time Note:** "~2 minutes • No app required"

#### Acceptance Criteria (Desktop)

- [ ] Component folder structure created
- [ ] Types exported correctly
- [ ] Section visible on desktop science page (after hero)
- [ ] Section matches neo-brutalist style guide
- [ ] "Start Free Test" button opens email modal
- [ ] Modal has proper backdrop overlay
- [ ] Modal centered on screen
- [ ] Email validation works (required + valid format)
- [ ] Consent checkbox required for submission
- [ ] Submit stores email in component state
- [ ] Modal closes on submit → transitions to "testing" state
- [ ] Modal closes on X click or Escape key
- [ ] No TypeScript errors
- [ ] No console errors

---

### Phase 1B: Foundation and Email Capture (Mobile)

**Branch:** `websdk/phase-1b-mobile`

#### Tasks

- [ ] Create `CognitiveTestSectionMobile.tsx`
- [ ] Add section to `SciencePageMobile.tsx` (after hero)
- [ ] Ensure modal works on mobile viewports
- [ ] Test touch interactions

#### Mobile Considerations

- Single column layout
- Full-width CTA button
- Modal takes more screen real estate
- Larger touch targets for inputs/buttons
- Consider keyboard behavior with input focus

#### Acceptance Criteria (Mobile)

- [ ] Section visible on mobile science page
- [ ] Layout adapts to mobile viewport
- [ ] Modal usable on small screens
- [ ] Touch interactions work smoothly
- [ ] Keyboard doesn't obscure inputs

---

### Phase 2A: WebSDK Integration (Desktop)

**Branch:** `websdk/phase-2a-desktop`

#### Tasks

- [ ] Create `CognicaSDK.tsx` iframe wrapper
- [ ] Implement postMessage listener for results
- [ ] Add loading state with animation
- [ ] Handle SDK load errors
- [ ] Test on desktop browsers (Chrome, Safari, Firefox)

#### CognicaSDK Component

```typescript
export default function CognicaSDK({
  onComplete,
}: {
  onComplete: (result: TestResult) => void;
}) {
  const sdkUrl =
    "https://conkasdkdev.cognetivity.com/?" +
    new URLSearchParams({
      shortVersion: "true",
      websiteExperience: "true",
      subjectId: `website_${Date.now()}`,
      sex: "prefer_not_to_say",
      yearOfBirth: "2000",
    }).toString();

  return (
    <iframe
      src={sdkUrl}
      title="Cognitive Assessment"
      width="100%"
      height="600"
      style={{
        border: "none",
        borderRadius: "0", // neo-brutalist: sharp corners
      }}
      allow="fullscreen"
    />
  );
}
```

#### Desktop Iframe Sizing

- Width: 100% of container (max-w-4xl)
- Height: 600px
- No border radius (neo-brutalist)
- 2px border via neo-box wrapper

#### Acceptance Criteria (Desktop)

- [ ] SDK iframe loads after email submission
- [ ] Loading state shows while SDK initializes
- [ ] Test can be completed successfully
- [ ] Results captured via postMessage
- [ ] Works on Chrome, Safari, Firefox (desktop)

---

### Phase 2B: WebSDK Integration (Mobile)

**Branch:** `websdk/phase-2b-mobile`

#### Tasks

- [ ] Test iframe rendering on mobile viewports
- [ ] Adjust height/width for mobile
- [ ] Verify touch interactions work properly
- [ ] Test on mobile Safari and Chrome

#### Mobile Iframe Sizing

- Width: 100%
- Height: 500px or 80vh (whichever fits better)
- May need full-screen mode consideration

#### Acceptance Criteria (Mobile)

- [ ] SDK iframe renders correctly on mobile
- [ ] Touch interactions work
- [ ] Test can be completed on mobile Safari
- [ ] Test can be completed on mobile Chrome

---

### Phase 3A: Custom Results UI (Desktop)

**Branch:** `websdk/phase-3a-desktop`

#### Tasks

- [ ] Create `TestResultsDisplay.tsx`
- [ ] Design score visualization (large number display)
- [ ] Add accuracy/speed secondary metrics
- [ ] Add score interpretation text
- [ ] Build product recommendation section
- [ ] Add "Retake Test" option
- [ ] Add CTAs to products/quiz

#### Results UI Layout (Desktop)

```
┌─────────────────────────────────────────────────────────────────────┐
│  YOUR COGNITIVE SCORE                                               │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  grid lg:grid-cols-3 gap-8                                    │ │
│  │  ┌──────────────────┐ ┌──────────────┐ ┌──────────────┐      │ │
│  │  │  TOTAL SCORE     │ │  ACCURACY    │ │  SPEED       │      │ │
│  │  │      78          │ │     82%      │ │     74%      │      │ │
│  │  │  out of 100      │ │              │ │              │      │ │
│  │  └──────────────────┘ └──────────────┘ └──────────────┘      │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  What This Means                                                    │
│  [Interpretation based on score tier]                               │
│                                                                     │
│  How CONKA Can Help                                                 │
│  [Product recommendations with links]                               │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────────────┐                  │
│  │  Retake Test    │  │  Explore Products       │                  │
│  └─────────────────┘  └─────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
```

#### Score Interpretation Tiers

| Score Range | Label        | Interpretation                                                                                   |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------ |
| 85-100      | Excellent    | "Your cognitive performance is excellent. You're operating at peak mental capacity."             |
| 70-84       | Good         | "Your cognitive performance is good. There's room to optimise your mental edge."                 |
| 55-69       | Average      | "Your cognitive performance is average. Targeted support could unlock significant improvements." |
| Below 55    | Room to Grow | "Your results suggest significant opportunity for cognitive enhancement."                        |

#### Product Recommendations (from BRAND_HIGHLIGHTS.md)

- **All scores**: "Our formulas are clinically shown to improve cognitive function"
- **Lower accuracy (<70%)**: Emphasize CONKA Clarity - "+16% cognition, +14% attention" (Ginkgo, Alpha GPC)
- **Lower speed (<70%)**: Emphasize CONKA Flow - "+18% memory performance, +17% physical fitness" (Rhodiola, Turmeric)
- **Link**: "Not sure which is right for you? Take our quiz →"

#### Acceptance Criteria (Desktop)

- [ ] Results display immediately after test completion
- [ ] Score, accuracy, speed all shown with large numbers
- [ ] Correct interpretation text for score range
- [ ] Product recommendations with real stats from BRAND_HIGHLIGHTS.md
- [ ] "Retake Test" resets to idle state
- [ ] Product CTAs link correctly
- [ ] Styling matches neo-brutalist brand

---

### Phase 3B: Custom Results UI (Mobile)

**Branch:** `websdk/phase-3b-mobile`

#### Tasks

- [ ] Create mobile-optimized results layout
- [ ] Stack metrics vertically
- [ ] Ensure CTAs are thumb-friendly
- [ ] Test scroll behavior with long interpretation text

#### Acceptance Criteria (Mobile)

- [ ] Results display properly on mobile
- [ ] Single column layout
- [ ] Large, tappable CTAs
- [ ] No horizontal overflow

---

### Phase 4A: Polish (Desktop)

**Branch:** `websdk/phase-4a-desktop`

#### Tasks

- [ ] Add smooth transitions between states (fade/slide)
- [ ] Implement loading animation during SDK init
- [ ] Add number count-up animations for scores
- [ ] Add error boundary and fallback UI
- [ ] Performance audit
- [ ] Cross-browser testing

#### Animations

- State transitions: `transition-opacity duration-300`
- Score reveal: count-up from 0 (1s duration)
- Loading: subtle pulse animation

#### Acceptance Criteria (Desktop)

- [ ] Smooth, polished transitions
- [ ] Error states handled gracefully
- [ ] Performance: < 3s to interactive
- [ ] Works on Chrome, Safari, Firefox, Edge

---

### Phase 4B: Polish (Mobile)

**Branch:** `websdk/phase-4b-mobile`

#### Tasks

- [ ] Optimize animations for mobile performance
- [ ] Test full-screen experience option
- [ ] Final cross-device testing
- [ ] Performance audit on mobile

#### Acceptance Criteria (Mobile)

- [ ] Animations smooth (60fps)
- [ ] No janky scrolling
- [ ] Works on iOS Safari, Chrome
- [ ] Works on Android Chrome

---

### Phase 5: Convex Integration (Future)

**Branch:** `websdk/phase-5-convex`

_Dependent on dev setting up Convex backend_

#### Tasks

- [ ] Create Convex schema for test submissions
- [ ] Store email + test results in Convex
- [ ] Trigger email with results breakdown
- [ ] Add analytics events

---

## File Structure (Final)

```
app/components/cognitive-test/
├── index.ts                      # Barrel exports
├── types.ts                      # TypeScript interfaces
├── CognitiveTestSection.tsx      # Desktop version
├── CognitiveTestSectionMobile.tsx # Mobile version
├── EmailCaptureModal.tsx         # Shared modal (responsive)
├── CognicaSDK.tsx                # Iframe wrapper
├── TestResultsDisplay.tsx        # Desktop results
├── TestResultsDisplayMobile.tsx  # Mobile results
├── TestLoadingState.tsx          # Loading animation
└── ScoreInterpretation.tsx       # Score meaning + recommendations
```

---

## Style Guide Reference

All components must follow `STYLE_GUIDE_01.md`:

### Typography

| Element             | Font          | Class                                                        |
| ------------------- | ------------- | ------------------------------------------------------------ |
| Section label       | IBM Plex Mono | `font-clinical text-xs uppercase tracking-widest opacity-50` |
| Headings            | Poppins Bold  | `text-3xl lg:text-4xl font-bold`                             |
| Subtext/Annotations | Caveat        | `font-commentary text-xl`                                    |
| Scores/Data         | IBM Plex Mono | `font-clinical text-6xl font-bold`                           |
| Body text           | Poppins       | `text-base opacity-80`                                       |

### Components

| Element                 | Class                | Notes                     |
| ----------------------- | -------------------- | ------------------------- |
| Containers              | `neo-box`            | Sharp corners, 2px border |
| Primary buttons         | `neo-button`         | Pill-shaped, filled       |
| Secondary buttons       | `neo-button-outline` | Pill-shaped, outline      |
| Desktop section padding | `px-16 py-16`        | Standard desktop spacing  |
| Mobile section padding  | `px-4 py-8`          | Standard mobile spacing   |
| Max width               | `max-w-6xl mx-auto`  | Content container         |

### Colors

- Background: `var(--background)` (white)
- Foreground: `var(--foreground)` (black)
- CONKA Flow accent: `bg-teal-500` / `text-teal-500`
- CONKA Clarity accent: `bg-amber-500` / `text-amber-500`

---

## Branch Strategy

```
main
└── websdk (feature branch - DO NOT merge to main until complete)
    ├── websdk/phase-1a-desktop
    │   └── merge → websdk
    ├── websdk/phase-1b-mobile
    │   └── merge → websdk
    ├── websdk/phase-2a-desktop
    │   └── merge → websdk
    ├── websdk/phase-2b-mobile
    │   └── merge → websdk
    ├── websdk/phase-3a-desktop
    │   └── merge → websdk
    ├── websdk/phase-3b-mobile
    │   └── merge → websdk
    ├── websdk/phase-4a-desktop
    │   └── merge → websdk
    └── websdk/phase-4b-mobile
        └── merge → websdk
            └── (finally) merge → main
```

---

## Testing Checklist

### Desktop

- [ ] Email validation rejects invalid emails
- [ ] Email modal opens/closes correctly
- [ ] SDK iframe loads without console errors
- [ ] Test can be completed
- [ ] Results captured correctly
- [ ] Results display all three metrics
- [ ] Product recommendations show with correct stats
- [ ] Retake test works
- [ ] All CTAs navigate correctly
- [ ] Matches neo-brutalist style guide
- [ ] Correct fonts throughout
- [ ] No TypeScript errors

### Mobile

- [ ] Section renders correctly on mobile
- [ ] Modal usable on small screens
- [ ] SDK iframe works on mobile
- [ ] Touch interactions smooth
- [ ] Results display properly
- [ ] CTAs thumb-friendly
- [ ] No horizontal overflow
- [ ] Animations smooth (60fps)

### Performance

- [ ] Section loads in < 2s
- [ ] SDK iframe loads in < 3s
- [ ] No memory leaks on repeated tests
- [ ] Bundle size impact acceptable

---

## Questions / Decisions Log

| Question                     | Decision                                         | Date     |
| ---------------------------- | ------------------------------------------------ | -------- |
| Where to place test section? | After hero, before quote                         | Jan 2026 |
| Email flow?                  | Modal gate on "Start Test" click                 | Jan 2026 |
| Results UI approach?         | Custom Next.js via postMessage                   | Jan 2026 |
| Short vs long test?          | Short only for now, long later                   | Jan 2026 |
| Backend for email storage?   | Convex (Phase 5, after dev setup)                | Jan 2026 |
| Desktop vs Mobile?           | Split each phase into A (desktop) and B (mobile) | Jan 2026 |

---

## Notes

- The SDK URL is the **dev** endpoint: `https://conkasdkdev.cognetivity.com/`
- Production URL will need to be configured via environment variable
- The SDK already handles the test flow internally; we just embed and listen for results
- Mobile webview compatibility needs testing - the SDK may need adjustments
- All clinical stats in recommendations must come from `BRAND_HIGHLIGHTS.md`
