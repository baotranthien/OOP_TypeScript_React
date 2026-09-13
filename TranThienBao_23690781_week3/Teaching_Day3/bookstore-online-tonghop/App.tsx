// BÀI TẬP TỔNG HỢP GIỜ 1 + 2 + 3: TRANG CHỦ BOOKSTORE ONLINE
// Ghép nối các component:
// 1. Header cố định trên cùng
// 2. ScrollView chứa CategoryChips + BookGrid (có DiscountBadge)
// 3. FloatingCartButton nổi ở góc dưới bên phải ngoài ScrollView

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

  const handlePressBook = (id: number) => {
    // Bấm vào sách để thêm vào giỏ hàng nhằm minh chứng nút FloatingCartButton hoạt động
    setCartCount((prev: number) => prev + 1);
  };

  const handlePressCart = () => {
    alert(`Giỏ hàng của bạn đang có ${cartCount} sản phẩm.`);
  };

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid — nhớ paddingBottom đủ lớn để
          FloatingCartButton không che mất sách cuối cùng */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Danh mục thể loại</Text>
        <CategoryChips />

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} onPressBook={handlePressBook} />
      </ScrollView>

      {/* 3. Nút giỏ nổi — NGOÀI ScrollView */}
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
    paddingBottom: 100, // Đảm bảo cuộn hết nội dung không bị nút giỏ hàng che mất
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    marginBottom: 10,
  },
});
