/**
 * 네비게이션 메뉴 아이템 타입
 */
export interface NavItem {
  /** 메뉴 제목 */
  title: string;
  /** 라우트 경로 */
  href: string;
  /** 아이콘 컴포넌트명 (lucide-react) */
  icon?: string;
  /** 자식 메뉴 아이템 */
  items?: NavItem[];
  /** 활성 상태 */
  active?: boolean;
}

/**
 * 사용자 정보 타입
 * 추후 백엔드 연동 시 확장 필요
 */
export interface User {
  /** 사용자 ID */
  id: string;
  /** 사용자명 */
  name: string;
  /** 이메일 */
  email: string;
  /** 프로필 이미지 URL */
  image?: string;
  /** 역할 */
  role?: 'admin' | 'user' | 'guest';
}

/**
 * 애플리케이션 설정 타입
 */
export interface AppConfig {
  /** 앱 이름 */
  appName: string;
  /** 앱 설명 */
  appDescription: string;
  /** 기본 URL */
  baseUrl: string;
}

/**
 * UI 상태 타입
 */
export interface UIState {
  /** 사이드바 열림/닫힘 상태 */
  sidebarOpen: boolean;
  /** 모바일 메뉴 열림/닫힘 상태 */
  mobileMenuOpen: boolean;
}
