import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white pt-36 pb-20 md:pt-44 md:pb-24">
      <div className="max-w-[680px] mx-auto px-6 md:px-12">
        <h1 className="font-display font-black text-[2rem] md:text-[2.5rem] leading-[1.1] text-neutral-nearBlack mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-[1rem] leading-[1.65] text-neutral-nearBlack/80">
          <p>
            Revaya AI (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates revaya.ai. This privacy policy describes how we collect, use, and protect information when you visit this site or submit an inquiry.
          </p>
          <p>
            <strong className="text-neutral-nearBlack">Information we collect.</strong> When you submit the contact form, we collect your name, email address, phone number (optional), company name, and the details you share about your business situation. We do not use cookies for tracking or analytics at this time.
          </p>
          <p>
            <strong className="text-neutral-nearBlack">How we use your information.</strong> We use your contact form submission solely to evaluate whether to schedule a discovery conversation. We do not sell your information to third parties.
          </p>
          <p>
            <strong className="text-neutral-nearBlack">Data storage.</strong> Form submissions are sent via Resend and stored in Shannon Winnicki&rsquo;s email. We do not maintain a separate database of contact submissions.
          </p>
          <p>
            <strong className="text-neutral-nearBlack">Contact.</strong> For questions about this policy, email shannon@revaya.ai.
          </p>
          <p className="text-[0.875rem] text-neutral-nearBlack/50">
            Last updated: March 2026
          </p>
        </div>
      </div>
    </section>
  );
}
