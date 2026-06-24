// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Initialize next-intl plugin (auto-detect locales from messages folder)
const withNextIntl = createNextIntlPlugin();

// Initialize next-pwa plugin with options (mirroring next-pwa.config.js)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // Disable PWA in development for faster reloads
  disable: process.env.NODE_ENV === "development",
  // Manifest configuration (optional, can also be a separate file)
  manifest: {
    name: "El l3ba 6",
    short_name: "El l3ba 6",
    description: "Play with the gang",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
});

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.24.144.1"],
};

// Combine plugins – ignore TypeScript conflicts between them
// @ts-ignore
export default withPWA(withNextIntl(nextConfig));