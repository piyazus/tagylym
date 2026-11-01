import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Serve the free catalog before the retained React routes. Its JavaScript and
  // data live under /catalog; account, API and other existing routes stay intact.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/ru", destination: "/catalog/index.html" },
        { source: "/en", destination: "/catalog/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      { source: "/kk/:path*", destination: "/ru/:path*", permanent: false },
      { source: "/kz/:path*", destination: "/ru/:path*", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default withNextIntl(nextConfig);
