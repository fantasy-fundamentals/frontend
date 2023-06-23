/**
 * @type {import('next').NextConfig}
 */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  env: {
    NEXT_PUBLIC_ENV: "PRODUCTION", //your next configs goes here
  },
});
const nextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },

  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
    };
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";

    return config;
  },
};

module.exports = nextConfig;
