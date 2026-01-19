import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSG 최적화
  output: "export", // 정적 사이트 생성

  // 이미지 최적화 (정적 export에서는 unoptimized 필요)
  images: {
    unoptimized: true,
  },

  // 빌드 최적화
  reactStrictMode: true,

  // 번들 분석용 (필요시 주석 해제)
  // experimental: {
  //   bundlePagesRouterDependencies: true,
  // },
};

export default nextConfig;
