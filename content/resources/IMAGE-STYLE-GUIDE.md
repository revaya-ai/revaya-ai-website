# Resource Center — Image Style Guide

> The standing brief for all Resource Center imagery. Follow this when creating images for new articles.
> **Last updated:** 2026-05-10

---

## Style Direction

**Dark, cinematic, teal-lit — photographic OR creative 3D render, depending on article content.**

The consistent thread across all images: dark environment, teal as the dominant light source, cinematic composition. The *subject* can vary. Not every article warrants a person at a laptop. The best images visualize what the article is *about*, not just who might read it.

Two modes:

| Mode | When to use | Look |
|------|-------------|------|
| **Editorial photography** | Human-focused content, founder stories, decision-making, ops | Person at screens in dark environment, teal glow |
| **Creative 3D / cinematic render** | AI-focused content, agents, systems, infrastructure, automation | Robot characters, cinematic scenes, concept visualization |

---

## The Creative Concept Rule (Most Important)

**Before writing any prompt, ask: what is this article actually about? Then make that the image.**

The biggest mistake is defaulting to "founder at laptop" for everything. That's a placeholder, not a concept. The best images make you understand the article before you read a word.

**How to find the concept:**
1. Read the article's opening paragraph and key metaphors
2. Identify the central idea — not the topic, the *action* or *dynamic*
3. Visualize it as a scene with a character

**Examples that worked:**
- Article about AI search agents monitoring competitors → noir robot detective, fedora + magnifying glass, wall of teal monitors, rainy city window. *The agent as spy.* You get it immediately.
- Article about Claude Code orchestrating business agents → robot conductor leading a robot orchestra on a dark stage. The article literally used "conductor/instruments" — the image made it visual.
- Article about AI memory layers → robot librarian in a vast glowing teal archive, filing a new memory. Abstract concept made concrete and delightful.

**The test:** Would someone who hasn't read the article understand the concept from the image alone? If yes, ship it. If not, rethink.

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

These apply to both modes.

| Element | Rule |
|---------|------|
| **Environment** | Always dark. Near-black or very dark navy. |
| **Primary light** | Teal (#028090). Screens, data, energy fields — whatever makes sense for the concept. |
| **Secondary light** | Subtle purple (#553555) as fill is acceptable but not dominant. |
| **Warm tones** | Avoid warm/orange lighting. Cool palette brand. |
| **Background** | Dark, muted, atmospheric. Detail fades into darkness. |

---

## Composition Rules

| Element | Rule |
|---------|------|
| **Subject** | A person or robot character, active — working, conducting, filing, monitoring. Not posed, not looking at camera, not staged. |
| **Screens / data** | Always present. They are the light source and the context. |
| **Framing** | Medium to wide shot. Show the environment, not just the subject's face. |
| **Negative space** | Leave room at bottom for card text overlay. Gradient covers bottom third. |
| **Aspect ratio** | Always 16:9 for hero/banner images. |

---

## Subject Matter — Allowed and Not Allowed

| Allowed | Not Allowed |
|---------|-------------|
| People working at computers | Posed subjects looking at camera |
| Cinematic robot characters (for AI/agent content) | Empty desks or plain abstract geometric shapes |
| Dashboard/data screens glowing teal | Stock photo vibes (handshake, thumbs up, pointing) |
| Dark professional or sci-fi environments | Bright offices, white backgrounds |
| Creative concept scenes (conductor, detective, librarian) | Boring flat nodes-and-lines network diagrams |
| 3D render / cinematic illustration quality | Clipart, infographic style, UI mockup screenshots |

**On robots:** Cinematic robot characters are fully on-brand for AI and agent content. The rule against "AI brains and neural networks" was about *boring abstract visualizations* — not against creative robot characters that tell a story. A noir robot detective is different from a glowing brain with nodes coming out of it.

---

## Prompt Templates

### Mode 1 — Editorial Photography (human subject)

```
Editorial photography style, dark moody lighting. [SUBJECT DESCRIPTION] with screens showing [SCREEN CONTENT RELEVANT TO ARTICLE TOPIC]. The screens emit a soft teal glow (#028090) in an otherwise dark room. Cinematic composition, [DEPTH OF FIELD CHOICE]. Dark navy-black environment, [SETTING]. No text overlays, no logos. 16:9 aspect ratio, high quality editorial magazine photography style.
```

**SUBJECT fills:** "A founder sitting at a desk with multiple monitors" / "A business owner reviewing data on a large monitor" / "A person working late at a minimal desk setup"

**DEPTH OF FIELD:** "shallow depth of field, person slightly out of focus while screens are sharp" / "medium depth of field, both person and environment in focus"

### Mode 2 — Creative Cinematic 3D (robot/concept subject)

```
Cinematic [GENRE] style 3D render. [CHARACTER] [DOING SPECIFIC ACTION THAT REFLECTS ARTICLE CONCEPT]. [TEAL LIGHTING DETAIL]. [CINEMATIC ATMOSPHERE]. Dark navy-black environment. Cinematic, editorial quality, wide shot. No text overlays, no logos. 16:9 aspect ratio.
```

**GENRE fills:** "noir cyberpunk" / "sci-fi epic" / "dark fantasy" — pick what fits the article tone

**CHARACTER + ACTION:** This is the creative concept. Make it specific to what the article is about. Don't default to "a robot at a computer." Find the metaphor.

**Body image consistency trick:** Start body image prompts with "Same [genre] style." to maintain character design and lighting across the session.

### Example prompts (2026-05-10 session):

**AI Search Agents hero:**
```
Cinematic noir-style 3D render. A sleek, friendly robot detective sits at a dark desk covered with multiple glowing teal monitors showing competitor websites and data feeds. The robot peers intently at the screens with a small magnifying glass monocle, posture alert and focused. Teal glow from monitors is the only light source in the dark room. Atmospheric, editorial quality, deep shadows, dramatic composition. Dark navy-black background. No text overlays, no logos. Wide cinematic shot showing the full workspace environment.
```

**Building AIOS hero:**
```
Cinematic 3D render. A distinguished robot conductor stands on a dark stage, baton raised, conducting an orchestra of smaller specialized robot musicians. Each robot musician glows with soft teal light. The conductor robot has an elegant authoritative posture, teal light reflecting off its chassis. Dark navy-black stage environment, teal atmospheric lighting from below. Epic, fun, cinematic editorial quality. No text, no logos. Wide shot showing the full orchestra.
```

---

## Prompt Template — Hugging Face

More stylized results. Use when Nano Banana is unavailable or when a slightly more illustrated look is acceptable.

```
cinematic editorial photograph, dark room, [SUBJECT] illuminated by teal computer screens showing [TOPIC], moody lighting, shallow depth of field, dark navy background, professional workspace, no text, no logos, magazine quality, 16:9
```

---

## Nano Banana Session Workflow

Each article gets its **own conversation session** — this preserves character design and lighting across all 3 images per article.

1. **Find the concept first.** Read the article opening. Identify the central metaphor. Write the hero concept in one sentence before touching Nano Banana.
2. **Generate hero** with a unique `conversation_id` per article (e.g., `"article-competitive-intel"`)
3. **Generate body_1** with `use_image_history: true` and same `conversation_id`. Start the prompt with "Same [style] style." — this locks in the character and lighting.
4. **Generate body_2** same approach. The character should look like it belongs in the same world as the hero.
5. Review all 3 together. Do they feel like a series? Is there a clear visual concept thread?
6. Save directly to `/public/articles/[slug]/hero.png`, `body_1.png`, `body_2.png`

**Do not use a shared session across different articles.** Style bleeds. Each article's visual world should be self-contained.

---

## File Paths

Article images go in the article's own folder under `/public/articles/`:

```
/public/articles/[full-article-slug]/
├── hero.png
├── body_1.png
└── body_2.png
```

The article frontmatter references them as:
```yaml
image: "/articles/[full-article-slug]/hero.png"
```

Body images are referenced inline in the article markdown using the same path pattern.

---

## Reference Images

| Concept | Article | Notes |
|---------|---------|-------|
| Noir robot detective at monitors | AI Search Agents (2026-05-10) | Hat, magnifying glass, teal screens, rainy window — the "agent as spy" concept |
| Robot conductor + robot orchestra | Building AIOS (2026-05-10) | Direct lift from article's own "conductor/instruments" metaphor |
| Robot detective reviewing floating intel reports | AI Search Agents body_1 | Same character, active action, holographic data |
| Robot architect + agent lineup | Building AIOS body_1 | Architect holding blueprint, specialized agents queued behind |
| Robot librarian in teal archive | Building AIOS body_2 | Memory layer concept — robot filing knowledge into glowing shelves |
| Founder at laptop, terminal glow | Claude Code + Obsidian | Editorial photography mode reference |
