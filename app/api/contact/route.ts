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

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.startsWith("re_placeholder")) {
      // Log to server console during pre-launch. Return success so form UX works.
      console.log("[CONTACT FORM — no Resend key] Submission:", { name, email, company, bottleneck });
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

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

    await resend.emails.send({
      from: "Revaya AI Contact Form <noreply@revaya.ai>",
      to: "shannon@revaya.ai",
      replyTo: email,
      subject: `New inquiry from ${name} — ${company || "No company"}`,
      text: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
