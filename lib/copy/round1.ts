/**
 * Round 1 copy deck — home page only.
 * Source: plans/open/2026-06-18-revaya-website-round1-copy-deck.md
 * Do not edit copy here without updating the source doc.
 */

export interface CtaLink {
  label: string;
  href: string;
}

export interface HeroCopy {
  eyebrow: string;
  headline: string;
  subcopy: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export interface CostOfStayingSameCopy {
  eyebrow: string;
  heading: string;
  body: string[];
}

export interface WhatWeDoCopy {
  eyebrow: string;
  heading: string;
  body: string[];
}

export interface FourLayerItem {
  name: string;
  body: string;
}

export interface FourLayersCopy {
  eyebrow: string;
  heading: string;
  intro: string;
  layers: FourLayerItem[];
  closing: string;
}

export interface DifferentiatorCopy {
  eyebrow: string;
  heading: string;
  body: string[];
}

export interface ProofCopy {
  eyebrow: string;
  heading: string;
  body: string[];
  brands: string[];
  proofSlotPlaceholder: string;
}

export interface FinalCtaCopy {
  heading: string;
  body: string[];
  cta: CtaLink;
}

export interface HomeCopy {
  hero: HeroCopy;
  costOfStayingSame: CostOfStayingSameCopy;
  whatWeDo: WhatWeDoCopy;
  fourLayers: FourLayersCopy;
  differentiator: DifferentiatorCopy;
  proof: ProofCopy;
  finalCta: FinalCtaCopy;
}

export const homeCopy: HomeCopy = {
  hero: {
    eyebrow: "AI Operating System",
    headline: "What is the one problem you can't hire for, can't solve, and can't scale?",
    subcopy:
      "We start with the problem costing you the most. We find your single most expensive bottleneck, build a system that runs it the way you would, and give you back the hours it was eating. And you see every move it makes, because it is not a black box.",
    primaryCta: { label: "Book a fit call", href: "/work-with-me" },
    secondaryCta: { label: "See the system", href: "/business-ai-operating-system" },
  },

  costOfStayingSame: {
    eyebrow: "THE REAL COST",
    heading: "The most expensive problem in your business is the one nobody has put a number on yet.",
    body: [
      "Every business has one. A function that costs too much to run and too much to leave alone. A piece of work that comes back every week, eats hours, and still slips through the cracks. The new hire you know you need, but you are not financially ready to pull the trigger on.",
      "That problem has a price. Most business owners have just never been handed the bill.",
      "It shows up one of two ways. Either you carry it in headcount, the person or the team you would have to add to keep that function running, loaded cost and all. Or you carry it in hours, the time that disappears into the same recurring work week after week, the work that never happens because the day ran out, the growth you keep declining because there is no room to hold it.",
      "Run the math either way and the number is bigger than the cost of fixing it. That is why it stays unsolved.",
    ],
  },

  whatWeDo: {
    eyebrow: "WHERE WE START",
    heading: "We find the one problem costing you the most, and build a system that runs it the way you would.",
    body: [
      "Not the whole business on day one. We start with the single most expensive problem you have, the function that is bleeding the most time or the most money, and we build a system that runs it the way you run it now. Your judgment, your standards, your context.",
      "The repeatable work stops waiting on a person. The function keeps moving whether or not anyone is in the room. You stay in the decisions that actually need a human.",
      "Then you watch it run before you ever decide to go deeper. The first system is the proof. Everything after it is expansion, and only if the first one earns it.",
      "Revaya is built on 18 years of building digital products for companies like Virgin Mobile and Papa Murphy's. The work was always the same: understand the problem, define the solution, build it, ship it. This is that work, pointed at the most expensive problem in one business at a time.",
    ],
  },

  fourLayers: {
    eyebrow: "HOW A SYSTEM COMES TO KNOW YOUR BUSINESS",
    heading: "Four layers teach the system your business. What we build on top is shaped to your problem.",
    intro:
      "Most AI tools hand you a clever assistant that forgets you exist every morning. We build the opposite. Four layers that teach the system how your business actually works. They are the same foundation under every build. What we build on top of them is not. That part is shaped to the one problem costing you the most.",
    layers: [
      {
        name: "Context",
        body: "It learns how you actually work, so it runs your business the way you would, not the way a generic tool assumes you should.",
      },
      {
        name: "Data",
        body: "It connects to where your business already lives, so it works from one source of truth instead of someone's memory.",
      },
      {
        name: "Intelligence",
        body: "It thinks across all of it, surfaces what needs you, and makes the routine calls it has the context to make.",
      },
      {
        name: "Automate",
        body: "It does the recurring work that has been eating the week, while you stay in the decisions that matter.",
      },
    ],
    closing:
      "These four layers feed whatever we build. For one business that is a system that runs the sales pipeline. For another it is scheduling, or marketing, or a dashboard built around how they actually run. The layers are the same every time. The solution is yours alone, built around your most expensive problem. The full breakdown of how each layer works lives on the AIOS page.",
  },

  differentiator: {
    eyebrow: "WHY YOU CAN TRUST IT",
    heading: "You see every decision the system makes. No black box.",
    body: [
      "You have probably tried AI already. A tool here, an automation there. It saved you two hours and added three hours of managing it. Or it produced something confidently wrong and you stopped trusting it. You had tools. You did not have a system.",
      "Here is the difference. We build specialized agents with full audit trails, not one monolithic black box you cannot question. Every move the system makes is visible. You can see why it decided what it decided, and you can override it. The system earns trust the way a good hire does, by showing its work, not by asking you to take it on faith.",
      "And we build in the right order. Augment before automate. The system runs alongside the people doing the work and proves itself stable before it ever runs anything on its own. Nothing gets handed off on day one. Control transfers the moment you are ready, not before, and at the pace you set.",
    ],
  },

  proof: {
    eyebrow: "WHO IS BUILDING THIS",
    heading: "Eighteen years of experience building digital products, now pointed at one business at a time.",
    body: [
      "Virgin Mobile. Boost Mobile. Ultra Mobile. Papa Murphy's. Intermedia. Revaya AI was founded by Shannon Winnicki, who spent eighteen years sitting between the business and the builders, taking what a company actually needed and turning it into a working digital product. Website overhauls. E-commerce platforms. Digital infrastructure at scale. Not an outside consultant looking in, on the inside, shipping the thing.",
      "Revaya AI is the same work in a different form. Founder-led, building the operational backbone for businesses carrying a problem too expensive to keep running by hand. Shannon runs her own AI Operating System every day, built for her own business, around her own most expensive problem. So this is not a theory we are selling. It is how we run, and proof that the way we build holds up when the business on the line is our own.",
    ],
    brands: ["Virgin Mobile", "Boost Mobile", "Ultra Mobile", "Papa Murphy's", "Intermedia"],
    proofSlotPlaceholder:
      "The first named client result will go here once one exists. Launching credentials-only.",
  },

  finalCta: {
    heading: "Tell us the one problem that is costing you the most.",
    body: [
      "No pitch. A conversation. You tell us where the time and the money are disappearing and which function the business cannot run cleanly without you in the room. We tell you whether we can help and where we would start.",
      "If we are a fit, the next step is the Bottleneck Assessment, and you own the Blueprint regardless of what you decide after. A 30-day satisfaction guarantee covers the rest.",
    ],
    cta: { label: "Book a fit call", href: "/work-with-me" },
  },
};
