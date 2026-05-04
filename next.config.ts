import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 
    Giữ cấu hình mặc định để tối ưu hóa thời gian build (20s). 
    Turbopack sẽ được kích hoạt thông qua flag --turbo trong scripts của package.json.
  */
};

export default nextConfig;
