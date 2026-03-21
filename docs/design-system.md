# Revaya AI — Design System
**Source of truth for all pages. Homepage (`app/page.tsx`) is the canonical reference.**
Last updated: 2026-03-20

---

## Layout

```
Container:   max-w-[1100px] mx-auto px-6 md:px-10
Section:     py-24 md:py-32
```

Do not use `max-w-[1200px]`, `px-12`, or `px-20` — these were used on early inner pages and cause layout mismatch vs the homepage.

---

## Colors

```
Background:        #0A0F14  (body default)
Surface:           #080D11  (panel backgrounds)
Border subtle:     rgba(255,255,255,0.07)  →  border-white/[0.07]
Border muted:      rgba(255,255,255,0.06)  →  border-white/[0.06]

Brand primary:     #553555  (purple — CTAs, accents)
Brand accent:      #028090  (teal — labels, highlights, active states)
Brand coral:       #F45B69  (alerts, negative states)

Text white:        #FFFFFF  →  text-white           (all body copy, headlines, paragraphs)
Text muted:        text-white/40  (captions, metadata — explicitly permitted)
Text disabled:     text-white/25  (inactive states — explicitly permitted)

⚠️  FONT OPACITY RULE: Never use opacity on fonts or copy unless it appears in this list above.
    Body copy, paragraphs, subheads, and lead text are always text-white — no exceptions.
    text-white/85, text-white/70, text-white/60, text-white/50 are not permitted for copy.
```

---

## Typography

### Font families
```
Display (headlines):  font-display  →  Montserrat Black
Body (prose):         font-body     →  Proxima Nova → Inter fallback
Monospace (panels):   font-mono     →  system mono (panels only)
```

### Scale — use these classes exactly

| Role | Class |
|------|-------|
| Hero H1 (homepage only) | `font-display font-black text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.0] text-white` |
| Page H1 (inner pages) | `font-display font-black text-[2.5rem] md:text-[3.5rem] leading-[1.05] text-white` |
| Section H2 | `font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white` |
| Subsection H3 | `font-display font-black text-[1.5rem] leading-[1.2] text-white` |
| Section label (eyebrow) | `text-[0.875rem] uppercase tracking-[0.14em] text-[#028090] font-medium` |
| Lead body | `text-[1.125rem] md:text-[1.25rem] leading-[1.6] text-white` |
| Body standard | `text-[1rem] leading-[1.7] text-white` |
| Body primary (first paragraph) | `text-[1rem] leading-[1.7] text-white` |
| Caption / meta | `text-[0.75rem] text-white/40` |
| Panel UI text | `text-[0.8125rem] font-mono text-white/70` |
| Panel label | `text-[0.7rem] font-mono text-white/25` |

**Never use `text-[#E8EDF2]` directly in prose — use `text-white`.**
**Never use opacity on body copy or paragraphs. text-white/85, /70, /60, /50 are not permitted for prose.**

---

## Buttons

```tsx
// Primary CTA (homepage hero)
className="bg-white text-[#0A0F14] text-[0.9375rem] font-bold px-8 py-3.5 rounded-full
           hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-200"

// Primary CTA (inner pages)
className="inline-block bg-[#553555] text-white text-[0.9375rem] font-medium px-7 py-3.5
           rounded-lg hover:bg-[#6B4468] transition-all duration-150"

// Text link CTA
className="inline-flex items-center gap-2 text-[0.9375rem] text-[#028090]
           hover:text-white transition-colors"
```

---

## Panels (animated UI components)

All panel chrome follows this pattern:

```tsx
// Outer wrapper
className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#080D11]"

// Panel header bar
className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]"

// Mac-style traffic light dots (left side of header)
<div className="w-2.5 h-2.5 rounded-full bg-[#F45B69]/50" />
<div className="w-2.5 h-2.5 rounded-full bg-[#F4B45B]/50" />
<div className="w-2.5 h-2.5 rounded-full bg-[#028090]/50" />

// Header label
className="text-[0.7rem] text-white/25 font-mono tracking-wide"

// Header status (right)
className="text-[0.7rem] font-mono text-[#028090]"

// Panel body padding
className="p-5"

// Panel row item
className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/[0.04]"
```

The `glass-card` utility in `globals.css` is a simpler alternative:
```css
.glass-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
```
Use the full `bg-[#080D11]` panel pattern for panels with Mac chrome. Use `glass-card` for simpler info cards.

---

## Ambient Orbs (hero backgrounds)

Homepage uses four fixed teal orbs. Copy this pattern exactly:

```tsx
<div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[#028090]/20 blur-[160px]" />
  <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] rounded-full bg-[#028090]/14 blur-[140px]" />
  <div className="absolute top-[65%] -right-40 w-[600px] h-[600px] rounded-full bg-[#028090]/14 blur-[140px]" />
  <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#028090]/12 blur-[120px]" />
</div>
```

Inner pages can use a simplified 2-orb version (teal top-right, purple mid-left) but the full 4-orb treatment is preferred for continuity.

---

## Section dividers

```tsx
// Standard section border
className="border-t border-white/[0.06]"

// Heavier divider (between major blocks within a section)
className="border-t border-white/[0.08]"
```

---

## Feature row layout (text + panel pairs)

```tsx
// Outer section
<section className="relative py-24 md:py-32" style={{ zIndex: 1 }}>
  <div className="max-w-[1100px] mx-auto px-6 md:px-10">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      {/* Text column */}
      <FadeIn direction="right">
        <span className="text-[0.75rem] uppercase tracking-[0.14em] text-[#028090] font-medium block mb-5">
          Label
        </span>
        <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6">
          Heading
        </h2>
        <p className="text-[1rem] leading-[1.7] text-white/85 mb-4">Body</p>
      </FadeIn>
      {/* Panel column */}
      <FadeIn delay={0.15} direction="left">
        <PanelComponent />
      </FadeIn>
    </div>
  </div>
</section>

// Rows alternate: text-L/panel-R → panel-L/text-R
// direction="right" on left column, direction="left" on right column
```

---

## Scroll animations

Use the `FadeIn` component from `@/components/FadeIn` for section-level entrances. Use Framer Motion `useInView` directly for panel-internal animations.

```tsx
import { FadeIn } from "@/components/FadeIn";

// Section content
<FadeIn delay={0}>...</FadeIn>
<FadeIn delay={0.15} direction="left">...</FadeIn>
```

The `FadeUp` helper defined inline in some pages duplicates `FadeIn`. Use `FadeIn` from the shared component instead.

---

## Active state / pulse indicator

```tsx
<div className="w-1.5 h-1.5 rounded-full bg-[#028090] animate-pulse" />
```

---

## What NOT to do

- Do not use `max-w-[1200px]` — use `max-w-[1100px]`
- Do not use `text-[#E8EDF2]` for prose — use `text-white`
- Do not use opacity on fonts or copy (text-white/85, /70, /60, /50, etc.) — body text is always text-white
- Do not use `leading-[1.65]` for body — use `leading-[1.7]`
- Do not use `tracking-[0.15em]` for labels — use `tracking-[0.14em]`
- Do not use `px-12` or `px-20` — use `px-10` at `md:` breakpoint
- Do not mix `rounded-xl` and `rounded-2xl` for panels — panels use `rounded-2xl`
- Do not hardcode hex colors that already have Tailwind tokens
