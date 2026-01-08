// App.tsx
// 메인 앱 컴포넌트와 데이터 관리

import React, { useState } from 'react';
import { SnackCard, FilterBar, WishlistSummary } from './components';
import type { Snack, WishlistItem, FilterCategory, SortOption } from './types';

// 샘플 데이터
const sampleSnacks: Snack[] = [
  {
    id: '1',
    name: '허니버터칩',
    brand: '해태',
    price: 2500,
    originalPrice: 3000,
    category: 'cookie',
    rating: 5,
    imageUrl:
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23FFD700"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-size="80">🍟</text></svg>',
    isOnSale: true,
    description: '달콤짭짤한 허니버터맛',
  },
  {
    id: '2',
    name: '초코파이',
    brand: '오리온',
    price: 3000,
    category: 'chocolate',
    rating: 4,
    imageUrl:
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23633f2a"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-size="80">🍪</text></svg>',
    isOnSale: false,
    description: '부드러운 마시멜로우와 초콜릿의 만남',
  },
  {
    id: '3',
    name: '쿠크다스',
    brand: '크라운',
    price: 1800,
    originalPrice: 2200,
    category: 'cookie',
    rating: 4,
    imageUrl:
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23DEB887"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-size="80">🍪</text></svg>',
    isOnSale: true,
    description: '바삭한 쿠키의 정석',
  },
  {
    id: '4',
    name: '아이셔츄',
    brand: '오리온',
    price: 1500,
    category: 'candy',
    rating: 3,
    imageUrl:
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23fe6091"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-size="80">🍬</text></svg>',
    isOnSale: false,
    description: '쫀득한 사워필링으로 짜릿한 신맛',
  },
  {
    id: '5',
    name: '메로나',
    brand: '빙그레',
    price: 1200,
    category: 'icecream',
    rating: 5,
    imageUrl:
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%239ad332"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-size="80">🍦</text></svg>',
    isOnSale: false,
    description: '시원한 메론맛 아이스크림',
  },
];

export default function App() {
  // TODO 7: 상태 변수들의 타입을 지정하세요
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [filter, setFilter] = useState<FilterCategory>(/* 타입 지정 */ 'all');
  const [sortBy, setSortBy] = useState<SortOption>(/* 타입 지정 */ 'name');

  // 위시리스트에 추가하는 함수
  const addToWishlist = (snack: Snack): void => {
    const wishlistItem: WishlistItem = {
      ...snack,
      addedAt: new Date(),
      quantity: 1,
    };
    setWishlist((prev) => [...prev, wishlistItem]);
  };

  // 위시리스트에서 제거하는 함수
  const removeFromWishlist = (id: string): void => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // TODO 8: getFilteredSnacks 함수의 반환 타입을 지정하세요
  const getFilteredSnacks = (): Snack[] /* 반환 타입 지정 */ => {
    let filtered =
      filter === 'all'
        ? sampleSnacks
        : sampleSnacks.filter((snack) => snack.category === filter);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  };

  // TODO 9: getTotalPrice 함수의 반환 타입을 지정하세요
  const getTotalPrice = (): number /* 반환 타입 지정 */ => {
    return wishlist.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // TODO 10: isInWishlist 함수의 매개변수와 반환 타입을 지정하세요
  const isInWishlist = (id: string /* 매개변수 타입 지정 */): boolean /* 반환 타입 지정 */ => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#333',
          fontSize: '32px',
          marginBottom: '30px',
        }}
      >
        🍪 과자 쇼핑 위시리스트
      </h1>

      {/* FilterBar 컴포넌트 */}
      <FilterBar
        currentFilter={filter}
        currentSort={sortBy}
        onFilterChange={setFilter}
        onSortChange={setSortBy}
      />

      {/* 과자 목록 렌더링 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
          paddingBottom: '100px',
        }}
      >
        {getFilteredSnacks().map((snack) => (
          <SnackCard
            key={snack.id}
            snack={snack}
            isInWishlist={isInWishlist(snack.id)}
            onAddToWishlist={addToWishlist}
            onRemoveFromWishlist={removeFromWishlist}
          />
        ))}
      </div>

      {/* WishlistSummary 컴포넌트 */}
      <WishlistSummary wishlist={wishlist} totalPrice={getTotalPrice()} />
    </div>
  );
}
