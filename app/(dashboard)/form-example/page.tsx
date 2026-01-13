'use client';

import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

/**
 * 폼 예제 페이지
 * React Hook Form과 Zod를 사용한 폼 유효성 검사 예제를 제공합니다
 */

// Zod 스키마 정의
const formSchema = z.object({
  username: z.string().min(2, '사용자명은 최소 2글자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(8, '비밀번호는 최소 8글자 이상이어야 합니다'),
  confirmPassword: z.string(),
  country: z.string().min(1, '국가를 선택해주세요'),
  bio: z.string().max(500, '자기소개는 500글자 이하여야 합니다').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'], // confirmPassword 필드에 에러 연결
});

type FormData = z.infer<typeof formSchema>;

export default function FormExamplePage() {
  const [submitted, setSubmitted] = useState(false);
  const [formResult, setFormResult] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const password = watch('password');

  const onSubmit = (data: FormData) => {
    // Zod 스키마에서 비밀번호 검증이 자동으로 처리됨
    setFormResult(data);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Container className="py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">폼 예제</h1>
        <p className="mt-2 text-muted-foreground">
          React Hook Form과 Zod를 활용한 폼 유효성 검사의 예제를 확인해보세요.
        </p>
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 폼 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>회원가입 폼</CardTitle>
              <CardDescription>
                모든 필드를 입력하고 데이터 유효성이 실시간으로 검사됩니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 사용자명 */}
                <div className="space-y-2">
                  <Label htmlFor="username">사용자명</Label>
                  <Input
                    id="username"
                    placeholder="사용자명을 입력하세요"
                    {...register('username')}
                    className={errors.username ? 'border-red-500' : ''}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* 이메일 */}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* 비밀번호 */}
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="8글자 이상의 비밀번호"
                    {...register('password')}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* 비밀번호 확인 */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    {...register('confirmPassword')}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* 국가 */}
                <div className="space-y-2">
                  <Label htmlFor="country">국가</Label>
                  <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="국가를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="korea">대한민국</SelectItem>
                          <SelectItem value="usa">미국</SelectItem>
                          <SelectItem value="japan">일본</SelectItem>
                          <SelectItem value="china">중국</SelectItem>
                          <SelectItem value="etc">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.country.message}
                    </p>
                  )}
                </div>

                {/* 자기소개 */}
                <div className="space-y-2">
                  <Label htmlFor="bio">자기소개 (선택사항)</Label>
                  <Textarea
                    id="bio"
                    placeholder="자기소개를 입력하세요 (최대 500글자)"
                    {...register('bio')}
                    className={errors.bio ? 'border-red-500' : ''}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.bio.message}
                    </p>
                  )}
                </div>

                {/* 버튼 */}
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    제출
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      reset();
                      setSubmitted(false);
                    }}
                  >
                    초기화
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* 결과 표시 */}
        <div className="space-y-4">
          {/* 폼 상태 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">폼 상태</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-muted-foreground mb-2">현재 에러:</p>
                {Object.keys(errors).length > 0 ? (
                  <div className="space-y-1">
                    {Object.entries(errors).map(([field, error]) => (
                      <div key={field} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-red-500">{field}: {error?.message}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    모든 필드가 유효합니다
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 제출 결과 */}
          {submitted && formResult && (
            <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  성공!
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">사용자명:</span> {formResult.username}
                  </p>
                  <p>
                    <span className="font-semibold">이메일:</span> {formResult.email}
                  </p>
                  <p>
                    <span className="font-semibold">국가:</span> {formResult.country}
                  </p>
                  {formResult.bio && (
                    <p>
                      <span className="font-semibold">자기소개:</span> {formResult.bio}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">기술 정보</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p>
                <strong>React Hook Form:</strong> 성능 최적화된 폼 라이브러리
              </p>
              <p>
                <strong>Zod:</strong> TypeScript 우선 스키마 검증 라이브러리
              </p>
              <p>
                <strong>zodResolver:</strong> React Hook Form과 Zod의 통합
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
