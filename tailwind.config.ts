import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#553555",
          dark: "#114B5F",
          accent: "#028090",
          light: "#E4FDE1",
          coral: "#F45B69",
        },
        neutral: {
          nearBlack: "#1A1A1A",
          offWhite: "#F8F8F8",
        },
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "hero": ["3.5rem", { lineHeight: "1.1", fontWeight: "900" }],
        "page-h1": ["3rem", { lineHeight: "1.1", fontWeight: "900" }],
        "section-h2": ["2.5rem", { lineHeight: "1.15", fontWeight: "900" }],
        "subsection-h3": ["1.625rem", { lineHeight: "1.2", fontWeight: "900" }],
        "label-h4": ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        "body-std": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "cta-btn": ["0.9375rem", { fontWeight: "500" }],
        "nav-link": ["0.875rem", { fontWeight: "500" }],
        "footer-text": ["0.8125rem", { lineHeight: "1.5" }],
      },
      maxWidth: {
        content: "1200px",
        prose: "680px",
        form: "560px",
      },
    },
  },
  plugins: [],
};

export default config;
