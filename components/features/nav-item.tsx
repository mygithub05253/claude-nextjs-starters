'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem as NavItemType } from '@/types';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface NavItemProps extends NavItemType {
  /** 사이드바 축소 여부 */
  collapsed?: boolean;
}

/**
 * 네비게이션 아이템 컴포넌트
 * Sidebar에서 메뉴 아이템을 렌더링합니다
 */
export function NavItem({
  title,
  href,
  icon,
  collapsed = false,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  // lucide-react에서 아이콘 가져오기
  const IconComponent = icon
    ? (Icons[icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>)
    : null;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        collapsed && 'justify-center'
      )}
      title={collapsed ? title : undefined}
    >
      {IconComponent && <IconComponent className="h-5 w-5 flex-shrink-0" />}
      {!collapsed && <span>{title}</span>}
    </Link>
  );
}
