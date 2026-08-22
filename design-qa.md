# SOFIYA Sweet — design QA

## Verification state

- Approved composition source: `../upload/951D7B87-FCD5-4F8B-92EF-A0CA1DF12404.jpeg`
- User correction evidence: `../upload/4CB53A38-F57A-45A9-A99A-FC26EA420060.jpeg`; the yellow CTA shown there is explicitly not approved
- Latest photo-quality request: `../upload/bc4cd53b-b8f5-4904-8f28-dc538744d65d.png`
- Latest brand-story request: `../upload/aab1f3ff-e4f3-4fef-9804-b69c3d8ba7c3.png`
- Browser render: `docs/qa/implementation-desktop-1363x936.jpg`
- Side-by-side comparison: `docs/qa/comparison-desktop.jpg` (approved source on the left, implementation on the right)
- Verified preview: `https://sofiya-sweet-preview-git-agent-p-b444c3-project100mlns-projects.vercel.app/?qa=47ebe01-top`
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
| Controls          | Brand-purple CTA with white text, arrows, slide tabs and progress line are visible and operable          | Passed |
| Product crop      | Cake, fruit and edible logo are retained in the right-focused composition                                | Passed |
| Photo quality     | Exact source photo is preserved; desktop selects the responsive HD asset and keeps sharp product detail  | Passed |
| Brand history     | Founder, 2014/2016 timeline, name meaning, mission, 17 branches and team size match supplied facts       | Passed |
| Responsive safety | Automated coverage passes at phone and desktop sizes; desktop has no horizontal overflow                 | Passed |
| Browser health    | No application-origin console errors were observed during the final journey                              | Passed |

The implementation intentionally uses the current approved cake-emblem SOFIYA
lockup instead of the older emblem visible in the composition reference. The hero
CTA also intentionally differs from that reference: the user's latest correction
supersedes its gold CTA, so every carousel CTA now uses SOFIYA purple `#5A04BD`
with white text.

## Comparison history

1. The first redesign wrapped the title to three lines and centered/cropped the cake too aggressively.
2. The title was converted to an explicit two-line composition and the desktop editorial scale was corrected.
3. A separate product-focus image layer moved the cake right while keeping the edible SOFIYA mark visible.
4. Header spacing and navigation padding were rebalanced against the combined comparison.
5. The supporting copy break and CTA dimensions were aligned with the approved first screen.
6. The unapproved yellow carousel CTA was replaced across every slide with the brand-purple button and a regression assertion for its computed colors.
7. The original 1280 × 1920 hero photo was professionally resampled to a 2560 × 3840 responsive source with restrained sharpening; no object, crop or logo was regenerated.
8. The short brand summary was expanded into a four-part factual story covering the founder, 2014 production start, 2016 first store, name meaning, mission and current scale.
9. The final combined comparison contains no remaining P0, P1 or P2 visual differences under the updated user correction.

## Interaction evidence

- Header navigation and the primary catalogue CTA resolve to their intended routes.
- Carousel arrows and semantic slide tabs change slides; automatic motion pauses for interaction and respects reduced motion.
- Catalogue query `Прага` returned one result and the result count updated correctly.
- Selecting the Kapal store updated the embedded OpenStreetMap location surface and directions context.
- At the desktop preview, the primary hero image selected the HD resource; the CTA remained `#5A04BD` with white text.
- The About page rendered every approved history fact and had no positive horizontal overflow.
- The final browser frame reported zero positive horizontal overflow.

final result: passed
