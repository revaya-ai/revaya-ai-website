export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Revaya AI",
  url: "https://www.revaya.ai",
  logo: "https://www.revaya.ai/revaya-ai-logo.png",
  description:
    "Revaya AI builds Business AI Operating Systems for founder-led businesses. Founder: Shannon Winnicki. The AIOS methodology covers five layers — Context, Data, Intelligence, Automate, Build — and delivers three measurable outcomes: away-from-desk autonomy, task automation percentage, and revenue per headcount.",
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
    "Your business shouldn't run only when you do. I build Business AI Operating Systems for founder-led businesses — five layers, three measurable outcomes.",
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
      "A Business AI Operating System is a structured methodology for building the operational infrastructure of a service business using AI. It covers five layers — Context, Data, Intelligence, Automate, Build — and is designed to deliver three measurable outcomes: away-from-desk autonomy, task automation percentage, and revenue per headcount.",
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
    "The Business AI OS Audit maps the entire service business: where time goes, where decisions bottleneck, where AI can actually help. It produces an operational gap map, an AI readiness assessment, and a recommended path forward. The Audit fee is deductible against the AIOS Setup if the client proceeds.",
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
    "Full Business AI OS installation for founder-led businesses. Covers five layers: Context (the system knows your business), Data (real numbers connected), Intelligence (what's happening surfaces automatically), Automate (recurring work runs without you), Build (freed capacity directed at growth). Delivers three measurable outcomes: away-from-desk autonomy, task automation percentage, and revenue per headcount.",
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
    "Shannon Winnicki has 18 years of product leadership experience at Virgin Mobile, Boost Mobile, Ultra Mobile, Papa Murphy's, and Intermedia. She is the founder of Revaya AI and the creator of the five-layer Business AI OS methodology, which she built and validated on her own company before offering it as a service.",
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
