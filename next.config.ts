/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
      serverActions: {
         bodySizeLimit: "30mb",
      },
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "img.clerk.com",
         },
         {
            protocol: "https",
            hostname: "ukjuxhunaumvcetiplhr.supabase.co",
         },
      ],
   },
};

export default nextConfig;
