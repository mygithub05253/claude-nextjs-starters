---
description: '프로젝트 내 Tailwind CSS 클래스 사용 통계 및 최적화 제안을 제공합니다'
allowed-tools:
  [
    'Glob(*)',
    'Grep(*)',
    'Read(*)',
  ]
---

# Claude 명령어: Analyze Tailwind

프로젝트 내 Tailwind CSS 클래스 사용 패턴을 분석하고 최적화 제안을 제공합니다.

## 사용법

```
/analyze-tailwind [options]
```

**예시:**
```
/analyze-tailwind
/analyze-tailwind --path=app
/analyze-tailwind --top=20
/analyze-tailwind --duplicates-only
/analyze-tailwind --suggest
```

## 매개변수

### 선택
- `--path=<경로>`: 특정 경로만 분석 (기본값: `app/`, `components/`)
- `--top=<숫자>`: 상위 N개 클래스 표시 (기본값: 10)
- `--duplicates-only`: 중복 패턴만 표시 (5회 이상)
- `--suggest`: 커스텀 유틸리티 클래스 제안 포함 (기본값: 포함)
- `--no-patterns`: 패턴 분석 스킵

## 프로세스

### 1. 파일 수집
- Glob으로 `app/**/*.tsx`, `app/**/*.ts`, `components/**/*.tsx`, `components/**/*.ts` 검색
- `--path` 옵션이 있으면 해당 경로만 스캔
- `node_modules/`, `.next/` 폴더 제외

### 2. 클래스 추출
Grep으로 다음 패턴 검색:
- `className="..."` (문자열)
- `className='...'` (작은따옴표)
- `className={...}` (표현식)
- `` className={`...`} `` (template literal)
- `cn(...)` (유틸리티 함수)

정규식 패턴:
```
className\s*=\s*"([^"]*)"|'([^']*)"|{([^}]*)}/
cn\s*\(\s*([^)]+)\s*\)
```

### 3. 클래스 필터링
- 동적 클래스 (변수 참조) 제외
  - 예: `className={isActive ? 'bg-blue-500' : 'bg-gray-500'}` → 제외
  - 예: `className={dynamicClass}` → 제외
- Tailwind 클래스만 필터링
  - 접두사: `flex`, `grid`, `text-`, `bg-`, `border`, `rounded`, `p-`, `m-`, `w-`, `h-`, `gap-`, `space-`
  - 수정자: `hover:`, `focus:`, `dark:`, `lg:`, `md:` 등
- 커스텀 클래스 제외 (예: `custom-button`, `my-style`)

### 4. 통계 생성
계산:
- 총 파일 수
- 총 클래스 사용 횟수
- 고유 클래스 수
- 평균 클래스/파일
- 파일별 클래스 분포

정렬:
- 클래스별 사용 빈도 내림차순
- 상위 N개 추출

### 5. 패턴 분석
N-gram 생성:
- 3개 이상 연속된 클래스 조합 추출
- 예: `flex items-center gap-2`, `text-sm text-muted-foreground`

조건:
- 5회 이상 반복되는 패턴만 표시
- 패턴별 사용 위치 추적

### 6. 최적화 제안
각 패턴에 대해:
- 패턴 자체 저장량 계산
- 커스텀 클래스 생성 여부 제안
- 컴포넌트 추출 가능성 제안
- 예상 절감 효과 계산

### 7. 결과 포맷팅 및 출력
Markdown 형식으로 상세 리포트 출력

## 출력 형식

### 기본 통계
```
📊 Tailwind CSS 사용 통계

📁 분석 범위: app/, components/
📁 총 파일 수: 45개
📊 총 클래스 사용: 1,234회
🎯 고유 클래스 수: 287개
📈 평균 클래스/파일: 27.4회
```

### 상위 클래스
```
🔝 가장 많이 사용된 클래스 (Top 10)

  1. flex                  89회
  2. items-center          78회
  3. text-sm               67회
  4. gap-4                 54회
  5. rounded-md            48회
  6. px-4                  45회
  7. py-2                  43회
  8. text-muted-foreground 41회
  9. border                38회
 10. shadow-sm             35회

총합: 478회 (전체의 38.7%)
```

### 중복 패턴
```
🔄 반복되는 클래스 패턴 (5회 이상)

1️⃣  "flex items-center gap-2" (23회)
   📁 사용 위치:
     - app/(dashboard)/components/page.tsx (5회)
     - components/ui/button.tsx (4회)
     - components/layout/header.tsx (3회)
     - components/ui/card.tsx (2회)
     - 기타... (9회)

2️⃣  "text-sm text-muted-foreground" (18회)
   📁 사용 위치:
     - app/(dashboard)/form-example/page.tsx (5회)
     - components/ui/label.tsx (4회)
     - 기타... (9회)

3️⃣  "rounded-md border px-4 py-2" (12회)
   📁 사용 위치:
     - components/ui/input.tsx (3회)
     - 기타... (9회)
```

### 최적화 제안
```
💡 최적화 제안

1️⃣  "flex items-center gap-2" → 커스텀 클래스 생성 권장
   📍 패턴: 중복도가 높음 (23회)
   💾 제안:
      @layer components {
        @apply flex items-center gap-2;
      }
      또는 새 컴포넌트 추출:
      <FlexCenter gap="2"> 컴포넌트 생성

   예상 절감: 23곳, 약 115자

2️⃣  "text-sm text-muted-foreground" → 서브텍스트 컴포넌트 추출
   📍 패턴: 의미 있는 조합 (18회)
   💾 제안:
      <Text variant="muted" size="sm"> 컴포넌트 생성
      재사용 가능한 UI 컴포넌트로 표준화

   예상 절감: 18곳, 약 88자

3️⃣  "grid grid-cols-3 gap-4" → 자주 사용되는 레이아웃 패턴
   📍 패턴: 레이아웃 표준화 (12회)
   💾 제안:
      <Grid columns={3} gap="4"> 래퍼 컴포넌트 생성
      또는 @layer utilities에 커스텀 클래스 추가
```

## 분석 대상 및 제외

### 분석 대상
```
✅ 포함
- className prop (문자열, template literal, 표현식)
- cn() 함수 내부 클래스
- Tailwind 표준 클래스
- 수정자 포함 (hover:, dark:, lg: 등)

❌ 제외
- node_modules/ 폴더
- .next/ 폴더
- 주석 내 클래스
- 동적으로 생성되는 클래스 (변수 참조)
- 커스텀 CSS 클래스 (Tailwind가 아닌 것)
```

## 에러 처리

### 1. 동적 클래스
```
className={isActive ? 'bg-blue-500' : 'bg-gray-500'}
```
→ 제외하고 경고 표시
```
⚠️  동적 클래스 3개 제외됨 (변수 참조)
```

### 2. Template literal 혼합
```
className={`flex ${spacing} items-center`}
```
→ 정적 부분만 추출
```
추출: "flex items-center"
주: 변수 부분 ${spacing}는 제외됨
```

### 3. cn() 중첩
```
cn("base", condition && "conditional", cn("nested"))
```
→ 재귀 파싱으로 모든 클래스 추출

### 4. 파일이 많은 경우
```
⏳ 분석 중... (45/125 파일)
```
→ 진행률 표시 (100개 이상일 때)

## 사용 예시

### 예시 1: 전체 프로젝트 분석
```
/analyze-tailwind
```
**결과:**
```
전체 통계 + 상위 10개 클래스 + 중복 패턴 + 최적화 제안
```

### 예시 2: 특정 폴더만 분석
```
/analyze-tailwind --path=app/(dashboard)
```
**결과:**
```
대시보드 폴더의 통계만 표시
예: 12개 파일, 342회 클래스 사용
```

### 예시 3: 상위 20개 클래스 조회
```
/analyze-tailwind --top=20
```
**결과:**
```
상위 20개 클래스 + 합계 (전체의 몇 %인지 표시)
```

### 예시 4: 중복 패턴만 확인
```
/analyze-tailwind --duplicates-only
```
**결과:**
```
5회 이상 반복되는 패턴 목록만 표시
(통계, 상위 클래스는 제외)
```

### 예시 5: 최적화 제안 포함 (기본)
```
/analyze-tailwind --suggest
```
**결과:**
```
전체 분석 + 상세한 최적화 제안 포함
(커스텀 클래스 예시 코드 포함)
```

## 분석 결과 해석

### 상위 클래스가 많을 때
- ✅ 표준화된 스타일 사용 가능
- 💡 제안: 상위 클래스들을 컴포넌트로 추상화

### 고유 클래스가 많을 때
- ⚠️ 스타일 편차가 큼
- 💡 제안: 디자인 시스템 정립, 컴포넌트 표준화

### 특정 패턴이 반복될 때
- ✅ 최적화 기회 발견
- 💡 제안: 커스텀 클래스 또는 컴포넌트 추출

### 파일별 클래스 수가 차이날 때
- ⚠️ 일관성 부족
- 💡 제안: 파일 크기 최적화, 컴포넌트 분리

## 참고사항

- **분석은 읽기 전용**: 파일을 수정하지 않음
- **결과는 Markdown 형식**: 복사하여 문서에 붙여넣기 가능
- **대규모 프로젝트**: 100개 이상 파일 시 처리 시간 소요
- **정기적 실행 권장**: 1주일에 1회 이상 실행하여 스타일 일관성 모니터링

## 성능 최적화 팁

분석 후:
1. **반복 패턴 추출**: 상위 5개 패턴을 컴포넌트로 만들기
2. **커스텀 클래스**: `@layer utilities`에 자주 사용되는 조합 정의
3. **컴포넌트 표준화**: 비슷한 패턴의 컴포넌트 통합
4. **다시 분석**: 최적화 후 1주일 후 다시 실행

## 예상 분석 결과 예시

```
📊 최종 분석 요약

✅ 5회 이상 반복 패턴: 7개 발견
💡 최적화 가능 저장: ~500자 (커스텀 클래스화)
📈 일관성 점수: 78% (상위 10개 클래스가 전체의 38.7% 차지)
```

이 점수가 높을수록 스타일링이 표준화되어 있음을 의미합니다.
