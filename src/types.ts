// types.ts
// 과자 쇼핑 위시리스트 앱의 모든 타입 정의

// TODO 1: Snack 인터페이스를 정의하세요
// 속성: id(string), name(string), brand(string), price(number), 
//      originalPrice(number, 선택적), category(유니온 타입), 
//      rating(1-5), imageUrl(string), isOnSale(boolean), description(string)
export interface Snack {
  // 여기에 코드를 작성하세요
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    category: "cookie" | "chocolate" | "candy" | "chip" | "icecream";
    rating: 1 | 2 | 3 | 4 | 5; 
    imageUrl: string;
    isOnSale: boolean;
    description: string;
}

// TODO 2: WishlistItem 인터페이스를 정의하세요 (Snack을 확장)
// 추가 속성: addedAt(Date), quantity(number)
export interface WishlistItem /* 여기에 코드를 작성하세요 */ {
  // 여기에 코드를 작성하세요
  addedAt: Date;
  quantity: number;
}

// TODO 3: 정렬 옵션과 필터 카테고리 타입을 정의하세요
export type SortOption = "name" | "price-low" | "price-high" | "rating";
export type FilterCategory = "all" | "chocolate" | "cookie" | "candy" | "icecream" | "drink";

// 컴포넌트 Props 타입들
export interface SnackCardProps {
  snack: Snack;
  isInWishlist: boolean;
  onAddToWishlist: (snack: Snack) => void;
  onRemoveFromWishlist: (id: string) => void;
}

export interface FilterBarProps {
  currentFilter: FilterCategory;
  currentSort: SortOption;
  onFilterChange: (filter: FilterCategory) => void;
  onSortChange: (sort: SortOption) => void;
}

export interface WishlistSummaryProps {
  wishlist: WishlistItem[];
  totalPrice: number;
}