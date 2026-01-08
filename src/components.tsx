// components.tsx
// 과자 쇼핑 위시리스트 앱의 모든 컴포넌트들

import type {
  SnackCardProps,
  FilterBarProps,
  WishlistSummaryProps,
  FilterCategory,
  SortOption,
} from './types';

// TODO 4: SnackCard 컴포넌트의 타입을 지정하세요
export const SnackCard /* 타입 지정 */ = ({
  snack,
  isInWishlist,
  onAddToWishlist,
  onRemoveFromWishlist,
}: SnackCardProps) => {
  // 할인율 계산 로직
  const discountRate = snack.originalPrice
    ? Math.round(
        ((snack.originalPrice - snack.price) / snack.originalPrice) * 100
      )
    : 0;

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        width: '250px',
        textAlign: 'center',
        position: 'relative',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* 세일 뱃지 */}
      {snack.isOnSale && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: '#ff4757',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {discountRate}% OFF
        </div>
      )}

      {/* 과자 이미지 */}
      <img
        src={snack.imageUrl}
        alt={snack.name}
        style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '4px',
        }}
      />

      {/* 과자 정보 */}
      <h3 style={{ margin: '12px 0 4px 0', fontSize: '18px' }}>{snack.name}</h3>
      <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
        {snack.brand}
      </p>

      <div style={{ margin: '8px 0' }}>
        {'⭐'.repeat(snack.rating)}
        <span style={{ color: '#888', fontSize: '14px' }}>
          {' '}
          ({snack.rating}/5)
        </span>
      </div>

      {/* 가격 정보 */}
      <div style={{ margin: '12px 0' }}>
        {snack.originalPrice && (
          <span
            style={{
              textDecoration: 'line-through',
              color: '#999',
              fontSize: '14px',
              marginRight: '8px',
            }}
          >
            {snack.originalPrice.toLocaleString()}원
          </span>
        )}
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            color: snack.isOnSale ? '#ff4757' : '#333',
          }}
        >
          {snack.price.toLocaleString()}원
        </span>
      </div>

      <p style={{ fontSize: '12px', color: '#666', margin: '8px 0' }}>
        {snack.description}
      </p>

      {/* 위시리스트 버튼 */}
      <button
        onClick={() =>
          isInWishlist ? onRemoveFromWishlist(snack.id) : onAddToWishlist(snack)
        }
        style={{
          backgroundColor: isInWishlist ? '#ff4757' : '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        {isInWishlist ? '💔 위시리스트에서 제거' : '💖 위시리스트에 추가'}
      </button>
    </div>
  );
};

// TODO 5: FilterBar 컴포넌트의 타입을 지정하세요
export const FilterBar /* 타입 지정 */ = ({
  currentFilter,
  currentSort,
  onFilterChange,
  onSortChange,
}: FilterBarProps) => {
  // 카테고리 옵션
  const categories: { value: FilterCategory; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'chocolate', label: '🍫 초콜릿' },
    { value: 'cookie', label: '🍪 과자' },
    { value: 'candy', label: '🍬 사탕' },
    { value: 'icecream', label: '🍦 아이스크림' },
    { value: 'drink', label: '🥤 음료' },
  ];

  // 정렬 옵션
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name', label: '이름순' },
    { value: 'price-low', label: '가격 낮은순' },
    { value: 'price-high', label: '가격 높은순' },
    { value: 'rating', label: '평점순' },
  ];

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        marginBottom: '20px',
        borderRadius: '8px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* 카테고리 필터 */}
      <div>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>
          카테고리:
        </label>
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onFilterChange(category.value)}
            style={{
              backgroundColor:
                currentFilter === category.value ? '#007bff' : 'white',
              color: currentFilter === category.value ? 'white' : '#333',
              border: '1px solid #ddd',
              padding: '6px 12px',
              margin: '0 4px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* 정렬 옵션 */}
      <div>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>정렬:</label>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
          }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// TODO 6: WishlistSummary 컴포넌트의 타입을 지정하세요
export const WishlistSummary /* 타입 지정 */ = ({ wishlist, totalPrice }: WishlistSummaryProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        minWidth: '200px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>💖 위시리스트</h3>

      {/* 위시리스트 통계 */}
      <p style={{ margin: '4px 0', fontSize: '14px' }}>
        총 {wishlist.length}개 상품
      </p>
      <p style={{ margin: '4px 0', fontSize: '16px', fontWeight: 'bold' }}>
        총 금액: {totalPrice.toLocaleString()}원
      </p>

      {/* 최근 추가 상품 */}
      {wishlist.length > 0 && (
        <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>
          최근 추가: {wishlist[wishlist.length - 1]?.name}
        </div>
      )}
    </div>
  );
};
