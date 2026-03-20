import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  robots: { index: false },
};

export default function TermsOfUsePage() {
  return (
    <section className="bg-white pt-36 pb-20 md:pt-44 md:pb-24">
      <div className="max-w-[680px] mx-auto px-6 md:px-12">
        <h1 className="font-display font-black text-[2rem] md:text-[2.5rem] leading-[1.1] text-neutral-nearBlack mb-8">
          Terms of Use
        </h1>
        <div className="space-y-6 text-[1rem] leading-[1.65] text-neutral-nearBlack/80">
          <p>
            By accessing revaya.ai, you agree to these terms. If you do not agree, please do not use this site.
          </p>
          <p>
            <strong className="text-neutral-nearBlack">Site content.</strong> All content on this site — including text, copy, and design — is the property of Revaya AI (Shannon Winnicki). You may not reproduce, copy, or redistribute any content without written permission.
          </p>
          <p>
            <strong className="text-neutral-nearBlack">Contact form.</strong> Submitting the contact form does not create a client relationship or any binding agreement. Shannon Winnicki reserves the right to decline any inquiry.
          </p>
          <p>
            <strong className="text-neutral-nearBlack">Limitation of liability.</strong> Revaya AI provides this site &ldquo;as is&rdquo; and makes no warranties regarding accuracy or fitness for any purpose. We are not liable for any damages arising from use of this site.
          </p>
          <p>
            <strong className="text-neutral-nearBlack">Changes.</strong> These terms may be updated at any time. Continued use of the site constitutes acceptance of any changes.
          </p>
          <p>
            <strong className="text-neutral-nearBlack">Contact.</strong> For questions, email shannon@revaya.ai.
          </p>
          <p className="text-[0.875rem] text-neutral-nearBlack/50">
            Last updated: March 2026
          </p>
        </div>
      </div>
    </section>
  );
}
