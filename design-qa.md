# SOFIYA Sweet — design QA

## Verification state

- Approved visual source: `../upload/951D7B87-FCD5-4F8B-92EF-A0CA1DF12404.jpeg`
- Browser render: `docs/qa/implementation-desktop-1363x936.jpg`
- Side-by-side comparison: `docs/qa/comparison-desktop.jpg` (approved source on the left, implementation on the right)
- Verified preview: `https://sofiya-sweet-preview-git-agent-p-b444c3-project100mlns-projects.vercel.app/?qa=c48a387`
- Route/state: home page, first carousel slide, light theme, desktop
- Source frame: 1536 × 963 pixels
- Browser viewport: 1363 × 936 CSS pixels at device pixel ratio 1
- Captured browser image: 1348 × 926 pixels; the 15-pixel difference is the browser scrollbar gutter
- Comparison normalization: the source was resized proportionally to 936 pixels high; the implementation was padded to 1348 × 936 without stretching, then both images were placed side by side

The source and browser viewport differ in width, so this is a proportional visual
comparison rather than a claim of pixel-for-pixel identity.

## Required surface review

| Surface           | Evidence                                                                                                 | Result |
| ----------------- | -------------------------------------------------------------------------------------------------------- | ------ |
| Header            | Approved SOFIYA lockup, compact navigation, phone and WhatsApp remain visible without overlap            | Passed |
| Hero composition  | Rounded full-bleed stage, dark left overlay and product-dominant right side follow the reference         | Passed |
| Brand assets      | The approved header logo remains; the edible SOFIYA mark on the cake is unobstructed                     | Passed |
| Typography        | Eyebrow, two-line editorial title, two-line supporting copy and CTA rhythm match the reference hierarchy | Passed |
| Controls          | Gold CTA, arrows, slide tabs and progress line are visible and operable                                  | Passed |
| Product crop      | Cake, fruit and edible logo are retained in the right-focused composition                                | Passed |
| Responsive safety | Automated coverage passes at phone and desktop sizes; desktop has no horizontal overflow                 | Passed |
| Browser health    | No application-origin console errors were observed during the final journey                              | Passed |

The implementation intentionally uses the current approved cake-emblem SOFIYA
lockup instead of the older emblem visible in the reference screenshot. This is an
approved brand-asset difference, not a design defect.

## Comparison history

1. The first redesign wrapped the title to three lines and centered/cropped the cake too aggressively.
2. The title was converted to an explicit two-line composition and the desktop editorial scale was corrected.
3. A separate product-focus image layer moved the cake right while keeping the edible SOFIYA mark visible.
4. Header spacing and navigation padding were rebalanced against the combined comparison.
5. The supporting copy break and CTA dimensions were aligned with the approved first screen.
6. The final combined comparison contains no remaining P0, P1 or P2 visual differences.

## Interaction evidence

- Header navigation and the primary catalogue CTA resolve to their intended routes.
- Carousel arrows and semantic slide tabs change slides; automatic motion pauses for interaction and respects reduced motion.
- Catalogue query `Прага` returned one result and the result count updated correctly.
- Selecting the Kapal store updated the embedded OpenStreetMap location surface and directions context.
- The final browser frame reported zero positive horizontal overflow.

final result: passed
