import { NavItem, AppConfig } from '@/types';

/**
 * 애플리케이션 설정
 */
export const APP_CONFIG: AppConfig = {
  appName: 'Next.js Starter',
  appDescription: 'Modern web application starter kit with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
};

/**
 * 메인 네비게이션 메뉴 아이템
 * Sidebar에서 사용됩니다
 * 참고: (dashboard) 라우트 그룹은 URL에 포함되지 않으므로 경로에서 제외
 */
export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: '홈',
    href: '/',
    icon: 'Home',
  },
  {
    title: '컴포넌트',
    href: '/components',
    icon: 'Code2',
  },
  {
    title: '폼 예제',
    href: '/form-example',
    icon: 'FileText',
  },
  {
    title: '테이블 예제',
    href: '/table-example',
    icon: 'Table',
  },
  {
    title: '다이얼로그 예제',
    href: '/dialog-example',
    icon: 'Layers',
  },
  {
    title: '그리드 예제',
    href: '/grid-example',
    icon: 'Grid',
  },
];

/**
 * 사이드바 축소/확장 너비 설정 (Tailwind)
 */
export const SIDEBAR_WIDTH = {
  FULL: 'w-64',      // 펼쳐진 상태: 16rem (256px)
  COLLAPSED: 'w-20', // 축소된 상태: 5rem (80px)
};

/**
 * 반응형 브레이크포인트 (tailwind 기반)
 */
export const BREAKPOINTS = {
  MOBILE: '(max-width: 768px)',
  TABLET: '(max-width: 1024px)',
  DESKTOP: '(min-width: 1024px)',
};

/**
 * 사이트 메타데이터
 */
export const SITE_METADATA = {
  title: APP_CONFIG.appName,
  description: APP_CONFIG.appDescription,
  keywords: ['nextjs', 'tailwindcss', 'shadcn', 'starter', 'typescript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: APP_CONFIG.baseUrl,
    siteName: APP_CONFIG.appName,
    title: APP_CONFIG.appName,
    description: APP_CONFIG.appDescription,
  },
};
