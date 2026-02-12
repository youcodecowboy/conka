# Cross-sell component

Reusable section for protocol and formula PDPs: “Explore other protocols” or “Want the complete experience?” with protocol cards and formulas showcase.

## Location

`app/components/crossSell/` — `CrossSell.tsx` (wrapper), `CrossSellDesktop.tsx`, `CrossSellMobile.tsx`, `types.ts`, `index.ts`.

## Usage

**Protocol page:** show other protocols + quiz CTA + formulas showcase.

```tsx
<CrossSell variant="protocol" currentProtocolId={protocolId} />
```

**Formula page:** show other formula CTA + all protocol cards + formulas showcase.

```tsx
<CrossSell variant="formula" currentFormulaId="01" />  // or "02"
```

## Behaviour

- **Wrapper** uses `useIsMobile(1024)` and renders `CrossSellDesktop` or `CrossSellMobile`.
- **Protocol variant:** heading “Explore Other Protocols”, subline “find your perfect match”, **Take the Quiz** button (link to `/quiz`), grid/carousel of other protocol cards (`ProtocolCard` / `ProtocolCardMobile`), then `FormulasShowcase` / `FormulasShowcaseMobile`.
- **Formula variant:** heading “Want the Complete Experience?”, product-specific subline, CTA to the other formula (Flow ↔ Clear), grid/carousel of all four protocol cards, then formulas showcase.
- Protocol IDs and copy live in the component; formula “other” mapping and links (`/conka-flow`, `/conka-clarity`) are internal.

## Dependencies

Uses `protocolSelectorData`, `ProtocolCard`, `ProtocolCardMobile`, `FormulasShowcase`, `FormulasShowcaseMobile`. `VALID_PROTOCOL_IDS` is in `types.ts`.
