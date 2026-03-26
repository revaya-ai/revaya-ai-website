import { Question } from "../types/assessment";

export const questions: Question[] = [
  // ─── SECTION 0: Priority Problem (context only, surfaces the ONE thing) ───

  {
    id: 0,
    text: "What's the ONE thing in your business that's costing you the most time right now?",
    type: "single-select",
    section: "Priority Problem",
    helperText: "Pick the one that hits hardest. This shapes your results.",
    options: [
      { label: "Following up with leads and prospects", points: 0 },
      { label: "Managing my team's work and questions", points: 0 },
      { label: "Doing tasks only I know how to do", points: 0 },
      { label: "Client communication and updates", points: 0 },
      { label: "Financial tracking and reporting", points: 0 },
      { label: "Content creation and marketing", points: 0 },
      { label: "Something else entirely", points: 0 },
    ],
  },

  // ─── SECTION 1: Business Profile (Q1–Q4, context only) ───

  {
    id: 1,
    text: "Which best describes how you run your business?",
    type: "single-select",
    section: "Business Profile",
    options: [
      { label: "Solo operator, just me (maybe a contractor or VA)", points: 0 },
      { label: "Small team, 2 to 5 people. I'm still in most of the day-to-day.", points: 0 },
      { label: "Growing team, 6 to 15 people. I have roles but I'm the key person.", points: 0 },
      { label: "Established team, 15 or more people.", points: 0 },
    ],
  },
  {
    id: 2,
    text: "What kind of business?",
    type: "single-select",
    section: "Business Profile",
    options: [
      { label: "Agency or creative services (design, marketing, PR, video)", points: 0 },
      { label: "Consulting or coaching", points: 0 },
      { label: "Professional services (legal, accounting, finance, HR)", points: 0 },
      { label: "CPG / product brand (food, beverage, consumer goods)", points: 0 },
      { label: "SaaS or software", points: 0 },
      { label: "Other knowledge-intensive business", points: 0 },
    ],
  },
  {
    id: 3,
    text: "Roughly, what's your revenue per person? (Annual revenue ÷ total headcount)",
    type: "single-select",
    section: "Business Profile",
    helperText: "This gives context for your results, not a score.",
    options: [
      { label: "Under $50K per person", points: 0 },
      { label: "$50K–$100K per person", points: 0 },
      { label: "$100K–$200K per person", points: 0 },
      { label: "$200K–$400K per person", points: 0 },
      { label: "$400K+ per person", points: 0 },
    ],
  },
  {
    id: 4,
    text: "How many potential new clients reach out per month? (calls, emails, DMs, referrals)",
    type: "single-select",
    section: "Business Profile",
    options: [
      { label: "Under 5", points: 0, roiMultiplier: 3 },
      { label: "5–15", points: 0, roiMultiplier: 10 },
      { label: "15–30", points: 0, roiMultiplier: 22 },
      { label: "30+", points: 0, roiMultiplier: 35 },
    ],
  },

  // ─── SECTION 2: ROI Inputs (Q5–Q7, sliders) ───

  {
    id: 5,
    text: "Average revenue per new client or engagement",
    type: "slider",
    section: "ROI Inputs",
    helperText: "What does a typical new client or project bring in?",
    sliderConfig: { min: 500, max: 50000, default: 5000, prefix: "$" },
  },
  {
    id: 6,
    text: "Your time value per hour",
    type: "slider",
    section: "ROI Inputs",
    helperText: "What is an hour of your time worth? Use your billing rate or target salary.",
    sliderConfig: { min: 50, max: 500, default: 150, prefix: "$" },
  },
  {
    id: 7,
    text: "Percentage of qualified conversations that turn into clients",
    type: "slider",
    section: "ROI Inputs",
    helperText: "Of the leads who actually talk to you, how many become paying clients?",
    sliderConfig: { min: 2, max: 80, default: 25, suffix: "%" },
  },

  // ─── SECTION 3: Founder Dependency (Q8–Q11, max 12) ───

  {
    id: 8,
    text: "Can you go offline for a long weekend without work following you?",
    type: "single-select",
    section: "Founder Dependency",
    helperText: "Not 'should you.' Do you actually?",
    options: [
      { label: "Yes, regularly. Systems and people handle it.", points: 3, founderTaxPct: 0.05 },
      { label: "Sometimes, if I prep and hand things off first.", points: 1, founderTaxPct: 0.25 },
      { label: "No. Things fall apart or I can't stop checking in.", points: 0, founderTaxPct: 0.50 },
    ],
  },
  {
    id: 9,
    text: "If you were completely unreachable for 2 weeks, what would happen?",
    type: "single-select",
    section: "Founder Dependency",
    options: [
      { label: "Runs smoothly. My team and systems handle it.", points: 3 },
      { label: "Slows down significantly. People wait on me for decisions.", points: 1 },
      { label: "Stops almost completely", points: 0 },
    ],
  },
  {
    id: 10,
    text: "What percentage of meaningful decisions in your business require your direct input?",
    type: "single-select",
    section: "Founder Dependency",
    options: [
      { label: "Under 20%. My team handles most things.", points: 3, decisionHours: 2 },
      { label: "Around half. I'm involved in most important calls.", points: 1, decisionHours: 8 },
      { label: "Almost everything. I'm the decision-maker for nearly all of it.", points: 0, decisionHours: 15 },
    ],
  },
  {
    id: 11,
    text: "When something comes up and you can't deal with it right away, what happens?",
    type: "single-select",
    section: "Founder Dependency",
    helperText: "Think about how your business actually behaves, not how it should.",
    options: [
      { label: "It gets handled. There are systems, docs, or a person who can resolve it.", points: 3 },
      { label: "Someone figures it out eventually, but it usually loops back to me.", points: 1 },
      { label: "It waits. I'm the only one who knows how to handle most things.", points: 0 },
      { label: "It's just me, so everything waits by default", points: 0 },
    ],
  },

  // ─── SECTION 4: Knowledge Systems (Q12–Q14, max 6) ───

  {
    id: 12,
    text: "Where does the knowledge of how your business works actually live?",
    type: "single-select",
    section: "Knowledge Systems",
    options: [
      { label: "Documented and accessible: SOPs, guides, recorded processes.", points: 2 },
      { label: "Partly documented, partly in my head and my team's heads", points: 1 },
      { label: "Almost entirely in my head", points: 0 },
    ],
  },
  {
    id: 13,
    text: "If a key person (or you) left tomorrow, how much critical knowledge would walk out the door?",
    type: "single-select",
    section: "Knowledge Systems",
    options: [
      { label: "Very little. It's captured and transferable.", points: 2 },
      { label: "Some. We'd feel it for a while but recover.", points: 1 },
      { label: "A lot. We'd lose major context, client history, or how things get done.", points: 0 },
    ],
  },
  {
    id: 14,
    text: "How do you track past decisions, client history, and why things are done certain ways?",
    type: "single-select",
    section: "Knowledge Systems",
    options: [
      { label: "Centralized system everyone can access", points: 2 },
      { label: "Mix of emails, notes, and memory", points: 1 },
      { label: "It mostly lives with whoever worked on it", points: 0 },
    ],
  },

  // ─── SECTION 5: Sales & Delivery (Q15–Q17, max 9) ───

  {
    id: 15,
    text: "How long does it take to create and send a proposal or contract?",
    type: "single-select",
    section: "Sales & Delivery",
    options: [
      { label: "Same day, mostly templated.", points: 3, hoursPerProposal: 0.5 },
      { label: "1–3 days", points: 2, hoursPerProposal: 2 },
      { label: "Several days or longer", points: 0, hoursPerProposal: 5 },
    ],
  },
  {
    id: 16,
    text: "Do you have a follow-up system for prospects who aren't ready to buy yet?",
    type: "single-select",
    section: "Sales & Delivery",
    options: [
      { label: "Automated nurture sequence", points: 3, lostDealPct: 0.10 },
      { label: "Manual but consistent", points: 2, lostDealPct: 0.25 },
      { label: "They usually go quiet and disappear", points: 0, lostDealPct: 0.50 },
    ],
  },
  {
    id: 17,
    text: "How many proposals or contracts do you send per month?",
    type: "single-select",
    section: "Sales & Delivery",
    options: [
      { label: "Under 3", points: 0, roiMultiplier: 2 },
      { label: "3–8", points: 1, roiMultiplier: 5 },
      { label: "8–15", points: 2, roiMultiplier: 11 },
      { label: "15+", points: 3, roiMultiplier: 18 },
    ],
  },

  // ─── SECTION 6: Operations & Workflow (Q18–Q21, max 12) ───

  {
    id: 18,
    text: "How many hours per week do you spend on scheduling, invoicing, reporting, or admin?",
    type: "single-select",
    section: "Operations & Workflow",
    options: [
      { label: "Under 2 hours", points: 3, adminHours: 1.5 },
      { label: "2–5 hours", points: 2, adminHours: 3.5 },
      { label: "5–10 hours", points: 1, adminHours: 7.5 },
      { label: "10+ hours", points: 0, adminHours: 12 },
    ],
  },
  {
    id: 19,
    text: "How many hours per week do you spend coordinating with partners, contractors, or clients about status, next steps, or how things work?",
    type: "single-select",
    section: "Operations & Workflow",
    helperText: "This includes check-ins, handoffs, status threads, answering 'where are we on this?'",
    options: [
      { label: "Under 2 hours", points: 3, meetingHours: 1.5 },
      { label: "2–5 hours", points: 2, meetingHours: 3.5 },
      { label: "5–10 hours", points: 1, meetingHours: 7.5 },
      { label: "10+ hours", points: 0, meetingHours: 12 },
    ],
  },
  {
    id: 20,
    text: "Do your tools and systems share data, or do you re-enter information manually?",
    type: "single-select",
    section: "Operations & Workflow",
    options: [
      { label: "Mostly integrated. Data flows automatically.", points: 3, duplicateEntryHours: 0.5 },
      { label: "Mix of both. Some automated, some still manual.", points: 2, duplicateEntryHours: 1.5 },
      { label: "Mostly manual. Some handoffs but manageable.", points: 1, duplicateEntryHours: 3 },
      { label: "Lots of duplicate entry across tools.", points: 0, duplicateEntryHours: 5 },
    ],
  },
  {
    id: 21,
    text: "How do you keep clients informed about project status or next steps?",
    type: "single-select",
    section: "Operations & Workflow",
    options: [
      { label: "Automated or systemized updates", points: 3, communicationHours: 0.5 },
      { label: "Manual but consistent", points: 2, communicationHours: 3 },
      { label: "Reactively, when they ask.", points: 0, communicationHours: 5 },
    ],
  },

  // ─── SECTION 7: Growth Capacity (Q22–Q25, max 12) ───

  {
    id: 22,
    text: "If your client load doubled next month, could you handle it without adding staff?",
    type: "single-select",
    section: "Growth Capacity",
    options: [
      { label: "Yes. Systems and capacity are in place.", points: 3 },
      { label: "We'd struggle but manage", points: 2 },
      { label: "We'd drop things or burn out", points: 0 },
    ],
  },
  {
    id: 23,
    text: "How long does it take to onboard a new client from signed contract to delivering first value?",
    type: "single-select",
    section: "Growth Capacity",
    options: [
      { label: "Fast, mostly systemized", points: 3, onboardingHours: 1 },
      { label: "Reasonable but mostly manual", points: 2, onboardingHours: 4 },
      { label: "Slow or inconsistent. Every client is different.", points: 0, onboardingHours: 8 },
    ],
  },
  {
    id: 24,
    text: "Do you have a systematic way to generate referrals or testimonials from happy clients?",
    type: "single-select",
    section: "Growth Capacity",
    options: [
      { label: "Yes, automated or consistently triggered", points: 3, missedReviews: 2 },
      { label: "I ask sometimes, but not consistently", points: 1, missedReviews: 8 },
      { label: "Rarely. It depends on the client reaching out.", points: 0, missedReviews: 15 },
    ],
  },
  {
    id: 25,
    text: "Are you currently turning away work or delaying clients because you don't have capacity?",
    type: "single-select",
    section: "Growth Capacity",
    options: [
      { label: "No. Capacity matches demand.", points: 3 },
      { label: "Occasionally", points: 2 },
      { label: "Yes, regularly", points: 0 },
    ],
  },

  // ─── SECTION 8: AI Foundation (Q26–Q29, max 8) ───

  {
    id: 26,
    text: "Are your main tools (CRM, calendar, email, project management) connected or siloed?",
    type: "single-select",
    section: "AI Foundation",
    options: [
      { label: "Mostly connected", points: 2 },
      { label: "Some connected, some separate", points: 1 },
      { label: "Completely siloed. We switch between everything manually.", points: 0 },
    ],
  },
  {
    id: 27,
    text: "How confident are you that your client and business data is accurate and up to date?",
    type: "single-select",
    section: "AI Foundation",
    options: [
      { label: "Very confident. We maintain it actively.", points: 2 },
      { label: "Mostly accurate, some gaps.", points: 1 },
      { label: "Spotty or a mess. Lots of missing or outdated info.", points: 0 },
    ],
  },
  {
    id: 28,
    text: "Are your core business processes documented so someone else, or an AI, could follow them?",
    type: "single-select",
    section: "AI Foundation",
    options: [
      { label: "Yes. Documented SOPs others can use.", points: 2 },
      { label: "Some documentation, mostly tribal knowledge", points: 1 },
      { label: "All in my head", points: 0 },
    ],
  },
  {
    id: 29,
    text: "Would you be comfortable with AI handling first contact with a new lead if it follows your process and discloses it's AI?",
    type: "single-select",
    section: "AI Foundation",
    options: [
      { label: "Yes", points: 2 },
      { label: "Maybe, depends on execution", points: 1 },
      { label: "No", points: 0 },
    ],
  },
];

export const sectionConfig: Record<string, { maxScore: number; questions: number[] }> = {
  "Business Profile":      { maxScore: 0,  questions: [1, 2, 3, 4] },
  "ROI Inputs":            { maxScore: 0,  questions: [5, 6, 7] },
  "Founder Dependency":    { maxScore: 12, questions: [8, 9, 10, 11] },
  "Knowledge Systems":     { maxScore: 6,  questions: [12, 13, 14] },
  "Sales & Delivery":      { maxScore: 9,  questions: [15, 16, 17] },
  "Operations & Workflow": { maxScore: 12, questions: [18, 19, 20, 21] },
  "Growth Capacity":       { maxScore: 12, questions: [22, 23, 24, 25] },
  "AI Foundation":         { maxScore: 8,  questions: [26, 27, 28, 29] },
};
// Total scorable max: 59 points
