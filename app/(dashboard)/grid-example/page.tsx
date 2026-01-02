'use client';

import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

/**
 * 카드 그리드 예제 페이지
 * 반응형 그리드 레이아웃과 다양한 카드 스타일을 제공합니다
 */

// 그리드 카드 코드 예제
const gridCardCodeExample = `import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';

export function ProductCard({ product }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      {/* 이미지 */}
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* 배지 */}
        {product.status && (
          <div className="absolute top-3 right-3">
            <Badge>{product.status}</Badge>
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 left-3">
            <Badge variant="destructive">-{discount}%</Badge>
          </div>
        )}
      </div>

      {/* 컨텐츠 */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-sm mb-2">
          {product.name}
        </h3>

        {/* 별점 */}
        <div className="flex items-center gap-2 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5" />
          ))}
        </div>

        {/* 가격 */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold">
            \${product.price}
          </span>
        </div>

        <Button size="sm" className="w-full gap-2">
          <ShoppingCart className="h-4 w-4" />
          장바구니 추가
        </Button>
      </div>
    </div>
  );
}`;

// 더미 제품 데이터
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    status: 'Sale',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Electronics',
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    status: 'Popular',
  },
  {
    id: 3,
    name: 'Camera',
    price: 599.99,
    originalPrice: 699.99,
    category: 'Photography',
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80',
    status: 'New',
  },
  {
    id: 4,
    name: 'Laptop',
    price: 1299.99,
    originalPrice: 1499.99,
    category: 'Computers',
    rating: 4.6,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80',
    status: 'Sale',
  },
  {
    id: 5,
    name: 'Tablet',
    price: 449.99,
    originalPrice: 499.99,
    category: 'Electronics',
    rating: 4.4,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35b76d1?w=400&q=80',
    status: 'Popular',
  },
  {
    id: 6,
    name: 'Phone',
    price: 899.99,
    originalPrice: 999.99,
    category: 'Electronics',
    rating: 4.9,
    reviews: 523,
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&q=80',
    status: 'Popular',
  },
  {
    id: 7,
    name: 'Keyboard',
    price: 129.99,
    originalPrice: 159.99,
    category: 'Accessories',
    rating: 4.3,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1587829191301-c9404dc9b209?w=400&q=80',
    status: null,
  },
  {
    id: 8,
    name: 'Mouse',
    price: 49.99,
    originalPrice: 69.99,
    category: 'Accessories',
    rating: 4.2,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80',
    status: 'Sale',
  },
];

// 상태별 배지 색상
const getStatusColor = (status: string | null) => {
  const colors: Record<string, string> = {
    Sale: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Popular: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    New: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };
  return colors[status || ''] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
};

// Skeleton 로딩 컴포넌트
function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default function GridExamplePage() {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  // 코드 복사 함수
  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => [...prev, id]);
  };

  return (
    <Container className="py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">그리드 예제</h1>
        <p className="mt-2 text-muted-foreground">
          반응형 카드 그리드 레이아웃 예제입니다. 다양한 카드 스타일과 상태를 확인해보세요.
        </p>
      </div>

      <Separator className="my-8" />

      {/* 필터 섹션 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>카테고리</CardTitle>
          <CardDescription>카테고리별로 필터링할 수 있습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm">
              모두보기
            </Button>
            <Button variant="outline" size="sm">
              Electronics
            </Button>
            <Button variant="outline" size="sm">
              Photography
            </Button>
            <Button variant="outline" size="sm">
              Computers
            </Button>
            <Button variant="outline" size="sm">
              Accessories
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 카드 그리드 및 코드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 카드 그리드 */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const isLoaded = loadedImages.includes(product.id);
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

              return (
                <div
                  key={product.id}
                  className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  {/* 이미지 */}
                  <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    {!isLoaded && <ProductCardSkeleton />}
                    <img
                      src={product.image}
                      alt={product.name}
                      onLoad={() => handleImageLoad(product.id)}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    {/* 상태 배지 */}
                    {product.status && (
                      <div className="absolute top-3 right-3">
                        <Badge className={`${getStatusColor(product.status)} border-0`}>
                          {product.status}
                        </Badge>
                      </div>
                    )}
                    {/* 할인율 배지 */}
                    {discount > 0 && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="destructive">-{discount}%</Badge>
                      </div>
                    )}
                  </div>

                  {/* 콘텐츠 */}
                  <div className="p-4">
                    {/* 카테고리 */}
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                      {product.category}
                    </p>

                    {/* 제품명 */}
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                      {product.name}
                    </h3>

                    {/* 평점 */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>

                    {/* 가격 */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-lg font-bold">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* 버튼 */}
                    <Button size="sm" className="w-full gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      장바구니 추가
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 코드 섹션 */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>카드 그리드 코드 예제</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => copyCode(gridCardCodeExample, 'grid')}
          >
            {copied === 'grid' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md text-xs overflow-auto max-h-64">
            <code>{gridCardCodeExample}</code>
          </pre>
        </CardContent>
      </Card>

      {/* 정보 카드 */}
      <Card>
        <CardHeader>
          <CardTitle>그리드 레이아웃 특징</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-2">📱 반응형 디자인</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• 모바일: 1 컬럼</li>
                <li>• 태블릿: 2 컬럼</li>
                <li>• 데스크톱: 4 컬럼</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">✨ 카드 기능</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Hover 효과</li>
                <li>• 상태 배지</li>
                <li>• 할인율 표시</li>
                <li>• 별점 표시</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">🖼️ 이미지 처리</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Skeleton 로딩</li>
                <li>• 이미지 최적화</li>
                <li>• 부드러운 Fade</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">🎯 UX 요소</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• 가격 강조</li>
                <li>• CTA 버튼</li>
                <li>• 제품 정보</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
