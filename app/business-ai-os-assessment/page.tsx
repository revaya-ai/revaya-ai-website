import type { Metadata } from "next";
import { AssessmentApp } from "./AssessmentApp";

export const metadata: Metadata = {
  title: "Business AI Discovery Assessment | Revaya AI",
  description:
    "Find out where your small business is leaking time and money. The Discovery Assessment maps exactly where you're losing both.",
  keywords: [
    "business AI OS assessment",
    "business AI operating system",
    "how to stop being the bottleneck",
    "small business AI system",
    "business runs without me",
    "how to scale without hiring",
    "wearing all the hats",
    "AI readiness",
    "Revaya AI",
  ],
  openGraph: {
    title: "Business AI Discovery Assessment | Revaya AI",
    description:
      "Find out where your business is leaking time and revenue. Get a personalized ROI scorecard.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AssessmentPage() {
  return <AssessmentApp />;
}
