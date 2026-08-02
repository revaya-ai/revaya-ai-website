# Changelog — revaya-ai-website

Append-only. What changed, when, why. Newest entry at top.

---

## 2026-08-02 — Website standards pack created

**What:** Created `design-standards.md`, `copy-standards.md`, `seo-aeo-map.md`, `CLAUDE.md`, `changelog.md`, `improve-queue.md`, `ops-log.md`. Merged four legacy design docs (`DESIGN.md`, `docs/design-system.md`, `docs/landing-page-design-guide.md`, `website.md`) into `design-standards.md`, reconciled against the newer `brand/web-design-guide.md` (workspace, locked 2026-07-26) and rendered code.

**Why:** Site had 5 overlapping/contradictory design docs, no CLAUDE.md, and no record of SEO/schema decisions. Updates drifted because no single standard existed (Shannon's direct finding). This is the root-cause fix. Plan: `plans/execution-logs/2026-08-02-website-standards-pack.md` (workspace repo).

**Deviation from plan:** old docs (`DESIGN.md`, `docs/design-system.md`, `docs/landing-page-design-guide.md`, `website.md`) were **not deleted** as the plan originally specified. Shannon's instruction mid-implementation: keep them, mark superseded, queue a full design-doc review before the next website refresh. `DESIGN 2.md` was untracked in the source repo and never existed in this worktree, so it was never a candidate either way.

**Found during build, not yet fixed (docs-only pack):**
- `homeCopy` (`lib/copy/round1.ts`) still in "we" voice, needs "I" conversion per Brand Core v1
- Purple (`#553555`) still live in `app/globals.css` and `tailwind.config.ts`, should retire to navy per Brand Core v1
- Two teals (`#19b3c2` + `#028090`) still live, should consolidate to `#028090` only
- `app/solutions/page.tsx` has no metadata export
- `app/resources/page-v1.tsx` is a leftover version file
- CTA copy has 3 different live phrasings, no recorded standard
- No target keyword recorded for any route

**Files created:** `design-standards.md`, `copy-standards.md`, `seo-aeo-map.md`, `CLAUDE.md`, `changelog.md` (this file), `improve-queue.md`, `ops-log.md`
**Files deleted:** none (deviation from plan, see above)
**Files modified:** superseded-banner headers added to `DESIGN.md`, `docs/design-system.md`, `docs/landing-page-design-guide.md`, `website.md`
