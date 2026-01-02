'use client';

import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, Search, Copy, CheckCircle2 } from 'lucide-react';
import { useState, useMemo } from 'react';

/**
 * 테이블 예제 페이지
 * shadcn/ui Table을 사용한 데이터 테이블 예제를 제공합니다
 */

// 더미 사용자 데이터
const users = [
  { id: 1, name: '김철수', email: 'chulsu.kim@example.com', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: '이영희', email: 'younghee.lee@example.com', status: 'active', joinDate: '2024-01-20' },
  { id: 3, name: '박민준', email: 'minjun.park@example.com', status: 'inactive', joinDate: '2023-12-10' },
  { id: 4, name: '최서진', email: 'seojin.choi@example.com', status: 'active', joinDate: '2024-02-05' },
  { id: 5, name: '정혜라', email: 'hyera.jung@example.com', status: 'active', joinDate: '2024-02-12' },
  { id: 6, name: '윤재혁', email: 'jaehyuk.yoon@example.com', status: 'inactive', joinDate: '2023-11-30' },
  { id: 7, name: '송민호', email: 'minho.song@example.com', status: 'active', joinDate: '2024-01-08' },
  { id: 8, name: '한지은', email: 'jieun.han@example.com', status: 'pending', joinDate: '2024-02-20' },
];

type SortKey = 'name' | 'email' | 'joinDate';
type SortOrder = 'asc' | 'desc';

// 테이블 컴포넌트 코드 예제
const tableCodeExample = `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function TableDemo() {
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // 정렬 토글 함수
  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* 데이터 행 */}
      </TableBody>
    </Table>
  );
}`;

export default function TableExamplePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [copied, setCopied] = useState<string | null>(null);

  // 코드 복사 함수
  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // 정렬 토글 함수
  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // 필터링 및 정렬된 데이터
  const filteredAndSortedUsers = useMemo(() => {
    // 검색어로 필터링
    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 정렬
    filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      let comparison = 0;
      if (aValue < bValue) {
        comparison = -1;
      } else if (aValue > bValue) {
        comparison = 1;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [searchTerm, sortKey, sortOrder]);

  // 상태별 배지 색상
  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      active: 'default',
      inactive: 'secondary',
      pending: 'outline',
    };
    const labels: Record<string, string> = {
      active: '활성',
      inactive: '비활성',
      pending: '대기중',
    };

    return <Badge variant={variants[status] || 'default'}>{labels[status] || status}</Badge>;
  };

  return (
    <Container className="py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">테이블 예제</h1>
        <p className="mt-2 text-muted-foreground">
          shadcn/ui Table을 활용한 데이터 테이블 예제를 확인해보세요. 검색, 정렬 기능을 지원합니다.
        </p>
      </div>

      <Separator className="my-8" />

      {/* 테이블 섹션 */}
      <div className="grid grid-cols-1 gap-6">
        {/* 검색 바 */}
        <Card>
          <CardHeader>
            <CardTitle>사용자 검색</CardTitle>
            <CardDescription>이름 또는 이메일로 사용자를 검색합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="사용자명 또는 이메일 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {filteredAndSortedUsers.length}개의 사용자 ({users.length}명 중)
            </p>
          </CardContent>
        </Card>

        {/* 테이블 및 코드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 테이블 */}
          <Card>
            <CardHeader>
              <CardTitle>사용자 목록</CardTitle>
              <CardDescription>헤더를 클릭하여 정렬할 수 있습니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => toggleSort('name')}
                          className="h-auto p-0 hover:bg-transparent hover:text-foreground"
                        >
                          이름
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => toggleSort('email')}
                          className="h-auto p-0 hover:bg-transparent hover:text-foreground"
                        >
                          이메일
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => toggleSort('joinDate')}
                          className="h-auto p-0 hover:bg-transparent hover:text-foreground"
                        >
                          가입일
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedUsers.length > 0 ? (
                      filteredAndSortedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell className="text-sm">
                            {new Date(user.joinDate).toLocaleDateString('ko-KR')}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          검색 결과가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* 코드 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>코드</CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyCode(tableCodeExample, 'table')}
              >
                {copied === 'table' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md text-xs overflow-auto max-h-64">
                <code>{tableCodeExample}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* 정보 카드 */}
        <Card>
          <CardHeader>
            <CardTitle>기능 설명</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">🔍 검색</p>
              <p className="text-muted-foreground">사용자명 또는 이메일로 실시간 검색이 가능합니다.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">🔀 정렬</p>
              <p className="text-muted-foreground">테이블 헤더를 클릭하여 해당 열로 정렬할 수 있습니다. (오름차순/내림차순)</p>
            </div>
            <div>
              <p className="font-semibold mb-1">📊 상태 표시</p>
              <p className="text-muted-foreground">Badge 컴포넌트를 사용하여 사용자 상태를 시각화합니다.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">📱 반응형</p>
              <p className="text-muted-foreground">큰 화면에서는 전체 테이블, 작은 화면에서는 수평 스크롤을 지원합니다.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
