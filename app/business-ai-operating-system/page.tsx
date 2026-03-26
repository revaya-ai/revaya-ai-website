import type { Metadata } from "next";
import BusinessAIOSPage from "./BusinessAIOSPage";

export const metadata: Metadata = {
  title: "Business AI Operating System | AIOS Services",
  description:
    "Five layers. The Business AI Operating System built for founder-led businesses. By AI consultant Shannon Winnicki — custom to how your business works.",
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
        text: "Claude Desktop is a better assistant. A Business AI OS is the system that runs your business when you're not in the room. Every Cowork session starts fresh. It does not know your clients, your pricing, or what you decided last week. What I build holds that context permanently and logs every decision so you know what happened when something goes wrong. Anthropic will never build that for your specific company.",
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
        text: "The engagement starts with an Audit, scoped and priced before any Setup begins. Setup runs $10K to $30K depending on the complexity of your business and the depth of the Build layer. Founders get 10 or more hours a week back. At a conservative $100 per hour, that is $1,000 a month in reclaimed capacity, every month, permanently. The three metrics I measure against are away-from-desk autonomy, task automation percentage, and revenue per headcount.",
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
        text: "You could. The tools are not the product. Knowing what to build is. You could open Obsidian today and still be staring at a blank vault asking what to put in it. The system design requires understanding your business, your clients, your workflows, your decision bottlenecks. That takes discovery, not installation. My clients pay because mapping their business and building the right system is worth more than three months of trial and error.",
      },
    },
    {
      "@type": "Question",
      name: "Claude Computer Use can click buttons, fill forms, and log into accounts. Can your system do that too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Claude Computer Use is Anthropic's approach — it works by controlling your screen directly. The AIOS uses Playwright, which is the production-grade version of the same capability. It can click, type, navigate, download files, and log into accounts just like Computer Use, but it runs cross-platform, does not require your screen to be visible, and is built for repeatable production tasks. Computer Use is Anthropic's fallback for when a structured integration does not exist. Playwright is how we do it in production — faster, more reliable, and with a full audit trail.",
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
      <BusinessAIOSPage />
    </>
  );
}
