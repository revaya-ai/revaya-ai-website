import type { Metadata } from "next";
import PrepCheckApp from "./PrepCheckApp";

export const metadata: Metadata = {
  title: "The AI Prep Check | Revaya AI",
  description:
    "5 questions. Find out if your business is documented enough for AI to do real work. Instant result, free to take.",
  keywords: ["AI readiness", "business documentation", "owner-operator AI", "Revaya AI", "AI prep"],
  robots: { index: true, follow: true },
};

export default function AIprepCheckPage() {
  return <PrepCheckApp />;
}
