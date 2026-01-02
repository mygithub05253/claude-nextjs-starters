'use client';

import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

/**
 * 다이얼로그 예제 페이지
 * Dialog와 AlertDialog의 다양한 사용 사례를 제공합니다
 */

export default function DialogExamplePage() {
  const [showFormMessage, setShowFormMessage] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFormMessage(true);
    setTimeout(() => setShowFormMessage(false), 3000);
    setFormData({ name: '', email: '' });
  };

  return (
    <Container className="py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">다이얼로그 예제</h1>
        <p className="mt-2 text-muted-foreground">
          Dialog와 AlertDialog 컴포넌트의 다양한 사용 사례를 확인해보세요.
        </p>
      </div>

      <Separator className="my-8" />

      {/* 예제 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 예제 1: 기본 Dialog */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💬 기본 Dialog
            </CardTitle>
            <CardDescription>정보 표시 다이얼로그</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              기본적인 정보 표시 용도의 다이얼로그 예제입니다. 내용을 표시하고 닫을 수 있습니다.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Dialog 열기</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>기본 Dialog 예제</DialogTitle>
                  <DialogDescription>
                    이것은 기본 Dialog 컴포넌트의 예제입니다. 정보를 표시하거나 사용자 입력을 받을 수 있습니다.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <h4 className="font-semibold mb-2">특징:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ 모달 형식의 다이얼로그</li>
                      <li>✓ 배경 클릭 또는 ESC로 닫기 가능</li>
                      <li>✓ 유연한 컨텐츠 표시</li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <DialogTrigger asChild>
                    <Button variant="outline">닫기</Button>
                  </DialogTrigger>
                  <Button>확인</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* 예제 2: Alert Dialog */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚠️ Alert Dialog
            </CardTitle>
            <CardDescription>확인/취소 다이얼로그</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              사용자의 중요한 선택을 확인하는 다이얼로그 예제입니다.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말 삭제하시겠어요?</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end gap-2">
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction>삭제</AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* 예제 3: 폼이 포함된 Dialog */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 폼 Dialog
            </CardTitle>
            <CardDescription>사용자 입력을 받는 다이얼로그</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              사용자 정보를 입력받는 폼이 포함된 다이얼로그 예제입니다.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>가입 Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>회원 가입</DialogTitle>
                  <DialogDescription>
                    새로운 계정을 만들기 위해 정보를 입력해주세요.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      placeholder="이름을 입력하세요"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  {showFormMessage && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-green-600 dark:text-green-400">
                        가입 완료! {formData.name}님 환영합니다.
                      </span>
                    </div>
                  )}
                  <div className="flex justify-end gap-2 pt-4">
                    <DialogTrigger asChild>
                      <Button variant="outline">취소</Button>
                    </DialogTrigger>
                    <Button type="submit">가입</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* 예제 4: 확인 Dialog */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ✓ 확인 Dialog
            </CardTitle>
            <CardDescription>사용자 선택 확인</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              사용자의 선택을 안내하고 확인하는 다이얼로그입니다.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary">설정 저장</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    설정을 저장하시겠어요?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    변경 사항이 저장됩니다. 계속하시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end gap-2">
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction>저장</AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>

      {/* 정보 카드 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Dialog vs AlertDialog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                💬 Dialog
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 일반적인 모달 창</li>
                <li>• 정보 표시용</li>
                <li>• 폼 입력 용도</li>
                <li>• 유연한 커스터마이징</li>
                <li>• 배경 클릭으로 닫기 가능</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                ⚠️ AlertDialog
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 중요한 선택 확인</li>
                <li>• 삭제/취소 확인</li>
                <li>• 명확한 CTA 버튼</li>
                <li>• 사용자 주의 필요</li>
                <li>• 명시적 선택 강제</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
