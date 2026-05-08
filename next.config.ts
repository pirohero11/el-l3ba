import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.24.144.1'],
};

export default withNextIntl(nextConfig);
