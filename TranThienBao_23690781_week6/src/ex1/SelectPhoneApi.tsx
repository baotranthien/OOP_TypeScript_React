import React, { useState, useEffect, useCallback } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { SelectPhoneApp } from "./SelectPhoneApp";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";

export function SelectPhoneApi() {
  // 1. Quản lý trạng thái bằng useState: phone, error, loading
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. Viết hàm load bằng useCallback để fetch dữ liệu từ fetchPhone("1")
  const load = useCallback(async () => {
    setError(null);
    setPhone(null);
    setLoading(true);

    try {
      const data = await fetchPhone("1");
      setPhone(data);
    } catch (err: any) {
      setError(err?.message ?? "Đã xảy ra lỗi khi tải thông tin sản phẩm");
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Sử dụng useEffect để tự động gọi hàm load() khi màn hình vừa mount
  useEffect(() => {
    load();
  }, [load]);

  // 4. Xử lý giao diện điều kiện (Conditional Rendering)
  // - Nếu có error -> Hiển thị ErrorBox
  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  // - Nếu đang nạp dữ liệu (loading hoặc chưa có phone và chưa có error) -> Hiển thị Loading
  if (loading || !phone) {
    return <Loading />;
  }

  // - Ngược lại khi có phone -> Render SelectPhoneApp
  return <SelectPhoneApp phone={phone} />;
}
