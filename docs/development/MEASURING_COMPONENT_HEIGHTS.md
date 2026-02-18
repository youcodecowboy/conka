# Loading placeholder heights (simple approach)

Placeholders for `dynamic()` imports use **min-height**, not fixed height.

- **Why min-height:** If the real section is taller, the page doesn’t jump. If it’s shorter, you get a bit of empty space. No measuring.
- **When to change:** If you refactor a section and the content clearly gets much taller or shorter, nudge the number in `app/page.tsx` (e.g. 1200 → 1400). No need to measure precisely.

That’s it.
