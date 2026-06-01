import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, category, lowestSection, totalMonthlyOpportunity, annualOpportunity } = body;

    const emailContent = `
New assessment submission from revaya.ai

Name: ${name}
Email: ${email}
Category: ${category}
Lowest section: ${lowestSection}
Monthly opportunity: $${totalMonthlyOpportunity?.toLocaleString() ?? "—"}
Annual opportunity: $${annualOpportunity?.toLocaleString() ?? "—"}

https://supabase.com — check assessment_responses for full details
    `.trim();

    // Resend notification to Shannon
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && !apiKey.startsWith("re_placeholder")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: "Revaya AI Assessment <noreply@revaya.ai>",
          to: "shannon@revaya.ai",
          replyTo: email,
          subject: `New assessment: ${name} — ${category} ($${totalMonthlyOpportunity?.toLocaleString() ?? "—"}/mo)`,
          text: emailContent,
        });
      } catch (resendError) {
        console.error("Assessment notification email failed:", resendError);
      }
    }

    // Slack notification
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      try {
        await fetch(slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `*New assessment submission*\n*Name:* ${name}\n*Email:* ${email}\n*Category:* ${category}\n*Lowest section:* ${lowestSection}\n*Monthly opportunity:* $${totalMonthlyOpportunity?.toLocaleString() ?? "—"}`,
          }),
        });
      } catch (slackError) {
        console.error("Slack assessment notification failed:", slackError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Assessment notification error:", error);
    return NextResponse.json({ error: "Notification failed." }, { status: 500 });
  }
}
