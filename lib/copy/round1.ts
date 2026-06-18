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
      "Start with the problem costing you the most. We find your single most expensive bottleneck, build a system that runs it the way you would, and show you every decision it makes.",
    primaryCta: { label: "Book a fit call", href: "/work-with-me" },
    secondaryCta: { label: "See the system", href: "/business-ai-operating-system" },
  },

  costOfStayingSame: {
    eyebrow: "THE REAL COST",
    heading: "The most expensive problem in your business is the one nobody has put a number on yet.",
    body: [
      "Every business has one. A function that costs too much to run and too much to leave alone. A motion that eats hours every week and still slips. A hire you keep almost making and keep talking yourself out of, because you are not sure the role pays for itself.",
      "That problem has a price. Most owners have just never been handed the bill.",
      "It shows up one of two ways. Either you carry it in headcount, the person or the team you would have to add to keep that function running, loaded cost and all. Or you carry it in hours, the time that disappears into the same recurring work week after week, the work that never happens because the day ran out, the growth you keep declining because there is no room to hold it.",
      "Run the math either way and the number is bigger than the cost of fixing it. That is why it stays unsolved. Nobody adds it up, so everybody keeps paying it.",
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
    heading: "A system that runs your work has to know your work. We build that in four layers.",
    intro:
      "Most AI tools hand you a clever assistant that forgets you exist every morning. We build the opposite. A system that learns your business in four layers, so it picks up where you left off instead of starting from zero every day.",
    layers: [
      {
        name: "Context",
        body: "It learns how you actually work, so it runs a function the way you would, not the way a generic tool assumes you should.",
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
      "That is the part most tools skip, because building it is real work. We wire all four together so the system actually holds your business instead of holding a single task. The full breakdown of how each layer works lives on the AIOS page.",
  },

  differentiator: {
    eyebrow: "WHY YOU CAN TRUST IT",
    heading: "You see every decision the system makes. No black box.",
    body: [
      "You have probably tried AI already. A tool here, an automation there. It saved you two hours and added three hours of managing it. Or it produced something confidently wrong and you stopped trusting it. You had tools. You did not have a system.",
      "Here is the difference. We build specialized agents with full audit trails, not one monolithic black box you cannot question. Every move the system makes is visible. You can see why it decided what it decided, and you can override it. The system earns trust the way a good hire does, by showing its work, not by asking you to take it on faith.",
      "And we build in the right order. Augment before automate. Founder first. The system runs alongside the people doing the work and proves itself stable before it ever runs anything unwatched. Your business does not get handed to a machine on day one. It gets handed over the moment you, not the machine, are ready.",
    ],
  },

  proof: {
    eyebrow: "WHO IS BUILDING THIS",
    heading: "18 years building digital products. Now that work goes into one business at a time.",
    body: [
      "Revaya AI was founded by Shannon Winnicki, who spent eighteen years sitting between the business and the builders, taking what a company actually needed and turning it into a working digital product. Website overhauls. E-commerce platforms. Digital infrastructure at scale. Not an outside consultant looking in, on the inside, shipping the thing.",
      "Revaya AI is the same work in a different form. Founder-led, building the operational backbone for businesses carrying a problem too expensive to keep running by hand. We run our own AI Operating System every day. The workspace is the live demo. You can see exactly what you are buying before you buy it.",
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
