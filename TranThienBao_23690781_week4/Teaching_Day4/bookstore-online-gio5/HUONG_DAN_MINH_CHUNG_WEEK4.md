# HƯỚNG DẪN CHẠY DỰ ÁN & CHỤP MINH CHỨNG BÀI TẬP WEEK 4 (FLEXBOX LAYOUT UI)
**Môn học:** Lập trình Thiết bị Di động / React Native  
**Học viên:** Trần Thiện Bảo (MSSV: 23690781)  
**Chủ đề:** LAYOUT VỚI FLEXBOX — ỨNG DỤNG BOOKSTORE ONLINE  
**Project tích hợp hoàn chỉnh (Final):** `Teaching_Day4/bookstore-online-gio5`

---

## MỤC LỤC
1. [Hướng dẫn cài đặt và khởi chạy dự án](#1-hướng-dẫn-cài-đặt-và-khởi-chạy-dự-án)
2. [Cấu trúc thư mục dự án](#2-cấu-trúc-thư-mục-dự-án)
3. [Chi tiết minh chứng 4 bài tập](#3-chi-tiết-minh-chứng-4-bài-tập)
   - [Giờ 4 — Bài tập 1: Màn hình Trang chủ hoàn chỉnh](#giờ-4--bài-tập-1-màn-hình-trang-chủ-hoàn-chỉnh)
   - [Giờ 4 — Bài tập 2: Màn hình Chi tiết sách (Book Detail)](#giờ-4--bài-tập-2-màn-hình-chi-tiết-sách-book-detail)
   - [Giờ 5 — Bài tập 1: Thanh Tab Bar dưới cùng](#giờ-5--bài-tập-1-thanh-tab-bar-dưới-cùng)
   - [Giờ 5 — Bài tập 2: Màn hình Giỏ hàng (Cart Screen)](#giờ-5--bài-tập-2-màn-hình-giỏ-hàng-cart-screen)
4. [So sánh 2 cách đặt Tab Bar (Lý thuyết mở rộng Giờ 5)](#4-so-sánh-2-cách-đặt-tab-bar-lý-thuyết-mở-rộng-giờ-5)
5. [Checklist tổng kiểm tra trước khi nộp bài](#5-checklist-tổng-kiểm-tra-trước-khi-nộp-bài)

---

## 1. HƯỚNG DẪN CÀI ĐẶT VÀ KHỞI CHẠY DỰ ÁN

### Bước 1: Mở Terminal (PowerShell hoặc Command Prompt)
Di chuyển vào thư mục project final:
```powershell
cd Teaching_Day4/bookstore-online-gio5
```

### Bước 2: Cài đặt dependencies (nếu chưa cài)
```powershell
npm install
```

### Bước 3: Khởi chạy ứng dụng Expo Web
```powershell
npm run web
```
> **Lưu ý kỹ thuật:** Script `npm run web` đã được cấu hình tự động tích hợp polyfill ECMAScript (`polyfill.js`) nhằm tương thích hoàn hảo với cả môi trường Node.js v18 lẫn Node.js v20+ mà không gặp lỗi `configs.toReversed is not a function`.

### Bước 4: Mở trình duyệt Web
Mở trình duyệt (Chrome, Edge, Firefox) và truy cập vào địa chỉ:
```text
http://localhost:8081
```

> **Mẹo kiểm tra giao diện mobile trên trình duyệt:**  
> Nhấn phím `F12` (hoặc chuột phải chọn **Inspect**), sau đó nhấn tổ hợp phím `Ctrl + Shift + M` (trên Windows) để chuyển sang chế độ **Device Toolbar** mô phỏng điện thoại (chọn thiết bị iPhone 14 Pro, Pixel 7 hoặc kích thước màn hình ~390px x 844px). Giao diện Flexbox sẽ hiển thị chuẩn xác như trên thiết bị thật.

---

## 2. CẤU TRÚC THƯ MỤC DỰ ÁN

Toàn bộ các component và màn hình của Giờ 4 và Giờ 5 đã được đưa vào project độc lập `bookstore-online-gio5`:

```text
Teaching_Day4/bookstore-online-gio5/
├── App.tsx                     # Component gốc điều hướng tĩnh useState, chứa SafeAreaView & TabBar
├── data.ts                     # Dữ liệu mẫu (BOOKS, CATEGORIES, CART_ITEMS)
├── polyfill.js                 # Polyfill ES2023 Array methods cho Node 18
├── components/
│   ├── Header.tsx              # Giờ 1 Bài 1: Header (row, space-between, center, fixed)
│   ├── CategoryChips.tsx       # Giờ 2 Bài 1: Chips danh mục (wrap, gap, auto width)
│   ├── BookGrid.tsx            # Giờ 2 Bài 2: Lưới 2 cột (wrap, 48% width, aspectRatio 3/4)
│   ├── DiscountBadge.tsx       # Giờ 3 Bài 1: Badge nổi (position absolute)
│   ├── FloatingCartButton.tsx  # Giờ 3 Bài 2 & Giờ 4: Nút giỏ hàng nổi (position absolute, bottom 80)
│   ├── TabBar.tsx              # Giờ 5 Bài 1: Thanh Tab Bar 4 mục (flex 1, row/column/center, fixed đáy)
│   └── CartLineItem.tsx        # Giờ 5 Bài 2: Dòng giỏ hàng (row, thumb fixed, title flex:1, meta fixed)
└── screens/
    ├── HomeScreen.tsx          # Giờ 4 Bài 1: Màn hình Trang chủ hoàn chỉnh
    ├── BookDetailScreen.tsx    # Giờ 4 Bài 2: Màn hình Chi tiết sách
    ├── CartScreen.tsx          # Giờ 5 Bài 2: Màn hình Giỏ hàng (3 vùng độc lập không che lấp)
    ├── CategoryScreen.tsx      # Màn hình Tab Danh mục tương tác
    └── AccountScreen.tsx       # Màn hình Tab Tài khoản người dùng
```

---

## 3. CHI TIẾT MINH CHỨNG 4 BÀI TẬP

---

### GIỜ 4 — BÀI TẬP 1: MÀN HÌNH TRANG CHỦ HOÀN CHỈNH

#### 1. Yêu cầu kỹ thuật cần đạt:
* Vùng ngoài cùng dùng `SafeAreaView` với `flex: 1`.
* `Header` cố định trên cùng, **không được cuộn theo nội dung**.
* `ScrollView` ở giữa với `flex: 1` và `showsVerticalScrollIndicator={false}`.
* Trong `ScrollView` chứa `CategoryChips` (tự xuống dòng bằng `flexWrap: 'wrap'`, `gap: 8`) và `BookGrid` (chia 2 cột bằng `flexDirection: 'row'`, `flexWrap: 'wrap'`, `width: '48%'`, ảnh bìa giữ tỉ lệ bằng `aspectRatio: 3 / 4`).
* `contentContainerStyle` có `paddingBottom: 160` đủ lớn để hàng sách cuối cùng không bị nút giỏ hàng hoặc Tab Bar che khuất.
* `FloatingCartButton` nằm **bên ngoài ScrollView** (cùng cấp với ScrollView), sử dụng `position: 'absolute'`, `bottom: 80`, `right: 20`.
* Khi người dùng cuộn nội dung, nút giỏ hàng nổi **vẫn đứng yên cố định ở góc dưới bên phải**.

#### 2. Danh sách ảnh chụp minh chứng đề nghị:
| Tên file ảnh đề nghị | Trạng thái ứng dụng khi chụp | Thành phần bắt buộc nhìn thấy trong ảnh |
| :--- | :--- | :--- |
| `G4_B1_01_Home_Top.png` | Màn hình Home ở vị trí trên cùng (chưa cuộn) | Header cố định (`📚 BookStore`), các chip danh mục, các sách hàng đầu của Grid, nút Floating Cart nổi góc dưới, Tab Bar đáy. |
| `G4_B1_02_Home_Scrolled.png` | Màn hình Home sau khi cuộn xuống dưới cùng | Header vẫn đứng yên ở đỉnh; cuốn sách cuối cùng (`Lược Sử Thời Gian`) hiển thị trọn vẹn không bị nút giỏ hàng che; nút Floating Cart vẫn cố định tại vị trí `bottom: 80, right: 20`. |
| `G4_B1_03_Home_Code_Structure.png` | Code editor mở file `screens/HomeScreen.tsx` | Đoạn code thể hiện cấu trúc: Header nằm ngoài -> ScrollView `flex:1` ở giữa -> FloatingCartButton nằm ngoài song song với ScrollView; `paddingBottom: 160`. |
| `G4_B1_04_BookGrid_Code_Flexbox.png` | Code editor mở file `components/BookGrid.tsx` | Đoạn code style `styles.grid` có `flexDirection: 'row'`, `flexWrap: 'wrap'`; `styles.item` có `width: '48%'`; `coverWrap` có `aspectRatio: 3 / 4`. |

#### 3. Trích đoạn code minh chứng trọng tâm:
```tsx
// screens/HomeScreen.tsx
<View style={styles.screen}>
  {/* 1. Header cố định ngoài ScrollView */}
  <Header onPressCart={onPressCart} cartCount={cartCount} />

  {/* 2. ScrollView flex:1 cuộn nội dung */}
  <ScrollView
    style={styles.scroll} // flex: 1
    contentContainerStyle={styles.scrollContent} // paddingBottom: 160
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.sectionTitle}>Danh mục sách</Text>
    <CategoryChips selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
    <BookGrid books={filteredBooks} onPressBook={onPressBook} />
  </ScrollView>

  {/* 3. Floating Cart Button nằm NGOÀI ScrollView, position: 'absolute' */}
  <FloatingCartButton count={cartCount} onPress={onPressCart} bottom={80} />
</View>
```

---

### GIỜ 4 — BÀI TẬP 2: MÀN HÌNH CHI TIẾT SÁCH (BOOK DETAIL)

#### 1. Yêu cầu kỹ thuật cần đạt:
* Nhấp vào một cuốn sách bất kỳ ở Home (ví dụ: *Dế Mèn Phiêu Lưu Ký*) để mở màn hình chi tiết.
* Có nút `← Quay lại trang chủ` ở trên cùng.
* Ảnh bìa lớn: căn giữa theo chiều ngang bằng `alignSelf: 'center'`, chiều rộng `width: '70%'`, giữ tỉ lệ bằng `aspectRatio: 3 / 4`.
* Tên sách, tác giả, giá tiền, thông tin xuất bản và **đoạn văn bản mô tả dài** nằm trong `ScrollView (flex: 1)`.
* Thanh `Thêm vào giỏ` (`bottomBar`) nằm **hoàn toàn bên ngoài ScrollView**:
  * Sử dụng `flexDirection: 'row'`.
  * `justifyContent: 'space-between'` (giá tiền bên trái, nút bên phải).
  * `alignItems: 'center'`.
  * `marginBottom: 64` (để đứng cố định ngay phía trên Tab Bar).
* Khi người dùng cuộn xem đoạn mô tả dài, thanh `Thêm vào giỏ` **vẫn đứng yên một chỗ, không bị đẩy tràn hay cuộn theo**.
* Khi bấm nút `Thêm vào giỏ`: xuất hiện thông báo toast "✓ Đã thêm vào giỏ", đồng thời số lượng sản phẩm trên giỏ hàng và Tab Bar tự động tăng lên (+1).

#### 2. Danh sách ảnh chụp minh chứng đề nghị:
| Tên file ảnh đề nghị | Trạng thái ứng dụng khi chụp | Thành phần bắt buộc nhìn thấy trong ảnh |
| :--- | :--- | :--- |
| `G4_B2_01_Detail_Top.png` | Màn hình Book Detail ở phần đầu | Nút `← Quay lại`, ảnh bìa lớn căn giữa cân đối (`alignSelf: 'center'`), tên sách, tác giả, giá tiền, thanh `Thêm vào giỏ` cố định dưới cùng. |
| `G4_B2_02_Detail_Scrolled.png` | Màn hình Book Detail sau khi cuộn xuống đoạn mô tả dài | Nội dung mô tả đang được cuộn xem; thanh `Thêm vào giỏ` (chứa giá và nút bấm) vẫn cố định vững vàng ở vị trí đáy. |
| `G4_B2_03_Detail_AddToCart_Success.png` | Vừa nhấp vào nút `Thêm vào giỏ` | Badge toast "✓ Đã thêm vào giỏ" hiển thị; số lượng badge trên Tab Bar Giỏ hàng tăng lên. |
| `G4_B2_04_Detail_Code_Layout.png` | Code editor mở file `screens/BookDetailScreen.tsx` | Đoạn code style `styles.cover` (`alignSelf: 'center'`, `aspectRatio: 3 / 4`), `styles.scroll` (`flex: 1`), `styles.bottomBar` (`flexDirection: 'row'`, `justifyContent: 'space-between'`, `alignItems: 'center'`). |

#### 3. Trích đoạn code minh chứng trọng tâm:
```tsx
// screens/BookDetailScreen.tsx
<View style={styles.screen}>
  {/* Nút quay lại */}
  <Pressable style={styles.backButton} onPress={onBack}>
    <Text style={styles.backText}>← Quay lại trang chủ</Text>
  </Pressable>

  {/* ScrollView flex:1 chứa toàn bộ nội dung dài */}
  <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
    <Image source={{ uri: book.cover }} style={styles.cover} />
    <Text style={styles.title}>{book.title}</Text>
    <Text style={styles.author}>{book.author}</Text>
    <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
    <Text style={styles.description}>{book.description}</Text>
  </ScrollView>

  {/* Thanh Thêm vào giỏ cố định ngoài ScrollView */}
  <View style={[styles.bottomBar, hasTabBar && styles.bottomBarWithTab]}>
    <Text style={styles.bottomPrice}>{book.price.toLocaleString()} đ</Text>
    <Pressable style={styles.addButton} onPress={handleAddToCart}>
      <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
    </Pressable>
  </View>
</View>
```

---

### GIỜ 5 — BÀI TẬP 1: THANH TAB BAR DƯỚI CÙNG

#### 1. Yêu cầu kỹ thuật cần đạt:
* Giao diện tĩnh gồm đúng 4 mục: **Trang chủ** (🏠), **Danh mục** (📂), **Giỏ hàng** (🛒), **Tài khoản** (👤).
* Container Tab Bar dùng:
  * `flexDirection: 'row'`
  * `position: 'absolute'`, `bottom: 0`, `left: 0`, `right: 0`, `height: 64`.
* Mỗi tab item dùng:
  * `flex: 1` để chia đều chính xác 4 phần bằng nhau theo chiều ngang.
  * `flexDirection: 'column'`
  * `alignItems: 'center'`
  * `justifyContent: 'center'`
  * Icon nằm trên, Text nằm dưới.
* Tab đang chọn (`active`) có màu chữ và icon nổi bật (`#4338CA`, `fontWeight: '700'`).
* Tab không chọn có màu xám mờ (`#9CA3AF`).
* Điều hướng tĩnh bằng React `useState` tại `App.tsx` (không dùng React Navigation).
* Có huy hiệu (badge đỏ) hiển thị tổng số lượng sản phẩm trên tab Giỏ hàng khi giỏ có hàng.

#### 2. Danh sách ảnh chụp minh chứng đề nghị:
| Tên file ảnh đề nghị | Trạng thái ứng dụng khi chụp | Thành phần bắt buộc nhìn thấy trong ảnh |
| :--- | :--- | :--- |
| `G5_B1_01_TabBar_4Tabs.png` | Thanh Tab Bar ở đáy màn hình Home | Thấy rõ đủ 4 tab: Trang chủ (đang active màu tím), Danh mục, Giỏ hàng, Tài khoản chia đều 4 phần bằng nhau. |
| `G5_B1_02_TabBar_Switch_Category.png` | Bấm chuyển sang tab "Danh mục" | Tab "Danh mục" chuyển sang active; màn hình Danh mục hiển thị với các chip lọc và lưới sách tương ứng. |
| `G5_B1_03_TabBar_Switch_Account.png` | Bấm chuyển sang tab "Tài khoản" | Tab "Tài khoản" chuyển sang active; màn hình hồ sơ cá nhân hiển thị. |
| `G5_B1_04_TabBar_Code_Flexbox.png` | Code editor mở file `components/TabBar.tsx` | Đoạn code style `styles.bar` (`flexDirection: 'row'`, `position: 'absolute'`, `bottom: 0`, `height: 64`) và `styles.tabItem` (`flex: 1`, `flexDirection: 'column'`, `alignItems: 'center'`, `justifyContent: 'center'`). |

#### 3. Trích đoạn code minh chứng trọng tâm:
```tsx
// components/TabBar.tsx
const styles = StyleSheet.create({
  bar: {
    position: "absolute", // cố định đáy màn hình
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row", // 4 tab xếp theo hàng ngang
    height: 64,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  tabItem: {
    flex: 1, // chia đều 1/4 bề rộng cho mỗi tab
    flexDirection: "column", // icon trên, chữ dưới
    alignItems: "center", // căn giữa trục ngang của tab
    justifyContent: "center", // căn giữa trục dọc của tab
    gap: 2,
  },
  labelActive: {
    color: "#4338CA", // màu nổi bật cho tab active
    fontWeight: "700",
  },
});
```

---

### GIỜ 5 — BÀI TẬP 2: MÀN HÌNH GIỎ HÀNG (CART SCREEN)

#### 1. Yêu cầu kỹ thuật cần đạt:
Bố cục toàn màn hình phải phân tách thành **3 vùng hoàn toàn độc lập, không chồng lấn lên nhau**:
```text
┌──────────────────────────────────────────┐
│ VÙNG 1: Danh sách sản phẩm (ScrollView)  │
│ - Mỗi dòng dùng flexDirection: 'row'     │
│ - alignItems: 'center'                   │
│ - Ảnh cố định: 44 x 60                   │
│ - Tên sách dùng flex: 1 co giãn          │
│ - Số lượng + giá có width cố định (105)  │
├──────────────────────────────────────────┤
│ VÙNG 2: Tổng tiền + Nút Thanh toán       │
│ - Không nằm trong ScrollView             │
│ - flexDirection: 'row', space-between    │
│ - marginBottom: 64 (nổi trên Tab Bar)    │
├──────────────────────────────────────────┤
│ VÙNG 3: Bottom Tab Bar cố định ở đáy     │
│ - position: 'absolute', bottom: 0        │
└──────────────────────────────────────────┘
```
* **Vùng 1 (Danh sách):** Nằm trong `ScrollView (flex: 1)`, cuộn mượt mà khi danh sách có nhiều mặt hàng. Mỗi dòng `CartLineItem` có layout Flexbox chuẩn: ảnh cố định (`44x60`), tên sách `flex: 1`, khối số lượng + giá có width cố định (`105px`). Có nút `+` và `-` để tăng/giảm số lượng sản phẩm.
* **Vùng 2 (Thanh tổng tiền `totalBar`):** Nằm ngoài ScrollView, cố định ngay phía trên Tab Bar bằng cách set `marginBottom: 64` (đúng bằng chiều cao Tab Bar). Hiển thị tổng tiền và nút `Thanh toán ngay`.
* **Vùng 3 (Bottom Tab Bar):** Cố định ở đáy màn hình (`bottom: 0`).
* **Kiểm tra không chồng lấp:** Cuộn danh sách sản phẩm lên xuống, thanh tổng tiền và Tab Bar vẫn cố định, không che mất dòng sản phẩm cuối cùng.
* Khi nhấn nút `Thanh toán ngay`: hiển thị Modal popup thông báo "Đặt hàng thành công!".

#### 2. Danh sách ảnh chụp minh chứng đề nghị:
| Tên file ảnh đề nghị | Trạng thái ứng dụng khi chụp | Thành phần bắt buộc nhìn thấy trong ảnh |
| :--- | :--- | :--- |
| `G5_B2_01_Cart_Top.png` | Màn hình Giỏ hàng ở đầu danh sách | Thấy đủ 3 vùng rõ ràng: (1) Danh sách sản phẩm, (2) Thanh tổng tiền + nút Thanh toán ngay, (3) Tab Bar ở đáy. Không có phần tử nào bị đè lấn. |
| `G5_B2_02_Cart_Scrolled.png` | Màn hình Giỏ hàng sau khi cuộn xuống dưới | Danh sách các sản phẩm đang được cuộn; thanh tổng tiền và Tab Bar vẫn hoàn toàn cố định ở đáy, sản phẩm cuối cùng không bị che mất. |
| `G5_B2_03_Cart_Qty_Update.png` | Nhấn nút `+` tăng số lượng sản phẩm | Số lượng tăng lên, tổng tiền cập nhật tự động tức thì. |
| `G5_B2_04_Cart_Checkout_Modal.png` | Nhấn nút `Thanh toán ngay` | Modal popup chúc mừng "Đặt hàng thành công!" xuất hiện. |
| `G5_B2_05_Cart_Code_3Zones.png` | Code editor mở file `screens/CartScreen.tsx` | Đoạn code thể hiện cấu trúc 3 vùng: `ScrollView style={styles.scroll}` -> `View style={styles.totalBar}` với `marginBottom: 64` -> `TabBar` ở `App.tsx`. |
| `G5_B2_06_CartLineItem_Code_Flexbox.png` | Code editor mở file `components/CartLineItem.tsx` | Đoạn code style `styles.row` (`flexDirection: 'row'`, `alignItems: 'center'`), `styles.thumb` (cố định), `styles.title` (`flex: 1`), `styles.meta` (`width: 105`). |

#### 3. Trích đoạn code minh chứng trọng tâm:
```tsx
// screens/CartScreen.tsx
<View style={styles.screen}>
  <Text style={styles.header}>Giỏ hàng ({items.length})</Text>

  {/* VÙNG 1: ScrollView cuộn danh sách (flex: 1) */}
  <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
    {items.map((item) => (
      <CartLineItem key={item.book.id} item={item} onUpdateQuantity={onUpdateQuantity} />
    ))}
  </ScrollView>

  {/* VÙNG 2: Thanh tổng tiền cố định (nổi ngay trên TabBar nhờ marginBottom: 64) */}
  <View style={styles.totalBar}>
    <View>
      <Text style={styles.totalLabel}>Tổng thanh toán</Text>
      <Text style={styles.totalValue}>{total.toLocaleString()} đ</Text>
    </View>
    <Pressable style={styles.checkoutButton} onPress={handlePressCheckout}>
      <Text style={styles.checkoutText}>Thanh toán ngay</Text>
    </Pressable>
  </View>
</View>

// VÙNG 3: TabBar cố định ở đáy được đặt tại App.tsx:
// <TabBar active={activeTab} onChange={setActiveTab} />
```

---

## 4. SO SÁNH 2 CÁCH ĐẶT TAB BAR (LÝ THUYẾT MỞ RỘNG GIỜ 5)

Theo yêu cầu mục Giờ 5 — Bài tập 1 của đề bài: *"Tab bar đặt position: 'absolute' ở đáy màn hình HOẶC đặt cố định ngoài ScrollView (so sánh 2 cách và nêu khi nào dùng cách nào)"*.

Dưới đây là bảng phân tích và so sánh chi tiết:

| Tiêu chí so sánh | Cách 1: `position: 'absolute'` ở đáy | Cách 2: Đặt trong luồng Flexbox bình thường (ngoài ScrollView) |
| :--- | :--- | :--- |
| **Cấu trúc mã nguồn** | `<View style={{flex: 1}}>`<br>`  <Screen />`<br>`  <TabBar style={{position: 'absolute', bottom: 0}} />`<br>`</View>` | `<SafeAreaView style={{flex: 1}}>`<br>`  <View style={{flex: 1}}><Screen /></View>`<br>`  <TabBar style={{height: 64}} />`<br>`</SafeAreaView>` |
| **Ưu điểm** | - TabBar hoàn toàn độc lập với các khối nội dung bên trong.<br>- Có thể dễ dàng làm hiệu ứng **trong suốt / mờ ảo (translucent / blur)** nhìn xuyên thấu nội dung cuộn bên dưới TabBar.<br>- Dễ thực hiện animation trượt ẩn/hiện TabBar khi cuộn mà không làm giật layout của màn hình cha. | - Hệ thống Flexbox tự động tính toán vị trí, TabBar tự động neo sát đáy màn hình cha.<br>- **Không cần tính toán thủ công `marginBottom` hay `paddingBottom`** cho nội dung phía trên.<br>- Không bao giờ lo xảy ra lỗi che khuất phần tử cuối cùng khi kích thước TabBar thay đổi. |
| **Nhược điểm** | - Bắt buộc lập trình viên phải chủ động chừa `paddingBottom` (hoặc `marginBottom: 64`) cho `ScrollView` và các thanh cố định con (như `totalBar`), nếu quên sẽ bị che mất phần tử cuối. | - Không thể làm hiệu ứng nổi đè (floating overlay) hay làm mờ nhìn xuyên nội dung đang cuộn phía sau TabBar. |
| **Khi nào nên dùng?** | Dùng khi muốn thiết kế giao diện hiện đại (như Apple Music, Spotify, Instagram) nơi nội dung có thể cuộn lướt nhẹ ra phía sau thanh Tab Bar mờ kính (glassmorphism/blur), hoặc khi TabBar có nút tròn lớn nhô cao ở giữa. | Dùng cho các ứng dụng có cấu trúc trang rõ ràng, phân vùng cố định nghiêm ngặt (như ứng dụng thương mại điện tử, thanh toán, biểu mẫu nhập liệu), đảm bảo không bao giờ bị đè lấp nút bấm quan trọng. |

---

## 5. CHECKLIST TỔNG KIỂM TRA TRƯỚC KHI NỘP BÀI

Trước khi đóng gói bài nộp, hãy tích kiểm tra các mục sau:

- [x] **1. Project Final:** Dự án `Teaching_Day4/bookstore-online-gio5` chạy độc lập, không import từ `gio4`.
- [x] **2. Trình biên dịch:** `npx tsc --noEmit` chạy thành công không có bất kỳ lỗi TypeScript nào.
- [x] **3. Khởi chạy Web:** Lệnh `npm run web` chạy thành công trên terminal, truy cập được vào `http://localhost:8081`.
- [x] **4. Giờ 4 — Bài 1 (Home):**
  - Header cố định, không bị cuộn.
  - ScrollView cuộn được chứa Chips và Grid 2 cột.
  - Floating Cart Button cố định ở góc dưới (`position: 'absolute'`), không bị cuộn.
  - Sách cuối cùng của Grid không bị nút giỏ hàng che.
- [x] **5. Giờ 4 — Bài 2 (Book Detail):**
  - Mở được chi tiết sách từ Home.
  - Ảnh bìa căn giữa (`alignSelf: 'center'`) và giữ tỉ lệ (`aspectRatio: 3 / 4`).
  - Mô tả dài cuộn được trong ScrollView (`flex: 1`).
  - Thanh `Thêm vào giỏ` cố định phía dưới, không cuộn theo mô tả.
  - Nút `Thêm vào giỏ` hoạt động và cập nhật giỏ hàng.
- [x] **6. Giờ 5 — Bài 1 (Tab Bar):**
  - Đủ 4 tab: Trang chủ, Danh mục, Giỏ hàng, Tài khoản chia đều (`flex: 1`).
  - Mỗi tab icon trên, chữ dưới (`flexDirection: 'column'`, `alignItems: 'center'`).
  - Tab active đổi màu nổi bật rõ ràng.
  - Đổi màn hình mượt mà bằng React state tĩnh.
- [x] **7. Giờ 5 — Bài 2 (Cart Screen):**
  - Đủ 3 vùng rõ ràng: Danh sách cuộn (`flex: 1`), Thanh tổng tiền cố định, Tab Bar cố định.
  - Không có vùng nào chồng lấn lên nhau.
  - Từng dòng sản phẩm chia đúng tỉ lệ: ảnh cố định, tên sách `flex: 1`, số lượng + giá cố định.
- [x] **8. Minh chứng:** Đã chụp đủ các ảnh màn hình và đoạn code theo danh sách bảng gợi ý ở trên.
