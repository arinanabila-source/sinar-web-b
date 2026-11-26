import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "riabfvluwxrdbllysmcb.supabase.co",
      },
      {
        protocol: "https",
        hostname: "ecxouflvxaulcaeuccbz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
