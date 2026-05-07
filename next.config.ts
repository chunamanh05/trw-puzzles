import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    Turbopack được kích hoạt qua flag --turbo trong package.json.
    serverExternalPackages loại bỏ @xenova/transformers khỏi bundle server
    để nó chỉ chạy phía client (trình duyệt).
  */
  serverExternalPackages: ["@xenova/transformers", "onnxruntime-node"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Webpack config (dùng khi build production / next start)
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      os: false,
    };
    return config;
  },
};

export default nextConfig;
