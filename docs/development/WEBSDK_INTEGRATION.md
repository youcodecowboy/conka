# WebSDK Cognitive Test Integration

**Created:** January 2026  
**Status:** In Progress  
**Feature Branch:** `websdk`

---

## Overview

Integrate the Cognica WebSDK cognitive test into the science page with:
- Email capture modal before test starts
- Iframe-based SDK rendering (short version only for now)
- Custom post-test results UI matching Conka's neo-brutalist style
- Responsive design for desktop and mobile

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
  score: number;      // Overall cognitive score (0-100)
  accuracy: number;   // Accuracy percentage (0-100)
  speed: number;      // Speed percentage (0-100)
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
        setTestState('results');
      }
    } catch (e) {
      // Not a JSON message, ignore
    }
  };

  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);
```

---

## Phases

### Phase 1: Foundation and Email Capture

**Branch:** `websdk/phase-1-foundation`

#### Tasks

- [ ] Create component folder structure
- [ ] Build `EmailCaptureModal.tsx` with neo-brutalist styling
- [ ] Build `CognitiveTestSection.tsx` shell component
- [ ] Add test section to `SciencePageDesktop.tsx` (after hero)
- [ ] Add test section to `SciencePageMobile.tsx` (after hero)
- [ ] Implement state machine: `idle` → `email` → `testing` → `results`

#### Components to Create

```
app/components/cognitive-test/
├── index.ts
├── types.ts
├── CognitiveTestSection.tsx
└── EmailCaptureModal.tsx
```

#### EmailCaptureModal Requirements

- Modal overlay with backdrop
- Neo-box styled container
- Email input field with validation
- Checkbox: "I agree to receive my results via email"
- Submit button (neo-button style)
- Close/cancel option
- Copy: "We'll send you a detailed breakdown of your cognitive performance"

#### Acceptance Criteria

- [ ] Section visible on science page (desktop & mobile)
- [ ] "Start Test" button opens email modal
- [ ] Email validation works (required, valid format)
- [ ] Submit stores email in component state
- [ ] Modal closes and transitions to "testing" state

---

### Phase 2: WebSDK Integration

**Branch:** `websdk/phase-2-sdk-integration`

#### Tasks

- [ ] Create `CognicaSDK.tsx` iframe wrapper
- [ ] Implement postMessage listener for results
- [ ] Add loading state with animation
- [ ] Handle SDK load errors
- [ ] Test mobile iframe rendering
- [ ] Verify touch interactions work on mobile

#### CognicaSDK Component

```typescript
export default function CognicaSDK({ onComplete }: { onComplete: (result: TestResult) => void }) {
  const sdkUrl = "https://conkasdkdev.cognetivity.com/?" +
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

#### Iframe Sizing

| Viewport | Width | Height |
|----------|-------|--------|
| Desktop | 100% (max-w-4xl) | 600px |
| Mobile | 100% | 500px or 80vh |

#### Acceptance Criteria

- [ ] SDK iframe loads after email submission
- [ ] Loading animation shows while SDK initializes
- [ ] Test can be completed successfully
- [ ] Results captured via postMessage
- [ ] Works on desktop Chrome, Safari, Firefox
- [ ] Works on mobile Safari, Chrome

---

### Phase 3: Custom Results UI

**Branch:** `websdk/phase-3-results-ui`

#### Tasks

- [ ] Create `TestResultsDisplay.tsx`
- [ ] Design score visualization (large number, progress bars)
- [ ] Add score interpretation text
- [ ] Build product recommendation section
- [ ] Add "Retake Test" option
- [ ] Add CTAs to products/quiz

#### Components to Create

```
app/components/cognitive-test/
├── ... (existing)
├── TestResultsDisplay.tsx
└── ScoreInterpretation.tsx
```

#### Results UI Layout

```
┌─────────────────────────────────────────────┐
│  YOUR COGNITIVE SCORE                       │
│  ┌─────────────────────────────────────┐   │
│  │           78                         │   │  ← Large, font-clinical
│  │        out of 100                    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌──────────────┐  ┌──────────────┐        │
│  │ Accuracy     │  │ Speed        │        │
│  │    82%       │  │    74%       │        │
│  └──────────────┘  └──────────────┘        │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  What This Means                            │
│  Your score indicates [interpretation]...   │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  How Conka Can Help                         │
│  [Product recommendations based on score]   │
│                                             │
│  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Retake Test │  │ Explore Products    │  │
│  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────┘
```

#### Score Interpretation Tiers

| Score Range | Interpretation |
|-------------|----------------|
| 85-100 | Excellent cognitive performance |
| 70-84 | Good cognitive performance |
| 55-69 | Average cognitive performance |
| Below 55 | Room for improvement |

#### Product Recommendations

- **All scores**: Mention both formulas improve cognitive performance
- **Lower accuracy**: Emphasize Conka Clarity for mental clarity
- **Lower speed**: Emphasize Conka Flow for focus and quick thinking
- **Link to quiz**: "Not sure which is right for you? Take our quiz"

#### Acceptance Criteria

- [ ] Results display immediately after test completion
- [ ] Score, accuracy, speed all shown
- [ ] Interpretation text matches score range
- [ ] Product recommendations relevant
- [ ] CTAs functional
- [ ] Styling matches brand (neo-brutalist, correct fonts)

---

### Phase 4: Polish and Mobile Optimization

**Branch:** `websdk/phase-4-polish`

#### Tasks

- [ ] Add smooth transitions between states
- [ ] Implement loading animation (breathing/focus)
- [ ] Add number count-up animations for scores
- [ ] Optimize mobile full-screen experience
- [ ] Add error boundary and fallback UI
- [ ] Performance audit and optimization
- [ ] Cross-browser testing

#### Animations

- State transitions: fade/slide (300ms ease)
- Score reveal: count-up from 0 (1s duration)
- Loading: subtle pulse or breathing animation

#### Error Handling

- SDK fails to load → Show retry button with message
- Test interrupted → Option to restart
- postMessage timeout → Fallback message

#### Acceptance Criteria

- [ ] Smooth, polished feel
- [ ] No janky transitions
- [ ] Error states handled gracefully
- [ ] Performance: < 3s to interactive
- [ ] Works across all target browsers

---

### Phase 5: Convex Integration (Future)

**Branch:** `websdk/phase-5-convex`

*Dependent on dev setting up Convex backend*

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
├── CognitiveTestSection.tsx      # Main wrapper (desktop)
├── CognitiveTestSectionMobile.tsx # Mobile variant (if needed)
├── EmailCaptureModal.tsx         # Email gate modal
├── CognicaSDK.tsx                # Iframe wrapper
├── TestResultsDisplay.tsx        # Results UI
├── TestLoadingState.tsx          # Loading animation
└── ScoreInterpretation.tsx       # Score meaning + recommendations
```

---

## Style Guide Reference

All components must follow `STYLE_GUIDE_01.md`:

### Typography

| Element | Font | Class |
|---------|------|-------|
| Headings | Poppins Bold | `font-bold` |
| Annotations | Caveat | `font-commentary` |
| Scores/Data | IBM Plex Mono | `font-clinical` |

### Components

| Element | Class | Notes |
|---------|-------|-------|
| Containers | `neo-box` | Sharp corners, 2px border |
| Primary buttons | `neo-button` | Pill-shaped, filled |
| Secondary buttons | `neo-button-outline` | Pill-shaped, outline |
| Section padding | `px-6 md:px-16 py-24` | Standard spacing |

### Colors

- Background: `var(--background)` (white)
- Foreground: `var(--foreground)` (black)
- Conka Flow accent: `bg-teal-500`
- Conka Clarity accent: `bg-amber-500`

---

## Branch Strategy

```
main
└── websdk (feature branch - DO NOT merge to main until complete)
    ├── websdk/phase-1-foundation
    │   └── merge → websdk
    ├── websdk/phase-2-sdk-integration
    │   └── merge → websdk
    ├── websdk/phase-3-results-ui
    │   └── merge → websdk
    └── websdk/phase-4-polish
        └── merge → websdk
            └── (finally) merge → main
```

---

## Testing Checklist

### Functional

- [ ] Email validation rejects invalid emails
- [ ] Email modal opens/closes correctly
- [ ] SDK iframe loads without console errors
- [ ] Test can be completed on desktop
- [ ] Test can be completed on mobile
- [ ] Results captured correctly
- [ ] Results display all three metrics
- [ ] Product recommendations show
- [ ] Retake test works
- [ ] All CTAs navigate correctly

### Visual

- [ ] Matches neo-brutalist style guide
- [ ] Correct fonts used throughout
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] No overflow or clipping issues
- [ ] Animations smooth (60fps)

### Performance

- [ ] Section loads in < 2s
- [ ] SDK iframe loads in < 3s
- [ ] No memory leaks on repeated tests
- [ ] Bundle size impact acceptable

---

## Questions / Decisions Log

| Question | Decision | Date |
|----------|----------|------|
| Where to place test section? | After hero, before quote | Jan 2026 |
| Email flow? | Modal gate on "Start Test" click | Jan 2026 |
| Results UI approach? | Custom Next.js via postMessage | Jan 2026 |
| Short vs long test? | Short only for now, long later | Jan 2026 |
| Backend for email storage? | Convex (Phase 5, after dev setup) | Jan 2026 |

---

## Notes

- The SDK URL is the **dev** endpoint: `https://conkasdkdev.cognetivity.com/`
- Production URL will need to be configured via environment variable
- The SDK already handles the test flow internally; we just embed and listen for results
- Mobile webview compatibility needs testing - the SDK may need adjustments

