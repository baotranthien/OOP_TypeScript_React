import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { getBookById } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useCart, useWishlist } from "../store/hooks";
import { formatPrice } from "../utils/format";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";

export function BookDetailScreen({ route, navigation }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { add } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookById(bookId);
      setBook(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingView label="Đang tải thông tin sách…" />
      </SafeAreaView>
    );
  }

  if (error || !book) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorView
          message={error ?? "Không tìm thấy thông tin sách."}
          onRetry={load}
        />
      </SafeAreaView>
    );
  }

  const wish = isWishlisted(book.id);

  const handleAddToCart = () => {
    add({
      bookId: book.id,
      title: book.title,
      price: book.price,
      emoji: book.emoji,
      color: book.color,
      stock: book.stock,
    });
    Alert.alert("Thành công", `Đã thêm "${book.title}" vào giỏ hàng!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.coverContainer, { backgroundColor: book.color }]}>
          <Text style={styles.coverEmoji}>{book.emoji}</Text>
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => toggle(book.id)}
            activeOpacity={0.8}
          >
            <Text style={[styles.wishlistIcon, wish && styles.wishlistIconActive]}>
              {wish ? "♥" : "♡"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>Tác giả: {book.author}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(book.price)}</Text>
            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>
                {book.stock > 0 ? `Còn hàng (${book.stock})` : "Hết hàng"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Giới thiệu nội dung</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.addButton, book.stock <= 0 && styles.addButtonDisabled]}
          onPress={handleAddToCart}
          disabled={book.stock <= 0}
          activeOpacity={0.85}
        >
          <Text style={styles.addButtonText}>🛒 Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6FB",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  coverContainer: {
    height: 240,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  coverEmoji: {
    fontSize: 84,
  },
  wishlistButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  wishlistIcon: {
    fontSize: 24,
    color: "#64748B",
  },
  wishlistIconActive: {
    color: "#EF4444",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  author: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  price: {
    fontSize: 22,
    fontWeight: "800",
    color: "#3B3FD8",
  },
  stockBadge: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockText: {
    color: "#3B3FD8",
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  addButton: {
    backgroundColor: "#3B3FD8",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#94A3B8",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

