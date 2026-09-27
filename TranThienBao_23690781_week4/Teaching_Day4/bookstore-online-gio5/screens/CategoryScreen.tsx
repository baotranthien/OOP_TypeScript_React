// Màn hình Tab "Danh mục"
import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { BOOKS } from "../data";

interface CategoryScreenProps {
  onPressBook: (id: number) => void;
}

export function CategoryScreen({ onPressBook }: CategoryScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("Văn học");

  const filteredBooks =
    selectedCategory === "Tất cả"
      ? BOOKS
      : BOOKS.filter((b) => b.category === selectedCategory);

  return (
    <View style={styles.screen}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>📂 Danh mục tác phẩm</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Chọn chủ đề bạn quan tâm</Text>
        <CategoryChips
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>
            {selectedCategory === "Tất cả"
              ? "Tất cả các đầu sách"
              : `Sách thuộc chủ đề "${selectedCategory}"`}
          </Text>
          <Text style={styles.resultCount}>{filteredBooks.length} kết quả</Text>
        </View>

        {filteredBooks.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>Chưa có sách nào trong danh mục này.</Text>
          </View>
        ) : (
          <BookGrid books={filteredBooks} onPressBook={onPressBook} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerBar: {
    backgroundColor: "#1E1B4B",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // chừa 80px để TabBar cố định đáy (64px) không che nội dung cuối
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 4,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  resultCount: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  emptyWrap: {
    padding: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#64748B",
    fontSize: 14,
  },
});
