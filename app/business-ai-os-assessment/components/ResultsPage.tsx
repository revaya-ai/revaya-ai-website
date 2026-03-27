"use client";

import { ROIResults, AssessmentAnswers } from "../types/assessment";

interface ResultsPageProps {
  results: ROIResults;
  answers: AssessmentAnswers;
  email: string;
}

const CATEGORY_CONFIG = {
  Optimized: {
    badge: "bg-brand-accent/20 text-brand-accent border-brand-accent/30",
    headline: "Your Operations Are Ahead of Most",
    sub: "Strong systems. Things work. AI isn't about fixing what's broken. It's about competitive advantage and protecting your time as you grow.",
  },
  "Solid Foundation": {
    badge: "bg-brand-light/20 text-brand-light border-brand-light/30",
    headline: "Strong Base, Room to Optimize",
    sub: "You've built real systems. Things work, mostly. But there are specific areas where time and revenue are slipping through the cracks.",
  },
  "Clear Opportunities": {
    badge: "bg-yellow-400/20 text-yellow-400 border-yellow-400/30",
    headline: "You're Leaving Money on the Table",
    sub: "Your scorecard reveals specific bottlenecks costing you time and revenue every week. The good news: these are solvable.",
  },
  "High Potential": {
    badge: "bg-brand-coral/20 text-brand-coral border-brand-coral/30",
    headline: "Significant Opportunity Uncovered",
    sub: "Your scorecard shows friction across multiple areas. Leads slipping away. Time disappearing into admin. Growth blocked by capacity. The businesses with the most friction see the biggest gains.",
  },
};

const BIGGEST_OPPORTUNITY: Record<string, {
  headline: string;
  intro: string;
  hardTruth: string;
  whatCloses: string[];
  quickWin: string;
  layer: string;
}> = {
  "Founder Dependency": {
    headline: "Your Business Stops When You Do",
    intro: "The founder is the system. No docs, no delegation, no one who can make decisions without you. Every hour you're unavailable is an hour the business stalls.",
    hardTruth: "This isn't a capacity problem. It's a systems problem. And it gets worse as you grow. More clients means more decisions means more of you required.",
    whatCloses: [
      "Document how decisions actually get made",
      "Build the Context layer. Capture your knowledge before you automate anything.",
      "Create decision frameworks your team (or AI) can follow without you",
    ],
    quickWin: "Pick one recurring decision you make weekly. Write down exactly how you make it. That's your first delegation document.",
    layer: "Context + Intelligence layers",
  },
  "Knowledge Systems": {
    headline: "Your Business Knowledge Is One Resignation Away From Disaster",
    intro: "Everything lives in heads, not systems. When someone leaves, or you step back, it leaves with them.",
    hardTruth: "AI can't learn from what isn't written down. You can't delegate what isn't documented. And you can't scale what only exists in your memory.",
    whatCloses: [
      "Start capturing SOPs for your top 5 recurring processes",
      "Record a walkthrough of your most complex workflow",
      "Build a client context system: history, decisions, why things are done certain ways.",
    ],
    quickWin: "Open a doc. Write down the 3 things only you know how to do. That's your knowledge debt list.",
    layer: "Context layer",
  },
  "Sales & Delivery": {
    headline: "Your Pipeline Is Leaking Deals You Already Earned",
    intro: "Slow proposals, no follow-up, deals going quiet. You're doing the hard part, getting the conversation, and losing it on process.",
    hardTruth: "Most lost deals aren't lost to a better competitor. They're lost to friction. Slow response, no follow-up, proposal that took a week to arrive.",
    whatCloses: [
      "Template your proposals so they go out same-day",
      "Build a 3-touch follow-up sequence for every quote sent",
      "Automate the nurture for prospects who aren't ready yet",
    ],
    quickWin: "Create one proposal template this week. Cut your creation time in half immediately.",
    layer: "Convert + Automate layers",
  },
  "Operations & Workflow": {
    headline: "Admin Is Eating the Hours You Should Be Billing",
    intro: "Scheduling, invoicing, status updates, coordination. None of this requires your expertise. All of it is taking your time.",
    hardTruth: "Every hour you spend on admin is an hour you're not billing, growing, or resting. And it compounds. The busier you get, the more admin you generate.",
    whatCloses: [
      "Identify your top 3 recurring admin tasks and automate one this month",
      "Connect your tools so data stops being re-entered manually",
      "Systemize client updates so they go out without you triggering them",
    ],
    quickWin: "Time yourself on your most-repeated admin task. If it takes more than 20 minutes per week, it should be automated.",
    layer: "Automate layer",
  },
  "Growth Capacity": {
    headline: "You've Hit the Ceiling That Comes Before Every Stuck Business",
    intro: "You can't add clients without adding hours. The business can only grow as fast as you can personally execute.",
    hardTruth: "This is the plateau that kills otherwise good businesses. Not bad product, not bad marketing. Just founders who physically can't do more.",
    whatCloses: [
      "Systemize onboarding so new clients don't require your involvement",
      "Automate referral requests. Most happy clients will refer if you ask consistently.",
      "Document your delivery process so others can execute without you",
    ],
    quickWin: "Map your onboarding process start to finish. Circle every step that requires you specifically. That's your automation roadmap.",
    layer: "Build + Automate layers",
  },
  "AI Foundation": {
    headline: "The Foundation Has to Come First",
    intro: "Disconnected tools, scattered data, undocumented processes. AI amplifies what's there. If what's there is chaos, you get faster chaos.",
    hardTruth: "Most AI implementations fail not because of the AI. It's because the data and processes underneath weren't ready. Garbage in, garbage out, at scale.",
    whatCloses: [
      "Get all client and prospect data into one central system",
      "Connect your core tools so they talk to each other",
      "Document your top processes so they can be handed off to a person or to an AI.",
    ],
    quickWin: "Pick one system (CRM, project management, calendar) and commit to using it consistently for 30 days. That's your foundation.",
    layer: "Data + Context layers",
  },
};

const RECOMMENDATIONS: Record<string, { title: string; items: string[] }> = {
  "Founder Dependency": {
    title: "Reduce Your Founder Tax",
    items: [
      "List the top 10 decisions you make weekly. Write down the criteria you use to make each one.",
      "For every recurring request that lands on your plate, write down exactly how you'd handle it. That's your delegation starting point.",
      "Identify 3 recurring tasks only you do. For each, ask: is this about my judgment, or just my habit?",
      "Write down what would need to be true for someone to cover for you for a week. That gap list is your roadmap.",
    ],
  },
  "Knowledge Systems": {
    title: "Capture Before You Automate",
    items: [
      "Record a screen-share walkthrough of your most complex process. Don't edit it. Just capture it.",
      "Write down the 5 things only you know that would be catastrophic if forgotten.",
      "For every active client, write a one-page context doc: history, preferences, open items, how they like to communicate.",
      "Pick one process per week and write down how it actually works, not how it should.",
    ],
  },
  "Sales & Delivery": {
    title: "Tighten the Pipeline",
    items: [
      "Pull your last 10 proposals. Note when they went out, whether they closed, and why the lost ones went quiet.",
      "Write down your qualification criteria. What does a good client look like? What are the red flags you keep ignoring?",
      "Draft one reusable proposal template from your most common engagement type.",
      "Track your close rate for the next 30 days. You can't fix what you haven't measured.",
    ],
  },
  "Operations & Workflow": {
    title: "Map the Drag Before You Fix It",
    items: [
      "Spend one week tracking where your time actually goes. Not where you think it goes.",
      "List every tool you use. Note what data lives in each and where you're re-entering the same information.",
      "Write down your top 3 most painful recurring tasks. For each, describe what good would look like.",
      "Identify who on your team (or you) spends the most time on work that doesn't require their expertise.",
    ],
  },
  "Growth Capacity": {
    title: "Document Before You Scale",
    items: [
      "Write your client delivery process from signed contract to final deliverable. Every step.",
      "Note every point in that process where you're the only one who can move things forward.",
      "Write down what a new client needs from you in their first 30 days. Where does that require you personally?",
      "List the referrals or testimonials you've never asked for. Those are conversations you can start this week.",
    ],
  },
};

const REVENUE_PER_PERSON_LABELS: Record<number, string> = {
  0: "under $50K",
  1: "$50K to $100K",
  2: "$100K to $200K",
  3: "$200K to $400K",
  4: "$400K+",
};

function fmt(n: number): string {
  return Math.round(n).toLocaleString();
}

export default function ResultsPage({ results, answers, email }: ResultsPageProps) {
  const config = CATEGORY_CONFIG[results.category];
  const biggestOpp = BIGGEST_OPPORTUNITY[results.lowestSection] ?? BIGGEST_OPPORTUNITY["Founder Dependency"];

  const revenuePerPersonOption = answers[3]?.selectedOption;
  const revenuePerPersonLabel =
    revenuePerPersonOption !== undefined
      ? REVENUE_PER_PERSON_LABELS[revenuePerPersonOption]
      : null;

  const hourlyRate = answers[6]?.sliderValue ?? 150;

  // Top 3 lowest-scoring sections (excluding non-scoring and AI Foundation — those are Revaya's deliverables, not prospect homework)
  const topSectionsForWork = results.sectionScores
    .filter((s) => s.maxScore > 0 && s.priority !== "Low" && s.name !== "AI Foundation")
    .sort((a, b) => a.score / a.maxScore - b.score / b.maxScore)
    .slice(0, 3);

  const handleDownloadPDF = async () => {
    const operationTypeOption = answers[1]?.selectedOption ?? 0;
    const operationType =
      operationTypeOption === 0 ? "solo-operator" : "team";
    const { generatePDF } = await import("../utils/generatePDF");
    generatePDF(results, email, operationType);
  };

  return (
    <div className="min-h-screen bg-base-bg text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* ─── SCORE HEADER ─── */}
        <div className="text-center space-y-6 pt-8">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-brand-accent font-medium mb-3">Your AI Readiness Score</p>
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 border-brand-accent/40 bg-brand-accent/10">
              <div className="font-display text-4xl font-black text-white leading-none">
                {results.totalScore}
              </div>
            </div>
            <p className="text-white/40 text-sm mt-2">out of 59 possible points across 6 sections</p>
          </div>

          <div>
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium border uppercase tracking-widest ${config.badge}`}>
              {results.category}
            </span>
          </div>

          <div>
            <h1 className="font-display text-3xl md:text-4xl font-black leading-tight">
              {config.headline}
            </h1>
            <p className="text-white mt-3 text-lg max-w-xl mx-auto leading-relaxed">
              {config.sub}
            </p>
          </div>
        </div>

        {/* ─── ROI SUMMARY ─── */}
        <div className="glass-card rounded-2xl p-8 gradient-border">
          <h2 className="font-display text-xl font-black text-white mb-6">Your Monthly Opportunity</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              {
                label: "Hours you could reclaim",
                value: `${fmt(results.monthlyHoursRecoverable)} hrs/mo`,
              },
              {
                label: "Value of that time",
                value: `$${fmt(results.timeValue)}/mo`,
              },
              {
                label: "Revenue you're likely missing",
                value: `$${fmt(results.lostRevenue)}/mo`,
              },
              {
                label: "Total monthly opportunity",
                value: `$${fmt(results.totalMonthlyOpportunity)}/mo`,
                highlight: true,
              },
            ].map(({ label, value, highlight }) => (
              <div
                key={label}
                className={`rounded-xl p-4 ${
                  highlight
                    ? "bg-brand-accent/15 border border-brand-accent/25"
                    : "bg-white/4 border border-white/8"
                }`}
              >
                <p className="text-white text-sm mb-1">{label}</p>
                <p className={`font-display font-black text-lg ${highlight ? "text-brand-accent" : "text-white"}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8 pt-4 text-center">
            <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Annual Impact</p>
            <p className="font-display text-3xl font-black text-white">
              ${fmt(results.annualOpportunity)}
              <span className="text-white/40 text-lg font-normal">/year</span>
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-white/6 space-y-2">
            <p className="text-white text-[0.8rem] uppercase tracking-wider mb-3">How this is calculated</p>
            <p className="text-white text-sm leading-relaxed">
              <span className="font-bold">Hours you could reclaim</span> — estimated from your answers about founder availability, decision load, admin time, coordination, proposal creation, and client onboarding. These categories may overlap in practice.
            </p>
            <p className="text-white text-sm leading-relaxed">
              <span className="font-bold">Value of that time</span> — reclaimed hours × your stated hourly rate (${fmt(hourlyRate)}/hr).
            </p>
            <p className="text-white text-sm leading-relaxed">
              <span className="font-bold">Revenue likely missing</span> — estimated from deals going quiet due to slow follow-up, and referrals that were never asked for.
            </p>
            <p className="text-white text-sm leading-relaxed">
              <span className="font-bold">Total opportunity</span> — sum of the above. These are estimates based on your inputs, not guarantees. They show you where to look, not a number to take to the bank.
            </p>
          </div>
        </div>

        {/* ─── FOUNDER OUTPUT BENCHMARK ─── */}
        {revenuePerPersonLabel && (
          <div className="glass-card rounded-xl p-6 border-l-4 border-brand-coral">
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-brand-accent font-medium mb-3">Founder Output Benchmark</p>
            <p className="text-white text-lg leading-relaxed">
              Your business is generating <strong className="text-white">{revenuePerPersonLabel} per person.</strong>{" "}
              In high-performing founder-led knowledge businesses, that number is $300K or more. The gap
              isn't usually about market size or pricing. It's about your time. When you're the bottleneck,
              every hour spent on the wrong things is revenue the business can't generate.
            </p>
            <p className="text-white/40 text-sm mt-3">
              This is a company-level metric, but the point is personal. It's about your hours, not your team's.
            </p>
          </div>
        )}

        {/* ─── SECTION BREAKDOWN ─── */}
        <div>
          <h2 className="font-display text-xl font-black text-white mb-6 uppercase tracking-wider">
            Section Breakdown
          </h2>

          <div className="space-y-3">
            {results.sectionScores
              .filter((s) => s.maxScore > 0)
              .map((section) => {
                const pct = section.maxScore > 0 ? section.score / section.maxScore : 1;
                const isLowest = section.name === results.lowestSection;
                const priorityColor =
                  section.priority === "High"
                    ? "text-brand-coral bg-brand-coral/15 border-brand-coral/25"
                    : section.priority === "Medium"
                    ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
                    : "text-brand-accent bg-brand-accent/10 border-brand-accent/20";

                return (
                  <div
                    key={section.name}
                    className={`glass-card rounded-xl p-4 ${isLowest ? "border-brand-coral/40" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white text-sm">{section.name}</p>
                          {isLowest && (
                            <span className="text-sm text-brand-coral">Focus area</span>
                          )}
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/8 mt-2">
                          <div
                            className="h-1.5 rounded-full bg-brand-accent transition-all duration-700"
                            style={{ width: `${pct * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-white text-sm">
                          {section.score}/{section.maxScore}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-sm px-2 py-0.5 rounded-full border font-medium ${priorityColor}`}>
                        {section.priority} Priority
                      </span>
                      {section.hoursLost && section.hoursLost > 0 && (
                        <span className="text-sm text-white/40">
                          ~{fmt(section.hoursLost)} hrs/mo lost
                        </span>
                      )}
                      {section.revenueImpact && section.revenueImpact > 0 && (
                        <span className="text-sm text-white/40">
                          ${fmt(section.revenueImpact)}/mo impact
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* ─── BIGGEST OPPORTUNITY ─── */}
        <div className="glass-card rounded-2xl p-8 border border-brand-coral/20">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-brand-accent font-medium mb-3">
            Your Biggest Opportunity: {results.lowestSection}
          </p>

          <h2 className="font-display text-2xl font-black text-white mb-4">
            {biggestOpp.headline}
          </h2>

          <p className="text-white text-lg leading-relaxed mb-6">
            {biggestOpp.intro}
          </p>

          <div className="bg-brand-coral/8 border border-brand-coral/20 rounded-xl p-5 mb-6">
            <p className="text-white text-sm uppercase tracking-wider mb-2">Here's the hard truth</p>
            <p className="text-white text-sm leading-relaxed">{biggestOpp.hardTruth}</p>
          </div>

          <div className="mb-6">
            <p className="text-white text-sm uppercase tracking-wider mb-3">What closes this gap</p>
            <ul className="space-y-2">
              {biggestOpp.whatCloses.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-white leading-snug">
                  <span className="text-brand-accent mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl p-4">
            <p className="text-brand-accent text-sm font-medium uppercase tracking-wider mb-1">
              Quick win
            </p>
            <p className="text-white text-sm leading-relaxed">{biggestOpp.quickWin}</p>
          </div>

          <p className="text-white/25 text-sm mt-4">AIOS layer: {biggestOpp.layer}</p>
        </div>

        {/* ─── RECOMMENDED NEXT STEPS ─── */}
        {topSectionsForWork.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-black text-white mb-6 uppercase tracking-wider">
              Recommended Next Steps
            </h2>

            <div className="space-y-6">
              {topSectionsForWork.map((section) => {
                const rec = RECOMMENDATIONS[section.name];
                if (!rec) return null;
                return (
                  <div key={section.name} className="glass-card rounded-xl p-6">
                    <h3 className="font-display font-black text-white text-lg mb-4">
                      {rec.title}
                    </h3>
                    <ul className="space-y-3">
                      {rec.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-white leading-snug">
                          <span className="text-brand-accent shrink-0 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── CTAs ─── */}
        <div className="space-y-4 pt-4">
          {/* Primary CTA */}
          <a
            href="/work-with-me"
            className="flex items-center justify-center gap-2 w-full py-5 rounded-full bg-brand-primary text-white font-display font-black text-sm hover:bg-brand-primary/80 transition-all duration-200 glow-purple"
          >
            Start the Conversation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Secondary CTA */}
          <a
            href="https://www.revaya.ai/business-ai-os-blueprint.pdf"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-full border border-white/15 text-white font-display font-black text-sm hover:border-white/30 transition-all duration-200"
          >
            Download the Business AI OS Blueprint
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Tertiary — PDF */}
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 w-full py-3 text-white text-sm hover:text-brand-accent transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download your scorecard as PDF
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-white/20 text-sm pt-4 border-t border-white/6">
          <p>Revaya AI | revaya.ai</p>
        </div>
      </div>
    </div>
  );
}
