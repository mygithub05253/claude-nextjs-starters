---
description: 'shadcn/ui 스타일의 새 컴포넌트 보일러플레이트를 자동 생성합니다'
allowed-tools:
  [
    'Glob(*)',
    'Read(*)',
    'Write(*)',
    'Bash(ls:*)',
    'Bash(mkdir:*)',
  ]
---

# Claude 명령어: Add Component

shadcn/ui 스타일의 재사용 가능한 컴포넌트 보일러플레이트를 자동 생성합니다.

## 사용법

```
/add-component <ComponentName> [type] [options]
```

**예시:**
```
/add-component Button client --variants
/add-component CustomCard server --path=components/custom
/add-component DataTable client --path=app/(dashboard)/admin/components
/add-component Icon server
```

## 매개변수

### 필수
- `<ComponentName>`: PascalCase 형식의 컴포넌트 이름

### 선택
- `[type]`: `server` (기본값) 또는 `client`
- `--variants`: cva variant 패턴 포함 (Button, Badge 등에 적합)
- `--path=<경로>`: 커스텀 경로 (기본값: `components/ui`)
- `--subcomponents`: 서브 컴포넌트 포함 (Card, Dialog 등에 적합)

## 프로세스

### 1. 입력 파싱
- ComponentName, type(server/client), 옵션 추출
- `--variants`와 `--subcomponents` 동시 사용 확인 (불가)

### 2. 유효성 검사
- ComponentName이 PascalCase인지 확인
  - ❌ 잘못된 예: `button`, `buttonComponent`, `Button_Comp`
  - ✅ 올바른 예: `Button`, `UserProfile`, `FormInput`
- 대상 경로에 동일한 파일이 이미 존재하는지 확인
- 숫자로 시작하는 이름 확인 (3DButton → ThreeDButton 제안)

### 3. 경로 결정
- `--path` 옵션이 있으면 해당 경로 사용
- 없으면 `components/ui/` 기본 사용
- 경로가 존재하지 않으면 자동 생성 (mkdir)

### 4. 파일명 변환
- ComponentName을 kebab-case로 변환
  - 예: `UserTable` → `user-table.tsx`
  - 예: `FormInput` → `form-input.tsx`

### 5. 템플릿 선택 및 코드 생성
- **기본**: 단순 Server Component (div + children + className)
- **`--variants`**: cva 패턴 (button.tsx 참고)
- **`--subcomponents`**: 복합 컴포넌트 (card.tsx 참고)

### 6. 파일 생성
- TypeScript + JSDoc 주석 포함
- `'use client'` 지시어 (client 타입인 경우)
- Props 인터페이스 자동 생성
- `cn()` 유틸리티 import

### 7. 결과 확인
- 생성된 파일 경로 출력
- 사용 예시 코드 제공

## 템플릿 구조

### 템플릿 1: 기본 Server Component

```typescript
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface <ComponentName>Props {
  /** 자식 요소 */
  children?: ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * <ComponentName> 컴포넌트
 * [간단한 설명을 여기에 추가하세요]
 */
export function <ComponentName>({
  children,
  className,
}: <ComponentName>Props) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}
```

### 템플릿 2: Client Component with Variants (cva)

```typescript
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const <componentName>Variants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface <ComponentName>Props
  extends React.ComponentProps<'button'>,
    VariantProps<typeof <componentName>Variants> {}

/**
 * <ComponentName> 컴포넌트
 * [간단한 설명을 여기에 추가하세요]
 */
export function <ComponentName>({
  className,
  variant,
  size,
  ...props,
}: <ComponentName>Props) {
  return (
    <button
      data-slot="<component-name>"
      className={cn(<componentName>Variants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### 템플릿 3: Subcomponents Pattern (Card 스타일)

```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';

function <ComponentName>({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="<component-name>"
      className={cn('rounded-xl border bg-card text-card-foreground shadow-sm p-6', className)}
      {...props}
    />
  );
}

function <ComponentName>Header({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="<component-name>-header"
      className={cn('flex flex-col space-y-1.5 pb-6 border-b', className)}
      {...props}
    />
  );
}

function <ComponentName>Title({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="<component-name>-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function <ComponentName>Description({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="<component-name>-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function <ComponentName>Content({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="<component-name>-content"
      className={cn('', className)}
      {...props}
    />
  );
}

function <ComponentName>Footer({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="<component-name>-footer"
      className={cn('flex items-center pt-6 border-t', className)}
      {...props}
    />
  );
}

export {
  <ComponentName>,
  <ComponentName>Header,
  <ComponentName>Title,
  <ComponentName>Description,
  <ComponentName>Content,
  <ComponentName>Footer,
};
```

## 파일명 변환 규칙

| 입력 | 출력 | 파일명 |
|------|------|--------|
| `Button` | ✅ | `button.tsx` |
| `UserTable` | ✅ | `user-table.tsx` |
| `FormInputField` | ✅ | `form-input-field.tsx` |
| `button` | ⚠️ 변환 제안 | `button.tsx` (PascalCase로 변환 제안) |
| `user_profile` | ⚠️ 변환 제안 | `user-profile.tsx` (PascalCase 변환 후) |
| `3DButton` | ⚠️ 경고 | ThreeDButton 제안 |
| `React` | ⚠️ 경고 | 예약어 사용 경고 |

## 사용 예시

### 예시 1: 기본 Server Component
```
/add-component Section server
```
**결과:**
```
✅ 컴포넌트 생성 완료: components/ui/section.tsx

📦 사용 예시:

import { Section } from '@/components/ui/section';

<Section className="py-8">
  콘텐츠
</Section>
```

### 예시 2: Client Component with Variants
```
/add-component Badge client --variants
```
**결과:**
```
✅ 컴포넌트 생성 완료: components/ui/badge.tsx

📦 사용 예시:

import { Badge } from '@/components/ui/badge';

<Badge variant="secondary" size="sm">
  라벨
</Badge>
```

### 예시 3: 커스텀 경로
```
/add-component UserCard server --path=components/custom
```
**결과:**
```
✅ 컴포넌트 생성 완료: components/custom/user-card.tsx

📦 사용 예시:

import { UserCard } from '@/components/custom/user-card';

<UserCard className="..." />
```

### 예시 4: Subcomponents 패턴
```
/add-component Modal server --subcomponents
```
**결과:**
```
✅ 컴포넌트 생성 완료: components/ui/modal.tsx

📦 사용 예시:

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
} from '@/components/ui/modal';

<Modal>
  <ModalHeader>
    <ModalTitle>제목</ModalTitle>
    <ModalDescription>설명</ModalDescription>
  </ModalHeader>
  <ModalContent>내용</ModalContent>
  <ModalFooter>버튼</ModalFooter>
</Modal>
```

### 예시 5: 페이지 전용 컴포넌트
```
/add-component UserTable client --path=app/(dashboard)/users/components
```
**결과:**
```
✅ 컴포넌트 생성 완료: app/(dashboard)/users/components/user-table.tsx

📦 사용 예시:

import { UserTable } from './components/user-table';

export default function UsersPage() {
  return <UserTable />;
}
```

## 에러 처리

### 1. 파일 이미 존재
```
⚠️  파일이 이미 존재합니다: components/ui/button.tsx

덮어쓸까요? (y/n/cancel)
- y: 기존 파일 덮어쓰기
- n: 취소 후 다른 이름으로 재시도
- cancel: 작업 취소
```

### 2. 잘못된 이름
```
❌ 에러: 컴포넌트 이름은 PascalCase여야 합니다.

현재: button
제안: Button

명령어: /add-component Button client
```

### 3. 숫자로 시작
```
❌ 에러: 컴포넌트 이름이 숫자로 시작할 수 없습니다.

현재: 3DButton
제안: ThreeDButton

명령어: /add-component ThreeDButton client
```

### 4. 옵션 충돌
```
❌ 에러: --variants와 --subcomponents는 동시 사용할 수 없습니다.

한 가지만 선택하세요:
- /add-component Button client --variants
- /add-component Card server --subcomponents
```

### 5. 경로가 없음
```
⚠️  경로가 존재하지 않습니다: components/custom

생성할까요? (y/n)
- y: 경로 자동 생성 후 컴포넌트 생성
- n: 취소
```

## 참고사항

- **Server Component 우선**: Next.js 15 App Router는 Server Component가 기본
- **TypeScript Strict Mode**: 모든 Props는 명시적인 타입 정의
- **shadcn/ui 패턴 준수**:
  - `data-slot` 속성으로 DOM 요소 식별
  - `cn()` 유틸리티로 클래스 병합
  - `cva` variant 패턴 사용
- **한국어 주석**: JSDoc 주석은 한국어로 작성
- **2 spaces 들여쓰기**: 프로젝트 컨벤션 준수
- **파일명은 kebab-case**: 모든 컴포넌트 파일은 소문자 + 하이픈

## 다음 단계

컴포넌트 생성 후:
1. 생성된 파일 열기
2. TODO 주석 채우기
3. Props 인터페이스 수정 (필요시)
4. Tailwind 클래스 추가
5. 테스트 작성
