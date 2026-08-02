# Revaya AI Website — Design & Build Source of Truth

> **SUPERSEDED 2026-08-02.** This file is replaced by `design-standards.md` at the repo root, which reconciles this doc against `brand/web-design-guide.md` (workspace, locked 2026-07-26 — corrects this file's purple-primary, two-teal, and Montserrat tokens). Kept for historical reference pending Shannon's design-doc review before the next website refresh — do not use as a live standard.

**Status:** Source of truth (historical — see banner above)
**Last updated:** 2026-07-09
**Supersedes:** `DESIGN.md`, `DESIGN 2.md` (both describe the pre-v4 Montserrat era and are now historical only)
**Branch documented:** `redesign-premium`

---

## 1. Purpose & How To Use This Doc

This is the single authoritative reference for how the Revaya AI website looks, is built, and gets changed. Before this file existed, the site had no design standard, so updates drifted, formatting broke, and there was no way to tell "correct" from "someone's guess." This doc makes that impossible.

**The standard is the homepage.** The homepage (`app/page.tsx`, the section components it composes in `components/sections/`, and the shared chrome `DataFlowHero` / `Navigation` / `Footer`) was rebuilt to the premium "v4" standard on 2026-06-18. That build IS the standard for the whole site. Every other page is legacy until it conforms (see Section 16).

**How the team uses this doc:**
- Building or editing any homepage-standard module: match the tokens, container, type scale, and motion patterns documented here exactly.
- Adding a new page or section: build it to the v4 standard in Sections 3-9, not by copying a legacy page.
- Reviewing a PR: check the diff against the relevant section here.

**The rule (non-negotiable):** Any design change updates this doc in the SAME pull request. Code and `website.md` move together. A design PR that does not touch `website.md` is incomplete. See Section 17.

**Where values are missing from code**, this doc says `UNSPECIFIED — needs decision` rather than inventing a value. Do not fill those in without Shannon's call.

---

## 2. Tech Stack

Exact versions from `package.json` on branch `redesign-premium`.

| Concern | Package | Version (as pinned) |
| --- | --- | --- |
| Framework | `next` | `15.5.4` |
| React | `react` / `react-dom` | `19.1.0` |
| Styling | `tailwindcss` | `4.x` (v4, via `@tailwindcss/postcss`) |
| Tailwind PostCSS | `@tailwindcss/postcss` | `4.x` |
| Animation | `framer-motion` | `12.x` |
| Database client | `@supabase/supabase-js` | `2.x` |
| Transactional email | `resend` | `4.x` |
| Analytics | `@vercel/analytics` | `1.x` |
| Markdown (resources) | `gray-matter`, `remark`, `remark-html` (or `react-markdown` — see `lib/resources.ts`) | per lockfile |
| Language | `typescript` | `5.x` |
| Types | `@types/react`, `@types/node` | per lockfile |
| Node runtime | `engines.node` | `UNSPECIFIED — needs decision` (no `engines` field in package.json; Vercel default Node used) |

> Turnstile: the task brief lists Cloudflare Turnstile as part of the stack. **There is no Turnstile integration in the current codebase.** The contact form (Section 11) does not verify a Turnstile token, and no `TURNSTILE_*` env var is referenced. Treat Turnstile as `UNSPECIFIED — needs decision / not yet implemented`.

**Exact dependency check:** run `node -e "const p=require('./package.json'); console.log(p.dependencies, p.devDependencies)"` — this doc lists the majors above; the lockfile is authoritative for patch versions.

### Hosting & deploy model
- **Hosting:** Vercel.
- **Analytics:** Vercel Analytics (`@vercel/analytics/react`, mounted in `app/layout.tsx`) plus Google Analytics / GTM (`gtag`, measurement ID `G-8M6HLZZ52E`, loaded via `next/script` `afterInteractive` in layout `<head>`).
- **Deploy model (staging → review → merge):**
  1. Work lands on the staging branch `redesign-premium`.
  2. Vercel builds a preview for that branch.
  3. Shannon reviews the Vercel preview URL.
  4. Only after approval does the branch merge to `main` (production).
- **Never push design changes directly to `main`.** No exceptions.

---

## 3. Design Tokens

The token source of truth is the `@theme` block in `app/globals.css` (Tailwind v4 CSS-first config). `tailwind.config.ts` ALSO defines an overlapping legacy `theme.extend` block — where the two disagree, the v4 `@theme` block in `globals.css` wins for the homepage standard. Both are listed so nothing is a surprise.

### 3.1 Color tokens (from `@theme` in `globals.css`)

| Token (CSS var / Tailwind class) | Hex / value | Semantic role |
| --- | --- | --- |
| `--color-ink` / `bg-ink` `text-ink` | `#070b1c` | **Deepest navy base.** Page background wrapper (`app/page.tsx` root is `bg-ink`). |
| `--color-ink-2` / `ink-2` | `#0d1a4a` | Navy-2. Used for hero layer cards (`bg-ink-2/30`), mobile nav drawer, dropdown backgrounds. |
| `--color-teal` / `text-teal` `bg-teal` | `#19b3c2` | **Primary v4 accent.** Eyebrows, hero accent italics, nav CTA button, active states, count-up numbers, particle lane. |
| `--color-teal-deep` | `#028090` | Legacy teal, secondary. Article body links, gradient stops, dropdown active text. |
| `--color-coral` / `text-coral` `bg-coral` | `#F45B69` | **Urgency / primary CTA button.** Hero "Book a fit call" button, cost/differentiator headline emphasis. Use sparingly — it signals urgency. |
| `--color-purple` | `#553555` | Brand purple. Gradient stops, ambient orbs. Keep scarce. |
| `--color-purple-lift` | `#9a6e9a` | Lighter purple for on-dark dots/lanes (e.g. FourLayers layer 2, hero "Data" lane). |
| `--color-paper` / `text-paper` | `#E4FDE1` | Light. Body text on dark (via opacity, e.g. `text-paper/75`), "Intelligence" accent. |
| `--color-base-bg` | `#080D11` | Body background (`body` in globals + Footer bg). Slightly different from `--color-ink`. |
| `--color-base-surface` | `#111820` | Dark surface (code blocks in article body). |
| `--color-base-border` | `rgba(255,255,255,0.08)` | Default hairline border on dark. |
| `--color-brand-primary` | `#553555` | Legacy alias of purple. |
| `--color-brand-dark` | `#114B5F` | Legacy dark teal. Not used in v4 homepage. |
| `--color-brand-accent` | `#028090` | Legacy alias of teal-deep. |
| `--color-brand-light` | `#E4FDE1` | Legacy alias of paper. |
| `--color-brand-coral` | `#F45B69` | Legacy alias of coral. |
| `--color-neutral-nearBlack` | `#1A1A1A` | Neutral near-black. |
| `--color-neutral-offWhite` | `#F8F8F8` | Neutral off-white. |
| Body default text | `#E8EDF2` | Set on `body` in globals (base foreground on dark). |
| Article body text | `#C8D3DE` | `.article-body` foreground. |
| Muted / caption | `#8899AA` | `.article-body blockquote`. |

**Layer accent colors** (RGB triples, used by `DataFlowHero` canvas + `FourLayers`):
`Context` = `25,179,194` (teal) · `Data` = `154,110,154` (purple-lift) · `Intelligence` = `228,253,225` (paper) · `Automate` = `244,91,105` (coral).

### 3.2 Opacity / overlay conventions

Opacity is expressed via Tailwind slash syntax on the token, e.g.:
- Body copy on dark: `text-paper/75`, `text-paper/80`, `text-paper/65`, `text-paper/60`, `text-paper/45`, `text-paper/40`, `text-paper/30`.
- Hairline borders: `border-white/[0.06]`, `border-white/[0.07]`, `border-white/[0.08]`, `border-white/[0.09]`, `border-white/10`, `border-white/15`.
- Glass fills: `bg-white/[0.025]`, `bg-white/[0.03]`, `bg-white/[0.04]`, `bg-ink-2/30`, `bg-teal/[0.06]`.
- Accent tints: `text-teal/40`, `text-teal/80`, `border-teal/30`.

### 3.3 Font tokens

| Token | Value | Role |
| --- | --- | --- |
| `--font-display` / `--font-serif` | `var(--font-fraunces), Georgia, serif` | Display / headings (v4 uses Fraunces, NOT Montserrat). |
| `--font-body` | `"Proxima Nova", var(--font-inter), sans-serif` | Body, labels, nav, buttons. |
| `--font-fraunces` | injected by `next/font` in layout | Fraunces web font handle. |
| `--font-inter` | injected by `next/font` in layout | Inter, fallback for Proxima Nova. |

Tailwind classes: `font-display` (Fraunces), `font-serif` (Fraunces), `font-body` (Proxima Nova).

### 3.4 Radii

From `tailwind.config.ts` `rounded` / usage in code. No custom radius scale in `@theme`; Tailwind defaults plus `rounded-full` are used.

| Class | Value | Usage |
| --- | --- | --- |
| `rounded-full` | `9999px` | Nav pill, all buttons, eyebrow chips, dots. |
| `rounded-2xl` | `1rem` | Hero layer cards. |
| `rounded-xl` | `0.75rem` | Glass panels, dropdown, cost/label cards, article code/img. |
| `rounded-lg` | `0.5rem` | General. |
| Legacy `DESIGN.md` scale | sm 4 / md 8 / lg 12 / full 9999 | Historical reference only. |

### 3.5 Shadows / glows

Defined inline (arbitrary values) and as globals utilities:
- Nav (scrolled): `shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)]`.
- Coral CTA hover: `hover:shadow-[0_16px_38px_-12px_rgba(244,91,105,0.7)]`.
- Teal CTA hover: `hover:shadow-[0_10px_26px_-8px_rgba(25,179,194,0.7)]`.
- Layer dot glow (hero): inline `boxShadow: 0 0 14px rgb(<color>)`.
- `.glow-purple` (globals): `box-shadow: 0 0 60px rgba(85,53,85,0.4), 0 0 120px rgba(85,53,85,0.15)`.

### 3.6 Blur / glass values

- Nav scrolled: `backdrop-blur-xl`. Nav top: `backdrop-blur-lg`.
- Hero layer cards / glass panels: `backdrop-blur-sm`.
- Dropdown: `backdrop-blur-xl`.
- `.glass-card` (globals): `background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px)`.

### 3.7 maxWidth tokens (tailwind.config.ts)

`content: 1200px` · `prose: 680px` · `form: 560px`. NOTE: the v4 homepage sections do NOT use these; they use arbitrary `max-w-[1560px]` (see Section 5). Legacy pages use the token or their own arbitrary widths.

---

## 4. Typography System

### 4.1 Font families & loading

Two families. The v4 display font is **Fraunces** (a serif), replacing the old Montserrat.

**Fraunces (display / headings)** — loaded via `next/font/google` in `app/layout.tsx`:
```
Fraunces({ weight: ["400","600"], style: ["normal","italic"], subsets: ["latin"], variable: "--font-fraunces", display: "swap" })
```
Available weights: `400`, `600`. Styles: normal + italic (italic is used heavily for accent words, e.g. `<em className="italic text-teal">`). Headings render at `font-normal` (400) in v4, NOT black — the elegance comes from the serif at large sizes, not weight.

**Inter (fallback for Proxima Nova)** — `next/font/google`:
```
Inter({ weight: ["400","500"], subsets: ["latin"], variable: "--font-inter", display: "swap" })
```

**Proxima Nova (body)** — self-hosted `@font-face` in `app/globals.css`, files in `public/fonts/`:
| Weight | woff2 + ttf |
| --- | --- |
| 300 Light | `ProximaNova-Light.woff2` / `.ttf` |
| 400 Regular | `ProximaNova-Regular.woff2` / `.ttf` |
| 600 Semibold | `ProximaNova-Semibold.woff2` / `.ttf` |
| 800 Extrabold | `ProximaNova-Extrabold.woff2` / `.ttf` |
All with `font-display: swap`.

Both `next/font` variables are attached to `<html>`: `className={\`${fraunces.variable} ${inter.variable}\`}`. `<body>` gets `font-body antialiased`. Global `body` CSS also hard-sets `font-family: "Proxima Nova", var(--font-inter), sans-serif` and `color:#E8EDF2; background:#080D11`.

### 4.2 Type scale — tokenized (`@theme` + tailwind.config.ts)

These named sizes exist as tokens but the v4 homepage mostly uses `clamp()` arbitrary values (4.3). Tokenized scale:

| Token / class | Size | Line height | Weight |
| --- | --- | --- | --- |
| `text-hero` | `3.5rem` (56px) | 1.1 | 900 |
| `text-page-h1` | `3rem` (48px) | 1.1 | 900 |
| `text-section-h2` | `2.5rem` (40px) | 1.15 | 900 |
| `text-subsection-h3` | `1.625rem` (26px) | 1.2 | 900 |
| `text-label-h4` | `0.8125rem` (13px) | 1.4 | 500 |
| `text-body-lg` | `1.125rem` (18px) | 1.65 | — |
| `text-body-std` | `1rem` (16px) | 1.65 | — |
| `text-body-sm` | `0.875rem` (14px) | 1.6 | — |
| `text-cta-btn` | `0.9375rem` (15px) | — | 500 |
| `text-nav-link` | `0.875rem` (14px) | — | 500 |
| `text-footer-text` | `0.8125rem` (13px) | 1.5 | — |

> The `900` weights are legacy (Montserrat-era) values still in the token block. v4 headings render Fraunces at `font-normal`; the tokens are not the truth for the homepage. See 4.3 for what the homepage actually uses.

### 4.3 Type scale — actually used on the v4 homepage (authoritative)

Headings use `font-display font-normal` + fluid `clamp()` + tight tracking. Standard patterns:

| Role | Exact classes |
| --- | --- |
| Hero H1 | `font-display font-normal text-[clamp(38px,5vw,68px)] leading-[1.05] tracking-[-0.02em] text-white` |
| Section H2 | `font-display font-normal text-[clamp(28px,4.2vw,54px)] leading-[1.06] tracking-[-0.02em] text-white` (variants: `4.4vw,58px`; `4.6vw,58px`; Proof `3.8vw,50px` with `leading-[1.06]`) |
| Layer name H3 (FourLayers) | `font-display font-normal text-[clamp(22px,2.8vw,38px)] leading-none tracking-[-0.01em]` + per-layer color class |
| Large display number (Proof) | `font-display font-normal text-[clamp(64px,8vw,96px)] leading-none tracking-[-0.03em] text-teal tabular-nums` |
| Eyebrow (section) | `text-[11px] tracking-[0.22em] uppercase text-teal font-semibold` (inline-block, `mb-5`/`mb-6`) |
| Eyebrow (hero chip) | `text-[13px] tracking-[0.16em] uppercase text-teal border border-teal/30 rounded-full px-4 py-1.5 bg-teal/[0.06]` |
| Body paragraph | `text-[clamp(15px,1.15vw,17px)] leading-[1.75] text-paper/75` |
| Hero subcopy | `text-[clamp(16px,1.4vw,18px)] leading-relaxed text-paper/80 max-w-[480px]` |
| Small label / caption | `text-[11px] tracking-[0.18em] uppercase text-paper/40 font-semibold` (or `/45`, `/50`) |
| Marquee ticker | `text-[11px] tracking-[0.22em] uppercase text-paper/30 font-medium` |

**Conventions:**
- Headings: `leading-[1.04]`–`1.06` (or `leading-none` for single-line display), tracking `-0.01em` to `-0.03em`.
- Body: `leading-[1.75]` (or `leading-relaxed`), no negative tracking.
- Eyebrows/labels: uppercase, wide positive tracking `0.16em`–`0.22em`, semibold/medium.
- Accent emphasis inside headings: `<em className="italic text-teal">` or `text-coral` (coral reserved for urgency/cost framing).
- Never use weight 900 / `font-black` on new v4 headings. That is legacy Montserrat styling.

### 4.4 Article body typography (`.article-body` in globals)

Used by `/resources/[slug]`. `font-family: Proxima Nova; 1.125rem; line-height 1.75; color #C8D3DE`. `h2`/`h3` use `var(--font-display)` at weight 700, white. Links `#028090` → hover `#02a0b0` underline. `blockquote` 4px teal left border, italic, `#8899AA`. Code blocks `#111820` bg, `0.75rem` radius. `li::marker` teal.

---

## 5. Layout & Spacing System

### 5.1 Container (v4 standard)

The v4 homepage sections use a WIDE container, NOT the `max-w-content` (1200px) token:
```
max-w-[1560px] mx-auto px-6 sm:px-8 lg:px-10
```
Gutter scale: `px-6` (24px) mobile → `sm:px-8` (32px) → `lg:px-10` (40px).

**Exceptions / inconsistencies to know:**
- `CostOfStayingSame` inner grid wrapper: some inner blocks reference `lg:px-10` inline — same gutter.
- Hero (`DataFlowHero`): `max-w-[1560px] mx-auto px-6 sm:px-8 lg:px-10 pt-36 lg:pt-40 pb-20`.
- Marquee ticker divider: full-bleed, `py-4 px-6 lg:px-12`.
- **Footer** uses a NARROWER container: `max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12`. This is intentional (footer reads tighter) but differs from section width — document, do not "fix" without Shannon.
- Legacy pages use `max-w-[1100px]`, `max-w-[936px]`, `max-w-content`, etc. (see Section 16).

**Standard for new v4 sections:** `max-w-[1560px] mx-auto px-6 sm:px-8 lg:px-10`.

### 5.2 Section vertical padding

Standard section rhythm: `py-24 md:py-32` (96px → 128px). Variants:
- Hero: `pt-36 lg:pt-40 pb-20` (extra top clearance for the fixed nav).
- FinalCta: `py-24 md:py-36` (taller closer).
- Marquee divider: `py-4`.

### 5.3 Hero grid

```
grid lg:grid-cols-[1fr_460px] items-center gap-10
```
Left column fluid (headline block), right column fixed `460px` (the animated layer stack + canvas). Collapses to single column below `lg`. Right column height: `h-[480px] lg:h-[540px]`, layer stack `flex flex-col justify-center gap-[60px]`.

### 5.4 Other grid patterns (two-column sections)

| Section | Grid |
| --- | --- |
| CostOfStayingSame | `grid lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24 items-start` |
| Differentiator | `grid lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24 items-center` |
| Proof | `grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-start` |
| FourLayers rows | `grid grid-cols-[2.5rem_1fr] md:grid-cols-[5rem_1fr_1.8fr] gap-x-6 md:gap-x-12 gap-y-2 py-7 md:py-8 items-start` |
| WhatWeDo header | centered, `max-w-[680px] mx-auto` |

### 5.5 Breakpoints

Tailwind defaults: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280. The v4 site pivots primarily at `md` (type/padding) and `lg` (grid collapse, nav desktop/mobile). No custom breakpoints defined.

### 5.6 Spacing between elements

Common gaps: heading→body `mt-6`/`mt-8`; eyebrow `mb-5`/`mb-6`; body paragraph stacks `space-y-5`; CTA row `mt-9 gap-3.5`; card padding `px-5 py-4` / `px-6 py-5` / `px-7 py-6`.

---

## 6. Surface & Effect Specs

### 6.1 Navigation glass pill

Fixed, centered, capsule:
```
fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5 lg:pt-6
  inner: flex items-center justify-between w-full max-w-[920px] rounded-full
         border border-white/10 pl-6 pr-2 py-2 transition-all duration-300
```
- Top of page: `bg-ink/40 backdrop-blur-lg`.
- Scrolled: `bg-ink/70 backdrop-blur-xl shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)]`.
- Entrance: inline `animation: navDrop 0.8s cubic-bezier(0.2,0.8,0.2,1) both`.

### 6.2 Glass panels / cards

- Hero layer card: `bg-ink-2/30 border border-white/[0.09] rounded-2xl px-5 py-4 backdrop-blur-sm`, with a glowing dot (`w-2.5 h-2.5 rounded-full`, inline `boxShadow: 0 0 14px rgb(<color>)`).
- Cost/label cards: `rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-5 py-4`.
- Closing "trust" panels (FourLayers, Differentiator, Proof): `rounded-xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm px-6/px-7 py-5/py-6`.
- Dropdown: `bg-[#0d1a4a]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-xl`.

### 6.3 Borders & dividers

Hairlines are always white-on-dark at low opacity (`border-white/[0.06]`–`/15`). FourLayers uses `divide-y divide-white/[0.07]` for its editorial row list. Marquee divider: `border-y border-white/[0.07]`.

### 6.4 Gradients

- Section ambient glows (inline `style.background`, `pointer-events-none absolute inset-0`, `aria-hidden`):
  - CostOfStayingSame: `radial-gradient(ellipse 70% 50% at 100% 60%, rgba(244,91,105,0.08), ...)` (coral).
  - Proof: `radial-gradient(ellipse 55% 50% at 50% 100%, rgba(25,179,194,0.07), transparent 65%)` (teal).
  - Differentiator: section bg `linear-gradient(115deg, #10182f 0%, #1a1430 55%, #2a1422 100%)`.
  - FinalCta: `radial-gradient(80% 140% at 20% 0%, rgba(25,179,194,0.14) 0%, transparent 60%), #0b1230`.
  - FourLayers: `linear-gradient(115deg, ...)` panel (see component).
- Text gradients (globals utilities): `.gradient-text` (`#E4FDE1 → #028090 → #553555`), `.gradient-text-coral` (`#F45B69 → #553555`).
- `.gradient-border` (globals): 1px masked border, `linear-gradient(135deg, rgba(2,128,144,0.5), rgba(85,53,85,0.5))`.

### 6.5 Ambient orbs

`app/page.tsx` renders full-page ambient orbs: a `fixed inset-0 pointer-events-none overflow-hidden` `aria-hidden` layer behind everything (blurred purple/teal radial blobs). Sections sit in a `relative` wrapper with `zIndex: 1` above the orbs. A separate `components/FloatingOrbs.tsx` exists for reuse.

### 6.6 DataFlowHero canvas particle system

Client component (`"use client"`), `<canvas>` absolutely positioned in the hero right column (`absolute inset-0 w-full h-full z-0`, `aria-hidden`). Behavior:
- **Lanes:** one vertical lane per layer (4 lanes: Context/Data/Intelligence/Automate). Lane X positions: `w * (0.16 + 0.68 * (i/(cols.length-1)))`. Each lane drawn as a vertical `linearGradient` stroke, `lineWidth 1.5`, alpha ramp `0 → 0.1 → 0` (so lanes fade at top/bottom).
- **Particles:** spawn at a random lane, `y=-10`, velocity `0.7 + rand*1.1`, radius `1.2 + rand*1.8`, colored with the lane's RGB. Each particle drawn as a short trailing line (`moveTo(p.x, p.y-10) → lineTo(p.x,p.y)`, alpha 0.35) plus a filled dot (alpha 0.9). Removed when `y > h+10`.
- **Cap:** max 90 particles; spawn probability gated per frame (`Math.random() < ~0.x`).
- **DPR:** `Math.min(devicePixelRatio, 2)`, canvas sized to client box, transform reset each resize.
- **Reduced motion:** if `matchMedia("(prefers-reduced-motion: reduce)")` matches, particles do not advance (`p.y += p.v` is skipped) and no new spawns — the lanes render statically.

---

## 7. Motion & Animation Standards

### 7.1 Framer Motion primitives (`components/`)

- **`motion.tsx`** — thin re-export barrel: `export { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"`.
- **`FadeIn.tsx`** — scroll-reveal wrapper. Props: `children`, `delay=0`, `direction: "up"|"left"|"right"|"none" (default "up")`, `className=""`. Uses `useInView(ref, { once: true, margin: "-80px" })`. Hidden variant offsets `y:40` (up) or `x:∓40` (left/right); visible resets to 0. Transition `duration: 0.6, delay, ease: [0.25,0.46,0.45,0.94]`.
- **`StaggerChildren.tsx`** — exports `StaggerChildren` (container, `useInView once margin "-60px"`, `staggerChildren: 0.12`) and `StaggerItem` (child, hidden `opacity:0 y:30` → visible with `duration: 0.5, ease:[0.25,0.46,0.45,0.94]`).
- **`ScrollProgress.tsx`** — client top-of-page progress bar. Tracks `scrollY / (body.scrollHeight - innerHeight) * 100` into state. (Not mounted on the homepage; available for long pages.)

**Standard reveal pattern:** wrap a section (or the whole module in `page.tsx`) in `<FadeIn>`; wrap paragraph lists in `<StaggerChildren>` with each item in `<StaggerItem>`. The homepage wraps every section in `<FadeIn>` except `FinalCta` (which animates internally).

### 7.2 CSS keyframes (`app/globals.css` + inline)

| Keyframe | Definition | Used by |
| --- | --- | --- |
| `navDrop` | `from{opacity:0;translateY(-16px)} to{opacity:1;translateY(0)}` | Nav pill entrance (`0.8s cubic-bezier(0.2,0.8,0.2,1)`). |
| `float` | `0/100%{translateY(0)} 50%{translateY(-12px)}` | `.animate-float` (6s), `.animate-float-delayed` (6s +2s delay). |
| `pulse-glow` | `0/100%{opacity:0.4} 50%{opacity:0.8}` | `.animate-pulse-glow` (3s). |
| `gradient-shift` | background-position 0→100→0% | gradient animated backgrounds. |
| `marquee` | inline in `page.tsx`: `from{translateX(0)} to{translateX(-25%)}` | section divider ticker (`32s linear infinite`, `width: max-content`, 4× repeated content so -25% loops seamlessly). |

### 7.3 Reduced-motion fallbacks

- Marquee: inline `@media (prefers-reduced-motion: reduce) { .marquee-inner { animation: none; } }` (in `page.tsx`).
- DataFlowHero canvas: pauses particle movement and spawning (7.6 / 6.6).
- Proof `InlineCountUp` + `CountUpStats`: if reduced-motion, set final value immediately, skip the RAF tween.
- **Standard for new motion:** every non-trivial animation MUST have a `prefers-reduced-motion: reduce` path (either `animation: none`, or jump-to-final-state). Reveal animations via `FadeIn`/`StaggerChildren` are acceptable as-is (short, opacity-based). Continuous/looping motion (marquee, canvas, count-up) MUST be gated.

### 7.4 Count-up standard

Two implementations:
- **`Proof` → `InlineCountUp`** (inline, renders just the number, NO wrapping section): `duration 1400ms`, ease-out cubic (`1 - (1-t)^3`), RAF loop, reduced-motion → instant. Rendered inside a `<span>` with `tabular-nums suppressHydrationWarning`.
- **`CountUpStats.tsx`** (standalone): renders its OWN `<section>`. Props `stats?: Stat[]` where `Stat = { target, suffix?, prefix?, label }`. Default stats: `10+ Hours/Week Back`, `47 Tasks Automated`, `5 Layers Deep`, `$0 New Tools Needed`. Uses `easeOutExpo`, IntersectionObserver-style trigger (`hasTriggered` ref, once).

**Hard rule:** `CountUpStats` renders its own `<section>` — NEVER nest it inside another `<section>`. When you need an inline number inside an existing section (as Proof does), use the `InlineCountUp` pattern instead.

---

## 8. Component Library

Every homepage-standard component. Class strings are the exact rendered output.

### 8.1 `DataFlowHero` (`components/DataFlowHero.tsx`) — client
The hero. Left = headline block, right = animated 4-layer stack over the particle canvas.

**Props** (all optional, have defaults):
```ts
type Layer = { name: string; desc: string; color: string };
type Props = {
  eyebrow?: string;          // default "Business AI Operating System"
  headline?: React.ReactNode; // default first-person JSX (see gotcha)
  subcopy?: string;          // default first-person paragraph
  primaryCta?: { label: string; href: string };   // default {"Book a fit call","/work-with-me"}
  secondaryCta?: { label: string; href: string };  // default {"See the system","/business-ai-operating-system"}
  layers?: Layer[];          // default LAYERS (Context/Data/Intelligence/Automate w/ RGB colors)
};
```
**Structure:** `<section className="relative grid lg:grid-cols-[1fr_460px] items-center gap-10 max-w-[1560px] mx-auto px-6 sm:px-8 lg:px-10 pt-36 lg:pt-40 pb-20">`. Eyebrow chip → H1 → subcopy → CTA row (coral primary `bg-coral text-white ... px-7 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-[...coral]`, ghost secondary `border border-white/15`). Right column layer cards (8.2 glass) + canvas (6.6).

**GOTCHA:** the component's default `headline`/`subcopy` are written in first person ("I find your single most expensive bottleneck..."). The typed copy deck `homeCopy.hero` is written in "we" voice. Whichever the homepage passes wins. Confirm which voice renders before editing (see Section 10 voice conflict + Section 16).

### 8.2 Hero layer card (inline in DataFlowHero)
`relative z-10 flex items-center gap-4 bg-ink-2/30 border border-white/[0.09] rounded-2xl px-5 py-4 backdrop-blur-sm`; dot `w-2.5 h-2.5 rounded-full` (inline bg + `0 0 14px` glow); name `font-display text-[19px] text-white`; desc `text-[13px] text-paper/60 ml-auto text-right`.

### 8.3 `Navigation` (`components/Navigation.tsx`) — client
Fixed glass pill (6.1). No props. State: `scrolled` (scroll listener), `mobileOpen`, `resourcesOpen` (+ outside-click ref).
- `navLinks`: `/business-ai-operating-system` "Business AIOS", `/why-revaya` "Why Revaya", `/business-ai-os-assessment` "Assessment Quiz".
- `resourcesDropdown`: `/resources` "Articles", `/ai-prep-check` "AI Prep Check", `/business-ai-os-assessment` "Assessment Quiz".
- Logo: `next/image` `/revaya-logo-white.png` (140×40 area).
- Desktop CTA: `font-display text-[0.875rem] font-semibold px-5 py-2.5 rounded-full bg-teal text-[#04121a] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-8px_rgba(25,179,194,0.7)] transition-all duration-200`.
- Dropdown: `AnimatePresence` + `motion.div` (`initial opacity0 y-6` → animate; `duration 0.15`), `w-52 bg-[#0d1a4a]/95 backdrop-blur-xl`. Active link `text-[#028090] bg-white/[0.04]`.
- Mobile: hamburger toggles a `motion.div` drawer (`height 0 → auto`, `duration 0.2`), `bg-[#0D1A4A] border-b border-white/[0.06] px-6 py-4 flex flex-col gap-4`.
- **Rule:** the nav uses `text-[#028090]` (teal-deep) for active dropdown state and `bg-teal` (`#19b3c2`) for the CTA — two different teals by design.

### 8.4 `Footer` (`components/Footer.tsx`) — server
`<footer className="bg-[#080D11] text-white border-t border-white/[0.06]">`, container `max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12`. Columns: Brand (logo 140×40 + tagline "Stop being the business. Start owning one."), Nav, Resources, Legal+social. Link style `text-[0.8125rem] text-white/55 hover:text-white transition-colors`. LinkedIn: `https://www.linkedin.com/company/revaya-ai` (`target=_blank rel="noopener noreferrer"`). Legal: `/privacy-policy`, `/terms-of-use`.

### 8.5 Section components (`components/sections/*.tsx`) — all client, all `{ copy }`-driven
Each imports `FadeIn`/`StaggerChildren` + its typed copy interface from `@/lib/copy/round1`.

| Component | Props interface | Section bg/effect | Grid | Notes |
| --- | --- | --- | --- | --- |
| `CostOfStayingSame` | `{ copy: CostOfStayingSameCopy }` | coral ambient radial glow | `1fr_1.15fr` | Left heading + two "currency" label cards ("Calculation by Head" / "by Hourly $"). Right: body paras in `StaggerChildren`. |
| `WhatWeDo` | `{ copy: WhatWeDoCopy }` | top divider glow line | centered header `max-w-[680px]` | Eyebrow + heading; steps/body from copy. Contains a `Link` CTA. |
| `FourLayers` | `{ copy: FourLayersCopy }` | `linear-gradient(115deg,...)` panel | editorial rows `divide-y` | `LAYER_COLORS` array maps index→dot hex + label class (teal / `#9a6e9a` / paper / coral). Rows: `0{i+1}` number, H3 name, body. Closing trust panel. |
| `Differentiator` | `{ copy: DifferentiatorCopy }` | `linear-gradient(115deg,#10182f→#1a1430→#2a1422)` | `1.3fr_1fr` | `TRUST_SIGNALS` const array (4 label/desc pairs: Specialized agents / Full audit trails / You see every move / Augment first). |
| `Proof` | `{ copy: ProofCopy }` | teal ambient radial | `1.3fr_1fr` | `InlineCountUp` (target 18) big teal number; `copy.brands` chips ("Built across"); `proofSlotPlaceholder` reserved for first named client result. |
| `FinalCta` | `{ copy: FinalCtaCopy }` | `radial(...teal 0.14), #0b1230` | centered | Not wrapped in `FadeIn` by the page (animates internally). Single `Link` CTA. |

### 8.6 `FadeIn`, `StaggerChildren`/`StaggerItem`, `ScrollProgress`, `motion` — see Section 7.1.

### 8.7 `CountUpStats` (`components/CountUpStats.tsx`) — client. See 7.4. Renders its own `<section>`.

### 8.8 `GlowCTA` (`components/GlowCTA.tsx`) — server
Props `{ heading, subtext?, buttonText, buttonHref }`. Renders `<section className="py-24 md:py-32 text-center relative">`, `font-display text-3xl md:text-5xl font-black text-white` heading (NOTE: uses `font-black` — a legacy weight; the v4 sections use `font-normal`), a link button with arrow SVG. Used on some non-homepage pages. When bringing a page to standard, prefer the `FinalCta` pattern over `GlowCTA`.

### 8.9 `JsonLd` (`components/JsonLd.tsx`) — server
Renders a `<script type="application/ld+json">` with the passed `data` object (schema from `lib/schema.ts`). Used in layout (org schema) and homepage (`homeWebPageSchema`). See Section 12.

### 8.10 `ContactForm` (`components/ContactForm.tsx`) — client. See Section 11.

### 8.11 Other components present (not on homepage): `FaqAccordion`, `FloatingOrbs`, `GridOverlay`, `resources/CategoryPill`, `resources/Resource*`, `why-revaya/TimelinePanel`. Document individually when brought to standard.

---

## 9. Homepage Module Specs (`app/page.tsx`, top to bottom)

Root: `<div className="bg-ink text-paper overflow-hidden">`. `metadata` exported (title "Business AI Operating System for Business Owners | Revaya AI"). `<JsonLd data={homeWebPageSchema} />`.

1. **Ambient orbs** — `fixed inset-0 pointer-events-none overflow-hidden` `aria-hidden` blurred purple/teal radial blobs, behind everything (6.5).
2. **Hero** — `<DataFlowHero />` (rendered near top of page; uses its prop defaults — confirm voice). Composition per 8.1.
3. **Section divider ticker (marquee)** — `relative overflow-hidden border-y border-white/[0.07] py-4 px-6 lg:px-12`, `zIndex:1`. Inner `.marquee-inner` scrolls the token list `["Context","Data","Intelligence","Automate","Full audit trail","No black box","One problem first"]` repeated 4×, `animation: marquee 32s linear infinite`, `text-[11px] tracking-[0.22em] uppercase text-paper/30`. Separators `text-teal/40 "/"`. Inline reduced-motion rule.
4. **Sections wrapper** — `<div className="relative" style={{zIndex:1}}>` containing, each wrapped in `<FadeIn>` (except FinalCta):
   - `<CostOfStayingSame copy={homeCopy.costOfStayingSame} />`
   - `<WhatWeDo copy={homeCopy.whatWeDo} />`
   - `<FourLayers copy={homeCopy.fourLayers} />`
   - `<Differentiator copy={homeCopy.differentiator} />`
   - `<Proof copy={homeCopy.proof} />`
   - `<FinalCta copy={homeCopy.finalCta} />`

All section copy comes from `lib/copy/round1.ts` → `homeCopy`. Spacing is each section's own `py-24 md:py-32`. Responsive: all two-column grids collapse to single column below `lg`. Nav + Footer come from `app/layout.tsx` (wrap every page).

**Gotchas:** (a) sections sit above orbs via `zIndex:1`; keep that wrapper. (b) `overflow-hidden` on the root prevents horizontal scroll from wide ambient gradients — do not remove. (c) FinalCta is deliberately NOT `FadeIn`-wrapped.

---

## 10. Copy System

### 10.1 Typed copy pattern (`lib/copy/`)

Home copy lives in `lib/copy/round1.ts` as a single typed object `homeCopy: HomeCopy`. Every section has an exported interface (`HeroCopy`, `CostOfStayingSameCopy`, `WhatWeDoCopy`, `FourLayersCopy`, `DifferentiatorCopy`, `ProofCopy`, `FinalCtaCopy`) and the section component imports `type ...Copy` and takes `{ copy }`. Header comment: *"Round 1 copy deck — home page only. Source: `plans/open/2026-06-18-revaya-website-round1-copy-deck.md`. Do not edit copy here without updating the source doc."*

**Pattern for editing/adding copy:**
1. Update the source doc (`plans/open/2026-06-18-...copy-deck.md`).
2. Update the string in `lib/copy/round1.ts` (keep the interface shape; add fields to the interface first if the module needs a new one).
3. The component renders it — no component edit needed unless structure changes.
4. Update `website.md` if the change alters a documented pattern.

### 10.2 Brand voice guardrails (apply to ALL site copy)

- **Voice is "I", never "we".** Revaya is solo-operator (Shannon Winnicki).
- **No em dashes or en dashes or hyphens as sentence breaks.** Commas or periods only. (`DESIGN 2.md` also states "Never use em dashes.")
- **No emojis, ever.**
- **Every claim needs a specific number, name, or date.** Cite sources for stats.
- **Lead with the problem, not the tool.**
- **No dollar figures anywhere on the marketing site.** (Pricing is never surfaced in copy.)
- **Ownership language:** clients own their DATA and their RESULTS; Revaya owns and runs the SYSTEM. Never write "you own the system" or "no vendor lock-in." Approved framing already in copy: *"you own the Blueprint regardless of what you decide,"* *"Control transfers the moment you are ready."*
- Terminology: **"AI Operating System"** in visible body copy; **"Business AI Operating System"** retained in SEO titles/meta/schema (Section 12).

### 10.3 KNOWN VOICE CONFLICT (gap to resolve)

`lib/copy/round1.ts` `homeCopy` is written in **"we" voice** ("We start with the problem... We find your single most expensive bottleneck..."), which VIOLATES the "always I" rule. Meanwhile `DataFlowHero`'s default headline/subcopy are in **"I" voice**. This is an unresolved inconsistency. `UNSPECIFIED — needs decision`: the entire round1 copy deck should be converted to first person ("I") before the site is considered on-standard, OR Shannon confirms a deliberate "we" exception. Flag, do not silently change.

---

## 11. Backend & Integrations

### 11.1 ContactForm → API → Supabase + Resend

**Client** `components/ContactForm.tsx` collects: `name, email, phone, company, businessDescription, teamSize, annualRevenue, bottleneck, triedSoFar, linkedinUrl, marketingOptIn`. Posts JSON to `POST /api/contact`.

**Route** `app/api/contact/route.ts` (`export const dynamic = "force-dynamic"`):
1. Parse body. **Validation:** require `name`, `email`, `bottleneck` → else `400 { error }`.
2. **Supabase (non-blocking, try/catch):** if `NEXT_PUBLIC_SUPABASE_URL` and (`SUPABASE_SERVICE_ROLE_KEY` ?? `NEXT_PUBLIC_SUPABASE_ANON_KEY`) present, `createClient` and:
   - `insert` into table **`contact_form_leads`** (columns: name, email, phone, company, business_description, team_size, annual_revenue, bottleneck, tried_so_far, linkedin_url, opted_in, intake_triggered=false).
   - If `marketingOptIn`, `upsert` into **`email_subscribers`** (email, name, source="contact_form", consent_method="contact_form_checkbox", `onConflict:"email"`).
3. **Intake system (fire-and-forget):** if `INTAKE_SYSTEM_URL` set, POST a normalized lead (first/last name split, `interested_in:"Business AI OS"`, `pain_points: bottleneck`, etc.).
4. **Resend (non-blocking):** if `RESEND_API_KEY` present and not a `re_placeholder`, dynamic-import `resend`:
   - Notify Shannon: from `Revaya AI Contact Form <noreply@revaya.ai>`, to `shannon@revaya.ai`, replyTo visitor.
   - Confirmation to visitor (48-hour reply promise).
   If no key: logs to console instead.
5. Return success JSON.

**No Turnstile / CAPTCHA verification exists in this route.** (See Section 2.)

### 11.2 All `app/api/` routes

| Route | Method | Input | Behavior | Responses |
| --- | --- | --- | --- | --- |
| `/api/contact` | POST | contact fields | Supabase insert/upsert + intake webhook + Resend (11.1) | `400` missing fields; `200 {success}`; DB/email failures swallowed |
| `/api/admin-auth` | POST | `{ password }` | Compares to `ASSESSMENT_ADMIN_PASSWORD` | `500` not configured; `401` invalid; `200 {ok:true}` |
| `/api/save-assessment` | POST | `{ email, name, answers, results, optedIn=true }` | Requires `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`; writes to table **`assessment_responses`** (imports question set from `app/business-ai-os-assessment/data/questions`) | `400` missing; `500` config error; `200` |
| `/api/assessment-notification` | POST | `{ name, email, category, lowestSection, totalMonthlyOpportunity, annualOpportunity }` | Resend notify Shannon + Slack webhook (`SLACK_WEBHOOK_URL`) | `200 {success}`; `500` |
| `/api/prep-check-results` (AI Prep Check) | POST | tier/result fields | Resend results email to visitor (from `Shannon Winnicki, Revaya AI <shannon@revaya.ai>`) | `200 {success}`; `500` |

All assessment/contact routes are `dynamic = "force-dynamic"`.

### 11.3 Supabase client (`lib/supabaseClient.ts`)
`createClient(NEXT_PUBLIC_SUPABASE_URL!, NEXT_PUBLIC_SUPABASE_ANON_KEY!)` — public/anon client for client-side reads. Server routes create their own service-role client inline.

Supabase project: existing project `usmrbfzendtfmvuyrmls` (per `.env.example` comment). Tables touched: `contact_form_leads`, `email_subscribers`, `assessment_responses`.

### 11.4 Environment variable NAMES (values NEVER in this doc or in git)
From `.env.example` and code references:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `SLACK_WEBHOOK_URL`, `INTAKE_SYSTEM_URL`, `ASSESSMENT_ADMIN_PASSWORD`, `AIRTABLE_TOKEN`, `AIRTABLE_CONTACTS_BASE_ID`, `AIRTABLE_CONTACTS_TABLE`.
(Airtable vars appear in `.env.example` for contact storage but the current `/api/contact` route uses Supabase, not Airtable — Airtable path appears legacy/unused. `UNSPECIFIED — needs decision`: confirm whether Airtable is still wired anywhere.)

---

## 12. SEO & AEO Implementation

### 12.1 Metadata

**Layout default** (`app/layout.tsx`): `metadataBase: https://www.revaya.ai`, title template `"%s | Revaya AI"`, default `"Business AI Operating System for Owner-Operators | Revaya AI"`, description + keywords (Business AI Operating System, Business AI OS, AI consultant, Shannon Winnicki, Revaya AI), OpenGraph (type website, siteName Revaya AI, `/images/og-default.png` 1200×630), Twitter `summary_large_image`, Bing verification `msvalidate.01`. `viewport: { width: device-width, initialScale: 1 }`.

**Per-page** each `page.tsx` exports its own `metadata` (homepage title "Business AI Operating System for Business Owners | Revaya AI"). NOTE: layout default still says "Owner-Operators"; homepage says "Business Owners" — reflects the terminology migration. `UNSPECIFIED — needs decision`: align layout default title to "Business Owners".

**Naming rule:** use **"AI Operating System"** in visible body copy; retain **"Business AI Operating System"** in SEO titles/meta/schema. Both are intentional.

### 12.2 Structured data (`components/JsonLd.tsx` + `lib/schema.ts`)
- Layout injects `organizationSchema` on every page.
- Homepage injects `homeWebPageSchema`.
- Comparison pages inject page-specific schema (e.g. `claudeCodeComparisonPageSchema(url)`, `openClawComparisonPageSchema`) with rich `author` (Shannon Winnicki, Founder), `about`, and `mentions` (named people + dated facts — strong AEO signal).

### 12.3 `sitemap.ts`
Static entries (home priority 1.0; `/business-ai-operating-system` 0.9; comparison pages 0.85; `/why-revaya` + assessment 0.8; `/work-with-me` + `/ai-prep-check` 0.7) plus dynamic resource entries from `getAllResources()` (`/resources/<slug>`, priority 0.7, lastModified from frontmatter). All absolute `https://www.revaya.ai` URLs.

### 12.4 `robots.ts`
Allow all `/`, disallow `/api/`. Explicitly allow AI crawlers: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` (AEO posture — let answer engines crawl). Sitemap at `https://www.revaya.ai/sitemap.xml`.

### 12.5 `next.config.ts` redirects
Permanent 301s consolidate legacy URLs: `/about → /why-revaya`, `/ai-solutions` + `/ai-website-services` + `/website-redesign-services` + `/website-audit-small-business → /business-ai-operating-system`, `/get-in-touch` + `/contact → /work-with-me`, `/portfolio → /`, `/blog → /resources`. `outputFileTracingRoot: __dirname`.

---

## 13. Responsive & Accessibility Standards

- **Breakpoints:** Tailwind defaults; primary pivots `md` (type/padding) and `lg` (grid collapse, nav desktop→mobile).
- **Mobile nav:** hamburger → animated drawer (8.3). Desktop nav hidden below `lg` (`hidden lg:flex`), hamburger `flex lg:hidden`.
- **Overflow:** root homepage `div` is `overflow-hidden` to contain wide ambient gradients — prevents horizontal scroll. Wide/animated layers are `overflow-hidden` per section. Any new wide content (tables, diagrams) must scroll inside its own `overflow-x:auto` container; the page body must never scroll horizontally.
- **Reduced motion:** honored for marquee, canvas, count-ups (Section 7.3). New continuous motion MUST honor it.
- **Decorative layers:** all ambient/orb/gradient/canvas layers carry `aria-hidden="true"` and `pointer-events-none`.
- **Contrast:** body text on dark is `#E8EDF2`/`text-paper/75+` on `#070b1c`/`#080D11` — high contrast. `DESIGN 2.md` mandates 4.5:1 for body text. Verify any text below `text-paper/60` on lighter panels.
- **Alt text:** logo images use `alt="Revaya AI"`. Decorative canvas/orbs are `aria-hidden`. All meaningful images need descriptive alt (OG image alt set in metadata).
- **Focus:** relies on browser defaults + `next/link`. `UNSPECIFIED — needs decision`: no custom visible focus-ring styling defined; add a consistent `focus-visible` ring when hardening.
- **Reduced-motion + hydration:** count-up spans use `suppressHydrationWarning` + `tabular-nums`.

---

## 14. File & Folder Structure Map

```
revaya-ai-website/
├── app/
│   ├── layout.tsx                # Root: fonts, metadata defaults, GA, Nav+Footer, Analytics
│   ├── page.tsx                  # HOMEPAGE — the standard
│   ├── globals.css               # @theme tokens, @font-face Proxima, keyframes, .article-body
│   ├── sitemap.ts                # Static + dynamic resource URLs
│   ├── robots.ts                 # AI-crawler-friendly
│   ├── not-found.tsx             # 404 (legacy styling)
│   ├── api/
│   │   ├── contact/route.ts              # Supabase + Resend + intake
│   │   ├── admin-auth/route.ts           # Assessment admin password
│   │   ├── save-assessment/route.ts      # → assessment_responses
│   │   ├── assessment-notification/route.ts  # Resend + Slack
│   │   └── prep-check-results/route.ts   # AI Prep Check email
│   ├── business-ai-operating-system/     # Service page (legacy)
│   ├── why-revaya/ (+ TimelinePanel.tsx) # About (legacy)
│   ├── work-with-me/                     # Contact page (legacy, Montserrat refs)
│   ├── solutions/                        # (legacy)
│   ├── resources/ (page.tsx, page-v1.tsx, [slug]/page.tsx)  # Article center
│   ├── business-ai-os-assessment/ (page, admin/, data/questions)
│   ├── ai-prep-check/
│   ├── business-ai-os-vs-openclaw/ (+ ComparisonPage.tsx)
│   ├── business-ai-os-vs-claude-code-obsidian/ (+ ClaudeCodeComparisonPage.tsx)
│   ├── privacy-policy/  ├── terms-of-use/
├── components/
│   ├── DataFlowHero.tsx  Navigation.tsx  Footer.tsx        # homepage chrome
│   ├── sections/ CostOfStayingSame Differentiator FinalCta FourLayers Proof WhatWeDo
│   ├── FadeIn.tsx  StaggerChildren.tsx  motion.tsx  ScrollProgress.tsx   # motion
│   ├── CountUpStats.tsx  GlowCTA.tsx  FloatingOrbs.tsx  GridOverlay.tsx   # effects/legacy
│   ├── JsonLd.tsx  ContactForm.tsx  FaqAccordion.tsx
│   └── resources/ CategoryPill Resource*                    # resource UI
├── lib/
│   ├── copy/round1.ts            # Typed home copy deck (source of truth = plans/open doc)
│   ├── schema.ts                 # JSON-LD builders (org, home, comparison pages)
│   ├── supabaseClient.ts         # anon client
│   └── resources.ts              # markdown resource loader (frontmatter → getAllResources)
├── public/
│   ├── fonts/                    # ProximaNova Light/Regular/Semibold/Extrabold (woff2+ttf)
│   ├── revaya-logo-white.png     # nav + footer logo
│   └── images/og-default.png     # 1200×630 OG
├── scripts/                      # (build/util scripts)
├── tailwind.config.ts  next.config.ts  postcss.config.mjs  tsconfig.json  package.json
├── DESIGN.md  DESIGN 2.md        # SUPERSEDED (pre-v4 Montserrat era)
└── website.md                    # THIS FILE — source of truth
```

---

## 15. Coding Conventions

- **TypeScript everywhere.** Section components: `interface Props { copy: XCopy }`, default-export function component. Copy interfaces live in `lib/copy/round1.ts` and are imported `type`-only.
- **Client vs server:** add `"use client"` only when a component uses hooks/motion/canvas (`DataFlowHero`, `Navigation`, all `sections/*`, `FadeIn`, `CountUpStats`, `ScrollProgress`, `ContactForm`). `Footer`, `GlowCTA`, `JsonLd` are server components.
- **Imports:** use the `@/` alias (`@/components/...`, `@/lib/...`).
- **className strings:** grouped roughly layout → box → color → typography → state/hover → transition. Arbitrary values (`text-[clamp(...)]`, `bg-white/[0.03]`, `shadow-[...]`) are the norm for v4 precision.
- **Comments:** only when WHY is non-obvious (e.g. "// Respect prefers-reduced-motion", "// no nested section"). Never narrate WHAT. One short line max.
- **Colors:** use `@theme` tokens / Tailwind token classes (`text-teal`, `bg-coral`, `text-paper/75`). Only drop to raw hex for one-off gradient stops or the two-teal nav case.
- **Decorative layers:** always `aria-hidden="true"` + `pointer-events-none`.
- **No `font-black`/weight 900 on new headings** — v4 = `font-display font-normal`.
- **Adding a new v4 section:** (1) container `max-w-[1560px] mx-auto px-6 sm:px-8 lg:px-10 py-24 md:py-32 relative overflow-hidden`; (2) optional `aria-hidden` ambient glow; (3) eyebrow `text-[11px] tracking-[0.22em] uppercase text-teal font-semibold`; (4) H2 `font-display font-normal text-[clamp(28px,4.2vw,54px)] leading-[1.06] tracking-[-0.02em] text-white`; (5) body `text-[clamp(15px,1.15vw,17px)] leading-[1.75] text-paper/75`; (6) wrap in `<FadeIn>`, stagger paragraph lists; (7) drive all copy from a typed interface in `lib/copy/`.
- **Adding a new page:** export per-page `metadata`; compose v4 sections; add to `sitemap.ts`; add JSON-LD via `JsonLd` + a builder in `lib/schema.ts`; test 375px viewport before pushing.

---

## 16. Bringing Legacy Pages To Standard

Only the homepage is v4. Everything below is legacy until conformed. Common off-standard patterns: Montserrat / `font-black` headings, narrower/mismatched containers (`max-w-[1100px]`, `max-w-[936px]`, `max-w-content`), old spacing, `GlowCTA` instead of `FinalCta`.

| Page | Off-standard notes | Needs |
| --- | --- | --- |
| `app/business-ai-operating-system/` | Main service page; pre-v4 container/type | Rebuild to v4 tokens, `max-w-[1560px]`, Fraunces `font-normal` headings, FadeIn/Stagger, typed copy |
| `app/why-revaya/` (+ TimelinePanel) | Legacy layout | v4 container + type; audit TimelinePanel motion |
| `app/work-with-me/` | Contains **Montserrat** refs; hosts ContactForm | Convert headings to Fraunces; align container; verify ContactForm styling |
| `app/solutions/` | Legacy | Confirm still needed (redirects point service to `/business-ai-operating-system`) or retire |
| `app/resources/` + `[slug]` + `page-v1.tsx` | Article center; `.article-body` is fine but page chrome legacy; `page-v1.tsx` is a dead older version | Bring index/detail chrome to v4; delete `page-v1.tsx` |
| `app/business-ai-os-assessment/` (+ admin, data) | Interactive quiz; own styling | Reskin to v4 while preserving quiz logic + `/api/save-assessment` |
| `app/ai-prep-check/` | Quiz-style; own styling | Reskin to v4 |
| `app/business-ai-os-vs-openclaw/` (ComparisonPage) | **Montserrat** refs; strong schema | Keep schema; reskin to v4 |
| `app/business-ai-os-vs-claude-code-obsidian/` (ClaudeCodeComparisonPage) | **Montserrat** refs; strong schema | Keep schema; reskin to v4 |
| `app/privacy-policy/`, `app/terms-of-use/` | Legal, legacy | Minimal reskin (container + type) |
| `app/not-found.tsx` | **Montserrat** ref | Reskin to v4 |
| `components/GlowCTA.tsx` | `font-black` | Prefer `FinalCta`; if kept, migrate weight/tokens |

**Also legacy/superseded:** `DESIGN.md` and `DESIGN 2.md` (Montserrat-era spec) — historical only, do not follow, do not delete. `tailwind.config.ts` `theme.extend` (900-weight tokens, `max-w-content`) overlaps the v4 `@theme` block; treat `@theme` in `globals.css` as authoritative for the homepage standard.

---

## 17. Change-Control Rules

1. **Branch:** all changes on `redesign-premium` (staging). Never edit `main` directly.
2. **Code + doc together:** any design/token/component/copy-pattern change updates BOTH the code AND this `website.md` in the same PR. A design PR without a `website.md` diff is incomplete.
3. **Copy changes:** update the source doc (`plans/open/2026-06-18-revaya-website-round1-copy-deck.md`) → `lib/copy/round1.ts` → this doc if a pattern changed. Enforce Section 10.2 voice rules (especially: "I" not "we", no em dashes, no dollar figures, correct ownership language).
4. **Preview:** push to `redesign-premium`; Vercel builds a preview.
5. **Review:** Shannon reviews the Vercel preview URL. Test at 375px (mobile), 768px, and desktop.
6. **Merge:** only after approval, merge `redesign-premium` → `main`.
7. **New tokens:** add to the `@theme` block in `globals.css` (not just `tailwind.config.ts`), document in Section 3, then use via Tailwind token classes.
8. **Never** introduce Montserrat, `font-black` headings, em dashes, emojis, dollar figures, or "you own the system"/"no vendor lock-in" language.

---

## Appendix A — Open items / UNSPECIFIED

- Node `engines` version not pinned in `package.json`.
- Turnstile listed in the intended stack but NOT implemented (no code, no env var).
- Airtable env vars in `.env.example` but `/api/contact` uses Supabase — confirm whether Airtable is still wired.
- Copy voice conflict: `homeCopy` uses "we"; brand rule + `DataFlowHero` defaults use "I" (Section 10.3).
- Layout default title still says "Owner-Operators" while homepage says "Business Owners" (Section 12.1).
- No custom `focus-visible` ring standard defined (Section 13).
- Footer container width (`max-w-[1200px]`) differs from section width (`max-w-[1560px]`) — intentional but confirm.
