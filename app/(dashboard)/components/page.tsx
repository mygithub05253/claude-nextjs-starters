'use client';

import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import { useState } from 'react';

/**
 * 컴포넌트 쇼케이스 페이지
 * shadcn/ui의 주요 컴포넌트들의 사용 예제를 제공합니다
 */
export default function ComponentsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const components = [
    {
      id: 'buttons',
      name: 'Button',
      description: '다양한 크기와 상태의 버튼 컴포넌트',
      code: `import { Button } from '@/components/ui/button';

export function ButtonDemo() {
  return (
    <>
      <Button>기본 버튼</Button>
      <Button variant="outline">아웃라인</Button>
      <Button variant="ghost">유령</Button>
      <Button disabled>비활성화</Button>
    </>
  );
}`,
    },
    {
      id: 'cards',
      name: 'Card',
      description: '정보를 그룹화하는 카드 컴포넌트',
      code: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드 설명</CardDescription>
      </CardHeader>
      <CardContent>
        <p>카드 내용입니다.</p>
      </CardContent>
    </Card>
  );
}`,
    },
    {
      id: 'badges',
      name: 'Badge',
      description: '상태와 카테고리를 표시하는 배지',
      code: `import { Badge } from '@/components/ui/badge';

export function BadgeDemo() {
  return (
    <>
      <Badge>기본</Badge>
      <Badge variant="secondary">보조</Badge>
      <Badge variant="outline">아웃라인</Badge>
      <Badge variant="destructive">삭제</Badge>
    </>
  );
}`,
    },
    {
      id: 'inputs',
      name: 'Input & Label',
      description: '입력 필드와 라벨 컴포넌트',
      code: `import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function InputDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">이메일</Label>
      <Input id="email" type="email" placeholder="example@example.com" />
    </div>
  );
}`,
    },
    {
      id: 'selects',
      name: 'Select',
      description: '드롭다운 선택 컴포넌트',
      code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="선택해주세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  );
}`,
    },
  ];

  return (
    <Container className="py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">컴포넌트 쇼케이스</h1>
        <p className="mt-2 text-muted-foreground">
          shadcn/ui의 주요 컴포넌트들을 실제로 확인하고, 사용 방법을 배워보세요.
        </p>
      </div>

      <Separator className="my-8" />

      {/* 컴포넌트들 */}
      <div className="space-y-12">
        {/* Button 섹션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Button 컴포넌트</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 예제 */}
            <Card>
              <CardHeader>
                <CardTitle>예제</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>기본 버튼</Button>
                  <Button variant="outline">아웃라인</Button>
                  <Button variant="ghost">유령</Button>
                  <Button disabled>비활성화</Button>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">작음</Button>
                  <Button size="default">기본</Button>
                  <Button size="lg">큼</Button>
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
                  onClick={() => copyCode(components[0].code, 'buttons')}
                >
                  {copied === 'buttons' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md text-xs overflow-auto max-h-48">
                  <code>{components[0].code}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Card 섹션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Card 컴포넌트</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 예제 */}
            <Card>
              <CardHeader>
                <CardTitle>예제</CardTitle>
              </CardHeader>
              <CardContent>
                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">중첩 카드</CardTitle>
                    <CardDescription>카드 컴포넌트의 사용 예제입니다</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Card 컴포넌트는 정보를 그룹화하고 강조하는데 유용합니다.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* 코드 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>코드</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyCode(components[1].code, 'cards')}
                >
                  {copied === 'cards' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md text-xs overflow-auto max-h-48">
                  <code>{components[1].code}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badge 섹션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Badge 컴포넌트</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 예제 */}
            <Card>
              <CardHeader>
                <CardTitle>예제</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>기본</Badge>
                  <Badge variant="secondary">보조</Badge>
                  <Badge variant="outline">아웃라인</Badge>
                  <Badge variant="destructive">삭제</Badge>
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
                  onClick={() => copyCode(components[2].code, 'badges')}
                >
                  {copied === 'badges' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md text-xs overflow-auto max-h-48">
                  <code>{components[2].code}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Input 섹션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Input & Label 컴포넌트</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 예제 */}
            <Card>
              <CardHeader>
                <CardTitle>예제</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username">사용자명</Label>
                  <Input id="username" placeholder="사용자명을 입력하세요" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" type="email" placeholder="email@example.com" className="mt-2" />
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
                  onClick={() => copyCode(components[3].code, 'inputs')}
                >
                  {copied === 'inputs' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md text-xs overflow-auto max-h-48">
                  <code>{components[3].code}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Select 섹션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Select 컴포넌트</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 예제 */}
            <Card>
              <CardHeader>
                <CardTitle>예제</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="select">선택해주세요</Label>
                  <Select>
                    <SelectTrigger id="select" className="mt-2">
                      <SelectValue placeholder="옵션을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">옵션 1</SelectItem>
                      <SelectItem value="option2">옵션 2</SelectItem>
                      <SelectItem value="option3">옵션 3</SelectItem>
                    </SelectContent>
                  </Select>
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
                  onClick={() => copyCode(components[4].code, 'selects')}
                >
                  {copied === 'selects' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md text-xs overflow-auto max-h-48">
                  <code>{components[4].code}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* 정보 섹션 */}
      <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-3">
        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">팁</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            더 많은 컴포넌트는 <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">shadcn/ui 공식 문서</a>에서 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </Container>
  );
}
