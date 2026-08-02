# Revaya AI Website — Design Standards

**Status:** Canonical, single source of truth for site design tokens and patterns.
**Last updated:** 2026-08-02
**Authority order:** `brand/web-design-guide.md` (workspace, Brand Core-derived) > this file > rendered code. Where this file and code disagree, code is a defect to fix, not a value to copy. Where this file and `brand/web-design-guide.md` disagree, the workspace guide wins and this file is wrong, flag it.

This file replaces `DESIGN.md`, `DESIGN 2.md`, `docs/design-system.md`, `docs/landing-page-design-guide.md`, and `website.md`. Those files are marked superseded (not deleted, see Section 0) pending a design-doc review Shannon has queued before the next website refresh.

---

## 0. A note on what this file is, and isn't

This is a **merge of five prior documents that disagreed with each other**, reconciled against the current locked brand authority (`brand/web-design-guide.md`, 2026-07-26) and, where that guide is silent, against what the code actually renders on `redesign-premium`.

**Known unresolved drift, called out explicitly rather than silently fixed:** three token values below are the *target* per the brand guide, not yet what the code renders. Do not assume matching code exists until the fix is executed. See Section 9 (Known Drift) for the exact list, current values, and file locations.

**This entire pack, including this file, is queued for a full review before the next website refresh** (Shannon's instruction, 2026-08-02). Treat this as the working standard now, not as final.

---

## 1. Color — three tokens, no exceptions

Per `brand/web-design-guide.md` Section 2.1 (Brand Core v1, locked):

| Token | Hex | Role |
|---|---|---|
| Navy | `#0d1a4a` | Primary — CTAs, active states, key interactive elements |
| Teal | `#028090` | Secondary/accent — highlights, hover states, links |
| Coral | `#F45B69` | Accent — urgency, alerts, sparingly |

**No purple, in any value. No second teal. No fourth color.**

### Surface colors (web-original, not part of the 3-color brand lock)

Per current rendered code (`app/globals.css`) and `brand/web-design-guide.md` Section 6, which treats these as open pending cross-repo reconciliation but not blocking:

| Token | Hex | Usage |
|---|---|---|
| Background / surface | `#080D11` | Page background, primary panel fill |
| Surface alt | `#0A1118` | Alternating sections, form inputs, cards |
| Border subtle | `rgba(255,255,255,0.07)` | Card borders, dividers |
| Border muted | `rgba(255,255,255,0.06)` | Nav/footer borders |

### Text colors

| Token | Value | Contrast (on `#080D11`) | Usage |
|---|---|---|---|
| Body text | `#E8EDF2` / `text-white` | >14:1, AAA | All body copy, headlines, paragraphs |
| Teal | `#028090` | ~5.2:1, AA/AAA | Eyebrows, links, accents |
| Coral | `#F45B69` | ~4.9:1, AA | Urgency accents, sparingly |
| Muted | `#8899AA` / `text-white/40` | ~4.6:1, AA at this size only | Footnotes, captions ONLY, never body |
| Disabled | `text-white/25` | — | Inactive states only |

**Font opacity rule (carried forward, still holds):** never use opacity on body copy, paragraphs, subheads, or lead text. Only the muted/disabled values above are permitted, and only for the roles named. `text-white/85`, `/70`, `/65`, `/60`, `/50` are banned on prose.

### Gradients

Per `brand/web-design-guide.md` Section 3.1, rebuilt to the 3-color system:
- `.gradient-text`: `135deg, #028090 0%, #0d1a4a 100%`
- `.gradient-text-coral`: `135deg, #F45B69 0%, #0d1a4a 100%`

**Not yet executed in code** — see Section 9.

---

## 2. Typography

Per `brand/web-design-guide.md` Section 2.2:

- **Display/headers:** Fraunces (serif), weights 400 and 600, normal + italic. Italic used for accent words inside headlines, not whole headlines.
- **Body:** Proxima Nova (fallback Inter), weights 400 and 500.
- **Headings render at weight 400 (normal), never black/900.** The premium feel comes from serif at large size, not boldness.

This is a **change from the legacy Montserrat Black 900 system** documented in the four merged legacy docs. Do not use Montserrat for new work. If you find live Montserrat-900 headings, that is legacy code not yet migrated, not a pattern to repeat.

### Responsive type scale

Per `brand/web-design-guide.md` Section 4:

| Role | Fluid size | Line height | Tracking | Weight |
|---|---|---|---|---|
| Hero H1 | `clamp(38px, 5vw, 68px)` | 1.05 | -0.02em | Fraunces 400 |
| Section H2 | `clamp(28px, 4.2vw, 54px)` | 1.06 | -0.02em | Fraunces 400 |
| Subsection H3 | `clamp(22px, 2.8vw, 38px)` | 1.0 | -0.01em | Fraunces 400 |
| Large display number | `clamp(64px, 8vw, 96px)` | 1.0 | -0.03em | Fraunces 400, teal, tabular-nums |
| Body paragraph | `clamp(15px, 1.15vw, 17px)` | 1.75 | none | Proxima Nova 400 |
| Hero subcopy | `clamp(16px, 1.4vw, 18px)` | relaxed | none | Proxima Nova 400 |
| Eyebrow (section) | 11px fixed | none | 0.22em | Proxima Nova 600, uppercase, teal |
| Eyebrow (chip) | 13px fixed | none | 0.16em | Proxima Nova 400, uppercase, teal |
| Small label / caption | 11px fixed | none | 0.18em | Proxima Nova 600, uppercase |

**Rules regardless of breakpoint:**
- Never `font-black` / weight 900 on any heading.
- Accent emphasis inside a headline: `<em>` italic Fraunces in teal, or coral for urgency/cost framing. One accent color per headline.
- Breakpoints: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Primary pivots at `md` (type/padding) and `lg` (grid collapse, nav desktop/mobile).

---

## 3. Layout

| Container | Rule |
|---|---|
| Standard container | `max-w-[1100px] mx-auto px-6 md:px-10` |
| Wide container (nav, footer only) | `max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20` |
| AIOS hero container | `max-w-[1280px] mx-auto px-6 md:px-0` |
| Prose max-width | 680px — long-form text never exceeds this |
| Form max-width | 560px |
| Section padding | `py-24 md:py-32` |
| Hero padding | `pt-32 md:pt-44` — every page hero, no exceptions |

### Section padding for landing/comparison pages (inline-style pattern)

| Zone | Padding |
|---|---|
| Full-width sections | `96px 80px` |
| Section headers only | `0 80px`, `marginBottom: 40px` |
| Split section text columns | `96px 80px` |
| Mobile (all) | reduce to `24px` horizontal |

---

## 4. Radii and borders

| Token | Value |
|---|---|
| sm | 4px |
| md | 8px |
| lg | 12px |
| full (pills) | 9999px |

Panels use `rounded-2xl` consistently — do not mix `rounded-xl` and `rounded-2xl` for the same component type. All CTAs are `rounded-full`. No square-corner buttons.

---

## 5. Components

### Buttons

```
Primary CTA (navy fill — replaces legacy purple #553555 per Section 9 drift item 1):
  bg-[#0d1a4a] text-white, rounded-full, font-weight 600-700, 15px
  Hover: lift -translate-y-0.5 + soft glow shadow in navy at low opacity

Secondary CTA: transparent, teal border and text
Text link CTA: teal #028090, ends with → arrow
```

All CTAs are `rounded-full`. **No coral buttons** — coral is eyebrow/urgency-text only, never a button fill. (Exception: CTA button text on coral fill fails AA contrast at small size per Section 1 — if coral is ever used as a button background, verify text contrast against the rendered button before shipping; the safer default is to not use coral as a button fill at all.)

### Component states

Per `brand/web-design-guide.md` Section 5:

| State | Rule |
|---|---|
| Hover (buttons) | Lift `-translate-y-0.5` + soft glow shadow in the button's own accent at low opacity. Teal: `rgba(2,128,144,0.7)` |
| Hover (links) | Underline or color shift to full-opacity teal. No color-only hover with no other signal (accessibility). |
| Active/pressed | Reduced lift/scale from hover, not a color change alone |
| Focus (keyboard) | Every interactive element gets a visible `focus-visible` ring: 2px solid teal, 2px offset. Do not rely on browser defaults. **Currently a gap in the live build — see Section 9.** |
| Disabled | 40% opacity, remove hover/focus affordances, `cursor: not-allowed` |
| Nav CTA active/current | Teal background or text |
| Form field focus | Same teal ring + border color shift to teal at full opacity |
| Loading/submitting | Visible pending state, trigger disabled while pending. No silent freeze. |

### Cards

`background: rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.07)`, `border-radius: 12-16px`. No drop shadows — depth comes from color contrast, not elevation. Coral top-border accent for risk/warning cards only.

### Navigation

```
Position: fixed top-3 left-0 right-0 z-50
Height: h-16 (mobile), md:h-20 (desktop)
Breakpoint: md (768px)
Scroll default: max-w-[1200px] px-4 md:px-12 lg:px-20 bg-transparent
Scroll active (>80px): max-w-[960px] px-4 md:px-8 bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl rounded-full
Transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)
```

Logo: `/revaya-logo-white.png`, `width={140} height={40}`, `w-[120px] md:w-[140px]`.

### Footer

```
Background: #080D11
Top border: border-white/[0.06]
Padding: px-6 md:px-12 lg:px-20 py-12
```
4-column layout: logo + tagline / nav links / resources / social+legal. Copyright: `© {year} Revaya AI. All rights reserved.`

---

## 6. Accessibility contrast

Per `brand/web-design-guide.md` Section 6.1 (on dark surfaces, the site's current state):

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `#E8EDF2` body text | `#080D11` | >14:1 | AAA |
| Teal `#028090` | `#080D11` | ~5.2:1 | AA normal, AAA large |
| Coral `#F45B69` | `#080D11` | ~4.9:1 | AA normal |
| White text on coral button fill | — | ~2.4:1 small size | **Fails AA.** Only at large/bold (18px+/14px+bold), or use dark text on small coral fills. Verify against the actual rendered button. |
| Muted `#8899AA` | `#080D11` | ~4.6:1 | AA, borderline below 14px. Footnotes/captions only. |

**Hard rules:** no transparency-driven text color. Every text color is a solid hex at correct contrast, not an opacity percentage. Any new accent combination gets a contrast check before shipping.

---

## 7. Motion

- **Standard reveal:** scroll-triggered fade-up. `opacity 0→1`, `translateY 40px→0` (legacy pattern used `18px`, either is acceptable), once-only trigger, `-60px` to `-80px` margin. Duration 0.5-0.6s, ease-out. Stagger children at `0.1-0.12s` intervals.
- **Continuous/looping motion** (marquees, particle canvases, count-up timers) **must** have a `prefers-reduced-motion: reduce` path — either `animation: none` or immediate jump to final state. Hard rule.
- **One-time reveal fades are acceptable without a reduced-motion override** — short, low-amplitude, one-time.
- **Hover/press micro-interactions** stay under 300ms.
- **No motion carries brand meaning alone.** Color and type carry identity; motion supports legibility, never the sole signal for a state change.

---

## 8. Web imagery

**Status: parked, not resolved** (`brand/imagery-direction-options.md`). The current unlaunched redesign uses no photography — the visual system is entirely color, type, glass/blur surfaces, gradients, and the `DataFlowHero` particle canvas. **This is acceptable for launch.**

**Hard constraints regardless of eventual direction:**
- No generic stock photography ("confident entrepreneur at laptop" imagery is rejected on sight)
- No emojis, anywhere, in any imagery or icon treatment
- Locked palette only: navy, teal, coral (plus neutral photographic tones if a photographic direction is eventually chosen)
- No full-face AI-generated portraits (uncanny-valley risk, holds regardless of direction)

Do not build toward any specific imagery direction as if one had been chosen — none has.

---

## 9. Known drift — target state vs. live code

These are values this file documents as **correct per `brand/web-design-guide.md`**, that the live code does **not yet match.** Do not assume the fix exists. Fixing these is in-scope for the next code session that touches these files, not this pack (this pack is docs-only).

| Item | Target (this file) | Current code | Location |
|---|---|---|---|
| Primary color | Navy `#0d1a4a`, no purple anywhere | Purple `#553555` still set as `--color-brand-primary` and `--color-purple` | `app/globals.css:37,58`, `tailwind.config.ts:13` |
| Teal | One teal, `#028090` only | Two teals: `--color-teal: #19b3c2` (primary v4 accent) + `--color-teal-deep: #028090` (legacy) | `app/globals.css:55` |
| Gradients | Teal-to-navy / coral-to-navy, no purple stop | `.gradient-text` still has `#553555` as a stop | `app/globals.css:143,150` |
| Voice | First-person "I," no "we" outside the tagline | `homeCopy` object still reads "We start with the problem... We find your single most expensive bottleneck..." | `lib/copy/round1.ts:80,98` |
| Headings | Fraunces 400/600, never weight 900 | Verify per-component; legacy docs specified Montserrat 900. Spot-check before assuming migrated. | site-wide |
| Focus-visible ring | 2px solid teal, 2px offset, on all interactive elements | Not defined as a standard anywhere in current CSS | `app/globals.css` |
| "Data" lane hero accent | Needs an in-system (navy/teal/coral) replacement for retired purple-lift `#9a6e9a` | Still uses purple-lift | `components/DataFlowHero.tsx` (or related hero component) |

---

## 10. How to add a page

1. Read this file, `copy-standards.md`, and `seo-aeo-map.md` first.
2. Use the standard container, hero padding, and type scale above. Do not invent new spacing or type values.
3. Colors: navy, teal, coral only. No purple. One teal only (`#028090`).
4. Voice: first-person "I." Run the humanizer gate on new copy per `copy-standards.md`.
5. Add a `metadata` export (see `seo-aeo-map.md` for the pattern) — every route needs one except intentional redirects.
6. Add JSON-LD if the page type warrants it (see `seo-aeo-map.md` Section 2 for which types are already in use).
7. Verify contrast, focus states, and reduced-motion paths per Sections 6-7 above.
8. Append `changelog.md` with what changed and why.
9. Update `seo-aeo-map.md` if the page's SEO/schema state changed.

---

## History

| Date | Change |
|---|---|
| 2026-08-02 | Created. Merged `DESIGN.md`, `DESIGN 2.md`, `docs/design-system.md`, `docs/landing-page-design-guide.md`, `website.md` and reconciled against `brand/web-design-guide.md` (2026-07-26 lock) and rendered code. Old docs marked superseded, not deleted, pending Shannon's design-doc review before the next website refresh. |
