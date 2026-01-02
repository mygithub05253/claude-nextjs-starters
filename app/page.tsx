import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight, Code2, Zap, Shield, BarChart3, Smartphone, ExternalLink, Table, Layers, Grid } from 'lucide-react';
import Link from 'next/link';

/**
 * 홈 페이지 - Next.js Starter Kit 소개 페이지
 * 기술 스택, 주요 기능, 시작 가이드를 제공합니다
 */
export default function Home() {
  const techStack = [
    { name: 'Next.js 15', description: 'App Router 포함', icon: Code2 },
    { name: 'TypeScript', description: '타입 안전성', icon: Shield },
    { name: 'Tailwind CSS', description: '반응형 디자인', icon: Smartphone },
    { name: 'shadcn/ui', description: '재사용 가능한 컴포넌트', icon: BarChart3 },
  ];

  const features = [
    {
      title: '현대적인 스택',
      description: 'Next.js 15, TypeScript, Tailwind CSS, shadcn/ui를 기반으로 구축되었습니다.',
    },
    {
      title: '반응형 디자인',
      description: '모바일, 태블릿, 데스크톱 모든 기기에 최적화되어 있습니다.',
    },
    {
      title: '다크 모드',
      description: 'Theme Provider를 통해 라이트/다크 모드를 지원합니다.',
    },
    {
      title: '타입 안전성',
      description: 'TypeScript Strict Mode로 안전한 개발을 보장합니다.',
    },
    {
      title: 'UI 컴포넌트',
      description: '200개 이상의 shadcn/ui 컴포넌트를 즉시 사용할 수 있습니다.',
    },
    {
      title: '폼 유효성 검사',
      description: 'React Hook Form과 Zod를 통한 강력한 폼 처리를 제공합니다.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* 헤더 */}
      <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">Next.js Starter Kit</div>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 dark:text-slate-400">
              기능
            </a>
            <a href="#tech-stack" className="text-slate-600 hover:text-slate-900 dark:text-slate-400">
              기술 스택
            </a>
            <a href="#examples" className="text-slate-600 hover:text-slate-900 dark:text-slate-400">
              예제
            </a>
          </nav>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <Badge className="mb-4 mx-auto">Next.js 15 + TypeScript + Tailwind CSS</Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          현대적인 웹 애플리케이션을 <br />
          빠르게 시작하세요
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          프로덕션 준비가 완료된 Next.js 스타터킷으로 개발 시간을 단축하고, 최신 기술 스택을 경험해보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/components">
            <Button size="lg" className="w-full sm:w-auto">
              컴포넌트 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                문서 읽기
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>기술 스택 문서</DialogTitle>
                <DialogDescription>
                  프로젝트에 사용된 기술 스택의 공식 문서를 확인하세요
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Next.js */}
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">Next.js 15</h3>
                    <p className="text-sm text-muted-foreground">App Router, Server Components</p>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </a>

                {/* TypeScript */}
                <a
                  href="https://www.typescriptlang.org/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">TypeScript</h3>
                    <p className="text-sm text-muted-foreground">타입 안전성</p>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </a>

                {/* Tailwind CSS */}
                <a
                  href="https://tailwindcss.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">Tailwind CSS 4</h3>
                    <p className="text-sm text-muted-foreground">유틸리티 우선 CSS</p>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </a>

                {/* shadcn/ui */}
                <a
                  href="https://ui.shadcn.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">shadcn/ui</h3>
                    <p className="text-sm text-muted-foreground">재사용 가능한 컴포넌트</p>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </a>

                {/* React Hook Form */}
                <a
                  href="https://react-hook-form.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">React Hook Form</h3>
                    <p className="text-sm text-muted-foreground">폼 유효성 검사</p>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </a>

                {/* Zod */}
                <a
                  href="https://zod.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">Zod</h3>
                    <p className="text-sm text-muted-foreground">스키마 검증</p>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section id="tech-stack" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">기술 스택</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <Card key={tech.name}>
                  <CardHeader className="pb-3">
                    <Icon className="w-8 h-8 mb-2 text-blue-600" />
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{tech.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 주요 기능 섹션 */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 예제 섹션 */}
      <section id="examples" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">예제 및 가이드</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 컴포넌트 쇼케이스 */}
            <Link href="/components">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    컴포넌트 쇼케이스
                  </CardTitle>
                  <CardDescription>
                    Button, Card, Form 등 모든 UI 컴포넌트를 확인해보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    shadcn/ui 컴포넌트의 사용법과 다양한 예제를 제공합니다.
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* 폼 예제 */}
            <Link href="/form-example">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    폼 예제
                  </CardTitle>
                  <CardDescription>
                    React Hook Form과 Zod를 활용한 폼 유효성 검사를 배워보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    실시간 유효성 검사와 에러 처리 패턴을 확인할 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* 테이블 예제 */}
            <Link href="/table-example">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Table className="w-5 h-5" />
                    테이블 예제
                  </CardTitle>
                  <CardDescription>
                    데이터 테이블의 검색, 정렬, 필터링 기능을 배워보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    shadcn/ui Table 컴포넌트를 활용한 데이터 표시 패턴을 제공합니다.
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* 다이얼로그 예제 */}
            <Link href="/dialog-example">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    다이얼로그 예제
                  </CardTitle>
                  <CardDescription>
                    Dialog와 AlertDialog 컴포넌트의 다양한 활용법을 배워보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    모달, 폼, 확인 다이얼로그 등 실무 패턴을 확인할 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* 그리드 예제 */}
            <Link href="/grid-example">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Grid className="w-5 h-5" />
                    그리드 예제
                  </CardTitle>
                  <CardDescription>
                    반응형 카드 그리드 레이아웃과 제품 표시를 배워보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Skeleton 로딩, Hover 효과, Badge 상태 표시 등을 확인할 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">지금 시작해보세요</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            이 스타터킷의 예제들을 탐색하고, 자신의 프로젝트에 맞게 커스터마이징하세요.
          </p>
          <Link href="/components">
            <Button size="lg" className="mx-auto">
              예제 페이지로 이동 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t bg-white dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>Next.js Starter Kit © 2024. 모든 권리 보유.</p>
        </div>
      </footer>
    </main>
  );
}
