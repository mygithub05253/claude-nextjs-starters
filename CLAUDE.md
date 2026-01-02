# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 15 (App Router) 기반의 풀스택 웹 애플리케이션 스타터 템플릿입니다. shadcn/ui 컴포넌트와 Tailwind CSS를 활용한 모던한 UI 구현을 위한 예제를 포함합니다.

## 개발 환경 및 명령어

### 주요 명령어
- **개발 서버**: `npm run dev` (http://localhost:3000)
- **프로덕션 빌드**: `npm run build`
- **빌드 결과 실행**: `npm start`
- **린트 검사**: `npm run lint`
- **Playwright MCP**: `npm run mcp:playwright`

### 빌드 및 타입 체크
- Next.js는 빌드 시 자동으로 TypeScript 타입 검사를 수행합니다
- `npm run build` 실패 → TypeScript 에러가 있으므로 수정 필요

## 아키텍처 및 디렉토리 구조

### 루트 레벨 구조
```
claude-nextjs-starters/
├── app/                    # Next.js App Router (Server Components 기본)
│   ├── layout.tsx         # 루트 레이아웃 (테마 및 토스터 통합)
│   ├── page.tsx           # 홈페이지
│   └── (dashboard)/       # 라우트 그룹 - 대시보드 섹션
│       ├── layout.tsx     # 대시보드 레이아웃 (사이드바, 네비게이션)
│       ├── components/    # 컴포넌트 라이브러리 페이지
│       ├── form-example/  # React Hook Form + Zod 예제
│       ├── table-example/ # 테이블 컴포넌트 예제
│       ├── dialog-example/# 다이얼로그 컴포넌트 예제
│       └── grid-example/  # 그리드 레이아웃 예제
├── components/            # shadcn/ui 기본 컴포넌트
├── lib/                   # 유틸리티 함수
├── node_modules/          # 의존성
├── public/                # 정적 자산 (이미지, 폰트 등)
└── package.json           # 프로젝트 메타데이터 및 스크립트

```

### 핵심 기술 스택

**프론트엔드:**
- **Framework**: Next.js 16.1.1 (App Router, Server Components 우선)
- **UI Library**: shadcn/ui + Radix UI (접근성 기본 제공)
- **Styling**: Tailwind CSS v4 + Tailwind Merge
- **상태관리**: Zustand
- **폼 처리**: React Hook Form + Zod (유효성 검사)
- **알림**: Sonner (토스트 알림)
- **테마**: next-themes (라이트/다크 모드)
- **아이콘**: Lucide React
- **유틸리티**: usehooks-ts, date-fns, clsx, class-variance-authority

**개발:**
- **언어**: TypeScript (Strict Mode)
- **린팅**: ESLint 9
- **Node**: 20+

## 개발 패턴 및 주의사항

### App Router 및 Server Component 원칙
1. **모든 컴포넌트는 기본적으로 Server Component**입니다
   - 클라이언트 전용 기능(상태, 이벤트 핸들러 등)이 필요하면 `'use client'` 지시어 추가
   - 예: 폼, 토스터, 다이얼로그 등의 인터랙션

2. **폴더 구조**
   - `(dashboard)` 같은 괄호 표기는 라우트 그룹으로, URL에 영향을 주지 않음
   - 예: `/app/(dashboard)/form-example/page.tsx` → `http://localhost:3000/form-example`

### Tailwind CSS + shadcn/ui
- shadcn/ui 컴포넌트는 `components/ui/` 폴더에 위치
- Tailwind의 class 충돌 방지를 위해 `cn()` 유틸리티 사용
  ```typescript
  import { cn } from '@/lib/utils';

  className={cn("base-class", condition && "conditional-class")}
  ```

### 폼 및 유효성 검사
- React Hook Form + Zod 조합 사용
- Zod 스키마 먼저 정의 → React Hook Form에서 resolver로 활용
- 예제는 `app/(dashboard)/form-example/page.tsx` 참고

### 테마 구현
- `next-themes` 라이브러리로 라이트/다크 모드 관리
- 루트 레이아웃(`app/layout.tsx`)에서 ThemeProvider 및 기본 설정 필수

### 상태 관리 (Zustand)
- 복잡한 전역 상태가 필요한 경우에만 사용
- 간단한 로컬 상태는 `useState` 선호

## 코딩 스타일

### 명명 규칙
- 변수/함수: `camelCase`
- 컴포넌트/타입: `PascalCase`
- 상수: `UPPER_SNAKE_CASE` (필요시)

### 코드 주석
- 복잡한 비즈니스 로직에 **한국어 주석** 추가
- shadcn/ui 컴포넌트 사용 시 코드는 명확한 편이므로 과도한 주석 불필요

### 타입 정의
- `tsconfig.json`의 `paths` 설정으로 `@/*` 경로 앨리어스 사용
- 복잡한 타입은 별도 파일 분리 권장

## 일반적인 개발 패턴

### 새로운 페이지 추가 (예: `/my-page`)
```
app/(dashboard)/my-page/page.tsx  # 페이지 컴포넌트 작성
```

### 새로운 컴포넌트 추가
- shadcn/ui 재사용 가능: `components/ui/` 에서 사용
- 프로젝트 특화: `components/custom/` 또는 각 페이지의 `components/` 폴더
- 원자 설계(Atomic Design) 지향 또는 기능별 분리

### 디버깅
- 브라우저 개발자 도구의 Network/Console 탭 활용
- Server Component는 서버 콘솔에서 로그 확인
- Client Component는 브라우저 콘솔에서 로그 확인

## 배포 및 최적화

- **정적 생성**: 가능한 모든 페이지를 정적 생성(ISG)하도록 설계
- **이미지 최적화**: `<Image />` 컴포넌트 사용 필수
- **번들 크기**: Vercel Analytics로 모니터링 가능
- **배포**: Vercel 플랫폼 추천 (Next.js 최적화 제공)

