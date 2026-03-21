import type { Metadata } from "next";
import ComparisonPage from "./ComparisonPage";
import { JsonLd } from "@/components/JsonLd";
import { comparisonFaqSchema, comparisonPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Business AI OS vs OpenClaw | Revaya AI",
  description:
    "OpenClaw promises a business that runs itself. Here is what it actually requires, where it breaks down for service businesses, and what a Business AI OS does differently.",
  keywords: [
    "openclaw alternatives",
    "openclaw for small business",
    "is openclaw safe",
    "openclaw security risks",
    "business AI OS",
    "business AI operating system",
    "openclaw vs business AI",
    "AI automation for service businesses",
  ],
  openGraph: {
    title: "Business AI OS vs OpenClaw | Revaya AI",
    description:
      "OpenClaw promises a business that runs itself. Here is what it actually requires, where it breaks down for service businesses, and what a Business AI OS does differently.",
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
