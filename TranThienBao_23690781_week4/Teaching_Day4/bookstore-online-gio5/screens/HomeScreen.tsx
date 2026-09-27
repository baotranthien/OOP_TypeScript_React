// GIỜ 4 — Bài tập 1: Màn hình Trang chủ hoàn chỉnh
// Ghép: Header (cố định, KHÔNG cuộn) + ScrollView (Chips + Grid, CUỘN được)
// + FloatingCartButton (absolute, cùng cấp với ScrollView, KHÔNG cuộn theo).
import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { BOOKS } from "../data";

interface HomeScreenProps {
  cartCount: number;
  onPressBook: (id: number) => void;
  onPressCart: () => void;
}

export function HomeScreen({
  cartCount,
  onPressBook,
  onPressCart,
}: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredBooks =
    selectedCategory === "Tất cả"
      ? BOOKS
      : BOOKS.filter((b) => b.category === selectedCategory);

  return (
    // flex:1 + position mặc định 'relative' -> làm containing block cho
    // FloatingCartButton absolute bên dưới, thoát khỏi mọi quan hệ cha khác.
    <View style={styles.screen}>
      {/* 1. Header cố định ngoài ScrollView -> KHÔNG cuộn */}
      <Header
        onPressCart={onPressCart}
        cartCount={cartCount}
      />

      {/* 2. ScrollView flex:1 -> CUỘN được toàn bộ nội dung danh mục và danh sách sách */}
      <ScrollView
        style={styles.scroll} // flex:1 bắt buộc trên chính ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh mục sách</Text>
        <CategoryChips
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <View style={styles.gridHeaderRow}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === "Tất cả" ? "Sách nổi bật" : `Thể loại: ${selectedCategory}`}
          </Text>
          <Text style={styles.bookCountText}>({filteredBooks.length} cuốn)</Text>
        </View>

        {/* Lưới sách linh hoạt 2 cột */}
        <BookGrid books={filteredBooks} onPressBook={onPressBook} />
      </ScrollView>

      {/* 3. Nút nổi nằm NGOÀI ScrollView, song song với nó -> không bị cuộn theo
          nội dung, luôn nổi cố định ở góc màn hình như đúng yêu cầu.
          bottom: 80px để nổi an toàn ngay trên TabBar (64px) mà không bị che. */}
      <FloatingCartButton count={cartCount} onPress={onPressCart} bottom={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scroll: {
    flex: 1, // scrollview chiếm toàn bộ phần thân giữa header và đáy
  },
  scrollContent: {
    padding: 16,
    // paddingBottom đủ lớn (160px) để phần tử cuối của Grid không bị FloatingCartButton
    // (cao 56px + bottom 80px) hoặc TabBar (cao 64px ở App.tsx) che mất.
    paddingBottom: 160,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 6,
  },
  gridHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 4,
  },
  bookCountText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
});
