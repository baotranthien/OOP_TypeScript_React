import { Book, BookFilter, PriceRange } from "../types";

export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

export const inRange = (p: number, r: PriceRange): boolean =>
  r === null || (r === "lt100" ? p < 100000 : r === "100to300" ? p >= 100000 && p <= 300000 : p > 300000);

export function filterBooks(books: Book[], f: BookFilter): Book[] {
  const k = normalize(f.keyword);
  return books.filter(
    (b) =>
      (k === "" || normalize(b.title).includes(k) || normalize(b.author).includes(k)) &&
      (f.categoryId === null || b.categoryId === f.categoryId) &&
      inRange(b.price, f.priceRange)
  );
}

