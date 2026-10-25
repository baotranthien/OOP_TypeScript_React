import { COLOR_ORDER } from "../data/phones";
import { ColorKey, Phone } from "../types";

// Địa chỉ MockAPI được cấu hình mặc định từ link người dùng cung cấp
export const DEFAULT_API_URL = "https://6acb230fef37b150407772a9.mockapi.io/phones";
export const API_URL = (process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL).replace(/\/$/, "");

const VALID_COLORS: ColorKey[] = ["silver", "red", "black", "blue"];

export async function fetchPhone(id: string): Promise<Phone> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Máy chủ trả về mã lỗi HTTP ${res.status}`);
  }
  const raw = await res.json();

  // Chuẩn hóa dữ liệu trả về từ MockAPI để đảm bảo an toàn tuyệt đối
  const defaultColor: ColorKey = VALID_COLORS.includes(raw.defaultColor)
    ? raw.defaultColor
    : "blue";

  const rawColors = Array.isArray(raw.colors)
    ? raw.colors
    : Array.isArray(raw.color)
      ? raw.color
      : [];

  const filteredColors = rawColors.filter((c: any) => VALID_COLORS.includes(c));
  const colors: ColorKey[] = filteredColors.length > 0 ? filteredColors : COLOR_ORDER;

  // Chuẩn hóa rating về khoảng 0..5
  let rating = typeof raw.rating === "number" ? raw.rating : 5;
  if (rating > 5) {
    rating = Math.min(5, Math.max(1, Math.round(rating / 20)));
  }

  const phone: Phone = {
    id: String(raw.id ?? id),
    name: raw.name ?? "Điện Thoại Vsmart Joy 3 - Hàng chính hãng",
    price: typeof raw.price === "number" ? raw.price : 1790000,
    oldPrice: typeof raw.oldPrice === "number" ? raw.oldPrice : 1790000,
    rating: Math.min(5, Math.max(0, rating)),
    reviewCount: typeof raw.reviewCount === "number" ? raw.reviewCount : 828,
    supplier: raw.supplier ?? "Tiki Tradding",
    badge: raw.badge ?? "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: colors,
    defaultColor: defaultColor,
  };

  return phone;
}
