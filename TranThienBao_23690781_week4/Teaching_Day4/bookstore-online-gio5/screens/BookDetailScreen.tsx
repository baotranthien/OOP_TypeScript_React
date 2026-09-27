// GIỜ 4 — Bài tập 2: Màn hình Chi tiết sách
// Cấu trúc: phần nội dung dài nằm trong ScrollView (flex:1), CHỈ CÓ thanh "Thêm vào giỏ"
// dưới cùng là cố định thật sự, nằm ngoài ScrollView.
import React, { useState } from "react";
import { View, ScrollView, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../data";

interface BookDetailScreenProps {
  book: Book;
  onBack: () => void;
  onAddToCart: () => void;
  hasTabBar?: boolean;
}

export function BookDetailScreen({
  book,
  onBack,
  onAddToCart,
  hasTabBar = true,
}: BookDetailScreenProps) {
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    onAddToCart();
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <View style={styles.screen}>
      {/* Nút quay lại cố định phía trên */}
      <View style={styles.topNav}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>← Quay lại trang chủ</Text>
        </Pressable>
        {addedMessage && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>✓ Đã thêm vào giỏ</Text>
          </View>
        )}
      </View>

      {/* ScrollView flex:1 chứa TOÀN BỘ nội dung dài (ảnh + tên + mô tả) để phần
          mô tả dài không đẩy tràn thanh "Thêm vào giỏ" cố định phía dưới. */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Ảnh bìa lớn: alignSelf:'center' ghi đè alignItems của cha,
            kết hợp aspectRatio 3/4 để giữ nguyên tỉ lệ ảnh */}
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: book.cover }}
            style={styles.cover}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Tác giả: {book.author}</Text>
        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>

        {/* Thông tin xuất bản */}
        <View style={styles.metaBox}>
          {book.category && (
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Thể loại</Text>
              <Text style={styles.metaValue}>{book.category}</Text>
            </View>
          )}
          {book.publisher && (
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Nhà xuất bản</Text>
              <Text style={styles.metaValue}>{book.publisher}</Text>
            </View>
          )}
          {book.pages && (
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Số trang</Text>
              <Text style={styles.metaValue}>{book.pages} trang</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionHeader}>Giới thiệu nội dung</Text>
        <Text style={styles.description}>{book.description}</Text>

        <View style={styles.extraSpacing} />
      </ScrollView>

      {/* Thanh dưới cùng: row, 2 đầu cách xa nhau, KHÔNG nằm trong ScrollView
          -> luôn đứng yên một chỗ dù nội dung mô tả dài bao nhiêu.
          marginBottom: 64 khi có TabBar để nổi ngay phía trên TabBar. */}
      <View style={[styles.bottomBar, hasTabBar && styles.bottomBarWithTab]}>
        <View>
          <Text style={styles.bottomPriceLabel}>Đơn giá</Text>
          <Text style={styles.bottomPrice}>{book.price.toLocaleString()} đ</Text>
        </View>
        <Pressable style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  backText: {
    color: "#4338CA",
    fontWeight: "700",
    fontSize: 14,
  },
  toast: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  toastText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },
  scroll: {
    flex: 1, // bắt buộc flex: 1 để chiếm vùng giữa và cuộn được
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  coverContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  cover: {
    alignSelf: "center", // căn giữa riêng ảnh, không phụ thuộc alignItems của cha
    width: "70%", // bề rộng theo % màn hình
    aspectRatio: 3 / 4, // giữ tỉ lệ ảnh chuẩn
    borderRadius: 12,
    backgroundColor: "#EEF2F7",
  },
  title: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 28,
  },
  author: {
    marginTop: 6,
    fontSize: 15,
    color: "#5B6B7F",
    fontWeight: "500",
  },
  price: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  metaBox: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    marginBottom: 16,
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  metaItem: {
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 11,
    color: "#64748B",
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#374151",
  },
  extraSpacing: {
    height: 20,
  },
  bottomBar: {
    flexDirection: "row", // giá bên trái, nút bên phải
    justifyContent: "space-between", // cách xa 2 đầu
    alignItems: "center", // căn giữa trục dọc
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  bottomBarWithTab: {
    // Chiều cao TabBar = 64px, neo ngay trên TabBar không đè nhau
    marginBottom: 64,
  },
  bottomPriceLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  bottomPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  addButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
