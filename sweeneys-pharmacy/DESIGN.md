# DESIGN.md — Lamplight Dispensary Design System

## Concept & Mood
"Lamplight Dispensary" — inspired by the single lit window on Port Road after evening hours. Calm, warm, trustworthy, and editorial-clinical.
Built around paper-warm light surfaces (`--paper` #FBF8F2), a deep ink-teal night band (`--ink` #0F2A2B), and a single amber "lamp" accent (`--amber` #F2A93B) used strictly for glows and badges.

## Color Tokens & Contrast Audit
- `--ink` (`#0F2A2B`): Night band, dark headings. **14.3:1 contrast** on paper.
- `--paper` (`#FBF8F2`): Main background surface.
- `--surface` (`#FFFFFF`): Cards and elevated containers.
- `--sage` (`#E4EEE8`): Light tint band for services.
- `--teal` (`#1F5F5B`): Primary interactive elements and buttons. White text on teal has **7.4:1 contrast**.
- `--amber` (`#F2A93B`): Lamp accent (glows, fills only). Never used as thin text on light backgrounds.
- `--amber-deep` (`#8A5200`): Used for text on paper. **6.0:1 contrast** on paper.
- `--body` (`#2B3A3B`): Primary body text. **11.2:1 contrast** on paper.
- `--muted` (`#566667`): Subtitle & caption text. **5.7:1 contrast** on paper.
- Status indicators:
  - `--open` (`#1B6E45`): **5.9+ contrast** on paper.
  - `--soon` (`#9A4A00`): **6.0+ contrast** on paper.
  - `--closed` (`#A63A24`): **6.1+ contrast** on paper.
- On-dark text: `#F3EFE6` (**13.2:1 contrast** on ink), muted on dark `#B9C7C4` (**8.7:1 contrast**).

## Typography
- **Display**: Fraunces (Variable, 500 & 600 weight). Loaded via `next/font/google`.
- **Body / UI**: DM Sans (400, 500, 600 weight). Loaded via `next/font/google`.
- **Fluid Scale**:
  - H1: `clamp(2.4rem, 1.6rem + 3.6vw, 4rem)` / line-height 1.05 with `text-wrap: balance`
  - H2: `clamp(1.9rem, 1.4rem + 2vw, 2.75rem)` / line-height 1.1
  - H3: 1.375rem / line-height 1.25
  - Body: 1.0625rem / line-height 1.65 with `text-wrap: pretty`
  - Small: 0.875rem
  - Eyebrow: 0.75rem uppercase, `tracking-widest` (0.12em), weight 600, color `--amber-deep`

## Shape & Geometry
- Control Radius: `10px`
- Card Radius: `16px`
- Large Media Radius: `24px`
- Status Pill: `999px`
- Concentric geometry rule: outer radius = inner radius + padding.

## Motion & Accessibility
- Fast (180ms), Normal (350ms), Slow (600ms) with `cubic-bezier(0.22, 1, 0.36, 1)`.
- Scroll reveal opacity & 16px vertical translation triggered via `IntersectionObserver`.
- Fully respects `prefers-reduced-motion: reduce`.
- All tap targets minimum 44×44px with 8px clearance.
