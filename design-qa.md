# SOFIYA Sweet — design QA

## Verification state

- Approved composition source: `../upload/951D7B87-FCD5-4F8B-92EF-A0CA1DF12404.jpeg`
- User correction evidence: `../upload/4CB53A38-F57A-45A9-A99A-FC26EA420060.jpeg`; the yellow CTA shown there is explicitly not approved
- Latest photo-quality request: `../upload/bc4cd53b-b8f5-4904-8f28-dc538744d65d.png`
- Latest brand-story request: `../upload/aab1f3ff-e4f3-4fef-9804-b69c3d8ba7c3.png`
- Latest hero-color correction: `../upload/3452F4E7-5835-4A89-B167-E0A37E8F1DCC.jpeg`; the remaining gold eyebrow, active slide indicator and progress line are not approved
- Latest mobile-title correction: `../upload/E9DCC120-B3AA-4591-B5C1-A0F309D3BF6C.jpeg`; the second title line must remain inside the rounded hero frame
- Latest logo correction: the user explicitly requested the original letter-S emblem shown in the approved composition instead of the interim cake emblem
- Latest brightness corrections: the user requested a brighter first screen and then explicitly requested an additional increase, without changing the professional cake photograph
- Browser render: `docs/qa/implementation-desktop-1363x936.jpg`
- Combined comparison: `docs/qa/comparison-desktop.jpg` (approved source above, implementation below)
- Verified preview: `https://sofiya-sweet-preview-git-agent-p-b444c3-project100mlns-projects.vercel.app/?qa=07208b3`
- Route/state: home page, first carousel slide, light theme, desktop
- Source frame: 1536 × 963 pixels
- Browser viewport: 1363 × 936 CSS pixels at device pixel ratio 1
- Captured browser image: 1348 × 926 pixels; the 15-pixel difference is the browser scrollbar gutter
- Comparison normalization: the source was resized proportionally to 1348 pixels wide and top-padded to 1348 × 936; the implementation was top-padded to the same size without stretching, then both images were stacked in one comparison

The source and browser viewport differ in width, so this is a proportional visual
comparison rather than a claim of pixel-for-pixel identity.

## Required surface review

| Surface           | Evidence                                                                                                   | Result |
| ----------------- | ---------------------------------------------------------------------------------------------------------- | ------ |
| Header            | Original S-emblem SOFIYA lockup, compact navigation, phone and WhatsApp remain visible without overlap     | Passed |
| Hero composition  | Rounded full-bleed stage, controlled left overlay and product-dominant right side follow the reference     | Passed |
| Brand assets      | The interim cake emblem is replaced by the original S lockup; the edible SOFIYA mark stays unobstructed    | Passed |
| Typography        | Eyebrow, two-line editorial title, two-line supporting copy and CTA rhythm match the reference hierarchy   | Passed |
| Colors and tokens | Hero overlay is reduced again on desktop/mobile; more photography is visible while white copy stays readable | Passed |
| Controls          | Purple CTA and light-lilac eyebrow, active slide indicator and progress line use the approved brand family | Passed |
| Product crop      | Cake, fruit and edible logo are retained in the right-focused composition                                  | Passed |
| Photo quality     | Exact source photo is preserved; desktop selects the responsive HD asset and keeps sharp product detail    | Passed |
| Brand history     | Founder, 2014/2016 timeline, name meaning, mission, 17 branches and team size match supplied facts         | Passed |
| Responsive safety | Mobile title uses a viewport-aware size; its fixed second line keeps at least 16 px inside the hero frame  | Passed |
| Browser health    | No application-origin console errors were observed during the final journey                                | Passed |

The header now uses the original letter-S emblem from the supplied brand asset, paired
with the real SOFIYA wordmark. The lockup is a transparent 890 × 300 raster source and
renders at 213.6 × 72 CSS pixels in the verified desktop viewport. It remains sharp,
keeps the reference proportions and introduces no horizontal overflow. The decorative
page mark and promotion fallback use the same original S emblem; the photographed cake
and its edible SOFIYA mark are unchanged.

The user's earlier color corrections remain intact: carousel CTAs use SOFIYA purple
`#5A04BD` with white text, while the small eyebrow, active slide indicator and progress
line use the high-contrast light-lilac brand accent `#D8BDFF`.

No separate focused crop was required: the full-width normalized comparison preserves
the complete header at readable scale, while the browser measurement above verifies the
logo's intrinsic and rendered dimensions directly.

## Comparison history

1. The first redesign wrapped the title to three lines and centered/cropped the cake too aggressively.
2. The title was converted to an explicit two-line composition and the desktop editorial scale was corrected.
3. A separate product-focus image layer moved the cake right while keeping the edible SOFIYA mark visible.
4. Header spacing and navigation padding were rebalanced against the combined comparison.
5. The supporting copy break and CTA dimensions were aligned with the approved first screen.
6. The unapproved yellow carousel CTA was replaced across every slide with the brand-purple button and a regression assertion for its computed colors.
7. The original 1280 × 1920 hero photo was professionally resampled to a 2560 × 3840 responsive source with restrained sharpening; no object, crop or logo was regenerated.
8. The short brand summary was expanded into a four-part factual story covering the founder, 2014 production start, 2016 first store, name meaning, mission and current scale.
9. The remaining gold eyebrow, active slide indicator and progress line were replaced with the light-lilac brand accent; browser-computed colors and a visual comparison confirm the correction.
10. The oversized mobile title was changed to a viewport-aware `clamp()` size and its content width was released from the earlier `11ch` limit.
11. Browser smoke at the 390 px mobile project verified both title-line edges remain at least 16 px inside the rounded hero frame; no horizontal page overflow remains.
12. The interim cake-emblem header was classified as a P1 brand-asset mismatch after the user's correction and replaced with the source-derived original S emblem plus the real SOFIYA wordmark.
13. The first S lockup was visually wider than the approved reference; the wordmark scale was reduced and the desktop lockup rebalanced from 266 × 80 to 213.6 × 72 CSS pixels.
14. The post-fix combined comparison confirms the original S lockup, hero image and content remain aligned with the approved composition; no actionable P0, P1 or P2 differences remain.
15. The overly dark hero treatment was classified as a P2 color-balance issue. Desktop overlay opacity was reduced from `0.94/0.76/0.22` to `0.84/0.60/0.14`; the mobile overlay was reduced in parallel. The post-fix browser capture shows clearer cake and background detail while preserving white-copy contrast.
16. After the user requested another brightness increase, desktop overlay opacity was reduced again to `0.76/0.45/0.08` with only `0.06` bottom shading; mobile values were also lowered. The new combined capture shows a materially brighter first screen, unchanged cake detail and readable white content with no new layout drift.

## Interaction evidence

- Header navigation and the primary catalogue CTA resolve to their intended routes.
- Carousel arrows and semantic slide tabs change slides; automatic motion pauses for interaction and respects reduced motion.
- Catalogue query `Прага` returned one result and the result count updated correctly.
- Selecting the Kapal store updated the embedded OpenStreetMap location surface and directions context.
- At the desktop preview, the primary hero image selected the HD resource; the CTA remained `#5A04BD` with white text.
- The eyebrow, selected slide indicator and progress fill each computed to `rgb(216, 189, 255)`; no gold hero accent remains.
- Quality run 69 passed the complete code-quality and browser-smoke suites after the second-stage hero-brightness correction.
- The header loaded `sofiya-logo-s-original` at its full 890 × 300 intrinsic resolution and rendered at 213.6 × 72 CSS pixels without distortion.
- The final desktop browser computed the second-stage brighter overlay values exactly and reported no positive horizontal overflow.
- The About page rendered every approved history fact and had no positive horizontal overflow.
- The final browser frame reported zero positive horizontal overflow.

final result: passed
