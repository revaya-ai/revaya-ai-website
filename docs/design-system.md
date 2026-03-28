# Revaya AI — Design System
**Source of truth for all pages. Read before every session that touches the website.**
Last updated: 2026-03-28

---

## Global

```
html, body:   overflow-x: hidden
body:         font-family: "Proxima Nova", Inter, sans-serif
              color: #E8EDF2
              background-color: #080D11
              scroll-behavior: smooth
```

---

## Layout

```
Standard container:   max-w-[1100px] mx-auto px-6 md:px-10
Wide container:       max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20   (nav, footer only)
AIOS hero container:  max-w-[1280px] mx-auto px-6 md:px-0
Section padding:      py-24 md:py-32
Hero padding:         pt-32 md:pt-44   (ALL pages — standardized 2026-03-28)
```

### Hero Padding Reference

Every page hero uses `pt-32 md:pt-44`. No exceptions.

| Page | Mobile | Desktop |
|------|--------|---------|
| Homepage | `pt-32` | `md:pt-44` |
| Business AIOS | `pt-32` | `md:pt-44` |
| Why Revaya | `pt-32` | `md:pt-44` |
| Work With Me | `pt-32` | `md:pt-44` |
| Assessment | `pt-32` | `md:pt-44` |

### Mobile Order Swaps

On mobile, two-column sections stack vertically. Some sections swap order so copy appears above the image/panel on mobile:

```tsx
// Copy first on mobile, panel first on desktop
<FadeUp delay={0.15} direction="right" className="order-last md:order-first">
  <Panel />
</FadeUp>
<FadeUp direction="left" className="order-first md:order-last">
  {/* Copy */}
</FadeUp>
```

Used on AIOS page: "Business Operating System" section, "Who This Is For" section, "After the Build" section.

---

## Colors

```
Background:        #080D11  (body default — set in globals.css)
Surface:           #080D11  (panel backgrounds)
Surface alt:       #111820  (form inputs, cards)
Border subtle:     rgba(255,255,255,0.07)  →  border-white/[0.07]
Border muted:      rgba(255,255,255,0.06)  →  border-white/[0.06]

Brand primary:     #553555  (purple — CTAs, accents)
Brand accent:      #028090  (teal — labels, highlights, active states)
Brand coral:       #F45B69  (eyebrow emphasis, negative states — NOT for buttons)

Text white:        #FFFFFF  →  text-white           (all body copy, headlines, paragraphs)
Text muted:        text-white/40  (captions, metadata — explicitly permitted)
Text disabled:     text-white/25  (inactive states — explicitly permitted)

⚠️  FONT OPACITY RULE: Never use opacity on fonts or copy unless it appears in this list above.
    Body copy, paragraphs, subheads, and lead text are always text-white — no exceptions.
    text-white/85, text-white/70, text-white/60, text-white/50 are not permitted for copy.
```

### Comparison / Landing Page Backgrounds

Landing pages use darker, higher-contrast BGs:
- Sections 1, 3, 4, 7: `#080D11`
- Sections 2, 5, 6: `#0A1118`

---

## Typography

### Font families
```
Display (headlines):  font-display  →  Montserrat Black (900)
Body (prose):         font-body     →  Proxima Nova (Light 300, Regular 400, Semibold 600, Extrabold 700) → Inter fallback
Monospace (panels):   font-mono     →  system mono (panels only)
```

Font files: `/public/fonts/ProximaNova-{Light,Regular,Semibold,Extrabold}.{woff2,ttf}`

### Scale — use these classes exactly

| Role | Class |
|------|-------|
| Hero H1 (homepage only) | `font-display font-black text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.0] text-white` |
| Page H1 (inner pages) | `font-display font-black text-[2.5rem] md:text-[3.5rem] leading-[1.05] text-white` |
| Section H2 | `font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white` |
| Subsection H3 | `font-display font-black text-[1.5rem] leading-[1.2] text-white` |
| Eyebrow (teal, default) | `text-[0.875rem] uppercase tracking-[0.14em] text-[#028090] font-medium` |
| Eyebrow (coral, 1x/page max) | `text-[0.875rem] uppercase tracking-[0.14em] text-[#F45B69] font-medium` |
| Hero eyebrow (pill) | See Eyebrow Pill pattern below |
| Lead body | `text-[1.125rem] md:text-[1.25rem] leading-[1.6] text-white` |
| Body standard | `text-[1rem] leading-[1.7] text-white` |
| Caption / meta | `text-[0.75rem] text-white/40` |
| Panel UI text | `text-[0.8125rem] font-mono text-white/70` |
| Panel label | `text-[0.7rem] font-mono text-white/25` |

### Eyebrow Pill (hero sections)

Used on Homepage and AIOS page heroes:

```tsx
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-6">
  <div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
  <span className="text-[0.875rem] uppercase tracking-[0.12em] text-white/80 font-medium">
    Label Text
  </span>
</div>
```

**Never use `text-[#E8EDF2]` directly in prose — use `text-white`.**
**Never use opacity on body copy or paragraphs.**

---

## Navigation (`components/Navigation.tsx`)

```
Position:    fixed top-3 left-0 right-0 z-50 overflow-x-hidden
Height:      h-16 (mobile) md:h-20 (desktop)
Breakpoint:  md: (768px) — hamburger below, desktop nav above
```

### Nav links (current)
```
Business AIOS     → /business-ai-operating-system
Why Revaya        → /why-revaya
Free Assessment   → /business-ai-os-assessment
```

### CTA: `Start the Conversation →` → `/work-with-me`

### Logo
```tsx
<Image src="/revaya-logo-white.png" alt="Revaya AI" width={140} height={40}
  className="w-[120px] md:w-[140px] h-auto" />
```

### Scroll states
```
Default:   max-w-[1200px] px-4 md:px-12 lg:px-20 bg-transparent
Scrolled:  max-w-[960px] px-4 md:px-8 bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl rounded-full
Trigger:   window.scrollY > 80
Transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)
```

### Mobile drawer
```
Background: bg-[#0D1A4A]
Padding:    px-6 py-4
Animation:  Framer Motion AnimatePresence (opacity + height)
Close:      auto-closes on pathname change
```

---

## Buttons

```tsx
// Primary CTA (purple pill — used everywhere)
className="font-display text-[0.9375rem] font-bold px-8 py-3.5 rounded-full
           bg-[#553555] text-white hover:bg-[#4a2d4a]
           hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200"

// Nav CTA (smaller pill)
className="font-display text-[0.875rem] font-bold px-5 py-2 rounded-full
           bg-[#553555] text-white hover:bg-[#4a2d4a]
           hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200"

// Text link CTA
className="inline-flex items-center gap-2 text-[0.9375rem] text-[#028090]
           hover:text-white transition-colors"
```

All CTAs are `rounded-full`. No square corners. No coral buttons.

---

## Panels (animated UI components)

```tsx
// Outer wrapper
className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080D11]"

// Panel header bar
className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]"

// Mac-style traffic light dots
<div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/50" />
<div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/50" />
<div className="w-2.5 h-2.5 rounded-full bg-[#028090]/50" />

// Header label
className="text-[0.7rem] text-white/25 font-mono tracking-wide"

// Header status (right)
className="text-[0.7rem] font-mono text-[#028090]"

// Panel body padding
className="p-5"
```

The `glass-card` utility in `globals.css` is a simpler alternative for info cards without Mac chrome.

---

## Ambient Orbs (hero backgrounds)

Homepage uses four fixed teal orbs:

```tsx
<div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[#028090]/20 blur-[160px]" />
  <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] rounded-full bg-[#028090]/14 blur-[140px]" />
  <div className="absolute top-[65%] -right-40 w-[600px] h-[600px] rounded-full bg-[#028090]/14 blur-[140px]" />
  <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#028090]/12 blur-[120px]" />
</div>
```

Inner pages can use a simplified 2-orb version (teal top-right, purple mid-left).

---

## Components

### Shared (`components/`)

| Component | File | Used On |
|-----------|------|---------|
| Navigation | `Navigation.tsx` | All pages (via layout) |
| Footer | `Footer.tsx` | All pages (via layout) |
| FadeIn / FadeUp | `FadeIn.tsx` | Homepage, Why Revaya, Work With Me |
| StaggerChildren / StaggerItem | `StaggerChildren.tsx` | AIOS, Why Revaya, Work With Me |
| FaqAccordion | `FaqAccordion.tsx` | AIOS page (FAQ section) |
| ContactForm | `ContactForm.tsx` | Work With Me |
| JsonLd | `JsonLd.tsx` | All marketing pages |
| GlowCTA | `GlowCTA.tsx` | Available but not actively imported |
| CountUpStats | `CountUpStats.tsx` | Available |
| FloatingOrbs | `FloatingOrbs.tsx` | Available |
| GridOverlay | `GridOverlay.tsx` | Available |
| ScrollProgress | `ScrollProgress.tsx` | Available |
| Starscape | `Starscape.tsx` | Available |
| TestimonialCarousel | `TestimonialCarousel.tsx` | Available |

### Page-specific

| Component | Location | Notes |
|-----------|----------|-------|
| FadeUp | Defined inline in `BusinessAIOSPage.tsx` | Local duplicate of FadeIn direction="up" |
| TimelinePanel | `app/why-revaya/TimelinePanel.tsx` | Career arc timeline |
| OrbitPanel | Inline in `BusinessAIOSPage.tsx` | Canvas-drawn orbit animation for "After the Build" |
| PainQueuePanel | Inline in `BusinessAIOSPage.tsx` | "Business Operating System" section panel |
| WhoPanel | Inline in `BusinessAIOSPage.tsx` | "Who This Is For" section panel |
| LayersTabs | Inline in `BusinessAIOSPage.tsx` | 5-layer tabbed interface |
| AssessmentApp | `app/business-ai-os-assessment/AssessmentApp.tsx` | 29-question assessment with ROI calculator |

---

## CSS Utilities (`globals.css`)

| Class | Definition |
|---|---|
| `.glass-card` | Dark semi-transparent + backdrop blur |
| `.gradient-border` | Linear-gradient with mask-composite |
| `.gradient-text` | Gradient: `#E4FDE1 → #028090 → #553555` |
| `.gradient-text-coral` | Gradient: `#F45B69 → #553555` |
| `.accordion-content` | `overflow: hidden; transition: max-height 200ms ease-out` |
| `.animate-float` | `translateY(0 → -12px → 0)`, 6s infinite |
| `.animate-float-delayed` | Same as float, with delay |
| `.animate-pulse-glow` | Opacity 0.4→0.8→0.4, 3s infinite |

---

## Page Route Map

| Route | Component | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — primary conversion page |
| `/business-ai-operating-system` | `BusinessAIOSPage.tsx` | AIOS service page — client component |
| `/why-revaya` | `app/why-revaya/page.tsx` | Shannon's story + credentials |
| `/work-with-me` | `app/work-with-me/page.tsx` | Contact form |
| `/business-ai-os-assessment` | `AssessmentApp.tsx` | 29-question assessment + ROI scorecard |
| `/business-ai-os-assessment/admin` | Admin page | Assessment admin dashboard |
| `/business-ai-os-vs-openclaw` | `ComparisonPage.tsx` | SEO/AEO comparison page (inline styles) |
| `/business-ai-os-vs-claude-code-obsidian` | `ClaudeCodeComparisonPage.tsx` | SEO/AEO comparison page (inline styles) |
| `/solutions` | `app/solutions/page.tsx` | Redirects to `/business-ai-operating-system` |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | Legal |
| `/terms-of-use` | `app/terms-of-use/page.tsx` | Legal |

Static assets: `/public/business-ai-os-blueprint.pdf`

---

## Footer (`components/Footer.tsx`)

```
Background: #080D11
Top border: border-white/[0.06]
Padding: px-6 md:px-12 lg:px-20 py-12
```

4-column layout:
1. Logo + tagline ("Stop being the business. Start owning one.")
2. Nav: Business AI Operating System, Why Revaya, Work With Me, Business AI OS Assessment
3. Resources: Business AI OS vs OpenClaw, Business AI OS vs Claude Code + Obsidian
4. Social/Legal: LinkedIn, Privacy Policy, Terms of Use

Copyright: `© {year} Revaya AI. All rights reserved.`

---

## AIOS Page Section Map

Sections in order with their layout pattern:

| # | Section | Layout | Eyebrow Color |
|---|---------|--------|---------------|
| 1 | Hero | 2-col, text L / panel R | Pill (teal pulse) |
| 2 | Business Operating System | 2-col, panel L / text R (mobile: text first) | Coral `#F45B69` |
| 3 | The Math | 2-col, text L / cost panel R | Coral `#F45B69` |
| 4 | Who This Is For | 2-col, panel L / text R (mobile: text first) | Coral `#F45B69` |
| 5 | Five Layers | Full-width tabbed interface | Coral `#F45B69` |
| 6 | What's Included | Full-width list | Coral `#F45B69` |
| 7 | After the Build | 2-col, orbit L / text R (mobile: text first) | Coral `#F45B69` |
| 8 | The Process | 2-col, text L / timeline R | Coral `#F45B69` |
| 9 | First Year | Full-width tabbed timeline | Coral `#F45B69` |
| 10 | FAQ | Full-width accordion (2 columns) | Coral `#F45B69` |
| 11 | Closing CTA | Centered | None |

---

## Brand Assets

| Asset | Status | Location |
|---|---|---|
| Logo (white, PNG) | In use | `/public/revaya-logo-white.png` |
| Shannon headshot | In use | `/public/shannon-headshot.jpg` |
| Proxima Nova fonts | In use | `/public/fonts/` (4 weights) |
| Blueprint PDF | In use | `/public/business-ai-os-blueprint.pdf` |
| Comparison hero | In use | `/public/comparison/hero-option-a.png` |
| Integration icons | In use | `/public/icons/` (11 platform icons) |
| Claude Code comparison images | In use | `/public/images/claude-code-comparison/` |
| Logo SVG | Not yet delivered | Shannon to provide |
| Favicon | Not yet built | Requires logo mark |
| OG images | Not yet built | Generate when logo confirmed |

---

## What NOT to Do

- Do not use opacity on body copy — `text-white/85`, `/70`, `/65`, `/60`, `/50` are banned on prose
- Do not use `text-[#E8EDF2]` for prose — use `text-white`
- Do not use `leading-[1.65]` for body — use `leading-[1.7]`
- Do not use `tracking-[0.15em]` for labels — use `tracking-[0.14em]`
- Do not mix `rounded-xl` and `rounded-2xl` for panels — panels use `rounded-2xl`
- Do not use coral for buttons — coral is eyebrow/emphasis text only
- Do not hardcode hex colors that already have Tailwind tokens
- Do not use hero padding other than `pt-32 md:pt-44`
