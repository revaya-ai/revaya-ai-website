# Web Agent Brief: AIOS Module Library Section

**Date:** 2026-03-18
**File to modify:** `app/business-ai-operating-system/BusinessAIOSPage.tsx`
**Scope:** Enhance the existing "After the Build" section + add a Module Library sub-section below it

---

## Context

The Business AIOS service has an upsell mechanic: after the base setup ($15K), clients can add pre-built agent modules to their system through a Growth retainer. This is currently not communicated on the website. The "After the Build" section exists but only describes Maintenance and Growth in vague terms. This brief adds the module library concept to that section.

**Do NOT create a new page. Do NOT change any other section. Only modify the "After the Build" section.**

---

## What Already Exists (current "After the Build" section)

The section currently has:
- Label: "After the Build"
- Heading: "The system is live."
- Subheading: "Now it grows with your business."
- Two tier cards: **Maintenance** and **Growth**
- A note: "The retainer conversation happens at your 30-day check-in..."
- A terminal/stats widget on the left side

---

## What to Add

### Change 1 — Strengthen the Growth tier card

Replace the current Growth card body copy:

**Current:**
> Active build credits every month. Pricing varies based on the number of workflow builds, plus monthly strategy sessions. For businesses ready to keep expanding the OS, layer by layer.

**Replace with:**
> Active build credits every month. Each credit goes toward new agent modules installed in your system — from the library or custom-built. Plus monthly strategy sessions. For businesses ready to keep expanding the OS, layer by layer.

---

### Change 2 — Add "The Module Library" sub-section

Add this new sub-section **directly below** the Maintenance/Growth tier cards, **above** the "The retainer conversation happens at your 30-day check-in" note.

**Section label:** `Growth · Module Library`

**Heading:**
> Add capabilities when you need them.

**Body:**
> Every AIOS starts with the foundation. As your business grows, you add modules — pre-built agents configured specifically for your operations and installed by Shannon.

**Module grid** — display as a 2-column grid (desktop) / 1-column (mobile) of module cards. Each card has:
- A small label in the top-left (use the same muted label style as other terminal-style labels in the page)
- A module name (slightly larger, white)
- A one-line description (muted/dimmed text)
- A status badge on the right: either `available` (green dot) or `coming soon` (dimmed)

**Module cards to display:**

| Module | Description | Status |
|--------|-------------|--------|
| Email Intel Agent | Daily briefing. Triage, flags, and action items from your inbox — delivered before you start your day. | available |
| Meeting Notes + CRM | Auto-captures every meeting. Extracts commitments, updates contacts, flags follow-ups. | available |
| Pipeline Intel Agent | Ask your pipeline anything in plain language. Deal status, overdue follow-ups, next actions. | available |
| Content Capture Agent | Captures ideas from voice, Telegram, or email and routes them to your content pipeline automatically. | available |
| Outbound Research Agent | Enriches new leads before you get on a call. Company context, pain points, talking points — ready. | coming soon |
| Scheduling Agent | Set recurring automations in plain language. "Run this every Monday at 9am." No terminal required. | coming soon |

**Visual treatment:**
- Match the dark card style used elsewhere on the page (dark background, subtle border, same font weights)
- `available` badge: small dot + text in the same green used for "system active" indicators elsewhere
- `coming soon` badge: dimmed/muted, no dot
- Cards should feel like a product menu, not a feature list

**Below the grid, add this closing line** (small, muted, same style as other supporting copy):
> Modules are installed and configured by Shannon as part of your Growth or Partnership retainer. Not a self-serve download.

---

### Change 3 — Update the retainer note

The existing note at the bottom of the section:

**Current:**
> The retainer conversation happens at your 30-day check-in, once you've used the system and know what you want next.

**Replace with:**
> The retainer conversation happens at your 30-day check-in. By then, you'll know exactly what the system is doing well and what you want it to do next. That's when we scope the first module.

---

## Design Rules

- Match ALL existing design patterns exactly: terminal-style labels, dark cards, the same green for active states, Montserrat font weights, muted secondary text in the same opacity as used elsewhere
- No new colors. No new font sizes outside the existing scale
- The module grid should feel like it belongs natively — not like something dropped in from a different design system
- Mobile: single column grid
- Desktop: 2-column grid

---

## What NOT to Do

- Do not add a new nav item
- Do not create a new page
- Do not touch any other section of the page
- Do not change the heading "The system is live." — it stays
- Do not add pricing to the module cards
- Do not add CTAs inside the module cards — the section CTA is already "Book the Audit" at the bottom of the page
