import { api } from "../api/client";
import { Book, BookQuery } from "../types";

export async function getBooks(params?: BookQuery): Promise<Book[]> {
  const res = await api.get<Book[]>("/books", { params });
  return res.data;
}

export async function getBookById(id: number): Promise<Book> {
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
}

