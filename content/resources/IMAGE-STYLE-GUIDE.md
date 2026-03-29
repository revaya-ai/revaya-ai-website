# Resource Center — Image Style Guide

> The standing brief for all Resource Center imagery. Follow this when creating images for new articles.
> **Last updated:** 2026-03-29

---

## Style Direction

**Editorial photography — dark, cinematic, teal-lit.**

Every image should feel like a still from a tech documentary or a dark-mode editorial spread. The consistent thread: a person working at screens in a dark environment, lit primarily by the glow of their displays.

This matches the existing Revaya website aesthetic (dark theme, teal accents) and creates a recognizable visual signature across all resources.

---

## Rules: When to Use Images vs Solid Color

Not every card gets an image. The pattern creates visual rhythm.

| Rule | Treatment |
|------|-----------|
| Featured article (hero card) | Always image |
| Full-width banner cards (3-col span) | Always image |
| Every 3rd card in the grid (index 0, 3, 6...) | Image |
| All other cards | Solid color background |

**Solid color palette** (rotates by card position):
- Teal-dark: `#0A2028` with border `#15393F`
- Purple-dark: `#1A1020` with border `#2E1F2E`
- Navy: `#0C1A24` with border `#1A2E3A`
- Warm-dark: `#1A0F14` with border `#30171F`

---

## Color Guardrails

| Element | Rule |
|---------|------|
| **Environment** | Always dark. Room/background should be near-black or very dark navy. |
| **Screen glow** | Teal (#028090) is the dominant light source. Screens emit teal-tinted light. |
| **Secondary light** | Subtle purple (#553555) as fill light is acceptable but not dominant. |
| **Warm tones** | Avoid warm/orange lighting. This is a cool-palette brand. |
| **Background objects** | Dark wood, dark leather, dark shelving — all muted and barely visible. |

---

## Composition Rules

| Element | Rule |
|---------|------|
| **Subject** | A person (gender-neutral or varied) at a desk/workspace. Not posed, not looking at camera. Working. Thinking. Reviewing. |
| **Screens** | Always present. Show dashboards, org charts, data visualizations, terminal windows. Screens are the light source. |
| **Depth of field** | Shallow to medium. Person can be slightly soft if screens are sharp, or person sharp with background soft. |
| **Framing** | Medium to wide shot. Show the workspace environment, not a tight face portrait. |
| **Negative space** | Leave room at bottom or bottom-left for the card text overlay. The gradient overlay covers the bottom third. |
| **Aspect ratio** | Always 16:9 for hero/banner images. Cards crop via CSS. |

---

## Subject Matter Rules

| Allowed | Not Allowed |
|---------|-------------|
| People working at computers | Empty desks or abstract shapes |
| Dashboard/data screens glowing | Stock photo vibes (handshake, thumbs up) |
| Dark professional environments | Bright offices, white backgrounds |
| Subtle technology (screens, keyboards) | Robots, AI brains, neural network visualizations |
| Thinking/reviewing/building postures | Presenting, pointing at screens, staged poses |

---

## Prompt Template — Nano Banana (Gemini)

Use this fill-in-the-blank template for consistent results:

```
Editorial photography style, dark moody lighting. [SUBJECT DESCRIPTION] with screens showing [SCREEN CONTENT RELEVANT TO ARTICLE TOPIC]. The screens emit a soft teal glow (#028090) in an otherwise dark room. Cinematic composition, [DEPTH OF FIELD CHOICE]. Dark navy-black environment, [SETTING]. No text overlays, no logos. 16:9 aspect ratio, high quality editorial magazine photography style.
```

### Variable fills:

**SUBJECT DESCRIPTION:**
- "A founder sitting at a desk with multiple laptop screens"
- "A business owner reviewing data on a large monitor"
- "A person working late at a minimal desk setup"
- "Two people reviewing a dashboard together at a conference table"

**SCREEN CONTENT (match to article topic):**
- AI agents article: "organizational charts and AI agent dashboards"
- Operations article: "workflow automation diagrams and task boards"
- Revenue article: "revenue dashboards and pipeline metrics"
- Strategy article: "strategic planning boards and roadmap timelines"

**DEPTH OF FIELD:**
- "shallow depth of field, the person is slightly out of focus while the screens are sharp"
- "medium depth of field, both person and screens in focus"

**SETTING:**
- "professional office setting"
- "minimal home office"
- "modern coworking space"

### Example prompt (used for ACRA article):

```
Editorial photography style, dark moody lighting. A founder sitting at a desk with multiple laptop screens showing organizational charts and AI agent dashboards. The screens emit a soft teal glow (#028090) in an otherwise dark room. Cinematic composition, shallow depth of field, the person is slightly out of focus while the screens are sharp. Dark navy-black environment, professional office setting. No text overlays, no logos. 16:9 aspect ratio, high quality editorial magazine photography style.
```

---

## Prompt Template — Hugging Face

Hugging Face produces more stylized results. Use when Nano Banana is unavailable or when a slightly more illustrated look is acceptable.

```
cinematic editorial photograph, dark room, [SUBJECT] illuminated by teal computer screens showing [TOPIC], moody lighting, shallow depth of field, dark navy background, professional workspace, no text, no logos, magazine quality, 16:9
```

---

## Reference Images

| Image | Article | Path |
|-------|---------|------|
| Founder at laptop, terminal glow | Claude Code + Obsidian | `/images/claude-code-comparison/hero.png` |
| Founder at multiple screens, dashboard glow | ACRA / AI agents | `/images/resources/ai-agents-org-design.png` |

These two images define the standard. New images should feel like they belong in the same photo series.

---

## File Naming Convention

All Resource Center images go in `/public/images/resources/`.

Pattern: `[slug-keyword].png`

Examples:
- `ai-agents-org-design.png`
- `five-layers-business-ai-os.png`
- `founder-ai-system-setup.png`

---

## Session Workflow

When creating images for a new article:

1. Open Nano Banana with `conversation_id: "resource-center-images"` and `use_image_history: true` for style consistency
2. Fill in the prompt template with article-specific variables
3. Generate and review — does it match the reference images?
4. Save to `/public/images/resources/[slug-keyword].png`
5. Update the article frontmatter: `image: "/images/resources/[slug-keyword].png"`
