import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      businessDescription,
      teamSize,
      bottleneck,
      triedSoFar,
    } = body;

    // Basic validation
    if (!name || !email || !bottleneck) {
      return NextResponse.json(
        { error: "Name, email, and bottleneck are required." },
        { status: 400 }
      );
    }

    const emailContent = `
New contact form submission from revaya.ai

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Company: ${company || "Not provided"}
Business description: ${businessDescription || "Not provided"}
Team size: ${teamSize || "Not provided"}

What's the operational bottleneck?
${bottleneck}

What have they tried so far?
${triedSoFar || "Not provided"}
    `.trim();

    // --- Resend email ---
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.startsWith("re_placeholder")) {
      console.log("[CONTACT FORM — no Resend key] Submission:", { name, email, company, bottleneck });
    } else {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Revaya AI Contact Form <noreply@revaya.ai>",
        to: "shannon@revaya.ai",
        replyTo: email,
        subject: `New inquiry from ${name} — ${company || "No company"}`,
        text: emailContent,
      });
    }

    // --- Slack notification (non-blocking) ---
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      try {
        await fetch(slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `*New AIOS inquiry from revaya.ai*\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company || "Not provided"}\n*Bottleneck:* ${bottleneck}`,
          }),
        });
      } catch (slackError) {
        console.error("Slack notification failed:", slackError);
      }
    }

    // --- Airtable record (non-blocking) ---
    const airtableToken = process.env.AIRTABLE_TOKEN;
    const airtableBaseId = process.env.AIRTABLE_CONTACTS_BASE_ID;
    const airtableTable = process.env.AIRTABLE_CONTACTS_TABLE || "Contacts";
    if (airtableToken && airtableBaseId) {
      try {
        await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTable)}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${airtableToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              Name: name,
              Email: email,
              Phone: phone || "",
              Company: company || "",
              "Business Description": businessDescription || "",
              "Team Size": teamSize || "",
              Bottleneck: bottleneck,
              "Tried So Far": triedSoFar || "",
              Source: "revaya.ai contact form",
              "Submitted At": new Date().toISOString(),
            },
          }),
        });
      } catch (airtableError) {
        console.error("Airtable record creation failed:", airtableError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
