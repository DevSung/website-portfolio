import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 데모 링크를 배열/설정 객체로 관리하는 구조라 라우트 리터럴 타입이
  // 오히려 걸림돌이 된다.
  typedRoutes: false,

  // 서버 코드가 없어서 정적 파일로 뽑을 수 있다. 이러면 Cloudflare Pages,
  // GitHub Pages 같은 무료 정적 호스팅을 그대로 쓸 수 있다.
  // 상시로 켜두면 `next start` 가 막히므로 내보낼 때만 켠다.
  //   NEXT_EXPORT=1 npm run build
  //
  // trailingSlash 를 같이 켜는 이유: 기본 내보내기는 out/cafe.html 을 만드는데
  // 호스트마다 /cafe 를 그 파일로 이어줄지가 다르다(GitHub Pages 는 404).
  // 켜두면 out/cafe/index.html 이 되어 어느 정적 호스트에서든 동작한다.
  ...(process.env.NEXT_EXPORT
    ? { output: "export" as const, trailingSlash: true }
    : {}),
};

export default nextConfig;
