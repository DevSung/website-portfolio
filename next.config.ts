import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 데모 링크를 배열/설정 객체로 관리하는 구조라 라우트 리터럴 타입이
  // 오히려 걸림돌이 된다.
  typedRoutes: false,
};

export default nextConfig;
