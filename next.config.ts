import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://itx-frontend-test.onrender.com/api/:path*",
      },
    ];
  },
  images: {
    domains: ["itx-frontend-test.onrender.com"],
  },
};

export default nextConfig;
