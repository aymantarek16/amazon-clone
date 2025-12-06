import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "cdn.dummyjson.com",
    },
    {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
    },
    {
      protocol: "https",
      hostname: "avatars.githubusercontent.com",
    },
  ],
},
};

export default nextConfig;
