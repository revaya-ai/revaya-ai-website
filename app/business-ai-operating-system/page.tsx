import type { Metadata } from "next";
import BusinessAIOSPage from "./BusinessAIOSPage";
import { howToAIOSSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Business AI Operating System | AIOS Services",
  description:
    "Every decision routes through you. That's the ceiling. I build the operational backbone that changes it. The Business AI Operating System for owner-operators, custom to how you work.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Claude Desktop and Cowork look like they do the same thing. Why would I need a custom AI OS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude Desktop is a better assistant. A Business AI OS is the system that runs your business when you're not in the room. Every Cowork session starts fresh. It does not know your clients, your pricing, or what you decided last week. What I build holds that context permanently and logs every decision so you know exactly what happened when something goes wrong. Anthropic builds tools for everyone. I build a system for your specific business. That's not something they will ever do.",
      },
    },
    {
      "@type": "Question",
      name: "Is this basically a custom ChatGPT wrapper for my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A chatbot answers questions. A Business AI OS runs operations. The difference is what happens when you are not in the room. A chatbot waits. The AIOS acts. It monitors, routes, responds, and logs based on the logic built into it during Setup. It also carries full business context across every interaction: your clients, your pricing, your decisions, your voice. A chatbot forgets every time you close the tab.",
      },
    },
    {
      "@type": "Question",
      name: "What does this cost, and how do I know it will pay off?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Assessment starts at 2,500. If you move forward, it comes off your build. If you don't, you walk away with a clear gap map and a Priority Roadmap you can act on yourself. It's yours either way. Three build packages based on scope: Starter at 7,000, Core at 11,000, or Full Build at custom pricing. Each comes with a monthly subscription that scales to the package. The three metrics I track: Task Automation %, Hours Recovered per Week, and Monthly ROI. Most business owners get 10 or more hours a week back. At a conservative 100 an hour, that's 1,000 a month in reclaimed capacity, every month, permanently. If those numbers don't move, the system isn't working.",
      },
    },
    {
      "@type": "Question",
      name: "What if the AI makes a wrong decision or does something I didn't intend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every system I build includes a decision log and rollback capability. You can see every action the system took, when it took it, and why. This is not optional. It is part of how I build. A Cowork user asked it to clean up a folder. It deleted 11GB of files with no confirmation and no audit trail. That is what happens when a powerful tool operates without accountability. What I build is auditable by design.",
      },
    },
    {
      "@type": "Question",
      name: "Can't I just set up Claude Code and Obsidian myself? Why pay for this?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You could. The tools are not the product. Knowing what to build is. You could open Obsidian today and still be staring at a blank vault asking what to put in it. The system design requires understanding your business: your clients, your workflows, where decisions pile up on you. That takes discovery, not installation. My clients pay because mapping their business and building the right system is worth more than three months of trial and error.",
      },
    },
    {
      "@type": "Question",
      name: "Claude Computer Use can click buttons, fill forms, and log into accounts. Can your system do that too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Claude Computer Use is Anthropic's approach — it works by controlling your screen directly. The AIOS uses Playwright, which is the production-grade version of the same capability. It can click, type, navigate, download files, and log into accounts just like Computer Use, but it runs cross-platform, does not require your screen to be visible, and is built for repeatable production tasks. Computer Use is Anthropic's fallback for when a structured integration does not exist. Playwright is how I do it in production. Faster, more reliable, and with a full audit trail.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between AI tools and an AI operating system?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI tools are point solutions. You buy one to do email, one to do scheduling, one to do analytics. Then you become the connector between all of them. An AI operating system is the architecture that all of those functions connect to. You set it up once. It runs. You stop being the middleware. The difference is whether you are managing the tools or the tools are managing the work.",
      },
    },
    {
      "@type": "Question",
      name: "Can a small business run without the owner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The condition is that the business runs on systems, not on one person's presence and memory. Most small businesses were never built that way. The owner became the operating system by default, filling gaps because it was faster than documenting anything. A Business AI OS replaces that dependency layer. It holds the business knowledge, handles the repeatable work, and keeps things moving when the owner steps back. The 30-day mark is when you know whether it's real.",
      },
    },
    {
      "@type": "Question",
      name: "How do I stop being the bottleneck in my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by naming what's actually routing through you. Not the big decisions. The repeatable ones. The follow-up email. The status update. The answer to a question someone asked last Tuesday and last month and will ask again next week. Those are not leadership tasks. Those are systems problems. A Business AI OS maps every place the business is running through you, and replaces you as the operating system for the repeatable layer. You stay in the decisions that actually require you. Everything else runs.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToAIOSSchema) }}
      />
      <BusinessAIOSPage />
    </>
  );
}
