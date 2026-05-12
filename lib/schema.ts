export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Revaya AI",
  url: "https://www.revaya.ai",
  logo: "https://www.revaya.ai/revaya-ai-logo.png",
  description:
    "Revaya AI builds Business AI Operating Systems for founder-led businesses. Founder: Shannon Winnicki. The AIOS methodology covers four layers — Context, Data, Intelligence, Automate — and delivers three measurable outcomes: Task Automation %, Hours Recovered per Week, and Monthly ROI ($).",
  founder: {
    "@type": "Person",
    name: "Shannon Winnicki",
    url: "https://www.revaya.ai/why-revaya",
    sameAs: ["https://www.linkedin.com/in/swinnicki/"],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer inquiries",
    url: "https://www.revaya.ai/work-with-me",
  },
  sameAs: ["https://www.linkedin.com/company/revaya-ai"],
  areaServed: "Worldwide",
  serviceType: "Business AI Operating System Consulting",
};

export const homeWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Business AI OS for Founder-Led Businesses — Revaya AI",
  description:
    "Your business shouldn't run only when you do. I build Business AI Operating Systems for founder-led businesses — four layers, three measurable outcomes.",
  url: "https://www.revaya.ai",
  isPartOf: {
    "@type": "WebSite",
    name: "Revaya AI",
    url: "https://www.revaya.ai",
  },
  about: {
    "@type": "Thing",
    name: "Business AI Operating System",
    description:
      "A Business AI Operating System is a structured methodology for building the operational infrastructure of a service business using AI. It covers four layers — Context, Data, Intelligence, Automate — and is designed to deliver three measurable outcomes: Task Automation %, Hours Recovered per Week, and Monthly ROI ($).",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.revaya.ai" },
    ],
  },
};

export const solutionsWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Business AI OS Services — Revaya AI",
  description:
    "AI Training, AIOS Audit, and AIOS Setup for founder-led businesses. I build the system — you don't figure it out alone. The Audit is where most people start.",
  url: "https://www.revaya.ai/solutions",
  isPartOf: {
    "@type": "WebSite",
    name: "Revaya AI",
    url: "https://www.revaya.ai",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.revaya.ai" },
      { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.revaya.ai/solutions" },
    ],
  },
};

export const aiTrainingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Training for Business Teams",
  description:
    "Customized AI training for service business owners and their teams. Built around the client's actual tools, workflows, and team — not a generic AI overview. Training clients often move to the AIOS Audit after 2-3 sessions.",
  provider: {
    "@type": "Person",
    name: "Shannon Winnicki",
    url: "https://www.revaya.ai/why-revaya",
  },
  serviceType: "AI Training",
  areaServed: "Worldwide",
  url: "https://www.revaya.ai/solutions",
};

export const aiosAuditServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Business AI Operating System Audit",
  alternateName: "AIOS Audit",
  description:
    "The Audit is $2,500 and is deductible against the AIOS Setup if the client proceeds. It maps the entire service business: where time goes, where decisions bottleneck, where AI can actually help. It produces an operational gap map, an AI readiness assessment, and a recommended path forward.",
  provider: {
    "@type": "Person",
    name: "Shannon Winnicki",
    url: "https://www.revaya.ai/why-revaya",
  },
  serviceType: "Business AI OS Consulting",
  areaServed: "Worldwide",
  url: "https://www.revaya.ai/solutions",
};

export const aiosSetupServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Business AI Operating System Setup",
  alternateName: "AIOS Setup",
  description:
    "Full Business AI OS installation for founder-led businesses. Covers four layers: Context (the system knows your business), Data (real numbers connected), Intelligence (what's happening surfaces automatically), Automate (recurring work runs without you). Each month, new modules expand the build. Delivers three measurable outcomes: Task Automation %, Hours Recovered per Week, and Monthly ROI ($).",
  provider: {
    "@type": "Person",
    name: "Shannon Winnicki",
    url: "https://www.revaya.ai/why-revaya",
  },
  serviceType: "Business AI OS Consulting",
  areaServed: "Worldwide",
  url: "https://www.revaya.ai/solutions",
};

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "I've tried AI tools before and they didn't stick. Why would this be different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because tools and systems are different things. Most AI tools are point solutions. They do one thing well if you set them up correctly and remember to use them. The AIOS is an operating system. I install it, configure it to your specific business, and integrate it into how your operations actually work. You don't have to figure it out. You don't have to maintain it. You're not left with a tool and a YouTube tutorial. You're left with a running system.",
      },
    },
    {
      "@type": "Question",
      name: "How long does this take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Audit runs across one to two sessions and produces a specific deliverable within a week of completion. The Setup is scoped after the Audit. Most engagements run four to eight weeks, depending on the complexity of the business and the depth of the Build layer. I'll give you a specific timeline after the Audit, not before. Generic timelines are guesses. Scoped timelines are real.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be technical?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your job in this process is knowing your business: how it works, where your time goes, what decisions you make, what breaks. That's it. I handle the technical layer. The AIOS is built for a business owner to use every day, not for an engineer to maintain.",
      },
    },
    {
      "@type": "Question",
      name: "What if my business is too small or too early?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Audit will answer that. I've told founders their business isn't ready for a full AIOS build. That's not a failure. It's an accurate read. If your operations aren't complex enough to justify the system yet, I'd rather tell you that upfront than build something you don't need.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if something breaks after Setup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ongoing support is built into every engagement. You're not handed a system and wished luck. Maintenance retainers cover system monitoring, minor updates, and a quarterly review. Growth retainers include active monthly builds if the system needs to expand. You'll know exactly what support looks like before Setup begins.",
      },
    },
    {
      "@type": "Question",
      name: "Is this just automation? I already have Zapier.",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zapier automates individual tasks. The AIOS changes how your whole business operates. That's not a semantic difference — it's a structural one. Zapier can automate one invoice reminder. The AIOS determines how all of your intake, client management, reporting, and team coordination works without you being in the middle of it. Most businesses that come to me have Zapier. Most of them also have automations that break when something changes and nobody knows why. The AIOS is a system, not a stack of automations. Full audit trails mean you can see every decision it makes.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from hiring an operations consultant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An operations consultant maps your business, writes recommendations, hands you a document, and leaves. You then have to figure out how to implement those recommendations yourself. I build the infrastructure and leave it running. The difference is the gap between a report and a working system. I'm not giving you advice on what to build. I'm building it.",
      },
    },
    {
      "@type": "Question",
      name: "What do you actually need from me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Time for the Audit interview, usually one to two sessions. Access to your current tools and platforms so I can understand the actual state of things, not just what you think the state of things is. And honest answers about how the business works, including the parts that don't work. The Audit is only as good as the information it's built on.",
      },
    },
    {
      "@type": "Question",
      name: "I've been looking at tools like OpenClaw. How is this different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tools like OpenClaw promise the same thing: a business that runs without you. But getting there requires significant training and configuration — it's a long ramp before it does anything useful. And the biggest problem is security: because it runs on your own hardware with broad system access, your machine becomes the vulnerability. That's not a setup problem you can patch around. It's the architecture. The Business AI OS doesn't run on separate hardware. I map your business first, build a system around how it actually works, and leave it running — secure, configured, and ready. You get the outcome without the engineering project or the security exposure.",
      },
    },
  ],
};

export const comparisonFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can OpenClaw run a service business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OpenClaw can automate individual tasks — email management, file organization, web research — but it has no strategic layer. It does what you tell it to do, not what your business actually needs. Without a system that connects your goals, your data, and your workflows, you end up automating the wrong things or creating new problems faster than you solve old ones.",
      },
    },
    {
      "@type": "Question",
      name: "Is OpenClaw safe for a small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OpenClaw has active security vulnerabilities as of early 2026, including a critical remote code execution flaw (CVE-2026-25253), a WebSocket hijacking vulnerability called ClawJacked, and 341 confirmed malicious skills on its ClawHub marketplace. Microsoft, Cisco, and CrowdStrike have all published security advisories. It requires broad system-level permissions with no least-privilege architecture and no audit trail. For non-technical service business owners handling client data, the risk is significant.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a developer to use OpenClaw?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OpenClaw requires Docker, YAML configuration, VPS or local server setup, API key management, and ongoing security hardening. It was designed for technical operators. In practice, non-technical business owners are paying engineers to install it for them — but the ongoing security burden still falls on the operator.",
      },
    },
    {
      "@type": "Question",
      name: "What does OpenClaw cost per month to run?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Running OpenClaw costs approximately $25 to $50 per month for light-to-moderate use. That does not include engineer fees many non-technical users pay for installation. API costs can spike significantly with no real-time visibility — documented cases show monthly bills going from $80 to over $2,100 in a single month when agents run unchecked.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when OpenClaw makes a mistake? Is there an audit trail?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no audit trail in OpenClaw by default. Actions taken by the agent are not logged in a reviewable format. If something goes wrong — a file deleted, an email sent, data exfiltrated — you may not know it happened until the damage is done. A Business AI OS is built on full transparency: every decision is visible, every action is logged, and nothing happens without a reason you can trace.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Business AI OS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Business AI OS is a structured operating environment built specifically around a founder-led business. It is not a single tool — it is five connected layers: Context (everything the AI needs to know about your business), Data (your actual business data, not a generic feed), Intelligence (AI that understands your goals and bottlenecks), Automate (workflows that run without you), and Build (custom systems as your needs grow). A Business AI OS is designed and implemented by a specialist, auditable at every layer, and built to compound over time.",
      },
    },
    {
      "@type": "Question",
      name: "Who should use OpenClaw vs. a Business AI OS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OpenClaw is built for technical operators — developers, engineers, and IT professionals who are comfortable managing servers, YAML config, and security hardening. A Business AI OS is built for founders of service businesses who want autonomous AI without the technical complexity, security exposure, or strategic guesswork. If your business runs on expertise, relationships, and judgment — and you want a system that actually understands what you are trying to build — a Business AI OS is the right fit.",
      },
    },
  ],
};

export const comparisonPageSchema = (url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Business AI OS vs OpenClaw: What Service Business Owners Need to Know",
  description:
    "OpenClaw promises a business that runs itself. Here is what it actually requires, where it breaks down for service businesses, and what a Business AI OS does differently.",
  url,
  isPartOf: {
    "@type": "WebSite",
    name: "Revaya AI",
    url: "https://www.revaya.ai",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.revaya.ai" },
      { "@type": "ListItem", position: 2, name: "Business AI OS vs OpenClaw", item: url },
    ],
  },
});

export const shannonPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shannon Winnicki",
  url: "https://www.revaya.ai/why-revaya",
  jobTitle: "Founder, Business AI OS Consultant",
  worksFor: {
    "@type": "Organization",
    name: "Revaya AI",
    url: "https://www.revaya.ai",
  },
  description:
    "Shannon Winnicki has 18 years of product leadership experience at Virgin Mobile, Boost Mobile, Ultra Mobile, Papa Murphy's, and Intermedia. She is the founder of Revaya AI and the creator of the four-layer Business AI OS methodology, which she built and validated on her own company before offering it as a service.",
  knowsAbout: [
    "Business AI Operating Systems",
    "AI consulting for founder-led businesses",
    "Operational systems design",
    "Product management",
    "Business automation",
  ],
  sameAs: ["https://www.linkedin.com/in/swinnicki/"],
};

export const whyRevayaWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Why Revaya AI — Shannon Winnicki, Business AI OS Consultant",
  description:
    "18 years at Virgin Mobile, Papa Murphy's, and Intermedia. I built the Business AI OS for my own company first — then made it a service. Here's the story.",
  url: "https://www.revaya.ai/why-revaya",
  isPartOf: {
    "@type": "WebSite",
    name: "Revaya AI",
    url: "https://www.revaya.ai",
  },
  about: {
    "@type": "Person",
    name: "Shannon Winnicki",
    url: "https://www.revaya.ai/why-revaya",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.revaya.ai" },
      { "@type": "ListItem", position: 2, name: "Why Revaya", item: "https://www.revaya.ai/why-revaya" },
    ],
  },
};

export const workWithMeContactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Work With Me — Revaya AI",
  description:
    "Tell me what's slowing you down. I read every submission personally and respond within 48 hours if it's a fit.",
  url: "https://www.revaya.ai/work-with-me",
  isPartOf: {
    "@type": "WebSite",
    name: "Revaya AI",
    url: "https://www.revaya.ai",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.revaya.ai" },
      { "@type": "ListItem", position: 2, name: "Work With Me", item: "https://www.revaya.ai/work-with-me" },
    ],
  },
};

export const claudeCodeComparisonFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Claude Code + Obsidian used for in business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Code is a command-line AI tool for coding and workflow automation. Obsidian is a local markdown knowledge base. Together, they function as a DIY business brain: Claude Code reads context from Obsidian and uses it to operate more like a business-aware assistant. The setup requires technical fluency to build and maintain."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Business AI Operating System?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Business AI Operating System is a custom-built intelligence layer for a specific business. It captures how the business actually works, what decisions have been made, who the clients are, and what repeatable work looks like, then runs autonomously to handle that work without the founder's constant involvement."
      }
    },
    {
      "@type": "Question",
      "name": "How is a Business AI OS different from Claude Code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Code is a tool. A Business AI OS is a system built on top of tools. Claude Code is one component that might live inside a Business AI OS. The difference is like a hammer versus a construction firm: one requires a skilled hand every time; the other operates without you."
      }
    },
    {
      "@type": "Question",
      "name": "What is the two-system problem with Claude Code and Obsidian?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you use Claude Code plus Obsidian, you are maintaining two separate applications, two update cycles, and the integration between them. When either breaks, diagnosis and repair are your responsibility. A Business AI OS is a single maintained system with no integration gap to manage."
      }
    },
    {
      "@type": "Question",
      "name": "What is CLAUDE.md and why does it matter for businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A CLAUDE.md is a markdown configuration file that gives Claude persistent context about how you work and what it should know about your business. Nick Saraev popularized this for business owners. It is one file that genuinely improves what Claude can do. Not an operating system. The starting point."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when Claude Code or Obsidian updates break a workflow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You fix it. Both products update on their own schedules. When a plugin or context behavior changes, the maintenance falls to whoever built the setup. In a Business AI OS, that maintenance is part of the ongoing engagement."
      }
    },
    {
      "@type": "Question",
      "name": "Who is Claude Code + Obsidian best for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technical founders and developers who are comfortable in a terminal, enjoy the maintenance work, and want to build their own custom setup. Not the right fit for service business owners who need the system to run when they are not watching it."
      }
    },
    {
      "@type": "Question",
      "name": "Should a service business owner build their own AI OS or hire someone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Build it yourself if you have CLI comfort and you accept that it will need ongoing upkeep. Hire someone if your goal is a system that runs without you, pulls from live business data, and compounds over time. The real question is whether the setup work is how you want to be spending your hours."
      }
    }
  ]
};

export const howToAIOSSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Build a Business AI Operating System for Your Company",
  description:
    "A Business AI Operating System is built in four layers. Each layer installs a specific capability. Together they let an owner-operated business run on systems instead of the owner running on fumes.",
  totalTime: "P30D",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "10000",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Context Layer",
      text: "Install business context so the system knows your terminology, clients, priorities, and decision-making style. This is the foundation — without it, every AI interaction starts from zero.",
      url: "https://www.revaya.ai/business-ai-operating-system",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Data Layer",
      text: "Connect your business data. Revenue, pipeline, and operational metrics surface automatically instead of being pulled manually from four different platforms.",
      url: "https://www.revaya.ai/business-ai-operating-system",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Intelligence Layer",
      text: "Add monitoring and flagging so what needs your attention becomes visible without you asking. The system tells you what matters instead of waiting for you to query it.",
      url: "https://www.revaya.ai/business-ai-operating-system",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Automate Layer",
      text: "Run recurring work automatically. Client intake, onboarding, follow-up, and reporting — scheduled and executed without you triggering each one.",
      url: "https://www.revaya.ai/business-ai-operating-system",
    },
  ],
  tool: [
    { "@type": "HowToTool", name: "Claude AI" },
    { "@type": "HowToTool", name: "Business process documentation" },
    { "@type": "HowToTool", name: "API integrations" },
  ],
};

export const claudeCodeComparisonPageSchema = (url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Business AI OS vs Claude Code + Obsidian | Revaya AI",
  "description": "Claude Code and Obsidian can run your business — with the right technical setup, ongoing maintenance, and the founder at the terminal. Here is where that approach has a ceiling, and what a Business AI OS does differently.",
  "url": url,
  "dateModified": "2026-05-11",
  "author": {
    "@type": "Person",
    "name": "Shannon Winnicki",
    "url": "https://www.revaya.ai",
    "jobTitle": "Founder, Revaya AI",
    "worksFor": {
      "@type": "Organization",
      "name": "Revaya AI",
      "url": "https://www.revaya.ai"
    }
  },
  "about": [
    { "@type": "Thing", "name": "Business AI Operating System" },
    { "@type": "Thing", "name": "Claude Code" },
    { "@type": "Thing", "name": "Agentic OS" },
    { "@type": "Thing", "name": "AI automation for small business" },
    { "@type": "Thing", "name": "Obsidian knowledge base" },
    { "@type": "Thing", "name": "LLM wiki" }
  ],
  "mentions": [
    {
      "@type": "Person",
      "name": "Nick Saraev",
      "jobTitle": "AI Educator and Creator",
      "description": "Popularized the CLAUDE.md business brain approach for non-technical founders. His video on the CLAUDE.md file has over 802,000 views."
    },
    {
      "@type": "Person",
      "name": "Andrej Karpathy",
      "url": "https://github.com/karpathy",
      "jobTitle": "AI Researcher",
      "description": "Published the LLM wiki knowledge architecture pattern on April 4, 2026 — a structured three-folder approach to persistent AI memory that has since been widely adopted by builders and creators."
    },
    {
      "@type": "Person",
      "name": "Garry Tan",
      "url": "https://github.com/garrytan",
      "jobTitle": "President, Y Combinator",
      "description": "Released GBrain on April 5, 2026 — a Claude Code-based business brain that reached 13,535 GitHub stars and accelerated mainstream adoption of the AI second brain concept."
    },
    {
      "@type": "Person",
      "name": "Nate Herk",
      "jobTitle": "AI Educator and Creator",
      "description": "Built a Claude Code OS course with 127,000 views and 718,000 subscribers. Acknowledged the DIY ceiling directly: it is difficult to give a step-by-step playbook because everyone runs their business differently."
    },
    {
      "@type": "Person",
      "name": "Chase AI",
      "jobTitle": "AI Educator and Creator",
      "description": "Created the Agentic OS framework for Claude Code — a three-layer architecture covering skill libraries, Karpathy-pattern memory vaults, and web dashboards for non-technical users. Acknowledged in May 2026 that the 99.9% of non-technical business owners are underserved by existing DIY setups."
    }
  ],
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.revaya.ai" },
      { "@type": "ListItem", "position": 2, "name": "Business AI OS vs Claude Code + Obsidian" }
    ]
  }
});
