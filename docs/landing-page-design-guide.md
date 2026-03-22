# Revaya AI — Landing Page Design Guide

> Reference for all future landing pages. Read this at the start of any new page build.
> Source of truth: `app/business-ai-os-vs-openclaw/ComparisonPage.tsx`

---

## Stack and Architecture

- **Framework:** Next.js App Router
- **Directive:** `"use client"` — required for any page using animation, state, or accordions
- **Styling approach:** 100% inline React styles + a single `<style>` JSX tag for mobile media queries
- **No Tailwind** on landing pages — all styling is explicit inline for full design control
- **Animation:** Framer Motion via a shared `FadeUp` component (see below)
- **Images:** Next.js `<Image>` with `fill`, `width/height`, `loading="lazy"`, `decoding="async"` on all below-fold images. Hero image gets `priority` and `fetchPriority="high"`.

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Background dark | `#080D11` | Primary page background, most sections |
| Background mid | `#0A1118` | Alternating sections (appeal, table, FAQ) |
| Teal | `#028090` | Eyebrows, teal accent lines, teal CTA links, layer labels, positive column highlights |
| Purple | `#553555` | Primary CTA button background |
| Coral | `#F45B69` | Risk/warning eyebrows, H1 accent spans, negative column highlights, risk card top border |
| White | `#fff` | All body copy, headings |
| White/55 | `rgba(255,255,255,0.55)` | Footer nav links |
| White/30 | `rgba(255,255,255,0.30)` | Footer legal, small citations |
| White/07 | `rgba(255,255,255,0.07)` | Card borders, table borders, FAQ dividers |
| White/04 | `rgba(255,255,255,0.04)` | Card backgrounds |

---

## Typography

**Rule:** Headings = Montserrat. Body = Proxima Nova (fallback: Inter).

```tsx
const hdg = { fontFamily: "'Montserrat', sans-serif" };
// body font declared on <main>:
fontFamily: "'Proxima Nova', 'Inter', sans-serif"
```

### Type Scale

| Role | Size | Weight | Tracking | Color | Notes |
|------|------|--------|----------|-------|-------|
| Eyebrow (teal) | 14px | 600 | 2.5px | `#028090` | Uppercase, 20px bottom margin |
| Eyebrow (coral) | 14px | 600 | 2.5px | `#F45B69` | Uppercase, 16px bottom margin |
| H1 | `clamp(36px, 4.5vw, 58px)` | 900 | — | `#fff` | Montserrat, lineHeight 1.08 |
| H2 | 38px | 900 | — | `#fff` | Montserrat, lineHeight 1.1. Add `className="mobile-h2"` |
| H3 (card title) | 15px | 700 | — | `#fff` | Montserrat, lineHeight 1.3 |
| Body large | 17–18px | 400 | — | `#fff` | lineHeight 1.75 |
| Body standard | 15–16px | 400 | — | `#fff` | lineHeight 1.6–1.65 |
| Blockquote | 18px | 400 | — | `#fff` | fontStyle italic, lineHeight 1.6 |
| Cite | 12px | 600 | 2px | `#F45B69` | Uppercase, fontStyle normal |
| Card number | 10px | 700 | 3px | `#F45B69` | Uppercase |
| Table header | 11px | 700 | 3px | column accent | Uppercase |
| Table dimension | 12px | 700 | 1px | `rgba(255,255,255,0.5)` | Uppercase |
| Caption / citation | 11px | 400 | 0.5px | `rgba(255,255,255,0.35)` | — |
| Layer progression line | 13px | 700 | 0.12em | `#028090` | Montserrat, used after key paragraph |
| FAQ question | 15px | 600 | — | `#fff` | — |
| FAQ answer | 16px | 400 | — | `rgba(255,255,255,0.75)` | lineHeight 1.7 |

**Mobile H2 override** (add to every H2):
```tsx
className="mobile-h2"
// CSS: .mobile-h2 { font-size: 26px !important; }
```

---

## Shared Style Objects

```tsx
const eyebrow: React.CSSProperties = {
  fontSize: "14px", fontWeight: 600, letterSpacing: "2.5px",
  textTransform: "uppercase", color: "#028090", marginBottom: "20px",
  fontFamily: "'Proxima Nova', 'Inter', sans-serif",
};

const eyebrowCoral: React.CSSProperties = {
  ...eyebrow, color: "#F45B69", marginBottom: "16px",
};

const divider: React.CSSProperties = {
  height: "1px",
  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
};

const hdg: React.CSSProperties = { fontFamily: "'Montserrat', sans-serif" };
```

---

## Animation — FadeUp Component

Used on every content block. Triggers once when the element scrolls into view.

```tsx
function FadeUp({ children, delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

**Delay pattern within a section:**
- Eyebrow: `delay={0}`
- H2: `delay={0.1}`
- Subtitle / first paragraph: `delay={0.15}`
- Layer progression line: `delay={0.12}`
- Subsequent paragraphs: `delay={0.2}`, `0.25`, `0.28`
- Cards in a grid: `delay={0.1 + i * 0.05}`

---

## Section Divider

Between every section:
```tsx
<div style={divider} />
```

---

## Page Section Patterns

### Section 1 — Hero (Full bleed image + centered text)

```
background: #080D11
minHeight: 720px
Image: fill, objectFit cover, priority + fetchPriority="high"
Overlay: linear-gradient(135deg, rgba(8,13,17,0.82), rgba(8,13,17,0.60), rgba(8,13,17,0.75))
Content: centered, maxWidth 860px, padding 140px 60px 80px
Mobile: .hero-content { padding: 100px 24px 60px }
```

Structure: eyebrow → H1 (with coral accent span on second line) → body paragraph

---

### Section 2 — Split: Image Left, Text Right

```
background: #0A1118
display: flex, alignItems: stretch, minHeight: 640px
className: "section-split"
```

**Image column:** `width: 50%`, `position: relative`, `overflow: hidden`. Image `fill`. Gradient fade: `linear-gradient(to left, #0A1118 0%, transparent 20%)`.

**Text column:** `flex: 1`, `padding: 96px 80px`.

Mobile: `.section-split` → `flex-direction: column`. `.split-image-col` → `height: 280px, width: 100%`. `.split-text-col` → `padding: 48px 24px`.

---

### Section 2 variant — Split: Text Left, Image Right (with overlay labels)

```
background: #080D11
display: flex, alignItems: stretch, minHeight: 720px
className: "section-split"
```

**Copy column:** `width: 50%`, `padding: 96px 80px`, `display: flex, flexDirection: column, justifyContent: center`.

**Image column:** `flex: 1`, `position: relative`, `overflow: hidden`. Image `fill`, `transform: translateX(N%)` to control crop position. Left-to-right gradient fade: `linear-gradient(to right, #080D11 0%, rgba(8,13,17,0.75) 28%, transparent 52%)`.

**Overlay labels** (positioned inside image column):
```tsx
position: absolute, inset: 0, zIndex: 2
display: flex, flexDirection: "column-reverse"
justifyContent: "space-evenly"
padding: "4% 52% 4% 1%"   // right padding keeps labels in left half of image
```
Each label: teal dot (8px circle, glow) + column name (11px, 700, 3px tracking, uppercase) + desc (12px, lineHeight 1.4). Desc breaks after word 5.

Mobile: `.split-copy-col` → `padding: 48px 24px, width: 100%`. `.split-image-right` → `height: 300px, width: 100%`.

---

### Section 3 — Full-width grid (Risk cards)

```
background: #080D11
paddingTop: 96px
```

Structure:
1. Section header: `padding: 0 80px` — eyebrow + H2 + intro paragraph
2. Pull quote block: `background: rgba(244,91,105,0.08)`, `borderLeft: 3px solid #F45B69`, `padding: 32px 80px`
3. Full-width image: `width: 100%`, `maxHeight: 440px`, `objectFit: cover`. Bottom gradient fade to background.
4. Card grid: 3 columns, `gap: 16px`, `padding: 40px 80px 80px`
5. Citation footnotes: `padding: 0 80px 40px`, 11px, `rgba(255,255,255,0.35)`

**Card style:**
```tsx
background: "rgba(255,255,255,0.04)"
border: "1px solid rgba(255,255,255,0.07)"
borderTop: "2px solid #F45B69"   // coral for risk cards, use teal for positive cards
borderRadius: "12px"
padding: "24px"
```

Mobile: `.risk-grid` → `grid-template-columns: 1fr`. `.section-header` → `padding: 0 24px`. `.pullquote-block` → `padding: 24px`. `.citation-block` → `padding: 0 16px 40px`.

---

### CTA Block (mid-page)

```
background: #080D11
padding: 56px 80px 80px
textAlign: center
className: "assessment-cta"
```

Structure: small teal eyebrow label + CTA button.

Mobile: `.assessment-cta` → `padding: 48px 24px`.

---

### Section 5 — Comparison Table

```
background: #0A1118
padding: 96px 80px
textAlign: center
className: "section-table"
```

**Desktop table:** `borderRadius: 12px`, `border: 1px solid rgba(255,255,255,0.07)`. Column headers: OpenClaw in coral (`#F45B69`) with `rgba(244,91,105,0.14)` bg; AIOS in teal (`#028090`) with `rgba(2,128,144,0.14)` bg. Row cells colored to match: `rgba(244,91,105,0.06)` and `rgba(2,128,144,0.06)`. `className="table-desktop"`.

**Mobile stacked cards:** `className="table-mobile"`, `display: none` by default, shown via media query. Each row = a card with dimension label header + OpenClaw row (coral) + AIOS row (teal). `className="table-mobile"`.

Mobile: `.table-desktop { display: none }` / `.table-mobile { display: flex }`. `.section-table` → `padding: 64px 16px`.

---

### Section 6 — FAQ Accordion

```
background: #0A1118
padding: 96px 80px
className: "section-faq"
```

State: `const [openFaq, setOpenFaq] = useState<number | null>(null)`

Layout: 2-column grid (`gridTemplateColumns: "1fr 1fr"`, `gap: 0 48px`, `maxWidth: 1200px`). Each item: borderBottom divider. Button toggles open state. Chevron `+` / `×` rotates on open. Answer fades in below.

**Question button:** `padding: 24px 0`, `fontSize: 15px`, `fontWeight: 600`.
**Answer:** `fontSize: 16px`, `color: rgba(255,255,255,0.75)`, `lineHeight: 1.7`, `padding: 0 0 20px`.

Mobile: `.faq-grid` → `grid-template-columns: 1fr, gap: 0`. `.section-faq` → `padding: 64px 16px`.

---

## CTA Button Standard

```tsx
{
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: "#553555",        // purple
  color: "#fff",
  padding: "16px 32px",
  borderRadius: "9999px",       // pill
  fontWeight: 600,
  fontSize: "15px",
  textDecoration: "none",
}
// Always ends with: <span>→</span>
```

---

## Teal Text Link (inline)

```tsx
{
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  color: "#028090",
  fontSize: "15px",
  fontWeight: 600,
  textDecoration: "none",
}
// Always ends with: <span>→</span>
```

---

## Left Border Accent (blockquote / pullquote inline)

```tsx
{
  borderLeft: "3px solid #553555",   // purple for personal voice
  paddingLeft: "20px",
}
// or #028090 for informational callouts
// or #F45B69 for warnings/risk callouts
```

---

## Mobile Responsiveness

All mobile overrides live in a single `<style>` JSX tag at the top of the component return. Breakpoint: `768px`. Every layout-critical div gets a `className` so the media query can target it.

```tsx
<style>{`
  @media (max-width: 768px) {
    .hero-content { padding: 100px 24px 60px !important; }
    .section-split { flex-direction: column !important; min-height: auto !important; }
    .split-image-col { width: 100% !important; height: 280px !important; }
    .split-text-col { padding: 48px 24px !important; flex: none !important; width: 100% !important; }
    .split-copy-col { width: 100% !important; padding: 48px 24px !important; }
    .split-image-right { height: 300px !important; flex: none !important; width: 100% !important; }
    .split-cta-col { padding: 48px 24px !important; flex: none !important; width: 100% !important; }
    .section-header { padding: 0 24px !important; }
    .pullquote-block { padding: 24px !important; }
    .risk-grid { grid-template-columns: 1fr !important; padding: 24px 16px 48px !important; }
    .citation-block { padding: 0 16px 40px !important; }
    .assessment-cta { padding: 48px 24px !important; }
    .section-table { padding: 64px 16px !important; }
    .section-faq { padding: 64px 16px !important; }
    .faq-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
    .table-desktop { display: none !important; }
    .table-mobile { display: flex !important; }
    .mobile-h2 { font-size: 26px !important; }
  }
`}</style>
```

---

## Image Handling

| Position | `loading` | `priority` | `fetchPriority` |
|----------|-----------|------------|-----------------|
| Hero (above fold) | — | `true` | `"high"` |
| All others | `"lazy"` | — | — |

All images also get `decoding="async"` except hero. Always include descriptive `alt` and `title` attributes for SEO.

---

## Section Background Alternation

| Section | Background |
|---------|-----------|
| Hero | `#080D11` |
| Appeal (split) | `#0A1118` |
| Risks | `#080D11` |
| AIOS explainer (split) | `#080D11` |
| CTA block | `#080D11` |
| Comparison table | `#0A1118` |
| FAQ | `#0A1118` |

Pattern: sections alternate between `#080D11` and `#0A1118` to create visual rhythm without hard borders. Sections are separated by the gradient `divider`.

---

## Section Padding Standard

- **Full-width sections:** `padding: 96px 80px`
- **Section headers only:** `padding: 0 80px`, `marginBottom: 40px`
- **Split section text columns:** `padding: 96px 80px`
- **Mobile:** all reduce to `24px` horizontal padding

---

## Key Design Decisions

1. **Inline styles over Tailwind** — gives exact control without class name hunting. Every value is visible at the component level.
2. **Single `<style>` tag for mobile** — avoids CSS modules or Tailwind config changes. All overrides in one place, easy to audit.
3. **`column-reverse` for image overlay labels** — allows data array to read top-to-bottom while displaying bottom-to-top visually, matching the 3D layer stack image.
4. **Dual-render comparison table** — `.table-desktop` / `.table-mobile` toggled via media query. Mobile gets stacked cards instead of a wide table that breaks on small screens.
5. **FAQ accordion over static grid** — 14 questions is too much copy to show at once. Toggle reduces cognitive load. 2-column grid on desktop, single column on mobile.
6. **`space-evenly` on layer labels** — distributes bullets to align with the visual bands in the 3D image, rather than clustering in the middle.
7. **`translateX()` on image** — shifts the crop window of a `fill` image without changing the container size. Use to center the most important part of an image when the container clips it.
