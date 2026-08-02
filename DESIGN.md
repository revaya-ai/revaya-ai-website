> **SUPERSEDED 2026-08-02.** This file is replaced by `design-standards.md` at the repo root. Kept for historical reference pending Shannon's design-doc review before the next website refresh — do not use as a live standard. Values here (light background, purple primary) do not match the current site.

---
name: Revaya AI

colors:
  primary: "#553555"
  secondary: "#0d1a4a"
  accent: "#028090"
  surface: "#0d1a4a"
  on-surface: "#E4FDE1"
  background: "#E4FDE1"
  coral: "#F45B69"
  neutral: "#1A1A1A"
  neutral-light: "#F8F8F8"

typography:
  display:
    fontFamily: Montserrat
    fontWeight: 900
    lineHeight: "1.1"
  body-lg:
    fontFamily: Proxima Nova
    fontSize: 18px
    fontWeight: 400
    lineHeight: "1.65"
  body-std:
    fontFamily: Proxima Nova
    fontSize: 16px
    fontWeight: 400
    lineHeight: "1.65"
  body-sm:
    fontFamily: Proxima Nova
    fontSize: 14px
    fontWeight: 400
    lineHeight: "1.6"
  label:
    fontFamily: Proxima Nova
    fontSize: 13px
    fontWeight: 500
    lineHeight: "1.4"
  nav-link:
    fontFamily: Proxima Nova
    fontSize: 14px
    fontWeight: 500
  cta-btn:
    fontFamily: Proxima Nova
    fontSize: 15px
    fontWeight: 500

spacing:
  content-max: 1200px
  prose-max: 680px
  form-max: 560px

rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px

typography-scale:
  hero: "56px / 1.1 / 900"
  page-h1: "48px / 1.1 / 900"
  section-h2: "40px / 1.15 / 900"
  subsection-h3: "26px / 1.2 / 900"
---

# Design System — Revaya AI

## Overview

Revaya AI is a Business AI OS consultancy for owner-operators. The visual identity is
confident and direct — dark navy authority, teal precision, purple depth. No softness,
no corporate gloss. This is a solo operator building serious systems for serious businesses.

The aesthetic: dark surfaces, high contrast, clean type, purposeful color use. Every
visual decision should feel like it was made by someone who knows exactly what they're
doing and doesn't need to prove it.

## Colors

- **Primary** (#553555 — deep purple): Brand signature. Used for primary CTAs, active
  states, and key interactive elements. Use sparingly — it earns attention by being rare.
- **Secondary** (#0d1a4a — deep navy): The dominant surface color. Page backgrounds,
  section fills, nav. This is the foundation everything sits on.
- **Accent** (#028090 — teal): Precision and intelligence. Used for highlights, hover
  states, links, and supporting interactive elements. Never compete with primary.
- **Background** (#E4FDE1 — pale sage): Light sections only. Used for contrast breaks,
  card surfaces in light contexts, and soft section backgrounds.
- **Coral** (#F45B69): Energy and urgency. Reserve for alerts, badges, or moments
  that need to stop the eye. Not a general-purpose color.
- **Neutral near-black** (#1A1A1A): Body text on light backgrounds.
- **Neutral off-white** (#F8F8F8): Text on dark surfaces, subtle section backgrounds.

## Typography

Two fonts. No exceptions.

- **Montserrat Black (weight 900):** All headlines — hero, H1, H2, H3. This is the
  display font. The visual voice of the brand. Never use it for body copy.
- **Proxima Nova (Inter fallback):** All body copy, labels, nav, buttons, captions.
  Clean, readable, neutral. Lets the content speak.

Headlines use tight line height (1.1–1.2). Body copy uses generous line height (1.6–1.65)
for readability. Never mix weights within the same typographic role.

## Layout

- **Content max-width:** 1200px — constrains wide layouts without wasting space.
- **Prose max-width:** 680px — long-form text never exceeds this. Protects readability.
- **Form max-width:** 560px — keeps forms focused and scannable.

Sections use generous vertical padding. White space is not emptiness — it's breathing room
that makes the content feel considered, not crowded.

## Components

- **Primary button:** Purple (#553555) fill, off-white text, 8px rounded, 15px/500 weight.
  Hover: lighten slightly or shift to teal. This is the highest-intent CTA.
- **Secondary button:** Transparent, teal (#028090) border and text. For supporting actions.
- **Cards:** Dark navy surface (#0d1a4a), subtle border or teal accent line. No drop shadows.
  Depth comes from color contrast, not elevation.
- **Nav links:** 14px/500, off-white on dark backgrounds. Active state uses teal underline
  or color shift — never bold weight change alone.
- **Input fields:** 1px border (neutral or teal on focus), off-white background on dark
  surfaces, navy background on light surfaces. Clear focus state required.

## Hero Images

Dark abstract tech imagery — no photographic people. Full-bleed with gradient overlay
(135deg, 0.88 → 0.65 → 0.80 opacity). Text sits above the overlay at z-index 2. The
image should feel like infrastructure, not lifestyle. Reference: `/comparison/hero-option-a.png`.

## Do's and Don'ts

- Do use Montserrat Black exclusively for headlines — never for UI labels or body.
- Do maintain 4.5:1 contrast for all body text.
- Don't use coral as a general accent — it signals urgency. Reserve it.
- Don't add drop shadows to cards — contrast does the work.
- Don't mix rounded and sharp corners in the same component.
- Do keep primary purple scarce — its power comes from restraint.
- Never use em dashes in any text content.
