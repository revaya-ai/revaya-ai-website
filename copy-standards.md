# Revaya AI Website — Copy Standards

**Status:** Canonical, single source of truth for site copy voice, terminology, and CTA usage.
**Last updated:** 2026-08-02

Business truth (positioning, ICP, pricing, messaging architecture) lives in the workspace and is cited here, not duplicated:
- `brand/voice-profile.md` — full voice rules
- `brand/positioning.md` — positioning, terminology hierarchy
- `brand/brand-core.md` — locked Brand Core v1
- `brand/web-design-guide.md` — Section 2.3 (voice), Section 10 (QA gates)
- `brand/voc-record.md` — VOC-sourced language

If this file and a workspace source disagree, the workspace source wins. This file exists so a session opened directly in the site repo (no workspace context loaded) still has the rules it needs without cross-repo reads.

---

## 1. Hard rules

- **No em dashes or hyphens as punctuation, ever.** Commas or periods instead.
- **First-person "I," never "we."** One scoped exception: the tagline's subject only ("Revaya is the way out"). Nothing else gets a "we" exception, no matter how it reads.
- **No emojis. Ever.**
- **Show, don't claim.** Every claim needs a specific number, name, or date.
- **Cite sources for stats.** "42% of companies (McKinsey)," not "studies show."
- **Humanizer gate: no copy ships below 70.** Per `brand/web-design-guide.md` Section 10, QA gate 1 (`voice-evaluator`).

---

## 2. Known live violation

`lib/copy/round1.ts`'s `homeCopy` object is still in "we" voice: *"We start with the problem costing you the most. We find your single most expensive bottleneck..."* This is a confirmed, flagged defect (`brand/web-design-guide.md` Section 3.3, Section 9 item 3), not a deliberate exception. The fix routes through `plans/open/2026-06-18-revaya-website-round1-copy-deck.md` per `website.md`'s own change-control pattern (copy source and rendered code must stay in sync). Not fixed in this pack — this is docs-only. Flagged in `seo-aeo-map.md` gaps and `changelog.md`.

---

## 3. Terminology

| Use | Don't use | Why |
|---|---|---|
| "business owner" | "owner-operator" | Workspace terminology decision, `knowledge/decisions/2026-05-08-fit-call-terminology-decision.md` |
| "Fractional Chief AI Officer" / "Business AI OS" | generic "AI automation," "AI consulting" | Current positioning v2, `brand/positioning.md` |
| "Assessment" | "audit" (external-facing) | Sales terminology, see `brand/positioning.md` |
| "I" | "we," "our team," "the team" | Solo-operator hard rule |

Full terminology hierarchy: `brand/positioning.md`.

---

## 4. CTA standard

**Current live state is NOT one standard — it's four different phrasings across the site, recorded here honestly rather than inventing consensus:**

| Phrase | Where used |
|---|---|
| "Start the Conversation →" | Navigation (some contexts), `ResultsPage.tsx`, `resources/page.tsx`, `resources/page-v1.tsx`, `resources/[slug]/page.tsx` |
| "Book a fit call" / "Book a Fit Call" | `DataFlowHero.tsx` default prop, `Navigation.tsx`, `ClaudeCodeComparisonPage.tsx`, `resources/[slug]/page.tsx` |
| "Book a Discovery Call" | `resources/[slug]/page.tsx` |

**`[NEEDS DECISION]`** — which single CTA phrase is the standard is not recorded anywhere in code or workspace memory as a confirmed decision. This pack does not invent one. Flagged as a follow-up in `seo-aeo-map.md` gaps and `changelog.md`. Until resolved, do not add a fifth variant — match whichever phrase the immediately surrounding page already uses.

**Format rule that does hold across all variants:** pill-shaped button (`rounded-full`), always ends with a `→` arrow span, links to `/work-with-me` in the primary-CTA case.

---

## 5. Per-page-type copy patterns

### Landing / marketing pages (home, business-ai-operating-system, why-revaya)
- Lead with the customer's problem in the customer's own words (VOC-sourced), not "what Revaya does." Per `brand/web-design-guide.md` Section 10, QA gate 3.
- Hero: eyebrow (teal, uppercase) → H1 (with one accent color, teal or coral italic emphasis) → subcopy → primary + secondary CTA.
- Body copy always first-person "I."

### Comparison / SEO landing pages (business-ai-os-vs-*)
- Structure: hero → appeal/differentiation split → risk cards → comparison table → FAQ → CTA.
- FAQ answers: complete sentences, no marketing fluff, direct answers a reader (or an LLM) can extract standalone. See `seo-aeo-map.md` for the 40-word direct-answer field this feeds.

### Resource articles (resources/[slug])
- One clear point of view per article, sourced claims, no invented statistics.
- CTA at the end routes to a discovery/fit-call conversation, not a generic "learn more."

### Legal pages (privacy-policy, terms-of-use)
- Plain language where possible. No voice styling requirements beyond the hard rules (no em dashes, no emojis) — legal accuracy takes priority over brand voice here.

### Conversion page (work-with-me)
- Contact form is the single conversion action. Minimize copy around it. State clearly what happens after submission.

---

## 6. Humanizer gate

Per `brand/web-design-guide.md` Section 10, QA gate 1: every line of new or edited page copy runs through `voice-evaluator` before merge. Hard stop below a score of 70. This is not optional for any copy that reaches a live page.

---

## History

| Date | Change |
|---|---|
| 2026-08-02 | Created. Extracted from live page copy (home, work-with-me, a comparison landing page, a resource article) and cross-checked against workspace CTA memory. Found CTA is NOT currently standardized — 3 distinct phrasings recorded honestly rather than fabricating a resolved standard. `homeCopy` "we" voice violation flagged, not fixed (docs-only pack). |
