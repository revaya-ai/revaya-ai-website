import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";

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
    default: "Business AI OS for Founder-Led Businesses — Revaya AI",
    template: "%s | Revaya AI",
  },
  description:
    "Your business shouldn't run only when you do. I build Business AI Operating Systems for founder-led businesses. Five layers, three measurable outcomes.",
  openGraph: {
    type: "website",
    siteName: "Revaya AI",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
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
      </head>
      <body className="font-body antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
