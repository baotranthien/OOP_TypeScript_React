# BÁO CÁO THỰC HÀNH REACT NATIVE — TUẦN 3
# CHỦ ĐỀ: LAYOUT VỚI FLEXBOX & POSITION — BOOKSTORE ONLINE
**Học phần:** Lập trình thiết bị di động (Mobile Device Application Development)  
**Sinh viên thực hiện:** Trần Thiện Bảo  
**Mã số sinh viên (MSSV):** 23690781  
**Tài liệu bài tập:** `Week_3_Layout_UI.pdf`  

---

## MỤC LỤC
1. [Tổng quan cấu trúc dự án](#1-tổng-quan-cấu-trúc-dự-án)
2. [Hướng dẫn cài đặt và khởi chạy dự án](#2-hướng-dẫn-cài-đặt-và-khởi-chạy-dự-án)
3. [Giải chi tiết các bài tập, giải thích lý thuyết & hướng dẫn chụp ảnh minh chứng](#3-giải-chi-tiết-các-bài-tập-giải-thích-lý-thuyết--hướng-dẫn-chụp-ảnh-minh-chứng)
   - [GIỜ 1 — Nền tảng Flexbox & Layout đơn giản](#giờ-1--nền-tảng-flexbox--layout-đơn-giản)
     - [Bài tập 1: Header ứng dụng BookStore](#bài-tập-1-header-ứng-dụng-bookstore)
     - [Bài tập 2: Thẻ sách (Book Card) đơn](#bài-tập-2-thẻ-sách-book-card-đơn)
   - [GIỜ 2 — Kích thước, Wrap và Lưới sản phẩm (Grid)](#giờ-2--kích-thước-wrap-và-lưới-sản-phẩm-grid)
     - [Bài tập 1: Danh sách danh mục dạng chip (Category Chips)](#bài-tập-1-danh-sách-danh-mục-dạng-chip-category-chips)
     - [Bài tập 2: Lưới sản phẩm 2 cột (Book Grid)](#bài-tập-2-lưới-sản-phẩm-2-cột-book-grid)
   - [GIỜ 3 — Position, AlignSelf và các lớp phủ (Overlay)](#giờ-3--position-alignself-và-các-lớp-phủ-overlay)
     - [Bài tập 1: Badge giảm giá / Nhãn "Mới" trên bìa sách](#bài-tập-1-badge-giảm-giá--nhãn-mới-trên-bìa-sách)
     - [Bài tập 2: Nút giỏ hàng nổi (Floating Cart Button)](#bài-tập-2-nút-giỏ-hàng-nổi-floating-cart-button)
   - [BÀI TẬP TỔNG HỢP GIỜ 1 + 2 + 3: TRANG CHỦ HOÀN CHỈNH](#bài-tập-tổng-hợp-giờ-1--2--3-trang-chủ-hoàn-chỉnh)
4. [Bảng kiểm tra tiêu chí nghiệm thu (Checklist)](#4-bảng-kiểm-tra-tiêu-chí-nghiệm-thu-checklist)
5. [Bảng tổng hợp kiến thức Flexbox & Position trong React Native](#5-bảng-tổng-hợp-kiến-thức-flexbox--position-trong-react-native)

---

## 1. TỔNG QUAN CẤU TRÚC DỰ ÁN

Trong thư mục bài tập `TranThienBao_23690781_week3\Teaching_Day3`, toàn bộ các bài tập được tổ chức bài bản thành các thư mục tương ứng với từng giờ học và 1 thư mục tổng hợp:

```
TranThienBao_23690781_week3/
│
├── Week_3_Layout_UI.pdf                          # File đề bài gốc
├── HUONG_DAN_CHI_TIET_VA_MINH_CHUNG.md           # File báo cáo & hướng dẫn minh chứng này
│
└── Teaching_Day3/
    ├── bookstore-online-gio1/                    # Dự án Giờ 1: Flexbox cơ bản (Header, BookRowCard)
    │   ├── components/
    │   │   ├── Header.tsx                        # Bài tập 1 Giờ 1
    │   │   └── BookRowCard.tsx                   # Bài tập 2 Giờ 1
    │   ├── App.tsx                               # Màn hình chạy thử Giờ 1
    │   └── data.ts                               # Dữ liệu sách mẫu
    │
    ├── bookstore-online-gio2/                    # Dự án Giờ 2: Wrap, Kích thước, Lưới Grid
    │   ├── components/
    │   │   ├── CategoryChips.tsx                 # Bài tập 1 Giờ 2
    │   │   ├── BookGrid.tsx                      # Bài tập 2 Giờ 2
    │   │   └── DiscountBadge.tsx
    │   ├── App.tsx                               # Màn hình chạy thử Giờ 2
    │   └── data.ts
    │
    ├── bookstore-online-gio3/                    # Dự án Giờ 3: Position Absolute & Overlay
    │   ├── components/
    │   │   ├── DiscountBadge.tsx                 # Bài tập 1 Giờ 3
    │   │   ├── FloatingCartButton.tsx            # Bài tập 2 Giờ 3
    │   │   └── BookGrid.tsx
    │   ├── App.tsx                               # Màn hình chạy thử Giờ 3
    │   └── data.ts
    │
    └── bookstore-online-tonghop/                 # Dự án Bài tập Tổng hợp Giờ 1 + 2 + 3
        ├── components/                           # Đầy đủ 5 components ghép nối:
        │   ├── Header.tsx                        # (từ gio1)
        │   ├── BookRowCard.tsx                   # (từ gio1)
        │   ├── CategoryChips.tsx                 # (từ gio2)
        │   ├── BookGrid.tsx                      # (từ gio2/gio3)
        │   ├── DiscountBadge.tsx                 # (từ gio3)
        │   └── FloatingCartButton.tsx            # (từ gio3)
        ├── App.tsx                               # App hoàn chỉnh ghép đúng cấu trúc 3 tầng
        ├── data.ts                               # Dữ liệu danh mục & sách
        ├── package.json
        ├── tsconfig.json
        └── app.json
```

---

## 2. HƯỚNG DẪN CÀI ĐẶT VÀ KHỞI CHẠY DỰ ÁN

Để chạy và chụp ảnh minh chứng cho từng bài tập, bạn có thể chạy trên trình duyệt Web (nhanh nhất, dễ chụp màn hình bằng Snipping Tool) hoặc chạy trên điện thoại thật thông qua ứng dụng **Expo Go**.

### Cách 1: Chạy trên Web Browser (Khuyên dùng để chụp ảnh báo cáo nét nhất)
1. Mở Terminal (PowerShell hoặc Command Prompt) tại thư mục dự án cần chụp, ví dụ dự án Tổng hợp:
   ```bash
   cd "t:\TranThienBao_23690781_week3\Teaching_Day3\bookstore-online-tonghop"
   ```
2. Cài đặt dependencies (nếu chưa có thư mục `node_modules`):
   ```bash
   npm install
   ```
3. Khởi chạy ứng dụng chế độ Web:
   ```bash
   npx expo start --web
   ```
   Trình duyệt (Chrome/Edge) sẽ tự động mở trang `http://localhost:8081`. Bạn có thể ấn phím `F12` và chuyển sang chế độ thiết bị di động (Responsive Device Toolbar, ví dụ iPhone 12 Pro hoặc Pixel 7) để giao diện chuẩn như trên điện thoại.

### Cách 2: Chạy trên điện thoại qua Expo Go
1. Chạy lệnh:
   ```bash
   npx expo start
   ```
2. Mở app **Expo Go** trên điện thoại (cùng mạng Wi-Fi với máy tính), quét mã QR hiển thị trên Terminal.

### Cách 3: Kiểm tra lỗi TypeScript không biên dịch (Tiêu chí chấm điểm bắt buộc)
Chạy lệnh kiểm tra TypeScript trên terminal:
```bash
npx tsc --noEmit
```
Kết quả không xuất hiện dòng lỗi đỏ nào nghĩa là mã nguồn đạt chuẩn 100%.

---

## 3. GIẢI CHI TIẾT CÁC BÀI TẬP, GIẢI THÍCH LÝ THUYẾT & HƯỚNG DẪN CHỤP ẢNH MINH CHỨNG

---

### GIỜ 1 — NỀN TẢNG FLEXBOX & LAYOUT ĐƠN GIẢN

#### Bài tập 1: Header ứng dụng BookStore

##### 1. Đề bài & Yêu cầu kỹ thuật
* Dựng thanh header cố định trên cùng màn hình gồm:
  - Logo/tên app bên trái (`📚 BookStore`).
  - Icon tìm kiếm (`🔍`) và icon giỏ hàng (`🛒`) bên phải.
  - Căn giữa các phần tử theo chiều dọc.
* Yêu cầu:
  - Container header dùng: `flexDirection: 'row'`, `justifyContent: 'space-between'`, `alignItems: 'center'`.
  - `paddingHorizontal: 16`, chiều cao cố định `height: 56`.
  - Nền header dùng màu navy/indigo (`#1E1B4B`).
  - Gợi ý: Hai icon bên phải đặt trong một `View` con dùng `flexDirection: 'row'` với khoảng cách (`gap` hoặc `marginLeft`).

##### 2. Mã nguồn giải bài (`components/Header.tsx`)
```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Header() {
  return (
    <View style={styles.header}>
      {/* 1. Logo / Tên ứng dụng bên trái */}
      <Text style={styles.logo}>📚 BookStore</Text>

      {/* 2. Nhóm 2 icon bên phải được bọc trong 1 View con xếp hàng ngang */}
      <View style={styles.iconGroup}>
        <Text style={styles.icon}>🔍</Text>
        <Text style={styles.icon}>🛒</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",            // Xếp Logo và Nhóm icon theo chiều ngang (trục chính X)
    justifyContent: "space-between", // Đẩy 2 khối dạt về 2 đầu mép biên (trái và phải)
    alignItems: "center",            // Căn giữa theo trục chéo Y (chiều cao 56px)
    height: 56,                      // Chiều cao cố định chuẩn Mobile App Bar
    paddingHorizontal: 16,           // Cách mép trái và mép phải 16px
    backgroundColor: "#1E1B4B",      // Màu Navy/Indigo chủ đạo
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  iconGroup: {
    flexDirection: "row",            // 2 icon nằm ngang cạnh nhau
    gap: 14,                         // Khoảng cách đều giữa 2 icon
  },
  icon: {
    fontSize: 18,
  },
});
```

##### 3. Giải thích chuyên sâu về Flexbox
1. **Khác biệt cốt lõi giữa React Native và CSS Web**:
   - Trên Web CSS: `flexDirection` mặc định là `row` (hàng ngang).
   - Trong React Native: `flexDirection` mặc định là `column` (cột dọc). Do đó, để Header xếp ngang, **bắt buộc** phải khai báo `flexDirection: 'row'`.
2. **Trục chính (Main Axis) & `justifyContent: 'space-between'`**:
   - Khi `flexDirection: 'row'`, trục chính là trục hoành (X).
   - `justifyContent: 'space-between'` phân phối khoảng trống còn thừa vào giữa các con trực tiếp: con đầu tiên (Logo) dính sát mép trái, con cuối cùng (iconGroup) dính sát mép phải.
3. **Trục chéo (Cross Axis) & `alignItems: 'center'`**:
   - Trục chéo lúc này là trục tung (Y).
   - `alignItems: 'center'` giúp chữ Logo và các icon luôn nằm chính xác ở tâm giữa chiều cao 56px của Header, không bị lệch lên trên hay thụt xuống dưới.
4. **Tại sao phải bọc 2 icon trong `iconGroup`?**:
   - Nếu để riêng lẻ `Text Logo`, `Text Search`, `Text Cart` trực tiếp trong Header thì `space-between` sẽ chia 3 phần tử thành 3 vị trí (Trái, Giữa, Phải). Bằng cách bọc 2 icon trong một `View` con, Header chỉ xem như có đúng 2 phần tử con trực tiếp để đẩy sang 2 cực.

##### 4. Hướng dẫn chụp ảnh minh chứng
* **Ảnh 1 (Giao diện hiển thị)**: Chụp phần trên cùng của ứng dụng.
  - *Vị trí cần khoanh tròn*: 
    - [Khoanh đỏ 1]: Logo `📚 BookStore` nằm sát mép trái (cách lề 16px).
    - [Khoanh đỏ 2]: 2 icon `🔍` và `🛒` nằm sát mép phải, cách nhau đều đặn.
    - [Khoanh đỏ 3]: Toàn bộ nội dung căn giữa chiều cao thanh màu nền tím đậm `#1E1B4B`.
* **Ảnh 2 (Mã nguồn VS Code)**: Chụp file `components/Header.tsx`, bôi sáng đoạn style:
  - `flexDirection: 'row'`
  - `justifyContent: 'space-between'`
  - `alignItems: 'center'`
  - `height: 56`, `paddingHorizontal: 16`

---

#### Bài tập 2: Thẻ sách (Book Card) đơn

##### 1. Đề bài & Yêu cầu kỹ thuật
* Dựng 1 thẻ sách gồm: ảnh bìa bên trái (kích thước cố định), phần thông tin bên phải (tên sách, tác giả, giá) xếp theo cột.
* Yêu cầu:
  - Card ngoài cùng: `flexDirection: 'row'`, `alignItems: 'flex-start'` (hoặc `'center'` — so sánh 2 cách).
  - Ảnh bìa: width/height cố định (80x110), `borderRadius: 8`.
  - Cột thông tin: `flex: 1` để chiếm phần không gian còn lại, `flexDirection: 'column'`.
  - Giá tiền căn dưới cùng của cột thông tin bằng `justifyContent: 'space-between'` trên trục dọc.
  - Tên sách xử lý bằng `numberOfLines={2}` trên Text.

##### 2. Mã nguồn giải bài (`components/BookRowCard.tsx`)
```tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Book } from "../data";

const COVER_WIDTH = 80;
const COVER_HEIGHT = 110;

export function BookRowCard({ book }: { book: Book }) {
  return (
    <View style={styles.card}>
      {/* 1. Ảnh bìa bên trái kích thước cố định */}
      <Image source={{ uri: book.cover }} style={styles.cover} />

      {/* 2. Cột thông tin bên phải: flex: 1 chiếm hết khoảng trống, height bằng ảnh bìa */}
      <View style={styles.info}>
        <View>
          {/* Giới hạn tối đa 2 dòng, tự thêm dấu 3 chấm (...) nếu quá dài */}
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author}>{book.author}</Text>
        </View>

        {/* Giá tiền được neo sát đáy cột */}
        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",      // Ảnh nằm bên trái, cột chữ nằm bên phải
    alignItems: "flex-start",  // Ảnh và cột chữ bắt đầu từ mép trên cùng
    padding: 12,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  cover: {
    width: COVER_WIDTH,        // 80px cố định
    height: COVER_HEIGHT,      // 110px cố định
    borderRadius: 8,
    backgroundColor: "#EEF2F7",
  },
  info: {
    flex: 1,                   // Chiếm trọn không gian chiều ngang còn lại của card
    height: COVER_HEIGHT,      // Chiều cao đúng bằng chiều cao ảnh bìa (110px)
    flexDirection: "column",   // Trục chính là dọc (Y): Khối Tên/Tác giả ở trên, Giá ở dưới
    justifyContent: "space-between", // Đẩy Giá tiền xuống tận cùng đáy cột
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  author: {
    fontSize: 12,
    color: "#5B6B7F",
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1B4B",
  },
});
```

##### 3. Giải thích chuyên sâu về Flexbox & Kỹ thuật
1. **Vai trò của `flex: 1` trên cột thông tin**:
   - Card ngoài có tổng chiều rộng 100%. Ảnh bìa chiếm 80px, khoảng cách `gap` là 12px, padding 2 bên 24px.
   - Nhờ `flex: 1`, khối `info` tự động giãn nở ăn hết phần chiều rộng còn lại của màn hình mà không cần phải tính toán số px cố định. Khi chạy trên màn hình nhỏ hay máy tính bảng, cột chữ tự co giãn theo.
2. **Kỹ thuật neo giá tiền xuống đáy bằng `justifyContent: 'space-between'`**:
   - Trong khối `info`, trục chính là chiều dọc (`flexDirection: 'column'`).
   - Ta gán `height: COVER_HEIGHT` (110px) để cố định không gian dọc của cột thông tin bằng với ảnh bìa.
   - Khi đó `justifyContent: 'space-between'` sẽ đẩy nhóm `[Tựa sách + Tác giả]` lên đỉnh và đẩy `[Giá tiền]` xuống sát đáy. Bất kể tựa sách dài 1 dòng hay 2 dòng, giá tiền của tất cả các cuốn sách luôn nằm ngang hàng thẳng thớm ở đáy thẻ!
3. **So sánh 2 cách `alignItems: 'flex-start'` và `'center'`**:
   - `'flex-start'`: Cả đỉnh ảnh bìa và đỉnh chữ bắt đầu cùng một đường thẳng phía trên (chuẩn UI danh mục sách thông dụng).
   - `'center'`: Nếu cột thông tin ngắn hơn ảnh bìa, toàn bộ khối thông tin sẽ bị căn lơ lửng ở giữa chiều cao ảnh bìa.
4. **Tại sao bắt buộc phải dùng `numberOfLines={2}`?**:
   - Nếu có những cuốn sách tên quá dài (3-4 dòng), nếu không có `numberOfLines={2}`, tên sách sẽ phình to đẩy văng giá tiền ra khỏi chiều cao 110px của ảnh, làm vỡ khung layout. `numberOfLines={2}` đảm bảo hiển thị tối đa 2 dòng kèm dấu chấm lửng `...` an toàn tuyệt đối.

##### 4. Hướng dẫn chụp ảnh minh chứng
* **Ảnh 1 (Giao diện hiển thị)**: Chụp danh sách thẻ sách trong dự án `bookstore-online-gio1`.
  - *Vị trí khoanh đỏ*:
    - [Khoanh đỏ 1]: Thẻ sách có tên ngắn 1 dòng (ví dụ "Nhà Giả Kim") và thẻ sách có tên dài 2 dòng (ví dụ "Điều Kỳ Diệu Của Tiệm Tạp Hoá Namiya").
    - [Khoanh đỏ 2]: Giá tiền của cả 2 thẻ đều nằm thẳng hàng ngay ngắn ở đáy dưới cùng.
    - [Khoanh đỏ 3]: Ảnh bìa bo tròn góc, tỉ lệ chuẩn 80x110.
* **Ảnh 2 (Mã nguồn VS Code)**: Chụp file `components/BookRowCard.tsx`, highlight `flex: 1`, `height: COVER_HEIGHT`, `justifyContent: 'space-between'`, `numberOfLines={2}`.

---

### GIỜ 2 — KÍCH THƯỚC, WRAP VÀ LƯỚI SẢN PHẨM (GRID)

#### Bài tập 1: Danh sách danh mục dạng chip (Category Chips)

##### 1. Đề bài & Yêu cầu kỹ thuật
* Dựng hàng các "chip" danh mục sách (Văn học, Kinh tế, Thiếu nhi, Kỹ năng sống, Truyện tranh, Ngoại ngữ, Lịch sử...) tự động xuống dòng khi tràn màn hình.
* Yêu cầu:
  - Container: `flexDirection: 'row'`, `flexWrap: 'wrap'`, `gap: 8`.
  - Mỗi chip: `paddingHorizontal`, `paddingVertical`, `borderRadius` lớn (dạng pill - viên thuốc), viền `borderWidth: 1` màu indigo (`#6366F1`).
  - So sánh khi có `alignContent: 'flex-start'` và khi không có.
  - Width của mỗi chip để `auto` theo nội dung chữ, không set cố định.

##### 2. Mã nguồn giải bài (`components/CategoryChips.tsx`)
```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CATEGORIES } from "../data";

export function CategoryChips() {
  return (
    <View style={styles.wrap}>
      {CATEGORIES.map((name) => (
        <View key={name} style={styles.chip}>
          {/* Chiều rộng tự co giãn theo độ dài từng từ */}
          <Text style={styles.chipText}>{name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",  // Xếp các chip từ trái sang phải
    flexWrap: "wrap",      // TỰ ĐỘNG XUỐNG DÒNG khi hết chỗ ngang màn hình
    gap: 8,                // Tạo khoảng cách 8px đều đặn giữa các chip (cả dòng lẫn cột)
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,     // Bo tròn cực đại -> tạo hình viên thuốc (pill badge)
    borderWidth: 1,
    borderColor: "#6366F1",// Màu viền tím indigo
    backgroundColor: "#FFFFFF",
  },
  chipText: {
    color: "#4338CA",
    fontSize: 13,
    fontWeight: "600",
  },
});
```

##### 3. Giải thích chuyên sâu về Flexbox
1. **Thuộc tính `flexWrap: 'wrap'`**:
   - Theo mặc định trong Flexbox, `flexWrap` có giá trị là `nowrap` (tất cả phần tử bị ép nằm trên cùng 1 hàng, gây tràn màn hình hoặc bị co rúm biến dạng chữ).
   - Khi đặt `flexWrap: 'wrap'`, Flexbox sẽ tính toán tổng chiều rộng của các chip trên hàng hiện tại: nếu thêm chip tiếp theo mà vượt quá chiều rộng container, Flexbox tự động bẻ chip đó xuống dòng mới.
2. **Thuộc tính `gap: 8` thay thế cho margin truyền thống**:
   - Trước đây khi chưa có `gap`, lập trình viên phải đặt `marginRight: 8` và `marginBottom: 8` cho từng chip, dẫn đến việc chip cuối hàng bị thừa margin làm lệch lề phải.
   - `gap: 8` tạo khoảng trống chỉ nằm Ở GIỮA các phần tử, giữ cho lề trái và lề phải của container hoàn toàn vuông vắn.
3. **So sánh `alignContent: 'flex-start'` vs Mặc định**:
   - Khi container bao bọc có chiều cao cố định lớn hơn tổng chiều cao các dòng chip:
     * Mặc định (`alignContent: 'stretch'` hoặc không set): Các dòng chip sẽ bị phân bố giãn đều theo chiều dọc, tạo ra khoảng cách lớn giữa các dòng.
     * Có `alignContent: 'flex-start'`: Toàn bộ các dòng chip sẽ co cụm lại dính sát từ trên đỉnh xuống, khoảng cách giữa các dòng chỉ đúng bằng `gap: 8`.

##### 4. Hướng dẫn chụp ảnh minh chứng
* **Ảnh 1 (Giao diện hiển thị)**: Chụp khối danh mục thể loại trong `bookstore-online-gio2` hoặc dự án tổng hợp.
  - *Vị trí khoanh đỏ*:
    - [Khoanh đỏ 1]: Hàng 1 chứa các chip "Văn học", "Kinh tế", "Thiếu nhi".
    - [Khoanh đỏ 2]: Hàng 2 tự động ngắt xuống dòng chứa "Kỹ năng sống", "Truyện tranh".
    - [Khoanh đỏ 3]: Hàng 3 chứa "Ngoại ngữ", "Lịch sử".
    - [Khoanh đỏ 4]: Các chip có hình viên thuốc (bo tròn góc) và viền màu tím nhạt.
* **Ảnh 2 (Mã nguồn VS Code)**: Chụp file `components/CategoryChips.tsx`, highlight `flexWrap: 'wrap'`, `gap: 8`, `borderRadius: 999`.

---

#### Bài tập 2: Lưới sản phẩm 2 cột (Book Grid)

##### 1. Đề bài & Yêu cầu kỹ thuật
* Dựng lưới hiển thị Book Card dạng lưới 2 cột (ảnh bìa phía trên, tên + giá phía dưới), dùng phần trăm chiều rộng để chia cột — chưa dùng FlatList/numColumns, chỉ luyện Flexbox thuần.
* Yêu cầu:
  - Container ngoài: `flexDirection: 'row'`, `flexWrap: 'wrap'`, `justifyContent: 'space-between'`.
  - Mỗi item: `width: '48%'` (chừa khoảng trống ở giữa 2 cột), `marginBottom: 16` cho khoảng cách giữa các hàng.
  - Ảnh bìa trong item: `width: '100%'`, `aspectRatio: 3/4` thay vì height cố định.
  - Thử thách: So sánh 2 cách chia lưới (cách 48% + space-between so với cách dùng `gap` 3 cột).

##### 2. Mã nguồn giải bài (`components/BookGrid.tsx`)
```tsx
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../data";
import { DiscountBadge } from "./DiscountBadge";

export function BookGrid({ books, onPressBook }: { books: Book[]; onPressBook: (id: number) => void }) {
  return (
    <View style={styles.grid}>
      {books.map((book) => (
        <Pressable
          key={book.id}
          style={styles.item}
          onPress={() => onPressBook(book.id)}
        >
          {/* View bọc ảnh: position relative làm mốc toạ độ cho DiscountBadge */}
          <View style={styles.coverWrap}>
            <Image source={{ uri: book.cover }} style={styles.cover} />
            <DiscountBadge discountPercent={book.discountPercent} isNew={book.isNew} />
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",            // Các item chảy theo hàng ngang...
    flexWrap: "wrap",                // ...rồi tự xuống dòng tạo thành lưới
    justifyContent: "space-between", // Tự động đẩy cột 1 sang trái, cột 2 sang phải
  },
  item: {
    width: "48%",                    // Mỗi cột chiếm 48%, 2 cột = 96%, dư 4% làm rãnh giữa
    marginBottom: 16,                // Khoảng cách giữa các hàng sản phẩm
  },
  coverWrap: {
    position: "relative",            // BẮT BUỘC: Làm containing block cho Badge absolute
    width: "100%",
    aspectRatio: 3 / 4,              // Giữ tỉ lệ chuẩn khung ảnh sách (rộng 3, cao 4)
    borderRadius: 8,
    overflow: "hidden",              // Cắt các góc ảnh theo bo viền 8px
    backgroundColor: "#EEF2F7",
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  price: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1B4B",
  },
});
```

##### 3. Giải thích chuyên sâu về Flexbox
1. **Toán học đằng sau tỷ lệ `width: '48%'` + `justifyContent: 'space-between'`**:
   - Container có tổng độ rộng là `100%`.
   - Với 2 cột: Mỗi cuốn sách rộng `48%`. Hai cuốn sách trên 1 hàng sẽ chiếm: `48% + 48% = 96%`.
   - Khoảng trống còn dư lại là: `100% - 96% = 4%`.
   - Thuộc tính `justifyContent: 'space-between'` sẽ tự động lấy toàn bộ `4%` dư thừa này đặt chính giữa 2 cột sách. Điều này tạo ra một rãnh ngăn cách hoàn hảo, không phụ thuộc vào màn hình điện thoại to hay nhỏ!
2. **Tại sao dùng `aspectRatio: 3/4` mà KHÔNG dùng `height` cố định?**:
   - Chiều rộng của item là tỷ lệ phần trăm (`48%`), nghĩa là trên iPhone SE chiều rộng item khoảng `160px`, nhưng trên iPad chiều rộng item có thể lên tới `360px`.
   - Nếu ta đặt `height: 200` cố định:
     * Trên màn hình nhỏ: ảnh bị kéo dài ngoằng (méo dọc).
     * Trên màn hình to: ảnh bị bè ngang (méo ngang).
   - Khi đặt `aspectRatio: 3 / 4` (nghĩa là $\text{Chiều cao} = \text{Chiều rộng} \times \frac{4}{3}$), chiều cao sẽ tự động biến thiên tương ứng theo chiều rộng thật của thiết bị, đảm bảo hình ảnh bìa sách luôn giữ đúng tỷ lệ ban đầu, sắc nét và không bao giờ bị méo mó.

##### 4. Hướng dẫn chụp ảnh minh chứng
* **Ảnh 1 (Giao diện hiển thị)**: Chụp lưới sách 2 cột hiển thị đầy đủ các cuốn sách.
  - *Vị trí khoanh đỏ*:
    - [Khoanh đỏ 1]: Hai cột sách phân bố cân xứng, thẳng hàng dọc từ trên xuống dưới.
    - [Khoanh đỏ 2]: Rãnh phân cách giữa 2 cột đều đặn.
    - [Khoanh đỏ 3]: Ảnh bìa không bị méo, hiển thị đúng tỷ lệ sách 3:4.
* **Ảnh 2 (Mã nguồn VS Code)**: Chụp file `components/BookGrid.tsx`, highlight `width: '48%'`, `justifyContent: 'space-between'`, `aspectRatio: 3 / 4`.

---

### GIỜ 3 — POSITION, ALIGNSELF VÀ CÁC LỚP PHỦ (OVERLAY)

#### Bài tập 1: Badge giảm giá / Nhãn "Mới" trên bìa sách

##### 1. Đề bài & Yêu cầu kỹ thuật
* Thêm nhãn giảm giá (ví dụ `-20%`, `-15%`) hoặc nhãn `Mới` nổi ở góc trên-trái của ảnh bìa sách, chồng lên ảnh chứ không đẩy layout.
* Yêu cầu:
  - `View` chứa ảnh bìa cần `position: 'relative'` để làm containing block.
  - Badge dùng `position: 'absolute'`, `top: 6`, `left: 6`.
  - Badge có màu nổi bật: đỏ (`#DC2626`) cho giảm giá, cam (`#F97316`) cho sách mới; `borderRadius: 4`, padding vừa đủ ôm chữ.

##### 2. Mã nguồn giải bài (`components/DiscountBadge.tsx`)
```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function DiscountBadge({ discountPercent, isNew }: { discountPercent?: number; isNew?: boolean }) {
  // Sách bình thường không có ưu đãi -> không render gì cả
  if (!discountPercent && !isNew) return null;

  return (
    <View style={[styles.badge, isNew && styles.badgeNew]}>
      <Text style={styles.badgeText}>
        {isNew ? "Mới" : `-${discountPercent}%`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",       // Thoát khỏi luồng layout thông thường
    top: 6,                     // Cách mép trên của containing block (ảnh) 6px
    left: 6,                    // Cách mép trái của containing block (ảnh) 6px
    backgroundColor: "#DC2626", // Màu đỏ nổi bật cho giảm giá
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 10,                 // Đảm bảo luôn nằm đè lên trên ảnh bìa
  },
  badgeNew: {
    backgroundColor: "#F97316", // Màu cam tươi cho sách "Mới"
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
```

##### 3. Giải thích chuyên sâu về Cơ chế Containing Block
1. **Bản chất của `position: 'absolute'`**:
   - Khi một phần tử có `position: 'absolute'`, nó được nhấc bổng khỏi luồng layout thông thường (Normal Flow). Nó không chiếm diện tích hiển thị và không đẩy bất kỳ phần tử nào khác xung quanh nó.
2. **Nguyên tắc vàng của Containing Block**:
   - Các tọa độ `top: 6, left: 6` sẽ định vị theo cái gì? Câu trả lời: Nó sẽ tìm phần tử tổ tiên gần nhất có thuộc tính `position` khác `static` (trong React Native là `position: 'relative'`).
   - Trong `BookGrid.tsx`, ta có:
     ```tsx
     coverWrap: {
       position: 'relative', // ĐÂY CHÍNH LÀ KHUNG MỐC TỌA ĐỘ
       width: '100%',
       aspectRatio: 3 / 4,
     }
     ```
   - Do đó, `top: 6, left: 6` sẽ dính chính xác vào góc trên-trái của **ảnh bìa cuốn sách đó**.
3. **Hiện tượng lỗi nếu quên `position: 'relative'`**:
   - Nếu `coverWrap` không có `position: 'relative'`, Badge sẽ tiếp tục tìm ngược lên cha cao hơn (màn hình ngoài cùng). Khi đó toàn bộ badge của tất cả các cuốn sách sẽ bay tuốt lên góc trên-trái của đỉnh màn hình điện thoại và chồng chất lên nhau!

##### 4. Hướng dẫn chụp ảnh minh chứng
* **Ảnh 1 (Giao diện hiển thị)**: Chụp cận cảnh lưới sách.
  - *Vị trí khoanh đỏ*:
    - [Khoanh đỏ 1]: Cuốn "Dế Mèn Phiêu Lưu Ký" có badge màu đỏ `-20%` nằm gọn gàng đè lên góc trên-trái của ảnh bìa.
    - [Khoanh đỏ 2]: Cuốn "Nhà Giả Kim" có badge màu cam `Mới` nằm ở cùng vị trí.
    - [Khoanh đỏ 3]: Cuốn "Sapiens" không có ưu đãi nên không xuất hiện badge nào.
* **Ảnh 2 (Mã nguồn VS Code)**: Chụp song song 2 đoạn code:
  - Đoạn 1 trong `DiscountBadge.tsx`: `position: 'absolute'`, `top: 6`, `left: 6`.
  - Đoạn 2 trong `BookGrid.tsx`: `coverWrap: { position: 'relative' }`.

---

#### Bài tập 2: Nút giỏ hàng nổi (Floating Cart Button)

##### 1. Đề bài & Yêu cầu kỹ thuật
* Dựng nút giỏ hàng hình tròn nổi ở góc dưới-phải màn hình, luôn hiển thị đè lên nội dung cuộn bên dưới, kèm số lượng sản phẩm nhỏ ở góc.
* Yêu cầu:
  - Nút chính: `position: 'absolute'`, `bottom: 24`, `right: 20`, chiều rộng và chiều cao bằng nhau (`56px`), `borderRadius = width / 2` (`28px`) để tạo hình tròn hoàn hảo.
  - Số lượng sản phẩm (Cart Badge): một `View` nhỏ `position: 'absolute'` đặt ở góc trên-phải của chính nút tròn (`top: -4, right: -4`).
  - Container ngoài cùng của màn hình cần `flex: 1` và `position: 'relative'` để nút định vị theo toàn màn hình.

##### 2. Mã nguồn giải bài (`components/FloatingCartButton.tsx`)
```tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const SIZE = 56;

export function FloatingCartButton({ count, onPress }: { count: number; onPress: () => void }) {
  return (
    // Cấp 1: Nút tròn chính - absolute định vị theo toàn màn hình
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonIcon}>🛒</Text>

      {/* Cấp 2: Badge số lượng - absolute lồng nhau, định vị theo Nút tròn */}
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",       // Nổi độc lập trên màn hình
    bottom: 24,                 // Cách đáy màn hình 24px
    right: 20,                  // Cách mép phải màn hình 20px
    width: SIZE,                // 56px
    height: SIZE,               // 56px
    borderRadius: SIZE / 2,     // 28px -> tạo hình tròn hoàn hảo
    backgroundColor: "#4338CA", // Màu tím đậm sang trọng
    alignItems: "center",       // Căn giữa icon giỏ hàng theo chiều ngang
    justifyContent: "center",    // Căn giữa icon giỏ hàng theo chiều dọc
    elevation: 6,               // Đổ bóng nổi khối trên Android
    shadowColor: "#000",        // Đổ bóng nổi khối trên iOS/Web
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    zIndex: 999,                // Luôn nổi trên các nội dung cuộn
  },
  buttonIcon: {
    fontSize: 22,
  },
  badge: {
    position: "absolute",       // Absolute cấp 2: Neo theo nút tròn cha
    top: -4,                    // Nhô lên trên mép nút tròn 4px
    right: -4,                  // Nhô sang phải mép nút tròn 4px
    minWidth: 20,
    height: 20,
    borderRadius: 10,           // Bo tròn hình tròn/oval cho số lượng
    backgroundColor: "#DC2626", // Nền đỏ rực rỡ
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
```

##### 3. Giải thích chuyên sâu: Kỹ thuật Containing Block Lồng Nhau (Nested Containing Block)
Đây là một trong những kỹ thuật layout nâng cao quan trọng nhất trong lập trình giao diện:
1. **Tầng 1 (Nút tròn -> Màn hình)**:
   - `styles.button` có `position: 'absolute'`. Container ngoài cùng của màn hình là `<View style={{ flex: 1 }}>`.
   - Do đó, `bottom: 24` và `right: 20` sẽ neo nút giỏ hàng cố định ở góc dưới-phải của cả màn hình điện thoại.
2. **Tầng 2 (Badge số đếm -> Nút tròn)**:
   - `styles.badge` cũng có `position: 'absolute'`. Nhưng nó nằm BÊN TRONG thẻ `<Pressable style={styles.button}>`.
   - Bản thân `Pressable` đã có `position: 'absolute'` (khác `static`), nên nó lập tức trở thành **Containing Block** cho các phần tử con của nó!
   - Vì thế, toạ độ `top: -4, right: -4` của badge số đếm sẽ lấy góc trên-phải của chính nút tròn làm gốc toạ độ (0, 0).
   - **Lợi ích**: Khi ta di chuyển nút tròn đi bất cứ đâu trên màn hình (đổi sang `bottom: 50, right: 30`), badge số đếm màu đỏ tự động đi theo nút tròn một cách hoàn hảo mà không cần tính toán lại toạ độ!

##### 4. Hướng dẫn chụp ảnh minh chứng
* **Ảnh 1 (Giao diện hiển thị)**: Chụp góc dưới màn hình khi giỏ hàng có sản phẩm.
  - *Vị trí khoanh đỏ*:
    - [Khoanh đỏ 1]: Nút tròn giỏ hàng màu tím nằm cố định ở góc dưới bên phải.
    - [Khoanh đỏ 2]: Badge tròn màu đỏ chứa số đếm (ví dụ số `2` hoặc `3`) dính chặt ở góc trên bên phải nút tròn.
* **Ảnh 2 (Minh chứng tương tác)**: 
  - Chụp ảnh trước khi bấm vào sách (số lượng giỏ hàng = 0 hoặc chưa hiện badge).
  - Chụp ảnh sau khi bấm vào 2 cuốn sách (số lượng giỏ hàng nhảy lên số 2).
* **Ảnh 3 (Mã nguồn VS Code)**: Chụp file `components/FloatingCartButton.tsx`, highlight `borderRadius: SIZE / 2`, `position: 'absolute'`, và cấu trúc chứa `styles.badge`.

---

### BÀI TẬP TỔNG HỢP GIỜ 1 + 2 + 3: TRANG CHỦ HOÀN CHỈNH

#### 1. Mục tiêu & Yêu cầu đề bài
Ghép 3 project `gio1`, `gio2`, `gio3` thành **1 màn hình Trang chủ duy nhất** tại thư mục `Teaching_Day3/bookstore-online-tonghop`, sắp xếp đúng thứ tự:
1. **Header** trên cùng (cố định).
2. **ScrollView** ở giữa chứa:
   - Danh mục thể loại (**Category Chips**).
   - Lưới sách 2 cột (**Book Grid**) tích hợp nhãn ưu đãi (**Discount Badge**).
3. **Floating Cart Button** nổi ở góc dưới-phải (nằm NGOÀI ScrollView).

#### 2. Mã nguồn hoàn chỉnh (`Teaching_Day3/bookstore-online-tonghop/App.tsx`)
```tsx
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  // Tương tác: Bấm vào cuốn sách nào thì tăng số lượng giỏ hàng lên 1
  const handlePressBook = (id: number) => {
    setCartCount((prev) => prev + 1);
  };

  // Tương tác: Bấm vào nút giỏ hàng để xem thông báo
  const handlePressCart = () => {
    alert(`Giỏ hàng của bạn đang có ${cartCount} sản phẩm.`);
  };

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng — KHÔNG nằm trong ScrollView */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid — cuộn mượt mà */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Danh mục thể loại</Text>
        <CategoryChips />

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} onPressBook={handlePressBook} />
      </ScrollView>

      {/* 3. Nút giỏ nổi — Nằm NGOÀI ScrollView để luôn ghim ở góc màn hình */}
      <FloatingCartButton count={cartCount} onPress={handlePressCart} />
      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 16,
    paddingBottom: 100, // BẮT BUỘC: Đệm dưới 100px để nút giỏ hàng không che mất sách cuối cùng
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    marginBottom: 10,
  },
});
```

#### 3. Phân tích cấu trúc cây Component (Component Hierarchy)
```
<View style={styles.screen}> (flex: 1 — Chiếm trọn màn hình)
  │
  ├── <Header />                  ───> [TẦNG 1]: Cố định đỉnh màn hình
  │
  ├── <ScrollView>                ───> [TẦNG 2]: Vùng cuộn nội dung
  │     ├── <CategoryChips />     ───> Dòng chip danh mục tự xuống dòng
  │     └── <BookGrid>            ───> Lưới sách 2 cột
  │           └── <DiscountBadge> ───> Nhãn giảm giá / Mới đè trên ảnh
  │
  └── <FloatingCartButton />      ───> [TẦNG 3]: Cố định góc dưới màn hình
```

##### Tại sao phải đặt cấu trúc như vậy?
1. **Header đứng yên khi cuộn**:
   - `Header` là anh em cùng cấp (sibling) với `ScrollView`, nằm phía trên `ScrollView`. Khi người dùng vuốt ngón tay để cuộn danh sách, sự kiện cuộn chỉ xảy ra bên trong phạm vi của `ScrollView`. `Header` hoàn toàn nằm ngoài nên sẽ luôn ghim chặt ở đỉnh màn hình!
2. **FloatingCartButton không bị cuộn trôi mất**:
   - Tương tự, `FloatingCartButton` được đặt sau `ScrollView`. Do nó có `position: 'absolute'` và nằm ngoài `ScrollView`, nó luôn nổi trên bề mặt màn hình tại toạ độ `bottom: 24, right: 20`.
3. **Ý nghĩa sống còn của `paddingBottom: 100`**:
   - Do nút giỏ hàng có đường kính 56px và cách đáy 24px (chiếm tổng cộng 80px chiều cao góc dưới), nếu không có `paddingBottom: 100` trong `contentContainerStyle`, cuốn sách cuối cùng trong danh sách khi cuộn hết cỡ sẽ bị nút giỏ hàng đè lên và che khuất thông tin giá tiền. Thuộc tính `paddingBottom: 100` tạo khoảng trống an toàn để người dùng nhìn thấy 100% nội dung sách cuối.

---

## 4. BẢNG KIỂM TRA TIÊU CHÍ NGHIỆM THU (CHECKLIST)
*(Dựa trên đúng 4 tiêu chuẩn nghiệm thu ở trang 5 của file PDF)*

Dưới đây là bảng 4 tiêu chí bắt buộc và hướng dẫn cụ thể cách chụp hình minh chứng để đạt điểm tối đa:

| STT | Tiêu chí nghiệm thu (Đề bài PDF) | Trạng thái | Hướng dẫn cách chụp hình minh chứng | Điểm nhấn cần khoanh tròn |
| :---: | :--- | :---: | :--- | :--- |
| **1** | Cuộn danh sách sách xuống, Header **đứng yên**, không cuộn theo. | **ĐẠT** | Chụp **2 ảnh liên tiếp**: <br>• **Ảnh A**: Khi ở đỉnh trang (thấy rõ danh mục Chips).<br>• **Ảnh B**: Khi cuộn xuống giữa trang (Chips đã bị cuộn khuất lên trên). | Khoanh đỏ thanh Header màu tím ở cả 2 ảnh để chứng minh Header vẫn đứng yên tại đỉnh không suy suyển. |
| **2** | Nút giỏ hàng tròn luôn **nổi ở góc**, không bị cuộn trôi mất. | **ĐẠT** | Chụp ảnh toàn màn hình khi đang cuộn dở dang ở giữa danh sách sách. | Khoanh đỏ nút tròn giỏ hàng màu tím ở góc dưới-phải, chứng minh nút vẫn nổi đè lên trên nền danh sách sách. |
| **3** | Mỗi ô sách có đúng badge `-x%` hoặc `Mới` **dính sát góc ảnh** (không lệch). | **ĐẠT** | Chụp cận cảnh 2 ô sách đầu tiên ("Dế Mèn Phiêu Lưu Ký" và "Nhà Giả Kim"). | Khoanh đỏ badge `-20%` màu đỏ và badge `Mới` màu cam dính khít sát mép trên-trái của ảnh bìa (cách 6px chuẩn xác). |
| **4** | Lệnh `npx tsc --noEmit` không báo lỗi nào. | **ĐẠT** | Mở Terminal tại thư mục `bookstore-online-tonghop`, gõ lệnh: <br>`npx tsc --noEmit` | Chụp màn hình Terminal hiển thị lệnh chạy mượt mà, kết thúc mà không xuất hiện bất kỳ dòng chữ đỏ hoặc thông báo lỗi nào. |

---

## 5. BẢNG TỔNG HỢP KIẾN THỨC FLEXBOX & POSITION TRONG REACT NATIVE

| Thuộc tính | Giá trị đã sử dụng | Mục đích trong bài tập BookStore Online |
| :--- | :--- | :--- |
| `flexDirection` | `'row'` | Xếp các phần tử nằm ngang (Header, BookRowCard, CategoryChips, BookGrid). Mặc định trong RN là `'column'`. |
| `justifyContent` | `'space-between'` | Đẩy 2 đầu dạt ra xa nhau tối đa (Logo sang trái, Icon sang phải; Cột 1 sang trái, Cột 2 sang phải; Tên sách ở trên, Giá ở đáy). |
| `alignItems` | `'center'` | Căn giữa các phần tử theo trục chéo dọc (Căn giữa nội dung thanh Header cao 56px). |
| `alignItems` | `'flex-start'` | Căn các phần tử bắt đầu từ mép trên (Thẻ BookRowCard). |
| `flexWrap` | `'wrap'` | Cho phép các phần tử tự động rớt xuống dòng khi hết bề rộng màn hình (CategoryChips, BookGrid). |
| `gap` | `8`, `12`, `14` | Tạo khoảng cách đều đặn tự động giữa các hàng và cột mà không sợ bị lệch lề. |
| `aspectRatio` | `3 / 4` | Giữ tỉ lệ khung hình sách luôn chuẩn đẹp khi bề rộng co giãn linh hoạt theo tỷ lệ phần trăm (`width: '48%'`). |
| `position` | `'relative'` | Thiết lập mốc toạ độ (Containing Block) cho các phần tử con dùng `position: 'absolute'` (View bọc ảnh bìa). |
| `position` | `'absolute'` | Nhấc phần tử ra khỏi luồng layout bình thường để làm lớp phủ overlay (DiscountBadge, FloatingCartButton). |
| `numberOfLines`| `{2}` | Cắt ngắn văn bản tối đa 2 dòng kèm dấu chấm lửng `...`, ngăn ngừa hiện tượng vỡ khung layout khi tên sách quá dài. |

---

*Báo cáo được hoàn thiện theo đúng toàn bộ yêu cầu thực hành Tuần 3 môn Lập trình thiết bị di động.*
