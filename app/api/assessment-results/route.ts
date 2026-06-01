import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CATEGORY_CONTEXT: Record<string, string> = {
  "High Potential": "Your business has significant operational drag right now. That's actually the good news — it means there's a lot to recover. The systems aren't in place yet, but the opportunity is real and your numbers show it.",
  "Clear Opportunities": "You have solid instincts and some processes in place. But there are clear gaps where time and revenue are slipping through. The right systems in these areas could meaningfully change what your business looks like in 90 days.",
  "Solid Foundation": "You're running a reasonably tight operation. The opportunity here isn't fixing what's broken — it's building on what's working. Systematizing the right things now creates compounding returns over the next 12 months.",
  "Optimized": "You're already operating well. The question now is whether you're leaving growth on the table by doing manually what could run without you. A targeted AI OS layer could free up capacity for the work that actually moves the needle.",
};

const SECTION_CONTEXT: Record<string, string> = {
  "Founder Dependency": "Too much of the business runs through you personally. Every decision, every deliverable, every exception. This is the hardest bottleneck to see from the inside — and the most expensive one to ignore.",
  "Knowledge Systems": "The expertise that makes your business valuable lives in your head, not in your systems. When you're unavailable, quality drops. When you want to scale, there's nothing to hand off.",
  "Sales & Delivery": "Time is leaking in your sales and delivery process — proposals that take too long, follow-ups that fall through, onboarding that starts from scratch every time.",
  "Operations & Workflow": "Recurring work that should run automatically is still requiring your attention. Manual processes, duplicate data entry, communication overhead — these add up faster than most founders realize.",
  "Growth Capacity": "You're not set up to grow without it costing you more time. The current setup trades growth for founder hours, which caps both.",
  "AI Foundation": "The infrastructure for intelligent automation isn't in place yet. You're making decisions without good data and running processes without leverage.",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      category,
      lowestSection,
      totalMonthlyOpportunity,
      annualOpportunity,
      monthlyHoursRecoverable,
    } = body;

    if (!name || !email || !category) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.startsWith("re_placeholder")) {
      console.log("[ASSESSMENT RESULTS: no Resend key]", { name, email });
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const categoryNote = CATEGORY_CONTEXT[category] ?? "";
    const sectionNote = SECTION_CONTEXT[lowestSection] ?? "";
    const monthlyFormatted = totalMonthlyOpportunity
      ? `$${Number(totalMonthlyOpportunity).toLocaleString()}`
      : null;
    const annualFormatted = annualOpportunity
      ? `$${Number(annualOpportunity).toLocaleString()}`
      : null;
    const hoursNote = monthlyHoursRecoverable
      ? `${Math.round(Number(monthlyHoursRecoverable))} hours/month`
      : null;

    const emailText = `
Hi ${name},

Here's your Business AI OS scorecard.

YOUR RESULT: ${category}

${categoryNote}

WHERE YOUR BIGGEST OPPORTUNITY IS: ${lowestSection}

${sectionNote}

${monthlyFormatted || annualFormatted ? `THE NUMBERS\n${monthlyFormatted ? `Monthly opportunity: ${monthlyFormatted}` : ""}${annualFormatted ? `\nAnnual opportunity: ${annualFormatted}` : ""}${hoursNote ? `\nRecoverable time: ${hoursNote}` : ""}\n\nThese numbers are calculated from what you told us — your hourly rate, your close rate, your team size. They're specific to your business, not a generic estimate.` : ""}

---

If any of this lands, the next step is a 20-minute fit call. No pitch — just a look at what's actually going on in your business and whether a Business AI OS makes sense for where you are right now.

Book a call: https://www.revaya.ai/work-with-me

Shannon Winnicki
Revaya AI
https://www.revaya.ai
    `.trim();

    await resend.emails.send({
      from: "Shannon Winnicki — Revaya AI <shannon@revaya.ai>",
      to: email,
      subject: `Your Business AI OS scorecard, ${name.split(" ")[0]}`,
      text: emailText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Assessment results email failed:", error);
    return NextResponse.json({ error: "Email failed." }, { status: 500 });
  }
}
