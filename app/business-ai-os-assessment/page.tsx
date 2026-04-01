import type { Metadata } from "next";
import { AssessmentApp } from "./AssessmentApp";

export const metadata: Metadata = {
  title: "Business AI OS Assessment | Revaya AI",
  description:
    "Find out where your founder-led business is leaking time and revenue. 29 questions. Personalized ROI scorecard. See what a Business AI OS could do.",
  keywords: [
    "business AI OS assessment",
    "business AI operating system",
    "founder bottleneck",
    "AI readiness",
    "Revaya AI",
  ],
  openGraph: {
    title: "Business AI OS Assessment | Revaya AI",
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
