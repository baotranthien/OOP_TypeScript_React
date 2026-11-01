import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { TabScreenProps } from "../navigation/types";
import { Book, Category, PriceRange } from "../types";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { filterBooks } from "../utils/filters";
import { useDebounce } from "../hooks/useDebounce";
import { useCart } from "../store/hooks";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChip } from "../components/CategoryChip";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { EmptyState } from "../components/EmptyState";
import { FloatingCartButton } from "../components/FloatingCartButton";

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const { totalQuantity } = useCart();
  const debouncedKeyword = useDebounce(keyword, 400);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b);
      setCategories(c);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, {
      keyword: debouncedKeyword,
      categoryId,
      priceRange,
    });
    if (!sortOrder) return filtered;
    return [...filtered].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);

  const hasFilter =
    keyword !== "" ||
    categoryId !== null ||
    priceRange !== null ||
    sortOrder !== null;

  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
    setSortOrder(null);
  };

  const renderHeader = () => (
    <View style={styles.headerFilters}>
      <View style={styles.searchSection}>
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClear={() => setKeyword("")}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        <CategoryChip
          category={{ id: 0, name: "Tất cả", emoji: "📚" }}
          selected={categoryId === null}
          onPress={() => setCategoryId(null)}
        />
        {categories.map((c) => (
          <CategoryChip
            key={c.id}
            category={c}
            selected={categoryId === c.id}
            onPress={() => setCategoryId(categoryId === c.id ? null : c.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.filterControls}>
        <PriceFilter value={priceRange} onChange={setPriceRange} />

        <View style={styles.sortControls}>
          <TouchableOpacity
            style={[
              styles.sortBtn,
              sortOrder === "asc" && styles.sortBtnActive,
            ]}
            onPress={() => setSortOrder(sortOrder === "asc" ? null : "asc")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.sortBtnText,
                sortOrder === "asc" && styles.sortBtnTextActive,
              ]}
            >
              Giá tăng ↑
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sortBtn,
              sortOrder === "desc" && styles.sortBtnActive,
            ]}
            onPress={() => setSortOrder(sortOrder === "desc" ? null : "desc")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.sortBtnText,
                sortOrder === "desc" && styles.sortBtnTextActive,
              ]}
            >
              Giá giảm ↓
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {hasFilter && (
        <View style={styles.activeFilterRow}>
          <Text style={styles.resultCountText}>
            Tìm thấy {visibleBooks.length} cuốn sách
          </Text>
          <TouchableOpacity onPress={clearFilters} activeOpacity={0.7}>
            <Text style={styles.clearFilterText}>✕ Xóa bộ lọc</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="BookStore"
        subtitle="Khám phá kho tàng tri thức bất tận"
      />

      <View style={styles.content}>
        {loading ? (
          <LoadingView label="Đang tải sách…" />
        ) : error ? (
          <ErrorView message={error} onRetry={load} />
        ) : (
          <>
            <BookGrid
              data={visibleBooks}
              onPressBook={(b) =>
                navigation.navigate("BookDetail", { bookId: b.id })
              }
              ListHeaderComponent={renderHeader()}
              ListEmptyComponent={
                <EmptyState
                  emoji="🔎"
                  title="Không tìm thấy sách phù hợp"
                  message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
                  actionLabel="Xóa bộ lọc"
                  onAction={clearFilters}
                />
              }
              onRefresh={load}
              refreshing={loading}
            />
            <FloatingCartButton
              count={totalQuantity}
              onPress={() => navigation.navigate("Cart")}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B1F5C",
  },
  content: {
    flex: 1,
    backgroundColor: "#F4F6FB",
  },
  headerFilters: {
    paddingVertical: 12,
  },
  searchSection: {
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  categoryRow: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  filterControls: {
    paddingHorizontal: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sortControls: {
    flexDirection: "row",
    gap: 6,
    marginVertical: 4,
  },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  sortBtnActive: {
    backgroundColor: "#3B3FD8",
    borderColor: "#3B3FD8",
  },
  sortBtnText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "500",
  },
  sortBtnTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  activeFilterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  resultCountText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  clearFilterText: {
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "700",
  },
});

