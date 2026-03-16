import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/why-revaya", permanent: true },
      { source: "/ai-solutions", destination: "/solutions", permanent: true },
      { source: "/get-in-touch", destination: "/work-with-me", permanent: true },
      { source: "/portfolio", destination: "/", permanent: true },
      { source: "/ai-website-services", destination: "/solutions", permanent: true },
      { source: "/website-redesign-services", destination: "/solutions", permanent: true },
      { source: "/website-audit-small-business", destination: "/solutions", permanent: true },
    ];
  },
};

export default nextConfig;
