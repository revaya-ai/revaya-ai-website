import type { Metadata } from "next";
import ComparisonPage from "./ComparisonPage";
import JsonLd from "@/components/JsonLd";
import { comparisonFaqSchema, comparisonPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "OpenClaw Alternative for Service Businesses | Revaya AI",
  description:
    "OpenClaw has real security risks and no audit trail. Here is what actually breaks for service businesses — and what a Business AI Operating System does instead.",
  keywords: [
    "openclaw alternative",
    "openclaw for small business",
    "is openclaw safe",
    "openclaw security risks",
    "business AI operating system",
    "openclaw vs business AI operating system",
    "AI automation for service businesses",
    "openclaw self-hosted setup",
  ],
  openGraph: {
    title: "OpenClaw Alternative for Service Businesses | Revaya AI",
    description:
      "OpenClaw has real security risks and no audit trail. Here is what actually breaks for service businesses — and what a Business AI Operating System does instead.",
  },
  alternates: {
    canonical: "https://www.revaya.ai/business-ai-os-vs-openclaw",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <JsonLd data={comparisonPageSchema("https://www.revaya.ai/business-ai-os-vs-openclaw")} />
      <JsonLd data={comparisonFaqSchema} />
      <ComparisonPage />
    </>
  );
}
