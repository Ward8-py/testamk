# AMK quote-first style lock

## Direction

- Mood: premium, calm, assured London residential construction.
- Macrostructure: Gallery Grid with a photographic/video fold.
- Narrative: Hook (hero) -> Proof (stat strip) -> Solution (service rail) -> Evidence (Project X/Y/Z) -> Delivery (three steps) -> Social proof -> Close.
- Intentional rule-break: the project cards use asymmetric editorial proportions rather than a uniform card grid.
- Section separation: generous fixed vertical spacing with restrained hairline rules; no alternating decorative effects.

## Color contract

- Page: `#ffffff`
- Surface: `#ffffff`
- Panel: `#f5f5f3`
- Ink: `#11110f`
- Text: `#373733`
- Muted: `#68675f`
- Border: ink at 12%
- Dark media scrim: black at 42-74%, only where white text needs contrast.
- Primary action: ink fill with white text.
- WhatsApp: use the established WhatsApp green only on the WhatsApp action.
- Do not add color gradients, glass, glows, pill eyebrows, or ornamental color washes.

## Typography

- Display: Cormorant Garamond, roman, weight 500-600.
- Body and controls: Outfit, weight 400-700.
- Hero: `clamp(3rem, 8vw, 7.5rem)`, minimum line-height 0.98.
- Section headings: `clamp(2.4rem, 5vw, 4.75rem)`, line-height 1.
- Mobile body and form controls: 16px minimum.
- No decorative italics in headings; hierarchy comes from scale, weight, and composition.

## Shape and elevation

- Cards and panels: sharp corners.
- In-flow surfaces: hairline borders, no diffuse shadows.
- Dialog and mobile sheet: one restrained overlay shadow.
- Buttons: full-radius pills for labelled actions and circles for icon-only controls, 52px minimum height; mobile targets at least 44px.
- Cards, form fields, image frames, and structural panels retain sharp corners.

## Motion

- Feel: quick and restrained.
- Curves: `--ease-out: cubic-bezier(0.23,1,0.32,1)`, `--ease-drawer: cubic-bezier(0.32,0.72,0,1)`.
- Press: 120ms; hover/state: 180ms; dialog: 250ms; mobile sheet: 420ms.
- Animate only transform and opacity. No forced scrolling, pinned runways, auto-rotating content, or repeated hover zoom.
- Reduced motion uses the hero poster and opacity-only state changes.

## Critique target

`ShowTell 5 · Philosophy 5 · Hierarchy 5 · Specificity 5 · Restraint 5 · Variety 4`
