import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.56.1"],
  images: {
    localPatterns: [{ pathname: "/api/media/file/**" }],
  },
};

export default withPayload(nextConfig);