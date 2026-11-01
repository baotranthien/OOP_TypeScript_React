# TRẢ LỜI CÂU HỎI BỔ SUNG — BUỔI 7 (BOOKSTORE)
**Học viên:** Trần Thiện Bảo — MSSV: 23690781  
**Môn học:** Lập trình Thiết bị Di động (React Native & TypeScript)

---

### Câu 1. Cấu trúc điều hướng (Native Stack vs Bottom Tab)
- **Vì sao `BookDetail` được đăng ký ở Stack mà không đặt trong Tab?**  
  `BookDetail` là màn hình xem chi tiết mang tính tạm thời theo ngữ cảnh sản phẩm. Khi đặt ở ngoài Native Stack, nó sẽ che phủ toàn bộ màn hình (bao gồm cả thanh Bottom Tab ở đáy), tạo không gian tối đa để đọc thông tin sách và tự động cung cấp nút Back (`←`) trên Header để quay lại đúng vị trí danh sách sách đã xem.
- **Nếu đặt vào Tab thì màn hình sẽ khác đi thế nào?**  
  Nếu đặt vào Tab, `BookDetail` sẽ xuất hiện như một biểu tượng cố định trên thanh Tab Bar khiến thanh điều hướng bị chật chội và không tự nhiên (vì không ai vào một tab tĩnh chỉ để xem một cuốn sách chưa chọn). Đồng thời, thanh Tab Bar vẫn luôn hiện diện ở dưới đáy màn hình làm mất diện tích hiển thị và mất đi cơ chế back theo ngăn xếp của Stack.

---

### Câu 2. Cơ chế Immer trong Redux Toolkit & Vai trò của `useMemo` trong `useCart`
- **Vì sao trong reducer viết `state.items.push(...)` mà state gốc không bị sửa trực tiếp?**  
  Redux Toolkit tích hợp sẵn thư viện **Immer**. Khi thực thi reducer, Immer bọc `state` trong một Proxy nháp (`Draft`). Các thao tác đột biến như `push()`, `splice()`, gán thuộc tính... chỉ tác động lên bản nháp này; sau khi reducer hoàn thành, Immer sẽ tự động so sánh và tạo ra một đối tượng State mới hoàn toàn bất biến (immutable) mà không làm biến đổi state ban đầu.
- **Thử bỏ `useMemo` trong `useCart`: kết quả hiển thị có đổi không, và có hậu quả gì?**  
  Kết quả hiển thị trên giao diện **không thay đổi**, vì các biểu thức `reduce` tính `totalQuantity` và `totalPrice` vẫn trả về giá trị số chính xác. Tuy nhiên, hậu quả là các phép toán duyệt toàn bộ mảng giỏ hàng sẽ bị thực thi lại vô điều kiện ở mỗi lần component re-render (ngay cả khi các phần tử trong giỏ hàng không hề thay đổi), gây lãng phí CPU và làm giảm độ mượt mà của ứng dụng khi danh sách sản phẩm lớn.

---

### Câu 3. Xử lý lỗi `Promise.all` vs `Promise.allSettled`
- **Nếu `getCategories()` lỗi còn `getBooks()` thành công thì Home hiện gì?**  
  Màn hình Home sẽ hiển thị **`ErrorView` (báo lỗi)** kèm nút Thử lại, người dùng không xem được bất kỳ cuốn sách nào. Lý do là `Promise.all` hoạt động theo cơ chế *short-circuit / fail-fast* (chỉ cần một request thất bại là toàn bộ promise reject ngay lập tức).
- **Giải pháp `Promise.allSettled` và sự đánh đổi:**  
  Thay vì `Promise.all`, ta dùng `const results = await Promise.allSettled([getBooks(), getCategories()])`. Khi đó, ta kiểm tra nếu `results[0].status === "fulfilled"` thì vẫn cập nhật danh sách sách lên giao diện bình thường, và chỉ xử lý thiếu hụt danh mục cho `results[1]`.  
  *Sự đánh đổi:* Code xử lý kết quả và quản lý state phức tạp hơn nhiều (cần quản lý trạng thái lỗi riêng biệt cho từng khối dữ liệu), đồng thời trải nghiệm giao diện người dùng có thể bị khuyết thiếu (mất thanh chip danh mục lọc sách hoặc cần hiển thị thêm thông báo cảnh báo cục bộ).

---

### Câu 4. Cơ chế `setTimeout` và cleanup `clearTimeout` trong `useDebounce`
- **Vì sao không đặt `setTimeout` thẳng trong `onChangeText`?**  
  Nếu đặt trực tiếp trong `onChangeText`, mỗi phím người dùng gõ vào sẽ sinh ra một timer riêng biệt mà không hề được dọn dẹp timer cũ. Kết quả là sau thời gian delay, tất cả các lần tìm kiếm đều tuần tự chạy và kích hoạt re-render/lọc, khiến ứng dụng bị giật lag và mất hoàn toàn ý nghĩa của kỹ thuật debounce (gộp nhóm thao tác).
- **Hàm dọn dẹp (`return () => clearTimeout(t)`) giúp tránh lỗi gì?**  
  Hàm cleanup giúp huỷ ngay timer đang chờ của lần gõ phím trước đó ngay khi người dùng gõ ký tự tiếp theo, đảm bảo chỉ có khoảng ngừng nghỉ cuối cùng (đủ 400ms) mới kích hoạt cập nhật state. Ngoài ra, hàm dọn dẹp còn giúp tránh lỗi cập nhật state trên component đã unmount (*Can't perform a React state update on an unmounted component*) khi người dùng chuyển màn hình trước khi hết thời gian chờ.

---

### Câu 5. Đoạn code sắp xếp giá & Lợi ích của Custom Hook Adapter
#### 5.1. Đoạn code giải pháp sắp xếp theo giá tăng/giảm dần trong `HomeScreen.tsx`:
```tsx
// 1. Khai báo state lưu tuỳ chọn sắp xếp
const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

// 2. Áp dụng sắp xếp vào useMemo của visibleBooks
const visibleBooks = useMemo(() => {
  // Lọc theo từ khóa, danh mục, khoảng giá
  const filtered = filterBooks(books, {
    keyword: debouncedKeyword,
    categoryId,
    priceRange,
  });
  
  // Nếu không có yêu cầu sắp xếp -> trả về mảng đã lọc
  if (!sortOrder) return filtered;

  // Trả về bản sao đã được sort để không làm biến đổi mảng gốc
  return [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );
}, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);

// 3. UI nút bấm chuyển đổi thứ tự sắp xếp trên thanh bộ lọc
<View style={styles.sortControls}>
  <TouchableOpacity
    style={[styles.sortBtn, sortOrder === "asc" && styles.sortBtnActive]}
    onPress={() => setSortOrder(sortOrder === "asc" ? null : "asc")}
  >
    <Text style={[styles.sortBtnText, sortOrder === "asc" && styles.sortBtnTextActive]}>
      Giá tăng ↑
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.sortBtn, sortOrder === "desc" && styles.sortBtnActive]}
    onPress={() => setSortOrder(sortOrder === "desc" ? null : "desc")}
  >
    <Text style={[styles.sortBtnText, sortOrder === "desc" && styles.sortBtnTextActive]}>
      Giá giảm ↓
    </Text>
  </TouchableOpacity>
</View>
```

#### 5.2. Giải thích vì sao việc bọc Redux bằng custom hook (`useWishlist`, `useCart`) giúp đổi thư viện state mà không cần sửa UI:
Việc bọc Redux Toolkit qua các custom hook đóng vai trò như một **Lớp tương thích (Adapter Pattern / Abstraction Layer)**. Màn hình giao diện (`BookDetailScreen`) chỉ giao tiếp với một Interface trong suốt gồm dữ liệu và các hàm hành động chuẩn `{ ids, isWishlisted, toggle }`, hoàn toàn không phụ thuộc trực tiếp vào Redux (`dispatch`, `actions`, `useSelector`).  
Nhờ đó, sau này nếu nhóm phát triển quyết định thay thế Redux Toolkit bằng **Zustand, MobX, Jotai** hay **React Context API**, ta chỉ cần tái cấu trúc lại cài đặt bên trong file `hooks.ts` mà toàn bộ mã nguồn giao diện UI ở các màn hình vẫn hoạt động ổn định và **không phải chỉnh sửa một dòng nào**.

