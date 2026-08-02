# CLAUDE.md — revaya-ai-website

This file is the session entry point for this repo. Load it first, every session, before touching any code, copy, or design decision.

---

## Load order (advisory gate, not enforced by a hook)

**No pack, no work.** Before making any design, copy, or SEO change, load these three files in order:

1. `design-standards.md` — colors, type, layout, components, motion, known drift
2. `copy-standards.md` — voice rules, terminology, CTA state, per-page-type patterns
3. `seo-aeo-map.md` — per-page SEO/schema record, gaps, crawler policy

**This gate is advisory prose, not a blocking hook.** A write-gate hook that refuses edits when the pack hasn't been loaded is a named Plan 3 candidate (`outputs/ops/internal/2026-08-02-website-os-teardown-handoff.md`), not built here. Follow this instruction on trust for now.

**A note on the pack's own status:** this pack, including `design-standards.md`, is queued for a full review before the next website refresh (Shannon's instruction, 2026-08-02). It is the working standard now. Treat it as current, not as beyond question.

---

## Business truth lives in the workspace, not here

This repo owns implementation. It does not own positioning, pricing, ICP, or brand strategy. Those live at:

- `/Users/short/Desktop/Revaya AI OS/revay-AI-OS-workspace/brand/voice-profile.md`
- `/Users/short/Desktop/Revaya AI OS/revay-AI-OS-workspace/brand/positioning.md`
- `/Users/short/Desktop/Revaya AI OS/revay-AI-OS-workspace/brand/brand-core.md` (locked Brand Core v1, canonical)
- `/Users/short/Desktop/Revaya AI OS/revay-AI-OS-workspace/brand/web-design-guide.md` (canonical for web implementation, supersedes this repo's own docs wherever they disagree)

If a design or copy question isn't answered by this repo's pack, check the workspace before inventing an answer.

---

## Branch and deploy rules

- Branches: `main`, `staging`, `staging-redesign`, `redesign-premium` (current active redesign line).
- **Deploy flow:** feature/design branch → Vercel preview → Shannon reviews → merge to `staging` → merge to `main`. **Never straight to main.**
- This standards pack was built on branch `website-standards-pack`, off `redesign-premium`, so it lands as one clean, cherry-pickable commit.

---

## Every change appends `changelog.md`

Any design, copy, or SEO change to this repo gets a `changelog.md` entry: what changed, when, why. This is not optional. A change without a changelog entry is incomplete, the same way a design PR without a `website.md`/`design-standards.md` diff is incomplete.

---

## Duplicate/legacy files present, do not treat as authoritative

`DESIGN.md`, `DESIGN 2.md` (untracked), `docs/design-system.md`, `docs/landing-page-design-guide.md`, and `website.md` all predate this pack and are superseded by `design-standards.md`. They are **kept, not deleted**, pending Shannon's design-doc review before the next website refresh. Do not follow them. If `design-standards.md` seems to be missing something one of them covers, flag it, don't silently pull from the old file.

---

## Known open items (see `design-standards.md` Section 9 and `seo-aeo-map.md` Section 2 for full detail)

- 3 code fixes from `brand/web-design-guide.md` not yet executed: purple retirement, two-teal consolidation, `homeCopy` voice conversion.
- CTA phrasing not standardized (3 variants live).
- No target keywords recorded for any route.
- `app/solutions/page.tsx` missing metadata export.
- `app/resources/page-v1.tsx` leftover file.

---

## History

| Date | Change |
|---|---|
| 2026-08-02 | Created as part of the website standards pack (Plan 1 of the Website OS teardown). |
