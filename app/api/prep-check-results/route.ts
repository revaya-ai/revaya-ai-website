import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TIER_NAMES: Record<number, string> = {
  1: "Your AI Needs More to Work With",
  2: "You Have Pieces. You Need a System.",
  3: "Your Business Is Documented. Now Build the System.",
};

const TIER_LABELS: Record<number, string> = {
  1: "Not Ready (0-2 of 5)",
  2: "Getting There (3-4 of 5)",
  3: "Ready to Build (5 of 5)",
};

const DIMENSION_NAMES: Record<number, string> = {
  0: "Knowledge Capture",
  1: "Process Repeatability",
  2: "Tool Integration",
  3: "Delegation Readiness",
  4: "Time Visibility",
};

const GAP_ACTIONS: Record<number, string> = {
  0: "Start with one process. Open a doc. Write down every step, in order, the way you actually do it, not how it should work. That's your first SOP. Do this for your top 3 recurring tasks this week. Then repeat it weekly until every core process is captured.",
  1: "Pick one task you do more than twice a week. Do it the same way, on purpose, for 30 days. Write down the steps the first time. That's your process. Repeat this weekly, one new process at a time, until your recurring work runs the same way every time.",
  2: "List every tool you use. Note what data lives in each. Circle every place you re-enter the same information. That list is your integration roadmap. Start with the one you touch most. Work through it weekly until your core tools share data automatically.",
  3: "Pick one thing only you know how to do. Record yourself doing it, or write it out step by step. Don't clean it up. Just capture it. That's your first delegation document. Add one more each week until someone could run your business without you explaining anything.",
  4: "For one week, track every task you do and how long it takes. Use a notes app, a spreadsheet, anything. At the end of the week, group tasks by type. That's your time map. Repeat this once a month until you know exactly where your hours go.",
};

const KNOWLEDGE_BASE_NOTE = `As you work through these gaps, keep everything in one place. A Notion page, a shared drive folder, even a set of Google Docs. The goal is one place where your business knowledge lives and grows. That's your working knowledge base, and it's what makes AI useful. Add to it weekly. Every process you document is one less thing that lives only in your head.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, score, tier, gaps } = body;

    if (!name || !email || tier == null) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.startsWith("re_placeholder")) {
      console.log("[PREP CHECK RESULTS — no Resend key]", { name, email, tier });
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const tierName = TIER_NAMES[tier] ?? "";
    const tierLabel = TIER_LABELS[tier] ?? "";
    const gapIds: number[] = gaps ?? [];

    const gapLines = gapIds
      .map((id) => {
        const dim = DIMENSION_NAMES[id] ?? "";
        const action = GAP_ACTIONS[id] ?? "";
        return `${dim.toUpperCase()}\n${action}`;
      })
      .join("\n\n");

    const tier3NextStep =
      tier === 3
        ? `The question now isn't whether you're ready. It's where to start. The Business AI OS Assessment scores your business across 30 dimensions, calculates the real cost in hours and dollars of your specific gaps, and surfaces your single highest-ROI area to systematize first.\n\nMost people who take it walk away with a number they didn't expect. That number tends to make the decision easy.`
        : "";

    const assessmentCta =
      tier === 1
        ? `Curious what staying here is actually costing you? The Business AI OS Assessment calculates the real number, in hours and dollars, based on how your business runs today.\n\nTake the assessment: https://www.revaya.ai/business-ai-os-assessment`
        : tier === 2
        ? `Want to see what these gaps are costing you right now? The Business AI OS Assessment breaks it down in real dollars, time you're losing, revenue that's slipping through.\n\nTake the assessment: https://www.revaya.ai/business-ai-os-assessment`
        : `Take the Business AI OS Assessment, see your score across 30 dimensions and find out exactly what it's costing you to stay where you are.\n\nhttps://www.revaya.ai/business-ai-os-assessment`;

    const emailText = `
Hi ${name},

Here are your AI Prep Check results.

YOUR SCORE: ${score} of 5
RESULT: ${tierLabel}

${tierName}

${tier === 1 || tier === 2
  ? gapIds.length > 0
    ? `Here's where to start:\n\n${gapLines}\n\nBUILD YOUR WORKING KNOWLEDGE BASE\n${KNOWLEDGE_BASE_NOTE}`
    : ""
  : tier3NextStep}

---

${assessmentCta}

---

Shannon Winnicki
Revaya AI
https://www.revaya.ai
    `.trim();

    await resend.emails.send({
      from: "Shannon Winnicki — Revaya AI <shannon@revaya.ai>",
      to: email,
      subject: `Your AI Prep Check results — ${tierLabel}`,
      text: emailText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Prep check results email failed:", error);
    return NextResponse.json({ error: "Email failed." }, { status: 500 });
  }
}
