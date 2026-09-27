// ========================================================================
// TUẦN 4 — THỰC HÀNH LAYOUT VỚI FLEXBOX & REACT NATIVE
// ỨNG DỤNG: BOOKSTORE ONLINE (PROJECT TỔNG HỢP FINAL - GIỜ 4 & GIỜ 5)
// ========================================================================
// Tích hợp hoàn chỉnh:
//  - GIỜ 4 BÀI 1: HomeScreen (Header cố định, ScrollView flex:1, FloatingCartButton absolute)
//  - GIỜ 4 BÀI 2: BookDetailScreen (alignSelf:'center', aspectRatio: 3/4, ScrollView flex:1, AddToCart cố định)
//  - GIỜ 5 BÀI 1: TabBar (4 tab chia đều flex:1, row/column/center, active highlight, fixed đáy)
//  - GIỜ 5 BÀI 2: CartScreen (3 vùng rõ ràng: ScrollView list, cố định totalBar, cố định TabBar)
// ========================================================================
import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TabBar, TabKey } from "./components/TabBar";
import { HomeScreen } from "./screens/HomeScreen";
import { BookDetailScreen } from "./screens/BookDetailScreen";
import { CartScreen } from "./screens/CartScreen";
import { CategoryScreen } from "./screens/CategoryScreen";
import { AccountScreen } from "./screens/AccountScreen";
import { BOOKS, CART_ITEMS, CartItem, Book } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(CART_ITEMS);

  // Tìm cuốn sách đang được chọn xem chi tiết (nếu có)
  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Thêm sách vào giỏ hàng
  const handleAddToCart = (book: Book) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.book.id === book.id);
      if (existingIndex >= 0) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [...prevItems, { book, quantity: 1 }];
    });
  };

  // Cập nhật số lượng trong giỏ (+ / -)
  const handleUpdateQuantity = (bookId: number, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.book.id === bookId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  // Thanh toán thành công -> làm mới giỏ hàng
  const handleCheckout = () => {
    setCartItems([]);
  };

  // Chuyển Tab
  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    // Nếu bấm về Trang chủ hoặc Danh mục, reset lại chi tiết sách về màn hình danh sách
    if (key === "home" || key === "category") {
      setSelectedBookId(null);
    }
  };

  // Chọn sách xem chi tiết
  const handleSelectBook = (id: number) => {
    setSelectedBookId(id);
  };

  // Quay lại từ màn chi tiết sách
  const handleBack = () => {
    setSelectedBookId(null);
  };

  return (
    // 1. SafeAreaView làm vùng bao ngoài cùng, flex:1
    <SafeAreaView style={styles.root}>
      {/* 2. Container body flex:1, đóng vai trò containing block cho TabBar (position absolute đáy) */}
      <View style={styles.body}>
        {/* Render theo Tab đang chọn */}
        {activeTab === "home" && (
          selectedBook ? (
            <BookDetailScreen
              book={selectedBook}
              onBack={handleBack}
              onAddToCart={() => handleAddToCart(selectedBook)}
              hasTabBar={true}
            />
          ) : (
            <HomeScreen
              cartCount={totalCartCount}
              onPressBook={handleSelectBook}
              onPressCart={() => setActiveTab("cart")}
            />
          )
        )}

        {activeTab === "category" && (
          selectedBook ? (
            <BookDetailScreen
              book={selectedBook}
              onBack={handleBack}
              onAddToCart={() => handleAddToCart(selectedBook)}
              hasTabBar={true}
            />
          ) : (
            <CategoryScreen onPressBook={handleSelectBook} />
          )
        )}

        {activeTab === "cart" && (
          <CartScreen
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={handleCheckout}
            onContinueShopping={() => setActiveTab("home")}
          />
        )}

        {activeTab === "account" && <AccountScreen />}

        {/* 3. Bottom Tab Bar cố định ở đáy màn hình, dùng chung cho toàn bộ app */}
        <TabBar
          active={activeTab}
          onChange={handleTabChange}
          cartBadge={totalCartCount}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  body: {
    flex: 1,
    position: "relative", // containing block cho các phần tử absolute
  },
});
