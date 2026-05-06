import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 
    Giữ cấu hình mặc định để tối ưu hóa thời gian build (20s). 
    Turbopack sẽ được kích hoạt thông qua flag --turbo trong scripts của package.json.
  */
  webpack: (config) => {
    // Cho phép @xenova/transformers chạy trong browser (không cần Node.js fs)
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
