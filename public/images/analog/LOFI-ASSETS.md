# Lo-fi revision — 2026-11-13

Historical variants: the homepage switched back to the full-resolution, lossless original photograph on 2026-11-14. See [README.md](./README.md) for the current asset.

The built-in imagegen tool edited the earlier original city image and generated a new scanned-paper texture. The anonymous person is not the website author.

- `city-study-lofi.jpg`: 640 × 427; JPEG quality 38, 4:2:0 chroma subsampling, approximately 11 KB. Intentionally enlarged in the immersive hero.
- `city-study-lofi-small.jpg`: 480 × 320; JPEG quality 34, 4:2:0, approximately 6 KB. Also reused by the small contact print.
- `scan-surface.webp`: 1100 px wide scanned-paper bitmap, WebP quality 76, approximately 47 KB.
- `ink-loss.svg`: deterministic code-native luminance mask for small ink dropouts in display lettering. Body text and controls never use the mask.

Sharp performs the responsive resizing and actual JPEG/WebP encoding. Optical softness, CCD noise, edge color bleed and localized scan damage originate in the edited image itself. Technical figures, institution logos and article body images remain their original Notion assets.

## Hero edit prompt

Edit this existing city photograph into an authentic cheap-digital-camera image circa 2002, not a polished photographic print. Preserve the anonymous still figure seen from behind, their dark coat, the city crossing, buildings, bus, and blurred passing pedestrians; no identifiable face. Reframe as a wider immersive landscape with the still person near the middle-right and usable gray street/sky on the left for website typography. The image MUST feel inherently low-fidelity: localized soft focus varying across the lens, low dynamic range, slightly overexposed chalky cloud highlights, crushed dark coat shadows, visible but plausible JPEG block damage in sky and shadow transitions, cyan/gray chroma bleeding along moving edges, patchy early CCD sensor noise especially in dark corners, some weak scanning streaks near edges, an imperfect few-pixels registration shift near one edge, low-res candid urban image from a small point-and-shoot camera. Muted cold silver #BCC3C6, faded denim #778A99, charcoal #252B32, tiny subdued burgundy. Strong long-shutter motion streaks around an almost-still imperfectly sharp person. Emotional isolation and raw spontaneous early-2000s alternative-rock booklet atmosphere. Nuanced degradation, not uniform Gaussian blur, not uniform grain filter, no slick cinematic grade, no sepia, no retro Instagram gloss, no fake lens flares, no fake text or dates, no frame, no logos, no celebrity or recognizable album composition. Output image only, landscape 3:2 or wider.

## Surface generation prompt

Create a real scanned-paper texture asset, NOT a website mockup. Full-bleed close-up flatbed scan of the inside of a weathered early-2000s alternative-rock CD booklet / badly photocopied independent zine paper. Cool dirty silver gray #BCC3C6 and desaturated faded denim gray #778A99, never warm beige or ivory. Nuanced uneven exposure with mostly quiet mid-gray open center, small rubbed graphite patches and paper fibers, a few faint roller lines and imperfect toner deposits toward different edges, subtle fold pressure marks, one softly abraded area. Monochromatic or very slightly cold blue, low-to-moderate contrast, not overly distressed. Visible material texture and uneven surface tone, no objects, no writing, no letters, no logos, no decorative shapes, no watermark, no obvious seamless repeated patterns, no artificial gaussian noise layer. The center must remain unobtrusive enough to support sharp dark website text on top. Landscape or square texture sheet.
