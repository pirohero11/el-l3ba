// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

// PWA enhancer with options (read from next-pwa.config.js)
const withPWAConfig = withPWA({
  // Options are defined in next-pwa.config.js
});

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.24.144.1"],
  // Provide an empty turbopack config to avoid Turbopack warnings
  turbopack: {},
};

export default withPWAConfig(withNextIntl(nextConfig));
