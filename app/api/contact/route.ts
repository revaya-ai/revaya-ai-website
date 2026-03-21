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
      annualRevenue,
      bottleneck,
      triedSoFar,
      marketingOptIn,
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
Annual revenue: ${annualRevenue || "Not provided"}

What's the operational bottleneck?
${bottleneck}

What have they tried so far?
${triedSoFar || "Not provided"}

Marketing opt-in: ${marketingOptIn ? "Yes" : "No"}
    `.trim();

    // --- Resend emails (non-blocking) ---
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.startsWith("re_placeholder")) {
      console.log("[CONTACT FORM — no Resend key] Submission:", { name, email, company, bottleneck });
    } else {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);

        // Notify Shannon
        await resend.emails.send({
          from: "Revaya AI Contact Form <noreply@revaya.ai>",
          to: "shannon@revaya.ai",
          replyTo: email,
          subject: `New inquiry from ${name} — ${company || "No company"}`,
          text: emailContent,
        });

        // Confirmation to visitor
        const confirmationText = `
Hi ${name},

Thank you for reaching out. I received your submission and will be in touch shortly — within 48 hours if it looks like a fit.

Here's a copy of what you sent:

---
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Company: ${company || "Not provided"}
Business description: ${businessDescription || "Not provided"}
Team size: ${teamSize || "Not provided"}
Annual revenue: ${annualRevenue || "Not provided"}

What's the operational bottleneck?
${bottleneck}

What have you tried so far?
${triedSoFar || "Not provided"}
---

Talk soon,
Shannon Winnicki
Revaya AI
https://www.revaya.ai
        `.trim();

        await resend.emails.send({
          from: "Shannon Winnicki — Revaya AI <shannon@revaya.ai>",
          to: email,
          subject: "Got your message — I'll be in touch shortly",
          text: confirmationText,
        });
      } catch (resendError) {
        console.error("Resend email failed:", resendError);
      }
    }

    // --- Slack notification (non-blocking) ---
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      try {
        await fetch(slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `*New AIOS inquiry from revaya.ai*\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company || "Not provided"}\n*Revenue:* ${annualRevenue || "Not provided"}\n*Bottleneck:* ${bottleneck}${triedSoFar ? `\n*Tried so far:* ${triedSoFar}` : ""}${marketingOptIn ? "\n*Marketing opt-in:* Yes" : ""}`,
          }),
        });
      } catch (slackError) {
        console.error("Slack notification failed:", slackError);
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
