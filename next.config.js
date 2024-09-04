/** @type {import('next').NextConfig} */

const path = require("path");
const { defaultConfig } = require("next/dist/server/config-shared");

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
// default-src 'self';
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
  compiler: {
    // removeConsole: {
    //   exclude: process.env.NODE_ENV === "production" ? ["error"] : [],
    // }, // suppress logs on production
    reactRemoveProperties: process.env.NODE_ENV === "production", // remove react properties on production (Included: ^data-test)
  },
  reactStrictMode: true,
  output: "standalone",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["actions"] = path.resolve(__dirname, "./src/actions/");
    config.resolve.alias["assets"] = path.resolve(__dirname, "./src/assets/");
    config.resolve.alias["components"] = path.resolve(
      __dirname,
      "./src/components/",
    );
    config.resolve.alias["utils"] = path.resolve(__dirname, "./src/utils/");
    return config;
  },
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
      ? require.resolve("./cache-handler.mjs")
      : defaultConfig.cacheHandler,
  cacheMaxMemorySize:
    process.env.NODE_ENV === "production"
      ? 0
      : defaultConfig.cacheMaxMemorySize,
};

module.exports = nextConfig;
