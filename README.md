# 업종별 웹사이트 제작 포트폴리오

카페·공방, 병원·클리닉, 기업·스타트업 — 세 업종의 웹사이트를 실제로 동작하는 데모로 만들었습니다.
템플릿을 고른 게 아니라 업종마다 방문자가 찾는 정보가 달라서 화면 구조를 각각 짰습니다.

![Next.js](https://img.shields.io/badge/Next.js-16.3-000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-087ea4?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)

**[→ 데모 열어보기](https://website-portfolio.sungsin1030.workers.dev)**

---

## 데모

| 업종 | 브랜드(가상) | 링크 |
|---|---|---|
| 카페 · 공방 · 스튜디오 | 라온공방 | [열기](https://website-portfolio.sungsin1030.workers.dev/cafe/) |
| 병원 · 클리닉 | 바른솔 정형외과의원 | [열기](https://website-portfolio.sungsin1030.workers.dev/clinic/) |
| 기업 · 스타트업 | Hyperlane | [열기](https://website-portfolio.sungsin1030.workers.dev/corp/) |

[목록 화면](https://website-portfolio.sungsin1030.workers.dev)에 세 데모를 모아뒀습니다. 각 데모 하단의
안내 바로 사이트 간을 바로 넘나들 수 있습니다. 휴대폰으로도 열어보세요.

---

## 화면

### 목록

![포트폴리오 목록](docs/screenshots/00-index.png)

### 카페 · 공방 — 라온공방

브랜드 무드가 첫 화면에서 전달되어야 하고, 클래스 일정과 잔여석이 보여야 문의 전화가 줄어듭니다.
인스타그램에서 넘어오는 모바일 방문자가 대부분이라 모바일을 먼저 만들었습니다.

| 메인 | 클래스 일정 | 예약 문의 |
|---|---|---|
| ![](docs/screenshots/01-cafe-home.png) | ![](docs/screenshots/02-cafe-classes.png) | ![](docs/screenshots/03-cafe-contact.png) |

### 병원 · 클리닉 — 바른솔 정형외과의원

진료과목과 의료진을 빠르게 찾게 하고, 전화 대신 온라인 예약으로 응대 부담을 줄이는 구조입니다.
비급여 진료비용은 의료법상 고지 항목이라 표로 넣었습니다.

| 메인 | 의료진 | 온라인 예약 |
|---|---|---|
| ![](docs/screenshots/05-clinic-home.png) | ![](docs/screenshots/06-clinic-doctors.png) | ![](docs/screenshots/07-clinic-reserve.png) |

### 기업 · 스타트업 — Hyperlane

투자자·고객사·지원자가 같은 사이트를 봅니다. 지표와 도입 절차로 신뢰를 만들고,
한국어 / 영어 전환을 넣었습니다.

| 메인 | 채용 | 영어 전환 |
|---|---|---|
| ![](docs/screenshots/09-corp-home.png) | ![](docs/screenshots/10-corp-careers.png) | ![](docs/screenshots/13-corp-en.png) |

### 모바일

| 라온공방 | 바른솔 정형외과 | Hyperlane | 메뉴 열림 |
|---|---|---|---|
| ![](docs/screenshots/04-cafe-mobile.png) | ![](docs/screenshots/08-clinic-mobile.png) | ![](docs/screenshots/12-corp-mobile.png) | ![](docs/screenshots/14-mobile-nav.png) |

---

## 이 프로젝트에서 신경 쓴 것

**업종별 테마를 CSS 변수로 갈아끼웁니다.** 색·폰트를 `--color-brand` 같은 토큰으로 두고
`.theme-cafe` / `.theme-clinic` / `.theme-corp` 에서 값만 덮어씁니다. 컴포넌트는 한 벌로 세 사이트를 그립니다.
Tailwind 4 에서는 `@theme inline` 을 쓰면 값이 유틸리티에 박혀 이 방식이 안 되므로 일반 `@theme` 을 씁니다.

**사진 없이 만들었습니다.** 스톡 사진을 끌어다 쓰면 라이선스가 걸리고, 회색 박스를 두면 데모가 죽습니다.
그래서 직접 그린 SVG 도형으로 무드만 잡아뒀습니다. 실제 납품에서는 그 자리에 촬영본이 들어갑니다.

**폼이 진짜로 검증합니다.** 필수값·연락처·이메일 형식을 확인하고, 개인정보 수집·이용 동의를
받지 않으면 제출되지 않습니다. 전송할 서버가 없다는 사실은 완료 화면에 그대로 적어뒀습니다.

**동작을 눈으로만 확인하지 않았습니다.** 모바일 메뉴, 아코디언, 폼 검증, 언어 전환, 마감 처리를
Playwright 로 확인합니다 (`npm run check`, 8건). 캡처만 믿으면 "보이기는 하는데 눌리지 않는" 상태를 놓칩니다.

**접근성을 챙겼습니다.** 스크롤 등장 효과는 `prefers-reduced-motion` 에서 꺼지고,
동의 체크박스는 긴 문단이 접근성 이름이 되지 않도록 `aria-label` 과 `aria-describedby` 로 나눴습니다.

---

## 구조

```
src/
├─ app/
│  ├─ page.tsx           목록 화면
│  ├─ cafe/              라온공방  (메인 · 클래스 일정 · 예약)
│  ├─ clinic/            바른솔    (메인 · 의료진 · 온라인 예약)
│  └─ corp/              Hyperlane (메인 · 채용 · 도입 문의)
│     ├─ LangContext.tsx 한/영 전환
│     └─ CorpShell.tsx   언어를 따르는 헤더·푸터
├─ components/ui/        세 사이트가 공유하는 프리미티브
└─ lib/                  업종별 콘텐츠 데이터
scripts/
├─ shots.mjs             스크린샷 생성
└─ check.mjs             상호작용 검증
```

<details>
<summary><b>실행 방법</b></summary>

```bash
npm install
npm run dev          # http://localhost:3000
```

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 (11개 페이지 전부 정적 생성) |
| `npm run start` | 빌드 결과 실행 |
| `npm run export` | 정적 파일 내보내기 (`out/`) |
| `npm run serve:out` | 내보낸 정적 파일 확인 (3200) |
| `npm run check` | 상호작용 검증 (서버가 떠 있어야 함) |
| `npm run shots` | 스크린샷 재생성 |

`check` 와 `shots` 는 시스템에 설치된 Chrome 을 사용합니다. 대상을 바꾸려면
`BASE_URL` 을 줍니다 — 배포된 사이트에도 그대로 돌아갑니다.

```bash
BASE_URL=https://website-portfolio.sungsin1030.workers.dev npm run check
```

</details>

<details>
<summary><b>배포</b></summary>

Cloudflare Workers 정적 자산으로 배포합니다. GitHub 저장소를 연결해 두어
`main` 에 push 하면 자동 배포됩니다.

| 설정 | 값 |
|---|---|
| Build command | `NEXT_EXPORT=1 npm run build` |
| Deploy command | `npx wrangler deploy` |
| 자산 디렉터리 | `out` (`wrangler.jsonc`) |

서버 코드가 없어 요청이 전부 정적 파일로 처리됩니다. Worker 스크립트가
실행되지 않으므로 요청 한도와 무관합니다.

정적 내보내기에서는 `trailingSlash` 를 켭니다. 기본 내보내기는
`out/cafe.html` 을 만드는데 호스트마다 `/cafe` 를 그 파일로 이어줄지가
달라서(GitHub Pages 는 404), 켜두면 `out/cafe/index.html` 이 되어 어느
정적 호스트에서든 동작합니다.

`/_next/static/*` 의 장기 캐시 헤더는 `public/_headers` 에서 붙입니다.
Next.js 자체 서버가 붙여주던 것이라 정적 내보내기에서는 직접 넣어야 합니다.

</details>

<details>
<summary><b>검증 항목</b></summary>

```
ok  모바일 햄버거 메뉴가 열리고 링크가 눌린다
ok  FAQ 아코디언이 열리고 닫힌다
ok  빈 폼 제출이 막히고 오류가 표시된다
ok  잘못된 연락처 형식이 걸러진다
ok  올바르게 채우면 완료 화면이 나온다
ok  언어 전환이 본문에 반영되고 새로고침 후에도 유지된다
ok  마감된 시간대는 예약 버튼이 눌리지 않는다
ok  데모 안내 바로 사이트 간 이동이 된다

8/8 통과
```

</details>

<details>
<summary><b>데모에 없는 것</b></summary>

납품 시 붙이는 것들이며, 데모 단계에서 뺀 이유를 적어둡니다.

- **지도** — 카카오맵/네이버지도 SDK 는 도메인 등록과 앱 키가 필요합니다. SVG 약도로 자리만 잡아뒀습니다.
- **폼 수신** — 메일 발송이나 관리자 화면 저장이 들어갈 자리입니다. 데모에는 받는 쪽이 없습니다.
- **사진** — 위 "신경 쓴 것" 참고.
- **검색 노출(SEO)** — 데모 세 개는 `robots: noindex` 로 막아뒀습니다. 가상 의료기관이
  검색에 걸리면 실제 환자가 오해합니다. 목록 화면만 색인을 허용합니다.
- **클래스 잔여석** — 날짜·시간대에서 계산하는 고정 규칙입니다. 실제 예약 시스템은
  [원데이클래스 예약·결제 시스템](https://github.com/DevSung/oneday-class-booking)에서 별도로 구현했습니다.

</details>

---

## 고지

데모에 등장하는 브랜드명·의료진·주소·연락처·회사명·수치는 **모두 가상**이며 실제 사업자와 무관합니다.

의료 관련 화면(`/clinic`)의 문구는 치료효과 보장이나 최상급 표현을 피해 작성했습니다.
실제 의료기관 웹사이트로 사용하려면 의료법 제56조에 따른 사전심의 대상 여부 검토와
**전문가 확인을 권장합니다.** 비급여 진료비용은 예시 금액이며 실제 금액은 의료기관이 확정해야 합니다.

이 저장소의 코드와 문서는 Claude Code와 함께 작성했습니다.
