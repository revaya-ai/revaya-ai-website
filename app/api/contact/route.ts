import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
      linkedinUrl,
      marketingOptIn,
      turnstileToken,
    } = body;

    // Basic validation
    if (!name || !email || !bottleneck) {
      return NextResponse.json(
        { error: "Name, email, and bottleneck are required." },
        { status: 400 }
      );
    }

    // --- Turnstile verification ---
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Verification failed. Please try again." },
          { status: 400 }
        );
      }

      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json(
          { error: "Verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    // --- Supabase: save lead + optional email consent (non-blocking) ---
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Save lead record
        await supabase.from("contact_form_leads").insert([{
          name,
          email,
          phone: phone || null,
          company: company || null,
          business_description: businessDescription || null,
          team_size: teamSize || null,
          annual_revenue: annualRevenue || null,
          bottleneck,
          tried_so_far: triedSoFar || null,
          linkedin_url: linkedinUrl || null,
          opted_in: marketingOptIn ?? false,
          intake_triggered: false,
        }]);

        // Upsert into email_subscribers if opted in
        if (marketingOptIn) {
          await supabase.from("email_subscribers").upsert([{
            email,
            name,
            source: "contact_form",
            consent_method: "contact_form_checkbox",
          }], { onConflict: "email" });
        }
      } catch (dbError) {
        console.error("Supabase write failed:", dbError);
      }
    }

    // --- Intake system: trigger pre-call research (fire-and-forget) ---
    const intakeSystemUrl = process.env.INTAKE_SYSTEM_URL;
    if (intakeSystemUrl) {
      const [firstName, ...lastParts] = (name || "").trim().split(" ");
      const lastName = lastParts.join(" ");
      fetch(`${intakeSystemUrl}/initial-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName || "",
          email,
          phone: phone || "",
          company_name: company || "",
          website: "",
          interested_in: "Business AI OS",
          pain_points: bottleneck,
          referred_by: "",
          linkedin_url: linkedinUrl || "",
        }),
      }).catch((e) => console.error("Intake system trigger failed:", e));
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
LinkedIn: ${linkedinUrl || "Not provided"}

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
LinkedIn: ${linkedinUrl || "Not provided"}

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
            text: `*New AIOS inquiry from revaya.ai*\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company || "Not provided"}\n*Revenue:* ${annualRevenue || "Not provided"}\n*LinkedIn:* ${linkedinUrl || "Not provided"}\n*Bottleneck:* ${bottleneck}${triedSoFar ? `\n*Tried so far:* ${triedSoFar}` : ""}${marketingOptIn ? "\n*Marketing opt-in:* Yes" : ""}`,
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
