# RETIRED — do not deploy from this folder

This is NOT the live revaya.ai site source. Git history frozen 2026-08-02.

**The real site lives here:**
`/Users/short/Desktop/Revaya AI OS/revay-AI-OS-workspace/clients/revaya-ai/build/site/`

## Why this folder still exists

Old calculators and reference content Shannon wants to keep. Nothing here
should be edited, deployed, or treated as current.

## What was done to make this safe

- `.vercel/` renamed to `.vercel.disconnected-2026-08-18/` so `vercel --prod`
  run from here can no longer overwrite the live site.
- Folder renamed to `revaya-ai-website-RETIRED` on 2026-08-18.

Full incident writeup: `knowledge/learnings/2026-08-18-two-folders-one-live-deploy-target.md`
in the workspace repo.

## If you need to ship a revaya.ai change

Use `/revaya-site-ship` from the workspace repo. Never run `vercel --prod`
by hand, and never from this folder.
