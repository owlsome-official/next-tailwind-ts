/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: true, // suppress all logs as default
    reactRemoveProperties: true, // remove react properties (Default: ^data-test)
  },
  reactStrictMode: true,
  output: "standalone",
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
