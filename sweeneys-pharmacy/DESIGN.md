# DESIGN.md — Lamplight Dispensary v2

## Concept
"Lamplight Dispensary": the pharmacy as the one lit window on Port Road after dark. The hero is an illustrated shopfront whose lights, door sign and painted hours follow the real open/closed state (Europe/Dublin time). Everything else is a calm, editorial apothecary: bottle-green and brass (taken from the real shopfront sign and logo) on warm paper.

Direction: editorial apothecary, warm and specific. Not clinical blue, not a template.

## Colour (WCAG AA verified)
| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#0C231B` | Night bands, headings. 14.7:1 on paper |
| `--color-ink-2` | `#143427` | Raised surfaces on ink |
| `--color-green` | `#1D4F3B` | Primary buttons, feature cards. White on green 9.4:1 |
| `--color-paper` | `#F6F1E6` | Page background |
| `--color-paper-2` | `#EDE6D5` | Alternate band |
| `--color-surface` | `#FFFDF8` | Cards |
| `--color-sage` | `#DCE6DA` | Cool tint band |
| `--color-brass` | `#D8B25A` | Brass on ink 8.2:1 (fills, lettering on dark) |
| `--color-brass-deep` | `#77550E` | Brass as text on paper 6.0:1 |
| `--color-lamp` | `#F5B84A` | Lit-window glow, primary CTA fill. Ink on lamp 9.3:1 |
| `--color-body` / `--color-muted` | `#24332C` / `#55635B` | 11.8:1 / 5.6:1 on paper |
| `--color-open` / `soon` / `closed` | `#17663F` / `#8F4300` / `#9E3320` | Status, always paired with words and a dot |

Lamp amber is for light and the main call-to-action only. It is never used as thin text on light backgrounds.

## Typography (two families)
- **Display: Fraunces** (variable; `opsz` axis, roman + italic; the `SOFT` axis was dropped to save about 120KB of font weight). Headings use italic brass for the one emphasised phrase.
- **Body/UI: Atkinson Hyperlegible Next.** Designed by the Braille Institute for low-vision readers, chosen because pharmacy visitors include older people and people reading dosages and Eircodes. Its slashed zero is deliberate: it stops 0 being read as O.
- Scale: H1 `clamp(2.7rem, 1.5rem + 5.2vw, 5.25rem)` / 0.98; H2 `clamp(2rem, 1.3rem + 2.8vw, 3.5rem)` / 1.04; body 1.0625rem / 1.65.
- Eyebrow: 0.8125rem, uppercase, 0.14em tracking, brass-deep, no decorative rule.

## Shape & rhythm
- Buttons and pills: fully round. Cards: 24–28px. Photos: print-style frames with 1–3° tilt.
- Every anchored section is a `panel`: it starts exactly under the sticky header, fills the screen height and centres its content. Vertical padding scales with viewport height (`clamp(2.25rem, 7svh, 5.5rem)`).
- Bento services grid: Prescriptions and Mother and baby are two-column cards so both rows fill; other cards vary in surface (white, brass-tint, sage, paper-2).

## Layers & atmosphere
- Night bands (hero, About, footer, Gaza card) carry a subtle SVG grain overlay.
- The mortar-and-pestle mark reappears as a low-opacity watermark (services feature card, footer).
- Ink-tinted layered shadows only.

## Motion
Principle: motion explains or confirms, it never decorates. Nothing loops except the status ping and the open-lamp breathing. Zero animation libraries; everything is CSS plus a few small hooks.

Tokens (`globals.css`): `--dur-fast 160ms`, `--dur-base 320ms`, `--dur-slow 700ms`, `--ease-out` (expo-like), `--ease-spring` (a real damped spring, zeta 0.6, as CSS `linear()`).

| Where | What | How |
|---|---|---|
| Hero headline | Each line slides up out of its own mask, 110ms apart | CSS keyframes, works without JS |
| Hero window | Lights come on with a short flicker; slight 3D tilt toward the cursor; drifts up and softens as you scroll away | CSS keyframe; pointer handler (mouse only); CSS scroll-driven `animation-timeline: view()` where supported |
| Sections | Text rises in with a soft blur, cards rise and scale in, once, staggered 70 to 120ms | `Reveal` (IntersectionObserver), `text` and `card` variants |
| Header | Clear at top, frosted with a shadow after 8px of scroll; a pill slides to the section you are in | scroll listener (passive) + IntersectionObserver + spring transition |
| Mobile menu | Height opens smoothly, links rise in one by one, icon morphs menu to close; closed menu is `inert` | grid-rows transition, CSS delays |
| Service and community cards | Soft lamp glow follows the mouse; card lifts | one pointer listener per grid, CSS variables |
| Buttons | Lift and icon pop on hover, `scale(0.96)` on press, spring settle | CSS only; hover effects only on hover-capable devices |
| Photos | Straighten, lift and gain shadow on hover | CSS spring |
| Donation amount | Counts up to the final figure once on view; screen readers only ever hear the final number | `CountUp`, `easeOutExpo` (unit tested) |
| Phone and email | Copy button with pop-in "Copied" and a polite live announcement | `CopyButton` |
| Route change | Page fades in | `app/template.tsx`, opacity only so sticky and fixed elements are unaffected |

Rules kept: only `transform`, `opacity`, `filter` (text only), colour and `translate` animate; blur is never used on large surfaces; reveals fire once; stagger stays between 55 and 120ms; press feedback is under 100ms.

Reduced motion: reveals become plain fades, the headline mask, tilt, parallax, flicker, count-up, spotlight movement and menu animation are all off, and the number is shown final immediately. With scripting disabled nothing stays hidden.

Deliberately not used: smooth-scroll libraries (they hijack native scrolling, fight the anchor navigation and are hard on older visitors), scroll-jacking or pinned sections, autoplay video, custom cursors.

## Accessibility
- Skip link, semantic landmarks, one `h1`.
- All tap targets ≥ 44px (mobile action bar, header, contact links).
- Native `<dialog>` for the ConnectDoc consent step: focus trap, Escape, focus restore.
- The lit-window illustration is `aria-hidden`; the live status pill (`role="status"`) carries the same information as text.
- Map loads only on request (privacy), with a directions link that needs no third-party request.

## Content rules
- No `TODO_CONFIRM` text is ever rendered (guarded by `src/content/site.test.ts`). Unconfirmed facts stay in `CONFIRM.md` and as code comments in `src/content/site.ts`.
- Unconfirmed items that would otherwise show (out-of-hours GP number, PSI number) are omitted until provided.
