import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GONE_PATHS = [
  "/conversion-corner",
  "/missed-call-calculator",
  "/website-growth-accelerator-intake",
  "/payment-request-page",
];

const BLOG_GONE_SLUGS = [
  "/post/best-website-platforms-small-business-2025",
  "/post/modern-seo-for-small-business",
  "/post/website-mistakes-to-avoid",
  "/post/website-management-frees-your-time",
  "/post/wix-vs-shopify-small-business",
  "/post/hidden-cost-of-website-neglect",
  "/post/seo-for-small-business",
  "/post/7-ux-mistakes-how-to-fix",
  "/post/is-wordpress-good-for-small-business",
  "/post/seo-basics-small-business",
  "/post/web-design-tips-small-business",
  "/post/website-metrics-what-to-track",
  "/post/website-ux-guide-for-small-businesses",
  "/post/website-tasks-to-delegate",
  "/post/5-service-page-conversion-fixes",
  "/post/website-elements-customers-shouldnt-hunt",
  "/post/why-wix-is-better-choice-for-your-business",
  "/post/website-upgrades-under-500",
  "/post/what-is-website-management",
  "/post/website-maintenance-vs-website-management",
  "/post/homepage-hierarchy",
  "/post/website-health-check-toolkit",
  "/post/10-signs-your-website-needs-a-redesign",
  "/post/diy-website-audit-small-business",
  "/post/what-is-conversion-rate-optimization",
  "/post/is-your-business-outgrowing-website-platform",
  "/post/transform-your-website",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (GONE_PATHS.includes(pathname) || BLOG_GONE_SLUGS.includes(pathname)) {
    return new NextResponse(null, { status: 410 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/post/:path*",
    "/conversion-corner",
    "/missed-call-calculator",
    "/website-growth-accelerator-intake",
    "/payment-request-page",
  ],
};
