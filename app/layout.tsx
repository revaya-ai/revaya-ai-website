import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const montserrat = Montserrat({
  weight: ["700", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.revaya.ai"),
  title: {
    default: "Business AI Operating System for Founder-Led Businesses | Revaya AI",
    template: "%s | Revaya AI",
  },
  description:
    "Stop being the business. Start owning one. I build Business AI Operating Systems for founder-led service businesses. Five layers. Three measurable outcomes.",
  keywords: [
    "Business AI Operating System",
    "Business AI OS",
    "AI consultant",
    "founder-led business automation",
    "AI operating system for small business",
    "Shannon Winnicki",
    "Revaya AI",
  ],
  openGraph: {
    type: "website",
    siteName: "Revaya AI",
    locale: "en_US",
    description:
      "Stop being the business. Start owning one. I build Business AI Operating Systems for founder-led service businesses. Five layers. Three measurable outcomes.",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Stop being the business. Start owning one. I build Business AI Operating Systems for founder-led service businesses.",
  },
  other: {
    "msvalidate.01": "A2EA5C970EB8CE94A778035751E3EC69",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <JsonLd data={organizationSchema} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8M6HLZZ52E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8M6HLZZ52E');
          `}
        </Script>
      </head>
      <body className="font-body antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
