// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";
// Import the PWA configuration defined in next-pwa.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pwaConfig = require("./next-pwa.config.js");

const withNextIntl = createNextIntlPlugin();

// Apply the PWA enhancer using the imported configuration
const withPWAConfig = withPWA(pwaConfig);

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.24.144.1"],
  // Provide an empty turbopack config to avoid Turbopack warnings
  turbopack: {},
};

// @ts-ignore
export default withPWAConfig(withNextIntl(nextConfig));
