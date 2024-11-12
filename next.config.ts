import type { NextConfig } from "next";
import { defaultConfig } from "next/dist/server/config-shared";

const cspHeader = `
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
      {
        source: "/support",
        headers: [
          {
            key: "x-powered-by",
            value: "owlsome-official/next-tailwind-ts",
          },
        ],
      },
    ];
  },
  output: "standalone",
  poweredByHeader: false,
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
  cacheHandler:
    process.env.NODE_ENV === "production"
      ? require.resolve("./cache-handler.js")
      : defaultConfig.cacheHandler,
  cacheMaxMemorySize:
    process.env.NODE_ENV === "production"
      ? 0
      : defaultConfig.cacheMaxMemorySize,
};

export default nextConfig;
