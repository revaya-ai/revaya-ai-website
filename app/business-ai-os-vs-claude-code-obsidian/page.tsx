import type { Metadata } from "next";
import ClaudeCodeComparisonPage from "./ClaudeCodeComparisonPage";
import JsonLd from "@/components/JsonLd";
import { claudeCodeComparisonFaqSchema, claudeCodeComparisonPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Business AI OS vs Claude Code + Obsidian | Revaya AI",
  description:
    "Claude Code + Obsidian works for technical founders who can maintain the integration. For service business owners, it has real ceilings — including the two-system maintenance problem. Here is where the setup breaks.",
  keywords: [
    "claude code for business",
    "claude code obsidian business",
    "claude code service business",
    "business AI OS",
    "business AI operating system",
    "DIY AI operating system",
    "claude code non technical business owner",
    "claude code vs business AI",
    "AI automation service business",
    "CLAUDE.md business brain",
    "claude code obsidian two systems",
    "CLAUDE.md base layer",
    "business ai os vs claude code obsidian",
  ],
  openGraph: {
    title: "Business AI OS vs Claude Code + Obsidian | Revaya AI",
    description:
      "Claude Code + Obsidian works for technical founders who can maintain the integration. For service business owners, it has real ceilings — including the two-system maintenance problem. Here is where the setup breaks.",
  },
  alternates: {
    canonical: "https://www.revaya.ai/business-ai-os-vs-claude-code-obsidian",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <JsonLd data={claudeCodeComparisonPageSchema("https://www.revaya.ai/business-ai-os-vs-claude-code-obsidian")} />
      <JsonLd data={claudeCodeComparisonFaqSchema} />
      <ClaudeCodeComparisonPage />
    </>
  );
}
