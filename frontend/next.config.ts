import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project — without it, Next.js walks up
  // and picks up an unrelated package-lock.json under the Windows user
  // profile folder, which just produces a harmless but noisy warning.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
