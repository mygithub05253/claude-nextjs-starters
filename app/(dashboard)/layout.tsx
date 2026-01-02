import { AppLayout } from '@/components/layout/app-layout';

/**
 * 대시보드 레이아웃
 * /dashboard 라우트 그룹에 AppLayout을 적용합니다
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
