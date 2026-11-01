export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  categoryId: number;
  stock: number;
  description: string;
  emoji: string;
  color: string;
}

export interface Category {
  id: number;
  name: string;
  emoji: string;
}

export interface CartItem {
  bookId: number;
  title: string;
  price: number;
  emoji: string;
  color: string;
  stock: number;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export type PriceRange = "lt100" | "100to300" | "gt300" | null;

export interface BookFilter {
  keyword: string;
  categoryId: number | null;
  priceRange: PriceRange;
}

export interface BookQuery {
  categoryId?: number;
  q?: string;
  _sort?: string;
  _order?: "asc" | "desc";
}

