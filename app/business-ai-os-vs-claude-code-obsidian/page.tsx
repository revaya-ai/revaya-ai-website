import type { Metadata } from "next";
import ClaudeCodeComparisonPage from "./ClaudeCodeComparisonPage";
import JsonLd from "@/components/JsonLd";
import { claudeCodeComparisonFaqSchema, claudeCodeComparisonPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Business AI OS vs Claude Code + Obsidian | Revaya AI",
  description:
    "Claude Code + Obsidian has a ceiling for service businesses. Here is where it stops working — and what a Business AI OS does differently.",
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
  ],
  openGraph: {
    title: "Business AI OS vs Claude Code + Obsidian | Revaya AI",
    description:
      "Claude Code + Obsidian has a ceiling for service businesses. Here is where it stops working — and what a Business AI OS does differently.",
  },
  alternates: {
    canonical: "https://www.revaya.ai/business-ai-os-vs-claude-code-obsidian",
  },
  robots: { index: false, follow: false },
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
