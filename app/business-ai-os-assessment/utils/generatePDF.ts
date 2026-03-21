import { ROIResults } from "../types/assessment";
import { jsPDF } from "jspdf";

// Brand colors (matched to website spec)
const PRIMARY: [number, number, number] = [85, 53, 85];    // #553555 brand-primary
const ACCENT: [number, number, number] = [2, 128, 144];    // #028090 brand-accent
const CORAL: [number, number, number] = [244, 91, 105];    // #F45B69 brand-coral
const DARK_BG: [number, number, number] = [8, 13, 17];     // #080D11 base-bg
const SURFACE: [number, number, number] = [17, 24, 32];    // #111820 base-surface
const OFF_WHITE: [number, number, number] = [232, 237, 242]; // body text

function drawHeader(doc: jsPDF, title: string) {
  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, 210, 40, "F");

  // Accent bar
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, 6, 40, "F");

  doc.setTextColor(...OFF_WHITE);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, 18, 26);
}

function drawFooter(doc: jsPDF) {
  doc.setFontSize(9);
  doc.setTextColor(100, 110, 120);
  doc.setFont("helvetica", "normal");
  doc.text("Revaya AI | Business AI OS | revaya.ai", 105, 286, { align: "center" });
}

function drawProgressBar(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  progress: number,
  isLowest = false
) {
  // Background
  doc.setFillColor(40, 50, 60);
  doc.roundedRect(x, y, width, height, 2, 2, "F");

  // Fill
  const fillWidth = width * progress;
  if (fillWidth > 0) {
    doc.setFillColor(...(isLowest ? CORAL : ACCENT));
    doc.roundedRect(x, y, Math.max(fillWidth, 4), height, 2, 2, "F");
  }
}

function drawScoreCircle(
  doc: jsPDF,
  x: number,
  y: number,
  radius: number,
  score: number,
  maxScore: number
) {
  const lineWidth = 10;
  doc.setDrawColor(40, 50, 60);
  doc.setLineWidth(lineWidth);

  for (let i = 0; i < 360; i += 2) {
    const rad = ((i - 90) * Math.PI) / 180;
    const x1 = x + Math.cos(rad) * radius;
    const y1 = y + Math.sin(rad) * radius;
    const rad2 = ((i + 2 - 90) * Math.PI) / 180;
    const x2 = x + Math.cos(rad2) * radius;
    const y2 = y + Math.sin(rad2) * radius;
    doc.line(x1, y1, x2, y2);
  }

  doc.setDrawColor(...ACCENT);
  const progressAngle = (score / maxScore) * 360;
  for (let i = 0; i < progressAngle; i += 2) {
    const rad = ((i - 90) * Math.PI) / 180;
    const x1 = x + Math.cos(rad) * radius;
    const y1 = y + Math.sin(rad) * radius;
    const rad2 = ((i + 2 - 90) * Math.PI) / 180;
    const x2 = x + Math.cos(rad2) * radius;
    const y2 = y + Math.sin(rad2) * radius;
    doc.line(x1, y1, x2, y2);
  }

  doc.setTextColor(...ACCENT);
  doc.setFontSize(34);
  doc.setFont("helvetica", "bold");
  doc.text(score.toString(), x, y + 5, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(120, 130, 140);
  doc.setFont("helvetica", "normal");
  doc.text(`of ${maxScore}`, x, y + 16, { align: "center" });
}

function drawCategoryBadge(doc: jsPDF, x: number, y: number, category: string) {
  const badgeWidth = 130;
  const badgeHeight = 11;
  doc.setFillColor(...PRIMARY);
  doc.roundedRect(x - badgeWidth / 2, y - badgeHeight / 2, badgeWidth, badgeHeight, 5, 5, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(category, x, y + 4, { align: "center" });
}

function drawCard(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  accentColor?: [number, number, number]
) {
  doc.setFillColor(...SURFACE);
  doc.setDrawColor(35, 45, 55);
  doc.roundedRect(x, y, width, height, 4, 4, "FD");

  if (accentColor) {
    doc.setFillColor(...accentColor);
    doc.roundedRect(x, y, 4, height, 2, 2, "F");
  }
}

function getCategoryContent(category: string): {
  headline: string;
  description: string;
  opportunity: string;
} {
  switch (category) {
    case "Optimized":
      return {
        headline: "Your Operations Are Ahead of Most",
        description:
          "Your business has strong systems in place. Decisions get made without you. Knowledge is captured. Operations run without constant intervention.",
        opportunity:
          "At this level, AI isn't about fixing what's broken. It's about competitive advantage, scaling what works, and protecting your time as you grow.",
      };
    case "Solid Foundation":
      return {
        headline: "Strong Base, Room to Optimize",
        description:
          "You've built real systems. Things work, mostly. But there are specific areas where time and revenue are slipping through the cracks.",
        opportunity:
          "You're past the chaos stage but haven't hit your ceiling. Targeted automation in your weakest areas could recover significant hours and revenue.",
      };
    case "Clear Opportunities":
      return {
        headline: "You're Leaving Money on the Table",
        description:
          "Your scorecard reveals specific bottlenecks costing you time and revenue every week. Founder dependency, knowledge gaps, operational drag.",
        opportunity:
          "Based on your inputs, you're likely missing significant revenue to inefficiencies. That's not a guess. It's math based on your own numbers.",
      };
    default:
      return {
        headline: "Significant Opportunity Uncovered",
        description:
          "Your scorecard shows friction across multiple areas. Time disappearing into admin. Growth blocked by capacity. Knowledge living in your head.",
        opportunity:
          "The businesses with the most friction see the biggest gains from a Business AI OS. You have room to recover 10+ hours weekly.",
      };
  }
}

function getLowestSectionContent(
  lowestSection: string,
  results: ROIResults
): {
  headline: string;
  intro: string;
  hardTruth: string;
  whatCloses: string[];
  quickWin: string;
} {
  const hourlyRate = results.timeValue > 0 && results.monthlyHoursRecoverable > 0
    ? Math.round(results.timeValue / results.monthlyHoursRecoverable)
    : 150;

  const content: Record<
    string,
    {
      headline: string;
      intro: string;
      hardTruth: string;
      whatCloses: string[];
      quickWin: string;
    }
  > = {
    "Founder Dependency": {
      headline: "Your Business Stops When You Do",
      intro: "The founder is the system. No docs, no delegation framework, no one who can make decisions without you. Every hour you're unavailable is an hour the business stalls.",
      hardTruth: `You're locking ~${Math.round(results.founderDependencyROI.monthlyFounderHoursLocked)} hours/month in decisions and availability tax. At $${hourlyRate}/hr, that's ~$${Math.round(results.founderDependencyROI.cost).toLocaleString()}/month of your time trapped in the system.`,
      whatCloses: [
        "Document how decisions actually get made (the criteria, not just the outcome)",
        "Build the Context layer. Capture your knowledge before you automate anything.",
        "Create a delegation framework your team or AI can follow without escalating",
      ],
      quickWin: "Pick one recurring decision you make weekly. Write down exactly how you make it. That's your first delegation document.",
    },
    "Knowledge Systems": {
      headline: "Your Business Knowledge Is One Resignation Away From Disaster",
      intro: "Everything lives in heads, not systems. When someone leaves, or you step back, it leaves with them.",
      hardTruth: "AI can't learn from what isn't written down. You can't delegate what isn't documented. You can't scale what only exists in your memory.",
      whatCloses: [
        "Capture SOPs for your top 5 recurring processes",
        "Record a walkthrough of your most complex workflow",
        "Build a client context system: history, decisions, why things are done certain ways.",
      ],
      quickWin: "Open a doc. Write down the 3 things only you know how to do. That's your knowledge debt list.",
    },
    "Sales & Delivery": {
      headline: "Your Pipeline Is Leaking Deals You Already Earned",
      intro: "Slow proposals, no follow-up, deals going quiet. You're doing the hard part, getting the conversation, and losing it on process.",
      hardTruth: `You're spending ~${Math.round(results.salesDeliveryROI.wastedHours)} hrs/month on proposals and losing ~$${Math.round(results.salesDeliveryROI.lostRevenue).toLocaleString()}/month in deals that go dark. That's fixable with a template and a follow-up sequence.`,
      whatCloses: [
        "Template your proposals so they go out same-day",
        "Build a 3-touch follow-up sequence for every quote sent",
        "Automate the nurture for prospects who aren't ready yet",
      ],
      quickWin: "Create one proposal template this week. Cut your creation time by 50% immediately.",
    },
    "Operations & Workflow": {
      headline: "Admin Is Eating the Hours You Should Be Billing",
      intro: "Scheduling, invoicing, status updates, coordination. None of this requires your expertise. All of it is taking your time.",
      hardTruth: `You're spending ~${Math.round(results.operationsROI.hours)} hrs/month on operational overhead. At $${hourlyRate}/hr, that's $${Math.round(results.operationsROI.cost).toLocaleString()}/month of your highest-value time on lowest-value tasks.`,
      whatCloses: [
        "Identify your top 3 recurring admin tasks and automate one this month",
        "Connect your tools so data stops being re-entered manually",
        "Systemize client updates so they go out without you triggering them",
      ],
      quickWin: "Time yourself on your most-repeated admin task. If it takes more than 20 minutes per week, it should be automated.",
    },
    "Growth Capacity": {
      headline: "You've Hit the Ceiling That Comes Before Every Stuck Business",
      intro: "You can't add clients without adding hours. The business can only grow as fast as you can personally execute.",
      hardTruth: `Between manual onboarding (~${Math.round(results.growthCapacityROI.onboardingHours)} hrs/month) and missed referrals ($${Math.round(results.growthCapacityROI.missedReferralRevenue).toLocaleString()}/month), you're leaving real money on the table by not having growth systems.`,
      whatCloses: [
        "Systemize onboarding so new clients don't require your hands-on involvement",
        "Automate referral requests. Most happy clients will refer if you ask consistently.",
        "Document your delivery process so others can execute without you",
      ],
      quickWin: "Map your onboarding process start to finish. Circle every step that requires you specifically. That's your automation roadmap.",
    },
    "AI Foundation": {
      headline: "The Foundation Has to Come First",
      intro: "Disconnected tools, scattered data, undocumented processes. AI amplifies what's there. If what's there is chaos, you get faster chaos.",
      hardTruth: "Most AI implementations fail not because of the AI. It's because the data and processes underneath weren't ready. Garbage in, garbage out, at scale.",
      whatCloses: [
        "Get all client and prospect data into one central system",
        "Connect your core tools so they talk to each other",
        "Document your top processes so they can be handed to a person or an AI",
      ],
      quickWin: "Pick one system (CRM, project management, calendar) and commit to using it consistently for 30 days. That's your foundation.",
    },
  };

  return content[lowestSection] ?? content["Founder Dependency"];
}

function getSectionRecommendations(): Record<string, { title: string; items: string[] }> {
  return {
    "Founder Dependency": {
      title: "Reduce Your Founder Tax",
      items: [
        "Document the top 10 decisions you make weekly. Write down your criteria.",
        "Create a delegation playbook for your most common escalations",
        "Identify 3 recurring tasks only you do that could be documented and handed off",
        "Build a 'how we handle this' reference before you're unreachable",
      ],
    },
    "Knowledge Systems": {
      title: "Capture Before You Automate",
      items: [
        "Record a screen-share walkthrough of your most complex process",
        "Create a client context template for every active account",
        "Write down the 5 things only you know that would be catastrophic if forgotten",
        "Commit to documenting one new SOP per week for the next 90 days",
      ],
    },
    "Sales & Delivery": {
      title: "Systematize the Pipeline",
      items: [
        "Build a proposal template that covers 80% of your engagements",
        "Set up a 3-email follow-up sequence for every unsold quote",
        "Define your qualification criteria and stop spending time on bad fits",
        "Track your close rate monthly. You can't improve what you don't measure.",
      ],
    },
    "Operations & Workflow": {
      title: "Eliminate Operational Drag",
      items: [
        "Audit your week: list every repeating task. Circle the ones that don't require your expertise.",
        "Connect your CRM, calendar, and project tool so data stops being entered twice",
        "Build automated client status updates triggered by project milestones",
        "Pick your single most painful manual process and automate it this month",
      ],
    },
    "Growth Capacity": {
      title: "Build the Infrastructure for More",
      items: [
        "Document your client delivery process step by step",
        "Automate the referral ask. Trigger it 2 weeks after project close.",
        "Create a systemized onboarding flow that doesn't require your involvement",
        "Identify one service offering you could deliver without being hands-on",
      ],
    },
    "AI Foundation": {
      title: "Strengthen Your Foundation",
      items: [
        "Audit where your client data actually lives. Consolidate into one system.",
        "Connect your core tools: CRM, calendar, email, project management",
        "Write SOPs for your top 3 processes so someone else could follow them",
        "Define your data standards: what gets captured, where, and by whom.",
      ],
    },
  };
}

export async function generatePDF(
  results: ROIResults,
  email: string,
  operationType: string
): Promise<void> {
  const doc = new jsPDF();

  const categoryContent = getCategoryContent(results.category);
  const lowestContent = getLowestSectionContent(results.lowestSection, results);

  // ===== PAGE 1: Cover =====
  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, 210, 297, "F");

  drawHeader(doc, "Business AI OS Assessment");

  doc.setFontSize(12);
  doc.setTextColor(...ACCENT);
  doc.setFont("helvetica", "normal");
  doc.text("Scorecard Report", 18, 34);

  // Generated date
  doc.setFontSize(9);
  doc.setTextColor(100, 110, 120);
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    105,
    55,
    { align: "center" }
  );

  // Score circle
  drawScoreCircle(doc, 105, 130, 32, results.totalScore, 59);

  // Category badge
  drawCategoryBadge(doc, 105, 185, results.category);

  // Category headline
  doc.setFontSize(14);
  doc.setTextColor(...OFF_WHITE);
  doc.setFont("helvetica", "bold");
  const headLines = doc.splitTextToSize(categoryContent.headline, 160);
  doc.text(headLines, 105, 205, { align: "center" });

  // Description
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 160, 170);
  const descLines = doc.splitTextToSize(categoryContent.description, 160);
  doc.text(descLines, 105, 220, { align: "center" });

  // Opportunity card
  drawCard(doc, 20, 248, 170, 28, ACCENT);
  doc.setFontSize(9);
  doc.setTextColor(180, 190, 200);
  const oppLines = doc.splitTextToSize(categoryContent.opportunity, 155);
  doc.text(oppLines, 30, 260);

  drawFooter(doc);

  // ===== PAGE 2: ROI Summary =====
  doc.addPage();
  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, 210, 297, "F");
  drawHeader(doc, "Your Monthly Opportunity");

  let yPos = 55;

  // ROI cards
  const roiItems = [
    {
      label: "Hours you could reclaim as founder",
      value: `${Math.round(results.monthlyHoursRecoverable)} hours/month`,
    },
    {
      label: "Value of that time",
      value: `$${Math.round(results.timeValue).toLocaleString()}/month`,
    },
    {
      label: "Revenue you're likely missing",
      value: `$${Math.round(results.lostRevenue).toLocaleString()}/month`,
    },
  ];

  roiItems.forEach((item) => {
    drawCard(doc, 20, yPos, 170, 22);
    doc.setFontSize(9);
    doc.setTextColor(140, 150, 160);
    doc.setFont("helvetica", "normal");
    doc.text(item.label, 30, yPos + 9);
    doc.setTextColor(...ACCENT);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(item.value, 180, yPos + 14, { align: "right" });
    yPos += 28;
  });

  // Total
  drawCard(doc, 20, yPos, 170, 30, PRIMARY);
  doc.setFontSize(10);
  doc.setTextColor(200, 210, 220);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL MONTHLY OPPORTUNITY", 30, yPos + 10);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(
    `$${Math.round(results.totalMonthlyOpportunity).toLocaleString()}/month`,
    180,
    yPos + 16,
    { align: "right" }
  );
  doc.setFontSize(10);
  doc.setTextColor(180, 190, 200);
  doc.text("Annual Impact:", 30, yPos + 24);
  doc.setTextColor(...ACCENT);
  doc.setFontSize(12);
  doc.text(
    `$${Math.round(results.annualOpportunity).toLocaleString()}/year`,
    180,
    yPos + 24,
    { align: "right" }
  );

  drawFooter(doc);

  // ===== PAGE 3: Section Breakdown =====
  doc.addPage();
  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, 210, 297, "F");
  drawHeader(doc, "Section Breakdown");

  yPos = 55;

  const headers = ["Area", "Score", "Hours Lost", "Revenue Impact", "Priority"];
  const colX = [20, 80, 105, 140, 178];

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 110, 120);
  headers.forEach((h, i) => doc.text(h, colX[i], yPos));

  doc.setDrawColor(35, 45, 55);
  doc.line(20, yPos + 3, 190, yPos + 3);
  yPos += 12;

  results.sectionScores
    .filter((s) => s.maxScore > 0)
    .forEach((section) => {
      const isLowest = section.name === results.lowestSection;

      drawProgressBar(doc, 20, yPos - 3, 55, 3, section.score / section.maxScore, isLowest);

      doc.setFont("helvetica", isLowest ? "bold" : "normal");
      doc.setTextColor(...(isLowest ? CORAL : OFF_WHITE));
      doc.setFontSize(9);
      doc.text(section.name, 20, yPos + 4);

      doc.setTextColor(160, 170, 180);
      doc.text(`${section.score}/${section.maxScore}`, 80, yPos + 4);
      doc.text(
        section.hoursLost ? `${Math.round(section.hoursLost)} hrs/mo` : "-",
        105,
        yPos + 4
      );
      doc.text(
        section.revenueImpact
          ? `$${Math.round(section.revenueImpact).toLocaleString()}/mo`
          : "-",
        140,
        yPos + 4
      );

      const pColor: [number, number, number] =
        section.priority === "High"
          ? CORAL
          : section.priority === "Medium"
          ? [200, 170, 50]
          : ACCENT;
      doc.setTextColor(...pColor);
      doc.text(section.priority, 178, yPos + 4);

      yPos += 16;
    });

  drawFooter(doc);

  // ===== PAGE 4: Biggest Opportunity =====
  doc.addPage();
  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, 210, 297, "F");
  drawHeader(doc, "Your Biggest Opportunity");

  yPos = 55;

  doc.setFontSize(9);
  doc.setTextColor(...CORAL);
  doc.setFont("helvetica", "bold");
  doc.text(results.lowestSection.toUpperCase(), 20, yPos);
  yPos += 8;

  doc.setFontSize(14);
  doc.setTextColor(...OFF_WHITE);
  const hhLines = doc.splitTextToSize(lowestContent.headline, 170);
  doc.text(hhLines, 20, yPos);
  yPos += hhLines.length * 6 + 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(160, 170, 180);
  const introLines = doc.splitTextToSize(lowestContent.intro, 170);
  doc.text(introLines, 20, yPos);
  yPos += introLines.length * 5 + 8;

  // Hard truth box
  drawCard(doc, 20, yPos, 170, 38, CORAL);
  doc.setFontSize(9);
  doc.setTextColor(...CORAL);
  doc.setFont("helvetica", "bold");
  doc.text("Here's the hard truth:", 30, yPos + 10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 210, 220);
  const htLines = doc.splitTextToSize(lowestContent.hardTruth, 150);
  doc.text(htLines, 30, yPos + 18);
  yPos += 48;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...ACCENT);
  doc.text("What closes this gap:", 20, yPos);
  yPos += 8;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 190, 200);

  lowestContent.whatCloses.forEach((item) => {
    doc.text("→", 25, yPos);
    const iLines = doc.splitTextToSize(item, 158);
    doc.text(iLines, 33, yPos);
    yPos += iLines.length * 5 + 4;
  });

  yPos += 4;

  drawCard(doc, 20, yPos, 170, 28, ACCENT);
  doc.setFontSize(9);
  doc.setTextColor(...ACCENT);
  doc.setFont("helvetica", "bold");
  doc.text("Quick win:", 30, yPos + 10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 210, 220);
  const qwLines = doc.splitTextToSize(lowestContent.quickWin, 150);
  doc.text(qwLines, 30, yPos + 18);

  drawFooter(doc);

  // ===== PAGE 5: Recommended Next Steps =====
  const recommendations = getSectionRecommendations();
  const sectionsNeedingWork = results.sectionScores
    .filter((s) => s.maxScore > 0 && s.priority !== "Low")
    .sort((a, b) => a.score / a.maxScore - b.score / b.maxScore)
    .slice(0, 3);

  if (sectionsNeedingWork.length > 0) {
    doc.addPage();
    doc.setFillColor(...DARK_BG);
    doc.rect(0, 0, 210, 297, "F");
    drawHeader(doc, "Recommended Next Steps");

    yPos = 55;

    sectionsNeedingWork.forEach((section) => {
      const rec = recommendations[section.name];
      if (!rec) return;

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...PRIMARY);
      doc.text(rec.title, 20, yPos);

      yPos += 8;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(180, 190, 200);

      rec.items.forEach((item) => {
        doc.setTextColor(...ACCENT);
        doc.text("✓", 25, yPos);
        doc.setTextColor(180, 190, 200);
        const iLines = doc.splitTextToSize(item, 158);
        doc.text(iLines, 33, yPos);
        yPos += iLines.length * 4 + 3;
      });

      yPos += 10;
    });

    drawFooter(doc);
  }

  // ===== FINAL PAGE: Next Steps + CTA =====
  doc.addPage();
  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, 210, 297, "F");
  drawHeader(doc, "What to Do Next");

  doc.setFontSize(11);
  doc.setTextColor(...OFF_WHITE);
  doc.setFont("helvetica", "bold");
  doc.text("Your quick win:", 20, 60);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(160, 170, 180);
  const qwFinalLines = doc.splitTextToSize(lowestContent.quickWin, 170);
  doc.text(qwFinalLines, 20, 70);

  // CTA card
  const ctaY = 105;
  drawCard(doc, 20, ctaY, 170, 55, PRIMARY);

  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("Ready to build your Business AI OS?", 105, ctaY + 16, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 210, 220);
  doc.text("Book a free AI Audit call. 45 minutes.", 105, ctaY + 28, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(...ACCENT);
  doc.setFont("helvetica", "bold");
  doc.text("cal.com/revaya/ai-fit-call", 105, ctaY + 42, { align: "center" });

  doc.setFontSize(9);
  doc.setTextColor(100, 110, 120);
  doc.setFont("helvetica", "normal");
  doc.text("shannon@revaya.ai  |  revaya.ai", 20, 180);

  drawFooter(doc);

  doc.save("Business-AI-OS-Scorecard.pdf");
}
