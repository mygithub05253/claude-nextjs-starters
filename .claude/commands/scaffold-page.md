---
description: 'Next.js App Router 규칙에 맞는 페이지 구조를 자동 생성합니다'
allowed-tools:
  [
    'Glob(*)',
    'Read(*)',
    'Write(*)',
    'Bash(ls:*)',
    'Bash(mkdir:*)',
  ]
---

# Claude 명령어: Scaffold Page

Next.js 15 App Router 규칙에 맞는 페이지 구조를 자동으로 생성합니다.

## 사용법

```
/scaffold-page <path> [options]
```

**예시:**
```
/scaffold-page admin/users --template=table
/scaffold-page settings/profile --template=form --with-loading
/scaffold-page dashboard/analytics --with-layout --with-error
/scaffold-page blog/[slug] --template=default
/scaffold-page products/[...slug] --template=default --with-not-found
```

## 매개변수

### 필수
- `<path>`: 페이지 경로
  - 예: `admin/users`, `settings/profile`, `blog/[slug]`
  - 라우트 그룹 이름 제외 (예: `users` 아닌 `admin/users`)

### 선택
- `--template=<type>`: 페이지 템플릿 선택 (기본값: `default`)
  - `default`: 기본 페이지 (Container + 제목 + Separator)
  - `form`: 폼 페이지 (React Hook Form + Zod)
  - `table`: 테이블 페이지 (샘플 데이터 테이블)
  - `dialog`: 다이얼로그 예제 페이지
- `--route-group=<name>`: 라우트 그룹 지정 (기본값: `dashboard`)
  - 예: `--route-group=dashboard`, `--route-group=admin`, `--route-group=none`
- `--with-layout`: `layout.tsx` 생성 (선택)
- `--with-loading`: `loading.tsx` 생성 (선택)
- `--with-error`: `error.tsx` 생성 (선택)
- `--with-not-found`: `not-found.tsx` 생성 (선택)

## 프로세스

### 1. 경로 파싱 및 정규화
- 경로 유효성 검사:
  - 슬래시 제거/정규화 (앞뒤 슬래시 제거, 중복 슬래시 제거)
  - 공백을 하이픈으로 변환
- 동적 파라미터 감지:
  - `[slug]` → 단일 동적 파라미터
  - `[...slug]` → catch-all 라우트
- 라우트 그룹 결정:
  - `--route-group=dashboard` → `app/(dashboard)/<path>`
  - `--route-group=none` → `app/<path>`
  - 기본값: `app/(dashboard)/<path>`

### 2. 파일 존재 확인
- 대상 경로에 이미 `page.tsx`가 있는지 확인
- 있으면 사용자에게 덮어쓰기 확인
- 없으면 새로운 페이지 디렉토리 생성

### 3. 페이지명 생성 (PascalCase)
- 경로를 PascalCase로 변환
  - `"admin/users"` → `"AdminUsers"`
  - `"settings/profile"` → `"SettingsProfile"`
  - `"blog/[slug]"` → `"BlogPost"` (동적 파라미터 제거)
  - `"docs/[...slug]"` → `"DocsPage"`

### 4. 디렉토리 생성
- Bash로 `mkdir -p` 실행
- 최종 경로: `app/(dashboard)/<path>/`

### 5. 템플릿 선택 및 코드 생성
- `--template` 옵션에 따라 적절한 템플릿 선택
- 동적 파라미터가 있으면 `params: Promise<{...}>` 구문 적용 (Next.js 15+)

### 6. 추가 파일 생성 (선택)
- `--with-layout` → `layout.tsx`
- `--with-loading` → `loading.tsx` (Skeleton 포함)
- `--with-error` → `error.tsx` (에러 경계)
- `--with-not-found` → `not-found.tsx` (404 페이지)

### 7. 결과 출력
- 생성된 파일 목록 출력
- 접근 URL 표시 (예: `http://localhost:3000/admin/users`)

## 템플릿 구조

### 템플릿 1: Default Template (정적 페이지)

```typescript
import { Container } from '@/components/layout/container';
import { Separator } from '@/components/ui/separator';

/**
 * <PageName> 페이지
 */
export default function <PageName>Page() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight"><PageTitle></h1>
        <p className="mt-2 text-muted-foreground">
          페이지 설명을 여기에 추가하세요.
        </p>
      </div>

      <Separator className="my-8" />

      <div>
        {/* 콘텐츠를 여기에 추가하세요 */}
      </div>
    </Container>
  );
}
```

### 템플릿 2: Default Template (동적 페이지 - Promise params)

```typescript
import { Container } from '@/components/layout/container';
import { Separator } from '@/components/ui/separator';

/**
 * <PageName> 상세 페이지
 */
export default async function <PageName>Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <PageTitle>: {slug}
        </h1>
        <p className="mt-2 text-muted-foreground">
          동적 페이지 내용을 여기에 추가하세요.
        </p>
      </div>

      <Separator className="my-8" />

      <div>
        {/* 콘텐츠를 여기에 추가하세요 */}
      </div>
    </Container>
  );
}
```

### 템플릿 3: Form Template

```typescript
'use client';

import { Container } from '@/components/layout/container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * <PageName> 폼 페이지
 * React Hook Form과 Zod를 사용한 폼 유효성 검사 예제
 */

// Zod 스키마 정의
const formSchema = z.object({
  // TODO: 필드를 여기에 추가하세요
  example: z.string().min(1, '필수 입력 항목입니다'),
});

type FormData = z.infer<typeof formSchema>;

export default function <PageName>Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // TODO: 폼 제출 로직 구현
  };

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight"><PageTitle></h1>
        <p className="mt-2 text-muted-foreground">
          폼을 작성하고 제출하세요.
        </p>
      </div>

      <Separator className="my-8" />

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>폼 제목</CardTitle>
          <CardDescription>폼 설명을 여기에 추가하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* TODO: 폼 필드를 여기에 추가하세요 */}
            <div className="space-y-2">
              <Label htmlFor="example">예시 필드</Label>
              <Input
                id="example"
                placeholder="입력하세요"
                {...register('example')}
              />
              {errors.example && (
                <p className="text-sm text-red-500">{errors.example.message}</p>
              )}
            </div>

            <Button type="submit">제출</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
```

### 템플릿 4: Table Template

```typescript
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

/**
 * <PageName> 페이지
 * 테이블 컴포넌트 예제
 */

// 샘플 데이터 타입
interface DataItem {
  id: string;
  name: string;
  // TODO: 필드를 추가하세요
}

// 샘플 데이터
const sampleData: DataItem[] = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  // TODO: 실제 데이터로 교체
];

export default function <PageName>Page() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight"><PageTitle></h1>
        <p className="mt-2 text-muted-foreground">
          데이터 목록을 확인하세요.
        </p>
      </div>

      <Separator className="my-8" />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>이름</TableHead>
              {/* TODO: 컬럼을 추가하세요 */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                {/* TODO: 셀을 추가하세요 */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
```

### 추가 파일: Layout Template

```typescript
/**
 * <PageName> 레이아웃
 */
export default function <PageName>Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* TODO: 레이아웃 커스터마이징 */}
      {children}
    </div>
  );
}
```

### 추가 파일: Loading Template

```typescript
import { Container } from '@/components/layout/container';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * <PageName> 로딩 상태
 */
export default function Loading() {
  return (
    <Container className="py-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-96" />
        <Skeleton className="h-64 w-full mt-8" />
      </div>
    </Container>
  );
}
```

### 추가 파일: Error Template

```typescript
'use client';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

/**
 * <PageName> 에러 처리
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">문제가 발생했습니다</h2>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <Button onClick={reset}>다시 시도</Button>
      </div>
    </Container>
  );
}
```

### 추가 파일: Not Found Template

```typescript
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

/**
 * <PageName> 404 페이지
 */
export default function NotFound() {
  return (
    <Container className="py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FileQuestion className="h-16 w-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">페이지를 찾을 수 없습니다</h2>
        <p className="text-muted-foreground mb-6">
          요청한 페이지가 존재하지 않습니다.
        </p>
        <Link href="/">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    </Container>
  );
}
```

## 경로 변환 규칙

| 입력 | 라우트 그룹 | 최종 경로 | 접근 URL |
|------|----------|---------|---------|
| `users` | `dashboard` | `app/(dashboard)/users/` | `/users` |
| `admin/users` | `dashboard` | `app/(dashboard)/admin/users/` | `/admin/users` |
| `settings/profile` | `dashboard` | `app/(dashboard)/settings/profile/` | `/settings/profile` |
| `blog/[slug]` | `dashboard` | `app/(dashboard)/blog/[slug]/` | `/blog/[slug]` |
| `docs/[...slug]` | `dashboard` | `app/(dashboard)/docs/[...slug]/` | `/docs/[...slug]` |
| `about` | `none` | `app/about/` | `/about` |

## 파일 생성 목록

### 필수 생성
- ✅ `page.tsx` - 페이지 컴포넌트

### 선택 생성
- 🔧 `layout.tsx` - 레이아웃 (--with-layout)
- ⏳ `loading.tsx` - 로딩 상태 (--with-loading)
- ⚠️ `error.tsx` - 에러 경계 (--with-error)
- 🚫 `not-found.tsx` - 404 페이지 (--with-not-found)

## 사용 예시

### 예시 1: 기본 정적 페이지
```
/scaffold-page about --template=default
```
**결과:**
```
✅ 페이지 생성 완료!

📁 생성된 파일:
  - app/(dashboard)/about/page.tsx

🌐 접근 URL: http://localhost:3000/about
```

### 예시 2: 폼 페이지 + 로딩
```
/scaffold-page contact --template=form --with-loading
```
**결과:**
```
✅ 페이지 생성 완료!

📁 생성된 파일:
  - app/(dashboard)/contact/page.tsx
  - app/(dashboard)/contact/loading.tsx

🌐 접근 URL: http://localhost:3000/contact
```

### 예시 3: 테이블 페이지 + 에러 처리
```
/scaffold-page admin/users --template=table --with-error
```
**결과:**
```
✅ 페이지 생성 완료!

📁 생성된 파일:
  - app/(dashboard)/admin/users/page.tsx
  - app/(dashboard)/admin/users/error.tsx

🌐 접근 URL: http://localhost:3000/admin/users
```

### 예시 4: 동적 라우트 (단일 파라미터)
```
/scaffold-page blog/[slug] --template=default
```
**결과:**
```
✅ 페이지 생성 완료!

📁 생성된 파일:
  - app/(dashboard)/blog/[slug]/page.tsx

💡 동적 파라미터: slug (Promise<{ slug: string }>)

🌐 접근 URL: http://localhost:3000/blog/[slug]
```

### 예시 5: Catch-all 라우트
```
/scaffold-page docs/[...slug] --template=default
```
**결과:**
```
✅ 페이지 생성 완료!

📁 생성된 파일:
  - app/(dashboard)/docs/[...slug]/page.tsx

💡 동적 파라미터: slug (Promise<{ slug: string[] }>)

🌐 접근 URL: http://localhost:3000/docs/[...slug]
```

### 예시 6: 중첩 경로 + 모든 옵션
```
/scaffold-page settings/profile --template=form --with-layout --with-loading --with-error
```
**결과:**
```
✅ 페이지 생성 완료!

📁 생성된 파일:
  - app/(dashboard)/settings/profile/page.tsx
  - app/(dashboard)/settings/profile/layout.tsx
  - app/(dashboard)/settings/profile/loading.tsx
  - app/(dashboard)/settings/profile/error.tsx

🌐 접근 URL: http://localhost:3000/settings/profile
```

### 예시 7: 라우트 그룹 변경
```
/scaffold-page auth/login --template=form --route-group=none
```
**결과:**
```
✅ 페이지 생성 완료!

📁 생성된 파일:
  - app/auth/login/page.tsx (라우트 그룹 없음)

🌐 접근 URL: http://localhost:3000/auth/login
```

## 에러 처리

### 1. 페이지 이미 존재
```
⚠️  파일이 이미 존재합니다: app/(dashboard)/users/page.tsx

덮어쓸까요? (y/n/backup)
- y: 기존 파일 덮어쓰기
- n: 취소
- backup: 백업 후 덮어쓰기
```

### 2. 잘못된 경로
```
❌ 에러: 특수문자가 포함되어 있습니다: admin@users

사용 가능한 문자: 영문, 숫자, 하이픈(-), 슬래시(/)
제안: admin-users
```

### 3. 공백 포함
```
❌ 에러: 경로에 공백이 포함되어 있습니다: admin users

자동 변환: admin-users
명령어: /scaffold-page admin-users --template=default
```

### 4. 라우트 그룹이 없음
```
⚠️  라우트 그룹 (dashboard)가 존재하지 않습니다.

생성할까요? (y/n)
- y: 폴더 생성 후 페이지 생성
- n: 취소
```

### 5. 템플릿이 없음
```
⚠️  알 수 없는 템플릿: dialog

사용 가능한 템플릿:
- default
- form
- table
- dialog

기본 템플릿으로 생성합니다.
```

## 참고사항

- **Next.js 15+ 필수**: 동적 파라미터는 `Promise` 구문 사용
- **Server Component 우선**: 모든 페이지는 기본 Server Component
- **클라이언트 로직**: Form, Dialog, Error 템플릿은 `'use client'` 포함
- **Container + Separator 패턴**: 모든 페이지는 통일된 레이아웃 구조
- **한국어 주석**: JSDoc 주석은 한국어로 작성
- **TODO 주석**: 수정 필요한 부분은 `TODO` 마크로 표시
- **2 spaces 들여쓰기**: 프로젝트 컨벤션 준수

## 다음 단계

페이지 생성 후:
1. 생성된 파일 열기
2. TODO 주석 확인 및 완료
3. 실제 데이터 또는 로직 추가
4. `/npm run dev` 실행하여 확인
5. 필요시 `layout.tsx`, `loading.tsx` 등 추가 커스터마이징

## 빠른 시작

최소한의 코드로 시작:
```
/scaffold-page quick-start --template=default
```

상세한 예제:
```
/scaffold-page example --template=form --with-loading --with-error
```
