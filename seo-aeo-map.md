# Revaya AI Website — SEO / AEO Map

**Status:** Canonical, single source of truth for per-page SEO/AEO state.
**Last updated:** 2026-08-02
**No-invention rule:** every cell below is sourced from an actual metadata export, JSON-LD schema, or `llms.txt` entry that exists in code right now. Where nothing exists to record, the cell reads `[NEEDS DECISION]`, not an invented value. Those cells are this map's follow-up list.

This file is the record `brand/web-design-guide.md`, `robots.ts`, and `lib/schema.ts` don't otherwise provide: what SEO/schema state each page actually carries, so future updates don't silently drop it.

---

## 1. Per-route record

| Route | Title | Meta description | Schema types | Target keyword | Page question | 40-word direct answer |
|---|---|---|---|---|---|---|
| `/` | "Business AI Operating System for Business Owners \| Revaya AI" | "We find the most expensive problem in your business and build a system that runs it the way you would. Specialized agents, full audit trails, no black box." | `WebPage` (`homeWebPageSchema`) | `[NEEDS DECISION]` | `[NEEDS DECISION]` | `[NEEDS DECISION]` |
| `/business-ai-operating-system` | "Business AI Operating System \| AIOS Services" | "Every decision routes through you. That's the ceiling. I build the operational backbone that changes it. The Business AI Operating System for owner-operators, custom to how you work." | `FAQPage` (with `Question`/`Answer` items) | `[NEEDS DECISION]` | `[NEEDS DECISION]` | `[NEEDS DECISION]` |
| `/why-revaya` | "Shannon Winnicki \| Business AI Operating System Consultant" | "18 years inside Fortune 500 operations. I built a Business AI Operating System for my own company first, then made it a service. AI consultant and founder of Revaya AI." | `WebPage` (`whyRevayaWebPageSchema`), `Person` (`shannonPersonSchema`) | `[NEEDS DECISION]` | `[NEEDS DECISION]` | `[NEEDS DECISION]` |
| `/work-with-me` | "Work With Me \| Business AI Operating System" | "You already know something has to change. Tell Shannon Winnicki about your business. Business AI Operating System engagements for owner-operators." | `ContactPage` (`workWithMeContactPageSchema`) | `[NEEDS DECISION]` | `[NEEDS DECISION]` | `[NEEDS DECISION]` |
| `/business-ai-os-assessment` | "Business AI Discovery Assessment \| Revaya AI" | "Find out where your small business is leaking time and money. The Discovery Assessment maps exactly where you're losing both." | `[NEEDS DECISION]` — no JsonLd import found in page.tsx, verify | `[NEEDS DECISION]` | `[NEEDS DECISION]` | `[NEEDS DECISION]` |
| `/business-ai-os-assessment/admin` | `[NEEDS DECISION]` | `[NEEDS DECISION]` | none (internal admin, should likely be noindex — verify) | n/a (internal) | n/a | n/a |
| `/business-ai-os-vs-openclaw` | "OpenClaw Alternative for Service Businesses \| Revaya AI" | "OpenClaw has real security risks and no audit trail. Here is what actually breaks for service businesses — and what a Business AI Operating System does instead." | `WebPage`/comparison (`comparisonPageSchema`), `FAQPage` (`comparisonFaqSchema`) | `[NEEDS DECISION]` | "What's the difference between OpenClaw and a Business AI Operating System?" (inferred from title, not confirmed) | `[NEEDS DECISION]` |
| `/business-ai-os-vs-claude-code-obsidian` | "Business AI OS vs Claude Code + Obsidian \| Revaya AI" | "Claude Code + Obsidian works for technical founders who can maintain the integration. For service business owners, it has real ceilings, including the two-system maintenance problem. Here is where the setup breaks." | `WebPage`/comparison (`claudeCodeComparisonPageSchema`), `FAQPage` (`claudeCodeComparisonFaqSchema`) | `[NEEDS DECISION]` | "What's the difference between Claude Code + Obsidian and a Business AI Operating System?" (inferred, not confirmed) | `[NEEDS DECISION]` |
| `/solutions` | **MISSING — no metadata export** | **MISSING** | none | n/a | n/a | n/a |
| `/resources` | "Resource Center" (OG override: "Resource Center \| Revaya AI") | "Guides, frameworks, and case studies on building an agentic Business AI Operating System for founder-led businesses." | `CollectionPage`, `BreadcrumbList`, `Organization` | `[NEEDS DECISION]` | `[NEEDS DECISION]` | `[NEEDS DECISION]` |
| `/resources/[slug]` | Dynamic, from article frontmatter `title` | Dynamic, from frontmatter | `Article`, `FAQPage`, `BreadcrumbList`, `Organization`, `Person` (author) | Per-article, not tracked centrally — `[NEEDS DECISION]` whether this map tracks per-article or only the pattern | Per-article | Per-article |
| `/ai-prep-check` | "The AI Prep Check \| Revaya AI" | "5 questions. Find out if your business is documented enough for AI to do real work. Instant result, free to take." | `[NEEDS DECISION]` — no JsonLd import found, verify | `[NEEDS DECISION]` | "Is my business documented enough for AI to do real work?" (inferred from description) | `[NEEDS DECISION]` |
| `/privacy-policy` | "Privacy Policy" | none set, `robots: {index: false}` | none | n/a (noindex) | n/a | n/a |
| `/terms-of-use` | "Terms of Use" | none set, `robots: {index: false}` | none | n/a (noindex) | n/a | n/a |

---

## 2. Gaps found (seeded from Plan 1 research + this write-up)

1. **`app/solutions/page.tsx` has no metadata export at all.** Per `docs/design-system.md`'s route map, this page redirects to `/business-ai-operating-system` — confirm whether a redirect page needs its own metadata (generally no, if it 301s before render) or whether this is a real gap. `[NEEDS DECISION]`.
2. **`app/resources/page-v1.tsx` is a leftover version file** sitting alongside the live `app/resources/page.tsx`. Drift evidence — not routed, but present in the codebase. Cleanup candidate, out of scope for this pack.
3. **CTA standard is not resolved** — see `copy-standards.md` Section 4. Three different CTA phrases live in code with no recorded decision on which is canonical.
4. **`homeCopy` "we" voice violation** — see `copy-standards.md` Section 2 and `design-standards.md` Section 9.
5. **No target keyword is recorded anywhere** for any route — not in code, not in workspace memory searched during this pack's build. Every "target keyword" cell above is `[NEEDS DECISION]`. This is the single biggest actionable gap in this map: an SEO session should fill these in deliberately, not by guessing from the title tag.
6. **`/business-ai-os-assessment/admin` schema/index status not verified** — should very likely be `noindex`, not confirmed in code during this pass.
7. **`/ai-prep-check` and `/business-ai-os-assessment` JSON-LD presence unconfirmed** — grep found no `JsonLd` import in either page.tsx; may render schema via a child component not checked, or may genuinely have none. Verify before treating as a confirmed gap.

---

## 3. Crawler policy (`app/robots.ts`)

Current live policy, all rules `allow: "/"` except `/api/`:

| User agent | Type | Status |
|---|---|---|
| `*` (all) | General | Allow, disallow `/api/` |
| `GPTBot` | OpenAI training/search | Allow |
| `OAI-SearchBot` | OpenAI search | Allow |
| `ChatGPT-User` | OpenAI live browsing | Allow |
| `ClaudeBot` | Anthropic training/search | Allow |
| `PerplexityBot` | Perplexity search/answer | Allow |
| `Google-Extended` | Google AI training | Allow |

**No search-vs-training bot split currently exists** — every listed AI crawler is uniformly allowed. This is a policy choice (AEO visibility is the priority), not an oversight, but it is worth confirming deliberately rather than assuming. `[NEEDS DECISION]`: does Revaya want to keep uniform allow, or split search-surfacing bots from pure-training bots? Flagged per the Website OS teardown finding (`outputs/ops/internal/2026-08-02-website-os-teardown-handoff.md`), not resolved here.

Sitemap declared: `https://www.revaya.ai/sitemap.xml`.

---

## 4. `llms.txt` / `llms-full.txt`

Both files exist at `public/llms.txt` and `public/llms-full.txt`. Content covers: site URL, founder bio, what Revaya AI does, the five-layer AIOS model.

**Maintenance rule:** refresh `llms.txt` and `llms-full.txt` on any page add, remove, or significant positioning change. No automated check enforces this today — it is a manual duty, listed here so it isn't lost. A Plan 3 (Run phase) candidate is an automated staleness check against the live route list.

**Kept non-negotiable per Shannon**, even though the cited SE Ranking study found no confirmed citation correlation for `llms.txt` — cheap to maintain, no downside.

---

## 5. `sitemap.ts`

Present at `app/sitemap.ts`. Not deep-audited in this pass (out of scope — this map records state, it doesn't re-derive the sitemap generation logic). Flag for a future SEO session if route coverage needs verification against this map's route list.

---

## History

| Date | Change |
|---|---|
| 2026-08-02 | Created. Sourced from actual `metadata` exports and `lib/schema.ts` type literals across all 12 public routes + the resources/[slug] dynamic pattern. 7 gaps recorded, target keywords and page questions left `[NEEDS DECISION]` rather than invented. |
