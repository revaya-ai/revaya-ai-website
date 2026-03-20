import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/why-revaya", permanent: true },
      { source: "/ai-solutions", destination: "/business-ai-operating-system", permanent: true },
      { source: "/get-in-touch", destination: "/work-with-me", permanent: true },
      { source: "/contact", destination: "/work-with-me", permanent: true },
      { source: "/portfolio", destination: "/", permanent: true },
      { source: "/ai-website-services", destination: "/business-ai-operating-system", permanent: true },
      { source: "/website-redesign-services", destination: "/business-ai-operating-system", permanent: true },
      { source: "/website-audit-small-business", destination: "/business-ai-operating-system", permanent: true },
    ];
  },
};

export default nextConfig;
